import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { defaultLocale, locales, type AppLocale } from '../../i18n/request'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ModeProvider } from '@/context/mode-context'
import '../globals.css'

export const metadata: Metadata = {
  title: 'gobonki - Digital Stamp Card',
  description: 'Create your digital stamp card and turn customers into regulars.',
  icons: {
    icon: '/vercel.svg',
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
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* ✅ Wrap the entire app shell inside ModeProvider */}
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
