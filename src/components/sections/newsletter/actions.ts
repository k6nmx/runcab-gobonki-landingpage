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
  try {
    if (isBot(formData)) return { ok: true as const };

    const email = String(formData.get('email') || '');
    const source = String(formData.get('source') || '').trim() || 'landing_page';

    const parsed = schema.safeParse({ email, source });
    if (!parsed.success) return { ok: false as const, error: 'Invalid email address' };

    const h = await headers();
    const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown';
    const ua = h.get('user-agent') || 'unknown';

    const token = crypto.randomBytes(32).toString('hex');
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 1000 * 60 * 60 * 24); // 24 hours

    // Upsert: insert or update existing email with new token + timestamps
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

    const confirmUrl = `${process.env.APP_BASE_URL}/api/newsletter/confirm?token=${token}`;

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "Confirm your subscription",
      text: `Confirm subscription: ${confirmUrl}`,
      html: `<p>Please confirm your subscription:</p><p><a href="${confirmUrl}">Confirm Subscription</a></p>`,
    });

    console.log('[newsletter.subscribe]', { email, source, ip, ua });

    // For privacy and anti-enumeration: always return success message
    return { ok: true as const };
  } catch (err) {
    console.error('[newsletter.subscribe][error]', err);
    return { ok: false as const, error: 'Server error' };
  }
}
