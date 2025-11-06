'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  objective?: string;
  experience?: string;
  program?: string;
  message?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  source: 'contact-section' | 'contact-modal' | 'other';
}

interface ContactsContextType {
  contacts: Contact[];
  addContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateContact: (id: string, contact: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  markAsRead: (id: string) => void;
  markAsReplied: (id: string) => void;
  archiveContact: (id: string) => void;
  getNewContacts: () => Contact[];
  getContactById: (id: string) => Contact | undefined;
  getContactsByStatus: (status: Contact['status']) => Contact[];
}

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);

// Données initiales pour démonstration
const initialContacts: Contact[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    email: 'marie.dubois@email.com',
    phone: '06 12 34 56 78',
    objective: 'perte-poids',
    experience: 'debutant',
    message: 'Bonjour, je souhaiterais commencer le CrossFit pour perdre du poids et me remettre en forme. J\'ai 32 ans et je n\'ai jamais fait de sport intensif.',
    status: 'new',
    priority: 'medium',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // Il y a 2h
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: 'contact-section'
  },
  {
    id: '2',
    name: 'Thomas Martin',
    email: 'thomas.martin@gmail.com',
    phone: '07 98 76 54 32',
    program: 'Coaching Personnalisé',
    message: 'Je suis intéressé par un coaching personnalisé. J\'ai déjà 3 ans d\'expérience en CrossFit et je veux passer au niveau supérieur.',
    status: 'read',
    priority: 'high',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // Il y a 5h
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // Lu il y a 1h
    source: 'contact-modal'
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    email: 'sophie.laurent@hotmail.fr',
    objective: 'remise-forme',
    experience: 'intermediaire',
    message: 'Après une pause de 6 mois, je veux reprendre le sport. Quels sont vos créneaux disponibles ?',
    status: 'replied',
    priority: 'low',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Il y a 1 jour
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // Répondu il y a 12h
    source: 'contact-section'
  }
];

export const ContactsProvider = ({ children }: { children: React.ReactNode }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Charger les contacts depuis le localStorage au démarrage
  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      try {
        setContacts(JSON.parse(savedContacts));
      } catch (error) {
        console.error('Erreur lors du chargement des contacts:', error);
        setContacts(initialContacts);
      }
    } else {
      setContacts(initialContacts);
    }
  }, []);

  // Sauvegarder les contacts dans le localStorage à chaque modification
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const addContact = (contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newContact: Contact = {
      ...contactData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setContacts(prev => [newContact, ...prev]);
  };

  const updateContact = (id: string, updates: Partial<Contact>) => {
    setContacts(prev => prev.map(contact => 
      contact.id === id 
        ? { ...contact, ...updates, updatedAt: new Date().toISOString() }
        : contact
    ));
  };

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const markAsRead = (id: string) => {
    updateContact(id, { status: 'read' });
  };

  const markAsReplied = (id: string) => {
    updateContact(id, { status: 'replied' });
  };

  const archiveContact = (id: string) => {
    updateContact(id, { status: 'archived' });
  };

  const getNewContacts = () => {
    return contacts.filter(contact => contact.status === 'new');
  };

  const getContactById = (id: string) => {
    return contacts.find(contact => contact.id === id);
  };

  const getContactsByStatus = (status: Contact['status']) => {
    return contacts.filter(contact => contact.status === status);
  };

  const value: ContactsContextType = {
    contacts,
    addContact,
    updateContact,
    deleteContact,
    markAsRead,
    markAsReplied,
    archiveContact,
    getNewContacts,
    getContactById,
    getContactsByStatus
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }
  return context;
};
