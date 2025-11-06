'use client';

import { useState } from 'react';
import { useReviews } from '@/contexts/ReviewsContext';

interface ReviewSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewSubmissionModal = ({ isOpen, onClose }: ReviewSubmissionModalProps) => {
  const { addReview } = useReviews();
  const [formData, setFormData] = useState({
    author: '',
    role: '',
    quote: '',
    avatar: '',
    metrics: [
      { value: '', label: '' }
    ]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMetricChange = (index: number, field: 'value' | 'label', value: string) => {
    setFormData(prev => ({
      ...prev,
      metrics: prev.metrics.map((metric, i) => 
        i === index ? { ...metric, [field]: value } : metric
      )
    }));
  };

  const addMetric = () => {
    if (formData.metrics.length < 3) {
      setFormData(prev => ({
        ...prev,
        metrics: [...prev.metrics, { value: '', label: '' }]
      }));
    }
  };

  const removeMetric = (index: number) => {
    if (formData.metrics.length > 1) {
      setFormData(prev => ({
        ...prev,
        metrics: prev.metrics.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Filtrer les métriques vides
      const validMetrics = formData.metrics.filter(
        metric => metric.value.trim() && metric.label.trim()
      );

      // Créer l'avis avec statut "pending" pour modération
      const newReview = {
        id: Date.now().toString(),
        author: formData.author.trim(),
        role: formData.role.trim(),
        quote: formData.quote.trim(),
        avatar: formData.avatar.trim() || '/images/portrait/default-avatar.png',
        metrics: validMetrics,
        status: 'pending' as const,
        active: false, // Inactif jusqu'à approbation
        createdAt: new Date().toISOString()
      };

      addReview(newReview);
      
      // Afficher le message de succès
      setShowSuccess(true);
      
      // Réinitialiser le formulaire après un délai
      setTimeout(() => {
        setFormData({
          author: '',
          role: '',
          quote: '',
          avatar: '',
          metrics: [{ value: '', label: '' }]
        });
        setShowSuccess(false);
        setIsSubmitting(false);
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'avis:', error);
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      author: '',
      role: '',
      quote: '',
      avatar: '',
      metrics: [{ value: '', label: '' }]
    });
    setShowSuccess(false);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  if (showSuccess) {
    return (
      <div className="review-modal-overlay">
        <div className="review-modal review-modal--success">
          <div className="review-modal__success">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3>Merci pour votre avis !</h3>
            <p>
              Votre témoignage a été envoyé avec succès. Il sera examiné par notre équipe 
              et publié après validation.
            </p>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="review-modal-overlay">
      <div className="review-modal">
        <div className="review-modal__header">
          <h2>Laisser un avis</h2>
          <button 
            className="review-modal__close"
            onClick={handleClose}
            type="button"
          >
            ✕
          </button>
        </div>

        <div className="review-modal__content">
          <form onSubmit={handleSubmit} className="review-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="author">Votre nom *</label>
                <input
                  type="text"
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  required
                  placeholder="Ex: Marie Dupont"
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Votre profession</label>
                <input
                  type="text"
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  placeholder="Ex: Étudiante, Entrepreneur..."
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="quote">Votre témoignage *</label>
              <textarea
                id="quote"
                value={formData.quote}
                onChange={(e) => handleInputChange('quote', e.target.value)}
                required
                rows={4}
                placeholder="Partagez votre expérience avec Aurélien..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar">Photo de profil (optionnel)</label>
              <input
                type="url"
                id="avatar"
                value={formData.avatar}
                onChange={(e) => handleInputChange('avatar', e.target.value)}
                placeholder="https://exemple.com/votre-photo.jpg"
              />
              <small>Laissez vide pour utiliser une photo par défaut</small>
            </div>

            <div className="form-group">
              <label>Vos résultats (optionnel)</label>
              <div className="metrics-list">
                {formData.metrics.map((metric, index) => (
                  <div key={index} className="metric-item">
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) => handleMetricChange(index, 'value', e.target.value)}
                      placeholder="Ex: +15kg, 100%..."
                    />
                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) => handleMetricChange(index, 'label', e.target.value)}
                      placeholder="Ex: Force, Motivation..."
                    />
                    {formData.metrics.length > 1 && (
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => removeMetric(index)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                {formData.metrics.length < 3 && (
                  <button
                    type="button"
                    className="btn btn--secondary btn--sm"
                    onClick={addMetric}
                  >
                    + Ajouter un résultat
                  </button>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={handleClose}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={isSubmitting || !formData.author.trim() || !formData.quote.trim()}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer mon avis'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmissionModal;
