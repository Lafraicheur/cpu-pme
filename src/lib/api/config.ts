/**
 * Configuration de l'API
 */

// Appeler directement l'API externe (CORS doit être configuré sur api.cpupme.com)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cpupme.com/api';

// Debug: Log de l'URL de base
if (typeof window !== 'undefined') {
  console.log('🔧 API Base URL:', API_BASE_URL);
}

// Endpoints de l'API externe (appel direct)
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
  // Abonnements
  ABONNEMENTS: {
    LIST: '/abonnements',
    FOR_SITE_WEB: '/abonnements/for-site-web',
    GET: (id: string) => `/abonnements/${id}`,
  },
  // Adhésions
  ADHESIONS: {
    CREATE: '/adhesions',
    FOR_SITE_WEB: '/adhesions/for-site-web',
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
  // Partenaires
  PARTENAIRES: {
    FOR_SITE_WEB: '/partenaire/for-site-web',
  },
  // Équipe
  EQUIPE: {
    FOR_SITE_WEB: '/siteequipe/for-site-web',
  },
  // Centres d'intérêt
  CENTRES_INTERET: {
    FOR_SITE_WEB: '/centreinteret/for-site-web',
  },
};

export { API_BASE_URL };

