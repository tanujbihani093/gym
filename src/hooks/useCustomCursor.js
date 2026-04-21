import { useEffect, useRef } from 'react';

export const useCustomCursor = () => {
  const pbRef = useRef(null);
  const coRef = useRef(null);
  const posRef = useRef({ mx: 0, my: 0, cx: 0, cy: 0 });

  useEffect(() => {
    const pb = document.getElementById('pb');
    const co = document.getElementById('co');

    if (!pb || !co || window.innerWidth <= 768) return;

    pbRef.current = pb;
    coRef.current = co;

    const handleMouseMove = (e) => {
      posRef.current.mx = e.clientX;
      posRef.current.my = e.clientY;
      pb.style.left = posRef.current.mx + 'px';
      pb.style.top = posRef.current.my + 'px';
    };

    document.addEventListener('mousemove', handleMouseMove);

    const animCursor = () => {
      posRef.current.cx += (posRef.current.mx - posRef.current.cx) * 0.12;
      posRef.current.cy += (posRef.current.my - posRef.current.cy) * 0.12;
      co.style.left = posRef.current.cx + 'px';
      co.style.top = posRef.current.cy + 'px';
      requestAnimationFrame(animCursor);
    };

    const animFrameId = requestAnimationFrame(animCursor);

    // Hover effects on interactive elements
    const handleInteractiveHover = (el) => {
      el.addEventListener('mouseenter', () => {
        if (pb && co) {
          pb.style.width = '0px';
          pb.style.height = '0px';
          co.style.width = '56px';
          co.style.height = '56px';
          co.style.borderColor = 'rgba(232,34,46,0.8)';
        }
      });
      el.addEventListener('mouseleave', () => {
        if (pb && co) {
          pb.style.width = '8px';
          pb.style.height = '8px';
          co.style.width = '36px';
          co.style.height = '36px';
          co.style.borderColor = 'rgba(232,34,46,0.5)';
        }
      });
    };

    document.querySelectorAll('a, button, .sc2, .pl, .tc2, .gc').forEach(handleInteractiveHover);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animFrameId);
    };
  }, []);
};
