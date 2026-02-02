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
  File,
  FileImage,
  FileSpreadsheet,
  FileVideo,
  FileAudio,
  Archive,
} from "lucide-react";
import Image from "next/image";
import { useActualities, usePublications } from "@/hooks/use-api";

// Fonction utilitaire pour obtenir les informations sur le type de fichier
function getFileTypeInfo(fileUrl: string | null, publicationType?: string) {
  if (!fileUrl) {
    return {
      icon: File,
      label: "Fichier",
      color: "text-gray-600",
      bgGradient: "from-gray-50 via-gray-100 to-gray-50",
      badgeColor: "bg-gray-600",
    };
  }

  // Obtenir l'extension du fichier
  const extension = fileUrl.split('.').pop()?.toLowerCase() || '';

  // Types de fichiers supportés
  const fileTypes: Record<string, {
    icon: any;
    label: string;
    color: string;
    bgGradient: string;
    badgeColor: string;
  }> = {
    // PDF
    'pdf': {
      icon: FileText,
      label: 'PDF',
      color: 'text-red-600',
      bgGradient: 'from-red-50 via-orange-50 to-amber-50',
      badgeColor: 'bg-red-600',
    },
    // Images
    'jpg': {
      icon: FileImage,
      label: 'IMAGE',
      color: 'text-blue-600',
      bgGradient: 'from-blue-50 via-cyan-50 to-sky-50',
      badgeColor: 'bg-blue-600',
    },
    'jpeg': {
      icon: FileImage,
      label: 'IMAGE',
      color: 'text-blue-600',
      bgGradient: 'from-blue-50 via-cyan-50 to-sky-50',
      badgeColor: 'bg-blue-600',
    },
    'png': {
      icon: FileImage,
      label: 'PNG',
      color: 'text-blue-600',
      bgGradient: 'from-blue-50 via-cyan-50 to-sky-50',
      badgeColor: 'bg-blue-600',
    },
    'gif': {
      icon: FileImage,
      label: 'GIF',
      color: 'text-blue-600',
      bgGradient: 'from-blue-50 via-cyan-50 to-sky-50',
      badgeColor: 'bg-blue-600',
    },
    'webp': {
      icon: FileImage,
      label: 'IMAGE',
      color: 'text-blue-600',
      bgGradient: 'from-blue-50 via-cyan-50 to-sky-50',
      badgeColor: 'bg-blue-600',
    },
    // Word
    'doc': {
      icon: FileText,
      label: 'DOC',
      color: 'text-blue-700',
      bgGradient: 'from-blue-50 via-indigo-50 to-blue-100',
      badgeColor: 'bg-blue-700',
    },
    'docx': {
      icon: FileText,
      label: 'WORD',
      color: 'text-blue-700',
      bgGradient: 'from-blue-50 via-indigo-50 to-blue-100',
      badgeColor: 'bg-blue-700',
    },
    // Excel
    'xls': {
      icon: FileSpreadsheet,
      label: 'XLS',
      color: 'text-green-700',
      bgGradient: 'from-green-50 via-emerald-50 to-green-100',
      badgeColor: 'bg-green-700',
    },
    'xlsx': {
      icon: FileSpreadsheet,
      label: 'EXCEL',
      color: 'text-green-700',
      bgGradient: 'from-green-50 via-emerald-50 to-green-100',
      badgeColor: 'bg-green-700',
    },
    'csv': {
      icon: FileSpreadsheet,
      label: 'CSV',
      color: 'text-green-700',
      bgGradient: 'from-green-50 via-emerald-50 to-green-100',
      badgeColor: 'bg-green-700',
    },
    // PowerPoint
    'ppt': {
      icon: FileText,
      label: 'PPT',
      color: 'text-orange-600',
      bgGradient: 'from-orange-50 via-amber-50 to-orange-100',
      badgeColor: 'bg-orange-600',
    },
    'pptx': {
      icon: FileText,
      label: 'POWERPOINT',
      color: 'text-orange-600',
      bgGradient: 'from-orange-50 via-amber-50 to-orange-100',
      badgeColor: 'bg-orange-600',
    },
    // Vidéos
    'mp4': {
      icon: FileVideo,
      label: 'VIDÉO',
      color: 'text-purple-600',
      bgGradient: 'from-purple-50 via-violet-50 to-purple-100',
      badgeColor: 'bg-purple-600',
    },
    'avi': {
      icon: FileVideo,
      label: 'VIDÉO',
      color: 'text-purple-600',
      bgGradient: 'from-purple-50 via-violet-50 to-purple-100',
      badgeColor: 'bg-purple-600',
    },
    'mov': {
      icon: FileVideo,
      label: 'VIDÉO',
      color: 'text-purple-600',
      bgGradient: 'from-purple-50 via-violet-50 to-purple-100',
      badgeColor: 'bg-purple-600',
    },
    // Audio
    'mp3': {
      icon: FileAudio,
      label: 'AUDIO',
      color: 'text-pink-600',
      bgGradient: 'from-pink-50 via-rose-50 to-pink-100',
      badgeColor: 'bg-pink-600',
    },
    'wav': {
      icon: FileAudio,
      label: 'AUDIO',
      color: 'text-pink-600',
      bgGradient: 'from-pink-50 via-rose-50 to-pink-100',
      badgeColor: 'bg-pink-600',
    },
    // Archives
    'zip': {
      icon: Archive,
      label: 'ZIP',
      color: 'text-yellow-700',
      bgGradient: 'from-yellow-50 via-amber-50 to-yellow-100',
      badgeColor: 'bg-yellow-700',
    },
    'rar': {
      icon: Archive,
      label: 'RAR',
      color: 'text-yellow-700',
      bgGradient: 'from-yellow-50 via-amber-50 to-yellow-100',
      badgeColor: 'bg-yellow-700',
    },
  };

  return fileTypes[extension] || fileTypes['pdf']; // Par défaut PDF
}

const NewsContent = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeMainTab = searchParams?.get("tab") || "actualites";
  const [activeTab, setActiveTab] = useState(activeMainTab);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const itemsPerPage = 9;

  // Appels API
  const {
    data: actualitiesData,
    isLoading: loadingActualities,
    error: errorActualities,
  } = useActualities();
  const {
    data: publicationsData,
    isLoading: loadingPublications,
    error: errorPublications,
  } = usePublications();

  // Mapper les données de l'API au format attendu par le composant
  // et trier du plus récent au plus ancien
  const newsData = (actualitiesData || [])
    .map((actuality) => ({
      id: actuality.id,
      titre: actuality.title,
      description: actuality.content || actuality.title, // Utiliser le titre si content est null
      categorie: actuality.category.toLowerCase(),
      created_at: actuality.publicationDate || actuality.createdAt,
      couverture: {
        url: actuality.imageUrl,
      },
      isFeatured: actuality.isFeatured,
    }))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());


  // Mapper les données des publications et trier du plus récent au plus ancien
  const mappedPublicationsData = (publicationsData || [])
    .map((publication) => ({
      id: publication.id,
      titre: publication.title,
      description: publication.description,
      categorie: publication.category, // Garder la catégorie telle quelle (ex: "Strategy & Plans")
      created_at: publication.publicationDate || publication.createdAt,
      type: publication.type, // Conserver le type original (pdf, article, etc.)
      fileUrl: publication.fileUrl,
      status: publication.status,
      // Les publications n'ont pas d'image de couverture dans l'API
      // On utilise soit le fileUrl (si c'est une image), soit une image par défaut
      couverture: {
        url: publication.fileUrl && /\.(jpg|jpeg|png|gif|webp)$/i.test(publication.fileUrl)
          ? publication.fileUrl
          : getCategoryImage(publication.category),
      },
    }))
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // Fonction pour obtenir une image par défaut selon la catégorie
  function getCategoryImage(category: string) {
    const categoryImages: { [key: string]: string } = {
      "Strategy & Plans": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
      "Observatory & Reports": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "SME Guides": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop",
      "Advocacy": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
      "Partner Studies": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "Event Summaries": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    };
    return categoryImages[category] || "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop";
  }

  // État de chargement combiné
  const isLoading =
    activeTab === "actualites" ? loadingActualities : loadingPublications;

  // Catégories d'actualités (nouvelles catégories)
  const categoriesActualites = [
    { id: "all", name: "Toutes" },
    { id: "institutionnel", name: "CPU-PME institutionnel" },
    { id: "filiere", name: "Filières" },
    { id: "regions", name: "Régions" },
    { id: "opportunites", name: "Opportunités PME" },
    { id: "reglementations", name: "Réglementation & alertes" },
    { id: "evenements", name: "Événements (annonces)" },
  ];

  // Catégories de publications
  const categoriesPublications = [
    { id: "all", name: "Toutes" },
    { id: "Strategy & Plans", name: "Stratégie & plans" },
    { id: "Observatory & Reports", name: "Observatoire & rapports" },
    { id: "SME Guides", name: "Guides PME" },
    { id: "Advocacy", name: "Plaidoyer" },
    { id: "Partner Studies", name: "Études partenaires" },
    { id: "Event Summaries", name: "Synthèses d'événements" },
  ];

  // Variable dynamique pour les catégories selon l'onglet actif
  const categories =
    activeTab === "actualites"
      ? categoriesActualites
      : categoriesPublications;

  // Données dynamiques selon l'onglet actif
  const currentData =
    activeTab === "actualites" ? newsData : mappedPublicationsData;


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
      <section className="relative flex items-center justify-center overflow-hidden min-h-[80vh] h-[400px] md:h-[500px] lg:h-[550px]">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/logo.png"
            alt="Confédération Patronale Unique des PME de Côte d'Ivoire"
            className="w-full h-full object-cover min-h-full"
            style={{ minHeight: '100%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
        </div>

        {/* CONTENU */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full h-full px-4 text-center text-white bg-transparent">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in drop-shadow-md">
            Actualités & Publications
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 animate-fade-in drop-shadow">
            Restez informés sur l'actualité de la CPU-PME et accédez à nos
            publications : rapports, guides, études et documents stratégiques
          </p>
        </div>
      </section>

      {/* Onglets principaux : Actualités et Publications */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-center mb-8">
              <TabsList
                className="
      grid grid-cols-2 md:grid-cols-4
      w-full max-w-5xl
      gap-4
      p-3
      bg-gray-50/50
      rounded-xl
    "
              >
                {[
                  { value: "actualites", label: "Actualites" },
                  { value: "publications", label: "Publication" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="
          w-full
          flex items-center justify-center
          px-6 py-4
          rounded-lg
          font-semibold
          text-sm sm:text-base
          transition-all duration-300
          data-[state=active]:bg-white
          data-[state=active]:text-[#221F1F]
          data-[state=active]:shadow-md
          data-[state=inactive]:bg-slate-100
          data-[state=inactive]:text-gray-600
          hover:bg-slate-200
        "
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* <TabsList className="grid grid-cols-2 md:grid-cols-2 w-full max-w-7xl bg-[#F1F5F9] p-4 rounded-sm">
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
                                    {news.couverture?.url ? (
                                      <img
                                        src={news.couverture.url}
                                        alt={news.titre}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
                                      {/* <Badge className="bg-white/90 text-slate-900 shadow-lg backdrop-blur-sm px-4 py-1.5">
                                        {getCategoryName(news.categorie)}
                                      </Badge> */}
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
                <Sheet
                  open={isFilterSheetOpen}
                  onOpenChange={setIsFilterSheetOpen}
                >
                  <SheetTrigger asChild>
                    <Button
                      className="md:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40 bg-white hover:bg-white/90"
                      size="icon"
                    >
                      <Filter className="h-6 w-6 text-primary" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="bottom"
                    className="h-[80vh] rounded-t-3xl bg-white"
                  >
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
                            selectedCategory === category.id ? "shadow-md" : ""
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
                                className="overflow-hidden animate-pulse border-gray-200 bg-white"
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
                                className="overflow-hidden transition-all duration-300 cursor-pointer group border-gray-200 bg-white flex flex-col"
                                onClick={() =>
                                  router.push(`/actualites/${news.id}`)
                                }
                              >
                                <div className="relative h-52 overflow-hidden">
                                  {news.couverture?.url ? (
                                    <img
                                      src={news.couverture.url}
                                      alt={news.titre}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
                <Sheet
                  open={isFilterSheetOpen}
                  onOpenChange={setIsFilterSheetOpen}
                >
                  <SheetTrigger asChild>
                    <Button
                      className="md:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-40 bg-white hover:bg-white"
                      size="icon"
                    >
                      <Filter className="h-6 w-6 text-primary" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="bottom"
                    className="h-[80vh] rounded-t-3xl bg-white"
                  >
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
                            selectedCategory === category.id ? "shadow-md" : ""
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
                        {paginatedNews.map((publication: any) => {
                          // Obtenir les informations sur le type de fichier
                          const fileInfo = getFileTypeInfo(publication.fileUrl, publication.type);
                          const FileIcon = fileInfo.icon;
                          const isImage = publication.fileUrl && /\.(jpg|jpeg|png|gif|webp)$/i.test(publication.fileUrl);
                          const isPDF = publication.fileUrl && publication.fileUrl.toLowerCase().endsWith('.pdf');
                          const isOfficeDoc = publication.fileUrl && /\.(doc|docx|xls|xlsx|ppt|pptx)$/i.test(publication.fileUrl);

                          return (
                            // Affichage de la publication avec aperçu visuel
                            <Card
                              key={publication.id}
                              className={`overflow-hidden transition-all duration-300 group border-gray-200 bg-white hover:shadow-xl flex flex-col ${
                                isPDF || isOfficeDoc ? '' : 'cursor-pointer'
                              }`}
                              onClick={() => {
                                // Ne rediriger que si ce n'est pas un document (PDF ou Office)
                                if (!isPDF && !isOfficeDoc) {
                                  router.push(`/actualites/${publication.id}`);
                                }
                              }}
                            >
                              {/* Preview du document */}
                              <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${fileInfo.bgGradient}`}>
                                {isImage ? (
                                  // Afficher l'image si c'est un fichier image
                                  <img
                                    src={publication.fileUrl}
                                    alt={publication.titre}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                  />
                                ) : isPDF ? (
                                  // Aperçu du PDF avec iframe
                                  <div className="relative w-full h-full">
                                    <iframe
                                      src={`${publication.fileUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                      className="w-full h-full border-0 pointer-events-none scale-[1.2] origin-top"
                                      title={`Aperçu de ${publication.titre}`}
                                    />
                                    {/* Overlay pour éviter les clics sur l'iframe */}
                                    <div className="absolute inset-0 bg-transparent pointer-events-auto"></div>
                                    {/* Badge PDF en overlay */}
                                    <div className="absolute bottom-3 left-3">
                                      <div className={`${fileInfo.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1`}>
                                        <FileText className="h-3.5 w-3.5" />
                                        {fileInfo.label}
                                      </div>
                                    </div>
                                  </div>
                                ) : isOfficeDoc ? (
                                  // Aperçu des documents Office avec Google Docs Viewer
                                  <div className="relative w-full h-full">
                                    <iframe
                                      src={`https://docs.google.com/viewer?url=${encodeURIComponent(publication.fileUrl)}&embedded=true`}
                                      className="w-full h-full border-0 pointer-events-none"
                                      title={`Aperçu de ${publication.titre}`}
                                    />
                                    {/* Overlay pour éviter les clics sur l'iframe */}
                                    <div className="absolute inset-0 bg-transparent pointer-events-auto"></div>
                                    {/* Badge Type de fichier en overlay */}
                                    <div className="absolute bottom-3 left-3">
                                      <div className={`${fileInfo.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1`}>
                                        <FileIcon className="h-3.5 w-3.5" />
                                        {fileInfo.label}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  // Afficher l'icône pour les autres types de fichiers
                                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                                    {/* Icône dynamique selon le type */}
                                    <div className="relative">
                                      <FileIcon
                                        className={`h-24 w-24 ${fileInfo.color} group-hover:scale-110 transition-transform duration-300`}
                                        strokeWidth={1.5}
                                      />
                                      <div className={`absolute -bottom-2 -right-2 ${fileInfo.badgeColor} text-white text-xs font-bold px-2 py-1 rounded shadow-lg`}>
                                        {fileInfo.label}
                                      </div>
                                    </div>
                                  </div>
                                )}

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

                                {/* Bouton de téléchargement pour documents */}
                                {publication.fileUrl && (isPDF || isOfficeDoc) && (
                                  // Si c'est un document (PDF, Word, Excel, etc.), afficher uniquement le bouton de téléchargement
                                  <Button
                                    variant="outline"
                                    className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                                    onClick={(e) => {
                                      e.stopPropagation();

                                      // Fonction pour télécharger le fichier
                                      const downloadFile = async () => {
                                        try {
                                          // Extraire le nom du fichier de l'URL
                                          const fileName = publication.fileUrl.split('/').pop() || 'document';

                                          // Créer un lien temporaire pour forcer le téléchargement
                                          const link = document.createElement('a');
                                          link.href = publication.fileUrl;
                                          link.download = fileName;
                                          link.target = '_blank';
                                          link.rel = 'noopener noreferrer';

                                          // Ajouter au DOM, cliquer et supprimer
                                          document.body.appendChild(link);
                                          link.click();
                                          document.body.removeChild(link);
                                        } catch (error) {
                                          console.error('Erreur lors du téléchargement:', error);
                                          // En cas d'erreur, ouvrir dans un nouvel onglet
                                          window.open(publication.fileUrl, "_blank");
                                        }
                                      };

                                      downloadFile();
                                    }}
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Télécharger le fichier
                                  </Button>
                                )}

                                {/* Lien de lecture pour images et actualités */}
                                {!isPDF && !isOfficeDoc && (
                                  <div className="flex items-center justify-between cursor-pointer">
                                    <span className="text-sm font-semibold text-primary group-hover:underline">
                                      Lire la suite
                                    </span>
                                    <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-2 transition-transform" />
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          );
                        })}
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
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-slate-600">Chargement...</p>
          </div>
        </div>
      }
    >
      <NewsContent />
    </Suspense>
  );
};

export default News;
