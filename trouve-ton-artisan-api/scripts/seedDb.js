// =============================================================================
// scripts/seedDb.js – Insère le jeu d'essai via Sequelize
// Usage : npm run db:seed
// =============================================================================
'use strict';

require('dotenv').config();

const { sequelize }                       = require('../src/config/database');
const { Categorie, Specialite, Artisan }  = require('../src/models');

// ── Données ───────────────────────────────────────────────────────────────────

const categories = [
  { nom: 'Bâtiment',     slug: 'batiment',     icone: 'bi-house-gear' },
  { nom: 'Services',     slug: 'services',     icone: 'bi-tools'      },
  { nom: 'Fabrication',  slug: 'fabrication',  icone: 'bi-hammer'     },
  { nom: 'Alimentation', slug: 'alimentation', icone: 'bi-basket'     },
];

const specialites = [
  { nom: 'Plomberie',    categorieNom: 'Bâtiment'     },
  { nom: 'Électricité',  categorieNom: 'Bâtiment'     },
  { nom: 'Maçonnerie',   categorieNom: 'Bâtiment'     },
  { nom: 'Couverture',   categorieNom: 'Bâtiment'     },
  { nom: 'Menuiserie',   categorieNom: 'Bâtiment'     },
  { nom: 'Coiffure',     categorieNom: 'Services'     },
  { nom: 'Photographie', categorieNom: 'Services'     },
  { nom: 'Traiteur',     categorieNom: 'Services'     },
  { nom: 'Ébénisterie',  categorieNom: 'Fabrication'  },
  { nom: 'Bijouterie',   categorieNom: 'Fabrication'  },
  { nom: 'Poterie',      categorieNom: 'Fabrication'  },
  { nom: 'Boulangerie',  categorieNom: 'Alimentation' },
  { nom: 'Charcuterie',  categorieNom: 'Alimentation' },
  { nom: 'Fromagerie',   categorieNom: 'Alimentation' },
];

const artisans = [
  { nom:'Dupont Plomberie',    prenom:'Jean',      email:'contact@dupont-plomberie.fr',   telephone:'04 72 00 00 01', adresse:'12 rue de la Paix, 69003 Lyon',            ville:'Lyon',             code_postal:'69003', site_web:'https://dupont-plomberie.fr',       apropos:'Artisan plombier depuis 20 ans, spécialisé dans la rénovation et l\'installation de salles de bain.',       note:4.5, artisan_du_mois:true,  specialiteNom:'Plomberie'    },
  { nom:'Électricité Martin',  prenom:'Sophie',    email:'contact@electricite-martin.fr', telephone:'04 76 00 00 02', adresse:'5 avenue des Alpes, 38000 Grenoble',        ville:'Grenoble',         code_postal:'38000', site_web:null,                                apropos:'Électricienne certifiée RGE, intervention rapide pour tous vos travaux électriques.',                         note:4.8, artisan_du_mois:true,  specialiteNom:'Électricité'  },
  { nom:'Maçonnerie Rossi',    prenom:'Antonio',   email:'rossi.maconnerie@gmail.com',    telephone:'04 73 00 00 03', adresse:'8 rue des Volcans, 63000 Clermont-Ferrand', ville:'Clermont-Ferrand', code_postal:'63000', site_web:'https://maconnerie-rossi.fr',       apropos:'Maçon traditionnel, spécialisé en rénovation de maisons anciennes.',                                          note:4.2, artisan_du_mois:true,  specialiteNom:'Maçonnerie'   },
  { nom:'Toiture Savoy',       prenom:'Michel',    email:'savoy.toiture@orange.fr',       telephone:'04 50 00 00 04', adresse:'3 quai du Lac, 74000 Annecy',               ville:'Annecy',           code_postal:'74000', site_web:null,                                apropos:'Couvreur zingueur depuis 15 ans dans la région alpine.',                                                      note:4.0, artisan_du_mois:false, specialiteNom:'Couverture'   },
  { nom:'Menuiserie Blanc',    prenom:'Laurent',   email:'menuiserie.blanc@wanadoo.fr',   telephone:'04 79 00 00 05', adresse:'22 rue du Bois, 73000 Chambéry',            ville:'Chambéry',         code_postal:'73000', site_web:'https://menuiserie-blanc.fr',       apropos:'Menuisier ébéniste, fabrication sur mesure de portes, fenêtres, dressing.',                                   note:4.6, artisan_du_mois:false, specialiteNom:'Menuiserie'   },
  { nom:'Salon Élégance',      prenom:'Isabelle',  email:'elegance.coiffure@gmail.com',   telephone:'04 72 00 00 06', adresse:'47 rue de la République, 69001 Lyon',       ville:'Lyon',             code_postal:'69001', site_web:'https://salon-elegance-lyon.fr',    apropos:'Coiffeuse styliste depuis 12 ans. Colorations végétales, coupes tendance.',                                   note:4.9, artisan_du_mois:false, specialiteNom:'Coiffure'     },
  { nom:'Photo Auvergne',      prenom:'Pierre',    email:'pierre@photo-auvergne.fr',      telephone:'04 73 00 00 07', adresse:'14 allée du Puy, 63100 Clermont-Ferrand',   ville:'Clermont-Ferrand', code_postal:'63100', site_web:'https://photo-auvergne.fr',         apropos:'Photographe professionnel, reportages de mariage, portraits corporate.',                                      note:4.7, artisan_du_mois:false, specialiteNom:'Photographie' },
  { nom:'Traiteur Savoyard',   prenom:'Marie',     email:'marie.traiteur@outlook.fr',     telephone:'04 50 00 00 08', adresse:'9 rue du Marché, 74000 Annecy',             ville:'Annecy',           code_postal:'74000', site_web:null,                                apropos:'Traiteure spécialisée dans la cuisine savoyarde et les buffets d\'entreprise.',                               note:4.3, artisan_du_mois:false, specialiteNom:'Traiteur'     },
  { nom:'Atelier du Bois',     prenom:'François',  email:'atelier.bois.valence@gmail.com',telephone:'04 75 00 00 09', adresse:'6 impasse des Artisans, 26000 Valence',     ville:'Valence',          code_postal:'26000', site_web:'https://atelier-du-bois-valence.fr',apropos:'Ébéniste créateur, meubles uniques fabriqués à la main en bois massif.',                                        note:5.0, artisan_du_mois:false, specialiteNom:'Ébénisterie'  },
  { nom:'Bijoux Rhône',        prenom:'Chloé',     email:'bijoux.rhone@yahoo.fr',         telephone:'04 72 00 00 10', adresse:'2 montée Saint-Barthélémy, 69005 Lyon',     ville:'Lyon',             code_postal:'69005', site_web:null,                                apropos:'Bijoutière créatrice, pièces uniques en argent et or.',                                                       note:4.4, artisan_du_mois:false, specialiteNom:'Bijouterie'   },
  { nom:'La Poterie du Lac',   prenom:'Anne',      email:'poterie.du.lac@gmail.com',      telephone:'04 79 00 00 11', adresse:'15 chemin du Lac, 73100 Aix-les-Bains',     ville:'Aix-les-Bains',   code_postal:'73100', site_web:'https://poterie-du-lac.fr',         apropos:'Potière, créations culinaires et décoratives. Cours de poterie disponibles.',                                 note:4.6, artisan_du_mois:false, specialiteNom:'Poterie'      },
  { nom:'Boulangerie Dorée',   prenom:'Thomas',    email:'boulangerie.doree@gmail.com',   telephone:'04 76 00 00 12', adresse:'33 rue Victor Hugo, 38100 Grenoble',        ville:'Grenoble',         code_postal:'38100', site_web:null,                                apropos:'Boulanger artisan depuis 18 ans, pain au levain, viennoiseries, tartes.',                                     note:4.8, artisan_du_mois:false, specialiteNom:'Boulangerie'  },
  { nom:'Charcuterie Vivarais',prenom:'Gilles',    email:'vivarais.charcuterie@orange.fr',telephone:'04 75 00 00 13', adresse:'4 avenue de la Charcuterie, 07000 Privas',  ville:'Privas',           code_postal:'07000', site_web:'https://charcuterie-vivarais.fr',   apropos:'Charcutier traiteur depuis 25 ans. Saucissons et jambons artisanaux.',                                        note:4.5, artisan_du_mois:false, specialiteNom:'Charcuterie'  },
  { nom:'Fromagerie des Alpes',prenom:'Brigitte',  email:'fromagerie.alpes@gmail.com',    telephone:'04 79 00 00 14', adresse:'7 rue du Beaufortin, 73200 Albertville',    ville:'Albertville',      code_postal:'73200', site_web:null,                                apropos:'Fromagère affineure, spécialiste des fromages savoyards. Beaufort, Reblochon.',                               note:4.7, artisan_du_mois:false, specialiteNom:'Fromagerie'   },
];

// ── Seed ──────────────────────────────────────────────────────────────────────

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion établie.');

    // 1. Catégories
    console.log('📂 Insertion des catégories…');
    const catMap = {};
    for (const cat of categories) {
      const [record] = await Categorie.findOrCreate({ where: { slug: cat.slug }, defaults: cat });
      catMap[cat.nom] = record.id;
    }

    // 2. Spécialités
    console.log('🏷️  Insertion des spécialités…');
    const specMap = {};
    for (const spec of specialites) {
      const [record] = await Specialite.findOrCreate({
        where:    { nom: spec.nom, categorie_id: catMap[spec.categorieNom] },
        defaults: { nom: spec.nom, categorie_id: catMap[spec.categorieNom] },
      });
      specMap[spec.nom] = record.id;
    }

    // 3. Artisans
    console.log('👷 Insertion des artisans…');
    for (const a of artisans) {
      const { specialiteNom, ...data } = a;
      await Artisan.findOrCreate({
        where:    { email: data.email },
        defaults: { ...data, specialite_id: specMap[specialiteNom] },
      });
    }

    console.log(`\n🎉 Seed terminé ! ${artisans.length} artisans insérés.`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur lors du seed :', err.message);
    process.exit(1);
  }
}

seed();
