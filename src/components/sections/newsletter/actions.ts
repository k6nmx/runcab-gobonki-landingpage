'use server'

import { z } from 'zod';
import crypto from 'crypto';
import { headers } from 'next/headers';
import { db } from '@/lib/db';
import { newsletters } from '@/lib/db/schema';
import { transporter } from '@/lib/email';

const schema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
});

function isBot(form: FormData) {
  return String(form.get('company') || '').trim().length > 0;
}

export async function subscribe(formData: FormData) {
  console.log('[newsletter.subscribe] START');
  
  try {
    if (isBot(formData)) {
      console.log('[newsletter.subscribe] Bot detected, skipping');
      return { ok: true as const };
    }

    const email = String(formData.get('email') || '');
    const source = String(formData.get('source') || '').trim() || 'landing_page';

    const parsed = schema.safeParse({ email, source });
    if (!parsed.success) {
      console.log('[newsletter.subscribe] Validation failed:', parsed.error);
      return { ok: false as const, error: 'Invalid email address' };
    }

    const h = await headers();
    const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown';
    const ua = h.get('user-agent') || 'unknown';

    const token = crypto.randomBytes(32).toString('hex');
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 1000 * 60 * 60 * 24);

    console.log('[newsletter.subscribe] Inserting into DB:', { email, source });
    
    await db
      .insert(newsletters)
      .values({
        email,
        source,
        ipAddress: ip,
        userAgent: ua,
        confirmationToken: token,
        confirmationSentAt: now,
        confirmationExpiresAt: expiresAt,
      })
      .onConflictDoUpdate({
        target: newsletters.email,
        set: {
          source,
          ipAddress: ip,
          userAgent: ua,
          confirmationToken: token,
          confirmationSentAt: now,
          confirmationExpiresAt: expiresAt,
          updatedAt: now,
        },
      });

    console.log('[newsletter.subscribe] DB operation complete');

    const confirmUrl = `${process.env.APP_BASE_URL}/api/newsletter/confirm?token=${token}`;
    
    console.log('[newsletter.subscribe] Attempting to send email:', {
      from: process.env.FROM_EMAIL,
      to: email,
      transporterExists: !!transporter,
      confirmUrl,
    });

    const mailResult = await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "Confirm your subscription",
      text: `Confirm subscription: ${confirmUrl}`,
      html: `<p>Please confirm your subscription:</p><p><a href="${confirmUrl}">Confirm Subscription</a></p>`,
    });

    console.log('[newsletter.subscribe] Email sent successfully:', mailResult);
    console.log('[newsletter.subscribe] Complete:', { email, source, ip, ua });

    return { ok: true as const };
  } catch (err) {
    console.error('[newsletter.subscribe][CRITICAL ERROR]', {
      error: err,
      message: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined,
    });
    return { ok: false as const, error: 'Server error' };
  }
}