// =============================================================================
// models/Categorie.js – Modèle Sequelize pour la table "categorie"
// Une catégorie regroupe plusieurs spécialités (ex. Bâtiment, Services…)
// =============================================================================
'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Categorie = sequelize.define('Categorie', {
  id: {
    type:          DataTypes.INTEGER.UNSIGNED,
    primaryKey:    true,
    autoIncrement: true,
    comment:       'Identifiant unique de la catégorie',
  },
  nom: {
    type:          DataTypes.STRING(80),
    allowNull:     false,
    unique:        true,
    comment:       'Nom affiché dans le menu de navigation',
    validate: {
      notEmpty: { msg: 'Le nom de la catégorie ne peut pas être vide.' },
      len:      { args: [2, 80], msg: 'Le nom doit contenir entre 2 et 80 caractères.' },
    },
  },
  slug: {
    type:          DataTypes.STRING(80),
    allowNull:     false,
    unique:        true,
    comment:       'Slug URL (ex. batiment)',
    validate: {
      is: { args: /^[a-z0-9-]+$/, msg: 'Le slug ne peut contenir que des minuscules, chiffres et tirets.' },
    },
  },
  icone: {
    type:          DataTypes.STRING(60),
    allowNull:     true,
    comment:       'Classe Bootstrap Icons (ex. bi-house-gear)',
  },
}, {
  tableName: 'categorie',
  comment:   'Catégories d\'artisanat (Bâtiment, Services, Fabrication, Alimentation)',
});

module.exports = Categorie;
