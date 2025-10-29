'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="container">
        <motion.div
          className="not-found__content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="not-found__logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="/images/LogoAurelien-v2.png"
              alt="Aurélien Coach"
              width={200}
              height={56}
              priority
            />
          </motion.div>

          <motion.div
            className="not-found__error"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1 className="not-found__code">404</h1>
            <div className="not-found__divider"></div>
            <h2 className="not-found__title">Page introuvable</h2>
          </motion.div>

          <motion.p
            className="not-found__message"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Désolé, la page que vous cherchez n'existe pas ou a été déplacée.
            <br />
            Peut-être cherchiez-vous des informations sur mes programmes de coaching ?
          </motion.p>

          <motion.div
            className="not-found__actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="/" className="btn btn--primary btn--lg">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              Retour à l'accueil
            </Link>
            
            <Link href="#contact" className="btn btn--outline btn--lg">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Me contacter
            </Link>
          </motion.div>

          <motion.div
            className="not-found__suggestions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h3>Vous pourriez être intéressé par :</h3>
            <div className="not-found__links">
              <Link href="#programs" className="not-found__link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Mes programmes
              </Link>
              <Link href="#philosophy" className="not-found__link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Ma méthode
              </Link>
              <Link href="#results" className="not-found__link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                </svg>
                Résultats clients
              </Link>
              <Link href="#box" className="not-found__link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                La Box
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="not-found__quote"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <blockquote>
              "Chaque détour peut devenir un nouveau chemin vers l'excellence."
            </blockquote>
            <cite>— Aurélien, Coach</cite>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
