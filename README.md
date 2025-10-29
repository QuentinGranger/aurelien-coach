# 🏋️ Site Aurélien Coach - Elite CrossFit Training

Site web premium pour coach CrossFit développé avec Next.js, TypeScript et SCSS. Design haut de gamme inspiré des marques fitness d'élite comme Nike Training Club et Rogue.

## ✨ Caractéristiques

### 🎨 Design Premium
- **Palette sombre élégante** : Noir profond, doré sobre, accents cuivre
- **Typographie premium** : Inter pour le texte, Monument Extended pour les titres
- **Animations fluides** : Framer Motion pour des transitions cinématiques
- **Responsive design** : Mobile-first, optimisé pour tous les écrans

### 🚀 Fonctionnalités
- **Hero section immersive** avec vidéo/image plein écran
- **Philosophie d'entraînement** : 3 piliers (Force, Résilience, Discipline)
- **Programmes détaillés** : Hypertrophie, Compétition, Performance Féminine, Personal Training
- **Témoignages clients** avec métriques de performance
- **Galerie de la Box** avec équipements premium
- **Formulaire de contact** avec validation
- **Barre de progression de scroll**
- **Bouton retour en haut** animé

### 🛠️ Technologies
- **Next.js 15** avec App Router
- **TypeScript** pour la sécurité des types
- **SCSS** avec architecture modulaire (BEM)
- **Framer Motion** pour les animations
- **Responsive design** sans framework CSS

## 🚀 Installation

```bash
# Cloner le projet
git clone [url-du-repo]
cd SiteAurelien

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
src/
├── app/                    # App Router Next.js
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React
│   ├── Header.tsx         # Navigation principale
│   ├── Footer.tsx         # Pied de page
│   ├── HeroSection.tsx    # Section hero
│   ├── PhilosophySection.tsx
│   ├── ProgramsSection.tsx
│   ├── ResultsSection.tsx
│   ├── BoxSection.tsx
│   ├── ContactSection.tsx
│   ├── ScrollProgress.tsx # Barre de progression
│   └── BackToTop.tsx      # Bouton retour haut
└── styles/                # Architecture SCSS
    ├── globals.scss       # Point d'entrée
    ├── abstracts/         # Variables, mixins, fonctions
    ├── base/              # Reset, typographie, base
    ├── layout/            # Header, footer, grid
    ├── components/        # Styles des composants
    └── pages/             # Styles spécifiques aux pages
```

## 🎨 Architecture SCSS

### Variables principales
- **Couleurs** : Palette sombre premium avec accents dorés
- **Typographie** : Système de tailles fluides avec clamp()
- **Espacement** : Échelle harmonieuse basée sur rem
- **Breakpoints** : Mobile-first responsive

### Mixins utilitaires
- **Responsive** : `@include respond-to(md)`
- **Flexbox** : `@include flex-center`, `@include flex-between`
- **Boutons** : `@include button-primary`, `@include button-secondary`
- **Cartes** : `@include card-premium`, `@include card-glass`
- **Animations** : `@include fade-in`, `@include slide-up`

## 📸 Images requises

Placer les images dans `public/images/` :

### Hero & Programmes
- `hero-poster.jpg` (1920x1080)
- `program-*.jpg` (600x400) - 4 images programmes

### Témoignages
- `testimonial-*.jpg` (200x200) - 3 avatars clients

### Box
- `box-*.jpg` (800x600) - 4 photos de la salle

### Vidéo
- `public/videos/hero-video.mp4` (1920x1080)

*Note : Le site utilise actuellement des images Unsplash comme placeholders.*

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Upload du dossier .next
```

## 📱 Optimisations

- **Performance** : Images optimisées, lazy loading
- **SEO** : Métadonnées complètes, structure sémantique
- **Accessibilité** : ARIA labels, navigation clavier
- **Core Web Vitals** : Optimisé pour les métriques Google

## 🎯 Personnalisation

### Couleurs
Modifier `src/styles/abstracts/_variables.scss` :
```scss
$color-primary-black: #0a0a0a;
$color-gold: #d4af37;
$color-copper: #b87333;
```

### Contenu
- Textes : Modifier directement dans les composants
- Images : Remplacer dans `public/images/`
- Métadonnées : `src/app/layout.tsx`

## 📞 Support

Pour toute question ou personnalisation, contactez le développeur.

---

**"Forgé par l'effort. Guidé par la performance."** ⚡
