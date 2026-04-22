// =============================================================================
// server.js – Point d'entrée du serveur Express
// =============================================================================
'use strict';

require('dotenv').config();

const path           = require('path');
const express        = require('express');
const helmet         = require('helmet');
const cors           = require('cors');
const morgan         = require('morgan');

const { testConnection } = require('./config/database');
const { sequelize }      = require('./models');

const { apiKeyAuth, generalLimiter, notFound, errorHandler } = require('./middlewares/security');

const categoriesRouter = require('./routes/categories');
const artisansRouter   = require('./routes/artisans');
const uploadsRouter    = require('./routes/uploads');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Sécurité ──────────────────────────────────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',').map(o => o.trim()).filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin && process.env.NODE_ENV === 'development') return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS bloqué : origine non autorisée (${origin})`));
  },
  methods:         ['GET', 'POST', 'OPTIONS'],
  allowedHeaders:  ['Content-Type', 'X-API-Key'],
  optionsSuccessStatus: 200,
}));

app.use(generalLimiter);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// ── Images statiques (AVANT l'auth API) ───────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ── Route santé ───────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'OK', env: process.env.NODE_ENV, version: '1.0.0' });
});

// ── Auth API ──────────────────────────────────────────────────────────────────
app.use('/api', apiKeyAuth);

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/categories', categoriesRouter);
app.use('/api/artisans',   artisansRouter);
app.use('/api',            uploadsRouter);

// ── Erreurs ───────────────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Démarrage ─────────────────────────────────────────────────────────────────
async function start() {
  await testConnection();
  if (process.env.NODE_ENV !== 'production') {
    await sequelize.sync({ alter: true });
    console.log('✅ Modèles synchronisés avec la base de données.');
  }
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`   Environnement : ${process.env.NODE_ENV || 'development'}`);
  });
}

start().catch(err => {
  console.error('❌ Erreur au démarrage :', err.message);
  process.exit(1);
});

module.exports = app;