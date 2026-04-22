// =============================================================================
// middlewares/security.js – Middlewares de sécurité
// =============================================================================
'use strict';

const rateLimit = require('express-rate-limit');

// ── 1. Authentification par clé API ──────────────────────────────────────────
// L'accès à l'API est limité à l'application (frontend) via une clé secrète.
// La clé doit être envoyée dans l'en-tête : X-API-Key: <valeur>

/**
 * Middleware d'authentification par clé API.
 * Retourne 401 si la clé est absente ou incorrecte.
 */
function apiKeyAuth(req, res, next) {
  // Toujours autoriser en dev si aucune clé n'est configurée
  if (process.env.NODE_ENV === 'development' && !process.env.API_KEY) {
    return next();
  }

  const providedKey = req.headers['x-api-key'];

  if (!providedKey) {
    return res.status(401).json({
      error: 'Clé API manquante. Ajoutez l\'en-tête X-API-Key.',
    });
  }

  // Comparaison en temps constant pour éviter les timing attacks
  const crypto        = require('crypto');
  const expected      = Buffer.from(process.env.API_KEY || '');
  const provided      = Buffer.from(providedKey);

  if (expected.length !== provided.length ||
      !crypto.timingSafeEqual(expected, provided)) {
    return res.status(401).json({ error: 'Clé API invalide.' });
  }

  next();
}

// ── 2. Rate limiting ─────────────────────────────────────────────────────────
// Protection contre le brute-force et les abus

/** Limite générale : 100 requêtes / 15 min par IP */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'development' ? 1000 : 100, // ← 1000 en dev
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de requêtes. Veuillez réessayer dans 15 minutes.' },
});

/** Limite pour le formulaire de contact : 10 envois / heure par IP */
const contactLimiter = rateLimit({
  windowMs:         60 * 60 * 1000,
  max:              10,
  standardHeaders:  true,
  legacyHeaders:    false,
  message: { error: 'Trop d\'envois de messages. Veuillez réessayer dans 1 heure.' },
});

// ── 3. Gestion des erreurs 404 ────────────────────────────────────────────────
function notFound(req, res) {
  res.status(404).json({ error: `Route introuvable : ${req.method} ${req.originalUrl}` });
}

// ── 4. Gestionnaire d'erreurs global ─────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // Log interne (ne jamais exposer les détails en production)
  console.error('[ERROR]', err.message, err.stack);

  const status  = err.status || err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Une erreur interne est survenue.'
    : err.message;

  res.status(status).json({ error: message });
}

module.exports = { apiKeyAuth, generalLimiter, contactLimiter, notFound, errorHandler };
