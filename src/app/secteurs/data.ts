// app/secteur/data.ts

// --- DÉFINITION DES TYPES (Rappel pour contexte) ---

// Niveau 4 : Les tags individuels
type TagList = string[]; 

// Niveau 3 : Les sections de tags
interface TagSection {
  titre: string; 
  tags: TagList;
}

// Niveau 2 : La sous-catégorie qui s'ouvre
interface SousCategorieDetail {
  nom: string;
  sectionsDeTags: TagSection[]; 
}

// Niveau 1 : La filière
interface Filiere {
  id: string;
  nom: string;
  sousCategories: SousCategorieDetail[];
}

interface SecteurData {
  id: 'primaire' | 'secondaire' | 'tertiaire' | 'quaternaire';
  nom: string;
  titreComplet: string;
  filieres: Filiere[];
}

// --- DONNÉES COMPLÈTES ---

export const secteursData: Record<string, SecteurData> = {
  
  // ========================================================================
  // SECTEUR PRIMAIRE
  // ========================================================================
  primaire: {
    id: "primaire",
    nom: "Secteur Primaire",
    titreComplet: "SECTEUR PRIMAIRE : AGRICULTURE & AGRO-INDUSTRIE",
    filieres: [
      {
        id: "agriculture_agro",
        nom: "Agriculture & Agro-industrie",
        sousCategories: [
          {
            nom: "Productions",
            sectionsDeTags: [
              {
                titre: "Productions vivrières",
                tags: ["Manioc", "Riz", "Maïs", "Mil", "Sorgho", "Igname", "Banane plantain", "Patate douce"]
              },
              {
                titre: "Productions d'exportation",
                tags: ["Cacao", "Café", "Anacarde", "Hévéa", "Coton", "Palmier à huile", "Canne à sucre"]
              }
            ]
          },
          {
            nom: "Élevage & Aviculture",
            sectionsDeTags: [
              {
                titre: "Élevage",
                tags: ["Bovins (Viande/Lait)", "Ovins & Caprins", "Porciculture", "Aviculture (Poulet de chair/Pondeuse)", "Cuniculture (Lapin)", "Apiculture (Miel)", "Aulacodiculture (Agouti)"]
              }
            ]
          },
          {
            nom: "Pêche & Aquaculture",
            sectionsDeTags: [
              {
                titre: "Pêche",
                tags: ["Pêche artisanale maritime", "Pêche industrielle", "Pêche continentale (Lagune/Fleuve)"]
              },
              {
                titre: "Aquaculture",
                tags: ["Pisciculture (Tilapia/Silure)", "Crevetticulture", "Algoculture"]
              }
            ]
          },
          {
            nom: "Agro-transformation",
            sectionsDeTags: [
              {
                titre: "Transformation",
                tags: ["Jus", "Huiles", "Chocolat", "Broyage de cacao", "Huileries (Palme/Coton)", "Meunerie (Farine)", "Conserveries", "Brasseries & Boissons", "Produits laitiers"]
              }
            ]
          },
          {
            nom: "Distribution & Logistique Agricoles",
            sectionsDeTags: [
              {
                titre: "Distribution",
                tags: ["Distribution agricole", "Logistique agricole", "Commerce de produits agricoles"]
              }
            ]
          },
          {
            nom: "Intrants",
            sectionsDeTags: [
              {
                titre: "Intrants agricoles",
                tags: ["Engrais", "Semences", "Pesticides", "Phytosanitaires"]
              }
            ]
          }
        ]
      }
    ]
  },

  // ========================================================================
  // SECTEUR SECONDAIRE
  // ========================================================================
  secondaire: {
    id: "secondaire",
    nom: "Secteur Secondaire",
    titreComplet: "SECTEUR SECONDAIRE : INDUSTRIE & TRANSFORMATION",
    filieres: [
      {
        id: "industrie_transformation",
        nom: "Industrie & Transformation",
        sousCategories: [
          {
            nom: "Manufacture Textile",
            sectionsDeTags: [
              {
                titre: "Textile",
                tags: ["Filature & Tissage", "Confection & Couture", "Atelier textile local"]
              }
            ]
          },
          {
            nom: "Transformation Plastique",
            sectionsDeTags: [
              {
                titre: "Plastique",
                tags: ["Plastiques & Emballages", "Transformation plastique"]
              }
            ]
          },
          {
            nom: "Boissons & Brasseries",
            sectionsDeTags: [
              {
                titre: "Boissons",
                tags: ["Brasseries", "Boissons", "Production de boissons"]
              }
            ]
          },
          {
            nom: "Matériaux de Construction",
            sectionsDeTags: [
              {
                titre: "Matériaux",
                tags: ["Matériaux de construction", "Béton", "Ciment", "Carrelage"]
              }
            ]
          },
          {
            nom: "Industrie Métallurgique",
            sectionsDeTags: [
              {
                titre: "Métallurgie",
                tags: ["Métallurgie", "Transformation de métal", "Soudure", "Chaudronnerie", "Ferronnerie"]
              }
            ]
          },
          {
            nom: "Imprimerie & Papier",
            sectionsDeTags: [
              {
                titre: "Imprimerie",
                tags: ["Imprimerie", "Papier", "Édition"]
              }
            ]
          },
          {
            nom: "Chimie Légère",
            sectionsDeTags: [
              {
                titre: "Chimie",
                tags: ["Produits pharmaceutiques", "Cosmétiques", "Peintures & Vernis", "Engrais & Phytosanitaires"]
              }
            ]
          },
          {
            nom: "Fabrication PME & Transformation Locale",
            sectionsDeTags: [
              {
                titre: "Fabrication locale",
                tags: ["Atelier textile local", "Transformation de métal", "Fabrication de meubles semi-industriels"]
              }
            ]
          }
        ]
      }
    ]
  },

  // ========================================================================
  // SECTEUR TERTIAIRE
  // ========================================================================
  tertiaire: {
    id: "tertiaire",
    nom: "Secteur Tertiaire",
    titreComplet: "SECTEUR TERTIAIRE : SERVICES, COMMERCE & DISTRIBUTION",
    filieres: [
      {
        id: "commerce_distribution",
        nom: "Commerce & Distribution",
        sousCategories: [
          {
            nom: "Commerce",
            sectionsDeTags: [
              {
                titre: "Commerce de gros",
                tags: ["Commerce de gros", "Grossistes", "Distributeurs"]
              },
              {
                titre: "Commerce de détail",
                tags: ["Commerce de détail", "Détaillants", "Boutiques"]
              },
              {
                titre: "E-commerce",
                tags: ["E-commerce", "Vente en ligne", "Marketplace"]
              },
              {
                titre: "Import/Export",
                tags: ["Import", "Export", "Commerce international"]
              },
              {
                titre: "Distribution générale",
                tags: ["Distribution générale", "Distribution de produits"]
              },
              {
                titre: "Supermarchés & chaînes",
                tags: ["Supermarchés", "Chaînes de distribution", "Grande distribution"]
              }
            ]
          }
        ]
      },
      {
        id: "services",
        nom: "Services",
        sousCategories: [
          {
            nom: "Services Professionnels",
            sectionsDeTags: [
              {
                titre: "Services juridiques",
                tags: ["Services juridiques", "Avocats", "Conseil juridique"]
              },
              {
                titre: "Services comptables",
                tags: ["Comptabilité", "Audit", "Expertise comptable"]
              },
              {
                titre: "Ressources Humaines",
                tags: ["RH", "Recrutement", "Gestion du personnel"]
              }
            ]
          },
          {
            nom: "Services aux Entreprises",
            sectionsDeTags: [
              {
                titre: "Services B2B",
                tags: ["Nettoyage professionnel", "Sécurité", "Services aux entreprises"]
              }
            ]
          },
          {
            nom: "Services aux Particuliers",
            sectionsDeTags: [
              {
                titre: "Services B2C",
                tags: ["Services aux particuliers", "Services à domicile"]
              }
            ]
          },
          {
            nom: "Call Centers & BPO",
            sectionsDeTags: [
              {
                titre: "BPO",
                tags: ["Call centers", "BPO", "Externalisation"]
              }
            ]
          },
          {
            nom: "Marketing, Communication & Publicité",
            sectionsDeTags: [
              {
                titre: "Communication",
                tags: ["Marketing", "Communication", "Publicité", "Relations publiques"]
              }
            ]
          },
          {
            nom: "Services Techniques & Artisanaux",
            sectionsDeTags: [
              {
                titre: "Automobile & engins",
                tags: ["Atelier mécanique automobile", "Réparation véhicules lourds", "Électricité auto", "Pneumatique & équilibrage", "Carrosserie & peinture", "Diagnostic embarqué"]
              },
              {
                titre: "Bois & ameublement",
                tags: ["Menuiserie générale", "Ébénisterie", "Fabrication de meubles artisanaux", "Restauration de mobilier", "Agencement intérieur"]
              },
              {
                titre: "Métallurgie & artisanat",
                tags: ["Soudure", "Chaudronnerie légère", "Ferronnerie"]
              },
              {
                titre: "Autres services techniques",
                tags: ["Réparation électronique", "Climatisation & réfrigération", "Maintenance industrielle légère"]
              }
            ]
          }
        ]
      },
      {
        id: "transport_logistique",
        nom: "Transport & Logistique",
        sousCategories: [
          {
            nom: "Transport",
            sectionsDeTags: [
              {
                titre: "Messagerie & livraison urbaine",
                tags: ["Messagerie", "Livraison urbaine", "Livraison express"]
              },
              {
                titre: "Transport routier interurbain",
                tags: ["Transport routier", "Transport interurbain", "Transport de marchandises"]
              },
              {
                titre: "Transport maritime & portuaire",
                tags: ["Transport maritime", "Transport portuaire", "Fret maritime"]
              },
              {
                titre: "Transport aérien",
                tags: ["Transport aérien", "Fret aérien", "Aviation"]
              }
            ]
          },
          {
            nom: "Logistique",
            sectionsDeTags: [
              {
                titre: "Entreposage & entrepôts",
                tags: ["Entreposage", "Entrepôts", "Stockage"]
              },
              {
                titre: "Solutions logicielles logistiques",
                tags: ["Logiciels logistiques", "Gestion de la chaîne d'approvisionnement", "Supply Chain"]
              }
            ]
          }
        ]
      },
      {
        id: "construction_immobilier",
        nom: "Construction & Immobilier",
        sousCategories: [
          {
            nom: "BTP",
            sectionsDeTags: [
              {
                titre: "Gros œuvre & Génie Civil",
                tags: ["Maçonnerie", "Béton armé", "Construction de routes", "Ponts et Chaussées", "Travaux publics"]
              },
              {
                titre: "Second œuvre & métiers du bâtiment",
                tags: ["Menuiserie bâtiment", "Ébénisterie & boiserie architecturale", "Plomberie", "Électricité bâtiment", "Peinture & revêtement", "Carrelage, parquet, faux plafonds", "Vitrerie & aluminium", "Installation HVAC", "Isolation & étanchéité"]
              }
            ]
          },
          {
            nom: "Architecture & Ingénierie",
            sectionsDeTags: [
              {
                titre: "Architecture",
                tags: ["Architecture", "Topographie", "Urbanisme", "Dessin BTP"]
              }
            ]
          },
          {
            nom: "Matériaux",
            sectionsDeTags: [
              {
                titre: "Matériaux de construction",
                tags: ["Matériaux", "Fournitures BTP"]
              }
            ]
          },
          {
            nom: "Immobilier",
            sectionsDeTags: [
              {
                titre: "Immobilier résidentiel",
                tags: ["Immobilier résidentiel", "Vente immobilière", "Location résidentielle"]
              },
              {
                titre: "Immobilier commercial",
                tags: ["Immobilier commercial", "Bureaux", "Locaux commerciaux"]
              }
            ]
          }
        ]
      },
      {
        id: "energie_environnement",
        nom: "Énergie & Environnement",
        sousCategories: [
          {
            nom: "Énergie",
            sectionsDeTags: [
              {
                titre: "Énergies renouvelables",
                tags: ["Énergies Renouvelables (Solaire/Biomasse/Hydro)", "Énergie solaire", "Énergie éolienne", "Biomasse"]
              },
              {
                titre: "Hydrocarbures",
                tags: ["Pétrole & Gaz (Offshore/Onshore)", "Raffinage", "Distribution d'énergie"]
              },
              {
                titre: "Électricité",
                tags: ["Électricité (Production/Distribution)", "Électrotechnique"]
              }
            ]
          },
          {
            nom: "Environnement",
            sectionsDeTags: [
              {
                titre: "Eau & assainissement",
                tags: ["Eau", "Assainissement", "Traitement des eaux"]
              },
              {
                titre: "Gestion des déchets",
                tags: ["Gestion des déchets", "Recyclage", "Traitement des déchets"]
              },
              {
                titre: "Agriculture durable",
                tags: ["Agriculture durable", "Agroforesterie", "Reboisement"]
              },
              {
                titre: "Mines",
                tags: ["Exploitation minière (Or/Manganèse)", "Géologie"]
              }
            ]
          }
        ]
      },
      {
        id: "finance_assurances",
        nom: "Finance & Assurances",
        sousCategories: [
          {
            nom: "Finance",
            sectionsDeTags: [
              {
                titre: "Microfinance",
                tags: ["Microfinance", "Institutions de microfinance"]
              },
              {
                titre: "Banques",
                tags: ["Banque de détail", "Banques", "Services bancaires"]
              },
              {
                titre: "FinTech",
                tags: ["FinTech", "Mobile Money", "Services financiers digitaux"]
              },
              {
                titre: "Coopératives financières",
                tags: ["Coopératives financières", "Mutualités"]
              },
              {
                titre: "Comptabilité & Audit",
                tags: ["Comptabilité", "Audit", "Contrôle de gestion"]
              }
            ]
          },
          {
            nom: "Assurances",
            sectionsDeTags: [
              {
                titre: "Assurances",
                tags: ["Assurance Vie/Non-Vie", "Courtage", "Gestion des risques", "Actuariat"]
              }
            ]
          }
        ]
      },
      {
        id: "tourisme_culture_loisirs",
        nom: "Tourisme, Culture & Loisirs",
        sousCategories: [
          {
            nom: "Hébergement & Accueil",
            sectionsDeTags: [
              {
                titre: "Hôtels",
                tags: ["Hôtellerie", "Hôtels", "Réception"]
              },
              {
                titre: "Agences de voyages",
                tags: ["Agences de voyage", "Gestion touristique"]
              }
            ]
          },
          {
            nom: "Restauration",
            sectionsDeTags: [
              {
                titre: "Restaurants",
                tags: ["Restaurants", "Cuisine & Gastronomie", "Pâtisserie", "Service en salle", "Traiteur"]
              }
            ]
          },
          {
            nom: "Transport Touristique",
            sectionsDeTags: [
              {
                titre: "Transport touristique",
                tags: ["Transport touristique", "VTC & Livraison"]
              }
            ]
          },
          {
            nom: "Événementiel",
            sectionsDeTags: [
              {
                titre: "Événementiel",
                tags: ["Événementiel", "Organisation d'événements"]
              }
            ]
          },
          {
            nom: "Arts & Médias",
            sectionsDeTags: [
              {
                titre: "Arts & médias",
                tags: ["Arts", "Médias", "Production audiovisuelle"]
              }
            ]
          }
        ]
      }
    ]
  },

  // ========================================================================
  // SECTEUR QUATERNAIRE
  // ========================================================================
  quaternaire: {
    id: "quaternaire",
    nom: "Secteur Quaternaire",
    titreComplet: "SECTEUR QUATERNAIRE : NUMÉRIQUE, ÉDUCATION & SANTÉ",
    filieres: [
      {
        id: "numerique_technologies",
        nom: "Numérique & Technologies",
        sousCategories: [
          {
            nom: "Développement Logiciel",
            sectionsDeTags: [
              {
                titre: "Développement logiciel",
                tags: ["Développement Web/Mobile", "Développement logiciel", "UX/UI Design"]
              }
            ]
          },
          {
            nom: "IA, Data & Robotique",
            sectionsDeTags: [
              {
                titre: "IA & Data",
                tags: ["Data Science & IA", "Intelligence artificielle", "Robotique"]
              }
            ]
          },
          {
            nom: "FinTech",
            sectionsDeTags: [
              {
                titre: "FinTech",
                tags: ["FinTech", "Services financiers digitaux"]
              }
            ]
          },
          {
            nom: "Cybersécurité",
            sectionsDeTags: [
              {
                titre: "Cybersécurité",
                tags: ["Cybersécurité", "Sécurité informatique"]
              }
            ]
          },
          {
            nom: "SaaS",
            sectionsDeTags: [
              {
                titre: "SaaS",
                tags: ["SaaS", "Logiciels en tant que service"]
              }
            ]
          },
          {
            nom: "Telecom & Opérateurs",
            sectionsDeTags: [
              {
                titre: "Telecom",
                tags: ["Telecom & opérateurs", "Administration Réseaux", "Fibre optique"]
              }
            ]
          },
          {
            nom: "Infrastructure & Réseaux",
            sectionsDeTags: [
              {
                titre: "Infrastructure",
                tags: ["Cloud Computing", "Maintenance informatique", "Infrastructure IT"]
              }
            ]
          },
          {
            nom: "Marketing Digital",
            sectionsDeTags: [
              {
                titre: "Marketing digital",
                tags: ["Community Management", "SEO/SEA", "E-commerce", "Création de contenu"]
              }
            ]
          },
          {
            nom: "Startups Tech",
            sectionsDeTags: [
              {
                titre: "Startups tech",
                tags: ["Startups tech", "Innovation technologique"]
              }
            ]
          }
        ]
      },
      {
        id: "education_formation",
        nom: "Éducation & Formation",
        sousCategories: [
          {
            nom: "Écoles Privées",
            sectionsDeTags: [
              {
                titre: "Écoles privées",
                tags: ["Enseignement (Primaire/Secondaire/Supérieur)", "Écoles privées"]
              }
            ]
          },
          {
            nom: "Formation Professionnelle",
            sectionsDeTags: [
              {
                titre: "Centres de formation professionnelle",
                tags: ["Formation professionnelle", "Centres de formation"]
              }
            ]
          },
          {
            nom: "E-learning",
            sectionsDeTags: [
              {
                titre: "E-learning",
                tags: ["E-learning", "Formation en ligne"]
              }
            ]
          },
          {
            nom: "Édition Scolaire",
            sectionsDeTags: [
              {
                titre: "Édition scolaire",
                tags: ["Édition scolaire", "Manuels scolaires"]
              }
            ]
          },
          {
            nom: "Formateurs Indépendants",
            sectionsDeTags: [
              {
                titre: "Formateurs indépendants",
                tags: ["Formateurs indépendants", "Coaching scolaire"]
              }
            ]
          }
        ]
      },
      {
        id: "sante_sciences_vie",
        nom: "Santé & Sciences de la Vie",
        sousCategories: [
          {
            nom: "Cliniques Privées",
            sectionsDeTags: [
              {
                titre: "Cliniques privées",
                tags: ["Soins infirmiers", "Médecine", "Cliniques privées"]
              }
            ]
          },
          {
            nom: "Pharmacies",
            sectionsDeTags: [
              {
                titre: "Pharmacies",
                tags: ["Pharmacie d'officine", "Pharmacies"]
              }
            ]
          },
          {
            nom: "Laboratoires d'Analyse",
            sectionsDeTags: [
              {
                titre: "Laboratoires d'analyse",
                tags: ["Biologie médicale", "Laboratoires d'analyse"]
              }
            ]
          },
          {
            nom: "Fournisseurs de Matériel Médical",
            sectionsDeTags: [
              {
                titre: "Fournisseurs de matériel médical",
                tags: ["Fournisseurs de matériel médical", "Équipements médicaux"]
              }
            ]
          },
          {
            nom: "Agro-pharmacie",
            sectionsDeTags: [
              {
                titre: "Agro-pharmacie",
                tags: ["Agro-pharmacie", "Santé publique"]
              }
            ]
          }
        ]
      }
    ]
  }
};
