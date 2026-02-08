"use client";

import { useState, useEffect, useMemo, useRef, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Head from "next/head";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Mail,
  Phone,
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
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  Save,
  Eye,
  EyeOff,
  Bookmark,
} from "lucide-react";
import {
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
  useTypeMembresForSiteWeb,
  useRegionsForSiteWeb,
  useSecteursForSiteWeb,
  useAbonnementsForSiteWeb,
  usePartenairesForSiteWeb,
  useCentresInteretForSiteWeb,
  useAdhesionsForSiteWeb,
} from "@/hooks/use-api";
import { adhesionsService } from "@/lib/api/services/adhesions.service";
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
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { decodeHtmlEntities } from "@/lib/utils/decodeHtmlEntities";
import "./member-cards.css";
import { DynamicHeroBanner } from "@/components/DynamicHeroBanner";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import Fuse from "fuse.js";
import Confetti from "react-confetti";

// Phase 9: Animation variants (définis en dehors du composant pour éviter les re-créations)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      duration: 0.5
    }
  },
  hover: {
    scale: 1.02,
    y: -5,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 10
    }
  }
};

// Composant Skeleton pour les cartes avec animation shimmer
const MemberCardSkeleton = () => (
  <div className="border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col">
    <div className="h-40 bg-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
    </div>
    <div className="p-6 flex flex-col flex-1 space-y-4">
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-gray-200 rounded relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
        </div>
        <div className="h-5 w-20 bg-gray-200 rounded relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
        </div>
      </div>
      <div className="h-6 bg-gray-200 rounded w-3/4 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-5/6 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-4/6 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
        </div>
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

interface PartenaireAPI {
  id: string;
  type: string;
  nom: string;
  logo: string;
  description: string | null;
  lien: string | null;
  categorie: string | null;
  offre: string | null;
  reduction: string | null;
  note: string | null;
  couleurHeader: string | null;
}

// Données hiérarchiques des régions de Côte d'Ivoire
const regionsData: RegionData = {
  Abidjan: {
    Abobo: [
      "Abobo-Baoulé",
      "Abobo-Gare",
      "Abobo-PK18",
      "Anonkoua-Kouté",
      "Avocatier",
      "Sagbé",
    ],
    Adjamé: [
      "Adjamé-Village",
      "Adjamé-Liberté",
      "Adjamé-Williamsville",
      "Adjamé-220 Logements",
    ],
    Attécoubé: [
      "Attécoubé-Centre",
      "Attécoubé-Santé",
      "Attécoubé-Locodjoro",
      "Attécoubé-Gbato",
    ],
    Cocody: [
      "Cocody-Centre",
      "Cocody-Riviera",
      "Cocody-Angré",
      "Cocody-Blockhaus",
      "Cocody-Deux-Plateaux",
      "Cocody-Saint-Jean",
      "Cocody-Danga",
    ],
    Koumassi: [
      "Koumassi-Centre",
      "Koumassi-Remblais",
      "Koumassi-Grand-Campement",
      "Koumassi-Zone Industrielle",
    ],
    Marcory: [
      "Marcory-Zone 4",
      "Marcory-Résidentiel",
      "Marcory-Anoumabo",
      "Marcory-Biétry",
    ],
    Plateau: ["Plateau-Ville", "Plateau-Dokui", "Plateau-Centre des Affaires"],
    "Port-Bouët": [
      "Port-Bouët-Centre",
      "Port-Bouët-Vridi",
      "Port-Bouët-Zone 4",
      "Port-Bouët-Gonzagueville",
    ],
    Treichville: [
      "Treichville-Centre",
      "Treichville-Biafra",
      "Treichville-Arras",
      "Treichville-Zone 3",
    ],
    Yopougon: [
      "Yopougon-Attié",
      "Yopougon-Niangon",
      "Yopougon-Sicogi",
      "Yopougon-Selmer",
      "Yopougon-Millionnaire",
    ],
    Bingerville: ["Bingerville-Centre", "Bingerville-Akandjé"],
    Songon: ["Songon-Centre", "Songon-Agban"],
    Anyama: ["Anyama-Centre", "Anyama-M'Pouto"],
  },
  "Agnéby-Tiassa": {
    Agboville: ["Agboville-Centre", "Agboville-Guessabo", "Agboville-Odiénné"],
    Rubino: ["Rubino-Centre"],
    Azaguié: ["Azaguié-Centre", "Azaguié-Akoupé"],
    "Oress-Krobou": ["Oress-Krobou-Centre"],
    Céchi: ["Céchi-Centre"],
    Taabo: ["Taabo-Centre", "Taabo-Village"],
  },
  Bélier: {
    Yamoussoukro: [
      "Yamoussoukro-Centre",
      "Yamoussoukro-Kokrenou",
      "Yamoussoukro-Habitat",
      "Yamoussoukro-N'Gokro",
    ],
    Attiégouakro: ["Attiégouakro-Centre"],
    Tiébissou: ["Tiébissou-Centre", "Tiébissou-Yakpabo"],
    Toumodi: ["Toumodi-Centre", "Toumodi-Kokumbo"],
  },
  Gbêkê: {
    Bouaké: [
      "Bouaké-Centre",
      "Bouaké-Koko",
      "Bouaké-Dar-Es-Salam",
      "Bouaké-Belleville",
      "Bouaké-Nimbo",
    ],
    Béoumi: ["Béoumi-Centre", "Béoumi-Sakassou"],
    Bodokro: ["Bodokro-Centre"],
    Botro: ["Botro-Centre"],
    Sakassou: ["Sakassou-Centre"],
  },
  "Haut-Sassandra": {
    Daloa: ["Daloa-Centre", "Daloa-Tazibouo", "Daloa-Lobia", "Daloa-Gbokora"],
    Issia: ["Issia-Centre", "Issia-Saïoua"],
    Vavoua: ["Vavoua-Centre", "Vavoua-Dania"],
    Zoukougbeu: ["Zoukougbeu-Centre"],
  },
  "San-Pédro": {
    "San-Pédro": [
      "San-Pédro-Centre",
      "San-Pédro-Bardot",
      "San-Pédro-Wharf",
      "San-Pédro-Balmer",
    ],
    "Grand-Béréby": ["Grand-Béréby-Centre"],
    Tabou: ["Tabou-Centre", "Tabou-Grabo"],
  },
  Poro: {
    Korhogo: [
      "Korhogo-Centre",
      "Korhogo-Tchengué",
      "Korhogo-Koko",
      "Korhogo-Soba",
    ],
    "M'Bengué": ["M'Bengué-Centre"],
    Dikodougou: ["Dikodougou-Centre"],
    Sinématiali: ["Sinématiali-Centre"],
  },
  Tonkpi: {
    Man: ["Man-Centre", "Man-Libreville", "Man-Marabadjan", "Man-Zéaglo"],
    Biankouma: ["Biankouma-Centre", "Biankouma-Gbonné"],
    Danané: ["Danané-Centre", "Danané-Zouan"],
    Logoualé: ["Logoualé-Centre"],
    Sipilou: ["Sipilou-Centre"],
    "Zouan-Hounien": ["Zouan-Hounien-Centre"],
  },
  Gôh: {
    Gagnoa: [
      "Gagnoa-Centre",
      "Gagnoa-Bayota",
      "Gagnoa-Guébiasso",
      "Gagnoa-Diahouin",
    ],
    Oumé: ["Oumé-Centre", "Oumé-Diegonéfla"],
    Bayota: ["Bayota-Centre"],
    Guibéroua: ["Guibéroua-Centre"],
    Ouragahio: ["Ouragahio-Centre"],
    Serihio: ["Serihio-Centre"],
  },
  Bounkani: {
    Bouna: ["Bouna-Centre", "Bouna-Lassiri"],
    Doropo: ["Doropo-Centre", "Doropo-Tehini"],
    Nassian: ["Nassian-Centre"],
    Téhini: ["Téhini-Centre"],
  },
  Cavally: {
    Guiglo: ["Guiglo-Centre", "Guiglo-Kaadé"],
    Bloléquin: ["Bloléquin-Centre", "Bloléquin-Zéo"],
    Taï: ["Taï-Centre", "Taï-Village"],
    Toulepleu: ["Toulepleu-Centre"],
  },
  Folon: {
    Minignan: ["Minignan-Centre", "Minignan-Sokourala"],
    Koro: ["Koro-Centre"],
    Madinani: ["Madinani-Centre"],
  },
  Gbôklé: {
    Sassandra: [
      "Sassandra-Centre",
      "Sassandra-Dakpadou",
      "Sassandra-San-Pédro",
    ],
    Fresco: ["Fresco-Centre", "Fresco-Gbagbam"],
    Méagui: ["Méagui-Centre"],
  },
  Gontougo: {
    Bondoukou: ["Bondoukou-Centre", "Bondoukou-Lafia", "Bondoukou-Gouméré"],
    "Koun-Fao": ["Koun-Fao-Centre"],
    Sandégué: ["Sandégué-Centre"],
    Tanda: ["Tanda-Centre", "Tanda-Assuéfry"],
    Transua: ["Transua-Centre"],
  },
  "Grands-Ponts": {
    Dabou: ["Dabou-Centre", "Dabou-Lopou", "Dabou-Toupah"],
    Jacqueville: ["Jacqueville-Centre", "Jacqueville-Attoutou"],
    "Grand-Lahou": ["Grand-Lahou-Centre", "Grand-Lahou-Lahou-Kpanda"],
  },
  Guémon: {
    Duékoué: ["Duékoué-Centre", "Duékoué-Guézon"],
    Bangolo: ["Bangolo-Centre", "Bangolo-Bédi-Goazon"],
    Facobly: ["Facobly-Centre"],
    Kouibly: ["Kouibly-Centre"],
  },
  Hambol: {
    Katiola: ["Katiola-Centre", "Katiola-Niakara", "Katiola-Fronan"],
    Dabakala: ["Dabakala-Centre", "Dabakala-Satama-Sokoro"],
    Niakaramandougou: ["Niakaramandougou-Centre"],
  },
  Iffou: {
    Daoukro: ["Daoukro-Centre", "Daoukro-Ettrokro"],
    "M'Bahiakro": ["M'Bahiakro-Centre", "M'Bahiakro-Andé"],
    Prikro: ["Prikro-Centre"],
  },
  "Indénié-Djuablin": {
    Abengourou: [
      "Abengourou-Centre",
      "Abengourou-Zaranou",
      "Abengourou-Ebilassokro",
    ],
    Agnibilékrou: ["Agnibilékrou-Centre", "Agnibilékrou-Tanguelan"],
    Bettié: ["Bettié-Centre", "Bettié-Diamarakro"],
  },
  Kabadougou: {
    Odienné: ["Odienné-Centre", "Odienné-Samatiguila", "Odienné-Madinani"],
    Gbéléban: ["Gbéléban-Centre"],
    Madinani: ["Madinani-Centre"],
    Samatiguila: ["Samatiguila-Centre"],
    Séguélon: ["Séguélon-Centre"],
  },
  "La Mé": {
    Adzopé: ["Adzopé-Centre", "Adzopé-Annépé"],
    Akoupé: ["Akoupé-Centre", "Akoupé-Zeudji"],
    Alépé: ["Alépé-Centre", "Alépé-Danguira"],
    "Yakassé-Attobrou": ["Yakassé-Attobrou-Centre"],
  },
  "Lôh-Djiboua": {
    Divo: ["Divo-Centre", "Divo-Hiré", "Divo-Zégo"],
    Guitry: ["Guitry-Centre", "Guitry-Oghlawapo"],
    Lakota: ["Lakota-Centre", "Lakota-Babouakro"],
  },
  Marahoué: {
    Bouaflé: ["Bouaflé-Centre", "Bouaflé-Kononfla"],
    Sinfra: ["Sinfra-Centre", "Sinfra-Kouetinfla"],
    Zuénoula: ["Zuénoula-Centre", "Zuénoula-Gohitafla"],
  },
  Moronou: {
    Bongouanou: ["Bongouanou-Centre", "Bongouanou-Tiémélékro"],
    "M'Batto": ["M'Batto-Centre"],
    Arrah: ["Arrah-Centre"],
  },
  Nawa: {
    Soubré: ["Soubré-Centre", "Soubré-Liliyo", "Soubré-Okrouyo"],
    Buyo: ["Buyo-Centre"],
    Guéyo: ["Guéyo-Centre"],
    Méadji: ["Méadji-Centre"],
  },
  "N'Zi": {
    Dimbokro: ["Dimbokro-Centre", "Dimbokro-Ettien"],
    Bocanda: ["Bocanda-Centre", "Bocanda-Kouassi-Datekro"],
    "Kouassi-Kouassikro": ["Kouassi-Kouassikro-Centre"],
  },
  Tchologo: {
    Ferkessédougou: ["Ferkessédougou-Centre", "Ferkessédougou-Sikolo"],
    Kong: ["Kong-Centre", "Kong-Nafana"],
    Ouangolodougou: ["Ouangolodougou-Centre", "Ouangolodougou-Niellé"],
  },
  Worodougou: {
    Séguéla: ["Séguéla-Centre", "Séguéla-Worofla", "Séguéla-Massala"],
    Kani: ["Kani-Centre"],
    Mankono: ["Mankono-Centre", "Mankono-Tiéningboué"],
  },
  "Moyen-Cavally": {
    Guiglo: ["Guiglo-Centre", "Guiglo-Kaadé"],
    Duékoué: ["Duékoué-Centre", "Duékoué-Guézon"],
    Taï: ["Taï-Centre", "Taï-Village"],
  },
  "Moyen-Comoé": {
    Aboisso: ["Aboisso-Centre", "Aboisso-Yaou", "Aboisso-Bianouan"],
    Adiaké: ["Adiaké-Centre", "Adiaké-Etuéboué"],
    Ayamé: ["Ayamé-Centre"],
    "Grand-Bassam": [
      "Grand-Bassam-Centre",
      "Grand-Bassam-Bongo",
      "Grand-Bassam-Modeste",
    ],
    Tiapoum: ["Tiapoum-Centre"],
  },
  "Sud-Comoé": {
    Aboisso: ["Aboisso-Centre", "Aboisso-Yaou", "Aboisso-Bianouan"],
    Adiaké: ["Adiaké-Centre", "Adiaké-Etuéboué"],
    "Grand-Bassam": ["Grand-Bassam-Centre", "Grand-Bassam-Bongo"],
    Tiapoum: ["Tiapoum-Centre"],
  },
};

// Pour les régions non détaillées, communes génériques
const getDefaultCommunes = (): CommuneData => ({
  "Commune Centre": ["Ville Centre"],
  "Commune Nord": ["Ville Nord"],
  "Commune Sud": ["Ville Sud"],
  "Commune Est": ["Ville Est"],
  "Commune Ouest": ["Ville Ouest"],
});

// Données des organisations par type en Côte d'Ivoire
const organisationsByType: { [key: string]: string[] } = {
  federation: [
    "FENACOPACI (Fédération Nationale des Coopératives Agricoles de Côte d'Ivoire)",
    "FENASCOVICI (Fédération Nationale des Coopératives Vivrières de Côte d'Ivoire)",
    "Fédération Ivoirienne du Commerce et de la Distribution",
    "Fédération des PME et PMI de Côte d'Ivoire",
    "Fédération Nationale des Artisans de Côte d'Ivoire",
    "Autre",
  ],
  cooperative: [
    "CAYAT (Coopérative Agricole de Yamoussoukro)",
    "COOPEC-CI (Coopérative d'Épargne et de Crédit)",
    "SCPA-RE (Société Coopérative de Production Agricole)",
    "Coopérative des Planteurs de Cacao de Soubré",
    "Coopérative des Femmes Transformatrices d'Abobo",
    "UNACOOPEC-CI (Union Nationale des Coopératives d'Épargne et de Crédit)",
    "Autre",
  ],
  association: [
    "Association des Jeunes Entrepreneurs de Côte d'Ivoire",
    "Association Ivoirienne des Femmes d'Affaires",
    "Association des Commerçants du Plateau",
    "Association des Professionnels du Numérique de Côte d'Ivoire",
    "Association des Artisans de Yopougon",
    "Association des Exportateurs de Côte d'Ivoire",
    "Autre",
  ],
  groupement: [
    "GIE Agro-business Abidjan",
    "Groupement des Transformateurs Agroalimentaires",
    "GIE Transport et Logistique CI",
    "Groupement des Prestataires de Services BTP",
    "GIE Innovation Tech Côte d'Ivoire",
    "Groupement des Producteurs de Cultures Maraîchères",
    "Autre",
  ],
};

// Axes d'intérêt statiques (fallback si l'API ne répond pas)
const axesInteretOptionsFallback = [
  "Financement des PME",
  "Export & Commerce international",
  "Transformation numérique",
  "Innovation & Technologie",
  "Climat & RSE",
  "Agriculture & Agroalimentaire",
  "Emploi des jeunes",
  "Formation & Renforcement des capacités",
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
  "Éducation & formation",
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
  const [expandedMembers, setExpandedMembers] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage, setMembersPerPage] = useState(9);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [carouselProgress, setCarouselProgress] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  // Phase 3: Filtres avancés - Modifiés
  const [selectedFiliereFilter, setSelectedFiliereFilter] = useState<string>("all");
  const [selectedActivitiesFilter, setSelectedActivitiesFilter] = useState<string[]>([]);

  // États pour le formulaire d'adhésion
  const [selectedAdhesionType, setSelectedAdhesionType] = useState<
    MemberType | ""
  >("");
  const [selectedSubProfile, setSelectedSubProfile] = useState<string>("");
  const [isCompetitionSubcontractor, setIsCompetitionSubcontractor] = useState<
    boolean | null
  >(null);
  const [hasFinancingProject, setHasFinancingProject] = useState<
    boolean | null
  >(null);
  const [hasAffiliation, setHasAffiliation] = useState<boolean>(false);
  const [selectedOrgType, setSelectedOrgType] = useState<string>("");
  const [selectedOrganisation, setSelectedOrganisation] = useState<string>("");
  const [customOrganisationName, setCustomOrganisationName] =
    useState<string>("");
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
  const [orgName, setOrgName] = useState<string>("");
  const [formName, setFormName] = useState<string>("");
  const [formPosition, setFormPosition] = useState<string>("");
  const [formEmail, setFormEmail] = useState<string>("");
  const [formPhone, setFormPhone] = useState<string>("");
  const [formMessage, setFormMessage] = useState<string>("");
  const [formWebsite, setFormWebsite] = useState<string>("");
  const [nombreEmploye, setNombreEmploye] = useState<string>("");
  const [internationalAddress, setInternationalAddress] = useState<string>("");
  const [internationalCity, setInternationalCity] = useState<string>("");
  const [internationalCountry, setInternationalCountry] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  // Phase 9: États avancés UX
  const [focusedMember, setFocusedMember] = useState<Member | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedText, setHighlightedText] = useState("");
  const [userPreferences, setUserPreferences] = useState({
    defaultView: "grid" as "grid" | "list",
    defaultSort: "random",
    defaultPerPage: 9,
  });
  const [isLoadingPreferences, setIsLoadingPreferences] = useState(true);
  const [isSuccessModalOpen, setIsSuccessModalOpen] =
    useState<boolean>(false);
  const [hasSubmittedSuccess, setHasSubmittedSuccess] =
    useState<boolean>(false);
  // États spécifiques aux membres institutionnels
  const [selectedAxesInteret, setSelectedAxesInteret] = useState<string[]>([]);
  const [selectedFilieresPrioritaires, setSelectedFilieresPrioritaires] =
    useState<string[]>([]);
  const [hasBureauCI, setHasBureauCI] = useState<boolean>(false);
  const [hasBureauInternational, setHasBureauInternational] = useState<boolean>(false);

  // États pour validation temps réel
  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>(false);
  const [phoneValid, setPhoneValid] = useState<boolean>(false);

  // États pour sauvegarde automatique
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isDraftRestored, setIsDraftRestored] = useState<boolean>(false);

  const { toast } = useToast();

  // Récupérer les partenaires Pass PME depuis l'API
  const { data: partenairesPassPME = [], isLoading: isLoadingPartenairesPME } =
    usePartenairesForSiteWeb({ type: "simple" });

  // Phase 9: Styles mémorisés pour éviter les re-renders
  const glassmorphismStyle = useMemo(() => ({
    backdropFilter: 'blur(20px) saturate(180%)',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    border: '1px solid rgba(209, 213, 219, 0.3)',
  }), []);

  // Récupérer les types de membres depuis l'API
  const {
    data: typeMembresApi,
    isLoading: isLoadingTypeMembres,
    error: errorTypeMembres,
  } = useTypeMembresForSiteWeb();

  // Debug: Log des données récupérées
  useEffect(() => {
    if (Array.isArray(typeMembresApi)) {
      if (typeMembresApi.length > 0) {
      }
    }
  }, [typeMembresApi, isLoadingTypeMembres, errorTypeMembres]);

  // Trouver le type de membre sélectionné et ses profils
  const selectedTypeMembre =
    selectedAdhesionType &&
    Array.isArray(typeMembresApi) &&
    typeMembresApi.length > 0
      ? typeMembresApi.find((tm) => {
          const typeName = tm.name.toLowerCase();
          return (
            typeName.includes(selectedAdhesionType) ||
            (selectedAdhesionType === "individuel" &&
              typeName.includes("individuel")) ||
            (selectedAdhesionType === "entreprise" &&
              typeName.includes("entreprise")) ||
            (selectedAdhesionType === "associatif" &&
              (typeName.includes("associatif") ||
                typeName.includes("organisation"))) ||
            (selectedAdhesionType === "institutionnel" &&
              typeName.includes("institutionnel"))
          );
        }) || null
      : null;

  // Utiliser les profils directement depuis le type de membre (déjà inclus dans la réponse)
  // Au lieu de faire un appel API séparé qui nécessite une authentification
  const profilsApi = selectedTypeMembre?.profils || [];
  const isLoadingProfils = false; // Pas de chargement car les profils sont déjà dans les données

  // Debug: Log des profils récupérés
  useEffect(() => {
    if (selectedTypeMembre) {
    }
  }, [selectedTypeMembre, profilsApi]);

  // Récupérer les régions depuis l'API
  const {
    data: regionsApi,
    isLoading: isLoadingRegions,
    error: errorRegions,
  } = useRegionsForSiteWeb();

  // Debug: Log des régions récupérées
  useEffect(() => {
    if (regionsApi) {
    }
  }, [regionsApi]);

  // Récupérer les secteurs depuis l'API
  const {
    data: secteursApi,
    isLoading: isLoadingSecteurs,
    error: errorSecteurs,
  } = useSecteursForSiteWeb();

  // Récupérer les abonnements depuis l'API
  const {
    data: abonnementsApi,
    isLoading: isLoadingAbonnements,
    error: errorAbonnements,
  } = useAbonnementsForSiteWeb();

  // Récupérer les centres d'intérêt depuis l'API
  const {
    data: centresInteretApi = [],
    isLoading: isLoadingCentresInteret,
    error: errorCentresInteret,
  } = useCentresInteretForSiteWeb({ activeOnly: true });

  // Récupérer les adhésions approuvées pour alimenter les listes d'organisations
  const adhesionsParams = useMemo(
    () => ({ statut: "approved", limit: 1000 }),
    []
  );
  const { data: adhesionsApi = [], isLoading: isLoadingAdhesions } =
    useAdhesionsForSiteWeb(adhesionsParams);

  const membersFromApi = useMemo<Member[]>(() => {
    const mapTypeMembreName = (name?: string): MemberType => {
      const lowerName = (name || "").toLowerCase();
      if (lowerName.includes("individuel")) return "individuel";
      if (
        lowerName.includes("associatif") ||
        lowerName.includes("organisation")
      ) {
        return "associatif";
      }
      if (lowerName.includes("institutionnel")) return "institutionnel";
      if (lowerName.includes("entreprise")) return "entreprise";
      return "entreprise";
    };

    const mapBadge = (
      plan?: string,
      libelle?: string,
      memberType?: MemberType
    ) => {
      if (memberType === "institutionnel") return "Institutionnel";
      const source = `${plan || ""} ${libelle || ""}`.toLowerCase();
      if (source.includes("gold") || source.includes("or")) return "Or";
      if (source.includes("silver") || source.includes("argent")) return "Argent";
      if (source.includes("basic")) return "Basic";
      return undefined;
    };

    return adhesionsApi.map((adhesion: any) => {
      const memberType = mapTypeMembreName(adhesion?.typeMembre?.name);
      // IDs pour mapping
      const filiereId = adhesion?.filiereId || null;
      const sousFiliereId = adhesion?.sousFiliereId || null;
      const activitesIds = Array.isArray(adhesion?.activitesIds) ? adhesion.activitesIds : [];
      
      // Construire l'adresse complète
      const addressParts = [
        adhesion?.siegeVillage,
        adhesion?.siegeCommune?.name,
        adhesion?.siegeRegion?.name
      ].filter(Boolean);
      
      return {
        id: adhesion?.id || `${adhesion?.email || adhesion?.phone || Math.random()}`,
        name:
          adhesion?.customOrganisationName ||
          adhesion?.name ||
          "Membre CPU-PME",
        logoUrl: undefined,
        filiereId,
        sousFiliereId,
        activitesIds,
        sector: adhesion?.secteurPrincipal?.name || "Non renseigné",
        region: [
          adhesion?.siegeCommune?.name,
          adhesion?.siegeRegion?.name
        ].filter(Boolean).join(", ") || "Non renseignée",
        description: adhesion?.message || "Membre CPU-PME",
        website: adhesion?.website_url || adhesion?.website || undefined,
        featured: false,
        memberType,
        badge: mapBadge(adhesion?.abonnement?.plan, adhesion?.abonnement?.libelle, memberType),
        subProfile: undefined,
        profileLabel: adhesion?.profil?.name || undefined,
        // Données de contact
        email: adhesion?.email || undefined,
        phone: adhesion?.phone || undefined,
        position: adhesion?.position || undefined,
        // Informations complémentaires
        interventionScope: adhesion?.interventionScope || undefined,
        fullAddress: addressParts.join(", ") || undefined,
        createdAt:
          adhesion?.approved_at ||
          adhesion?.approvedAt ||
          adhesion?.validated_at ||
          adhesion?.validatedAt ||
          adhesion?.updated_at ||
          adhesion?.updatedAt ||
          adhesion?.created_at ||
          adhesion?.createdAt ||
          undefined,
      };
    });
  }, [adhesionsApi]);

  const membersSignature = useMemo(
    () => membersFromApi.map((member) => member.id).join("|"),
    [membersFromApi]
  );
  const shuffledSignatureRef = useRef<string>("");

  const filiereNameById = useMemo(() => {
    const map = new Map<string, string>();
    if (Array.isArray(secteursApi)) {
      secteursApi.forEach((secteur) => {
        secteur.filieres?.forEach((filiere) => {
          if (filiere?.id && filiere?.name) {
            map.set(filiere.id, filiere.name);
          }
          filiere.sousFiliere?.forEach((sf) => {
            if (sf?.id && sf?.name) {
              map.set(sf.id, sf.name);
            }
            sf.activites?.forEach((act) => {
              if (act?.id && act?.name) {
                map.set(act.id, act.name);
              }
            });
          });
        });
      });
    }
    return map;
  }, [secteursApi]);

  const directorySectors = useMemo(
    () =>
      Array.from(new Set(membersFromApi.map((member) => member.sector))).sort(),
    [membersFromApi]
  );

  const directoryRegions = useMemo(
    () =>
      Array.from(new Set(membersFromApi.map((member) => member.region))).sort(),
    [membersFromApi]
  );

  // Listes pour les nouveaux filtres
  const directoryFilieres = useMemo(() => {
    const filieres: Array<{id: string, name: string}> = [];
    if (secteursApi && Array.isArray(secteursApi)) {
      secteursApi.forEach(secteur => {
        if (secteur.filieres && Array.isArray(secteur.filieres)) {
          secteur.filieres.forEach(filiere => {
            if (filiere.id && filiere.name) {
              filieres.push({id: String(filiere.id), name: filiere.name});
            }
          });
        }
      });
    }
    return filieres.sort((a, b) => a.name.localeCompare(b.name));
  }, [secteursApi]);

  const directoryActivites = useMemo(() => {
    const activites: Array<{id: string, name: string}> = [];
    if (secteursApi && Array.isArray(secteursApi)) {
      secteursApi.forEach(secteur => {
        if (secteur.filieres && Array.isArray(secteur.filieres)) {
          secteur.filieres.forEach(filiere => {
            if (filiere.sousFiliere && Array.isArray(filiere.sousFiliere)) {
              filiere.sousFiliere.forEach(sf => {
                if (sf.activites && Array.isArray(sf.activites)) {
                  sf.activites.forEach(activite => {
                    if (activite.id && activite.name && !activites.find(a => a.id === String(activite.id))) {
                      activites.push({id: String(activite.id), name: activite.name});
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
    return activites.sort((a, b) => a.name.localeCompare(b.name));
  }, [secteursApi]);

  const isLoadingMembers = isLoading || isLoadingAdhesions;

  // Debug: Log des secteurs récupérés
  useEffect(() => {
    if (secteursApi) {
    }
  }, [secteursApi]);

  // Obtenir la liste des régions (depuis l'API ou données statiques)
  const getAvailableRegions = (): string[] => {
    if (
      Array.isArray(regionsApi) &&
      regionsApi.length > 0
    ) {
      // Utiliser les régions de l'API uniquement
      return regionsApi
        .filter((r) => r.isActive !== false)
        .map((r) => r.name)
        .sort();
    }
    // Aucun fallback - retourner tableau vide si API ne répond pas
    return [];
  };

  // Extraire toutes les filières depuis l'API secteurs
  const getAvailableFilieres = (): string[] => {
    if (
      Array.isArray(secteursApi) &&
      secteursApi.length > 0
    ) {
      const allFilieres = new Set<string>();
      secteursApi.forEach((secteur) => {
        if (secteur.filieres && Array.isArray(secteur.filieres)) {
          secteur.filieres
            .filter((f) => f.isActive !== false)
            .forEach((filiere) => {
              allFilieres.add(filiere.name);
            });
        }
      });
      return Array.from(allFilieres).sort();
    }
    // Aucun fallback - retourner tableau vide si API ne répond pas
    return [];
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

  useEffect(() => {
    if (hasSubmittedSuccess && !isSuccessModalOpen) {
      router.push("/");
    }
  }, [hasSubmittedSuccess, isSuccessModalOpen, router]);

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
    setHasBureauInternational(false);
    setInternationalAddress("");
    setInternationalCity("");
    setInternationalCountry("");
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

  // Déterminer automatiquement la région et la ville quand une commune est sélectionnée
  useEffect(() => {
    if (siegeCommune) {
      const info = findRegionAndVilleForCommune(siegeCommune);
      if (info) {
        // Mettre à jour la région
        const regionValue = info.regionId || info.regionName;
        if (siegeRegion !== regionValue) {
          setSiegeRegion(regionValue);
        }
        // Mettre à jour la ville automatiquement
        if (info.villeName && siegeVille !== info.villeName) {
          setSiegeVille(info.villeName);
        }
      }
    } else {
      // Si aucune commune n'est sélectionnée, réinitialiser la région et la ville
      setSiegeRegion("");
      setSiegeVille("");
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

  const getApprovedOrganisationsByType = (orgType?: string) => {
    if (!orgType) return [];

    const normalizedType = orgType.toLowerCase();
    const orgTypeKeywords: Record<string, string[]> = {
      federation: ["fédération", "federation"],
      cooperative: ["coopérative", "cooperative"],
      association: ["association"],
      groupement: ["groupement", "gie"],
    };
    const typeKeywords = orgTypeKeywords[normalizedType] || [];
    const namesFromApi = adhesionsApi
      .filter((adhesion) => {
        const status = String(adhesion.statut || adhesion.status || "").toLowerCase();
        const typeMembreName = String(adhesion.typeMembre?.name || "").toLowerCase();
        const profilName = String(adhesion.profil?.name || "").toLowerCase();
        const isAssociatif = typeMembreName.includes("associatif");
        const matchesProfil =
          typeKeywords.length === 0
            ? false
            : typeKeywords.some((keyword) => profilName.includes(keyword));
        return status === "approved" && isAssociatif && matchesProfil;
      })
      .map((adhesion) => {
        return (
          adhesion.customOrganisationName ||
          adhesion.organisationName ||
          ""
        );
      })
      .filter((name) => Boolean(name));

    return Array.from(new Set(namesFromApi));
  };

  // Obtenir toutes les filières de tous les secteurs (depuis l'API ou données statiques)
  const getAllFilieres = () => {
    // Utiliser les données de l'API si disponibles
    if (secteursApi && Array.isArray(secteursApi) && secteursApi.length > 0) {
      const allFilieres: Array<{
        filiere: { id: string; nom: string; sousFiliere: any[] };
        secteurId: string;
        secteurNom: string;
      }> = [];
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
    const allFilieres: Array<{
      filiere: { id: string; nom: string; sousCategories: any[] };
      secteurId: string;
      secteurNom: string;
    }> = [];
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
          const filiere = secteur.filieres.find(
            (f) => f.id === filiereId && f.isActive !== false
          );
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
          const filiere = secteur.filieres.find(
            (f) => f.id === selectedFiliere && f.isActive !== false
          );
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
    const filiereData = allFilieres.find(
      (f) => f.filiere.id === selectedFiliere
    );
    if (filiereData) {
      // Vérifier si c'est une structure API (sousFiliere) ou statique (sousCategories)
      if ("sousFiliere" in filiereData.filiere) {
        return (filiereData.filiere as any).sousFiliere
          .filter((sf: any) => sf.isActive !== false)
          .map((sf: any) => ({ id: sf.id, nom: sf.name }));
      } else if ("sousCategories" in filiereData.filiere) {
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
                (sf) =>
                  (sf.id === selectedSubCategory ||
                    sf.name === selectedSubCategory) &&
                  sf.isActive !== false
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
    const sousCategorie = sousCategories.find(
      (sc: { nom: string; sectionsDeTags: any[] }) =>
        sc.nom === selectedSubCategory
    );
    if (!sousCategorie) return [];

    // Collecter tous les tags de toutes les sections
    const allTags: string[] = [];
    if (
      "sectionsDeTags" in sousCategorie &&
      Array.isArray(sousCategorie.sectionsDeTags)
    ) {
      sousCategorie.sectionsDeTags.forEach((section: { tags: string[] }) => {
        allTags.push(...section.tags);
      });
    }
    return allTags;
  };

  // Fonctions de validation temps réel
  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError("");
      setEmailValid(false);
      return;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError("Format d'email invalide");
      setEmailValid(false);
    } else {
      setEmailError("");
      setEmailValid(true);
    }
  };

  const validatePhone = (phone: string) => {
    if (!phone) {
      setPhoneError("");
      setPhoneValid(false);
      return;
    }
    // Validation pour format ivoirien: +225 XX XX XX XX XX ou variantes
    const regex = /^(\+225|00225|225)?\s*\d{2}\s*\d{2}\s*\d{2}\s*\d{2}\s*\d{2}$/;
    if (!regex.test(phone.replace(/\s/g, ''))) {
      setPhoneError("Format invalide (ex: +225 XX XX XX XX XX)");
      setPhoneValid(false);
    } else {
      setPhoneError("");
      setPhoneValid(true);
    }
  };

  // Calculer la progression du formulaire
  const calculateProgress = () => {
    let completed = 0;
    let total = 0;

    // Type de membre
    if (selectedAdhesionType) {
      completed++;
    }
    total++;

    // Organisation
    if (selectedAdhesionType) {
      if (orgName) completed++;
      if (formEmail && emailValid) completed++;
      total += 2;
    }

    // Secteur d'activité (sauf institutionnel)
    if (selectedAdhesionType && selectedAdhesionType !== "institutionnel") {
      if (selectedFiliere || selectedMainSector) completed++;
      total++;
    }

    // Sections spécifiques Institutionnel
    if (selectedAdhesionType === "institutionnel") {
      // Axes d'intérêt
      if (selectedAxesInteret.length > 0) completed++;
      total++;
      
      // Zones d'intervention
      if (selectedRegions.length > 0) completed++;
      total++;
      
      // Filières prioritaires (optionnel, pas compté dans total mais bonus si rempli)
      if (selectedFilieresPrioritaires.length > 0) completed++;
    }

    // Localisation
    if (selectedAdhesionType) {
      if (selectedAdhesionType === "institutionnel") {
        // Pour institutionnel, moins de détails requis
        if (siegeCommune || siegeRegion) completed++;
        total++;
      } else {
        // Pour autres types
        if (siegeCommune) completed++;
        if (siegeRegion) completed++;
        total += 2;
      }
    }

    // Zones d'intervention (pour non-institutionnel)
    if (selectedAdhesionType && selectedAdhesionType !== "institutionnel") {
      if (interventionScope === "national" || selectedRegions.length > 0) completed++;
      total++;
    }

    // Contact
    if (selectedAdhesionType) {
      if (formName) completed++;
      if (formPhone && phoneValid) completed++;
      total += 2;
    }

    // Formule
    if (selectedBadge) completed++;
    total++;

    return { completed, total, percentage: Math.round((completed / total) * 100) };
  };

  // Sauvegarde automatique du brouillon
  useEffect(() => {
    if (!isDraftRestored || !isMounted) return;

    const saveTimer = setTimeout(() => {
      const draft = {
        selectedAdhesionType,
        orgName,
        formEmail,
        formName,
        formPosition,
        formPhone,
        formMessage,
        formWebsite,
        selectedFiliere,
        selectedSubCategory,
        selectedActivities,
        selectedMainSector,
        siegeCommune,
        siegeRegion,
        siegeVille,
        siegeVillage,
        interventionScope,
        selectedRegions,
        selectedBadge,
        selectedAxesInteret,
        hasBureauCI,
        hasBureauInternational,
        internationalAddress,
        internationalCity,
        internationalCountry,
        nombreEmploye,
        timestamp: new Date().toISOString(),
      };
      
      try {
        localStorage.setItem('adhesion-draft', JSON.stringify(draft));
        setLastSaved(new Date());
      } catch (error) {
        console.error('Erreur de sauvegarde:', error);
      }
    }, 2000); // Sauvegarde après 2 secondes d'inactivité

    return () => clearTimeout(saveTimer);
  }, [
    isDraftRestored,
    isMounted,
    selectedAdhesionType,
    orgName,
    formEmail,
    formName,
    formPosition,
    formPhone,
    formMessage,
    formWebsite,
    selectedFiliere,
    selectedSubCategory,
    selectedActivities,
    selectedMainSector,
    siegeCommune,
    siegeRegion,
    siegeVille,
    siegeVillage,
    interventionScope,
    selectedRegions,
    selectedBadge,
    selectedAxesInteret,
    hasBureauCI,
    hasBureauInternational,
    internationalAddress,
    internationalCity,
    internationalCountry,
    nombreEmploye,
  ]);

  // Restauration du brouillon au chargement
  useEffect(() => {
    if (!isMounted) return;

    const draft = localStorage.getItem('adhesion-draft');
    if (draft && !isDraftRestored) {
      try {
        const parsed = JSON.parse(draft);
        const savedTime = new Date(parsed.timestamp);
        const hoursSince = (Date.now() - savedTime.getTime()) / (1000 * 60 * 60);

        // Proposer la restauration si moins de 7 jours
        if (hoursSince < 168) {
          toast({
            title: "Brouillon trouvé",
            description: `Sauvegardé ${hoursSince < 1 ? 'il y a moins d\'une heure' : `il y a ${Math.round(hoursSince)} heure(s)`}`,
            action: (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => {
                    const decodeHtmlEntities = (str: string) => {
                      if (!str) return str;
                      return str
                        .replace(/&amp;/g, '&')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/&quot;/g, '"')
                        .replace(/&#x2F;/g, '/')
                        .replace(/&#47;/g, '/');
                    };
                    setSelectedAdhesionType(parsed.selectedAdhesionType || "");
                    setOrgName(parsed.orgName || "");
                    setFormEmail(parsed.formEmail || "");
                    setFormName(parsed.formName || "");
                    setFormPosition(parsed.formPosition || "");
                    setFormPhone(parsed.formPhone || "");
                    setFormMessage(parsed.formMessage || "");
                    setFormWebsite(decodeHtmlEntities(parsed.formWebsite || ""));
                    setSelectedFiliere(parsed.selectedFiliere || "");
                    setSelectedSubCategory(parsed.selectedSubCategory || "");
                    setSelectedActivities(parsed.selectedActivities || []);
                    setSelectedMainSector(parsed.selectedMainSector || "");
                    setSiegeCommune(parsed.siegeCommune || "");
                    setSiegeRegion(parsed.siegeRegion || "");
                    setSiegeVille(parsed.siegeVille || "");
                    setSiegeVillage(parsed.siegeVillage || "");
                    setInterventionScope(parsed.interventionScope || "");
                    setSelectedRegions(parsed.selectedRegions || []);
                    setSelectedBadge(parsed.selectedBadge || "");
                    setSelectedAxesInteret(parsed.selectedAxesInteret || []);
                    setHasBureauCI(parsed.hasBureauCI || false);
                    setHasBureauInternational(parsed.hasBureauInternational || false);
                    setInternationalAddress(parsed.internationalAddress || "");
                    setInternationalCity(parsed.internationalCity || "");
                    setInternationalCountry(parsed.internationalCountry || "");
                    setNombreEmploye(parsed.nombreEmploye || "");
                    setIsDraftRestored(true);
                    toast({
                      title: "Brouillon restauré",
                      description: "Vous pouvez continuer où vous en étiez",
                    });
                  }}
                >
                  <Save className="h-4 w-4 mr-1" />
                  Restaurer
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    localStorage.removeItem('adhesion-draft');
                    setIsDraftRestored(true);
                  }}
                >
                  Ignorer
                </Button>
              </div>
            ),
            duration: 10000,
          });
        } else {
          // Supprimer les brouillons trop anciens
          localStorage.removeItem('adhesion-draft');
        }
        setIsDraftRestored(true);
      } catch (error) {
        console.error('Erreur de restauration:', error);
        setIsDraftRestored(true);
      }
    } else if (!draft) {
      setIsDraftRestored(true);
    }
  }, [isMounted, isDraftRestored, toast]);

  // Désactivé: Scroll automatique qui perturbait la navigation entre sections
  // Les sections sont maintenant dans l'ordre logique et l'utilisateur peut naviguer naturellement
  // useEffect(() => {
  //   if (selectedAdhesionType && selectedSubProfile && isMounted) {
  //     setTimeout(() => {
  //       const targetSection = selectedAdhesionType === 'institutionnel' 
  //         ? 'coordonnees-section'
  //         : 'zones-section';
  //       
  //       document.getElementById(targetSection)?.scrollIntoView({ 
  //         behavior: 'smooth', 
  //         block: 'start',
  //         inline: 'nearest'
  //       });
  //     }, 100);
  //   }
  // }, [selectedAdhesionType, selectedSubProfile ?? "", isMounted]);

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

  // Tout sélectionner ou tout désélectionner les axes d'intérêt
  const toggleAllAxes = () => {
    if (centresInteretApi.length === 0) return;
    
    const allAxes = centresInteretApi.map((ci) => ci.name);
    
    if (selectedAxesInteret.length === allAxes.length) {
      setSelectedAxesInteret([]);
    } else {
      setSelectedAxesInteret([...allAxes]);
    }
  };

  // Tout sélectionner ou tout désélectionner les filières prioritaires
  const toggleAllFilieres = () => {
    const availableFilieres = getAvailableFilieres();
    if (availableFilieres.length === 0) return;
    
    if (selectedFilieresPrioritaires.length === availableFilieres.length) {
      setSelectedFilieresPrioritaires([]);
    } else {
      setSelectedFilieresPrioritaires([...availableFilieres]);
    }
  };

  // Obtenir toutes les communes de toutes les régions (depuis l'API ou données statiques)
  const getAllCommunes = () => {
    // Utiliser les données de l'API si disponibles
    if (regionsApi && Array.isArray(regionsApi) && regionsApi.length > 0) {
      const allCommunes: Array<{
        commune: { id: string; name: string; ville_id: string };
        regionId: string;
        regionName: string;
        villeId: string;
        villeName: string;
      }> = [];
      regionsApi.forEach((region) => {
        if (region.villes && region.villes.length > 0) {
          region.villes.forEach((ville) => {
            if (
              ville.isActive !== false &&
              ville.communes &&
              ville.communes.length > 0
            ) {
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
    const allCommunes: Array<{
      commune: { name: string };
      regionName: string;
    }> = [];
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
    let filteredCommunes;
    if (siegeRegion && !siegeCommune) {
      filteredCommunes = allCommunes.filter((item) => {
        // Pour l'API : comparer par ID ou nom
        if ("regionId" in item) {
          return (
            item.regionId === siegeRegion || item.regionName === siegeRegion
          );
        }
        // Pour les données statiques : comparer par nom
        return item.regionName === siegeRegion;
      });
    } else {
      filteredCommunes = allCommunes;
    }

    // Filtrer les doublons par nom de commune pour éviter les erreurs de clés React
    const seenNames = new Set<string>();
    return filteredCommunes.filter((item) => {
      const communeName =
        "name" in item.commune ? item.commune.name : (item.commune as any).name;
      if (seenNames.has(communeName)) {
        return false;
      }
      seenNames.add(communeName);
      return true;
    });
  };

  // Trouver la région et la ville d'une commune donnée (depuis l'API ou données statiques)
  const findRegionAndVilleForCommune = (communeName: string) => {
    // Utiliser les données de l'API si disponibles
    if (regionsApi && Array.isArray(regionsApi) && regionsApi.length > 0) {
      for (const region of regionsApi) {
        if (region.villes && region.villes.length > 0) {
          for (const ville of region.villes) {
            if (
              ville.isActive !== false &&
              ville.communes &&
              ville.communes.length > 0
            ) {
              const commune = ville.communes.find(
                (c) =>
                  (c.name === communeName || c.id === communeName) &&
                  c.isActive !== false
              );
              if (commune) {
                return {
                  regionId: region.id,
                  regionName: region.name,
                  villeId: ville.id,
                  villeName: ville.name,
                };
              }
            }
          }
        }
      }
      return null;
    }

    // Fallback vers les données statiques (pas de ville dans ce cas)
    for (const regionName of Object.keys(regionsData)) {
      if (regionsData[regionName][communeName]) {
        return { regionId: regionName, regionName: regionName, villeId: null, villeName: null };
      }
    }
    return null;
  };

  // Trouver la région d'une commune donnée (depuis l'API ou données statiques)
  const findRegionForCommune = (communeName: string) => {
    // Utiliser les données de l'API si disponibles
    if (regionsApi && Array.isArray(regionsApi) && regionsApi.length > 0) {
      for (const region of regionsApi) {
        if (region.villes && region.villes.length > 0) {
          for (const ville of region.villes) {
            if (
              ville.isActive !== false &&
              ville.communes &&
              ville.communes.length > 0
            ) {
              const commune = ville.communes.find(
                (c) =>
                  (c.name === communeName || c.id === communeName) &&
                  c.isActive !== false
              );
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
      const regionData = regionsApi.find(
        (r) => (r.id === region || r.name === region) && r.isActive !== false
      );
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

  // Obtenir la ville parente d'une commune (depuis l'API ou données statiques)
  const getVillesForCommune = (region: string, commune: string): string[] => {
    // Utiliser les données de l'API si disponibles
    if (regionsApi && Array.isArray(regionsApi) && regionsApi.length > 0) {
      // Si la région est fournie, chercher uniquement dans cette région
      // Sinon, chercher dans toutes les régions
      const regionsToSearch = region
        ? regionsApi.filter(
            (r) => (r.id === region || r.name === region) && r.isActive !== false
          )
        : regionsApi.filter((r) => r.isActive !== false);

      for (const regionData of regionsToSearch) {
        if (regionData && regionData.villes) {
          for (const ville of regionData.villes) {
            if (ville.isActive !== false && ville.communes) {
              const communeData = ville.communes.find(
                (c) =>
                  (c.name === commune || c.id === commune) && c.isActive !== false
              );
              if (communeData) {
                // Retourner uniquement la ville parente (pas les quartiers)
                return [ville.name];
              }
            }
          }
        }
      }
      return [];
    }

    // Fallback vers les données statiques
    // Si la région n'est pas fournie, chercher dans toutes les régions
    if (!region) {
      for (const regionName of Object.keys(regionsData)) {
        if (regionsData[regionName][commune]) {
          return regionsData[regionName][commune];
        }
      }
    } else if (regionsData[region] && regionsData[region][commune]) {
      return regionsData[region][commune];
    }
    const defaults = getDefaultCommunes();
    if (defaults[commune]) {
      return defaults[commune];
    }
    return [];
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
      const planExists = membershipPlans.some(
        (plan) => plan.name === planParam
      );
      if (planExists && selectedBadge !== planParam) {
        setSelectedBadge(planParam);
        // Supprimer le paramètre plan de l'URL après un court délai pour éviter les conflits
        // Utiliser window.history pour éviter les re-renders
        setTimeout(() => {
          const params = new URLSearchParams(window.location.search);
          params.delete("plan");
          const newUrl = params.toString()
            ? `/membres?${params.toString()}`
            : "/membres";
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
      case "alphabetical-desc":
        return b.name.localeCompare(a.name, "fr", { sensitivity: "base" });
      case "recent":
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      case "sector":
        return a.sector.localeCompare(b.sector, "fr", { sensitivity: "base" });
      case "region":
        return a.region.localeCompare(b.region, "fr", { sensitivity: "base" });
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
    if (membersSignature !== shuffledSignatureRef.current) {
      setShuffledMembers(shuffleArray(membersFromApi));
      shuffledSignatureRef.current = membersSignature;
    }
  }, [membersFromApi, membersSignature]);

  // Mélanger les membres toutes les 3 minutes quand le tri est aléatoire
  useEffect(() => {
    if (sortOrder !== "random") return;

    // Mélanger toutes les 3 minutes si le tri est aléatoire
    const interval = setInterval(() => {
      setShuffledMembers(shuffleArray(membersFromApi));
    }, 3 * 60 * 1000); // 3 minutes

    return () => clearInterval(interval);
  }, [sortOrder, membersFromApi, membersSignature]);

  // Phase 9: Configuration de Fuse.js pour la recherche fuzzy (doit être avant filteredMembers)
  const fuseOptions = {
    keys: [
      { name: 'name', weight: 0.4 },
      { name: 'description', weight: 0.2 },
      { name: 'sector', weight: 0.15 },
      { name: 'region', weight: 0.15 },
      { name: 'fullAddress', weight: 0.1 },
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2,
    ignoreLocation: true,
  };

  const fuse = useMemo(() => new Fuse(membersFromApi, fuseOptions), [membersFromApi]);

  // Phase 9: Recherche fuzzy avec Fuse.js
  const filteredMembers = useMemo(() => {
    let results = membersFromApi;

    // Filtre sur le type de membre
    results = results.filter(
      (member) =>
        member.memberType === "associatif" || member.memberType === "entreprise"
    );

    // Phase 9: Recherche fuzzy si terme de recherche
    if (searchTerm.trim() !== "") {
      const fuseResults = fuse.search(searchTerm);
      const memberIds = new Set(fuseResults.map((result) => result.item.id));
      results = results.filter((member) => memberIds.has(member.id));
    }

    // Phase 3: Filtre filière
    if (selectedFiliereFilter !== "all") {
      results = results.filter(
        (member) => String(member.filiereId) === selectedFiliereFilter
      );
    }

    // Phase 3: Filtre activités
    if (selectedActivitiesFilter.length > 0) {
      results = results.filter(
        (member) =>
          member.activitesIds &&
          member.activitesIds.some((id) =>
            selectedActivitiesFilter.includes(String(id))
          )
      );
    }

    // Filtre secteur
    if (selectedSector !== "all") {
      results = results.filter((member) => member.sector === selectedSector);
    }

    // Filtre région
    if (selectedRegion !== "all") {
      results = results.filter((member) => member.region === selectedRegion);
    }

    return results;
  }, [
    membersFromApi,
    searchTerm,
    selectedFiliereFilter,
    selectedActivitiesFilter,
    selectedSector,
    selectedRegion,
    fuse,
  ]);

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
    searchTerm !== "" || 
    selectedSector !== "all" || 
    selectedRegion !== "all" ||
    selectedFiliereFilter !== "all" ||
    selectedActivitiesFilter.length > 0;

  // Fonction pour réinitialiser tous les filtres (optimisée avec useCallback)
  const resetFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedSector("all");
    setSelectedRegion("all");
    setSelectedFiliereFilter("all");
    setSelectedActivitiesFilter([]);
    setCurrentPage(1);
  }, []);

  // Réinitialiser la page quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedSector, selectedRegion, sortOrder, selectedFiliereFilter, selectedActivitiesFilter]);

  // Calculer la pagination
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const startIndex = (currentPage - 1) * membersPerPage;
  const endIndex = startIndex + membersPerPage;
  const paginatedMembers = filteredMembers.slice(startIndex, endIndex);

  // Membres récemment inscrits (les 5 plus récents) - uniquement "associatif" et "entreprise"
  const recentCutoff = Date.now() - 5 * 24 * 60 * 60 * 1000;
  const recentMembers = [...membersFromApi]
    .filter((member) => member.memberType === "associatif" || member.memberType === "entreprise")
    .filter((member) => {
      if (!member.createdAt) return false;
      const createdAtMs = new Date(member.createdAt).getTime();
      return createdAtMs >= recentCutoff;
    })
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  // Phase 5: Auto-rotation du carousel avec indicateur de progression
  useEffect(() => {
    if (recentMembers.length === 0 || isCarouselPaused) {
      setCarouselProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % recentMembers.length);
      setCarouselProgress(0);
    }, 5000);

    const progressInterval = setInterval(() => {
      setCarouselProgress((prev) => Math.min(prev + 1, 100));
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [recentMembers.length, isCarouselPaused, featuredIndex]);

  // Phase 5: Raccourcis clavier pour le carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (recentMembers.length === 0) return;
      
      if (e.key === 'ArrowLeft') {
        setFeaturedIndex((prev) => (prev - 1 + recentMembers.length) % recentMembers.length);
        setCarouselProgress(0);
      } else if (e.key === 'ArrowRight') {
        setFeaturedIndex((prev) => (prev + 1) % recentMembers.length);
        setCarouselProgress(0);
      } else if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        setIsCarouselPaused((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [recentMembers.length]);

  // Phase 5: Gestion du swipe sur mobile (optimisé avec useCallback)
  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setFeaturedIndex((prev) => (prev + 1) % recentMembers.length);
      setCarouselProgress(0);
    } else if (isRightSwipe) {
      setFeaturedIndex((prev) => (prev - 1 + recentMembers.length) % recentMembers.length);
      setCarouselProgress(0);
    }
  }, [touchStart, touchEnd, recentMembers.length]);

  // Scroll to top quand la page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Phase 9: Charger les préférences utilisateur depuis localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cpu-pme-preferences');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setViewMode(parsed.defaultView || 'grid');
          setSortOrder(parsed.defaultSort || 'random');
          setMembersPerPage(parsed.defaultPerPage || 9);
        } catch (e) {
          console.error('Erreur lors du chargement des préférences:', e);
        }
      }
      setIsLoadingPreferences(false);
    }
  }, []);

  // Phase 9: Sauvegarder les préférences utilisateur (sans setUserPreferences pour éviter la boucle)
  useEffect(() => {
    if (typeof window !== 'undefined' && isMounted && !isLoadingPreferences) {
      const prefs = {
        defaultView: viewMode,
        defaultSort: sortOrder,
        defaultPerPage: membersPerPage,
      };
      localStorage.setItem('cpu-pme-preferences', JSON.stringify(prefs));
    }
  }, [viewMode, sortOrder, membersPerPage, isMounted, isLoadingPreferences]);

  // Phase 9: Générer les suggestions de recherche
  useEffect(() => {
    if (searchTerm.length >= 2 && fuse) {
      const results = fuse.search(searchTerm, { limit: 5 });
      const suggestions = results.map(result => result.item.name);
      setSearchSuggestions([...new Set(suggestions)]);
      setHighlightedText(searchTerm);
    } else {
      setSearchSuggestions([]);
      setHighlightedText("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  // Charger les favoris depuis localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cpu-pme-favorites');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setFavorites(new Set(parsed));
        } catch (e) {
          console.error('Erreur lors du chargement des favoris:', e);
        }
      }
    }
  }, []);

  // Sauvegarder les favoris dans localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cpu-pme-favorites', JSON.stringify(Array.from(favorites)));
    }
  }, [favorites]);

  // Toggle favori (optimisé avec useCallback)
  const toggleFavorite = useCallback((memberId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(memberId)) {
        newFavorites.delete(memberId);
        toast({
          title: "Retiré des favoris",
          description: "Le membre a été retiré de vos favoris.",
        });
      } else {
        newFavorites.add(memberId);
        // Phase 9: Afficher confetti lors de l'ajout aux favoris
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        toast({
          title: "Ajouté aux favoris",
          description: "Le membre a été ajouté à vos favoris.",
        });
      }
      return newFavorites;
    });
  }, [toast]);

  const isUuid = (value?: string) =>
    Boolean(
      value &&
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          value
        )
    );

  const mapProfilToValue = (
    profilName: string,
    memberType: MemberType | ""
  ) => {
    const name = profilName.toLowerCase();

    if (memberType === "individuel") {
      if (name.includes("jeune") || name.includes("étudiant") || name.includes("etudiant")) {
        return "jeune_etudiant";
      }
      if (name.includes("entrepreneur") || name.includes("projet")) {
        return "entrepreneur_projet";
      }
      if (name.includes("professionnel") || name.includes("expert")) {
        return "professionnel_expert";
      }
      if (name.includes("salarié") || name.includes("salarie") || name.includes("cadre")) {
        return "salarie_cadre";
      }
    }

    if (memberType === "entreprise") {
      if (name.includes("micro")) {
        return "micro_entreprise";
      }
      if (name.includes("petite")) {
        return "petite_entreprise";
      }
      if (name.includes("moyenne")) {
        return "moyenne_entreprise";
      }
      if (name.includes("startup")) {
        return "startup";
      }
    }

    if (memberType === "associatif") {
      if (name.includes("coopérative") || name.includes("cooperative")) {
        return "cooperative";
      }
      if (
        name.includes("fédération") ||
        name.includes("federation") ||
        name.includes("filière") ||
        name.includes("filiere")
      ) {
        return "federation_filiere";
      }
      if (name.includes("association") && name.includes("professionnelle")) {
        return "association_professionnelle";
      }
      if (name.includes("groupement") || name.includes("gie")) {
        return "groupement_gie";
      }
    }

    if (memberType === "institutionnel") {
      if (name.includes("grande") && name.includes("entreprise")) {
        return "grande_entreprise";
      }
      if (name.includes("banque")) {
        return "banque";
      }
      if (name.includes("assureur")) {
        return "assureur";
      }
      if (name.includes("bailleur")) {
        return "bailleur";
      }
      if (name.includes("agence") && name.includes("publique")) {
        return "agence_publique";
      }
      if (name.includes("collectivité") || name.includes("collectivite")) {
        return "collectivite";
      }
      if (name.includes("programme") && name.includes("international")) {
        return "programme_international";
      }
    }

    return null;
  };

  const resolveProfilId = () => {
    if (!selectedSubProfile || !Array.isArray(profilsApi)) {
      return undefined;
    }

    const match = profilsApi.find((profil) => {
      if (profil.id === selectedSubProfile) {
        return true;
      }
      const mappedValue = mapProfilToValue(profil.name, selectedAdhesionType);
      return mappedValue === selectedSubProfile;
    });

    return isUuid(match?.id) ? match?.id : undefined;
  };

  const resolveAbonnementId = () => {
    if (!selectedBadge || !selectedTypeMembre?.id || !Array.isArray(abonnementsApi)) {
      return undefined;
    }

    const plan = abonnementsApi.find(
      (item) =>
        item.isActive &&
        item.typeMembreId === selectedTypeMembre.id &&
        item.libelle === selectedBadge
    );

    return isUuid(plan?.id) ? plan?.id : undefined;
  };

  const resolveRegionId = (regionValue: string) => {
    if (!regionValue || !Array.isArray(regionsApi)) {
      return undefined;
    }

    const directMatch = regionsApi.find((region) => region.id === regionValue);
    if (directMatch) {
      return isUuid(directMatch.id) ? directMatch.id : undefined;
    }

    const nameMatch = regionsApi.find((region) => region.name === regionValue);
    return isUuid(nameMatch?.id) ? nameMatch?.id : undefined;
  };

  const resolveCommuneId = (communeName: string) => {
    if (!communeName || !Array.isArray(regionsApi)) {
      return undefined;
    }

        for (const region of regionsApi) {
      if (!region.villes) continue;
            for (const ville of region.villes) {
        const commune = ville.communes?.find((c) => c.name === communeName);
        if (commune?.id && isUuid(commune.id)) {
          return commune.id;
              }
            }
          }

    return undefined;
  };

  const resolveRegionIds = (regionNames: string[]) => {
    if (!Array.isArray(regionsApi) || regionNames.length === 0) {
      return [];
    }

    const regionMap = new Map(regionsApi.map((region) => [region.name, region.id]));
    return regionNames
      .map((name) => regionMap.get(name))
      .filter((id): id is string => Boolean(id && isUuid(id)));
  };

  const resolveCentresInteretIds = () => {
    if (!Array.isArray(centresInteretApi) || selectedAxesInteret.length === 0) {
      return [];
    }

    const map = new Map(centresInteretApi.map((ci) => [ci.name, ci.id]));
    return selectedAxesInteret
      .map((name) => map.get(name))
      .filter((id): id is string => Boolean(id && isUuid(id)));
  };

  const resolveActiviteIds = () => {
    if (!Array.isArray(secteursApi) || selectedActivities.length === 0) {
      return [];
    }

    const ids = new Set<string>();
    const selectedLower = selectedActivities.map((activity) => activity.toLowerCase());

    secteursApi.forEach((secteur) => {
      secteur.filieres?.forEach((filiere) => {
        filiere.sousFiliere?.forEach((sousFiliere) => {
          sousFiliere.activites?.forEach((activite) => {
            if (
              selectedLower.includes(activite.name.toLowerCase()) &&
              isUuid(activite.id)
            ) {
              ids.add(activite.id);
            }
          });
        });
      });
    });

    return Array.from(ids);
  };

  const resolveFilieresPrioritairesIds = () => {
    if (!Array.isArray(secteursApi) || selectedFilieresPrioritaires.length === 0) {
      return [];
    }

    const ids = new Set<string>();
    const selectedLower = selectedFilieresPrioritaires.map((f) => f.toLowerCase());

    secteursApi.forEach((secteur) => {
      secteur.filieres?.forEach((filiere) => {
        if (selectedLower.includes(filiere.name.toLowerCase()) && isUuid(filiere.id)) {
          ids.add(filiere.id);
        }
      });
    });

    return Array.from(ids);
  };

  const resolveSousFiliereId = () => {
    if (!selectedSubCategory) {
      return undefined;
    }

    const subCategories = getSubCategoriesForFiliere();
    const match = subCategories.find((subCat: { id?: string; nom: string }) => {
      const value = subCat.id || subCat.nom;
      return value === selectedSubCategory;
    });

    return isUuid(match?.id) ? match?.id : undefined;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    if (!selectedTypeMembre?.id) {
      toast({
        title: "Type de membre requis",
        description:
          "Veuillez sélectionner un type de membre avant d'envoyer votre demande.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const communeId = resolveCommuneId(siegeCommune);

      const activitesIds = resolveActiviteIds();
      const centresInteretIds = resolveCentresInteretIds();
      const filieresPrioritairesIds = resolveFilieresPrioritairesIds();
      const regionsInterventionIds = resolveRegionIds(selectedRegions);
      
      // Pour les individuels : name = nom de la personne, pas de customOrganisationName
      // Pour les autres : name = nom du représentant, customOrganisationName = nom de l'organisation
      const adhesionName = formName; // Toujours le nom du représentant/personne
      const companyName =
        selectedAdhesionType === "individuel" ? undefined : orgName || undefined;

      const adhesionPayload = {
        name: adhesionName,
        position: formPosition || undefined,
        email: formEmail,
        phone: formPhone,
        message: formMessage || undefined,
        typeMembreId: selectedTypeMembre.id,
        profilId: resolveProfilId(),
        abonnementId: resolveAbonnementId(),
        secteurPrincipalId: isUuid(selectedMainSector)
          ? selectedMainSector
          : undefined,
        filiereId: isUuid(selectedFiliere) ? selectedFiliere : undefined,
        sousFiliereId: resolveSousFiliereId(),
        ...(activitesIds.length > 0 ? { activitesIds } : {}),
        ...(centresInteretIds.length > 0 ? { centresInteretIds } : {}),
        ...(filieresPrioritairesIds.length > 0
          ? { filieresPrioritairesIds }
          : {}),
        ...(regionsInterventionIds.length > 0
          ? { regionsInterventionIds }
          : {}),
        interventionScope: interventionScope || undefined,
        siegeRegionId: resolveRegionId(siegeRegion),
        siegeCommuneId: communeId,
        siegeVille: siegeVille || undefined,
        siegeVillage: siegeVillage || undefined,
        hasBureauCI:
          selectedAdhesionType === "institutionnel" ? hasBureauCI : undefined,
        hasAffiliation: hasAffiliation || undefined,
        organisationType: hasAffiliation ? selectedOrgType || undefined : undefined,
        organisationName: hasAffiliation
          ? selectedOrganisation || undefined
          : undefined,
        customOrganisationName: companyName, // Nom de l'entreprise/organisation
        isCompetitionSubcontractor:
          isCompetitionSubcontractor ?? undefined,
        hasFinancingProject: hasFinancingProject ?? undefined,
        nombre_employee: nombreEmploye ? nombreEmploye : undefined,
        website_url: formWebsite && formWebsite.trim().length > 0 
          ? formWebsite.trim()
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&quot;/g, '"')
              .replace(/&#x2F;/g, '/')
              .replace(/&#47;/g, '/')
          : undefined,
        internationalAddress: selectedAdhesionType === "institutionnel" && hasBureauInternational && internationalAddress ? internationalAddress : undefined,
        internationalCity: selectedAdhesionType === "institutionnel" && hasBureauInternational && internationalCity ? internationalCity : undefined,
        internationalCountry: selectedAdhesionType === "institutionnel" && hasBureauInternational && internationalCountry ? internationalCountry : undefined,
      };

      await adhesionsService.create(adhesionPayload);

      setHasSubmittedSuccess(true);
      setIsSuccessModalOpen(true);

      // Réinitialiser le formulaire
      setSelectedAdhesionType("");
      setSelectedSubProfile("");
      setIsCompetitionSubcontractor(null);
      setHasFinancingProject(null);
      setSelectedBadge("");
      setSelectedMainSector("");
      setSelectedFiliere("");
      setOrgName("");
      setFormName("");
      setFormPosition("");
      setFormEmail("");
      setFormPhone("");
      setFormMessage("");
      setFormWebsite("");
      setSiegeCommune("");
      setSiegeRegion("");
      setSiegeVille("");
      setSiegeVillage("");
      setNombreEmploye("");
      setInternationalAddress("");
      setInternationalCity("");
      setInternationalCountry("");
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      const apiErrorMessage =
        error && typeof error === "object" && "message" in error
          ? String((error as { message?: string }).message)
          : "";
      toast({
        title: "Erreur",
        description:
          apiErrorMessage ||
          "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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

  const getMemberProfileColor = (member: Member) => {
    const profile = (member.profileLabel || "").toLowerCase();

    if (
      profile.includes("étudiant") ||
      profile.includes("etudiant") ||
      profile.includes("jeune")
    ) {
      return "from-cpu-green to-emerald-600";
    }
    if (profile.includes("startup") || profile.includes("entrepreneur")) {
      return "from-cpu-orange to-orange-600";
    }
    if (profile.includes("micro") || profile.includes("petite")) {
      return "from-amber-500 to-amber-700";
    }
    if (profile.includes("moyenne")) {
      return "from-slate-600 to-slate-800";
    }
    if (profile.includes("banque") || profile.includes("assureur")) {
      return "from-indigo-500 to-indigo-700";
    }
    if (profile.includes("fédération") || profile.includes("federation")) {
      return "from-cpu-green to-emerald-700";
    }
    if (profile.includes("coopérative") || profile.includes("cooperative")) {
      return "from-cpu-orange to-orange-700";
    }
    if (profile.includes("association")) {
      return "from-teal-500 to-teal-700";
    }
    if (profile.includes("groupement") || profile.includes("gie")) {
      return "from-purple-500 to-purple-700";
    }

    switch (member.memberType) {
      case "individuel":
        return "from-cpu-green to-emerald-600";
      case "associatif":
        return "from-cpu-orange to-orange-700";
      case "institutionnel":
        return "from-slate-600 to-slate-800";
      case "entreprise":
      default:
        return "from-amber-500 to-amber-700";
    }
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

  const getMemberIcon = (member: Member) => {
    // Icon entreprise uniforme pour tous les membres
    return <Building2 className="h-10 w-10 text-cpu-green" />;
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
      decodeHtmlEntities(member.name),
      memberTypes.find((t) => t.value === member.memberType)?.label ||
        member.memberType,
      decodeHtmlEntities(member.sector),
      decodeHtmlEntities(member.region),
      member.badge || "N/A",
      decodeHtmlEntities(member.description.replace(/,/g, ";")), // Remplacer les virgules pour éviter les problèmes CSV
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
                  <td>${decodeHtmlEntities(member.name)}</td>
                  <td>${
                    memberTypes.find((t) => t.value === member.memberType)
                      ?.label || member.memberType
                  }</td>
                  <td>${decodeHtmlEntities(member.sector)}</td>
                  <td>${decodeHtmlEntities(member.region)}</td>
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

  // Phase 9: Gestionnaires pour le mode Focus (optimisés avec useCallback)
  const openFocusMode = useCallback((member: Member) => {
    setFocusedMember(member);
  }, []);

  const closeFocusMode = useCallback(() => {
    setFocusedMember(null);
  }, []);

  const navigateFocusMode = useCallback((direction: 'prev' | 'next') => {
    if (!focusedMember) return;
    
    const currentIndex = paginatedMembers.findIndex(m => m.id === focusedMember.id);
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    // Boucler si on atteint les limites
    if (newIndex < 0) newIndex = paginatedMembers.length - 1;
    if (newIndex >= paginatedMembers.length) newIndex = 0;
    
    setFocusedMember(paginatedMembers[newIndex]);
  }, [focusedMember, paginatedMembers]);

  // Phase 9: Navigation clavier pour le mode Focus
  useEffect(() => {
    if (!focusedMember) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateFocusMode('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateFocusMode('next');
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeFocusMode();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedMember, navigateFocusMode, closeFocusMode]);

  // Fonction pour filtrer les plans d'abonnement selon le type de membre et le sous-profil
  const getAvailablePlans = () => {
    if (!selectedAdhesionType) {
      return [];
    }

    // Utiliser uniquement les données de l'API et vérifier que c'est un tableau
    if (
      !abonnementsApi ||
      !Array.isArray(abonnementsApi) ||
      abonnementsApi.length === 0
    ) {
      return [];
    }

    // Trouver l'ID du type de membre sélectionné
    const selectedTypeMembreId = selectedTypeMembre?.id;

    if (!selectedTypeMembreId) {
      return [];
    }

    // Filtrer les abonnements par typeMembreId
    const filteredPlans = abonnementsApi.filter((plan) => {
      return plan.isActive && plan.typeMembreId === selectedTypeMembreId;
    });

    // Transformer les abonnements API en format compatible avec le Select
    return filteredPlans.map((plan) => ({
      id: plan.id,
      name: plan.libelle,
      description: plan.description,
      priceYearly: parseFloat(plan.tarifAnnuel),
      priceMonthly: parseFloat(plan.tarifMensuel),
      surDevis: plan.surDevis,
      period: plan.surDevis ? "Sur devis" : "FCFA",
      popular: plan.popular || false,
    }));
  };

  return (
    <div className="flex flex-col">
      {/* Phase 9: Confetti pour les célébrations */}
      {showConfetti && typeof window !== 'undefined' && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}
      
      {/* Phase 9: Mode Focus - Vue détaillée d'un membre */}
      <AnimatePresence>
        {focusedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeFocusMode}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
              style={glassmorphismStyle}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header avec boutons de navigation */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-200/50"
                   style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateFocusMode('prev')}
                  className="hover:bg-cpu-green/10"
                  title="Membre précédent (←)"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                
                <div className="text-sm text-slate-600 font-medium">
                  {paginatedMembers.findIndex(m => m.id === focusedMember.id) + 1} / {paginatedMembers.length}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigateFocusMode('next')}
                    className="hover:bg-cpu-green/10"
                    title="Membre suivant (→)"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeFocusMode}
                    className="hover:bg-red-50 hover:text-red-600"
                    title="Fermer (Esc)"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Contenu du membre */}
              <div className="p-8">
                {/* En-tête avec icône et nom */}
                <div className="flex items-start gap-6 mb-8">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl bg-cpu-green/10 flex items-center justify-center">
                      <div className="text-cpu-green scale-110">
                        {getMemberIcon(focusedMember)}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-slate-800 mb-3">
                      {decodeHtmlEntities(focusedMember.name)}
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      <Badge className="bg-cpu-green/10 text-cpu-green border-cpu-green/20">
                        {focusedMember.sector}
                      </Badge>
                      {focusedMember.region && (
                        <Badge variant="outline" className="border-slate-300">
                          <MapPin className="h-3 w-3 mr-1" />
                          {focusedMember.region}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(focusedMember.id);
                    }}
                    className="flex-shrink-0"
                  >
                    <Bookmark
                      className={`h-5 w-5 ${
                        favorites.has(focusedMember.id)
                          ? 'fill-cpu-orange text-cpu-orange'
                          : 'text-gray-400'
                      }`}
                    />
                  </Button>
                </div>

                {/* Informations de contact */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {focusedMember.email && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/50 border border-gray-200/50">
                      <Mail className="h-5 w-5 text-cpu-green flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-slate-500 mb-1">Email</div>
                        <a 
                          href={`mailto:${focusedMember.email}`}
                          className="text-sm text-slate-800 hover:text-cpu-green truncate block"
                        >
                          {focusedMember.email}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {focusedMember.phone && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/50 border border-gray-200/50">
                      <Phone className="h-5 w-5 text-cpu-green flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-slate-500 mb-1">Téléphone</div>
                        <a 
                          href={`tel:${focusedMember.phone}`}
                          className="text-sm text-slate-800 hover:text-cpu-green"
                        >
                          {focusedMember.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {focusedMember.website && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/50 border border-gray-200/50 md:col-span-2">
                      <Globe className="h-5 w-5 text-cpu-green flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-slate-500 mb-1">Site web</div>
                        <a 
                          href={focusedMember.website.startsWith('http') ? focusedMember.website : `https://${focusedMember.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-slate-800 hover:text-cpu-green truncate block"
                        >
                          {focusedMember.website}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {focusedMember.fullAddress && (
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/50 border border-gray-200/50 md:col-span-2">
                      <MapPin className="h-5 w-5 text-cpu-green flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-slate-500 mb-1">Adresse</div>
                        <div className="text-sm text-slate-800">
                          {focusedMember.fullAddress}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                {focusedMember.description && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <Users className="h-5 w-5 text-cpu-green" />
                      À propos
                    </h3>
                    <div className="prose prose-slate max-w-none">
                      <p className="text-slate-600 leading-relaxed">
                        {decodeHtmlEntities(focusedMember.description)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  {focusedMember.website && (
                    <a
                      href={focusedMember.website.startsWith('http') ? focusedMember.website : `https://${focusedMember.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-cpu-green hover:bg-cpu-green/90 text-white">
                        <Globe className="h-4 w-4 mr-2" />
                        Visiter le site web
                      </Button>
                    </a>
                  )}
                  {focusedMember.email && (
                    <a href={`mailto:${focusedMember.email}`}>
                      <Button variant="outline" className="border-cpu-green text-cpu-green hover:bg-cpu-green/10">
                        <Mail className="h-4 w-4 mr-2" />
                        Envoyer un email
                      </Button>
                    </a>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => {
                      const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/membres?id=${focusedMember.id}`;
                      navigator.clipboard.writeText(url);
                      toast({
                        title: "Lien copié !",
                        description: "Le lien du membre a été copié.",
                      });
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager
                  </Button>
                </div>

                {/* Hint pour la navigation clavier */}
                <div className="mt-8 pt-6 border-t border-gray-200/50">
                  <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
                    <span className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-white rounded border border-gray-300">←</kbd>
                      <kbd className="px-2 py-1 bg-white rounded border border-gray-300">→</kbd>
                      Naviguer
                    </span>
                    <span className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-white rounded border border-gray-300">Esc</kbd>
                      Fermer
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Dialog
        open={isSuccessModalOpen}
        onOpenChange={(open) => {
          setIsSuccessModalOpen(open);
          if (!open) {
            router.push("/");
          }
        }}
      >
        <DialogContent className="max-w-md bg-white text-black border-0 rounded-2xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-black">
              Merci pour votre demande d&apos;adhésion
            </DialogTitle>
            <DialogDescription className="text-black/80">
              Nous avons bien reçu votre demande. Notre équipe va la traiter
              dans les meilleurs délais et vous recontactera dès que possible.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end pt-4">
            <Button
              onClick={() => setIsSuccessModalOpen(false)}
              className="bg-cpu-orange text-white hover:bg-[#D97420]"
            >
              Retour à l&apos;accueil
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Hero Section */}
      <DynamicHeroBanner
        position="member"
        title={getPageTitle()}
        subtitle={getPageDescription()}
        minHeight="min-h-[80vh] h-[400px] md:h-[500px] lg:h-[550px]"
      >
        <div className="mb-4">
          <span className="text-lg md:text-xl font-medium text-white/80">
            Membres
          </span>
          {activeTab !== "annuaire" && (
            <>
              <span className="mx-2 text-white/60">/</span>
              <span className="text-sm md:text-xl font-semibold text-white">
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
      </DynamicHeroBanner>

      {/* Scripts JSON-LD pour SEO et Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Confédération des PME du Cameroun',
            alternateName: 'CPU',
            url: process.env.NEXT_PUBLIC_BASE_URL || 'https://cpu-cameroun.org',
            description: 'La Confédération des PME du Cameroun regroupe et représente les petites et moyennes entreprises camerounaises',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'CM',
              addressLocality: 'Yaoundé',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: process.env.NEXT_PUBLIC_BASE_URL || 'https://cpu-cameroun.org',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://cpu-cameroun.org'}/membres?search={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Accueil',
                item: process.env.NEXT_PUBLIC_BASE_URL || 'https://cpu-cameroun.org',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Membres',
                item: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://cpu-cameroun.org'}/membres`,
              },
            ],
          }),
        }}
      />

      {/* Titre et Navigation par Onglets */}
      <section className="bg-white py-8 sm:py-10" role="region" aria-label="En-tête de la page membres">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <h1 className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 text-center mb-10">
            {getPageTitle()}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white border-b border-gray-200 pt-8 pb-16" role="main" aria-label="Contenu principal">
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
            <div className="flex justify-center mb-8 w-full px-4 sm:px-0" role="navigation" aria-label="Navigation par onglets">
              <TabsList className="!grid grid-cols-2 sm:!inline-flex sm:items-center sm:justify-center gap-2 sm:gap-4 md:gap-6 px-3 sm:px-6 md:px-8 py-3 sm:py-3 md:py-4 bg-gray-50/50 rounded-xl border border-gray-100 shadow-sm h-auto w-full sm:w-auto max-w-md sm:max-w-none !flex-none">
                <TabsTrigger
                  value="annuaire"
                  aria-label="Onglet Annuaire des membres"
                  className="flex items-center justify-center gap-2 px-3 sm:px-6 md:px-8 py-2.5 sm:py-2.5 md:py-3 rounded-lg font-inter text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 ease-in-out data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-md data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 hover:bg-white/50 hover:text-gray-700 whitespace-nowrap"
                >
                  <Users className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" aria-hidden="true" />
                  <span>Annuaire</span>
                </TabsTrigger>
                <TabsTrigger
                  value="pass-pme"
                  aria-label="Onglet Pass PME"
                  className="flex items-center justify-center gap-2 px-3 sm:px-6 md:px-8 py-2.5 sm:py-2.5 md:py-3 rounded-lg font-inter text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 ease-in-out data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-md data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 hover:bg-white/50 hover:text-gray-700 whitespace-nowrap"
                >
                  <CreditCard className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" aria-hidden="true" />
                  <span>Pass PME</span>
                </TabsTrigger>
                <TabsTrigger
                  value="avantages"
                  aria-label="Onglet Avantages membres"
                  className="flex items-center justify-center gap-2 px-3 sm:px-6 md:px-8 py-2.5 sm:py-2.5 md:py-3 rounded-lg font-inter text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 ease-in-out data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-md data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 hover:bg-white/50 hover:text-gray-700 whitespace-nowrap"
                >
                  <Award className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" aria-hidden="true" />
                  <span>Avantages</span>
                </TabsTrigger>
                <TabsTrigger
                  value="adhesion"
                  aria-label="Onglet Formulaire d'adhésion"
                  className="flex items-center justify-center gap-2 px-3 sm:px-6 md:px-8 py-2.5 sm:py-2.5 md:py-3 rounded-lg font-inter text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 ease-in-out data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-md data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 hover:bg-white/50 hover:text-gray-700 whitespace-nowrap"
                >
                  <Building2 className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" aria-hidden="true" />
                  <span>Adhérer</span>
                </TabsTrigger>
              </TabsList>
            </div>
            {/* Annuaire Tab */}
            <TabsContent value="annuaire" className="mt-8" role="tabpanel" aria-label="Contenu de l'annuaire">
              {/* Recent Members Section */}
              <div className="mb-20 animate-fade-in-up" role="region" aria-label="Section membres récents">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-10 bg-cpu-orange rounded-full" aria-hidden="true"></div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                      Membres Récents
                    </h2>
                  </div>
                  {/* Phase 5: Compteur et contrôles */}
                  <div className="flex items-center gap-3" role="group" aria-label="Contrôles du carousel">
                    <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full" role="status" aria-live="polite">
                      <Users className="h-4 w-4 text-cpu-orange" aria-hidden="true" />
                      <span className="text-sm font-bold text-gray-700" aria-label={`Membre ${featuredIndex + 1} sur ${recentMembers.length}`}>
                        {featuredIndex + 1} / {recentMembers.length}
                      </span>
                    </div>
                    <Button
                      onClick={() => setIsCarouselPaused(!isCarouselPaused)}
                      variant="outline"
                      size="icon"
                      className="border-2 border-cpu-orange text-cpu-orange hover:bg-cpu-orange hover:text-white transition-all"
                      aria-label={isCarouselPaused ? 'Reprendre le défilement automatique' : 'Mettre en pause le défilement automatique'}
                      aria-pressed={!isCarouselPaused}
                      title={isCarouselPaused ? 'Lecture' : 'Pause'}
                    >
                      {isCarouselPaused ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                        </svg>
                      )}
                    </Button>
                  </div>
                </div>
                {recentMembers.length > 0 ? (
                  <div 
                    className="relative"
                    role="region"
                    aria-label="Carousel de membres récents"
                    aria-roledescription="carousel"
                    onMouseEnter={() => setIsCarouselPaused(true)}
                    onMouseLeave={() => setIsCarouselPaused(false)}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  >
                    {/* Phase 5: Barre de progression */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-t-xl overflow-hidden z-20" role="progressbar" aria-label="Progression du carousel" aria-valuenow={carouselProgress} aria-valuemin={0} aria-valuemax={100}>
                      <div 
                        className="h-full bg-cpu-orange transition-all duration-100 ease-linear"
                        style={{ width: `${carouselProgress}%` }}
                      />
                    </div>

                    <div className="border-2 border-gray-200 rounded-xl transition-all duration-500 bg-white flex flex-col md:flex-row hover:shadow-2xl hover:border-cpu-orange cursor-pointer relative overflow-hidden group">
                      {/* Barre latérale orange */}
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-cpu-orange group-hover:w-2 transition-all duration-300"></div>

                      {/* Image avec icône */}
                      <div className="member-image bg-gradient-to-br from-cpu-orange/5 to-cpu-orange/10 w-full md:w-40 lg:w-44 h-32 sm:h-40 md:h-auto flex-shrink-0 flex items-center justify-center overflow-hidden relative group/image">
                        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500">
                          <div className="w-[75%] sm:w-[85%] h-[75%] sm:h-[85%] rounded-2xl bg-cpu-orange/10 flex items-center justify-center group-hover/image:bg-cpu-orange transition-all duration-500 group-hover/image:scale-110 group-hover/image:rotate-12 shadow-md group-hover/image:shadow-xl">
                            <div className="scale-75 sm:scale-90 text-cpu-orange group-hover/image:text-white transition-colors duration-500">
                              {getMemberIcon(recentMembers[featuredIndex])}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contenu principal */}
                      <div className="flex-1 p-3 sm:p-4 md:p-5 flex flex-col min-w-0">
                        {/* Header avec nom et badge */}
                        <div className="mb-2 sm:mb-3">
                          <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2">
                            <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                              {decodeHtmlEntities(recentMembers[featuredIndex].name)}
                            </h3>
                            <Badge className="bg-green-600 text-white text-xs whitespace-nowrap px-2 sm:px-2.5 py-1 shadow-md">
                              Nouveau
                            </Badge>
                          </div>

                          {/* Localisation */}
                          <div className="flex items-start text-sm text-slate-600 mb-2 font-medium">
                            <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-cpu-orange mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                            <span className="break-words">{decodeHtmlEntities(recentMembers[featuredIndex].fullAddress || recentMembers[featuredIndex].region)}</span>
                          </div>

                          {/* Filière et Sous-filière */}
                          <div className="grid grid-cols-2 gap-2 mb-2 sm:mb-3">
                            <div className="rounded-lg p-2 sm:p-2.5 bg-gradient-to-br from-cpu-orange/5 to-cpu-orange/10 border-2 border-transparent group-hover:border-cpu-orange/30 transition-all duration-300">
                              <div className="text-xs font-medium text-slate-500 mb-1">Filière</div>
                              {(() => {
                                let filiereName = '';
                                if (recentMembers[featuredIndex].filiereId && secteursApi && Array.isArray(secteursApi)) {
                                  for (const secteur of secteursApi) {
                                    if (secteur.filieres && Array.isArray(secteur.filieres)) {
                                      const filiere = secteur.filieres.find((f: any) => f.id === recentMembers[featuredIndex].filiereId);
                                      if (filiere) {
                                        filiereName = filiere.name;
                                        break;
                                      }
                                    }
                                  }
                                }
                                return (
                                  <div className="text-sm text-slate-600 line-clamp-1 group-hover:text-primary transition-colors">
                                    {decodeHtmlEntities(filiereName || recentMembers[featuredIndex].sector)}
                                  </div>
                                );
                              })()}
                            </div>

                            <div className="rounded-lg p-2 sm:p-2.5 bg-gradient-to-br from-cpu-orange/5 to-cpu-orange/10 border-2 border-transparent group-hover:border-cpu-orange/30 transition-all duration-300">
                              <div className="text-xs font-medium text-slate-500 mb-1">Sous Filière</div>
                              {(() => {
                                let sousFiliereName = '';
                                if (recentMembers[featuredIndex].sousFiliereId && secteursApi && Array.isArray(secteursApi)) {
                                  for (const secteur of secteursApi) {
                                    if (secteur.filieres && Array.isArray(secteur.filieres)) {
                                      for (const filiere of secteur.filieres) {
                                        if (filiere.sousFiliere && Array.isArray(filiere.sousFiliere)) {
                                          const sf = filiere.sousFiliere.find((sf: any) => sf.id === recentMembers[featuredIndex].sousFiliereId);
                                          if (sf) {
                                            sousFiliereName = sf.name;
                                            break;
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                                return (
                                  <div className="text-sm text-slate-600 line-clamp-1 group-hover:text-primary transition-colors">
                                    {decodeHtmlEntities(sousFiliereName || '-')}
                                  </div>
                                );
                              })()}
                            </div>
                          </div>

                          {/* Activités */}
                          <div className="mb-2">
                            <div className="flex items-center gap-2 mb-2">
                              <Briefcase className="h-4 w-4 text-cpu-orange group-hover:scale-110 transition-transform duration-300" />
                              <span className="text-xs font-medium text-slate-500">Activités</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {(() => {
                                let activitesNames: string[] = [];
                                if (recentMembers[featuredIndex].activitesIds && recentMembers[featuredIndex].activitesIds.length > 0 && secteursApi && Array.isArray(secteursApi)) {
                                  for (const secteur of secteursApi) {
                                    if (secteur.filieres && Array.isArray(secteur.filieres)) {
                                      for (const filiere of secteur.filieres) {
                                        if (filiere.sousFiliere && Array.isArray(filiere.sousFiliere)) {
                                          for (const sf of filiere.sousFiliere) {
                                            if (sf.activites && Array.isArray(sf.activites)) {
                                              for (const act of sf.activites) {
                                                if (recentMembers[featuredIndex].activitesIds.includes(act.id)) {
                                                  activitesNames.push(act.name);
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                                
                                const visibleActivites = activitesNames.slice(0, 4);
                                const remainingCount = activitesNames.length - visibleActivites.length;
                                
                                return activitesNames.length > 0 ? (
                                  <>
                                    {visibleActivites.map((activite, idx) => (
                                      <Badge 
                                        key={idx} 
                                        className="text-xs bg-white/95 text-slate-900 font-medium px-2.5 py-1 rounded-md hover:bg-slate-100 border border-slate-200 transition-all duration-300"
                                      >
                                        {decodeHtmlEntities(activite)}
                                      </Badge>
                                    ))}
                                    {remainingCount > 0 && (
                                      <Badge className="text-xs bg-white/95 text-slate-900 font-medium px-2.5 py-1 rounded-md hover:bg-slate-100 border border-slate-200 transition-all duration-300">
                                        +{remainingCount}
                                      </Badge>
                                    )}
                                  </>
                                ) : (
                                  <span className="text-xs text-gray-400">Aucune activité</span>
                                );
                              })()}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="mb-2">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="h-4 w-4 text-slate-500 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-xs font-medium text-slate-500">À propos</span>
                          </div>
                          <p className={`text-sm text-slate-600 leading-relaxed ${expandedMembers.has(recentMembers[featuredIndex].id) ? '' : 'line-clamp-2'}`}>
                            {decodeHtmlEntities(recentMembers[featuredIndex].description)}
                          </p>
                        </div>

                        {/* Boutons d'action */}
                        <div className="mt-auto pt-3 border-t border-gray-100">
                          {!expandedMembers.has(recentMembers[featuredIndex].id) ? (
                            <Button
                              onClick={() => {
                                const newExpanded = new Set(expandedMembers);
                                newExpanded.add(recentMembers[featuredIndex].id);
                                setExpandedMembers(newExpanded);
                              }}
                              className="w-full bg-cpu-orange hover:bg-white hover:text-cpu-orange text-white hover:border-cpu-orange border-2 border-cpu-orange font-semibold transition-all hover:shadow-lg"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              En savoir plus
                            </Button>
                          ) : (
                            <div className="space-y-3">
                              {/* Grille des boutons d'action principaux */}
                              <div className={`grid gap-3 ${recentMembers[featuredIndex].website ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2'}`}>
                                {/* Bouton Visiter le site web */}
                                {recentMembers[featuredIndex].website && (
                                  <a
                                    href={recentMembers[featuredIndex].website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full"
                                  >
                                    <Button
                                      variant="outline"
                                      className="w-full border-2 border-cpu-orange text-cpu-orange hover:bg-cpu-orange hover:text-white font-semibold transition-all hover:shadow-lg"
                                    >
                                      <Globe className="h-4 w-4 mr-2" />
                                      <span className="hidden sm:inline">Visiter</span>
                                      <span className="sm:hidden">Site</span>
                                    </Button>
                                  </a>
                                )}
                                
                                {/* Bouton Contacter */}
                                {recentMembers[featuredIndex].email ? (
                                  <a
                                    href={`mailto:${recentMembers[featuredIndex].email}`}
                                    className="w-full"
                                  >
                                    <Button
                                      variant="outline"
                                      className="w-full border-2 border-cpu-orange text-cpu-orange hover:bg-cpu-orange hover:text-white font-semibold transition-all hover:shadow-lg"
                                    >
                                      <Mail className="h-4 w-4 mr-2" />
                                      Contacter
                                    </Button>
                                  </a>
                                ) : (
                                  <Button
                                    variant="outline"
                                    disabled
                                    className="w-full border-gray-300 text-gray-400 font-semibold cursor-not-allowed"
                                  >
                                    <Mail className="h-4 w-4 mr-2" />
                                    Contacter
                                  </Button>
                                )}
                                
                                {/* Bouton Appeler */}
                                {recentMembers[featuredIndex].phone ? (
                                  <a
                                    href={`tel:${recentMembers[featuredIndex].phone}`}
                                    className="w-full"
                                  >
                                    <Button
                                      variant="outline"
                                      className="w-full border-2 border-cpu-orange text-cpu-orange hover:bg-cpu-orange hover:text-white font-semibold transition-all hover:shadow-lg"
                                    >
                                      <span className="mr-2">📞</span>
                                      Appeler
                                    </Button>
                                  </a>
                                ) : (
                                  <Button
                                    variant="outline"
                                    disabled
                                    className="w-full border-gray-300 text-gray-400 font-semibold cursor-not-allowed"
                                  >
                                    <span className="mr-2">📞</span>
                                    Appeler
                                  </Button>
                                )}
                              </div>
                              
                              {/* Bouton Voir moins */}
                              <Button
                                onClick={() => {
                                  const newExpanded = new Set(expandedMembers);
                                  newExpanded.delete(recentMembers[featuredIndex].id);
                                  setExpandedMembers(newExpanded);
                                }}
                                variant="outline"
                                className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold transition-all"
                              >
                                <EyeOff className="h-4 w-4 mr-2" />
                                Voir moins
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Navigation Arrows - Phase 5: Améliorés */}
                    <button
                      onClick={() => {
                        setFeaturedIndex(
                          (prev) =>
                            (prev - 1 + recentMembers.length) %
                            recentMembers.length
                        );
                        setCarouselProgress(0);
                      }}
                      className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-cpu-orange text-white p-2 sm:p-3 rounded-full hover:bg-orange-700 hover:scale-110 transition-all shadow-lg hover:shadow-xl z-10 cursor-pointer"
                      aria-label="Membre précédent"
                    >
                      <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button
                      onClick={() => {
                        setFeaturedIndex(
                          (prev) => (prev + 1) % recentMembers.length
                        );
                        setCarouselProgress(0);
                      }}
                      className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-cpu-orange text-white p-2 sm:p-3 rounded-full hover:bg-orange-700 hover:scale-110 transition-all shadow-lg hover:shadow-xl z-10 cursor-pointer"
                      aria-label="Membre suivant"
                    >
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>

                    {/* Dots Indicator - Phase 5: Amélioré avec numéro mobile */}
                    <div className="flex flex-col items-center gap-3 mt-6">
                      {/* Compteur mobile */}
                      <div className="sm:hidden flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                        <span className="text-xs font-bold text-gray-700">
                          {featuredIndex + 1} / {recentMembers.length}
                        </span>
                      </div>
                      {/* Dots */}
                      <div className="flex justify-center gap-2">
                        {recentMembers.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setFeaturedIndex(idx);
                              setCarouselProgress(0);
                            }}
                            className={`h-2 rounded-full transition-all cursor-pointer hover:opacity-80 ${
                              idx === featuredIndex
                                ? "bg-cpu-orange w-8 shadow-md"
                                : "bg-gray-300 w-2 hover:bg-gray-400"
                            }`}
                            aria-label={`Aller au membre ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Aucune entreprise récemment inscrite pour le moment.
                  </p>
                )}
              </div>

              {/* Search and Filters Bar */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 animate-fade-in-up animate-delay-200">
                {/* Desktop Filters */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                  <div className="lg:col-span-2 relative">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Rechercher nom, secteur, activité..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-gray-300"
                      />
                    </div>
                    
                    {/* Phase 9: Suggestions de recherche avec glassmorphisme */}
                    <AnimatePresence>
                      {searchSuggestions.length > 0 && searchTerm.length >= 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-50 w-full mt-2 rounded-lg shadow-lg overflow-hidden"
                          style={glassmorphismStyle}
                        >
                          <div className="p-2">
                            <div className="text-xs text-slate-500 px-3 py-2 font-medium">
                              Suggestions
                            </div>
                            {searchSuggestions.map((suggestion, idx) => (
                              <motion.button
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => setSearchTerm(suggestion)}
                                className="w-full text-left px-3 py-2 rounded-md hover:bg-cpu-green/10 text-sm text-slate-700 transition-colors flex items-center gap-2"
                              >
                                <Search className="h-3 w-3 text-cpu-green" />
                                {suggestion}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <Select
                    value={selectedFiliereFilter}
                    onValueChange={setSelectedFiliereFilter}
                  >
                    <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                      <SelectValue placeholder="Filière" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes filières</SelectItem>
                      {directoryFilieres.map((filiere) => (
                        <SelectItem key={filiere.id} value={filiere.id}>
                          {decodeHtmlEntities(filiere.name)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedSector}
                    onValueChange={setSelectedSector}
                  >
                    <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                      <SelectValue placeholder="Secteur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous secteurs</SelectItem>
                      {directorySectors.map((sector) => (
                        <SelectItem key={sector} value={sector}>
                          {decodeHtmlEntities(sector)}
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
                      <SelectItem value="all">Toutes régions</SelectItem>
                      {directoryRegions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {decodeHtmlEntities(region)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedActivitiesFilter.length > 0 ? selectedActivitiesFilter[0] : "all"}
                    onValueChange={(value) => setSelectedActivitiesFilter(value === "all" ? [] : [value])}
                  >
                    <SelectTrigger className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                      <SelectValue placeholder="Activité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes activités</SelectItem>
                      {directoryActivites.map((activite) => (
                        <SelectItem key={activite.id} value={activite.id}>
                          {decodeHtmlEntities(activite.name)}
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
                                selectedFiliereFilter,
                              ].filter((f) => f !== "" && f !== "all").length + selectedActivitiesFilter.length
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
                          <Label>Filière</Label>
                          <Select
                            value={selectedFiliereFilter}
                            onValueChange={setSelectedFiliereFilter}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Toutes filières" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Toutes filières</SelectItem>
                              {directoryFilieres.map((filiere) => (
                                <SelectItem key={filiere.id} value={filiere.id}>
                                  {decodeHtmlEntities(filiere.name)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
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
                              {directorySectors.map((sector) => (
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
                              {directoryRegions.map((region) => (
                                <SelectItem key={region} value={region}>
                                  {region}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Activité</Label>
                          <Select
                            value={selectedActivitiesFilter.length > 0 ? selectedActivitiesFilter[0] : "all"}
                            onValueChange={(value) => setSelectedActivitiesFilter(value === "all" ? [] : [value])}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Toutes activités" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Toutes activités</SelectItem>
                              {directoryActivites.map((activite) => (
                                <SelectItem key={activite.id} value={activite.id}>
                                  {decodeHtmlEntities(activite.name)}
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

              {/* Chips de filtres actifs - Phase 3 */}
              {hasActiveFilters && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 animate-fade-in-up">
                  <div className="flex items-center gap-2 mb-3">
                    <Filter className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Filtres actifs</span>
                    <Badge variant="outline" className="ml-1">
                      {[
                        searchTerm !== "",
                        selectedSector !== "all",
                        selectedRegion !== "all",
                        selectedFiliereFilter !== "all",
                        selectedActivitiesFilter.length > 0,
                      ].filter(Boolean).length}
                    </Badge>
                  </div>
                  {/* Chips scrollables horizontalement */}
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {searchTerm !== "" && (
                      <Badge
                        variant="outline"
                        className="bg-white border-cpu-orange text-cpu-orange hover:bg-cpu-orange hover:text-white cursor-pointer flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 transition-colors"
                        onClick={() => setSearchTerm("")}
                      >
                        <Search className="h-3 w-3" />
                        {searchTerm}
                        <X className="h-3 w-3" />
                      </Badge>
                    )}
                    {selectedFiliereFilter !== "all" && (
                      <Badge
                        variant="outline"
                        className="bg-white border-cpu-orange text-cpu-orange hover:bg-cpu-orange hover:text-white cursor-pointer flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 transition-colors"
                        onClick={() => setSelectedFiliereFilter("all")}
                      >
                        <Briefcase className="h-3 w-3" />
                        {directoryFilieres.find(f => f.id === selectedFiliereFilter)?.name || "Filière"}
                        <X className="h-3 w-3" />
                      </Badge>
                    )}
                    {selectedSector !== "all" && (
                      <Badge
                        variant="outline"
                        className="bg-white border-cpu-orange text-cpu-orange hover:bg-cpu-orange hover:text-white cursor-pointer flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 transition-colors"
                        onClick={() => setSelectedSector("all")}
                      >
                        <Briefcase className="h-3 w-3" />
                        {selectedSector}
                        <X className="h-3 w-3" />
                      </Badge>
                    )}
                    {selectedRegion !== "all" && (
                      <Badge
                        variant="outline"
                        className="bg-white border-cpu-orange text-cpu-orange hover:bg-cpu-orange hover:text-white cursor-pointer flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 transition-colors"
                        onClick={() => setSelectedRegion("all")}
                      >
                        <MapPin className="h-3 w-3" />
                        {selectedRegion}
                        <X className="h-3 w-3" />
                      </Badge>
                    )}
                    {selectedActivitiesFilter.length > 0 && (
                      <Badge
                        variant="outline"
                        className="bg-white border-cpu-orange text-cpu-orange hover:bg-cpu-orange hover:text-white cursor-pointer flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 transition-colors"
                        onClick={() => setSelectedActivitiesFilter([])}
                      >
                        <Target className="h-3 w-3" />
                        {directoryActivites.find(a => a.id === selectedActivitiesFilter[0])?.name || "Activité"}
                        <X className="h-3 w-3" />
                      </Badge>
                    )}
                    {/* Bouton réinitialiser tout */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetFilters}
                      className="text-cpu-orange border-cpu-orange hover:bg-cpu-orange hover:text-white whitespace-nowrap transition-colors"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Tout réinitialiser
                    </Button>
                  </div>
                </div>
              )}

              {/* All Members Grid */}
              <div className="animate-fade-in-up animate-delay-300">
                {/* Header avec titre, compteur et contrôles */}
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <h2 className="text-3xl font-bold text-slate-800">
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
                            <span className="text-lg font-bold text-slate-800">
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
                      {/* Select résultats par page */}
                      <Select 
                        value={membersPerPage >= 9999 ? 'all' : String(membersPerPage)} 
                        onValueChange={(v) => {
                          setMembersPerPage(v === 'all' ? 9999 : Number(v));
                          setCurrentPage(1);
                        }}
                      >
                        <SelectTrigger className="w-[140px] border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                          <SelectValue placeholder="Par page" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9">9 par page</SelectItem>
                          <SelectItem value="18">18 par page</SelectItem>
                          <SelectItem value="36">36 par page</SelectItem>
                          <SelectItem value="all">Tout afficher</SelectItem>
                        </SelectContent>
                      </Select>
                      {/* Select de tri */}
                      <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger className="w-[180px] border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-cpu-orange">
                          <SelectValue placeholder="Trier par" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="random">Aléatoire</SelectItem>
                          <SelectItem value="alphabetical">Alphabétique (A-Z)</SelectItem>
                          <SelectItem value="alphabetical-desc">Alphabétique (Z-A)</SelectItem>
                          <SelectItem value="recent">Plus récents</SelectItem>
                          <SelectItem value="sector">Par secteur</SelectItem>
                          <SelectItem value="region">Par région</SelectItem>
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-300 hover:bg-gray-50"
                              title="Exporter les résultats"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem onClick={exportToCSV} className="cursor-pointer">
                              <Download className="h-4 w-4 mr-2" />
                              Exporter CSV
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={exportToPDF} className="cursor-pointer">
                              <Download className="h-4 w-4 mr-2" />
                              Exporter PDF
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
                            className="bg-white border-gray-300 text-slate-800 hover:bg-gray-50 cursor-pointer flex items-center gap-1.5"
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
                            className="bg-white border-gray-300 text-slate-800 hover:bg-gray-50 cursor-pointer flex items-center gap-1.5"
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
                            className="bg-white border-gray-300 text-slate-800 hover:bg-gray-50 cursor-pointer flex items-center gap-1.5"
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
                            className="bg-white border-gray-300 text-slate-800 hover:bg-gray-50 cursor-pointer flex items-center gap-1.5"
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
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {isLoadingMembers ? (
                      Array.from({ length: membersPerPage }).map(
                        (_, index) => (
                          <MemberCardSkeleton key={`skeleton-${index}`} />
                        )
                      )
                    ) : (
                      <AnimatePresence mode="wait">
                        {paginatedMembers.map((member, index) => (
                          <motion.div
                            key={member.id}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileHover="hover"
                            layout
                            className={`member-card group border border-gray-200 rounded-2xl transition-all duration-500 bg-white grid grid-rows-[auto_auto_auto_auto_auto_auto] hover:shadow-2xl hover:shadow-cpu-green/10 hover:border-cpu-green cursor-pointer relative overflow-hidden`}
                            onClick={() => openFocusMode(member)}
                          >
                            {/* Header avec icône, nom et localisation - ROW 1 */}
                            <div className="p-4 sm:p-6 pb-3 sm:pb-4 flex flex-col">
                              <div className="flex items-start gap-3 sm:gap-4 mb-3">
                                {/* Icône sectorielle avec animation */}
                                <div className="flex-shrink-0">
                                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-cpu-green/10 flex items-center justify-center group-hover:bg-cpu-green transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-sm group-hover:shadow-lg group-hover:shadow-cpu-green/20">
                                    <div className="scale-75 text-cpu-green group-hover:text-white transition-colors duration-500">
                                      {getMemberIcon(member)}
                                    </div>
                                  </div>
                                </div>

                                {/* Nom et localisation */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className="text-xl font-bold text-slate-800 line-clamp-3 group-hover:text-primary transition-colors duration-300 flex-1 leading-tight">
                                      {decodeHtmlEntities(member.name)}
                                    </h3>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="flex-shrink-0 h-8 w-8"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(member.id);
                                      }}
                                      title={favorites.has(member.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                                    >
                                      <Bookmark
                                        className={`h-4 w-4 transition-colors ${
                                          favorites.has(member.id)
                                            ? 'fill-cpu-orange text-cpu-orange'
                                            : 'text-gray-400 hover:text-cpu-orange'
                                        }`}
                                      />
                                    </Button>
                                  </div>
                                  <div className="flex items-start text-sm text-slate-600 mb-1 font-medium">
                                    <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0 text-cpu-orange mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                                    <span className="break-words">{decodeHtmlEntities(member.fullAddress || member.region)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* ROW 2 */}
                            <div className="px-4 sm:px-6 pb-3 sm:pb-4 min-h-[100px] sm:min-h-[110px]">
                              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                {/* Filière */}
                                <div className="border-2 border-gray-200 rounded-lg p-2 sm:p-3 bg-gradient-to-br from-gray-50/50 to-gray-100/30 group-hover:border-cpu-green group-hover:shadow-md group-hover:bg-cpu-green/5 transition-all duration-300">
                                  <div className="text-xs font-medium text-slate-500 mb-1">Filière</div>
                                  {(() => {
                                    let filiereName = '';
                                    if (member.filiereId && secteursApi && Array.isArray(secteursApi)) {
                                      for (const secteur of secteursApi) {
                                        if (secteur.filieres && Array.isArray(secteur.filieres)) {
                                          const filiere = secteur.filieres.find((f: any) => f.id === member.filiereId);
                                          if (filiere) {
                                            filiereName = filiere.name;
                                            break;
                                          }
                                        }
                                      }
                                    }
                                    return (
                                      <div className="text-sm text-slate-600 line-clamp-2 min-h-[36px] sm:min-h-[40px] group-hover:text-primary transition-colors">
                                        {decodeHtmlEntities(filiereName || member.sector)}
                                      </div>
                                    );
                                  })()}
                                </div>

                                {/* Sous-filière */}
                                <div className="border-2 border-gray-200 rounded-lg p-2 sm:p-3 bg-gradient-to-br from-gray-50/50 to-gray-100/30 group-hover:border-cpu-green group-hover:shadow-md group-hover:bg-cpu-green/5 transition-all duration-300">
                                  <div className="text-xs font-medium text-slate-500 mb-1">Sous Filière</div>
                                  {(() => {
                                    let sousFiliereName = '';
                                    if (member.sousFiliereId && secteursApi && Array.isArray(secteursApi)) {
                                      for (const secteur of secteursApi) {
                                        if (secteur.filieres && Array.isArray(secteur.filieres)) {
                                          for (const filiere of secteur.filieres) {
                                            if (filiere.sousFiliere && Array.isArray(filiere.sousFiliere)) {
                                              const sf = filiere.sousFiliere.find((sf: any) => sf.id === member.sousFiliereId);
                                              if (sf) {
                                                sousFiliereName = sf.name;
                                                break;
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                    return (
                                      <div className="text-sm text-slate-600 line-clamp-2 min-h-[36px] sm:min-h-[40px] group-hover:text-primary transition-colors">
                                        {decodeHtmlEntities(sousFiliereName) || '-'}
                                      </div>
                                    );
                                  })()}
                                </div>
                              </div>
                            </div>

                            {/* Section Activités - ROW 3 */}
                            <div className="px-4 sm:px-6 pb-3 sm:pb-4 min-h-[90px] sm:min-h-[100px]">
                              <div className="flex items-center gap-2 mb-2">
                                <Briefcase className="h-4 w-4 text-cpu-green group-hover:scale-110 transition-transform duration-300" />
                                <span className="text-xs font-medium text-slate-500">Activités</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {(() => {
                                  let activitesNames: string[] = [];
                                  if (member.activitesIds && member.activitesIds.length > 0 && secteursApi && Array.isArray(secteursApi)) {
                                    for (const secteur of secteursApi) {
                                      if (secteur.filieres && Array.isArray(secteur.filieres)) {
                                        for (const filiere of secteur.filieres) {
                                          if (filiere.sousFiliere && Array.isArray(filiere.sousFiliere)) {
                                            for (const sf of filiere.sousFiliere) {
                                              if (sf.activites && Array.isArray(sf.activites)) {
                                                for (const act of sf.activites) {
                                                  if (member.activitesIds.includes(act.id)) {
                                                    activitesNames.push(act.name);
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                  
                                  const isExpanded = expandedMembers.has(member.id);
                                  const visibleActivites = isExpanded ? activitesNames : activitesNames.slice(0, 3);
                                  const remainingCount = activitesNames.length - visibleActivites.length;
                                  
                                  return activitesNames.length > 0 ? (
                                    <>
                                      {visibleActivites.map((activite, idx) => (
                                        <Badge 
                                          key={idx} 
                                          className="text-xs bg-white/95 text-slate-900 font-medium px-3 py-1.5 rounded-md hover:bg-slate-100 border border-slate-200 transition-all duration-300"
                                        >
                                          {decodeHtmlEntities(activite)}
                                        </Badge>
                                      ))}
                                      {!isExpanded && remainingCount > 0 && (
                                        <Badge className="text-xs bg-white/95 text-slate-900 font-medium px-3 py-1.5 rounded-md hover:bg-slate-100 border border-slate-200 transition-all">
                                          +{remainingCount}
                                        </Badge>
                                      )}
                                    </>
                                  ) : (
                                    <span className="text-xs text-gray-400">Aucune activité</span>
                                  );
                                })()}
                              </div>
                            </div>

                            {/* Section À propos - ROW 4 */}
                            <div className="px-6 pb-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Users className="h-4 w-4 text-slate-500" />
                                <span className="text-xs font-medium text-slate-500">À propos</span>
                              </div>
                              <p className={`text-sm text-slate-600 ${expandedMembers.has(member.id) ? '' : 'line-clamp-2'}`}
                                 style={{ lineHeight: '1.5rem' }}>
                                {decodeHtmlEntities(member.description)}
                              </p>
                            </div>

                            {/* Boutons d'action - ROW 5 */}
                            <div className="px-6 pb-6 mt-auto">
                              {!expandedMembers.has(member.id) ? (
                                <Button
                                  onClick={() => {
                                    const newExpanded = new Set(expandedMembers);
                                    newExpanded.add(member.id);
                                    setExpandedMembers(newExpanded);
                                  }}
                                  className="w-full bg-cpu-green hover:bg-white hover:text-cpu-green text-white hover:border-cpu-green border-2 border-cpu-green font-semibold transition-all hover:shadow-sm"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  En savoir plus
                                </Button>
                              ) : (
                                <>
                                  {member.website && (
                                    <a
                                      href={member.website.startsWith('http') ? member.website : `https://${member.website}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="w-full mb-3 block"
                                    >
                                      <Button
                                        className="w-full bg-cpu-green hover:bg-white hover:text-cpu-green text-white hover:border-cpu-green border-2 border-cpu-green font-semibold relative overflow-hidden group/btn transition-all hover:shadow-sm"
                                      >
                                        <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></span>
                                        <Globe className="h-4 w-4 mr-2" />
                                        Visiter le site web
                                      </Button>
                                    </a>
                                  )}
                                  <div className="grid grid-cols-2 gap-3 mb-3">
                                    {member.email ? (
                                      <a
                                        href={`mailto:${member.email}`}
                                        className="w-full"
                                      >
                                        <Button
                                          className="w-full bg-cpu-green hover:bg-white hover:text-cpu-green text-white hover:border-cpu-green border-2 border-cpu-green font-semibold relative overflow-hidden group/btn transition-all hover:shadow-sm"
                                        >
                                          <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></span>
                                          <Mail className="h-4 w-4 mr-2" />
                                          Contacter
                                        </Button>
                                      </a>
                                    ) : (
                                      <Button
                                        disabled
                                        className="w-full bg-gray-300 text-gray-500 font-semibold cursor-not-allowed"
                                      >
                                        <Mail className="h-4 w-4 mr-2" />
                                        Contacter
                                      </Button>
                                    )}
                                    
                                    {member.phone ? (
                                      <a
                                        href={`tel:${member.phone}`}
                                        className="w-full"
                                      >
                                        <Button
                                          variant="outline"
                                          className="w-full border-2 border-cpu-orange text-cpu-orange hover:bg-cpu-orange hover:text-white font-semibold transition-all hover:shadow-sm"
                                        >
                                          <span className="mr-2">📞</span>
                                          Appeler
                                        </Button>
                                      </a>
                                    ) : (
                                      <Button
                                        variant="outline"
                                        disabled
                                        className="w-full border-gray-300 text-gray-400 font-semibold cursor-not-allowed"
                                      >
                                        <span className="mr-2">📞</span>
                                        Appeler
                                      </Button>
                                    )}
                                  </div>
                                  <Button
                                    onClick={() => {
                                      const newExpanded = new Set(expandedMembers);
                                      newExpanded.delete(member.id);
                                      setExpandedMembers(newExpanded);
                                    }}
                                    variant="outline"
                                    className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold transition-all"
                                  >
                                    <EyeOff className="h-4 w-4 mr-2" />
                                    Voir moins
                                  </Button>
                                </>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )}
                  </motion.div>
                ) : (
                  /* Vue Liste */
                  <motion.div 
                    className="space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {isLoadingMembers ? (
                      Array.from({ length: membersPerPage }).map(
                        (_, index) => (
                            <div
                              key={`skeleton-list-${index}`}
                              className="border border-gray-200 rounded-lg bg-white flex flex-row"
                            >
                              <div className="w-32 md:w-40 h-32 md:h-40 bg-gray-200 relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                              </div>
                              <div className="p-4 md:p-6 flex-1 space-y-3">
                                <div className="h-5 bg-gray-200 rounded w-1/3 relative overflow-hidden">
                                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                                </div>
                                <div className="h-4 bg-gray-200 rounded w-full relative overflow-hidden">
                                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                                </div>
                                <div className="h-4 bg-gray-200 rounded w-2/3 relative overflow-hidden">
                                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                                </div>
                                <div className="h-4 bg-gray-200 rounded w-1/4 relative overflow-hidden">
                                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                                </div>
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <AnimatePresence mode="wait">
                          {paginatedMembers.map((member, index) => (
                            <motion.div
                              key={member.id}
                              variants={cardVariants}
                              initial="hidden"
                              animate="visible"
                              exit={{ opacity: 0, scale: 0.9 }}
                              whileHover="hover"
                              layout
                              className={`member-card group border-2 border-gray-200 rounded-xl transition-all duration-500 bg-white flex flex-col md:flex-row hover:shadow-2xl hover:shadow-cpu-orange/10 hover:border-cpu-orange cursor-pointer relative overflow-hidden`}
                              onClick={() => openFocusMode(member)}
                            >
                            {/* Barre latérale orange */}
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-cpu-orange group-hover:w-3 transition-all duration-500 shadow-lg shadow-cpu-orange/30"></div>

                            {/* Image avec icône */}
                            <div className="member-image bg-gradient-to-br from-cpu-orange/5 to-cpu-orange/10 w-full md:w-40 lg:w-44 h-32 sm:h-40 md:h-auto flex-shrink-0 flex items-center justify-center overflow-hidden relative group/image">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[75%] sm:w-[85%] h-[75%] sm:h-[85%] rounded-2xl bg-cpu-orange/10 flex items-center justify-center group-hover/image:bg-cpu-orange transition-all duration-500 group-hover/image:scale-110 group-hover/image:rotate-12 shadow-md group-hover/image:shadow-xl group-hover/image:shadow-cpu-orange/30">
                                  <div className="scale-75 sm:scale-90 text-cpu-orange group-hover/image:text-white transition-colors duration-500">
                                    {getMemberIcon(member)}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Contenu principal */}
                            <div className="flex-1 p-3 sm:p-4 md:p-5 flex flex-col min-w-0">
                              {/* Header avec nom et badges */}
                              <div className="mb-2 sm:mb-3">
                                <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2">
                                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors duration-300 line-clamp-2 flex-1 leading-tight">
                                    {decodeHtmlEntities(member.name)}
                                  </h3>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(member.id);
                                      }}
                                      title={favorites.has(member.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
                                    >
                                      <Bookmark
                                        className={`h-4 w-4 transition-colors ${
                                          favorites.has(member.id)
                                            ? 'fill-cpu-orange text-cpu-orange'
                                            : 'text-gray-400 hover:text-cpu-orange'
                                        }`}
                                      />
                                    </Button>
                                    {member.interventionScope && (
                                      <Badge className={`text-xs font-medium px-2.5 py-1 whitespace-nowrap ${
                                        member.interventionScope === 'national' 
                                          ? 'bg-cpu-orange/10 text-cpu-orange border-cpu-orange/30' 
                                          : member.interventionScope === 'regions_specifiques'
                                          ? 'bg-cpu-orange/20 text-cpu-orange border-cpu-orange/40'
                                          : 'bg-gray-100 text-gray-700 border-gray-300'
                                      }`}>
                                        {member.interventionScope === 'national' && '🌍 National'}
                                        {member.interventionScope === 'regions_specifiques' && '📍 Régional'}
                                        {member.interventionScope === 'locale' && '🏘️ Local'}
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                {/* Localisation */}
                                <div className="flex items-start text-sm text-slate-600 mb-2 font-medium">
                                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-cpu-orange mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                                  <span className="break-words">{member.fullAddress || member.region}</span>
                                </div>

                                {/* Filière et Sous-filière */}
                                <div className="grid grid-cols-2 gap-2 mb-2 sm:mb-3">
                                  <div className="rounded-lg p-2 sm:p-2.5 bg-gradient-to-br from-cpu-orange/5 to-cpu-orange/10 border-2 border-transparent group-hover:border-cpu-orange/30 group-hover:shadow-md transition-all duration-300">
                                    <div className="text-xs font-medium text-slate-500 mb-1">Filière</div>
                                    {(() => {
                                      let filiereName = '';
                                      if (member.filiereId && secteursApi && Array.isArray(secteursApi)) {
                                        for (const secteur of secteursApi) {
                                          if (secteur.filieres && Array.isArray(secteur.filieres)) {
                                            const filiere = secteur.filieres.find((f: any) => f.id === member.filiereId);
                                            if (filiere) {
                                              filiereName = filiere.name;
                                              break;
                                            }
                                          }
                                        }
                                      }
                                      return (
                                        <div className="text-sm text-slate-600 line-clamp-1 group-hover:text-primary transition-colors">
                                          {filiereName || member.sector}
                                        </div>
                                      );
                                    })()}
                                  </div>

                                  <div className="rounded-lg p-2 sm:p-2.5 bg-gradient-to-br from-cpu-orange/5 to-cpu-orange/10 border-2 border-transparent group-hover:border-cpu-orange/30 group-hover:shadow-md transition-all duration-300">
                                    <div className="text-xs font-medium text-slate-500 mb-1">Sous Filière</div>
                                    {(() => {
                                      let sousFiliereName = '';
                                      if (member.sousFiliereId && secteursApi && Array.isArray(secteursApi)) {
                                        for (const secteur of secteursApi) {
                                          if (secteur.filieres && Array.isArray(secteur.filieres)) {
                                            for (const filiere of secteur.filieres) {
                                              if (filiere.sousFiliere && Array.isArray(filiere.sousFiliere)) {
                                                const sf = filiere.sousFiliere.find((sf: any) => sf.id === member.sousFiliereId);
                                                if (sf) {
                                                  sousFiliereName = sf.name;
                                                  break;
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                      return (
                                        <div className="text-sm text-slate-600 line-clamp-1 group-hover:text-primary transition-colors">
                                          {sousFiliereName || '-'}
                                        </div>
                                      );
                                    })()}
                                  </div>
                                </div>

                                {/* Activités */}
                                <div className="mb-2">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Briefcase className="h-4 w-4 text-cpu-orange group-hover:scale-110 transition-transform duration-300" />
                                    <span className="text-xs font-medium text-slate-500">Activités</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {(() => {
                                      let activitesNames: string[] = [];
                                      if (member.activitesIds && member.activitesIds.length > 0 && secteursApi && Array.isArray(secteursApi)) {
                                        for (const secteur of secteursApi) {
                                          if (secteur.filieres && Array.isArray(secteur.filieres)) {
                                            for (const filiere of secteur.filieres) {
                                              if (filiere.sousFiliere && Array.isArray(filiere.sousFiliere)) {
                                                for (const sf of filiere.sousFiliere) {
                                                  if (sf.activites && Array.isArray(sf.activites)) {
                                                    for (const act of sf.activites) {
                                                      if (member.activitesIds.includes(act.id)) {
                                                        activitesNames.push(act.name);
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                      
                                      const isExpanded = expandedMembers.has(member.id);
                                      const visibleActivites = isExpanded ? activitesNames : activitesNames.slice(0, 3);
                                      const remainingCount = activitesNames.length - visibleActivites.length;
                                      
                                      return activitesNames.length > 0 ? (
                                        <>
                                          {visibleActivites.map((activite, idx) => (
                                            <Badge 
                                              key={idx} 
                                              className="text-xs bg-white/95 text-slate-900 font-medium px-2.5 py-1 rounded-md hover:bg-slate-100 border border-slate-200 transition-all duration-300"
                                            >
                                              {activite}
                                            </Badge>
                                          ))}
                                          {!isExpanded && remainingCount > 0 && (
                                            <Badge className="text-xs bg-white/95 text-slate-900 font-medium px-2.5 py-1 rounded-md hover:bg-slate-100 border border-slate-200 transition-all duration-300">
                                              +{remainingCount}
                                            </Badge>
                                          )}
                                        </>
                                      ) : (
                                        <span className="text-xs text-gray-400">Aucune activité</span>
                                      );
                                    })()}
                                  </div>
                                </div>
                              </div>

                              {/* Description */}
                              <div className="mb-2">
                                <div className="flex items-center gap-2 mb-2">
                                  <Users className="h-4 w-4 text-slate-500" />
                                  <span className="text-xs font-medium text-slate-500">À propos</span>
                                </div>
                                <p className={`text-sm text-slate-600 leading-relaxed ${expandedMembers.has(member.id) ? '' : 'line-clamp-2'}`}>
                                  {decodeHtmlEntities(member.description)}
                                </p>
                              </div>

                              {/* Boutons d'action */}
                              <div className="mt-auto">
                                {!expandedMembers.has(member.id) ? (
                                  <Button
                                    onClick={() => {
                                      const newExpanded = new Set(expandedMembers);
                                      newExpanded.add(member.id);
                                      setExpandedMembers(newExpanded);
                                    }}
                                    className="w-full bg-cpu-orange hover:bg-white hover:text-cpu-orange text-white hover:border-cpu-orange border-2 border-cpu-orange font-semibold transition-all hover:scale-105 hover:shadow-sm"
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    En savoir plus
                                  </Button>
                                ) : (
                                  <>
                                    {member.website && (
                                      <a
                                        href={member.website.startsWith('http') ? member.website : `https://${member.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full mb-3 block"
                                      >
                                        <Button
                                          className="w-full bg-cpu-orange hover:bg-white hover:text-cpu-orange text-white hover:border-cpu-orange border-2 border-cpu-orange font-semibold relative overflow-hidden group/btn transition-all hover:scale-105 hover:shadow-sm"
                                        >
                                          <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></span>
                                          <Globe className="h-4 w-4 mr-2" />
                                          Visiter le site web
                                        </Button>
                                      </a>
                                    )}
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                      {member.email ? (
                                        <a
                                          href={`mailto:${member.email}`}
                                          className="w-full"
                                        >
                                          <Button
                                            className="w-full bg-cpu-orange hover:bg-white hover:text-cpu-orange text-white hover:border-cpu-orange border-2 border-cpu-orange font-semibold relative overflow-hidden group/btn transition-all hover:scale-105 hover:shadow-sm"
                                          >
                                            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></span>
                                            <Mail className="h-4 w-4 mr-2" />
                                            Contacter
                                          </Button>
                                        </a>
                                      ) : (
                                        <Button
                                          disabled
                                          className="w-full bg-gray-300 text-gray-500 font-semibold cursor-not-allowed"
                                        >
                                          <Mail className="h-4 w-4 mr-2" />
                                          Contacter
                                        </Button>
                                      )}
                                      
                                      {member.phone ? (
                                        <a
                                          href={`tel:${member.phone}`}
                                          className="w-full"
                                        >
                                          <Button
                                            variant="outline"
                                            className="w-full border-2 border-cpu-orange text-cpu-orange hover:bg-cpu-orange hover:text-white font-semibold transition-all hover:scale-105 hover:shadow-sm"
                                          >
                                            <span className="mr-2">📞</span>
                                            Appeler
                                          </Button>
                                        </a>
                                      ) : (
                                        <Button
                                          variant="outline"
                                          disabled
                                          className="w-full border-gray-300 text-gray-400 font-semibold cursor-not-allowed"
                                        >
                                          <span className="mr-2">📞</span>
                                          Appeler
                                        </Button>
                                      )}
                                    </div>
                                    <Button
                                      onClick={() => {
                                        const newExpanded = new Set(expandedMembers);
                                        newExpanded.delete(member.id);
                                        setExpandedMembers(newExpanded);
                                      }}
                                      variant="outline"
                                      className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold transition-all"
                                    >
                                      <EyeOff className="h-4 w-4 mr-2" />
                                      Voir moins
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )}
                  </motion.div>
                )}

                {/* Phase 9: État vide amélioré */}
                {sortedMembers.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16 border border-gray-200 rounded-2xl bg-gradient-to-br from-gray-50 to-white"
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 3,
                        ease: "easeInOut"
                      }}
                      className="inline-block mb-6"
                    >
                      <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-cpu-green/10 to-cpu-orange/10 flex items-center justify-center">
                        <Search className="h-12 w-12 text-gray-400" />
                      </div>
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-slate-800 mb-3">
                      Aucun membre trouvé
                    </h3>
                    <p className="text-slate-600 mb-6 max-w-md mx-auto">
                      {searchTerm 
                        ? `Aucun résultat pour "${searchTerm}". Essayez avec d'autres mots-clés ou filtres.`
                        : "Essayez de modifier vos critères de recherche ou de réinitialiser les filtres."
                      }
                    </p>
                    
                    {searchSuggestions.length > 0 && (
                      <div className="mb-6">
                        <p className="text-sm text-slate-500 mb-3">Suggestions :</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {searchSuggestions.slice(0, 4).map((suggestion, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="cursor-pointer hover:bg-cpu-green/10 hover:border-cpu-green transition-colors"
                              onClick={() => setSearchTerm(suggestion)}
                            >
                              {suggestion}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Button
                      onClick={resetFilters}
                      className="bg-cpu-green hover:bg-cpu-green/90 text-white"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Réinitialiser les filtres
                    </Button>
                  </motion.div>
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
                    {(abonnementsApi || [])
                      .filter((plan) =>
                        ["basic", "silver", "gold"].includes(
                          plan.plan.toLowerCase()
                        )
                      )
                      .sort((a, b) => a.ordre - b.ordre)
                      .map((plan, index) => (
                        <div
                          key={plan.id}
                          className={`relative border rounded-lg overflow-visible transition-all animate-fade-in-up ${
                            plan.popular
                              ? "border-cpu-orange scale-105 bg-white md:scale-110 mt-8"
                              : "border-gray-200 bg-white"
                          }`}
                          style={{
                            animationDelay: `${0.5 + index * 0.15}s`,
                            opacity: 0,
                          }}
                        >
                          {plan.popular && (
                            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                              <Badge className="bg-cpu-orange text-white px-4 py-1.5">
                                Recommandé
                              </Badge>
                            </div>
                          )}

                          <div className="p-6 md:p-8 flex flex-col h-full">
                            <h3 className="text-lg font-bold text-[#221F1F] mb-2 mt-1 break-words">
                              {plan.libelle}
                            </h3>
                            <p className="text-cpu-darkgray text-sm mb-6 break-words">
                              {plan.description}
                            </p>

                            <div className="mb-6 py-5 border-t border-b border-gray-200">
                              {plan.surDevis ? (
                                <>
                                  <p className="text-2xl font-bold text-cpu-orange mb-1">
                                    Sur devis
                                  </p>
                                  {plan.tarifMinAnnuel &&
                                    parseFloat(plan.tarifMinAnnuel) > 0 && (
                                      <p className="text-sm text-cpu-darkgray">
                                        À partir de{" "}
                                        {parseFloat(
                                          plan.tarifMinAnnuel
                                        ).toLocaleString("fr-FR")}{" "}
                                        FCFA/an
                                      </p>
                                    )}
                                </>
                              ) : (
                                <>
                                  <div className="flex items-baseline justify-center gap-2 mb-2">
                                    <p className="text-2xl font-bold text-cpu-orange">
                                      {parseFloat(
                                        plan.tarifAnnuel
                                      ).toLocaleString("fr-FR")}{" "}
                                      FCFA
                                    </p>
                                    <span className="text-lg text-cpu-darkgray">
                                      /an
                                    </span>
                                  </div>
                                  <p className="text-sm text-cpu-darkgray text-center">
                                    ou{" "}
                                    {parseFloat(
                                      plan.tarifMensuel
                                    ).toLocaleString("fr-FR")}{" "}
                                    FCFA/mois
                                  </p>
                                </>
                              )}
                            </div>

                            <ul className="space-y-3 mb-6 flex-1">
                              {(Array.isArray(plan.avantages)
                                ? plan.avantages
                                : []
                              )
                                .filter((a: any) => a.actif)
                                .map((avantage: any, idx: number) => (
                                  <li
                                    key={avantage.id}
                                    className="flex items-start gap-3"
                                  >
                                    <Check className="h-5 w-5 text-cpu-green flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-[#221F1F] break-words">
                                      {avantage.libelle}
                                    </span>
                                  </li>
                                ))}
                            </ul>

                            <Button
                              onClick={() => {
                                setActiveTab("adhesion");
                                const params = new URLSearchParams(
                                  searchParams.toString()
                                );
                                params.set("tab", "adhesion");
                                params.set("plan", plan.libelle); // Passer le nom du plan dans l'URL
                                router.replace(
                                  `/membres?${params.toString()}`,
                                  {
                                    scroll: false,
                                  }
                                );
                                // Faire défiler vers le formulaire après un court délai
                                setTimeout(() => {
                                  const adhesionSection =
                                    document.getElementById("adhesion-form");
                                  if (adhesionSection) {
                                    adhesionSection.scrollIntoView({
                                      behavior: "smooth",
                                      block: "start",
                                    });
                                  }
                                }, 100);
                              }}
                              className={`w-full py-3 font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 pricing-button cursor-pointer ${
                                plan.popular
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
                      Formules dédiées aux associations, coopératives,
                      groupements, fédérations et institutions
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {(abonnementsApi || [])
                      .filter((plan) =>
                        ["cooperative", "federation", "institutional"].includes(
                          plan.plan.toLowerCase()
                        )
                      )
                      .sort((a, b) => a.ordre - b.ordre)
                      .map((plan, index) => (
                        <div
                          key={plan.id}
                          className={`relative border rounded-xl overflow-visible transition-all animate-fade-in-up shadow-lg hover:shadow-xl ${
                            plan.plan.toLowerCase() === "institutional"
                              ? "border-cpu-green bg-gradient-to-br from-cpu-green/5 to-white md:scale-105"
                              : plan.plan.toLowerCase() === "federation"
                              ? "border-cpu-orange bg-gradient-to-br from-cpu-orange/5 to-white"
                              : "border-gray-200 bg-white"
                          }`}
                          style={{
                            animationDelay: `${0.5 + index * 0.15}s`,
                            opacity: 0,
                          }}
                        >
                          {plan.plan.toLowerCase() === "institutional" && (
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                              <Badge className="bg-cpu-green text-white px-4 py-1.5 shadow-md">
                                Premium
                              </Badge>
                            </div>
                          )}
                          {plan.popular &&
                            plan.plan.toLowerCase() !== "institutional" && (
                              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                                <Badge className="bg-cpu-orange text-white px-4 py-1.5 shadow-md">
                                  Recommandé
                                </Badge>
                              </div>
                            )}

                          <div className="p-6 md:p-8 flex flex-col h-full">
                            <h3 className="text-lg font-bold text-[#221F1F] mb-2 mt-1 break-words">
                              {plan.libelle}
                            </h3>
                            <p className="text-cpu-darkgray text-sm mb-6 break-words">
                              {plan.description}
                            </p>

                            <div className="mb-6 py-5 border-t border-b border-gray-200">
                              {plan.surDevis ? (
                                <>
                                  <p className="text-2xl font-bold text-cpu-green mb-1">
                                    Sur devis
                                  </p>
                                  {plan.tarifMinAnnuel &&
                                    parseFloat(plan.tarifMinAnnuel) > 0 && (
                                      <p className="text-sm text-cpu-darkgray">
                                        À partir de{" "}
                                        {parseFloat(
                                          plan.tarifMinAnnuel
                                        ).toLocaleString("fr-FR")}{" "}
                                        FCFA/an
                                      </p>
                                    )}
                                </>
                              ) : (
                                <>
                                  <div className="flex items-baseline justify-center gap-2 mb-2">
                                    <p className="text-2xl font-bold text-cpu-orange">
                                      {parseFloat(
                                        plan.tarifAnnuel
                                      ).toLocaleString("fr-FR")}{" "}
                                      FCFA
                                    </p>
                                    <span className="text-lg text-cpu-darkgray">
                                      /an
                                    </span>
                                  </div>
                                  <p className="text-sm text-cpu-darkgray text-center">
                                    ou{" "}
                                    {parseFloat(
                                      plan.tarifMensuel
                                    ).toLocaleString("fr-FR")}{" "}
                                    FCFA/mois
                                  </p>
                                </>
                              )}
                            </div>

                            <ul className="space-y-3 mb-6 flex-1">
                              {(Array.isArray(plan.avantages)
                                ? plan.avantages
                                : []
                              )
                                .filter((a: any) => a.actif)
                                .map((avantage: any) => (
                                  <li
                                    key={avantage.id}
                                    className="flex items-start gap-3"
                                  >
                                    <Check className="h-5 w-5 text-cpu-green flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-[#221F1F] break-words">
                                      {avantage.libelle}
                                    </span>
                                  </li>
                                ))}
                            </ul>

                            <Button
                              onClick={() => {
                                setActiveTab("adhesion");
                                const params = new URLSearchParams(
                                  searchParams.toString()
                                );
                                params.set("tab", "adhesion");
                                params.set("plan", plan.libelle);
                                router.replace(
                                  `/membres?${params.toString()}`,
                                  {
                                    scroll: false,
                                  }
                                );
                                setTimeout(() => {
                                  const adhesionSection =
                                    document.getElementById("adhesion-form");
                                  if (adhesionSection) {
                                    adhesionSection.scrollIntoView({
                                      behavior: "smooth",
                                      block: "start",
                                    });
                                  }
                                }, 100);
                              }}
                              className={`w-full py-3 font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer ${
                                plan.plan.toLowerCase() === "institutional"
                                  ? "bg-cpu-green text-white hover:bg-green-700 hover:border-green-700 active:bg-green-800 focus:ring-cpu-green"
                                  : plan.plan.toLowerCase() === "federation"
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
                      Présentez votre carte Pass PME chez nos partenaires pour
                      bénéficier de réductions exclusives
                    </p>
                  </div>

                  {/* Cartes de membre - 3 niveaux */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Carte Basic - Orange */}
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                      {/* Logo en arrière-plan */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                        <img
                          src="/logo.png"
                          alt="CPU-PME Logo"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
                            <CreditCard className="h-4 w-4" />
                            <span className="font-semibold text-sm">
                              Pass PME
                            </span>
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
                    </div>

                    {/* Carte Argent - Gris/Bleu */}
                    <div className="bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                      {/* Logo en arrière-plan */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                        <img
                          src="/logo.png"
                          alt="CPU-PME Logo"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
                            <CreditCard className="h-4 w-4" />
                            <span className="font-semibold text-sm">
                              Pass PME
                            </span>
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
                    </div>

                    {/* Carte Or - Gold */}
                    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                      {/* Logo en arrière-plan */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                        <img
                          src="/logo.png"
                          alt="CPU-PME Logo"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-1">
                            <CreditCard className="h-4 w-4" />
                            <span className="font-semibold text-sm">
                              Pass PME
                            </span>
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
                            <p className="text-sm opacity-90">
                              SARL TechIvoire
                            </p>
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
                      passPmeFilter || searchParams.get("passPmeFilter") || "";
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
                {isLoadingPartenairesPME ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                ) : partenairesPassPME.length > 0 ? (
                  (() => {
                    const activeFilter =
                      passPmeFilter ||
                      searchParams.get("passPmeFilter") ||
                      "all";
                    const filteredPartners =
                      activeFilter === "all" || activeFilter === ""
                        ? partenairesPassPME
                        : partenairesPassPME.filter(
                            (p) =>
                              p.categorie?.toLowerCase() ===
                              activeFilter.toLowerCase()
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
                        {filteredPartners.map((partner) => {
                          const CardWrapper = partner.lien
                            ? ({ children }: { children: React.ReactNode }) => (
                                <a
                                  href={partner.lien!}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block"
                                >
                                  {children}
                                </a>
                              )
                            : ({ children }: { children: React.ReactNode }) => (
                                <>{children}</>
                              );

                          return (
                            <CardWrapper key={partner.id}>
                              <div className="bg-white border border-gray-200 rounded-[12px] overflow-hidden shadow-sm transition-all duration-300 flex flex-col h-full">
                                {/* Bandeau coloré en haut avec logo, nom et badge réduction */}
                                <div
                                  className="h-24 flex items-center justify-between p-4 relative flex-shrink-0"
                                  style={{
                                    backgroundColor:
                                      partner.couleurHeader || "#f97316",
                                  }}
                                >
                                  {/* Logo et nom côte à côte */}
                                  <div className="flex items-center gap-3 flex-1">
                                    <div className="w-15 h-15 flex items-center justify-center p-2 shrink-0">
                                      <img
                                        src={partner.logo}
                                        alt={partner.nom}
                                        className="max-h-full rounded-sm max-w-full object-contain"
                                        onError={(e) => {
                                          e.currentTarget.src = "/logo.png";
                                        }}
                                      />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                      <h3 className="text-base font-bold text-white">
                                        {partner.nom}
                                      </h3>
                                      {partner.reduction && (
                                        <Badge className="bg-[#f97316] text-white px-2 py-0.5 text-xs font-bold rounded w-fit">
                                          {partner.reduction}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Contenu blanc en dessous */}
                                <div className="p-5 flex flex-col flex-1 justify-between">
                                  <div>
                                    <h3 className="text-base font-bold text-black mb-3">
                                      {partner.nom}
                                    </h3>
                                    {partner.offre && (
                                      <p className="text-sm text-gray-800 font-medium mb-2">
                                        {partner.offre}
                                      </p>
                                    )}
                                    {partner.note && (
                                      <p className="text-xs text-gray-500 italic mb-4">
                                        {partner.note}
                                      </p>
                                    )}
                                  </div>

                                  <div className="border-t border-gray-200 my-4"></div>

                                  {/* Badge catégorie en bas - fixe */}
                                  <div className="flex flex-wrap gap-2 mt-auto">
                                    {partner.categorie && (
                                      <Badge
                                        variant="outline"
                                        className={`text-xs ${
                                          partner.categorie.toLowerCase() === 'technologie'
                                            ? 'bg-blue-100 text-blue-600 border-blue-300'
                                            : partner.categorie.toLowerCase() === 'finance'
                                            ? 'bg-green-100 text-green-600 border-green-300'
                                            : partner.categorie.toLowerCase() === 'voyage'
                                            ? 'bg-purple-100 text-purple-600 border-purple-300'
                                            : partner.categorie.toLowerCase() === 'operations'
                                            ? 'bg-orange-100 text-orange-600 border-orange-300'
                                            : partner.categorie.toLowerCase() === 'rh'
                                            ? 'bg-pink-100 text-pink-600 border-pink-300'
                                            : partner.categorie.toLowerCase() === 'loisirs'
                                            ? 'bg-indigo-100 text-indigo-600 border-indigo-300'
                                            : 'bg-gray-100 text-gray-600 border-gray-300'
                                        }`}
                                      >
                                        {categoryLabels[
                                          partner.categorie.toLowerCase()
                                        ] || partner.categorie}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardWrapper>
                          );
                        })}
                      </div>
                    );
                  })()
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-600">
                      Aucun partenaire Pass PME disponible pour le moment.
                    </p>
                  </div>
                )}

                {/* Section CTA Partenaires */}
                {/* <div className="bg-gray-100 rounded-xl p-8 md:p-12 text-center mb-8">
                  <p className="text-lg md:text-xl text-gray-700 mb-6">
                    Vous êtes partenaire ? Rejoignez notre programme Pass PME et
                    offrez des avantages exclusifs aux membres CPU-PME.CI
                  </p>
                  <Button className="bg-cpu-orange hover:bg-[#D97420] text-white px-8 py-6 text-lg font-semibold cursor-pointer">
                    Devenir partenaire
                  </Button>
                </div> */}
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
                    Rejoignez notre confédération en quelques minutes. Notre
                    équipe vous contactera sous 48 heures.
                  </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
                  <div className="p-8 md:p-10 lg:p-12 overflow-hidden">
                    <form onSubmit={handleSubmit} className="space-y-0">
                      {/* Indicateur de progression */}
                      {selectedAdhesionType && (
                        <div className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm px-4 md:px-8 lg:px-12 py-4 border-b-2 border-gray-100 shadow-lg animate-in fade-in slide-in-from-top-4 duration-500">
                          <div className="max-w-7xl mx-auto">
                            <div className="flex justify-between items-center mb-3">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-cpu-green" />
                                <span className="text-sm font-bold text-gray-900">
                                  Progression du formulaire
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-cpu-orange">
                                  {calculateProgress().completed} / {calculateProgress().total} complétés
                                </span>
                                <span className="text-xs text-gray-500">
                                  ({calculateProgress().percentage}%)
                                </span>
                              </div>
                            </div>
                            <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                              <div 
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cpu-green via-cpu-orange to-orange-600 rounded-full transition-all duration-700 ease-out shadow-lg"
                                style={{ width: `${calculateProgress().percentage}%` }}
                              >
                                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                              </div>
                            </div>
                            {lastSaved && (
                              <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                                <Save className="h-3 w-3" />
                                <span>Sauvegardé automatiquement à {lastSaved.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Spacer pour compenser la barre fixe */}
                      {selectedAdhesionType && (
                        <div className="h-32 md:h-36"></div>
                      )}

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

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Type de membre */}
                          <div className="space-y-3">
                            <Label
                              htmlFor="memberType"
                              className="text-sm font-semibold text-gray-700"
                            >
                              Type de membre *
                            </Label>
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
                                  <div className="px-2 py-1.5 text-sm text-gray-500">
                                    Chargement...
                                  </div>
                                ) : Array.isArray(typeMembresApi) &&
                                  typeMembresApi.length > 0 ? (
                                  typeMembresApi
                                    .filter((tm) => tm.isActive !== false)
                                    .map((type) => {
                                      // Mapper le nom de l'API vers les valeurs utilisées dans le code
                                      const typeName = type.name.toLowerCase();
                                      let mappedValue: MemberType | null = null;

                                      if (typeName.includes("individuel")) {
                                        mappedValue = "individuel";
                                      } else if (
                                        typeName.includes("entreprise") &&
                                        !typeName.includes("institutionnel")
                                      ) {
                                        mappedValue = "entreprise";
                                      } else if (
                                        typeName.includes("associatif") ||
                                        typeName.includes("organisation")
                                      ) {
                                        mappedValue = "associatif";
                                      } else if (
                                        typeName.includes("institutionnel")
                                      ) {
                                        mappedValue = "institutionnel";
                                      }

                                      if (!mappedValue) {
                                        return null;
                                      }

                                      return (
                                        <SelectItem
                                          key={type.id}
                                          value={mappedValue}
                                        >
                                          {type.name}
                                        </SelectItem>
                                      );
                                    })
                                    .filter(Boolean)
                                ) : errorTypeMembres ? (
                                  <div className="px-2 py-1.5 text-sm text-red-500">
                                    <div className="font-semibold mb-1">
                                      Erreur de chargement
                                    </div>
                                    <div>
                                      {errorTypeMembres.message ||
                                        "Impossible de charger les types de membres"}
                                    </div>
                                    {"status" in errorTypeMembres &&
                                      typeof errorTypeMembres.status ===
                                        "number" && (
                                        <div className="text-xs mt-1">
                                          Code: {errorTypeMembres.status}
                                        </div>
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
                              <p className="text-sm text-gray-600 leading-relaxed">
                                Pour une personne physique, même sans
                                entreprise.
                              </p>
                            )}
                            {selectedAdhesionType === "entreprise" && (
                              <p className="text-sm text-gray-600 leading-relaxed">
                                Pour une entreprise (micro, petite, moyenne
                                entreprise ou startup).
                              </p>
                            )}
                            {selectedAdhesionType === "associatif" && (
                              <p className="text-sm text-gray-600 leading-relaxed">
                                Pour une structure associative (coopérative,
                                fédération, association professionnelle,
                                groupement/GIE).
                              </p>
                            )}
                            {selectedAdhesionType === "institutionnel" && (
                              <p className="text-sm text-gray-600 leading-relaxed">
                                Grandes entreprises et institutions.
                              </p>
                            )}
                          </div>

                          {/* Sous-profil */}
                          <div className="space-y-3">
                            <Label
                              htmlFor="subProfile"
                              className="text-sm font-semibold text-gray-700"
                            >
                              Profil
                            </Label>
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
                                  <div className="px-2 py-1.5 text-sm text-gray-500">
                                    Chargement des profils...
                                  </div>
                                ) : Array.isArray(profilsApi) &&
                                  profilsApi.length > 0 ? (
                                  profilsApi
                                    .filter((p) => p.isActive !== false)
                                    .map((profil) => {
                                      // Mapper le nom du profil vers les valeurs utilisées dans le code
                                      const profilName =
                                        profil.name.toLowerCase();
                                      let mappedValue: string | null = null;

                                      // Mapping pour les profils individuels
                                      if (
                                        selectedAdhesionType === "individuel"
                                      ) {
                                        if (
                                          profilName.includes("jeune") ||
                                          profilName.includes("étudiant")
                                        ) {
                                          mappedValue = "jeune_etudiant";
                                        } else if (
                                          profilName.includes("entrepreneur") ||
                                          profilName.includes("projet")
                                        ) {
                                          mappedValue = "entrepreneur_projet";
                                        } else if (
                                          profilName.includes(
                                            "professionnel"
                                          ) ||
                                          profilName.includes("expert")
                                        ) {
                                          mappedValue = "professionnel_expert";
                                        } else if (
                                          profilName.includes("salarié") ||
                                          profilName.includes("cadre")
                                        ) {
                                          mappedValue = "salarie_cadre";
                                        }
                                      }
                                      // Mapping pour les profils entreprise
                                      else if (
                                        selectedAdhesionType === "entreprise"
                                      ) {
                                        if (profilName.includes("micro")) {
                                          mappedValue = "micro_entreprise";
                                        } else if (
                                          profilName.includes("petite")
                                        ) {
                                          mappedValue = "petite_entreprise";
                                        } else if (
                                          profilName.includes("moyenne")
                                        ) {
                                          mappedValue = "moyenne_entreprise";
                                        } else if (
                                          profilName.includes("startup")
                                        ) {
                                          mappedValue = "startup";
                                        }
                                      }
                                      // Mapping pour les profils associatifs
                                      else if (
                                        selectedAdhesionType === "associatif"
                                      ) {
                                        if (
                                          profilName.includes("coopérative") ||
                                          profilName.includes("cooperative")
                                        ) {
                                          mappedValue = "cooperative";
                                        } else if (
                                          profilName.includes("fédération") ||
                                          profilName.includes("federation") ||
                                          profilName.includes("filière") ||
                                          profilName.includes("filiere")
                                        ) {
                                          mappedValue = "federation_filiere";
                                        } else if (
                                          profilName.includes("association") &&
                                          profilName.includes("professionnelle")
                                        ) {
                                          mappedValue =
                                            "association_professionnelle";
                                        } else if (
                                          profilName.includes("groupement") ||
                                          profilName.includes("gie")
                                        ) {
                                          mappedValue = "groupement_gie";
                                        }
                                      }
                                      // Mapping pour les profils institutionnels
                                      else if (
                                        selectedAdhesionType ===
                                        "institutionnel"
                                      ) {
                                        if (
                                          profilName.includes("grande") &&
                                          profilName.includes("entreprise")
                                        ) {
                                          mappedValue = "grande_entreprise";
                                        } else if (
                                          profilName.includes("banque")
                                        ) {
                                          mappedValue = "banque";
                                        } else if (
                                          profilName.includes("assureur")
                                        ) {
                                          mappedValue = "assureur";
                                        } else if (
                                          profilName.includes("bailleur")
                                        ) {
                                          mappedValue = "bailleur";
                                        } else if (
                                          profilName.includes("agence") &&
                                          profilName.includes("publique")
                                        ) {
                                          mappedValue = "agence_publique";
                                        } else if (
                                          profilName.includes("collectivité") ||
                                          profilName.includes("collectivite")
                                        ) {
                                          mappedValue = "collectivite";
                                        } else if (
                                          profilName.includes("programme") &&
                                          profilName.includes("international")
                                        ) {
                                          mappedValue =
                                            "programme_international";
                                        }
                                      }

                                      // Si aucun mapping trouvé, utiliser l'ID du profil comme valeur
                                      const value = mappedValue || profil.id;

                                      return (
                                        <SelectItem
                                          key={profil.id}
                                          value={value}
                                        >
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
                        {(selectedAdhesionType === "individuel" ||
                          selectedAdhesionType === "entreprise" ||
                          selectedAdhesionType === "associatif") &&
                          !(
                            selectedAdhesionType === "associatif" &&
                            selectedSubProfile === "federation_filiere"
                          ) && (
                            <div className="mt-6 p-5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-100">
                              <div className="flex items-start space-x-3">
                                <input
                                  type="checkbox"
                                  id="belongsToOrg"
                                  checked={hasAffiliation}
                                  onChange={(e) =>
                                    setHasAffiliation(e.target.checked)
                                  }
                                  className="h-5 w-5 border-2 border-cpu-orange rounded-md focus:ring-2 focus:ring-cpu-orange focus:ring-offset-0 mt-0.5 cursor-pointer checked:bg-cpu-orange checked:border-cpu-orange transition-all"
                                  style={{
                                    accentColor: "#F27A20",
                                    colorScheme: "light",
                                  }}
                                />
                                <Label
                                  htmlFor="belongsToOrg"
                                  className="text-sm cursor-pointer font-medium text-gray-800"
                                >
                                  {selectedAdhesionType === "associatif" &&
                                  selectedSubProfile !== "federation_filiere"
                                    ? "Notre organisation est affiliée à une fédération de filière"
                                    : "J'appartiens à une organisation (fédération, coopérative, association, groupement)"}
                                </Label>
                              </div>

                              {/* Champs Type d'organisation et Sélection organisation (conditionnel avec trait orange) */}
                              {hasAffiliation && (
                                <div className="ml-2 mt-5 pl-5 border-l-4 border-cpu-orange space-y-5">
                                  {/* Cas spécial : Associatif (sauf federation_filiere) → Afficher directement "Sélectionnez la fédération" */}
                                  {selectedAdhesionType === "associatif" &&
                                  selectedSubProfile !==
                                    "federation_filiere" ? (
                                    <div className="space-y-3">
                                      <Label
                                        htmlFor="organisation"
                                        className="text-sm font-semibold text-gray-700"
                                      >
                                        Sélectionnez la fédération
                                      </Label>
                                      <Select
                                        value={selectedOrganisation}
                                        onValueChange={(value) => {
                                          setSelectedOrganisation(value);
                                          if (value !== "Autre") {
                                            setCustomOrganisationName("");
                                          }
                                          // Forcer le type à "federation" pour ce cas
                                          if (
                                            !selectedOrgType ||
                                            selectedOrgType !== "federation"
                                          ) {
                                            setSelectedOrgType("federation");
                                          }
                                        }}
                                      >
                                        <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl bg-white text-gray-900 font-medium">
                                          <SelectValue placeholder="Choisir la fédération" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {(() => {
                                            const organisations =
                                              getApprovedOrganisationsByType(
                                                "federation"
                                              );
                                            if (organisations.length === 0) {
                                              return (
                                                <div className="px-2 py-1.5 text-sm text-gray-500">
                                                  Aucune organisation disponible
                                                </div>
                                              );
                                            }
                                            return organisations.map((org) => (
                                              <SelectItem key={org} value={org}>
                                                {org}
                                              </SelectItem>
                                            ));
                                          })()}
                                        </SelectContent>
                                      </Select>
                                      <p className="text-xs text-gray-500">
                                        Si votre fédération est membre, vous
                                        bénéficiez de ses avantages
                                      </p>
                                    </div>
                                  ) : (
                                    /* Cas normal : Afficher Type d'organisation puis Sélection organisation */
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                      {/* Type d'organisation */}
                                      <div className="space-y-3">
                                        <Label htmlFor="orgType">
                                          Type d'organisation
                                        </Label>
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
                                            <SelectItem value="federation">
                                              Fédération
                                            </SelectItem>
                                            <SelectItem value="cooperative">
                                              Coopérative
                                            </SelectItem>
                                            <SelectItem value="association">
                                              Association
                                            </SelectItem>
                                            <SelectItem value="groupement">
                                              Groupement
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>

                                      {/* Sélection de l'organisation */}
                                      {selectedOrgType && (
                                        <div className="space-y-3">
                                          <Label
                                            htmlFor="organisation"
                                            className="text-sm font-semibold text-gray-700"
                                          >
                                            Sélectionnez votre organisation
                                          </Label>
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
                                              {(() => {
                                                const organisations =
                                                  getApprovedOrganisationsByType(
                                                    selectedOrgType
                                                  );
                                                if (organisations.length === 0) {
                                                  return (
                                                    <div className="px-2 py-1.5 text-sm text-gray-500">
                                                      Aucune organisation disponible
                                                    </div>
                                                  );
                                                }
                                                return organisations.map((org) => (
                                                  <SelectItem
                                                    key={org}
                                                    value={org}
                                                  >
                                                    {org}
                                                  </SelectItem>
                                                ));
                                              })()}
                                            </SelectContent>
                                          </Select>
                                          <p className="text-sm text-gray-600 flex items-center gap-2">
                                            <Info className="h-4 w-4 text-cpu-orange" />
                                            Si votre organisation est membre,
                                            vous bénéficiez de ses avantages
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Champ texte si "Autre" est sélectionné */}
                                  {selectedOrganisation === "Autre" && (
                                    <div className="space-y-3">
                                      <Label
                                        htmlFor="customOrgName"
                                        className="text-sm font-semibold text-gray-700"
                                      >
                                        Nom de votre organisation
                                      </Label>
                                      <Input
                                        id="customOrgName"
                                        value={customOrganisationName}
                                        onChange={(e) =>
                                          setCustomOrganisationName(
                                            e.target.value
                                          )
                                        }
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

                      {/* SECTION: Votre contact */}
                      <div className="pb-8 p-6 bg-gradient-to-br from-white to-orange-50/30 rounded-2xl border-2 border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cpu-orange/10">
                            <Users className="h-5 w-5 text-cpu-orange" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900">
                              Votre contact
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Personne à contacter pour le suivi de votre adhésion
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Label
                                htmlFor="representativeName"
                                className="text-sm font-semibold text-gray-700"
                              >
                                Nom du représentant
                              </Label>
                              <span className="text-red-500 text-base">*</span>
                            </div>
                            <div className="relative">
                              <Input
                                id="representativeName"
                                placeholder="Prénom et Nom"
                                required
                                className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl px-4 pr-10 text-gray-900"
                                value={formName}
                                onChange={(e) => setFormName(e.target.value)}
                              />
                              {formName && (
                                <CheckCircle className="absolute right-3 top-3.5 h-5 w-5 text-cpu-green animate-in zoom-in duration-200" />
                              )}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label
                              htmlFor="position"
                              className="text-sm font-semibold text-gray-700"
                            >
                              Fonction
                            </Label>
                            <div className="relative">
                              <Input
                                id="position"
                                placeholder="Ex: Directeur Général, Gérant"
                                className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl px-4 pr-10 text-gray-900"
                                value={formPosition}
                                onChange={(e) => setFormPosition(e.target.value)}
                              />
                              {formPosition && (
                                <CheckCircle className="absolute right-3 top-3.5 h-5 w-5 text-cpu-green animate-in zoom-in duration-200" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Séparateur moderne */}
                      <div className="border-t-2 border-gray-100 my-8"></div>

                      {/* SECTION: Informations sur l'organisation */}
                      <div id="organisation-section" className="pb-8 p-6 bg-gradient-to-br from-white to-green-50/30 rounded-2xl border-2 border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cpu-green/10">
                            <Building2 className="h-5 w-5 text-cpu-green" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900">
                              Identification de votre organisation
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Informations générales sur votre entreprise
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          {/* Nom de l'organisation */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Label
                                htmlFor="orgName"
                                className="text-sm font-semibold text-gray-700"
                              >
                                Nom de l'organisation
                              </Label>
                              <span className="text-red-500 text-base">*</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">Le nom officiel de votre entreprise ou organisation</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <div className="relative">
                              <Input
                                id="orgName"
                                placeholder="Ex: Ma Société SARL"
                                required
                                className="h-12 border-2 border-gray-200 hover:border-cpu-green/50 focus:border-cpu-green transition-colors rounded-xl px-4 pr-10 text-gray-900"
                                value={orgName}
                                onChange={(e) => setOrgName(e.target.value)}
                              />
                              {orgName && (
                                <CheckCircle className="absolute right-3 top-3.5 h-5 w-5 text-cpu-green animate-in zoom-in duration-200" />
                              )}
                            </div>
                          </div>

                          {/* Email de l'entreprise avec validation */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Label
                                htmlFor="email"
                                className="text-sm font-semibold text-gray-700"
                              >
                                Email de l'entreprise
                              </Label>
                              <span className="text-red-500 text-base">*</span>
                            </div>
                            <div className="relative">
                              <Input
                                id="email"
                                type="email"
                                placeholder="contact@entreprise.ci"
                                required
                                className={`h-12 border-2 transition-colors rounded-xl px-4 pr-10 text-gray-900 ${
                                  emailError
                                    ? 'border-red-500 hover:border-red-600 focus:border-red-600'
                                    : emailValid
                                    ? 'border-green-500 hover:border-green-600 focus:border-green-600'
                                    : 'border-gray-200 hover:border-cpu-green/50 focus:border-cpu-green'
                                }`}
                                value={formEmail}
                                onChange={(e) => {
                                  setFormEmail(e.target.value);
                                  validateEmail(e.target.value);
                                }}
                                onBlur={() => validateEmail(formEmail)}
                                suppressHydrationWarning
                              />
                              {emailValid && !emailError && (
                                <CheckCircle className="absolute right-3 top-3.5 h-5 w-5 text-green-600 animate-in zoom-in duration-200" />
                              )}
                              {emailError && (
                                <AlertCircle className="absolute right-3 top-3.5 h-5 w-5 text-red-600 animate-in zoom-in duration-200" />
                              )}
                            </div>
                            {emailError && (
                              <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-2 duration-200">
                                <AlertCircle className="h-4 w-4" />
                                {emailError}
                              </p>
                            )}
                          </div>

                          {/* Site Web de l'entreprise */}
                          <div className="space-y-3">
                            <Label
                              htmlFor="website"
                              className="text-sm font-semibold text-gray-700"
                            >
                              Site Web de l'entreprise
                            </Label>
                            <Input
                              id="website"
                              type="text"
                              placeholder="https://www.entreprise.ci"
                              className="h-12 border-2 border-gray-200 hover:border-cpu-green/50 focus:border-cpu-green transition-colors rounded-xl px-4 text-gray-900"
                              value={formWebsite}
                              onChange={(e) => {
                                // Récupérer la valeur brute et la décoder si elle est HTML-encodée
                                let rawValue = e.currentTarget.value;
                                // Supprimer tout HTML encoding
                                rawValue = rawValue
                                  .replace(/&amp;/g, '&')
                                  .replace(/&lt;/g, '<')
                                  .replace(/&gt;/g, '>')
                                  .replace(/&quot;/g, '"')
                                  .replace(/&#x2F;/g, '/')
                                  .replace(/&#47;/g, '/');
                                setFormWebsite(rawValue);
                              }}
                            />
                          </div>

                          {/* Téléphone de l'entreprise et Nombre d'employés */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Téléphone de l'entreprise */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Label
                                  htmlFor="phone"
                                  className="text-sm font-semibold text-gray-700"
                                >
                                  Téléphone de l'entreprise
                                </Label>
                                <span className="text-red-500 text-base">*</span>
                              </div>
                              <div className="relative">
                                <Input
                                  id="phone"
                                  type="tel"
                                  placeholder="+225 XX XX XX XX XX"
                                  required
                                  className={`h-12 border-2 transition-colors rounded-xl px-4 pr-10 text-gray-900 ${
                                    phoneError
                                      ? 'border-red-500 hover:border-red-600 focus:border-red-600'
                                      : phoneValid
                                      ? 'border-green-500 hover:border-green-600 focus:border-green-600'
                                      : 'border-gray-200 hover:border-cpu-green/50 focus:border-cpu-green'
                                  }`}
                                  value={formPhone}
                                  onChange={(e) => {
                                    setFormPhone(e.target.value);
                                    validatePhone(e.target.value);
                                  }}
                                  onBlur={() => validatePhone(formPhone)}
                                />
                                {phoneValid && !phoneError && (
                                  <CheckCircle className="absolute right-3 top-3.5 h-5 w-5 text-green-600 animate-in zoom-in duration-200" />
                                )}
                                {phoneError && (
                                  <AlertCircle className="absolute right-3 top-3.5 h-5 w-5 text-red-600 animate-in zoom-in duration-200" />
                                )}
                              </div>
                              {phoneError && (
                                <p className="text-sm text-red-600 flex items-center gap-1 animate-in slide-in-from-top-2 duration-200">
                                  <AlertCircle className="h-4 w-4" />
                                  {phoneError}
                                </p>
                              )}
                            </div>

                            {/* Nombre d'employés */}
                            {selectedAdhesionType !== "institutionnel" && (
                              <div className="space-y-3">
                                <Label
                                  htmlFor="employees"
                                  className="text-sm font-semibold text-gray-700"
                                >
                                  Nombre d'employés
                                </Label>
                                <Select value={nombreEmploye} onValueChange={setNombreEmploye}>
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
                            )}
                          </div>

                          {/* Description de l'entreprise */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Label
                                htmlFor="message"
                                className="text-sm font-semibold text-gray-700"
                              >
                                Description de l'entreprise
                              </Label>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">Décrivez brièvement votre activité, vos produits/services et vos objectifs</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <Textarea
                              id="message"
                              placeholder="Décrivez brièvement votre organisation, votre activité principale, et vos attentes..."
                              className="min-h-[120px] border-2 border-gray-200 hover:border-cpu-green/50 focus:border-cpu-green transition-colors rounded-xl px-4 py-3 text-gray-900 resize-none"
                              value={formMessage}
                              onChange={(e) => setFormMessage(e.target.value)}
                              maxLength={1500}
                            />
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <Lightbulb className="h-3 w-3" />
                              {formMessage.length}/1500 caractères • ~{Math.ceil(formMessage.split(/\s+/).filter(word => word.length > 0).length)} mots
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Séparateur moderne */}
                      <div className="border-t-2 border-gray-100 my-8"></div>

                      {/* SECTION: Secteur d'activité */}
                      <div id="secteur-section" className="pb-8 p-6 bg-gradient-to-br from-white to-orange-50/30 rounded-2xl border-2 border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cpu-orange/10">
                            <Briefcase className="h-5 w-5 text-cpu-orange" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900">
                              Secteur d'activité
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Précisez votre domaine d'activité professionnel
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          {/* Filière et Secteur */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-3 relative isolate">
                              <div className="flex items-center gap-2">
                                <Label
                                  htmlFor="filiere"
                                  className="text-sm font-semibold text-gray-700"
                                >
                                  Filière
                                </Label>
                                <span className="text-red-500 text-base">*</span>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="max-w-xs">La filière correspond au secteur d'activité principal</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              <Combobox
                                options={
                                  isLoadingSecteurs || errorSecteurs
                                    ? []
                                    : getAllFilieres().map(
                                        ({ filiere, secteurNom }) => {
                                          // Déterminer le nom à afficher selon la structure (API ou statique)
                                          const filiereAny = filiere as any;
                                          const filiereName =
                                            filiereAny.nom ||
                                            filiereAny.name ||
                                            filiereAny.id;
                                          return {
                                            value: filiere.id,
                                            label: filiereName,
                                            sublabel: secteurNom,
                                          };
                                        }
                                      )
                                }
                                value={selectedFiliere}
                                onValueChange={setSelectedFiliere}
                                placeholder={
                                  isLoadingSecteurs
                                    ? "Chargement..."
                                    : "Sélectionnez une filière"
                                }
                                searchPlaceholder="Rechercher une filière..."
                                emptyText="Aucune filière trouvée"
                                disabled={isLoadingSecteurs}
                                loading={isLoadingSecteurs}
                                className="w-full min-w-[300px]"
                              />
                              {errorSecteurs && (
                                <p className="text-sm text-red-600 flex items-center gap-2">
                                  <Info className="h-4 w-4" />
                                  Erreur lors du chargement des filières depuis
                                  l'API
                                </p>
                              )}
                            </div>

                            <div className="space-y-3 relative isolate">
                              <div className="flex items-center gap-2">
                                <Label
                                  htmlFor="sector"
                                  className="text-sm font-semibold text-gray-700"
                                >
                                  Secteur d'activité
                                </Label>
                                <span className="text-red-500 text-base">*</span>
                              </div>
                              <Combobox
                                options={(() => {
                                  const secteurs =
                                    secteursApi &&
                                    Array.isArray(secteursApi) &&
                                    secteursApi.length > 0
                                      ? secteursApi.map((s) => ({
                                          value: s.id,
                                          label: s.name,
                                        }))
                                      : Object.values(secteursData).map(
                                          (s) => ({
                                            value: s.id,
                                            label: s.nom,
                                          })
                                        );
                                  return secteurs;
                                })()}
                                value={selectedMainSector}
                                onValueChange={setSelectedMainSector}
                                placeholder={
                                  isLoadingSecteurs
                                    ? "Chargement..."
                                    : "Sélectionnez un secteur"
                                }
                                searchPlaceholder="Rechercher un secteur..."
                                emptyText="Aucun secteur trouvé"
                                disabled={!!selectedFiliere || isLoadingSecteurs}
                                loading={isLoadingSecteurs}
                                className="w-full min-w-[300px]"
                              />
                              {selectedFiliere && (
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                  <Info className="h-4 w-4 text-cpu-green" />
                                  Secteur déterminé automatiquement à partir de
                                  la filière
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Sous-filière */}
                          {selectedFiliere && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                              <div className="space-y-3 relative isolate">
                                <div className="flex items-center gap-2">
                                  <Label
                                    htmlFor="subFiliere"
                                    className="text-sm font-semibold text-gray-700"
                                  >
                                    Sous-filière
                                  </Label>
                                  <span className="text-red-500 text-base">*</span>
                                </div>
                                <Combobox
                                  options={
                                    isLoadingSecteurs
                                      ? []
                                      : getSubCategoriesForFiliere().map(
                                          (subCat: {
                                            id?: string;
                                            nom: string;
                                          }) => {
                                            // Utiliser l'ID si disponible (API), sinon le nom (données statiques)
                                            const value =
                                              subCat.id || subCat.nom;
                                            const displayName = subCat.nom;
                                            return {
                                              value: value,
                                              label: displayName,
                                            };
                                          }
                                        )
                                  }
                                  value={selectedSubCategory}
                                  onValueChange={setSelectedSubCategory}
                                  placeholder={
                                    isLoadingSecteurs
                                      ? "Chargement..."
                                      : "Sélectionnez une sous-filière"
                                  }
                                  searchPlaceholder="Rechercher une sous-filière..."
                                  emptyText="Aucune sous-filière disponible pour cette filière"
                                  disabled={isLoadingSecteurs}
                                  loading={isLoadingSecteurs}
                                  className="w-full min-w-[300px]"
                                />
                              </div>
                            </div>
                          )}

                          {/* Activités / Corps de métiers */}
                          {selectedSubCategory && (
                            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                              <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100">
                                <div className="flex items-center gap-2 mb-2">
                                  <Label className="text-base font-bold text-gray-900">
                                    Activités / Corps de métiers
                                  </Label>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <HelpCircle className="h-4 w-4 text-gray-600 cursor-help" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="max-w-xs">Cochez toutes les activités correspondant à votre entreprise</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                                <p className="text-sm text-gray-600">
                                  Sélectionnez une ou plusieurs activités correspondant à votre entreprise
                                </p>
                              </div>

                              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 p-6 border-2 border-gray-100 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-sm max-h-80 overflow-y-auto">
                                {getActivitiesForSubCategory().map(
                                  (activity) => (
                                    <div
                                      key={activity}
                                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white transition-colors"
                                    >
                                      <input
                                        type="checkbox"
                                        id={`activity-${activity}`}
                                        checked={selectedActivities.includes(
                                          activity
                                        )}
                                        onChange={() =>
                                          toggleActivity(activity)
                                        }
                                        className="h-5 w-5 border-2 border-cpu-orange rounded-md focus:ring-2 focus:ring-cpu-orange focus:ring-offset-0 mt-0.5 cursor-pointer checked:bg-cpu-orange checked:border-cpu-orange transition-all"
                                        style={{
                                          accentColor: "#F27A20",
                                          colorScheme: "light",
                                        }}
                                      />
                                      <Label
                                        htmlFor={`activity-${activity}`}
                                        className="text-sm cursor-pointer font-medium text-gray-700 leading-tight"
                                      >
                                        {activity}
                                      </Label>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Séparateur moderne */}
                      <div className="border-t-2 border-gray-100 my-8"></div>

                      {/* SECTION: Localisation du siège / bureaux */}
                      <div className="pb-8 p-6 bg-gradient-to-br from-white to-blue-50/30 rounded-2xl border-2 border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Section Adresse Internationale (uniquement pour institutionnels) */}
                        {selectedAdhesionType === "institutionnel" && (
                          <div className="mb-8">
                            <div className="flex items-center gap-3 mb-6">
                              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cpu-orange/10">
                                <Globe className="h-5 w-5 text-cpu-orange" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900">
                                  Adresse Internationale
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  Renseignez l'adresse de votre siège international
                                </p>
                              </div>
                            </div>

                            {/* Question pour bureau international */}
                            <div className="mb-6 p-5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-100">
                              <div className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  id="hasBureauInternational"
                                  checked={hasBureauInternational}
                                  onChange={(e) =>
                                    setHasBureauInternational(e.target.checked)
                                  }
                                  className="h-5 w-5 border-2 border-cpu-orange rounded-md focus:ring-2 focus:ring-cpu-orange focus:ring-offset-0 cursor-pointer checked:bg-cpu-orange checked:border-cpu-orange transition-all"
                                  style={{
                                    accentColor: "#F27A20",
                                    colorScheme: "light",
                                  }}
                                />
                                <Label
                                  htmlFor="hasBureauInternational"
                                  className="text-sm cursor-pointer font-medium text-gray-800"
                                >
                                  Avez-vous un bureau à l'international ?
                                </Label>
                              </div>
                            </div>

                            {/* Afficher les champs seulement si hasBureauInternational est coché */}
                            {hasBureauInternational && (
                              <div className="p-6 bg-white rounded-2xl border-2 border-gray-200">
                                <div className="space-y-5">
                                  {/* Adresse */}
                                  <div className="space-y-3">
                                    <Label
                                      htmlFor="internationalAddress"
                                      className="text-sm font-semibold text-gray-700"
                                    >
                                      Adresse
                                    </Label>
                                    <Input
                                      id="internationalAddress"
                                      value={internationalAddress}
                                      onChange={(e) => setInternationalAddress(e.target.value)}
                                      placeholder="Ex: 123 Main Street, Suite 100"
                                      className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl px-4 text-gray-900 bg-white"
                                    />
                                  </div>

                                  {/* Ville et Pays */}
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                      <Label
                                        htmlFor="internationalCity"
                                        className="text-sm font-semibold text-gray-700"
                                      >
                                        Ville
                                      </Label>
                                      <Input
                                        id="internationalCity"
                                        value={internationalCity}
                                        onChange={(e) => setInternationalCity(e.target.value)}
                                        placeholder="Ex: Paris, London, New York"
                                        className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl px-4 text-gray-900 bg-white"
                                      />
                                    </div>

                                    <div className="space-y-3">
                                      <Label
                                        htmlFor="internationalCountry"
                                        className="text-sm font-semibold text-gray-700"
                                      >
                                        Pays
                                      </Label>
                                      <Input
                                        id="internationalCountry"
                                        value={internationalCountry}
                                        onChange={(e) => setInternationalCountry(e.target.value)}
                                        placeholder="Ex: France, Royaume-Uni, États-Unis"
                                        className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl px-4 text-gray-900 bg-white"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex items-center gap-3 mb-6">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cpu-orange/10">
                            <MapPin className="h-5 w-5 text-cpu-orange" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900">
                              {selectedAdhesionType === "institutionnel"
                                ? "Localisation des bureaux en Côte d'Ivoire"
                                : "Localisation du siège"}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Indiquez l'adresse de votre établissement principal
                            </p>
                          </div>
                        </div>

                        {/* Question pour les membres institutionnels */}
                        {selectedAdhesionType === "institutionnel" && (
                          <div className="mb-6 p-5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-100">
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                id="hasBureauCI"
                                checked={hasBureauCI}
                                onChange={(e) =>
                                  setHasBureauCI(e.target.checked)
                                }
                                className="h-5 w-5 border-2 border-cpu-orange rounded-md focus:ring-2 focus:ring-cpu-orange focus:ring-offset-0 cursor-pointer checked:bg-cpu-orange checked:border-cpu-orange transition-all"
                                style={{
                                  accentColor: "#F27A20",
                                  colorScheme: "light",
                                }}
                              />
                              <Label
                                htmlFor="hasBureauCI"
                                className="text-sm cursor-pointer font-medium text-gray-800"
                              >
                                Avez-vous des bureaux en Côte d'Ivoire ?
                              </Label>
                            </div>
                          </div>
                        )}

                        {/* Afficher les champs de localisation : toujours pour non-institutionnel, conditionnellement pour institutionnel */}
                        {(selectedAdhesionType !== "institutionnel" ||
                          hasBureauCI) && (
                          <div className="space-y-5">
                            {/* Champ Village/Quartier en premier - indépendant */}
                            <div className="space-y-3 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100">
                              <Label
                                htmlFor="siegeVillage"
                                className="text-sm font-semibold text-gray-700"
                              >
                                Rue / Quartier / Village
                              </Label>
                              <Input
                                id="siegeVillage"
                                value={siegeVillage}
                                onChange={(e) =>
                                  setSiegeVillage(e.target.value)
                                }
                                placeholder="Ex: Abobo-Gare, Cocody-Angré, Plateau..."
                                className="h-12 border-2 border-gray-200 hover:border-cpu-orange/50 focus:border-cpu-orange transition-colors rounded-xl px-4 text-gray-900 bg-white"
                              />
                              <p className="text-sm text-gray-600 flex items-center gap-2">
                                <Info className="h-4 w-4 text-cpu-orange" />
                                Vous pouvez renseigner ce champ avant ou
                                indépendamment de la commune
                              </p>
                            </div>

                            {/* Ligne 1: Commune et Région */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div className="space-y-3 relative isolate">
                                <Label
                                  htmlFor="siegeCommune"
                                  className="text-sm font-semibold text-gray-700"
                                >
                                  Commune *
                                </Label>
                                <Combobox
                                  options={
                                    isLoadingRegions || errorRegions
                                      ? []
                                      : getAvailableCommunes().map(
                                          ({ commune, regionName }) => {
                                            const communeName =
                                              "name" in commune
                                                ? commune.name
                                                : (commune as any).name;
                                            return {
                                              value: communeName,
                                              label: communeName,
                                              sublabel: !siegeRegion
                                                ? regionName
                                                : undefined,
                                            };
                                          }
                                        )
                                  }
                                  value={siegeCommune}
                                  onValueChange={(value) => {
                                    setSiegeCommune(value);
                                    // La ville et la région sont déterminées automatiquement par le useEffect
                                  }}
                                  placeholder={
                                    isLoadingRegions
                                      ? "Chargement..."
                                      : "Sélectionnez une commune"
                                  }
                                  searchPlaceholder="Rechercher une commune..."
                                  emptyText={
                                    siegeRegion
                                      ? "Aucune commune disponible pour cette région"
                                      : "Aucune commune trouvée"
                                  }
                                  disabled={isLoadingRegions}
                                  loading={isLoadingRegions}
                                  className="w-full min-w-[300px]"
                                />
                                {errorRegions && (
                                  <p className="text-sm text-red-600 flex items-center gap-2">
                                    <Info className="h-4 w-4" />
                                    Erreur lors du chargement des communes
                                    depuis l'API
                                  </p>
                                )}
                              </div>

                              <div className="space-y-3 relative isolate">
                                <Label
                                  htmlFor="siegeRegion"
                                  className="text-sm font-semibold text-gray-700"
                                >
                                  Région *
                                </Label>
                                <Combobox
                                  options={(() => {
                                    const regions =
                                      regionsApi &&
                                      Array.isArray(regionsApi) &&
                                      regionsApi.length > 0
                                        ? regionsApi
                                            .filter((r) => r.isActive !== false)
                                            .map((r) => ({
                                              value: r.id,
                                              label: r.name,
                                            }))
                                        : Object.keys(regionsData).map(
                                            (regionName) => ({
                                              value: regionName,
                                              label: regionName,
                                            })
                                          );
                                    return regions;
                                  })()}
                                  value={siegeRegion}
                                  onValueChange={(value) => {
                                    setSiegeRegion(value);
                                    setSiegeCommune(""); // Réinitialiser la commune
                                    setSiegeVille(""); // Réinitialiser la ville
                                  }}
                                  placeholder={
                                    isLoadingRegions
                                      ? "Chargement..."
                                      : "Sélectionnez une région"
                                  }
                                  searchPlaceholder="Rechercher une région..."
                                  emptyText="Aucune région trouvée"
                                  disabled={!!siegeCommune || isLoadingRegions}
                                  loading={isLoadingRegions}
                                  className="w-full min-w-[300px]"
                                />
                                {siegeCommune && (
                                  <p className="text-sm text-gray-600 flex items-center gap-2">
                                    <Info className="h-4 w-4 text-cpu-orange" />
                                    Région déterminée automatiquement à partir
                                    de la commune
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Ligne 2: Ville (conditionnel après sélection de commune) */}
                            {siegeCommune && (
                              <div className="space-y-3">
                                <Label
                                  htmlFor="siegeVille"
                                  className="text-sm font-semibold text-gray-700"
                                >
                                  Ville *
                                </Label>
                                <Combobox
                                  options={getVillesForCommune(
                                    siegeRegion,
                                    siegeCommune
                                  ).map((ville) => ({
                                    value: ville,
                                    label: ville,
                                  }))}
                                  value={siegeVille}
                                  onValueChange={setSiegeVille}
                                  placeholder="Sélectionnez une ville"
                                  searchPlaceholder="Rechercher une ville..."
                                  emptyText="Aucune ville trouvée"
                                  className="w-full min-w-[300px]"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Séparateur moderne */}
                      <div className="border-t-2 border-gray-100 my-8"></div>

                      {/* SECTION: Zones d'intervention (pour Membres non-institutionnels) */}
                      {(selectedAdhesionType === "individuel" ||
                        selectedAdhesionType === "entreprise" ||
                        selectedAdhesionType === "associatif") && (
                        <>
                          <div id="zones-section" className="pb-8 p-6 bg-gradient-to-br from-white to-orange-50/30 rounded-2xl border-2 border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-3 mb-6">
                              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cpu-orange/10">
                                <MapPin className="h-5 w-5 text-cpu-orange" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900">
                                  Zones d'intervention
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  Indiquez votre couverture géographique pour mieux vous référencer
                                </p>
                              </div>
                            </div>

                            <div className="space-y-5">
                              <div className="space-y-3">
                                <Label
                                  htmlFor="interventionScope"
                                  className="text-sm font-semibold text-gray-700"
                                >
                                  Portée de l'intervention
                                </Label>
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
                                    <SelectItem value="national">
                                      National
                                    </SelectItem>
                                    <SelectItem value="regions_specifiques">
                                      Régions spécifiques
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              {/* Liste des régions en checkboxes */}
                              {interventionScope === "regions_specifiques" && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <Label className="text-base font-bold text-gray-900">
                                        Sélectionnez les régions
                                      </Label>
                                      <p className="text-sm text-gray-600 mt-1">
                                        Cochez toutes les régions dans
                                        lesquelles vous intervenez
                                      </p>
                                    </div>
                                    {!isLoadingRegions && getAvailableRegions().length > 0 && (
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={toggleAllRegions}
                                        className="border-2 border-cpu-orange text-cpu-orange hover:bg-cpu-orange hover:text-white font-semibold rounded-lg transition-all cursor-pointer"
                                      >
                                        {selectedRegions.length ===
                                        getAvailableRegions().length
                                          ? "Tout décocher"
                                          : "Tout sélectionner"}
                                      </Button>
                                    )}
                                  </div>

                                  {isLoadingRegions ? (
                                    <div className="p-6 border-2 border-gray-100 rounded-2xl bg-gray-50 text-center text-gray-500 font-medium">
                                      Chargement des régions...
                                    </div>
                                  ) : errorRegions ? (
                                    <div className="p-6 border-2 border-red-200 rounded-2xl bg-red-50 text-red-600">
                                      <div className="font-bold mb-2">
                                        Erreur de chargement
                                      </div>
                                      <div className="text-sm">
                                        {errorRegions.message ||
                                          "Impossible de charger les régions"}
                                      </div>
                                      {"status" in errorRegions &&
                                        typeof errorRegions.status ===
                                          "number" && (
                                          <div className="text-xs mt-2 opacity-75">
                                            Code: {errorRegions.status}
                                          </div>
                                        )}
                                    </div>
                                  ) : getAvailableRegions().length === 0 ? (
                                    <div className="p-6 border-2 border-gray-200 rounded-2xl bg-gray-50 text-center text-gray-600 font-medium">
                                      Aucune région existante
                                    </div>
                                  ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-6 border-2 border-gray-100 rounded-2xl bg-gradient-to-br from-gray-50 to-white max-h-96 overflow-y-auto shadow-sm">
                                      {getAvailableRegions().map((region) => (
                                        <div
                                          key={region}
                                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white transition-colors"
                                        >
                                          <input
                                            type="checkbox"
                                            id={`region-${region}`}
                                            checked={selectedRegions.includes(
                                              region
                                            )}
                                            onChange={() =>
                                              toggleRegion(region)
                                            }
                                            className="h-5 w-5 border-2 border-cpu-orange rounded-md focus:ring-2 focus:ring-cpu-orange focus:ring-offset-0 mt-0.5 cursor-pointer checked:bg-cpu-orange checked:border-cpu-orange transition-all"
                                            style={{
                                              accentColor: "#F27A20",
                                              colorScheme: "light",
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
                                        {selectedRegions.length} région
                                        {selectedRegions.length > 1
                                          ? "s"
                                          : ""}{" "}
                                        sélectionnée
                                        {selectedRegions.length > 1 ? "s" : ""}
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
                          <div className="pb-8 p-6 bg-gradient-to-br from-white to-orange-50/30 rounded-2xl border-2 border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-3 mb-6">
                              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cpu-orange/10">
                                <MapPin className="h-5 w-5 text-cpu-orange" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                  Zones d'intervention
                                  <span className="text-red-500 text-lg">*</span>
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  Indiquez votre couverture géographique en Côte d'Ivoire
                                </p>
                              </div>
                              {selectedRegions.length > 0 && (
                                <Badge className="bg-cpu-orange text-white px-3 py-1.5 text-sm font-semibold animate-in zoom-in duration-200">
                                  {selectedRegions.length} région{selectedRegions.length > 1 ? 's' : ''}
                                </Badge>
                              )}
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                                <div className="flex items-center gap-2">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="max-w-xs">Sélectionnez toutes les régions où votre institution est active</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                  <p className="text-sm text-gray-600 font-medium">
                                    Cochez toutes les régions concernées
                                  </p>
                                </div>
                                {!isLoadingRegions && getAvailableRegions().length > 0 && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={toggleAllRegions}
                                    className="border-2 border-cpu-orange text-cpu-orange hover:bg-cpu-orange hover:text-white font-semibold transition-colors"
                                  >
                                    {selectedRegions.length === getAvailableRegions().length
                                      ? "Tout décocher"
                                      : "Tout sélectionner"}
                                  </Button>
                                )}
                              </div>

                              {isLoadingRegions ? (
                                <div className="p-6 border-2 border-gray-100 rounded-2xl bg-gray-50 text-center text-gray-500 font-medium">
                                  Chargement des régions...
                                </div>
                              ) : errorRegions ? (
                                <div className="p-6 border-2 border-red-200 rounded-2xl bg-red-50 text-red-600">
                                  <div className="font-bold mb-2">Erreur de chargement</div>
                                  <div className="text-sm">
                                    {errorRegions.message || "Impossible de charger les régions"}
                                  </div>
                                </div>
                              ) : getAvailableRegions().length === 0 ? (
                                <div className="p-6 border-2 border-gray-200 rounded-2xl bg-gray-50 text-center text-gray-600 font-medium">
                                  Aucune région existante
                                </div>
                              ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 p-6 border-2 border-gray-100 rounded-xl bg-white max-h-96 overflow-y-auto shadow-inner">
                                  {getAvailableRegions().map((region) => (
                                    <div
                                      key={region}
                                      className="flex items-start space-x-2"
                                    >
                                      <input
                                        type="checkbox"
                                        id={`region-inst-${region}`}
                                        checked={selectedRegions.includes(
                                          region
                                        )}
                                        onChange={() => toggleRegion(region)}
                                        className="h-4 w-4 border-2 border-cpu-orange rounded focus:ring-2 focus:ring-cpu-orange focus:ring-offset-0 mt-0.5 cursor-pointer checked:bg-cpu-orange checked:border-cpu-orange"
                                        style={{
                                          accentColor: "#F27A20",
                                          colorScheme: "light",
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
                              )}

                              {selectedRegions.length > 0 && (
                                <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-100 animate-in slide-in-from-bottom-2 duration-300">
                                  <Check className="h-5 w-5 text-cpu-green" />
                                  <span className="font-bold text-cpu-green">
                                    {selectedRegions.length} région
                                    {selectedRegions.length > 1 ? "s" : ""}{" "}
                                    sélectionnée
                                    {selectedRegions.length > 1 ? "s" : ""}
                                  </span>
                                </div>
                              )}

                              {selectedRegions.length === 0 && (
                                <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
                                  <p className="text-sm text-orange-700 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                    <span className="font-medium">
                                      Veuillez sélectionner au moins une région d'intervention
                                    </span>
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Séparateur moderne */}
                          <div className="border-t-2 border-gray-100 my-8"></div>
                        </>
                      )}

                      {/* SECTION: Axes d'intérêt (pour Membre institutionnel uniquement) */}
                      {selectedAdhesionType === "institutionnel" && (
                        <>
                          <div className="pb-8 p-6 bg-gradient-to-br from-white to-orange-50/30 rounded-2xl border-2 border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-3 mb-6">
                              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cpu-orange/10">
                                <Target className="h-5 w-5 text-cpu-orange" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900">
                                  Axes d'intérêt
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  Sélectionnez vos domaines d'intervention prioritaires
                                </p>
                              </div>
                              {selectedAxesInteret.length > 0 && (
                                <Badge className="bg-cpu-orange text-white px-3 py-1.5 text-sm font-semibold animate-in zoom-in duration-200">
                                  {selectedAxesInteret.length} sélectionné{selectedAxesInteret.length > 1 ? 's' : ''}
                                </Badge>
                              )}
                            </div>

                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <Info className="h-4 w-4" />
                                Cochez un ou plusieurs axes
                              </p>
                              {!isLoadingCentresInteret && centresInteretApi.length > 0 && (
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={toggleAllAxes}
                                  className="border-2 border-cpu-orange text-cpu-orange hover:bg-cpu-orange hover:text-white font-semibold transition-colors"
                                >
                                  {selectedAxesInteret.length === centresInteretApi.length
                                    ? "Tout décocher"
                                    : "Tout sélectionner"}
                                </Button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-6 border-2 border-gray-100 rounded-xl bg-white max-h-80 overflow-y-auto">
                              {isLoadingCentresInteret ? (
                                <div className="col-span-3 flex items-center justify-center py-4">
                                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cpu-orange"></div>
                                  <span className="ml-2 text-gray-500">Chargement des axes d'intérêt...</span>
                                </div>
                              ) : errorCentresInteret ? (
                                <div className="col-span-3 p-4 border-2 border-red-200 rounded-xl bg-red-50 text-red-600 text-center">
                                  <div className="font-bold mb-1">Erreur de chargement</div>
                                  <div className="text-sm">{errorCentresInteret.message || "Impossible de charger les axes d'intérêt"}</div>
                                </div>
                              ) : centresInteretApi.length === 0 ? (
                                <div className="col-span-3 p-4 text-center text-gray-600 font-medium">
                                  Aucun axe d'intérêt existant
                                </div>
                              ) : (
                                centresInteretApi.map((ci) => (
                                  <div
                                    key={ci.id || ci.name}
                                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white transition-colors"
                                  >
                                    <input
                                      type="checkbox"
                                      id={`axe-${ci.name}`}
                                      checked={selectedAxesInteret.includes(ci.name)}
                                      onChange={() => {
                                        setSelectedAxesInteret((prev) =>
                                          prev.includes(ci.name)
                                            ? prev.filter((a) => a !== ci.name)
                                            : [...prev, ci.name]
                                        );
                                      }}
                                      className="h-5 w-5 border-2 border-cpu-orange rounded-md focus:ring-2 focus:ring-cpu-orange focus:ring-offset-0 mt-0.5 cursor-pointer checked:bg-cpu-orange checked:border-cpu-orange transition-all"
                                      style={{
                                        accentColor: "#F27A20",
                                        colorScheme: "light",
                                      }}
                                    />
                                    <Label
                                      htmlFor={`axe-${ci.name}`}
                                      className="text-sm cursor-pointer font-medium text-gray-700 leading-tight"
                                    >
                                      {ci.name}
                                    </Label>
                                  </div>
                                ))
                              )}
                            </div>

                            {selectedAxesInteret.length === 0 && (
                              <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
                                <p className="text-sm text-orange-700 flex items-center gap-2">
                                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                  <span className="font-medium">
                                    Veuillez sélectionner au moins un axe d'intérêt pour continuer
                                  </span>
                                </p>
                              </div>
                            )}

                            {selectedAxesInteret.length > 0 && selectedAxesInteret.length < 3 && (
                              <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                                <p className="text-xs text-gray-700 flex items-center gap-1">
                                  <Lightbulb className="h-3 w-3" />
                                  Vous pouvez sélectionner plusieurs axes pour maximiser vos opportunités
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Séparateur moderne */}
                          <div className="border-t-2 border-gray-100 my-8"></div>

                          {/* SECTION: Filières prioritaires (pour Membre institutionnel) */}
                          <div className="pb-8 p-6 bg-gradient-to-br from-white to-green-50/30 rounded-2xl border-2 border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-3 mb-6">
                              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cpu-green/10">
                                <Briefcase className="h-5 w-5 text-cpu-green" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900">
                                  Filières prioritaires
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  Les filières que vous accompagnez en priorité
                                </p>
                              </div>
                              {selectedFilieresPrioritaires.length > 0 && (
                                <Badge className="bg-cpu-green text-white px-3 py-1.5 text-sm font-semibold animate-in zoom-in duration-200">
                                  {selectedFilieresPrioritaires.length} sélectionnée{selectedFilieresPrioritaires.length > 1 ? 's' : ''}
                                </Badge>
                              )}
                            </div>

                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <Info className="h-4 w-4" />
                                Optionnel - Cochez une ou plusieurs filières
                              </p>
                              {!isLoadingSecteurs && getAvailableFilieres().length > 0 && (
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={toggleAllFilieres}
                                  className="border-2 border-cpu-green text-cpu-green hover:bg-cpu-green hover:text-white font-semibold transition-colors"
                                >
                                  {selectedFilieresPrioritaires.length === getAvailableFilieres().length
                                    ? "Tout décocher"
                                    : "Tout sélectionner"}
                                </Button>
                              )}
                            </div>

                            {isLoadingSecteurs ? (
                              <div className="p-6 border-2 border-gray-100 rounded-2xl bg-gray-50 text-center text-gray-500 font-medium">
                                Chargement des filières...
                              </div>
                            ) : errorSecteurs ? (
                              <div className="p-6 border-2 border-red-200 rounded-2xl bg-red-50 text-red-600">
                                <div className="font-bold mb-2">Erreur de chargement</div>
                                <div className="text-sm">
                                  {errorSecteurs.message || "Impossible de charger les filières"}
                                </div>
                              </div>
                            ) : getAvailableFilieres().length === 0 ? (
                              <div className="p-6 border-2 border-gray-200 rounded-2xl bg-gray-50 text-center text-gray-600 font-medium">
                                Aucune filière existante
                              </div>
                            ) : (
                              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-6 border-2 border-gray-100 rounded-xl bg-white max-h-80 overflow-y-auto">
                                {getAvailableFilieres().map((filiere) => (
                                <div
                                  key={filiere}
                                  className="flex items-start space-x-2"
                                >
                                  <input
                                    type="checkbox"
                                    id={`filiere-${filiere}`}
                                    checked={selectedFilieresPrioritaires.includes(
                                      filiere
                                    )}
                                    onChange={() => {
                                      setSelectedFilieresPrioritaires((prev) =>
                                        prev.includes(filiere)
                                          ? prev.filter((f) => f !== filiere)
                                          : [...prev, filiere]
                                      );
                                    }}
                                    className="h-4 w-4 border-2 border-cpu-orange rounded focus:ring-2 focus:ring-cpu-orange focus:ring-offset-0 mt-0.5 cursor-pointer checked:bg-cpu-orange checked:border-cpu-orange"
                                    style={{
                                      accentColor: "#F27A20",
                                      colorScheme: "light",
                                    }}
                                  />
                                  <Label
                                    htmlFor={`filiere-${filiere}`}
                                    className="text-sm cursor-pointer font-normal"
                                  >
                                    {filiere}
                                  </Label>
                                </div>
                              ))}
                              </div>
                            )}

                            {selectedFilieresPrioritaires.length > 0 && (
                              <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-100 mt-4 animate-in slide-in-from-bottom-2 duration-300">
                                <Check className="h-5 w-5 text-cpu-green" />
                                <span className="font-bold text-cpu-green">
                                  {selectedFilieresPrioritaires.length} filière
                                  {selectedFilieresPrioritaires.length > 1 ? "s" : ""}{" "}
                                  sélectionnée
                                  {selectedFilieresPrioritaires.length > 1 ? "s" : ""}
                                </span>
                              </div>
                            )}

                            {selectedFilieresPrioritaires.length === 0 && (
                              <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                                <p className="text-xs text-gray-700 flex items-center gap-1">
                                  <Lightbulb className="h-3 w-3" />
                                  Cette information est optionnelle mais recommandée pour mieux cibler nos services
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Séparateur moderne */}
                          <div className="border-t-2 border-gray-100 my-8"></div>
                        </>
                      )}

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
                          <Label
                            htmlFor="membershipPlan"
                            className="text-sm font-semibold text-gray-700"
                          >
                            Formule d'abonnement *
                          </Label>
                          <Select
                            value={selectedBadge}
                            onValueChange={setSelectedBadge}
                            required
                            disabled={!selectedAdhesionType}
                          >
                            <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-cpu-green/50 focus:border-cpu-green transition-colors rounded-xl bg-white text-gray-900 font-medium disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-50">
                              <SelectValue
                                placeholder={
                                  !selectedAdhesionType
                                    ? "Sélectionnez d'abord un type de membre"
                                    : "Choisissez une formule"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {getAvailablePlans().length > 0 ? (
                                getAvailablePlans().map((plan) => (
                                  <SelectItem
                                    key={plan.id || plan.name}
                                    value={plan.name}
                                  >
                                    {plan.surDevis
                                      ? `${plan.name} - ${plan.period}`
                                      : `${
                                          plan.name
                                        } - ${plan.priceYearly.toLocaleString(
                                          "fr-FR"
                                        )} ${plan.period}${
                                          plan.priceMonthly > 0
                                            ? ` / ${plan.priceMonthly.toLocaleString(
                                                "fr-FR"
                                              )} ${plan.period}/mois`
                                            : ""
                                        }`}
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

                      {/* Bouton de soumission */}
                      <div className="pt-6">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-14 bg-gradient-to-r from-cpu-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <Award className="h-6 w-6" />
                            {isSubmitting
                              ? "Envoi en cours..."
                              : "Soumettre ma demande"}
                          </span>
                        </Button>
                       
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
