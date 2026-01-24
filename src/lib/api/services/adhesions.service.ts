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
}

export const adhesionsService = {
  create: async (data: CreateAdhesionDto) => {
    const response = await proxyApiClient.post<any>('/adhesions', data);
    return response.data;
  },
};

