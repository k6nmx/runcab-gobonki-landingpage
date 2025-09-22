// app/[locale]/layout.tsx
import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {locales, type AppLocale} from '../../i18n/request';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../globals.css';

export const metadata: Metadata = {
  title: 'gobonki - Digital Stamp Card',
  description: 'Create your digital stamp card and turn customers into regulars.',
  icons: {
    icon: '/vercel.svg', // or '/icon.png', '/icon.svg'
  },
};

// Build both locales
export function generateStaticParams() {
  return locales.map((l) => ({locale: l}));
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: AppLocale}>;
}) {
  const {locale} = await params;
  console.log('[LAYOUT] Locale from params:', locale);
  setRequestLocale(locale);
  const messages = await getMessages();
  console.log('[LAYOUT] Messages keys:', Object.keys(messages));

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="min-h-dvh pt-16">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
