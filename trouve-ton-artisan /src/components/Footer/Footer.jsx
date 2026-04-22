// =============================================================================
// Footer.jsx – Pied de page : liens légaux, adresse antenne de Lyon
// =============================================================================
import React from 'react';
import { Link } from 'react-router-dom';

const LEGAL_LINKS = [
  { label: 'Mentions légales',    path: '/mentions-legales'    },
  { label: 'Données personnelles', path: '/donnees-personnelles' },
  { label: 'Accessibilité',        path: '/accessibilite'       },
  { label: 'Cookies',              path: '/cookies'             },
];

function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container-xl">
        <div className="row gy-4">

          {/* Colonne marque */}
          <div className="col-12 col-md-4">
            <p className="footer-brand">Trouve ton artisan</p>
            <p className="footer-desc">
              La plateforme officielle de la région Auvergne-Rhône-Alpes
              pour trouver un artisan de confiance près de chez vous.
            </p>
          </div>

          {/* Colonne adresse */}
          <div className="col-12 col-sm-6 col-md-4">
            <h6>Antenne de Lyon</h6>
            <address>
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France<br />
              <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
            </address>
          </div>

          {/* Colonne liens légaux */}
          <div className="col-12 col-sm-6 col-md-4">
            <h6>Informations légales</h6>
            <nav aria-label="Navigation légale">
              <ul className="footer-links">
                {LEGAL_LINKS.map(link => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bas de pied de page */}
        <div className="footer-bottom d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span>
            © {new Date().getFullYear()} Région Auvergne-Rhône-Alpes. Tous droits réservés.
          </span>
          <Link to="/accessibilite" className="text-decoration-none" style={{ color: 'inherit' }}>
            Accessibilité : non conforme
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
