'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useContacts } from '@/contexts/ContactsContext';

const ContactSection = () => {
  const { addContact } = useContacts();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    objective: '',
    experience: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Déterminer la priorité basée sur l'objectif
      let priority: 'low' | 'medium' | 'high' = 'medium';
      if (formData.objective === 'competition') priority = 'high';
      if (formData.objective === 'remise-forme') priority = 'low';
      
      // Ajouter le contact au contexte
      addContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        objective: formData.objective || undefined,
        experience: formData.experience || undefined,
        message: formData.message.trim() || undefined,
        status: 'new',
        priority,
        source: 'contact-section'
      });
      
      // Afficher le message de succès
      setShowSuccess(true);
      
      // Reset form après un délai
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          objective: '',
          experience: '',
          message: ''
        });
        setShowSuccess(false);
        setIsSubmitting(false);
      }, 3000);
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      title: "Adresse",
      content: "24 rue de Londres\n75009 PARIS",
      link: "https://maps.google.com/?q=24+rue+de+Londres+75009+Paris"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      ),
      title: "Téléphone",
      content: "06.51.96.55.12",
      link: "tel:+33651965512"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      title: "Email",
      content: "mazel.aurelien@hotmail.com",
      link: "mailto:mazel.aurelien@hotmail.com"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
          <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
        </svg>
      ),
      title: "Horaires",
      content: "Lun-Ven: 6h-22h\nSam-Dim: 8h-20h",
      link: null
    }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.div
          className="contact-section__header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>Commencez Votre Transformation</h2>
          <p className="lead">
            Prêt à découvrir votre véritable potentiel ? 
            Réservez votre séance d'évaluation gratuite et commencez votre parcours vers l'excellence.
          </p>
        </motion.div>

        <div className="contact-section__content">
          <motion.div
            className="contact-section__info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className="contact-section__info-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="contact-section__info-item-icon">
                  {info.icon}
                </div>
                <div className="contact-section__info-item-content">
                  <h4>{info.title}</h4>
                  {info.link ? (
                    <a href={info.link} target={info.link.startsWith('http') ? '_blank' : '_self'}>
                      {info.content.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </a>
                  ) : (
                    info.content.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="contact-form"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="contact-form__title">Réservez votre séance test</h3>
            <p className="contact-form__subtitle">
              Première séance d'évaluation offerte - Aucun engagement
            </p>

            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="name" className="form-label form-label--required">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Votre nom et prénom"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label form-label--required">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="+33 1 23 45 67 89"
                />
              </div>

              <div className="form-group">
                <label htmlFor="objective" className="form-label form-label--required">
                  Objectif principal
                </label>
                <select
                  id="objective"
                  name="objective"
                  value={formData.objective}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">Sélectionnez votre objectif</option>
                  <option value="perte-poids">Perte de poids</option>
                  <option value="prise-masse">Prise de masse musculaire</option>
                  <option value="performance">Amélioration des performances</option>
                  <option value="competition">Préparation compétition</option>
                  <option value="remise-forme">Remise en forme générale</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="experience" className="form-label">
                  Expérience CrossFit
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Sélectionnez votre niveau</option>
                  <option value="debutant">Débutant (0-6 mois)</option>
                  <option value="intermediaire">Intermédiaire (6 mois - 2 ans)</option>
                  <option value="avance">Avancé (2+ ans)</option>
                  <option value="elite">Elite/Compétition</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message (optionnel)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Parlez-nous de vos objectifs, contraintes, ou questions..."
                  rows={4}
                />
              </div>

              <div className="form-actions form-actions--center">
                {showSuccess ? (
                  <div className="form-success">
                    <div className="form-success__icon">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <h4>Message envoyé !</h4>
                    <p>Merci pour votre demande. Aurélien vous contactera dans les plus brefs délais.</p>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className={`btn btn--primary btn--lg btn--full ${isSubmitting ? 'btn--loading' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Réserver ma séance test'}
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
