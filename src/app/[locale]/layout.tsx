import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { defaultLocale, locales, type AppLocale } from '../../i18n/request'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ModeProvider } from '@/context/mode-context';
import { IsScrolledProvider } from '@/context/is-scrolled-context';
import '../globals.css';
import { SchemaMarkup } from '@/components/SchemaMarkup'


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
    <>
      <SchemaMarkup />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ModeProvider>
          <IsScrolledProvider>
            <Header />
            <main className="min-h-dvh pt-16">{children}</main>
            <Footer />
          </IsScrolledProvider>
        </ModeProvider>
      </NextIntlClientProvider>
    </>
  );
}
