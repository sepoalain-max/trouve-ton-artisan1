// =============================================================================
// StepGuide.jsx – Section "Comment trouver mon artisan ?" (page d'accueil)
// =============================================================================
import React from 'react';

const STEPS = [
  {
    number: '01',
    title: 'Choisir la catégorie',
    description: "Parcourez nos catégories d'artisanat : bâtiment, services, fabrication ou alimentation.",
    icon: 'bi-grid-3x3-gap',
    color: '#0074c7',
  },
  {
    number: '02',
    title: 'Choisir un artisan',
    description: 'Consultez les fiches détaillées des artisans : note, spécialité et localisation.',
    icon: 'bi-person-badge',
    color: '#00497c',
  },
  {
    number: '03',
    title: 'Le contacter',
    description: 'Remplissez le formulaire de contact directement sur la fiche de l\'artisan.',
    icon: 'bi-envelope',
    color: '#82b864',
  },
  {
    number: '04',
    title: 'Recevoir une réponse',
    description: "L'artisan vous répondra sous 48h avec un devis ou des informations sur ses prestations.",
    icon: 'bi-chat-dots',
    color: '#cd2c2e',
  },
];

function StepGuide() {
  return (
    <section className="py-5" aria-labelledby="guide-title">
      <div className="container-xl">

        <div className="text-center mb-5">
          <h2 id="guide-title" className="section-title">
            Comment trouver mon artisan ?
          </h2>
          <div className="divider mx-auto" />
          <p className="text-muted" style={{ maxWidth: 520, margin: '0 auto' }}>
            Trouvez et contactez un artisan qualifié en quelques étapes simples.
          </p>
        </div>

        <ol className="row g-4 list-unstyled" aria-label="Étapes pour trouver un artisan">
          {STEPS.map((step, idx) => (
            <li key={idx} className="col-12 col-sm-6 col-lg-3">
              <div
                className="text-center p-4 h-100 rounded-3 bg-white shadow-sm"
                style={{ border: `2px solid ${step.color}20` }}
              >
                {/* Numéro */}
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle mx-auto mb-3"
                  style={{
                    width: 56,
                    height: 56,
                    backgroundColor: `${step.color}15`,
                    border: `2px solid ${step.color}40`,
                  }}
                  aria-hidden="true"
                >
                  <i
                    className={`bi ${step.icon}`}
                    style={{ fontSize: '1.4rem', color: step.color }}
                  />
                </div>

                {/* Étape */}
                <p
                  className="mb-1 fw-bold"
                  style={{ fontSize: '0.75rem', color: step.color, letterSpacing: 1, textTransform: 'uppercase' }}
                >
                  Étape {step.number}
                </p>

                <h3 className="h6 fw-bold mb-2" style={{ color: '#384050' }}>
                  {step.title}
                </h3>
                <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}

export default StepGuide;
