import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix } from './i18n/request';


export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - /api/* (API routes)
     * - /ingest/* (PostHog)
     * - /_next/* (Next.js internals)
     * - /privacy, /imprint (static pages)
     * - Static files (*.ico, *.png, etc.)
     */
    '/((?!api/|ingest/|_next/|privacy|imprint|.*\\..*).*)',
  ],
};
