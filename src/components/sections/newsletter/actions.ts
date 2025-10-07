'use server'

import { z } from 'zod'
import crypto from 'crypto'
import { headers } from 'next/headers'
import { db } from '@/lib/db'
import { newsletters } from '@/lib/db/schema'
import { getTransporter } from '@/lib/email'

const schema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
  userType: z.union([z.literal('customer'), z.literal('business')]).optional(),
})

function isBot(form: FormData) {
  return String(form.get('company') || '').trim().length > 0
}

export async function subscribe(formData: FormData) {
  console.log('[newsletter.subscribe] START')

  try {
    if (isBot(formData)) {
      console.log('[newsletter.subscribe] Bot detected, skipping')
      return { ok: true as const }
    }

    const email = String(formData.get('email') || '').trim()
    const source = String(formData.get('source') || '').trim() || 'landing_page'

    // Accept either 'userType' or 'user_type' from client
    const rawUserType = String(formData.get('userType') ?? formData.get('user_type') ?? '').trim().toLowerCase()
    const userType = rawUserType === 'business' ? 'business' : 'customer' // default to customer

    // Zod validation
    const parsed = schema.safeParse({ email, source, userType })
    if (!parsed.success) {
      console.log('[newsletter.subscribe] Validation failed:', parsed.error.format ? parsed.error.format() : parsed.error)
      return { ok: false as const, error: 'Invalid input' }
    }

    const h = await headers()
    const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
    const ua = h.get('user-agent') || 'unknown'

    const token = crypto.randomBytes(32).toString('hex')
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 1000 * 60 * 60 * 24) // 24 hours

    // Insert or update including user_type
    await db
      .insert(newsletters)
      .values({
        email,
        source,
        userType: userType,
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
          userType: userType,
          ipAddress: ip,
          userAgent: ua,
          confirmationToken: token,
          confirmationSentAt: now,
          confirmationExpiresAt: expiresAt,
          updatedAt: now,
        },
      })

    // FIXED: Changed from /api/newsletter/confirm to /newsletter/confirm
    const confirmUrl = `${process.env.APP_BASE_URL}/newsletter/confirm?token=${token}`

    const transporter = await getTransporter()
    if (!transporter || typeof transporter.sendMail !== 'function') {
      console.error('[newsletter.subscribe] transporter invalid:', transporter)
      return { ok: false as const, error: 'Email transporter not configured' }
    }

    try {
      if (typeof transporter.verify === 'function') {
        await transporter.verify()
        console.log('[newsletter.subscribe] transporter verified')
      }
    } catch (verifyErr) {
      console.error('[newsletter.subscribe] transporter verify failed', verifyErr)
    }

    // Enhanced email with better design
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: '✅ Confirm Your Subscription',
      text: `Thanks for subscribing! Click here to confirm: ${confirmUrl}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding: 40px 40px 30px 40px; text-align: center;">
                      <h1 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 700; color: #111827;">
                        Confirm Your Subscription
                      </h1>
                      <p style="margin: 0; font-size: 16px; color: #6b7280; line-height: 1.6;">
                        Thanks for subscribing! Click the button below to confirm your email address and start receiving ${userType === 'business' ? 'business insights' : 'exclusive deals'}.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 40px 40px 40px; text-align: center;">
                      <a href="${confirmUrl}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                        Confirm Subscription
                      </a>
                      <p style="margin: 24px 0 0 0; font-size: 14px; color: #9ca3af;">
                        Or copy and paste this link:<br>
                        <a href="${confirmUrl}" style="color: #0ea5e9; word-break: break-all;">${confirmUrl}</a>
                      </p>
                      <p style="margin: 24px 0 0 0; font-size: 12px; color: #9ca3af;">
                        This link expires in 24 hours.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
                      <p style="margin: 0; font-size: 12px; color: #6b7280; text-align: center;">
                        If you didn't subscribe to this newsletter, you can safely ignore this email.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    }

    try {
      const mailResult = await transporter.sendMail(mailOptions)
      console.log('[newsletter.subscribe] Email sent successfully:', mailResult)
    } catch (sendErr) {
      console.error('[newsletter.subscribe] sendMail failed', sendErr)
      return { ok: false as const, error: 'Failed to send confirmation email' }
    }

    console.log('[newsletter.subscribe] Complete:', { email, source, userType, ip, ua })
    return { ok: true as const }
  } catch (err) {
    console.error('[newsletter.subscribe][CRITICAL ERROR]', {
      error: err,
      message: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined,
    })
    return { ok: false as const, error: 'Server error' }
  }
}