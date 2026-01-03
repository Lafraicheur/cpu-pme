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
  CreditCard,
  Filter,
  Menu,
  Info,
  Target,
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
import { useTypeMembresForSiteWeb, useRegionsForSiteWeb, useSecteursForSiteWeb } from "@/hooks/use-api";
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

// Données des partenaires Pass PME
const passPmePartners = [
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

// Structure hiérarchique: Région → Communes → Villes
interface CommuneData {
  [commune: string]: string[];
}

interface RegionData {
  [region: string]: CommuneData;
}

// Données hiérarchiques des régions de Côte d'Ivoire
const regionsData: RegionData = {
  "Abidjan": {
    "Abobo": ["Abobo-Baoulé", "Abobo-Gare", "Abobo-PK18", "Anonkoua-Kouté", "Avocatier", "Sagbé"],
    "Adjamé": ["Adjamé-Village", "Adjamé-Liberté", "Adjamé-Williamsville", "Adjamé-220 Logements"],
    "Attécoubé": ["Attécoubé-Centre", "Attécoubé-Santé", "Attécoubé-Locodjoro", "Attécoubé-Gbato"],
    "Cocody": ["Cocody-Centre", "Cocody-Riviera", "Cocody-Angré", "Cocody-Blockhaus", "Cocody-Deux-Plateaux", "Cocody-Saint-Jean", "Cocody-Danga"],
    "Koumassi": ["Koumassi-Centre", "Koumassi-Remblais", "Koumassi-Grand-Campement", "Koumassi-Zone Industrielle"],
    "Marcory": ["Marcory-Zone 4", "Marcory-Résidentiel", "Marcory-Anoumabo", "Marcory-Biétry"],
    "Plateau": ["Plateau-Ville", "Plateau-Dokui", "Plateau-Centre des Affaires"],
    "Port-Bouët": ["Port-Bouët-Centre", "Port-Bouët-Vridi", "Port-Bouët-Zone 4", "Port-Bouët-Gonzagueville"],
    "Treichville": ["Treichville-Centre", "Treichville-Biafra", "Treichville-Arras", "Treichville-Zone 3"],
    "Yopougon": ["Yopougon-Attié", "Yopougon-Niangon", "Yopougon-Sicogi", "Yopougon-Selmer", "Yopougon-Millionnaire"],
    "Bingerville": ["Bingerville-Centre", "Bingerville-Akandjé"],
    "Songon": ["Songon-Centre", "Songon-Agban"],
    "Anyama": ["Anyama-Centre", "Anyama-M'Pouto"]
  },
  "Agnéby-Tiassa": {
    "Agboville": ["Agboville-Centre", "Agboville-Guessabo", "Agboville-Odiénné"],
    "Rubino": ["Rubino-Centre"],
    "Azaguié": ["Azaguié-Centre", "Azaguié-Akoupé"],
    "Oress-Krobou": ["Oress-Krobou-Centre"],
    "Céchi": ["Céchi-Centre"],
    "Taabo": ["Taabo-Centre", "Taabo-Village"]
  },
  "Bélier": {
    "Yamoussoukro": ["Yamoussoukro-Centre", "Yamoussoukro-Kokrenou", "Yamoussoukro-Habitat", "Yamoussoukro-N'Gokro"],
    "Attiégouakro": ["Attiégouakro-Centre"],
    "Tiébissou": ["Tiébissou-Centre", "Tiébissou-Yakpabo"],
    "Toumodi": ["Toumodi-Centre", "Toumodi-Kokumbo"]
  },
  "Gbêkê": {
    "Bouaké": ["Bouaké-Centre", "Bouaké-Koko", "Bouaké-Dar-Es-Salam", "Bouaké-Belleville", "Bouaké-Nimbo"],
    "Béoumi": ["Béoumi-Centre", "Béoumi-Sakassou"],
    "Bodokro": ["Bodokro-Centre"],
    "Botro": ["Botro-Centre"],
    "Sakassou": ["Sakassou-Centre"]
  },
  "Haut-Sassandra": {
    "Daloa": ["Daloa-Centre", "Daloa-Tazibouo", "Daloa-Lobia", "Daloa-Gbokora"],
    "Issia": ["Issia-Centre", "Issia-Saïoua"],
    "Vavoua": ["Vavoua-Centre", "Vavoua-Dania"],
    "Zoukougbeu": ["Zoukougbeu-Centre"]
  },
  "San-Pédro": {
    "San-Pédro": ["San-Pédro-Centre", "San-Pédro-Bardot", "San-Pédro-Wharf", "San-Pédro-Balmer"],
    "Grand-Béréby": ["Grand-Béréby-Centre"],
    "Tabou": ["Tabou-Centre", "Tabou-Grabo"]
  },
  "Poro": {
    "Korhogo": ["Korhogo-Centre", "Korhogo-Tchengué", "Korhogo-Koko", "Korhogo-Soba"],
    "M'Bengué": ["M'Bengué-Centre"],
    "Dikodougou": ["Dikodougou-Centre"],
    "Sinématiali": ["Sinématiali-Centre"]
  },
  "Tonkpi": {
    "Man": ["Man-Centre", "Man-Libreville", "Man-Marabadjan", "Man-Zéaglo"],
    "Biankouma": ["Biankouma-Centre", "Biankouma-Gbonné"],
    "Danané": ["Danané-Centre", "Danané-Zouan"],
    "Logoualé": ["Logoualé-Centre"],
    "Sipilou": ["Sipilou-Centre"],
    "Zouan-Hounien": ["Zouan-Hounien-Centre"]
  },
  "Gôh": {
    "Gagnoa": ["Gagnoa-Centre", "Gagnoa-Bayota", "Gagnoa-Guébiasso", "Gagnoa-Diahouin"],
    "Oumé": ["Oumé-Centre", "Oumé-Diegonéfla"],
    "Bayota": ["Bayota-Centre"],
    "Guibéroua": ["Guibéroua-Centre"],
    "Ouragahio": ["Ouragahio-Centre"],
    "Serihio": ["Serihio-Centre"]
  },
  "Bounkani": {
    "Bouna": ["Bouna-Centre", "Bouna-Lassiri"],
    "Doropo": ["Doropo-Centre", "Doropo-Tehini"],
    "Nassian": ["Nassian-Centre"],
    "Téhini": ["Téhini-Centre"]
  },
  "Cavally": {
    "Guiglo": ["Guiglo-Centre", "Guiglo-Kaadé"],
    "Bloléquin": ["Bloléquin-Centre", "Bloléquin-Zéo"],
    "Taï": ["Taï-Centre", "Taï-Village"],
    "Toulepleu": ["Toulepleu-Centre"]
  },
  "Folon": {
    "Minignan": ["Minignan-Centre", "Minignan-Sokourala"],
    "Koro": ["Koro-Centre"],
    "Madinani": ["Madinani-Centre"]
  },
  "Gbôklé": {
    "Sassandra": ["Sassandra-Centre", "Sassandra-Dakpadou", "Sassandra-San-Pédro"],
    "Fresco": ["Fresco-Centre", "Fresco-Gbagbam"],
    "Méagui": ["Méagui-Centre"]
  },
  "Gontougo": {
    "Bondoukou": ["Bondoukou-Centre", "Bondoukou-Lafia", "Bondoukou-Gouméré"],
    "Koun-Fao": ["Koun-Fao-Centre"],
    "Sandégué": ["Sandégué-Centre"],
    "Tanda": ["Tanda-Centre", "Tanda-Assuéfry"],
    "Transua": ["Transua-Centre"]
  },
  "Grands-Ponts": {
    "Dabou": ["Dabou-Centre", "Dabou-Lopou", "Dabou-Toupah"],
    "Jacqueville": ["Jacqueville-Centre", "Jacqueville-Attoutou"],
    "Grand-Lahou": ["Grand-Lahou-Centre", "Grand-Lahou-Lahou-Kpanda"]
  },
  "Guémon": {
    "Duékoué": ["Duékoué-Centre", "Duékoué-Guézon"],
    "Bangolo": ["Bangolo-Centre", "Bangolo-Bédi-Goazon"],
    "Facobly": ["Facobly-Centre"],
    "Kouibly": ["Kouibly-Centre"]
  },
  "Hambol": {
    "Katiola": ["Katiola-Centre", "Katiola-Niakara", "Katiola-Fronan"],
    "Dabakala": ["Dabakala-Centre", "Dabakala-Satama-Sokoro"],
    "Niakaramandougou": ["Niakaramandougou-Centre"]
  },
  "Iffou": {
    "Daoukro": ["Daoukro-Centre", "Daoukro-Ettrokro"],
    "M'Bahiakro": ["M'Bahiakro-Centre", "M'Bahiakro-Andé"],
    "Prikro": ["Prikro-Centre"]
  },
  "Indénié-Djuablin": {
    "Abengourou": ["Abengourou-Centre", "Abengourou-Zaranou", "Abengourou-Ebilassokro"],
    "Agnibilékrou": ["Agnibilékrou-Centre", "Agnibilékrou-Tanguelan"],
    "Bettié": ["Bettié-Centre", "Bettié-Diamarakro"]
  },
  "Kabadougou": {
    "Odienné": ["Odienné-Centre", "Odienné-Samatiguila", "Odienné-Madinani"],
    "Gbéléban": ["Gbéléban-Centre"],
    "Madinani": ["Madinani-Centre"],
    "Samatiguila": ["Samatiguila-Centre"],
    "Séguélon": ["Séguélon-Centre"]
  },
  "La Mé": {
    "Adzopé": ["Adzopé-Centre", "Adzopé-Annépé"],
    "Akoupé": ["Akoupé-Centre", "Akoupé-Zeudji"],
    "Alépé": ["Alépé-Centre", "Alépé-Danguira"],
    "Yakassé-Attobrou": ["Yakassé-Attobrou-Centre"]
  },
  "Lôh-Djiboua": {
    "Divo": ["Divo-Centre", "Divo-Hiré", "Divo-Zégo"],
    "Guitry": ["Guitry-Centre", "Guitry-Oghlawapo"],
    "Lakota": ["Lakota-Centre", "Lakota-Babouakro"]
  },
  "Marahoué": {
    "Bouaflé": ["Bouaflé-Centre", "Bouaflé-Kononfla"],
    "Sinfra": ["Sinfra-Centre", "Sinfra-Kouetinfla"],
    "Zuénoula": ["Zuénoula-Centre", "Zuénoula-Gohitafla"]
  },
  "Moronou": {
    "Bongouanou": ["Bongouanou-Centre", "Bongouanou-Tiémélékro"],
    "M'Batto": ["M'Batto-Centre"],
    "Arrah": ["Arrah-Centre"]
  },
  "Nawa": {
    "Soubré": ["Soubré-Centre", "Soubré-Liliyo", "Soubré-Okrouyo"],
    "Buyo": ["Buyo-Centre"],
    "Guéyo": ["Guéyo-Centre"],
    "Méadji": ["Méadji-Centre"]
  },
  "N'Zi": {
    "Dimbokro": ["Dimbokro-Centre", "Dimbokro-Ettien"],
    "Bocanda": ["Bocanda-Centre", "Bocanda-Kouassi-Datekro"],
    "Kouassi-Kouassikro": ["Kouassi-Kouassikro-Centre"]
  },
  "Tchologo": {
    "Ferkessédougou": ["Ferkessédougou-Centre", "Ferkessédougou-Sikolo"],
    "Kong": ["Kong-Centre", "Kong-Nafana"],
    "Ouangolodougou": ["Ouangolodougou-Centre", "Ouangolodougou-Niellé"]
  },
  "Worodougou": {
    "Séguéla": ["Séguéla-Centre", "Séguéla-Worofla", "Séguéla-Massala"],
    "Kani": ["Kani-Centre"],
    "Mankono": ["Mankono-Centre", "Mankono-Tiéningboué"]
  },
  "Moyen-Cavally": {
    "Guiglo": ["Guiglo-Centre", "Guiglo-Kaadé"],
    "Duékoué": ["Duékoué-Centre", "Duékoué-Guézon"],
    "Taï": ["Taï-Centre", "Taï-Village"]
  },
  "Moyen-Comoé": {
    "Aboisso": ["Aboisso-Centre", "Aboisso-Yaou", "Aboisso-Bianouan"],
    "Adiaké": ["Adiaké-Centre", "Adiaké-Etuéboué"],
    "Ayamé": ["Ayamé-Centre"],
    "Grand-Bassam": ["Grand-Bassam-Centre", "Grand-Bassam-Bongo", "Grand-Bassam-Modeste"],
    "Tiapoum": ["Tiapoum-Centre"]
  },
  "Sud-Comoé": {
    "Aboisso": ["Aboisso-Centre", "Aboisso-Yaou", "Aboisso-Bianouan"],
    "Adiaké": ["Adiaké-Centre", "Adiaké-Etuéboué"],
    "Grand-Bassam": ["Grand-Bassam-Centre", "Grand-Bassam-Bongo"],
    "Tiapoum": ["Tiapoum-Centre"]
  }
};

// Pour les régions non détaillées, communes génériques
const getDefaultCommunes = (): CommuneData => ({
  "Commune Centre": ["Ville Centre"],
  "Commune Nord": ["Ville Nord"],
  "Commune Sud": ["Ville Sud"],
  "Commune Est": ["Ville Est"],
  "Commune Ouest": ["Ville Ouest"]
});

// Données des organisations par type en Côte d'Ivoire
const organisationsByType: { [key: string]: string[] } = {
  federation: [
    "FENACOPACI (Fédération Nationale des Coopératives Agricoles de Côte d'Ivoire)",
    "FENASCOVICI (Fédération Nationale des Coopératives Vivrières de Côte d'Ivoire)",
    "Fédération Ivoirienne du Commerce et de la Distribution",
    "Fédération des PME et PMI de Côte d'Ivoire",
    "Fédération Nationale des Artisans de Côte d'Ivoire",
    "Autre"
  ],
  cooperative: [
    "CAYAT (Coopérative Agricole de Yamoussoukro)",
    "COOPEC-CI (Coopérative d'Épargne et de Crédit)",
    "SCPA-RE (Société Coopérative de Production Agricole)",
    "Coopérative des Planteurs de Cacao de Soubré",
    "Coopérative des Femmes Transformatrices d'Abobo",
    "UNACOOPEC-CI (Union Nationale des Coopératives d'Épargne et de Crédit)",
    "Autre"
  ],
  association: [
    "Association des Jeunes Entrepreneurs de Côte d'Ivoire",
    "Association Ivoirienne des Femmes d'Affaires",
    "Association des Commerçants du Plateau",
    "Association des Professionnels du Numérique de Côte d'Ivoire",
    "Association des Artisans de Yopougon",
    "Association des Exportateurs de Côte d'Ivoire",
    "Autre"
  ],
  groupement: [
    "GIE Agro-business Abidjan",
    "Groupement des Transformateurs Agroalimentaires",
    "GIE Transport et Logistique CI",
    "Groupement des Prestataires de Services BTP",
    "GIE Innovation Tech Côte d'Ivoire",
    "Groupement des Producteurs de Cultures Maraîchères",
    "Autre"
  ]
};

// Axes d'intérêt pour les membres institutionnels
const axesInteretOptions = [
  "Financement des PME",
  "Export & Commerce international",
  "Transformation numérique",
  "Innovation & Technologie",
  "Climat & RSE",
  "Agriculture & Agroalimentaire",
  "Emploi des jeunes",
  "Formation & Renforcement des capacités"
];

// Filières prioritaires pour les membres institutionnels
const filieresPrioritairesOptions = [
  "Agriculture végétale",
  "Pêche & aquaculture",
  "Agro-transformation & agroalimentaire PME",
  "Artisanat de production & économie de patrimoine",
  "Énergie & services associés",
  "Mines, carrières & sous-traitance",
  "Services",
  "Tourisme, culture & loisirs",
  "Numérique & technologies",
  "Élevage & productions animales",
  "Services, intrants & AgriTech",
  "Industrie & transformation",
  "BTP, construction & immobilier",
  "Environnement industriel & économie circulaire",
  "Commerce & distribution",
  "Transport, logistique & mobilité",
  "Finance & assurances",
  "Éducation & formation"
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
  
  // États pour le formulaire d'adhésion
  const [selectedAdhesionType, setSelectedAdhesionType] = useState<MemberType | "">("");
  const [selectedSubProfile, setSelectedSubProfile] = useState<string>("");
  const [isCompetitionSubcontractor, setIsCompetitionSubcontractor] = useState<boolean | null>(null);
  const [hasFinancingProject, setHasFinancingProject] = useState<boolean | null>(null);
  const [hasAffiliation, setHasAffiliation] = useState<boolean>(false);
  const [selectedOrgType, setSelectedOrgType] = useState<string>("");
  const [selectedOrganisation, setSelectedOrganisation] = useState<string>("");
  const [customOrganisationName, setCustomOrganisationName] = useState<string>("");
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedMainSector, setSelectedMainSector] = useState<string>("");
  const [selectedFiliere, setSelectedFiliere] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [interventionScope, setInterventionScope] = useState<string>("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [siegeRegion, setSiegeRegion] = useState<string>("");
  const [siegeCommune, setSiegeCommune] = useState<string>("");
  const [siegeVille, setSiegeVille] = useState<string>("");
  const [siegeVillage, setSiegeVillage] = useState<string>("");
  const [selectedBadge, setSelectedBadge] = useState<string>("");
  // États pour les champs du formulaire d'adhésion
  const [formName, setFormName] = useState<string>("");
  const [formPosition, setFormPosition] = useState<string>("");
  const [formEmail, setFormEmail] = useState<string>("");
  const [formPhone, setFormPhone] = useState<string>("");
  const [formMessage, setFormMessage] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  // États spécifiques aux membres institutionnels
  const [selectedAxesInteret, setSelectedAxesInteret] = useState<string[]>([]);
  const [selectedFilieresPrioritaires, setSelectedFilieresPrioritaires] = useState<string[]>([]);
  const [hasBureauCI, setHasBureauCI] = useState<boolean>(false);
  const { toast } = useToast();

  // Récupérer les types de membres depuis l'API
  const { data: typeMembresApi, isLoading: isLoadingTypeMembres, error: errorTypeMembres } = useTypeMembresForSiteWeb();
  
  // Debug: Log des données récupérées
  useEffect(() => {
    console.log('🔍 [DEBUG PAGE] isLoadingTypeMembres:', isLoadingTypeMembres);
    console.log('🔍 [DEBUG PAGE] errorTypeMembres:', errorTypeMembres);
    console.log('🔍 [DEBUG PAGE] typeMembresApi:', typeMembresApi);
    console.log('🔍 [DEBUG PAGE] typeMembresApi est un tableau?', Array.isArray(typeMembresApi));
    if (Array.isArray(typeMembresApi)) {
      console.log('🔍 [DEBUG PAGE] Nombre de types de membres:', typeMembresApi.length);
      if (typeMembresApi.length > 0) {
        console.log('🔍 [DEBUG PAGE] Premier type de membre:', typeMembresApi[0]);
      }
    }
  }, [typeMembresApi, isLoadingTypeMembres, errorTypeMembres]);
  
  // Trouver le type de membre sélectionné et ses profils
  const selectedTypeMembre = selectedAdhesionType && Array.isArray(typeMembresApi) && typeMembresApi.length > 0
    ? (typeMembresApi.find(tm => {
        const typeName = tm.name.toLowerCase();
        return typeName.includes(selectedAdhesionType) || 
               (selectedAdhesionType === 'individuel' && typeName.includes('individuel')) ||
               (selectedAdhesionType === 'entreprise' && typeName.includes('entreprise')) ||
               (selectedAdhesionType === 'associatif' && (typeName.includes('associatif') || typeName.includes('organisation'))) ||
               (selectedAdhesionType === 'institutionnel' && typeName.includes('institutionnel'));
      }) || null)
    : null;
  
  // Utiliser les profils directement depuis le type de membre (déjà inclus dans la réponse)
  // Au lieu de faire un appel API séparé qui nécessite une authentification
  const profilsApi = selectedTypeMembre?.profils || [];
  const isLoadingProfils = false; // Pas de chargement car les profils sont déjà dans les données
  
  // Debug: Log des profils récupérés
  useEffect(() => {
    if (selectedTypeMembre) {
      console.log('🔍 [DEBUG PROFILS] selectedTypeMembre:', selectedTypeMembre);
      console.log('🔍 [DEBUG PROFILS] profilsApi:', profilsApi);
      console.log('🔍 [DEBUG PROFILS] Nombre de profils:', profilsApi.length);
    }
  }, [selectedTypeMembre, profilsApi]);

  // Récupérer les régions depuis l'API
  const { data: regionsApi, isLoading: isLoadingRegions, error: errorRegions } = useRegionsForSiteWeb();
  
  // Debug: Log des régions récupérées
  useEffect(() => {
    if (regionsApi) {
      console.log('🔍 [DEBUG REGIONS] regionsApi:', regionsApi);
      console.log('🔍 [DEBUG REGIONS] Nombre de régions:', regionsApi.length);
    }
  }, [regionsApi]);

  // Récupérer les secteurs depuis l'API
  const { data: secteursApi, isLoading: isLoadingSecteurs, error: errorSecteurs } = useSecteursForSiteWeb();
  
  // Debug: Log des secteurs récupérés
  useEffect(() => {
    if (secteursApi) {
      console.log('🔍 [DEBUG SECTEURS] secteursApi:', secteursApi);
      console.log('🔍 [DEBUG SECTEURS] Nombre de secteurs:', secteursApi.length);
    }
  }, [secteursApi]);

  // Obtenir la liste des régions (depuis l'API ou données statiques)
  const getAvailableRegions = (): string[] => {
    if (interventionScope === "regions_specifiques" && Array.isArray(regionsApi) && regionsApi.length > 0) {
      // Utiliser les régions de l'API
      return regionsApi
        .filter((r) => r.isActive !== false)
        .map((r) => r.name)
        .sort();
    }
    // Fallback vers les données statiques
    return Object.keys(regionsData).sort();
  };

  // Simuler le chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // S'assurer que le composant est monté côté client pour éviter les erreurs d'hydratation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Réinitialiser les états quand le type de membre change
  useEffect(() => {
    setHasAffiliation(false);
    setSelectedOrgType("");
    setSelectedOrganisation("");
    setCustomOrganisationName("");
    setSelectedPriorities([]);
    setSelectedSectors([]);
    setSelectedMainSector("");
    setSelectedFiliere("");
    setSelectedSubCategory("");
    setSelectedActivities([]);
    setInterventionScope("");
    setSelectedRegions([]);
    setSiegeRegion("");
    setSiegeVille("");
    setSiegeCommune("");
    setSiegeVillage("");
    setSelectedAxesInteret([]);
    setSelectedFilieresPrioritaires([]);
    setHasBureauCI(false);
  }, [selectedAdhesionType]);

  // Déterminer automatiquement le secteur quand une filière est sélectionnée
  useEffect(() => {
    if (selectedFiliere) {
      const sectorInfo = findSectorForFiliere(selectedFiliere);
      if (sectorInfo && selectedMainSector !== sectorInfo.secteurId) {
        setSelectedMainSector(sectorInfo.secteurId);
      }
    } else {
      // Si aucune filière n'est sélectionnée, réinitialiser le secteur
      setSelectedMainSector("");
    }
  }, [selectedFiliere]);

  // Déterminer automatiquement la région quand une commune est sélectionnée
  useEffect(() => {
    if (siegeCommune) {
      const regionInfo = findRegionForCommune(siegeCommune);
      if (regionInfo) {
        // Utiliser l'ID si disponible, sinon le nom
        const regionValue = regionInfo.regionId || regionInfo.regionName;
        if (siegeRegion !== regionValue) {
          setSiegeRegion(regionValue);
        }
      }
    } else {
      // Si aucune commune n'est sélectionnée, réinitialiser la région
      setSiegeRegion("");
    }
  }, [siegeCommune]);

  // Réinitialiser sous-catégorie et activités quand la filière change
  useEffect(() => {
    setSelectedSubCategory("");
    setSelectedActivities([]);
  }, [selectedFiliere]);

  // Réinitialiser activités quand la sous-catégorie change
  useEffect(() => {
    setSelectedActivities([]);
  }, [selectedSubCategory]);

  // Réinitialiser les champs d'organisation quand hasAffiliation change
  useEffect(() => {
    if (!hasAffiliation) {
      setSelectedOrgType("");
      setSelectedOrganisation("");
      setCustomOrganisationName("");
    }
  }, [hasAffiliation]);

  // Obtenir toutes les filières de tous les secteurs (depuis l'API ou données statiques)
  const getAllFilieres = () => {
    // Utiliser les données de l'API si disponibles
    if (secteursApi && Array.isArray(secteursApi) && secteursApi.length > 0) {
      const allFilieres: Array<{ filiere: { id: string; nom: string; sousFiliere: any[] }; secteurId: string; secteurNom: string }> = [];
      secteursApi.forEach((secteur) => {
        if (secteur.filieres && secteur.filieres.length > 0) {
          secteur.filieres.forEach((filiere) => {
            if (filiere.isActive !== false) {
              allFilieres.push({
                filiere: {
                  id: filiere.id,
                  nom: filiere.name,
                  sousFiliere: filiere.sousFiliere || [],
                },
                secteurId: secteur.id,
                secteurNom: secteur.name,
              });
            }
          });
        }
      });
      return allFilieres;
    }
    
    // Fallback vers les données statiques
    const allFilieres: Array<{ filiere: { id: string; nom: string; sousCategories: any[] }; secteurId: string; secteurNom: string }> = [];
    Object.values(secteursData).forEach((secteur) => {
      secteur.filieres.forEach((filiere) => {
        allFilieres.push({
          filiere,
          secteurId: secteur.id,
          secteurNom: secteur.nom,
        });
      });
    });
    return allFilieres;
  };

  // Trouver le secteur d'une filière donnée (depuis l'API ou données statiques)
  const findSectorForFiliere = (filiereId: string) => {
    // Utiliser les données de l'API si disponibles
    if (secteursApi && Array.isArray(secteursApi) && secteursApi.length > 0) {
      for (const secteur of secteursApi) {
        if (secteur.filieres && secteur.filieres.length > 0) {
          const filiere = secteur.filieres.find((f) => f.id === filiereId && f.isActive !== false);
          if (filiere) {
            return { secteurId: secteur.id, secteurNom: secteur.name };
          }
        }
      }
      return null;
    }
    
    // Fallback vers les données statiques
    for (const secteur of Object.values(secteursData)) {
      const filiere = secteur.filieres.find((f) => f.id === filiereId);
      if (filiere) {
        return { secteurId: secteur.id, secteurNom: secteur.nom };
      }
    }
    return null;
  };

  // Obtenir les filières du secteur sélectionné (pour compatibilité)
  const getFilieresForSector = () => {
    // Utiliser les données de l'API si disponibles
    if (secteursApi && Array.isArray(secteursApi) && secteursApi.length > 0) {
      const secteur = secteursApi.find((s) => s.id === selectedMainSector);
      if (secteur && secteur.filieres) {
        return secteur.filieres.filter((f) => f.isActive !== false);
      }
      return [];
    }
    
    // Fallback vers les données statiques
    if (!selectedMainSector || !secteursData[selectedMainSector]) return [];
    return secteursData[selectedMainSector].filieres;
  };

  // Obtenir les sous-filières de la filière sélectionnée (depuis l'API ou données statiques)
  const getSubCategoriesForFiliere = () => {
    if (!selectedFiliere) return [];
    
    // Utiliser les données de l'API si disponibles
    if (secteursApi && Array.isArray(secteursApi) && secteursApi.length > 0) {
      for (const secteur of secteursApi) {
        if (secteur.filieres && secteur.filieres.length > 0) {
          const filiere = secteur.filieres.find((f) => f.id === selectedFiliere && f.isActive !== false);
          if (filiere && filiere.sousFiliere) {
            return filiere.sousFiliere
              .filter((sf) => sf.isActive !== false)
              .map((sf) => ({ id: sf.id, nom: sf.name }));
          }
        }
      }
      return [];
    }
    
    // Fallback vers les données statiques
    const allFilieres = getAllFilieres();
    const filiereData = allFilieres.find((f) => f.filiere.id === selectedFiliere);
    if (filiereData) {
      // Vérifier si c'est une structure API (sousFiliere) ou statique (sousCategories)
      if ('sousFiliere' in filiereData.filiere) {
        return (filiereData.filiere as any).sousFiliere
          .filter((sf: any) => sf.isActive !== false)
          .map((sf: any) => ({ id: sf.id, nom: sf.name }));
      } else if ('sousCategories' in filiereData.filiere) {
        return (filiereData.filiere as any).sousCategories;
      }
    }
    return [];
  };

  // Obtenir les activités de la sous-filière sélectionnée (depuis l'API ou données statiques)
  const getActivitiesForSubCategory = () => {
    if (!selectedSubCategory) return [];
    
    // Utiliser les données de l'API si disponibles
    if (secteursApi && Array.isArray(secteursApi) && secteursApi.length > 0) {
      for (const secteur of secteursApi) {
        if (secteur.filieres && secteur.filieres.length > 0) {
          for (const filiere of secteur.filieres) {
            if (filiere.isActive !== false && filiere.sousFiliere) {
              const sousFiliere = filiere.sousFiliere.find(
                (sf) => (sf.id === selectedSubCategory || sf.name === selectedSubCategory) && sf.isActive !== false
              );
              if (sousFiliere && sousFiliere.activites) {
                return sousFiliere.activites
                  .filter((a) => a.isActive !== false)
                  .map((a) => a.name);
              }
            }
          }
        }
      }
      return [];
    }
    
    // Fallback vers les données statiques
    const sousCategories = getSubCategoriesForFiliere();
    const sousCategorie = sousCategories.find((sc: { nom: string; sectionsDeTags: any[] }) => sc.nom === selectedSubCategory);
    if (!sousCategorie) return [];
    
    // Collecter tous les tags de toutes les sections
    const allTags: string[] = [];
    if ('sectionsDeTags' in sousCategorie && Array.isArray(sousCategorie.sectionsDeTags)) {
      sousCategorie.sectionsDeTags.forEach((section: { tags: string[] }) => {
        allTags.push(...section.tags);
      });
    }
    return allTags;
  };

  // Gérer la sélection/désélection d'une activité
  const toggleActivity = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  // Gérer la sélection/désélection d'une région
  const toggleRegion = (region: string) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter((r) => r !== region));
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  };

  // Tout sélectionner ou tout désélectionner les régions
  const toggleAllRegions = () => {
    const allRegions = getAvailableRegions();
    if (selectedRegions.length === allRegions.length) {
      // Si toutes sont sélectionnées, tout désélectionner
      setSelectedRegions([]);
    } else {
      // Sinon, tout sélectionner
      setSelectedRegions([...allRegions]);
    }
  };

  // Obtenir toutes les communes de toutes les régions (depuis l'API ou données statiques)
  const getAllCommunes = () => {
    // Utiliser les données de l'API si disponibles
    if (regionsApi && Array.isArray(regionsApi) && regionsApi.length > 0) {
      const allCommunes: Array<{ commune: { id: string; name: string; ville_id: string }; regionId: string; regionName: string; villeId: string; villeName: string }> = [];
      regionsApi.forEach((region) => {
        if (region.villes && region.villes.length > 0) {
          region.villes.forEach((ville) => {
            if (ville.isActive !== false && ville.communes && ville.communes.length > 0) {
              ville.communes.forEach((commune) => {
                if (commune.isActive !== false) {
                  allCommunes.push({
                    commune: {
                      id: commune.id,
                      name: commune.name,
                      ville_id: commune.ville_id,
                    },
                    regionId: region.id,
                    regionName: region.name,
                    villeId: ville.id,
                    villeName: ville.name,
                  });
                }
              });
            }
          });
        }
      });
      return allCommunes;
    }
    
    // Fallback vers les données statiques
    const allCommunes: Array<{ commune: { name: string }; regionName: string }> = [];
    Object.keys(regionsData).forEach((regionName) => {
      Object.keys(regionsData[regionName]).forEach((communeName) => {
        allCommunes.push({
          commune: { name: communeName },
          regionName: regionName,
        });
      });
    });
    return allCommunes;
  };

  // Obtenir les communes disponibles (filtrées par région si une région est sélectionnée)
  const getAvailableCommunes = () => {
    const allCommunes = getAllCommunes();
    
    // Si une région est sélectionnée et pas de commune, filtrer par région
    if (siegeRegion && !siegeCommune) {
      return allCommunes.filter((item) => {
        // Pour l'API : comparer par ID ou nom
        if ('regionId' in item) {
          return item.regionId === siegeRegion || item.regionName === siegeRegion;
        }
        // Pour les données statiques : comparer par nom
        return item.regionName === siegeRegion;
      });
    }
    
    // Sinon, retourner toutes les communes
    return allCommunes;
  };

  // Trouver la région d'une commune donnée (depuis l'API ou données statiques)
  const findRegionForCommune = (communeName: string) => {
    // Utiliser les données de l'API si disponibles
    if (regionsApi && Array.isArray(regionsApi) && regionsApi.length > 0) {
      for (const region of regionsApi) {
        if (region.villes && region.villes.length > 0) {
          for (const ville of region.villes) {
            if (ville.isActive !== false && ville.communes && ville.communes.length > 0) {
              const commune = ville.communes.find((c) => (c.name === communeName || c.id === communeName) && c.isActive !== false);
              if (commune) {
                return { regionId: region.id, regionName: region.name };
              }
            }
          }
        }
      }
      return null;
    }
    
    // Fallback vers les données statiques
    for (const regionName of Object.keys(regionsData)) {
      if (regionsData[regionName][communeName]) {
        return { regionId: regionName, regionName: regionName };
      }
    }
    return null;
  };

  // Obtenir les communes d'une région (depuis l'API ou données statiques)
  const getCommunesForRegion = (region: string): string[] => {
    // Utiliser les données de l'API si disponibles
    if (regionsApi && Array.isArray(regionsApi) && regionsApi.length > 0) {
      const regionData = regionsApi.find((r) => (r.id === region || r.name === region) && r.isActive !== false);
      if (regionData && regionData.villes) {
        const communes: string[] = [];
        regionData.villes.forEach((ville) => {
          if (ville.isActive !== false && ville.communes) {
            ville.communes.forEach((commune) => {
              if (commune.isActive !== false) {
                communes.push(commune.name);
              }
            });
          }
        });
        return communes.sort();
      }
      return [];
    }
    
    // Fallback vers les données statiques
    if (regionsData[region]) {
      return Object.keys(regionsData[region]).sort();
    }
    return Object.keys(getDefaultCommunes());
  };

  // Obtenir les villes d'une commune (depuis l'API ou données statiques)
  const getVillesForCommune = (region: string, commune: string): string[] => {
    // Utiliser les données de l'API si disponibles
    if (regionsApi && Array.isArray(regionsApi) && regionsApi.length > 0) {
      const regionData = regionsApi.find((r) => (r.id === region || r.name === region) && r.isActive !== false);
      if (regionData && regionData.villes) {
        for (const ville of regionData.villes) {
          if (ville.isActive !== false && ville.communes) {
            const communeData = ville.communes.find((c) => (c.name === commune || c.id === commune) && c.isActive !== false);
            if (communeData && communeData.quartiers) {
              return communeData.quartiers
                .filter((q) => q.isActive !== false)
                .map((q) => q.name)
                .sort();
            }
          }
        }
      }
      return [];
    }
    
    // Fallback vers les données statiques
    if (regionsData[region] && regionsData[region][commune]) {
      return regionsData[region][commune];
    }
    const defaults = getDefaultCommunes();
    if (defaults[commune]) {
      return defaults[commune];
    }
    return ["Ville Centre"];
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
  const [passPmeFilter, setPassPmeFilter] = useState(
    searchParams.get("passPmeFilter") || ""
  );

  // Synchroniser activeTab et passPmeFilter avec l'URL quand searchParams change
  useEffect(() => {
    const tab = searchParams.get("tab") || "annuaire";
    const filter = searchParams.get("passPmeFilter") || "";

    // Si un passPmeFilter est présent dans l'URL, basculer vers l'onglet pass-pme
    if (filter && tab !== "pass-pme") {
      setActiveTab("pass-pme");
      setPassPmeFilter(filter);
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", "pass-pme");
      router.replace(`/membres?${params.toString()}`, { scroll: false });
    } else {
      if (tab !== activeTab) {
        setActiveTab(tab);
      }
      if (filter !== passPmeFilter) {
        setPassPmeFilter(filter);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Gérer le pré-remplissage du plan séparément pour éviter les conflits
  useEffect(() => {
    const planParam = searchParams.get("plan");
    const tab = searchParams.get("tab") || "annuaire";

    // Si un plan est spécifié dans l'URL et qu'on est sur l'onglet adhesion
    if (planParam && tab === "adhesion" && activeTab === "adhesion") {
      // Vérifier que le plan existe dans la liste des plans disponibles
      const planExists = membershipPlans.some((plan) => plan.name === planParam);
      if (planExists && selectedBadge !== planParam) {
        setSelectedBadge(planParam);
        // Supprimer le paramètre plan de l'URL après un court délai pour éviter les conflits
        // Utiliser window.history pour éviter les re-renders
        setTimeout(() => {
          const params = new URLSearchParams(window.location.search);
          params.delete("plan");
          const newUrl = params.toString() ? `/membres?${params.toString()}` : "/membres";
          window.history.replaceState({}, "", newUrl);
        }, 200);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Fonction pour obtenir le titre adapté selon l'onglet actif
  const getPageTitle = () => {
    switch (activeTab) {
      case "annuaire":
        return "Annuaire";
      case "avantages":
        return "Avantages Membres";
      case "pass-pme":
        return "Pass PME";
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
      case "pass-pme":
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
    // Réinitialiser le formulaire
    setSelectedAdhesionType("");
    setSelectedSubProfile("");
    setIsCompetitionSubcontractor(null);
    setHasFinancingProject(null);
    setSelectedBadge("");
    setSelectedMainSector("");
    setSelectedFiliere("");
    setFormName("");
    setFormPosition("");
    setFormEmail("");
    setFormPhone("");
    setFormMessage("");
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

  // Fonction pour filtrer les plans d'abonnement selon le type de membre et le sous-profil
  const getAvailablePlans = () => {
    if (!selectedAdhesionType) {
      return [];
    }
    
    // Cas spécial : Si associatif avec sous-profil "federation_filiere", seul "Abonnement Fédération" est disponible
    if (selectedAdhesionType === "associatif" && selectedSubProfile === "federation_filiere") {
      return membershipPlans.filter((plan) => plan.name === "Abonnement Fédération");
    }
    
    return membershipPlans.filter((plan) => {
      // Si le plan n'a pas de memberTypes défini, on le garde pour compatibilité
      if (!plan.memberTypes || plan.memberTypes.length === 0) {
        return false;
      }
      // Vérifier si le type de membre sélectionné est dans la liste des types autorisés
      return plan.memberTypes.includes(selectedAdhesionType);
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
                    : activeTab === "pass-pme"
                    ? "Pass PME"
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
              // Supprimer passPmeFilter si on change d'onglet (sauf si on va sur pass-pme)
              if (value !== "pass-pme") {
                params.delete("passPmeFilter");
              }
              router.replace(`/membres?${params.toString()}`, {
                scroll: false,
              });
            }}
            className="w-full"
          >
            {/* Navigation par Onglets */}
            <div className="flex justify-center mb-8">
              <TabsList className="inline-flex items-center justify-center gap-4 sm:gap-5 md:gap-6 px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-gray-50/50 rounded-xl border border-gray-100 shadow-sm h-auto w-auto">
                <TabsTrigger
                  value="annuaire"
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg font-inter text-sm sm:text-base font-semibold transition-all duration-300 ease-in-out data-[state=active]:bg-white data-[state=active]:text-[#221F1F] data-[state=active]:shadow-md data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 hover:bg-white/50 hover:text-gray-700 whitespace-nowrap"
                >
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span>Annuaire</span>
                </TabsTrigger>
                <TabsTrigger
                  value="pass-pme"
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg font-inter text-sm sm:text-base font-semibold transition-all duration-300 ease-in-out data-[state=active]:bg-white data-[state=active]:text-[#221F1F] data-[state=active]:shadow-md data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 hover:bg-white/50 hover:text-gray-700 whitespace-nowrap"
                >
                  <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span>Pass PME</span>
                </TabsTrigger>
                <TabsTrigger
                  value="avantages"
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg font-inter text-sm sm:text-base font-semibold transition-all duration-300 ease-in-out data-[state=active]:bg-white data-[state=active]:text-[#221F1F] data-[state=active]:shadow-md data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 hover:bg-white/50 hover:text-gray-700 whitespace-nowrap"
                >
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span>Avantages</span>
                </TabsTrigger>
                <TabsTrigger
                  value="adhesion"
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg font-inter text-sm sm:text-base font-semibold transition-all duration-300 ease-in-out data-[state=active]:bg-white data-[state=active]:text-[#221F1F] data-[state=active]:shadow-md data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 hover:bg-white/50 hover:text-gray-700 whitespace-nowrap"
                >
                  <Building2 className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span>Adhérer</span>
                </TabsTrigger>
              </TabsList>
            </div>
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
                        className="w-full justify-start cursor-pointer"
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
                            className="flex-1 cursor-pointer"
                          >
                            Réinitialiser
                          </Button>
                          <Button
                            onClick={() => setIsFiltersOpen(false)}
                            className="flex-1 bg-cpu-orange hover:bg-orange-700 cursor-pointer"
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
                        className="text-cpu-orange border-cpu-orange hover:bg-cpu-orange hover:text-white flex items-center gap-2 cursor-pointer"
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
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4 text-[#221F1F]">
                    Nos Formules d'Adhésion
                  </h2>
                  <p className="text-cpu-darkgray max-w-2xl mx-auto mb-8">
                    Choisissez la formule qui correspond le mieux à vos besoins
                  </p>
                </div>

                {/* Plans pour Membres Individuels et Entreprises */}
                <div className="mb-16">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                      <div className="h-px w-12 bg-gradient-to-r from-transparent to-cpu-orange"></div>
                      <h3 className="text-2xl font-bold text-[#221F1F]">
                        Membres Individuels & Entreprises
                      </h3>
                      <div className="h-px w-12 bg-gradient-to-l from-transparent to-cpu-orange"></div>
                    </div>
                    <p className="text-cpu-darkgray text-sm">
                      Formules adaptées aux particuliers et aux PME
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {membershipPlans
                      .filter((plan) => 
                        plan.memberTypes?.includes("individuel") || 
                        plan.memberTypes?.includes("entreprise")
                      )
                      .map((plan, index) => (
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
                          onClick={() => {
                            setActiveTab("adhesion");
                            const params = new URLSearchParams(searchParams.toString());
                            params.set("tab", "adhesion");
                            params.set("plan", plan.name); // Passer le nom du plan dans l'URL
                            router.replace(`/membres?${params.toString()}`, {
                              scroll: false,
                            });
                            // Faire défiler vers le formulaire après un court délai
                            setTimeout(() => {
                              const adhesionSection = document.getElementById("adhesion-form");
                              if (adhesionSection) {
                                adhesionSection.scrollIntoView({ behavior: "smooth", block: "start" });
                              }
                            }, 100);
                          }}
                          className={`w-full py-3 font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 pricing-button cursor-pointer ${
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

                {/* Plans pour Membres Associatifs et Institutionnels */}
                <div className="mt-20">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                      <div className="h-px w-12 bg-gradient-to-r from-transparent to-cpu-green"></div>
                      <h3 className="text-2xl font-bold text-[#221F1F]">
                        Organisations Collectives & Institutions
                      </h3>
                      <div className="h-px w-12 bg-gradient-to-l from-transparent to-cpu-green"></div>
                    </div>
                    <p className="text-cpu-darkgray text-sm">
                      Formules dédiées aux associations, coopératives, groupements, fédérations et institutions
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {membershipPlans
                      .filter((plan) => 
                        plan.memberTypes?.includes("associatif") || 
                        plan.memberTypes?.includes("institutionnel")
                      )
                      .map((plan, index) => (
                        <div
                          key={`org-${index}`}
                          className={`relative border rounded-xl overflow-visible transition-all animate-fade-in-up shadow-lg hover:shadow-xl ${
                            plan.isInstitutional
                              ? "border-cpu-green bg-gradient-to-br from-cpu-green/5 to-white md:scale-105"
                              : plan.name.includes("Fédération")
                              ? "border-cpu-orange bg-gradient-to-br from-cpu-orange/5 to-white"
                              : "border-gray-200 bg-white"
                          }`}
                          style={{
                            animationDelay: `${0.5 + index * 0.15}s`,
                            opacity: 0,
                          }}
                        >
                          {plan.isInstitutional && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                              <Badge className="bg-cpu-green text-white px-4 py-1.5 shadow-md">
                                Premium
                              </Badge>
                            </div>
                          )}
                          {plan.name.includes("Fédération") && !plan.isInstitutional && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                              <Badge className="bg-cpu-orange text-white px-4 py-1.5 shadow-md">
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
                                  <p className="text-2xl font-bold text-cpu-green mb-1">
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
                              onClick={() => {
                                setActiveTab("adhesion");
                                const params = new URLSearchParams(searchParams.toString());
                                params.set("tab", "adhesion");
                                params.set("plan", plan.name);
                                router.replace(`/membres?${params.toString()}`, {
                                  scroll: false,
                                });
                                setTimeout(() => {
                                  const adhesionSection = document.getElementById("adhesion-form");
                                  if (adhesionSection) {
                                    adhesionSection.scrollIntoView({ behavior: "smooth", block: "start" });
                                  }
                                }, 100);
                              }}
                              className={`w-full py-3 font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer ${
                                plan.isInstitutional
                                  ? "bg-cpu-green text-white hover:bg-green-700 hover:border-green-700 active:bg-green-800 focus:ring-cpu-green"
                                  : plan.name.includes("Fédération")
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
              </div>
            </TabsContent>

            {/* Pass PME Tab */}
            <TabsContent value="pass-pme" className="mt-4">
              <div className="max-w-7xl mx-auto">
                {/* Section Votre Carte Membre */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-8 mb-12">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[#221F1F] mb-4">
                      Votre Carte Membre
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Présentez votre carte Pass PME chez nos partenaires pour bénéficier de réductions exclusives
                    </p>
                  </div>

                  {/* Cartes de membre - 3 niveaux */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Carte Basic - Orange */}
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
                          <CreditCard className="h-4 w-4" />
                          <span className="font-semibold text-sm">Pass PME</span>
                        </div>
                        <span className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">
                          Basic
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-xs opacity-80 mb-1">CPU-PME.CI</p>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4" />
                          <p className="font-bold text-lg">Awa Diallo</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 opacity-80" />
                          <p className="text-sm opacity-90">Boutique Awa</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs pt-4 border-t border-white/20">
                        <div>
                          <p className="opacity-70 mb-1">N° Membre</p>
                          <p className="font-semibold">CPU-2024-00245</p>
                        </div>
                        <div className="text-right">
                          <p className="opacity-70 mb-1">Valide jusqu'au</p>
                          <p className="font-semibold">31/12/2025</p>
                        </div>
                      </div>
                    </div>

                    {/* Carte Argent - Gris/Bleu */}
                    <div className="bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
                          <CreditCard className="h-4 w-4" />
                          <span className="font-semibold text-sm">Pass PME</span>
                        </div>
                        <span className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">
                          Argent
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-xs opacity-80 mb-1">CPU-PME.CI</p>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4" />
                          <p className="font-bold text-lg">Konan Yao</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 opacity-80" />
                          <p className="text-sm opacity-90">SARL AgriPlus</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs pt-4 border-t border-white/20">
                        <div>
                          <p className="opacity-70 mb-1">N° Membre</p>
                          <p className="font-semibold">CPU-2024-00189</p>
                        </div>
                        <div className="text-right">
                          <p className="opacity-70 mb-1">Valide jusqu'au</p>
                          <p className="font-semibold">31/12/2025</p>
                        </div>
                      </div>
                    </div>

                    {/* Carte Or - Gold */}
                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
                          <CreditCard className="h-4 w-4" />
                          <span className="font-semibold text-sm">Pass PME</span>
                        </div>
                        <span className="bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">
                          Or
                        </span>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-xs opacity-80 mb-1">CPU-PME.CI</p>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4" />
                          <p className="font-bold text-lg">Jean Kouassi</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 opacity-80" />
                          <p className="text-sm opacity-90">SARL TechIvoire</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs pt-4 border-t border-white/20">
                        <div>
                          <p className="opacity-70 mb-1">N° Membre</p>
                          <p className="font-semibold">CPU-2024-00158</p>
                        </div>
                        <div className="text-right">
                          <p className="opacity-70 mb-1">Valide jusqu'au</p>
                          <p className="font-semibold">31/12/2025</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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
                    // Utiliser l'état local passPmeFilter pour une détection plus fiable
                    const currentFilter =
                      passPmeFilter ||
                      searchParams.get("passPmeFilter") ||
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
                          setActiveTab("pass-pme");
                          const newFilter =
                            filter.value === "all" ? "" : filter.value;
                          setPassPmeFilter(newFilter);
                          const params = new URLSearchParams(
                            searchParams.toString()
                          );
                          // S'assurer qu'on est sur l'onglet pass-pme
                          params.set("tab", "pass-pme");
                          if (filter.value === "all") {
                            params.delete("passPmeFilter");
                          } else {
                            params.set("passPmeFilter", filter.value);
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
                    passPmeFilter ||
                    searchParams.get("passPmeFilter") ||
                    "all";
                  const filteredPartners =
                    activeFilter === "all" || activeFilter === ""
                      ? passPmePartners
                      : passPmePartners.filter(
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
                    Vous êtes partenaire ? Rejoignez notre programme Pass PME
                    et offrez des avantages exclusifs aux membres CPU-PME.CI
                  </p>
                  <Button className="bg-cpu-orange hover:bg-[#D97420] text-white px-8 py-6 text-lg font-semibold cursor-pointer">
                    Devenir partenaire
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="adhesion" className="mt-8">
              <div id="adhesion-form" className="max-w-6xl mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cpu-green to-emerald-600 mb-4 shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-extrabold mb-3 text-gray-900 tracking-tight">
                    Demande d'Adhésion
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Rejoignez notre confédération en quelques minutes. Notre équipe vous contactera sous 48 heures.
                  </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="p-8 md:p-10 lg:p-12">
                    <form onSubmit={handleSubmit} className="space-y-0">
                      
                      {/* SECTION: Type de membre */}
                      <div className="pb-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cpu-green/10">
                            <Users className="h-5 w-5 text-cpu-green" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                          Type de membre
                        </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Type de membre */}
                          <div className="space-y-3">
                            <Label htmlFor="memberType" className="text-sm font-semibold text-gray-700">Type de membre *</Label>
                            <Select
                              value={selectedAdhesionType}
                              onValueChange={(value) => {
                                setSelectedAdhesionType(value as MemberType);
                                setSelectedSubProfile("");
                                setIsCompetitionSubcontractor(null);
                                setSelectedBadge(""); // Réinitialiser le badge quand le type change
                              }}
                              required
                            >
                              <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-cpu-green/50 focus:border-cpu-green transition-colors rounded-xl bg-white text-gray-900 font-medium">
                                <SelectValue placeholder="Sélectionnez un type" />
                              </SelectTrigger>
                              <SelectContent>
                                {isLoadingTypeMembres ? (
                                  <div className="px-2 py-1.5 text-sm text-gray-500">Chargement...</div>
                                ) : Array.isArray(typeMembresApi) && typeMembresApi.length > 0 ? (
                                  typeMembresApi
                                    .filter((tm) => tm.isActive !== false)
                                    .map((type) => {
                                      // Mapper le nom de l'API vers les valeurs utilisées dans le code
                                      const typeName = type.name.toLowerCase();
                                      let mappedValue: MemberType | null = null;
                                      
                                      if (typeName.includes('individuel')) {
                                        mappedValue = 'individuel';
                                      } else if (typeName.includes('entreprise') && !typeName.includes('institutionnel')) {
                                        mappedValue = 'entreprise';
                                      } else if (typeName.includes('associatif') || typeName.includes('organisation')) {
                                        mappedValue = 'associatif';
                                      } else if (typeName.includes('institutionnel')) {
                                        mappedValue = 'institutionnel';
                                      }
                                      
                                      if (!mappedValue) {
                                        return null;
                                      }
                                      
                                      return (
                                        <SelectItem key={type.id} value={mappedValue}>
                                          {type.name}
                                  </SelectItem>
                                      );
                                    })
                                    .filter(Boolean)
                                ) : errorTypeMembres ? (
                                  <div className="px-2 py-1.5 text-sm text-red-500">
                                    <div className="font-semibold mb-1">Erreur de chargement</div>
                                    <div>{errorTypeMembres.message || 'Impossible de charger les types de membres'}</div>
                                    {'status' in errorTypeMembres && typeof errorTypeMembres.status === 'number' && (
                                      <div className="text-xs mt-1">Code: {errorTypeMembres.status}</div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="px-2 py-1.5 text-sm text-orange-500">
                                    Aucun type de membre disponible
                                  </div>
                                )}
                              </SelectContent>
                            </Select>
                            {selectedAdhesionType === "individuel" && (
                              <p className="text-sm text-gray-600 leading-relaxed">Pour une personne physique, même sans entreprise.</p>
                            )}
                            {selectedAdhesionType === "entreprise" && (
                              <p className="text-sm text-gray-600 leading-relaxed">Pour une entreprise (micro, petite, moyenne entreprise ou startup).</p>
                            )}
                            {selectedAdhesionType === "associatif" && (
                              <p className="text-sm text-gray-600 leading-relaxed">Pour une structure associative (coopérative, fédération, association professionnelle, groupement/GIE).</p>
                            )}
                            {selectedAdhesionType === "institutionnel" && (
                              <p className="text-sm text-gray-600 leading-relaxed">Grandes entreprises et institutions.</p>
                            )}
                          </div>

                          {/* Sous-profil */}
                          <div className="space-y-3">
                            <Label htmlFor="subProfile" className="text-sm font-semibold text-gray-700">Profil</Label>
                            <Select
                              value={selectedSubProfile}
                              onValueChange={(value) => {
                                setSelectedSubProfile(value);
                                setSelectedBadge(""); // Réinitialiser le badge quand le sous-profil change
                              }}
                              disabled={!selectedAdhesionType}
                            >
                              <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-cpu-green/50 focus:border-cpu-green transition-colors rounded-xl bg-white text-gray-900 font-medium disabled:opacity-60 disabled:cursor-not-allowed">
                                <SelectValue placeholder="Précisez votre profil" />
                              </SelectTrigger>
                              <SelectContent>
                                {isLoadingProfils ? (
                                  <div className="px-2 py-1.5 text-sm text-gray-500">Chargement des profils...</div>
                                ) : Array.isArray(profilsApi) && profilsApi.length > 0 ? (
                                  profilsApi
                                    .filter((p) => p.isActive !== false)
                                    .map((profil) => {
                                      // Mapper le nom du profil vers les valeurs utilisées dans le code
                                      const profilName = profil.name.toLowerCase();
                                      let mappedValue: string | null = null;
                                      
                                      // Mapping pour les profils individuels
                                      if (selectedAdhesionType === "individuel") {
                                        if (profilName.includes('jeune') || profilName.includes('étudiant')) {
                                          mappedValue = 'jeune_etudiant';
                                        } else if (profilName.includes('entrepreneur') || profilName.includes('projet')) {
                                          mappedValue = 'entrepreneur_projet';
                                        } else if (profilName.includes('professionnel') || profilName.includes('expert')) {
                                          mappedValue = 'professionnel_expert';
                                        } else if (profilName.includes('salarié') || profilName.includes('cadre')) {
                                          mappedValue = 'salarie_cadre';
                                        }
                                      }
                                      // Mapping pour les profils entreprise
                                      else if (selectedAdhesionType === "entreprise") {
                                        if (profilName.includes('micro')) {
                                          mappedValue = 'micro_entreprise';
                                        } else if (profilName.includes('petite')) {
                                          mappedValue = 'petite_entreprise';
                                        } else if (profilName.includes('moyenne')) {
                                          mappedValue = 'moyenne_entreprise';
                                        } else if (profilName.includes('startup')) {
                                          mappedValue = 'startup';
                                        }
                                      }
                                      // Mapping pour les profils associatifs
                                      else if (selectedAdhesionType === "associatif") {
                                        if (profilName.includes('coopérative') || profilName.includes('cooperative')) {
                                          mappedValue = 'cooperative';
                                        } else if (profilName.includes('fédération') || profilName.includes('federation') || profilName.includes('filière') || profilName.includes('filiere')) {
                                          mappedValue = 'federation_filiere';
                                        } else if (profilName.includes('association') && profilName.includes('professionnelle')) {
                                          mappedValue = 'association_professionnelle';
                                        } else if (profilName.includes('groupement') || profilName.includes('gie')) {
                                          mappedValue = 'groupement_gie';
                                        }
                                      }
                                      // Mapping pour les profils institutionnels
                                      else if (selectedAdhesionType === "institutionnel") {
                                        if (profilName.includes('grande') && profilName.includes('entreprise')) {
                                          mappedValue = 'grande_entreprise';
                                        } else if (profilName.includes('banque')) {
                                          mappedValue = 'banque';
                                        } else if (profilName.includes('assureur')) {
                                          mappedValue = 'assureur';
                                        } else if (profilName.includes('bailleur')) {
                                          mappedValue = 'bailleur';
                                        } else if (profilName.includes('agence') && profilName.includes('publique')) {
                                          mappedValue = 'agence_publique';
                                        } else if (profilName.includes('collectivité') || profilName.includes('collectivite')) {
                                          mappedValue = 'collectivite';
                                        } else if (profilName.includes('programme') && profilName.includes('international')) {
                                          mappedValue = 'programme_international';
                                        }
                                      }
                                      
                                      // Si aucun mapping trouvé, utiliser l'ID du profil comme valeur
                                      const value = mappedValue || profil.id;
                                      
                                      return (
                                        <SelectItem key={profil.id} value={value}>
                                          {profil.name}
                                        </SelectItem>
                                      );
                                    })
                                ) : (
                                  <div className="px-2 py-1.5 text-sm text-orange-500">
                                    {selectedAdhesionType 
                                      ? "Aucun profil disponible pour ce type de membre"
                                      : "Sélectionnez d'abord un type de membre"}
                                  </div>
                                )}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Checkbox appartenance à une organisation (pour individuel, entreprise et associatif - PAS pour institutionnel) */}
                        {/* Ne pas afficher si associatif avec sous-profil "federation_filiere" */}
                        {((selectedAdhesionType === "individuel" || selectedAdhesionType === "entreprise" || selectedAdhesionType === "associatif") && 
                          !(selectedAdhesionType === "associatif" && selectedSubProfile === "federation_filiere")) && (
                          <div className="mt-6 p-5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-100">
                            <div className="flex items-start space-x-3">
                              <input
                                type="checkbox"
                                id="belongsToOrg"
                                checked={hasAffiliation}
                                onChange={(e) => setHasAffiliation(e.target.checked)}
                                className="h-5 w-5 border-2 border-cpu-orange rounded-md focus:ring-2 focus:ring-cpu-orange focus:ring-offset-0 mt-0.5 cursor-pointer checked:bg-cpu-orange checked:border-cpu-orange transition-all"
                                style={{ 
                                  accentColor: '#F27A20',
                                  colorScheme: 'light'
                                }}
                              />
                              <Label htmlFor="belongsToOrg" className="text-sm cursor-pointer font-medium text-gray-800">
                                {selectedAdhesionType === "associatif" && selectedSubProfile !== "federation_filiere"
                                  ? "Notre organisation est affiliée à une fédération de filière"
                                  : "J'appartiens à une organisation (fédération, coopérative, association, groupement)"}
                              </Label>
                            </div>

                            {/* Champs Type d'organisation et Sélection organisation (conditionnel avec trait orange) */}
                            {hasAffiliation && (
                              <div className="ml-2 mt-5 pl-5 border-l-4 border-cpu-orange space-y-5">
                                {/* Cas spécial : Associatif (sauf federation_filiere) → Afficher directement "Sélectionnez la fédération" */}
                                {selectedAdhesionType === "associatif" && selectedSubProfile !== "federation_filiere" ? (
                                  <div className="space-y-3">
                                    <Label htmlFor="organisation" className="text-sm font-semibold text-gray-700">Sélectionnez la fédération</Label>
                                    <Select
                                      value={selectedOrganisation}
                                      onValueChange={(value) => {
                                        setSelectedOrganisation(value);
                                        if (value !== "Autre") {
                                          setCustomOrganisationName("");
                                        }
                                        // Forcer le type à "federation" pour ce cas
                                        if (!selectedOrgType || selectedOrgType !== "federation") {
                                          setSelectedOrgType("federation");
                                        }
                                      }}
                                    >
                                      <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl bg-white text-gray-900 font-medium">
                                        <SelectValue placeholder="Choisir la fédération" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {organisationsByType["federation"]?.map((org) => (
                                          <SelectItem key={org} value={org}>
                                            {org}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                    <p className="text-xs text-gray-500">
                                      Si votre fédération est membre, vous bénéficiez de ses avantages
                                    </p>
                                  </div>
                                ) : (
                                  /* Cas normal : Afficher Type d'organisation puis Sélection organisation */
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {/* Type d'organisation */}
                                  <div className="space-y-3">
                                    <Label htmlFor="orgType">Type d'organisation</Label>
                                    <Select
                                      value={selectedOrgType}
                                      onValueChange={(value) => {
                                        setSelectedOrgType(value);
                                        setSelectedOrganisation("");
                                        setCustomOrganisationName("");
                                      }}
                                    >
                                      <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl bg-white text-gray-900 font-medium">
                                        <SelectValue placeholder="Sélectionnez le type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="federation">Fédération</SelectItem>
                                        <SelectItem value="cooperative">Coopérative</SelectItem>
                                        <SelectItem value="association">Association</SelectItem>
                                        <SelectItem value="groupement">Groupement</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  {/* Sélection de l'organisation */}
                                  {selectedOrgType && (
                                    <div className="space-y-3">
                                      <Label htmlFor="organisation" className="text-sm font-semibold text-gray-700">Sélectionnez votre organisation</Label>
                                      <Select
                                        value={selectedOrganisation}
                                        onValueChange={(value) => {
                                          setSelectedOrganisation(value);
                                          if (value !== "Autre") {
                                            setCustomOrganisationName("");
                                          }
                                        }}
                                      >
                                        <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl bg-white text-gray-900 font-medium">
                                          <SelectValue placeholder="Choisir l'organisation" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {organisationsByType[selectedOrgType]?.map((org) => (
                                            <SelectItem key={org} value={org}>
                                              {org}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <p className="text-sm text-gray-600 flex items-center gap-2">
                                        <Info className="h-4 w-4 text-cpu-orange" />
                                        Si votre organisation est membre, vous bénéficiez de ses avantages
                                      </p>
                                    </div>
                                  )}
                                </div>
                                )}

                                {/* Champ texte si "Autre" est sélectionné */}
                                {selectedOrganisation === "Autre" && (
                                  <div className="space-y-3">
                                    <Label htmlFor="customOrgName" className="text-sm font-semibold text-gray-700">Nom de votre organisation</Label>
                                    <Input
                                      id="customOrgName"
                                      value={customOrganisationName}
                                      onChange={(e) => setCustomOrganisationName(e.target.value)}
                                      placeholder="Entrez le nom de votre organisation"
                                      className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl px-4 text-gray-900"
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Séparateur moderne */}
                      <div className="border-t-2 border-gray-100 my-8"></div>

                      {/* SECTION: Coordonnées (pour Membre institutionnel uniquement) */}
                      {selectedAdhesionType === "institutionnel" && (
                        <>
                          <div className="pb-8">
                            <div className="flex items-center gap-3 mb-6">
                              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cpu-green/10">
                                <MapPin className="h-5 w-5 text-cpu-green" />
                              </div>
                              <h3 className="text-xl font-bold text-gray-900">
                          Coordonnées
                        </h3>
                            </div>
                        
                        <div className="space-y-5">
                          {/* Adresse complète */}
                          <div className="space-y-3">
                            <Label htmlFor="fullAddress" className="text-sm font-semibold text-gray-700">Adresse complète</Label>
                            <Input
                              id="fullAddress"
                              placeholder="Ex: Boulevard Latrille, Cocody"
                              className="h-12 border-2 border-gray-200 hover:border-cpu-green/50 focus:border-cpu-green transition-colors rounded-xl px-4 text-gray-900"
                            />
                          </div>

                          {/* Ligne: Ville et Pays */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-3">
                              <Label htmlFor="city" className="text-sm font-semibold text-gray-700">Ville</Label>
                              <Input
                                id="city"
                                placeholder="Ex: Abidjan"
                                className="h-12 border-2 border-gray-200 hover:border-cpu-green/50 focus:border-cpu-green transition-colors rounded-xl px-4 text-gray-900"
                              />
                            </div>

                            <div className="space-y-3">
                              <Label htmlFor="country" className="text-sm font-semibold text-gray-700">Pays</Label>
                              <Input
                                id="country"
                                placeholder="Côte d'Ivoire"
                                defaultValue="Côte d'Ivoire"
                                className="h-12 border-2 border-gray-200 hover:border-cpu-green/50 focus:border-cpu-green transition-colors rounded-xl px-4 text-gray-900 font-medium"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Séparateur moderne */}
                      <div className="border-t-2 border-gray-100 my-8"></div>
                        </>
                      )}

                      {/* SECTION: Axes d'intérêt (pour Membre institutionnel uniquement) */}
                      {selectedAdhesionType === "institutionnel" && (
                        <>
                          <div className="pb-8">
                            <div className="flex items-center gap-3 mb-6">
                              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cpu-orange/10">
                                <Target className="h-5 w-5 text-cpu-orange" />
                              </div>
                              <h3 className="text-xl font-bold text-gray-900">
                                Axes d'intérêt <span className="text-gray-500 text-base font-normal">(cochez un ou plusieurs)</span>
                            </h3>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 border-2 border-gray-100 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-sm">
                              {axesInteretOptions.map((axe) => (
                                <div key={axe} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white transition-colors">
                                  <input
                                    type="checkbox"
                                    id={`axe-${axe}`}
                                    checked={selectedAxesInteret.includes(axe)}
                                    onChange={() => {
                                      setSelectedAxesInteret(prev =>
                                        prev.includes(axe)
                                          ? prev.filter(a => a !== axe)
                                          : [...prev, axe]
                                      );
                                    }}
                                    className="h-5 w-5 border-2 border-cpu-orange rounded-md focus:ring-2 focus:ring-cpu-orange focus:ring-offset-0 mt-0.5 cursor-pointer checked:bg-cpu-orange checked:border-cpu-orange transition-all"
                                    style={{ 
                                      accentColor: '#F27A20',
                                      colorScheme: 'light'
                                    }}
                                  />
                                  <Label htmlFor={`axe-${axe}`} className="text-sm cursor-pointer font-medium text-gray-700 leading-tight">
                                    {axe}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Séparateur moderne */}
                          <div className="border-t-2 border-gray-100 my-8"></div>
                        </>
                      )}

                      {/* SECTION: Zones d'intervention (pour Membre individuel, Entreprise et Associatif) */}
                      {(selectedAdhesionType === "individuel" || selectedAdhesionType === "entreprise" || selectedAdhesionType === "associatif") && (
                        <>
                          <div className="pb-8">
                            <div className="flex items-center gap-3 mb-6">
                              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cpu-orange/10">
                                <MapPin className="h-5 w-5 text-cpu-orange" />
                              </div>
                              <h3 className="text-xl font-bold text-gray-900">
                              Zones d'intervention
                            </h3>
                            </div>
                            
                            <div className="space-y-5">
                              <div className="space-y-3">
                                <Label htmlFor="interventionScope" className="text-sm font-semibold text-gray-700">Portée de l'intervention</Label>
                                <Select
                                  value={interventionScope}
                                  onValueChange={(value) => {
                                    setInterventionScope(value);
                                    if (value !== "regions_specifiques") {
                                      setSelectedRegions([]);
                                    }
                                  }}
                                >
                                  <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl bg-white text-gray-900 font-medium">
                                    <SelectValue placeholder="Sélectionnez la portée" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="national">National</SelectItem>
                                    <SelectItem value="regions_specifiques">Régions spécifiques</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              {/* Liste des régions en checkboxes */}
                              {interventionScope === "regions_specifiques" && (
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Label className="text-base font-bold text-gray-900">Sélectionnez les régions</Label>
                                      <p className="text-sm text-gray-600 mt-1">
                                        Cochez toutes les régions dans lesquelles vous intervenez
                                      </p>
                                    </div>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={toggleAllRegions}
                                      className="border-2 border-cpu-orange text-cpu-orange hover:bg-cpu-orange hover:text-white font-semibold rounded-lg transition-all cursor-pointer"
                                    >
                                      {selectedRegions.length === getAvailableRegions().length
                                        ? "Tout décocher"
                                        : "Tout cocher"}
                                    </Button>
                                  </div>
                                  
                                  {isLoadingRegions ? (
                                    <div className="p-6 border-2 border-gray-100 rounded-2xl bg-gray-50 text-center text-gray-500 font-medium">
                                      Chargement des régions...
                                    </div>
                                  ) : errorRegions ? (
                                    <div className="p-6 border-2 border-red-200 rounded-2xl bg-red-50 text-red-600">
                                      <div className="font-bold mb-2">Erreur de chargement</div>
                                      <div className="text-sm">{errorRegions.message || 'Impossible de charger les régions'}</div>
                                      {'status' in errorRegions && typeof errorRegions.status === 'number' && (
                                        <div className="text-xs mt-2 opacity-75">Code: {errorRegions.status}</div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-6 border-2 border-gray-100 rounded-2xl bg-gradient-to-br from-gray-50 to-white max-h-96 overflow-y-auto shadow-sm">
                                      {getAvailableRegions().map((region) => (
                                        <div key={region} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white transition-colors">
                                        <input
                                          type="checkbox"
                                          id={`region-${region}`}
                                          checked={selectedRegions.includes(region)}
                                          onChange={() => toggleRegion(region)}
                                            className="h-5 w-5 border-2 border-cpu-orange rounded-md focus:ring-2 focus:ring-cpu-orange focus:ring-offset-0 mt-0.5 cursor-pointer checked:bg-cpu-orange checked:border-cpu-orange transition-all"
                                          style={{ 
                                            accentColor: '#F27A20',
                                            colorScheme: 'light'
                                          }}
                                        />
                                        <Label 
                                          htmlFor={`region-${region}`} 
                                            className="text-sm cursor-pointer font-medium text-gray-700 leading-tight"
                                        >
                                          {region}
                                        </Label>
                                      </div>
                                    ))}
                                  </div>
                                  )}

                                  {selectedRegions.length > 0 && (
                                    <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-100">
                                      <Check className="h-5 w-5 text-cpu-green" />
                                      <span className="font-bold text-cpu-green">
                                        {selectedRegions.length} région{selectedRegions.length > 1 ? 's' : ''} sélectionnée{selectedRegions.length > 1 ? 's' : ''}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Séparateur moderne */}
                          <div className="border-t-2 border-gray-100 my-8"></div>
                        </>
                      )}

                      {/* SECTION: Zones d'intervention (pour Membre institutionnel) */}
                      {selectedAdhesionType === "institutionnel" && (
                        <>
                          <div className="py-6">
                            <h3 className="text-base font-semibold text-cpu-orange flex items-center mb-4">
                              <MapPin className="h-5 w-5 mr-2" />
                              Zones d'intervention (cochez une ou plusieurs) *
                            </h3>
                            
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-xs text-gray-500">
                                    Cochez toutes les régions dans lesquelles vous intervenez
                                  </p>
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={toggleAllRegions}
                                  className="border-cpu-orange text-cpu-orange hover:bg-orange-50"
                                >
                                  {selectedRegions.length === Object.keys(regionsData).length
                                    ? "Tout décocher"
                                    : "Tout sélectionner"}
                                </Button>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50 max-h-96 overflow-y-auto">
                                {Object.keys(regionsData).sort().map((region) => (
                                  <div key={region} className="flex items-start space-x-2">
                                    <input
                                      type="checkbox"
                                      id={`region-inst-${region}`}
                                      checked={selectedRegions.includes(region)}
                                      onChange={() => toggleRegion(region)}
                                      className="h-4 w-4 border-2 border-cpu-orange rounded focus:ring-2 focus:ring-cpu-orange focus:ring-offset-0 mt-0.5 cursor-pointer checked:bg-cpu-orange checked:border-cpu-orange"
                                      style={{ 
                                        accentColor: '#F27A20',
                                        colorScheme: 'light'
                                      }}
                                    />
                                    <Label 
                                      htmlFor={`region-inst-${region}`} 
                                      className="text-sm cursor-pointer font-normal leading-tight"
                                    >
                                      {region}
                                    </Label>
                                  </div>
                                ))}
                              </div>

                              {selectedRegions.length > 0 && (
                                <div className="flex items-center gap-2 text-sm text-cpu-green">
                                  <Check className="h-4 w-4" />
                                  <span className="font-medium">
                                    {selectedRegions.length} région{selectedRegions.length > 1 ? 's' : ''} sélectionnée{selectedRegions.length > 1 ? 's' : ''}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Trait de séparation */}
                          <div className="border-t border-gray-200"></div>

                          {/* SECTION: Filières prioritaires (pour Membre institutionnel) */}
                          <div className="py-6">
                            <h3 className="text-base font-semibold text-cpu-orange flex items-center mb-4">
                              <Briefcase className="h-5 w-5 mr-2" />
                              Filières prioritaires (cochez une ou plusieurs)
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 border border-gray-200 rounded-lg bg-gray-50 max-h-96 overflow-y-auto">
                              {filieresPrioritairesOptions.map((filiere) => (
                                <div key={filiere} className="flex items-start space-x-2">
                                  <input
                                    type="checkbox"
                                    id={`filiere-${filiere}`}
                                    checked={selectedFilieresPrioritaires.includes(filiere)}
                                    onChange={() => {
                                      setSelectedFilieresPrioritaires(prev =>
                                        prev.includes(filiere)
                                          ? prev.filter(f => f !== filiere)
                                          : [...prev, filiere]
                                      );
                                    }}
                                    className="h-4 w-4 border-2 border-cpu-orange rounded focus:ring-2 focus:ring-cpu-orange focus:ring-offset-0 mt-0.5 cursor-pointer checked:bg-cpu-orange checked:border-cpu-orange"
                                    style={{ 
                                      accentColor: '#F27A20',
                                      colorScheme: 'light'
                                    }}
                                  />
                                  <Label htmlFor={`filiere-${filiere}`} className="text-sm cursor-pointer font-normal">
                                    {filiere}
                                  </Label>
                                </div>
                              ))}
                            </div>

                            {selectedFilieresPrioritaires.length > 0 && (
                              <div className="flex items-center gap-2 text-sm text-cpu-green mt-3">
                                <Check className="h-4 w-4" />
                                <span className="font-medium">
                                  {selectedFilieresPrioritaires.length} filière{selectedFilieresPrioritaires.length > 1 ? 's' : ''} sélectionnée{selectedFilieresPrioritaires.length > 1 ? 's' : ''}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Trait de séparation */}
                          <div className="border-t border-gray-200"></div>
                        </>
                      )}

                      {/* SECTION: Informations sur l'organisation */}
                      <div className="pb-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cpu-green/10">
                            <Building2 className="h-5 w-5 text-cpu-green" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                          Informations sur l'organisation
                        </h3>
                        </div>
                        
                        <div className="space-y-6">
                          {/* Ligne 1: Nom de l'organisation */}
                          <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-3">
                              <Label htmlFor="orgName" className="text-sm font-semibold text-gray-700">Nom de l'organisation *</Label>
                              <Input
                                id="orgName"
                                placeholder="Ex: Ma Société SARL"
                                required
                                className="h-12 border-2 border-gray-200 hover:border-cpu-green/50 focus:border-cpu-green transition-colors rounded-xl px-4 text-gray-900"
                              />
                            </div>
                        </div>

                          {/* Ligne 2: Filière et Secteur */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3 relative isolate">
                              <Label htmlFor="filiere" className="text-sm font-semibold text-gray-700">Filière *</Label>
                          <Select
                                value={selectedFiliere}
                                onValueChange={setSelectedFiliere}
                            required
                            disabled={isLoadingSecteurs}
                          >
                                <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-cpu-green/50 focus:border-cpu-green transition-colors rounded-xl bg-white text-gray-900 font-medium w-full disabled:opacity-60 disabled:cursor-not-allowed">
                                  <SelectValue placeholder={isLoadingSecteurs ? "Chargement..." : "Sélectionnez une filière"} />
                            </SelectTrigger>
                                <SelectContent 
                                  className="z-[9999] max-h-[300px] overflow-y-auto"
                                  position="popper"
                                  sideOffset={4}
                                  align="start"
                                >
                                  {isLoadingSecteurs ? (
                                    <div className="px-2 py-1.5 text-sm text-gray-500">Chargement des filières...</div>
                                  ) : errorSecteurs ? (
                                    <div className="px-2 py-1.5 text-sm text-red-500">
                                      Erreur lors du chargement des filières. Veuillez réessayer.
                                    </div>
                                  ) : getAllFilieres().length === 0 ? (
                                    <div className="px-2 py-1.5 text-sm text-gray-500">Aucune filière disponible</div>
                                  ) : (
                                    getAllFilieres().map(({ filiere, secteurNom }) => {
                                      // Déterminer le nom à afficher selon la structure (API ou statique)
                                      const filiereAny = filiere as any;
                                      const filiereName = filiereAny.nom || filiereAny.name || filiereAny.id;
                                      return (
                                        <SelectItem key={filiere.id} value={filiere.id} className="cursor-pointer">
                                          <span className="font-medium">{filiereName}</span>
                                          <span className="text-gray-400 text-xs ml-2">({secteurNom})</span>
                                        </SelectItem>
                                      );
                                    })
                                  )}
                            </SelectContent>
                          </Select>
                          {errorSecteurs && (
                            <p className="text-sm text-red-600 flex items-center gap-2">
                              <Info className="h-4 w-4" />
                              Erreur lors du chargement des filières depuis l'API
                            </p>
                          )}
                        </div>

                            <div className="space-y-3 relative isolate">
                              <Label htmlFor="sector" className="text-sm font-semibold text-gray-700">Secteur d'activité *</Label>
                              <Select
                                value={selectedMainSector}
                                onValueChange={setSelectedMainSector}
                                required
                                disabled={!!selectedFiliere || isLoadingSecteurs}
                              >
                                <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-cpu-green/50 focus:border-cpu-green transition-colors rounded-xl bg-white text-gray-900 font-medium w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-50">
                                  <SelectValue placeholder={isLoadingSecteurs ? "Chargement..." : "Sélectionnez un secteur"} />
                                </SelectTrigger>
                                <SelectContent 
                                  className="z-[9999]"
                                  position="popper"
                                  sideOffset={4}
                                  align="start"
                                >
                                  {isLoadingSecteurs ? (
                                    <div className="px-2 py-1.5 text-sm text-gray-500">Chargement des secteurs...</div>
                                  ) : errorSecteurs ? (
                                    <div className="px-2 py-1.5 text-sm text-red-500">
                                      Erreur lors du chargement des secteurs. Utilisation des données statiques.
                                    </div>
                                  ) : (() => {
                                    // Utiliser les données de l'API si disponibles, sinon fallback vers données statiques
                                    const secteurs = secteursApi && Array.isArray(secteursApi) && secteursApi.length > 0
                                      ? secteursApi.map((s) => ({ id: s.id, nom: s.name }))
                                      : Object.values(secteursData).map((s) => ({ id: s.id, nom: s.nom }));
                                    
                                    return secteurs.map((secteur) => (
                                      <SelectItem key={secteur.id} value={secteur.id} className="cursor-pointer">
                                        {secteur.nom}
                                      </SelectItem>
                                    ));
                                  })()}
                                </SelectContent>
                              </Select>
                              {selectedFiliere && (
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                  <Info className="h-4 w-4 text-cpu-green" />
                                  Secteur déterminé automatiquement à partir de la filière
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Ligne 3: Sous-filière */}
                              {selectedFiliere && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-3 relative isolate">
                                <Label htmlFor="subFiliere" className="text-sm font-semibold text-gray-700">Sous-filière *</Label>
                                  <Select
                                    value={selectedSubCategory}
                                    onValueChange={setSelectedSubCategory}
                                    required
                                    disabled={isLoadingSecteurs}
                                  >
                                  <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-cpu-green/50 focus:border-cpu-green transition-colors rounded-xl bg-white text-gray-900 font-medium w-full disabled:opacity-60 disabled:cursor-not-allowed">
                                      <SelectValue placeholder={isLoadingSecteurs ? "Chargement..." : "Sélectionnez une sous-filière"} />
                                    </SelectTrigger>
                                  <SelectContent 
                                    className="z-[9999]"
                                    position="popper"
                                    sideOffset={4}
                                    align="start"
                                  >
                                    {isLoadingSecteurs ? (
                                      <div className="px-2 py-1.5 text-sm text-gray-500">Chargement des sous-filières...</div>
                                    ) : getSubCategoriesForFiliere().length === 0 ? (
                                      <div className="px-2 py-1.5 text-sm text-gray-500">Aucune sous-filière disponible pour cette filière</div>
                                    ) : (
                                      getSubCategoriesForFiliere().map((subCat: { id?: string; nom: string }) => {
                                        // Utiliser l'ID si disponible (API), sinon le nom (données statiques)
                                        const value = subCat.id || subCat.nom;
                                        const displayName = subCat.nom;
                                        return (
                                          <SelectItem key={value} value={value} className="cursor-pointer">
                                            {displayName}
                                          </SelectItem>
                                        );
                                      })
                                    )}
                                    </SelectContent>
                                  </Select>
                                </div>
                            </div>
                          )}

                          {/* Activités / Corps de métiers (conditionnels) */}
                          {selectedSubCategory && (
                            <div className="space-y-5">
                              <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100">
                                <Label className="text-base font-bold text-gray-900">Activités / Corps de métiers</Label>
                                <p className="text-sm text-gray-600 mt-1">
                                  Sélectionnez une ou plusieurs activités. Vous ne trouvez pas votre activité ? Ajoutez-la manuellement ci-dessous.
                                </p>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-6 border-2 border-gray-100 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-sm">
                                {getActivitiesForSubCategory().map((activity) => (
                                  <div key={activity} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white transition-colors">
                                    <input
                                      type="checkbox"
                                      id={`activity-${activity}`}
                                      checked={selectedActivities.includes(activity)}
                                      onChange={() => toggleActivity(activity)}
                                      className="h-5 w-5 border-2 border-cpu-orange rounded-md focus:ring-2 focus:ring-cpu-orange focus:ring-offset-0 mt-0.5 cursor-pointer checked:bg-cpu-orange checked:border-cpu-orange transition-all"
                                      style={{ 
                                        accentColor: '#F27A20',
                                        colorScheme: 'light'
                                      }}
                                    />
                                    <Label 
                                      htmlFor={`activity-${activity}`} 
                                      className="text-sm cursor-pointer font-medium text-gray-700 leading-tight"
                                    >
                                      {activity}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Nombre d'employés (non affiché pour les membres institutionnels) */}
                          {selectedAdhesionType !== "institutionnel" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <Label htmlFor="employees" className="text-sm font-semibold text-gray-700">Nombre d'employés</Label>
                                <Select>
                                  <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-cpu-green/50 focus:border-cpu-green transition-colors rounded-xl bg-white text-gray-900 font-medium">
                                    <SelectValue placeholder="Sélectionnez" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="0-10">0 - 10</SelectItem>
                                    <SelectItem value="11-50">11 - 50</SelectItem>
                                    <SelectItem value="51-200">51 - 200</SelectItem>
                                    <SelectItem value="201-500">201 - 500</SelectItem>
                                    <SelectItem value="500+">Plus de 500</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Séparateur moderne */}
                      <div className="border-t-2 border-gray-100 my-8"></div>

                      {/* SECTION: Localisation du siège / bureaux */}
                      <div className="pb-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cpu-orange/10">
                            <MapPin className="h-5 w-5 text-cpu-orange" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                          {selectedAdhesionType === "institutionnel" 
                            ? "Localisation des bureaux en Côte d'Ivoire"
                            : "Localisation du siège"}
                        </h3>
                        </div>

                        {/* Question pour les membres institutionnels */}
                        {selectedAdhesionType === "institutionnel" && (
                          <div className="mb-6 p-5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-100">
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                id="hasBureauCI"
                                checked={hasBureauCI}
                                onChange={(e) => setHasBureauCI(e.target.checked)}
                                className="h-5 w-5 border-2 border-cpu-orange rounded-md focus:ring-2 focus:ring-cpu-orange focus:ring-offset-0 cursor-pointer checked:bg-cpu-orange checked:border-cpu-orange transition-all"
                                style={{ 
                                  accentColor: '#F27A20',
                                  colorScheme: 'light'
                                }}
                              />
                              <Label htmlFor="hasBureauCI" className="text-sm cursor-pointer font-medium text-gray-800">
                                Avez-vous des bureaux en Côte d'Ivoire ?
                              </Label>
                            </div>
                          </div>
                        )}
                        
                        {/* Afficher les champs de localisation : toujours pour non-institutionnel, conditionnellement pour institutionnel */}
                        {(selectedAdhesionType !== "institutionnel" || hasBureauCI) && (
                          <div className="space-y-5">
                            {/* Ligne 1: Commune et Région */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3 relative isolate">
                              <Label htmlFor="siegeCommune" className="text-sm font-semibold text-gray-700">Commune *</Label>
                              <Select
                                value={siegeCommune}
                                onValueChange={(value) => {
                                  setSiegeCommune(value);
                                  setSiegeVille(""); // Réinitialiser la ville
                                  setSiegeVillage(""); // Réinitialiser le village
                                }}
                                required
                                disabled={isLoadingRegions}
                              >
                                <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl bg-white text-gray-900 font-medium w-full disabled:opacity-60 disabled:cursor-not-allowed">
                                  <SelectValue placeholder={isLoadingRegions ? "Chargement..." : "Sélectionnez une commune"} />
                                </SelectTrigger>
                                <SelectContent 
                                  className="z-[9999] max-h-[300px] overflow-y-auto"
                                  position="popper"
                                  sideOffset={4}
                                  align="start"
                                >
                                  {isLoadingRegions ? (
                                    <div className="px-2 py-1.5 text-sm text-gray-500">Chargement des communes...</div>
                                  ) : errorRegions ? (
                                    <div className="px-2 py-1.5 text-sm text-red-500">
                                      Erreur lors du chargement des communes. Veuillez réessayer.
                                    </div>
                                  ) : getAvailableCommunes().length === 0 ? (
                                    <div className="px-2 py-1.5 text-sm text-gray-500">
                                      {siegeRegion ? "Aucune commune disponible pour cette région" : "Aucune commune disponible"}
                                    </div>
                                  ) : (
                                    getAvailableCommunes().map(({ commune, regionName }) => {
                                      const communeName = 'name' in commune ? commune.name : (commune as any).name;
                                      const communeValue = 'id' in commune ? commune.id : communeName;
                                      return (
                                        <SelectItem key={communeValue} value={communeName} className="cursor-pointer">
                                          <span className="font-medium">{communeName}</span>
                                          {!siegeRegion && (
                                            <span className="text-gray-400 text-xs ml-2">({regionName})</span>
                                          )}
                                        </SelectItem>
                                      );
                                    })
                                  )}
                                </SelectContent>
                              </Select>
                              {errorRegions && (
                                <p className="text-sm text-red-600 flex items-center gap-2">
                                  <Info className="h-4 w-4" />
                                  Erreur lors du chargement des communes depuis l'API
                                </p>
                              )}
                            </div>

                            <div className="space-y-3 relative isolate">
                              <Label htmlFor="siegeRegion" className="text-sm font-semibold text-gray-700">Région *</Label>
                              <Select
                                value={siegeRegion}
                                onValueChange={(value) => {
                                  setSiegeRegion(value);
                                  setSiegeCommune(""); // Réinitialiser la commune
                                  setSiegeVille(""); // Réinitialiser la ville
                                  setSiegeVillage(""); // Réinitialiser le village
                                }}
                                required
                                disabled={!!siegeCommune || isLoadingRegions}
                              >
                                <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl bg-white text-gray-900 font-medium w-full disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-50">
                                  <SelectValue placeholder={isLoadingRegions ? "Chargement..." : "Sélectionnez une région"} />
                                </SelectTrigger>
                                <SelectContent 
                                  className="z-[9999]"
                                  position="popper"
                                  sideOffset={4}
                                  align="start"
                                >
                                  {isLoadingRegions ? (
                                    <div className="px-2 py-1.5 text-sm text-gray-500">Chargement des régions...</div>
                                  ) : errorRegions ? (
                                    <div className="px-2 py-1.5 text-sm text-red-500">
                                      Erreur lors du chargement des régions. Utilisation des données statiques.
                                    </div>
                                  ) : (() => {
                                    // Utiliser les données de l'API si disponibles, sinon fallback vers données statiques
                                    const regions = regionsApi && Array.isArray(regionsApi) && regionsApi.length > 0
                                      ? regionsApi
                                          .filter((r) => r.isActive !== false)
                                          .map((r) => ({ id: r.id, name: r.name }))
                                      : Object.keys(regionsData).map((regionName) => ({ id: regionName, name: regionName }));
                                    
                                    return regions.map((region) => (
                                      <SelectItem key={region.id} value={region.id} className="cursor-pointer">
                                        {region.name}
                                      </SelectItem>
                                    ));
                                  })()}
                                </SelectContent>
                              </Select>
                              {siegeCommune && (
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                  <Info className="h-4 w-4 text-cpu-orange" />
                                  Région déterminée automatiquement à partir de la commune
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Ligne 2: Ville et Village/Quartier (conditionnels) */}
                          {siegeCommune && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <Label htmlFor="siegeVille" className="text-sm font-semibold text-gray-700">Ville *</Label>
                                <Select
                                  value={siegeVille}
                                  onValueChange={setSiegeVille}
                                  required
                                >
                                  <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl bg-white text-gray-900 font-medium">
                                    <SelectValue placeholder="Sélectionnez une ville" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {getVillesForCommune(siegeRegion, siegeCommune).map((ville) => (
                                      <SelectItem key={ville} value={ville}>
                                        {ville}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="siegeVillage" className="text-sm font-semibold text-gray-700">Village / Quartier</Label>
                                <Input
                                  id="siegeVillage"
                                  value={siegeVillage}
                                  onChange={(e) => setSiegeVillage(e.target.value)}
                                  placeholder="Ex: Abobo-Gare, Cocody-Angré..."
                                  className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl px-4 text-gray-900"
                                />
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                  <Info className="h-4 w-4 text-cpu-orange" />
                                  Précisez le quartier ou le village si possible
                                </p>
                              </div>
                            </div>
                          )}
                          </div>
                        )}
                      </div>

                      {/* Séparateur moderne */}
                      <div className="border-t-2 border-gray-100 my-8"></div>

                      {/* SECTION: Informations de contact */}
                      <div className="pb-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cpu-orange/10">
                            <Users className="h-5 w-5 text-cpu-orange" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                          Informations de contact
                        </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="representativeName" className="text-sm font-semibold text-gray-700">Nom du représentant *</Label>
                            <Input
                              id="representativeName"
                              placeholder="Prénom et Nom"
                              required
                              className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl px-4 text-gray-900"
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                            />
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="position" className="text-sm font-semibold text-gray-700">Fonction</Label>
                            <Input
                              id="position"
                              placeholder="Ex: Directeur Général"
                              className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl px-4 text-gray-900"
                              value={formPosition}
                              onChange={(e) => setFormPosition(e.target.value)}
                            />
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email professionnel *</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="email@entreprise.ci"
                              required
                              className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl px-4 text-gray-900"
                              value={formEmail}
                              onChange={(e) => setFormEmail(e.target.value)}
                              suppressHydrationWarning
                            />
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Téléphone *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+225 XX XX XX XX XX"
                              required
                              className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl px-4 text-gray-900"
                              value={formPhone}
                              onChange={(e) => setFormPhone(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Séparateur moderne */}
                      <div className="border-t-2 border-gray-100 my-8"></div>

                      {/* SECTION: Formule souhaitée */}
                      <div className="pb-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cpu-green/10">
                            <Award className="h-5 w-5 text-cpu-green" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                          Formule souhaitée
                        </h3>
                        </div>
                        
                        <div className="space-y-3">
                          <Label htmlFor="membershipPlan" className="text-sm font-semibold text-gray-700">Formule d'abonnement *</Label>
                          <Select
                            value={selectedBadge}
                            onValueChange={setSelectedBadge}
                            required
                            disabled={!selectedAdhesionType}
                          >
                            <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-cpu-green/50 focus:border-cpu-green transition-colors rounded-xl bg-white text-gray-900 font-medium disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-50">
                              <SelectValue placeholder={
                                !selectedAdhesionType 
                                  ? "Sélectionnez d'abord un type de membre" 
                                  : "Choisissez une formule"
                              } />
                            </SelectTrigger>
                            <SelectContent>
                              {getAvailablePlans().length > 0 ? (
                                getAvailablePlans().map((plan) => (
                                <SelectItem key={plan.name} value={plan.name}>
                                    {plan.name} - {plan.priceYearly.toLocaleString("fr-FR")} {plan.period}
                                    {plan.priceMonthly > 0 && ` / ${plan.priceMonthly.toLocaleString("fr-FR")} ${plan.period}/mois`}
                                </SelectItem>
                                ))
                              ) : (
                                <div className="px-2 py-1.5 text-sm text-gray-500">
                                  Aucune formule disponible
                        </div>
                              )}
                                </SelectContent>
                              </Select>
                          {!selectedAdhesionType && (
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <Info className="h-4 w-4 text-cpu-orange" />
                              Veuillez d'abord sélectionner un type de membre
                            </p>
                          )}
                            </div>
                            </div>

                      {/* Séparateur moderne */}
                      <div className="border-t-2 border-gray-100 my-8"></div>

                      {/* SECTION: Message */}
                      <div className="pb-8">
                            <div className="space-y-3">
                          <Label htmlFor="message" className="text-sm font-semibold text-gray-700">Message ou informations complémentaires</Label>
                          <Textarea
                            id="message"
                            placeholder="Décrivez brièvement votre organisation et vos attentes..."
                            className="min-h-[140px] border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl px-4 py-3 text-gray-900 resize-none"
                            value={formMessage}
                            onChange={(e) => setFormMessage(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Bouton de soumission */}
                      <div className="pt-6">
                        <Button
                          type="submit"
                          className="w-full h-14 bg-gradient-to-r from-cpu-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <Award className="h-6 w-6" />
                          Soumettre ma demande d'adhésion
                          </span>
                        </Button>
                        <p className="text-center text-sm text-gray-500 mt-4">
                          Notre équipe vous contactera sous 48 heures
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
