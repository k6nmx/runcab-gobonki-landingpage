import { getRequestConfig, GetRequestConfigParams, RequestConfig } from 'next-intl/server';

export const locales = ['en', 'de'] as const;
export type AppLocale = typeof locales[number];
export const defaultLocale: AppLocale = 'en';
export const localePrefix = 'always';

export default getRequestConfig(
  async ({ locale }: GetRequestConfigParams): Promise<RequestConfig> => {
    const safeLocale: AppLocale = locales.includes(locale as AppLocale)
      ? (locale as AppLocale)
      : defaultLocale;
    const messages = (await import(`../messages/${safeLocale}.json`)).default;
    return {
      locale: safeLocale,
      messages
    };
  }
);