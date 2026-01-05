/**
 * Service API pour les secteurs
 */

import { apiClient } from '../client';
import { proxyApiClient } from '../proxy-client';
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
      const response = await proxyApiClient.get<any>(API_ENDPOINTS.SECTEURS.FOR_SITE_WEB);
      
      // La réponse a une structure imbriquée : { success: true, data: { success: true, data: Secteur[] } }
      let data: Secteur[] = [];
      
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
      
      // Filtrer uniquement les secteurs actifs avec des filières
      const activeSecteurs = data.filter(secteur => secteur.isActive && secteur.filieres && secteur.filieres.length > 0);
      
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

