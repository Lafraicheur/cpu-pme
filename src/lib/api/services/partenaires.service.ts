/**
 * Service API pour les partenaires
 */

import { proxyApiClient } from '../proxy-client';
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
  couleurHeader: string | null;
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

      // Corriger les URLs des logos localhost
      const fixedData = data.map(partenaire => ({
        ...partenaire,
        logo: fixImageUrl(partenaire.logo) || partenaire.logo,
      }));

      return fixedData;
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
