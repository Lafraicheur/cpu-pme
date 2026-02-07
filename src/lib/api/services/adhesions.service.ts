import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { proxyApiClient } from '../proxy-client';

export interface CreateAdhesionDto {
  name: string;
  email: string;
  phone: string;
  typeMembreId: string;
  position?: string;
  message?: string;
  profilId?: string;
  abonnementId?: string;
  secteurPrincipalId?: string;
  filiereId?: string;
  sousFiliereId?: string;
  activitesIds?: string[];
  secteursInterventionIds?: string[];
  siegeRegionId?: string;
  siegeCommuneId?: string;
  siegeVille?: string;
  siegeVillage?: string;
  siegeQuartierId?: string;
  regionsInterventionIds?: string[];
  interventionScope?: string;
  centresInteretIds?: string[];
  filieresPrioritairesIds?: string[];
  hasBureauCI?: boolean;
  hasAffiliation?: boolean;
  organisationType?: string;
  organisationName?: string;
  customOrganisationName?: string;
  isCompetitionSubcontractor?: boolean;
  hasFinancingProject?: boolean;
  nombre_employee?: string;
  website?: string;
  internationalAddress?: string;
  internationalCity?: string;
  internationalCountry?: string;
}

export interface AdhesionForSiteWeb {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  position?: string;
  message?: string;
  hasAffiliation?: boolean;
  statut?: string;
  status?: string;
  organisationType?: string;
  organisationName?: string;
  customOrganisationName?: string;
  typeMembre?: {
    name?: string;
  };
  profil?: {
    name?: string;
  };
  secteurPrincipal?: {
    id?: string;
    name?: string;
  };
  filiereId?: string;
  sousFiliereId?: string;
  activitesIds?: string[];
  siegeRegion?: {
    id?: string;
    name?: string;
  };
  siegeCommune?: {
    id?: string;
    name?: string;
  };
  siegeVille?: string;
  siegeVillage?: string;
  interventionScope?: string;
  abonnement?: {
    id?: string;
    plan?: string;
    libelle?: string;
  };
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
  approved_at?: string;
  approvedAt?: string;
  validated_at?: string;
  validatedAt?: string;
}

export interface GetAdhesionsForSiteWebParams {
  page?: number;
  limit?: number;
  search?: string;
  statut?: string;
  typeMembreId?: string;
  secteurPrincipalId?: string;
  siegeRegionId?: string;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

const buildQuery = (params?: GetAdhesionsForSiteWebParams) => {
  if (!params) return '';
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    searchParams.set(key, String(value));
  });
  const query = searchParams.toString();
  return query ? `?${query}` : '';
};

export const adhesionsService = {
  create: async (data: CreateAdhesionDto) => {
    const response = await apiClient.post<any>('/adhesions', data);
    return response.data;
  },
  getForSiteWeb: async (
    params?: GetAdhesionsForSiteWebParams
  ): Promise<AdhesionForSiteWeb[]> => {
    const endpoint = `${API_ENDPOINTS.ADHESIONS.FOR_SITE_WEB}${buildQuery(params)}`;
    const response = await proxyApiClient.get<any>(endpoint);
    const responseData = response.data;

    let data: AdhesionForSiteWeb[] = [];
    if (responseData && typeof responseData === 'object') {
      if ('data' in responseData && responseData.data) {
        const innerData = responseData.data;
        if (innerData && typeof innerData === 'object' && 'data' in innerData) {
          const nestedData = innerData.data;
          if (nestedData && typeof nestedData === 'object' && 'data' in nestedData) {
            data = Array.isArray((nestedData as any).data)
              ? (nestedData as any).data
              : [];
          } else {
            data = Array.isArray(nestedData) ? nestedData : [];
          }
        } else if (Array.isArray(innerData)) {
          data = innerData;
        }
      } else if (Array.isArray(responseData)) {
        data = responseData;
      }
    }

    return Array.isArray(data) ? data : [];
  },
};

