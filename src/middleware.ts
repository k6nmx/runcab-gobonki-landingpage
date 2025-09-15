console.log('[MIDDLEWARE] Starting to load...');

import createMiddleware from 'next-intl/middleware';

console.log('[MIDDLEWARE] Imported createMiddleware successfully');

import {locales, defaultLocale, localePrefix} from './i18n/request';

console.log('[MIDDLEWARE] Imported config:', {locales, defaultLocale, localePrefix});

export default createMiddleware({locales, defaultLocale, localePrefix});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
};

console.log('[MIDDLEWARE] Middleware configured');