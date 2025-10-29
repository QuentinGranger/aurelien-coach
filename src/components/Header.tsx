'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Restore body scroll on cleanup
      document.body.style.overflow = 'unset';
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link href="/" className="logo">
          <Image
            src="/images/LogoAurelien-v2.png"
            alt="Aurélien Coach"
            width={180}
            height={50}
            priority
            className="logo__image"
          />
        </Link>

        <nav className={`nav ${isMobileMenuOpen ? 'open mobile-menu-active' : ''}`}>
          <div className="nav__links">
            <Link href="#philosophy" className="nav__link" onClick={() => setIsMobileMenuOpen(false)}>
              Méthode
            </Link>
            <Link href="#programs" className="nav__link" onClick={() => setIsMobileMenuOpen(false)}>
              Programmes
            </Link>
            <Link href="#results" className="nav__link" onClick={() => setIsMobileMenuOpen(false)}>
              Résultats
            </Link>
            <Link href="#box" className="nav__link" onClick={() => setIsMobileMenuOpen(false)}>
              La Box
            </Link>
            <Link href="#contact" className="nav__link" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
          </div>
          
          <div className="nav__cta">
            <Link 
              href="#contact" 
              className="nav__cta-button btn btn--primary btn--full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Réserver une séance
            </Link>
          </div>
        </nav>

        <Link href="#contact" className="header-cta btn btn--primary hidden-mobile">
          Réserver une séance
        </Link>

        <button
          className={`nav-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
