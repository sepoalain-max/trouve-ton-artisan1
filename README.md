# 🛠️ Trouve ton artisan

Application web permettant de rechercher facilement des artisans par spécialité et catégorie.

---

## 📌 Objectif du projet

Ce projet a été réalisé dans le cadre d’un devoir.
Il a pour but de développer une application complète avec un **frontend React** et une **API backend Node.js**, connectée à une base de données MySQL.

---

## 🚀 Technologies utilisées

### Frontend

* React (Vite)
* SCSS

### Backend

* Node.js
* Express
* Sequelize (ORM)

### Base de données

* MySQL

---

## 📁 Structure du projet

```bash
projet-trouve-ton-artisan/
│
├── trouve-ton-artisan/        # Frontend (React)
├── trouve-ton-artisan-api/    # Backend (Node.js / Express)
```

---

## ⚙️ Installation et lancement

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/sepoalain-max/trouve-ton-artisan1.git
cd trouve-ton-artisan1
```

---

### 2️⃣ Configuration de l’environnement

Créer un fichier `.env` dans le dossier backend :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=trouve_ton_artisan
PORT=3000
```

---

### 3️⃣ Initialiser la base de données

Dans MySQL, exécuter :

```bash
trouve-ton-artisan-api/scripts/create_database.sql
trouve-ton-artisan-api/scripts/seed_database.sql
```

---

### 4️⃣ Lancer le backend

```bash
cd trouve-ton-artisan-api
npm install
npm run dev
```

👉 API disponible sur :
http://localhost:3000/api

---

### 5️⃣ Lancer le frontend

```bash
cd ../trouve-ton-artisan
npm install
npm run dev
```

👉 Application disponible sur :
http://localhost:5173

---

## 🧩 Modélisation des données

Le projet repose sur 3 entités principales :

* **Artisan**
* **Spécialité**
* **Catégorie**

### Relations :

* Un artisan appartient à une spécialité
* Une spécialité appartient à une catégorie

👉 Schéma logique :
**Artisan → Spécialité → Catégorie**

---

## 🔌 API – Exemples de routes

### Récupérer tous les artisans

```
GET /api/artisans
```

### Rechercher un artisan

```
GET /api/artisans?search=plombier
```

### Récupérer les catégories

```
GET /api/categories
```

---

## 🔍 Fonctionnalités principales

* 🔎 Recherche d’artisans par mot-clé
* 📂 Filtrage par catégorie
* 📄 Affichage des détails d’un artisan
* ⭐ Affichage des notes
* 📧 Accès aux informations de contact

---

## ⚠️ Remarques

* Le dossier `uploads/` contient des images utilisées pour le projet
* Le fichier `.env` est nécessaire pour la connexion à la base de données
* Le port peut être modifié si déjà utilisé

---

## 👨‍💻 Auteur

**Sepo Alain Max**

---

## ✅ Statut du projet

✔️ Application fonctionnelle
✔️ Backend connecté à MySQL
✔️ Frontend dynamique
✔️ Recherche opérationnelle

