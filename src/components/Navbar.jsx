import { useState, useEffect } from 'react';
import { useScroll } from '../hooks/useScroll';

export default function Navbar({ onOpenRegister, onOpenLogin, isLoggedIn, loggedInUser, onLogout }) {
  const { isScrolled, currentSection } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.user-dropdown-container')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showDropdown]);

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
            <div className="user-dropdown-container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <button 
                className="nb" 
                onClick={(e) => { e.stopPropagation(); setShowDropdown(!showDropdown); }} 
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
              >
                <i className="fas fa-user-circle" style={{ fontSize: '1.2rem', color: 'var(--red)' }}></i>
                {loggedInUser}
                <i className={`fas fa-chevron-${showDropdown ? 'up' : 'down'}`} style={{ fontSize: '0.8rem', marginLeft: '0.2rem', color: 'var(--text-light)' }}></i>
              </button>
              
              {showDropdown && (
                <div className="user-dropdown-menu" style={{
                  position: 'absolute',
                  top: '120%',
                  right: '0',
                  background: '#111',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '0.5rem',
                  minWidth: '200px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  animation: 'fadeIn 0.2s ease',
                  zIndex: 100
                }}>
                  <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '0.2rem' }}>Logged in as</div>
                    <div style={{ fontWeight: '600', color: 'var(--white)' }}>{loggedInUser}</div>
                  </div>
                  <button 
                    onClick={() => { setShowDropdown(false); alert('User details panel coming soon!'); }} 
                    style={{ width: '100%', textAlign: 'left', padding: '0.8rem 1rem', background: 'transparent', border: 'none', color: 'var(--text-light)', cursor: 'pointer', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.8rem', transition: 'all 0.2s' }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--white)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-light)'; }}
                  >
                    <i className="fas fa-id-card" style={{ width: '20px', color: 'var(--red)' }}></i> User Details
                  </button>
                  <button 
                    onClick={() => { onLogout(); setShowDropdown(false); }} 
                    style={{ width: '100%', textAlign: 'left', padding: '0.8rem 1rem', background: 'transparent', border: 'none', color: 'var(--text-light)', cursor: 'pointer', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.8rem', transition: 'all 0.2s' }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--white)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-light)'; }}
                  >
                    <i className="fas fa-sign-out-alt" style={{ width: '20px', color: 'var(--red)' }}></i> Logout
                  </button>
                </div>
              )}
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
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', width: '100%', margin: '1rem 0' }}></div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Logged in as: {loggedInUser}</div>
            <button className="br mlink" onClick={() => { setMobileMenuOpen(false); alert('User details panel coming soon!'); }} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              <i className="fas fa-id-card"></i> User Details
            </button>
            <button className="br mlink" onClick={() => { onLogout(); setMobileMenuOpen(false); }} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
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
