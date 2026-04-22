'use strict';

const express          = require('express');
const router           = express.Router();
const { uploadArtisan, uploadSpecialite } = require('../middlewares/upload');
const uploadController = require('../controllers/uploadController');
const { validateArtisanId } = require('../middlewares/validate');

// Upload photo artisan
router.post('/artisans/:id/photo',
  validateArtisanId,
  uploadArtisan,
  uploadController.uploadArtisanPhoto
);

// Upload photo spécialité
router.post('/specialites/:id/photo',
  uploadSpecialite,
  uploadController.uploadSpecialitePhoto
);

// Récupérer photo spécialité
router.get('/specialites/:id/photo',
  uploadController.getSpecialitePhoto
);

module.exports = router;