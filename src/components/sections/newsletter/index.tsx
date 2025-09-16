'use client'

import {useState} from 'react'
import {useTranslations} from 'next-intl'
import {z} from 'zod'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Card, CardContent} from '@/components/ui/card'
import {Mail, ShieldCheck} from 'lucide-react'
import {cn} from '@/lib/utils'

const schema = z.object({
  email: z.string().email()
})

export default function NewsletterSection({
  className
}: {
  className?: string
}) {
  const t = useTranslations('newsletter')
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [email, setEmail] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = schema.safeParse({email})
    if (!parsed.success) {
      setStatus('error')
      return
    }
    try {
      setStatus('loading')
      // TODO: wire up your provider (Resend/Mailchimp/ConvertKit/API route)
      // await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
      await new Promise(r => setTimeout(r, 650)) // demo latency
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="newsletter" className={cn('relative py-14 sm:py-20', className)}>
      {/* soft section wash */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/60 via-white to-white" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* gradient border wrapper */}
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-brand-400 to-secondary-400 shadow-[0_18px_50px_-12px_rgba(14,165,233,0.28)]">
          <Card className="rounded-3xl border-none bg-white/80 backdrop-blur">
            {/* hover halo */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 hover:opacity-100">
              <div
                className="absolute -inset-10 rounded-[2.25rem] blur-2xl"
                style={{background: 'radial-gradient(600px 240px at 50% 0%, rgba(14,165,233,.18), transparent 60%)'}}
              />
            </div>

            <CardContent className="relative p-6 sm:p-10">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                  {t('title')}
                </h2>
                <p className="mt-2 max-w-2xl mx-auto text-neutral-600">
                  {t('subtitle')}
                </p>
              </div>

              <form onSubmit={onSubmit} className="mt-6 sm:mt-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <Input
                      type="email"
                      inputMode="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('emailPlaceholder')}
                      className="h-12 pl-9 pr-3 rounded-xl border-neutral-200 focus-visible:ring-brand-400"
                      aria-label="Email"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="h-12 rounded-xl px-6 font-semibold btn-gradient shadow-md"
                  >
                    {status === 'loading' ? '...' : t('cta')}
                  </Button>
                </div>

                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-neutral-500">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>{t('disclaimer')}</span>
                </div>

                {status === 'success' && (
                  <p className="mt-3 text-center text-sm font-medium text-emerald-600">
                    {t('success')}
                  </p>
                )}
                {status === 'error' && (
                  <p className="mt-3 text-center text-sm font-medium text-red-600">
                    {t('error')}
                  </p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
