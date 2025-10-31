import type { NextConfig } from "next";
import withNextIntl from 'next-intl/plugin';

const withNextIntlConfigured = withNextIntl();

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,

  images: {
    domains: ['localhost'],
  },
  
  async rewrites() {
    return [
      // WITHOUT locale prefix (for direct PostHog requests)
      {
        source: '/ingest/static/:path*',
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://eu.i.posthog.com/:path*',
      },
      
      // WITH locale prefix (for when next-intl adds it)
      {
        source: '/:locale/ingest/static/:path*',
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/:locale/ingest/:path*',
        destination: 'https://eu.i.posthog.com/:path*',
      },
    ];
  },
}

export default withNextIntlConfigured(nextConfig);