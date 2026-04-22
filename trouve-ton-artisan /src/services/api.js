// =============================================================================
// api.js – Service d'appel à l'API REST
// =============================================================================

const BASE_URL = import.meta.env.VITE_API_URL || null;
const API_KEY  = import.meta.env.VITE_API_KEY  || 'monsupersecret123';

async function apiFetch(endpoint, mockFn) {
  if (BASE_URL) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Erreur inconnue' }));
      throw new Error(err.message || `Erreur ${res.status}`);
    }
    return res.json();
  }
  await new Promise(r => setTimeout(r, 300));
  return mockFn();
}

// ── Catégories ───────────────────────────────────────────────────────────────
export function fetchCategories() {
  return apiFetch('/categories', () => import('../data/mockData.js').then(m => m.categories));
}

// ── Artisans ─────────────────────────────────────────────────────────────────
export function fetchArtisans({ categorieSlug, search } = {}) {
  const params = new URLSearchParams({
    categorieSlug: categorieSlug || '',
    search: search || '',
  });
  return apiFetch(`/artisans?${params}`, async () => {
    const { artisans, getSpecialiteByArtisan, getCategorieByArtisan } = await import('../data/mockData.js');
    let result = artisans.map(a => ({
      ...a,
      specialite: getSpecialiteByArtisan(a),
      categorie:  getCategorieByArtisan(a),
    }));
    if (categorieSlug) result = result.filter(a => a.categorie?.slug === categorieSlug);
    if (search?.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(a =>
        a.nom.toLowerCase().includes(q) ||
        a.prenom?.toLowerCase().includes(q) ||
        a.ville.toLowerCase().includes(q)
      );
    }
    return result;
  });
}

export function fetchArtisansDuMois() {
  return apiFetch('/artisans/du-mois', async () => {
    const { artisans, getSpecialiteByArtisan, getCategorieByArtisan } = await import('../data/mockData.js');
    return artisans
      .filter(a => a.artisanDuMois)
      .map(a => ({ ...a, specialite: getSpecialiteByArtisan(a), categorie: getCategorieByArtisan(a) }))
      .slice(0, 3);
  });
}

export function fetchArtisanById(id) {
  return apiFetch(`/artisans/${id}`, async () => {
    const { artisans, getSpecialiteByArtisan, getCategorieByArtisan } = await import('../data/mockData.js');
    const a = artisans.find(x => x.id === parseInt(id));
    if (!a) throw new Error('Artisan introuvable');
    return { ...a, specialite: getSpecialiteByArtisan(a), categorie: getCategorieByArtisan(a) };
  });
}

// ── Contact ───────────────────────────────────────────────────────────────────
export async function sendContactForm(artisanId, data) {
  if (BASE_URL) {
    const res = await fetch(`${BASE_URL}/artisans/${artisanId}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Erreur envoi' }));
      throw new Error(err.message || `Erreur ${res.status}`);
    }
    return res.json();
  }
  await new Promise(r => setTimeout(r, 600));
  return { success: true, message: 'Message envoyé (simulation).' };
}