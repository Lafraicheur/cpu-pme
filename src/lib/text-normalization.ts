/**
 * Utilitaire de normalisation de texte pour corriger les problèmes d'encodage
 * 
 * Gère :
 * - Normalisation UTF-8
 * - Correction des caractères mal encodés
 * - Décodage des entités HTML
 * - Interprétation des séquences Unicode JSON
 * - Suppression des caractères invisibles/contrôle
 * 
 * Approche idempotente : plusieurs passages ne dégradent pas le texte
 */

/**
 * Table de mapping pour les corruptions d'encodage les plus courantes
 * Ces patterns apparaissent quand du UTF-8 est mal interprété comme ISO-8859-1 ou Windows-1252
 */
const ENCODING_CORRUPTION_MAP: Record<string, string> = {
  // Apostrophes et guillemets (double encodage UTF-8)
  '\u00E2\u0080\u0099': '\u2019',  // â€™ → ' (apostrophe)
  '\u00E2\u0080\u0098': '\u2018',  // â€˜ → ' (guillemet simple ouvrant)
  '\u00E2\u0080\u009C': '\u201C',  // â€œ → " (guillemet double ouvrant)
  '\u00E2\u0080\u009D': '\u201D',  // â€ → " (guillemet double fermant)
  '\u00E2\u0080\u0094': '\u2014',  // â€" → — (tiret cadratin)
  '\u00E2\u0080\u0093': '\u2013',  // â€" → – (tiret demi-cadratin)
  '\u00E2\u0080\u00A6': '\u2026',  // â€¦ → ... (points de suspension)
  
  // Caractères accentués français (double encodage UTF-8)
  '\u00C3\u00A9': '\u00E9',  // Ã© → é
  '\u00C3\u00A8': '\u00E8',  // Ã¨ → è
  '\u00C3\u00AA': '\u00EA',  // Ãª → ê
  '\u00C3\u00AB': '\u00EB',  // Ã« → ë
  '\u00C3\u00A0': '\u00E0',  // Ã  → à
  '\u00C3\u00A2': '\u00E2',  // Ã¢ → â
  '\u00C3\u00A7': '\u00E7',  // Ã§ → ç
  '\u00C3\u00B4': '\u00F4',  // Ã´ → ô
  '\u00C3\u00B9': '\u00F9',  // Ã¹ → ù
  '\u00C3\u00BB': '\u00FB',  // Ã» → û
  '\u00C3\u00AF': '\u00EF',  // Ã¯ → ï
  '\u00C3\u00AE': '\u00EE',  // Ã® → î
  
  // Majuscules accentuées
  '\u00C3\u0089': '\u00C9',  // Ã‰ → É
  '\u00C3\u0088': '\u00C8',  // Ãˆ → È
  '\u00C3\u008A': '\u00CA',  // ÃŠ → Ê
  '\u00C3\u0080': '\u00C0',  // Ã€ → À
  '\u00C3\u0082': '\u00C2',  // Ã‚ → Â
  '\u00C3\u0087': '\u00C7',  // Ã‡ → Ç
  '\u00C3\u0094': '\u00D4',  // Ã" → Ô
  '\u00C3\u0099': '\u00D9',  // Ã™ → Ù
  '\u00C3\u009B': '\u00DB',  // Ã› → Û
  '\u00C3\u008E': '\u00CE',  // ÃŽ → Î
  '\u00C3\u008F': '\u00CF',  // Ã → Ï
  
  // Ligatures
  '\u00C5\u0093': '\u0153',  // Å" → œ (oe ligature)
  '\u00C5\u0152': '\u0152',  // Å' → Œ (OE ligature majuscule)
  '\u00C3\u00A6': '\u00E6',  // Ã¦ → æ
  '\u00C3\u0086': '\u00C6',  // Ã† → Æ
  
  // Caractères spéciaux Windows-1252
  '\u00E2\u0082\u00AC': '\u20AC',  // â‚¬ → €
  '\u00E2\u0080\u009A': '\u201A',  // â€š → ‚
  '\u00E2\u0080\u009E': '\u201E',  // â€ž → „
  '\u00E2\u0080\u00B0': '\u2030',  // â€° → ‰
  '\u00E2\u0080\u00B9': '\u2039',  // â€¹ → ‹
  '\u00E2\u0080\u00BA': '\u203A',  // â€º → ›
  '\u00E2\u0080\u00A2': '\u2022',  // â€¢ → •
  '\u00E2\u0084\u00A2': '\u2122',  // â„¢ → ™
  
  // Espaces non-cassables
  '\u00C2\u00A0': '\u0020',  // Â  → espace normal
  '\u00A0': '\u0020',        // nbsp → espace normal
  '\u00C2': '',              // Â seul → supprimé
};

/**
 * Entités HTML courantes à décoder
 */
const HTML_ENTITIES: Record<string, string> = {
  '&nbsp;': ' ',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': "'",
  '&#39;': "'",
  '&eacute;': 'é',
  '&egrave;': 'è',
  '&ecirc;': 'ê',
  '&agrave;': 'à',
  '&acirc;': 'â',
  '&ccedil;': 'ç',
  '&ocirc;': 'ô',
  '&ugrave;': 'ù',
  '&ucirc;': 'û',
  '&iuml;': 'ï',
  '&euml;': 'ë',
  '&Eacute;': 'É',
  '&Egrave;': 'È',
  '&Ecirc;': 'Ê',
  '&Agrave;': 'À',
  '&Acirc;': 'Â',
  '&Ccedil;': 'Ç',
  '&euro;': '€',
  '&deg;': '°',
  '&copy;': '©',
  '&reg;': '®',
  '&trade;': '™',
  '&hellip;': '...',
  '&ndash;': '–',
  '&mdash;': '—',
  '&laquo;': '«',
  '&raquo;': '»',
  '&rsquo;': '\u2019',
  '&lsquo;': '\u2018',
  '&rdquo;': '\u201D',
  '&ldquo;': '\u201C',
};

/**
 * Caractères de contrôle et invisibles à supprimer
 */
const CONTROL_CHARS_REGEX = /[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F-\u009F\uFEFF]/g;

/**
 * BOM UTF-8 (Byte Order Mark)
 */
const UTF8_BOM = '\uFEFF';

/**
 * Étape 1 : Supprime le BOM UTF-8 et les caractères de contrôle
 */
function removeControlCharacters(text: string): string {
  if (!text) return text;
  
  // Supprimer le BOM UTF-8
  let cleaned = text.replace(new RegExp(UTF8_BOM, 'g'), '');
  
  // Supprimer les caractères de contrôle (sauf \n, \r, \t)
  cleaned = cleaned.replace(CONTROL_CHARS_REGEX, '');
  
  return cleaned;
}

/**
 * Étape 2 : Corrige les séquences Unicode JSON mal échappées
 * Ex: \u00e9 -> é
 */
function decodeJsonUnicode(text: string): string {
  if (!text) return text;
  
  try {
    // Recherche les séquences \uXXXX
    return text.replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => {
      return String.fromCharCode(parseInt(hex, 16));
    });
  } catch (error) {
    console.warn('Erreur lors du décodage Unicode JSON:', error);
    return text;
  }
}

/**
 * Étape 3 : Décode les entités HTML
 */
function decodeHtmlEntities(text: string): string {
  if (!text) return text;
  
  let decoded = text;
  
  // Entités nommées
  Object.entries(HTML_ENTITIES).forEach(([entity, char]) => {
    decoded = decoded.replace(new RegExp(entity, 'g'), char);
  });
  
  // Entités numériques décimales (&#233; -> é)
  decoded = decoded.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(parseInt(dec, 10));
  });
  
  // Entités numériques hexadécimales (&#xE9; -> é)
  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
  
  return decoded;
}

/**
 * Étape 4 : Corrige les corruptions d'encodage courantes
 * Applique le mapping déterministe
 */
function fixEncodingCorruption(text: string): string {
  if (!text) return text;
  
  let fixed = text;
  
  // Trier les clés par longueur décroissante pour éviter les remplacements partiels
  const sortedKeys = Object.keys(ENCODING_CORRUPTION_MAP).sort((a, b) => b.length - a.length);
  
  sortedKeys.forEach(corrupted => {
    const correct = ENCODING_CORRUPTION_MAP[corrupted];
    fixed = fixed.replace(new RegExp(corrupted.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), correct);
  });
  
  return fixed;
}

/**
 * Étape 5 : Normalisation Unicode NFC
 * Assure une représentation canonique cohérente
 */
function normalizeUnicode(text: string): string {
  if (!text) return text;
  
  try {
    // NFC (Canonical Composition) : forme canonique composée
    // é (U+00E9) plutôt que e + ´ (U+0065 + U+0301)
    return text.normalize('NFC');
  } catch (error) {
    console.warn('Erreur lors de la normalisation Unicode:', error);
    return text;
  }
}

/**
 * Étape 6 : Nettoyage final
 * - Supprime les espaces multiples
 * - Trim les espaces en début/fin
 */
function finalCleanup(text: string): string {
  if (!text) return text;
  
  // Remplacer les espaces multiples par un seul
  let cleaned = text.replace(/\s+/g, ' ');
  
  // Nettoyer les espaces autour des signes de ponctuation
  cleaned = cleaned.replace(/\s+([,;:.!?])/g, '$1');
  cleaned = cleaned.replace(/([«])\s+/g, '$1 ');
  cleaned = cleaned.replace(/\s+([»])/g, ' $1');
  
  return cleaned.trim();
}

/**
 * FONCTION PRINCIPALE : Normalise le texte en appliquant toutes les étapes
 * 
 * Ordre d'exécution :
 * 1. Suppression BOM et caractères de contrôle
 * 2. Décodage des séquences Unicode JSON
 * 3. Décodage des entités HTML
 * 4. Correction des corruptions d'encodage
 * 5. Normalisation Unicode NFC
 * 6. Nettoyage final
 * 
 * Cette fonction est idempotente : plusieurs appels successifs donnent le même résultat
 */
export function normalizeText(text: string | null | undefined): string {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  try {
    let normalized = text;
    
    // Étape 1 : Supprimer les caractères de contrôle et BOM
    normalized = removeControlCharacters(normalized);
    
    // Étape 2 : Décoder les séquences Unicode JSON
    normalized = decodeJsonUnicode(normalized);
    
    // Étape 3 : Décoder les entités HTML
    normalized = decodeHtmlEntities(normalized);
    
    // Étape 4 : Corriger les corruptions d'encodage
    normalized = fixEncodingCorruption(normalized);
    
    // Étape 5 : Normaliser Unicode
    normalized = normalizeUnicode(normalized);
    
    // Étape 6 : Nettoyage final
    normalized = finalCleanup(normalized);
    
    return normalized;
  } catch (error) {
    console.error('Erreur lors de la normalisation du texte:', error);
    return text;
  }
}

/**
 * Normalise récursivement toutes les chaînes de caractères dans un objet
 * Supporte les objets imbriqués et les tableaux
 */
export function normalizeObject<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  // Cas simple : chaîne de caractères
  if (typeof obj === 'string') {
    return normalizeText(obj) as T;
  }
  
  // Cas tableau
  if (Array.isArray(obj)) {
    return obj.map(item => normalizeObject(item)) as T;
  }
  
  // Cas objet
  if (typeof obj === 'object') {
    const normalized: any = {};
    
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        normalized[key] = normalizeObject((obj as any)[key]);
      }
    }
    
    return normalized as T;
  }
  
  // Autres types (number, boolean, etc.) : retour inchangé
  return obj;
}

/**
 * Teste si un texte contient des corruptions d'encodage connues
 * Utile pour le monitoring et les logs
 */
export function hasEncodingIssues(text: string): boolean {
  if (!text || typeof text !== 'string') {
    return false;
  }
  
  // Vérifier la présence de patterns de corruption
  for (const corrupted of Object.keys(ENCODING_CORRUPTION_MAP)) {
    if (text.includes(corrupted)) {
      return true;
    }
  }
  
  // Vérifier la présence d'entités HTML
  if (/&[a-z]+;|&#\d+;|&#x[0-9a-f]+;/i.test(text)) {
    return true;
  }
  
  // Vérifier la présence de séquences Unicode JSON
  if (/\\u[0-9a-fA-F]{4}/.test(text)) {
    return true;
  }
  
  return false;
}

/**
 * Génère un rapport de transformation
 * Utile pour le debugging et la validation
 */
export interface NormalizationReport {
  original: string;
  normalized: string;
  changed: boolean;
  hadEncodingIssues: boolean;
  steps: {
    afterControlCharsRemoval: string;
    afterJsonUnicode: string;
    afterHtmlDecode: string;
    afterEncodingFix: string;
    afterUnicodeFix: string;
    afterFinalCleanup: string;
  };
}

export function normalizeTextWithReport(text: string): NormalizationReport {
  const original = text || '';
  let current = original;
  
  const afterControlCharsRemoval = removeControlCharacters(current);
  current = afterControlCharsRemoval;
  
  const afterJsonUnicode = decodeJsonUnicode(current);
  current = afterJsonUnicode;
  
  const afterHtmlDecode = decodeHtmlEntities(current);
  current = afterHtmlDecode;
  
  const afterEncodingFix = fixEncodingCorruption(current);
  current = afterEncodingFix;
  
  const afterUnicodeFix = normalizeUnicode(current);
  current = afterUnicodeFix;
  
  const afterFinalCleanup = finalCleanup(current);
  current = afterFinalCleanup;
  
  return {
    original,
    normalized: current,
    changed: original !== current,
    hadEncodingIssues: hasEncodingIssues(original),
    steps: {
      afterControlCharsRemoval,
      afterJsonUnicode,
      afterHtmlDecode,
      afterEncodingFix,
      afterUnicodeFix,
      afterFinalCleanup,
    },
  };
}
