'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface CGVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CGVModal = ({ isOpen, onClose }: CGVModalProps) => {
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
              <h2>Conditions Générales de Vente (CGV)</h2>
              <p className="legal-modal__date">Dernière mise à jour : 29/10/2025</p>
              <button className="legal-modal__close" onClick={onClose}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>

            <div className="legal-modal__body">
              <section>
                <h3>Éditeur / Vendeur</h3>
                <p><strong>Aurélien MAZEL</strong> – Coach sportif & préparateur physique</p>
                <p><strong>Statut :</strong> Auto-entrepreneur (entreprise individuelle) – SIRET : 912 345 678 00019 (fictif, à remplacer)</p>
                <p><strong>Adresse pro :</strong> 24 Rue de Londres, 75009 Paris, France</p>
                <p><strong>Tél. :</strong> 06 51 96 55 12 – <strong>E-mail :</strong> mazel.aurelien@hotmail.com</p>
                <p><strong>Site :</strong> https://aurelien-coach.fr</p>
              </section>

              <section>
                <h3>Article 1 — Objet</h3>
                <p>Les présentes CGV encadrent la vente de prestations de coaching sportif (séances individuelles/collectives, programmes personnalisés, suivi en ligne, bilans) proposées par l'Éditeur au consommateur et/ou au client professionnel.</p>
              </section>

              <section>
                <h3>Article 2 — Champ d'application</h3>
                <p>Les CGV s'appliquent à toute commande passée via le site, par e-mail, téléphone, messagerie ou sur place. La validation d'une commande vaut acceptation pleine et entière des CGV, sans réserve.</p>
              </section>

              <section>
                <h3>Article 3 — Prestations proposées</h3>
                <ul>
                  <li>Séances individuelles (en présentiel ou à distance).</li>
                  <li>Séances collectives / Small Group (en salle partenaire ou extérieur).</li>
                  <li>Programmes & suivis en ligne (personnalisés, avec retours réguliers).</li>
                  <li>Bilans & évaluations (tests, objectifs, plan d'action).</li>
                  <li>Interventions en entreprise (bien-être, team building, conférences).</li>
                </ul>
                <p><strong>Lieu :</strong> Paris et alentours, et/ou CrossFit Louvre III (selon planning), ou en ligne.</p>
                <p><strong>Prérequis :</strong> aptitude médicale à la pratique sportive. Un certificat médical peut être demandé.</p>
              </section>

              <section>
                <h3>Article 4 — Commande & réservation</h3>
                <p>La commande se fait via : (i) formulaire/agenda en ligne, (ii) e-mail, (iii) téléphone, (iv) sur place.</p>
                <p>La réservation d'un créneau est confirmée après paiement (total ou acompte, cf. art. 6) ou par confirmation écrite de l'Éditeur. L'Éditeur se réserve le droit de refuser une commande pour motif légitime (sécurité, indisponibilité, défaut de paiement antérieur).</p>
              </section>

              <section>
                <h3>Article 5 — Tarifs</h3>
                <p>Les prix sont indiqués en euros.</p>
                <p><strong>TVA non applicable</strong>, article 293 B du CGI (régime auto-entrepreneur).</p>
                <p>Les tarifs en vigueur sont ceux affichés au jour de la commande (site, devis, plaquette). L'Éditeur peut modifier ses prix à tout moment, sans effet rétroactif sur les commandes déjà validées.</p>
              </section>

              <section>
                <h3>Article 6 — Paiement</h3>
                <p><strong>Moyens acceptés :</strong> carte bancaire (lien de paiement / terminal), virement, espèces [optionnel], [chèques non acceptés].</p>
                <p><strong>Prestataires de paiement :</strong> [Stripe / SumUp / autre].</p>
                <p><strong>Échéance :</strong> à la commande ou au plus tard avant la séance (packs/abonnements : selon échéancier).</p>
                <p><strong>Retard / impayé :</strong> tout retard entraîne exigibilité immédiate des sommes dues ; l'Éditeur peut suspendre l'accès aux séances jusqu'au règlement.</p>
              </section>

              <section>
                <h3>Article 7 — Droit de rétractation (consommateurs)</h3>
                <p>Conformément aux art. L221-18 et s. du Code de la consommation :</p>
                <p>Pour les prestations programmées à une date/période déterminée (ex. séance du 12/11 à 18h), relevant des activités de loisirs, <strong>le droit de rétractation ne s'applique pas</strong> (art. L221-28 12°).</p>
                <p>Pour les programmes/suivis en ligne non datés : droit de rétractation 14 jours à compter de la commande, à condition que l'exécution n'ait pas débuté avec ton accord exprès avant la fin du délai. En cas d'exécution partielle sur demande, un montant proportionnel reste dû.</p>
                <p><strong>Modalités :</strong> envoi d'un e-mail non équivoque à mazel.aurelien@hotmail.com.</p>
              </section>

              <section>
                <h3>Article 8 — Annulation / report / no-show</h3>
                <p>Sauf dispositions spécifiques du devis/contrat :</p>
                <ul>
                  <li><strong>&gt; 24 h avant la séance :</strong> annulation ou report gratuit.</li>
                  <li><strong>Entre 24 h et 12 h :</strong> 50 % du prix de la séance est dû.</li>
                  <li><strong>&lt; 12 h ou no-show</strong> (absence sans prévenir) : 100 % dû / séance consommée.</li>
                </ul>
                <p>Pour les packs : une séance annulée hors délai est décomptée.</p>
                <p>L'Éditeur peut reporter une séance en cas d'empêchement (maladie, incident, force majeure) ; un nouveau créneau est alors proposé sans frais.</p>
              </section>

              <section>
                <h3>Article 9 — Packs, abonnements & validité</h3>
                <ul>
                  <li><strong>Packs 5 séances :</strong> validité 3 mois à compter de l'achat.</li>
                  <li><strong>Packs 10 séances :</strong> validité 6 mois à compter de l'achat.</li>
                </ul>
                <p>Sauf stipulation contraire, packs non remboursables, prolongeables en cas de motif légitime (certificat médical) et cessibles une fois sur simple demande écrite.</p>
                <p><strong>Abonnements</strong> (si proposés) : reconduction mensuelle tacite, résiliables à tout moment pour l'échéance suivante avec préavis de 7 jours.</p>
              </section>

              <section>
                <h3>Article 10 — Cartes-cadeaux & codes promo</h3>
                <p>Les cartes-cadeaux sont valables 12 mois à compter de l'achat, non remboursables, utilisables sur les prestations éligibles. Les codes promotionnels sont non cumulables, non convertibles en numéraire et valables sur la période indiquée.</p>
              </section>

              <section>
                <h3>Article 11 — Obligations du/de la client·e</h3>
                <ul>
                  <li>Déclarer toute contre-indication médicale et fournir un certificat si demandé.</li>
                  <li>Arriver à l'heure et avec une tenue/chaussures adaptées.</li>
                  <li>Respecter les consignes de sécurité et le matériel.</li>
                  <li>Prévenir l'Éditeur de tout douleur/blessure ou traitement en cours.</li>
                </ul>
                <p>Le client reste responsable de sa pratique ; l'Éditeur se réserve le droit d'interrompre une séance si la sécurité l'exige.</p>
              </section>

              <section>
                <h3>Article 12 — Assurance & responsabilité</h3>
                <p>L'Éditeur est couvert par une Responsabilité Civile Professionnelle [Compagnie / n° à compléter].</p>
                <p>L'Éditeur n'est pas responsable des objets personnels perdus/volés, ni des dommages indirects. Sa responsabilité ne peut excéder le montant de la prestation litigieuse.</p>
              </section>

              <section>
                <h3>Article 13 — Conditions spécifiques "Entreprise / Événement"</h3>
                <p>Les prestations en entreprise ou événements font l'objet d'un devis/contrat précisant objectifs, lieu, matériel, effectifs, sécurité, prix, conditions d'annulation spécifiques et assurances.</p>
              </section>

              <section>
                <h3>Article 14 — Propriété intellectuelle & droit à l'image</h3>
                <p>Les programmes, supports, textes, images et vidéos fournis restent la propriété de l'Éditeur ; toute reproduction/diffusion est interdite sans accord écrit.</p>
                <p>L'utilisation d'images/vidéos du/de la client·e à des fins de communication se fait uniquement avec consentement écrit.</p>
              </section>

              <section>
                <h3>Article 15 — Données personnelles</h3>
                <p>Traitement conforme au RGPD. Voir la Politique de confidentialité du site.</p>
                <p><strong>Responsable :</strong> Aurélien MAZEL – mazel.aurelien@hotmail.com.</p>
                <p><strong>Droits :</strong> accès, rectification, effacement, opposition, portabilité, limitation ; réclamation CNIL (cnil.fr).</p>
              </section>

              <section>
                <h3>Article 16 — Force majeure</h3>
                <p>Aucune partie n'est responsable d'un manquement dû à un événement de force majeure (ex. grève générale, catastrophe, épidémie, décision administrative, panne majeure). L'exécution est suspendue pendant la durée de l'événement ; des aménagements ou reports seront proposés.</p>
              </section>

              <section>
                <h3>Article 17 — Réclamations & médiation</h3>
                <p>Toute réclamation peut être adressée à mazel.aurelien@hotmail.com.</p>
                <p>À défaut de solution dans 60 jours, le consommateur peut saisir gratuitement un médiateur :</p>
                <p><strong>CNPM Médiation Consommation</strong> – https://www.cnpm-mediation-consommation.eu</p>
                <p><strong>Plateforme européenne RLL/ODR :</strong> https://ec.europa.eu/consumers/odr/</p>
              </section>

              <section>
                <h3>Article 18 — Droit applicable & juridiction</h3>
                <p>Les présentes sont soumises au droit français. En cas de litige et à défaut d'accord amiable, compétence des juridictions françaises compétentes (ou du domicile du consommateur selon les règles protectrices).</p>
              </section>

              <section>
                <h3>Article 19 — Preuve & signature électronique</h3>
                <p>Les e-mails, confirmations, systèmes de réservation et registres électroniques font foi entre les parties. La signature électronique et le paiement en ligne valent engagement.</p>
              </section>

              <section>
                <h3>Article 20 — Modifications</h3>
                <p>L'Éditeur peut modifier les présentes CGV à tout moment. La version applicable est celle en vigueur à la date de la commande. La date de dernière mise à jour figure en en-tête.</p>
              </section>

              <section className="legal-modal__summary">
                <h3>📋 Encadré pratique</h3>
                <ul>
                  <li><strong>Annulation :</strong> &gt;24 h = gratuit ; 24–12 h = 50 % ; &lt;12 h / no-show = 100 %.</li>
                  <li><strong>Packs :</strong> 5 = 3 mois ; 10 = 6 mois. Non remboursables, prolongeables sur motif légitime, cessibles 1 fois.</li>
                  <li><strong>TVA :</strong> non applicable (art. 293 B).</li>
                  <li><strong>Contact :</strong> 06 51 96 55 12 – mazel.aurelien@hotmail.com</li>
                </ul>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CGVModal;
