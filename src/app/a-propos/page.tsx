"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Target,
  Eye,
  BookOpen,
  Users,
  Handshake,
  Trophy,
  History,
} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

export default function APropos() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[550px] flex items-center justify-center overflow-hidden">
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
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in">
            À Propos de CPU-PME.CI
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 animate-fade-in">
            Découvrez l'histoire, la mission et la vision de la Confédération
            Patronale Unique des PME de Côte d'Ivoire
          </p>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <Tabs defaultValue="mission" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto md:h-14 gap-3 md:gap-4 bg-transparent p-0 mb-8">
              <TabsTrigger
                value="mission"
                className="text-sm md:text-base py-3.5 px-6 rounded-lg font-semibold transition-all duration-300 border-2 border-gray-200 bg-white hover:border-[var(--color-primary)] hover:shadow-md data-[state=active]:bg-[var(--color-primary)] data-[state=active]:text-white data-[state=active]:border-[var(--color-primary)] data-[state=active]:shadow-lg"
              >
                Mission & Vision
              </TabsTrigger>
              <TabsTrigger
                value="histoire"
                className="text-sm md:text-base py-3.5 px-6 rounded-lg font-semibold transition-all duration-300 border-2 border-gray-200 bg-white hover:border-[var(--color-primary)] hover:shadow-md data-[state=active]:bg-[var(--color-primary)] data-[state=active]:text-white data-[state=active]:border-[var(--color-primary)] data-[state=active]:shadow-lg"
              >
                Histoire
              </TabsTrigger>
              <TabsTrigger
                value="equipe"
                className="text-sm md:text-base py-3.5 px-6 rounded-lg font-semibold transition-all duration-300 border-2 border-gray-200 bg-white hover:border-[var(--color-primary)] hover:shadow-md data-[state=active]:bg-[var(--color-primary)] data-[state=active]:text-white data-[state=active]:border-[var(--color-primary)] data-[state=active]:shadow-lg"
              >
                Équipe & Partenaires
              </TabsTrigger>
            </TabsList>

            {/* Mission & Vision Content */}
            <TabsContent value="mission" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
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
                    className="p-6 rounded-lg border-l-4 mt-8"
                    style={{
                      backgroundColor: "var(--color-bg)",
                      borderColor: "var(--color-primary)",
                    }}
                  >
                    <p className="text-lg font-semibold mb-2">
                      Notre engagement
                    </p>
                    <p className="italic">
                      "Nous nous engageons à être la voix des PME ivoiriennes et
                      à créer les conditions nécessaires à leur épanouissement
                      dans un environnement économique en constante évolution."
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Histoire Content */}
            <TabsContent value="histoire" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                      className="p-6 rounded-lg border-l-4"
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
                        <Card
                          className="border-l-4"
                          style={{ borderColor: "var(--color-primary)" }}
                        >
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
                        <Card
                          className="border-l-4"
                          style={{ borderColor: "var(--color-success)" }}
                        >
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
                        <Card
                          className="border-l-4"
                          style={{ borderColor: "var(--color-primary)" }}
                        >
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
                        <Card
                          className="border-l-4"
                          style={{ borderColor: "var(--color-success)" }}
                        >
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
                        <Card
                          className="border-l-4"
                          style={{ borderColor: "var(--color-primary)" }}
                        >
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
                        <Card
                          className="border-l-4"
                          style={{ borderColor: "var(--color-success)" }}
                        >
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

            {/* Équipe & Partenaires Content */}
            <TabsContent value="equipe" className="mt-4">
              <div className="grid grid-cols-1 gap-12">
                {/* Direction */}
                <div>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Président */}
                    <Card className="overflow-hidden border-0 transition-all duration-300 bg-white">
                      <div className="h-64 relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={require("@/assets/diomande.png").default.src}
                          alt="Dr DIOMANDE Moussa Elias Farakhan"
                          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="pt-6 pb-6">
                        <h3 className="text-lg font-bold mb-2 text-gray-900">
                          Dr DIOMANDE Moussa Elias Farakhan
                        </h3>
                        <p
                          className="font-semibold mb-3 text-sm"
                          style={{ color: "var(--color-primary)" }}
                        >
                          Président de la CPU-PME.CI
                        </p>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          Dr DIOMANDE dirige avec vision et détermination la
                          Confédération Patronale Unique des PME de Côte
                          d'Ivoire, œuvrant pour le développement économique du
                          pays à travers le soutien aux petites et moyennes
                          entreprises.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Président de Filière */}
                    <Card className="overflow-hidden border-0 transition-all duration-300 bg-white">
                      <div className="h-64 relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={require("@/assets/herman.png").default.src}
                          alt="Hermann ADJABONI GUEZO"
                          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="pt-6 pb-6">
                        <h3 className="text-lg font-bold mb-2 text-gray-900">
                          Hermann ADJABONI GUEZO
                        </h3>
                        <p
                          className="font-semibold mb-3 text-sm"
                          style={{ color: "var(--color-primary)" }}
                        >
                          Président de Filière
                        </p>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          Hermann ADJABONI GUEZO apporte son expertise et son
                          leadership en tant que Président de Filière,
                          contribuant au développement sectoriel et à la
                          valorisation des PME ivoiriennes dans son domaine
                          d'activité.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Secretaire Executif */}
                    <Card className="overflow-hidden border-0 transition-all duration-300 bg-white">
                      <div className="h-64 relative bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={require("@/assets/kongo.png").default.src}
                          alt="Silvère Kongo"
                          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="pt-6 pb-6">
                        <h3 className="text-lg font-bold mb-2 text-gray-900">
                          Silvère Kongo
                        </h3>
                        <p
                          className="font-semibold mb-3 text-sm"
                          style={{ color: "var(--color-primary)" }}
                        >
                          Secretaire Executif
                        </p>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          Silvère Kongo assure le rôle clé de Secretaire
                          Executif au sein de la CPU-PME.CI, coordonnant les
                          activités opérationnelles et assurant la mise en œuvre
                          des décisions stratégiques de l'organisation.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Autres membres - placeholder */}
                    <Card className="overflow-hidden border-0 transition-all duration-300 bg-white">
                      <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <Users className="h-20 w-20 text-gray-400" />
                      </div>
                      <CardContent className="pt-6 pb-6">
                        <h3 className="text-lg font-bold mb-2 text-gray-900">
                          Nom du Dirigeant
                        </h3>
                        <p
                          className="font-semibold mb-3 text-sm"
                          style={{ color: "var(--color-primary)" }}
                        >
                          Poste / Fonction
                        </p>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          Courte biographie professionnelle du dirigeant, avec
                          son parcours et son expertise...
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Partenaires */}
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

                  <Carousel
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    plugins={[
                      Autoplay({
                        delay: 2000,
                      }),
                    ]}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-2 md:-ml-4">
                      <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                        <Card className="flex items-center justify-center p-3 h-30 border-0 bg-white transition-shadow">
                          <img
                            src={require("@/assets/bad.png").default.src}
                            alt="Banque Africaine de Développement"
                            className="max-h-full max-w-full object-contain"
                          />
                        </Card>
                      </CarouselItem>

                      <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                        <Card className="flex items-center justify-center p-4 h-30 border-0 bg-white transition-shadow">
                          <img
                            src={require("@/assets/ecobank.png").default.src}
                            alt="Ecobank"
                            className="max-h-full max-w-full object-contain"
                          />
                        </Card>
                      </CarouselItem>

                      <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                        <Card className="flex items-center justify-center p-4 h-30 border-0 bg-white transition-shadow">
                          <img
                            src={require("@/assets/mtn.png").default.src}
                            alt="MTN"
                            className="max-h-full max-w-full object-contain"
                          />
                        </Card>
                      </CarouselItem>

                      <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                        <Card className="flex items-center justify-center p-4 h-30 border-0 bg-white transition-shadow">
                          <img
                            src={require("@/assets/fun.png").default.src}
                            alt="Union Européenne"
                            className="max-h-full max-w-full object-contain"
                          />
                        </Card>
                      </CarouselItem>

                      <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                        <Card className="flex items-center justify-center p-4 h-30 border-0 bg-white transition-shadow">
                          <img
                            src={require("@/assets/afd.png").default.src}
                            alt="Agence Française de Développement"
                            className="max-h-full max-w-full object-contain"
                          />
                        </Card>
                      </CarouselItem>

                      <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                        <Card className="flex items-center justify-center p-4 h-30 border-0 bg-white transition-shadow">
                          <img
                            src={require("@/assets/cepici.png").default.src}
                            alt="CEPICI - Centre de Promotion des Investissements en Côte d'Ivoire"
                            className="max-h-full max-w-full object-contain"
                          />
                        </Card>
                      </CarouselItem>

                      <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                        <Card className="flex items-center justify-center p-4 h-30 border-0 bg-white transition-shadow">
                          <img
                            src={require("@/assets/coperation.png").default.src}
                            alt="Coopération Allemande"
                            className="max-h-full max-w-full object-contain"
                          />
                        </Card>
                      </CarouselItem>

                      <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                        <Card className="flex items-center justify-center p-4 h-30 border-0 bg-white transition-shadow">
                          <img
                            src={
                              require("@/assets/agriculture.png").default.src
                            }
                            alt="Ministère d'État, Ministre de l'Agriculture, du Développement Rural et des Productions Vivières"
                            className="max-h-full max-w-full object-contain"
                          />
                        </Card>
                      </CarouselItem>

                      <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                        <Card className="flex items-center justify-center p-4 h-30 border-0 bg-white transition-shadow">
                          <img
                            src={require("@/assets/tourisme.png").default.src}
                            alt="Ministère du Tourisme et des Loisirs"
                            className="max-h-full max-w-full object-contain"
                          />
                        </Card>
                      </CarouselItem>

                      <CarouselItem className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                        <Card className="flex items-center justify-center p-4 h-30 border-0 bg-white transition-shadow">
                          <img
                            src={require("@/assets/commerce.png").default.src}
                            alt="Ministère du Commerce et de l'Industrie"
                            className="max-h-full max-w-full object-contain"
                          />
                        </Card>
                      </CarouselItem>

                      {/* Additional placeholder partners */}
                      {[1, 2].map((i) => (
                        <CarouselItem
                          key={i}
                          className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6"
                        >
                          <Card className="flex items-center justify-center p-4 h-32 border-0 bg-white shadow-sm hover:shadow-lg transition-shadow">
                            <div className="bg-gray-200 h-16 w-32 rounded"></div>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                  </Carousel>
                </div>

                {/* Témoignages */}
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      Ils nous font confiance
                    </h2>
                    <p
                      className="max-w-2xl mx-auto"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      Découvrez ce que nos membres et partenaires disent de
                      notre organisation et de notre impact.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card
                      className="border-none"
                      style={{ backgroundColor: "var(--color-bg)" }}
                    >
                      <CardContent className="pt-6">
                        <div
                          className="text-3xl mb-4"
                          style={{ color: "var(--color-primary)" }}
                        >
                          "
                        </div>
                        <p
                          className="mb-6 italic"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          La CPU-PME.CI nous a apporté un soutien précieux dans
                          le développement de notre entreprise. Grâce à leur
                          accompagnement, nous avons pu accéder à de nouveaux
                          marchés et développer notre réseau professionnel.
                        </p>
                        <div className="flex items-center">
                          <div className="bg-gray-300 h-12 w-12 rounded-full mr-4"></div>
                          <div>
                            <p className="font-semibold">Nom du Témoin</p>
                            <p
                              className="text-sm"
                              style={{ color: "var(--color-text-secondary)" }}
                            >
                              Entreprise / Poste
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card
                      className="border-none"
                      style={{ backgroundColor: "var(--color-bg)" }}
                    >
                      <CardContent className="pt-6">
                        <div
                          className="text-3xl mb-4"
                          style={{ color: "var(--color-success)" }}
                        >
                          "
                        </div>
                        <p
                          className="mb-6 italic"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          En tant que partenaire institutionnel, nous apprécions
                          particulièrement le professionnalisme et l'engagement
                          de la CPU-PME.CI dans la défense des intérêts des PME
                          ivoiriennes. Leur travail contribue significativement
                          au développement économique du pays.
                        </p>
                        <div className="flex items-center">
                          <div className="bg-gray-300 h-12 w-12 rounded-full mr-4"></div>
                          <div>
                            <p className="font-semibold">Nom du Témoin</p>
                            <p
                              className="text-sm"
                              style={{ color: "var(--color-text-secondary)" }}
                            >
                              Entreprise / Poste
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card
                      className="border-none"
                      style={{ backgroundColor: "var(--color-bg)" }}
                    >
                      <CardContent className="pt-6">
                        <div
                          className="text-3xl mb-4"
                          style={{ color: "var(--color-primary)" }}
                        >
                          "
                        </div>
                        <p
                          className="mb-6 italic"
                          style={{ color: "var(--color-text-secondary)" }}
                        >
                          La plateforme digitale de la CPU-PME.CI a transformé
                          notre façon de travailler. Les opportunités
                          d'affaires, les formations en ligne et les ressources
                          mises à disposition nous ont permis de renforcer nos
                          compétences et d'accélérer notre croissance.
                        </p>
                        <div className="flex items-center">
                          <div className="bg-gray-300 h-12 w-12 rounded-full mr-4"></div>
                          <div>
                            <p className="font-semibold">Nom du Témoin</p>
                            <p
                              className="text-sm"
                              style={{ color: "var(--color-text-secondary)" }}
                            >
                              Entreprise / Poste
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
