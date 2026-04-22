// =============================================================================
// routes/artisans.js
// =============================================================================
'use strict';

const express            = require('express');
const router             = express.Router();
const artisanController  = require('../controllers/artisanController');
const { contactLimiter } = require('../middlewares/security');
const {
  validateArtisanQuery,
  validateArtisanId,
  validateContactForm,
} = require('../middlewares/validate');

/**
 * @route  GET /api/artisans
 * @desc   Liste des artisans (filtres : ?categorieSlug, ?search)
 * @access Restreint (clé API)
 */
router.get('/', validateArtisanQuery, artisanController.getAll);

/**
 * @route  GET /api/artisans/du-mois
 * @desc   Les 3 artisans mis en avant ce mois-ci
 * @access Restreint (clé API)
 * ⚠️ Cette route DOIT être déclarée AVANT /:id pour éviter le conflit
 */
router.get('/du-mois', artisanController.getDuMois);

/**
 * @route  GET /api/artisans/:id
 * @desc   Fiche complète d'un artisan
 * @access Restreint (clé API)
 */
router.get('/:id', validateArtisanId, artisanController.getById);

/**
 * @route  POST /api/artisans/:id/contact
 * @desc   Envoi d'un message de contact à l'artisan
 * @access Restreint (clé API) + rate limited (10 envois/h par IP)
 */
router.post(
  '/:id/contact',
  contactLimiter,
  validateArtisanId,
  validateContactForm,
  artisanController.contact
);

module.exports = router;
