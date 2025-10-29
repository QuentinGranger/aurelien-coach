import { Metadata } from 'next';
import { siteConfig } from '@/lib/metadata';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'CrossFit Paris - Meilleur Coach CF-L2 | Aurélien MAZEL Transformation Garantie',
  description: '🥇 CrossFit Paris avec Aurélien MAZEL, coach certifié CF-L2. #1 des coachs CrossFit Paris centre. 500+ transformations réussies. CrossFit Louvre III, programmes personnalisés, résultats prouvés. Séance découverte offerte.',
  keywords: [
    // Mots-clés ultra-ciblés
    'crossfit paris',
    'crossfit paris centre',
    'crossfit paris 1er',
    'crossfit paris 2ème', 
    'crossfit paris 8ème',
    'crossfit paris 9ème',
    'meilleur crossfit paris',
    'crossfit paris louvre',
    'crossfit paris châtelet',
    'crossfit paris opéra',
    'crossfit paris grands boulevards',
    'crossfit paris république',
    'crossfit paris bastille',
    'crossfit paris marais',
    // LSI Keywords (Latent Semantic Indexing)
    'salle crossfit paris',
    'box crossfit paris',
    'cours crossfit paris',
    'entraînement crossfit paris',
    'coach crossfit paris',
    'crossfit débutant paris',
    'crossfit femme paris',
    'crossfit homme paris',
    'crossfit compétition paris',
    'crossfit games paris',
    'wod crossfit paris',
    'crossfit functional fitness paris',
    'crossfit strength conditioning paris',
    'crossfit haltérophilie paris',
    'crossfit gymnastique paris',
    'crossfit cardio paris',
    // Mots-clés longue traîne ultra-spécifiques
    'meilleur coach crossfit paris centre',
    'crossfit paris coach certifié cf-l2',
    'crossfit paris transformation physique',
    'crossfit paris perte de poids',
    'crossfit paris prise de masse',
    'crossfit paris préparation physique',
    'crossfit paris performance athlétique',
    'crossfit paris remise en forme',
    'crossfit paris débutant accueil',
    'crossfit paris femme programme',
    'crossfit paris homme musculation',
    'crossfit paris couple entraînement',
    'crossfit paris senior adapté',
    'crossfit paris ado jeune',
    // Géolocalisation ultra-précise
    'crossfit près châtelet les halles',
    'crossfit près louvre rivoli',
    'crossfit près opéra garnier',
    'crossfit près grands boulevards',
    'crossfit près république',
    'crossfit près bastille',
    'crossfit près marais',
    'crossfit près beaubourg',
    'crossfit près pont neuf',
    'crossfit près palais royal',
    // Intentions de recherche
    'crossfit paris tarif prix',
    'crossfit paris horaire planning',
    'crossfit paris inscription',
    'crossfit paris essai gratuit',
    'crossfit paris séance découverte',
    'crossfit paris abonnement',
    'crossfit paris coaching personnalisé',
    'crossfit paris suivi individuel'
  ],
  alternates: {
    canonical: `${siteConfig.url}/crossfit-paris`,
  },
  openGraph: {
    title: 'CrossFit Paris #1 - Coach Aurélien MAZEL CF-L2 | Transformation Garantie',
    description: '🥇 #1 CrossFit Paris avec Aurélien MAZEL, coach certifié CF-L2. 500+ transformations réussies. CrossFit Louvre III, coaching d\'excellence, résultats prouvés.',
    url: `${siteConfig.url}/crossfit-paris`,
    type: 'website',
    locale: 'fr_FR',
    siteName: 'CrossFit Paris - Aurélien MAZEL',
    images: [
      {
        url: '/images/crossfit-paris-aurelien-coach.jpg',
        width: 1200,
        height: 630,
        alt: 'CrossFit Paris - Aurélien MAZEL Coach CF-L2',
        type: 'image/jpeg',
      },
      {
        url: '/images/crossfit-paris-salle-louvre.jpg',
        width: 1200,
        height: 630,
        alt: 'CrossFit Paris - Salle Louvre III Premium',
        type: 'image/jpeg',
      },
      {
        url: '/images/crossfit-paris-transformation.jpg',
        width: 1200,
        height: 630,
        alt: 'CrossFit Paris - Transformations Clients',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@aurelien_cf',
    creator: '@aurelien_cf',
    title: 'CrossFit Paris #1 - Coach Aurélien MAZEL CF-L2',
    description: '🥇 #1 CrossFit Paris avec Aurélien MAZEL, coach certifié CF-L2. 500+ transformations réussies.',
    images: {
      url: '/images/crossfit-paris-aurelien-coach.jpg',
      alt: 'CrossFit Paris - Aurélien MAZEL Coach CF-L2',
    },
  },
  other: {
    'geo.region': 'FR-75',
    'geo.placename': 'Paris',
    'geo.position': '48.8566;2.3522',
    'ICBM': '48.8566, 2.3522',
    'DC.title': 'CrossFit Paris - Aurélien MAZEL Coach CF-L2',
    'DC.creator': 'Aurélien MAZEL',
    'DC.subject': 'CrossFit, Fitness, Coaching Sportif, Paris',
    'DC.description': 'CrossFit Paris avec coach certifié CF-L2',
    'DC.publisher': 'Aurélien MAZEL Coach',
    'DC.contributor': 'CrossFit Louvre III',
    'DC.date': new Date().toISOString(),
    'DC.type': 'Service',
    'DC.format': 'text/html',
    'DC.identifier': `${siteConfig.url}/crossfit-paris`,
    'DC.language': 'fr',
    'DC.coverage': 'Paris, France',
    'DC.rights': 'Copyright Aurélien MAZEL',
  },
};

// Schema.org ultra-détaillé pour CrossFit Paris
const crossfitParisSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "SportsActivityLocation", "Gym", "HealthClub"],
  "@id": `${siteConfig.url}/crossfit-paris#business`,
  "name": "CrossFit Paris - Aurélien MAZEL Coach CF-L2",
  "alternateName": [
    "CrossFit Paris Centre",
    "CrossFit Louvre",
    "Aurélien Coach CrossFit Paris",
    "Coach CrossFit Paris CF-L2",
    "CrossFit Paris Châtelet",
    "CrossFit Paris Opéra"
  ],
  "description": "CrossFit Paris avec Aurélien MAZEL, coach certifié CF-L2. Salle premium CrossFit Louvre III, 500+ transformations réussies, coaching d'excellence.",
  "url": `${siteConfig.url}/crossfit-paris`,
  "sameAs": [
    "https://www.instagram.com/aurelien_cf/",
    "https://www.linkedin.com/in/aurélien-mazel-9807971a7/",
    "https://crossfitlouvre3.com/",
    `${siteConfig.url}/coach-crossfit-paris`,
    `${siteConfig.url}/crossfit-louvre`
  ],
  "telephone": siteConfig.phone,
  "email": siteConfig.email,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "24 rue de Londres",
    "addressLocality": "Paris",
    "postalCode": "75009",
    "addressCountry": "FR",
    "addressRegion": "Île-de-France"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.8766,
    "longitude": 2.3281
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Paris",
      "sameAs": "https://fr.wikipedia.org/wiki/Paris"
    },
    {
      "@type": "AdministrativeArea", 
      "name": "1er arrondissement",
      "containedInPlace": "Paris"
    },
    {
      "@type": "AdministrativeArea",
      "name": "2ème arrondissement", 
      "containedInPlace": "Paris"
    },
    {
      "@type": "AdministrativeArea",
      "name": "8ème arrondissement",
      "containedInPlace": "Paris"
    },
    {
      "@type": "AdministrativeArea",
      "name": "9ème arrondissement",
      "containedInPlace": "Paris"
    }
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 48.8566,
      "longitude": 2.3522
    },
    "geoRadius": "25000"
  },
  "priceRange": "€€€",
  "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "PayPal"],
  "currenciesAccepted": "EUR",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "06:00",
      "closes": "22:00"
    },
    {
      "@type": "OpeningHoursSpecification", 
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "20:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "247",
    "bestRating": "5",
    "worstRating": "1"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services CrossFit Paris",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "CrossFit Paris Débutant",
        "description": "Programme CrossFit spécialement conçu pour les débutants à Paris",
        "category": "Fitness Training",
        "areaServed": "Paris"
      },
      {
        "@type": "Offer", 
        "name": "CrossFit Paris Avancé",
        "description": "Entraînement CrossFit intensif pour athlètes confirmés à Paris",
        "category": "Athletic Training",
        "areaServed": "Paris"
      },
      {
        "@type": "Offer",
        "name": "CrossFit Paris Femme",
        "description": "Programmes CrossFit adaptés aux femmes à Paris",
        "category": "Women Fitness",
        "areaServed": "Paris"
      },
      {
        "@type": "Offer",
        "name": "CrossFit Paris Compétition", 
        "description": "Préparation CrossFit Games et compétitions à Paris",
        "category": "Competition Training",
        "areaServed": "Paris"
      }
    ]
  },
  "knowsAbout": [
    "CrossFit",
    "CrossFit Paris",
    "Haltérophilie",
    "Gymnastique",
    "Conditioning",
    "Functional Fitness",
    "CrossFit Games",
    "WOD",
    "AMRAP",
    "EMOM",
    "Tabata",
    "Strength Training",
    "Olympic Lifting",
    "Powerlifting",
    "Calisthenics"
  ],
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Équipements Rogue",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification", 
      "name": "Vestiaires",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Douches",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Parking",
      "value": false
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "WiFi Gratuit",
      "value": true
    }
  ]
};

export default function CrossFitParisPage() {
  return (
    <div style={{ display: 'none' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(crossfitParisSchema),
        }}
      />
      {/* Redirection immédiate vers la page principale */}
      {redirect('/?utm_source=crossfit-paris&utm_medium=seo&utm_campaign=crossfit-paris-landing')}
    </div>
  );
}
