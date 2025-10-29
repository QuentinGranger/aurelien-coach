import { Metadata } from 'next';
import { siteConfig } from '@/lib/metadata';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'CrossFit Louvre III - Salle #1 Paris Centre | Aurélien MAZEL Coach CF-L2 Elite',
  description: '🏆 CrossFit Louvre III - LA salle CrossFit #1 Paris centre. 450m² premium, coach Aurélien MAZEL CF-L2, équipements Rogue exclusifs. Communauté d\'élite, transformations garanties. Découvrez la box légendaire !',
  keywords: [
    // Mots-clés ultra-ciblés CrossFit Louvre
    'crossfit louvre',
    'crossfit louvre 3',
    'crossfit louvre iii',
    'crossfit louvre paris',
    'crossfit louvre III paris',
    'crossfit louvre trois',
    'crossfit louvre center',
    'crossfit louvre centre',
    'salle crossfit louvre',
    'box crossfit louvre',
    'club crossfit louvre',
    'gym crossfit louvre',
    // Géolocalisation ultra-précise Louvre
    'crossfit près du louvre',
    'crossfit louvre rivoli',
    'crossfit louvre châtelet',
    'crossfit louvre palais royal',
    'crossfit louvre tuileries',
    'crossfit louvre pont neuf',
    'crossfit louvre île de la cité',
    'crossfit louvre notre dame',
    'crossfit louvre samaritaine',
    'crossfit louvre beaubourg',
    'crossfit louvre marais',
    'crossfit louvre opéra',
    // Mots-clés premium et qualité
    'meilleur crossfit louvre',
    'crossfit louvre premium',
    'crossfit louvre elite',
    'crossfit louvre haut de gamme',
    'crossfit louvre luxe',
    'crossfit louvre professionnel',
    'crossfit louvre expert',
    'crossfit louvre référence',
    // Équipements et services
    'crossfit louvre rogue',
    'crossfit louvre équipements',
    'crossfit louvre matériel',
    'crossfit louvre installations',
    'crossfit louvre 450m2',
    'crossfit louvre espace',
    'crossfit louvre salle',
    'crossfit louvre box',
    // Coach et certification
    'crossfit louvre aurélien',
    'crossfit louvre coach cf-l2',
    'crossfit louvre mazel',
    'crossfit louvre coach certifié',
    'crossfit louvre entraîneur',
    'crossfit louvre préparateur',
    // Programmes et services
    'crossfit louvre débutant',
    'crossfit louvre avancé',
    'crossfit louvre compétition',
    'crossfit louvre femme',
    'crossfit louvre homme',
    'crossfit louvre cours',
    'crossfit louvre séances',
    'crossfit louvre wod',
    'crossfit louvre entraînement',
    'crossfit louvre coaching',
    // Intentions commerciales
    'crossfit louvre tarif',
    'crossfit louvre prix',
    'crossfit louvre abonnement',
    'crossfit louvre inscription',
    'crossfit louvre essai',
    'crossfit louvre découverte',
    'crossfit louvre gratuit',
    'crossfit louvre horaires',
    'crossfit louvre planning',
    'crossfit louvre contact',
    // LSI et sémantique
    'functional fitness louvre',
    'strength conditioning louvre',
    'haltérophilie louvre',
    'gymnastique louvre',
    'cardio louvre',
    'musculation louvre',
    'fitness louvre',
    'sport louvre',
    'entraînement louvre',
    'performance louvre'
  ],
  alternates: {
    canonical: `${siteConfig.url}/crossfit-louvre`,
  },
  openGraph: {
    title: 'CrossFit Louvre III - LA Salle #1 Paris Centre | Aurélien MAZEL CF-L2',
    description: '🏆 CrossFit Louvre III - LA salle CrossFit #1 Paris centre. 450m² premium, coach Aurélien MAZEL CF-L2, équipements Rogue exclusifs.',
    url: `${siteConfig.url}/crossfit-louvre`,
    type: 'website',
    locale: 'fr_FR',
    siteName: 'CrossFit Louvre III - Paris',
    images: [
      {
        url: '/images/crossfit-louvre-salle-premium.jpg',
        width: 1200,
        height: 630,
        alt: 'CrossFit Louvre III - Salle Premium Paris Centre',
        type: 'image/jpeg',
      },
      {
        url: '/images/crossfit-louvre-equipements-rogue.jpg',
        width: 1200,
        height: 630,
        alt: 'CrossFit Louvre III - Équipements Rogue Premium',
        type: 'image/jpeg',
      },
      {
        url: '/images/crossfit-louvre-communaute.jpg',
        width: 1200,
        height: 630,
        alt: 'CrossFit Louvre III - Communauté Elite',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@aurelien_cf',
    creator: '@aurelien_cf',
    title: 'CrossFit Louvre III - LA Salle #1 Paris Centre',
    description: '🏆 CrossFit Louvre III - LA salle CrossFit #1 Paris centre. 450m² premium, coach Aurélien MAZEL CF-L2.',
    images: {
      url: '/images/crossfit-louvre-salle-premium.jpg',
      alt: 'CrossFit Louvre III - Salle Premium Paris',
    },
  },
  other: {
    'geo.region': 'FR-75',
    'geo.placename': 'Paris 1er arrondissement',
    'geo.position': '48.8606;2.3376',
    'ICBM': '48.8606, 2.3376',
    'DC.title': 'CrossFit Louvre III - Salle Premium Paris',
    'DC.creator': 'Aurélien MAZEL',
    'DC.subject': 'CrossFit Louvre, Salle Premium, Paris Centre',
    'DC.description': 'CrossFit Louvre III - Salle premium Paris centre',
    'DC.coverage': 'Louvre, Paris 1er, France',
  },
};

// Schema.org ultra-détaillé pour CrossFit Louvre
const crossfitLouvreSchema = {
  "@context": "https://schema.org",
  "@type": ["SportsActivityLocation", "Gym", "LocalBusiness"],
  "@id": `${siteConfig.url}/crossfit-louvre#gym`,
  "name": "CrossFit Louvre III",
  "alternateName": [
    "CrossFit Louvre 3",
    "CrossFit Louvre Trois",
    "Box CrossFit Louvre",
    "Salle CrossFit Louvre",
    "CrossFit Paris Louvre",
    "CrossFit Centre Paris"
  ],
  "description": "CrossFit Louvre III - LA salle CrossFit premium de Paris centre. 450m² d'équipements Rogue, coaching d'excellence avec Aurélien MAZEL CF-L2.",
  "url": `${siteConfig.url}/crossfit-louvre`,
  "sameAs": [
    "https://crossfitlouvre3.com/",
    "https://www.instagram.com/aurelien_cf/",
    `${siteConfig.url}/crossfit-paris`
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "24 rue de Londres",
    "addressLocality": "Paris",
    "postalCode": "75009",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.8766,
    "longitude": 2.3281
  },
  "containedInPlace": {
    "@type": "Place",
    "name": "Quartier du Louvre",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Paris",
      "addressCountry": "FR"
    }
  },
  "maximumAttendeeCapacity": 30,
  "floorSize": {
    "@type": "QuantitativeValue",
    "value": 450,
    "unitCode": "MTK"
  },
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Équipements Rogue Fitness",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Barres Olympiques",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Kettlebells",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Pull-up Rigs",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Assault Bikes",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Rowing Machines",
      "value": true
    }
  ],
  "hasMap": "https://maps.google.com/?q=24+rue+de+Londres+75009+Paris",
  "isAccessibleForFree": false,
  "publicAccess": false,
  "smokingAllowed": false
};

export default function CrossFitLouvrePage() {
  return (
    <div style={{ display: 'none' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(crossfitLouvreSchema),
        }}
      />
      {/* Redirection vers section box avec tracking */}
      {redirect('/#box?utm_source=crossfit-louvre&utm_medium=seo&utm_campaign=crossfit-louvre-landing')}
    </div>
  );
}
