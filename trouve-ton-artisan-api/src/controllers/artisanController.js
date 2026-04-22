// =============================================================================
// controllers/artisanController.js – Logique métier des artisans
// =============================================================================
'use strict';

const { Op }               = require('sequelize');
const { Artisan, Specialite, Categorie, SpecialiteImage } = require('../models');
const { sendContactEmail } = require('../utils/mailer');

// Inclure la spécialité, la catégorie ET l'image de la spécialité
const INCLUDE_SPEC_CAT = [
  {
    model:      Specialite,
    as:         'specialite',
    attributes: ['id', 'nom'],
    include: [
      {
        model:      Categorie,
        as:         'categorie',
        attributes: ['id', 'nom', 'slug', 'icone'],
      },
      {
        model:      SpecialiteImage,
        as:         'image',
        attributes: ['photo'],
        required:   false,
      },
    ],
  },
];

// Colonnes publiques (ne pas exposer l'e-mail dans les listes)
const PUBLIC_ATTRS  = ['id', 'nom', 'prenom', 'ville', 'code_postal', 'note', 'photo', 'artisan_du_mois', 'specialite_id'];
const DETAIL_ATTRS  = [...PUBLIC_ATTRS, 'email', 'telephone', 'adresse', 'site_web', 'apropos'];

/**
 * GET /api/artisans
 * Retourne la liste des artisans, avec filtres optionnels :
 *   - ?categorieSlug=batiment
 *   - ?search=dupont
 */
async function getAll(req, res, next) {
  try {
    const { categorieSlug, search } = req.query;

    const where    = {};
    const catWhere = {};

    if (search && search.trim()) {
      const q = `%${search.trim()}%`;
      where[Op.or] = [
        { nom:    { [Op.like]: q } },
        { prenom: { [Op.like]: q } },
        { ville:  { [Op.like]: q } },
      ];
    }

    if (categorieSlug) {
      catWhere.slug = categorieSlug;
    }

    const artisans = await Artisan.findAll({
      attributes: PUBLIC_ATTRS,
      where,
      include: [
        {
          model:      Specialite,
          as:         'specialite',
          attributes: ['id', 'nom'],
          include: [
            {
              model:      Categorie,
              as:         'categorie',
              attributes: ['id', 'nom', 'slug', 'icone'],
              where:      Object.keys(catWhere).length ? catWhere : undefined,
              required:   !!categorieSlug,
            },
            {
              model:      SpecialiteImage,
              as:         'image',
              attributes: ['photo'],
              required:   false,
            },
          ],
        },
      ],
      order: [['nom', 'ASC']],
    });

    res.json(artisans);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/artisans/du-mois
 * Retourne les 3 artisans du mois (mis en avant sur la page d'accueil).
 */
async function getDuMois(req, res, next) {
  try {
    const artisans = await Artisan.findAll({
      attributes: PUBLIC_ATTRS,
      where:   { artisan_du_mois: true },
      include: INCLUDE_SPEC_CAT,
      order:   [['note', 'DESC']],
      limit:   3,
    });
    res.json(artisans);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/artisans/:id
 * Retourne la fiche complète d'un artisan.
 */
async function getById(req, res, next) {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      attributes: DETAIL_ATTRS,
      include:    INCLUDE_SPEC_CAT,
    });

    if (!artisan) {
      return res.status(404).json({ error: 'Artisan introuvable.' });
    }

    res.json(artisan);
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/artisans/:id/contact
 * Envoie un e-mail à l'artisan depuis le formulaire de contact.
 */
async function contact(req, res, next) {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      attributes: ['id', 'nom', 'email'],
    });

    if (!artisan) {
      return res.status(404).json({ error: 'Artisan introuvable.' });
    }

    const { nom, email, objet, message } = req.body;

    await sendContactEmail(artisan, { nom, email, objet, message });

    res.status(200).json({
      success: true,
      message: `Votre message a été transmis à ${artisan.nom}. Une réponse vous sera apportée sous 48h.`,
    });
  } catch (err) {
    if (err.code === 'ECONNECTION' || err.code === 'EAUTH') {
      return next(Object.assign(
        new Error('Erreur lors de l\'envoi de l\'e-mail. Veuillez réessayer.'),
        { status: 502 }
      ));
    }
    next(err);
  }
}

module.exports = { getAll, getDuMois, getById, contact };