// src/i18n/constants.ts
export const APP_LOCALES = ['en', 'de', 'tu', 'ar', 've'] as const;
export type AppLocale = typeof APP_LOCALES[number];
export const DEFAULT_LOCALE: AppLocale = 'en';
export const LOCALE_PREFIX = 'always';

// Human readable labels for UI (Header). Keep these in constants so client can import.
export const LOCALE_LABELS: Record<AppLocale, string> = {
  en: 'English',
  de: 'Deutsch',
  tu: 'Türkçe',
  ar: 'العربية',
  ve: 'Tiếng Việt',
};

// Locales that need RTL direction
export const RTL_LOCALES = new Set<AppLocale>(['ar']);
