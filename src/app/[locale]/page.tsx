import CTASection from '@/components/sections/cta'
import FeaturesSection from '@/components/sections/features/features'
import Hero from '@/components/sections/hero/hero'
import TestimonialsSection from '@/components/sections/testimonials'
import NewsletterSection from '@/components/sections/newsletter'
import FAQSection from '@/components/sections/faq'

export default async function HomePage() {


  return (
    <main>
      <Hero />
      <FeaturesSection />
      <TestimonialsSection />
      <NewsletterSection />
      <FAQSection />
      <CTASection />
    </main>
  )
}
