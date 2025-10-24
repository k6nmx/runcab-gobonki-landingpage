'use client';

import { useTranslations } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useMode } from '@/context/mode-context';
import { AnimatePresence, motion, useReducedMotion, easeInOut } from 'framer-motion';

type QA = { q: string; a: string };

export default function FAQSection({ className }: { className?: string }) {
  const t = useTranslations('faq');
  const { mode } = useMode();
  const audience = mode === 'customer' ? 'customers' : 'businesses';
  const items = (t.raw(audience) as QA[]) ?? [];

  const prefersReducedMotion = useReducedMotion();

  const motionProps = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
    transition: {
      duration: prefersReducedMotion ? 0 : 0.25,
      ease: easeInOut,
    },
  };

  return (
    <section id="faq" className={cn('relative py-14 sm:py-20', className)}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/60 via-white to-white" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
            {t('title')}
          </h2>
        </div>

        <div className="mt-8 rounded-3xl p-[1px] bg-gradient-to-r from-brand-200 to-secondary-200 ">
          <Card className="rounded-3xl border-none bg-white/80 backdrop-blur">
            <CardContent className="relative p-4 sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={audience} {...motionProps}>
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full divide-y divide-neutral-200 hover:cursor-pointer"
                  >
                    {items.map((item, i) => (
                      <AccordionItem
                        key={i}
                        value={`faq-${audience}-${i}`}
                        className="border-0"
                      >
                        <AccordionTrigger className=" py-4 text-base sm:text-lg font-semibold text-neutral-900 hover:no-underline hover:cursor-pointer">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="pb-5 text-neutral-700 leading-7">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
