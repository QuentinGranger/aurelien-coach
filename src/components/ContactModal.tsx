'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useContacts } from '@/contexts/ContactsContext';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProgram?: string;
}

const ContactModal = ({ isOpen, onClose, selectedProgram }: ContactModalProps) => {
  const { addContact } = useContacts();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    program: selectedProgram || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Déterminer la priorité basée sur le programme
      let priority: 'low' | 'medium' | 'high' = 'medium';
      if (formData.program === 'Coaching Personnalisé') priority = 'high';
      if (formData.program === 'Découverte CrossFit') priority = 'low';
      
      // Ajouter le contact au contexte
      addContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        program: formData.program || undefined,
        message: formData.message.trim() || undefined,
        status: 'new',
        priority,
        source: 'contact-modal'
      });
      
      // Afficher le succès
      setShowSuccess(true);
      
      // Fermer la modal après un délai
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          program: selectedProgram || ''
        });
        setShowSuccess(false);
        setIsSubmitting(false);
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="modal">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="modal__header">
                <h2>Réservez votre séance</h2>
                {selectedProgram && (
                  <p className="modal__program">Programme : <span>{selectedProgram}</span></p>
                )}
                <button className="modal__close" onClick={onClose}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>

              <form className="modal__form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nom complet *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom et prénom"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="votre@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="06 12 34 56 78"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="program">Programme souhaité</label>
                  <select
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                  >
                    <option value="">Choisir un programme</option>
                    <option value="Découverte CrossFit">Découverte CrossFit</option>
                    <option value="Fitness Adapté">Fitness Adapté</option>
                    <option value="Remise en Forme">Remise en Forme</option>
                    <option value="Coaching Personnalisé">Coaching Personnalisé</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Parlez-nous de vos objectifs, votre expérience sportive..."
                  />
                </div>

                <div className="modal__actions">
                  {showSuccess ? (
                    <div className="modal__success">
                      <div className="success-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <h4>Demande envoyée !</h4>
                      <p>Aurélien vous contactera rapidement.</p>
                    </div>
                  ) : (
                    <>
                      <button type="button" className="btn btn--secondary" onClick={onClose}>
                        Annuler
                      </button>
                      <button 
                        type="submit" 
                        className={`btn btn--primary ${isSubmitting ? 'btn--loading' : ''}`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Envoi...' : 'Envoyer ma demande'}
                      </button>
                    </>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
