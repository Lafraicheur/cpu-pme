/**
 * Helpers de validation stricte pour le formulaire d'adhésion
 * Sécurisation maximale + guidance utilisateur
 */

// ========== TYPES ==========
export interface ValidationError {
  field: string;
  message: string;
  severity: "error" | "warning";
}

export interface FieldValidationResult {
  isValid: boolean;
  error: string;
}

// ========== FONCTIONS DE VALIDATION STRICTES ==========

/**
 * Valide le nom du représentant
 * Min 3 caractères, max 100
 * Lettres et accents uniquement (pas de chiffres)
 */
export const validateRepresentativeName = (name: string): FieldValidationResult => {
  if (!name?.trim()) {
    return { isValid: false, error: "Le nom du représentant est obligatoire" };
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 3) {
    return { isValid: false, error: "Le nom doit contenir au minimum 3 caractères" };
  }

  if (trimmedName.length > 100) {
    return { isValid: false, error: "Le nom ne peut pas dépasser 100 caractères" };
  }

  // Regex: lettres, accents, espaces, tirets, apostrophes
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{3,100}$/;
  if (!nameRegex.test(trimmedName)) {
    return { isValid: false, error: "Le nom doit contenir uniquement des lettres (pas de chiffres ni symboles)" };
  }

  // Vérifier qu'il y a au moins une lettre réelle
  if (!/[a-zA-ZÀ-ÿ]/.test(trimmedName)) {
    return { isValid: false, error: "Le nom doit contenir au moins une lettre" };
  }

  return { isValid: true, error: "" };
};

/**
 * Valide la fonction/position (obligatoire)
 * Min 3, max 100 caractères
 */
export const validatePosition = (position: string): FieldValidationResult => {
  if (!position?.trim()) {
    return { isValid: false, error: "La fonction est obligatoire" };
  }

  const trimmedPosition = position.trim();

  if (trimmedPosition.length < 3) {
    return { isValid: false, error: "La fonction doit contenir au minimum 3 caractères" };
  }

  if (trimmedPosition.length > 100) {
    return { isValid: false, error: "La fonction ne peut pas dépasser 100 caractères" };
  }

  // Regex pour positions courantes (lettres, chiffres, tirets, parenthèses, etc.)
  const positionRegex = /^[a-zA-ZÀ-ÿ0-9\s/\-,.()'&]{3,100}$/;
  if (!positionRegex.test(trimmedPosition)) {
    return { isValid: false, error: "Caractères non autorisés dans la fonction" };
  }

  return { isValid: true, error: "" };
};

/**
 * Valide strictement le nom de l'organisation
 * CRITIQUE: Prevents injection attacks, phone numbers, etc.
 */
export const validateOrganisationName = (name: string): FieldValidationResult => {
  if (!name?.trim()) {
    return { isValid: false, error: "Le nom de l'organisation est obligatoire" };
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 3) {
    return { isValid: false, error: "Le nom doit contenir au minimum 3 caractères" };
  }

  if (trimmedName.length > 150) {
    return { isValid: false, error: "Le nom ne peut pas dépasser 150 caractères" };
  }

  // Regex stricte: lettres, accents, chiffres, tirets, slashes, parenthèses, ampersand
  const orgNameRegex = /^[a-zA-ZÀ-ÿ0-9\s\-/,.()'&]{3,150}$/;
  if (!orgNameRegex.test(trimmedName)) {
    return { isValid: false, error: "Le nom contient des caractères non autorisés" };
  }

  // IMPORTANT: Doit contenir au moins une lettre (empêche "123456789" ou "----")
  if (!/[a-zA-ZÀ-ÿ]/.test(trimmedName)) {
    return { isValid: false, error: "Le nom doit contenir au minimum une lettre" };
  }

  // Interdire les patterns suspects (numéros de téléphone, etc.)
  // Pattern: exactement 10 chiffres consécutifs = probablement un téléphone
  if (/^\d{10}$/.test(trimmedName.replace(/\s/g, ""))) {
    return { isValid: false, error: "Veuillez entrer le nom de votre organisation, pas un numéro de téléphone" };
  }

  return { isValid: true, error: "" };
};

/**
 * Valide l'email avec regex RFC
 */
export const validateEmail = (email: string): FieldValidationResult => {
  if (!email?.trim()) {
    return { isValid: false, error: "L'email est obligatoire" };
  }

  const trimmedEmail = email.trim();

  if (trimmedEmail.length > 150) {
    return { isValid: false, error: "L'email dépasse 150 caractères" };
  }

  // Regex RFC basique
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: "Format email invalide (exemple: user@company.com)" };
  }

  // Interdire les domaines temporaires courants
  const domain = trimmedEmail.split("@")[1].toLowerCase();
  const tempDomains = ["tempmail", "temp-mail", "10minutemail", "guerrillamail", "mailinator", "yopmail"];
  if (tempDomains.some((temp) => domain.includes(temp))) {
    return { isValid: false, error: "Veuillez utiliser une adresse email professionnelle" };
  }

  return { isValid: true, error: "" };
};

/**
 * Valide le numéro de téléphone (international + CI)
 * - International: format E.164 (+[code pays][numéro], 8 à 15 chiffres)
 * - Local CI: 10 chiffres commençant par 01-05, 07-09
 */
export const validatePhone = (phone: string): FieldValidationResult => {
  if (!phone?.trim()) {
    return { isValid: false, error: "Le numéro de téléphone est obligatoire" };
  }

  const value = phone.trim();
  const digitsOnly = value.replace(/\D/g, "");

  // Cas 1: numéro international avec + ou 00
  if (value.startsWith("+") || value.startsWith("00")) {
    const e164Digits = value.startsWith("00") ? value.slice(2).replace(/\D/g, "") : digitsOnly;
    if (!/^\d{8,15}$/.test(e164Digits)) {
      return {
        isValid: false,
        error: "Format international invalide (ex: +33612345678)",
      };
    }
    return { isValid: true, error: "" };
  }

  // Cas 2: numéro local CI (10 chiffres)
  if (/^\d{10}$/.test(digitsOnly)) {
    const validOperators = ["01", "02", "03", "04", "05", "07", "08", "09"];
    const firstTwoDigits = digitsOnly.substring(0, 2);
    if (!validOperators.includes(firstTwoDigits)) {
      return {
        isValid: false,
        error: "Numéro local invalide (CI attendu: commence par 01-05 ou 07-09)",
      };
    }
    return { isValid: true, error: "" };
  }

  return {
    isValid: false,
    error: "Format invalide. Exemples: +2250707558846, +33612345678 ou 0707558846",
  };
};

/**
 * Valide une URL de site web (optionnel)
 */
export const validateWebsite = (website: string): FieldValidationResult => {
  if (!website?.trim()) {
    return { isValid: true, error: "" }; // Optionnel
  }

  if (website.trim().length > 500) {
    return { isValid: false, error: "L'URL dépasse 500 caractères" };
  }

  try {
    const url = new URL(website);
    if (!["http:", "https:"].includes(url.protocol)) {
      return {
        isValid: false,
        error: "L'URL doit commencer par http:// ou https://",
      };
    }
    return { isValid: true, error: "" };
  } catch {
    return {
      isValid: false,
      error: "URL invalide (exemple: https://www.company.com)",
    };
  }
};

/**
 * Valide la description/message (optionnel car pas obligatoire dans formulaire)
 * Si rempli: min 20, max 1500
 */
export const validateDescription = (message: string): FieldValidationResult => {
  if (!message?.trim()) {
    return { isValid: true, error: "" }; // Optionnel
  }

  const trimmedMessage = message.trim();

  if (trimmedMessage.length < 20) {
    return { isValid: false, error: "La description doit contenir au minimum 20 caractères" };
  }

  if (trimmedMessage.length > 1500) {
    return { isValid: false, error: "La description dépasse 1500 caractères" };
  }

  // Interdire les tags HTML
  if (/<[^>]*>/g.test(trimmedMessage)) {
    return { isValid: false, error: "Les tags HTML ne sont pas autorisés" };
  }

  return { isValid: true, error: "" };
};

/**
 * Valide la rue/village (optionnel)
 */
export const validateVillage = (village: string): FieldValidationResult => {
  if (!village?.trim()) {
    return { isValid: true, error: "" }; // Optionnel
  }

  const trimmedVillage = village.trim();

  if (trimmedVillage.length < 3) {
    return { isValid: false, error: "Le quartier/rue doit contenir minimum 3 caractères" };
  }

  if (trimmedVillage.length > 100) {
    return { isValid: false, error: "Le quartier/rue ne peut pas dépasser 100 caractères" };
  }

  return { isValid: true, error: "" };
};

/**
 * Valide la sélection des activités
 */
export const validateActivities = (activities: string[]): FieldValidationResult => {
  if (!activities || activities.length === 0) {
    return { isValid: false, error: "Sélectionnez au minimum une activité" };
  }

  if (activities.length > 10) {
    return { isValid: false, error: "Maximum 10 activités autorisées" };
  }

  return { isValid: true, error: "" };
};

/**
 * Valide la sélection des secteurs/filières
 */
export const validateSectorSelection = (
  filiere: string,
  mainSector: string,
  subCategory: string | string[]
): FieldValidationResult => {
  if (!filiere?.trim()) {
    return { isValid: false, error: "Sélectionnez une filière" };
  }

  if (!mainSector?.trim()) {
    return { isValid: false, error: "Sélectionnez un secteur principal" };
  }

  const hasSubCategory = Array.isArray(subCategory)
    ? subCategory.length > 0
    : !!subCategory?.trim();

  if (!hasSubCategory) {
    return { isValid: false, error: "Sélectionnez une sous-filière" };
  }

  return { isValid: true, error: "" };
};

/**
 * Valide la localisation (commune, région)
 */
export const validateLocation = (commune: string, region: string): FieldValidationResult => {
  if (!region?.trim()) {
    return { isValid: false, error: "Sélectionnez une région" };
  }

  if (!commune?.trim()) {
    return { isValid: false, error: "Sélectionnez une commune" };
  }

  return { isValid: true, error: "" };
};

/**
 * Valide le nombre d'employés
 */
export const validateEmployeeCount = (
  adhesionType: string,
  employeeCount: string,
  subProfile?: string
): FieldValidationResult => {
  // Les institutionnels n'ont pas ce champ dans le formulaire
  if (!adhesionType || adhesionType === "institutionnel") {
    return { isValid: true, error: "" };
  }

  if (!employeeCount?.trim()) {
    return {
      isValid: false,
      error: "Veuillez sélectionner le nombre d'employés",
    };
  }

  return { isValid: true, error: "" };
};

/**
 * Validation complète du formulaire avant soumission
 * Retourne la liste de TOUS les erreurs trouvées
 */
export interface FormData {
  selectedAdhesionType: string;
  formName: string;
  formPosition: string;
  interventionScope: string;
  selectedRegions: string[];
  orgName: string;
  formEmail: string;
  formPhone: string;
  formWebsite: string;
  formMessage: string;
  selectedFiliere: string;
  selectedMainSector: string;
  selectedSubCategory: string | string[];
  selectedActivities: string[];
  siegeCommune: string;
  siegeRegion: string;
  siegeVille: string;
  siegeVillage: string;
  selectedBadge: string;
  numberOfEmployees: string;
  selectedSubProfile?: string;
}

export const validateCompleteForm = (formData: FormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Type de membre
  if (!formData.selectedAdhesionType?.trim()) {
    errors.push({
      field: "selectedAdhesionType",
      message: "Sélectionnez un type de membre",
      severity: "error",
    });
  }

  // Nom du représentant
  const nameValidation = validateRepresentativeName(formData.formName);
  if (!nameValidation.isValid) {
    errors.push({
      field: "formName",
      message: nameValidation.error,
      severity: "error",
    });
  }

  // Position (obligatoire)
  const positionValidation = validatePosition(formData.formPosition);
  if (!positionValidation.isValid) {
    errors.push({
      field: "formPosition",
      message: positionValidation.error,
      severity: "error",
    });
  }

  // Profil
  if (!formData.selectedSubProfile?.trim()) {
    errors.push({
      field: "selectedSubProfile",
      message: "Sélectionnez un profil",
      severity: "error",
    });
  }

  // Nom organisation
  if (formData.selectedAdhesionType !== "individuel") {
    const orgNameValidation = validateOrganisationName(formData.orgName);
    if (!orgNameValidation.isValid) {
      errors.push({
        field: "orgName",
        message: orgNameValidation.error,
        severity: "error",
      });
    }
  }

  // Email
  const emailValidation = validateEmail(formData.formEmail);
  if (!emailValidation.isValid) {
    errors.push({
      field: "formEmail",
      message: emailValidation.error,
      severity: "error",
    });
  }

  // Téléphone
  const phoneValidation = validatePhone(formData.formPhone);
  if (!phoneValidation.isValid) {
    errors.push({
      field: "formPhone",
      message: phoneValidation.error,
      severity: "error",
    });
  }

  // Site web (optionnel)
  const websiteValidation = validateWebsite(formData.formWebsite);
  if (!websiteValidation.isValid) {
    errors.push({
      field: "formWebsite",
      message: websiteValidation.error,
      severity: "error",
    });
  }

  // Description (optionnel)
  const descValidation = validateDescription(formData.formMessage);
  if (!descValidation.isValid) {
    errors.push({
      field: "formMessage",
      message: descValidation.error,
      severity: "error",
    });
  }

  // Secteur/Filière (sauf institutionnel)
  if (formData.selectedAdhesionType !== "institutionnel") {
    const sectorValidation = validateSectorSelection(
      formData.selectedFiliere,
      formData.selectedMainSector,
      formData.selectedSubCategory
    );
    if (!sectorValidation.isValid) {
      errors.push({
        field: "selectedSubCategory",
        message: sectorValidation.error,
        severity: "error",
      });
    }

    // Activités / Corps de métiers (obligatoire hors federation_filiere)
    if (formData.selectedSubProfile !== "federation_filiere") {
      const activitiesValidation = validateActivities(formData.selectedActivities);
      if (!activitiesValidation.isValid) {
        errors.push({
          field: "selectedActivities",
          message: activitiesValidation.error,
          severity: "error",
        });
      }
    }
  }

  // Portée de l'intervention (obligatoire pour les types non institutionnels)
  if (formData.selectedAdhesionType !== "institutionnel") {
    if (!formData.interventionScope?.trim()) {
      errors.push({
        field: "interventionScope",
        message: "Sélectionnez la portée de l'intervention",
        severity: "error",
      });
    }

    // Si portée par régions spécifiques, au moins une région est requise
    if (
      formData.interventionScope === "regions_specifiques" &&
      (!Array.isArray(formData.selectedRegions) || formData.selectedRegions.length === 0)
    ) {
      errors.push({
        field: "selectedRegions",
        message: "Sélectionnez au moins une région d'intervention",
        severity: "error",
      });
    }
  }

  // Localisation
  const locationValidation = validateLocation(
    formData.siegeCommune,
    formData.siegeRegion
  );
  if (!locationValidation.isValid) {
    errors.push({
      field: "siegeCommune",
      message: locationValidation.error,
      severity: "error",
    });
  }

  // Nombre d'employés
  const employeeValidation = validateEmployeeCount(
    formData.selectedAdhesionType,
    formData.numberOfEmployees,
    formData.selectedSubProfile
  );
  if (!employeeValidation.isValid) {
    errors.push({
      field: "numberOfEmployees",
      message: employeeValidation.error,
      severity: "error",
    });
  }

  // Formule/Abonnement
  if (!formData.selectedBadge?.trim()) {
    errors.push({
      field: "selectedBadge",
      message: "Sélectionnez une formule d'abonnement",
      severity: "error",
    });
  }

  return errors;
};

/**
 * Nettoie et trim les valeurs texte
 */
export const sanitizeText = (text: string): string => {
  if (!text) return "";
  // Trim, remplacer espaces multiples par un seul
  return text.trim().replace(/[\s\n\r\t]+/g, " ");
};

/**
 * Encode les caractères HTML dangereux
 * CRITIQUE pour prévention XSS côté client
 */
export const sanitizeHtml = (text: string): string => {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

/**
 * Valide et trime un UUID v4
 * Prévient les injections de valeurs arbitraires
 */
export const isValidUuid = (uuid: string | undefined): boolean => {
  if (!uuid || typeof uuid !== "string") return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid.trim());
};

/**
 * Valide l'email de façon stricte (RFC + patterns suspects)
 */
export const isValidEmailStrict = (email: string): boolean => {
  if (!email || typeof email !== "string") return false;
  
  const trimmed = email.trim().toLowerCase();
  
  // Pattern RFC 5322 simplifié
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) return false;
  
  // Rejette les patterns suspects
  if (trimmed.includes("../") || trimmed.includes("\\") || trimmed.includes(";")) {
    return false;
  }
  
  // Rejette les domaines temporaires
  const domain = trimmed.split("@")[1];
  const tempDomains = [
    "tempmail", "temp-mail", "10minutemail", "guerrillamail",
    "mailinator", "yopmail", "throwaway", "maildrop",
    "trashmail", "fakeinbox", "grr.la", "bugmenot"
  ];
  
  return !tempDomains.some((temp) => domain.includes(temp));
};

/**
 * Valide une URL strictement (rejette protocoles dangereux)
 */
export const isValidUrlStrict = (url: string): boolean => {
  if (!url || typeof url !== "string") return true; // Optionnel
  
  try {
    const parsed = new URL(url);
    
    // Rejette les protocoles dangereux
    const dangerousProtocols = ["javascript", "data", "file", "vbscript", "about"];
    const protocol = parsed.protocol.replace(":", "").toLowerCase();
    if (dangerousProtocols.includes(protocol)) return false;
    
    // Doit être http ou https
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
};

/**
 * Nettoie une URL pour l'envoi API
 * Enlève les ancres, paramètres suspectes, etc.
 */
export const cleanUrl = (url: string): string => {
  if (!url) return "";
  
  try {
    const parsed = new URL(url);
    // Garder juste le protocole + domaine + path (sans query/hash)
    return sanitizeHtml(`${parsed.protocol}//${parsed.hostname}${parsed.pathname}`);
  } catch {
    return sanitizeHtml(url);
  }
};

/**
 * Formate un numéro de téléphone de façon sûre pour l'API
 * - International: normalise vers +XXXXXXXX
 * - Local CI (10 chiffres): convertit en +225XXXXXXXXXX
 */
export const formatPhoneCI = (phone: string): string => {
  if (!phone) return "";

  const value = phone.trim();

  // Déjà international avec +
  if (value.startsWith("+")) {
    return `+${value.slice(1).replace(/\D/g, "")}`;
  }

  // International commençant par 00
  if (value.startsWith("00")) {
    return `+${value.slice(2).replace(/\D/g, "")}`;
  }

  const digitsOnly = value.replace(/\D/g, "");

  // Local CI (10 chiffres)
  if (/^\d{10}$/.test(digitsOnly)) {
    return `+225${digitsOnly}`;
  }

  // Fallback: conserver la valeur d'origine nettoyée
  return digitsOnly;
};
