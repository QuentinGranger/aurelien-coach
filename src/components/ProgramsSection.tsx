'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import ContactModal from './ContactModal';
import { usePrograms } from '@/contexts/ProgramsContext';

const ProgramsSection = () => {
  const { getActivePrograms } = usePrograms();
  const programs = getActivePrograms();
  
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
              key={program.id}
              className={`program-card ${selectedProgram === index ? 'expanded' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedProgram(selectedProgram === index ? null : index)}
            >
              <div className="program-card__image">
                <img src={program.image} alt={program.name} />
              </div>
              
              <div className="program-card__content">
                <h3 className="program-card__title">{program.name}</h3>
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
                      handleOpenModal(program.name);
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
