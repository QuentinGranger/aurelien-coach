'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import ProgramModal from '@/components/ProgramModal';
import { usePrograms, Program } from '@/contexts/ProgramsContext';

const AdminPrograms = () => {
  const { programs, addProgram, updateProgram, deleteProgram, toggleProgramStatus } = usePrograms();
  const [showForm, setShowForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    level: 'Débutant' as Program['level'],
    duration: '',
    sessions: '',
    results: '',
    details: [''],
    image: '',
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

  const handleEdit = (program: Program) => {
    setEditingProgram(program);
    setFormData({
      name: program.name,
      description: program.description,
      level: program.level,
      duration: program.duration,
      sessions: program.sessions,
      results: program.results,
      details: [...program.details],
      image: program.image,
      active: program.active
    });
    setShowForm(true);
  };

  const handleDelete = (programId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce programme ?')) {
      deleteProgram(programId);
    }
  };

  const toggleActive = (programId: string) => {
    toggleProgramStatus(programId);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      level: 'Débutant',
      duration: '',
      sessions: '',
      results: '',
      details: [''],
      image: '',
      active: true
    });
    setEditingProgram(null);
    setShowForm(false);
  };

  const handleSubmit = (data: Omit<Program, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingProgram) {
      // Modification
      updateProgram(editingProgram.id, data);
    } else {
      // Création
      addProgram(data);
    }
    
    resetForm();
  };


  return (
    <AdminLayout>
      <div className="admin-programs">
        <div className="dashboard-header">
          <div className="dashboard-header__content">
            <h1>Gestion des Programmes</h1>
            <p>Créer et gérer vos programmes CrossFit</p>
          </div>
          <div className="dashboard-header__actions">
            <button 
              className="btn btn--primary"
              onClick={() => {
                setEditingProgram(null);
                setShowForm(true);
              }}
            >
              + Nouveau programme
            </button>
          </div>
        </div>

        <div className="admin-programs-grid">
          {programs.map((program) => (
            <div key={program.id} className="program-card admin-program-card">
              {/* Image identique au site public */}
              <div className="program-card__image">
                <img 
                  src={program.image || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
                  alt={program.name}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
                  }}
                />
                
                {/* Status badge overlay */}
                <div className="admin-status-overlay">
                  <span className={`status-badge ${program.active ? 'status-badge--active' : 'status-badge--inactive'}`}>
                    {program.active ? 'Actif' : 'Inactif'}
                  </span>
                </div>
              </div>

              {/* Contenu identique au site public */}
              <div className="program-card__content">
                <h3 className="program-card__title">{program.name}</h3>
                <p className="program-card__description">{program.description}</p>
                
                <div className="program-card__meta">
                  <span>{program.duration}</span>
                  <span>{program.level}</span>
                </div>

                {/* Résultats attendus */}
                <div className="program-card__results">
                  <p><strong>Résultats attendus:</strong> {program.results}</p>
                </div>

                {/* Points clés */}
                {program.details && program.details.length > 0 && (
                  <div className="program-card__features">
                    <ul>
                      {program.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions admin minimalistes */}
                <div className="program-card__admin-actions">
                  <button 
                    className="admin-mini-btn admin-mini-btn--edit"
                    onClick={() => handleEdit(program)}
                    title="Modifier"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/>
                    </svg>
                  </button>
                  
                  <button 
                    className={`admin-mini-btn ${program.active ? 'admin-mini-btn--deactivate' : 'admin-mini-btn--activate'}`}
                    onClick={() => toggleActive(program.id)}
                    title={program.active ? 'Désactiver' : 'Activer'}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      {program.active ? (
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6Z"/>
                      ) : (
                        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"/>
                      )}
                    </svg>
                  </button>
                  
                  <button 
                    className="admin-mini-btn admin-mini-btn--delete"
                    onClick={() => handleDelete(program.id)}
                    title="Supprimer"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                      <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ProgramModal
          isOpen={showForm}
          onClose={resetForm}
          onSubmit={handleSubmit}
          editingProgram={editingProgram}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminPrograms;
