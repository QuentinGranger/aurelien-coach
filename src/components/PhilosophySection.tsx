'use client';

import { motion } from 'framer-motion';

const PhilosophySection = () => {
  const pillars = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9M15 11.5C15.8 12.3 16 13.4 16 14.5V22H14V16H10V22H8V14.5C8 13.4 8.2 12.3 9 11.5L15 11.5ZM2 12V10L8 10.5V12"/>
        </svg>
      ),
      title: "Performance réelle",
      description: "Travailler le corps pour qu'il devienne un outil complet, puissant et endurant."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10S9.79 14 12 14 16 12.21 16 10 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10S10.9 8 12 8 14 8.9 14 10 13.1 12 12 12Z"/>
        </svg>
      ),
      title: "Discipline mentale",
      description: "Bâtir un mental d'acier dans un cadre bienveillant mais exigeant."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 4C18.2 4 20 5.8 20 8C20 10.2 18.2 12 16 12C13.8 12 12 10.2 12 8C12 5.8 13.8 4 16 4ZM8 4C10.2 4 12 5.8 12 8C12 10.2 10.2 12 8 12C5.8 12 4 10.2 4 8C4 5.8 5.8 4 8 4ZM8 14C11.3 14 14 16.7 14 20V22H2V20C2 16.7 4.7 14 8 14ZM16 14C19.3 14 22 16.7 22 20V22H16V20C16 18.4 15.4 16.9 14.4 15.7C15.5 14.6 16.9 14 18.5 14H16Z"/>
        </svg>
      ),
      title: "Transmission humaine",
      description: "Créer une relation de confiance pour faire progresser chaque profil, du débutant·e à l'athlète confirmé·e."
    }
  ];

  return (
    <section id="philosophy" className="philosophy">
      <div className="container">
        <motion.div
          className="philosophy__header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>À propos de moi</h2>
          <div className="philosophy__content">
            <div className="philosophy__video">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              >
                <source src="/videos/portrait-aurelien.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="philosophy__bio">
              <p className="lead">
                Je m'appelle <strong>Aurélien Mazel</strong>, ancien pilier de rugby, aujourd'hui coach sportif et préparateur physique.
              </p>
              <p>
                Né en 1994, j'ai grandi dans la culture de l'effort, du collectif et du dépassement de soi. 
                Après plusieurs saisons à me forger sur les terrains, j'ai choisi de transformer cette expérience 
                en une mission : aider chaque personne à devenir plus forte, plus confiante et plus résiliente — 
                physiquement comme mentalement.
              </p>
              <p>
                Formé à l'Insed Fitness School et aujourd'hui coach au CrossFit Louvre III à Paris.
              </p>
              <p className="philosophy__quote">
                📍 Basé à Paris et alentours, je reste convaincu d'une chose :<br />
                <em>La performance, c'est l'équilibre entre puissance et maîtrise.</em>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.h3
          className="philosophy__approach-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Mon approche repose sur trois piliers :
        </motion.h3>

        <div className="philosophy__pillars">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className="philosophy__pillar"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="philosophy__pillar-header">
                <div className="philosophy__pillar-icon">
                  {pillar.icon}
                </div>
              </div>
              
              <div className="philosophy__pillar-content">
                <h3 className="philosophy__pillar-title">{pillar.title}</h3>
                <p className="philosophy__pillar-description">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="philosophy__services"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p>
            Je propose des programmes personnalisés, des séances individuelles ou collectives, 
            ainsi qu'un accompagnement en ligne.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PhilosophySection;
