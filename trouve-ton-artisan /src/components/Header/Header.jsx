// =============================================================================
// Header.jsx – En-tête fixe : logo, navigation, barre de recherche
// =============================================================================
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { fetchCategories } from '../../services/api';

function Header() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch]         = useState('');
  const [navOpen, setNavOpen]        = useState(false);
  const navigate                     = useNavigate();
  const searchRef                    = useRef(null);

  // Chargement des catégories depuis l'API
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(err => console.error('Erreur chargement catégories :', err));
  }, []);

  // Fermer le menu mobile au changement de route
  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = search.trim();
    if (q) {
      navigate(`/artisans?search=${encodeURIComponent(q)}`);
      setSearch('');
    }
  };

  return (
    <header className="site-header" role="banner">
      <nav
        className="navbar navbar-expand-lg container-xl"
        aria-label="Navigation principale"
      >
        {/* Logo */}
        <Link to="/" className="navbar-brand" aria-label="Trouve ton artisan – Accueil">
          {/* Logo SVG inline (remplacer par <img src="/logo.png" .../> si fichier fourni) */}
          <svg
            width="32" height="32" viewBox="0 0 32 32" aria-hidden="true"
            fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="8" fill="#cd2c2e"/>
            <path d="M8 22 L16 10 L24 22" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
            <circle cx="16" cy="10" r="2.5" fill="white"/>
            <rect x="11" y="18" width="10" height="2" rx="1" fill="white"/>
          </svg>
          <span className="brand-text">
            <span className="brand-title">Trouve ton artisan</span>
            <span className="brand-subtitle">Auvergne-Rhône-Alpes</span>
          </span>
        </Link>

        {/* Burger mobile */}
        <button
          className="navbar-toggler"
          type="button"
          aria-expanded={navOpen}
          aria-controls="main-nav"
          aria-label={navOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setNavOpen(v => !v)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Menu + recherche */}
        <div
          className={`collapse navbar-collapse${navOpen ? ' show' : ''}`}
          id="main-nav"
        >
          {/* Liens catégories */}
          <ul className="navbar-nav me-auto mt-2 mt-lg-0" role="list">
            {categories.map(cat => (
              <li className="nav-item" key={cat.id} role="listitem">
                <NavLink
                  to={`/artisans/${cat.slug}`}
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  aria-current="page"
                >
                  {cat.nom}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Barre de recherche */}
          <form
            className="search-form d-flex mt-2 mt-lg-0"
            role="search"
            aria-label="Rechercher un artisan"
            onSubmit={handleSearch}
          >
            <div className="input-group">
              <label htmlFor="header-search" className="visually-hidden">
                Rechercher un artisan par nom
              </label>
              <input
                id="header-search"
                ref={searchRef}
                type="search"
                className="form-control search-input"
                placeholder="Rechercher un artisan…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                autoComplete="off"
              />
              <button
                type="submit"
                className="search-btn"
                aria-label="Lancer la recherche"
              >
                <i className="bi bi-search" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </nav>
    </header>
  );
}

export default Header;
