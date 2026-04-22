// =============================================================================
// StarRating.jsx – Affichage de la note avec des étoiles (accessible)
// =============================================================================
import React from 'react';

/**
 * @param {number} note - Valeur entre 0 et 5 (demi-étoiles supportées)
 * @param {boolean} showValue - Afficher la valeur numérique
 * @param {'sm'|'md'|'lg'} size - Taille des étoiles
 */
function StarRating({ note = 0, showValue = true, size = 'md' }) {
  note = parseFloat(note) || 0;  // ← conversion string → number
  const total = 5;
  const rounded = Math.round(note * 2) / 2; // arrondi à 0.5

  const sizeClass = {
    sm: 'fs-7',
    md: '',
    lg: 'fs-5',
  }[size] || '';

  return (
    <span
      className={`stars d-inline-flex align-items-center gap-1 ${sizeClass}`}
      role="img"
      aria-label={`Note : ${note} sur 5`}
    >
      {Array.from({ length: total }, (_, i) => {
        const val = i + 1;
        if (rounded >= val) {
          return <i key={i} className="bi bi-star-fill text-warning" aria-hidden="true" />;
        }
        if (rounded >= val - 0.5) {
          return <i key={i} className="bi bi-star-half text-warning" aria-hidden="true" />;
        }
        return <i key={i} className="bi bi-star star-empty" aria-hidden="true" />;
      })}
      {showValue && (
        <span className="ms-1 text-muted" style={{ fontSize: '0.8em' }}>
          {note.toFixed(1)}
        </span>
      )}
    </span>
  );
}

export default StarRating;
