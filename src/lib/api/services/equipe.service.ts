/**
 * Service API pour l'équipe
 */

import { proxyApiClient } from '../proxy-client';
import { API_ENDPOINTS } from '../config';

export interface EquipeMembre {
  id: string;
  nom: string;
  role: string;
  photo: string;
  bio: string;
  reseauxSociaux?: {
    linkedin?: string;
    email?: string;
  };
}

export const equipeService = {
  /**
   * Récupère les membres de l'équipe pour le site web
   */
  async getEquipeForSiteWeb(): Promise<EquipeMembre[]> {
    try {
      const response = await proxyApiClient.get<any>(API_ENDPOINTS.EQUIPE.FOR_SITE_WEB);

      // La réponse a une structure imbriquée : { success: true, data: { success: true, data: EquipeMembre[] } }
      let data: EquipeMembre[] = [];

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
        console.warn('⚠️ Équipe API: La réponse n\'est pas un tableau:', response.data);
        return [];
      }

      return data;
    } catch (error) {
      console.error('❌ Erreur lors de l\'extraction de l\'équipe:', error);
      if (error instanceof Error) {
        console.error('❌ Message d\'erreur:', error.message);
        console.error('❌ Stack:', error.stack);
      }
      return [];
    }
  },
};
