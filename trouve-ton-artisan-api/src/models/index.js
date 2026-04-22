'use strict';

const { sequelize }    = require('../config/database');
const Categorie        = require('./Categorie');
const Specialite       = require('./Specialite');
const Artisan          = require('./Artisan');
const SpecialiteImage  = require('./SpecialiteImage');

// Associations existantes
Categorie.hasMany(Specialite,  { foreignKey: 'categorie_id', as: 'specialites', onDelete: 'RESTRICT' });
Specialite.belongsTo(Categorie,{ foreignKey: 'categorie_id', as: 'categorie' });
Specialite.hasMany(Artisan,    { foreignKey: 'specialite_id', as: 'artisans',   onDelete: 'RESTRICT' });
Artisan.belongsTo(Specialite,  { foreignKey: 'specialite_id', as: 'specialite' });

// Nouvelle association : Spécialité ↔ Image
Specialite.hasOne(SpecialiteImage, { foreignKey: 'specialite_id', as: 'image', onDelete: 'CASCADE' });
SpecialiteImage.belongsTo(Specialite, { foreignKey: 'specialite_id', as: 'specialite' });

module.exports = { sequelize, Categorie, Specialite, Artisan, SpecialiteImage };