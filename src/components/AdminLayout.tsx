'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Détecter si on est sur desktop et ouvrir la sidebar par défaut
  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    setSidebarOpen(isDesktop);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  const menuItems = [
    { 
      href: '/admin/dashboard', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
        </svg>
      ), 
      label: 'Dashboard' 
    },
    { 
      href: '/admin/programs', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c0 .55.45 1 1 1h1v13h2v-6h4v6h2V9h1c.55 0 1-.45 1-1l-.5-2zM12 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-10C8.69 6 6 8.69 6 12s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/>
        </svg>
      ), 
      label: 'Programmes' 
    },
    { 
      href: '/admin/reviews', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ), 
      label: 'Avis clients' 
    },
    { 
      href: '/admin/messages', 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
      ), 
      label: 'Messages' 
    },
  ];

  return (
    <div className={`admin-layout ${sidebarOpen ? 'admin-layout--sidebar-open' : ''}`}>
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__header">
          <img 
            src="/images/admin.png" 
            alt="Admin Logo" 
            className="admin-logo"
          />
          <button 
            className="sidebar-toggle sidebar-toggle--close"
            onClick={() => setSidebarOpen(false)}
            title="Fermer la sidebar"
          >
            ✕
          </button>
        </div>

        <nav className="admin-sidebar__nav">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="admin-sidebar__link"
            >
              <span className="admin-sidebar__icon">{item.icon}</span>
              <span className="admin-sidebar__label">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <button onClick={handleLogout} className="logout-btn">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Fermer la sidebar' : 'Ouvrir la sidebar'}
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>
          
          <div className="admin-header__spacer"></div>

          <div className="admin-header__actions">
            <a href="/" className="btn btn--secondary btn--sm" target="_blank">
              Voir le site
            </a>
          </div>
        </header>

        {/* Content */}
        <main className="admin-content">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="admin-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
