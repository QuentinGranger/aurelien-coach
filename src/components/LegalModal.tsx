'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LegalModal = ({ isOpen, onClose }: LegalModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="legal-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="legal-modal__content"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="legal-modal__header">
              <h2>Mentions légales</h2>
              <p className="legal-modal__date">Dernière mise à jour : 29/10/2025</p>
              <button className="legal-modal__close" onClick={onClose}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>

            <div className="legal-modal__body">
              <section>
                <h3>1) Éditeur du site</h3>
                <p><strong>Nom / Raison sociale :</strong> Aurélien MAZEL – Coach sportif & préparateur physique</p>
                <p><strong>Nom commercial :</strong> Coach Aurélien Mazel</p>
                <p><strong>Statut juridique :</strong> Auto-entrepreneur (entreprise individuelle)</p>
                <p><strong>SIREN / SIRET :</strong> 912 345 678 / 912 345 678 00019 (fictif, à remplacer)</p>
                <p><strong>Siège / adresse professionnelle :</strong> 24 Rue de Londres, 75009 Paris, France</p>
                <p><strong>Téléphone :</strong> 06 51 96 55 12</p>
                <p><strong>E-mail :</strong> mazel.aurelien@hotmail.com</p>
                <p><strong>Site :</strong> https://aurelien-coach.fr</p>
                <p><strong>Directeur de la publication :</strong> Aurélien MAZEL</p>
                <p><strong>Encadrement sportif :</strong> activité soumise aux art. L212-1 et s. du Code du sport.</p>
                <p><strong>Titre professionnel :</strong> formation validée – Insed Fitness School.</p>
                <p><strong>Certification CrossFit :</strong> CF-L2 (CrossFit Level 2 Trainer).</p>
                <p><strong>Carte professionnelle d'éducateur·rice sportif·ve :</strong> à compléter (n° et autorité de délivrance).</p>
                <p><strong>Assurance Responsabilité Civile Professionnelle :</strong> à compléter (compagnie, n°, adresse).</p>
              </section>

              <section>
                <h3>2) Hébergeur du site</h3>
                <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                <p><strong>Adresse :</strong> 440 N Barranca Ave, #4133, Covina, CA 91723, USA</p>
                <p><strong>Site :</strong> https://vercel.com</p>
                <p><strong>Support :</strong> support@vercel.com – privacy@vercel.com</p>
              </section>

              <section>
                <h3>3) Conception – réalisation</h3>
                <p><strong>Conception & développement :</strong> Quentin SAVIGNY (freelance)</p>
                <p><strong>E-mail :</strong> da.quentin.savigny@gmail.com</p>
                <p><strong>Adresse :</strong> 38 Rue Caulaincourt, 75018 Paris, France</p>
                <p><strong>Instagram :</strong> @qntn.exe – https://www.instagram.com/qntn.exe/</p>
              </section>

              <section>
                <h3>4) Objet du site</h3>
                <p>Site vitrine présentant les prestations de coaching sportif, la préparation physique, des programmes personnalisés, des témoignages et les moyens de contact / réservation. Les informations peuvent évoluer sans préavis.</p>
              </section>

              <section>
                <h3>5) Propriété intellectuelle</h3>
                <p>L'ensemble du site (textes, visuels, vidéos, logos, icônes, architecture, bases de données, code) est protégé par le Code de la propriété intellectuelle.</p>
                <p>Toute reproduction, représentation, adaptation, diffusion sans autorisation écrite de l'éditeur est interdite.</p>
                <p>CrossFit® est une marque déposée de CrossFit, LLC ; les autres marques citées appartiennent à leurs propriétaires respectifs.</p>
              </section>

              <section>
                <h3>6) Données personnelles (RGPD)</h3>
                <p><strong>Responsable de traitement :</strong> Aurélien MAZEL – mazel.aurelien@hotmail.com</p>
                <p><strong>Bases légales :</strong> exécution (pré)contractuelle, consentement, intérêt légitime, obligations légales.</p>
                <p><strong>Catégories de données :</strong> identité et contact (formulaire), objectifs sportifs, historique d'échanges/séances, facturation (via prestataire de paiement), données techniques (logs, cookies/mesures d'audience).</p>
                <p><strong>Finalités :</strong> répondre aux demandes, planifier/réaliser les prestations, suivi client, amélioration du service, sécurité du site, obligations comptables.</p>
                <p><strong>Destinataires :</strong> l'éditeur et ses prestataires habilités (hébergement, e-mailing, agenda/CRM, analytics/paiement). Aucune vente de données.</p>
                <p><strong>Transferts hors UE :</strong> possibles via certains prestataires (ex. hébergeur) avec garanties adéquates (clauses contractuelles types, pays adéquats).</p>
                <h4>Durées de conservation – principes :</h4>
                <ul>
                  <li>Prospects : 3 ans après dernier contact ;</li>
                  <li>Clients : durée de la relation + 5 ans (preuve) ; pièces comptables 10 ans ;</li>
                  <li>Candidatures : 2 ans ;</li>
                  <li>Cookies/mesures : cf. §8.</li>
                </ul>
                <p><strong>Vos droits :</strong> accès, rectification, effacement, limitation, opposition, portabilité, directives post-mortem.</p>
                <p>Exercez-les à mazel.aurelien@hotmail.com (joindre un justificatif d'identité).</p>
                <p>En cas de difficulté non résolue : CNIL – cnil.fr – 3 Place de Fontenoy, 75007 Paris.</p>
              </section>

              <section>
                <h3>7) Sécurité</h3>
                <p>Mesures raisonnables : HTTPS, sauvegardes, contrôle d'accès, journalisation, chiffrement côté prestataires lorsque disponible.</p>
                <p>Vous êtes responsable de la sécurité de votre équipement et des informations que vous nous transmettez.</p>
              </section>

              <section>
                <h3>8) Cookies & traceurs</h3>
                <p>Le site peut utiliser des cookies/technologies similaires pour :</p>
                <ul>
                  <li>Fonctionnement (session, préférences, consentement),</li>
                  <li>Mesure d'audience (ex. Google Analytics avec IP anonymisée / Matomo),</li>
                  <li>Contenus tiers (Instagram, YouTube, etc.).</li>
                </ul>
                <p>Un bandeau de consentement est proposé pour les cookies non indispensables ; vous pouvez retirer votre consentement à tout moment via le panneau de gestion des cookies (lien dans le pied de page) ou votre navigateur.</p>
                <p>Durées indicatives : fonctionnels (session → 12 mois max), analytics (13 mois max), sociaux (selon plateformes).</p>
              </section>

              <section>
                <h3>9) Liens externes & réseaux sociaux</h3>
                <p>Le site peut contenir des liens vers des sites/plateformes tiers. L'éditeur n'exerce aucun contrôle sur leurs contenus ni leurs politiques et décline toute responsabilité s'y rapportant.</p>
                <p>L'usage des plugins sociaux peut entraîner des échanges de données avec ces plateformes.</p>
              </section>

              <section>
                <h3>10) Responsabilité</h3>
                <p>Les informations sont fournies "en l'état". Malgré le soin apporté, des erreurs/indisponibilités peuvent survenir ; l'éditeur ne saurait être tenu responsable d'un préjudice indirect lié à l'usage du site.</p>
                <p>Les contenus d'entraînement ne constituent pas un avis médical. En cas de pathologie, grossesse, reprise, demandez un avis médical. Vous pratiquez sous votre responsabilité.</p>
              </section>

              <section>
                <h3>11) Réservations & prestations</h3>
                <p>Prestations individuelles/collectives, en présentiel ou à distance, sur devis.</p>
                <p>Les conditions spécifiques (tarifs, annulation/report, validité des packs, certificats médicaux, lieux, matériel) figurent dans les CGV / contrat de prestation communiqués lors de la réservation/paiement en ligne.</p>
              </section>

              <section>
                <h3>12) Médiation de la consommation</h3>
                <p>Conformément à l'art. L612-1 du Code de la consommation, le client consommateur peut recourir gratuitement à un médiateur après démarche écrite préalable auprès de l'éditeur restée sans solution sous 60 jours.</p>
                <p>Médiateur pressenti : CNPM Médiation Consommation (à confirmer/adhésion) — https://www.cnpm-mediation-consommation.eu</p>
                <p>Le consommateur peut aussi utiliser la plateforme européenne RLL/ODR : https://ec.europa.eu/consumers/odr/</p>
              </section>

              <section>
                <h3>13) Droit d'opposition au démarchage téléphonique</h3>
                <p>Inscription possible sur la liste Bloctel (www.bloctel.gouv.fr).</p>
              </section>

              <section>
                <h3>14) Droit applicable – juridiction</h3>
                <p>Les présentes sont soumises au droit français. À défaut d'accord amiable, compétence des juridictions françaises compétentes (ou du domicile du consommateur lorsque la loi l'impose).</p>
              </section>

              <section>
                <h3>15) Modifications</h3>
                <p>L'éditeur peut modifier les présentes à tout moment. La date de dernière mise à jour figure en tête du document.</p>
              </section>

              <section>
                <h3>Crédits & Ressources</h3>
                <h4>Typographies</h4>
                <ul>
                  <li><strong>Inter</strong> – Google Fonts — SIL Open Font License 1.1 (OFL) — usage commercial OK.</li>
                  <li><strong>Monument Extended</strong> – police premium (fonderie : Pangram Pangram) — licence commerciale requise.</li>
                  <li><strong>Monaco / Menlo / Ubuntu Mono</strong> – fallbacks système (Ubuntu Mono : Ubuntu Font License).</li>
                </ul>
                <h4>Icônes</h4>
                <p>Icônes SVG inline style Material Icons (viewBox 24×24).</p>
                <p>Licence : Apache 2.0 – "Material Icons / Material Symbols, Google".</p>
              </section>

              <section className="legal-modal__health-warning">
                <h3>⚠️ Encadré santé & sécurité</h3>
                <p><strong>La pratique sportive comporte des risques.</strong> Assurez-vous d'être apte (certificat médical si nécessaire).</p>
                <p>Signalez toute douleur/blessure/traitement ; respectez les consignes de sécurité et de progression données par le coach.</p>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;
