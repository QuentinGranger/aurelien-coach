import { Metadata } from 'next';
import { siteConfig } from '@/lib/metadata';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Coach CrossFit Paris - Aurélien MAZEL Certifié CF-L2 | Transformation Garantie',
  description: '🏆 Aurélien MAZEL, coach CrossFit certifié CF-L2 à Paris. Spécialiste transformation physique et performance. CrossFit Louvre III, 500+ athlètes transformés. Séance test offerte.',
  keywords: [
    'coach crossfit paris',
    'aurélien mazel coach',
    'coach crossfit certifié cf-l2',
    'crossfit paris centre',
    'coach sportif paris 9',
    'transformation physique crossfit',
    'préparateur physique paris',
    'crossfit louvre',
    'coach crossfit professionnel',
    'entraînement crossfit paris'
  ],
  alternates: {
    canonical: `${siteConfig.url}/coach-crossfit-paris`,
  },
  openGraph: {
    title: 'Coach CrossFit Paris - Aurélien MAZEL CF-L2 | Transformation Garantie',
    description: '🏆 Coach CrossFit certifié CF-L2 à Paris. Transformation physique garantie avec Aurélien MAZEL. 500+ athlètes transformés depuis 2018.',
    url: `${siteConfig.url}/coach-crossfit-paris`,
    images: [
      {
        url: '/images/aurelien-coach-crossfit-paris.jpg',
        width: 1200,
        height: 630,
        alt: 'Aurélien MAZEL - Coach CrossFit Paris CF-L2',
      },
    ],
  },
};

export default function CoachCrossFitParisPage() {
  // Redirect to main page with anchor
  redirect('/#philosophy');
}
