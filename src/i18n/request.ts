// src/i18n/request.ts  (server-only) — diagnostic + safer
import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import fs from 'fs';
import path from 'path';
import { APP_LOCALES, DEFAULT_LOCALE } from './constants';

export const locales = APP_LOCALES;
export type AppLocale = typeof locales[number];
export const defaultLocale: AppLocale = DEFAULT_LOCALE;
export const localePrefix = 'always';

function messagesFilePathFor(locale: string) {
  return path.resolve(process.cwd(), 'messages', `${locale}.json`);
}

export default getRequestConfig(async ({ locale }) => {
  console.log('[I18N CONFIG] param locale =>', locale);

  // If NextIntl provides the locale param, prefer it — do not read headers.
  let actualLocale = locale;

  // If locale param is missing, inspect headers (and log everything)
    // If locale param is missing, inspect headers (and prefer explicit signals)
  if (!actualLocale) {
    const headersList = await headers();

    // log headers for visibility (keep this while debugging)
    try {
      const allHeaders: Record<string, string> = {};
      for (const [k, v] of headersList.entries()) {
        allHeaders[k] = v ?? '';
      }
      console.log('[I18N CONFIG] Incoming headers ->', allHeaders);
    } catch (err) {
      console.warn('[I18N CONFIG] Failed to enumerate headers', err);
    }

    // 1) Prefer x-next-intl-locale if present (set by next-intl middleware)
    const xNextIntl = headersList.get('x-next-intl-locale');
    if (xNextIntl) {
      console.log('[I18N CONFIG] using x-next-intl-locale header ->', xNextIntl);
      actualLocale = xNextIntl;
    } else {
      // 2) Try NEXT_LOCALE cookie if available
      const cookieHeader = headersList.get('cookie') || '';
      const matchCookie = cookieHeader.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
      if (matchCookie && matchCookie[1]) {
        console.log('[I18N CONFIG] using NEXT_LOCALE cookie ->', matchCookie[1]);
        actualLocale = matchCookie[1];
      } else {
        // 3) last resort: attempt extracting from pathname-like headers
        const pathname = headersList.get('x-pathname') || headersList.get('x-url') || '';
        console.log('[I18N CONFIG] header-derived pathname ->', pathname);
        const match = pathname.match(/^\/([a-z]{2})\//);
        actualLocale = match ? match[1] : DEFAULT_LOCALE;
        console.log('[I18N CONFIG] extracted locale from header/path ->', actualLocale);
      }
    }
  } else {
    console.log('[I18N CONFIG] using provided locale param ->', actualLocale);
  }


  const safeLocale: AppLocale = locales.includes(actualLocale as AppLocale)
    ? (actualLocale as AppLocale)
    : DEFAULT_LOCALE;

  const candidatePath = messagesFilePathFor(safeLocale);
  console.log('[I18N CONFIG] attempting to load messages file =>', candidatePath);

  let messages: Record<string, unknown> | null = null;
  try {
    if (fs.existsSync(candidatePath)) {
      const raw = fs.readFileSync(candidatePath, 'utf8');
      messages = JSON.parse(raw);
      console.log('[I18N CONFIG] loaded messages keys =>', Object.keys(messages ?? {}).slice(0, 20));
    } else {
      console.warn('[I18N CONFIG] messages file NOT FOUND for', safeLocale, 'falling back to en.json');
    }
  } catch (err) {
    console.error('[I18N CONFIG] error reading/parsing messages file for', safeLocale, err);
    messages = null;
  }

  if (!messages) {
    const enPath = messagesFilePathFor('en');
    try {
      const raw = fs.readFileSync(enPath, 'utf8');
      messages = JSON.parse(raw);
      console.log('[I18N CONFIG] fell back to en.json, keys =>', Object.keys(messages ?? {}).slice(0, 20));
    } catch (err) {
      console.error('[I18N CONFIG] failed to load en.json fallback', err);
      messages = {};
    }
  }

  return {
    locale: safeLocale,
    messages,
  };
});
