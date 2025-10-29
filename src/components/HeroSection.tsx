'use client';

import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero__background">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
        >
          <source src="/videos/video-header.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="hero__content">
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Le sport pour <span className="highlight">tous</span>
          <br />
          Votre potentiel sans <span className="highlight">limites</span>
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Que vous soyez débutant ou athlète confirmé, découvrez une approche personnalisée qui s'adapte à vous.
        </motion.p>

        <motion.div
          className="hero__cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a href="#contact" className="btn btn--primary btn--lg cta-button">
            Réserver une séance
          </a>
          <a href="#philosophy" className="btn btn--secondary btn--lg">
            Découvrir la méthode
          </a>
        </motion.div>
      </div>

      <div className="hero__scroll-indicator"></div>
    </section>
  );
};

export default HeroSection;
