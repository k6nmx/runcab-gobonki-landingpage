'use client'

import {useState} from 'react'
import {useTranslations} from 'next-intl'
import {Users, Building2} from 'lucide-react'
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion'
import {Card, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {cn} from '@/lib/utils'

type Audience = 'customers' | 'businesses'
type QA = { q: string; a: string }

export default function FAQSection({className}: {className?: string}) {
  const t = useTranslations('faq')
  const [audience, setAudience] = useState<Audience>('customers')

  // next-intl v4: raw access to arrays
  const items = (t.raw(audience) as QA[]) ?? []

  return (
    <section id="faq" className={cn('relative py-14 sm:py-20', className)}>
      {/* SAME background as Newsletter for fluid transition */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/60 via-white to-white" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header + Toggle */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            {t('title')}
          </h2>

          <div className="mt-5 inline-flex rounded-xl bg-white shadow-sm ring-1 ring-neutral-200 p-1">
            <Button
              type="button"
              onClick={() => setAudience('customers')}
              variant={audience === 'customers' ? 'default' : 'ghost'}
              className={cn(
                'rounded-lg px-4 py-2 gap-2',
                audience === 'customers'
                  ? 'btn-gradient text-white shadow'
                  : 'text-neutral-700 hover:bg-neutral-100'
              )}
            >
              <Users className="h-4 w-4" />
              {t('forCustomers')}
            </Button>

            <Button
              type="button"
              onClick={() => setAudience('businesses')}
              variant={audience === 'businesses' ? 'default' : 'ghost'}
              className={cn(
                'rounded-lg px-4 py-2 gap-2',
                audience === 'businesses'
                  ? 'btn-gradient text-white shadow'
                  : 'text-neutral-700 hover:bg-neutral-100'
              )}
            >
              <Building2 className="h-4 w-4" />
              {t('forBusinesses')}
            </Button>
          </div>
        </div>

        {/* Card with subtle gradient border to match site style */}
        <div className="mt-8 rounded-3xl p-[1px] bg-gradient-to-r from-brand-200 to-secondary-200">
          <Card className="rounded-3xl border-none bg-white/80 backdrop-blur">
            {/* hover halo */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 hover:opacity-100">
              <div
                className="absolute -inset-10 rounded-[2.25rem] blur-2xl"
                style={{background: 'radial-gradient(600px 240px at 50% 0%, rgba(14,165,233,.14), transparent 60%)'}}
              />
            </div>

            <CardContent className="relative p-4 sm:p-8">
              <Accordion type="single" collapsible className="w-full divide-y divide-neutral-200">
                {items.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${audience}-${i}`} className="border-0">
                    <AccordionTrigger className="text-left py-4 text-base sm:text-lg font-semibold text-neutral-900 hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-neutral-700 leading-7">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
