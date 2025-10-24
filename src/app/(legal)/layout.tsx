import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { defaultLocale, locales, type AppLocale } from '../../i18n/request'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ModeProvider } from '@/context/mode-context'
import { IsScrolledProvider } from '@/context/is-scrolled-context'
import '../globals.css'
import { SchemaMarkup } from '@/components/SchemaMarkup'

export default async function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = defaultLocale;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <SchemaMarkup />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ModeProvider>
            <IsScrolledProvider>
              <Header />
              <main className="">{children}</main>
              <Footer />
            </IsScrolledProvider>
          </ModeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}