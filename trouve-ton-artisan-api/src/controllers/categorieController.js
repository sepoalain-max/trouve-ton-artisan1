// =============================================================================
// controllers/categorieController.js – Logique métier des catégories
// =============================================================================
'use strict';

const { Categorie, Specialite } = require('../models');

/**
 * GET /api/categories
 * Retourne toutes les catégories (utilisées dans le menu de navigation).
 */
async function getAll(req, res, next) {
  try {
    const categories = await Categorie.findAll({
      order: [['nom', 'ASC']],
      attributes: ['id', 'nom', 'slug', 'icone'],
    });
    res.json(categories);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/categories/:slug
 * Retourne une catégorie avec ses spécialités.
 */
async function getBySlug(req, res, next) {
  try {
    const categorie = await Categorie.findOne({
      where: { slug: req.params.slug },
      include: [{
        model:      Specialite,
        as:         'specialites',
        attributes: ['id', 'nom'],
        order:      [['nom', 'ASC']],
      }],
    });

    if (!categorie) {
      return res.status(404).json({ error: 'Catégorie introuvable.' });
    }

    res.json(categorie);
  } catch (err) {
    next(err);
  }
}

module.exports = { getAll, getBySlug };
