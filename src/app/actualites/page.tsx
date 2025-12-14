"use client";

import { useState, useEffect, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Calendar,
  Search,
  Clock,
  ArrowRight,
  Filter,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  FileText,
  Download,
  X,
} from "lucide-react";
import actualites1 from "@/assets/actualites1.png";
import actualites2 from "@/assets/actualites2.png";
import actualites3 from "@/assets/actualites3.png";
import actualites4 from "@/assets/actualites4.png";
import Image from "next/image";

const NewsContent = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeMainTab = searchParams?.get("tab") || "actualites";
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const itemsPerPage = 9;

  // Données d'actualités (réattribuées aux nouvelles catégories)
  const newsData = [
    {
      id: "1",
      titre:
        "Réunion à Man pour soutenir le développement du secteur vivrier en Côte d'Ivoire",
      description:
        "Le 12 avril 2025, la CPU-PME.CI s'est réunie à Man pour soutenir la Présidente Gbakayoro qui, malgré des moyens limités, fait preuve d'une résilience remarquable dans le développement du secteur du vivrier en Côte d'Ivoire.",
      categorie: "regions",
      created_at: Date.now() - 86400000 * 2,
      couverture: {
        url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      },
    },
    {
      id: "2",
      titre:
        "Rencontre fructueuse entre la Délégation de l'Union Européenne en Côte d'Ivoire et la CPU-PME.CI pour le développement des PME ivoiriennes",
      description:
        "La Délégation de l'Union Européenne en Côte d'Ivoire et la Confédération Patronale Unique des PME de Côte d'Ivoire (CPU-PME.CI) ont échangé ce jour de 10h à 12h dans les locaux de l'institution européenne. Les discussions ont porté sur des sujets clés pour le développement des PME ivoiriennes, ainsi que pour l'économie locale et sous-régionale. La première puissance patronale de Côte d'Ivoire s'est félicitée de la qualité des échanges et a réitéré ses sincères remerciements à SEM Mme l'Ambassadrice Francesca Di Mauro, représentante de la Délégation de l'Union européenne près la République de Côte d'Ivoire. Pour le Dr Elias Farakhan Moussa Diomandé, président de la CPU-PME.CI, cette première rencontre ouvre de belles perspectives pour les PME ivoiriennes, avec des chantiers prometteurs à venir. Les échanges ont été jugés fructueux, annonçant une collaboration renforcée pour soutenir la croissance et la compétitivité des PME en Côte d'Ivoire.",
      categorie: "cpu-pme",
      created_at: Date.now() - 86400000 * 5,
      couverture: {
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
      },
    },
    {
      id: "3",
      titre: "Le Gala des PME-CI est officiellement lancé !",
      description:
        "Ce mercredi 23 avril, nous avons donné le coup d'envoi de la 4ᵉ édition du Gala des PME de Côte d'Ivoire, lors d'un lancement réussi à la Chambre de Commerce et d'Industrie. Une édition placée sous le signe de l'ambition, de la résilience et de la transformation des PME ivoiriennes.Le rendez-vous est pris : 20 & 21 juin 2025 au Sofitel Hôtel Ivoire.Cet événement majeur rassemblera les acteurs clés de l'écosystème entrepreneurial ivoirien pour célébrer l'excellence et l'innovation dans le secteur des PME.Au programme : conférences de haut niveau, ateliers thématiques, remise de prix et opportunités de networking.",
      categorie: "evenements",
      created_at: Date.now() - 86400000 * 10,
      couverture: {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      },
    },
    {
      id: "4",
      titre: "ECONOMIE BLEUE, LA PÊCHE",
      description:
        "C'était le mercredi dernier 24 Avril 2025 à la Patinoire de Sofitel Hôtel l'Ivoire. La CPU-PME.CI a été invitée par l'Union Européenne au cours de la séance de travail avec la Délégation UE Abidjan à prendre part aux échanges avec les acteurs de l'Economie Bleue. l s'agit de l'écosystème des ressources animales, halieutiques et notamment des pêches et ses démembrements. La cérémonie a été placée sous la présidence du Premier Ministre BEUGRE MANBE et le patronage du Ministre Sidi Tiemoko TOURE, Ministère de tutelle et sous l'égide de la FAO, la BAD et l'UE.Le Président Dr DIOMANDE Moussa Elias Farakhan a participé aux différents panels, a visité stand par stand pour mieux s'imprégner du milieu aquatique, aquarium, aquaculture. Ce que nous avons découvert est impressionnant et encouragent.Le Président a échangé personnellement avec les Jeunes de la Société Coopérative Simplifiée des Jeunes Aquaculteurs du Poro 'SCOOPS JA PORO', un véritable vivier de Champions Nationaux.Nous avons eu de nombreux échanges avec les acteurs, les producteurs d'engrais, les marailleurs et l'Interprofession de la Filière Pêche et le FIRCA.Ce fut une journée rude pour nous mais riche en perspective pour la CPU-PME.CI. Les Contact pris au niveau national et international seront mis à la disposition de nos membres du Secteur Pêche.",
      categorie: "filieres",
      created_at: Date.now() - 86400000 * 18,
      couverture: {
        url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
      },
    },
    {
      id: "5",
      titre: "Nouvelle réglementation pour les entreprises du secteur agricole",
      description:
        "Le gouvernement a adopté une nouvelle réglementation pour les entreprises du secteur agricole. Cette réglementation vise à simplifier les procédures administratives et à faciliter l'accès au foncier pour les PME du secteur. La CPU-PME.CI salue cette initiative qui répond à plusieurs de ses recommandations formulées lors des assises de l'agriculture en 2024.",
      categorie: "reglementation",
      created_at: Date.now() - 86400000 * 7,
      couverture: {
        url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
      },
    },

    {
      id: "6",
      titre: "Lancement du nouveau programme de financement pour les PME",
      description:
        "Le ministère de l'Économie et des Finances a lancé un nouveau programme de financement destiné aux PME ivoiriennes. Ce programme, d'un montant global de 100 milliards de FCFA, vise à soutenir la croissance et le développement des petites et moyennes entreprises dans tous les secteurs d'activité. La CPU-PME.CI a participé activement à la conception de ce programme et assurera un rôle clé dans sa mise en œuvre.",
      categorie: "opportunites",
      created_at: Date.now() - 86400000 * 20,
      couverture: {
        url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
      },
    },
    {
      id: "7",
      titre:
        "Forum National sur l'Économie Bleue : Les PME au cœur de la stratégie nationale",
      description:
        "Le Forum National sur l'Économie Bleue s'est tenu du 20 au 22 Mars 2025 au Palais des Congrès d'Abidjan. Plus de 500 participants issus du secteur privé, des organisations internationales et des institutions gouvernementales ont pris part à cet événement majeur. La CPU-PME.CI a présenté sa vision pour l'intégration des PME dans la stratégie nationale de développement de l'économie bleue. Plusieurs recommandations ont été formulées, notamment la création d'un fonds d'appui spécifique aux PME du secteur maritime et halieutique.",
      categorie: "evenements",
      created_at: Date.now() - 86400000 * 25,
      couverture: {
        url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
      },
    },
    {
      id: "8",
      titre:
        "Forum national des entrepreneurs : les inscriptions sont ouvertes",
      description:
        "Le Forum national des entrepreneurs se tiendra du 5 au 7 avril 2025 à Abidjan. Les inscriptions sont désormais ouvertes pour tous les entrepreneurs et porteurs de projets souhaitant participer à cet événement majeur. Au programme : conférences, ateliers pratiques, networking et rencontres avec des investisseurs.",
      categorie: "evenements",
      created_at: Date.now() - 86400000 * 30,
      couverture: {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      },
    },
  ];

  // Données de publications (nouvelles)
  const publicationsData = [
    {
      id: "pub-1",
      titre: "Plan Stratégique 2025-2030 de la CPU-PME.CI",
      description:
        "Document stratégique définissant les orientations et objectifs de la CPU-PME.CI pour les cinq prochaines années, avec un focus sur l'innovation, la digitalisation et l'accompagnement des PME ivoiriennes.",
      categorie: "strategie",
      created_at: Date.now() - 86400000 * 3,
      type: "document",
      fileUrl: "/documents/plan-strategique-2025-2030.pdf",
      fileSize: "2.5 MB",
    },
    {
      id: "pub-2",
      titre: "Rapport annuel 2024 : Observatoire des PME en Côte d'Ivoire",
      description:
        "Analyse complète du tissu économique des PME ivoiriennes, incluant des données statistiques, des tendances sectorielles et des recommandations pour soutenir la croissance du secteur privé.",
      categorie: "observatoire",
      created_at: Date.now() - 86400000 * 15,
      type: "document",
      fileUrl: "/documents/rapport-observatoire-2024.pdf",
      fileSize: "4.8 MB",
    },
    {
      id: "pub-3",
      titre:
        "Guide pratique : Comment créer et développer sa PME en Côte d'Ivoire",
      description:
        "Guide complet destiné aux entrepreneurs, couvrant toutes les étapes de la création d'entreprise, de l'idée initiale jusqu'au développement et à la pérennisation de l'activité.",
      categorie: "guides",
      created_at: Date.now() - 86400000 * 8,
      type: "card",
      couverture: {
        url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop",
      },
    },
    {
      id: "pub-4",
      titre: "Plaidoyer pour un accès facilité au financement des PME",
      description:
        "Document de plaidoyer présenté aux institutions financières et au gouvernement, proposant des mesures concrètes pour améliorer l'accès des PME au crédit et aux mécanismes de financement.",
      categorie: "plaidoyer",
      created_at: Date.now() - 86400000 * 12,
      type: "document",
      fileUrl: "/documents/plaidoyer-financement-pme.pdf",
      fileSize: "1.9 MB",
    },
    {
      id: "pub-5",
      titre: "Étude : Impact de la digitalisation sur les PME ivoiriennes",
      description:
        "Étude menée en partenariat avec l'Union Européenne analysant l'impact de la transformation numérique sur la compétitivité et la croissance des PME en Côte d'Ivoire.",
      categorie: "etudes",
      created_at: Date.now() - 86400000 * 20,
      type: "card",
      couverture: {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      },
    },
    {
      id: "pub-6",
      titre: "Synthèse du Gala des PME 2024",
      description:
        "Document de synthèse reprenant les temps forts, les lauréats et les principales recommandations issues de la 3ème édition du Gala des PME qui s'est tenu en juin 2024.",
      categorie: "syntheses",
      created_at: Date.now() - 86400000 * 25,
      type: "document",
      fileUrl: "/documents/synthese-gala-pme-2024.pdf",
      fileSize: "3.2 MB",
    },
  ];

  const isLoading = false;

  // Catégories d'actualités (nouvelles catégories)
  const categoriesActualites = [
    { id: "all", name: "Toutes" },
    { id: "cpu-pme", name: "CPU-PME institutionnel" },
    { id: "filieres", name: "Filières" },
    { id: "regions", name: "Régions" },
    { id: "opportunites", name: "Opportunités PME" },
    { id: "reglementation", name: "Réglementation & alertes" },
    { id: "evenements", name: "Événements (annonces)" },
  ];

  // Catégories de publications
  const categoriesPublications = [
    { id: "all", name: "Toutes" },
    { id: "strategie", name: "Stratégie & plans" },
    { id: "observatoire", name: "Observatoire & rapports" },
    { id: "guides", name: "Guides PME" },
    { id: "plaidoyer", name: "Plaidoyer" },
    { id: "etudes", name: "Études partenaires" },
    { id: "syntheses", name: "Synthèses d'événements" },
  ];

  // Variable dynamique pour les catégories selon l'onglet actif
  const categories =
    activeMainTab === "actualites"
      ? categoriesActualites
      : categoriesPublications;

  // Fonction pour obtenir l'image selon l'ID
  const getNewsImage = (id: string) => {
    const images: { [key: string]: any } = {
      "1": actualites1,
      "2": actualites2,
      "3": actualites3,
      "4": actualites4,
    };
    return images[id] || null;
  };

  // Données dynamiques selon l'onglet actif
  const currentData =
    activeMainTab === "actualites" ? newsData : publicationsData;

  // Filtrer les actualités ou publications
  const filteredNews = (currentData || []).filter((item) => {
    const matchesSearch =
      item.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.categorie === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedNews = filteredNews.slice(startIndex, endIndex);

  // Actualités en vedette (les 2 premières)
  const featuredNews = (newsData || []).slice(0, 2);

  const formatDate = (timestamp: number | string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  // Fonctions de navigation du carousel
  const nextFeatured = () => {
    setCurrentFeaturedIndex((prevIndex) =>
      prevIndex === featuredNews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevFeatured = () => {
    setCurrentFeaturedIndex((prevIndex) =>
      prevIndex === 0 ? featuredNews.length - 1 : prevIndex - 1
    );
  };

  const goToFeatured = (index: number) => {
    setCurrentFeaturedIndex(index);
  };

  // Auto-play du carousel
  useEffect(() => {
    if (featuredNews.length <= 1) return;

    const interval = setInterval(() => {
      nextFeatured();
    }, 5000); // Change toutes les 5 secondes

    return () => clearInterval(interval);
  }, [currentFeaturedIndex, featuredNews.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[550px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Actualités"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white animate-in fade-in duration-1000">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
            Actualités & Publications
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Restez informés sur l'actualité du CPU-PME et accédez à nos
            publications : rapports, guides, études et documents stratégiques
          </p>
        </div>
      </section>

      {/* Onglets principaux : Actualités et Publications */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <Tabs value={activeMainTab} className="w-full">
            {/* <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-12">
              <TabsTrigger
                value="actualites"
                onClick={() => {
                  router.push("/actualites?tab=actualites");
                  setSelectedCategory("all");
                  setCurrentPage(1);
                }}
                className="text-base font-semibold"
              >
                Actualités
              </TabsTrigger>
              <TabsTrigger
                value="publications"
                onClick={() => {
                  router.push("/actualites?tab=publications");
                  setSelectedCategory("all");
                  setCurrentPage(1);
                }}
                className="text-base font-semibold"
              >
                Publications
              </TabsTrigger>
            </TabsList> */}

            <TabsContent value="actualites" className="mt-0">
              {/* Actualités en vedette */}
              {featuredNews.length > 0 && (
                <section className="py-16 bg-gradient-to-b from-white to-slate-50">
                  <div className="container mx-auto px-1">
                    <div className="flex items-center gap-3 mb-10">
                      <div className="flex-shrink-0 w-1 h-8 bg-primary rounded-full"></div>
                      <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
                        À la une
                      </h2>
                    </div>

                    {/* Carousel Container */}
                    <div className="relative max-w-9xl mx-auto">
                      {/* Carousel Slide */}
                      <div className="overflow-hidden">
                        <div
                          className="flex transition-transform duration-500 ease-out"
                          style={{
                            transform: `translateX(-${
                              currentFeaturedIndex * 100
                            }%)`,
                          }}
                        >
                          {isLoading ? (
                            <div className="min-w-full px-2">
                              <Card className="overflow-hidden animate-pulse border-0 bg-white">
                                <div className="h-[500px] md:h-[600px] bg-gray-200" />
                              </Card>
                            </div>
                          ) : (
                            featuredNews.map((news) => (
                              <div key={news.id} className="min-w-full px-2">
                                <Card
                                  className="overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group border-0 bg-white"
                                  onClick={() =>
                                    router.push(`/actualites/${news.id}`)
                                  }
                                >
                                  <div className="relative overflow-hidden h-[500px] md:h-[600px]">
                                    {getNewsImage(news.id) ? (
                                      <Image
                                        src={getNewsImage(news.id)}
                                        alt={news.titre}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                      />
                                    ) : (
                                      <div className="w-full h-full bg-slate-200 flex flex-col items-center justify-center text-slate-500">
                                        <ImageOff className="h-24 w-24 mb-4" />
                                        <p className="text-lg font-medium">
                                          Image non disponible
                                        </p>
                                      </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                                    {/* Badges */}
                                    <div className="absolute top-6 left-6 flex gap-2">
                                      <Badge className="bg-primary text-white shadow-lg backdrop-blur-sm px-4 py-1.5">
                                        À la une
                                      </Badge>
                                      <Badge className="bg-white/90 text-slate-900 shadow-lg backdrop-blur-sm px-4 py-1.5">
                                        {getCategoryName(news.categorie)}
                                      </Badge>
                                    </div>

                                    {/* Contenu superposé */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                                      <div className="max-w-3xl">
                                        <div className="flex items-center gap-4 text-sm mb-4 text-white/90">
                                          <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span className="font-medium">
                                              {formatDate(news.created_at)}
                                            </span>
                                          </div>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-heading font-bold mb-4 line-clamp-2 group-hover:text-primary-foreground transition-colors">
                                          {news.titre}
                                        </h3>

                                        <p className="text-white/90 text-lg mb-6 line-clamp-3">
                                          {news.description}
                                        </p>
                                        <div className="flex items-center text-base font-semibold group-hover:gap-3 gap-2 transition-all">
                                          <span>Lire l'article</span>
                                          <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Boutons de navigation */}
                      <button
                        onClick={prevFeatured}
                        className="absolute left-4 top-[50%] -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
                        aria-label="Actualité précédente"
                      >
                        <ChevronLeft className="h-6 w-6 text-slate-900" />
                      </button>
                      <button
                        onClick={nextFeatured}
                        className="absolute right-4 top-[50%] -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 z-10"
                        aria-label="Actualité suivante"
                      >
                        <ChevronRight className="h-6 w-6 text-slate-900" />
                      </button>

                      {/* Indicateurs de pagination */}
                      <div className="flex justify-center gap-2 mt-6">
                        {featuredNews.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToFeatured(index)}
                            className={`h-2 rounded-full transition-all ${
                              index === currentFeaturedIndex
                                ? "w-8 bg-primary"
                                : "w-2 bg-slate-300 hover:bg-slate-400"
                            }`}
                            aria-label={`Aller à l'actualité ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Filtres et recherche */}
              <section className="py-12 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4">
                  {/* Recherche */}
                  <div className="mb-8">
                    <div className="relative max-w-2xl mx-auto">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="Rechercher une actualité..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="pl-12 h-14 border-slate-200 bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  {/* Filtres par catégorie - Version Desktop */}
                  <div className="hidden md:flex flex-col items-center gap-4">
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                      {categories.map((category) => (
                        <Button
                          key={category.id}
                          variant={
                            selectedCategory === category.id
                              ? "default"
                              : "secondary"
                          }
                          size="sm"
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setCurrentPage(1);
                          }}
                          className={`rounded-sm px-5 py-2 transition-all font-medium ${
                            selectedCategory === category.id
                              ? "shadow-md scale-105"
                              : "hover:scale-105 bg-white border-0 text-slate-700 hover:bg-primary/10 hover:text-primary"
                          }`}
                        >
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Résultats de recherche */}
                  {(searchTerm || selectedCategory !== "all") && (
                    <div className="mt-6 text-center text-sm text-slate-600">
                      <span className="font-semibold text-primary">
                        {filteredNews.length}
                      </span>{" "}
                      {filteredNews.length > 1
                        ? "actualité(s) trouvée(s)"
                        : "actualité(s) trouvée(s)"}
                    </div>
                  )}
                </div>

                {/* Bouton flottant pour filtres - Mobile uniquement */}
                <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
                  <SheetTrigger asChild>
                    <Button
                      className="md:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40 bg-white hover:bg-white/90"
                      size="icon"
                    >
                      <Filter className="h-6 w-6 text-primary" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl bg-white">
                    <SheetHeader className="mb-6">
                      <SheetTitle className="text-2xl font-bold text-center">
                        Filtrer les actualités
                      </SheetTitle>
                      <SheetDescription className="text-center">
                        Sélectionnez une catégorie pour filtrer les actualités
                      </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(80vh-120px)] pb-6">
                      {categories.map((category) => (
                        <Button
                          key={category.id}
                          variant={
                            selectedCategory === category.id
                              ? "default"
                              : "outline"
                          }
                          size="lg"
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setCurrentPage(1);
                            setIsFilterSheetOpen(false);
                          }}
                          className={`w-full justify-start text-left h-14 text-base font-medium ${
                            selectedCategory === category.id
                              ? "shadow-md"
                              : ""
                          }`}
                        >
                          {category.name}
                          {selectedCategory === category.id && (
                            <span className="ml-auto">✓</span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </section>

              {/* Liste des actualités */}
              <section className="py-16">
                <div className="container mx-auto px-4">
                  {paginatedNews.length > 0 ? (
                    <>
                      {/* Titre de section */}
                      <div className="flex items-center gap-3 mb-10">
                        <div className="flex-shrink-0 w-1 h-8 bg-slate-400 rounded-full"></div>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tight text-slate-800">
                          Toutes les actualités
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {isLoading
                          ? Array.from({ length: 9 }).map((_, index) => (
                              <Card
                                key={index}
                                className="overflow-hidden animate-pulse border-0 bg-white"
                              >
                                <div className="h-52 bg-gray-200" />
                                <CardContent className="p-6">
                                  <div className="h-4 bg-gray-200 rounded mb-3 w-2/3" />
                                  <div className="h-6 bg-gray-200 rounded mb-3" />
                                  <div className="h-4 bg-gray-200 rounded mb-2" />
                                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                                </CardContent>
                              </Card>
                            ))
                          : paginatedNews.map((news) => (
                              <Card
                                key={news.id}
                                className="overflow-hidden transition-all duration-300 cursor-pointer group border-0 bg-white flex flex-col"
                                onClick={() =>
                                  router.push(`/actualites/${news.id}`)
                                }
                              >
                                <div className="relative h-52 overflow-hidden">
                                  {getNewsImage(news.id) ? (
                                    <Image
                                      src={getNewsImage(news.id)}
                                      alt={news.titre}
                                      fill
                                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-slate-200 flex flex-col items-center justify-center text-slate-500">
                                      <ImageOff className="h-16 w-16 mb-2" />
                                      <p className="text-sm font-medium">
                                        Image non disponible
                                      </p>
                                    </div>
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                  {/* Badge catégorie */}
                                  <div className="absolute top-3 right-3">
                                    <Badge className="bg-white/95 text-slate-900 shadow-md backdrop-blur-sm border-0 font-medium">
                                      {getCategoryName(news.categorie)}
                                    </Badge>
                                  </div>
                                </div>

                                <CardContent className="p-6 flex flex-col flex-grow">
                                  {/* Métadonnées */}
                                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 font-medium">
                                    <div className="flex items-center gap-1.5">
                                      <Calendar className="h-3.5 w-3.5" />
                                      <span>{formatDate(news.created_at)}</span>
                                    </div>
                                  </div>

                                  {/* Titre */}
                                  <h3 className="text-xl font-heading font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                                    {news.titre}
                                  </h3>

                                  {/* Extrait */}
                                  <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed flex-grow">
                                    {news.description}
                                  </p>

                                  {/* Ligne de séparation */}
                                  <div className="w-full h-px bg-slate-100 mb-4"></div>

                                  {/* Lien de lecture */}
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-primary group-hover:underline">
                                      Lire la suite
                                    </span>
                                    <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-2 transition-transform" />
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-8">
                          <Button
                            variant="outline"
                            size="default"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="rounded-full"
                          >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Précédent
                          </Button>

                          <div className="flex gap-2">
                            {Array.from(
                              { length: totalPages },
                              (_, i) => i + 1
                            ).map((page) => (
                              <Button
                                key={page}
                                variant={
                                  currentPage === page ? "default" : "outline"
                                }
                                size="default"
                                onClick={() => setCurrentPage(page)}
                                className={`rounded-full w-10 h-10 p-0 ${
                                  currentPage === page ? "shadow-md" : ""
                                }`}
                              >
                                {page}
                              </Button>
                            ))}
                          </div>

                          <Button
                            variant="outline"
                            size="default"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="rounded-full"
                          >
                            Suivant
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                      <div className="max-w-md mx-auto">
                        <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-xl font-semibold text-slate-800 mb-2">
                          Aucun résultat trouvé
                        </p>
                        <p className="text-slate-600">
                          Aucune actualité trouvée
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </TabsContent>

            {/* Onglet Publications */}
            <TabsContent value="publications" className="mt-0">
              {/* Filtres et recherche pour publications */}
              <section className="py-12 border-y border-slate-100">
                <div className="container mx-auto px-4">
                  {/* Recherche */}
                  <div className="mb-8">
                    <div className="relative max-w-2xl mx-auto">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="Rechercher une publication..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="pl-12 h-14 border-slate-200 bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  {/* Filtres par catégorie - Version Desktop */}
                  <div className="hidden md:flex flex-col items-center gap-4">
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                      {categoriesPublications.map((category) => (
                        <Button
                          key={category.id}
                          variant={
                            selectedCategory === category.id
                              ? "default"
                              : "secondary"
                          }
                          size="sm"
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setCurrentPage(1);
                          }}
                          className={`rounded-sm px-5 py-2 transition-all font-medium ${
                            selectedCategory === category.id
                              ? "shadow-md scale-105"
                              : "hover:scale-105 bg-white border-0 text-slate-700 hover:bg-primary/10 hover:text-primary"
                          }`}
                        >
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Résultats de recherche */}
                  {(searchTerm || selectedCategory !== "all") && (
                    <div className="mt-6 text-center text-sm text-slate-600">
                      <span className="font-semibold text-primary">
                        {filteredNews.length}
                      </span>{" "}
                      {filteredNews.length > 1
                        ? "publication(s) trouvée(s)"
                        : "publication(s) trouvée(s)"}
                    </div>
                  )}
                </div>

                {/* Bouton flottant pour filtres - Mobile uniquement */}
                <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
                  <SheetTrigger asChild>
                    <Button
                      className="md:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40 bg-white hover:bg-white"
                      size="icon"
                    >
                      <Filter className="h-6 w-6 text-primary" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl bg-white">
                    <SheetHeader className="mb-6">
                      <SheetTitle className="text-2xl font-bold text-center">
                        Filtrer les publications
                      </SheetTitle>
                      <SheetDescription className="text-center">
                        Sélectionnez une catégorie pour filtrer les publications
                      </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(80vh-120px)] pb-6">
                      {categoriesPublications.map((category) => (
                        <Button
                          key={category.id}
                          variant={
                            selectedCategory === category.id
                              ? "default"
                              : "outline"
                          }
                          size="lg"
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setCurrentPage(1);
                            setIsFilterSheetOpen(false);
                          }}
                          className={`w-full justify-start text-left h-14 text-base font-medium ${
                            selectedCategory === category.id
                              ? "shadow-md"
                              : ""
                          }`}
                        >
                          {category.name}
                          {selectedCategory === category.id && (
                            <span className="ml-auto">✓</span>
                          )}
                        </Button>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </section>

              {/* Liste des publications */}
              <section className="py-16">
                <div className="container mx-auto px-4">
                  {paginatedNews.length > 0 ? (
                    <>
                      {/* Titre de section */}
                      <div className="flex items-center gap-3 mb-10">
                        <div className="flex-shrink-0 w-1 h-8 bg-slate-400 rounded-full"></div>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold tracking-tight text-slate-800">
                          Toutes les publications
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {paginatedNews.map((publication: any) =>
                          publication.type === "document" ? (
                            // Format document avec téléchargement et preview
                            <Card
                              key={publication.id}
                              className="overflow-hidden transition-all duration-300 cursor-pointer group border-0 bg-white hover:shadow-xl flex flex-col"
                            >
                              {/* Preview du document */}
                              <div className="relative h-52 overflow-hidden bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                                  {/* Icône PDF */}
                                  <div className="relative">
                                    <FileText
                                      className="h-24 w-24 text-red-600 group-hover:scale-110 transition-transform duration-300"
                                      strokeWidth={1.5}
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                                      PDF
                                    </div>
                                  </div>
                                </div>

                                {/* Overlay au hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Badge catégorie */}
                                <div className="absolute top-3 right-3">
                                  <Badge className="bg-white/95 text-slate-900 shadow-md backdrop-blur-sm border-0 font-medium">
                                    {getCategoryName(publication.categorie)}
                                  </Badge>
                                </div>
                              </div>

                              <CardContent className="p-6 flex flex-col flex-grow">
                                {/* Métadonnées */}
                                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 font-medium">
                                  <div className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>
                                      {formatDate(publication.created_at)}
                                    </span>
                                  </div>
                                </div>

                                {/* Titre */}
                                <h3 className="text-xl font-heading font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                                  {publication.titre}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed flex-grow">
                                  {publication.description}
                                </p>

                                {/* Ligne de séparation */}
                                <div className="w-full h-px bg-slate-100 mb-4"></div>

                                {/* Bouton de téléchargement */}
                                <Button
                                  variant="outline"
                                  className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Logique de téléchargement ici
                                    window.open(publication.fileUrl, "_blank");
                                  }}
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Télécharger le PDF
                                </Button>
                              </CardContent>
                            </Card>
                          ) : (
                            // Format carte visuelle classique
                            <Card
                              key={publication.id}
                              className="overflow-hidden transition-all duration-300 cursor-pointer group border-0 bg-white flex flex-col"
                              onClick={() =>
                                router.push(`/actualites/${publication.id}`)
                              }
                            >
                              <div className="relative h-52 overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                                  <FileText className="h-20 w-20 text-primary/40" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Badge catégorie */}
                                <div className="absolute top-3 right-3">
                                  <Badge className="bg-white/95 text-slate-900 shadow-md backdrop-blur-sm border-0 font-medium">
                                    {getCategoryName(publication.categorie)}
                                  </Badge>
                                </div>
                              </div>

                              <CardContent className="p-6 flex flex-col flex-grow">
                                {/* Métadonnées */}
                                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 font-medium">
                                  <div className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>
                                      {formatDate(publication.created_at)}
                                    </span>
                                  </div>
                                </div>

                                {/* Titre */}
                                <h3 className="text-xl font-heading font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                                  {publication.titre}
                                </h3>

                                {/* Extrait */}
                                <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed flex-grow">
                                  {publication.description}
                                </p>

                                {/* Ligne de séparation */}
                                <div className="w-full h-px bg-slate-100 mb-4"></div>

                                {/* Lien de lecture */}
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-semibold text-primary group-hover:underline">
                                    Lire la suite
                                  </span>
                                  <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-2 transition-transform" />
                                </div>
                              </CardContent>
                            </Card>
                          )
                        )}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-8">
                          <Button
                            variant="outline"
                            size="default"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="rounded-full"
                          >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            Précédent
                          </Button>

                          <div className="flex gap-2">
                            {Array.from(
                              { length: totalPages },
                              (_, i) => i + 1
                            ).map((page) => (
                              <Button
                                key={page}
                                variant={
                                  currentPage === page ? "default" : "outline"
                                }
                                size="default"
                                onClick={() => setCurrentPage(page)}
                                className={`rounded-full w-10 h-10 p-0 ${
                                  currentPage === page ? "shadow-md" : ""
                                }`}
                              >
                                {page}
                              </Button>
                            ))}
                          </div>

                          <Button
                            variant="outline"
                            size="default"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="rounded-full"
                          >
                            Suivant
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
                      <div className="max-w-md mx-auto">
                        <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-xl font-semibold text-slate-800 mb-2">
                          Aucun résultat trouvé
                        </p>
                        <p className="text-slate-600">
                          Aucune publication trouvée
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

const News = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement...</p>
        </div>
      </div>
    }>
      <NewsContent />
    </Suspense>
  );
};

export default News;
