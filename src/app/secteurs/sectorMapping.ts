// Mapping entre les sous-secteurs et les secteurs de membres
// Ce fichier permet de faire le lien entre les sous-secteurs détaillés et les secteurs utilisés dans les données membres

export interface SectorMapping {
  secteurKey: string; // clé du secteur (primaire, secondaire, etc.)
  filiereId: string; // id de la filière
  sousCategorieNom: string; // nom de la sous-catégorie
  sectionTitre?: string; // titre de la section (optionnel)
  memberSector: string; // secteur correspondant dans les données membres
}

// Mapping principal : sous-secteurs -> secteurs membres
export const sectorToMemberMapping: Record<string, string> = {
  // Secteur Primaire - Agriculture & Agro-industrie
  "Agriculture & Agro-industrie": "Agriculture & Agroalimentaire",
  "Productions": "Agriculture & Agroalimentaire",
  "Élevage & Aviculture": "Agriculture & Agroalimentaire",
  "Pêche & Aquaculture": "Agriculture & Agroalimentaire",
  "Agro-transformation": "Agriculture & Agroalimentaire",
  "Distribution & Logistique Agricoles": "Agriculture & Agroalimentaire",
  "Intrants": "Agriculture & Agroalimentaire",
  
  // Secteur Secondaire - Industrie & Transformation
  "Industrie & Transformation": "Industrie & Transformation",
  "Manufacture Textile": "Industrie & Transformation",
  "Transformation Plastique": "Industrie & Transformation",
  "Boissons & Brasseries": "Industrie & Transformation",
  "Matériaux de Construction": "Industrie & Transformation",
  "Industrie Métallurgique": "Industrie & Transformation",
  "Imprimerie & Papier": "Industrie & Transformation",
  "Chimie Légère": "Industrie & Transformation",
  "Fabrication PME & Transformation Locale": "Industrie & Transformation",
  
  // Secteur Tertiaire - Commerce & Distribution
  "Commerce & Distribution": "Commerce & Distribution",
  "Commerce": "Commerce & Distribution",
  
  // Secteur Tertiaire - Services
  "Services": "Services & Conseil",
  "Services Professionnels": "Services & Conseil",
  "Services aux Entreprises": "Services & Conseil",
  "Services aux Particuliers": "Services & Conseil",
  "Call Centers & BPO": "Services & Conseil",
  "Marketing, Communication & Publicité": "Services & Conseil",
  "Services Techniques & Artisanaux": "Services & Conseil",
  
  // Secteur Tertiaire - Transport & Logistique
  "Transport & Logistique": "Transport & Logistique",
  "Transport": "Transport & Logistique",
  "Logistique": "Transport & Logistique",
  
  // Secteur Tertiaire - Construction & Immobilier
  "Construction & Immobilier": "BTP & Construction",
  "BTP": "BTP & Construction",
  "Architecture & Ingénierie": "BTP & Construction",
  "Matériaux": "BTP & Construction",
  "Immobilier": "BTP & Construction",
  
  // Secteur Tertiaire - Énergie & Environnement
  "Énergie & Environnement": "Énergie & Environnement",
  "Énergie": "Énergie & Environnement",
  "Environnement": "Énergie & Environnement",
  
  // Secteur Tertiaire - Finance & Assurances
  "Finance & Assurances": "Services & Conseil",
  "Finance": "Services & Conseil",
  "Assurances": "Services & Conseil",
  
  // Secteur Tertiaire - Tourisme, Culture & Loisirs
  "Tourisme, Culture & Loisirs": "Tourisme & Hôtellerie",
  "Hébergement & Accueil": "Tourisme & Hôtellerie",
  "Restauration": "Tourisme & Hôtellerie",
  "Transport Touristique": "Tourisme & Hôtellerie",
  "Événementiel": "Tourisme & Hôtellerie",
  "Arts & Médias": "Tourisme & Hôtellerie",
  
  // Secteur Quaternaire - Numérique & Technologies
  "Numérique & Technologies": "Technologie & Digital",
  "Développement Logiciel": "Technologie & Digital",
  "IA, Data & Robotique": "Technologie & Digital",
  "FinTech": "Technologie & Digital",
  "Cybersécurité": "Technologie & Digital",
  "SaaS": "Technologie & Digital",
  "Telecom & Opérateurs": "Technologie & Digital",
  "Infrastructure & Réseaux": "Technologie & Digital",
  "Marketing Digital": "Technologie & Digital",
  "Startups Tech": "Technologie & Digital",
  
  // Secteur Quaternaire - Éducation & Formation
  "Éducation & Formation": "Services & Conseil",
  "Écoles Privées": "Services & Conseil",
  "Formation Professionnelle": "Services & Conseil",
  "E-learning": "Services & Conseil",
  "Édition Scolaire": "Services & Conseil",
  "Formateurs Indépendants": "Services & Conseil",
  
  // Secteur Quaternaire - Santé & Sciences de la Vie
  "Santé & Sciences de la Vie": "Santé & Pharmaceutique",
  "Cliniques Privées": "Santé & Pharmaceutique",
  "Pharmacies": "Santé & Pharmaceutique",
  "Laboratoires d'Analyse": "Santé & Pharmaceutique",
  "Fournisseurs de Matériel Médical": "Santé & Pharmaceutique",
  "Agro-pharmacie": "Santé & Pharmaceutique",
};

// Fonction pour obtenir le secteur membre à partir d'un sous-secteur
export function getMemberSectorFromSubSector(
  filiereNom: string,
  sousCategorieNom: string,
  sectionTitre?: string
): string | null {
  // Essayer d'abord avec le nom de la filière
  if (sectorToMemberMapping[filiereNom]) {
    return sectorToMemberMapping[filiereNom];
  }
  
  // Essayer avec le nom de la sous-catégorie
  if (sectorToMemberMapping[sousCategorieNom]) {
    return sectorToMemberMapping[sousCategorieNom];
  }
  
  // Essayer avec le titre de la section si fourni
  if (sectionTitre && sectorToMemberMapping[sectionTitre]) {
    return sectorToMemberMapping[sectionTitre];
  }
  
  return null;
}

// Fonction pour créer un identifiant unique pour un sous-secteur
export function createSubSectorId(
  secteurKey: string,
  filiereId: string,
  sousCategorieNom: string,
  sectionTitre?: string
): string {
  const parts = [secteurKey, filiereId, sousCategorieNom];
  if (sectionTitre) {
    parts.push(sectionTitre);
  }
  return parts.map(p => p.toLowerCase().replace(/\s+/g, '-')).join('--');
}

// Fonction pour décoder un identifiant de sous-secteur
export function decodeSubSectorId(id: string): {
  secteurKey: string;
  filiereId: string;
  sousCategorieNom: string;
  sectionTitre?: string;
} | null {
  const parts = id.split('--');
  if (parts.length < 3) return null;
  
  return {
    secteurKey: parts[0],
    filiereId: parts[1],
    sousCategorieNom: parts[2].replace(/-/g, ' '),
    sectionTitre: parts[3] ? parts[3].replace(/-/g, ' ') : undefined,
  };
}
