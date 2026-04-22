// =============================================================================
// LegalPage.jsx – Pages légales (mentions légales, données perso, etc.)
// Contenu minimal – sera complété par un cabinet spécialisé
// =============================================================================
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PAGE_LABELS = {
  '/mentions-legales':     'Mentions légales',
  '/donnees-personnelles': 'Données personnelles',
  '/accessibilite':        'Accessibilité',
  '/cookies':              'Cookies',
};

function LegalPage() {
  const { pathname } = useLocation();
  const title = PAGE_LABELS[pathname] || 'Page légale';

  useEffect(() => {
    document.title = `${title} | Trouve ton artisan`;
  }, [title]);

  return (
    <main id="main-content">
      <div style={{ background: 'linear-gradient(90deg, #00497c, #0074c7)', color: '#fff' }} className="py-4">
        <div className="container-xl">
          <nav aria-label="Fil d'Ariane">
            <ol className="breadcrumb mb-2" style={{ color: 'rgba(255,255,255,.8)', fontSize: '0.85rem' }}>
              <li className="breadcrumb-item">
                <Link to="/" style={{ color: 'rgba(255,255,255,.8)' }}>Accueil</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">{title}</li>
            </ol>
          </nav>
          <h1 className="fw-bold mb-0" style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}>
            {title}
          </h1>
        </div>
      </div>

      <div className="container-xl py-5">
        <div className="bg-white rounded-3 shadow-sm p-4 p-md-5 text-center" style={{ maxWidth: 600, margin: '0 auto' }}>
          <i
            className="bi bi-tools mb-3 d-block"
            style={{ fontSize: '3rem', color: '#0074c7' }}
            aria-hidden="true"
          />
          <h2 className="h4 fw-bold mb-2" style={{ color: '#00497c' }}>Page en construction</h2>
          <p className="text-muted mb-4">
            Cette page sera complétée prochainement par un cabinet spécialisé.
            Merci de votre compréhension.
          </p>
          <Link to="/" className="btn btn-primary-custom">
            <i className="bi bi-house me-2" aria-hidden="true" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}

export default LegalPage;
