/**
 * Configuration de l'API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cpupme.com/api';

// Debug: Log de l'URL de base
if (typeof window !== 'undefined') {
}

export const API_ENDPOINTS = {
  // Types de membres
  TYPE_MEMBRES: {
    LIST: '/type-membres',
    FOR_SITE_WEB: '/type-membres/for-site-web',
    GET: (id: string) => `/type-membres/${id}`,
  },
  // Profils
  PROFILS: {
    LIST: '/profils',
    GET: (id: string) => `/profils/${id}`,
  },
  // Régions
  REGIONS: {
    LIST: '/regions',
    FOR_SITE_WEB: '/regions/for-site-web',
    GET: (id: string) => `/regions/${id}`,
  },
  // Secteurs
  SECTEURS: {
    LIST: '/secteurs',
    FOR_SITE_WEB: '/secteurs/for-site-web',
    GET: (id: string) => `/secteurs/${id}`,
  },
  // Actualités
  ACTUALITIES: {
    LIST: '/actualities/for-site-web',
    GET: (id: string) => `/actualities/${id}`,
  },
  // Publications
  PUBLICATIONS: {
    LIST: '/publications/for-site-web',
    GET: (id: string) => `/publications/${id}`,
  },
  // Banners
  BANNERS: {
    FOR_SITE_WEB: '/banners/for-site-web',
  },
};

export { API_BASE_URL };

