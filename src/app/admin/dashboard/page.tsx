'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import { usePrograms } from '@/contexts/ProgramsContext';
import { useReviews } from '@/contexts/ReviewsContext';
import { useContacts } from '@/contexts/ContactsContext';

interface DashboardStats {
  totalPrograms: number;
  totalReviews: number;
  totalMessages: number;
  pendingReviews: number;
  recentActivity: Array<{
    id: string;
    type: 'program' | 'review' | 'message';
    title: string;
    description: string;
    date: string;
    time: string;
  }>;
  popularPrograms: Array<{
    id: string;
    name: string;
    description: string;
    level: string;
    status: 'active' | 'inactive';
  }>;
}

const AdminDashboard = () => {
  const { programs, getActivePrograms } = usePrograms();
  const { reviews } = useReviews();
  const { contacts, getNewContacts, getContactsByStatus } = useContacts();
  const [stats, setStats] = useState<DashboardStats>({
    totalPrograms: 0,
    totalReviews: 0,
    totalMessages: 0,
    pendingReviews: 0,
    recentActivity: [],
    popularPrograms: []
  });
  const router = useRouter();

  useEffect(() => {
    // Vérifier l'authentification
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin');
      return;
    }

    // Charger les statistiques avec les vraies données
    loadDashboardStats();
  }, [router, programs, reviews, contacts]);

  const loadDashboardStats = () => {
    // Utiliser les vraies données des contextes
    const activePrograms = getActivePrograms();
    const newContacts = getNewContacts();
    const pendingReviews = reviews.filter(review => review.status === 'pending');
    
    // Créer l'activité récente basée sur les vraies données
    const recentActivity = [];
    
    // Ajouter les nouveaux contacts s'il y en a
    if (newContacts.length > 0) {
      newContacts.slice(0, 2).forEach(contact => {
        recentActivity.push({
          id: `contact-${contact.id}`,
          type: 'message' as const,
          title: 'Nouveau message',
          description: `${contact.name} a envoyé une demande concernant: ${contact.objective || contact.program || 'Contact général'}`,
          date: contact.createdAt.split('T')[0],
          time: new Date(contact.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        });
      });
    }
    
    // Ajouter les avis en attente s'il y en a
    if (pendingReviews.length > 0) {
      pendingReviews.slice(0, 2).forEach(review => {
        recentActivity.push({
          id: `review-${review.id}`,
          type: 'review' as const,
          title: 'Nouvel avis en attente',
          description: `${review.author} a laissé un avis qui nécessite une modération`,
          date: review.createdAt.split('T')[0],
          time: new Date(review.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        });
      });
    }
    
    // Si pas d'activité récente, ajouter un message d'info
    if (recentActivity.length === 0) {
      recentActivity.push({
        id: 'no-activity',
        type: 'program' as const,
        title: 'Aucune activité récente',
        description: `Vous avez ${activePrograms.length} programmes actifs. Les nouveaux messages et avis apparaîtront ici.`,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      });
    }
    
    // Trier par date/heure décroissante
    recentActivity.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });

    const realStats: DashboardStats = {
      totalPrograms: programs.length,
      totalReviews: reviews.length,
      totalMessages: contacts.length,
      pendingReviews: pendingReviews.length,
      recentActivity: recentActivity.slice(0, 4), // Limiter à 4 éléments
      popularPrograms: activePrograms.slice(0, 3).map(program => ({
        id: program.id,
        name: program.name,
        description: program.description,
        level: program.level,
        status: program.active ? 'active' as const : 'inactive' as const
      }))
    };
    setStats(realStats);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'message':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        );
      case 'review':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        );
      case 'program':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c0 .55.45 1 1 1h1v13h2v-6h4v6h2V9h1c.55 0 1-.45 1-1l-.5-2z"/>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H18V0h-2v2H8V0H6v2H4.5C3.11 2 2 3.11 2 4.5v15C2 20.89 3.11 22 4.5 22h15c1.39 0 2.5-1.11 2.5-2.5v-15C22 3.11 20.89 2 19.5 2z"/>
          </svg>
        );
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <AdminLayout>
      <div className="premium-dashboard">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-header__content">
            <h1>Dashboard</h1>
            <p>Gestion de votre site CrossFit</p>
          </div>
          <div className="dashboard-header__date">
            <span>{new Date().toLocaleDateString('fr-FR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>

        {/* Métriques principales */}
        <div className="metrics-grid">
          <div className="metric-card metric-card--info">
            <div className="metric-card__icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c0 .55.45 1 1 1h1v13h2v-6h4v6h2V9h1c.55 0 1-.45 1-1l-.5-2z"/>
              </svg>
            </div>
            <div className="metric-card__content">
              <h3>{stats.totalPrograms}</h3>
              <p>Programmes</p>
              <div className="metric-card__trend metric-card__trend--neutral">
                {getActivePrograms().length} actifs
              </div>
            </div>
          </div>

          <div className="metric-card metric-card--warning">
            <div className="metric-card__icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            </div>
            <div className="metric-card__content">
              <h3>{stats.totalReviews}</h3>
              <p>Avis clients</p>
              <div className={`metric-card__trend ${stats.pendingReviews > 0 ? 'metric-card__trend--warning' : 'metric-card__trend--success'}`}>
                {stats.pendingReviews > 0 ? `${stats.pendingReviews} en attente` : 'Tous modérés'}
              </div>
            </div>
          </div>

          <div className="metric-card metric-card--primary">
            <div className="metric-card__icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>
            <div className="metric-card__content">
              <h3>{stats.totalMessages}</h3>
              <p>Messages</p>
              <div className={`metric-card__trend ${getNewContacts().length > 0 ? 'metric-card__trend--warning' : 'metric-card__trend--neutral'}`}>
                {getNewContacts().length > 0 ? `${getNewContacts().length} nouveaux` : 'Tous traités'}
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="dashboard-grid">
          {/* Programmes populaires */}
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <h2>Vos Programmes</h2>
              <a href="/admin/programs" className="btn-link">Gérer tout</a>
            </div>
            <div className="dashboard-card__content">
              <div className="program-list">
                {stats.popularPrograms.map((program) => (
                  <div key={program.id} className="program-item">
                    <div className="program-item__info">
                      <h4>{program.name}</h4>
                      <p>{program.description}</p>
                    </div>
                    <div className="program-item__metrics">
                      <span className="program-level">{program.level}</span>
                      <span className={`program-status ${program.status === 'active' ? 'program-status--active' : 'program-status--inactive'}`}>
                        {program.status === 'active' ? 'Actif' : 'Inactif'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activité récente */}
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <h2>Activité récente</h2>
            </div>
            <div className="dashboard-card__content">
              <div className="activity-feed">
                {stats.recentActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-item__icon activity-item__icon--${activity.type}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="activity-item__content">
                      <h4>{activity.title}</h4>
                      <p>{activity.description}</p>
                      <span className="activity-item__time">
                        {formatDate(activity.date)} à {activity.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <h2>Actions rapides</h2>
            </div>
            <div className="dashboard-card__content">
              <div className="quick-actions-grid">
                <a href="/admin/programs" className="quick-action-btn">
                  <div className="quick-action-btn__icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                  </div>
                  <span>Nouveau programme</span>
                </a>
                <a href="/admin/messages" className="quick-action-btn">
                  <div className="quick-action-btn__icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                  </div>
                  <span>Messages ({stats.totalMessages})</span>
                </a>
                <a href="/admin/reviews" className="quick-action-btn">
                  <div className="quick-action-btn__icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  </div>
                  <span>Modérer avis ({stats.pendingReviews})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
