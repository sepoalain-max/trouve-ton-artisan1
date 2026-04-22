// =============================================================================
// config/database.js – Connexion Sequelize à MySQL
// =============================================================================
'use strict';

const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host:    process.env.DB_HOST || 'localhost',
    port:    parseInt(process.env.DB_PORT) || 3306,
    dialect: 'mysql',

    // Pool de connexions
    pool: {
      max:     10,
      min:     0,
      acquire: 30000,
      idle:    10000,
    },

    // Désactiver les logs SQL en production
    logging: process.env.NODE_ENV === 'development'
      ? (msg) => console.log(`[SQL] ${msg}`)
      : false,

    define: {
      // Utiliser snake_case pour les colonnes en BDD
      underscored:   true,
      // Ajouter automatiquement createdAt / updatedAt
      timestamps:    true,
      // Ne pas pluraliser automatiquement les noms de tables
      freezeTableName: true,
    },
  }
);

/**
 * Teste la connexion à la base de données
 */
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données établie.');
  } catch (error) {
    console.error('❌ Impossible de se connecter à la base de données :', error.message);
    process.exit(1);
  }
}

module.exports = { sequelize, testConnection };
