'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import ReviewModal from '@/components/ReviewModal';
import { useReviews, Review } from '@/contexts/ReviewsContext';

const AdminReviews = () => {
  const { reviews, updateReview, deleteReview, toggleReviewStatus, approveReview, rejectReview, addReview } = useReviews();
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState({
    quote: '',
    author: '',
    role: '',
    avatar: '',
    metrics: [{ value: '', label: '' }],
    status: 'pending' as Review['status'],
    active: true
  });
  const router = useRouter();

  useEffect(() => {
    // Vérifier l'authentification
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin');
      return;
    }
  }, [router]);

  const filteredReviews = reviews.filter(review => {
    if (filter === 'all') return true;
    return review.status === filter;
  });

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setFormData({
      quote: review.quote,
      author: review.author,
      role: review.role,
      avatar: review.avatar,
      metrics: [...review.metrics],
      status: review.status,
      active: review.active
    });
    setShowForm(true);
  };

  const handleDelete = (reviewId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      deleteReview(reviewId);
    }
  };

  const resetForm = () => {
    setFormData({
      quote: '',
      author: '',
      role: '',
      avatar: '',
      metrics: [{ value: '', label: '' }],
      status: 'pending',
      active: true
    });
    setEditingReview(null);
    setShowForm(false);
  };

  const handleSubmit = (data: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingReview) {
      // Modification
      updateReview(editingReview.id, data);
    } else {
      // Création
      addReview(data);
    }
    
    resetForm();
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved': return 'status-badge--success';
      case 'pending': return 'status-badge--warning';
      case 'rejected': return 'status-badge--danger';
      default: return '';
    }
  };

  return (
    <AdminLayout>
      <div className="admin-reviews">
        <div className="dashboard-header">
          <div className="dashboard-header__content">
            <h1>Gestion des Avis Clients</h1>
            <p>Modérer et gérer les témoignages</p>
          </div>
          <div className="dashboard-header__actions">
            <button 
              className="btn btn--primary"
              onClick={() => {
                setEditingReview(null);
                setShowForm(true);
              }}
            >
              + Nouvel avis
            </button>
          </div>
        </div>

        <div className="reviews-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tous ({reviews.length})
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            En attente ({reviews.filter(r => r.status === 'pending').length})
          </button>
          <button 
            className={`filter-btn ${filter === 'approved' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('approved')}
          >
            Approuvés ({reviews.filter(r => r.status === 'approved').length})
          </button>
          <button 
            className={`filter-btn ${filter === 'rejected' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('rejected')}
          >
            Rejetés ({reviews.filter(r => r.status === 'rejected').length})
          </button>
        </div>

        <div className="admin-reviews-grid">
          {filteredReviews.map((review) => (
            <div key={review.id} className="testimonial-card admin-testimonial-card">
              {/* Status badge overlay */}
              <div className="admin-status-overlay">
                <span className={`status-badge ${getStatusBadgeClass(review.status)}`}>
                  {review.status === 'pending' ? 'En attente' : 
                   review.status === 'approved' ? 'Approuvé' : 'Rejeté'}
                </span>
                {!review.active && (
                  <span className="status-badge status-badge--inactive">Inactif</span>
                )}
              </div>

              {/* Contenu identique au site public */}
              <p className="testimonial-card__quote">{review.quote}</p>
              
              <div className="testimonial-card__author">
                <img 
                  src={review.avatar || '/images/portrait/default-avatar.png'} 
                  alt={review.author}
                  className="testimonial-card__avatar"
                  onError={(e) => {
                    e.currentTarget.src = '/images/portrait/default-avatar.png';
                  }}
                />
                <div>
                  <h4 className="testimonial-card__name">{review.author}</h4>
                  <p className="testimonial-card__role">{review.role}</p>
                </div>
              </div>

              <div className="testimonial-card__metrics">
                {review.metrics.map((metric, index) => (
                  <div key={index} className="testimonial-card__metric">
                    <span className="testimonial-card__metric-value">{metric.value}</span>
                    <span className="testimonial-card__metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>

              {/* Actions admin */}
              <div className="testimonial-card__admin-actions">
                <button 
                  className="admin-mini-btn admin-mini-btn--edit"
                  onClick={() => handleEdit(review)}
                  title="Modifier"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                    <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                  </svg>
                </button>
                
                {review.status === 'pending' && (
                  <>
                    <button 
                      className="admin-mini-btn admin-mini-btn--activate"
                      onClick={() => approveReview(review.id)}
                      title="Approuver"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
                      </svg>
                    </button>
                    <button 
                      className="admin-mini-btn admin-mini-btn--delete"
                      onClick={() => rejectReview(review.id)}
                      title="Rejeter"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                      </svg>
                    </button>
                  </>
                )}
                
                {review.status === 'approved' && (
                  <button 
                    className={`admin-mini-btn ${review.active ? 'admin-mini-btn--deactivate' : 'admin-mini-btn--activate'}`}
                    onClick={() => toggleReviewStatus(review.id)}
                    title={review.active ? 'Désactiver' : 'Activer'}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      {review.active ? (
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6Z"/>
                      ) : (
                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"/>
                      )}
                    </svg>
                  </button>
                )}
                
                <button 
                  className="admin-mini-btn admin-mini-btn--delete"
                  onClick={() => handleDelete(review.id)}
                  title="Supprimer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="empty-state">
            <p>Aucun avis trouvé pour ce filtre.</p>
          </div>
        )}

        <ReviewModal
          isOpen={showForm}
          onClose={resetForm}
          onSubmit={handleSubmit}
          editingReview={editingReview}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminReviews;
