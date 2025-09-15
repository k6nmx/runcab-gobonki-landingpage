import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export const locales = ['en', 'de'] as const;
export type AppLocale = typeof locales[number];
export const defaultLocale: AppLocale = 'en';
export const localePrefix = 'always';

export default getRequestConfig(async ({ locale }) => {
  console.log('[I18N CONFIG] Received locale:', locale);
  
  // Fallback: extract locale from headers if undefined
  let actualLocale = locale;
  if (!actualLocale) {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '';
    const match = pathname.match(/^\/([a-z]{2})\//);
    actualLocale = match ? match[1] : defaultLocale;
    console.log('[I18N CONFIG] Extracted from path:', actualLocale);
  }

  const safeLocale: AppLocale = locales.includes(actualLocale as AppLocale)
    ? (actualLocale as AppLocale)
    : defaultLocale;
    
  console.log('[I18N CONFIG] Using safeLocale:', safeLocale);
  const messages = (await import(`../../messages/${safeLocale}.json`)).default;
  
  return {
    locale: safeLocale,
    messages
  };
});