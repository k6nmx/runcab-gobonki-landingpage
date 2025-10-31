import posthog from 'posthog-js';

export const analytics = {
  capture: <T extends Record<string, unknown>>(event: string, properties?: T) => {
    if (typeof window === 'undefined') return;
    posthog.capture(event, properties);
  },

  identify: <T extends Record<string, unknown>>(userId: string, traits?: T) => {
    if (typeof window === 'undefined') return;
    posthog.identify(userId, traits);
  },

  reset: () => {
    if (typeof window === 'undefined') return;
    posthog.reset();
  },
};
