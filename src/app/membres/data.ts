export interface Member {
    id: string;
    name: string;
    logo?: string;
    logoUrl?: string;
    sector: string;
    region: string;
    description: string;
    website?: string;
    featured?: boolean;
  }
  
  export const sectors = [
    "Agriculture & Agroalimentaire",
    "BTP & Construction",
    "Commerce & Distribution",
    "Industrie & Transformation",
    "Services & Conseil",
    "Technologie & Digital",
    "Transport & Logistique",
    "Tourisme & Hôtellerie",
    "Santé & Pharmaceutique",
    "Énergie & Environnement"
  ];
  
  export const regions = [
    "Abidjan",
    "Yamoussoukro",
    "Bouaké",
    "San-Pédro",
    "Korhogo",
    "Man",
    "Daloa",
    "Gagnoa",
    "Abengourou",
    "Divo"
  ];
  
  export const membersData: Member[] = [
    {
      id: "1",
      name: "Agro-Solutions CI",
      sector: "Agriculture & Agroalimentaire",
      region: "Abidjan",
      description: "Entreprise spécialisée dans la transformation de produits agricoles locaux et l'exportation de cacao et café de qualité premium.",
      logoUrl: "https://images.pexels.com/photos/174937/pexels-photo-174937.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true
    },
    {
      id: "2",
      name: "BatiPlus Construction",
      sector: "BTP & Construction",
      region: "Yamoussoukro",
      description: "Société de construction et de génie civil intervenant sur des projets d'infrastructure publique et privée.",
      logoUrl: "https://images.pexels.com/photos/3935683/pexels-photo-3935683.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true
    },
    {
      id: "3",
      name: "DigiTech Côte d'Ivoire",
      sector: "Technologie & Digital",
      region: "Abidjan",
      description: "Startup innovante dans le développement de solutions digitales pour les entreprises africaines.",
      logoUrl: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true
    },
    {
      id: "4",
      name: "TransLogis SARL",
      sector: "Transport & Logistique",
      region: "San-Pédro",
      description: "Entreprise de transport et logistique spécialisée dans le fret maritime et terrestre.",
      logoUrl: "https://images.pexels.com/photos/3952634/pexels-photo-3952634.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false
    },
    {
      id: "5",
      name: "Saveurs d'Ivoire",
      sector: "Commerce & Distribution",
      region: "Bouaké",
      description: "Distributeur de produits alimentaires locaux avec un réseau de points de vente dans tout le pays.",
      logoUrl: "https://images.pexels.com/photos/2531384/pexels-photo-2531384.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false
    },
    {
      id: "6",
      name: "EcoEnergy CI",
      sector: "Énergie & Environnement",
      region: "Abidjan",
      description: "Entreprise pionnière dans les énergies renouvelables et les solutions solaires pour entreprises et particuliers.",
      logoUrl: "https://images.pexels.com/photos/60561/solar-panel-array-sun-power-60561.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true
    },
    {
      id: "7",
      name: "Santé Plus Pharmacie",
      sector: "Santé & Pharmaceutique",
      region: "Korhogo",
      description: "Réseau de pharmacies et distribution de produits pharmaceutiques dans le nord du pays.",
      logoUrl: "https://images.pexels.com/photos/5632400/pexels-photo-5632400.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false
    },
    {
      id: "8",
      name: "Hôtel Baobab Resort",
      sector: "Tourisme & Hôtellerie",
      region: "Man",
      description: "Établissement hôtelier haut de gamme offrant des services touristiques dans la région des montagnes.",
      logoUrl: "https://images.pexels.com/photos/3629547/pexels-photo-3629547.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false
    },
    {
      id: "9",
      name: "ConseilPro Afrique",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Cabinet de conseil en stratégie et gestion d'entreprise pour PME et grandes entreprises.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true
    },
    {
      id: "10",
      name: "IndustriCI Manufacturing",
      sector: "Industrie & Transformation",
      region: "Daloa",
      description: "Unité industrielle de transformation de matières premières agricoles en produits finis.",
      logoUrl: "https://images.pexels.com/photos/2371555/pexels-photo-2371555.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false
    },
    {
      id: "11",
      name: "AgriTech Innovations",
      sector: "Agriculture & Agroalimentaire",
      region: "Gagnoa",
      description: "Solutions technologiques pour l'agriculture moderne et la gestion des exploitations agricoles.",
      logoUrl: "https://images.pexels.com/photos/5632400/pexels-photo-5632400.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false
    },
    {
      id: "12",
      name: "BuildersPro CI",
      sector: "BTP & Construction",
      region: "Abidjan",
      description: "Entreprise de promotion immobilière et construction de logements sociaux et commerciaux.",
      logoUrl: "https://images.pexels.com/photos/1454496/pexels-photo-1454496.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false
    }
  ];
  
  export interface MembershipBenefit {
    icon: string;
    title: string;
    description: string;
  }
  
  export const membershipBenefits: MembershipBenefit[] = [
    {
      icon: "network",
      title: "Réseau d'affaires",
      description: "Accédez à un réseau de plus de 1000 entreprises membres pour développer vos partenariats et opportunités commerciales."
    },
    {
      icon: "training",
      title: "Formations & Ateliers",
      description: "Bénéficiez de formations continues et d'ateliers pratiques pour renforcer vos compétences entrepreneuriales."
    },
    {
      icon: "finance",
      title: "Accès au financement",
      description: "Profitez de notre accompagnement pour accéder aux financements et aux programmes de soutien aux PME."
    },
    {
      icon: "advocacy",
      title: "Représentation & Plaidoyer",
      description: "Votre voix est portée auprès des institutions et décideurs pour défendre les intérêts des PME."
    },
    {
      icon: "marketplace",
      title: "Marketplace B2B",
      description: "Accédez à notre plateforme de mise en relation commerciale et aux appels d'offres réservés aux membres."
    },
    {
      icon: "support",
      title: "Accompagnement personnalisé",
      description: "Bénéficiez d'un suivi personnalisé et de conseils adaptés à vos besoins spécifiques."
    }
  ];
  
  export interface MembershipPlan {
    name: string;
    description: string;
    price: number;
    period: string;
    features: string[];
    recommended?: boolean;
  }
  
  export const membershipPlans: MembershipPlan[] = [
    {
      name: "Starter",
      description: "Idéal pour les petites entreprises qui découvrent le réseau.",
      price: 50000,
      period: "FCFA/an",
      features: [
        "Accès au réseau de base",
        "Newsletter mensuelle",
        "Participation aux événements",
        "Annuaire des membres",
        "Support par email"
      ]
    },
    {
      name: "Business",
      description: "Notre formule recommandée pour la plupart des PME.",
      price: 150000,
      period: "FCFA/an",
      features: [
        "Tous les avantages Starter",
        "Formations gratuites (2/an)",
        "Accès Marketplace B2B",
        "Visibilité sur le site web",
        "Accompagnement financement",
        "Support prioritaire"
      ],
      recommended: true
    },
    {
      name: "Premium",
      description: "L'offre complète pour les grandes entreprises ou les partenaires stratégiques.",
      price: 300000,
      period: "FCFA/an",
      features: [
        "Tous les avantages Business",
        "Formations illimitées",
        "Mise en avant premium",
        "Accès aux appels d'offres",
        "Conseil juridique inclus",
        "Accompagnement VIP",
        "Événements exclusifs"
      ]
    }
  ];
  