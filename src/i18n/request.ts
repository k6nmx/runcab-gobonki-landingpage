// src/i18n/request.ts  (server-only) — dev-only, minimal logging
import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { APP_LOCALES, DEFAULT_LOCALE } from './constants';

export const locales = APP_LOCALES;
export type AppLocale = typeof locales[number];
export const defaultLocale: AppLocale = DEFAULT_LOCALE;
export const localePrefix = 'always';

const isDev = process.env.NODE_ENV !== 'production';

type MessagesDictionary = Record<string, unknown>;

const MESSAGE_LOADERS: Record<AppLocale, () => Promise<MessagesDictionary>> = {
  en: async () => (await import('@/../messages/en.json')).default,
  de: async () => (await import('@/../messages/de.json')).default,
  tu: async () => (await import('@/../messages/tu.json')).default,
  ar: async () => (await import('@/../messages/ar.json')).default,
  ve: async () => (await import('@/../messages/ve.json')).default,
  zh: async () => (await import('@/../messages/zh.json')).default,
};

function isAppLocale(locale: string | null | undefined): locale is AppLocale {
  return typeof locale === 'string' && locales.includes(locale as AppLocale);
}

async function loadMessages(locale: AppLocale): Promise<MessagesDictionary> {
  const loader = MESSAGE_LOADERS[locale] ?? MESSAGE_LOADERS[DEFAULT_LOCALE];

  if (!loader) {
    if (isDev) console.warn('[I18N] No loader found for locale', locale);
    return {};
  }

  try {
    const messages = await loader();
    if (isDev) console.debug('[I18N] loaded messages keys =>', Object.keys(messages).slice(0, 20));
    return messages;
  } catch (error) {
    if (isDev) console.error('[I18N] failed to load messages for', locale, error);
    if (locale !== DEFAULT_LOCALE) {
      if (isDev) console.warn('[I18N] falling back to default locale messages');
      return loadMessages(DEFAULT_LOCALE);
    }
    return {};
  }
}

export default getRequestConfig(async ({ locale }) => {
  if (isDev) console.debug('[I18N] request param locale =>', locale);

  // Prefer explicit param
  let actualLocale = locale;

  if (!actualLocale) {
    const headersList = await headers();

    // Prefer authoritative signals in order: x-next-intl-locale -> NEXT_LOCALE cookie -> pathname
    const xNextIntl = headersList.get('x-next-intl-locale');
    if (xNextIntl) {
      actualLocale = xNextIntl;
      if (isDev) console.debug('[I18N] using x-next-intl-locale header ->', actualLocale);
    } else {
      const cookieHeader = headersList.get('cookie') || '';
      const matchCookie = cookieHeader.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
      if (matchCookie && matchCookie[1]) {
        actualLocale = matchCookie[1];
        if (isDev) console.debug('[I18N] using NEXT_LOCALE cookie ->', actualLocale);
      } else {
        const pathname = headersList.get('x-pathname') || headersList.get('x-url') || '';
        const match = pathname.match(/^\/([a-z]{2})\//);
        actualLocale = match ? match[1] : DEFAULT_LOCALE;
        if (isDev) console.debug('[I18N] derived locale from path ->', actualLocale);
      }
    }
  } else {
    if (isDev) console.debug('[I18N] using provided locale param ->', actualLocale);
  }

  const safeLocale: AppLocale = isAppLocale(actualLocale) ? actualLocale : defaultLocale;

  if (isDev) console.debug('[I18N] loading messages for locale =>', safeLocale);

  const messages = await loadMessages(safeLocale);

  return {
    locale: safeLocale,
    messages,
  };
});
