/**
 * Service API pour les régions
 */

import { apiClient } from '../client';
import { proxyApiClient } from '../proxy-client';
import { API_ENDPOINTS } from '../config';

export interface Quartier {
  id: string;
  commune_id: string;
  name: string;
  type: 'quartier' | 'village';
  isActive: boolean;
}

export interface Commune {
  id: string;
  ville_id: string;
  name: string;
  isActive: boolean;
  quartiers?: Quartier[];
}

export interface Ville {
  id: string;
  region_id: string;
  name: string;
  isActive: boolean;
  communes?: Commune[];
}

export interface Region {
  id: string;
  name: string;
  zone: string;
  isActive: boolean;
  villes?: Ville[];
}

export const regionsService = {
  /**
   * Récupère toutes les régions avec leurs relations complètes pour le site web
   */
  async getRegionsForSiteWeb(): Promise<Region[]> {
    try {
      console.log('🔍 [DEBUG REGIONS] Appel API via proxy:', API_ENDPOINTS.REGIONS.FOR_SITE_WEB);
      const response = await proxyApiClient.get<any>(API_ENDPOINTS.REGIONS.FOR_SITE_WEB);
      console.log('📦 [DEBUG REGIONS] Réponse brute:', response);
      console.log('📦 [DEBUG REGIONS] response.data:', response.data);
      
      // La réponse a une structure imbriquée : { success: true, data: { success: true, data: Region[] } }
      let data: Region[] = [];
      
      const responseData = response.data;
      
      // Gérer la structure imbriquée
      if (responseData && typeof responseData === 'object') {
        if ('data' in responseData && responseData.data) {
          const innerData = responseData.data;
          if (innerData && typeof innerData === 'object' && 'data' in innerData) {
            // Structure: { success: true, data: { success: true, data: [...] } }
            console.log('🔍 [DEBUG REGIONS] Structure doublement imbriquée détectée');
            data = Array.isArray(innerData.data) ? innerData.data : [];
          } else if (Array.isArray(innerData)) {
            // Structure: { success: true, data: [...] }
            console.log('🔍 [DEBUG REGIONS] Structure simple détectée');
            data = innerData;
          }
        } else if (Array.isArray(responseData)) {
          // Structure directe: [...]
          console.log('🔍 [DEBUG REGIONS] Structure directe détectée');
          data = responseData;
        }
      }
      
      console.log('✅ [DEBUG REGIONS] Données extraites:', data);
      console.log('✅ [DEBUG REGIONS] Nombre de régions:', data.length);
      
      // S'assurer que c'est un tableau
      if (!Array.isArray(data)) {
        console.warn('⚠️ Régions API: La réponse n\'est pas un tableau:', response.data);
        return [];
      }
      
      return data;
    } catch (error) {
      console.error('❌ Erreur lors de l\'extraction des régions:', error);
      if (error instanceof Error) {
        console.error('❌ Message d\'erreur:', error.message);
        console.error('❌ Stack:', error.stack);
      }
      return [];
    }
  },
};

