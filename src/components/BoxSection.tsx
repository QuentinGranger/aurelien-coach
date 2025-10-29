'use client';

import { motion } from 'framer-motion';

const BoxSection = () => {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: "Coaching d'excellence",
      description: "Chaque séance est guidée par des coach·s passionné·s et diplômé·s, issus du terrain et du haut niveau. Leur mission : t'aider à progresser en toute sécurité, à ton rythme, avec un suivi personnalisé et humain à chaque étape."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
        </svg>
      ),
      title: "Un lieu qui motive",
      description: "Plus de 450 m² dédiés à la performance et au plaisir de bouger. Lumière, son, équipements Rogue : chaque détail a été pensé pour créer une énergie unique, qui te pousse à te dépasser à chaque séance."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2.01 1.01L12 13l-2-4H8c-.8 0-1.54.37-2.01 1.01L3.46 15.37A1.5 1.5 0 0 0 4.88 17H7.5v5h2v-5h1v5h2v-5h1v5h2z"/>
        </svg>
      ),
      title: "Une communauté soudée",
      description: "Ici, tu ne t'entraînes jamais seul·e. Tu rejoins une vraie équipe, où entraide, respect et bonne humeur sont au cœur de chaque WOD. Chaque effort est partagé, chaque progrès est célébré le tien comme celui des autres."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"/>
        </svg>
      ),
      title: "Tous les formats, un seul objectif : progresser",
      description: "CrossFit, Hyrox, haltérophilie, gymnastique, force, conditioning… Quel que soit ton niveau ou ton objectif, tu trouveras ici la variété, le coaching et la structure pour progresser avec intensité, confiance et plaisir."
    }
  ];

  const galleryImages = [
    {
      src: "/images/box/CrossFit-Louvre-Cours-Entraînement.jpg",
      alt: "Cours d'entraînement CrossFit Louvre - Séance en groupe"
    },
    {
      src: "/images/box/Crossfit-Louvre-3.jpg",
      alt: "Salle CrossFit Louvre - Équipements et espace d'entraînement"
    },
    {
      src: "/images/box/Crossfit-Louvre-3.png",
      alt: "Box CrossFit Louvre - Vue d'ensemble des installations"
    },
    {
      src: "/images/box/Salle-CrossFit-Saint-Lazare.png",
      alt: "Salle CrossFit Saint-Lazare - Espace premium d'entraînement"
    }
  ];

  return (
    <section id="box" className="box-section">
      <div className="container">
        <motion.div
          className="box-section__header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>La Box</h2>
          <p className="tagline">
            "Rejoins la communauté qui te fait grandir"
          </p>
          <p className="lead">
            Née de la passion du mouvement et de la performance, CrossFit Louvre III réunit tous ceux qui veulent se dépasser, du débutant à l'athlète confirmé.
            Plus qu'une salle, c'est une communauté soudée où l'exigence, le plaisir et le dépassement de soi se rencontrent chaque jour.
            Un lieu élégant, fonctionnel et inspirant, pensé pour t'aider à devenir la meilleure version de toi-même, quelle que soit ton point de départ.
          </p>
        </motion.div>

        <div className="box-section__content">
          <motion.div
            className="box-section__gallery"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {galleryImages.map((image, index) => (
              <motion.img
                key={index}
                src={image.src}
                alt={image.alt}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </motion.div>

          <motion.div
            className="box-section__features"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="box-section__features-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="box-section__features-item-icon">
                  {feature.icon}
                </div>
                <div className="box-section__features-item-content">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="box-section__cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: '4rem' }}
        >
          <a href="https://crossfitlouvre3.com/" target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
            Découvrir la Box
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BoxSection;
