import { useState, useEffect, useCallback } from 'react';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Marquee from './components/Marquee';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Services from './components/Services';
import Counter from './components/Counter';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import RegisterForm from './components/RegisterForm';
import './App.css';

function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(() => {
    return localStorage.getItem('apex_registered') === 'true';
  });
  const [registeredName, setRegisteredName] = useState(() => {
    return localStorage.getItem('apex_user_name') || '';
  });

  const openRegister = useCallback(() => {
    setIsRegisterOpen(true);
  }, []);

  const closeRegister = useCallback(() => {
    setIsRegisterOpen(false);
  }, []);

  const handleRegistrationComplete = useCallback((firstName) => {
    setIsRegistered(true);
    setRegisteredName(firstName);
    localStorage.setItem('apex_registered', 'true');
    localStorage.setItem('apex_user_name', firstName);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isRegisterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isRegisterOpen]);

  useEffect(() => {
    // Handle smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', handleAnchorClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  useEffect(() => {
    // Add tilt effect to cards on hover
    if (window.innerWidth > 768) {
      const handleTilt = (card) => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -4;
          const rotateY = ((x - centerX) / centerX) * 4;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      };

      document.querySelectorAll('.sc2, .pl, .tc2').forEach(handleTilt);
    }
  }, []);

  useEffect(() => {
    // Add magnetic button effect
    if (window.innerWidth > 768) {
      const handleMagnetic = (btn) => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.transform = '';
        });
      };

      document.querySelectorAll('.br, .bg, .nb').forEach(handleMagnetic);
    }
  }, []);

  useEffect(() => {
    // Add scroll reveal effect
    const revealElements = document.querySelectorAll('.rx');
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('vis');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach((el) => revealObs.observe(el));

    return () => revealObs.disconnect();
  }, []);

  return (
    <div className="app">
      <Loader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar onOpenRegister={openRegister} isRegistered={isRegistered} registeredName={registeredName} />
      <Hero onOpenRegister={openRegister} isRegistered={isRegistered} />
      <Marquee />
      <About />
      <Gallery />
      <Services />
      <Counter />
      <Pricing onOpenRegister={openRegister} isRegistered={isRegistered} />
      <Testimonials />
      <CTA onOpenRegister={openRegister} isRegistered={isRegistered} />
      <Footer />
      <RegisterForm isOpen={isRegisterOpen} onClose={closeRegister} onRegistrationComplete={handleRegistrationComplete} />
    </div>
  );
}

export default App;
