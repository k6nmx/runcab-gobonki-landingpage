'use client'

import { useTranslations } from 'next-intl'
import { useScrollToSection } from '@/hooks/use-scroll-to-section';
import { TestimonialCard } from "./testimonial-card"
import { useMode } from "@/context/mode-context"

type NormalizedTestimonial = {
  rating: number
  quote: string
  author: string
  role: string
}

export default function TestimonialsSection() {
  const { mode } = useMode()
  const t = useTranslations('testimonials')
  const sectionRef = useScrollToSection('testimonials');

  // Get title based on mode
  const title = mode === 'business' ? t('businessTitle') : t('customerTitle')

  // Get the correct testimonials array based on mode
  const modeKey = mode === 'business' ? 'business' : 'customer'
  
  // Read count from translations
  const countRaw = t(`${modeKey}.count`)
  const count = parseInt(countRaw, 10) || 0

  // Build items array by reading from correct nested structure
  const items: NormalizedTestimonial[] = []
  
  for (let i = 0; i < count; i++) {
    const base = `${modeKey}.items.${i}`
    
    // Read rating
    const ratingRaw = t(`${base}.rating`)
    const rating = parseInt(ratingRaw, 10) || 0
    
    // Read quote
    const quote = t(`${base}.quote`)
    
    // Read author
    const author = t(`${base}.author`) || 'Anonymous'
    
    // Read role or location (customer mode uses location, business uses role)
    let role = ''
    if (mode === 'business') {
      role = t(`${base}.role`) || '—'
    } else {
      role = t(`${base}.location`) || '—'
    }
    
    items.push({
      rating,
      quote,
      author,
      role
    })
  }

  return (
    <section id="testimonials" ref={sectionRef} className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-brand-50/70 to-white" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
              {title}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {items.map((item, i) => (
              <TestimonialCard
                key={i}
                rating={item.rating}
                quote={item.quote}
                author={item.author}
                role={item.role}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}