import { useEffect, useRef } from 'react';

export default function Gallery() {
  const galleryRef = useRef(null);

  useEffect(() => {
    const gsEl = galleryRef.current;
    if (!gsEl) return;

    let isDown = false, startX, scrollLeft;
    
    gsEl.style.cursor = 'grab';
    
    const handleMouseDown = (e) => {
      isDown = true;
      gsEl.style.cursor = 'grabbing';
      startX = e.pageX - gsEl.offsetLeft;
      scrollLeft = gsEl.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      gsEl.style.cursor = 'grab';
    };

    const handleMouseUp = () => {
      isDown = false;
      gsEl.style.cursor = 'grab';
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - gsEl.offsetLeft;
      gsEl.scrollLeft = scrollLeft - (x - startX) * 1.5;
    };

    gsEl.addEventListener('mousedown', handleMouseDown);
    gsEl.addEventListener('mouseleave', handleMouseLeave);
    gsEl.addEventListener('mouseup', handleMouseUp);
    gsEl.addEventListener('mousemove', handleMouseMove);

    gsEl.style.overflowX = 'auto';
    gsEl.style.scrollbarWidth = 'none';

    return () => {
      gsEl.removeEventListener('mousedown', handleMouseDown);
      gsEl.removeEventListener('mouseleave', handleMouseLeave);
      gsEl.removeEventListener('mouseup', handleMouseUp);
      gsEl.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const galleries = [
    { img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&auto=format&fit=crop', label: 'Strength Zone', num: '01' },
    { img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&auto=format&fit=crop', label: 'Cardio Floor', num: '02' },
    { img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop', label: 'Group Training', num: '03' },
    { img: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&auto=format&fit=crop', label: 'Recovery Suite', num: '04' },
  ];

  return (
    <div className="gs">
      <div className="gsi" ref={galleryRef}>
        {galleries.map((item, idx) => (
          <div key={idx} className="gc">
            <img src={item.img} alt={item.label} />
            <div className="gco"></div>
            <div className="gcl">{item.label}</div>
            <div className="gcn">{item.num}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
