'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          theme?: 'light' | 'dark' | 'auto';
        }
      ) => string;
      remove: (widgetId: string) => void;
      reset?: (widgetId: string) => void;
      getResponse?: (widgetId: string) => string | null;
    };
  }
}
export {}; // ensure this file is treated as a module

interface TurnstileProps {
  onVerify: (token: string) => void;
}

export default function Turnstile({ onVerify }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    if (!siteKey) {
      setError('Turnstile not configured. Contact administrator.');
      console.error('NEXT_PUBLIC_TURNSTILE_SITE_KEY is missing');
      return;
    }

    // typed as HTMLScriptElement so we can add listeners safely
    const existingScript = document.querySelector('script[src*="turnstile"]') as
      | HTMLScriptElement
      | null;

    const renderWidget = () => {
      if (!containerRef.current) return;
      if (!window.turnstile) {
        // script hasn't attached the API yet
        return;
      }

      // Remove old widget if it exists
      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch (e) {
          // ignore remove errors
        }
      }

      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: onVerify,
          theme: 'light',
        });
      } catch (e) {
        console.error('Turnstile render error:', e);
        setError('Failed to load security check');
      }
    };

    if (existingScript) {
      if (window.turnstile) {
        renderWidget();
      } else {
        // script element exists but API may not be ready yet
        const onLoad = () => {
          renderWidget();
          existingScript.removeEventListener('load', onLoad);
        };
        existingScript.addEventListener('load', onLoad);
      }
    } else {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;

      script.addEventListener('load', renderWidget);
      script.addEventListener('error', () => {
        setError('Failed to load security check');
      });

      document.body.appendChild(script);
    }

    return () => {
      // cleanup: remove widget and listeners
      try {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        }
      } catch (e) {
        // ignore cleanup errors
      }
    };
  }, [onVerify]);

  if (error) {
    return (
      <div className="text-sm text-red-600 p-2 bg-red-50 rounded">
        {error}
      </div>
    );
  }

  return <div ref={containerRef} className="flex justify-center" />;
}
