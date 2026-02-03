"use client";

import { Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Target,
  Eye,
  BookOpen,
  Users,
  Handshake,
  Trophy,
  History,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { usePartenairesForSiteWeb, useEquipeForSiteWeb } from "@/hooks/use-api";

function AProposContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "mission";
  const [activeTab, setActiveTab] = useState(initialTab);

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

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-64 sm:h-72 md:h-80 lg:h-150 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#2d2d2d] to-[#1a1a1a]">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 opacity-50">
          <img
            src="/logo.png"
            alt="Confédération Patronale Unique des PME de Côte d'Ivoire"
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        </div>

        {/* CONTENU */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 tracking-tight">
            À Propos de CPU-PME.CI
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-2xl mx-auto text-white/80 font-light px-4">
            Découvrez l'histoire, la mission et la vision de la Confédération
            Patronale Unique des PME de Côte d'Ivoire
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
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
                <div className="flex items-center mb-6">
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

                {isLoadingEquipe ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : orderedEquipe.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {orderedEquipe.map((membre) => (
                      <Card
                        key={membre.id}
                        className="overflow-hidden border-0 transition-all duration-300 bg-white hover:shadow-lg"
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

                        <CardContent className="pt-6 pb-6">
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
                            className="text-sm leading-relaxed mb-4"
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
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p style={{ color: "var(--color-text-secondary)" }}>
                      Aucun membre de l'équipe disponible pour le moment.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

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
