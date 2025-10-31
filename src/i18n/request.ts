
import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { APP_LOCALES, DEFAULT_LOCALE } from './constants';

export const locales = APP_LOCALES;
export type AppLocale = typeof locales[number];
export const defaultLocale: AppLocale = DEFAULT_LOCALE;
export const localePrefix = 'always';

const isDev = process.env.NODE_ENV !== 'production';

type MessagesDictionary = Record<string, unknown>;

async function loadMessagesForLocale(locale: AppLocale): Promise<MessagesDictionary> {
  const landingPageMessages = (await import(`@/../messages/${locale}/landingpage.json`)).default;
  const contactMessages = (await import(`@/../messages/${locale}/contact.json`)).default;
  return { ...landingPageMessages, contact: contactMessages };
}

function isAppLocale(locale: string | null | undefined): locale is AppLocale {
  return typeof locale === 'string' && locales.includes(locale as AppLocale);
}

async function loadMessages(locale: AppLocale): Promise<MessagesDictionary> {
  try {
    const messages = await loadMessagesForLocale(locale);
    return messages;
  } catch (error) {
    if (isDev) console.error('[I18N] failed to load messages for', locale, error);
    if (locale !== DEFAULT_LOCALE) {
      if (isDev) console.warn('[I18N] falling back to default locale messages');
      return loadMessagesForLocale(DEFAULT_LOCALE);
    }
    return {};
  }
}

export default getRequestConfig(async ({ locale }) => {

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

  const messages = await loadMessages(safeLocale);

  return {
    locale: safeLocale,
    messages,
  };
});
