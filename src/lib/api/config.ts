/**
 * Configuration de l'API
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cpupme.com/api';

// Debug: Log de l'URL de base
if (typeof window !== 'undefined') {
  console.log('🔧 [DEBUG CONFIG] API_BASE_URL:', API_BASE_URL);
  console.log('🔧 [DEBUG CONFIG] NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
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
};

export { API_BASE_URL };

