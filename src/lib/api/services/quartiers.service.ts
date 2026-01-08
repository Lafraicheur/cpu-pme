import { proxyApiClient } from '../proxy-client';

export interface Quartier {
  id: string;
  commune_id: string;
  name: string;
  type: 'quartier' | 'village';
  isActive: boolean;
  commune?: {
    id: string;
    name: string;
  };
}

export interface CreateQuartierDto {
  commune_id: string;
  name: string;
  type?: 'quartier' | 'village';
  isActive?: boolean;
}

export const quartiersService = {
  // Récupérer tous les quartiers
  getAll: async (): Promise<Quartier[]> => {
    const response = await proxyApiClient.get<{ data: Quartier[] }>('/quartiers');
    if (response.data?.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return [];
  },

  // Récupérer un quartier par ID
  getById: async (id: string): Promise<Quartier | null> => {
    const response = await proxyApiClient.get<Quartier>(`/quartiers/${id}`);
    return response.data || null;
  },

  // Créer un nouveau quartier
  create: async (data: CreateQuartierDto): Promise<Quartier> => {
    const response = await proxyApiClient.post<Quartier>('/quartiers', data);
    return response.data;
  },

  // Mettre à jour un quartier
  update: async (id: string, data: Partial<CreateQuartierDto>): Promise<Quartier> => {
    const response = await proxyApiClient.patch<Quartier>(`/quartiers/${id}`, data);
    return response.data;
  },

  // Supprimer un quartier
  delete: async (id: string): Promise<void> => {
    await proxyApiClient.delete(`/quartiers/${id}`);
  },
};
