// app/secteur/data.ts
// Structure mise à jour selon CPU-PME Organisation sectoriel V4
// N1: Secteurs → N2: Filières → N3: Sous-filières → N4: Corps de métiers / activités types

// --- DÉFINITION DES TYPES ---

// Niveau 4 : Les tags individuels (corps de métiers)
type TagList = string[]; 

// Niveau 3 : Les sections de tags (sous-filières)
interface TagSection {
  titre: string; 
  tags: TagList;
}

// Niveau 2 : La sous-catégorie qui s'ouvre (sous-filières regroupées)
interface SousCategorieDetail {
  nom: string;
  sectionsDeTags: TagSection[]; 
}

// Niveau 1 : La filière (N2)
interface Filiere {
  id: string;
  nom: string;
  sousCategories: SousCategorieDetail[];
}

interface SecteurData {
  id: 'primaire' | 'secondaire' | 'tertiaire' | 'quaternaire' | 'transversales';
  nom: string;
  titreComplet: string;
  filieres: Filiere[];
}

// --- DONNÉES COMPLÈTES ---

export const secteursData: Record<string, SecteurData> = {
  
  // ========================================================================
  // N1-PRI — SECTEUR PRIMAIRE : Agriculture, Élevage, Pêche & Aquaculture
  // ========================================================================
  primaire: {
    id: "primaire",
    nom: "Secteur Primaire",
    titreComplet: "SECTEUR PRIMAIRE : Agriculture, Élevage, Pêche & Aquaculture",
    filieres: [
      {
        id: "pri-agr",
        nom: "Agriculture végétale",
        sousCategories: [
          {
            nom: "Céréales & légumineuses",
            sectionsDeTags: [
              {
                titre: "Céréales & légumineuses",
                tags: ["Riziculture", "Maïsiculture", "Mil/sorgho", "Soja", "Niébé", "Transformation primaire de grains", "Production de semences locales"]
              }
            ]
              },
              {
            nom: "Racines, tubercules & plantain",
            sectionsDeTags: [
              {
                titre: "Racines, tubercules & plantain",
                tags: ["Manioc", "Igname", "Patate douce", "Banane plantain", "Semences/vivriers locaux", "Petites unités de conditionnement"]
              }
            ]
          },
          {
            nom: "Maraîchage & horticulture",
            sectionsDeTags: [
              {
                titre: "Maraîchage & horticulture",
                tags: ["Production sous serre", "Pépinières", "Légumes frais", "Herbes aromatiques", "Horticulture ornementale", "Irrigation de proximité"]
              }
            ]
              },
              {
            nom: "Fruits tropicaux & export",
            sectionsDeTags: [
              {
                titre: "Fruits tropicaux & export",
                tags: ["Ananas", "Mangue", "Banane dessert", "Agrumes", "Papaye", "Conditionnement", "Stations de lavage", "Certification"]
              }
            ]
          },
          {
            nom: "Cultures de rente",
            sectionsDeTags: [
              {
                titre: "Cultures de rente",
                tags: ["Cacao", "Café", "Anacarde", "Coton", "Hévéa", "Palmier à huile", "Karité", "Coco", "Coopératives", "Services de collecte"]
              }
            ]
          },
          {
            nom: "Plantes aromatiques, médicinales & épices",
            sectionsDeTags: [
              {
                titre: "Plantes aromatiques, médicinales & épices",
                tags: ["Gingembre", "Curcuma", "Piment sec", "Plantes médicinales", "Séchage", "Herboristerie encadrée"]
              }
            ]
          },
          {
            nom: "Agriculture durable",
            sectionsDeTags: [
              {
                titre: "Agriculture durable",
                tags: ["Bio", "Agroforesterie", "Compostage", "Services de conseil climato-intelligent"]
              }
            ]
          }
        ]
      },
      {
        id: "pri-ele",
        nom: "Élevage & productions animales",
        sousCategories: [
          {
            nom: "Bovin & lait",
            sectionsDeTags: [
              {
                titre: "Bovin & lait",
                tags: ["Élevage viande", "Mini-laiteries", "Collecte de lait", "Alimentation animale"]
              }
            ]
          },
          {
            nom: "Ovin-caprin",
            sectionsDeTags: [
              {
                titre: "Ovin-caprin",
                tags: ["Élevage", "Engraissement", "Abattage de proximité autorisé", "Boucherie traditionnelle"]
              }
            ]
          },
          {
            nom: "Porcin",
            sectionsDeTags: [
              {
                titre: "Porcin",
                tags: ["Élevage", "Alimentation porcine", "Transformation artisanale"]
              }
            ]
          },
          {
            nom: "Aviculture",
            sectionsDeTags: [
              {
                titre: "Aviculture",
                tags: ["Ponte", "Chair", "Couvoirs", "Aliments volaille", "Distribution d'intrants avicoles"]
              }
            ]
          },
          {
            nom: "Élevages alternatifs",
            sectionsDeTags: [
              {
                titre: "Élevages alternatifs",
                tags: ["Apiculture", "Cuniculture", "Aulacodiculture", "Escargots", "Production de miel et dérivés"]
              }
            ]
          }
        ]
      },
      {
        id: "pri-pec",
        nom: "Pêche & aquaculture",
        sousCategories: [
          {
            nom: "Pêche artisanale maritime",
            sectionsDeTags: [
              {
                titre: "Pêche artisanale maritime",
                tags: ["Armement artisanal", "Mareyage", "Fumage et conservation"]
              }
            ]
          },
          {
            nom: "Pêche lagunaire & continentale",
            sectionsDeTags: [
              {
                titre: "Pêche lagunaire & continentale",
                tags: ["Pêche de proximité", "Transformation artisanale"]
              }
            ]
          },
          {
            nom: "Aquaculture & pisciculture",
            sectionsDeTags: [
              {
                titre: "Aquaculture & pisciculture",
                tags: ["Bassins", "Cages", "Écloseries", "Alimentation poisson", "Distribution d'alevins"]
              }
            ]
          }
        ]
      },
      {
        id: "pri-agt",
        nom: "Services, intrants & AgriTech",
        sousCategories: [
          {
            nom: "Intrants agricoles",
            sectionsDeTags: [
              {
                titre: "Intrants agricoles",
                tags: ["Semences", "Engrais", "Phytosanitaires", "Biopesticides", "Distribution locale"]
              }
            ]
          },
          {
            nom: "Mécanisation & maintenance",
            sectionsDeTags: [
              {
                titre: "Mécanisation & maintenance",
                tags: ["Location de tracteurs", "Ateliers de réparation", "Pièces détachées"]
              }
            ]
          },
          {
            nom: "Irrigation & eau agricole",
            sectionsDeTags: [
              {
                titre: "Irrigation & eau agricole",
                tags: ["Pompes", "Goutte-à-goutte", "Forages agricoles (selon agréments)"]
              }
            ]
          },
          {
            nom: "AgriTech & données",
            sectionsDeTags: [
              {
                titre: "AgriTech & données",
                tags: ["Applications coopératives", "Drones", "Services météo/assurance indexée"]
              }
            ]
          },
          {
            nom: "Logistique agricole",
            sectionsDeTags: [
              {
                titre: "Logistique agricole",
                tags: ["Collecte", "Stockage", "Silos", "Chaîne du froid agricole"]
              }
            ]
          }
        ]
      },
      {
        id: "pri-agx",
        nom: "Agro-transformation & agroalimentaire PME",
        sousCategories: [
          {
            nom: "Manioc & dérivés",
            sectionsDeTags: [
              {
                titre: "Manioc & dérivés",
                tags: ["Attiéké", "Gari", "Placali", "Amidon", "Emballage"]
              }
            ]
          },
          {
            nom: "Céréales & farines",
            sectionsDeTags: [
              {
                titre: "Céréales & farines",
                tags: ["Minoteries PME", "Farines enrichies", "Semoules"]
              }
            ]
          },
          {
            nom: "Fruits & légumes transformés",
            sectionsDeTags: [
              {
                titre: "Fruits & légumes transformés",
                tags: ["Jus", "Confitures", "Séchage", "Conserves"]
              }
            ]
          },
          {
            nom: "Huiles & oléagineux",
            sectionsDeTags: [
              {
                titre: "Huiles & oléagineux",
                tags: ["Palme", "Coco", "Karité", "Arachide", "Raffinage léger"]
              }
            ]
          },
          {
            nom: "Cacao/anacarde transformés",
            sectionsDeTags: [
              {
                titre: "Cacao/anacarde transformés",
                tags: ["Chocolaterie PME", "Pâte/beurre/poudre", "Décorticage cajou"]
              }
            ]
          },
          {
            nom: "Viandes, poissons & produits laitiers",
            sectionsDeTags: [
              {
                titre: "Viandes, poissons & produits laitiers",
                tags: ["Fumage", "Séchage", "Charcuterie artisanale", "Yaourts locaux"]
              }
            ]
          },
          {
            nom: "Boissons locales & artisanales",
            sectionsDeTags: [
              {
                titre: "Boissons locales & artisanales",
                tags: ["Bissap", "Gnamankoudji", "Bandji", "Conditionnement conforme"]
              }
            ]
          },
          {
            nom: "Boulangerie, pâtisserie & confiserie",
            sectionsDeTags: [
              {
                titre: "Boulangerie, pâtisserie & confiserie",
                tags: ["Boulangeries de quartier", "Pâtisseries", "Snacks structurés"]
              }
            ]
          },
          {
            nom: "Aliments pour bétail & volaille",
            sectionsDeTags: [
              {
                titre: "Aliments pour bétail & volaille",
                tags: ["Unités d'aliments composés", "Distribution"]
              }
            ]
          }
        ]
      }
    ]
  },

  // ========================================================================
  // N1-SEC — SECTEUR SECONDAIRE : Industrie, Construction, Énergie, Mines & Industrie verte
  // ========================================================================
  secondaire: {
    id: "secondaire",
    nom: "Secteur Secondaire",
    titreComplet: "SECTEUR SECONDAIRE : Industrie, Construction, Énergie, Mines & Industrie verte",
    filieres: [
      {
        id: "sec-ind",
        nom: "Industrie & transformation",
        sousCategories: [
          {
            nom: "Textile, habillement & mode",
            sectionsDeTags: [
              {
                titre: "Textile, habillement & mode",
                tags: ["Ateliers semi-industriels", "Uniformes", "Tissage moderne", "Teinture", "Confection"]
              }
            ]
          },
          {
            nom: "Cuir, chaussure & maroquinerie",
            sectionsDeTags: [
              {
                titre: "Cuir, chaussure & maroquinerie",
                tags: ["Tannerie légère", "Fabrication de chaussures", "Sacs", "Accessoires"]
              }
            ]
          },
          {
            nom: "Plasturgie & emballages",
            sectionsDeTags: [
              {
                titre: "Plasturgie & emballages",
                tags: ["Sacherie", "Bouteilles", "Films", "Recyclage plastique intégré"]
              }
            ]
          },
          {
            nom: "Métallurgie légère & mécanique",
            sectionsDeTags: [
              {
                titre: "Métallurgie légère & mécanique",
                tags: ["Soudure", "Chaudronnerie", "Pièces de rechange", "Ateliers d'usinage"]
              }
            ]
          },
          {
            nom: "Bois & ameublement",
            sectionsDeTags: [
              {
                titre: "Bois & ameublement",
                tags: ["Menuiserie industrielle", "Meubles", "Panneaux", "Charpente"]
              }
            ]
          },
          {
            nom: "Imprimerie & packaging",
            sectionsDeTags: [
              {
                titre: "Imprimerie & packaging",
                tags: ["Imprimeries commerciales", "Emballage alimentaire", "Étiquetage"]
              }
            ]
              },
              {
            nom: "Chimie légère & hygiène",
            sectionsDeTags: [
              {
                titre: "Chimie légère & hygiène",
                tags: ["Savonnerie", "Détergents", "Produits d'entretien"]
              }
            ]
          },
          {
            nom: "Cosmétique & beauté",
            sectionsDeTags: [
              {
                titre: "Cosmétique & beauté",
                tags: ["Cosmétique locale", "Huiles essentielles", "Laboratoires artisanaux encadrés"]
              }
            ]
          },
          {
            nom: "Matériaux industriels divers",
            sectionsDeTags: [
              {
                titre: "Matériaux industriels divers",
                tags: ["Verre", "Céramique", "Peinture", "Colles", "Petites unités autorisées"]
              }
            ]
          },
          {
            nom: "Fabrication/assemblage d'équipements",
            sectionsDeTags: [
              {
                titre: "Fabrication/assemblage d'équipements",
                tags: ["Équipements agro", "Petits outillages", "Mobilier métallique"]
              }
            ]
          },
          {
            nom: "Réparation & reconditionnement industriel",
            sectionsDeTags: [
              {
                titre: "Réparation & reconditionnement industriel",
                tags: ["Électroménager", "Équipements froid", "Machines d'atelier"]
              }
            ]
          }
        ]
      },
      {
        id: "sec-art",
        nom: "Artisanat de production & industries du patrimoine",
        sousCategories: [
          {
            nom: "Artisanat d'art",
            sectionsDeTags: [
              {
                titre: "Artisanat d'art",
                tags: ["Sculpture", "Vannerie", "Poterie", "Bijouterie", "Design d'objets"]
              }
            ]
          },
          {
            nom: "Artisanat utilitaire",
            sectionsDeTags: [
              {
                titre: "Artisanat utilitaire",
                tags: ["Ébénisterie", "Menuiserie alu", "Ferronnerie d'art", "Restauration de meubles"]
              }
            ]
          },
          {
            nom: "Mode & textile traditionnel",
            sectionsDeTags: [
              {
                titre: "Mode & textile traditionnel",
                tags: ["Pagne Baoulé", "Kita", "Batik", "Bazin", "Stylisme"]
              }
            ]
          }
        ]
      },
      {
        id: "sec-btp",
        nom: "BTP, construction & immobilier",
        sousCategories: [
          {
            nom: "Gros œuvre & génie civil",
            sectionsDeTags: [
              {
                titre: "Gros œuvre & génie civil",
                tags: ["Maçonnerie", "Béton armé", "Ouvrages de proximité", "VRD"]
              }
            ]
          },
          {
            nom: "Second œuvre & finitions",
            sectionsDeTags: [
              {
                titre: "Second œuvre & finitions",
                tags: ["Électricité bâtiment", "Plomberie", "Carrelage", "Peinture", "HVAC", "Vitrerie"]
              }
            ]
          },
          {
            nom: "Études, architecture & ingénierie",
            sectionsDeTags: [
              {
                titre: "Études, architecture & ingénierie",
                tags: ["Bureaux d'études", "Topographie", "Contrôle qualité chantier"]
              }
            ]
              },
              {
            nom: "Promotion & gestion immobilière",
            sectionsDeTags: [
              {
                titre: "Promotion & gestion immobilière",
                tags: ["Promotion PME", "Agences", "Syndic", "Facility management"]
              }
            ]
          },
          {
            nom: "Production & négoce matériaux",
            sectionsDeTags: [
              {
                titre: "Production & négoce matériaux",
                tags: ["Briques", "Parpaings", "Carrières de granulats", "Quincaillerie"]
              }
            ]
          },
          {
            nom: "Éco-construction",
            sectionsDeTags: [
              {
                titre: "Éco-construction",
                tags: ["Matériaux locaux stabilisés", "Solutions bas carbone"]
              }
            ]
          }
        ]
      },
      {
        id: "sec-ene",
        nom: "Énergie & services associés",
        sousCategories: [
          {
            nom: "Énergies renouvelables",
            sectionsDeTags: [
              {
                titre: "Énergies renouvelables",
                tags: ["Installateurs solaires", "Mini-grids", "Maintenance", "Vente d'équipements"]
              }
            ]
          },
          {
            nom: "Efficacité énergétique",
            sectionsDeTags: [
              {
                titre: "Efficacité énergétique",
                tags: ["Audit", "Retrofit", "Solutions LED", "Froid efficient"]
              }
            ]
          },
          {
            nom: "Gaz butane & distribution",
            sectionsDeTags: [
              {
                titre: "Gaz butane & distribution",
                tags: ["Centres de distribution", "Services de sécurité gaz"]
              }
            ]
          },
          {
            nom: "Services énergétiques PME",
            sectionsDeTags: [
              {
                titre: "Services énergétiques PME",
                tags: ["EPC", "Location d'énergie", "Maintenance groupes"]
              }
            ]
          }
        ]
      },
      {
        id: "sec-env",
        nom: "Environnement industriel & économie circulaire",
        sousCategories: [
          {
            nom: "Déchets & recyclage",
            sectionsDeTags: [
              {
                titre: "Déchets & recyclage",
                tags: ["Collecte", "Tri", "Recyclage plastique", "Métal", "Électronique", "Compost"]
              }
            ]
              },
          {
            nom: "Eau & assainissement",
            sectionsDeTags: [
              {
                titre: "Eau & assainissement",
                tags: ["Forages (agréments)", "Stations locales", "Vidange structurée"]
              }
            ]
          },
          {
            nom: "Services environnementaux",
            sectionsDeTags: [
              {
                titre: "Services environnementaux",
                tags: ["Audit conformité", "RSE", "Certification environnementale"]
              }
            ]
          }
        ]
      },
      {
        id: "sec-min",
        nom: "Mines, carrières & sous-traitance",
        sousCategories: [
          {
            nom: "Carrières & granulats",
            sectionsDeTags: [
              {
                titre: "Carrières & granulats",
                tags: ["Extraction sable/gravier encadrée", "Concassage", "Transport de matériaux"]
              }
            ]
          },
          {
            nom: "Sous-traitance minière",
            sectionsDeTags: [
              {
                titre: "Sous-traitance minière",
                tags: ["Maintenance", "Sécurité", "Catering", "Logistique sites miniers"]
              }
            ]
          },
          {
            nom: "Laboratoires & exploration PME",
            sectionsDeTags: [
              {
                titre: "Laboratoires & exploration PME",
                tags: ["Analyses géologiques", "Services d'exploration"]
              }
            ]
          }
        ]
      }
    ]
  },

  // ========================================================================
  // N1-TER — SECTEUR TERTIAIRE : Commerce, Services, Transport, Tourisme, Finance
  // ========================================================================
  tertiaire: {
    id: "tertiaire",
    nom: "Secteur Tertiaire",
    titreComplet: "SECTEUR TERTIAIRE : Commerce, Services, Transport, Tourisme, Finance",
    filieres: [
      {
        id: "ter-com",
        nom: "Commerce & distribution",
        sousCategories: [
          {
            nom: "Commerce de détail",
            sectionsDeTags: [
              {
                titre: "Commerce de détail",
                tags: ["Supérettes", "Boutiques spécialisées", "Franchises locales"]
              }
            ]
          },
          {
            nom: "Gros, semi-gros & centrales",
            sectionsDeTags: [
              {
                titre: "Gros, semi-gros & centrales",
                tags: ["Grossistes", "Entrepôts commerciaux", "Centrales d'achat"]
              }
            ]
          },
          {
            nom: "Commerce international",
            sectionsDeTags: [
              {
                titre: "Commerce international",
                tags: ["Import-export", "Négoce matières premières", "Transit commercial"]
              }
            ]
          },
          {
            nom: "E-commerce",
            sectionsDeTags: [
              {
                titre: "E-commerce",
                tags: ["Marketplaces", "Boutiques en ligne", "Logistique e-com"]
              }
            ]
          },
          {
            nom: "Distribution spécialisée",
            sectionsDeTags: [
              {
                titre: "Distribution spécialisée",
                tags: ["Matériaux", "Agro", "Santé", "Équipements", "Pièces automobiles"]
              }
            ]
              }
            ]
          },
          {
        id: "ter-ser",
        nom: "Services",
        sousCategories: [
          {
            nom: "Services professionnels",
            sectionsDeTags: [
              {
                titre: "Services professionnels",
                tags: ["Juridique", "Comptable", "Fiscal", "Audit", "Conseil", "RH"]
              }
            ]
          },
          {
            nom: "Marketing, communication & design",
            sectionsDeTags: [
              {
                titre: "Marketing, communication & design",
                tags: ["Agences", "Production de contenus", "Relations publiques", "Événementiel d'affaires"]
              }
            ]
          },
          {
            nom: "BPO & services administratifs",
            sectionsDeTags: [
              {
                titre: "BPO & services administratifs",
                tags: ["Call centers", "Back-office", "Numérisation documentaire"]
              }
            ]
          },
          {
            nom: "Services opérationnels",
            sectionsDeTags: [
              {
                titre: "Services opérationnels",
                tags: ["Nettoyage", "Sécurité privée", "Facility management"]
              }
            ]
          },
          {
            nom: "Services techniques & réparations",
            sectionsDeTags: [
              {
                titre: "Services techniques & réparations",
                tags: ["Automobile", "Engins", "Électronique", "Froid", "IT", "Maintenance multiservice"]
              }
            ]
          },
          {
            nom: "Services à la personne",
            sectionsDeTags: [
              {
                titre: "Services à la personne",
                tags: ["Pressing", "Garde d'enfants", "Aide à domicile", "Coiffure/esthétique"]
              }
            ]
          },
          {
            nom: "Restauration & traiteurs",
            sectionsDeTags: [
              {
                titre: "Restauration & traiteurs",
                tags: ["Maquis", "Restaurants", "Cantines d'entreprise", "Traiteurs"]
              }
            ]
          },
          {
            nom: "Économie sociale & solidaire",
            sectionsDeTags: [
              {
                titre: "Économie sociale & solidaire",
                tags: ["Coopératives de services", "Mutuelles", "Associations économiques"]
              }
            ]
          }
        ]
      },
      {
        id: "ter-trl",
        nom: "Transport, logistique & mobilité",
        sousCategories: [
          {
            nom: "Logistique urbaine & dernier kilomètre",
            sectionsDeTags: [
              {
                titre: "Logistique urbaine & dernier kilomètre",
                tags: ["Livraison à moto", "Vélos cargo", "Points relais", "Micro-entrepôts"]
              }
            ]
          },
          {
            nom: "Messagerie & express",
            sectionsDeTags: [
              {
                titre: "Messagerie & express",
                tags: ["Courrier", "Colis national", "Express international"]
              }
            ]
          },
          {
            nom: "Transport routier par camion",
            sectionsDeTags: [
              {
                titre: "Transport routier par camion",
                tags: ["Fret sec", "Bennes matériaux", "Frigorifique", "Hydrocarbures (agréments)"]
              }
            ]
          },
          {
            nom: "Transport urbain de personnes",
            sectionsDeTags: [
              {
                titre: "Transport urbain de personnes",
                tags: ["Taxis compteurs", "Wôrô-wôrô", "Gbaka", "Navettes privées"]
              }
            ]
          },
          {
            nom: "Transport par bus",
            sectionsDeTags: [
              {
                titre: "Transport par bus",
                tags: ["Urbain", "Interurbain", "Scolaire", "Tourisme", "Maintenance flottes bus"]
              }
            ]
          },
          {
            nom: "VTC & mobilité à la demande",
            sectionsDeTags: [
              {
                titre: "VTC & mobilité à la demande",
                tags: ["Plateformes", "Chauffeurs indépendants", "Location avec/sans chauffeur"]
              }
            ]
          },
          {
            nom: "Entreposage & plateformes",
            sectionsDeTags: [
              {
                titre: "Entreposage & plateformes",
                tags: ["Stockage", "Gestion d'entrepôt", "Fulfillment"]
              }
            ]
          },
          {
            nom: "Transit, douane, affrètement",
            sectionsDeTags: [
              {
                titre: "Transit, douane, affrètement",
                tags: ["Déclarants", "Commissionnaires", "Consignation"]
              }
            ]
          },
          {
            nom: "Maritime & portuaire",
            sectionsDeTags: [
              {
                titre: "Maritime & portuaire",
                tags: ["Manutention/acconage", "Agences maritimes", "Sûreté portuaire", "Maintenance navale légère"]
              }
            ]
          },
          {
            nom: "Ravitaillement maritime & offshore",
            sectionsDeTags: [
              {
                titre: "Ravitaillement maritime & offshore",
                tags: ["Shipchandling", "Avitaillement", "Soutage selon agréments"]
              }
            ]
          },
          {
            nom: "Lagunaire/fluvial & bateaux-bus",
            sectionsDeTags: [
              {
                titre: "Lagunaire/fluvial & bateaux-bus",
                tags: ["Navettes lagunaires passagers", "Fret local"]
              }
            ]
          },
          {
            nom: "Ferroviaire (services connexes PME)",
            sectionsDeTags: [
              {
                titre: "Ferroviaire (services connexes PME)",
                tags: ["Maintenance", "Sécurité", "Catering", "Logistique de gare"]
              }
            ]
          },
          {
            nom: "Aérien & aéroportuaire",
            sectionsDeTags: [
              {
                titre: "Aérien & aéroportuaire",
                tags: ["Fret léger", "Handling", "Sûreté", "Maintenance équipements au sol", "Catering aérien", "Commerce aéroportuaire"]
              }
            ]
          },
          {
            nom: "LogiTech",
            sectionsDeTags: [
              {
                titre: "LogiTech",
                tags: ["Logiciels TMS/WMS", "Tracking", "IoT flotte"]
              }
            ]
          }
        ]
      },
      {
        id: "ter-tou",
        nom: "Tourisme, culture & loisirs",
        sousCategories: [
          {
            nom: "Hébergement",
            sectionsDeTags: [
              {
                titre: "Hébergement",
                tags: ["Hôtels", "Résidences meublées", "Auberges", "Éco-lodges"]
              }
            ]
          },
          {
            nom: "Restauration touristique",
            sectionsDeTags: [
              {
                titre: "Restauration touristique",
                tags: ["Gastronomie", "Circuits culinaires", "Traiteurs événementiels"]
              }
            ]
          },
          {
            nom: "Voyages & guidage",
            sectionsDeTags: [
              {
                titre: "Voyages & guidage",
                tags: ["Agences", "Tour-opérateurs", "Guides"]
              }
            ]
          },
          {
            nom: "Loisirs & sports",
            sectionsDeTags: [
              {
                titre: "Loisirs & sports",
                tags: ["Parcs", "Salles de sport", "Attractions", "Événements"]
              }
            ]
          },
          {
            nom: "Industries créatives & culturelles",
            sectionsDeTags: [
              {
                titre: "Industries créatives & culturelles",
                tags: ["Audiovisuel", "Musique", "Mode", "Arts", "Édition", "Jeux/animation"]
              }
            ]
          }
        ]
      },
      {
        id: "ter-fin",
        nom: "Finance & assurances",
        sousCategories: [
          {
            nom: "Microfinance & SFD",
            sectionsDeTags: [
              {
                titre: "Microfinance & SFD",
                tags: ["Institutions de microfinance", "Services d'épargne/crédit de proximité"]
              }
            ]
          },
          {
            nom: "Assurances & courtage",
            sectionsDeTags: [
              {
                titre: "Assurances & courtage",
                tags: ["Assurance PME", "Assurance transport", "Micro-assurance"]
              }
            ]
          },
          {
            nom: "FinTech & paiements",
            sectionsDeTags: [
              {
                titre: "FinTech & paiements",
                tags: ["Mobile money", "Agrégation de paiements", "Crowdfunding"]
              }
            ]
          },
          {
            nom: "Transfert d'argent & change",
            sectionsDeTags: [
              {
                titre: "Transfert d'argent & change",
                tags: ["Remittances", "Bureaux de change"]
              }
            ]
          },
          {
            nom: "Services de bancabilité",
            sectionsDeTags: [
              {
                titre: "Services de bancabilité",
                tags: ["Montage de dossiers", "Scoring", "Conseil financier"]
              }
            ]
          }
        ]
      }
    ]
  },

  // ========================================================================
  // N1-QUA — SECTEUR QUATERNAIRE : Numérique, Éducation, Santé, R&D
  // ========================================================================
  quaternaire: {
    id: "quaternaire",
    nom: "Secteur Quaternaire",
    titreComplet: "SECTEUR QUATERNAIRE : Numérique, Éducation, Santé, R&D",
    filieres: [
      {
        id: "qua-num",
        nom: "Numérique & technologies",
        sousCategories: [
          {
            nom: "Développement logiciel",
            sectionsDeTags: [
              {
                titre: "Développement logiciel",
                tags: ["Web", "Mobile", "Solutions métiers", "SaaS"]
              }
            ]
          },
          {
            nom: "Infra, cloud & réseaux",
            sectionsDeTags: [
              {
                titre: "Infra, cloud & réseaux",
                tags: ["Hébergement", "Intégration systèmes", "MSP"]
              }
            ]
          },
          {
            nom: "Cybersécurité",
            sectionsDeTags: [
              {
                titre: "Cybersécurité",
                tags: ["Audit", "SOC externalisé", "Formation sécurité"]
              }
            ]
          },
          {
            nom: "Data, IA & IoT",
            sectionsDeTags: [
              {
                titre: "Data, IA & IoT",
                tags: ["Analytics", "IA appliquée PME", "Capteurs industriels/agro"]
              }
            ]
          },
          {
            nom: "Télécoms & services numériques",
            sectionsDeTags: [
              {
                titre: "Télécoms & services numériques",
                tags: ["FAI locaux", "Services de proximité", "Maintenance réseaux"]
              }
            ]
          },
          {
            nom: "Matériel & réparation",
            sectionsDeTags: [
              {
                titre: "Matériel & réparation",
                tags: ["Réparation/assemblage", "Distribution hardware"]
              }
            ]
          },
          {
            nom: "Services de marketing digital",
            sectionsDeTags: [
              {
                titre: "Services de marketing digital",
                tags: ["SEO/SEA", "Contenus", "Gestion e-commerce"]
              }
            ]
          }
        ]
      },
      {
        id: "qua-edu",
        nom: "Éducation & formation",
        sousCategories: [
          {
            nom: "Écoles privées",
            sectionsDeTags: [
              {
                titre: "Écoles privées",
                tags: ["Préscolaire", "Primaire", "Secondaire"]
              }
            ]
          },
          {
            nom: "Enseignement supérieur privé",
            sectionsDeTags: [
              {
                titre: "Enseignement supérieur privé",
                tags: ["Instituts spécialisés", "Formations métiers"]
              }
            ]
          },
          {
            nom: "Formation professionnelle",
            sectionsDeTags: [
              {
                titre: "Formation professionnelle",
                tags: ["Centres techniques", "Apprentissage", "Certification"]
              }
            ]
          },
          {
            nom: "EdTech",
            sectionsDeTags: [
              {
                titre: "EdTech",
                tags: ["Plateformes e-learning", "Contenus numériques"]
              }
            ]
          },
          {
            nom: "Coaching & langues",
            sectionsDeTags: [
              {
                titre: "Coaching & langues",
                tags: ["Centres de langues", "Coaching business"]
              }
            ]
          }
        ]
      },
      {
        id: "qua-san",
        nom: "Santé & sciences de la vie",
        sousCategories: [
          {
            nom: "Cliniques & cabinets",
            sectionsDeTags: [
              {
                titre: "Cliniques & cabinets",
                tags: ["Médecine générale", "Spécialités", "Santé de proximité"]
              }
            ]
          },
          {
            nom: "Laboratoires & imagerie",
            sectionsDeTags: [
              {
                titre: "Laboratoires & imagerie",
                tags: ["Analyses", "Radiologie", "Diagnostics mobiles"]
              }
            ]
          },
          {
            nom: "Pharmacies & distribution",
            sectionsDeTags: [
              {
                titre: "Pharmacies & distribution",
                tags: ["Pharmacies", "Dépôts", "Logistique santé"]
              }
            ]
          },
          {
            nom: "Dispositifs médicaux",
            sectionsDeTags: [
              {
                titre: "Dispositifs médicaux",
                tags: ["Vente", "Maintenance biomédicale", "Consommables"]
              }
            ]
          },
          {
            nom: "HealthTech",
            sectionsDeTags: [
              {
                titre: "HealthTech",
                tags: ["Télémédecine", "Dossiers médicaux numériques"]
              }
            ]
          },
          {
            nom: "Phytothérapie modernisée",
            sectionsDeTags: [
              {
                titre: "Phytothérapie modernisée",
                tags: ["Produits naturels encadrés", "Nutrition et bien-être"]
              }
            ]
          }
        ]
      },
      {
        id: "qua-rdi",
        nom: "Recherche, ingénierie & qualité",
        sousCategories: [
          {
            nom: "Bureaux d'ingénierie avancée",
            sectionsDeTags: [
              {
                titre: "Bureaux d'ingénierie avancée",
                tags: ["Ingénierie industrielle", "Agro", "BTP"]
              }
            ]
          },
          {
            nom: "Laboratoires d'essais & contrôle qualité",
            sectionsDeTags: [
              {
                titre: "Laboratoires d'essais & contrôle qualité",
                tags: ["Tests matériaux", "Agroalimentaire", "Métrologie"]
              }
            ]
          },
          {
            nom: "Normalisation & certification",
            sectionsDeTags: [
              {
                titre: "Normalisation & certification",
                tags: ["ISO", "HACCP", "Accompagnement conformité"]
              }
            ]
          },
          {
            nom: "Propriété intellectuelle & transfert",
            sectionsDeTags: [
              {
                titre: "Propriété intellectuelle & transfert",
                tags: ["Brevets", "Marques", "Licences"]
              }
            ]
          }
        ]
      }
    ]
  },

  // ========================================================================
  // N1-TRV — FILIÈRES TRANSVERSALES HUB (services communs)
  // ========================================================================
  transversales: {
    id: "transversales",
    nom: "Filières Transversales",
    titreComplet: "FILIÈRES TRANSVERSALES HUB : Services communs",
    filieres: [
      {
        id: "trv-fin",
        nom: "Financement & accès au crédit",
        sousCategories: [
          {
            nom: "Garanties & fonds",
            sectionsDeTags: [
              {
                titre: "Garanties & fonds",
                tags: ["Fonds de garantie", "Lignes de crédit", "Instruments mixtes"]
              }
            ]
          },
          {
            nom: "Bancabilité & préparation",
            sectionsDeTags: [
              {
                titre: "Bancabilité & préparation",
                tags: ["Diagnostic financier", "Coaching CFO PME", "Scoring"]
              }
            ]
              }
            ]
          },
          {
        id: "trv-exp",
        nom: "Exportation & internationalisation",
        sousCategories: [
          {
            nom: "Normes & certification export",
            sectionsDeTags: [
              {
                titre: "Normes & certification export",
                tags: ["Qualité", "Emballage", "Traçabilité"]
              }
            ]
          },
          {
            nom: "Accès marchés CEDEAO/UEMOA/ZLECAf",
            sectionsDeTags: [
              {
                titre: "Accès marchés CEDEAO/UEMOA/ZLECAf",
                tags: ["Missions B2B", "Foire export", "Intelligence marchés"]
              }
            ]
              }
            ]
          },
          {
        id: "trv-dig",
        nom: "Transformation digitale des PME",
        sousCategories: [
          {
            nom: "Outils de gestion",
            sectionsDeTags: [
              {
                titre: "Outils de gestion",
                tags: ["Compta", "Facturation", "CRM", "ERP légers"]
              }
            ]
          },
          {
            nom: "Commerce digital",
            sectionsDeTags: [
              {
                titre: "Commerce digital",
                tags: ["Boutique en ligne", "Paiement", "Logistique connectée"]
              }
            ]
          }
        ]
      },
      {
        id: "trv-esg",
        nom: "Développement durable & RSE",
        sousCategories: [
          {
            nom: "Conformité environnementale",
            sectionsDeTags: [
              {
                titre: "Conformité environnementale",
                tags: ["Audit", "Plans d'amélioration", "Reporting"]
              }
            ]
              },
              {
            nom: "Valorisation déchets & économie circulaire",
            sectionsDeTags: [
              {
                titre: "Valorisation déchets & économie circulaire",
                tags: ["Chaînes de valeur vertes", "Business inclusif"]
              }
            ]
          }
        ]
      },
      {
        id: "trv-inn",
        nom: "Innovation, incubation & accélération",
        sousCategories: [
          {
            nom: "Incubateurs & hubs",
            sectionsDeTags: [
              {
                titre: "Incubateurs & hubs",
                tags: ["Programmes startups", "Corporate innovation"]
              }
            ]
          },
          {
            nom: "Propriété intellectuelle",
            sectionsDeTags: [
              {
                titre: "Propriété intellectuelle",
                tags: ["Appui marques/brevets"]
              }
            ]
          }
        ]
      }
    ]
  }
};