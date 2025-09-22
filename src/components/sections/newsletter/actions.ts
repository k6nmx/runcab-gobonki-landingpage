'use server'

import { z } from 'zod'
import { headers } from 'next/headers'

const schema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
})

// simple honeypot (if filled, treat as bot and "succeed" without logging)
function isBot(form: FormData) {
  return String(form.get('company') || '').trim().length > 0
}

export async function subscribe(formData: FormData) {
  try {
    if (isBot(formData)) {
      return { ok: true as const } // silently accept to not tip off bots
    }

    const email = String(formData.get('email') || '')
    const source = String(formData.get('source') || '').trim() || undefined

    // ✅ server-side validation (authoritative)
    const parsed = schema.safeParse({ email, source })
    if (!parsed.success) {
      return { ok: false as const, error: 'Invalid email address' }
    }

    // 🔎 contextual info for the log
    const h = await headers()
    const ip =
      h.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      h.get('x-real-ip') ||
      'unknown'
    const ua = h.get('user-agent') || 'unknown'

    // 🪵 LOG ONLY (no persistence)
    console.log('[newsletter.subscribe]', {
      email,
      source,
      ip,
      ua,
      ts: new Date().toISOString(),
    })

    return { ok: true as const }
  } catch (err) {
    console.error('[newsletter.subscribe][error]', err)
    return { ok: false as const, error: 'Server error' }
  }
}
