// Mapping entre les sous-secteurs et les secteurs de membres
// Ce fichier permet de faire le lien entre les sous-secteurs détaillés et les secteurs utilisés dans les données membres
// Structure mise à jour selon CPU-PME Organisation sectoriel V4

export interface SectorMapping {
  secteurKey: string; // clé du secteur (primaire, secondaire, etc.)
  filiereId: string; // id de la filière
  sousCategorieNom: string; // nom de la sous-catégorie
  sectionTitre?: string; // titre de la section (optionnel)
  memberSector: string; // secteur correspondant dans les données membres
}

// Mapping principal : sous-secteurs -> secteurs membres
export const sectorToMemberMapping: Record<string, string> = {
  // ========================================================================
  // SECTEUR PRIMAIRE
  // ========================================================================
  "Agriculture végétale": "Agriculture & Agroalimentaire",
  "Céréales & légumineuses": "Agriculture & Agroalimentaire",
  "Racines, tubercules & plantain": "Agriculture & Agroalimentaire",
  "Maraîchage & horticulture": "Agriculture & Agroalimentaire",
  "Fruits tropicaux & export": "Agriculture & Agroalimentaire",
  "Cultures de rente": "Agriculture & Agroalimentaire",
  "Plantes aromatiques, médicinales & épices": "Agriculture & Agroalimentaire",
  "Agriculture durable": "Agriculture & Agroalimentaire",
  
  "Élevage & productions animales": "Agriculture & Agroalimentaire",
  "Bovin & lait": "Agriculture & Agroalimentaire",
  "Ovin-caprin": "Agriculture & Agroalimentaire",
  "Porcin": "Agriculture & Agroalimentaire",
  "Aviculture": "Agriculture & Agroalimentaire",
  "Élevages alternatifs": "Agriculture & Agroalimentaire",
  
  "Pêche & aquaculture": "Agriculture & Agroalimentaire",
  "Pêche artisanale maritime": "Agriculture & Agroalimentaire",
  "Pêche lagunaire & continentale": "Agriculture & Agroalimentaire",
  "Aquaculture & pisciculture": "Agriculture & Agroalimentaire",
  
  "Services, intrants & AgriTech": "Agriculture & Agroalimentaire",
  "Intrants agricoles": "Agriculture & Agroalimentaire",
  "Mécanisation & maintenance": "Agriculture & Agroalimentaire",
  "Irrigation & eau agricole": "Agriculture & Agroalimentaire",
  "AgriTech & données": "Agriculture & Agroalimentaire",
  "Logistique agricole": "Agriculture & Agroalimentaire",
  
  "Agro-transformation & agroalimentaire PME": "Agriculture & Agroalimentaire",
  "Manioc & dérivés": "Agriculture & Agroalimentaire",
  "Céréales & farines": "Agriculture & Agroalimentaire",
  "Fruits & légumes transformés": "Agriculture & Agroalimentaire",
  "Huiles & oléagineux": "Agriculture & Agroalimentaire",
  "Cacao/anacarde transformés": "Agriculture & Agroalimentaire",
  "Viandes, poissons & produits laitiers": "Agriculture & Agroalimentaire",
  "Boissons locales & artisanales": "Agriculture & Agroalimentaire",
  "Boulangerie, pâtisserie & confiserie": "Agriculture & Agroalimentaire",
  "Aliments pour bétail & volaille": "Agriculture & Agroalimentaire",
  
  // ========================================================================
  // SECTEUR SECONDAIRE
  // ========================================================================
  "Industrie & transformation": "Industrie & Transformation",
  "Textile, habillement & mode": "Industrie & Transformation",
  "Cuir, chaussure & maroquinerie": "Industrie & Transformation",
  "Plasturgie & emballages": "Industrie & Transformation",
  "Métallurgie légère & mécanique": "Industrie & Transformation",
  "Bois & ameublement": "Industrie & Transformation",
  "Imprimerie & packaging": "Industrie & Transformation",
  "Chimie légère & hygiène": "Industrie & Transformation",
  "Cosmétique & beauté": "Industrie & Transformation",
  "Matériaux industriels divers": "Industrie & Transformation",
  "Fabrication/assemblage d'équipements": "Industrie & Transformation",
  "Réparation & reconditionnement industriel": "Industrie & Transformation",
  
  "Artisanat de production & industries du patrimoine": "Industrie & Transformation",
  "Artisanat d'art": "Industrie & Transformation",
  "Artisanat utilitaire": "Industrie & Transformation",
  "Mode & textile traditionnel": "Industrie & Transformation",
  
  "BTP, construction & immobilier": "BTP & Construction",
  "Gros œuvre & génie civil": "BTP & Construction",
  "Second œuvre & finitions": "BTP & Construction",
  "Études, architecture & ingénierie": "BTP & Construction",
  "Promotion & gestion immobilière": "BTP & Construction",
  "Production & négoce matériaux": "BTP & Construction",
  "Éco-construction": "BTP & Construction",
  
  "Énergie & services associés": "Énergie & Environnement",
  "Énergies renouvelables": "Énergie & Environnement",
  "Efficacité énergétique": "Énergie & Environnement",
  "Gaz butane & distribution": "Énergie & Environnement",
  "Services énergétiques PME": "Énergie & Environnement",
  
  "Environnement industriel & économie circulaire": "Énergie & Environnement",
  "Déchets & recyclage": "Énergie & Environnement",
  "Eau & assainissement": "Énergie & Environnement",
  "Services environnementaux": "Énergie & Environnement",
  
  "Mines, carrières & sous-traitance": "Énergie & Environnement",
  "Carrières & granulats": "Énergie & Environnement",
  "Sous-traitance minière": "Énergie & Environnement",
  "Laboratoires & exploration PME": "Énergie & Environnement",
  
  // ========================================================================
  // SECTEUR TERTIAIRE
  // ========================================================================
  "Commerce & distribution": "Commerce & Distribution",
  "Commerce de détail": "Commerce & Distribution",
  "Gros, semi-gros & centrales": "Commerce & Distribution",
  "Commerce international": "Commerce & Distribution",
  "E-commerce": "Commerce & Distribution",
  "Distribution spécialisée": "Commerce & Distribution",
  
  "Services": "Services & Conseil",
  "Services professionnels": "Services & Conseil",
  "Marketing, communication & design": "Services & Conseil",
  "BPO & services administratifs": "Services & Conseil",
  "Services opérationnels": "Services & Conseil",
  "Services techniques & réparations": "Services & Conseil",
  "Services à la personne": "Services & Conseil",
  "Restauration & traiteurs": "Services & Conseil",
  "Économie sociale & solidaire": "Services & Conseil",
  
  "Transport, logistique & mobilité": "Transport & Logistique",
  "Logistique urbaine & dernier kilomètre": "Transport & Logistique",
  "Messagerie & express": "Transport & Logistique",
  "Transport routier par camion": "Transport & Logistique",
  "Transport urbain de personnes": "Transport & Logistique",
  "Transport par bus": "Transport & Logistique",
  "VTC & mobilité à la demande": "Transport & Logistique",
  "Entreposage & plateformes": "Transport & Logistique",
  "Transit, douane, affrètement": "Transport & Logistique",
  "Maritime & portuaire": "Transport & Logistique",
  "Ravitaillement maritime & offshore": "Transport & Logistique",
  "Lagunaire/fluvial & bateaux-bus": "Transport & Logistique",
  "Ferroviaire (services connexes PME)": "Transport & Logistique",
  "Aérien & aéroportuaire": "Transport & Logistique",
  "LogiTech": "Transport & Logistique",
  
  "Tourisme, culture & loisirs": "Tourisme & Hôtellerie",
  "Hébergement": "Tourisme & Hôtellerie",
  "Restauration touristique": "Tourisme & Hôtellerie",
  "Voyages & guidage": "Tourisme & Hôtellerie",
  "Loisirs & sports": "Tourisme & Hôtellerie",
  "Industries créatives & culturelles": "Tourisme & Hôtellerie",
  
  "Finance & assurances": "Services & Conseil",
  "Microfinance & SFD": "Services & Conseil",
  "Assurances & courtage": "Services & Conseil",
  "FinTech & paiements": "Services & Conseil",
  "Transfert d'argent & change": "Services & Conseil",
  "Services de bancabilité": "Services & Conseil",
  
  // ========================================================================
  // SECTEUR QUATERNAIRE
  // ========================================================================
  "Numérique & technologies": "Technologie & Digital",
  "Développement logiciel": "Technologie & Digital",
  "Infra, cloud & réseaux": "Technologie & Digital",
  "Cybersécurité": "Technologie & Digital",
  "Data, IA & IoT": "Technologie & Digital",
  "Télécoms & services numériques": "Technologie & Digital",
  "Matériel & réparation": "Technologie & Digital",
  "Services de marketing digital": "Technologie & Digital",
  
  "Éducation & formation": "Services & Conseil",
  "Écoles privées": "Services & Conseil",
  "Enseignement supérieur privé": "Services & Conseil",
  "Formation professionnelle": "Services & Conseil",
  "EdTech": "Services & Conseil",
  "Coaching & langues": "Services & Conseil",
  
  "Santé & sciences de la vie": "Santé & Pharmaceutique",
  "Cliniques & cabinets": "Santé & Pharmaceutique",
  "Laboratoires & imagerie": "Santé & Pharmaceutique",
  "Pharmacies & distribution": "Santé & Pharmaceutique",
  "Dispositifs médicaux": "Santé & Pharmaceutique",
  "HealthTech": "Santé & Pharmaceutique",
  "Phytothérapie modernisée": "Santé & Pharmaceutique",
  
  "Recherche, ingénierie & qualité": "Services & Conseil",
  "Bureaux d'ingénierie avancée": "Services & Conseil",
  "Laboratoires d'essais & contrôle qualité": "Services & Conseil",
  "Normalisation & certification": "Services & Conseil",
  "Propriété intellectuelle & transfert": "Services & Conseil",
  
  // ========================================================================
  // FILIÈRES TRANSVERSALES
  // ========================================================================
  "Financement & accès au crédit": "Services & Conseil",
  "Garanties & fonds": "Services & Conseil",
  "Bancabilité & préparation": "Services & Conseil",
  
  "Exportation & internationalisation": "Services & Conseil",
  "Normes & certification export": "Services & Conseil",
  "Accès marchés CEDEAO/UEMOA/ZLECAf": "Services & Conseil",
  
  "Transformation digitale des PME": "Technologie & Digital",
  "Outils de gestion": "Technologie & Digital",
  "Commerce digital": "Technologie & Digital",
  
  "Développement durable & RSE": "Services & Conseil",
  "Conformité environnementale": "Services & Conseil",
  "Valorisation déchets & économie circulaire": "Services & Conseil",
  
  "Innovation, incubation & accélération": "Services & Conseil",
  "Incubateurs & hubs": "Services & Conseil",
  "Propriété intellectuelle": "Services & Conseil",
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