/**
 * Service API pour les banners
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

export interface Banner {
  id: string;
  createdById: string | null;
  title: string;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
  start_date: string | null;
  end_date: string | null;
  display_order: number;
  type: string;
  position: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GetBannersParams {
  position?: string;
  type?: string;
  activeOnly?: boolean;
}

export const bannersService = {
  /**
   * Récupère les banners pour le site web
   */
  async getBanners(params?: GetBannersParams): Promise<Banner[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.position) {
        queryParams.append('position', params.position);
      }

      if (params?.type) {
        queryParams.append('type', params.type);
      }

      if (params?.activeOnly !== undefined) {
        queryParams.append('activeOnly', params.activeOnly.toString());
      }

      const endpoint = params && (params.position || params.type || params.activeOnly !== undefined)
        ? `${API_BASE_URL}${API_ENDPOINTS.BANNERS.FOR_SITE_WEB}?${queryParams.toString()}`
        : `${API_BASE_URL}${API_ENDPOINTS.BANNERS.FOR_SITE_WEB}`;

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

      // La réponse a une structure imbriquée : { success: true, data: { success: true, data: Banner[] } }
      let data: Banner[] = [];

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
        console.warn('⚠️ Banners API: La réponse n\'est pas un tableau:', responseData);
        return [];
      }

      // Corriger les URLs d'images localhost
      const fixedData = data.map(banner => ({
        ...banner,
        image_url: fixImageUrl(banner.image_url),
      }));

      return fixedData;
    } catch (error) {
      console.error('❌ Erreur lors de l\'extraction des banners:', error);
      if (error instanceof Error) {
        console.error('❌ Message d\'erreur:', error.message);
        console.error('❌ Stack:', error.stack);
      }
      return [];
    }
  },
};
