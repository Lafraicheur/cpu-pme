"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Home,
  ChevronRight,
  ChevronsDown,
  ChevronsUp,
  Loader2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSecteursForSiteWeb } from "@/hooks/use-api";
import { Secteur, Filiere, SousFiliere, Activite } from "@/lib/api/services/secteurs.service";

// Fonction pour décoder les entités HTML
const decodeHtmlEntities = (text: string): string => {
  const textarea = typeof document !== 'undefined' ? document.createElement('textarea') : null;
  if (textarea) {
    textarea.innerHTML = text;
    return textarea.value;
  }
  // Fallback pour SSR
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
};

// Fonction pour obtenir l'icône par nom de filière
const getFiliereIcon = (filiereNom: string): string => {
  const cleanName = decodeHtmlEntities(filiereNom).toLowerCase();
  
  // Agriculture & Primaire
  if (cleanName.includes('agriculture') || cleanName.includes('végétal')) return '🌾';
  if (cleanName.includes('élevage') || cleanName.includes('animal')) return '🐄';
  if (cleanName.includes('pêche') || cleanName.includes('aquaculture')) return '🐟';
  if (cleanName.includes('agritech') || cleanName.includes('intrant')) return '🚜';
  if (cleanName.includes('agro') || cleanName.includes('agroalimentaire')) return '🍽️';
  
  // Industrie & Secondaire
  if (cleanName.includes('industrie') || cleanName.includes('transformation')) return '🏭';
  if (cleanName.includes('artisanat')) return '🔨';
  if (cleanName.includes('btp') || cleanName.includes('construction') || cleanName.includes('immobilier')) return '🏗️';
  if (cleanName.includes('énergie')) return '⚡';
  if (cleanName.includes('environnement') || cleanName.includes('économie circulaire')) return '♻️';
  if (cleanName.includes('mine') || cleanName.includes('carrière')) return '⛏️';
  
  // Services & Tertiaire
  if (cleanName.includes('commerce') || cleanName.includes('distribution')) return '🛒';
  if (cleanName.includes('transport') || cleanName.includes('logistique')) return '🚚';
  if (cleanName.includes('tourisme') || cleanName.includes('hôtel') || cleanName.includes('loisir')) return '🏨';
  if (cleanName.includes('finance') || cleanName.includes('assurance') || cleanName.includes('banque')) return '💰';
  if (cleanName.includes('numérique') || cleanName.includes('technologie') || cleanName.includes('digital')) return '💻';
  if (cleanName.includes('éducation') || cleanName.includes('formation')) return '📚';
  if (cleanName.includes('santé') || cleanName.includes('médical')) return '🏥';
  if (cleanName.includes('service')) return '💼';
  
  // Quaternaire & Transversales
  if (cleanName.includes('recherche') || cleanName.includes('ingénierie')) return '🔬';
  if (cleanName.includes('financement') || cleanName.includes('crédit')) return '💳';
  if (cleanName.includes('export') || cleanName.includes('international')) return '🌍';
  if (cleanName.includes('innovation') || cleanName.includes('incubation')) return '💡';
  if (cleanName.includes('durable') || cleanName.includes('rse')) return '🌱';
  
  // Icône par défaut
  return '🏢';
};

const SecteursContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: secteursAPI = [], isLoading, error } = useSecteursForSiteWeb();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isCompactMode, setIsCompactMode] = useState(false);
  const [selectedFilieres, setSelectedFilieres] = useState<Set<string>>(new Set());
  const [selectedSousFiliere, setSelectedSousFiliere] = useState<Set<string>>(new Set());
  const [selectedActivites, setSelectedActivites] = useState<Set<string>>(new Set());
  const [activeSecteurId, setActiveSecteurId] = useState<string | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<{
    secteur?: string;
    filiere?: string;
  }>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    try {
      const saved = localStorage.getItem("secteursSelectionsAPI");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.filieres) setSelectedFilieres(new Set(parsed.filieres));
        if (parsed.sousFiliere) setSelectedSousFiliere(new Set(parsed.sousFiliere));
        if (parsed.activites) setSelectedActivites(new Set(parsed.activites));
      }
    } catch (e) {
      console.error("Error loading saved selections:", e);
    }
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      if (selectedFilieres.size > 0 || selectedSousFiliere.size > 0 || selectedActivites.size > 0) {
        localStorage.setItem(
          "secteursSelectionsAPI",
          JSON.stringify({
            filieres: Array.from(selectedFilieres),
            sousFiliere: Array.from(selectedSousFiliere),
            activites: Array.from(selectedActivites),
          })
        );
      } else {
        // Supprimer du localStorage quand tout est vide
        localStorage.removeItem("secteursSelectionsAPI");
      }
    } catch (e) {
      console.error("Error saving selections:", e);
    }
  }, [selectedFilieres, selectedSousFiliere, selectedActivites, isMounted]);

  // Initialiser le premier secteur actif
  useEffect(() => {
    if (secteursAPI.length > 0 && !activeSecteurId) {
      setActiveSecteurId(secteursAPI[0].id);
    }
  }, [secteursAPI, activeSecteurId]);

  const activeSecteur = activeSecteurId ? secteursAPI.find(s => s.id === activeSecteurId) : null;

  // Fonction pour trier les secteurs dans l'ordre spécifique
  const getSortedSecteurs = () => {
    const order = ['primaire', 'secondaire', 'tertiaire', 'quaternaire', 'transversal'];
    return [...secteursAPI].sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      
      const aIndex = order.findIndex(o => aName.includes(o));
      const bIndex = order.findIndex(o => bName.includes(o));
      
      // Si les deux secteurs sont dans l'ordre défini, les trier selon cet ordre
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }
      // Si un seul secteur est dans l'ordre, le mettre en premier
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      // Si aucun des deux n'est dans l'ordre, garder l'ordre original (alphabétique)
      return a.name.localeCompare(b.name);
    });
  };

  const sortedSecteurs = getSortedSecteurs();

  // Définir le secteur primaire comme actif par défaut
  useEffect(() => {
    if (!activeSecteurId && sortedSecteurs.length > 0) {
      setActiveSecteurId(sortedSecteurs[0].id);
    }
  }, [activeSecteurId, sortedSecteurs]);

  const matchesSearch = (text: string): boolean => {
    if (!searchTerm) return true;
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const toggleFiliere = (filiereId: string) => {
    setSelectedFilieres((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(filiereId)) {
        newSet.delete(filiereId);
      } else {
        newSet.add(filiereId);
      }
      return newSet;
    });
  };

  const toggleSousFiliere = (sousFiliereId: string) => {
    const secteur = secteursAPI.find(s => s.filieres.some(f => f.sousFiliere.some(sf => sf.id === sousFiliereId)));
    if (!secteur) return;
    
    const filiere = secteur.filieres.find(f => f.sousFiliere.some(sf => sf.id === sousFiliereId));
    if (!filiere) return;
    
    const sousFiliere = filiere.sousFiliere.find(sf => sf.id === sousFiliereId);
    if (!sousFiliere) return;

    setSelectedSousFiliere((prev) => {
      const newSet = new Set(prev);
      const isCurrentlySelected = newSet.has(sousFiliereId);
      
      if (isCurrentlySelected) {
        // Décocher la sous-filière et toutes ses activités
        newSet.delete(sousFiliereId);
        setSelectedActivites((prevActivites) => {
          const newActivites = new Set(prevActivites);
          sousFiliere.activites?.forEach((act) => newActivites.delete(act.id));
          return newActivites;
        });
      } else {
        // Cocher la sous-filière et toutes ses activités
        newSet.add(sousFiliereId);
        setSelectedActivites((prevActivites) => {
          const newActivites = new Set(prevActivites);
          sousFiliere.activites?.forEach((act) => newActivites.add(act.id));
          return newActivites;
        });
      }
      return newSet;
    });
  };

  const toggleActivite = (activiteId: string) => {
    // Trouver la sous-filière contenant cette activité
    let parentSousFiliere: SousFiliere | null = null;
    let parentSousFiliereId: string | null = null;
    
    for (const secteur of secteursAPI) {
      for (const filiere of secteur.filieres) {
        for (const sf of filiere.sousFiliere) {
          if (sf.activites?.some(act => act.id === activiteId)) {
            parentSousFiliere = sf;
            parentSousFiliereId = sf.id;
            break;
          }
        }
        if (parentSousFiliere) break;
      }
      if (parentSousFiliere) break;
    }

    setSelectedActivites((prev) => {
      const next = new Set(prev);
      const isCurrentlySelected = next.has(activiteId);
      
      if (isCurrentlySelected) {
        next.delete(activiteId);
        // Si on décoche une activité, décocher aussi la sous-filière parente
        if (parentSousFiliereId) {
          setSelectedSousFiliere(prevSF => {
            const newSF = new Set(prevSF);
            newSF.delete(parentSousFiliereId!);
            return newSF;
          });
        }
      } else {
        next.add(activiteId);
        // Si toutes les activités de la sous-filière sont maintenant cochées, cocher la sous-filière
        if (parentSousFiliere && parentSousFiliereId) {
          const allActivitesSelected = parentSousFiliere.activites?.every(act => 
            next.has(act.id) || act.id === activiteId
          );
          if (allActivitesSelected) {
            setSelectedSousFiliere(prevSF => {
              const newSF = new Set(prevSF);
              newSF.add(parentSousFiliereId!);
              return newSF;
            });
          }
        }
      }
      return next;
    });
  };

  const clearAllSelections = () => {
    setSelectedFilieres(new Set());
    setSelectedSousFiliere(new Set());
    setSelectedActivites(new Set());
  };

  const buildMembresUrl = (): string => {
    const params = new URLSearchParams();
    
    // Récupérer les noms des activités sélectionnées
    const selectedActiviteNames: string[] = [];
    const selectedSubsectorNames: string[] = [];
    const selectedSecteurNames = new Set<string>();
    
    secteursAPI.forEach((secteur) => {
      secteur.filieres.forEach((filiere) => {
        filiere.sousFiliere.forEach((sf) => {
          // Si la sous-filière est sélectionnée
          if (selectedSousFiliere.has(sf.id)) {
            selectedSubsectorNames.push(sf.name);
            selectedSecteurNames.add(secteur.name);
          }
          
          // Récupérer les activités sélectionnées
          sf.activites?.forEach((act) => {
            if (selectedActivites.has(act.id)) {
              selectedActiviteNames.push(act.name);
              selectedSecteurNames.add(secteur.name);
            }
          });
        });
      });
    });
    
    // Ajouter les paramètres à l'URL
    if (selectedSecteurNames.size > 0) {
      params.set("sector", Array.from(selectedSecteurNames).join(","));
    }
    
    if (selectedSubsectorNames.length > 0) {
      params.set("subsector", selectedSubsectorNames.join(","));
    }
    
    if (selectedActiviteNames.length > 0) {
      params.set("activites", selectedActiviteNames.join(","));
    }
    
    return `/membres?${params.toString()}`;
  };

  const hasSelection = selectedFilieres.size > 0 || selectedSousFiliere.size > 0 || selectedActivites.size > 0;

  // Compter sélections pour le secteur actif (uniquement les activités)
  const getSelectionCountForSecteur = (secteurId: string): number => {
    let count = 0;
    const secteur = secteursAPI.find((s) => s.id === secteurId);
    if (!secteur) return 0;

    secteur.filieres.forEach((filiere) => {
      filiere.sousFiliere.forEach((sf) => {
        sf.activites?.forEach((act) => {
          if (selectedActivites.has(act.id)) count++;
        });
      });
    });
    return count;
  };

  const getSelectionPercentageForSecteur = (secteurId: string): number => {
    const secteur = secteursAPI.find((s) => s.id === secteurId);
    if (!secteur) return 0;
    let total = 0;
    let selected = 0;

    secteur.filieres.forEach((filiere) => {
      if (selectedFilieres.has(filiere.id)) {
        selected++;
      }
      filiere.sousFiliere.forEach((sf) => {
        total += (sf.activites?.length || 0) + 1; // sous-filiere + ses activités
        if (selectedSousFiliere.has(sf.id)) selected++;
        sf.activites?.forEach((act) => {
          total++;
          if (selectedActivites.has(act.id)) selected++;
        });
      });
    });

    return total > 0 ? Math.round((selected / total) * 100) : 0;
  };

  const countActivitesForFiliere = (filiere: Filiere): number => {
    return filiere.sousFiliere.reduce((sum, sf) => sum + (sf.activites?.length || 0), 0);
  };

  const countSelectedActivitesForFiliere = (filiere: Filiere): number => {
    return filiere.sousFiliere.reduce((sum, sf) => {
      const list = sf.activites || [];
      return sum + list.reduce((acc, act) => acc + (selectedActivites.has(act.id) ? 1 : 0), 0);
    }, 0);
  };

  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-cpu-orange" />
      </div>
    );
  }

  if (error || secteursAPI.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-gray-600">Aucun secteur disponible</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-64 sm:h-72 md:h-80 lg:h-200 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a]">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/logo.png"
            alt="CPU-PME"
            className="w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 tracking-tight">
            Secteurs & Filières
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-2xl mx-auto text-white/80 font-light px-4">
            Classification sectorielle des PME en Côte d'Ivoire
          </p>
        </div>
      </section>



      {/* Bannière du Secteur Actif */}
      {activeSecteur && (
        <section className="bg-gradient-to-br from-gray-50 to-white py-4 sm:py-6 border-b border-gray-200">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-r from-[#F27A20] via-[#E8862D] to-[#009739] py-4 sm:py-5 px-4 sm:px-6 rounded-xl sm:rounded-2xl shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-3">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center sm:text-left tracking-wide">
                  {decodeHtmlEntities(activeSecteur.name)}
                </h2>
                {activeSecteur.description && (
                  <>
                    <span className="hidden sm:inline text-white/80 text-2xl font-light">:</span>
                    <p className="text-sm sm:text-base md:text-lg text-white/90 text-center sm:text-left font-medium">
                      {decodeHtmlEntities(activeSecteur.description)}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Barre de recherche et contrôles */}
      <section className="bg-white border-b border-gray-200 py-3 sm:py-5 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center justify-between">
            <div className="relative flex-1 w-full md:max-w-lg">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 sm:pl-11 h-10 sm:h-11 text-sm sm:text-base border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-cpu-orange/20 transition-all w-full"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCompactMode(!isCompactMode)}
                className="border-gray-300 rounded-xl hover:bg-gray-50 transition-all h-9 sm:h-11 px-3 sm:px-4 text-xs sm:text-sm flex-shrink-0"
                title={isCompactMode ? "Mode étendu" : "Mode compact"}
              >
                {isCompactMode ? (
                  <ChevronsUp className="h-3.5 sm:h-4 w-3.5 sm:w-4 sm:mr-2" />
                ) : (
                  <ChevronsDown className="h-3.5 sm:h-4 w-3.5 sm:w-4 sm:mr-2" />
                )}
                <span className="hidden md:inline text-xs font-medium">
                  {isCompactMode ? "Étendre" : "Compacter"}
                </span>
              </Button>

              {hasSelection && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllSelections}
                  className="border-red-300 text-red-600 hover:bg-red-50 rounded-xl transition-all h-9 sm:h-11 px-3 sm:px-4 text-xs sm:text-sm flex-shrink-0"
                  title="Tout désélectionner"
                >
                  <span className="text-xs font-medium">Désélectionner</span>
                </Button>
              )}

              {hasSelection && activeSecteurId && (
                <div className="flex items-center gap-2 sm:gap-3 bg-orange-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-2 min-w-[80px] sm:min-w-[120px]">
                    <Progress
                      value={getSelectionPercentageForSecteur(activeSecteurId)}
                      className="h-1.5 sm:h-2 flex-1"
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-cpu-orange font-bold whitespace-nowrap">
                    {getSelectionPercentageForSecteur(activeSecteurId)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      {breadcrumb.secteur && (
        <section className="bg-white border-b border-gray-200 py-3">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/secteurs" className="hover:text-cpu-orange transition-colors">
                <Home className="h-4 w-4" />
              </Link>
              {breadcrumb.secteur && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-[#221F1F] font-medium">{decodeHtmlEntities(breadcrumb.secteur)}</span>
                </>
              )}
              {breadcrumb.filiere && (
                <>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-[#221F1F] font-medium">{decodeHtmlEntities(breadcrumb.filiere)}</span>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CONTENU PRINCIPAL AVEC TABS */}
      <section className="py-10 sm:py-14 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <Tabs
            value={activeSecteurId || ""}
            onValueChange={(value) => {
              setActiveSecteurId(value);
              setBreadcrumb({ secteur: secteursAPI.find(s => s.id === value)?.name });
            }}
            className="w-full"
          >
            {/* Navigation par Onglets */}
            <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
              <div className="w-full max-w-lg sm:max-w-none sm:w-auto">
                <TabsList className="!grid grid-cols-2 gap-2 p-2 bg-white rounded-xl border border-gray-200 shadow-lg h-auto w-full sm:!inline-flex sm:items-center sm:justify-center sm:gap-3 md:gap-4 lg:gap-5 sm:px-3 md:px-5 lg:px-6 sm:py-2.5 sm:rounded-2xl sm:w-auto">
                  {sortedSecteurs.map((secteur, index) => (
                    <TabsTrigger
                      key={secteur.id}
                      value={secteur.id}
                      className={`flex items-center justify-center px-2 sm:px-4 md:px-5 lg:px-7 py-3 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-inter text-[11px] sm:text-xs md:text-sm font-semibold transition-all duration-200 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cpu-orange data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 hover:bg-gray-50 hover:text-gray-800 whitespace-normal sm:whitespace-nowrap text-center leading-tight ${
                        sortedSecteurs.length === 5 && index === 4 ? 'col-span-2' : ''
                      }`}
                    >
                      {decodeHtmlEntities(secteur.name)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>

            {/* Contenu des onglets */}
            {sortedSecteurs.map((secteur) => (
              <TabsContent key={secteur.id} value={secteur.id}>
                {/* Compteur sélections */}
                {getSelectionCountForSecteur(secteur.id) > 0 && (
                  <div className="mb-4 sm:mb-6 py-2.5 sm:py-3 px-4 sm:px-5 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg sm:rounded-xl border border-orange-200 shadow-sm">
                    <p className="text-xs sm:text-sm font-semibold text-[#221F1F] flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 bg-cpu-orange text-white rounded-full text-[10px] sm:text-xs font-bold flex-shrink-0">
                        {getSelectionCountForSecteur(secteur.id)}
                      </span>
                      <span className="text-xs sm:text-sm">
                        élément{getSelectionCountForSecteur(secteur.id) > 1 ? "s" : ""} sélectionné
                        {getSelectionCountForSecteur(secteur.id) > 1 ? "s" : ""} dans ce secteur
                      </span>
                    </p>
                  </div>
                )}

                {/* Filières */}
                <div className="space-y-5">
                  {secteur.filieres
                    .filter((filiere) =>
                      !searchTerm ||
                      matchesSearch(filiere.name) ||
                      filiere.sousFiliere.some((sf) => matchesSearch(sf.name))
                    )
                    .map((filiere) => (
                      <div
                        key={filiere.id}
                        className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                      >
                        {/* En-tête Filière (pas d'accordion) */}
                        <div className="bg-gradient-to-r from-gray-50 to-white py-3 sm:py-4 px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 border-b border-gray-200">
                          <h3 className="text-base sm:text-lg font-bold text-[#221F1F] flex items-center gap-2 sm:gap-3">
                            <span className="text-xl sm:text-2xl flex-shrink-0">{getFiliereIcon(filiere.name)}</span>
                            <span className="break-words">{decodeHtmlEntities(filiere.name)}</span>
                          </h3>
                          <div className="text-[10px] sm:text-xs font-bold text-cpu-orange bg-orange-50 border border-orange-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 whitespace-nowrap flex-shrink-0">
                            {countSelectedActivitesForFiliere(filiere)} / {countActivitesForFiliere(filiere)} tags
                          </div>
                        </div>

                        {/* Accordion pour Sous-Filières */}
                        <Accordion
                          key={`${filiere.id}-${isCompactMode ? 'multiple' : 'single'}`}
                          type={isCompactMode ? "multiple" : "single"}
                          collapsible
                          className="w-full"
                        >
                          {filiere.sousFiliere
                            .filter((sf) => !searchTerm || matchesSearch(sf.name))
                            .map((sousFiliere, index) => (
                              <AccordionItem
                                key={sousFiliere.id}
                                value={sousFiliere.id}
                                className={`border-b border-gray-200 ${index === filiere.sousFiliere.length - 1 ? "border-b-0" : ""}`}
                              >
                                {/* Trigger Sous-Filière */}
                                <AccordionTrigger className="text-left px-6 py-4 hover:no-underline hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-transparent transition-all">
                                  <div className="flex items-center gap-3 flex-1">
                                    <span className="font-semibold text-[#221F1F] text-base">
                                      {decodeHtmlEntities(sousFiliere.name)}
                                    </span>
                                  </div>
                                </AccordionTrigger>

                                {/* Contenu - Section avec checkbox + Activités */}
                                <AccordionContent className="px-6 pt-3 pb-5 bg-gradient-to-b from-gray-50/50 to-white">
                                  {(() => {
                                    // Vérifier si au moins une activité est sélectionnée dans cette sous-filière
                                    const hasSelectedActivite = sousFiliere.activites?.some(act => selectedActivites.has(act.id)) || false;
                                    const isBarOrange = selectedSousFiliere.has(sousFiliere.id) || hasSelectedActivite;
                                    
                                    return (
                                      <>
                                        {/* Section header avec checkbox et barre orange */}
                                        <div className="flex items-center gap-3 mb-3">
                                          <div className={`h-6 w-1 flex-shrink-0 rounded-full ${
                                            isBarOrange 
                                              ? "bg-gradient-to-b from-cpu-orange to-orange-600" 
                                              : "bg-gray-300"
                                          }`}></div>
                                          <Checkbox
                                            checked={selectedSousFiliere.has(sousFiliere.id)}
                                            onCheckedChange={() => toggleSousFiliere(sousFiliere.id)}
                                            onClick={(e) => e.stopPropagation()}
                                            className="h-5 w-5 rounded-none border-2 border-gray-300 data-[state=checked]:bg-cpu-orange data-[state=checked]:border-cpu-orange transition-all shadow-sm flex-shrink-0"
                                          />
                                          <Link
                                            href={`/membres?sector=${encodeURIComponent(secteur.name)}&subsector=${encodeURIComponent(sousFiliere.name)}&filiere=${encodeURIComponent(filiere.name)}`}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setBreadcrumb({
                                                secteur: secteur.name,
                                                filiere: filiere.name,
                                              });
                                            }}
                                            className="flex-1 font-inter text-lg font-semibold text-[#221F1F] hover:text-cpu-orange transition-colors cursor-pointer"
                                          >
                                            {decodeHtmlEntities(sousFiliere.name)}
                                          </Link>
                                        </div>

                                        {/* Activités en ligne */}
                                        {sousFiliere.activites && sousFiliere.activites.length > 0 && (
                                          <div className="flex flex-wrap gap-2.5 ml-6">
                                            {sousFiliere.activites
                                              .filter((activite) => !searchTerm || matchesSearch(activite.name))
                                              .map((activite) => {
                                                const isSelected = selectedActivites.has(activite.id);
                                                return (
                                                  <div
                                                    key={activite.id}
                                                    className={`flex items-center gap-2.5 pl-4 pr-4 py-2.5 rounded-md transition-all duration-200 ${
                                                      isSelected
                                                        ? "bg-gradient-to-r from-cpu-orange/10 to-orange-50 border-l-4 border-cpu-orange shadow-sm"
                                                        : "bg-white border-l-4 border-transparent hover:border-cpu-orange/30 hover:bg-gray-50/50"
                                                    }`}
                                                  >
                                                    <Checkbox
                                                      checked={isSelected}
                                                      onCheckedChange={() => toggleActivite(activite.id)}
                                                      onClick={(e) => e.stopPropagation()}
                                                      className="h-4 w-4 rounded-none border-2 border-gray-300 data-[state=checked]:bg-cpu-orange data-[state=checked]:border-cpu-orange transition-all flex-shrink-0 shadow-sm"
                                                    />
                                                    <Link
                                                      href={`/membres?sector=${encodeURIComponent(secteur.name)}&filiere=${encodeURIComponent(filiere.name)}&subsector=${encodeURIComponent(sousFiliere.name)}&tag=${encodeURIComponent(activite.name)}`}
                                                      onClick={(e) => e.stopPropagation()}
                                                      className={`text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-200 ${
                                                        isSelected
                                                          ? "text-cpu-orange font-semibold"
                                                          : "text-[#221F1F] hover:text-cpu-orange"
                                                      }`}
                                                    >
                                                      {decodeHtmlEntities(activite.name)}
                                                    </Link>
                                                  </div>
                                                );
                                              })}
                                          </div>
                                        )}
                                      </>
                                    );
                                  })()}
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                        </Accordion>
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Section CTA */}
      <section className={`py-16 bg-gradient-to-br from-orange-50 via-white to-green-50 ${hasSelection ? "pb-28" : ""}`}>
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#221F1F] mb-4">
            Votre secteur n'est pas représenté ?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Contactez-nous pour discuter de l'intégration de votre secteur
            d'activité dans notre réseau
          </p>
          <Link href="/contact" passHref>
            <Button
              className="bg-gradient-to-r from-cpu-orange to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-base font-semibold rounded-xl"
            >
              Nous contacter
            </Button>
          </Link>
        </div>
      </section>

      {/* Bottom Action Bar */}
      {hasSelection && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 sm:border-t-4 border-cpu-orange shadow-2xl backdrop-blur-sm">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 sm:py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
                <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cpu-orange to-orange-600 text-white rounded-full font-bold text-xs sm:text-sm shadow-lg flex-shrink-0">
                  {selectedActivites.size}
                </div>
                <span className="font-semibold text-[#221F1F] text-sm sm:text-base">
                  {selectedActivites.size > 1 ? "activités sélectionnées" : "activité sélectionnée"}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={clearAllSelections}
                  className="flex-1 sm:flex-none border-red-300 text-red-600 hover:bg-red-50 px-4 sm:px-6 py-4 sm:py-6 text-xs sm:text-sm font-semibold transition-all rounded-lg sm:rounded-xl"
                >
                  Désélectionner
                </Button>
                <Link href={buildMembresUrl()} className="flex-1 sm:flex-none">
                  <Button className="w-full bg-gradient-to-r from-cpu-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 sm:px-10 py-4 sm:py-6 text-sm sm:text-base font-bold transition-all shadow-lg hover:shadow-xl rounded-lg sm:rounded-xl">
                    Voir les membres
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Secteurs = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><p>Chargement...</p></div>}>
      <SecteursContent />
    </Suspense>
  );
};

export default Secteurs;
