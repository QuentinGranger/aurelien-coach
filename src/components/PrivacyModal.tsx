'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyModal = ({ isOpen, onClose }: PrivacyModalProps) => {
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
              <h2>Politique de confidentialité</h2>
              <p className="legal-modal__date">Dernière mise à jour : 29/10/2025</p>
              <button className="legal-modal__close" onClick={onClose}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>

            <div className="legal-modal__body">
              <section>
                <h3>1) Qui sommes-nous ?</h3>
                <p><strong>Éditeur / Responsable de traitement :</strong> Aurélien MAZEL, coach sportif & préparateur physique (auto-entrepreneur)</p>
                <p><strong>Adresse pro :</strong> 24 Rue de Londres, 75009 Paris, France</p>
                <p><strong>Tél. :</strong> 06 51 96 55 12 – <strong>E-mail :</strong> mazel.aurelien@hotmail.com</p>
                <p><strong>Site :</strong> https://aurelien-coach.fr</p>
                <p>Nous traitons vos données conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique & Libertés.</p>
              </section>

              <section>
                <h3>2) Quelles données collectons-nous ?</h3>
                <p>Selon vos interactions avec le site et nos services :</p>
                <ul>
                  <li><strong>Identification & contact :</strong> nom, prénom, e-mail, téléphone, message, préférences, objectifs.</li>
                  <li><strong>Données liées au coaching :</strong> historique d'échanges, suivi de séances, contraintes déclarées (non médicales).</li>
                  <li><strong>Facturation :</strong> identité, adresse de facturation, références de paiement (via prestataire).</li>
                  <li><strong>Technique / navigation :</strong> logs serveur, adresse IP tronquée/anonymisée (si analytics), cookies/traceurs, user agent.</li>
                  <li><strong>Réseaux sociaux :</strong> contenus intégrés (ex. Instagram) et données de navigation associées (via ces plateformes).</li>
                </ul>
                <p>Nous ne collectons pas de données dites « sensibles » au sens de l'art. 9 RGPD. Toute information de santé ne doit être transmise qu'à votre initiative et reste facultative (et traitée avec prudence, sans conservation excessive).</p>
              </section>

              <section>
                <h3>3) Finalités & bases légales</h3>
                <div className="privacy-table">
                  <div className="privacy-table__row privacy-table__header">
                    <div className="privacy-table__cell"><strong>Finalité</strong></div>
                    <div className="privacy-table__cell"><strong>Exemple</strong></div>
                    <div className="privacy-table__cell"><strong>Base légale</strong></div>
                  </div>
                  <div className="privacy-table__row">
                    <div className="privacy-table__cell">Répondre à vos demandes (contact/devis)</div>
                    <div className="privacy-table__cell">formulaires, e-mails</div>
                    <div className="privacy-table__cell">Exécution de mesures précontractuelles (art. 6-1-b)</div>
                  </div>
                  <div className="privacy-table__row">
                    <div className="privacy-table__cell">Exécuter les prestations</div>
                    <div className="privacy-table__cell">planification, suivi, échanges</div>
                    <div className="privacy-table__cell">Contrat (art. 6-1-b)</div>
                  </div>
                  <div className="privacy-table__row">
                    <div className="privacy-table__cell">Facturation & comptabilité</div>
                    <div className="privacy-table__cell">pièces comptables, TVA</div>
                    <div className="privacy-table__cell">Obligation légale (art. 6-1-c)</div>
                  </div>
                  <div className="privacy-table__row">
                    <div className="privacy-table__cell">Communication & prospection modérée</div>
                    <div className="privacy-table__cell">réponses, infos utiles, relances modérées</div>
                    <div className="privacy-table__cell">Intérêt légitime (art. 6-1-f) ou consentement</div>
                  </div>
                  <div className="privacy-table__row">
                    <div className="privacy-table__cell">Sécurité du site</div>
                    <div className="privacy-table__cell">logs, prévention fraude/abus</div>
                    <div className="privacy-table__cell">Intérêt légitime (art. 6-1-f)</div>
                  </div>
                  <div className="privacy-table__row">
                    <div className="privacy-table__cell">Mesure d'audience</div>
                    <div className="privacy-table__cell">analytics (GA4/Matomo)</div>
                    <div className="privacy-table__cell">Consentement (art. 6-1-a) — cookies non essentiels</div>
                  </div>
                </div>
              </section>

              <section>
                <h3>4) Origine des données</h3>
                <ul>
                  <li>Directement auprès de vous (formulaire, e-mail, téléphone, réseaux).</li>
                  <li>Automatiquement lors de la navigation (cookies/traceurs).</li>
                  <li>Éventuellement via des prestataires de prise de rendez-vous/paiement si activés.</li>
                </ul>
              </section>

              <section>
                <h3>5) Destinataires & sous-traitants</h3>
                <p>Accès limité au personnel habilité et aux prestataires suivants (utilisés ou susceptibles de l'être selon les modules activés) :</p>
                <ul>
                  <li><strong>Hébergement & diffusion :</strong> Vercel Inc. (USA) – hébergement/edge.</li>
                  <li><strong>Messagerie :</strong> Microsoft (Hotmail/Outlook) pour la boîte mazel.aurelien@hotmail.com.</li>
                  <li><strong>Mesure d'audience :</strong> Google Analytics 4 (Google Ireland/LLC) avec IP anonymisée (à activer selon consentement) — ou Matomo auto-hébergé (alternative).</li>
                  <li><strong>Paiement (si vente en ligne activée) :</strong> Stripe Payments Europe (UE) / Stripe, Inc. (USA).</li>
                  <li><strong>Prise de rendez-vous (si activée) :</strong> Calendly (UE/USA) ou équivalent.</li>
                  <li><strong>Réseaux sociaux / intégrations :</strong> Instagram / YouTube (Meta/Google) pour l'affichage de contenus intégrés.</li>
                </ul>
                <p>Chacun intervient au titre de sous-traitant au sens du RGPD (ou de responsable conjoint/indépendant pour certaines plateformes sociales). <strong>Aucune vente de données à des tiers.</strong></p>
              </section>

              <section>
                <h3>6) Transferts hors de l'Union européenne</h3>
                <p>Certains prestataires peuvent impliquer des transferts vers les États-Unis. Dans ce cas, ils s'appuient sur des Clauses Contractuelles Types (CCT/SCC) et/ou des mécanismes d'adéquation disponibles. Les liens vers leurs politiques de confidentialité sont accessibles sur leurs sites.</p>
              </section>

              <section>
                <h3>7) Durées de conservation</h3>
                <ul>
                  <li><strong>Prospects</strong> (contact sans suite) : 3 ans après le dernier échange.</li>
                  <li><strong>Clients :</strong> durée de la relation + 5 ans (preuve), pièces comptables 10 ans.</li>
                  <li><strong>Candidatures :</strong> 2 ans après dernier contact.</li>
                  <li><strong>Cookies analytics :</strong> max 13 mois ; autres cookies selon finalité (cf. §10).</li>
                  <li><strong>Logs techniques :</strong> quelques semaines à quelques mois selon sécurité/diagnostic.</li>
                </ul>
              </section>

              <section>
                <h3>8) Vos droits</h3>
                <p>Vous disposez des droits d'<strong>accès, rectification, effacement, limitation, opposition, portabilité</strong>, ainsi que du droit d'établir des <strong>directives post-mortem</strong>.</p>
                <p>Pour les exercer : écrivez à <strong>mazel.aurelien@hotmail.com</strong> en joignant un justificatif d'identité si nécessaire.</p>
                <p>Vous pouvez introduire une réclamation auprès de la <strong>CNIL</strong> (cnil.fr – 3 Place de Fontenoy, 75007 Paris).</p>
                <p><strong>DPO :</strong> non désigné. Pour toute question RGPD, utilisez le contact ci-dessus.</p>
              </section>

              <section>
                <h3>9) Sécurité</h3>
                <p>Mesures raisonnables : HTTPS, sauvegardes, contrôle d'accès, journalisation, protections anti-attaque, chiffrement côté prestataires (quand disponible). Vous êtes responsable de la sécurité de vos équipements et de vos accès.</p>
              </section>

              <section>
                <h3>10) Cookies & traceurs</h3>
                <p>Un bandeau de consentement vous permet d'accepter/refuser les cookies non essentiels et de modifier vos choix à tout moment via le lien « Gérer mes cookies » en pied de page.</p>
                <h4>Catégories de cookies (exemples) :</h4>
                <ul>
                  <li><strong>Nécessaires (exemptés) :</strong> session utilisateur, choix de consentement, protection CSRF.</li>
                  <li><strong>Mesure d'audience (soumis à consentement) :</strong> *_ga, *_ga_* (GA4) ou cookies Matomo équivalents.</li>
                  <li><strong>Médias & réseaux sociaux :</strong> cookies propres aux plateformes lorsque vous lisez une vidéo YouTube ou affichez un post Instagram intégré.</li>
                </ul>
                <h4>Durées indicatives :</h4>
                <ul>
                  <li><strong>Nécessaires :</strong> durée de session à 12 mois.</li>
                  <li><strong>Analytics :</strong> jusqu'à 13 mois.</li>
                  <li><strong>Sociaux :</strong> selon les plateformes tierces.</li>
                </ul>
              </section>

              <section>
                <h3>11) Mineur·e·s</h3>
                <p>Le site n'est pas destiné aux personnes de moins de 15 ans (âge du consentement numérique en France). Les demandes de coaching pour mineur·e se font via le représentant légal.</p>
              </section>

              <section>
                <h3>12) Liens externes & contenus embarqués</h3>
                <p>Des liens et contenus tiers (ex. Instagram, YouTube) peuvent être présentés. Nous n'en contrôlons ni le contenu ni la collecte éventuelle de données par ces services. Veuillez consulter leurs politiques de confidentialité.</p>
              </section>

              <section>
                <h3>13) Prise de rendez-vous, paiement & documents contractuels</h3>
                <p>Si la prise de rendez-vous en ligne (ex. Calendly) ou le paiement (ex. Stripe) sont activés, vos données nécessaires à ces opérations sont traitées par ces prestataires pour exécuter le contrat et prévenir la fraude. Les reçus et factures sont conservés au titre des obligations comptables et fiscales.</p>
              </section>

              <section>
                <h3>14) Mise à jour de la politique</h3>
                <p>Nous pouvons modifier cette politique pour refléter l'évolution de nos services ou du cadre légal. La date de dernière mise à jour figure en en-tête. En cas de changement majeur, une information appropriée sera affichée sur le site.</p>
              </section>

              <section>
                <h3>15) Contact</h3>
                <p>Pour toute question relative à cette politique ou à vos données :</p>
                <p><strong>Aurélien MAZEL</strong> — 24 Rue de Londres, 75009 Paris — 06 51 96 55 12 — mazel.aurelien@hotmail.com</p>
              </section>

              <section className="legal-modal__summary">
                <h3>📊 Annexe — Tableau récapitulatif</h3>
                <div className="privacy-table">
                  <div className="privacy-table__row privacy-table__header">
                    <div className="privacy-table__cell"><strong>Catégorie</strong></div>
                    <div className="privacy-table__cell"><strong>Données</strong></div>
                    <div className="privacy-table__cell"><strong>Finalité</strong></div>
                    <div className="privacy-table__cell"><strong>Base légale</strong></div>
                    <div className="privacy-table__cell"><strong>Durée</strong></div>
                  </div>
                  <div className="privacy-table__row">
                    <div className="privacy-table__cell">Contact</div>
                    <div className="privacy-table__cell">Nom, e-mail, tél., message</div>
                    <div className="privacy-table__cell">Réponse, devis</div>
                    <div className="privacy-table__cell">6-1-b</div>
                    <div className="privacy-table__cell">3 ans si sans suite</div>
                  </div>
                  <div className="privacy-table__row">
                    <div className="privacy-table__cell">Coaching</div>
                    <div className="privacy-table__cell">Échanges, suivi, préférences</div>
                    <div className="privacy-table__cell">Exécution & suivi</div>
                    <div className="privacy-table__cell">6-1-b</div>
                    <div className="privacy-table__cell">Relation + 5 ans</div>
                  </div>
                  <div className="privacy-table__row">
                    <div className="privacy-table__cell">Facturation</div>
                    <div className="privacy-table__cell">Identité, adresse, refs paiement</div>
                    <div className="privacy-table__cell">Obligations comptables</div>
                    <div className="privacy-table__cell">6-1-c</div>
                    <div className="privacy-table__cell">10 ans</div>
                  </div>
                  <div className="privacy-table__row">
                    <div className="privacy-table__cell">Sécurité</div>
                    <div className="privacy-table__cell">Logs, IP, user agent</div>
                    <div className="privacy-table__cell">Sécurité/diagnostic</div>
                    <div className="privacy-table__cell">6-1-f</div>
                    <div className="privacy-table__cell">qq semaines/mois</div>
                  </div>
                  <div className="privacy-table__row">
                    <div className="privacy-table__cell">Analytics</div>
                    <div className="privacy-table__cell">ID cookie, pages vues</div>
                    <div className="privacy-table__cell">Statistiques</div>
                    <div className="privacy-table__cell">6-1-a</div>
                    <div className="privacy-table__cell">≤ 13 mois</div>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyModal;
