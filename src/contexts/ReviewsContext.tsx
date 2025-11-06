'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Review {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  metrics: Array<{
    value: string;
    label: string;
  }>;
  status: 'pending' | 'approved' | 'rejected';
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ReviewsContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateReview: (id: string, review: Partial<Review>) => void;
  deleteReview: (id: string) => void;
  toggleReviewStatus: (id: string) => void;
  approveReview: (id: string) => void;
  rejectReview: (id: string) => void;
  getActiveReviews: () => Review[];
  getApprovedReviews: () => Review[];
  getReviewById: (id: string) => Review | undefined;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

// Données initiales cohérentes avec le site public
const initialReviews: Review[] = [
  {
    id: '1',
    quote: "Aurélien, c'est LE coach qu'il te faut quand tu veux te dépasser sans perdre ton sourire ☀️ Il allie rigueur, énergie et une vraie bienveillance. Chaque séance est un shoot de motivation — il te tire vers le haut sans jamais te juger ❤️ Merci pour ta passion, ton écoute et ta bonne humeur contagieuse 🙏🏻💪🏻",
    author: "Shana Loustau",
    role: "Journaliste & animatrice TV/radio",
    avatar: "/images/portrait/shana-lousteau.png",
    metrics: [
      { value: "100%", label: "Motivation" },
      { value: "∞", label: "Bienveillance" },
      { value: "+200%", label: "Énergie" }
    ],
    status: 'approved',
    active: true,
    createdAt: '2024-10-01',
    updatedAt: '2024-10-01'
  },
  {
    id: '2',
    quote: "J'aime les gens vrais, et Aurélien en fait partie. Pas de blabla, pas de posture — juste du travail, de la pédagogie, et une vraie présence. C'est rare de trouver un coach qui s'adapte autant sans te faire sentir en compétition avec les autres. Respect.",
    author: "Caroline Marchal",
    role: "Cliente fidèle",
    avatar: "/images/portrait/caroline-marchal.png",
    metrics: [
      { value: "0%", label: "Blabla" },
      { value: "100%", label: "Authenticité" },
      { value: "MAX", label: "Respect" }
    ],
    status: 'approved',
    active: true,
    createdAt: '2024-09-15',
    updatedAt: '2024-09-15'
  },
  {
    id: '3',
    quote: "Je suis tombée amoureuse de l'énergie d'Aurélien 🔥 Il t'apprend à aimer la douleur du progrès, à voir ton corps différemment, à te sentir puissante. Son style est brut, précis, sans artifices — mais toujours avec une vibe solaire ✨ Chaque séance, c'est une version plus forte et plus confiante de toi-même 😍",
    author: "Sandra Maurel",
    role: "Modèle",
    avatar: "/images/portrait/sandra-maurel.png",
    metrics: [
      { value: "+300%", label: "Énergie" },
      { value: "PURE", label: "Style" },
      { value: "+500%", label: "Confiance" }
    ],
    status: 'approved',
    active: true,
    createdAt: '2024-08-20',
    updatedAt: '2024-08-20'
  },
  {
    id: '4',
    quote: "Un coach exceptionnel qui sait adapter ses méthodes à chaque personne. Grâce à Aurélien, j'ai découvert une nouvelle version de moi-même, plus forte et plus confiante.",
    author: "Marie Dubois",
    role: "Étudiante",
    avatar: "/images/portrait/default-avatar.png",
    metrics: [
      { value: "+150%", label: "Force" },
      { value: "100%", label: "Confiance" },
      { value: "TOP", label: "Résultats" }
    ],
    status: 'pending',
    active: false,
    createdAt: '2024-10-25',
    updatedAt: '2024-10-25'
  }
];

export const ReviewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Charger les avis depuis localStorage ou utiliser les données initiales
  useEffect(() => {
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (error) {
        console.error('Erreur lors du chargement des avis:', error);
        setReviews(initialReviews);
      }
    } else {
      setReviews(initialReviews);
    }
  }, []);

  // Sauvegarder les avis dans localStorage à chaque modification
  useEffect(() => {
    if (reviews.length > 0) {
      localStorage.setItem('reviews', JSON.stringify(reviews));
    }
  }, [reviews]);

  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setReviews(prev => [...prev, newReview]);
  };

  const updateReview = (id: string, updates: Partial<Review>) => {
    setReviews(prev => prev.map(review => 
      review.id === id 
        ? { ...review, ...updates, updatedAt: new Date().toISOString() }
        : review
    ));
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(review => review.id !== id));
  };

  const toggleReviewStatus = (id: string) => {
    setReviews(prev => prev.map(review => 
      review.id === id 
        ? { ...review, active: !review.active, updatedAt: new Date().toISOString() }
        : review
    ));
  };

  const approveReview = (id: string) => {
    setReviews(prev => prev.map(review => 
      review.id === id 
        ? { ...review, status: 'approved', active: true, updatedAt: new Date().toISOString() }
        : review
    ));
  };

  const rejectReview = (id: string) => {
    setReviews(prev => prev.map(review => 
      review.id === id 
        ? { ...review, status: 'rejected', active: false, updatedAt: new Date().toISOString() }
        : review
    ));
  };

  const getActiveReviews = () => {
    return reviews.filter(review => review.active && review.status === 'approved');
  };

  const getApprovedReviews = () => {
    return reviews.filter(review => review.status === 'approved');
  };

  const getReviewById = (id: string) => {
    return reviews.find(review => review.id === id);
  };

  const value: ReviewsContextType = {
    reviews,
    addReview,
    updateReview,
    deleteReview,
    toggleReviewStatus,
    approveReview,
    rejectReview,
    getActiveReviews,
    getApprovedReviews,
    getReviewById
  };

  return (
    <ReviewsContext.Provider value={value}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};

export default ReviewsContext;
