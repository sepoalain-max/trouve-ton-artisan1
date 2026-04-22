// =============================================================================
// main.jsx – Point d'entrée de l'application React
// =============================================================================
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ── Styles ────────────────────────────────────────────────────────────────────
// 1. Variables et mixins SCSS (injectés automatiquement via vite.config.js)
// 2. Styles globaux + Bootstrap + composants
import './styles/main.scss';

// ── Rendu ─────────────────────────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
