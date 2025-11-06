'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Program {
  id: string;
  name: string;
  description: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Tous niveaux';
  duration: string;
  sessions: string;
  results: string;
  details: string[];
  image: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProgramsContextType {
  programs: Program[];
  addProgram: (program: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProgram: (id: string, program: Partial<Program>) => void;
  deleteProgram: (id: string) => void;
  toggleProgramStatus: (id: string) => void;
  getActivePrograms: () => Program[];
  getProgramById: (id: string) => Program | undefined;
}

const ProgramsContext = createContext<ProgramsContextType | undefined>(undefined);

// Données initiales cohérentes avec le site public
const initialPrograms: Program[] = [
  {
    id: '1',
    name: 'Découverte CrossFit',
    description: 'Parfait pour débuter ! Apprenez les mouvements de base dans un environnement bienveillant et progressez à votre rythme.',
    level: 'Débutant',
    duration: '4 semaines',
    sessions: '2-3 séances/semaine',
    results: 'Apprentissage des bases, gain de confiance, amélioration de la condition physique',
    details: [
      'Mouvements adaptés à votre niveau',
      'Technique avant tout',
      'Groupe de débutant·e·s',
      'Suivi personnalisé inclus'
    ],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    active: true,
    createdAt: '2024-10-01',
    updatedAt: '2024-10-01'
  },
  {
    id: '2',
    name: 'Fitness Adapté',
    description: 'Programme inclusif conçu pour toutes les morphologies et tous les âges. Chacun·e progresse selon ses capacités.',
    level: 'Tous niveaux',
    duration: '8 semaines',
    sessions: '2-4 séances/semaine',
    results: 'Amélioration de la santé générale, renforcement musculaire, bien-être',
    details: [
      'Exercices adaptables à chaque personne',
      'Respect du rythme individuel',
      'Focus sur le plaisir de bouger',
      'Communauté bienveillante'
    ],
    image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    active: true,
    createdAt: '2024-09-15',
    updatedAt: '2024-09-15'
  },
  {
    id: '3',
    name: 'Remise en Forme',
    description: 'Retrouvez votre forme physique en douceur. Programme progressif pour reprendre une activité sportive sereinement.',
    level: 'Débutant',
    duration: '6 semaines',
    sessions: '2-3 séances/semaine',
    results: 'Retour progressif à l\'activité, renforcement, amélioration de l\'endurance',
    details: [
      'Progression douce et sécurisée',
      'Travail de mobilité intégré',
      'Écoute de votre corps',
      'Objectifs réalistes et atteignables'
    ],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    active: true,
    createdAt: '2024-08-20',
    updatedAt: '2024-08-20'
  },
  {
    id: '4',
    name: 'Coaching Personnalisé',
    description: 'Accompagnement individuel adapté à vos objectifs personnels, quel que soit votre niveau de départ.',
    level: 'Tous niveaux',
    duration: 'Programme sur-mesure',
    sessions: 'Selon vos disponibilités',
    results: 'Atteinte de vos objectifs personnels, confiance en soi, bien-être',
    details: [
      'Évaluation de vos besoins',
      'Programme 100% adapté à vous',
      'Flexibilité des horaires',
      'Suivi bienveillant et motivant'
    ],
    image: 'https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    active: true,
    createdAt: '2024-07-10',
    updatedAt: '2024-07-10'
  }
];

export const ProgramsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [programs, setPrograms] = useState<Program[]>([]);

  // Charger les programmes depuis localStorage ou utiliser les données initiales
  useEffect(() => {
    const savedPrograms = localStorage.getItem('programs');
    if (savedPrograms) {
      try {
        setPrograms(JSON.parse(savedPrograms));
      } catch (error) {
        console.error('Erreur lors du chargement des programmes:', error);
        setPrograms(initialPrograms);
      }
    } else {
      setPrograms(initialPrograms);
    }
  }, []);

  // Sauvegarder les programmes dans localStorage à chaque modification
  useEffect(() => {
    if (programs.length > 0) {
      localStorage.setItem('programs', JSON.stringify(programs));
    }
  }, [programs]);

  const addProgram = (programData: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProgram: Program = {
      ...programData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPrograms(prev => [...prev, newProgram]);
  };

  const updateProgram = (id: string, updates: Partial<Program>) => {
    setPrograms(prev => prev.map(program => 
      program.id === id 
        ? { ...program, ...updates, updatedAt: new Date().toISOString() }
        : program
    ));
  };

  const deleteProgram = (id: string) => {
    setPrograms(prev => prev.filter(program => program.id !== id));
  };

  const toggleProgramStatus = (id: string) => {
    setPrograms(prev => prev.map(program => 
      program.id === id 
        ? { ...program, active: !program.active, updatedAt: new Date().toISOString() }
        : program
    ));
  };

  const getActivePrograms = () => {
    return programs.filter(program => program.active);
  };

  const getProgramById = (id: string) => {
    return programs.find(program => program.id === id);
  };

  const value: ProgramsContextType = {
    programs,
    addProgram,
    updateProgram,
    deleteProgram,
    toggleProgramStatus,
    getActivePrograms,
    getProgramById
  };

  return (
    <ProgramsContext.Provider value={value}>
      {children}
    </ProgramsContext.Provider>
  );
};

export const usePrograms = () => {
  const context = useContext(ProgramsContext);
  if (context === undefined) {
    throw new Error('usePrograms must be used within a ProgramsProvider');
  }
  return context;
};

export default ProgramsContext;
