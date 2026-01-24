/**
 * Service API pour les actualités
 */

import { apiClient } from '../client';
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

/**
 * Parse et corrige un tableau d'URLs (peut être une chaîne JSON ou un tableau)
 */
function parseAndFixImageUrls(data: string | string[] | null): string[] {
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
  return urls.map(url => fixImageUrl(url)).filter((url): url is string => url !== null);
}

/**
 * Parse les liens URL (peut être une chaîne JSON, un tableau, ou null)
 */
function parseLinksUrl(data: string | ActualityLink[] | null): ActualityLink[] | null {
  if (!data) return null;

  // Si c'est déjà un tableau
  if (Array.isArray(data)) {
    return data.length > 0 ? data : null;
  }

  // Si c'est une chaîne JSON
  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      // Si ce n'est pas du JSON valide, retourner null
    }
  }

  return null;
}

export interface ActualityLink {
  name: string;
  url: string;
  type: string;
}

export interface Actuality {
  id: string;
  title: string;
  content: string | null;
  category: string;
  publicationDate: string | null;
  isFeatured: boolean;
  imageUrl: string | null;
  other_images_url: string[];
  linksUrl: ActualityLink[] | null;
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

      const endpoint = queryParams.toString()
        ? `${API_ENDPOINTS.ACTUALITIES.LIST}?${queryParams.toString()}`
        : API_ENDPOINTS.ACTUALITIES.LIST;

      const response = await apiClient.get<any>(endpoint);

      // La réponse a une structure imbriquée : { success: true, data: { success: true, data: Actuality[] } }
      let data: Actuality[] = [];

      const responseData = response.data;

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
        console.warn('⚠️ Actualités API: La réponse n\'est pas un tableau:', response.data);
        return [];
      }

      // Corriger les URLs d'images localhost et parser linksUrl
      const fixedData = data.map(actuality => ({
        ...actuality,
        imageUrl: fixImageUrl(actuality.imageUrl),
        other_images_url: parseAndFixImageUrls(actuality.other_images_url as any),
        linksUrl: parseLinksUrl(actuality.linksUrl as any),
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
      const endpoint = API_ENDPOINTS.ACTUALITIES.GET(id);

      const response = await apiClient.get<any>(endpoint);

      // La réponse a une structure imbriquée
      const responseData = response.data;

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
          other_images_url: parseAndFixImageUrls(actuality.other_images_url as any),
          linksUrl: parseLinksUrl(actuality.linksUrl as any),
        };
      }

      return null;
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération de l'actualité ${id}:`, error);
      return null;
    }
  },
};
