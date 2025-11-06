'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { useReviews } from '@/contexts/ReviewsContext';
import ReviewSubmissionModal from './ReviewSubmissionModal';

const ResultsSection = () => {
  const { getActiveReviews } = useReviews();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Récupérer les avis actifs depuis le contexte
  const testimonials = getActiveReviews();

  const stats = [
    { number: "500+", label: "Athlètes transformés", description: "Depuis 2018" },
    { number: "95%", label: "Taux de satisfaction", description: "Objectifs atteints" },
    { number: "15kg", label: "Gain moyen en force", description: "Sur 12 semaines" },
    { number: "8%", label: "Perte de masse grasse", description: "Moyenne programme" }
  ];


  const nextTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }
  };

  const prevTestimonial = () => {
    if (testimonials.length > 0) {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startX.current) return;
    
    const currentX = e.touches[0].clientX;
    const diffX = startX.current - currentX;
    
    // Prevent default scrolling
    if (Math.abs(diffX) > 10) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!startX.current) return;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = startX.current - endX;
    
    // Minimum swipe distance
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swipe left - next testimonial
        nextTestimonial();
      } else {
        // Swipe right - previous testimonial
        prevTestimonial();
      }
    }
    
    startX.current = 0;
  };

  return (
    <section id="results" className="results">
      <div className="container">
        <motion.div
          className="results__header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Résultats Mesurables</h2>
          <p className="lead">
            Les chiffres parlent d'eux-mêmes. Mais derrière chaque statistique, 
            il y a une transformation humaine, un dépassement de soi, une victoire personnelle.
          </p>
        </motion.div>

        <div className="results__stats">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stats-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="stats-card__header"></div>
              <div className="stats-card__content">
                <span className="stats-card__number">{stat.number}</span>
                <h4 className="stats-card__label">{stat.label}</h4>
                <p className="stats-card__description">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {testimonials.length > 0 ? (
          <div 
            className="results__testimonials"
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              className="testimonial-card"
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <p className="testimonial-card__quote">
                {testimonials[currentTestimonial].quote}
              </p>
              
              <div className="testimonial-card__author">
                <img 
                  src={testimonials[currentTestimonial].avatar} 
                  alt={testimonials[currentTestimonial].author}
                  className="testimonial-card__avatar"
                />
                <div>
                  <h4 className="testimonial-card__name">
                    {testimonials[currentTestimonial].author}
                  </h4>
                  <p className="testimonial-card__role">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>

              <div className="testimonial-card__metrics">
                {testimonials[currentTestimonial].metrics.map((metric, index) => (
                  <div key={index} className="testimonial-card__metric">
                    <span className="testimonial-card__metric-value">{metric.value}</span>
                    <span className="testimonial-card__metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bouton pour laisser un avis - entre la carte et la navigation */}
            <div className="results__cta">
              <button 
                className="btn btn--primary btn--sm testimonial-cta-btn"
                onClick={() => setIsReviewModalOpen(true)}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                Laisser un avis
              </button>
            </div>

            <div className="results__testimonials-nav">
              <button onClick={prevTestimonial} aria-label="Témoignage précédent">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              
              <div className="results__testimonials-dots">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={index === currentTestimonial ? 'active' : ''}
                    onClick={() => setCurrentTestimonial(index)}
                    aria-label={`Témoignage ${index + 1}`}
                  />
                ))}
              </div>

              <button onClick={nextTestimonial} aria-label="Témoignage suivant">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="results__no-testimonials">
            <div className="testimonial-card">
              <p className="testimonial-card__quote">
                Soyez le premier à partager votre expérience avec Aurélien !
              </p>
            </div>
            
            {/* Bouton pour laisser le premier avis - entre la carte et la navigation */}
            <div className="results__cta">
              <button 
                className="btn btn--primary testimonial-cta-btn"
                onClick={() => setIsReviewModalOpen(true)}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                Laisser le premier avis
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal pour laisser un avis */}
      <ReviewSubmissionModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </section>
  );
};

export default ResultsSection;
