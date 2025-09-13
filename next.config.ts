import type { NextConfig } from "next";

import withNextIntl from 'next-intl/plugin';

const withNextIntlConfigured = withNextIntl('./src/i18n.ts');

console.log("Next root:", __dirname);


/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
  }
}

export default withNextIntlConfigured(nextConfig);
