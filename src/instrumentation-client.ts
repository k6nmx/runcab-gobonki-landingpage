export async function register() {
  // This runs on both server and client
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side initialization (if needed)
    return;
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime (if needed)
    return;
  }

  // Client-side initialization
  if (typeof window !== 'undefined') {
    const { default: posthog } = await import('posthog-js');
    
    // Only init in production
    if (process.env.NODE_ENV === 'production') {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: '/ingest',
        ui_host: 'https://eu.posthog.com',
        capture_pageview: true,
        capture_pageleave: true,
      });
    }
    
  }
}

