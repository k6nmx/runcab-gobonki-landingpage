'use client';

import { useEffect, useState } from 'react';

/**
 * Small shared hook: true when user has scrolled past the threshold.
 * Use in Header and Hero so both react to the same scroll state.
 */
export default function useIsScrolled() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
  const threshold = window.innerHeight * 0.1;
  
  const handleScroll = () => {
    setIsScrolled(window.scrollY > threshold);
  };
  
  handleScroll(); // Check on mount
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return isScrolled;
}
