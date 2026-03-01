"use client";

import { Suspense, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Eye,
  BookOpen,
  Users,
  Handshake,
  Trophy,
  History,
  Grid3x3,
  List,
  ChevronLeft,
  ChevronRight,
  X,
  Bookmark,
  MapPin,
  Phone,
  Globe,
  Mail,
  Linkedin,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { usePartenairesForSiteWeb, useEquipeForSiteWeb } from "@/hooks/use-api";
import { DynamicHeroBanner } from "@/components/DynamicHeroBanner";
import { motion, AnimatePresence } from "framer-motion";

function AProposContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "mission";
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // États pour l'équipe
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const membersPerPage = 12;

  // Utiliser les hooks pour récupérer les données
  const { data: partenaires = [], isLoading: isLoadingPartenaires } =
    usePartenairesForSiteWeb({ type: "strategique" });
  const { data: equipe = [], isLoading: isLoadingEquipe } =
    useEquipeForSiteWeb();
  const orderedEquipe = [...equipe]
    .map((membre, index) => ({ membre, index }))
    .sort((a, b) => {
      const aOrder = a.membre.odre ?? a.membre.ordre;
      const bOrder = b.membre.odre ?? b.membre.ordre;

      if (aOrder == null && bOrder == null) return a.index - b.index;
      if (aOrder == null) return 1;
      if (bOrder == null) return -1;
      return aOrder - bOrder;
    })
    .map(({ membre }) => membre);

  // Pagination
  const totalPages = Math.ceil(orderedEquipe.length / membersPerPage);
  const startIndex = (currentPage - 1) * membersPerPage;
  const endIndex = startIndex + membersPerPage;
  const paginatedEquipe = orderedEquipe.slice(startIndex, endIndex);

  // Navigation dans le drawer
  const navigateMember = (direction: 'prev' | 'next') => {
    if (!selectedMember) return;
    
    const currentIndex = paginatedEquipe.findIndex((m: any) => m.id === selectedMember.id);
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    // Boucler si on atteint les limites
    if (newIndex < 0) newIndex = paginatedEquipe.length - 1;
    if (newIndex >= paginatedEquipe.length) newIndex = 0;
    
    setSelectedMember(paginatedEquipe[newIndex]);
  };

  // Navigation clavier
  useEffect(() => {
    if (!selectedMember) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateMember('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateMember('next');
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedMember(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMember, paginatedEquipe]);

  // Réinitialiser la page quand on change d'onglet
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "equipe") {
      setCurrentPage(1);
      setSelectedMember(null);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <DynamicHeroBanner
        position="about"
        title="À Propos de CPU-PME.CI"
        subtitle="Découvrez l'histoire, la mission et la vision de la Confédération Patronale Unique des PME de Côte d'Ivoire"
      />

      {/* Tabs Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <div className="flex justify-center mb-12 sm:mb-16 px-4 sm:px-6">
              <TabsList className="!grid grid-cols-2 md:!grid-cols-4 w-full max-w-5xl gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 rounded-xl !flex-none">
                {[
                  { value: "mission", label: "Mission & Vision" },
                  { value: "histoire", label: "Histoire" },
                  { value: "equipe", label: "Équipe" },
                  { value: "partenaires", label: "Partenaires" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="w-full flex items-center justify-center px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 data-[state=active]:bg-white data-[state=active]:text-[#221F1F] data-[state=active]:shadow-md data-[state=inactive]:bg-slate-100 data-[state=inactive]:text-gray-600 hover:bg-slate-200 whitespace-nowrap"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Mission & Vision Content */}
            <TabsContent value="mission" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <br />
                  <div className="flex items-center mb-4">
                    <div
                      className="p-3 rounded-full mr-4"
                      style={{ backgroundColor: "rgba(240, 130, 35, 0.1)" }}
                    >
                      <Target
                        className="h-8 w-8"
                        style={{ color: "var(--color-primary)" }}
                      />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Notre Mission
                    </h2>
                  </div>
                  <p
                    className="mb-6"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    La Confédération Patronale Unique des PME de Côte d'Ivoire
                    (CPU-PME.CI) a pour mission de soutenir, représenter et
                    défendre les intérêts des Petites et Moyennes Entreprises
                    ivoiriennes. Notre organisation s'engage à créer un
                    environnement favorable à la croissance et au développement
                    des PME, moteur essentiel de l'économie nationale.
                  </p>
                  <p
                    className="mb-6"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Nous œuvrons quotidiennement pour :
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div
                        className="rounded-full p-1 mr-3 mt-1"
                        style={{ backgroundColor: "var(--color-success)" }}
                      >
                        <svg
                          className="h-3 w-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>
                        Renforcer la compétitivité des PME ivoiriennes
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div
                        className="rounded-full p-1 mr-3 mt-1"
                        style={{ backgroundColor: "var(--color-success)" }}
                      >
                        <svg
                          className="h-3 w-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>
                        Faciliter l'accès aux financements et aux marchés
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div
                        className="rounded-full p-1 mr-3 mt-1"
                        style={{ backgroundColor: "var(--color-success)" }}
                      >
                        <svg
                          className="h-3 w-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>
                        Promouvoir l'innovation et la digitalisation des
                        entreprises
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div
                        className="rounded-full p-1 mr-3 mt-1"
                        style={{ backgroundColor: "var(--color-success)" }}
                      >
                        <svg
                          className="h-3 w-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>
                        Défendre les intérêts des PME auprès des institutions
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center mb-4">
                    <div
                      className="p-3 rounded-full mr-4"
                      style={{ backgroundColor: "rgba(240, 130, 35, 0.1)" }}
                    >
                      <Trophy
                        className="h-8 w-8"
                        style={{ color: "var(--color-primary)" }}
                      />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Notre Vision
                    </h2>
                  </div>
                  <p
                    className="mb-6"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Notre vision est de faire de la Côte d'Ivoire un pôle
                    d'excellence entrepreneurial en Afrique de l'Ouest, où les
                    PME peuvent prospérer dans un environnement d'affaires
                    favorable, innovant et inclusif.
                  </p>
                  <p
                    className="mb-6"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Nous aspirons à :
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div
                        className="rounded-full p-1 mr-3 mt-1"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      >
                        <svg
                          className="h-3 w-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>
                        Construire un écosystème entrepreneurial robuste et
                        résilient
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div
                        className="rounded-full p-1 mr-3 mt-1"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      >
                        <svg
                          className="h-3 w-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>
                        Encourager l'émergence d'une nouvelle génération
                        d'entrepreneurs
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div
                        className="rounded-full p-1 mr-3 mt-1"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      >
                        <svg
                          className="h-3 w-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>
                        Positionner les PME ivoiriennes comme acteurs clés du
                        développement national
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div
                        className="rounded-full p-1 mr-3 mt-1"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      >
                        <svg
                          className="h-3 w-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span>
                        Faciliter l'intégration des PME ivoiriennes dans les
                        chaînes de valeur mondiales
                      </span>
                    </li>
                  </ul>

                  <div
                    className="p-6 rounded-lg mt-8"
                    style={{
                      backgroundColor: "var(--color-bg)",
                      borderColor: "var(--color-primary)",
                    }}
                  >
                    <p className="text-lg font-semibold mb-2">
                      Notre engagement
                    </p>
                    <p className="italic">
                      "Nous nous engageons à porter la voix des PME ivoiriennes
                      et à créer les conditions durables de leur épanouissement
                      dans un environnement économique en constante mutation, au
                      service de la compétitivité nationale et internationale. "
                    </p>
                    <p className="mt-4 font-semibold">
                      Dr. Moussa Élias Farakhan Diomandé Président Confédération
                      Patronale Unique des PME de Côte d’Ivoire (CPU-PME CI)
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Histoire Content */}
            <TabsContent value="histoire" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <div className="flex items-center mb-4">
                      <div
                        className="p-3 rounded-full mr-4"
                        style={{ backgroundColor: "rgba(25, 157, 78, 0.1)" }}
                      >
                        <History
                          className="h-8 w-8"
                          style={{ color: "var(--color-success)" }}
                        />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold">
                        Notre Histoire
                      </h2>
                    </div>
                    <p
                      className="mb-6"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      La Confédération Patronale Unique des PME de Côte d'Ivoire
                      (CPU-PME.CI) est née de la volonté d'unir les forces des
                      différentes organisations représentatives des PME pour
                      mieux défendre leurs intérêts et contribuer efficacement
                      au développement économique du pays.
                    </p>
                    <div
                      className="p-6 rounded-lg"
                      style={{
                        backgroundColor: "var(--color-bg)",
                        borderColor: "var(--color-success)",
                      }}
                    >
                      <p className="text-lg font-semibold mb-2">
                        Notre héritage
                      </p>
                      <p className="italic">
                        "De la vision de quelques entrepreneurs engagés est née
                        une organisation qui représente aujourd'hui la voix de
                        milliers de PME à travers tout le pays."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="space-y-12">
                    <div className="flex">
                      <div className="flex flex-col items-center mr-6">
                        <div
                          className="text-white font-bold rounded-full h-12 w-12 flex items-center justify-center"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        >
                          2019
                        </div>
                        <div className="h-full w-0.5 bg-gray-300 my-2"></div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          Création de l'initiative
                        </h3>
                        <p
                          className="mb-4"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          Face aux défis croissants rencontrés par les PME
                          ivoiriennes, un groupe d'entrepreneurs visionnaires se
                          réunit pour poser les bases d'une organisation
                          représentative unifiée.
                        </p>
                        <Card style={{ borderColor: "var(--color-primary)" }}>
                          <CardContent className="pt-6">
                            <p className="text-sm">
                              Les premiers travaux de réflexion sont lancés avec
                              l'implication de représentants de divers secteurs
                              économiques. Une feuille de route est établie pour
                              la création d'une confédération patronale unique.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex flex-col items-center mr-6">
                        <div
                          className="text-white font-bold rounded-full h-12 w-12 flex items-center justify-center"
                          style={{ backgroundColor: "var(--color-success)" }}
                        >
                          2020
                        </div>
                        <div className="h-full w-0.5 bg-gray-300 my-2"></div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          Fondation officielle
                        </h3>
                        <p
                          className="mb-4"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          Après une année de préparation et de concertation, la
                          CPU-PME.CI est officiellement fondée lors d'une
                          assemblée constitutive réunissant plus de 200
                          entrepreneurs.
                        </p>
                        <Card style={{ borderColor: "var(--color-success)" }}>
                          <CardContent className="pt-6">
                            <p className="text-sm">
                              Les statuts sont adoptés, les instances
                              dirigeantes sont élues et la vision stratégique
                              est validée. La confédération obtient sa
                              reconnaissance officielle auprès des autorités
                              ivoiriennes.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex flex-col items-center mr-6">
                        <div
                          className="text-white font-bold rounded-full h-12 w-12 flex items-center justify-center"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        >
                          2021
                        </div>
                        <div className="h-full w-0.5 bg-gray-300 my-2"></div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          Expansion régionale
                        </h3>
                        <p
                          className="mb-4"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          La CPU-PME.CI étend sa présence dans toutes les
                          régions de la Côte d'Ivoire avec la création de
                          bureaux régionaux et le développement d'un réseau de
                          représentants locaux.
                        </p>
                        <Card style={{ borderColor: "var(--color-primary)" }}>
                          <CardContent className="pt-6">
                            <p className="text-sm">
                              Cette expansion permet de mieux prendre en compte
                              les besoins spécifiques des PME dans chaque région
                              et de renforcer le maillage territorial de
                              l'organisation.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex flex-col items-center mr-6">
                        <div
                          className="text-white font-bold rounded-full h-12 w-12 flex items-center justify-center"
                          style={{ backgroundColor: "var(--color-success)" }}
                        >
                          2023
                        </div>
                        <div className="h-full w-0.5 bg-gray-300 my-2"></div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          Reconnaissance internationale
                        </h3>
                        <p
                          className="mb-4"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          La CPU-PME.CI devient membre de plusieurs réseaux
                          internationaux d'organisations patronales et signe des
                          accords de partenariat avec des organisations
                          homologues en Afrique et en Europe.
                        </p>
                        <Card style={{ borderColor: "var(--color-success)" }}>
                          <CardContent className="pt-6">
                            <p className="text-sm">
                              Ces partenariats ouvrent de nouvelles perspectives
                              d'affaires pour les membres et renforcent la
                              visibilité internationale des PME ivoiriennes.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex flex-col items-center mr-6">
                        <div
                          className="text-white font-bold rounded-full h-12 w-12 flex items-center justify-center"
                          style={{ backgroundColor: "var(--color-primary)" }}
                        >
                          2025
                        </div>
                        <div className="h-full w-0.5 bg-gray-300 my-2"></div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          Lancement de la plateforme digitale
                        </h3>
                        <p
                          className="mb-4"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          Pour répondre aux défis de la transformation
                          numérique, la CPU-PME.CI lance sa plateforme digitale
                          intégrée, offrant des services en ligne aux PME
                          membres.
                        </p>
                        <Card style={{ borderColor: "var(--color-primary)" }}>
                          <CardContent className="pt-6">
                            <p className="text-sm">
                              Cette plateforme marque un tournant dans la
                              stratégie de l'organisation, avec des modules
                              dédiés à la formation, au financement, au
                              réseautage et aux appels d'offres.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex flex-col items-center mr-6">
                        <div
                          className="text-white font-bold rounded-full h-12 w-12 flex items-center justify-center"
                          style={{ backgroundColor: "var(--color-success)" }}
                        >
                          2025
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          Aujourd'hui et demain
                        </h3>
                        <p
                          className="mb-4"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          La CPU-PME.CI compte désormais plus de 1000
                          entreprises membres et continue de développer son
                          offre de services pour répondre aux besoins évolutifs
                          des PME ivoiriennes.
                        </p>
                        <Card style={{ borderColor: "var(--color-success)" }}>
                          <CardContent className="pt-6">
                            <p className="text-sm">
                              L'organisation se projette vers l'avenir avec
                              ambition, en se fixant pour objectif d'accompagner
                              la nouvelle génération d'entrepreneurs et de
                              contribuer activement à la transformation
                              économique de la Côte d'Ivoire.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Équipe Content */}
            <TabsContent value="equipe" className="mt-0">
              {/* Direction */}
              <div>
                <br />
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <div className="flex items-center">
                    <div
                      className="p-3 rounded-full mr-4"
                      style={{ backgroundColor: "rgba(240, 130, 35, 0.1)" }}
                    >
                      <Users
                        className="h-8 w-8"
                        style={{ color: "var(--color-primary)" }}
                      />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Équipe Dirigeante
                    </h2>
                  </div>

                  {/* Toggle Vue Grille/Liste */}
                  {!isLoadingEquipe && orderedEquipe.length > 0 && (
                    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
                          viewMode === "grid"
                            ? "bg-white shadow-md text-gray-900"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <Grid3x3 className="h-4 w-4" />
                        <span className="text-sm font-medium">Grille</span>
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`flex items-center gap-2 px-4 py-2 rounded transition-all ${
                          viewMode === "list"
                            ? "bg-white shadow-md text-gray-900"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <List className="h-4 w-4" />
                        <span className="text-sm font-medium">Liste</span>
                      </button>
                    </div>
                  )}
                </div>

                {isLoadingEquipe ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : orderedEquipe.length > 0 ? (
                  <>
                    {/* Vue Grille */}
                    {viewMode === "grid" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {paginatedEquipe.map((membre) => (
                      <Card
                        key={membre.id}
                        className="overflow-hidden border-0 transition-all duration-300 bg-white hover:shadow-lg flex flex-col"
                      >
                        <div className="h-64 relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                          <img
                            src={membre.photo}
                            alt={membre.nom}
                            className="h-full w-full object-contain sm:object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.src = "/logo.png";
                            }}
                          />
                        </div>

                        <CardContent className="pt-6 pb-6 flex flex-col flex-1">
                          <h3 className="text-lg font-bold mb-2 text-gray-900">
                            {membre.nom}
                          </h3>
                          <p
                            className="font-semibold mb-3 text-sm"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {membre.role}
                          </p>
                          <p
                            className="text-sm leading-relaxed mb-4 line-clamp-2"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            {membre.bio}
                          </p>
                          {membre.reseauxSociaux && (
                            <div className="flex gap-3 mt-4">
                              {membre.reseauxSociaux.linkedin && (
                                <a
                                  href={membre.reseauxSociaux.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 transition-colors"
                                  aria-label="LinkedIn"
                                >
                                  <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                  </svg>
                                </a>
                              )}
                              {membre.reseauxSociaux.email && (
                                <a
                                  href={`mailto:${membre.reseauxSociaux.email}`}
                                  className="text-gray-600 hover:text-gray-800 transition-colors"
                                  aria-label="Email"
                                >
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                  </svg>
                                </a>
                              )}
                            </div>
                          )}
                          <button
                            onClick={() => setSelectedMember(membre)}
                            className="w-full mt-auto px-4 py-2 bg-cpu-green text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Eye className="h-4 w-4" />
                            Voir plus
                          </button>
                        </CardContent>
                      </Card>
                    ))}
                      </div>
                    )}

                    {/* Vue Liste */}
                    {viewMode === "list" && (
                      <div className="space-y-4">
                        {paginatedEquipe.map((membre) => (
                          <Card
                            key={membre.id}
                            className="overflow-hidden border-0 transition-all duration-300 bg-white hover:shadow-lg"
                          >
                            <CardContent className="p-6">
                              <div className="flex items-center gap-6">
                                <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                                  <img
                                    src={membre.photo}
                                    alt={membre.nom}
                                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                      e.currentTarget.src = "/logo.png";
                                    }}
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-lg font-bold mb-2 text-gray-900">
                                    {membre.nom}
                                  </h3>
                                  <p
                                    className="font-semibold mb-2 text-sm"
                                    style={{ color: "var(--color-primary)" }}
                                  >
                                    {membre.role}
                                  </p>
                                  <p
                                    className="text-sm leading-relaxed line-clamp-1"
                                    style={{ color: "var(--color-text-secondary)" }}
                                  >
                                    {membre.bio}
                                  </p>
                                </div>
                                <button
                                  onClick={() => setSelectedMember(membre)}
                                  className="flex-shrink-0 px-4 py-2 bg-cpu-green text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer"
                                >
                                  <Eye className="h-4 w-4" />
                                  Voir plus
                                </button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-12 flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 flex-wrap justify-center">
                          <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className="hidden sm:flex px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            Première
                          </button>
                          <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          
                          {/* Numéros de page */}
                          <div className="flex gap-2">
                            {[...Array(totalPages)].map((_, i) => {
                              const page = i + 1;
                              // Afficher max 5 pages autour de la page courante
                              if (
                                page === 1 ||
                                page === totalPages ||
                                (page >= currentPage - 1 && page <= currentPage + 1)
                              ) {
                                return (
                                  <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                      currentPage === page
                                        ? "bg-cpu-green text-white shadow-md"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                  >
                                    {page}
                                  </button>
                                );
                              } else if (page === currentPage - 2 || page === currentPage + 2) {
                                return <span key={page} className="px-2 text-gray-500">...</span>;
                              }
                              return null;
                            })}
                          </div>

                          <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="hidden sm:flex px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            Dernière
                          </button>
                        </div>
                        <p className="text-sm text-gray-600">
                          Page {currentPage} sur {totalPages} • {orderedEquipe.length} membre{orderedEquipe.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12">
                    <p style={{ color: "var(--color-text-secondary)" }}>
                      Aucun membre de l'équipe disponible pour le moment.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Drawer Détails Membre Glassmorphism */}
            <AnimatePresence>
              {selectedMember && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                  onClick={() => setSelectedMember(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      backgroundColor: 'rgba(255, 255, 255, 0.85)',
                      border: '1px solid rgba(209, 213, 219, 0.3)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Header avec navigation */}
                    <div 
                      className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200/50"
                      style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                    >
                      <button
                        onClick={() => navigateMember('prev')}
                        className="p-2 hover:bg-cpu-orange/10 rounded-lg transition-colors"
                        title="Membre précédent (←)"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      
                      <div className="text-sm text-slate-600 font-medium">
                        {paginatedEquipe.findIndex((m: any) => m.id === selectedMember.id) + 1} / {paginatedEquipe.length}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigateMember('next')}
                          className="p-2 hover:bg-cpu-orange/10 rounded-lg transition-colors"
                          title="Membre suivant (→)"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setSelectedMember(null)}
                          className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                          title="Fermer (Esc)"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Contenu du membre */}
                    <div className="p-8">
                      {/* En-tête avec photo et nom */}
                      <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                        <div className="flex-shrink-0">
                          <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                            <img
                              src={selectedMember.photo}
                              alt={selectedMember.nom}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "/logo.png";
                              }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h2 className="text-4xl font-bold text-slate-800 mb-4">
                            {selectedMember.nom}
                          </h2>
                          <Badge className="bg-cpu-green text-white border-0 px-4 py-2 text-base font-bold shadow-lg mb-6">
                            {selectedMember.role}
                          </Badge>
                          
                          {/* Bio complète */}
                          <div className="mt-6">
                            <p className="text-slate-600 leading-relaxed text-base">
                              {selectedMember.bio}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Section Contact */}
                      {selectedMember.reseauxSociaux && (
                        <div className="mt-8 pt-8 border-t border-gray-200/50">
                          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-cpu-green/10">
                              <Mail className="h-5 w-5 text-cpu-green" />
                            </div>
                            Contact & Réseaux sociaux
                          </h3>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            {selectedMember.reseauxSociaux.linkedin && (
                              <a
                                href={selectedMember.reseauxSociaux.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-lg transition-all duration-300 group"
                              >
                                <div className="p-3 rounded-xl bg-blue-600 text-white group-hover:scale-110 transition-transform">
                                  <Linkedin className="h-6 w-6" />
                                </div>
                                <div>
                                  <div className="text-xs text-blue-600 font-medium mb-1">LINKEDIN</div>
                                  <div className="text-sm font-bold text-blue-900">Voir le profil</div>
                                </div>
                              </a>
                            )}
                            
                            {selectedMember.reseauxSociaux.email && (
                              <a
                                href={`mailto:${selectedMember.reseauxSociaux.email}`}
                                className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 hover:shadow-lg transition-all duration-300 group"
                              >
                                <div className="p-3 rounded-xl bg-gray-700 text-white group-hover:scale-110 transition-transform">
                                  <Mail className="h-6 w-6" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-xs text-gray-600 font-medium mb-1">EMAIL</div>
                                  <div className="text-sm font-bold text-gray-900 truncate">{selectedMember.reseauxSociaux.email}</div>
                                </div>
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Hint navigation clavier */}
                      <div className="mt-10 pt-6 border-t border-gray-200/50">
                        <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
                          <span className="flex items-center gap-2">
                            <kbd className="px-3 py-1.5 bg-white rounded-lg border-2 border-gray-300 font-bold shadow-sm">←</kbd>
                            <kbd className="px-3 py-1.5 bg-white rounded-lg border-2 border-gray-300 font-bold shadow-sm">→</kbd>
                            Naviguer
                          </span>
                          <span className="flex items-center gap-2">
                            <kbd className="px-3 py-1.5 bg-white rounded-lg border-2 border-gray-300 font-bold shadow-sm">Esc</kbd>
                            Fermer
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Partenaires Content */}
            <TabsContent value="partenaires" className="mt-0">
              <div className="grid grid-cols-1 gap-1">
                {/* Partenaires */}
                <br />
                <div>
                  <div className="flex items-center mb-6">
                    <div
                      className="p-3 rounded-full mr-4"
                      style={{ backgroundColor: "rgba(25, 157, 78, 0.1)" }}
                    >
                      <Handshake
                        className="h-8 w-8"
                        style={{ color: "var(--color-success)" }}
                      />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      Partenaires Stratégiques
                    </h2>
                  </div>

                  <p
                    className="mb-8 max-w-3xl"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    La CPU-PME.CI collabore avec un réseau de partenaires
                    stratégiques nationaux et internationaux pour offrir un
                    soutien optimal aux PME ivoiriennes et défendre leurs
                    intérêts.
                  </p>

                  {isLoadingPartenaires ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  ) : partenaires.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                      {partenaires.map((partenaire) => (
                        <Card
                          key={partenaire.id}
                          className="flex items-center justify-center p-4 h-32 border-0 bg-white transition-shadow hover:shadow-lg"
                        >
                          {partenaire.lien ? (
                            <a
                              href={partenaire.lien}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full h-full flex items-center justify-center"
                            >
                              <img
                                src={partenaire.logo}
                                alt={partenaire.nom}
                                className="max-h-full max-w-full object-contain transition-transform hover:scale-105"
                                onError={(e) => {
                                  e.currentTarget.src = "/logo.png";
                                }}
                              />
                            </a>
                          ) : (
                            <img
                              src={partenaire.logo}
                              alt={partenaire.nom}
                              className="max-h-full max-w-full object-contain"
                              onError={(e) => {
                                e.currentTarget.src = "/logo.png";
                              }}
                            />
                          )}
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p style={{ color: "var(--color-text-secondary)" }}>
                        Aucun partenaire disponible pour le moment.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}

export default function APropos() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <AProposContent />
    </Suspense>
  );
}
