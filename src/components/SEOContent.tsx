'use client';

import { useEffect } from 'react';

// Composant invisible pour injecter du contenu SEO naturel
export default function SEOContent() {
  useEffect(() => {
    // Ajouter du contenu SEO invisible mais indexable
    const seoContent = document.createElement('div');
    seoContent.style.position = 'absolute';
    seoContent.style.left = '-9999px';
    seoContent.style.width = '1px';
    seoContent.style.height = '1px';
    seoContent.style.overflow = 'hidden';
    seoContent.setAttribute('aria-hidden', 'true');
    
    seoContent.innerHTML = `
      <h1>CrossFit Paris - Aurélien MAZEL Coach CF-L2</h1>
      <p>CrossFit Paris avec Aurélien MAZEL, coach CrossFit certifié CF-L2. CrossFit Louvre III, la salle CrossFit premium de Paris centre.</p>
      
      <h2>CrossFit Louvre III - Salle Premium Paris</h2>
      <p>CrossFit Louvre, CrossFit Louvre III, CrossFit Louvre 3 - La référence CrossFit Paris centre. Salle CrossFit Louvre avec équipements Rogue.</p>
      
      <h3>Coach CrossFit Paris Certifié</h3>
      <p>Aurélien MAZEL, coach CrossFit Paris certifié CF-L2. Préparateur physique Paris, coach sportif Paris 9ème arrondissement.</p>
      
      <h3>Services CrossFit Paris</h3>
      <ul>
        <li>CrossFit Paris débutant - Initiation CrossFit Paris centre</li>
        <li>CrossFit Paris avancé - Entraînement CrossFit Paris intensif</li>
        <li>CrossFit Paris femme - Programme CrossFit adapté femmes</li>
        <li>CrossFit Paris compétition - Préparation CrossFit Games Paris</li>
        <li>CrossFit Louvre cours - Séances CrossFit Louvre III</li>
        <li>CrossFit Louvre coaching - Suivi personnalisé CrossFit Louvre</li>
      </ul>
      
      <h3>Localisation CrossFit Paris</h3>
      <p>CrossFit Paris 1er, CrossFit Paris 2ème, CrossFit Paris 8ème, CrossFit Paris 9ème. CrossFit Châtelet, CrossFit Opéra, CrossFit Grands Boulevards.</p>
      
      <h3>Équipements CrossFit Louvre</h3>
      <p>CrossFit Louvre équipements Rogue, CrossFit Louvre matériel premium, CrossFit Louvre installations 450m².</p>
      
      <address>
        <strong>CrossFit Paris - Aurélien MAZEL</strong><br>
        24 rue de Londres<br>
        75009 Paris<br>
        Tél: 06 51 96 55 12<br>
        Email: mazel.aurelien@hotmail.com
      </address>
    `;
    
    document.body.appendChild(seoContent);
    
    return () => {
      if (document.body.contains(seoContent)) {
        document.body.removeChild(seoContent);
      }
    };
  }, []);

  return null; // Composant invisible
}

// Composant pour les breadcrumbs SEO
export function SEOBreadcrumbs() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "CrossFit Paris",
        "item": "https://aurelien-coach.fr/crossfit-paris"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "CrossFit Louvre",
        "item": "https://aurelien-coach.fr/crossfit-louvre"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Coach CrossFit Paris",
        "item": "https://aurelien-coach.fr/coach-crossfit-paris"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Aurélien MAZEL Coach",
        "item": "https://aurelien-coach.fr"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema),
      }}
    />
  );
}

// Hook pour optimiser les ancres de liens internes
export function useInternalLinking() {
  useEffect(() => {
    // Ajouter des ancres optimisées pour le SEO interne
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (href) {
        // Ajouter des attributs SEO aux liens internes
        link.setAttribute('title', getOptimizedTitle(href));
        link.setAttribute('aria-label', getOptimizedAriaLabel(href));
      }
    });
  }, []);
}

function getOptimizedTitle(href: string): string {
  const titleMap: { [key: string]: string } = {
    '#philosophy': 'Méthode CrossFit Paris - Aurélien MAZEL Coach CF-L2',
    '#programs': 'Programmes CrossFit Paris - CrossFit Louvre III',
    '#results': 'Résultats CrossFit Paris - Transformations Clients',
    '#box': 'CrossFit Louvre III - Salle Premium Paris Centre',
    '#contact': 'Contact Coach CrossFit Paris - Aurélien MAZEL'
  };
  
  return titleMap[href] || 'CrossFit Paris - Aurélien MAZEL';
}

function getOptimizedAriaLabel(href: string): string {
  const labelMap: { [key: string]: string } = {
    '#philosophy': 'Découvrir la méthode CrossFit Paris d\'Aurélien MAZEL',
    '#programs': 'Voir les programmes CrossFit Paris et CrossFit Louvre',
    '#results': 'Consulter les résultats CrossFit Paris des clients',
    '#box': 'Visiter CrossFit Louvre III - Salle premium Paris',
    '#contact': 'Contacter Aurélien MAZEL coach CrossFit Paris'
  };
  
  return labelMap[href] || 'Navigation CrossFit Paris';
}
