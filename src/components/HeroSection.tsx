'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Force video play immediately on load
    const forceVideoPlay = async () => {
      if (videoRef.current) {
        try {
          // Set video properties for better mobile compatibility
          videoRef.current.muted = true;
          videoRef.current.playsInline = true;
          
          // Force play with multiple attempts
          await videoRef.current.play();
          setVideoLoaded(true);
        } catch (error) {
          console.log('Autoplay attempt failed, will retry on interaction');
          
          // Retry on any user interaction
          const retryPlay = async () => {
            try {
              await videoRef.current?.play();
              setVideoLoaded(true);
            } catch (e) {
              console.log('Manual play failed');
            }
          };

          document.addEventListener('touchstart', retryPlay, { once: true });
          document.addEventListener('click', retryPlay, { once: true });
        }
      }
    };

    // Small delay to ensure video is loaded
    const timer = setTimeout(forceVideoPlay, 100);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero__background">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload={isMobile ? "metadata" : "auto"}
          poster="/images/PhotoAurelien.png"
          onLoadedData={() => setVideoLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="/videos/video-dent-tête.mp4" type="video/mp4" />
          {/* Fallback for very old browsers */}
          Votre navigateur ne supporte pas les vidéos HTML5.
        </video>
        
        {/* Fallback: show play button only if video really fails to load */}
        {!videoLoaded && (
          <div className="hero__play-overlay">
            <button 
              className="hero__play-button"
              onClick={async () => {
                if (videoRef.current) {
                  try {
                    await videoRef.current.play();
                    setVideoLoaded(true);
                  } catch (e) {
                    console.log('Manual play failed');
                  }
                }
              }}
              aria-label="Lancer la vidéo"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>
        )}
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
