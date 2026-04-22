# 🏗️ Trouve ton artisan – Frontend React

Plateforme dédiée aux artisans de la région **Auvergne-Rhône-Alpes**, permettant aux particuliers de trouver et de contacter un artisan qualifié.

---

## 📋 Prérequis

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- (Optionnel) API backend Node.js/Express tournant sur le port 3000

---

## 🚀 Installation et lancement

```bash
# 1. Cloner le dépôt
git clone https://github.com/<votre-username>/trouve-ton-artisan.git
cd trouve-ton-artisan

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env : renseigner VITE_API_URL si l'API backend est disponible

# 4. Lancer le serveur de développement
npm run dev
# → http://localhost:5173
```

## 🏗️ Build de production

```bash
npm run build
npm run preview  # pour tester le build en local
```

---

## 📁 Structure du projet

```
trouve-ton-artisan/
├── public/               # Fichiers statiques (favicon, images)
├── src/
│   ├── components/       # Composants réutilisables
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── ArtisanCard/
│   │   ├── StarRating/
│   │   ├── StepGuide/
│   │   └── ContactForm/
│   ├── pages/            # Pages de l'application
│   │   ├── Home/
│   │   ├── ArtisanList/
│   │   ├── ArtisanDetail/
│   │   ├── NotFound/
│   │   └── LegalPage/
│   ├── services/
│   │   └── api.js        # Appels API (ou mock si VITE_API_URL absent)
│   ├── data/
│   │   └── mockData.js   # Jeu d'essai
│   ├── styles/
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   ├── main.scss
│   │   └── components/
│   ├── App.jsx           # Routeur principal
│   └── main.jsx          # Point d'entrée
├── .env.example
├── vite.config.js
└── package.json
```

---

## 🎨 Stack technique

| Couche       | Technologie                       |
|:-------------|:----------------------------------|
| Framework    | React 18 + React Router 6         |
| Styles       | Bootstrap 5 + Sass                |
| Build        | Vite 5                            |
| API          | Fetch natif (service `api.js`)    |

---

## ♿ Accessibilité (WCAG 2.1)

- Skip link vers le contenu principal
- Rôles ARIA et `aria-label` sur tous les éléments interactifs
- Messages d'erreur de formulaire liés via `aria-describedby`
- Focus visible sur tous les éléments focusables
- Contrastes conformes AA

---

## 🔒 Sécurité

- Variables sensibles dans `.env` (non commité)
- Validation des formulaires côté client (et à prévoir côté serveur)
- Champ honeypot anti-spam dans le formulaire de contact
- Liens externes avec `rel="noopener noreferrer"`
- En-têtes HTTP sécurisés à configurer côté serveur (CSP, HSTS…)
