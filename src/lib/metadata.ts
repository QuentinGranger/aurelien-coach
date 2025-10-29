import { Metadata } from 'next';

export const siteConfig = {
  name: "Aurélien Coach",
  title: "CrossFit Paris - Aurélien MAZEL Coach CF-L2 #1 | CrossFit Louvre Elite Transformation",
  description: "🥇 CrossFit Paris #1 avec Aurélien MAZEL, coach CrossFit certifié CF-L2. CrossFit Louvre III salle premium 450m². Transformation physique garantie, 500+ athlètes transformés. CrossFit Paris centre, coaching d'excellence, résultats prouvés depuis 2018.",
  url: "https://aurelien-coach.fr",
  ogImage: "/images/og-aurelien-coach.jpg",
  creator: "Aurélien MAZEL",
  phone: "+33651965512",
  email: "mazel.aurelien@hotmail.com",
  address: {
    street: "24 rue de Londres",
    city: "Paris",
    postalCode: "75009",
    country: "France"
  },
  business: {
    name: "Aurélien MAZEL - Coach Sportif",
    type: "Fitness Trainer",
    siret: "912 345 678 00019",
    founded: "2018"
  },
  keywords: [
    // Mots-clés ultra-prioritaires (répétition stratégique)
    "crossfit paris",
    "crossfit louvre", 
    "crossfit paris centre",
    "crossfit louvre iii",
    "crossfit louvre 3",
    "coach crossfit paris",
    "aurélien mazel coach",
    "crossfit paris #1",
    "meilleur crossfit paris",
    "crossfit louvre paris",
    // Mots-clés principaux
    "préparateur physique paris",
    "coach sportif paris 9",
    "salle crossfit paris",
    "box crossfit paris",
    // Mots-clés longue traîne
    "coach crossfit certifié cf-l2 paris",
    "entraînement crossfit personnalisé paris",
    "salle crossfit louvre châtelet",
    "coach musculation paris 9ème",
    "préparation physique crossfit paris",
    "transformation physique crossfit",
    // Mots-clés géolocalisés
    "crossfit paris 1er",
    "crossfit paris 2ème", 
    "crossfit paris 8ème",
    "crossfit paris 9ème",
    "crossfit châtelet les halles",
    "crossfit opéra paris",
    "crossfit grands boulevards",
    // Mots-clés techniques
    "cf-l2 trainer paris",
    "crossfit level 2 coach",
    "haltérophilie paris",
    "gymnastique crossfit",
    "conditioning crossfit",
    "wod crossfit paris",
    // Mots-clés de niche
    "coach crossfit femme paris",
    "crossfit débutant paris",
    "crossfit compétition paris",
    "crossfit games preparation",
    "functional fitness paris",
    "strength conditioning paris"
  ],
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.creator,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.creator,
  publisher: siteConfig.creator,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.creator} - Coach CrossFit Paris CF-L2`,
        type: "image/jpeg",
      },
      {
        url: "/images/og-aurelien-square.jpg",
        width: 1200,
        height: 1200,
        alt: `${siteConfig.creator} - Préparateur Physique Elite`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aurelien_cf",
    creator: "@aurelien_cf",
    title: siteConfig.title,
    description: siteConfig.description,
    images: {
      url: siteConfig.ogImage,
      alt: `${siteConfig.creator} - Coach CrossFit Paris`,
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  category: "fitness",
  classification: "Business",
  referrer: "origin-when-cross-origin",
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "black-translucent",
  },
  applicationName: siteConfig.name,
  appLinks: {
    web: {
      url: siteConfig.url,
      should_fallback: true,
    },
  },
  bookmarks: [siteConfig.url],
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "fr-FR": siteConfig.url,
      "en-US": `${siteConfig.url}/en`,
    },
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
    "theme-color": "#d4af37",
    "msapplication-TileColor": "#d4af37",
    "msapplication-config": "/browserconfig.xml",
  },
};
