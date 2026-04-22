// =============================================================================
// scripts/initDb.js – Initialise et peuple la BDD via Sequelize
// Usage : npm run db:init && npm run db:seed
// =============================================================================
'use strict';

require('dotenv').config();

const { sequelize }               = require('../src/config/database');
const { Categorie, Specialite, Artisan } = require('../src/models');

async function initDb() {
  try {
    console.log('🔌 Connexion à la base de données…');
    await sequelize.authenticate();

    console.log('🏗️  Synchronisation des modèles (force: true)…');
    // force:true recrée les tables — À N'UTILISER QU'EN DÉVELOPPEMENT
    await sequelize.sync({ force: true });

    console.log('✅ Tables créées avec succès.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur lors de l\'initialisation :', err.message);
    process.exit(1);
  }
}

initDb();
