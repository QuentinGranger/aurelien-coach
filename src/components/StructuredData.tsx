'use client';

import { siteConfig } from '@/lib/metadata';

export default function StructuredData() {
  // Schema.org LocalBusiness + Person + Service
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SportsActivityLocation", "Gym"],
    "@id": `${siteConfig.url}#business`,
    "name": siteConfig.business.name,
    "alternateName": ["Aurélien Coach", "Coach Aurélien MAZEL", "CrossFit Louvre Coach"],
    "description": siteConfig.description,
    "url": siteConfig.url,
    "telephone": siteConfig.phone,
    "email": siteConfig.email,
    "foundingDate": siteConfig.business.founded,
    "legalName": siteConfig.business.name,
    "taxID": siteConfig.business.siret,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address.street,
      "addressLocality": siteConfig.address.city,
      "postalCode": siteConfig.address.postalCode,
      "addressCountry": siteConfig.address.country,
      "addressRegion": "Île-de-France"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 48.8766,
      "longitude": 2.3281
    },
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
    "priceRange": "€€€",
    "currenciesAccepted": "EUR",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
    "areaServed": [
      {
        "@type": "City",
        "name": "Paris"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Île-de-France"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 48.8566,
        "longitude": 2.3522
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de Coaching CrossFit",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Coaching CrossFit Individuel",
            "description": "Séances de CrossFit personnalisées avec coach certifié CF-L2"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Préparation Physique",
            "description": "Programme de préparation physique pour athlètes et compétiteurs"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Coaching en Ligne",
            "description": "Suivi et programmes personnalisés à distance"
          }
        }
      ]
    },
    "image": [
      `${siteConfig.url}/images/aurelien-coach-crossfit.jpg`,
      `${siteConfig.url}/images/crossfit-louvre-salle.jpg`,
      `${siteConfig.url}/images/coaching-crossfit-paris.jpg`
    ],
    "logo": `${siteConfig.url}/images/LogoAurelien-v2.png`,
    "sameAs": [
      "https://www.instagram.com/aurelien_cf/",
      "https://www.linkedin.com/in/aurélien-mazel-9807971a7/",
      "https://crossfitlouvre3.com/"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Shana Loustau"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Aurélien est un coach exceptionnel ! Sa méthode m'a permis de dépasser mes limites et d'atteindre des objectifs que je n'aurais jamais cru possibles."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Manon Mittenaere"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Aurélien a cette capacité rare de te faire dépasser tes limites tout en gardant le sourire. Son approche est à la fois professionnelle et humaine."
      }
    ]
  };

  // Schema.org Person (Coach)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}#person`,
    "name": siteConfig.creator,
    "alternateName": ["Aurélien Coach", "Coach Aurélien"],
    "description": "Coach CrossFit certifié CF-L2 et préparateur physique à Paris. Spécialisé dans la transformation physique et la performance athlétique.",
    "url": siteConfig.url,
    "email": siteConfig.email,
    "telephone": siteConfig.phone,
    "image": `${siteConfig.url}/images/PhotoAurelien.png`,
    "jobTitle": ["Coach CrossFit", "Préparateur Physique", "Personal Trainer"],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Coach Sportif CrossFit",
      "occupationLocation": {
        "@type": "City",
        "name": "Paris"
      },
      "skills": ["CrossFit", "Haltérophilie", "Gymnastique", "Conditioning", "Nutrition Sportive"]
    },
    "knowsAbout": [
      "CrossFit",
      "Haltérophilie", 
      "Préparation Physique",
      "Nutrition Sportive",
      "Coaching Sportif",
      "Performance Athlétique"
    ],
    "alumniOf": {
      "@type": "Organization",
      "name": "Insed Fitness School"
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "CrossFit Level 2 Trainer (CF-L2)",
        "credentialCategory": "Professional Certification"
      }
    ],
    "worksFor": {
      "@id": `${siteConfig.url}#business`
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.address.street,
      "addressLocality": siteConfig.address.city,
      "postalCode": siteConfig.address.postalCode,
      "addressCountry": siteConfig.address.country
    },
    "sameAs": [
      "https://www.instagram.com/aurelien_cf/",
      "https://www.linkedin.com/in/aurélien-mazel-9807971a7/"
    ]
  };

  // Schema.org WebSite
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    "url": siteConfig.url,
    "name": siteConfig.name,
    "description": siteConfig.description,
    "publisher": {
      "@id": `${siteConfig.url}#person`
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "inLanguage": "fr-FR",
    "copyrightYear": new Date().getFullYear(),
    "copyrightHolder": {
      "@id": `${siteConfig.url}#person`
    }
  };

  // Schema.org Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}#service`,
    "name": "Coaching CrossFit Personnalisé",
    "description": "Services de coaching CrossFit personnalisé avec Aurélien MAZEL, coach certifié CF-L2 à Paris",
    "provider": {
      "@id": `${siteConfig.url}#business`
    },
    "areaServed": {
      "@type": "City",
      "name": "Paris"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Programmes de Coaching",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Découverte CrossFit",
          "description": "Programme d'initiation au CrossFit pour débutants",
          "category": "Fitness Training"
        },
        {
          "@type": "Offer", 
          "name": "Coaching Personnalisé",
          "description": "Accompagnement individuel adapté à vos objectifs",
          "category": "Personal Training"
        },
        {
          "@type": "Offer",
          "name": "Préparation Compétition",
          "description": "Entraînement spécialisé pour compétiteurs CrossFit",
          "category": "Athletic Training"
        }
      ]
    },
    "serviceType": "Fitness Training",
    "category": ["Fitness", "CrossFit", "Personal Training"],
    "audience": {
      "@type": "Audience",
      "audienceType": ["Athletes", "Fitness Enthusiasts", "Beginners"]
    }
  };

  // Schema.org FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce que le CrossFit ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le CrossFit est une méthode d'entraînement fonctionnel qui combine haltérophilie, gymnastique et cardio pour développer une condition physique complète."
        }
      },
      {
        "@type": "Question",
        "name": "Aurélien MAZEL est-il certifié ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, Aurélien MAZEL est certifié CrossFit Level 2 (CF-L2) et diplômé de l'Insed Fitness School. Il accompagne plus de 500 athlètes depuis 2018."
        }
      },
      {
        "@type": "Question",
        "name": "Où se déroulent les séances ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Les séances ont lieu à CrossFit Louvre III au 24 rue de Londres, 75009 Paris, ainsi qu'en coaching à distance selon vos préférences."
        }
      },
      {
        "@type": "Question",
        "name": "Le CrossFit est-il adapté aux débutants ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolument ! Aurélien propose des programmes spécialement conçus pour les débutants avec une progression adaptée et sécurisée."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
