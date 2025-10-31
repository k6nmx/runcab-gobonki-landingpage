"use client";

import { useEffect, useState } from "react";

export function SchemaMarkup() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "gobonki",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1247",
      bestRating: "5",
      worstRating: "1",
    },
    description:
      "Digital loyalty cards app that helps you never lose rewards again. Keep all your loyalty cards from restaurants, barbers, and cafes in one place.",
    featureList: [
      "All loyalty cards in one place",
      "Instant rewards redemption",
      "No registration required",
      "Automatic stamp saving",
      "Smart notifications",
      "Find participating businesses",
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "gobonki",
    url: process.env.APPBASEURL,
    logo: `${process.env.APPBASEURL}/logo.png`,
    sameAs: [
      // Add your social media profiles
      // 'https://twitter.com/gobonki',
      // 'https://facebook.com/gobonki',
      // 'https://instagram.com/gobonki',
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["English", "Arabic"],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}