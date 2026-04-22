// =============================================================================
// models/Specialite.js – Modèle Sequelize pour la table "specialite"
// Une spécialité est rattachée à une seule catégorie.
// =============================================================================
'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Specialite = sequelize.define('Specialite', {
  id: {
    type:          DataTypes.INTEGER.UNSIGNED,
    primaryKey:    true,
    autoIncrement: true,
    comment:       'Identifiant unique de la spécialité',
  },
  nom: {
    type:          DataTypes.STRING(100),
    allowNull:     false,
    comment:       'Nom de la spécialité (ex. Plomberie)',
    validate: {
      notEmpty: { msg: 'Le nom de la spécialité ne peut pas être vide.' },
      len:      { args: [2, 100], msg: 'Le nom doit contenir entre 2 et 100 caractères.' },
    },
  },
  // Clé étrangère vers Categorie (définie dans index.js via associations)
  categorie_id: {
    type:       DataTypes.INTEGER.UNSIGNED,
    allowNull:  false,
    comment:    'Référence vers la catégorie parente',
  },
}, {
  tableName: 'specialite',
  comment:   'Spécialités des artisans (rattachées à une catégorie)',
  indexes: [
    { fields: ['categorie_id'] },
  ],
});

module.exports = Specialite;
