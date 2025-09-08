import {getRequestConfig, GetRequestConfigParams, RequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'de'];

export default getRequestConfig(async ({ locale }: GetRequestConfigParams): Promise<RequestConfig> => {
  if (!locale || !locales.includes(locale)) notFound()
    return{
      locale,
      messages: (await import(`../messages/${locale}.json`)).default
  };
});