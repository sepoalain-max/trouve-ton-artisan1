// =============================================================================
// middlewares/validate.js – Validation des données entrantes (express-validator)
// =============================================================================
'use strict';

const { body, query, param, validationResult } = require('express-validator');

/**
 * Middleware exécutant les validations et retournant les erreurs s'il y en a.
 * À placer en dernier dans un tableau de middlewares de validation.
 */
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error:  'Données invalides.',
      details: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}

// ── Règles de validation ──────────────────────────────────────────────────────

/** Validation des paramètres de recherche artisans */
const validateArtisanQuery = [
  query('search')
    .optional({ checkFalsy: true })  // ← ici aussi
    .trim()
    .isLength({ max: 100 })
    .withMessage('Le terme de recherche ne peut pas dépasser 100 caractères.')
    .escape(),

  query('categorieSlug')
    .optional({ checkFalsy: true })  // ← accepte les chaînes vides
    .trim()
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug de catégorie invalide.'),
  handleValidationErrors,
];

/** Validation de l'ID artisan en paramètre d'URL */
const validateArtisanId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('L\'identifiant de l\'artisan doit être un entier positif.')
    .toInt(),
  handleValidationErrors,
];

/** Validation du formulaire de contact */
const validateContactForm = [
  body('nom')
    .trim()
    .notEmpty()
    .withMessage('Le nom est obligatoire.')
    .isLength({ max: 120 })
    .withMessage('Le nom ne peut pas dépasser 120 caractères.')
    .escape(),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('L\'adresse e-mail est obligatoire.')
    .isEmail()
    .withMessage('L\'adresse e-mail est invalide.')
    .normalizeEmail()
    .isLength({ max: 180 })
    .withMessage('L\'adresse e-mail est trop longue.'),
  body('objet')
    .trim()
    .notEmpty()
    .withMessage('L\'objet est obligatoire.')
    .isLength({ min: 3, max: 150 })
    .withMessage('L\'objet doit contenir entre 3 et 150 caractères.')
    .escape(),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Le message est obligatoire.')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Le message doit contenir entre 10 et 2000 caractères.')
    .escape(),
  // Champ honeypot : doit rester vide (anti-spam)
  body('_website')
    .custom(value => {
      if (value && value.trim() !== '') {
        throw new Error('Requête rejetée (détection spam).');
      }
      return true;
    }),
  handleValidationErrors,
];

module.exports = {
  validateArtisanQuery,
  validateArtisanId,
  validateContactForm,
};
