'use strict';

const multer = require('multer');
const path   = require('path');
const crypto = require('crypto');
const fs     = require('fs');

const UPLOAD_DIRS = {
  artisans:    path.join(__dirname, '../../uploads/artisans'),
  specialites: path.join(__dirname, '../../uploads/specialites'),
};

Object.values(UPLOAD_DIRS).forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const storage = (folder) => multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIRS[folder]),
  filename: (req, file, cb) => {
    const ext        = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Format non supporté. Utilisez JPG, PNG, WebP ou GIF.'), false);
  }
};

const limits = { fileSize: 5 * 1024 * 1024 };

module.exports = {
  uploadArtisan:    multer({ storage: storage('artisans'),    fileFilter, limits }).single('photo'),
  uploadSpecialite: multer({ storage: storage('specialites'), fileFilter, limits }).single('photo'),
};
