import CTASection from '@/components/sections/cta'
import FeaturesSection from '@/components/sections/features/features'
import Hero from '@/components/sections/hero/hero'
import TestimonialsSection from '@/components/sections/testimonials'
import { getTranslations } from 'next-intl/server'
import NewsletterSection from '@/components/sections/newsletter'
import FAQSection from '@/components/sections/faq'
import { ModeProvider } from '@/context/mode-context'

export default async function HomePage() {
  const t = await getTranslations('navigation')
  console.log('[SERVER] Current locale messages - features:', t('features'))
  
  return (
    <ModeProvider>
      <main>
        <Hero />
        <FeaturesSection />
        <TestimonialsSection />
        <NewsletterSection />
        <FAQSection />
        <CTASection />
      </main>
    </ModeProvider>
  )
}