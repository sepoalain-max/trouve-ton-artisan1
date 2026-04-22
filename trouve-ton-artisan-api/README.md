# 🛠️ Trouve ton artisan – API REST (Node.js / Express)

API REST sécurisée pour la plateforme **Trouve ton artisan** de la région Auvergne-Rhône-Alpes.

---

## 📋 Prérequis

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **MySQL** ≥ 8.0 (ou MariaDB ≥ 10.6)

---

## 🚀 Installation et lancement

```bash
# 1. Cloner le dépôt et aller dans le dossier API
cd trouve-ton-artisan-api

# 2. Installer les dépendances
npm install

# 3. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env : renseigner les accès MySQL, clé API, SMTP…

# 4. Créer la base de données (via le script SQL)
mysql -u root -p < scripts/create_database.sql

# 5. Alimenter la base avec le jeu d'essai (2 options)

# Option A – via le script SQL :
mysql -u root -p trouve_ton_artisan < scripts/seed_database.sql

# Option B – via Node.js / Sequelize :
npm run db:init   # Crée les tables via Sequelize (force)
npm run db:seed   # Insère le jeu d'essai

# 6. Démarrer le serveur
npm run dev       # Développement (nodemon)
npm start         # Production
```

---

## 📁 Structure du projet

```
trouve-ton-artisan-api/
├── scripts/
│   ├── create_database.sql   # Création des tables MySQL
│   ├── seed_database.sql     # Jeu d'essai SQL
│   ├── initDb.js             # Init tables via Sequelize
│   └── seedDb.js             # Seed via Sequelize
├── src/
│   ├── config/
│   │   └── database.js       # Connexion Sequelize
│   ├── controllers/
│   │   ├── artisanController.js
│   │   └── categorieController.js
│   ├── middlewares/
│   │   ├── security.js       # Clé API, rate limiting, erreurs
│   │   └── validate.js       # Validation express-validator
│   ├── models/
│   │   ├── Artisan.js
│   │   ├── Categorie.js
│   │   ├── Specialite.js
│   │   └── index.js          # Associations
│   ├── routes/
│   │   ├── artisans.js
│   │   └── categories.js
│   ├── utils/
│   │   └── mailer.js         # Envoi d'e-mails (Nodemailer)
│   └── server.js             # Point d'entrée Express
├── .env.example
└── package.json
```

---

## 🔌 Endpoints de l'API

> Toutes les routes `/api/*` requièrent l'en-tête : `X-API-Key: <votre_cle>`

| Méthode | Route                        | Description                              |
|:--------|:-----------------------------|:-----------------------------------------|
| GET     | `/health`                    | Vérification de l'état du serveur        |
| GET     | `/api/categories`            | Liste de toutes les catégories           |
| GET     | `/api/categories/:slug`      | Catégorie + ses spécialités              |
| GET     | `/api/artisans`              | Liste des artisans (`?search`, `?categorieSlug`) |
| GET     | `/api/artisans/du-mois`      | Les 3 artisans du mois                   |
| GET     | `/api/artisans/:id`          | Fiche complète d'un artisan              |
| POST    | `/api/artisans/:id/contact`  | Envoyer un message à l'artisan           |

### Exemple de requête contact

```http
POST /api/artisans/1/contact
Content-Type: application/json
X-API-Key: votre_cle_api

{
  "nom":     "Marie Dupont",
  "email":   "marie@example.com",
  "objet":   "Demande de devis salle de bain",
  "message": "Bonjour, je souhaite obtenir un devis pour..."
}
```

---

## 🔒 Sécurité mise en place

| Mesure                    | Détail                                                    |
|:--------------------------|:----------------------------------------------------------|
| **Clé API**               | En-tête `X-API-Key` obligatoire, comparaison sécurisée (`timingSafeEqual`) |
| **Helmet**                | En-têtes HTTP sécurisés (CSP, X-Frame-Options, HSTS…)    |
| **CORS**                  | Origines autorisées listées dans `ALLOWED_ORIGINS`        |
| **Rate limiting**         | 100 req/15 min général, 10 envois/h pour le formulaire    |
| **Validation**            | `express-validator` sur tous les paramètres entrants      |
| **Protection XSS**        | `.escape()` sur les champs texte                          |
| **Honeypot anti-spam**    | Champ `_website` caché dans le formulaire de contact      |
| **Payload limité**        | Corps JSON limité à 10 Ko                                 |
| **Variables d'env**       | Secrets dans `.env` (non commité)                         |
| **Logs HTTP**             | Morgan (concis en dev, combined en prod)                  |

---

## 🗄️ Stack technique

| Couche       | Technologie                              |
|:-------------|:-----------------------------------------|
| Runtime      | Node.js 18+                              |
| Framework    | Express 4                                |
| ORM          | Sequelize 6 + mysql2                     |
| Base de données | MySQL 8 / MariaDB 10.6               |
| E-mail       | Nodemailer                               |
| Sécurité     | Helmet, CORS, express-rate-limit         |
| Validation   | express-validator                        |
