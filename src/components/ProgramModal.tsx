'use client';

import React from 'react';
import { Program } from '@/contexts/ProgramsContext';

interface ProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editingProgram?: Program | null;
  formData: {
    name: string;
    description: string;
    level: Program['level'];
    duration: string;
    sessions: string;
    results: string;
    details: string[];
    image: string;
    active: boolean;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    description: string;
    level: Program['level'];
    duration: string;
    sessions: string;
    results: string;
    details: string[];
    image: string;
    active: boolean;
  }>>;
}

const ProgramModal: React.FC<ProgramModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingProgram,
  formData,
  setFormData
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addDetail = () => {
    setFormData(prev => ({
      ...prev,
      details: [...prev.details, '']
    }));
  };

  const removeDetail = (index: number) => {
    setFormData(prev => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index)
    }));
  };

  const updateDetail = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      details: prev.details.map((detail, i) => i === index ? value : detail)
    }));
  };

  return (
    <div 
      className="program-modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="program-modal">
        <div className="program-modal__header">
          <h2>{editingProgram ? 'Modifier le programme' : 'Nouveau programme'}</h2>
          <button 
            type="button"
            onClick={onClose}
            className="program-modal__close"
          >
            ✕
          </button>
        </div>

        <div className="program-modal__content">
          <form onSubmit={handleSubmit} className="program-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nom du programme *</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  placeholder="Ex: CrossFit Débutant"
                />
              </div>
              <div className="form-group">
                <label htmlFor="level">Niveau *</label>
                <select
                  id="level"
                  value={formData.level}
                  onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value as Program['level'] }))}
                  required
                >
                  <option value="Débutant">Débutant</option>
                  <option value="Intermédiaire">Intermédiaire</option>
                  <option value="Avancé">Avancé</option>
                  <option value="Tous niveaux">Tous niveaux</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
                rows={3}
                placeholder="Décrivez brièvement ce programme..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="duration">Durée *</label>
                <input
                  type="text"
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  required
                  placeholder="Ex: 4 semaines"
                />
              </div>
              <div className="form-group">
                <label htmlFor="sessions">Fréquence *</label>
                <input
                  type="text"
                  id="sessions"
                  value={formData.sessions}
                  onChange={(e) => setFormData(prev => ({ ...prev, sessions: e.target.value }))}
                  required
                  placeholder="Ex: 2-3 séances/semaine"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="results">Résultats attendus *</label>
              <textarea
                id="results"
                value={formData.results}
                onChange={(e) => setFormData(prev => ({ ...prev, results: e.target.value }))}
                required
                rows={2}
                placeholder="Quels bénéfices les participants peuvent-ils attendre ?"
              />
            </div>

            <div className="form-group">
              <label>Image du programme</label>
              <div className="image-upload-section">
                {formData.image && (
                  <div className="image-preview">
                    <img 
                      src={formData.image} 
                      alt="Aperçu du programme" 
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      className="image-remove"
                      title="Supprimer l'image"
                    >
                      ✕
                    </button>
                  </div>
                )}
                
                <div className="image-input-methods">
                  <div className="url-input-group">
                    <label htmlFor="image-url">URL de l'image</label>
                    <input
                      type="url"
                      id="image-url"
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  
                  <div className="file-input-group">
                    <label htmlFor="image-file">Ou télécharger une image</label>
                    <input
                      type="file"
                      id="image-file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const result = event.target?.result as string;
                            setFormData(prev => ({ ...prev, image: result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <div className="file-input-info">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                      </svg>
                      <span>JPG, PNG, WebP (max 5MB)</span>
                    </div>
                  </div>
                </div>

                <div className="image-suggestions">
                  <p>Suggestions d'images Unsplash :</p>
                  <div className="suggestion-buttons">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }))}
                      className="suggestion-btn"
                    >
                      CrossFit 1
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }))}
                      className="suggestion-btn"
                    >
                      Fitness 1
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }))}
                      className="suggestion-btn"
                    >
                      Remise en forme
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: 'https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' }))}
                      className="suggestion-btn"
                    >
                      Coaching
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Points clés du programme</label>
              <div className="details-list">
                {formData.details.map((detail, index) => (
                  <div key={index} className="detail-item">
                    <input
                      type="text"
                      value={detail}
                      onChange={(e) => updateDetail(index, e.target.value)}
                      placeholder="Ex: Mouvements adaptés à votre niveau"
                    />
                    {formData.details.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDetail(index)}
                        className="btn-remove"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addDetail}
                  className="btn btn--secondary btn--sm"
                >
                  + Ajouter un point
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                />
                Programme actif (visible sur le site)
              </label>
            </div>

            <div className="form-actions">
              <button type="button" onClick={onClose} className="btn btn--secondary">
                Annuler
              </button>
              <button type="submit" className="btn btn--primary">
                {editingProgram ? 'Mettre à jour' : 'Créer le programme'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProgramModal;
