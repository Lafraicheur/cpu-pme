// app/secteur/page.tsx

"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// =========================================================
// 1. IMPORTATION DES DONNÉES ET DÉFINITION DES TYPES MIS À JOUR
// =========================================================
import { secteursData } from './data';
import { createSubSectorId, getMemberSectorFromSubSector } from './sectorMapping'; 

// Les types doivent correspondre à ceux définis dans data.ts
interface TagSection {
  titre: string; 
  tags: string[];
}
interface SousCategorieDetail {
    nom: string;
    sectionsDeTags: TagSection[];
}
interface Filiere {
    id: string;
    nom: string;
    sousCategories: SousCategorieDetail[];
}
interface SecteurData {
    id: 'primaire' | 'secondaire' | 'tertiaire' | 'quaternaire';
    nom: string;
    titreComplet: string;
    filieres: Filiere[];
}

type SecteurKey = keyof typeof secteursData;

const SecteursContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeSecteur, setActiveSecteur] = useState<SecteurKey>("primaire");
  const [selectedSubSectors, setSelectedSubSectors] = useState<Set<string>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  // Récupérer le paramètre d'URL au chargement
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['primaire', 'secondaire', 'tertiaire', 'quaternaire'].includes(tabParam)) {
      setActiveSecteur(tabParam as SecteurKey);
    }
  }, [searchParams]);

  const secteurActif: SecteurData = secteursData[activeSecteur];

  // Vérifier si au moins un élément est sélectionné
  const hasSelection = selectedSubSectors.size > 0 || selectedTags.size > 0;

  // Fonction pour construire l'URL vers la page membres avec les sélections
  const buildMembersUrl = (): string => {
    const params = new URLSearchParams();
    
    // Récupérer tous les secteurs membres uniques des sélections
    const memberSectors = new Set<string>();
    
    // Parcourir tous les secteurs pour trouver les correspondances
    Object.keys(secteursData).forEach(secteurKey => {
      const secteur = secteursData[secteurKey as SecteurKey];
      secteur.filieres.forEach(filiere => {
        filiere.sousCategories.forEach(sousCat => {
          sousCat.sectionsDeTags.forEach(section => {
            const subSectorId = createSubSectorId(secteurKey, filiere.id, sousCat.nom, section.titre);
            
            // Si la section est sélectionnée
            if (selectedSubSectors.has(subSectorId)) {
              const memberSector = getMemberSectorFromSubSector(filiere.nom, sousCat.nom, section.titre);
              if (memberSector) {
                memberSectors.add(memberSector);
              }
            }
            
            // Si des tags de cette section sont sélectionnés
            section.tags.forEach(tag => {
              const tagId = createTagId(secteurKey, filiere.id, sousCat.nom, section.titre, tag);
              if (selectedTags.has(tagId)) {
                const memberSector = getMemberSectorFromSubSector(filiere.nom, sousCat.nom, section.titre);
                if (memberSector) {
                  memberSectors.add(memberSector);
                }
              }
            });
          });
        });
      });
    });
    
    // Si on a un seul secteur, l'utiliser directement
    if (memberSectors.size === 1) {
      params.set('sector', Array.from(memberSectors)[0]);
    } else if (memberSectors.size > 1) {
      // Si plusieurs secteurs, utiliser le premier ou créer un filtre multiple
      params.set('sector', Array.from(memberSectors)[0]);
    }
    
    // Ajouter les sous-secteurs sélectionnés
    if (selectedSubSectors.size > 0) {
      params.set('subsectors', Array.from(selectedSubSectors).join(','));
    }
    
    // Ajouter les tags sélectionnés
    if (selectedTags.size > 0) {
      params.set('tags', Array.from(selectedTags).join(','));
    }
    
    return `/membres?${params.toString()}`;
  };

  // Fonction pour créer un ID unique pour un tag
  const createTagId = (secteurKey: string, filiereId: string, sousCatNom: string, sectionTitre: string, tag: string): string => {
    return `${secteurKey}--${filiereId}--${sousCatNom}--${sectionTitre}--${tag}`.toLowerCase().replace(/\s+/g, '-');
  };

  // Fonction pour gérer la sélection d'un sous-secteur (section) avec sélection en cascade
  const toggleSubSector = (
    subSectorId: string, 
    secteurKey: string, 
    filiereId: string, 
    sousCatNom: string, 
    sectionTitre: string, 
    tags: string[]
  ) => {
    setSelectedSubSectors(prev => {
      const newSet = new Set(prev);
      const isCurrentlySelected = newSet.has(subSectorId);
      
      if (isCurrentlySelected) {
        // Décocher la section et tous ses tags
        newSet.delete(subSectorId);
        setSelectedTags(prevTags => {
          const newTags = new Set(prevTags);
          tags.forEach(tag => {
            const tagId = createTagId(secteurKey, filiereId, sousCatNom, sectionTitre, tag);
            newTags.delete(tagId);
          });
          return newTags;
        });
      } else {
        // Cocher la section et tous ses tags
        newSet.add(subSectorId);
        setSelectedTags(prevTags => {
          const newTags = new Set(prevTags);
          tags.forEach(tag => {
            const tagId = createTagId(secteurKey, filiereId, sousCatNom, sectionTitre, tag);
            newTags.add(tagId);
          });
          return newTags;
        });
      }
      return newSet;
    });
  };

  // Fonction pour gérer la sélection d'un tag individuel
  const toggleTag = (
    tagId: string,
    subSectorId: string,
    secteurKey: string,
    filiereId: string,
    sousCatNom: string,
    sectionTitre: string,
    tags: string[]
  ) => {
    setSelectedTags(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tagId)) {
        newSet.delete(tagId);
        // Si on décoche un tag, vérifier si tous les tags sont décochés pour décocher la section
        const allTagsSelected = tags.every(tag => {
          const tId = createTagId(secteurKey, filiereId, sousCatNom, sectionTitre, tag);
          return newSet.has(tId) || tId === tagId; // Exclure le tag qu'on vient de décocher
        });
        if (!allTagsSelected) {
          setSelectedSubSectors(prevSub => {
            const newSub = new Set(prevSub);
            newSub.delete(subSectorId);
            return newSub;
          });
        }
      } else {
        newSet.add(tagId);
        // Si tous les tags sont maintenant cochés, cocher aussi la section
        const allTagsSelected = tags.every(tag => {
          const tId = createTagId(secteurKey, filiereId, sousCatNom, sectionTitre, tag);
          return newSet.has(tId) || tId === tagId; // Inclure le tag qu'on vient de cocher
        });
        if (allTagsSelected) {
          setSelectedSubSectors(prevSub => {
            const newSub = new Set(prevSub);
            newSub.add(subSectorId);
            return newSub;
          });
        }
      }
      return newSet;
    });
  };

  // =========================================================
  // 2. FONCTION DE RENDU ADAPTÉE AU MODÈLE DE L'IMAGE
  // Affiche un titre (ex: Cultures Vivrières) suivi des tags
  // =========================================================
  const renderFiliereContent = (filiere: Filiere, secteurKey: string, filiereId: string) => {
    return (
      <Accordion type="single" collapsible className="w-full">
        {/* MAP sur les SousCatégories (ex: Production Végétale) */}
        {filiere.sousCategories.map((sousCat, index) => (
          <AccordionItem
            key={index}
            value={`${filiere.id}-${index}`}
            className="border-b border-gray-200"
          >
            {/* Le Trigger affiche le nom de la SousCatégorie (ex: Production Végétale) */}
            <AccordionTrigger className="text-left px-6 py-4 font-inter text-lg font-semibold text-[var(--color-neutral-dark)] hover:no-underline">
              <div className="flex items-center gap-3 flex-1">
                {(() => {
                  const subSectorId = createSubSectorId(secteurKey, filiereId, sousCat.nom);
                  const memberSector = getMemberSectorFromSubSector(filiere.nom, sousCat.nom);
                  const membresUrl = memberSector 
                    ? `/membres?sector=${encodeURIComponent(memberSector)}&subsector=${encodeURIComponent(subSectorId)}`
                    : `/membres?subsector=${encodeURIComponent(subSectorId)}`;
                  
                  return (
                    <Link 
                      href={membresUrl}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:text-cpu-orange transition-colors"
                    >
                      {sousCat.nom}
                    </Link>
                  );
                })()}
              </div>
            </AccordionTrigger>
            
            {/* Le contenu affiche toutes les sections de tags (ex: Cultures Vivrières, Cultures de Rente) */}
            <AccordionContent>
              <div className="p-6 pt-0 accordion-content-enter">
                {/* MAP sur les sections de tags (Niveau 3) */}
                {sousCat.sectionsDeTags.map((section, sectionIndex) => {
                  const subSectorId = createSubSectorId(secteurKey, filiereId, sousCat.nom, section.titre);
                  const memberSector = getMemberSectorFromSubSector(filiere.nom, sousCat.nom, section.titre);
                  const isSelected = selectedSubSectors.has(subSectorId);
                  
                  // Vérifier si au moins un tag de cette section est sélectionné
                  const hasAnyTagSelected = section.tags.some(tag => {
                    const tagId = createTagId(secteurKey, filiereId, sousCat.nom, section.titre, tag);
                    return selectedTags.has(tagId);
                  });
                  
                  // La barre devient orange si la section est sélectionnée OU si au moins un tag est sélectionné
                  const isBarOrange = isSelected || hasAnyTagSelected;
                  
                  const membresUrl = memberSector 
                    ? `/membres?sector=${encodeURIComponent(memberSector)}&subsector=${encodeURIComponent(subSectorId)}`
                    : `/membres?subsector=${encodeURIComponent(subSectorId)}`;
                  
                  return (
                    <div key={sectionIndex} className="mb-6">
                      {/* Le titre de la section avec case à cocher et lien */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`h-6 w-1 flex-shrink-0 rounded-full ${isBarOrange ? 'bg-cpu-orange' : 'bg-gray-300'}`}></div>
                        <Checkbox
                          id={`checkbox-${subSectorId}`}
                          checked={isSelected}
                          onCheckedChange={() => toggleSubSector(subSectorId, secteurKey, filiereId, sousCat.nom, section.titre, section.tags)}
                          onClick={(e) => e.stopPropagation()}
                          className="h-5 w-5 rounded-none border-2 border-gray-300 data-[state=checked]:bg-cpu-orange data-[state=checked]:border-cpu-orange transition-all shadow-sm flex-shrink-0"
                        />
                        <Link 
                          href={membresUrl}
                          className={`flex-1 font-inter text-lg font-semibold transition-all cursor-pointer ${
                            isSelected 
                              ? 'text-cpu-orange' 
                              : 'text-[#221F1F] hover:text-cpu-orange'
                          }`}
                        >
                          {section.titre}
                        </Link>
                      </div>
                      
                      {/* Les tags réels (Niveau 4) avec checkboxes et liens */}
                      {/* OPTION DESIGN 5 : Élégant avec Bordures Subtiles (ACTIVE) */}
                      <div className="flex flex-wrap gap-2.5">
                        {section.tags.map((tag, tagIndex) => {
                          const tagId = createTagId(secteurKey, filiereId, sousCat.nom, section.titre, tag);
                          const isTagSelected = selectedTags.has(tagId);
                          const tagMemberSector = memberSector || getMemberSectorFromSubSector(filiere.nom, sousCat.nom);
                          const tagMembresUrl = tagMemberSector 
                            ? `/membres?sector=${encodeURIComponent(tagMemberSector)}&tag=${encodeURIComponent(tag)}&subsector=${encodeURIComponent(subSectorId)}`
                            : `/membres?tag=${encodeURIComponent(tag)}&subsector=${encodeURIComponent(subSectorId)}`;
                          
                          return (
                            <div 
                              key={tagIndex} 
                              className={`
                                flex items-center gap-2.5 pl-6 pr-4 py-2.5 rounded-md ml-4
                                transition-all duration-200
                                ${isTagSelected 
                                  ? 'bg-gradient-to-r from-cpu-orange/10 to-orange-50 border-l-4 border-cpu-orange shadow-sm' 
                                  : 'bg-white border-l-4 border-transparent hover:border-cpu-orange/30 hover:bg-gray-50/50'
                                }
                              `}
                            >
                              <Checkbox
                                id={`checkbox-tag-${tagId}`}
                                checked={isTagSelected}
                                onCheckedChange={() => toggleTag(tagId, subSectorId, secteurKey, filiereId, sousCat.nom, section.titre, section.tags)}
                                onClick={(e) => e.stopPropagation()}
                                className="h-4 w-4 rounded-none border-2 border-gray-300 data-[state=checked]:bg-cpu-orange data-[state=checked]:border-cpu-orange transition-all flex-shrink-0 shadow-sm"
                              />
                              <Link
                                href={tagMembresUrl}
                                onClick={(e) => e.stopPropagation()}
                                className={`
                                  text-sm font-medium whitespace-nowrap cursor-pointer
                                  transition-colors duration-200
                                  ${isTagSelected 
                                    ? 'text-cpu-orange font-semibold' 
                                    : 'text-[#221F1F] hover:text-cpu-orange'
                                  }
                                `}
                              >
                                {tag}
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                      
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };
  
  // Fonction pour rendre le contenu de l'onglet complet
  const renderTabContent = (secteurKey: SecteurKey) => {
    const secteur = secteursData[secteurKey];
    
    return (
        <TabsContent value={secteurKey}>
          {secteur.filieres.map((filiere) => (
            <div
              key={filiere.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-10"
            >
              {/* En-tête de la filière (ex: Filière Agriculture & Agroalimentaire) */}
              <div className="bg-[#F2F2F2] px-6 py-4">
                <h3 className="font-inter text-xl font-semibold text-[var(--color-primary)]">
                  {filiere.nom}
                </h3>
              </div>
              
              {/* Contenu généré par l'Accordion à deux niveaux (avec titres + tags) */}
              {renderFiliereContent(filiere, secteurKey, filiere.id)}
              
            </div>
          ))}
        </TabsContent>
    );
  };


  return (
    <>
      {/* Hero Section */}
      <section className="relative h-64 sm:h-96 md:h-[500px] lg:h-[550px] flex items-center justify-center overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <img
            src="/logo.png"
            alt="Confédération Patronale Unique des PME de Côte d'Ivoire"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        </div>

        {/* CONTENU */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Secteurs & Filières
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 animate-fade-in">
             Découvrez la classification sectorielle des PME en Côte d'Ivoire
          </p>
        </div>
      </section>

      {/* Titre de Classification */}
      <section className="bg-white py-8 sm:py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <h2 className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-bold text-[#221F1F] text-center">
            Classification Sectorielle des PME en Côte d'Ivoire
          </h2>
        </div>
      </section>

      {/* Navigation par Onglets */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

          <div className="w-full mb-8">

            <Tabs
              value={activeSecteur}
              onValueChange={(value) => {
                setActiveSecteur(value as SecteurKey);
                const params = new URLSearchParams(searchParams.toString());
                params.set('tab', value);
                router.push(`/secteurs?${params.toString()}`);
              }}
              className="w-full"
            >
              {/* Les onglets sont maintenant dans le header, on les cache ici */}
              <div className="hidden">
                <TabsList>
                  {Object.keys(secteursData).map((key) => (
                    <TabsTrigger key={key} value={key}>
                      {secteursData[key as SecteurKey].nom}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </Tabs>

          </div>
        </div>
      </section>

      {/* Bannière du Secteur Actif */}
      <section className="bg-white" >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 ">
          <div className="bg-gradient-to-r from-[#F27A20] via-[#A8892A] to-[#009739] py-6 rounded-xl">
            <h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-white uppercase text-center">
              {secteurActif.titreComplet}
            </h2>
          </div>
        </div>
      </section>

      {/* CONTENU PRINCIPAL DES ONGLETS */}
      <section className="py-12 sm:py-16 bg-[var(--color-bg)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <Tabs value={activeSecteur} onValueChange={setActiveSecteur as (value: string) => void}>
            
            {renderTabContent('primaire')}
            {renderTabContent('secondaire')}
            {renderTabContent('tertiaire')}
            {renderTabContent('quaternaire')}
            
          </Tabs>
        </div>
      </section>

      {/* Section CTA */}
      <section className={`py-16 bg-gradient-to-br from-orange-50/30 to-blue-50/40 ${hasSelection ? 'pb-24' : ''}`}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-[var(--color-neutral-dark)] mb-4">
            Votre secteur n'est pas représenté ?
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
            Contactez-nous pour discuter de l'intégration de votre secteur
            d'activité dans notre réseau
          </p>
          <Link href="/contact" passHref>
            <Button
              className="text-white hover:opacity-90"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Nous contacter
            </Button>
          </Link>
        </div>
      </section>

      {/* Bottom Action Bar - Flottante */}
      {hasSelection && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-cpu-orange shadow-2xl animate-fade-in-up">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-[#221F1F]">
                  {selectedTags.size} élément{selectedTags.size > 1 ? 's' : ''} sélectionné{selectedTags.size > 1 ? 's' : ''}
                </span>
              </div>
              <Link href={buildMembersUrl()} className="w-full sm:w-auto">
                <Button
                  className="w-full sm:w-auto bg-cpu-orange hover:bg-orange-700 text-white px-8 py-3 text-base font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  Voir les membres
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Secteurs = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-600">Chargement...</p>
        </div>
      </div>
    }>
      <SecteursContent />
    </Suspense>
  );
};

export default Secteurs;