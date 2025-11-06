'use client';

import React from 'react';
import { Review } from '@/contexts/ReviewsContext';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editingReview?: Review | null;
  formData: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
    metrics: Array<{ value: string; label: string; }>;
    status: Review['status'];
    active: boolean;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    quote: string;
    author: string;
    role: string;
    avatar: string;
    metrics: Array<{ value: string; label: string; }>;
    status: Review['status'];
    active: boolean;
  }>>;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingReview,
  formData,
  setFormData
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addMetric = () => {
    setFormData(prev => ({
      ...prev,
      metrics: [...prev.metrics, { value: '', label: '' }]
    }));
  };

  const removeMetric = (index: number) => {
    setFormData(prev => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== index)
    }));
  };

  const updateMetric = (index: number, field: 'value' | 'label', value: string) => {
    setFormData(prev => ({
      ...prev,
      metrics: prev.metrics.map((metric, i) => 
        i === index ? { ...metric, [field]: value } : metric
      )
    }));
  };

  return (
    <div 
      className="review-modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="review-modal">
        <div className="review-modal__header">
          <h2>{editingReview ? 'Modifier l\'avis' : 'Nouvel avis client'}</h2>
          <button 
            type="button"
            onClick={onClose}
            className="review-modal__close"
          >
            ✕
          </button>
        </div>

        <div className="review-modal__content">
          <form onSubmit={handleSubmit} className="review-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="author">Nom du client *</label>
                <input
                  type="text"
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  required
                  placeholder="Ex: Marie Dupont"
                />
              </div>
              <div className="form-group">
                <label htmlFor="role">Profession / Rôle</label>
                <input
                  type="text"
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  placeholder="Ex: Étudiante, Chef d'entreprise..."
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="quote">Témoignage *</label>
              <textarea
                id="quote"
                value={formData.quote}
                onChange={(e) => setFormData(prev => ({ ...prev, quote: e.target.value }))}
                required
                rows={4}
                placeholder="Partagez l'expérience de votre client..."
              />
            </div>

            <div className="form-group">
              <label>Photo de profil</label>
              <div className="avatar-upload-section">
                {formData.avatar && (
                  <div className="avatar-preview">
                    <img 
                      src={formData.avatar} 
                      alt="Aperçu avatar" 
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, avatar: '' }))}
                      className="avatar-remove"
                      title="Supprimer la photo"
                    >
                      ✕
                    </button>
                  </div>
                )}
                
                <div className="avatar-input-methods">
                  <div className="url-input-group">
                    <label htmlFor="avatar-url">URL de la photo</label>
                    <input
                      type="url"
                      id="avatar-url"
                      value={formData.avatar}
                      onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                  
                  <div className="file-input-group">
                    <label htmlFor="avatar-file">Ou télécharger une photo</label>
                    <input
                      type="file"
                      id="avatar-file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const result = event.target?.result as string;
                            setFormData(prev => ({ ...prev, avatar: result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="avatar-suggestions">
                  <p>Avatars par défaut :</p>
                  <div className="suggestion-buttons">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, avatar: '/images/portrait/default-avatar.png' }))}
                      className="suggestion-btn"
                    >
                      Avatar neutre
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Métriques de résultats</label>
              <div className="metrics-list">
                {formData.metrics.map((metric, index) => (
                  <div key={index} className="metric-item">
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) => updateMetric(index, 'value', e.target.value)}
                      placeholder="Ex: +150%, 100%, MAX..."
                    />
                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) => updateMetric(index, 'label', e.target.value)}
                      placeholder="Ex: Force, Motivation, Résultats..."
                    />
                    {formData.metrics.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMetric(index)}
                        className="btn-remove"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addMetric}
                  className="btn btn--secondary btn--sm"
                >
                  + Ajouter une métrique
                </button>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="status">Statut de modération</label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Review['status'] }))}
                >
                  <option value="pending">En attente</option>
                  <option value="approved">Approuvé</option>
                  <option value="rejected">Rejeté</option>
                </select>
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                  />
                  Avis actif (visible sur le site)
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={onClose} className="btn btn--secondary">
                Annuler
              </button>
              <button type="submit" className="btn btn--primary">
                {editingReview ? 'Mettre à jour' : 'Créer l\'avis'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
