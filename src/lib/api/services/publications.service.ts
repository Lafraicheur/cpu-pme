/**
 * Service API pour les publications
 */

import { API_ENDPOINTS, API_BASE_URL } from '../config';

/**
 * Fonction utilitaire pour corriger les URLs de fichiers localhost
 * Remplace localhost:1996 par l'URL publique de l'API
 */
function fixFileUrl(url: string | null): string | null {
  if (!url) return null;

  // Remplacer localhost:1996 par l'URL de l'API publique
  if (url.includes('localhost:1996') || url.includes('http://localhost:1996')) {
    // Extraire le chemin après /uploads/
    const uploadsMatch = url.match(/\/uploads\/.+$/);
    if (uploadsMatch) {
      // Construire la nouvelle URL avec l'API publique
      // Retirer seulement le /api à la fin de l'URL, pas dans api.cpupme.com
      const apiBaseWithoutApi = API_BASE_URL.replace(/\/api$/, '');
      return `${apiBaseWithoutApi}${uploadsMatch[0]}`;
    }
  }

  return url;
}

/**
 * Parse et corrige un tableau d'URLs de fichiers (peut être une chaîne JSON ou un tableau)
 */
function parseAndFixFileUrls(data: string | string[] | null): string[] {
  if (!data) return [];

  let urls: string[] = [];

  // Si c'est déjà un tableau
  if (Array.isArray(data)) {
    urls = data;
  }
  // Si c'est une chaîne JSON
  else if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data);
      urls = Array.isArray(parsed) ? parsed : [];
    } catch {
      // Si ce n'est pas du JSON valide, essayer de splitter par virgule
      urls = data.split(',').map(url => url.trim()).filter(url => url.length > 0);
    }
  }

  // Corriger toutes les URLs
  return urls.map(url => fixFileUrl(url)).filter((url): url is string => url !== null);
}

export interface Publication {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  status: string;
  publicationDate: string;
  fileUrl: string | null;
  otherFilesUrl: string[];
  linksUrl: string | null;
  createdById: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
}

export interface GetPublicationsParams {
  category?: string;
  type?: string;
  status?: string;
}

export const publicationsService = {
  /**
   * Récupère toutes les publications
   */
  async getPublications(params?: GetPublicationsParams): Promise<Publication[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.category) {
        queryParams.append('category', params.category);
      }

      if (params?.type) {
        queryParams.append('type', params.type);
      }

      if (params?.status) {
        queryParams.append('status', params.status);
      }

      const endpoint = params && (params.category || params.type || params.status)
        ? `${API_BASE_URL}${API_ENDPOINTS.PUBLICATIONS.LIST}?${queryParams.toString()}`
        : `${API_BASE_URL}${API_ENDPOINTS.PUBLICATIONS.LIST}`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json();

      // La réponse a une structure imbriquée : { success: true, data: { success: true, data: Publication[] } }
      let data: Publication[] = [];

      // Gérer la structure imbriquée
      if (responseData && typeof responseData === 'object') {
        if ('data' in responseData && responseData.data) {
          const innerData = responseData.data;
          if (innerData && typeof innerData === 'object' && 'data' in innerData) {
            // Structure: { success: true, data: { success: true, data: [...] } }
            data = Array.isArray(innerData.data) ? innerData.data : [];
          } else if (Array.isArray(innerData)) {
            // Structure: { success: true, data: [...] }
            data = innerData;
          }
        } else if (Array.isArray(responseData)) {
          // Structure directe: [...]
          data = responseData;
        }
      }

      // S'assurer que c'est un tableau
      if (!Array.isArray(data)) {
        console.warn('⚠️ Publications API: La réponse n\'est pas un tableau:', responseData);
        return [];
      }

      // Corriger les URLs de fichiers localhost
      const fixedData = data.map(publication => ({
        ...publication,
        fileUrl: fixFileUrl(publication.fileUrl),
        otherFilesUrl: parseAndFixFileUrls(publication.otherFilesUrl as any),
        linksUrl: fixFileUrl(publication.linksUrl),
      }));

      return fixedData;
    } catch (error) {
      console.error('❌ Erreur lors de l\'extraction des publications:', error);
      if (error instanceof Error) {
        console.error('❌ Message d\'erreur:', error.message);
        console.error('❌ Stack:', error.stack);
      }
      return [];
    }
  },

  /**
   * Récupère une publication par son ID
   */
  async getPublicationById(id: string): Promise<Publication | null> {
    try {
      const endpoint = `${API_BASE_URL}${API_ENDPOINTS.PUBLICATIONS.GET(id)}`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // La réponse a une structure imbriquée
      const responseData = await response.json();

      let publication: Publication | null = null;

      if (responseData && typeof responseData === 'object') {
        if ('data' in responseData && responseData.data) {
          const innerData = responseData.data;
          if (innerData && typeof innerData === 'object' && 'data' in innerData) {
            publication = innerData.data;
          } else if (innerData && !Array.isArray(innerData)) {
            publication = innerData;
          }
        }
      }

      // Corriger les URLs de fichiers localhost si la publication existe
      if (publication) {
        return {
          ...publication,
          fileUrl: fixFileUrl(publication.fileUrl),
          otherFilesUrl: parseAndFixFileUrls(publication.otherFilesUrl as any),
          linksUrl: fixFileUrl(publication.linksUrl),
        };
      }

      return null;
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération de la publication ${id}:`, error);
      return null;
    }
  },
};
