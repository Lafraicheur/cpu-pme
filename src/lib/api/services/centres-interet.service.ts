/**
 * Service API pour les centres d'intérêt
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export interface CentreInteret {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface GetCentresInteretParams {
  activeOnly?: boolean;
}

export const centresInteretService = {
  /**
   * Récupère les centres d'intérêt pour le site web
   * @param params - Paramètres de filtrage optionnels (activeOnly)
   */
  async getCentresInteretForSiteWeb(params?: GetCentresInteretParams): Promise<CentreInteret[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.activeOnly !== undefined) {
        queryParams.append('activeOnly', String(params.activeOnly));
      }

      const endpoint = queryParams.toString()
        ? `${API_ENDPOINTS.CENTRES_INTERET.FOR_SITE_WEB}?${queryParams.toString()}`
        : API_ENDPOINTS.CENTRES_INTERET.FOR_SITE_WEB;

      const response = await apiClient.get<any>(endpoint);

      // La réponse a une structure imbriquée : { success: true, data: { success: true, data: CentreInteret[] } }
      let data: CentreInteret[] = [];

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
        console.warn('⚠️ Centres d\'intérêt API: La réponse n\'est pas un tableau:', response.data);
        return [];
      }

      return data;
    } catch (error) {
      console.error('❌ Erreur lors de l\'extraction des centres d\'intérêt:', error);
      if (error instanceof Error) {
        console.error('❌ Message d\'erreur:', error.message);
        console.error('❌ Stack:', error.stack);
      }
      return [];
    }
  },
};
