/**
 * Configuration de l'API
 */

// Utiliser les routes proxy Next.js côté client pour éviter les problèmes CORS
// En SSR (server-side), appeler directement l'API externe
const API_BASE_URL = typeof window !== 'undefined'
  ? '/api/proxy' // Côté client : utiliser les routes proxy
  : (process.env.NEXT_PUBLIC_API_URL || 'https://api.cpupme.com/api'); // Côté serveur : API externe

// Debug: Log de l'URL de base
if (typeof window !== 'undefined') {
  console.log('🔧 API Base URL (client):', API_BASE_URL);
}

// Les endpoints changent selon qu'on est côté client ou serveur
const isClient = typeof window !== 'undefined';

export const API_ENDPOINTS = {
  // Types de membres
  TYPE_MEMBRES: {
    LIST: isClient ? '/type-membres' : '/type-membres',
    FOR_SITE_WEB: isClient ? '/type-membres/for-site-web' : '/type-membres/for-site-web',
    GET: (id: string) => isClient ? `/type-membres/${id}` : `/type-membres/${id}`,
  },
  // Profils
  PROFILS: {
    LIST: isClient ? '/profils' : '/profils',
    GET: (id: string) => isClient ? `/profils/${id}` : `/profils/${id}`,
  },
  // Régions
  REGIONS: {
    LIST: isClient ? '/regions' : '/regions',
    FOR_SITE_WEB: isClient ? '/regions/for-site-web' : '/regions/for-site-web',
    GET: (id: string) => isClient ? `/regions/${id}` : `/regions/${id}`,
  },
  // Secteurs
  SECTEURS: {
    LIST: isClient ? '/secteurs' : '/secteurs',
    FOR_SITE_WEB: isClient ? '/secteurs/for-site-web' : '/secteurs/for-site-web',
    GET: (id: string) => isClient ? `/secteurs/${id}` : `/secteurs/${id}`,
  },
  // Abonnements
  ABONNEMENTS: {
    LIST: isClient ? '/abonnements' : '/abonnements',
    FOR_SITE_WEB: isClient ? '/abonnements/for-site-web' : '/abonnements/for-site-web',
    GET: (id: string) => isClient ? `/abonnements/${id}` : `/abonnements/${id}`,
  },
  // Adhésions
  ADHESIONS: {
    CREATE: isClient ? '/adhesions' : '/adhesions',
  },
  // Actualités
  ACTUALITIES: {
    LIST: isClient ? '/actualities' : '/actualities/for-site-web',
    GET: (id: string) => isClient ? `/actualities/${id}` : `/actualities/${id}`,
  },
  // Publications
  PUBLICATIONS: {
    LIST: isClient ? '/publications' : '/publications/for-site-web',
    GET: (id: string) => isClient ? `/publications/${id}` : `/publications/${id}`,
  },
  // Banners
  BANNERS: {
    FOR_SITE_WEB: isClient ? '/banners' : '/banners/for-site-web',
  },
  // Partenaires
  PARTENAIRES: {
    FOR_SITE_WEB: isClient ? '/partenaire/for-site-web' : '/partenaire/for-site-web',
  },
  // Équipe
  EQUIPE: {
    FOR_SITE_WEB: isClient ? '/siteequipe/for-site-web' : '/siteequipe/for-site-web',
  },
  // Centres d'intérêt
  CENTRES_INTERET: {
    FOR_SITE_WEB: isClient ? '/centreinteret/for-site-web' : '/centreinteret/for-site-web',
  },
};

export { API_BASE_URL };

