"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Users,
  Building2,
  Search,
  Award,
  Handshake,
  GraduationCap,
  Wallet,
  Megaphone,
  ShoppingBag,
  Headphones,
  Check,
  MapPin,
  Globe,
  Star,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  Grid3x3,
  List,
  RotateCcw,
  Download,
  Share2,
  Factory,
  Wrench,
  Store,
  Briefcase,
  Laptop,
  Truck,
  Hotel,
  Zap,
  Gem,
  Crown,
  Building,
  Percent,
  Filter,
  Menu,
} from "lucide-react";
import {
  membersData,
  sectors,
  regions,
  membershipBenefits,
  membershipPlans,
  Member,
  memberTypes,
  MemberType,
  memberBadges,
} from "./data";
import { secteursData } from "../secteurs/data";
import { sectorToMemberMapping } from "../secteurs/sectorMapping";
import { useToast } from "@/components/ui/use-toast";
import {
  IconBTP,
  IconCommerce,
  IconIndustrie,
  IconServices,
  IconTechnologie,
  IconTransport,
  IconTourisme,
  IconSante,
  IconEnergie,
  IconAgriculture,
} from "@/components/icons/Sectoricons";

// Composant Skeleton pour les cartes
const MemberCardSkeleton = () => (
  <div className="border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col animate-pulse">
    <div className="h-40 bg-gray-200"></div>
    <div className="p-6 flex flex-col flex-1 space-y-4">
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-gray-200 rounded"></div>
        <div className="h-5 w-20 bg-gray-200 rounded"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-8 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  </div>
);

// Données des partenaires Discount +
const discountPartners = [
  {
    id: "orange",
    name: "Orange Côte d'Ivoire",
    logo: "orange",
    logoBg: "bg-orange-500",
    logoText: "text-white",
    offer: "15%",
    description:
      "Réduction de 15% sur les forfaits data mobile et les services de communication pour les entreprises membres.",
    conditions:
      "* Offre valable sur présentation de la carte de membre CPU-PME",
    category: "technologie",
  },
  {
    id: "mtn",
    name: "MTN Côte d'Ivoire",
    logo: "my MTN Côte d'Ivoire",
    logoBg: "bg-yellow-400",
    logoText: "text-gray-800",
    offer: "15%",
    description:
      "Réduction de 15% sur les services data et communication pour les entreprises membres.",
    conditions:
      "* Offre valable sur présentation de la carte de membre CPU-PME",
    category: "technologie",
  },
  {
    id: "ecobank",
    name: "Ecobank",
    logo: "Ecobank The Pan African Bank",
    logoBg: "bg-blue-600",
    logoText: "text-white",
    offer: "1 an sans frais",
    description:
      "Exonération des frais de gestion de compte pendant 1 an pour les nouveaux comptes entreprises.",
    conditions:
      "* Offre valable pour les nouveaux comptes ouverts avec la carte CPU-PME",
    category: "finance",
  },
  {
    id: "nsia",
    name: "NSIA Assurances",
    logo: "NSIA",
    logoBg: "bg-blue-500",
    logoText: "text-white",
    offer: "15%",
    description:
      "Réduction de 15% sur tous les produits d'assurance pour les membres CPU-PME.",
    conditions: "* Offre valable sur présentation de la carte de membre",
    category: "finance",
  },
  {
    id: "aircotedivoire",
    name: "Air Côte d'Ivoire",
    logo: "Air Côte d'Ivoire",
    logoBg: "bg-orange-600",
    logoText: "text-white",
    offer: "15%",
    description:
      "Réduction de 15% sur les billets d'avion pour les voyages d'affaires des membres.",
    conditions:
      "* Offre valable sur présentation de la carte de membre CPU-PME",
    category: "voyage",
  },
  {
    id: "moov",
    name: "Moov Africa",
    logo: "Moov Africa",
    logoBg: "bg-green-600",
    logoText: "text-white",
    offer: "1 mois gratuit",
    description:
      "1 mois gratuit sur les abonnements fibre optique pour les nouvelles souscriptions entreprises.",
    conditions:
      "* Offre valable pour les nouveaux abonnements avec la carte CPU-PME",
    category: "technologie",
  },
  {
    id: "sodeci",
    name: "SODECI",
    logo: "SODECI",
    logoBg: "bg-blue-700",
    logoText: "text-white",
    offer: "10%",
    description:
      "Réduction de 10% sur les services d'eau et d'assainissement pour les entreprises membres.",
    conditions:
      "* Offre valable sur présentation de la carte de membre CPU-PME",
    category: "operations",
  },
  {
    id: "cie",
    name: "CIE",
    logo: "CIE",
    logoBg: "bg-yellow-500",
    logoText: "text-gray-900",
    offer: "10%",
    description:
      "Réduction de 10% sur les factures d'électricité pour les entreprises membres.",
    conditions:
      "* Offre valable sur présentation de la carte de membre CPU-PME",
    category: "operations",
  },
  {
    id: "adecco",
    name: "Adecco Côte d'Ivoire",
    logo: "Adecco",
    logoBg: "bg-red-600",
    logoText: "text-white",
    offer: "15%",
    description:
      "Réduction de 15% sur les services de recrutement et d'intérim pour les entreprises membres.",
    conditions:
      "* Offre valable sur présentation de la carte de membre CPU-PME",
    category: "rh",
  },
  {
    id: "manpower",
    name: "Manpower Côte d'Ivoire",
    logo: "Manpower",
    logoBg: "bg-blue-500",
    logoText: "text-white",
    offer: "20%",
    description:
      "Réduction de 20% sur les services de formation professionnelle et de développement des compétences.",
    conditions:
      "* Offre valable sur présentation de la carte de membre CPU-PME",
    category: "rh",
  },
  {
    id: "cinema",
    name: "Ciné Afrique",
    logo: "Ciné Afrique",
    logoBg: "bg-purple-600",
    logoText: "text-white",
    offer: "20%",
    description:
      "Réduction de 20% sur les billets de cinéma pour les sorties d'entreprise des membres.",
    conditions:
      "* Offre valable sur présentation de la carte de membre CPU-PME",
    category: "loisirs",
  },
  {
    id: "sport",
    name: "Complexe Sportif Abidjan",
    logo: "CSA",
    logoBg: "bg-green-500",
    logoText: "text-white",
    offer: "15%",
    description:
      "Réduction de 15% sur les abonnements et locations d'espaces sportifs pour les entreprises membres.",
    conditions:
      "* Offre valable sur présentation de la carte de membre CPU-PME",
    category: "loisirs",
  },
];

const MembersContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("random");
  const [shuffledMembers, setShuffledMembers] = useState<Member[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 9;
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedAdhesionType, setSelectedAdhesionType] = useState<
    MemberType | ""
  >("");
  const [hasAffiliation, setHasAffiliation] = useState<boolean>(false);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedMainSector, setSelectedMainSector] = useState<string>("");
  const [selectedFiliere, setSelectedFiliere] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const { toast } = useToast();

  // Simuler le chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Réinitialiser les états quand le type de membre change
  useEffect(() => {
    setHasAffiliation(false);
    setSelectedPriorities([]);
    setSelectedSectors([]);
    setSelectedMainSector("");
    setSelectedFiliere("");
    setSelectedSubCategory("");
  }, [selectedAdhesionType]);

  // Réinitialiser filière et sous-catégorie quand le secteur principal change
  useEffect(() => {
    setSelectedFiliere("");
    setSelectedSubCategory("");
  }, [selectedMainSector]);

  // Réinitialiser sous-catégorie quand la filière change
  useEffect(() => {
    setSelectedSubCategory("");
  }, [selectedFiliere]);

  // Obtenir les filières du secteur sélectionné
  const getFilieresForSector = () => {
    if (!selectedMainSector || !secteursData[selectedMainSector]) return [];
    return secteursData[selectedMainSector].filieres;
  };

  // Obtenir les sous-catégories de la filière sélectionnée
  const getSubCategoriesForFiliere = () => {
    if (!selectedMainSector || !selectedFiliere) return [];
    const filieres = getFilieresForSector();
    const filiere = filieres.find((f) => f.id === selectedFiliere);
    return filiere ? filiere.sousCategories : [];
  };

  // Récupérer les paramètres d'URL au chargement
  useEffect(() => {
    const sectorParam = searchParams.get("sector");
    const subsectorParam = searchParams.get("subsector");
    const subsectorsParam = searchParams.get("subsectors");
    const tagParam = searchParams.get("tag");
    const tagsParam = searchParams.get("tags");
    const tabParam = searchParams.get("tab");

    if (sectorParam) {
      setSelectedSector(sectorParam);
    }

    // Si un sous-secteur est spécifié, on peut aussi filtrer par secteur correspondant
    if (subsectorParam && sectorParam) {
      setSelectedSector(sectorParam);
    }

    // Si plusieurs sous-secteurs sont spécifiés
    if (subsectorsParam && sectorParam) {
      setSelectedSector(sectorParam);
    }

    // Si un tag est spécifié, on filtre par secteur correspondant
    if (tagParam && sectorParam) {
      setSelectedSector(sectorParam);
    }

    // Si plusieurs tags sont spécifiés
    if (tagsParam && sectorParam) {
      setSelectedSector(sectorParam);
    }
  }, [searchParams]);

  // Déterminer l'onglet actif depuis l'URL
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "annuaire"
  );
  const [discountFilter, setDiscountFilter] = useState(
    searchParams.get("discountFilter") || ""
  );

  // Synchroniser activeTab et discountFilter avec l'URL quand searchParams change
  useEffect(() => {
    const tab = searchParams.get("tab") || "annuaire";
    const filter = searchParams.get("discountFilter") || "";

    // Si un discountFilter est présent dans l'URL, basculer vers l'onglet discount
    if (filter && tab !== "discount") {
      setActiveTab("discount");
      setDiscountFilter(filter);
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", "discount");
      router.replace(`/membres?${params.toString()}`, { scroll: false });
    } else {
      if (tab !== activeTab) {
        setActiveTab(tab);
      }
      if (filter !== discountFilter) {
        setDiscountFilter(filter);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Fonction pour obtenir le titre adapté selon l'onglet actif
  const getPageTitle = () => {
    switch (activeTab) {
      case "annuaire":
        return "Annuaire";
      case "avantages":
        return "Avantages Membres";
      case "discount":
        return "Discount +";
      case "adhesion":
        return "Adhérer";
      default:
        return "Nos Membres";
    }
  };

  // Fonction pour obtenir la description adaptée selon l'onglet actif
  const getPageDescription = () => {
    switch (activeTab) {
      case "annuaire":
        return "Rejoignez la plus grande communauté d'entrepreneurs, PME, entreprises, institutions et partenaires de Côte d'Ivoire";
      case "avantages":
        return "Découvrez tous les avantages et formules d'adhésion pour développer votre entreprise avec CPU-PME";
      case "discount":
        return "Profitez de réductions exclusives et d'offres spéciales réservées aux membres CPU-PME";
      case "adhesion":
        return "Rejoignez CPU-PME et bénéficiez d'un accompagnement complet pour le développement de votre entreprise";
      default:
        return "Rejoignez la plus grande communauté d'entrepreneurs, PME, entreprises, institutions et partenaires de Côte d'Ivoire";
    }
  };

  // Fonction de tri
  const sortMembers = (a: Member, b: Member) => {
    switch (sortOrder) {
      case "alphabetical":
        return a.name.localeCompare(b.name, "fr", { sensitivity: "base" });
      case "sector":
        return a.sector.localeCompare(b.sector, "fr", { sensitivity: "base" });
      case "random":
        // Pour le tri aléatoire, on utilise l'ordre du tableau shuffledMembers
        const indexA = shuffledMembers.findIndex((m) => m.id === a.id);
        const indexB = shuffledMembers.findIndex((m) => m.id === b.id);
        return indexA - indexB;
      default:
        // Par défaut, tri aléatoire
        const defaultIndexA = shuffledMembers.findIndex((m) => m.id === a.id);
        const defaultIndexB = shuffledMembers.findIndex((m) => m.id === b.id);
        return defaultIndexA - defaultIndexB;
    }
  };

  // Fonction pour mélanger aléatoirement un tableau
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialiser le mélange aléatoire au chargement
  useEffect(() => {
    if (shuffledMembers.length === 0) {
      setShuffledMembers(shuffleArray(membersData));
    }
  }, []);

  // Mélanger les membres toutes les 3 minutes quand le tri est aléatoire
  useEffect(() => {
    if (sortOrder !== "random") return;

    // Mélanger toutes les 3 minutes si le tri est aléatoire
    const interval = setInterval(() => {
      setShuffledMembers(shuffleArray(membersData));
    }, 3 * 60 * 1000); // 3 minutes

    return () => clearInterval(interval);
  }, [sortOrder]);

  const filteredMembers = membersData.filter((member) => {
    // Recherche insensible à la casse
    const searchLower = searchTerm.toLowerCase().trim();
    const matchesSearch =
      searchTerm === "" ||
      member.name.toLowerCase().includes(searchLower) ||
      member.description.toLowerCase().includes(searchLower) ||
      member.sector.toLowerCase().includes(searchLower) ||
      member.region.toLowerCase().includes(searchLower);
    const matchesSector =
      selectedSector === "all" || member.sector === selectedSector;
    const matchesRegion =
      selectedRegion === "all" || member.region === selectedRegion;
    return matchesSearch && matchesSector && matchesRegion;
  });

  // Appliquer le tri ou le mélange aléatoire
  const sortedMembers =
    sortOrder === "random"
      ? filteredMembers.sort((a, b) => {
          // Utiliser l'ordre du tableau shuffledMembers pour maintenir l'ordre aléatoire
          const indexA = shuffledMembers.findIndex((m) => m.id === a.id);
          const indexB = shuffledMembers.findIndex((m) => m.id === b.id);
          // Si un membre n'est pas dans shuffledMembers (peu probable), le mettre à la fin
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;
          return indexA - indexB;
        })
      : filteredMembers.sort(sortMembers);

  // Vérifier si des filtres sont actifs
  const hasActiveFilters =
    searchTerm !== "" || selectedSector !== "all" || selectedRegion !== "all";

  // Fonction pour réinitialiser tous les filtres
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedSector("all");
    setSelectedRegion("all");
    setCurrentPage(1);
  };

  // Réinitialiser la page quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedSector, selectedRegion, sortOrder]);

  // Calculer la pagination
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const startIndex = (currentPage - 1) * membersPerPage;
  const endIndex = startIndex + membersPerPage;
  const paginatedMembers = filteredMembers.slice(startIndex, endIndex);

  // Membres récemment inscrits (les 5 derniers de la liste)
  const recentMembers = [...membersData].slice(-5).reverse();

  useEffect(() => {
    if (recentMembers.length === 0) return;

    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % recentMembers.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [recentMembers.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Demande envoyée !",
      description:
        "Nous avons bien reçu votre demande d'adhésion. Notre équipe vous contactera sous 48h.",
    });
  };

  const getBenefitIcon = (icon: string) => {
    switch (icon) {
      case "network":
        return <Handshake className="h-8 w-8 text-cpu-orange" />;
      case "training":
        return <GraduationCap className="h-8 w-8 text-cpu-orange" />;
      case "finance":
        return <Wallet className="h-8 w-8 text-cpu-orange" />;
      case "advocacy":
        return <Megaphone className="h-8 w-8 text-cpu-orange" />;
      case "marketplace":
        return <ShoppingBag className="h-8 w-8 text-cpu-orange" />;
      case "support":
        return <Headphones className="h-8 w-8 text-cpu-orange" />;
      default:
        return <Award className="h-8 w-8 text-cpu-orange" />;
    }
  };

  const getSectorColor = (sector: string) => {
    const sectorColors: { [key: string]: string } = {
      "Agriculture & Agroalimentaire": "from-amber-500 to-amber-700",
      "BTP & Construction": "from-orange-500 to-orange-700",
      "Commerce & Distribution": "from-blue-500 to-blue-700",
      "Industrie & Transformation": "from-slate-600 to-slate-800",
      "Services & Conseil": "from-indigo-500 to-indigo-700",
      "Technologie & Digital": "from-purple-500 to-purple-700",
      "Transport & Logistique": "from-red-500 to-red-700",
      "Tourisme & Hôtellerie": "from-teal-500 to-teal-700",
      "Santé & Pharmaceutique": "from-green-500 to-green-700",
      "Énergie & Environnement": "from-lime-500 to-lime-700",
    };
    return sectorColors[sector] || "from-gray-500 to-gray-700";
  };

  // Fonction pour obtenir l'icône SVG par secteur
  const getSectorIcon = (sector: string) => {
    const sectorIcons: { [key: string]: React.ReactNode } = {
      "Agriculture & Agroalimentaire": (
        <IconAgriculture className="h-16 w-16 text-white opacity-90" />
      ),
      "BTP & Construction": (
        <IconBTP className="h-16 w-16 text-white opacity-90" />
      ),
      "Commerce & Distribution": (
        <IconCommerce className="h-16 w-16 text-white opacity-90" />
      ),
      "Industrie & Transformation": (
        <IconIndustrie className="h-16 w-16 text-white opacity-90" />
      ),
      "Services & Conseil": (
        <IconServices className="h-16 w-16 text-white opacity-90" />
      ),
      "Technologie & Digital": (
        <IconTechnologie className="h-16 w-16 text-white opacity-90" />
      ),
      "Transport & Logistique": (
        <IconTransport className="h-16 w-16 text-white opacity-90" />
      ),
      "Tourisme & Hôtellerie": (
        <IconTourisme className="h-16 w-16 text-white opacity-90" />
      ),
      "Santé & Pharmaceutique": (
        <IconSante className="h-16 w-16 text-white opacity-90" />
      ),
      "Énergie & Environnement": (
        <IconEnergie className="h-16 w-16 text-white opacity-90" />
      ),
    };
    return (
      sectorIcons[sector] || (
        <Building2 className="h-16 w-16 text-white opacity-90" />
      )
    );
  };

  // Fonction pour obtenir l'icône et la couleur du badge
  const getBadgeConfig = (badge?: string) => {
    switch (badge) {
      case "Basic":
        return {
          icon: <Award className="h-3 w-3" />,
          className: "bg-yellow-100 text-yellow-800 border-yellow-300",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
        };
      case "Argent":
        return {
          icon: <Gem className="h-3 w-3" />,
          className: "bg-cpu-orange text-white border-orange-700",
          bgColor: "bg-cpu-orange",
          textColor: "text-white",
        };
      case "Or":
        return {
          icon: <Crown className="h-3 w-3" />,
          className: "bg-amber-400 text-gray-800 border-amber-500",
          bgColor: "bg-amber-400",
          textColor: "text-gray-800",
        };
      case "Institutionnel":
        return {
          icon: <Building className="h-3 w-3" />,
          className: "bg-green-600 text-white border-green-700",
          bgColor: "bg-green-600",
          textColor: "text-white",
        };
      default:
        return {
          icon: <Award className="h-3 w-3" />,
          className: "bg-white text-gray-700 border-gray-200",
          bgColor: "bg-white",
          textColor: "text-gray-700",
        };
    }
  };

  const handleImageError = (memberId: string) => {
    setFailedImages((prev) => new Set(prev).add(memberId));
  };

  const shouldShowImage = (memberId: string) => {
    return !failedImages.has(memberId);
  };

  // Fonction pour obtenir la couleur du badge selon l'index (alternance orange/vert)
  const getBadgeColor = (index: number) => {
    return index % 2 === 0
      ? "bg-cpu-orange/10 text-cpu-orange border-cpu-orange/30 hover:bg-cpu-orange/20"
      : "bg-cpu-green/10 text-cpu-green border-cpu-green/30 hover:bg-cpu-green/20";
  };

  // Fonction pour obtenir les sous-secteurs associés à un secteur de membre
  // Utilisation de useMemo pour éviter les recalculs inutiles
  const getSubSectorsForMemberSector = (memberSector: string): string[] => {
    if (!memberSector) return [];

    const subSectors: string[] = [];

    try {
      // Parcourir tous les secteurs dans secteursData
      Object.values(secteursData).forEach((secteurData) => {
        if (!secteurData || !secteurData.filieres) return;

        secteurData.filieres.forEach((filiere) => {
          if (!filiere || !filiere.sousCategories) return;

          filiere.sousCategories.forEach((sousCat) => {
            if (!sousCat || !sousCat.nom) return;

            // Vérifier si cette sous-catégorie correspond au secteur du membre
            const mappedSector =
              sectorToMemberMapping[sousCat.nom] ||
              sectorToMemberMapping[filiere.nom];
            if (mappedSector === memberSector) {
              // Ajouter le nom de la sous-catégorie si pas déjà présent
              if (!subSectors.includes(sousCat.nom)) {
                subSectors.push(sousCat.nom);
              }
            }
          });
        });
      });
    } catch (error) {
      console.warn("Erreur lors de la récupération des sous-secteurs:", error);
    }

    return subSectors;
  };

  // Fonction pour exporter en CSV
  const exportToCSV = () => {
    const headers = [
      "Nom",
      "Type",
      "Secteur",
      "Région",
      "Formule",
      "Description",
      "Site Web",
    ];
    const rows = filteredMembers.map((member) => [
      member.name,
      memberTypes.find((t) => t.value === member.memberType)?.label ||
        member.memberType,
      member.sector,
      member.region,
      member.badge || "N/A",
      member.description.replace(/,/g, ";"), // Remplacer les virgules pour éviter les problèmes CSV
      member.website || "N/A",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob(["\ufeff" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `membres-cpu-${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.position = "absolute";
    link.style.top = "-9999px";
    link.style.left = "-9999px";
    link.style.visibility = "hidden";
    link.style.opacity = "0";

    try {
      document.body.appendChild(link);
      link.click();

      // Nettoyer après un délai pour éviter l'erreur removeChild
      setTimeout(() => {
        try {
          if (link && link.parentNode === document.body) {
            document.body.removeChild(link);
          }
        } catch (error) {
          // Ignorer l'erreur si l'élément a déjà été supprimé
          console.warn("Erreur lors du nettoyage du lien:", error);
        }
        try {
          URL.revokeObjectURL(url);
        } catch (error) {
          // Ignorer l'erreur si l'URL a déjà été révoquée
          console.warn("Erreur lors de la révocation de l'URL:", error);
        }
      }, 200);
    } catch (error) {
      console.error("Erreur lors de l'export CSV:", error);
      URL.revokeObjectURL(url);
    }

    toast({
      title: "Export réussi",
      description: `Fichier CSV téléchargé avec ${filteredMembers.length} membres.`,
    });
  };

  // Fonction pour exporter en PDF (simplifié - génère un HTML imprimable)
  const exportToPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Membres CPU-PME - ${new Date().toLocaleDateString(
            "fr-FR"
          )}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #F27A20; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #F27A20; color: white; }
            tr:nth-child(even) { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Liste des Membres CPU-PME</h1>
          <p><strong>Date d'export:</strong> ${new Date().toLocaleDateString(
            "fr-FR"
          )}</p>
          <p><strong>Nombre de membres:</strong> ${filteredMembers.length}</p>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Type</th>
                <th>Secteur</th>
                <th>Région</th>
                <th>Formule</th>
                <th>Site Web</th>
              </tr>
            </thead>
            <tbody>
              ${filteredMembers
                .map(
                  (member) => `
                <tr>
                  <td>${member.name}</td>
                  <td>${
                    memberTypes.find((t) => t.value === member.memberType)
                      ?.label || member.memberType
                  }</td>
                  <td>${member.sector}</td>
                  <td>${member.region}</td>
                  <td>${member.badge || "N/A"}</td>
                  <td>${member.website || "N/A"}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();

    toast({
      title: "Export PDF",
      description:
        "La fenêtre d'impression s'ouvre. Utilisez 'Enregistrer au format PDF' pour sauvegarder.",
    });
  };

  // Fonction pour partager la recherche
  const shareSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedSector !== "all") params.set("sector", selectedSector);
    if (selectedRegion !== "all") params.set("region", selectedRegion);
    if (sortOrder !== "random") params.set("sort", sortOrder);
    if (viewMode !== "grid") params.set("view", viewMode);

    const url = `${window.location.origin}/membres?${params.toString()}`;

    if (navigator.share) {
      navigator
        .share({
          title: "Recherche de membres CPU-PME",
          text: `Découvrez ${sortedMembers.length} membres sur CPU-PME`,
          url: url,
        })
        .catch(() => {
          // Fallback si l'utilisateur annule
          copyToClipboard(url);
        });
    } else {
      copyToClipboard(url);
    }
  };

  // Fonction pour copier dans le presse-papier
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Lien copié !",
          description: "Le lien a été copié dans le presse-papier.",
        });
      })
      .catch(() => {
        toast({
          title: "Erreur",
          description: "Impossible de copier le lien.",
        });
      });
  };

  return (
    <div className="flex flex-col">
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
          <div className="mb-4">
            <span className="text-lg md:text-xl font-medium text-white/80">
              Membres
            </span>
            {activeTab !== "annuaire" && (
              <>
                <span className="mx-2 text-white/60">/</span>
                <span className="text-lg md:text-xl font-semibold text-white">
                  {activeTab === "avantages"
                    ? "Avantages"
                    : activeTab === "discount"
                    ? "Discount +"
                    : activeTab === "adhesion"
                    ? "Adhérer"
                    : ""}
                </span>
              </>
            )}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            {getPageTitle()}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 animate-fade-in">
            {getPageDescription()}
          </p>
        </div>
      </section>

      {/* Titre et Navigation par Onglets */}
      <section className="bg-white py-8 sm:py-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <h2 className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-bold text-[#221F1F] text-center mb-10">
            {getPageTitle()}
          </h2>

          {/* Navigation par Onglets - Style amélioré */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 md:gap-8 mb-8 px-6 py-3 bg-gray-50/50 rounded-xl border border-gray-100 shadow-sm">
            {[
              { value: "annuaire", label: "Annuaire", icon: Users },
              { value: "discount", label: "Discount +", icon: Percent },
              { value: "avantages", label: "Avantages", icon: Award },
              { value: "adhesion", label: "Adhérer", icon: Building2 },
            ].map((tab) => {
              const isActive = activeTab === tab.value;
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.value}
                  onClick={() => {
                    setActiveTab(tab.value);
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("tab", tab.value);
                    // Supprimer discountFilter si on change d'onglet (sauf si on va sur discount)
                    if (tab.value !== "discount") {
                      params.delete("discountFilter");
                    }
                    router.replace(`/membres?${params.toString()}`, {
                      scroll: false,
                    });
                  }}
                  className={`
                    relative flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-lg font-inter text-sm sm:text-base font-semibold 
                    transition-all duration-300 ease-in-out cursor-pointer
                    ${
                      isActive
                        ? "bg-white text-[#221F1F] shadow-md z-10"
                        : "bg-slate-100 text-gray-600 hover:bg-slate-200 hover:text-gray-700"
                    }
                  `}
                >
                  <IconComponent
                    className={`h-5 w-5 ${
                      isActive ? "text-[#221F1F]" : "text-gray-600"
                    }`}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white border-b border-gray-200 pt-8 pb-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value);
              const params = new URLSearchParams(searchParams.toString());
              params.set("tab", value);
              // Supprimer discountFilter si on change d'onglet (sauf si on va sur discount)
              if (value !== "discount") {
                params.delete("discountFilter");
              }
              router.replace(`/membres?${params.toString()}`, {
                scroll: false,
              });
            }}
            className="w-full"
          >
            {/* Annuaire Tab */}
            <TabsContent value="annuaire" className="mt-8">
              {/* Recent Members Section */}
              <div className="mb-20 animate-fade-in-up">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-1 h-10 bg-cpu-orange rounded-full"></div>
                  <h2 className="text-3xl font-bold text-[#221F1F]">
                    Membres Récents
                  </h2>
                </div>
                {recentMembers.length > 0 ? (
                  <div className="relative">
                    <div className="border border-gray-200 rounded-lg p-6 md:p-8 md:pl-16 md:pr-16 transition-all overflow-hidden bg-white">
                      <div
                        className={`flex flex-col md:flex-row gap-6 md:gap-8 ${
                          featuredIndex % 2 === 1 ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <div className="flex-shrink-0 bg-[#f0f4f8] rounded-lg w-full md:w-64 h-40 md:h-48 flex items-center justify-center overflow-hidden relative">
                          {shouldShowImage(recentMembers[featuredIndex].id) &&
                          recentMembers[featuredIndex].logoUrl ? (
                            <Image
                              src={recentMembers[featuredIndex].logoUrl!}
                              alt={recentMembers[featuredIndex].name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 256px"
                              onError={() =>
                                handleImageError(
                                  recentMembers[featuredIndex].id
                                )
                              }
                            />
                          ) : (
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${getSectorColor(
                                recentMembers[featuredIndex].sector
                              )} flex items-center justify-center`}
                            >
                              <div className="text-center text-white px-4">
                                <p className="text-sm font-semibold line-clamp-2">
                                  {recentMembers[featuredIndex].name}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center flex-wrap gap-2 mb-4">
                              <Badge className="bg-green-600 text-white text-xs transition-all duration-300 hover:scale-105 hover:shadow-md animate-fade-in">
                                Nouveau
                              </Badge>
                              {/* Badge secteur principal */}
                              <Badge className="text-xs bg-white text-gray-700 border border-gray-300 transition-all duration-300 hover:scale-105 hover:shadow-md animate-fade-in">
                                {recentMembers[featuredIndex].sector}
                              </Badge>
                              {/* Badges sous-secteurs */}
                              {(() => {
                                try {
                                  if (!recentMembers[featuredIndex]?.sector)
                                    return null;
                                  const subSectors =
                                    getSubSectorsForMemberSector(
                                      recentMembers[featuredIndex].sector
                                    );
                                  if (!subSectors || subSectors.length === 0)
                                    return null;

                                  const visibleSubSectors = subSectors.slice(
                                    0,
                                    2
                                  );
                                  const remainingCount =
                                    subSectors.length -
                                    visibleSubSectors.length;

                                  return (
                                    <>
                                      {visibleSubSectors.map(
                                        (subSector, subIndex) => {
                                          // Alternance orange/vert basée sur l'index
                                          const isOrange = subIndex % 2 === 0;
                                          const badgeClass = isOrange
                                            ? "text-xs bg-cpu-orange/10 text-cpu-orange border-cpu-orange/30 transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-cpu-orange/20 animate-fade-in"
                                            : "text-xs bg-cpu-green/10 text-cpu-green border-cpu-green/30 transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-cpu-green/20 animate-fade-in";

                                          return (
                                            <Badge
                                              key={`recent-${featuredIndex}-sub-${subIndex}`}
                                              className={badgeClass}
                                              style={{
                                                animationDelay: `${
                                                  (subIndex + 1) * 0.02
                                                }s`,
                                              }}
                                            >
                                              {subSector}
                                            </Badge>
                                          );
                                        }
                                      )}
                                      {remainingCount > 0 && (
                                        <Badge
                                          className="text-xs bg-cpu-green text-white border-cpu-green transition-all duration-300 hover:scale-105 hover:shadow-md animate-fade-in"
                                          style={{ animationDelay: `0.06s` }}
                                        >
                                          +{remainingCount}
                                        </Badge>
                                      )}
                                    </>
                                  );
                                } catch (error) {
                                  console.warn(
                                    "Erreur lors de l'affichage des sous-secteurs:",
                                    error
                                  );
                                  return null;
                                }
                              })()}
                            </div>
                            <h3 className="text-2xl font-bold text-[#221F1F] mb-4">
                              {recentMembers[featuredIndex].name}
                            </h3>
                            <p className="text-[#6F6F6F] text-base leading-relaxed mb-6">
                              {recentMembers[featuredIndex].description}
                            </p>
                          </div>
                          <div className="flex items-center gap-6">
                            <span className="flex items-center text-sm text-[#6F6F6F]">
                              <MapPin className="h-4 w-4 mr-2" />
                              {recentMembers[featuredIndex].region}
                            </span>
                            {recentMembers[featuredIndex].website && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-cpu-orange border-cpu-orange hover:border-cpu-orange hover:bg-cpu-orange hover:text-white active:bg-cpu-orange active:text-white transition-all"
                              >
                                Voir le site
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={() =>
                        setFeaturedIndex(
                          (prev) =>
                            (prev - 1 + recentMembers.length) %
                            recentMembers.length
                        )
                      }
                      className="hidden md:absolute md:block left-4 top-1/2 transform -translate-y-1/2 bg-cpu-orange text-white p-3 rounded-full hover:bg-orange-700 transition-all hover:scale-110 z-10 cursor-pointer"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() =>
                        setFeaturedIndex(
                          (prev) => (prev + 1) % recentMembers.length
                        )
                      }
                      className="hidden md:absolute md:block right-4 top-1/2 transform -translate-y-1/2 bg-cpu-orange text-white p-3 rounded-full hover:bg-orange-700 transition-all hover:scale-110 z-10 cursor-pointer"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                      {recentMembers.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setFeaturedIndex(idx)}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            idx === featuredIndex
                              ? "bg-cpu-orange w-6"
                              : "bg-gray-300 w-2"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Aucune entreprise récemment inscrite pour le moment.
                  </p>
                )}
              </div>

              {/* Search and Filters Bar */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-12 animate-fade-in-up animate-delay-200">
                {/* Desktop Filters */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="lg:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Rechercher un membre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-gray-300"
                      />
                    </div>
                  </div>
                  <Select
                    value={selectedSector}
                    onValueChange={setSelectedSector}
                  >
                    <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                      <SelectValue placeholder="Secteur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les secteurs</SelectItem>
                      {sectors.map((sector) => (
                        <SelectItem key={sector} value={sector}>
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedRegion}
                    onValueChange={setSelectedRegion}
                  >
                    <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                      <SelectValue placeholder="Région" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les régions</SelectItem>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Mobile Filters - Drawer */}
                <div className="md:hidden space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Rechercher un membre..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-300"
                    />
                  </div>
                  <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Filter className="mr-2 h-4 w-4" />
                        Filtres
                        {hasActiveFilters && (
                          <Badge className="ml-2 bg-cpu-orange text-white">
                            {
                              [
                                searchTerm,
                                selectedSector,
                                selectedRegion,
                              ].filter((f) => f !== "" && f !== "all").length
                            }
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[85vh]">
                      <SheetHeader>
                        <SheetTitle>Filtres de recherche</SheetTitle>
                      </SheetHeader>
                      <div className="space-y-6 mt-6">
                        <div className="space-y-2">
                          <Label>Secteur</Label>
                          <Select
                            value={selectedSector}
                            onValueChange={setSelectedSector}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Tous les secteurs" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">
                                Tous les secteurs
                              </SelectItem>
                              {sectors.map((sector) => (
                                <SelectItem key={sector} value={sector}>
                                  {sector}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Région</Label>
                          <Select
                            value={selectedRegion}
                            onValueChange={setSelectedRegion}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Toutes les régions" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">
                                Toutes les régions
                              </SelectItem>
                              {regions.map((region) => (
                                <SelectItem key={region} value={region}>
                                  {region}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-3 pt-4">
                          <Button
                            variant="outline"
                            onClick={resetFilters}
                            className="flex-1"
                          >
                            Réinitialiser
                          </Button>
                          <Button
                            onClick={() => setIsFiltersOpen(false)}
                            className="flex-1 bg-cpu-orange hover:bg-orange-700"
                          >
                            Appliquer
                          </Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {/* All Members Grid */}
              <div className="animate-fade-in-up animate-delay-300">
                {/* Header avec titre, compteur et contrôles */}
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <h2 className="text-3xl font-bold text-[#221F1F]">
                        {(() => {
                          const tagParam = searchParams.get("tag");
                          if (tagParam) {
                            return `Membres - ${tagParam}`;
                          }
                          return selectedSector !== "all"
                            ? `Membres - ${selectedSector}`
                            : "Tous les Membres";
                        })()}
                      </h2>
                      {/* Compteur de résultats */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2.5 px-3 py-2 bg-white border-l-4 border-cpu-orange rounded-r-md shadow-sm">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cpu-orange/10">
                            <Users className="h-4 w-4 text-cpu-orange" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">
                              Résultats
                            </span>
                            <span className="text-lg font-bold text-[#221F1F]">
                              {sortedMembers.length}{" "}
                              <span className="text-sm font-normal text-gray-600">
                                membre{sortedMembers.length > 1 ? "s" : ""}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Toggle vue liste/grille */}
                      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                        <button
                          onClick={() => setViewMode("grid")}
                          className={`p-2 transition-all cursor-pointer ${
                            viewMode === "grid"
                              ? "bg-cpu-orange text-white"
                              : "bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                          aria-label="Vue grille"
                        >
                          <Grid3x3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setViewMode("list")}
                          className={`p-2 transition-all cursor-pointer ${
                            viewMode === "list"
                              ? "bg-cpu-orange text-white"
                              : "bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                          aria-label="Vue liste"
                        >
                          <List className="h-4 w-4" />
                        </button>
                      </div>
                      {/* Select de tri */}
                      <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger className="w-[200px] border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                          <SelectValue placeholder="Trier par" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="random">Aléatoire</SelectItem>
                          <SelectItem value="alphabetical">
                            Alphabétique
                          </SelectItem>
                          <SelectItem value="sector">Secteur</SelectItem>
                        </SelectContent>
                      </Select>
                      {/* Boutons Export et Partage */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={shareSearch}
                          className="border-gray-300 hover:bg-gray-50"
                          title="Partager cette recherche"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <div className="relative group">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:bg-gray-50 group"
                            title="Exporter les résultats"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          {/* Menu déroulant pour CSV/PDF */}
                          <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[140px]">
                            <button
                              onClick={exportToCSV}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 rounded-t-md flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <Download className="h-3 w-3" />
                              Exporter CSV
                            </button>
                            <button
                              onClick={exportToPDF}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 rounded-b-md flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <Download className="h-3 w-3" />
                              Exporter PDF
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Filtres actifs et bouton réinitialiser */}
                  {(hasActiveFilters || searchParams.get("tag")) && (
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm text-[#6F6F6F] font-medium">
                        Filtres actifs :
                      </span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Badge recherche */}
                        {searchTerm !== "" && (
                          <Badge
                            variant="outline"
                            className="bg-white border-gray-300 text-[#221F1F] hover:bg-gray-50 cursor-pointer flex items-center gap-1.5"
                            onClick={() => setSearchTerm("")}
                          >
                            Recherche: "{searchTerm}"
                            <X className="h-3 w-3" />
                          </Badge>
                        )}
                        {/* Badge secteur */}
                        {selectedSector !== "all" && (
                          <Badge
                            variant="outline"
                            className="bg-white border-gray-300 text-[#221F1F] hover:bg-gray-50 cursor-pointer flex items-center gap-1.5"
                            onClick={() => setSelectedSector("all")}
                          >
                            Secteur: {selectedSector}
                            <X className="h-3 w-3" />
                          </Badge>
                        )}
                        {/* Badge région */}
                        {selectedRegion !== "all" && (
                          <Badge
                            variant="outline"
                            className="bg-white border-gray-300 text-[#221F1F] hover:bg-gray-50 cursor-pointer flex items-center gap-1.5"
                            onClick={() => setSelectedRegion("all")}
                          >
                            Région: {selectedRegion}
                            <X className="h-3 w-3" />
                          </Badge>
                        )}
                        {/* Badge tag depuis URL */}
                        {searchParams.get("tag") && (
                          <Badge
                            variant="outline"
                            className="bg-white border-gray-300 text-[#221F1F] hover:bg-gray-50 cursor-pointer flex items-center gap-1.5"
                            onClick={() => {
                              window.history.pushState({}, "", "/membres");
                              setSelectedSector("all");
                            }}
                          >
                            Tag: {searchParams.get("tag")}
                            <X className="h-3 w-3" />
                          </Badge>
                        )}
                      </div>
                      {/* Bouton réinitialiser tous les filtres */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetFilters}
                        className="text-cpu-orange border-cpu-orange hover:bg-cpu-orange hover:text-white flex items-center gap-2"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Réinitialiser
                      </Button>
                    </div>
                  )}
                </div>
                {/* Vue Grille */}
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {isLoading
                      ? // Skeleton Loading
                        Array.from({ length: membersPerPage }).map(
                          (_, index) => (
                            <MemberCardSkeleton key={`skeleton-${index}`} />
                          )
                        )
                      : paginatedMembers.map((member, index) => (
                          <div
                            key={member.id}
                            className={`member-card border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 bg-white flex flex-col animate-fade-in-up hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] cursor-pointer`}
                            style={{
                              animationDelay: `${0.4 + index * 0.1}s`,
                              opacity: 0,
                            }}
                          >
                            {/* Card Image/Icon Area */}
                            <div className="member-image bg-gradient-to-br from-[#f0f4f8] to-[#e8ecf1] h-40 flex items-center justify-center border-b border-gray-200 overflow-hidden relative group">
                              {shouldShowImage(member.id) && member.logoUrl ? (
                                <Image
                                  src={member.logoUrl}
                                  alt={member.name}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                  onError={() => handleImageError(member.id)}
                                />
                              ) : (
                                <div
                                  className={`absolute inset-0 bg-gradient-to-br ${getSectorColor(
                                    member.sector
                                  )} flex items-center justify-center p-4`}
                                >
                                  {getSectorIcon(member.sector)}
                                </div>
                              )}
                            </div>

                            {/* Card Content */}
                            <div className="p-6 flex flex-col flex-1">
                              <div className="mb-4 flex flex-wrap gap-2 items-center">
                                {/* Badge secteur principal */}
                                <Badge
                                  className="text-xs bg-white text-gray-700 border border-gray-300 transition-all duration-300 hover:scale-105 hover:shadow-md animate-fade-in"
                                  style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                  {member.sector}
                                </Badge>
                                {/* Badges sous-secteurs */}
                                {(() => {
                                  try {
                                    const subSectors =
                                      getSubSectorsForMemberSector(
                                        member.sector
                                      );
                                    if (!subSectors || subSectors.length === 0)
                                      return null;

                                    const visibleSubSectors = subSectors.slice(
                                      0,
                                      2
                                    );
                                    const remainingCount =
                                      subSectors.length -
                                      visibleSubSectors.length;

                                    return (
                                      <>
                                        {visibleSubSectors.map(
                                          (subSector, subIndex) => {
                                            // Alternance orange/vert basée sur l'index
                                            const isOrange = subIndex % 2 === 0;
                                            const badgeClass = isOrange
                                              ? "text-xs bg-cpu-orange/10 text-cpu-orange border-cpu-orange/30 transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-cpu-orange/20 animate-fade-in"
                                              : "text-xs bg-cpu-green/10 text-cpu-green border-cpu-green/30 transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-cpu-green/20 animate-fade-in";

                                            return (
                                              <Badge
                                                key={`${member.id}-sub-${subIndex}`}
                                                className={badgeClass}
                                                style={{
                                                  animationDelay: `${
                                                    index * 0.05 +
                                                    (subIndex + 1) * 0.02
                                                  }s`,
                                                }}
                                              >
                                                {subSector}
                                              </Badge>
                                            );
                                          }
                                        )}
                                        {remainingCount > 0 && (
                                          <Badge
                                            className="text-xs bg-cpu-green text-white border-cpu-green transition-all duration-300 hover:scale-105 hover:shadow-md animate-fade-in"
                                            style={{
                                              animationDelay: `${
                                                index * 0.05 + 0.06
                                              }s`,
                                            }}
                                          >
                                            +{remainingCount}
                                          </Badge>
                                        )}
                                      </>
                                    );
                                  } catch (error) {
                                    console.warn(
                                      "Erreur lors de l'affichage des sous-secteurs:",
                                      error
                                    );
                                    return null;
                                  }
                                })()}
                              </div>

                              <h3 className="text-lg font-bold text-[#221F1F] mb-3 line-clamp-2">
                                {member.name}
                              </h3>

                              <p className="text-sm text-[#6F6F6F] mb-6 flex-1 line-clamp-3 leading-relaxed">
                                {member.description}
                              </p>

                              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                <span className="flex items-center text-xs text-[#6F6F6F]">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {member.region}
                                </span>
                                {member.website && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-cpu-orange border border-transparent hover:border-cpu-orange hover:text-cpu-orange hover:bg-orange-50 active:bg-cpu-orange active:text-white active:border-cpu-orange transition-all"
                                  >
                                    <Globe className="h-4 w-4 mr-1" />
                                    Voir
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>
                ) : (
                  /* Vue Liste */
                  <div className="space-y-4">
                    {isLoading
                      ? // Skeleton Loading pour liste
                        Array.from({ length: membersPerPage }).map(
                          (_, index) => (
                            <div
                              key={`skeleton-list-${index}`}
                              className="border border-gray-200 rounded-lg bg-white flex flex-row animate-pulse"
                            >
                              <div className="w-32 md:w-40 h-32 md:h-40 bg-gray-200"></div>
                              <div className="p-4 md:p-6 flex-1 space-y-3">
                                <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                              </div>
                            </div>
                          )
                        )
                      : paginatedMembers.map((member, index) => (
                          <div
                            key={member.id}
                            className={`member-card border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 bg-white flex flex-row animate-fade-in-up hover:shadow-lg hover:border-cpu-orange/30 cursor-pointer`}
                            style={{
                              animationDelay: `${0.4 + index * 0.05}s`,
                              opacity: 0,
                            }}
                          >
                            {/* Image compacte */}
                            <div className="member-image bg-gradient-to-br from-[#f0f4f8] to-[#e8ecf1] w-32 md:w-40 flex-shrink-0 flex items-center justify-center border-r border-gray-200 overflow-hidden relative group">
                              {shouldShowImage(member.id) && member.logoUrl ? (
                                <Image
                                  src={member.logoUrl}
                                  alt={member.name}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 128px, 160px"
                                  onError={() => handleImageError(member.id)}
                                />
                              ) : (
                                <div
                                  className={`absolute inset-0 bg-gradient-to-br ${getSectorColor(
                                    member.sector
                                  )} flex items-center justify-center p-2`}
                                >
                                  <div className="scale-75">
                                    {getSectorIcon(member.sector)}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Contenu liste */}
                            <div className="p-4 md:p-6 flex flex-col flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center flex-wrap gap-2 mb-2">
                                    {/* Badge secteur principal */}
                                    <Badge
                                      className="text-xs bg-white text-gray-700 border border-gray-300 transition-all duration-300 hover:scale-105 hover:shadow-md animate-fade-in"
                                      style={{
                                        animationDelay: `${index * 0.05}s`,
                                      }}
                                    >
                                      {member.sector}
                                    </Badge>
                                    {/* Badges sous-secteurs */}
                                    {(() => {
                                      try {
                                        const subSectors =
                                          getSubSectorsForMemberSector(
                                            member.sector
                                          );
                                        if (
                                          !subSectors ||
                                          subSectors.length === 0
                                        )
                                          return null;

                                        const visibleSubSectors =
                                          subSectors.slice(0, 2);
                                        const remainingCount =
                                          subSectors.length -
                                          visibleSubSectors.length;

                                        return (
                                          <>
                                            {visibleSubSectors.map(
                                              (subSector, subIndex) => {
                                                // Alternance orange/vert basée sur l'index
                                                const isOrange =
                                                  subIndex % 2 === 0;
                                                const badgeClass = isOrange
                                                  ? "text-xs bg-cpu-orange/10 text-cpu-orange border-cpu-orange/30 transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-cpu-orange/20 animate-fade-in"
                                                  : "text-xs bg-cpu-green/10 text-cpu-green border-cpu-green/30 transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-cpu-green/20 animate-fade-in";

                                                return (
                                                  <Badge
                                                    key={`${member.id}-sub-${subIndex}`}
                                                    className={badgeClass}
                                                    style={{
                                                      animationDelay: `${
                                                        index * 0.05 +
                                                        (subIndex + 1) * 0.02
                                                      }s`,
                                                    }}
                                                  >
                                                    {subSector}
                                                  </Badge>
                                                );
                                              }
                                            )}
                                            {remainingCount > 0 && (
                                              <Badge
                                                className="text-xs bg-cpu-green text-white border-cpu-green transition-all duration-300 hover:scale-105 hover:shadow-md animate-fade-in"
                                                style={{
                                                  animationDelay: `${
                                                    index * 0.05 + 0.06
                                                  }s`,
                                                }}
                                              >
                                                +{remainingCount}
                                              </Badge>
                                            )}
                                          </>
                                        );
                                      } catch (error) {
                                        console.warn(
                                          "Erreur lors de l'affichage des sous-secteurs:",
                                          error
                                        );
                                        return null;
                                      }
                                    })()}
                                  </div>
                                  <h3 className="text-lg md:text-xl font-bold text-[#221F1F] mb-2">
                                    {member.name}
                                  </h3>
                                </div>
                                {member.website && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-cpu-orange border border-transparent hover:border-cpu-orange hover:text-cpu-orange hover:bg-orange-50 active:bg-cpu-orange active:text-white active:border-cpu-orange transition-all flex-shrink-0"
                                  >
                                    <Globe className="h-4 w-4 mr-1" />
                                    Voir
                                  </Button>
                                )}
                              </div>

                              <p className="text-sm text-[#6F6F6F] mb-4 line-clamp-2 leading-relaxed">
                                {member.description}
                              </p>

                              <div className="flex items-center gap-4 mt-auto">
                                <span className="flex items-center text-xs text-[#6F6F6F]">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {member.region}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>
                )}

                {sortedMembers.length === 0 && (
                  <div className="text-center py-12 border border-gray-200 rounded-lg bg-gray-50 animate-fade-in-up">
                    <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">
                      Aucun membre trouvé avec ces critères
                    </p>
                  </div>
                )}

                {/* Pagination */}
                {sortedMembers.length > 0 && totalPages > 1 && (
                  <div className="mt-12 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                      {/* Bouton Première page */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronsLeft className="h-4 w-4" />
                      </Button>

                      {/* Bouton Page précédente */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                        className="border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      {/* Numéros de page */}
                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => {
                          // Afficher seulement quelques pages autour de la page actuelle
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <Button
                                key={page}
                                variant={
                                  currentPage === page ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                                className={
                                  currentPage === page
                                    ? "bg-cpu-orange text-white hover:bg-orange-700 border-cpu-orange"
                                    : "border-gray-300 hover:bg-gray-50"
                                }
                              >
                                {page}
                              </Button>
                            );
                          } else if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return (
                              <span key={page} className="px-2 text-gray-400">
                                ...
                              </span>
                            );
                          }
                          return null;
                        })}
                      </div>

                      {/* Bouton Page suivante */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>

                      {/* Bouton Dernière page */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Informations de pagination */}
                    <p className="text-sm text-[#6F6F6F]">
                      Affichage de{" "}
                      <span className="font-semibold">{startIndex + 1}</span> à{" "}
                      <span className="font-semibold">
                        {Math.min(endIndex, sortedMembers.length)}
                      </span>{" "}
                      sur{" "}
                      <span className="font-semibold">
                        {sortedMembers.length}
                      </span>{" "}
                      membres
                    </p>
                  </div>
                )}

                {sortedMembers.length > 0 && totalPages === 1 && (
                  <div className="text-center mt-12">
                    <p className="text-[#6F6F6F]">
                      Plus de{" "}
                      <span className="font-bold text-cpu-orange">
                        1000 entreprises
                      </span>{" "}
                      nous font confiance
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Avantages Tab */}
            <TabsContent value="avantages" className="mt-4">
              <div className="text-center mb-12 animate-fade-in-up">
                <h2 className="text-3xl font-bold mb-4 text-[#221F1F]">
                  Pourquoi rejoindre CPU-PME.CI ?
                </h2>
                <p className="text-cpu-darkgray max-w-2xl mx-auto">
                  En devenant membre, vous bénéficiez d'un ensemble complet de
                  services et d'avantages pour développer votre entreprise
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
                {membershipBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className={`border border-gray-200 rounded-lg p-6 lg:p-8 transition-all bg-white animate-fade-in-up hover:border-cpu-orange/50`}
                    style={{
                      animationDelay: `${0.2 + index * 0.1}s`,
                      opacity: 0,
                    }}
                  >
                    <div className="mx-auto bg-cpu-orange/10 p-4 rounded-full w-fit mb-6">
                      {getBenefitIcon(benefit.icon)}
                    </div>
                    <h3 className="text-lg font-semibold text-[#221F1F] mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-cpu-darkgray text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing Plans */}
              <div className="p-8 md:p-12 animate-fade-in-up animate-delay-400">
                <div className="text-center mb-20">
                  <h2 className="text-3xl font-bold mb-4 text-[#221F1F]">
                    Nos Formules d'Adhésion
                  </h2>
                  <p className="text-cpu-darkgray max-w-2xl mx-auto mb-8">
                    Choisissez la formule qui correspond le mieux à vos besoins
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 pt-4">
                  {membershipPlans.map((plan, index) => (
                    <div
                      key={index}
                      className={`relative border rounded-lg overflow-visible transition-all animate-fade-in-up ${
                        plan.recommended
                          ? "border-cpu-orange scale-105 bg-white md:scale-110 mt-8"
                          : "border-gray-200 bg-white"
                      }`}
                      style={{
                        animationDelay: `${0.5 + index * 0.15}s`,
                        opacity: 0,
                      }}
                    >
                      {plan.recommended && (
                        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                          <Badge className="bg-cpu-orange text-white px-4 py-1.5">
                            Recommandé
                          </Badge>
                        </div>
                      )}

                      <div className="p-8 flex flex-col h-full">
                        <h3 className="text-lg font-bold text-[#221F1F] mb-2 mt-1">
                          {plan.name}
                        </h3>
                        <p className="text-cpu-darkgray text-sm mb-6">
                          {plan.description}
                        </p>

                        <div className="mb-6 py-5 border-t border-b border-gray-200">
                          {plan.isInstitutional ? (
                            <>
                              <p className="text-2xl font-bold text-cpu-orange mb-1">
                                Sur devis
                              </p>
                              <p className="text-sm text-cpu-darkgray">
                                À partir de{" "}
                                {plan.priceYearly.toLocaleString("fr-FR")}{" "}
                                FCFA/an
                              </p>
                            </>
                          ) : (
                            <>
                              <div className="flex items-baseline justify-center gap-2 mb-2">
                                <p className="text-2xl font-bold text-cpu-orange">
                                  {plan.priceYearly.toLocaleString("fr-FR")}{" "}
                                  FCFA
                                </p>
                                <span className="text-lg text-cpu-darkgray">
                                  /an
                                </span>
                              </div>
                              <p className="text-sm text-cpu-darkgray text-center">
                                ou {plan.priceMonthly.toLocaleString("fr-FR")}{" "}
                                FCFA/mois
                              </p>
                            </>
                          )}
                        </div>

                        <ul className="space-y-3 mb-6 flex-1">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <Check className="h-5 w-5 text-cpu-green flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-[#221F1F]">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          className={`w-full py-3 font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 pricing-button ${
                            plan.recommended
                              ? "bg-cpu-orange text-white hover:bg-orange-700 hover:border-orange-700 active:bg-orange-800 focus:ring-cpu-orange"
                              : "border border-cpu-orange text-cpu-orange bg-white hover:bg-cpu-orange hover:text-white active:bg-cpu-orange active:text-white focus:ring-cpu-orange"
                          }`}
                        >
                          Choisir cette formule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Discount + Tab */}
            <TabsContent value="discount" className="mt-4">
              <div className="max-w-7xl mx-auto">
                {/* Barre de filtres */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-8 flex-wrap px-2">
                  {[
                    { value: "all", label: "Tous les partenaires" },
                    { value: "finance", label: "Finances et assurances" },
                    { value: "operations", label: "Soutien aux opérations" },
                    { value: "rh", label: "Ressources humaines" },
                    { value: "voyage", label: "Voyage" },
                    { value: "technologie", label: "Technologie" },
                    { value: "loisirs", label: "Loisirs et divertissement" },
                  ].map((filter) => {
                    // Utiliser l'état local discountFilter pour une détection plus fiable
                    const currentFilter =
                      discountFilter ||
                      searchParams.get("discountFilter") ||
                      "";
                    // Le filtre est actif si :
                    // - C'est "all" ET qu'il n'y a pas de filtre dans l'URL (chaîne vide)
                    // - OU c'est le filtre correspondant à celui dans l'URL
                    const isActive =
                      filter.value === "all"
                        ? !currentFilter || currentFilter === ""
                        : currentFilter === filter.value;
                    return (
                      <button
                        key={filter.value}
                        onClick={() => {
                          setActiveTab("discount");
                          const newFilter =
                            filter.value === "all" ? "" : filter.value;
                          setDiscountFilter(newFilter);
                          const params = new URLSearchParams(
                            searchParams.toString()
                          );
                          // S'assurer qu'on est sur l'onglet discount
                          params.set("tab", "discount");
                          if (filter.value === "all") {
                            params.delete("discountFilter");
                          } else {
                            params.set("discountFilter", filter.value);
                          }
                          router.replace(`/membres?${params.toString()}`, {
                            scroll: false,
                          });
                        }}
                        className={`
                          px-3 sm:px-4 md:px-5 py-2 rounded-lg font-inter text-xs sm:text-sm md:text-base font-medium whitespace-nowrap
                          transition-all duration-200 cursor-pointer flex-shrink-0
                          ${
                            isActive
                              ? "bg-cpu-green text-white shadow-sm"
                              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                          }
                        `}
                      >
                        {filter.label}
                      </button>
                    );
                  })}
                </div>

                {/* Grille des offres partenaires */}
                {(() => {
                  const activeFilter =
                    discountFilter ||
                    searchParams.get("discountFilter") ||
                    "all";
                  const filteredPartners =
                    activeFilter === "all" || activeFilter === ""
                      ? discountPartners
                      : discountPartners.filter(
                          (p) => p.category === activeFilter
                        );

                  const categoryLabels: { [key: string]: string } = {
                    technologie: "Technologie",
                    finance: "Finances et assurances",
                    voyage: "Voyage",
                    operations: "Soutien aux opérations",
                    rh: "Ressources humaines",
                    loisirs: "Loisirs et divertissement",
                  };

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                      {filteredPartners.map((partner) => (
                        <div
                          key={partner.id}
                          className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div
                            className={`h-24 ${partner.logoBg} flex items-center justify-center`}
                          >
                            <span
                              className={`${partner.logoText} ${
                                partner.logo === "orange"
                                  ? "text-2xl"
                                  : "text-lg"
                              } font-bold`}
                            >
                              {partner.logo}
                            </span>
                          </div>
                          <div className="p-5 relative">
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-cpu-orange text-white px-3 py-1 text-sm font-semibold">
                                {partner.offer}
                              </Badge>
                            </div>
                            <h3 className="text-lg font-bold text-[#221F1F] mb-2 mt-2">
                              {partner.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {partner.description}
                            </p>
                            <p className="text-xs text-gray-500 italic mb-3">
                              {partner.conditions}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="text-xs">
                                {categoryLabels[partner.category]}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}

                {/* Section CTA Partenaires */}
                <div className="bg-gray-100 rounded-xl p-8 md:p-12 text-center mb-8">
                  <p className="text-lg md:text-xl text-gray-700 mb-6">
                    Vous êtes partenaire ? Rejoignez notre programme Discount+
                    et offrez des avantages exclusifs aux membres CPU-PME.CI
                  </p>
                  <Button className="bg-cpu-orange hover:bg-[#D97420] text-white px-8 py-6 text-lg font-semibold">
                    Devenir partenaire
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="adhesion" className="mt-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-[#221F1F]">
                    Demande d'Adhésion
                  </h2>
                  <p className="text-cpu-darkgray">
                    Remplissez le formulaire ci-dessous pour rejoindre notre
                    confédération. Notre équipe vous contactera dans les 48
                    heures.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg shadow-sm bg-white">
                  <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Type de membre */}
                        <div className="md:col-span-2">
                          <h3 className="text-lg font-semibold mb-4 text-cpu-orange flex items-center">
                            <Users className="h-5 w-5 mr-2" />
                            Type de membre
                          </h3>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="memberType">
                            Je souhaite adhérer en tant que *
                          </Label>
                          <Select
                            value={selectedAdhesionType}
                            onValueChange={(value) =>
                              setSelectedAdhesionType(value as MemberType)
                            }
                            required
                          >
                            <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange focus:border-cpu-orange">
                              <SelectValue placeholder="Sélectionnez votre type de membre" />
                            </SelectTrigger>
                            <SelectContent>
                              {memberTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Champs conditionnels selon le type de membre */}
                        {selectedAdhesionType === "individuel" && (
                          <>
                            <div className="md:col-span-2 pt-4 border-t border-gray-200">
                              <h3 className="text-lg font-semibold mb-4 text-cpu-green flex items-center">
                                <Users className="h-5 w-5 mr-2" />
                                Informations personnelles
                              </h3>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                              <Label htmlFor="fullName">Nom & Prénoms *</Label>
                              <Input
                                id="fullName"
                                placeholder="Prénom et Nom"
                                required
                                className="border-gray-300"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="phone">Téléphone *</Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+225 XX XX XX XX XX"
                                required
                                className="border-gray-300"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email">Email *</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="email@exemple.ci"
                                required
                                className="border-gray-300"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="city">Ville / Région *</Label>
                              <Select required>
                                <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                                  <SelectValue placeholder="Sélectionnez une région" />
                                </SelectTrigger>
                                <SelectContent>
                                  {regions.map((region) => (
                                    <SelectItem key={region} value={region}>
                                      {region}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="status">Statut *</Label>
                              <Select required>
                                <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                                  <SelectValue placeholder="Sélectionnez votre statut" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="jeune_etudiant">
                                    Jeune/Étudiant
                                  </SelectItem>
                                  <SelectItem value="entrepreneur_projet">
                                    Entrepreneur en projet
                                  </SelectItem>
                                  <SelectItem value="professionnel_expert">
                                    Professionnel/Expert
                                  </SelectItem>
                                  <SelectItem value="salarie">
                                    Salarié
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                              <Label>Secteurs d'intérêt (multi-choix) *</Label>
                              <div className="text-sm text-gray-600 mb-2">
                                Sélectionnez un ou plusieurs secteurs d'intérêt
                              </div>
                              {Object.entries(secteursData).map(
                                ([secteurKey, secteur]) => (
                                  <div key={secteurKey} className="mb-4">
                                    <div className="font-medium text-sm text-gray-700 mb-2">
                                      {secteur.nom}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                      {secteur.filieres.map((filiere) => (
                                        <div
                                          key={filiere.id}
                                          className="flex items-center space-x-2"
                                        >
                                          <input
                                            type="checkbox"
                                            id={`interest-filiere-${filiere.id}`}
                                            checked={selectedSectors.includes(
                                              filiere.id
                                            )}
                                            onChange={(e) => {
                                              if (e.target.checked) {
                                                setSelectedSectors([
                                                  ...selectedSectors,
                                                  filiere.id,
                                                ]);
                                              } else {
                                                setSelectedSectors(
                                                  selectedSectors.filter(
                                                    (s) => s !== filiere.id
                                                  )
                                                );
                                              }
                                            }}
                                            className="h-4 w-4 text-cpu-orange focus:ring-cpu-orange border-gray-300 rounded"
                                          />
                                          <Label
                                            htmlFor={`interest-filiere-${filiere.id}`}
                                            className="text-sm font-normal cursor-pointer"
                                          >
                                            {filiere.nom}
                                          </Label>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>

                            <div className="md:col-span-2 space-y-2">
                              <Label>Affiliation organisationnelle *</Label>
                              <div className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="affiliation-yes"
                                    name="affiliation"
                                    checked={hasAffiliation === true}
                                    onChange={() => setHasAffiliation(true)}
                                    className="h-4 w-4 text-cpu-orange focus:ring-cpu-orange"
                                  />
                                  <Label
                                    htmlFor="affiliation-yes"
                                    className="font-normal cursor-pointer"
                                  >
                                    Oui
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="affiliation-no"
                                    name="affiliation"
                                    checked={hasAffiliation === false}
                                    onChange={() => setHasAffiliation(false)}
                                    className="h-4 w-4 text-cpu-orange focus:ring-cpu-orange"
                                  />
                                  <Label
                                    htmlFor="affiliation-no"
                                    className="font-normal cursor-pointer"
                                  >
                                    Non
                                  </Label>
                                </div>
                              </div>
                            </div>

                            {hasAffiliation && (
                              <div className="md:col-span-2 space-y-2">
                                <Label htmlFor="affiliationType">
                                  Type d'organisation *
                                </Label>
                                <Select required>
                                  <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                                    <SelectValue placeholder="Rechercher ou sélectionner" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="cooperative">
                                      Coopérative
                                    </SelectItem>
                                    <SelectItem value="association">
                                      Association
                                    </SelectItem>
                                    <SelectItem value="federation">
                                      Fédération
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                          </>
                        )}

                        {selectedAdhesionType === "entreprise" && (
                          <>
                            <div className="md:col-span-2 pt-4 border-t border-gray-200">
                              <h3 className="text-lg font-semibold mb-4 text-cpu-green flex items-center">
                                <Building2 className="h-5 w-5 mr-2" />
                                Informations sur l'entreprise
                              </h3>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                              <Label htmlFor="companyName">
                                Raison sociale *
                              </Label>
                              <Input
                                id="companyName"
                                placeholder="Ex: Ma Société SARL"
                                required
                                className="border-gray-300"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="rccm">
                                N° RCCM / Identifiant fiscal
                              </Label>
                              <Input
                                id="rccm"
                                placeholder="N° RCCM ou identifiant fiscal"
                                className="border-gray-300"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="formalizationStatus">
                                Statut de formalisation
                              </Label>
                              <Select>
                                <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                                  <SelectValue placeholder="Sélectionnez" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="formalise">
                                    Formalisé
                                  </SelectItem>
                                  <SelectItem value="en_cours">
                                    En cours de formalisation
                                  </SelectItem>
                                  <SelectItem value="non_formalise">
                                    Non formalisé
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="mainSector">
                                Secteur principal *
                              </Label>
                              <Select
                                value={selectedMainSector}
                                onValueChange={setSelectedMainSector}
                                required
                              >
                                <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                                  <SelectValue placeholder="Sélectionnez un secteur" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.values(secteursData).map(
                                    (secteur) => (
                                      <SelectItem
                                        key={secteur.id}
                                        value={secteur.id}
                                      >
                                        {secteur.nom}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                            </div>

                            {selectedMainSector && (
                              <div className="space-y-2">
                                <Label htmlFor="filiere">Filière *</Label>
                                <Select
                                  value={selectedFiliere}
                                  onValueChange={setSelectedFiliere}
                                  required
                                >
                                  <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                                    <SelectValue placeholder="Sélectionnez une filière" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {getFilieresForSector().map((filiere) => (
                                      <SelectItem
                                        key={filiere.id}
                                        value={filiere.id}
                                      >
                                        {filiere.nom}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            )}

                            {selectedFiliere && (
                              <div className="space-y-2">
                                <Label htmlFor="subCategory">
                                  Sous-filière
                                </Label>
                                <Select
                                  value={selectedSubCategory}
                                  onValueChange={setSelectedSubCategory}
                                >
                                  <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                                    <SelectValue placeholder="Sélectionnez une sous-filière (optionnel)" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {getSubCategoriesForFiliere().map(
                                      (subCat) => (
                                        <SelectItem
                                          key={subCat.nom}
                                          value={subCat.nom}
                                        >
                                          {subCat.nom}
                                        </SelectItem>
                                      )
                                    )}
                                  </SelectContent>
                                </Select>
                              </div>
                            )}

                            <div className="space-y-2">
                              <Label htmlFor="size">Taille *</Label>
                              <Select required>
                                <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                                  <SelectValue placeholder="Sélectionnez" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="micro">Micro</SelectItem>
                                  <SelectItem value="petite">Petite</SelectItem>
                                  <SelectItem value="moyenne">
                                    Moyenne
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="location">
                                Localisation (ville/région) *
                              </Label>
                              <Select required>
                                <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                                  <SelectValue placeholder="Sélectionnez une région" />
                                </SelectTrigger>
                                <SelectContent>
                                  {regions.map((region) => (
                                    <SelectItem key={region} value={region}>
                                      {region}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="md:col-span-2 pt-4 border-t border-gray-200">
                              <h3 className="text-lg font-semibold mb-4 text-cpu-orange flex items-center">
                                <Users className="h-5 w-5 mr-2" />
                                Contact principal
                              </h3>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="contactName">Nom *</Label>
                              <Input
                                id="contactName"
                                placeholder="Prénom et Nom"
                                required
                                className="border-gray-300"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="position">Fonction</Label>
                              <Input
                                id="position"
                                placeholder="Ex: Directeur Général"
                                className="border-gray-300"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email">
                                Email professionnel *
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="email@entreprise.ci"
                                required
                                className="border-gray-300"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="phone">Téléphone *</Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+225 XX XX XX XX XX"
                                required
                                className="border-gray-300"
                              />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                              <Label>Besoins prioritaires (3 max) *</Label>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                                {[
                                  "Financement",
                                  "Marchés",
                                  "Digitalisation",
                                  "Formation",
                                  "Export",
                                  "Structuration filière",
                                ].map((priority) => (
                                  <div
                                    key={priority}
                                    className="flex items-center space-x-2"
                                  >
                                    <input
                                      type="checkbox"
                                      id={`priority-${priority}`}
                                      checked={selectedPriorities.includes(
                                        priority
                                      )}
                                      onChange={(e) => {
                                        if (
                                          e.target.checked &&
                                          selectedPriorities.length < 3
                                        ) {
                                          setSelectedPriorities([
                                            ...selectedPriorities,
                                            priority,
                                          ]);
                                        } else if (!e.target.checked) {
                                          setSelectedPriorities(
                                            selectedPriorities.filter(
                                              (p) => p !== priority
                                            )
                                          );
                                        }
                                      }}
                                      disabled={
                                        !selectedPriorities.includes(
                                          priority
                                        ) && selectedPriorities.length >= 3
                                      }
                                      className="h-4 w-4 text-cpu-orange focus:ring-cpu-orange border-gray-300 rounded disabled:opacity-50"
                                    />
                                    <Label
                                      htmlFor={`priority-${priority}`}
                                      className="text-sm font-normal cursor-pointer"
                                    >
                                      {priority}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Maximum 3 sélections
                              </p>
                            </div>
                          </>
                        )}

                        {selectedAdhesionType === "associatif" && (
                          <>
                            <div className="md:col-span-2 pt-4 border-t border-gray-200">
                              <h3 className="text-lg font-semibold mb-4 text-cpu-green flex items-center">
                                <Building2 className="h-5 w-5 mr-2" />
                                Informations sur l'organisation
                              </h3>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                              <Label htmlFor="orgName">
                                Nom de l'organisation *
                              </Label>
                              <Input
                                id="orgName"
                                placeholder="Nom de l'organisation"
                                required
                                className="border-gray-300"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="orgType">Type *</Label>
                              <Select required>
                                <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                                  <SelectValue placeholder="Sélectionnez" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="cooperative">
                                    Coopérative
                                  </SelectItem>
                                  <SelectItem value="federation">
                                    Fédération
                                  </SelectItem>
                                  <SelectItem value="association">
                                    Association
                                  </SelectItem>
                                  <SelectItem value="gie">GIE</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="mainSector">
                                Secteur principal *
                              </Label>
                              <Select
                                value={selectedMainSector}
                                onValueChange={setSelectedMainSector}
                                required
                              >
                                <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                                  <SelectValue placeholder="Sélectionnez un secteur" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.values(secteursData).map(
                                    (secteur) => (
                                      <SelectItem
                                        key={secteur.id}
                                        value={secteur.id}
                                      >
                                        {secteur.nom}
                                      </SelectItem>
                                    )
                                  )}
                                </SelectContent>
                              </Select>
                            </div>

                            {selectedMainSector && (
                              <div className="space-y-2">
                                <Label htmlFor="filiere">
                                  Filière principale *
                                </Label>
                                <Select
                                  value={selectedFiliere}
                                  onValueChange={setSelectedFiliere}
                                  required
                                >
                                  <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                                    <SelectValue placeholder="Sélectionnez une filière" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {getFilieresForSector().map((filiere) => (
                                      <SelectItem
                                        key={filiere.id}
                                        value={filiere.id}
                                      >
                                        {filiere.nom}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            )}

                            <div className="md:col-span-2 space-y-2">
                              <Label>Filières secondaires (optionnel)</Label>
                              <div className="text-sm text-gray-600 mb-2">
                                Sélectionnez d'autres filières si applicable
                              </div>
                              {Object.entries(secteursData).map(
                                ([secteurKey, secteur]) => (
                                  <div key={secteurKey} className="mb-4">
                                    <div className="font-medium text-sm text-gray-700 mb-2">
                                      {secteur.nom}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                      {secteur.filieres.map((filiere) => (
                                        <div
                                          key={filiere.id}
                                          className="flex items-center space-x-2"
                                        >
                                          <input
                                            type="checkbox"
                                            id={`secondary-filiere-${filiere.id}`}
                                            checked={selectedSectors.includes(
                                              filiere.id
                                            )}
                                            onChange={(e) => {
                                              if (e.target.checked) {
                                                setSelectedSectors([
                                                  ...selectedSectors,
                                                  filiere.id,
                                                ]);
                                              } else {
                                                setSelectedSectors(
                                                  selectedSectors.filter(
                                                    (s) => s !== filiere.id
                                                  )
                                                );
                                              }
                                            }}
                                            disabled={
                                              filiere.id === selectedFiliere
                                            }
                                            className="h-4 w-4 text-cpu-orange focus:ring-cpu-orange border-gray-300 rounded disabled:opacity-50"
                                          />
                                          <Label
                                            htmlFor={`secondary-filiere-${filiere.id}`}
                                            className="text-sm font-normal cursor-pointer"
                                          >
                                            {filiere.nom}
                                          </Label>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>

                            <div className="md:col-span-2 space-y-2">
                              <Label>Zone d'intervention (régions) *</Label>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                                {regions.map((region) => (
                                  <div
                                    key={region}
                                    className="flex items-center space-x-2"
                                  >
                                    <input
                                      type="checkbox"
                                      id={`region-${region}`}
                                      checked={selectedSectors.includes(region)}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setSelectedSectors([
                                            ...selectedSectors,
                                            region,
                                          ]);
                                        } else {
                                          setSelectedSectors(
                                            selectedSectors.filter(
                                              (s) => s !== region
                                            )
                                          );
                                        }
                                      }}
                                      className="h-4 w-4 text-cpu-orange focus:ring-cpu-orange border-gray-300 rounded"
                                    />
                                    <Label
                                      htmlFor={`region-${region}`}
                                      className="text-sm font-normal cursor-pointer"
                                    >
                                      {region}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="md:col-span-2 pt-4 border-t border-gray-200">
                              <h3 className="text-lg font-semibold mb-4 text-cpu-orange flex items-center">
                                <Users className="h-5 w-5 mr-2" />
                                Gouvernance
                              </h3>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="presidentName">
                                Président/Coordonnateur *
                              </Label>
                              <Input
                                id="presidentName"
                                placeholder="Nom complet"
                                required
                                className="border-gray-300"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="presidentPhone">
                                Téléphone *
                              </Label>
                              <Input
                                id="presidentPhone"
                                type="tel"
                                placeholder="+225 XX XX XX XX XX"
                                required
                                className="border-gray-300"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="presidentEmail">Email *</Label>
                              <Input
                                id="presidentEmail"
                                type="email"
                                placeholder="email@organisation.ci"
                                required
                                className="border-gray-300"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="memberCount">
                                Nombre approximatif de membres *
                              </Label>
                              <Select required>
                                <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                                  <SelectValue placeholder="Sélectionnez" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1-50">
                                    1 - 50 membres
                                  </SelectItem>
                                  <SelectItem value="51-100">
                                    51 - 100 membres
                                  </SelectItem>
                                  <SelectItem value="101-500">
                                    101 - 500 membres
                                  </SelectItem>
                                  <SelectItem value="500+">
                                    Plus de 500 membres
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                              <Label htmlFor="legalStatus">
                                Statut légal et documents clés (optionnel)
                              </Label>
                              <Textarea
                                id="legalStatus"
                                placeholder="Décrivez le statut légal et les documents disponibles..."
                                className="min-h-[100px] border-gray-300"
                              />
                            </div>
                          </>
                        )}

                        {selectedAdhesionType === "institutionnel" && (
                          <>
                            <div className="md:col-span-2 pt-4 border-t border-gray-200">
                              <h3 className="text-lg font-semibold mb-4 text-cpu-green flex items-center">
                                <Building2 className="h-5 w-5 mr-2" />
                                Informations sur l'institution
                              </h3>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                              <Label htmlFor="institutionName">
                                Nom de l'institution / entreprise *
                              </Label>
                              <Input
                                id="institutionName"
                                placeholder="Nom de l'institution"
                                required
                                className="border-gray-300"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="institutionType">Type *</Label>
                              <Select required>
                                <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                                  <SelectValue placeholder="Sélectionnez" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="corporate">
                                    Corporate
                                  </SelectItem>
                                  <SelectItem value="banque_assurance">
                                    Banque/Assurance
                                  </SelectItem>
                                  <SelectItem value="bailleur">
                                    Bailleur
                                  </SelectItem>
                                  <SelectItem value="collectivite">
                                    Collectivité
                                  </SelectItem>
                                  <SelectItem value="agence_publique">
                                    Agence publique
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="md:col-span-2 pt-4 border-t border-gray-200">
                              <h3 className="text-lg font-semibold mb-4 text-cpu-orange flex items-center">
                                <Users className="h-5 w-5 mr-2" />
                                Contact principal
                              </h3>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="contactName">Nom *</Label>
                              <Input
                                id="contactName"
                                placeholder="Prénom et Nom"
                                required
                                className="border-gray-300"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="position">Fonction</Label>
                              <Input
                                id="position"
                                placeholder="Ex: Directeur Général"
                                className="border-gray-300"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email">
                                Email professionnel *
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="email@institution.ci"
                                required
                                className="border-gray-300"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="phone">Téléphone *</Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+225 XX XX XX XX XX"
                                required
                                className="border-gray-300"
                              />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                              <Label>Axes d'intérêt *</Label>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                                {[
                                  "Financement",
                                  "Innovation",
                                  "Emploi jeune",
                                  "Export",
                                  "Climat/RSE",
                                  "Filières prioritaires",
                                ].map((axis) => (
                                  <div
                                    key={axis}
                                    className="flex items-center space-x-2"
                                  >
                                    <input
                                      type="checkbox"
                                      id={`axis-${axis}`}
                                      checked={selectedPriorities.includes(
                                        axis
                                      )}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setSelectedPriorities([
                                            ...selectedPriorities,
                                            axis,
                                          ]);
                                        } else {
                                          setSelectedPriorities(
                                            selectedPriorities.filter(
                                              (p) => p !== axis
                                            )
                                          );
                                        }
                                      }}
                                      className="h-4 w-4 text-cpu-orange focus:ring-cpu-orange border-gray-300 rounded"
                                    />
                                    <Label
                                      htmlFor={`axis-${axis}`}
                                      className="text-sm font-normal cursor-pointer"
                                    >
                                      {axis}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                              <Label>Zone d'intervention *</Label>
                              <div className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="zone-nationale"
                                    name="zone"
                                    className="h-4 w-4 text-cpu-orange focus:ring-cpu-orange"
                                  />
                                  <Label
                                    htmlFor="zone-nationale"
                                    className="font-normal cursor-pointer"
                                  >
                                    Nationale
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="radio"
                                    id="zone-regions"
                                    name="zone"
                                    className="h-4 w-4 text-cpu-orange focus:ring-cpu-orange"
                                  />
                                  <Label
                                    htmlFor="zone-regions"
                                    className="font-normal cursor-pointer"
                                  >
                                    Régions ciblées
                                  </Label>
                                </div>
                              </div>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                              <Label htmlFor="targetRegions">
                                Régions ciblées (si applicable)
                              </Label>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                                {regions.map((region) => (
                                  <div
                                    key={region}
                                    className="flex items-center space-x-2"
                                  >
                                    <input
                                      type="checkbox"
                                      id={`target-region-${region}`}
                                      checked={selectedSectors.includes(
                                        `region-${region}`
                                      )}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setSelectedSectors([
                                            ...selectedSectors,
                                            `region-${region}`,
                                          ]);
                                        } else {
                                          setSelectedSectors(
                                            selectedSectors.filter(
                                              (s) => s !== `region-${region}`
                                            )
                                          );
                                        }
                                      }}
                                      className="h-4 w-4 text-cpu-orange focus:ring-cpu-orange border-gray-300 rounded"
                                    />
                                    <Label
                                      htmlFor={`target-region-${region}`}
                                      className="text-sm font-normal cursor-pointer"
                                    >
                                      {region}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                              <Label>Filières prioritaires *</Label>
                              <div className="text-sm text-gray-600 mb-2">
                                Sélectionnez les filières prioritaires pour
                                votre institution
                              </div>
                              {Object.entries(secteursData).map(
                                ([secteurKey, secteur]) => (
                                  <div key={secteurKey} className="mb-4">
                                    <div className="font-medium text-sm text-gray-700 mb-2">
                                      {secteur.nom}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                      {secteur.filieres.map((filiere) => (
                                        <div
                                          key={filiere.id}
                                          className="flex items-center space-x-2"
                                        >
                                          <input
                                            type="checkbox"
                                            id={`priority-filiere-${filiere.id}`}
                                            checked={selectedSectors.includes(
                                              `filiere-${filiere.id}`
                                            )}
                                            onChange={(e) => {
                                              if (e.target.checked) {
                                                setSelectedSectors([
                                                  ...selectedSectors,
                                                  `filiere-${filiere.id}`,
                                                ]);
                                              } else {
                                                setSelectedSectors(
                                                  selectedSectors.filter(
                                                    (s) =>
                                                      s !==
                                                      `filiere-${filiere.id}`
                                                  )
                                                );
                                              }
                                            }}
                                            className="h-4 w-4 text-cpu-orange focus:ring-cpu-orange border-gray-300 rounded"
                                          />
                                          <Label
                                            htmlFor={`priority-filiere-${filiere.id}`}
                                            className="text-sm font-normal cursor-pointer"
                                          >
                                            {filiere.nom}
                                          </Label>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </>
                        )}

                        {/* Membership Plan */}
                        <div className="md:col-span-2 pt-8 border-t border-gray-200">
                          <h3 className="text-lg font-semibold mb-4 text-cpu-green flex items-center">
                            <Award className="h-5 w-5 mr-2" />
                            Formule souhaitée
                          </h3>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="plan">Formule souhaitée *</Label>
                          <Select required>
                            <SelectTrigger className="bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                              <SelectValue placeholder="Choisissez une formule" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="starter">
                                Starter - 50 000 FCFA/an
                              </SelectItem>
                              <SelectItem value="business">
                                Business - 150 000 FCFA/an (Recommandé)
                              </SelectItem>
                              <SelectItem value="premium">
                                Premium - 300 000 FCFA/an
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="message">
                            Message ou informations complémentaires
                          </Label>
                          <Textarea
                            id="message"
                            placeholder="Décrivez brièvement votre entreprise et vos attentes..."
                            className="min-h-[120px] border-gray-300"
                          />
                        </div>
                      </div>

                      <div className="pt-8 border-t border-gray-200">
                        <Button
                          type="submit"
                          className="w-full bg-cpu-orange hover:bg-orange-700 active:bg-orange-800 text-white py-3 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cpu-orange transition-all"
                        >
                          Soumettre ma demande d'adhésion
                        </Button>
                        <p className="text-center text-xs text-cpu-darkgray mt-4">
                          En soumettant ce formulaire, vous acceptez nos
                          conditions générales d'adhésion.
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default function Members() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-lg text-gray-600">Chargement...</p>
          </div>
        </div>
      }
    >
      <MembersContent />
    </Suspense>
  );
}
