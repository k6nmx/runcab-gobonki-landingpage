console.log('[MIDDLEWARE] Starting to load...');

import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix } from './i18n/request';

console.log('[MIDDLEWARE] Imported createMiddleware successfully');
console.log('[MIDDLEWARE] Imported config:', { locales, defaultLocale, localePrefix });


export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

export const config = {
  matcher: ['/((?!_next|api|privacy|imprint|.*\\..*).*)'],
};

console.log('[MIDDLEWARE] Middleware configured');
