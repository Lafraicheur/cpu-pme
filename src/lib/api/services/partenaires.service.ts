/**
 * Service API pour les partenaires
 */

import { proxyApiClient } from '../proxy-client';
import { API_ENDPOINTS } from '../config';

export interface Partenaire {
  id: string;
  type: string;
  nom: string;
  logo: string;
  description: string | null;
  lien: string | null;
  categorie: string | null;
  offre: string | null;
  reduction: string | null;
  note: string | null;
}

export interface GetPartenairesParams {
  type?: 'strategique' | 'simple';
}

export const partenairesService = {
  /**
   * Récupère les partenaires pour le site web
   * @param params - Paramètres de filtrage optionnels (type)
   */
  async getPartenairesForSiteWeb(params?: GetPartenairesParams): Promise<Partenaire[]> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.type) {
        queryParams.append('type', params.type);
      }

      const endpoint = params?.type
        ? `${API_ENDPOINTS.PARTENAIRES.FOR_SITE_WEB}?${queryParams.toString()}`
        : API_ENDPOINTS.PARTENAIRES.FOR_SITE_WEB;

      const response = await proxyApiClient.get<any>(endpoint);

      // La réponse a une structure imbriquée : { success: true, data: { success: true, data: Partenaire[] } }
      let data: Partenaire[] = [];

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
        console.warn('⚠️ Partenaires API: La réponse n\'est pas un tableau:', response.data);
        return [];
      }

      return data;
    } catch (error) {
      console.error('❌ Erreur lors de l\'extraction des partenaires:', error);
      if (error instanceof Error) {
        console.error('❌ Message d\'erreur:', error.message);
        console.error('❌ Stack:', error.stack);
      }
      return [];
    }
  },
};
