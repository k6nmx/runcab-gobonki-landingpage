// src/hooks/use-scroll-to-section.ts
import { useEffect, useRef } from 'react';
import { parseHash } from '@/lib/hash-utils';

export function useScrollToSection(sectionId: string) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lastHashRef = useRef<string>('');

  useEffect(() => {
    const scrollToSelfIfTarget = () => {
      const currentHash = window.location.hash;
      
      // Only process if hash actually changed
      if (currentHash === lastHashRef.current) return;
      lastHashRef.current = currentHash;

      const { section } = parseHash(currentHash);

      if (section === sectionId && sectionRef.current) {
        requestAnimationFrame(() => {
          sectionRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        });
      }
    };

    // Initial scroll
    scrollToSelfIfTarget();

    // Check periodically (optimized with lastHashRef)
    const intervalId = setInterval(scrollToSelfIfTarget, 100);

    // Also listen to native hashchange
    window.addEventListener('hashchange', scrollToSelfIfTarget);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('hashchange', scrollToSelfIfTarget);
    };
  }, [sectionId]);

  return sectionRef;
}