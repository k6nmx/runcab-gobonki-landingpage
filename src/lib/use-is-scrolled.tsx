'use client';

import { useEffect, useState } from 'react';

/**
 * Small shared hook: true when user has scrolled past the threshold.
 * Use in Header and Hero so both react to the same scroll state.
 */
export default function useIsScrolled(threshold = 12) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return isScrolled;
}
