// =============================================================================
// Home.jsx – Page d'accueil
// Sections : Hero, Guide étapes, Artisans du mois, Catégories
// =============================================================================
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StepGuide from '../../components/StepGuide/StepGuide';
import ArtisanCard from '../../components/ArtisanCard/ArtisanCard';
import { fetchArtisansDuMois, fetchCategories } from '../../services/api';

// ── Meta SEO ──────────────────────────────────────────────────────────────────
// Idéalement géré via react-helmet-async ; ici via manipulation DOM directe
function useSeoMeta({ title, description }) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [title, description]);
}

function Home() {
  const [artisansDuMois, setArtisansDuMois] = useState([]);
  const [categories, setCategories]         = useState([]);
  const [loading, setLoading]               = useState(true);

  useSeoMeta({
    title: 'Trouve ton artisan – Auvergne-Rhône-Alpes',
    description:
      'Trouvez facilement un artisan qualifié en région Auvergne-Rhône-Alpes : bâtiment, services, fabrication, alimentation.',
  });

  useEffect(() => {
    Promise.all([fetchArtisansDuMois(), fetchCategories()])
      .then(([artisans, cats]) => {
        setArtisansDuMois(artisans);
        setCategories(cats);
      })
      .catch(err => console.error('Erreur chargement accueil :', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main id="main-content">

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section
        className="hero-section text-white py-5"
        style={{
          background: 'linear-gradient(135deg, #00497c 0%, #0074c7 60%, #384050 100%)',
          minHeight: 340,
          display: 'flex',
          alignItems: 'center',
        }}
        aria-label="Présentation du service"
      >
        <div className="container-xl">
          <div className="row align-items-center gy-4">
            <div className="col-12 col-md-8 col-lg-6">
              <p className="mb-2 text-uppercase fw-semibold" style={{ fontSize: '0.8rem', opacity: 0.8, letterSpacing: 1 }}>
                Région Auvergne-Rhône-Alpes
              </p>
              <h1 className="fw-bold mb-3" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', lineHeight: 1.2 }}>
                Trouvez l'artisan qu'il vous faut, près de chez vous
              </h1>
              <p className="mb-4" style={{ opacity: 0.9, maxWidth: 480, fontSize: '1.05rem' }}>
                Plus de 200&nbsp;000 artisans en Auvergne-Rhône-Alpes. Bâtiment, services,
                fabrication, alimentation… trouvez le bon professionnel en quelques clics.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/artisans" className="btn btn-danger fw-semibold px-4 py-2" style={{ borderRadius: 8 }}>
                  <i className="bi bi-search me-2" aria-hidden="true" />
                  Trouver un artisan
                </Link>
                <a href="#guide" className="btn btn-outline-light fw-semibold px-4 py-2" style={{ borderRadius: 8 }}>
                  Comment ça marche ?
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Catégories rapides ───────────────────────────────────────────── */}
      <section className="py-4 bg-white border-bottom" aria-label="Catégories d'artisans">
        <div className="container-xl">
          <div className="row g-3 justify-content-center">
            {categories.map(cat => (
              <div key={cat.id} className="col-6 col-sm-3">
                <Link
                  to={`/artisans/${cat.slug}`}
                  className="d-flex flex-column align-items-center justify-content-center p-3 rounded-3 text-decoration-none h-100"
                  style={{
                    border: '2px solid #e9ecef',
                    color: '#00497c',
                    transition: 'all 0.2s',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    gap: '0.5rem',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#0074c7';
                    e.currentTarget.style.background  = '#f1f8fc';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#e9ecef';
                    e.currentTarget.style.background  = 'transparent';
                  }}
                >
                  <i className={`bi ${cat.icone}`} style={{ fontSize: '1.6rem', color: '#0074c7' }} aria-hidden="true" />
                  {cat.nom}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guide étapes ─────────────────────────────────────────────────── */}
      <div id="guide" style={{ background: '#f8fafb' }}>
        <StepGuide />
      </div>

      {/* ── Artisans du mois ─────────────────────────────────────────────── */}
      <section className="py-5 bg-white" aria-labelledby="artisans-mois-title">
        <div className="container-xl">
          <div className="d-flex align-items-end justify-content-between flex-wrap gap-3 mb-4">
            <div>
              <h2 id="artisans-mois-title" className="section-title mb-1">
                Artisans du mois
              </h2>
              <div className="divider" />
            </div>
            <Link to="/artisans" className="btn btn-outline-custom btn-sm">
              Voir tous les artisans
              <i className="bi bi-arrow-right ms-2" aria-hidden="true" />
            </Link>
          </div>

          {loading ? (
            <div className="loading-spinner" aria-live="polite" aria-label="Chargement…">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement des artisans du mois…</span>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {artisansDuMois.map(artisan => (
                <div key={artisan.id} className="col-12 col-sm-6 col-lg-4">
                  <ArtisanCard artisan={artisan} featured />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Bandeau chiffres clés ─────────────────────────────────────────── */}
      <section
        className="py-5 text-white text-center"
        style={{ background: '#384050' }}
        aria-label="Chiffres clés de l'artisanat régional"
      >
        <div className="container-xl">
          <div className="row g-4 justify-content-center">
            {[
              { value: '221 000', label: 'artisans en région', icon: 'bi-people-fill' },
              { value: '12',     label: 'départements couverts', icon: 'bi-map-fill' },
              { value: '1/3',    label: 'des entreprises sont artisanales', icon: 'bi-graph-up-arrow' },
            ].map((item, i) => (
              <div key={i} className="col-12 col-sm-4">
                <i className={`bi ${item.icon} mb-2`} style={{ fontSize: '2rem', color: '#82b864' }} aria-hidden="true" />
                <p className="fw-bold mb-1" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
                  {item.value}
                </p>
                <p className="mb-0" style={{ opacity: 0.75, fontSize: '0.9rem' }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;
