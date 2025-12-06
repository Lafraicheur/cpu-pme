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
  id: 'primaire' | 'secondaire' | 'tertiaire' | 'transversales';
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
    titreComplet: "SECTEUR PRIMAIRE : AGRICULTURE & RESSOURCES",
    filieres: [
      {
        id: "agri_ressources",
        nom: "Agriculture, Élevage & Pêche",
        sousCategories: [
          {
            nom: "Production Végétale",
            sectionsDeTags: [
              {
                titre: "Cultures Vivrières",
                tags: ["Riz", "Maïs", "Mil", "Sorgho", "Manioc", "Igname", "Banane plantain", "Patate douce"]
              },
              {
                titre: "Cultures de Rente",
                tags: ["Cacao", "Café", "Anacarde", "Hévéa", "Coton", "Palmier à huile", "Canne à sucre"]
              },
              {
                titre: "Maraîchage & Horticulture",
                tags: ["Tomate", "Oignon", "Aubergine", "Piment", "Gombo", "Haricot vert", "Floriculture"]
              },
              {
                titre: "Arboriculture Fruitière",
                tags: ["Ananas", "Mangue", "Papaye", "Agrumes (Orange, Citron)", "Banane dessert", "Avocat", "Fruit de la passion"]
              }
            ]
          },
          {
            nom: "Production Animale",
            sectionsDeTags: [
              {
                titre: "Élevage Conventionnel",
                tags: ["Bovins (Viande/Lait)", "Ovins & Caprins", "Porciculture", "Aviculture (Poulet de chair/Pondeuse)"]
              },
              {
                titre: "Élevages Spécialisés",
                tags: ["Cuniculture (Lapin)", "Apiculture (Miel)", "Aulacodiculture (Agouti)", "Escargots"]
              }
            ]
          },
          {
            nom: "Pêche et Aquaculture",
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
            nom: "Forêt et Environnement",
            sectionsDeTags: [
              {
                titre: "Exploitation & Préservation",
                tags: ["Sylviculture", "Agroforesterie", "Reboisement", "Gestion des aires protégées"]
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
    titreComplet: "SECTEUR SECONDAIRE : INDUSTRIE, BTP & ÉNERGIE",
    filieres: [
      {
        id: "indus_btp",
        nom: "Industries & Construction",
        sousCategories: [
          {
            nom: "Agro-industrie & Transformation",
            sectionsDeTags: [
              {
                titre: "Transformation Alimentaire",
                tags: ["Broyage de cacao", "Huileries (Palme/Coton)", "Meunerie (Farine)", "Conserveries", "Brasseries & Boissons", "Produits laitiers"]
              },
              {
                titre: "Transformation Non-Alimentaire",
                tags: ["Égrenage de coton", "Transformation du caoutchouc", "Biocarburants"]
              }
            ]
          },
          {
            nom: "BTP & Infrastructures",
            sectionsDeTags: [
              {
                titre: "Gros Œuvre & Génie Civil",
                tags: ["Maçonnerie", "Béton armé", "Construction de routes", "Ponts et Chaussées", "Travaux publics"]
              },
              {
                titre: "Second Œuvre & Finitions",
                tags: ["Plomberie", "Électricité bâtiment", "Menuiserie (Bois/Alu/Métal)", "Peinture & Carrelage", "Étanchéité"]
              },
              {
                titre: "Architecture & Études",
                tags: ["Architecture", "Topographie", "Urbanisme", "Dessin BTP"]
              }
            ]
          },
          {
            nom: "Énergie, Mines & Pétrole",
            sectionsDeTags: [
              {
                titre: "Énergie",
                tags: ["Électricité (Production/Distribution)", "Énergies Renouvelables (Solaire/Biomasse/Hydro)", "Électrotechnique"]
              },
              {
                titre: "Industries Extractives",
                tags: ["Exploitation minière (Or/Manganèse)", "Pétrole & Gaz (Offshore/Onshore)", "Raffinage", "Géologie"]
              }
            ]
          },
          {
            nom: "Industries Manufacturières",
            sectionsDeTags: [
              {
                titre: "Chimie & Plasturgie",
                tags: ["Plastiques & Emballages", "Produits pharmaceutiques", "Cosmétiques", "Peintures & Vernis", "Engrais & Phytosanitaires"]
              },
              {
                titre: "Mécanique & Métallurgie",
                tags: ["Maintenance industrielle", "Soudure & Chaudronnerie", "Mécanique automobile", "Assemblage électronique"]
              },
              {
                titre: "Textile & Cuir",
                tags: ["Filature & Tissage", "Confection & Couture", "Maroquinerie"]
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
    titreComplet: "SECTEUR TERTIAIRE : SERVICES, COMMERCE & NUMÉRIQUE",
    filieres: [
      {
        id: "services_commerce",
        nom: "Services & Commerce",
        sousCategories: [
          {
            nom: "Numérique & ICT",
            sectionsDeTags: [
              {
                titre: "Développement & Web",
                tags: ["Développement Web/Mobile", "UX/UI Design", "Data Science & IA", "DevOps"]
              },
              {
                titre: "Infrastructure & Réseaux",
                tags: ["Administration Réseaux", "Cybersécurité", "Cloud Computing", "Maintenance informatique", "Fibre optique"]
              },
              {
                titre: "Marketing Digital",
                tags: ["Community Management", "SEO/SEA", "E-commerce", "Création de contenu"]
              }
            ]
          },
          {
            nom: "Transport & Logistique",
            sectionsDeTags: [
              {
                titre: "Transport",
                tags: ["Transport routier (Marchandises/Personnes)", "Transport maritime & Portuaire", "Transport aérien", "VTC & Livraison"]
              },
              {
                titre: "Logistique",
                tags: ["Gestion de la chaîne d'approvisionnement (Supply Chain)", "Gestion d'entrepôt", "Transit & Douane", "Fret"]
              }
            ]
          },
          {
            nom: "Commerce & Distribution",
            sectionsDeTags: [
              {
                titre: "Vente",
                tags: ["Grande distribution", "Commerce de détail", "Import-Export", "Administration des ventes", "Relation client"]
              }
            ]
          },
          {
            nom: "Banque, Finance & Assurance",
            sectionsDeTags: [
              {
                titre: "Finance",
                tags: ["Comptabilité & Audit", "Contrôle de gestion", "Banque de détail", "Microfinance", "Fintech & Mobile Money"]
              },
              {
                titre: "Assurance",
                tags: ["Assurance Vie/Non-Vie", "Courtage", "Gestion des risques", "Actuariat"]
              }
            ]
          },
          {
            nom: "Tourisme, Hôtellerie & Restauration",
            sectionsDeTags: [
              {
                titre: "Hébergement & Accueil",
                tags: ["Hôtellerie", "Réception", "Gestion touristique", "Agences de voyage"]
              },
              {
                titre: "Métiers de Bouche",
                tags: ["Cuisine & Gastronomie", "Pâtisserie", "Service en salle", "Traiteur"]
              }
            ]
          },
          {
            nom: "Santé & Éducation",
            sectionsDeTags: [
              {
                titre: "Santé",
                tags: ["Soins infirmiers", "Médecine", "Pharmacie d'officine", "Biologie médicale", "Santé publique"]
              },
              {
                titre: "Éducation",
                tags: ["Enseignement (Primaire/Secondaire/Supérieur)", "Formation professionnelle", "Coaching scolaire"]
              }
            ]
          }
        ]
      }
    ]
  },

  // ========================================================================
  // FILIÈRES TRANSVERSALES
  // ========================================================================
  transversales: {
    id: "transversales",
    nom: "Filières Transversales",
    titreComplet: "FILIÈRES TRANSVERSALES : SOFT SKILLS & INNOVATION",
    filieres: [
      {
        id: "soft_innovation",
        nom: "Compétences Transversales",
        sousCategories: [
          {
            nom: "Entrepreneuriat & Gestion",
            sectionsDeTags: [
              {
                titre: "Création & Stratégie",
                tags: ["Business Plan", "Lean Startup", "Levée de fonds", "Stratégie d'entreprise", "Propriété intellectuelle"]
              },
              {
                titre: "Gestion de Projet",
                tags: ["Méthodes Agiles (Scrum)", "Planification", "Suivi-Évaluation"]
              }
            ]
          },
          {
            nom: "Développement Personnel & Leadership",
            sectionsDeTags: [
              {
                titre: "Communication",
                tags: ["Prise de parole en public", "Négociation", "Communication interculturelle", "Intelligence émotionnelle"]
              },
              {
                titre: "Efficacité Professionnelle",
                tags: ["Gestion du temps", "Travail en équipe", "Résolution de problèmes", "Adaptabilité"]
              }
            ]
          },
          {
            nom: "Développement Durable & RSE",
            sectionsDeTags: [
              {
                titre: "Environnement",
                tags: ["Gestion des déchets", "Économie circulaire", "Bilan Carbone", "Normes QHSE (Qualité, Hygiène, Sécurité, Environnement)"]
              },
              {
                titre: "Responsabilité Sociale",
                tags: ["Inclusion", "Éthique des affaires", "Impact social"]
              }
            ]
          }
        ]
      }
    ]
  }
};