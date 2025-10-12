// src/i18n/request.ts  (server-only) — dev-only, minimal logging
import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import fs from 'fs';
import path from 'path';
import { APP_LOCALES, DEFAULT_LOCALE } from './constants';

export const locales = APP_LOCALES;
export type AppLocale = typeof locales[number];
export const defaultLocale: AppLocale = DEFAULT_LOCALE;
export const localePrefix = 'always';

const isDev = process.env.NODE_ENV !== 'production';

function messagesFilePathFor(locale: string) {
  // return path.resolve(process.cwd(), 'messages', `${locale}.json`);
  return `./messages/${locale}.json`;
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

  const safeLocale: AppLocale = locales.includes(actualLocale as AppLocale)
    ? (actualLocale as AppLocale)
    : DEFAULT_LOCALE;

  const candidatePath = messagesFilePathFor(safeLocale);
  if (isDev) console.debug('[I18N] attempting to load messages file =>', candidatePath);

  let messages: Record<string, unknown> | null = null;
  try {
    if (fs.existsSync(candidatePath)) {
      const raw = fs.readFileSync(candidatePath, 'utf8');
      messages = JSON.parse(raw);
      if (isDev && messages) console.debug('[I18N] loaded messages keys =>', Object.keys(messages).slice(0, 20));
    } else {
      if (isDev) console.warn('[I18N] messages file NOT FOUND for', safeLocale, '— falling back to en.json');
    }
  } catch (err) {
    if (isDev) console.error('[I18N] error reading/parsing messages file for', safeLocale, err);
    messages = null;
  }

  if (!messages) {
    const enPath = messagesFilePathFor('en');
    try {
      const raw = fs.readFileSync(enPath, 'utf8');
      messages = JSON.parse(raw);
      if (isDev && messages) console.debug('[I18N] fell back to en.json, keys =>', Object.keys(messages).slice(0, 20));
    } catch (err) {
      if (isDev) console.error('[I18N] failed to load en.json fallback', err);
      messages = {};
    }
  }

  return {
    locale: safeLocale,
    messages,
  };
});
