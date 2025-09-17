'use client'
import { useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Users, Building2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SegmentedToggle } from '@/components/ui/segmented-toggle'
import HeroImage from './hero-image'
import { AnimatePresence, motion, easeInOut, useReducedMotion } from 'framer-motion'

type Mode = 'customer' | 'business'

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [mode, setMode] = useState<Mode>('customer')
  const t = useTranslations('hero')
  const nav = useTranslations('navigation')
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => setMounted(true), [])

  const v = useMemo(() => {
    return mode === 'customer'
      ? {
          title: t('customer.title'),
          subtitle: t('customer.subtitle'),
          ctaText: t('customer.cta'),
          ctaHref: '#directory',
          image: '/hero-image2.jpg',
          imageAlt: 'Customers view of participating cafe',
        }
      : {
          title: t('business.title'),
          subtitle: t('business.subtitle'),
          ctaText: t('business.cta'),
          ctaHref: '#get-started',
          image: '/hero-image1.jpg',
          imageAlt: 'Business dashboard / cafe interior',
        }
  }, [mode, t])

  const fadeSlide = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    animate: { opacity: 1, y: 0 },
    exit:    { opacity: 0, y: prefersReducedMotion ? 0 : -12 },
    transition: { duration: 0.25, ease: easeInOut }, // use a valid easing function for ease
  }

  if (!mounted) {
    return (
      <section className="hero-bg pt-2 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center lg:pt-10">
            <div className="inline-flex rounded-full bg-neutral-100 p-1">
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                <Users size={18} />
                <span>{nav('forCustomers')}</span>
              </div>
              <div className="px-4 py-2 text-neutral-600">{nav('forBusinesses')}</div>
            </div>
          </div>
          <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-5xl font-extrabold tracking-tight text-neutral-900 md:text-6xl">
                {t('customer.title')}
              </h1>
              <p className="mt-6 max-w-xl text-lg text-neutral-600">{t('customer.subtitle')}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button className="btn-gradient btn-shadow px-6 py-2.5 text-sm font-semibold rounded-lg">
                  {t('customer.cta')}
                </Button>
                <Button variant="outline" className="px-5 py-2.5 text-sm rounded-lg">
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[720px]">
              <div className="h-[420px] w-full rounded-2xl bg-neutral-200" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="hero-bg pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-24 pb-8 sm:pt-28 sm:pb-12 lg:pt-10">
          {/* Toggle */}
          <div className="flex justify-center">
            <SegmentedToggle
              value={mode}
              onChange={(v) => setMode(v as Mode)}
              options={[
                { value: 'customer', label: <span className="inline-flex items-center gap-2"><Users size={16}/> {nav('forCustomers')}</span> },
                { value: 'business', label: <span className="inline-flex items-center gap-2"><Building2 size={16}/> {nav('forBusinesses')}</span> },
              ]}
              className="shadow-md"
            />
          </div>

          {/* Content */}
          <div className="mt-10 grid items-center gap-10 md:gap-12 lg:gap-16 md:grid-cols-2">
            {/* Left: text (animated) */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode} // re-mount on toggle
                initial="initial"
                animate="animate"
                exit="exit"
                transition={fadeSlide.transition}
                variants={fadeSlide}
              >
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-neutral-900">
                  {mode === 'customer' ? t('customer.title') : t('business.title')}
                </h1>
                <p className="mt-6 max-w-xl text-lg sm:text-xl text-neutral-600">
                  {v.subtitle}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button className="btn-gradient btn-shadow px-6 py-2.5 text-sm font-semibold rounded-lg" asChild>
                    <a href={v.ctaHref}>
                      {v.ctaText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" className="px-5 py-2.5 text-sm rounded-lg" asChild>
                    <a href="#demo">Watch Demo</a>
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right: image (animated) */}
            <div className="mx-auto w-full max-w-[720px]">
              <div className="relative h-[420px] w-full rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={v.image} // swap on image path
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.995 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.005 }}
                    transition={{ duration: 0.28, ease: [0.2, 0.6, 0.2, 1] }}
                  >
                    <HeroImage
                      src={v.image}
                      alt={v.imageAlt}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
