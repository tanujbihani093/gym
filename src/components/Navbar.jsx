import { useState } from 'react';
import { useScroll } from '../hooks/useScroll';

export default function Navbar() {
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
                  onClick={() => scrollToSection(link.id)}
                  style={{ color: currentSection === link.id ? 'var(--red)' : '' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button className="nb" onClick={() => scrollToSection('pricing')}>Join Now</button>
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
            onClick={() => scrollToSection(link.id)}
          >
            {link.label}
          </a>
        ))}
        <a href="#pricing" className="br mlink" onClick={() => scrollToSection('pricing')}>Join Now</a>
      </div>
    </>
  );
}
