// app/sitemap.ts

import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `${process.env.APPBASEURL}`;
  const currentDate = new Date()

  // Your supported locales
  const locales = ['en', 'ar', 'es', 'fr', 'de', 'it', 'ja', 'ko', 'pt', 'ru', 'zh']
  
  // Generate entries for each locale
  const localeUrls = locales.map(locale => ({
    url: `${baseUrl}/${locale}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: locale === 'en' ? 1 : 0.9,
  }))

  return [
    // Root redirect
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Locale-specific pages
    ...localeUrls,
  ]
}