-- =============================================================================
-- scripts/seed_database.sql
-- Script d'alimentation de la base de données (jeu d'essai complet)
-- Exécuter avec : mysql -u root -p trouve_ton_artisan < scripts/seed_database.sql
-- =============================================================================

USE trouve_ton_artisan;

-- Désactiver temporairement les contrôles de clés étrangères pour le seed
SET FOREIGN_KEY_CHECKS = 0;

-- Vider les tables dans l'ordre inverse des dépendances
TRUNCATE TABLE artisan;
TRUNCATE TABLE specialite;
TRUNCATE TABLE categorie;

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================================
-- Catégories
-- =============================================================================
INSERT INTO categorie (id, nom, slug, icone) VALUES
  (1, 'Bâtiment',      'batiment',     'bi-house-gear'),
  (2, 'Services',      'services',     'bi-tools'),
  (3, 'Fabrication',   'fabrication',  'bi-hammer'),
  (4, 'Alimentation',  'alimentation', 'bi-basket');

-- =============================================================================
-- Spécialités
-- =============================================================================
INSERT INTO specialite (id, nom, categorie_id) VALUES
  -- Bâtiment
  ( 1, 'Plomberie',    1),
  ( 2, 'Électricité',  1),
  ( 3, 'Maçonnerie',   1),
  ( 4, 'Couverture',   1),
  ( 5, 'Menuiserie',   1),
  -- Services
  ( 6, 'Coiffure',     2),
  ( 7, 'Photographie', 2),
  ( 8, 'Traiteur',     2),
  -- Fabrication
  ( 9, 'Ébénisterie',  3),
  (10, 'Bijouterie',   3),
  (11, 'Poterie',      3),
  -- Alimentation
  (12, 'Boulangerie',  4),
  (13, 'Charcuterie',  4),
  (14, 'Fromagerie',   4);

-- =============================================================================
-- Artisans (jeu d'essai – 14 artisans)
-- =============================================================================
INSERT INTO artisan
  (id, nom, prenom, email, telephone, adresse, ville, code_postal,
   site_web, apropos, note, artisan_du_mois, specialite_id)
VALUES
  (1,
   'Dupont Plomberie', 'Jean',
   'contact@dupont-plomberie.fr', '04 72 00 00 01',
   '12 rue de la Paix, 69003 Lyon', 'Lyon', '69003',
   'https://dupont-plomberie.fr',
   'Artisan plombier depuis 20 ans, spécialisé dans la rénovation et l''installation de salles de bain. Travail soigné et devis gratuit.',
   4.5, 1, 1),

  (2,
   'Électricité Martin', 'Sophie',
   'contact@electricite-martin.fr', '04 76 00 00 02',
   '5 avenue des Alpes, 38000 Grenoble', 'Grenoble', '38000',
   NULL,
   'Électricienne certifiée RGE, intervention rapide pour tous vos travaux électriques, mise aux normes, domotique.',
   4.8, 1, 2),

  (3,
   'Maçonnerie Rossi', 'Antonio',
   'rossi.maconnerie@gmail.com', '04 73 00 00 03',
   '8 rue des Volcans, 63000 Clermont-Ferrand', 'Clermont-Ferrand', '63000',
   'https://maconnerie-rossi.fr',
   'Maçon traditionnel, spécialisé en rénovation de maisons anciennes, ravalement, extension.',
   4.2, 1, 3),

  (4,
   'Toiture Savoy', 'Michel',
   'savoy.toiture@orange.fr', '04 50 00 00 04',
   '3 quai du Lac, 74000 Annecy', 'Annecy', '74000',
   NULL,
   'Couvreur zingueur depuis 15 ans dans la région alpine, spécialiste toiture ardoise et zinc.',
   4.0, 0, 4),

  (5,
   'Menuiserie Blanc', 'Laurent',
   'menuiserie.blanc@wanadoo.fr', '04 79 00 00 05',
   '22 rue du Bois, 73000 Chambéry', 'Chambéry', '73000',
   'https://menuiserie-blanc.fr',
   'Menuisier ébéniste, fabrication sur mesure de portes, fenêtres, dressing et cuisine.',
   4.6, 0, 5),

  (6,
   'Salon Élégance', 'Isabelle',
   'elegance.coiffure@gmail.com', '04 72 00 00 06',
   '47 rue de la République, 69001 Lyon', 'Lyon', '69001',
   'https://salon-elegance-lyon.fr',
   'Coiffeuse styliste depuis 12 ans. Colorations végétales, coupes tendance, chignons de mariage.',
   4.9, 0, 6),

  (7,
   'Photo Auvergne', 'Pierre',
   'pierre@photo-auvergne.fr', '04 73 00 00 07',
   '14 allée du Puy, 63100 Clermont-Ferrand', 'Clermont-Ferrand', '63100',
   'https://photo-auvergne.fr',
   'Photographe professionnel, reportages de mariage, portraits corporate, photographie culinaire.',
   4.7, 0, 7),

  (8,
   'Traiteur Savoyard', 'Marie',
   'marie.traiteur@outlook.fr', '04 50 00 00 08',
   '9 rue du Marché, 74000 Annecy', 'Annecy', '74000',
   NULL,
   'Traiteure spécialisée dans la cuisine savoyarde et les buffets d''entreprise. Produits locaux et de saison.',
   4.3, 0, 8),

  (9,
   'Atelier du Bois', 'François',
   'atelier.bois.valence@gmail.com', '04 75 00 00 09',
   '6 impasse des Artisans, 26000 Valence', 'Valence', '26000',
   'https://atelier-du-bois-valence.fr',
   'Ébéniste créateur, meubles uniques fabriqués à la main en bois massif. Restauration de meubles anciens.',
   5.0, 0, 9),

  (10,
   'Bijoux Rhône', 'Chloé',
   'bijoux.rhone@yahoo.fr', '04 72 00 00 10',
   '2 montée Saint-Barthélémy, 69005 Lyon', 'Lyon', '69005',
   NULL,
   'Bijoutière créatrice, pièces uniques en argent et or, personnalisation, gravure, réparation.',
   4.4, 0, 10),

  (11,
   'La Poterie du Lac', 'Anne',
   'poterie.du.lac@gmail.com', '04 79 00 00 11',
   '15 chemin du Lac, 73100 Aix-les-Bains', 'Aix-les-Bains', '73100',
   'https://poterie-du-lac.fr',
   'Potière, créations culinaires et décoratives en grès et faïence. Cours de poterie disponibles.',
   4.6, 0, 11),

  (12,
   'Boulangerie Dorée', 'Thomas',
   'boulangerie.doree@gmail.com', '04 76 00 00 12',
   '33 rue Victor Hugo, 38100 Grenoble', 'Grenoble', '38100',
   NULL,
   'Boulanger artisan depuis 18 ans, pain au levain, viennoiseries, tartes et gâteaux selon les traditions.',
   4.8, 0, 12),

  (13,
   'Charcuterie Vivarais', 'Gilles',
   'vivarais.charcuterie@orange.fr', '04 75 00 00 13',
   '4 avenue de la Charcuterie, 07000 Privas', 'Privas', '07000',
   'https://charcuterie-vivarais.fr',
   'Charcutier traiteur depuis 25 ans. Saucissons, jambons, terrines artisanaux à base de porc du Vivarais.',
   4.5, 0, 13),

  (14,
   'Fromagerie des Alpes', 'Brigitte',
   'fromagerie.alpes@gmail.com', '04 79 00 00 14',
   '7 rue du Beaufortin, 73200 Albertville', 'Albertville', '73200',
   NULL,
   'Fromagère affineure, spécialiste des fromages savoyards. Beaufort, Reblochon, Abondance en direct des alpages.',
   4.7, 0, 14);
