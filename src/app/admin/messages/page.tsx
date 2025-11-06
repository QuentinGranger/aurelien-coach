'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import { useContacts, Contact } from '@/contexts/ContactsContext';

const AdminMessages = () => {
  const { contacts, markAsRead, markAsReplied, deleteContact } = useContacts();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [replyText, setReplyText] = useState('');
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied' | 'archived'>('all');
  const router = useRouter();

  useEffect(() => {
    // Vérifier l'authentification
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin');
      return;
    }
  }, [router]);

  const sendReply = async (contactId: string) => {
    if (!replyText.trim() || !selectedContact) return;

    const sendButton = document.querySelector('.btn--primary') as HTMLButtonElement;
    if (sendButton) {
      sendButton.disabled = true;
      sendButton.textContent = 'Envoi en cours...';
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: selectedContact.email,
          toName: selectedContact.name,
          subject: `Re: ${getSubject(selectedContact)}`,
          message: replyText,
          contactId: contactId
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Marquer comme répondu seulement si l'email a été envoyé
        markAsReplied(contactId);
        setReplyText('');
        setSelectedContact(null);
        
        // Notification de succès
        alert('✅ Email envoyé avec succès !');
      } else {
        throw new Error(result.error || 'Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur envoi email:', error);
      alert('❌ Erreur lors de l\'envoi de l\'email. Veuillez réessayer.');
    } finally {
      // Réactiver le bouton
      if (sendButton) {
        sendButton.disabled = false;
        sendButton.innerHTML = `
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
          Envoyer la réponse
        `;
      }
    }
  };

  const handleDeleteContact = (contactId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      deleteContact(contactId);
      if (selectedContact?.id === contactId) {
        setSelectedContact(null);
      }
    }
  };

  const openContact = (contact: Contact) => {
    setSelectedContact(contact);
    if (contact.status === 'new') {
      markAsRead(contact.id);
    }
  };

  const filteredContacts = filter === 'all' 
    ? contacts 
    : contacts.filter(contact => contact.status === filter);

  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'new': return 'status-badge--danger';
      case 'read': return 'status-badge--warning';
      case 'replied': return 'status-badge--success';
      case 'archived': return 'status-badge--secondary';
      default: return '';
    }
  };

  const getStatusLabel = (status: Contact['status']) => {
    switch (status) {
      case 'new': return 'Nouveau';
      case 'read': return 'Lu';
      case 'replied': return 'Répondu';
      case 'archived': return 'Archivé';
      default: return status;
    }
  };

  const getPriorityColor = (priority: Contact['priority']) => {
    switch (priority) {
      case 'high': return 'priority-badge--high';
      case 'medium': return 'priority-badge--medium';
      case 'low': return 'priority-badge--low';
      default: return '';
    }
  };

  const getSubject = (contact: Contact) => {
    if (contact.objective) {
      const objectives = {
        'perte-poids': 'Perte de poids',
        'prise-masse': 'Prise de masse',
        'performance': 'Performance',
        'competition': 'Compétition',
        'remise-forme': 'Remise en forme'
      };
      return objectives[contact.objective as keyof typeof objectives] || contact.objective;
    }
    if (contact.program) {
      return `Programme: ${contact.program}`;
    }
    return 'Demande de contact';
  };

  return (
    <AdminLayout>
      <div className="admin-messages">
        <div className="dashboard-header">
          <div className="dashboard-header__content">
            <h1>Gestion des Messages</h1>
            <p>Consulter et répondre aux messages de vos clients</p>
          </div>
        </div>

        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'filter-tab--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tous ({contacts.length})
          </button>
          <button 
            className={`filter-tab ${filter === 'new' ? 'filter-tab--active' : ''}`}
            onClick={() => setFilter('new')}
          >
            Nouveaux ({contacts.filter(c => c.status === 'new').length})
          </button>
          <button 
            className={`filter-tab ${filter === 'read' ? 'filter-tab--active' : ''}`}
            onClick={() => setFilter('read')}
          >
            Lus ({contacts.filter(c => c.status === 'read').length})
          </button>
          <button 
            className={`filter-tab ${filter === 'replied' ? 'filter-tab--active' : ''}`}
            onClick={() => setFilter('replied')}
          >
            Répondus ({contacts.filter(c => c.status === 'replied').length})
          </button>
        </div>

        <div className="messages-layout">
          {/* Liste des contacts */}
          <div className="messages-list">
            {filteredContacts.map((contact) => (
              <div 
                key={contact.id} 
                className={`message-item ${contact.status === 'new' ? 'message-item--unread' : ''} ${selectedContact?.id === contact.id ? 'message-item--selected' : ''}`}
                onClick={() => openContact(contact)}
              >
                <div className="message-item__header">
                  <h3>{contact.name}</h3>
                  <div className="badges">
                    <span className={`status-badge ${getStatusColor(contact.status)}`}>
                      {getStatusLabel(contact.status)}
                    </span>
                    <span className={`priority-badge ${getPriorityColor(contact.priority)}`}>
                      {contact.priority}
                    </span>
                  </div>
                </div>
                <div className="message-item__content">
                  <p className="message-subject">{getSubject(contact)}</p>
                  <p className="message-preview">
                    {contact.message ? contact.message.substring(0, 100) + '...' : 'Pas de message'}
                  </p>
                  <p className="message-date">
                    {new Date(contact.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                  <p className="message-source">
                    Source: {contact.source === 'contact-section' ? 'Formulaire contact' : 'Modal programme'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Détail du contact */}
          <div className="message-detail">
            {selectedContact ? (
              <>
                <div className="message-detail__header">
                  <h2>{getSubject(selectedContact)}</h2>
                  <div className="message-actions">
                    <button 
                      className="btn btn--danger btn--sm"
                      onClick={() => handleDeleteContact(selectedContact.id)}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                      Supprimer
                    </button>
                  </div>
                </div>

                <div className="message-detail__content">
                  <div className="sender-info">
                    <p><strong>De:</strong> {selectedContact.name}</p>
                    <p><strong>Email:</strong> {selectedContact.email}</p>
                    {selectedContact.phone && (
                      <p><strong>Téléphone:</strong> {selectedContact.phone}</p>
                    )}
                    <p><strong>Date:</strong> {new Date(selectedContact.createdAt).toLocaleDateString('fr-FR')}</p>
                    <p><strong>Priorité:</strong> 
                      <span className={`priority-badge ${getPriorityColor(selectedContact.priority)}`}>
                        {selectedContact.priority}
                      </span>
                    </p>
                    <p><strong>Source:</strong> {selectedContact.source === 'contact-section' ? 'Formulaire contact' : 'Modal programme'}</p>
                    
                    {selectedContact.objective && (
                      <p><strong>Objectif:</strong> {getSubject(selectedContact)}</p>
                    )}
                    {selectedContact.experience && (
                      <p><strong>Expérience:</strong> {selectedContact.experience}</p>
                    )}
                    {selectedContact.program && (
                      <p><strong>Programme:</strong> {selectedContact.program}</p>
                    )}
                  </div>

                  {selectedContact.message && (
                    <div className="message-content">
                      <h4>Message:</h4>
                      <p>{selectedContact.message}</p>
                    </div>
                  )}

                  {selectedContact.status !== 'replied' && (
                    <div className="reply-form">
                      <h4>Répondre:</h4>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Tapez votre réponse ici..."
                        rows={5}
                      />
                      <button 
                        className="btn btn--primary"
                        onClick={() => sendReply(selectedContact.id)}
                        disabled={!replyText.trim()}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                        Envoyer la réponse
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="empty-state">
                <p>Sélectionnez un contact pour le consulter</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;
