import { proxyApiClient } from '../proxy-client';

export interface Avantage {
  id: string;
  libelle: string;
  description: string;
  icone: string;
  actif: boolean;
}

export interface Limites {
  nombreProjets: number;
  nombreFormations: number;
  espaceStockage: number;
  supportPrioritaire: boolean;
  accesModules: string[];
}

export interface Abonnement {
  id: string;
  typeMembreId: string;
  plan: string;
  libelle: string;
  description?: string;
  tarifMensuel: string;
  tarifAnnuel: string;
  surDevis: boolean;
  tarifMinAnnuel?: string;
  avantages?: Avantage[];
  limites?: Limites;
  ordre: number;
  isActive: boolean;
  popular?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  typeMembre?: {
    id: string;
    name: string;
    description?: string;
    isActive?: boolean;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
  };
}

export const abonnementsService = {
  // Récupérer tous les abonnements pour le site web
  getAllForSiteWeb: async (): Promise<Abonnement[]> => {
    const response = await proxyApiClient.get<any>('/abonnements/for-site-web');
    // L'API retourne { success: true, data: { success: true, data: [...] } }
    if (response.data?.data?.data && Array.isArray(response.data.data.data)) {
      return response.data.data.data;
    }
    return [];
  },

  // Récupérer tous les abonnements
  getAll: async (): Promise<Abonnement[]> => {
    const response = await proxyApiClient.get<any>('/abonnements');
    if (response.data?.data?.data && Array.isArray(response.data.data.data)) {
      return response.data.data.data;
    }
    return [];
  },

  // Récupérer un abonnement par ID
  getById: async (id: string): Promise<Abonnement> => {
    const response = await proxyApiClient.get<Abonnement>(`/abonnements/${id}`);
    return response.data;
  },
};
