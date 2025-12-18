// Types de membres selon la nouvelle structure (4 types principaux)
export type MemberType = 
  | "individuel"      // Membre Individuel (personne physique)
  | "entreprise"      // Membre Entreprise (PME)
  | "associatif"      // Membre Associatif / Organisation Collective
  | "institutionnel"; // Membre Institutionnel

// Sous-profils pour segmentation interne (non visibles comme types)
export type IndividualSubProfile = 
  | "jeune_etudiant"
  | "entrepreneur_projet"
  | "professionnel_expert"
  | "salarie_cadre";

export type EnterpriseSubProfile = 
  | "micro_entreprise"
  | "petite_entreprise"
  | "moyenne_entreprise"
  | "startup";

export type AssociativeSubProfile = 
  | "cooperative"
  | "federation_filiere"
  | "association_professionnelle"
  | "groupement_gie";

export type InstitutionalSubProfile = 
  | "grande_entreprise"
  | "banque"
  | "assureur"
  | "bailleur"
  | "agence_publique"
  | "collectivite"
  | "programme_international";

export type MemberBadge = 
  | "Basic" 
  | "Argent" 
  | "Or" 
  | "Institutionnel";

export interface Member {
    id: string;
    name: string;
    logo?: string;
    logoUrl?: string;
    sector: string; // Chaque membre appartient à UN SEUL secteur
    region: string;
    description: string;
    website?: string;
    featured?: boolean;
    memberType: MemberType; // Chaque membre a UN SEUL type de membre (individuel, entreprise, associatif, ou institutionnel)
    badge?: MemberBadge;
    // Champs pour la chaîne d'appartenance (relations)
    affiliatedTo?: string; // ID de l'organisation à laquelle le membre est affilié
    subProfile?: IndividualSubProfile | EnterpriseSubProfile | AssociativeSubProfile | InstitutionalSubProfile;
  }
  
  export const memberTypes: { value: MemberType; label: string }[] = [
    { value: "individuel", label: "Membre Individuel" },
    { value: "entreprise", label: "Membre Entreprise" },
    { value: "associatif", label: "Membre Associatif / Organisation Collective" },
    { value: "institutionnel", label: "Membre Institutionnel" },
  ];
  
  export const memberBadges: MemberBadge[] = [
    "Basic",
    "Argent",
    "Or",
    "Institutionnel",
  ];
  
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
    // ========== MEMBRES ENTREPRISE ==========
    {
      id: "1",
      name: "Agro-Solutions CI",
      sector: "Agriculture & Agroalimentaire",
      region: "Abidjan",
      description: "Entreprise spécialisée dans la transformation de produits agricoles locaux et l'exportation de cacao et café de qualité premium.",
      logoUrl: "https://images.pexels.com/photos/174937/pexels-photo-174937.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true,
      memberType: "entreprise",
      subProfile: "moyenne_entreprise",
      badge: "Basic"
    },
    {
      id: "2",
      name: "BatiPlus Construction",
      sector: "BTP & Construction",
      region: "Yamoussoukro",
      description: "Société de construction et de génie civil intervenant sur des projets d'infrastructure publique et privée.",
      logoUrl: "https://images.pexels.com/photos/3935683/pexels-photo-3935683.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true,
      memberType: "entreprise",
      subProfile: "moyenne_entreprise",
      badge: "Argent"
    },
    {
      id: "3",
      name: "DigiTech Côte d'Ivoire",
      sector: "Technologie & Digital",
      region: "Abidjan",
      description: "Startup innovante dans le développement de solutions digitales pour les entreprises africaines.",
      logoUrl: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true,
      memberType: "entreprise",
      subProfile: "startup",
      badge: "Basic"
    },
    {
      id: "4",
      name: "TransLogis SARL",
      sector: "Transport & Logistique",
      region: "San-Pédro",
      description: "Entreprise de transport et logistique spécialisée dans le fret maritime et terrestre.",
      logoUrl: "https://images.pexels.com/photos/3952634/pexels-photo-3952634.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "entreprise",
      subProfile: "petite_entreprise",
      badge: "Basic"
    },
    {
      id: "5",
      name: "Saveurs d'Ivoire",
      sector: "Commerce & Distribution",
      region: "Bouaké",
      description: "Distributeur de produits alimentaires locaux avec un réseau de points de vente dans tout le pays.",
      logoUrl: "https://images.pexels.com/photos/2531384/pexels-photo-2531384.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "entreprise",
      subProfile: "petite_entreprise",
      badge: "Basic"
    },
    {
      id: "7",
      name: "Santé Plus Pharmacie",
      sector: "Santé & Pharmaceutique",
      region: "Korhogo",
      description: "Réseau de pharmacies et distribution de produits pharmaceutiques dans le nord du pays.",
      logoUrl: "https://images.pexels.com/photos/5632400/pexels-photo-5632400.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "entreprise",
      subProfile: "petite_entreprise",
      badge: "Basic"
    },
    {
      id: "8",
      name: "Hôtel Baobab Resort",
      sector: "Tourisme & Hôtellerie",
      region: "Man",
      description: "Établissement hôtelier haut de gamme offrant des services touristiques dans la région des montagnes.",
      logoUrl: "https://images.pexels.com/photos/3629547/pexels-photo-3629547.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "entreprise",
      subProfile: "petite_entreprise",
      badge: "Basic"
    },
    {
      id: "11",
      name: "AgriTech Innovations",
      sector: "Agriculture & Agroalimentaire",
      region: "Gagnoa",
      description: "Solutions technologiques pour l'agriculture moderne et la gestion des exploitations agricoles.",
      logoUrl: "https://images.pexels.com/photos/5632400/pexels-photo-5632400.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "entreprise",
      subProfile: "petite_entreprise",
      badge: "Basic"
    },
    {
      id: "12",
      name: "BuildersPro CI",
      sector: "BTP & Construction",
      region: "Abidjan",
      description: "Entreprise de promotion immobilière et construction de logements sociaux et commerciaux.",
      logoUrl: "https://images.pexels.com/photos/1454496/pexels-photo-1454496.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "entreprise",
      subProfile: "petite_entreprise",
      badge: "Basic"
    },
    {
      id: "13",
      name: "Textile Ivoirien SARL",
      sector: "Industrie & Transformation",
      region: "Abidjan",
      description: "Fabrication de textiles et vêtements locaux avec une approche éco-responsable.",
      logoUrl: "https://images.pexels.com/photos/2531384/pexels-photo-2531384.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "entreprise",
      subProfile: "petite_entreprise",
      badge: "Basic"
    },
    {
      id: "14",
      name: "Café d'Excellence CI",
      sector: "Agriculture & Agroalimentaire",
      region: "Daloa",
      description: "Torréfaction artisanale et exportation de café de spécialité ivoirien.",
      logoUrl: "https://images.pexels.com/photos/174937/pexels-photo-174937.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "entreprise",
      subProfile: "petite_entreprise",
      badge: "Basic"
    },

    // ========== MEMBRES INSTITUTIONNELS ==========
    {
      id: "6",
      name: "EcoEnergy CI",
      sector: "Énergie & Environnement",
      region: "Abidjan",
      description: "Entreprise pionnière dans les énergies renouvelables et les solutions solaires pour entreprises et particuliers.",
      logoUrl: "https://images.pexels.com/photos/60561/solar-panel-array-sun-power-60561.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true,
      memberType: "institutionnel",
      subProfile: "grande_entreprise",
      badge: "Argent"
    },
    {
      id: "10",
      name: "IndustriCI Manufacturing",
      sector: "Industrie & Transformation",
      region: "Daloa",
      description: "Unité industrielle de transformation de matières premières agricoles en produits finis.",
      logoUrl: "https://images.pexels.com/photos/2371555/pexels-photo-2371555.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "institutionnel",
      subProfile: "grande_entreprise",
      badge: "Basic"
    },
    {
      id: "15",
      name: "Grands Moulins de Côte d'Ivoire",
      sector: "Industrie & Transformation",
      region: "Abidjan",
      description: "Leader dans la transformation céréalière et la production de farine pour le marché ivoirien et régional.",
      logoUrl: "https://images.pexels.com/photos/2371555/pexels-photo-2371555.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true,
      memberType: "institutionnel",
      subProfile: "grande_entreprise",
      badge: "Argent"
    },
    {
      id: "16",
      name: "Banque Commerciale Ouest-Africaine",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Institution bancaire majeure soutenant le développement des PME ivoiriennes.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "institutionnel",
      subProfile: "banque",
      badge: "Argent"
    },
    {
      id: "17",
      name: "Groupe Distribution Afrique",
      sector: "Commerce & Distribution",
      region: "Abidjan",
      description: "Réseau de distribution majeur avec présence dans toute la Côte d'Ivoire et la sous-région.",
      logoUrl: "https://images.pexels.com/photos/2531384/pexels-photo-2531384.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "institutionnel",
      subProfile: "grande_entreprise",
      badge: "Basic"
    },

    // ========== INSTITUTIONNELS ==========
    {
      id: "18",
      name: "Agence de Promotion des Investissements Privés",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Institution publique chargée de promouvoir les investissements et d'accompagner les entreprises.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true,
      memberType: "institutionnel",
      badge: "Basic"
    },
    {
      id: "19",
      name: "Fonds de Développement de l'Entrepreneuriat National",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Organisme public de financement et d'accompagnement des PME et startups ivoiriennes.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "institutionnel",
      badge: "Basic"
    },
    {
      id: "20",
      name: "Ministère du Commerce et de l'Industrie",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Ministère en charge de la politique commerciale et industrielle de la Côte d'Ivoire.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "institutionnel",
      badge: "Basic"
    },
    {
      id: "21",
      name: "Banque Africaine de Développement",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Institution financière panafricaine soutenant le développement économique du continent.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true,
      memberType: "institutionnel",
      badge: "Argent"
    },

    // ========== PARTENAIRES STRATÉGIQUES ==========
    {
      id: "22",
      name: "Chambre de Commerce et d'Industrie de Côte d'Ivoire",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Institution représentative des entreprises ivoiriennes, partenaire clé pour le développement économique.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true,
      memberType: "associatif",
      subProfile: "association_professionnelle",
      badge: "Argent"
    },
    {
      id: "23",
      name: "Réseau Entreprendre Côte d'Ivoire",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Réseau d'entrepreneurs expérimentés accompagnant les jeunes entreprises dans leur développement.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "associatif",
      subProfile: "association_professionnelle",
      badge: "Basic"
    },
    {
      id: "24",
      name: "ONG Développement Durable Afrique",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Organisation non gouvernementale spécialisée dans l'accompagnement des entreprises sociales et durables.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "associatif",
      subProfile: "association_professionnelle",
      badge: "Basic"
    },
    {
      id: "25",
      name: "Confédération Générale des Entreprises de Côte d'Ivoire",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Organisation patronale majeure représentant les intérêts des entreprises ivoiriennes.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "associatif",
      subProfile: "association_professionnelle",
      badge: "Argent"
    },

    // ========== MEMBRES INDIVIDUELS ==========
    {
      id: "9",
      name: "ConseilPro Afrique",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Cabinet de conseil en stratégie et gestion d'entreprise pour PME et grandes entreprises.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true,
      memberType: "individuel",
      subProfile: "professionnel_expert",
      badge: "Basic"
    },
    {
      id: "26",
      name: "Expert-Comptable Associés CI",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Cabinet d'expertise comptable et de conseil fiscal pour entreprises et entrepreneurs.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "individuel",
      subProfile: "professionnel_expert",
      badge: "Basic"
    },
    {
      id: "27",
      name: "Stratégie & Innovation Consulting",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Cabinet spécialisé dans l'innovation, la transformation digitale et la stratégie d'entreprise.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "individuel",
      subProfile: "professionnel_expert",
      badge: "Argent"
    },
    {
      id: "28",
      name: "Formation & Développement Compétences",
      sector: "Services & Conseil",
      region: "Bouaké",
      description: "Organisme de formation professionnelle et développement des compétences managériales.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "individuel",
      subProfile: "professionnel_expert",
      badge: "Basic"
    },

    // ========== DIASPORA ==========
    {
      id: "29",
      name: "Investisseurs Diaspora Côte d'Ivoire",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Réseau de membres de la diaspora investissant dans des projets entrepreneuriaux en Côte d'Ivoire.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true,
      memberType: "individuel",
      subProfile: "professionnel_expert",
      badge: "Basic"
    },
    {
      id: "30",
      name: "Tech Diaspora CI",
      sector: "Technologie & Digital",
      region: "Abidjan",
      description: "Entrepreneurs de la diaspora spécialisés dans les technologies et l'innovation digitale.",
      logoUrl: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "individuel",
      subProfile: "professionnel_expert",
      badge: "Argent"
    },
    {
      id: "31",
      name: "Diaspora Business Network",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Plateforme de mise en relation entre entrepreneurs de la diaspora et PME locales.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "individuel",
      subProfile: "professionnel_expert",
      badge: "Basic"
    },
    {
      id: "32",
      name: "Mentoring Diaspora CI",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Programme de mentorat par des professionnels de la diaspora pour jeunes entrepreneurs ivoiriens.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "individuel",
      subProfile: "professionnel_expert",
      badge: "Basic"
    },

    {
      id: "33",
      name: "Junior Entreprise Université Félix Houphouët-Boigny",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Association étudiante proposant des services de conseil et études aux entreprises.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "individuel",
      subProfile: "jeune_etudiant",
      badge: "Basic"
    },
    {
      id: "34",
      name: "Startup Academy CI",
      sector: "Technologie & Digital",
      region: "Abidjan",
      description: "Programme d'incubation pour jeunes entrepreneurs et étudiants porteurs de projets innovants.",
      logoUrl: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true,
      memberType: "individuel",
      subProfile: "entrepreneur_projet",
      badge: "Basic"
    },
    {
      id: "35",
      name: "Club Entrepreneuriat Étudiant",
      sector: "Services & Conseil",
      region: "Yamoussoukro",
      description: "Association étudiante promouvant l'entrepreneuriat et organisant des événements de networking.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "individuel",
      subProfile: "jeune_etudiant",
      badge: "Basic"
    },
    {
      id: "36",
      name: "Jeunes Entrepreneurs Tech CI",
      sector: "Technologie & Digital",
      region: "Abidjan",
      description: "Collectif de jeunes développeurs et entrepreneurs tech créant des solutions innovantes.",
      logoUrl: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "individuel",
      subProfile: "jeune_etudiant",
      badge: "Basic"
    },

    // ========== MEMBRES ASSOCIATIFS / ORGANISATIONS COLLECTIVES ==========
    {
      id: "37",
      name: "Coopérative Agricole du Centre",
      sector: "Agriculture & Agroalimentaire",
      region: "Yamoussoukro",
      description: "Coopérative regroupant des producteurs agricoles pour la commercialisation collective de leurs produits.",
      logoUrl: "https://images.pexels.com/photos/174937/pexels-photo-174937.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true,
      memberType: "associatif",
      subProfile: "cooperative",
      badge: "Basic"
    },
    {
      id: "38",
      name: "Union des Artisans de Côte d'Ivoire",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Association fédérant les artisans et promoteurs de l'artisanat traditionnel et moderne.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "associatif",
      subProfile: "association_professionnelle",
      badge: "Basic"
    },
    {
      id: "39",
      name: "Coopérative des Femmes Entrepreneures",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Réseau de femmes entrepreneures mutualisant leurs ressources et compétences pour développer leurs activités.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "associatif",
      subProfile: "cooperative",
      badge: "Argent"
    },
    {
      id: "40",
      name: "Association des Petits Commerçants",
      sector: "Commerce & Distribution",
      region: "Bouaké",
      description: "Organisation défendant les intérêts des petits commerçants et facilitant leur structuration.",
      logoUrl: "https://images.pexels.com/photos/2531384/pexels-photo-2531384.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "associatif",
      subProfile: "cooperative",
      badge: "Basic"
    },

    // ========== PREMIUM / AMBASSADEURS ==========
    {
      id: "41",
      name: "Ambassadeur Entrepreneuriat CI",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Personnalité reconnue du monde entrepreneurial, ambassadeur de l'écosystème PME ivoirien.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true,
      memberType: "entreprise",
      subProfile: "moyenne_entreprise",
      badge: "Or"
    },
    {
      id: "42",
      name: "Champion Innovation Côte d'Ivoire",
      sector: "Technologie & Digital",
      region: "Abidjan",
      description: "Entrepreneur innovant reconnu pour ses contributions au développement de l'écosystème tech ivoirien.",
      logoUrl: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true,
      memberType: "entreprise",
      subProfile: "moyenne_entreprise",
      badge: "Or"
    },
    {
      id: "43",
      name: "Leader Industriel Premium",
      sector: "Industrie & Transformation",
      region: "Abidjan",
      description: "Dirigeant d'entreprise majeur, partenaire stratégique et ambassadeur de la CPU-PME.",
      logoUrl: "https://images.pexels.com/photos/2371555/pexels-photo-2371555.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "entreprise",
      subProfile: "moyenne_entreprise",
      badge: "Argent"
    },
    {
      id: "44",
      name: "Mentor Premium CPU-PME",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Expert reconnu accompagnant activement les PME membres et portant les valeurs de la CPU-PME.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "entreprise",
      subProfile: "moyenne_entreprise",
      badge: "Or"
    },

    // ========== HONORAIRES ==========
    {
      id: "45",
      name: "Membre d'Honneur CPU-PME",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Personnalité éminente reconnue pour son engagement exceptionnel en faveur de l'entrepreneuriat ivoirien.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true,
      memberType: "individuel",
      subProfile: "professionnel_expert",
      badge: "Institutionnel"
    },
    {
      id: "46",
      name: "Pionnier Entrepreneuriat CI",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Figure historique de l'entrepreneuriat ivoirien, membre d'honneur de la CPU-PME.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "individuel",
      subProfile: "professionnel_expert",
      badge: "Institutionnel"
    },
    {
      id: "47",
      name: "Grand Témoin CPU-PME",
      sector: "Services & Conseil",
      region: "Abidjan",
      description: "Personnalité publique reconnue pour son engagement et son soutien à la cause des PME ivoiriennes.",
      logoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: false,
      memberType: "individuel",
      subProfile: "professionnel_expert",
      badge: "Institutionnel"
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
    priceMonthly: number;
    priceYearly: number;
    period: string;
    features: string[];
    recommended?: boolean;
    isInstitutional?: boolean; // Pour le plan Institutionnel (sur devis)
  }
  
  export const membershipPlans: MembershipPlan[] = [
    {
      name: "Basic",
      description: "Accès de base au réseau et aux services essentiels.",
      priceMonthly: 1000,
      priceYearly: 10000,
      period: "FCFA",
      features: [
        "Accès au réseau de base",
        "Newsletter mensuelle",
        "Participation aux événements",
        "Annuaire des membres",
        "Support par email",
        "Accès aux formations de base"
      ]
    },
    {
      name: "Argent",
      description: "Notre formule recommandée pour la plupart des membres.",
      priceMonthly: 5000,
      priceYearly: 50000,
      period: "FCFA",
      features: [
        "Tous les avantages Basic",
        "Formations gratuites (2/an)",
        "Accès Marketplace B2B",
        "Visibilité sur le site web",
        "Accompagnement financement",
        "Support prioritaire",
        "Accès aux webinaires exclusifs"
      ],
      recommended: true
    },
    {
      name: "Or",
      description: "L'offre complète pour les membres actifs et les organisations.",
      priceMonthly: 10000,
      priceYearly: 100000,
      period: "FCFA",
      features: [
        "Tous les avantages Argent",
        "Formations illimitées",
        "Mise en avant premium",
        "Accès aux appels d'offres",
        "Conseil juridique inclus",
        "Accompagnement VIP",
        "Événements exclusifs",
        "Accès aux outils de gestion avancés"
      ]
    },
    {
      name: "Institutionnel",
      description: "Solution sur mesure pour les grandes organisations et institutions.",
      priceMonthly: 0,
      priceYearly: 5000000, // À partir de 5 000 000 FCFA/an
      period: "FCFA/an (sur devis)",
      features: [
        "Tous les avantages Or",
        "Accès multi-utilisateurs",
        "Formations sur mesure",
        "Accompagnement dédié",
        "Statistiques et reporting avancés",
        "Intégration API",
        "Support 24/7",
        "Événements privés"
      ],
      isInstitutional: true
    }
  ];
  