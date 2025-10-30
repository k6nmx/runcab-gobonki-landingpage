import { useEffect, useRef } from 'react';
import { parseHash } from '@/lib/hash-utils';

export function useScrollToSection(sectionId: string) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollToSelfIfTarget = () => {
      const { section } = parseHash(window.location.hash);
      
      // Only scroll if this section is the target
      if (section === sectionId && sectionRef.current) {
        // Use requestAnimationFrame to ensure DOM is painted
        requestAnimationFrame(() => {
          if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start'
            });
          }
        });
      }
    };
    
    // Scroll on initial mount (handles page load with hash)
    scrollToSelfIfTarget();
    
    // Listen for hash changes (handles navigation)
    window.addEventListener('hashchange', scrollToSelfIfTarget);
    
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('hashchange', scrollToSelfIfTarget);
    };
  }, [sectionId]);
  
  return sectionRef;
}
