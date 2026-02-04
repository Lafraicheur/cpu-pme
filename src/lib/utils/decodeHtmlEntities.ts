/**
 * Décode les entités HTML dans une chaîne de caractères
 * Utile pour afficher correctement les caractères spéciaux français (é, è, à, etc.)
 * 
 * @param text - La chaîne à décoder
 * @returns La chaîne décodée
 */
export const decodeHtmlEntities = (text: string): string => {
  if (!text) return '';
  
  // Utiliser DOMParser pour décoder (plus safe pour React)
  if (typeof window !== 'undefined') {
    try {
      const parser = new DOMParser();
      const dom = parser.parseFromString(
        `<!doctype html><body>${text}`,
        'text/html'
      );
      return dom.body.textContent || '';
    } catch (e) {
      // Fallback si DOMParser échoue
      console.warn('DOMParser failed, using fallback', e);
    }
  }
  
  // Fallback pour SSR ou si DOMParser échoue
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&eacute;/g, 'é')
    .replace(/&egrave;/g, 'è')
    .replace(/&ecirc;/g, 'ê')
    .replace(/&agrave;/g, 'à')
    .replace(/&acirc;/g, 'â')
    .replace(/&ugrave;/g, 'ù')
    .replace(/&ucirc;/g, 'û')
    .replace(/&icirc;/g, 'î')
    .replace(/&ocirc;/g, 'ô')
    .replace(/&ccedil;/g, 'ç')
    .replace(/&Eacute;/g, 'É')
    .replace(/&Egrave;/g, 'È')
    .replace(/&Ecirc;/g, 'Ê')
    .replace(/&Agrave;/g, 'À')
    .replace(/&Acirc;/g, 'Â')
    .replace(/&Ugrave;/g, 'Ù')
    .replace(/&Ucirc;/g, 'Û')
    .replace(/&Icirc;/g, 'Î')
    .replace(/&Ocirc;/g, 'Ô')
    .replace(/&Ccedil;/g, 'Ç')
    .replace(/&euro;/g, '€')
    .replace(/&nbsp;/g, ' ');
};
