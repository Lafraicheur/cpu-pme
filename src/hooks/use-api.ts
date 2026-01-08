/**
 * Hooks React Query pour les appels API
 */

import { useQuery } from '@tanstack/react-query';
import { typeMembresService, TypeMembre, Profil } from '@/lib/api/services/type-membres.service';
import { regionsService, Region } from '@/lib/api/services/regions.service';
import { secteursService, Secteur, Filiere, SousFiliere, Activite } from '@/lib/api/services/secteurs.service';
import { actualitiesService, Actuality, GetActualitiesParams } from '@/lib/api/services/actualities.service';
import { publicationsService, Publication, GetPublicationsParams } from '@/lib/api/services/publications.service';
import { abonnementsService, Abonnement } from '@/lib/api/services/abonnements.service';

/**
 * Hook pour récupérer tous les types de membres pour le site web
 */
export function useTypeMembresForSiteWeb() {
  return useQuery<TypeMembre[], Error>({
    queryKey: ['typeMembres', 'for-site-web'],
    queryFn: () => typeMembresService.getTypeMembresForSiteWeb(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

/**
 * Hook pour récupérer tous les types de membres
 */
export function useTypeMembres() {
  return useQuery<TypeMembre[], Error>({
    queryKey: ['typeMembres'],
    queryFn: () => typeMembresService.getTypeMembres(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

/**
 * Hook pour récupérer les profils d'un type de membre
 * @param typeMembreId - ID du type de membre (optionnel)
 */
export function useProfils(typeMembreId?: string) {
  return useQuery<Profil[], Error>({
    queryKey: ['profils', typeMembreId],
    queryFn: () => typeMembresService.getProfils(typeMembreId),
    enabled: !!typeMembreId, // Ne récupère que si typeMembreId est fourni
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

/**
 * Hook pour récupérer toutes les régions pour le site web
 */
export function useRegionsForSiteWeb() {
  return useQuery<Region[], Error>({
    queryKey: ['regions', 'for-site-web'],
    queryFn: () => regionsService.getRegionsForSiteWeb(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

/**
 * Hook pour récupérer tous les secteurs avec leurs filières, sous-filières et activités pour le site web
 */
export function useSecteursForSiteWeb() {
  return useQuery<Secteur[], Error>({
    queryKey: ['secteurs', 'for-site-web'],
    queryFn: () => secteursService.getSecteursForSiteWeb(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

/**
 * Hook pour récupérer toutes les actualités
 * @param params - Paramètres de filtrage optionnels (category, featuredOnly)
 */
export function useActualities(params?: GetActualitiesParams) {
  return useQuery<Actuality[], Error>({
    queryKey: ['actualities', params],
    queryFn: () => actualitiesService.getActualities(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

/**
 * Hook pour récupérer une actualité par son ID
 * @param id - ID de l'actualité
 */
export function useActuality(id: string) {
  return useQuery<Actuality | null, Error>({
    queryKey: ['actuality', id],
    queryFn: () => actualitiesService.getActualityById(id),
    enabled: !!id, // Ne récupère que si id est fourni
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

/**
 * Hook pour récupérer toutes les publications
 * @param params - Paramètres de filtrage optionnels (category, type, status)
 */
export function usePublications(params?: GetPublicationsParams) {
  return useQuery<Publication[], Error>({
    queryKey: ['publications', params],
    queryFn: () => publicationsService.getPublications(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

/**
 * Hook pour récupérer une publication par son ID
 * @param id - ID de la publication
 */
export function usePublication(id: string) {
  return useQuery<Publication | null, Error>({
    queryKey: ['publication', id],
    queryFn: () => publicationsService.getPublicationById(id),
    enabled: !!id, // Ne récupère que si id est fourni
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

/**
 * Hook pour récupérer tous les abonnements pour le site web
 */
export function useAbonnementsForSiteWeb() {
  return useQuery<Abonnement[], Error>({
    queryKey: ['abonnements', 'for-site-web'],
    queryFn: () => abonnementsService.getAllForSiteWeb(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

/**
 * Hook pour récupérer tous les abonnements
 */
export function useAbonnements() {
  return useQuery<Abonnement[], Error>({
    queryKey: ['abonnements'],
    queryFn: () => abonnementsService.getAll(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

// Export des types pour utilisation dans les composants
export type { TypeMembre, Profil, Region, Secteur, Filiere, SousFiliere, Activite, Actuality, Publication, Abonnement };

