/**
 * Service API pour les secteurs
 */

import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';

export interface Activite {
  id: string;
  name: string;
  isActive: boolean;
}

export interface SousFiliere {
  id: string;
  name: string;
  activites: Activite[];
  isActive: boolean;
}

export interface Filiere {
  id: string;
  name: string;
  sousFiliere: SousFiliere[];
  isActive: boolean;
}

export interface Secteur {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  filieres: Filiere[];
  isActive: boolean;
}

export const secteursService = {
  /**
   * Récupère tous les secteurs avec leurs filières, sous-filières et activités pour le site web
   */
  async getSecteursForSiteWeb(): Promise<Secteur[]> {
    try {
      console.log('🔍 [DEBUG SECTEURS] Appel API:', API_ENDPOINTS.SECTEURS.FOR_SITE_WEB);
      const response = await apiClient.get<any>(API_ENDPOINTS.SECTEURS.FOR_SITE_WEB);
      console.log('📦 [DEBUG SECTEURS] Réponse brute:', response);
      console.log('📦 [DEBUG SECTEURS] response.data:', response.data);
      
      // La réponse a une structure imbriquée : { success: true, data: { success: true, data: Secteur[] } }
      let data: Secteur[] = [];
      
      const responseData = response.data;
      
      // Gérer la structure imbriquée
      if (responseData && typeof responseData === 'object') {
        if ('data' in responseData && responseData.data) {
          const innerData = responseData.data;
          if (innerData && typeof innerData === 'object' && 'data' in innerData) {
            // Structure: { success: true, data: { success: true, data: [...] } }
            console.log('🔍 [DEBUG SECTEURS] Structure doublement imbriquée détectée');
            data = Array.isArray(innerData.data) ? innerData.data : [];
          } else if (Array.isArray(innerData)) {
            // Structure: { success: true, data: [...] }
            console.log('🔍 [DEBUG SECTEURS] Structure simple détectée');
            data = innerData;
          }
        } else if (Array.isArray(responseData)) {
          // Structure directe: [...]
          console.log('🔍 [DEBUG SECTEURS] Structure directe détectée');
          data = responseData;
        }
      }
      
      console.log('✅ [DEBUG SECTEURS] Données extraites:', data);
      console.log('✅ [DEBUG SECTEURS] Nombre de secteurs:', data.length);
      
      // Filtrer uniquement les secteurs actifs avec des filières
      const activeSecteurs = data.filter(secteur => secteur.isActive && secteur.filieres && secteur.filieres.length > 0);
      console.log('✅ [DEBUG SECTEURS] Secteurs actifs avec filières:', activeSecteurs.length);
      
      // S'assurer que c'est un tableau
      if (!Array.isArray(data)) {
        console.warn('⚠️ Secteurs API: La réponse n\'est pas un tableau:', response.data);
        return [];
      }
      
      return activeSecteurs;
    } catch (error) {
      console.error('❌ Erreur lors de l\'extraction des secteurs:', error);
      if (error instanceof Error) {
        console.error('❌ Message d\'erreur:', error.message);
        console.error('❌ Stack:', error.stack);
      }
      throw error;
    }
  },
};

