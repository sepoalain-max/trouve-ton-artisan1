// =============================================================================
// models/Artisan.js – Modèle Sequelize pour la table "artisan"
// Un artisan appartient à une seule spécialité.
// =============================================================================
'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Artisan = sequelize.define('Artisan', {
  id: {
    type:          DataTypes.INTEGER.UNSIGNED,
    primaryKey:    true,
    autoIncrement: true,
    comment:       'Identifiant unique de l\'artisan',
  },
  nom: {
    type:          DataTypes.STRING(120),
    allowNull:     false,
    comment:       'Nom de l\'artisan ou de l\'entreprise',
    validate: {
      notEmpty: { msg: 'Le nom est obligatoire.' },
      len:      { args: [2, 120], msg: 'Le nom doit contenir entre 2 et 120 caractères.' },
    },
  },
  prenom: {
    type:          DataTypes.STRING(80),
    allowNull:     true,
    comment:       'Prénom (optionnel pour les entreprises)',
  },
  email: {
    type:          DataTypes.STRING(180),
    allowNull:     false,
    unique:        true,
    comment:       'Adresse e-mail de contact (unique)',
    validate: {
      isEmail: { msg: 'L\'adresse e-mail est invalide.' },
    },
  },
  telephone: {
    type:          DataTypes.STRING(20),
    allowNull:     true,
    comment:       'Numéro de téléphone',
    validate: {
      is: {
        args: /^[0-9 +()./-]{7,20}$/,
        msg:  'Numéro de téléphone invalide.',
      },
    },
  },
  adresse: {
    type:          DataTypes.STRING(255),
    allowNull:     true,
    comment:       'Adresse postale complète',
  },
  ville: {
    type:          DataTypes.STRING(100),
    allowNull:     false,
    comment:       'Ville',
    validate: {
      notEmpty: { msg: 'La ville est obligatoire.' },
    },
  },
  code_postal: {
    type:          DataTypes.STRING(10),
    allowNull:     false,
    comment:       'Code postal',
    validate: {
      is: {
        args: /^[0-9]{5}$/,
        msg:  'Code postal invalide (5 chiffres requis).',
      },
    },
  },
  site_web: {
    type:          DataTypes.STRING(255),
    allowNull:     true,
    comment:       'URL du site web de l\'artisan',
    validate: {
      isUrl: { msg: 'L\'URL du site web est invalide.' },
    },
  },
  apropos: {
    type:          DataTypes.TEXT,
    allowNull:     true,
    comment:       'Description libre de l\'artisan',
  },
  note: {
    type:          DataTypes.DECIMAL(3, 1),
    allowNull:     false,
    defaultValue:  0.0,
    comment:       'Note moyenne sur 5',
    validate: {
      min: { args: [0], msg: 'La note ne peut pas être négative.' },
      max: { args: [5], msg: 'La note ne peut pas dépasser 5.' },
    },
  },
  photo: {
    type:          DataTypes.STRING(255),
    allowNull:     true,
    comment:       'Chemin ou URL de la photo/logo',
  },
  artisan_du_mois: {
    type:          DataTypes.BOOLEAN,
    allowNull:     false,
    defaultValue:  false,
    comment:       'Mis en avant sur la page d\'accueil',
  },
  // Clé étrangère vers Specialite (définie dans index.js)
  specialite_id: {
    type:          DataTypes.INTEGER.UNSIGNED,
    allowNull:     false,
    comment:       'Référence vers la spécialité de l\'artisan',
  },
}, {
  tableName: 'artisan',
  comment:   'Artisans référencés sur la plateforme',
  indexes: [
    { fields: ['specialite_id'] },
    { fields: ['ville'] },
    { fields: ['artisan_du_mois'] },
    // Index sur le nom pour la recherche rapide
    { type: 'FULLTEXT', name: 'artisan_search_idx', fields: ['nom', 'prenom', 'ville'] },
  ],
});

module.exports = Artisan;
