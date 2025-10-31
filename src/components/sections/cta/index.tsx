'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useMode } from '@/context/mode-context';
import { useTranslations } from 'next-intl';

export default function CTASection() {
  const { mode } = useMode();
  const t = useTranslations('cta');

  // safe getter: returns fallback if key missing, t() throws, or t() returns unresolved key string
  const get = (key: string, fallback = '') => {
    try {
      const val = t(key);
      if (!val || val === key) return fallback;
      // detect unresolved namespaced returns e.g. "cta.customer.title" or it containing 'cta.'
      if (typeof val === 'string' && (val.includes('cta.') || val.startsWith('cta'))) return fallback;
      return val;
    } catch {
      return fallback;
    }
  };

  const ns = mode === 'business' ? 'business' : 'customer';
  const title = get(`${ns}.title`, mode === 'customer' ? 'Start Collecting Rewards Today' : 'Ready to Boost Customer Loyalty?');
  const subtitle = get(`${ns}.subtitle`, '');
  const ctaText = get(`${ns}.cta`, mode === 'customer' ? 'Find Businesses Near Me' : 'Start Your Free Loyalty Program');
  const href = get(`${ns}.href`, mode === 'customer' ? '#directory' : '#get-started');

  return (
    <section aria-labelledby="cta-title" className="relative isolate">
      <div className="cta-gradient">
        <div className="absolute inset-x-0 top-0 h-8 opacity-30 bg-black/10 mix-blend-soft-light pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-8 opacity-30 bg-black/10 mix-blend-soft-light pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-16 sm:py-20 lg:py-24 text-center">
            <h2 id="cta-title" className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              {title}
            </h2>

            {subtitle && (
              <p className="mx-auto mt-4 max-w-3xl text-lg text-white/90">
                {subtitle}
              </p>
            )}

            <div className="mt-8">
              <Button
                asChild
                className="rounded-xl bg-white text-neutral-900 hover:bg-white/90 px-6 py-3 text-sm font-semibold shadow-lg transform transition-transform duration-200 hover:scale-105"
              >
                <a href={href}>{ctaText}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
