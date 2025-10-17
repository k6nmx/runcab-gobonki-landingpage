import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "gobonki - Digital Loyalty Cards on Your Phone",
    template: "%s | gobonki",
  },
  description:
    "Never lose rewards again. Keep all your loyalty cards from restaurants, barbers, and cafes in one place. No downloads, no registration, instant rewards.",
  keywords: [
    "digital loyalty cards",
    "rewards app",
    "loyalty program",
    "stamp cards",
    "restaurant rewards",
    "cafe loyalty",
    "mobile wallet",
  ],
  authors: [{ name: "gobonki" }],
  creator: "gobonki",
  publisher: "gobonki",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://runcab-gobonki-landingpage.vercel.app",
    siteName: "gobonki",
    title: "gobonki - Your Phone = Your Loyalty Cards",
    description:
      "Never lose rewards again. Every purchase counts. Works at restaurants, barbers, cafes - no downloads needed.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "gobonki - Digital Loyalty Cards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "gobonki - Your Phone = Your Loyalty Cards",
    description:
      "Never lose rewards again. Every purchase counts. Works at restaurants, barbers, cafes.",
    images: ["/og-image.jpg"],
    creator: "@gobonki",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  alternates: {
    canonical: "https://runcab-gobonki-landingpage.vercel.app",
    languages: {
      en: "https://runcab-gobonki-landingpage.vercel.app/en",
      ar: "https://runcab-gobonki-landingpage.vercel.app/ar",
      de: "https://runcab-gobonki-landingpage.vercel.app/de",
      hi: "https://runcab-gobonki-landingpage.vercel.app/hi",
      tr: "https://runcab-gobonki-landingpage.vercel.app/tu",
      ve: "https://runcab-gobonki-landingpage.vercel.app/ve",
      zh: "https://runcab-gobonki-landingpage.vercel.app/zh",
    },
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { locale: string };
}) {
  const locale = params?.locale || "en";
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>{children}</body>
    </html>
  );
}
