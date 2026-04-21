import { useEffect, useRef } from 'react';

export const useScrollProgress = () => {
  const progressRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (progressRef.current) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressRef.current.style.width = scrollPercent + '%';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progressRef;
};
