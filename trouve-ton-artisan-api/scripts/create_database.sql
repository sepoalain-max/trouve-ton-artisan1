-- =============================================================================
-- scripts/create_database.sql
-- Script de création de la base de données "trouve_ton_artisan"
-- Exécuter avec : mysql -u root -p < scripts/create_database.sql
-- =============================================================================

-- Création de la base si elle n'existe pas
CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE trouve_ton_artisan;

-- =============================================================================
-- Table : categorie
-- Niveau supérieur : Bâtiment, Services, Fabrication, Alimentation
-- =============================================================================
CREATE TABLE IF NOT EXISTS categorie (
  id         INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  nom        VARCHAR(80)      NOT NULL,
  slug       VARCHAR(80)      NOT NULL,
  icone      VARCHAR(60)          NULL COMMENT 'Classe Bootstrap Icons',
  created_at DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uq_categorie_nom  (nom),
  UNIQUE KEY uq_categorie_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Catégories d''artisanat';

-- =============================================================================
-- Table : specialite
-- Ex. Plomberie, Électricité, Coiffure…
-- Chaque spécialité appartient à une seule catégorie.
-- =============================================================================
CREATE TABLE IF NOT EXISTS specialite (
  id           INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  nom          VARCHAR(100)     NOT NULL,
  categorie_id INT UNSIGNED     NOT NULL,
  created_at   DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  KEY fk_specialite_categorie (categorie_id),
  CONSTRAINT fk_specialite_categorie
    FOREIGN KEY (categorie_id) REFERENCES categorie (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Spécialités des artisans';

-- =============================================================================
-- Table : artisan
-- Chaque artisan appartient à une seule spécialité.
-- =============================================================================
CREATE TABLE IF NOT EXISTS artisan (
  id               INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  nom              VARCHAR(120)     NOT NULL,
  prenom           VARCHAR(80)          NULL,
  email            VARCHAR(180)     NOT NULL,
  telephone        VARCHAR(20)          NULL,
  adresse          VARCHAR(255)         NULL,
  ville            VARCHAR(100)     NOT NULL,
  code_postal      CHAR(5)          NOT NULL,
  site_web         VARCHAR(255)         NULL,
  apropos          TEXT                 NULL,
  note             DECIMAL(3,1)     NOT NULL DEFAULT 0.0,
  photo            VARCHAR(255)         NULL COMMENT 'Chemin ou URL de la photo',
  artisan_du_mois  TINYINT(1)       NOT NULL DEFAULT 0,
  specialite_id    INT UNSIGNED     NOT NULL,
  created_at       DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uq_artisan_email (email),
  KEY idx_artisan_specialite  (specialite_id),
  KEY idx_artisan_ville        (ville),
  KEY idx_artisan_du_mois      (artisan_du_mois),
  FULLTEXT KEY ft_artisan_search (nom, prenom, ville),

  CONSTRAINT fk_artisan_specialite
    FOREIGN KEY (specialite_id) REFERENCES specialite (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,

  CONSTRAINT chk_artisan_note
    CHECK (note >= 0 AND note <= 5),

  CONSTRAINT chk_artisan_code_postal
    CHECK (code_postal REGEXP '^[0-9]{5}$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Artisans référencés sur la plateforme';
