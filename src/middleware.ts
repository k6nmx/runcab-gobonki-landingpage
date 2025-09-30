// src/middleware.ts
console.log('[MIDDLEWARE] Starting to load...');

import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix } from './i18n/request';

console.log('[MIDDLEWARE] Imported createMiddleware successfully');
console.log('[MIDDLEWARE] Imported config:', { locales, defaultLocale, localePrefix });

// Create middleware for pages only. We exclude /api, _next, and any file extension.
export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

export const config = {
  // only run middleware for page-like paths, skip /api and _next
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};

console.log('[MIDDLEWARE] Middleware configured');
