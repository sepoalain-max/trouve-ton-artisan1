// =============================================================================
// ArtisanList.jsx – Liste des artisans filtrée par catégorie ou recherche
// =============================================================================
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import ArtisanCard from '../../components/ArtisanCard/ArtisanCard';
import { fetchArtisans, fetchCategories } from '../../services/api';

function useSeoMeta({ title, description }) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [title, description]);
}

function ArtisanList() {
  const { categorieSlug }         = useParams();          // /artisans/:categorieSlug
  const [searchParams]            = useSearchParams();     // ?search=...
  const searchQuery               = searchParams.get('search') || '';

  const [artisans, setArtisans]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  // Catégorie courante (objet)
  const categorieActive = categories.find(c => c.slug === categorieSlug) || null;

  // SEO dynamique
  useSeoMeta({
    title: categorieActive
      ? `Artisans – ${categorieActive.nom} | Trouve ton artisan`
      : searchQuery
        ? `Résultats pour "${searchQuery}" | Trouve ton artisan`
        : 'Tous les artisans | Trouve ton artisan',
    description: `Découvrez les artisans ${categorieActive?.nom || ''} en Auvergne-Rhône-Alpes.`,
  });

  const loadArtisans = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchArtisans({ categorieSlug, search: searchQuery })
      .then(setArtisans)
      .catch(err => setError(err.message || 'Impossible de charger les artisans.'))
      .finally(() => setLoading(false));
  }, [categorieSlug, searchQuery]);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    loadArtisans();
  }, [loadArtisans]);

  return (
    <main id="main-content">

      {/* ── Breadcrumb + titre ─────────────────────────────────────────── */}
      <div className="py-4" style={{ background: 'linear-gradient(90deg, #00497c, #0074c7)', color: '#fff' }}>
        <div className="container-xl">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'Ariane">
            <ol className="breadcrumb mb-2" style={{ '--bs-breadcrumb-divider-color': 'rgba(255,255,255,.6)', color: 'rgba(255,255,255,.8)', fontSize: '0.85rem' }}>
              <li className="breadcrumb-item">
                <Link to="/" style={{ color: 'rgba(255,255,255,.8)' }}>Accueil</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {categorieActive?.nom || (searchQuery ? `Recherche : ${searchQuery}` : 'Tous les artisans')}
              </li>
            </ol>
          </nav>
          <h1 className="fw-bold mb-0" style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}>
            {categorieActive
              ? `Artisans – ${categorieActive.nom}`
              : searchQuery
                ? `Résultats pour « ${searchQuery} »`
                : 'Tous les artisans'}
          </h1>
        </div>
      </div>

      <div className="container-xl py-4">
        <div className="row g-4">

          {/* ── Sidebar filtres catégories ─────────────────────────────── */}
          <aside className="col-12 col-md-3" aria-label="Filtres par catégorie">
            <div className="bg-white rounded-3 p-3 shadow-sm">
              <h2 className="h6 fw-bold mb-3" style={{ color: '#00497c' }}>
                <i className="bi bi-funnel me-2" aria-hidden="true" />
                Catégories
              </h2>
              <nav>
                <ul className="list-unstyled mb-0 d-flex flex-md-column flex-row flex-wrap gap-2">
                  <li>
                    <Link
                      to="/artisans"
                      className={`d-block px-3 py-2 rounded-2 text-decoration-none fw-semibold transition-all ${!categorieSlug ? 'active-cat' : 'text-secondary'}`}
                      style={!categorieSlug ? { background: '#f1f8fc', color: '#00497c', border: '1.5px solid #0074c720' } : {}}
                      aria-current={!categorieSlug ? 'page' : undefined}
                    >
                      <i className="bi bi-grid me-2" aria-hidden="true" />
                      Tous
                    </Link>
                  </li>
                  {categories.map(cat => (
                    <li key={cat.id}>
                      <Link
                        to={`/artisans/${cat.slug}`}
                        className="d-block px-3 py-2 rounded-2 text-decoration-none fw-semibold"
                        style={categorieSlug === cat.slug
                          ? { background: '#f1f8fc', color: '#00497c', border: '1.5px solid #0074c720' }
                          : { color: '#495057' }}
                        aria-current={categorieSlug === cat.slug ? 'page' : undefined}
                      >
                        <i className={`bi ${cat.icone} me-2`} aria-hidden="true" />
                        {cat.nom}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* ── Grille artisans ────────────────────────────────────────── */}
          <div className="col-12 col-md-9">

            {/* Compteur résultats */}
            {!loading && !error && (
              <p className="text-muted mb-3" style={{ fontSize: '0.875rem' }} aria-live="polite">
                {artisans.length === 0
                  ? 'Aucun artisan trouvé.'
                  : `${artisans.length} artisan${artisans.length > 1 ? 's' : ''} trouvé${artisans.length > 1 ? 's' : ''}`}
              </p>
            )}

            {/* Chargement */}
            {loading && (
              <div className="loading-spinner" aria-live="polite" aria-label="Chargement en cours">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Chargement des artisans…</span>
                </div>
              </div>
            )}

            {/* Erreur */}
            {error && !loading && (
              <div className="alert alert-danger d-flex gap-2 align-items-center" role="alert">
                <i className="bi bi-exclamation-triangle-fill" aria-hidden="true" />
                {error}
                <button className="btn btn-sm btn-outline-danger ms-auto" onClick={loadArtisans}>
                  Réessayer
                </button>
              </div>
            )}

            {/* Liste */}
            {!loading && !error && artisans.length > 0 && (
              <ul className="row g-4 list-unstyled" aria-label="Liste des artisans">
                {artisans.map(artisan => (
                  <li key={artisan.id} className="col-12 col-sm-6 col-xl-4">
                    <ArtisanCard artisan={artisan} />
                  </li>
                ))}
              </ul>
            )}

            {/* Aucun résultat */}
            {!loading && !error && artisans.length === 0 && (
              <div className="text-center py-5">
                <i className="bi bi-search mb-3 d-block" style={{ fontSize: '3rem', color: '#adb5bd' }} aria-hidden="true" />
                <h2 className="h5 text-muted">Aucun artisan trouvé</h2>
                <p className="text-muted">
                  Essayez une autre catégorie ou un autre terme de recherche.
                </p>
                <Link to="/artisans" className="btn btn-primary-custom mt-2">
                  Voir tous les artisans
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}

export default ArtisanList;
