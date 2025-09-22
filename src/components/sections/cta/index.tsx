'use client'

import { Button } from '@/components/ui/button'
import { useMode } from '@/context/mode-context'

export default function CTASection() {
  const { mode } = useMode()
  
  const content = mode === 'customer' ? {
    title: 'Start Collecting Rewards Today',
    subtitle: 'Join thousands of smart shoppers who never miss out on rewards. Find participating businesses near you and start earning instantly.',
    cta: 'Find Businesses Near Me',
    href: '#directory'
  } : {
    title: 'Ready to Boost Customer Loyalty?',
    subtitle: 'Join hundreds of businesses using gobonki to increase repeat customers and drive revenue. Set up your loyalty program in minutes.',
    cta: 'Start Your Free Trial',
    href: '#get-started'
  }

  return (
    <section aria-labelledby="cta-title" className="relative isolate">
      <div className="cta-gradient">
        <div className="absolute inset-x-0 top-0 h-8 opacity-30 bg-black/10 mix-blend-soft-light pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-8 opacity-30 bg-black/10 mix-blend-soft-light pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-16 sm:py-20 lg:py-24 text-center">
            <h2 id="cta-title" className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              {content.title}
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-lg text-white/90">
              {content.subtitle}
            </p>

            <div className="mt-8">
              <Button
                asChild
                className="rounded-xl bg-white text-neutral-900 hover:bg-white/90 px-6 py-3 text-sm font-semibold shadow-lg"
              >
                <a href={content.href}>{content.cta}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}