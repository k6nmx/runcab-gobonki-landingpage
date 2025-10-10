// src/i18n/request.ts (server-only)
import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { APP_LOCALES, DEFAULT_LOCALE } from './constants';

export const locales = APP_LOCALES;
export type AppLocale = typeof locales[number];
export const defaultLocale: AppLocale = DEFAULT_LOCALE;
export const localePrefix = 'always';

export default getRequestConfig(async ({ locale }) => {
  // ... your existing logic unchanged
  let actualLocale = locale;
  if (!actualLocale) {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '';
    const match = pathname.match(/^\/([a-z]{2})\//);
    actualLocale = match ? match[1] : defaultLocale;
  }

  const safeLocale: AppLocale = locales.includes(actualLocale as AppLocale)
    ? (actualLocale as AppLocale)
    : defaultLocale;

  const messages = (await import(`../../messages/${safeLocale}.json`)).default;

  return {
    locale: safeLocale,
    messages
  };
});
