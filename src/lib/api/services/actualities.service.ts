/**
 * Service API pour les actualités
 */

import { API_ENDPOINTS, API_BASE_URL } from '../config';

/**
 * Fonction utilitaire pour corriger les URLs d'images localhost
 * Remplace localhost:1996 par l'URL publique de l'API
 */
function fixImageUrl(url: string | null): string | null {
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

export interface Actuality {
  id: string;
  title: string;
  content: string | null;
  category: string;
  publicationDate: string | null;
  isFeatured: boolean;
  imageUrl: string | null;
  other_images_url: string | null;
  createdById: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdBy: string | null;
}

export interface GetActualitiesParams {
  category?: string;
  featuredOnly?: boolean;
}

export const actualitiesService = {
  /**
   * Récupère toutes les actualités
   */
  async getActualities(params?: GetActualitiesParams): Promise<Actuality[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.category) {
        queryParams.append('category', params.category);
      }

      if (params?.featuredOnly !== undefined) {
        queryParams.append('featuredOnly', params.featuredOnly.toString());
      }

      const endpoint = params && (params.category || params.featuredOnly !== undefined)
        ? `${API_BASE_URL}${API_ENDPOINTS.ACTUALITIES.LIST}?${queryParams.toString()}`
        : `${API_BASE_URL}${API_ENDPOINTS.ACTUALITIES.LIST}`;

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

      // La réponse a une structure imbriquée : { success: true, data: { success: true, data: Actuality[] } }
      let data: Actuality[] = [];

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
        console.warn('⚠️ Actualités API: La réponse n\'est pas un tableau:', responseData);
        return [];
      }

      // Corriger les URLs d'images localhost
      const fixedData = data.map(actuality => ({
        ...actuality,
        imageUrl: fixImageUrl(actuality.imageUrl),
        other_images_url: fixImageUrl(actuality.other_images_url),
      }));

      return fixedData;
    } catch (error) {
      console.error('❌ Erreur lors de l\'extraction des actualités:', error);
      if (error instanceof Error) {
        console.error('❌ Message d\'erreur:', error.message);
        console.error('❌ Stack:', error.stack);
      }
      return [];
    }
  },

  /**
   * Récupère une actualité par son ID
   */
  async getActualityById(id: string): Promise<Actuality | null> {
    try {
      const endpoint = `${API_BASE_URL}${API_ENDPOINTS.ACTUALITIES.GET(id)}`;

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

      let actuality: Actuality | null = null;

      if (responseData && typeof responseData === 'object') {
        if ('data' in responseData && responseData.data) {
          const innerData = responseData.data;
          if (innerData && typeof innerData === 'object' && 'data' in innerData) {
            actuality = innerData.data;
          } else if (innerData && !Array.isArray(innerData)) {
            actuality = innerData;
          }
        }
      }

      // Corriger les URLs d'images localhost si l'actualité existe
      if (actuality) {
        return {
          ...actuality,
          imageUrl: fixImageUrl(actuality.imageUrl),
          other_images_url: fixImageUrl(actuality.other_images_url),
        };
      }

      return null;
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération de l'actualité ${id}:`, error);
      return null;
    }
  },
};
