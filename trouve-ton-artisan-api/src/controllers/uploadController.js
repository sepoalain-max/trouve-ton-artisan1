'use strict';

const fs             = require('fs');
const path           = require('path');
const { Artisan, Specialite, SpecialiteImage } = require('../models');

/**
 * POST /api/artisans/:id/photo
 * Upload d'une photo pour un artisan
 */
async function uploadArtisanPhoto(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier envoyé.' });
    }

    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) {
      fs.unlinkSync(req.file.path); // Supprimer le fichier uploadé
      return res.status(404).json({ error: 'Artisan introuvable.' });
    }

    // Supprimer l'ancienne photo si elle existe
    if (artisan.photo) {
      const oldPath = path.join(__dirname, '../../uploads/artisans', path.basename(artisan.photo));
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    // Mettre à jour la BDD avec le nouveau chemin
    const photoUrl = `/uploads/artisans/${req.file.filename}`;
    await artisan.update({ photo: photoUrl });

    res.json({
      success: true,
      message: 'Photo mise à jour avec succès.',
      photo:   photoUrl,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/specialites/:id/photo
 * Upload d'une photo pour une spécialité
 */
async function uploadSpecialitePhoto(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier envoyé.' });
    }

    const specialite = await Specialite.findByPk(req.params.id);
    if (!specialite) {
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: 'Spécialité introuvable.' });
    }

    const photoUrl = `/uploads/specialites/${req.file.filename}`;

    // Créer ou mettre à jour l'image de la spécialité
    await SpecialiteImage.upsert({
      specialite_id: specialite.id,
      photo:         photoUrl,
    });

    res.json({
      success: true,
      message: `Photo de la spécialité "${specialite.nom}" mise à jour.`,
      photo:   photoUrl,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/specialites/:id/photo
 * Récupère la photo d'une spécialité
 */
async function getSpecialitePhoto(req, res, next) {
  try {
    const image = await SpecialiteImage.findOne({
      where: { specialite_id: req.params.id },
    });
    if (!image) return res.status(404).json({ error: 'Aucune image pour cette spécialité.' });
    res.json(image);
  } catch (err) {
    next(err);
  }
}

module.exports = { uploadArtisanPhoto, uploadSpecialitePhoto, getSpecialitePhoto };