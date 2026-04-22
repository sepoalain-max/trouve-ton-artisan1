// =============================================================================
// App.jsx – Routeur principal de l'application
// =============================================================================
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header     from './components/Header/Header';
import Footer     from './components/Footer/Footer';

// Lazy loading des pages pour optimiser le bundle
const Home          = lazy(() => import('./pages/Home/Home'));
const ArtisanList   = lazy(() => import('./pages/ArtisanList/ArtisanList'));
const ArtisanDetail = lazy(() => import('./pages/ArtisanDetail/ArtisanDetail'));
const NotFound      = lazy(() => import('./pages/NotFound/NotFound'));
const LegalPage     = lazy(() => import('./pages/LegalPage/LegalPage'));

// Spinner de chargement global (Suspense fallback)
function PageLoader() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '60vh' }}
      aria-live="polite"
      aria-label="Chargement de la page…"
    >
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Chargement…</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {/* Skip link pour l'accessibilité (WCAG 2.1) */}
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>

      <Header />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Page d'accueil */}
          <Route path="/"                        element={<Home />} />

          {/* Liste artisans – toutes catégories */}
          <Route path="/artisans"                element={<ArtisanList />} />

          {/* Liste artisans – filtrée par catégorie */}
          <Route path="/artisans/:categorieSlug" element={<ArtisanList />} />

          {/* Fiche artisan */}
          <Route path="/artisan/:id"             element={<ArtisanDetail />} />

          {/* Pages légales */}
          <Route path="/mentions-legales"        element={<LegalPage />} />
          <Route path="/donnees-personnelles"    element={<LegalPage />} />
          <Route path="/accessibilite"           element={<LegalPage />} />
          <Route path="/cookies"                 element={<LegalPage />} />

          {/* Page 404 explicite */}
          <Route path="/404"                     element={<NotFound />} />

          {/* Catch-all → 404 */}
          <Route path="*"                        element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
