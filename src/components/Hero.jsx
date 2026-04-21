import { useRef, useEffect } from 'react';
import { useParticles } from '../hooks/useParticles';

export default function Hero({ onOpenRegister, isRegistered }) {
  const heroRef = useRef(null);
  const hconRef = useRef(null);
  const hbg2Ref = useRef(null);
  useParticles('hc');

  useEffect(() => {
    const handleParallax = () => {
      const st = window.scrollY;
      if (st < window.innerHeight) {
        if (hconRef.current) hconRef.current.style.transform = `translateY(${st * 0.15}px)`;
        if (hbg2Ref.current) hbg2Ref.current.style.transform = `translateY(${st * 0.08}px)`;
      }
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  const handleStartToday = (e) => {
    e.preventDefault();
    if (onOpenRegister) onOpenRegister();
  };

  return (
    <section id="hero" ref={heroRef}>
      <img src="hero.jpg" alt="APEX Gym Hero" className="hero-img" />
      <canvas id="hc"></canvas>
      <div className="hbg2" ref={hbg2Ref}></div>
      <div className="hvl"></div>
      <div className="hhl"></div>
      <div className="hcon" ref={hconRef}>
        <div className="htag"><div className="htd"></div> Premium Fitness Club — Est. 2009</div>
        <h1 className="ht">
          <span className="ln"><span className="wd" style={{ animationDelay: '.6s' }}>TRANSFORM</span></span>
          <span className="ln">
            <span className="wd gh" style={{ animationDelay: '.75s' }}>YOUR</span>
            &nbsp;
            <span className="wd ac" style={{ animationDelay: '.85s' }}>
              <span className="gw" data-text="BODY.">BODY.</span>
            </span>
          </span>
          <span className="ln"><span className="wd" style={{ animationDelay: '1s' }}>ELEVATE</span></span>
          <span className="ln"><span className="wd gh" style={{ animationDelay: '1.1s' }}>YOUR LIFE.</span></span>
        </h1>
        <p className="hd">Where iron meets ambition. Train with elite coaches, world-class facilities, and a community that pushes you beyond every limit you thought you had.</p>
        <div className="ha">
          {isRegistered ? (
            <span className="br" style={{ cursor: 'default', opacity: 0.9 }}>
              <i className="fas fa-check-circle"></i> You're All Set!
            </span>
          ) : (
            <button className="br" id="hero-start-btn" onClick={handleStartToday}>
              <i className="fas fa-bolt"></i> Start Today
            </button>
          )}
          <a href="#services" className="bg">Explore Services <i className="fas fa-arrow-right"></i></a>
        </div>
        <div className="hst">
          <div className="st"><div className="stn">12K<em>+</em></div><div className="stl">Active Members</div></div>
          <div className="st"><div className="stn">48<em>+</em></div><div className="stl">Elite Coaches</div></div>
          <div className="st"><div className="stn">15<em>+</em></div><div className="stl">Years Strong</div></div>
        </div>
      </div>
      <div className="scue"><span>Scroll</span><div className="smouse"></div></div>
    </section>
  );
}
