// =============================================================================
// routes/categories.js
// =============================================================================
'use strict';

const express             = require('express');
const router              = express.Router();
const categorieController = require('../controllers/categorieController');

/**
 * @route  GET /api/categories
 * @desc   Toutes les catégories (menu navigation)
 * @access Restreint (clé API)
 */
router.get('/', categorieController.getAll);

/**
 * @route  GET /api/categories/:slug
 * @desc   Une catégorie avec ses spécialités
 * @access Restreint (clé API)
 */
router.get('/:slug', categorieController.getBySlug);

module.exports = router;
