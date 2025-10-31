'use client'

import { useTranslations } from 'next-intl'
import { useScrollToSection } from '@/hooks/use-scroll-to-section';
import { FeatureCard } from "./feature-card"
import { useMode } from "@/context/mode-context"
import { ICONS } from "./feature-card"

export default function FeaturesSection() {
  const { mode } = useMode()
  const t = useTranslations('features')
  const sectionRef = useScrollToSection('features');

  const namespace = mode === 'customer' ? 'customer' : 'business'

  const title = t(`${namespace}.title`)
  const subtitle = t(`${namespace}.subtitle`)

  // read count from locale (fallback to 6)
  const rawCount = t(`${namespace}.count`)
  const itemsCount = Number(rawCount) || 6

  // build items array by reading indexed keys
  const items = Array.from({ length: itemsCount }).map((_, i) => {
    const iconRaw = t(`${namespace}.items.${i}.icon`) as string
    const validIconKey = Object.prototype.hasOwnProperty.call(ICONS, iconRaw) ? (iconRaw as keyof typeof ICONS) : 'globe'
    const title = t(`${namespace}.items.${i}.title`)
    const description = t(`${namespace}.items.${i}.description`)
    return { icon: validIconKey, title, description }
  })

  return (
    <section id="features" ref={sectionRef} className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              {title}
            </h2>
            <p className="mt-3 text-lg text-neutral-600">
              {subtitle}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {items.map(f => (
              <FeatureCard
                key={f.title}
                icon={f.icon}
                title={f.title}
                description={f.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
