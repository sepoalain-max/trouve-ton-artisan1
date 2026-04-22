// =============================================================================
// NotFound.jsx – Page 404
// =============================================================================
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  useEffect(() => {
    document.title = 'Page introuvable (404) | Trouve ton artisan';
  }, []);

  return (
    <main
      id="main-content"
      className="d-flex flex-column align-items-center justify-content-center text-center py-5"
      style={{ minHeight: '60vh' }}
      aria-labelledby="notfound-title"
    >
      {/* Illustration SVG */}
      <svg
        width="180" height="180" viewBox="0 0 180 180"
        aria-hidden="true" focusable="false"
        style={{ marginBottom: '1.5rem', opacity: 0.85 }}
      >
        <circle cx="90" cy="90" r="88" fill="#f1f8fc" stroke="#dee2e6" strokeWidth="2" />
        <text x="90" y="80" textAnchor="middle" fontSize="52" fontWeight="bold" fill="#0074c7">
          404
        </text>
        <path
          d="M55 115 Q90 95 125 115"
          stroke="#cd2c2e" strokeWidth="4" fill="none"
          strokeLinecap="round"
        />
        <circle cx="70"  cy="100" r="5" fill="#384050" />
        <circle cx="110" cy="100" r="5" fill="#384050" />
      </svg>

      <h1 id="notfound-title" className="fw-bold mb-2" style={{ color: '#00497c', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
        Page introuvable
      </h1>

      <p className="text-muted mb-4" style={{ maxWidth: 420, fontSize: '1rem', lineHeight: 1.6 }}>
        La page que vous avez demandée n'existe pas ou a été déplacée.
        Revenez à l'accueil pour trouver votre artisan.
      </p>

      <div className="d-flex flex-wrap gap-3 justify-content-center">
        <Link to="/" className="btn btn-primary-custom px-4">
          <i className="bi bi-house me-2" aria-hidden="true" />
          Retour à l'accueil
        </Link>
        <Link to="/artisans" className="btn btn-outline-custom px-4">
          <i className="bi bi-search me-2" aria-hidden="true" />
          Voir les artisans
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
