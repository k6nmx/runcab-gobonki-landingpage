import CTASection from '@/components/sections/cta'
import FeaturesSection from '@/components/sections/features/features'
import Hero from '@/components/sections/hero/hero'
import TestimonialsSection from '@/components/sections/testimonials'


export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}