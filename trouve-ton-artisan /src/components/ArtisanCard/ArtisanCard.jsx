// =============================================================================
// ArtisanCard.jsx – Carte artisan avec image de spécialité
// =============================================================================
import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';

const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') 
  || 'http://localhost:3000';

const EMOJI_SPECIALITE = {
  'Plomberie':    '🔧',
  'Électricité':  '⚡',
  'Maçonnerie':   '🧱',
  'Couverture':   '🏠',
  'Menuiserie':   '🪚',
  'Coiffure':     '✂️',
  'Photographie': '📷',
  'Traiteur':     '🍽️',
  'Ébénisterie':  '🪑',
  'Bijouterie':   '💍',
  'Poterie':      '🏺',
  'Boulangerie':  '🥐',
  'Charcuterie':  '🥩',
  'Fromagerie':   '🧀',
};

function ArtisanCard({ artisan, featured = false }) {
  const { id, nom, note, ville, code_postal, specialite, photo } = artisan;

  // Priorité : photo artisan > image spécialité > emoji
  const imageUrl = photo
    ? `${API_BASE}${photo}`
    : specialite?.image?.photo
      ? `${API_BASE}${specialite.image.photo}`
      : null;

  const emoji = EMOJI_SPECIALITE[specialite?.nom] || '🔨';

  return (
    <Link
      to={`/artisan/${id}`}
      className={`artisan-card${featured ? ' artisan-card--featured' : ''}`}
      aria-label={`Voir la fiche de ${nom}, ${specialite?.nom || ''} à ${ville}`}
    >
      {/* Image */}
      <div className="card-img-wrapper">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Illustration ${specialite?.nom || nom}`}
            loading="lazy"
          />
        ) : (
          <div className="card-img-placeholder" aria-hidden="true">
            {emoji}
          </div>
        )}
      </div>

      {/* Corps */}
      <div className="card-body">
        <h3 className="card-name">{nom}</h3>
        {specialite && (
          <p className="card-specialty">
            <i className="bi bi-tag me-1" aria-hidden="true" />
            {specialite.nom}
          </p>
        )}
        <p className="card-location">
          <i className="bi bi-geo-alt-fill" aria-hidden="true" />
          <span>
            {ville}{code_postal ? ` (${code_postal.slice(0, 2)})` : ''}
          </span>
        </p>
      </div>

      {/* Pied */}
      <div className="card-footer-inner">
        <StarRating note={note} size="sm" />
        {featured && (
          <span className="badge-category ms-auto">Artisan du mois</span>
        )}
      </div>
    </Link>
  );
}

export default ArtisanCard;