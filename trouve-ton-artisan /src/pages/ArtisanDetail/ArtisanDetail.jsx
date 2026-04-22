// =============================================================================
// ArtisanDetail.jsx – Fiche complète d'un artisan
// =============================================================================
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import StarRating from '../../components/StarRating/StarRating';
import ContactForm from '../../components/ContactForm/ContactForm';
import { fetchArtisanById } from '../../services/api';
import { iconeParCategorie } from '../../data/mockData';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') 
  || 'http://localhost:3000';

function useSeoMeta({ title, description }) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
  }, [title, description]);
}

function ArtisanDetail() {
  const { id }                   = useParams();
  const navigate                 = useNavigate();
  const [artisan, setArtisan]    = useState(null);
  const [loading, setLoading]    = useState(true);
  const [error, setError]        = useState(null);

  useSeoMeta({
    title: artisan
      ? `${artisan.nom} – ${artisan.specialite?.nom} | Trouve ton artisan`
      : 'Fiche artisan | Trouve ton artisan',
    description: artisan
      ? `Contactez ${artisan.nom}, ${artisan.specialite?.nom} à ${artisan.ville}. ${artisan.apropos?.slice(0, 120)}…`
      : '',
  });

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchArtisanById(id)
      .then(setArtisan)
      .catch(err => {
        if (err.message === 'Artisan introuvable') {
          navigate('/404', { replace: true });
        } else {
          setError(err.message || 'Impossible de charger la fiche.');
        }
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <main id="main-content">
        <div className="loading-spinner py-5" aria-live="polite" aria-label="Chargement de la fiche artisan">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement…</span>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main id="main-content" className="container-xl py-5">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2" aria-hidden="true" />
          {error}
        </div>
        <Link to="/artisans" className="btn btn-primary-custom">
          Retour à la liste
        </Link>
      </main>
    );
  }

  if (!artisan) return null;

  const emoji = iconeParCategorie[artisan.categorie?.id] || '🔨';

  return (
    <main id="main-content">

      {/* ── Bandeau haut ────────────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(90deg, #00497c, #0074c7)', color: '#fff' }} className="py-4">
        <div className="container-xl">
          {/* Breadcrumb */}
          <nav aria-label="Fil d'Ariane">
            <ol className="breadcrumb mb-2" style={{ color: 'rgba(255,255,255,.8)', fontSize: '0.85rem' }}>
              <li className="breadcrumb-item">
                <Link to="/" style={{ color: 'rgba(255,255,255,.8)' }}>Accueil</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/artisans/${artisan.categorie?.slug}`} style={{ color: 'rgba(255,255,255,.8)' }}>
                  {artisan.categorie?.nom}
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">{artisan.nom}</li>
            </ol>
          </nav>
          <h1 className="fw-bold mb-0" style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}>
            {artisan.nom}
          </h1>
        </div>
      </div>

      <div className="container-xl py-4">
        <div className="row g-4">

          {/* ── Colonne principale ────────────────────────────────────── */}
          <div className="col-12 col-lg-8">

            {/* Carte identité artisan */}
            <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
              <div className="d-flex gap-4 flex-wrap">

                {/* Photo / placeholder */}
                <div
                  className="rounded-3 flex-shrink-0 d-flex align-items-center justify-content-center overflow-hidden"
                  style={{ width: 120, height: 120, background: '#f1f8fc', border: '2px solid #e9ecef', fontSize: '2.5rem' }}
                >
                  {artisan.photo ? (
                    <img
                      src={`${API_BASE}${artisan.photo}`}
                      alt={`Photo de ${artisan.nom}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : artisan.specialite?.image?.photo ? (
                    <img
                      src={`${API_BASE}${artisan.specialite.image.photo}`}
                      alt={`Illustration ${artisan.specialite.nom}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span aria-hidden="true">{emoji}</span>
                  )}
                </div>

                {/* Infos */}
                <div className="flex-grow-1">
                  <h2 className="h4 fw-bold mb-1" style={{ color: '#00497c' }}>{artisan.nom}</h2>

                  {artisan.specialite && (
                    <p className="mb-1">
                      <span className="badge-category">{artisan.specialite.nom}</span>
                    </p>
                  )}

                  <div className="mb-2">
                    <StarRating note={artisan.note} size="md" />
                  </div>

                  <p className="mb-1 text-muted" style={{ fontSize: '0.9rem' }}>
                    <i className="bi bi-geo-alt-fill me-1 text-danger" aria-hidden="true" />
                    {artisan.adresse || `${artisan.ville} (${artisan.codePostal})`}
                  </p>

                  {artisan.telephone && (
                    <p className="mb-1" style={{ fontSize: '0.9rem' }}>
                      <i className="bi bi-telephone-fill me-1 text-primary" aria-hidden="true" />
                      <a href={`tel:${artisan.telephone.replace(/\s/g, '')}`} style={{ color: '#0074c7' }}>
                        {artisan.telephone}
                      </a>
                    </p>
                  )}

                  {artisan.siteWeb && (
                    <p className="mb-0" style={{ fontSize: '0.9rem' }}>
                      <i className="bi bi-globe me-1 text-primary" aria-hidden="true" />
                      <a
                        href={artisan.siteWeb}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#0074c7' }}
                        aria-label={`Site web de ${artisan.nom} (s'ouvre dans un nouvel onglet)`}
                      >
                        {artisan.siteWeb.replace(/^https?:\/\//, '')}
                        <i className="bi bi-box-arrow-up-right ms-1" style={{ fontSize: '0.75em' }} aria-hidden="true" />
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* À propos */}
            {artisan.apropos && (
              <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
                <h2 className="section-title" style={{ fontSize: '1.2rem' }}>
                  <i className="bi bi-person-lines-fill me-2 text-primary" aria-hidden="true" />
                  À propos
                </h2>
                <div className="divider" />
                <p className="text-muted mb-0" style={{ lineHeight: 1.7 }}>{artisan.apropos}</p>
              </div>
            )}

            {/* Formulaire de contact */}
            <div className="bg-white rounded-3 shadow-sm p-4">
              <ContactForm artisanId={artisan.id} artisanNom={artisan.nom} />
            </div>
          </div>

          {/* ── Sidebar droite ───────────────────────────────────────── */}
          <aside className="col-12 col-lg-4" aria-label="Informations complémentaires">

            {/* Bloc catégorie */}
            <div className="bg-white rounded-3 shadow-sm p-3 mb-4">
              <h2 className="h6 fw-bold mb-2" style={{ color: '#00497c' }}>Catégorie</h2>
              {artisan.categorie && (
                <Link
                  to={`/artisans/${artisan.categorie.slug}`}
                  className="d-flex align-items-center gap-2 text-decoration-none"
                  style={{ color: '#0074c7', fontWeight: 600 }}
                >
                  <i className={`bi ${artisan.categorie.icone}`} style={{ fontSize: '1.3rem' }} aria-hidden="true" />
                  {artisan.categorie.nom}
                </Link>
              )}
            </div>

            {/* Conseil */}
            <div
              className="rounded-3 p-3"
              style={{ background: 'rgba(130, 184, 100, 0.1)', border: '1px solid rgba(130, 184, 100, 0.3)' }}
              role="note"
              aria-label="Conseil"
            >
              <p className="mb-0" style={{ fontSize: '0.85rem', color: '#384050' }}>
                <i className="bi bi-lightbulb-fill me-2" style={{ color: '#82b864' }} aria-hidden="true" />
                <strong>Conseil :</strong> précisez votre besoin, votre localisation et votre disponibilité
                dans le message pour une réponse plus rapide de l'artisan.
              </p>
            </div>

          </aside>
        </div>
      </div>
    </main>
  );
}

export default ArtisanDetail;
