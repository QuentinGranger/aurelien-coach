'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

const ResultsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const stats = [
    { number: "500+", label: "Athlètes transformés", description: "Depuis 2018" },
    { number: "95%", label: "Taux de satisfaction", description: "Objectifs atteints" },
    { number: "15kg", label: "Gain moyen en force", description: "Sur 12 semaines" },
    { number: "8%", label: "Perte de masse grasse", description: "Moyenne programme" }
  ];

  const testimonials = [
    {
      quote: "Aurélien, c'est LE coach qu'il te faut quand tu veux te dépasser sans perdre ton sourire ☀️ Il allie rigueur, énergie et une vraie bienveillance. Chaque séance est un shoot de motivation — il te tire vers le haut sans jamais te juger ❤️ Merci pour ta passion, ton écoute et ta bonne humeur contagieuse 🙏🏻💪🏻",
      author: "Shana Loustau",
      role: "Journaliste & animatrice TV/radio",
      avatar: "/images/portrait/shana-lousteau.png",
      metrics: [
        { value: "100%", label: "Motivation" },
        { value: "∞", label: "Bienveillance" },
        { value: "+200%", label: "Énergie" }
      ]
    },
    {
      quote: "J'aime les gens vrais, et Aurélien en fait partie. Pas de blabla, pas de posture — juste du travail, de la pédagogie, et une vraie présence. C'est rare de trouver un coach qui s'adapte autant sans te faire sentir en compétition avec les autres. Respect.",
      author: "Caroline Marchal",
      role: "Cliente fidèle",
      avatar: "/images/portrait/caroline-marchal.png",
      metrics: [
        { value: "0%", label: "Blabla" },
        { value: "100%", label: "Authenticité" },
        { value: "MAX", label: "Respect" }
      ]
    },
    {
      quote: "Je suis tombée amoureuse de l'énergie d'Aurélien 🔥 Il t'apprend à aimer la douleur du progrès, à voir ton corps différemment, à te sentir puissante. Son style est brut, précis, sans artifices — mais toujours avec une vibe solaire ✨ Chaque séance, c'est une version plus forte et plus confiante de toi-même 😍",
      author: "Sandra Maurel",
      role: "Modèle",
      avatar: "/images/portrait/sandra-maurel.png",
      metrics: [
        { value: "+300%", label: "Énergie" },
        { value: "PURE", label: "Style" },
        { value: "+500%", label: "Confiance" }
      ]
    },
    {
      quote: "Nan mais wesh 😭 j'ai jamais autant transpiré de ma vie MDR Aurélien t'achève mais t'aimes ça 💀💪 Il te parle comme à une vraie athlète, même si t'as deux bras en compote 🫠 Trop pro, trop humain, et franchement… j'suis ressortie détruite mais fière 🫶🔥",
      author: "Marine Leal Neto",
      role: "Animatrice radio, Fun Radio",
      avatar: "/images/portrait/marine-leal-neto.png",
      metrics: [
        { value: "EXTRÊME", label: "Intensité" },
        { value: "100%", label: "Fierté" },
        { value: "DINGUE", label: "Résultat" }
      ]
    },
    {
      quote: "Aurélien a cette capacité rare de te faire dépasser tes limites tout en gardant le sourire 😊 Son approche est à la fois professionnelle et humaine. Il sait adapter chaque séance à ton niveau et tes objectifs. Avec lui, on découvre une force qu'on ne soupçonnait pas ! 💪✨",
      author: "Manon Mittenaere",
      role: "Influenceuse",
      avatar: "/images/portrait/manon-mittenaere.png",
      metrics: [
        { value: "+400%", label: "Force" },
        { value: "PARFAIT", label: "Adaptation" },
        { value: "TOP", label: "Coaching" }
      ]
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
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
      </div>
    </section>
  );
};

export default ResultsSection;
