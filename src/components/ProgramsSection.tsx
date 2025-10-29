'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ContactModal from './ContactModal';

const ProgramsSection = () => {
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgramForModal, setSelectedProgramForModal] = useState<string>('');

  const handleOpenModal = (programTitle: string) => {
    setSelectedProgramForModal(programTitle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProgramForModal('');
  };

  // Close card when clicking outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedProgram(null);
    }
  };

  const programs = [
    {
      title: "Découverte CrossFit",
      description: "Parfait pour débuter ! Apprenez les mouvements de base dans un environnement bienveillant et progressez à votre rythme.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "4 semaines",
      level: "Débutant·e",
      sessions: "2-3 séances/semaine",
      results: "Apprentissage des bases, gain de confiance, amélioration de la condition physique",
      details: [
        "Mouvements adaptés à votre niveau",
        "Technique avant tout",
        "Groupe de débutant·e·s",
        "Suivi personnalisé inclus"
      ]
    },
    {
      title: "Fitness Adapté",
      description: "Programme inclusif conçu pour toutes les morphologies et tous les âges. Chacun·e progresse selon ses capacités.",
      image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "8 semaines",
      level: "Tous niveaux",
      sessions: "2-4 séances/semaine",
      results: "Amélioration de la santé générale, renforcement musculaire, bien-être",
      details: [
        "Exercices adaptables à chaque personne",
        "Respect du rythme individuel",
        "Focus sur le plaisir de bouger",
        "Communauté bienveillante"
      ]
    },
    {
      title: "Remise en Forme",
      description: "Retrouvez votre forme physique en douceur. Programme progressif pour reprendre une activité sportive sereinement.",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "6 semaines",
      level: "Débutant·e à Intermédiaire",
      sessions: "2-3 séances/semaine",
      results: "Retour progressif à l'activité, renforcement, amélioration de l'endurance",
      details: [
        "Progression douce et sécurisée",
        "Travail de mobilité intégré",
        "Écoute de votre corps",
        "Objectifs réalistes et atteignables"
      ]
    },
    {
      title: "Coaching Personnalisé",
      description: "Accompagnement individuel adapté à vos objectifs personnels, quel que soit votre niveau de départ.",
      image: "https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "Programme sur-mesure",
      level: "Tous niveaux",
      sessions: "Selon vos disponibilités",
      results: "Atteinte de vos objectifs personnels, confiance en soi, bien-être",
      details: [
        "Évaluation de vos besoins",
        "Programme 100% adapté à vous",
        "Flexibilité des horaires",
        "Suivi bienveillant et motivant"
      ]
    }
  ];

  return (
    <section id="programs" className="programs">
      <div className="container">
        <motion.div
          className="programs__header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Des programmes pour chacun·e</h2>
          <p className="lead">
            Que vous découvriez le sport ou souhaitiez vous remettre en forme, 
            nos programmes s'adaptent à votre niveau et respectent votre rythme. 
            L'important, c'est de commencer !
          </p>
        </motion.div>

        <div className="programs__grid" onClick={handleBackdropClick}>
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              className={`program-card ${selectedProgram === index ? 'expanded' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedProgram(selectedProgram === index ? null : index)}
            >
              <div className="program-card__image">
                <img src={program.image} alt={program.title} />
              </div>
              
              <div className="program-card__content">
                <h3 className="program-card__title">{program.title}</h3>
                <p className="program-card__description">{program.description}</p>
                
                <div className="program-card__meta">
                  <span>{program.duration}</span>
                  <span>{program.level}</span>
                </div>

                {selectedProgram === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="program-card__details"
                  >
                    <div className="program-card__close">
                      <button 
                        className="program-card__close-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProgram(null);
                        }}
                        aria-label="Fermer les détails"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="program-card__info">
                      <p><strong>Fréquence:</strong> {program.sessions}</p>
                      <p><strong>Résultats attendus:</strong> {program.results}</p>
                    </div>
                    
                    <ul className="program-card__features">
                      {program.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {selectedProgram === index ? (
                  <button 
                    className="program-card__cta btn btn--primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(program.title);
                    }}
                  >
                    Je me lance !
                  </button>
                ) : (
                  <button className="program-card__cta btn btn--secondary">
                    En savoir plus
                  </button>
                )}
                
                {selectedProgram === index && (
                  <button 
                    className="program-card__reduce"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProgram(null);
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
                    </svg>
                    Réduire
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <ContactModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedProgram={selectedProgramForModal}
      />
    </section>
  );
};

export default ProgramsSection;
