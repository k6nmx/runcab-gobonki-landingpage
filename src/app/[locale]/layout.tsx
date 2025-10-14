import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { defaultLocale, locales, type AppLocale } from '../../i18n/request'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ModeProvider } from '@/context/mode-context'
import '../globals.css'
import { SchemaMarkup } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: {
    default: 'gobonki - Digital Loyalty Cards on Your Phone',
    template: '%s | gobonki'
  },
  description: 'Never lose rewards again. Keep all your loyalty cards from restaurants, barbers, and cafes in one place. No downloads, no registration, instant rewards.',
  keywords: ['digital loyalty cards', 'rewards app', 'loyalty program', 'stamp cards', 'restaurant rewards', 'cafe loyalty', 'mobile wallet'],
  authors: [{ name: 'gobonki' }],
  creator: 'gobonki',
  publisher: 'gobonki',
  
  // Open Graph for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://runcab-gobonki-landingpage.vercel.app',
    siteName: 'gobonki',
    title: 'gobonki - Your Phone = Your Loyalty Cards',
    description: 'Never lose rewards again. Every purchase counts. Works at restaurants, barbers, cafes - no downloads needed.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'gobonki - Digital Loyalty Cards',
      }
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'gobonki - Your Phone = Your Loyalty Cards',
    description: 'Never lose rewards again. Every purchase counts. Works at restaurants, barbers, cafes.',
    images: ['/og-image.jpg'],
    creator: '@gobonki',
  },
  
  // Mobile optimization
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  
  // Theme color for mobile browsers
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
  
  alternates: {
    canonical: 'https://runcab-gobonki-landingpage.vercel.app',
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Build both locales
export function generateStaticParams() {
  return locales.map((l) => ({ locale: l }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale: AppLocale = (locales as readonly string[]).includes(rawLocale)
    ? (rawLocale as AppLocale)
    : defaultLocale

  console.log('[LAYOUT] Locale from params:', locale)
  setRequestLocale(locale)
  const messages = await getMessages()
  console.log('[LAYOUT] Messages keys:', Object.keys(messages))

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <SchemaMarkup />
        <NextIntlClientProvider locale={locale} messages={messages}>

          <ModeProvider>
            <Header />
            <main className="min-h-dvh pt-16">{children}</main>
            <Footer />
          </ModeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
