'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

export default function CTASection() {
  const t = useTranslations('cta')

  return (
    <section aria-labelledby="cta-title" className="relative isolate">
      {/* gradient background */}
      <div className="cta-gradient">
        {/* subtle top/bottom fade so it blends with neighbors */}
        <div className="absolute inset-x-0 top-0 h-8 opacity-30 bg-black/10 mix-blend-soft-light pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-8 opacity-30 bg-black/10 mix-blend-soft-light pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-16 sm:py-20 lg:py-24 text-center">
            <h2 id="cta-title" className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              {t('title')}
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-lg text-white/90">
              {t('subtitle')}
            </p>

            <div className="mt-8">
              <Button
                asChild
                className="rounded-xl bg-white text-neutral-900 hover:bg-white/90 px-6 py-3 text-sm font-semibold shadow-lg"
              >
                <a href={t('href')}>{t('cta')}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
