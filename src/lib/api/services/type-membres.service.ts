/**
 * Service API pour les types de membres et profils
 */

import { apiClient } from '../client';
import { proxyApiClient } from '../proxy-client';
import { API_ENDPOINTS } from '../config';

export interface TypeMembre {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  profils?: Profil[];
}

export interface Profil {
  id: string;
  name: string;
  description?: string;
  type_membre_id: string;
  isActive: boolean;
}

export const typeMembresService = {
  /**
   * Récupère tous les types de membres avec leurs relations complètes pour le site web
   */
  async getTypeMembresForSiteWeb(): Promise<TypeMembre[]> {
    try {
      console.log('🔍 [DEBUG] Appel API via proxy:', API_ENDPOINTS.TYPE_MEMBRES.FOR_SITE_WEB);
      const response = await proxyApiClient.get<any>(API_ENDPOINTS.TYPE_MEMBRES.FOR_SITE_WEB);
      console.log('📦 [DEBUG] Réponse brute:', response);
      console.log('📦 [DEBUG] response.data:', response.data);
      console.log('📦 [DEBUG] Type de response.data:', typeof response.data);
      
      // La réponse a une structure imbriquée : { success: true, data: { success: true, data: TypeMembre[] } }
      // Donc les données sont dans response.data.data.data
      let data: TypeMembre[] = [];
      
      const responseData = response.data;
      
      // D'après la réponse API: { success: true, data: { success: true, data: [...] } }
      // Donc response.data = { success: true, data: { success: true, data: [...] } }
      // Et response.data.data = { success: true, data: [...] }
      // Et response.data.data.data = [...]
      
      console.log('🔍 [DEBUG] responseData:', JSON.stringify(responseData, null, 2));
      
      // Gérer la structure imbriquée
      if (responseData && typeof responseData === 'object') {
        console.log('🔍 [DEBUG] responseData est un objet, clés:', Object.keys(responseData));
        
        if ('data' in responseData && responseData.data) {
          const innerData = responseData.data;
          console.log('🔍 [DEBUG] innerData (responseData.data):', JSON.stringify(innerData, null, 2));
          console.log('🔍 [DEBUG] Type de innerData:', typeof innerData);
          console.log('🔍 [DEBUG] innerData est un tableau?', Array.isArray(innerData));
          console.log('🔍 [DEBUG] innerData a une propriété "data"?', innerData && typeof innerData === 'object' && 'data' in innerData);
          
          if (innerData && typeof innerData === 'object' && 'data' in innerData) {
            // Structure: { success: true, data: { success: true, data: [...] } }
            console.log('🔍 [DEBUG] Structure doublement imbriquée détectée');
            console.log('🔍 [DEBUG] innerData.data:', JSON.stringify(innerData.data, null, 2));
            console.log('🔍 [DEBUG] innerData.data est un tableau?', Array.isArray(innerData.data));
            data = Array.isArray(innerData.data) ? innerData.data : [];
          } else if (Array.isArray(innerData)) {
            // Structure: { success: true, data: [...] }
            console.log('🔍 [DEBUG] Structure simple détectée (data est un tableau)');
            data = innerData;
          } else {
            console.warn('⚠️ [DEBUG] Structure inattendue pour innerData:', innerData);
          }
        } else if (Array.isArray(responseData)) {
          // Structure directe: [...]
          console.log('🔍 [DEBUG] Structure directe détectée (responseData est un tableau)');
          data = responseData;
        } else {
          console.warn('⚠️ [DEBUG] Structure inattendue pour responseData:', responseData);
        }
      }
      
      console.log('✅ [DEBUG] Données extraites:', data);
      console.log('✅ [DEBUG] Nombre de types de membres:', data.length);
      
      // S'assurer que c'est un tableau
      if (!Array.isArray(data)) {
        console.warn('⚠️ Type Membres API: La réponse n\'est pas un tableau:', response.data);
        return [];
      }
      
      return data;
    } catch (error) {
      console.error('❌ Erreur lors de l\'extraction des types de membres:', error);
      if (error instanceof Error) {
        console.error('❌ Message d\'erreur:', error.message);
        console.error('❌ Stack:', error.stack);
      }
      return [];
    }
  },

  /**
   * Récupère tous les types de membres
   */
  async getTypeMembres(): Promise<TypeMembre[]> {
    const response = await apiClient.get<TypeMembre[]>(API_ENDPOINTS.TYPE_MEMBRES.LIST);
    return response.data;
  },

  /**
   * Récupère un type de membre par son ID
   */
  async getTypeMembreById(id: string): Promise<TypeMembre> {
    const response = await apiClient.get<TypeMembre>(API_ENDPOINTS.TYPE_MEMBRES.GET(id));
    return response.data;
  },

  /**
   * Récupère tous les profils
   * @param typeMembreId - ID du type de membre pour filtrer les profils (optionnel)
   */
  async getProfils(typeMembreId?: string): Promise<Profil[]> {
    const endpoint = typeMembreId 
      ? `${API_ENDPOINTS.PROFILS.LIST}?type_membre_id=${typeMembreId}` 
      : API_ENDPOINTS.PROFILS.LIST;
    const response = await apiClient.get<any>(endpoint);
    const responseData = response.data;
    
    // Gérer la structure de réponse (peut être imbriquée ou directe)
    let data: Profil[] = [];
    
    try {
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
      
      return data;
    } catch (error) {
      console.error('❌ Erreur lors de l\'extraction des profils:', error);
      return [];
    }
  },

  /**
   * Récupère un profil par son ID
   */
  async getProfilById(id: string): Promise<Profil> {
    const response = await apiClient.get<Profil>(API_ENDPOINTS.PROFILS.GET(id));
    return response.data;
  },
};

