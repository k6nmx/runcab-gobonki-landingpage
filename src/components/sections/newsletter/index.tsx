'use client'

import { useState, useTransition } from 'react'
import { useTranslations, useMessages } from 'next-intl'
import { useScrollToSection } from '@/hooks/use-scroll-to-section';
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMode } from '@/context/mode-context'
import { subscribe } from '@/components/sections/newsletter/actions'
import { motion, AnimatePresence } from 'framer-motion'
import posthog from 'posthog-js'

const clientSchema = z.object({ email: z.string().email() })

export default function NewsletterSection({ className }: { className?: string }) {
  const t = useTranslations('newsletter');
  const sectionRef = useScrollToSection('newsletter');
  const messages = useMessages() as
    | {
        newsletter?: {
          customer?: { benefits?: unknown[] }
          business?: { benefits?: unknown[] }
        }
      }
    | undefined

  const { mode } = useMode()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [email, setEmail] = useState('')
  const [isPending, startTransition] = useTransition()
  const isBusy = status === 'loading' || isPending

  const newsletterMessages = messages?.newsletter ?? {
    customer: { benefits: [] },
    business: { benefits: [] },
  }

  const rawBenefits =
    mode === 'business'
      ? newsletterMessages.business?.benefits ?? []
      : newsletterMessages.customer?.benefits ?? []

  const benefits = Array.isArray(rawBenefits)
    ? rawBenefits
        .map((b) => (typeof b === 'string' ? b : String(b ?? '')))
        .filter(Boolean)
        .slice(0, 3)
    : []

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const parsed = clientSchema.safeParse({ email })
    if (!parsed.success) {
      setStatus('error')
      return
    }

    // Capture attempt before any async operations
    if (typeof window !== 'undefined' && posthog.__loaded) {
      posthog.capture('newsletter_signup_attempted', {
        userType: mode,
        source: 'landing_page_newsletter_section',
      })
    }

    setStatus('loading')

    startTransition(async () => {
      try {
        const formData = new FormData(e.currentTarget)
        formData.set('userType', mode)
        formData.set('email', email)

        const result = await subscribe(formData)
        if (result.ok) {
          // Capture success
          if (typeof window !== 'undefined' && posthog.__loaded) {
            posthog.capture('newsletter_signup_success', {
              userType: mode,
            })
          }
          setStatus('success')
          setEmail('')
        } else {
          // Capture backend failure
          if (typeof window !== 'undefined' && posthog.__loaded) {
            posthog.capture('newsletter_signup_failed', {
              userType: mode,
              reason: 'backend_error',
            })
          }
          console.error('subscribe failed:', result)
          setStatus('error')
        }
      } catch (err) {
        // Capture exception
        if (typeof window !== 'undefined' && posthog.__loaded) {
          posthog.capture('newsletter_signup_error', {
            userType: mode,
            error: err instanceof Error ? err.message : 'unknown',
          })
        }
        console.error('subscribe error:', err)
        setStatus('error')
      }
    })
  }

  return (
    <section id="newsletter" ref={sectionRef} className={cn('relative py-14 sm:py-20', className)}>
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-brand-400 to-secondary-400 shadow-[0_18px_50px_-12px_rgba(14,165,233,0.28)]">
          <Card className="rounded-3xl border-none bg-white/80 backdrop-blur overflow-hidden">
            <CardContent className="relative p-6 sm:p-10">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                  {t('title')}
                </h2>
                <p className="mt-2 max-w-2xl mx-auto text-neutral-600">{t('subtitle')}</p>
              </div>

              {/* Smooth animated content */}
              <div className="mt-6 max-w-md mx-auto text-start text-neutral-700 min-h-[160px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-semibold text-neutral-800">
                      {t(`${mode === 'customer' ? 'customer' : 'business'}.title`)}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2.5 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              <form onSubmit={onSubmit} className="mt-8 max-w-md mx-auto">
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <Input
                      type="email"
                      name="email"
                      inputMode="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('emailPlaceholder')}
                      className="h-12 pl-9 pr-3 rounded-xl bg-white border-neutral-200 focus-visible:ring-brand-400"
                      aria-label="Email"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isBusy}
                    className="h-12 w-full sm:w-auto rounded-xl px-5 font-semibold btn-gradient shadow-md hover:cursor-pointer"
                  >
                    <span className="mr-2">{t('cta')}</span>
                    <ArrowRight className="h-4 w-4" />
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
  )
    </section>
)}