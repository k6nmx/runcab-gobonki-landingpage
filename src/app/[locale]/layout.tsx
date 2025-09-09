// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/app/globals.css";

const locales = ["en", "de"];

export const metadata: Metadata = {
  title: "Gobonki - Digital Stamp Card",
  description: "Create your digital stamp card and turn customers into regulars."
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params; // ← no await

  if (!locale || !locales.includes(locale)) {
    notFound(); // single source of truth for 404
  }

  const messages = await getMessages(); // locale already in routing context

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
