import { useState } from 'react';
import { useScroll } from '../hooks/useScroll';

export default function Navbar({ onOpenRegister, onOpenLogin, isLoggedIn, loggedInUser, onLogout }) {
  const { isScrolled, currentSection } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleJoinNow = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onOpenRegister) onOpenRegister();
  };

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'testimonials', label: 'Stories' },
  ];

  return (
    <>
      <nav id="nav" className={isScrolled ? 'scrolled' : ''}>
        <div className="ni">
          <a href="#" className="logo">APEX<em>.</em></a>
          <ul className="nl">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                  style={{ color: currentSection === link.id ? 'var(--red)' : '' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="nb registered-badge" id="welcome-badge">
                <i className="fas fa-user-circle" style={{ marginRight: '0.4rem', color: '#4caf50' }}></i>
                {loggedInUser}
              </span>
              <button className="nb" onClick={onLogout} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>Logout</button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button className="nb" onClick={(e) => { e.preventDefault(); if(onOpenLogin) onOpenLogin(); }} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>Login</button>
              <button className="nb" id="join-now-btn" onClick={handleJoinNow}>Join Now</button>
            </div>
          )}
          <button
            className="hbg"
            id="hbg-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mm ${mobileMenuOpen ? 'open' : ''}`} id="mm">
        <button className="mc" onClick={() => setMobileMenuOpen(false)}>
          <i className="fas fa-times"></i>
        </button>
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="mlink"
            onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
          >
            {link.label}
          </a>
        ))}
        {isLoggedIn ? (
          <>
            <span className="br mlink registered-badge" style={{ marginTop: '1rem' }}>
              <i className="fas fa-user-circle" style={{ marginRight: '0.4rem' }}></i>
              {loggedInUser}
            </span>
            <button className="br mlink" onClick={() => { onLogout(); setMobileMenuOpen(false); }} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', marginTop: '0.5rem' }}>Logout</button>
          </>
        ) : (
          <>
            <button className="br mlink" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); if(onOpenLogin) onOpenLogin(); }} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', marginTop: '1rem' }}>Login</button>
            <button className="br mlink" id="join-now-mobile-btn" onClick={handleJoinNow} style={{ marginTop: '0.5rem' }}>Join Now</button>
          </>
        )}
      </div>
    </>
  );
}
