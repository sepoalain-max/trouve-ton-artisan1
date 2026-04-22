'use strict';
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SpecialiteImage = sequelize.define('SpecialiteImage', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  specialite_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    unique: true,
  },
  photo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'specialite_image',
});

module.exports = SpecialiteImage;