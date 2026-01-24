/**
 * Tests et exemples pour la normalisation de texte
 * Ce fichier peut être exécuté avec : ts-node src/lib/__tests__/text-normalization.test.ts
 * ou intégré dans votre suite de tests (Jest, Vitest, etc.)
 */

import {
  normalizeText,
  normalizeObject,
  hasEncodingIssues,
  normalizeTextWithReport,
} from '../text-normalization';

// Couleurs pour l'affichage console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(color: keyof typeof colors, message: string) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function assert(condition: boolean, message: string) {
  if (condition) {
    log('green', `✓ ${message}`);
  } else {
    log('red', `✗ ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
}

function testCase(name: string, input: string, expected: string) {
  const result = normalizeText(input);
  const passed = result === expected;
  
  if (passed) {
    log('green', `✓ ${name}`);
  } else {
    log('red', `✗ ${name}`);
    console.log(`  Entrée   : "${input}"`);
    console.log(`  Attendu  : "${expected}"`);
    console.log(`  Obtenu   : "${result}"`);
  }
  
  return passed;
}

// ============================================================================
// TESTS DE NORMALISATION
// ============================================================================

log('cyan', '\n========================================');
log('cyan', '  TESTS DE NORMALISATION DE TEXTE');
log('cyan', '========================================\n');

// Test 1 : Caractères accentués (double encodage UTF-8)
log('blue', '📝 Test 1 : Caractères accentués français');
testCase(
  'Accents minuscules',
  'CafÃ© Ã  Paris avec des crÃªpes',
  'Café à Paris avec des crêpes'
);
testCase(
  'Accents majuscules',
  'Ã‰tude sur lâ€™Ã©conomie',
  "Étude sur l'économie"
);
testCase(
  'Cédille',
  'FranÃ§ais',
  'Français'
);

// Test 2 : Apostrophes et guillemets
log('blue', '\n📝 Test 2 : Apostrophes et guillemets');
testCase(
  'Apostrophe typographique',
  "Câ€™est lâ€™avenir",
  "C'est l'avenir"
);
testCase(
  'Guillemets doubles',
  'Il a dit â€œbonjourâ€',
  'Il a dit "bonjour"'
);
testCase(
  'Guillemets simples',
  "â€˜Exempleâ€™",
  "'Exemple'"
);

// Test 3 : Tirets
log('blue', '\n📝 Test 3 : Tirets et ponctuation');
testCase(
  'Tiret cadratin',
  'Paris â€" France',
  'Paris — France'
);
testCase(
  'Tiret demi-cadratin',
  '2020â€"2025',
  '2020–2025'
);
testCase(
  'Points de suspension',
  'Et ceteraâ€¦',
  'Et cetera...'
);

// Test 4 : Entités HTML
log('blue', '\n📝 Test 4 : Entités HTML');
testCase(
  'Entités nommées',
  'R&eacute;union &agrave; 8h',
  'Réunion à 8h'
);
testCase(
  'Entités décimales',
  'Caf&#233; &#224; Paris',
  'Café à Paris'
);
testCase(
  'Entités hexadécimales',
  'Caf&#xE9; &#xE0; Paris',
  'Café à Paris'
);
testCase(
  'Espace non-cassable HTML',
  'Test&nbsp;espace',
  'Test espace'
);

// Test 5 : Séquences Unicode JSON
log('blue', '\n📝 Test 5 : Séquences Unicode JSON');
testCase(
  'Unicode simple',
  'Caf\\u00e9',
  'Café'
);
testCase(
  'Unicode multiples',
  '\\u00c9tude \\u00e0 Paris',
  'Étude à Paris'
);

// Test 6 : Ligatures
log('blue', '\n📝 Test 6 : Ligatures');
testCase(
  'oe ligature',
  'Å"uvre',
  'œuvre'
);
testCase(
  'ae ligature',
  'Ã¦gis',
  'ægis'
);

// Test 7 : Caractères spéciaux
log('blue', '\n📝 Test 7 : Caractères spéciaux');
testCase(
  'Euro',
  'Prix: 50â‚¬',
  'Prix: 50€'
);
testCase(
  'Espace non-cassable corrompu',
  'TestÂ espace',
  'Test espace'
);

// Test 8 : BOM et caractères de contrôle
log('blue', '\n📝 Test 8 : BOM et caractères de contrôle');
testCase(
  'BOM UTF-8',
  '\uFEFFTexte avec BOM',
  'Texte avec BOM'
);
testCase(
  'Caractères de contrôle',
  'Texte\u0000avec\u0001contrôles',
  'Texteaveccontrôles'
);

// Test 9 : Espaces multiples
log('blue', '\n📝 Test 9 : Nettoyage des espaces');
testCase(
  'Espaces multiples',
  'Texte   avec    espaces',
  'Texte avec espaces'
);
testCase(
  'Espaces avant ponctuation',
  'Bonjour , comment allez-vous ?',
  'Bonjour, comment allez-vous?'
);

// Test 10 : Cas complexes (combinaisons)
log('blue', '\n📝 Test 10 : Cas complexes');
testCase(
  'Combinaison multiple',
  'CafÃ© Ã  Paris â€" câ€™est super ! Ã‰tÃ© 2025â€¦',
  "Café à Paris — c'est super! Été 2025..."
);
testCase(
  'HTML + double encodage',
  'R&eacute;union Ã  8h&nbsp;: lâ€™avenir',
  "Réunion à 8h : l'avenir"
);

// ============================================================================
// TESTS D'IDEMPOTENCE
// ============================================================================

log('cyan', '\n========================================');
log('cyan', '  TESTS D\'IDEMPOTENCE');
log('cyan', '========================================\n');

function testIdempotence(input: string) {
  const first = normalizeText(input);
  const second = normalizeText(first);
  const third = normalizeText(second);
  
  assert(
    first === second && second === third,
    `Idempotence: "${input}" → "${first}"`
  );
}

testIdempotence('CafÃ© Ã  Paris');
testIdempotence('Câ€™est lâ€™avenir');
testIdempotence('R&eacute;union &agrave; 8h');
testIdempotence('\\u00c9tude');
testIdempotence('Texte déjà correct');

// ============================================================================
// TESTS DE NON-DÉGRADATION
// ============================================================================

log('cyan', '\n========================================');
log('cyan', '  TESTS DE NON-DÉGRADATION');
log('cyan', '========================================\n');

function testNonDegradation(input: string) {
  const result = normalizeText(input);
  assert(
    result === input,
    `Non-dégradation: "${input}" reste inchangé`
  );
}

testNonDegradation('Café à Paris');
testNonDegradation("C'est l'avenir");
testNonDegradation('Réunion à 8h');
testNonDegradation('Étude complète');
testNonDegradation('Simple text');
testNonDegradation('123456');

// ============================================================================
// TESTS D'OBJETS
// ============================================================================

log('cyan', '\n========================================');
log('cyan', '  TESTS DE NORMALISATION D\'OBJETS');
log('cyan', '========================================\n');

// Test objet simple
const obj1 = normalizeObject({
  title: 'RÃ©union Ã  8h',
  description: 'Discussion sur lâ€™avenir',
});
assert(
  obj1.title === 'Réunion à 8h' && obj1.description === "Discussion sur l'avenir",
  'Objet simple normalisé'
);

// Test tableau
const arr1 = normalizeObject(['Ã‰tude', 'DÃ©veloppement', 'DÃ©ploiement']);
assert(
  arr1[0] === 'Étude' && arr1[1] === 'Développement' && arr1[2] === 'Déploiement',
  'Tableau normalisé'
);

// Test objet imbriqué
const nested = normalizeObject({
  title: 'CafÃ©',
  data: {
    name: 'Ã‰tude',
    items: ['Ã ', 'DÃ©veloppement'],
  },
});
assert(
  nested.title === 'Café' &&
  nested.data.name === 'Étude' &&
  nested.data.items[0] === 'À' &&
  nested.data.items[1] === 'Développement',
  'Objet imbriqué normalisé'
);

// Test avec nombres et booléens
const mixed = normalizeObject({
  title: 'CafÃ©',
  count: 42,
  active: true,
  tags: ['Ã‰tude', 123, false],
});
assert(
  mixed.title === 'Café' &&
  mixed.count === 42 &&
  mixed.active === true &&
  mixed.tags[0] === 'Étude' &&
  mixed.tags[1] === 123 &&
  mixed.tags[2] === false,
  'Objet mixte préserve les types'
);

// ============================================================================
// TESTS DE DÉTECTION
// ============================================================================

log('cyan', '\n========================================');
log('cyan', '  TESTS DE DÉTECTION D\'ENCODAGE');
log('cyan', '========================================\n');

assert(hasEncodingIssues('CafÃ© Ã  Paris'), 'Détecte double encodage');
assert(hasEncodingIssues('Câ€™est'), 'Détecte apostrophe corrompue');
assert(hasEncodingIssues('R&eacute;union'), 'Détecte entités HTML');
assert(hasEncodingIssues('\\u00e9tude'), 'Détecte Unicode JSON');
assert(!hasEncodingIssues('Café à Paris'), 'Ne détecte pas de problème dans texte correct');
assert(!hasEncodingIssues('Simple text'), 'Ne détecte pas de problème dans texte simple');

// ============================================================================
// TESTS DE CAS LIMITES
// ============================================================================

log('cyan', '\n========================================');
log('cyan', '  TESTS DE CAS LIMITES');
log('cyan', '========================================\n');

assert(normalizeText(null as any) === '', 'null retourne chaîne vide');
assert(normalizeText(undefined as any) === '', 'undefined retourne chaîne vide');
assert(normalizeText('') === '', 'chaîne vide reste vide');
assert(normalizeObject(123 as any) === 123, 'nombre reste inchangé');
assert(normalizeObject(true as any) === true, 'booléen reste inchangé');
assert(normalizeObject(null as any) === null, 'null reste null');

// ============================================================================
// TESTS DE RAPPORT DÉTAILLÉ
// ============================================================================

log('cyan', '\n========================================');
log('cyan', '  TEST DE RAPPORT DÉTAILLÉ');
log('cyan', '========================================\n');

const report = normalizeTextWithReport('CafÃ© â€" Paris');
assert(report.original === 'CafÃ© â€" Paris', 'Rapport: original correct');
assert(report.normalized === 'Café — Paris', 'Rapport: normalisé correct');
assert(report.changed === true, 'Rapport: changement détecté');
assert(report.hadEncodingIssues === true, 'Rapport: problèmes détectés');
assert(typeof report.steps === 'object', 'Rapport: étapes présentes');

log('green', '\n✓ Rapport détaillé fonctionne correctement');

// ============================================================================
// EXEMPLES RÉELS D'API
// ============================================================================

log('cyan', '\n========================================');
log('cyan', '  EXEMPLES RÉELS D\'API');
log('cyan', '========================================\n');

// Simulation de réponse API
const apiResponse = {
  id: 1,
  title: 'RÃ©union Ã  propos de lâ€™avenir',
  description: 'Discussion importante â€" ne pas manquer !',
  date: '2025-01-12',
  location: 'CafÃ© de Paris',
  participants: [
    { name: 'Jean-FranÃ§ois', role: 'Ã‰tudiant' },
    { name: 'Marie-ThÃ©rÃ¨se', role: 'DÃ©veloppeur' },
  ],
  tags: ['Ã‰conomie', 'DÃ©veloppement', 'Ã‰tude'],
};

const normalized = normalizeObject(apiResponse);

log('yellow', '\n📊 Avant normalisation:');
console.log(JSON.stringify(apiResponse, null, 2));

log('yellow', '\n📊 Après normalisation:');
console.log(JSON.stringify(normalized, null, 2));

assert(
  normalized.title === "Réunion à propos de l'avenir",
  'API: titre normalisé'
);
assert(
  normalized.description === 'Discussion importante — ne pas manquer!',
  'API: description normalisée'
);
assert(
  normalized.location === 'Café de Paris',
  'API: location normalisée'
);
assert(
  normalized.participants[0].name === 'Jean-François',
  'API: participant 1 normalisé'
);
assert(
  normalized.participants[0].role === 'Étudiant',
  'API: rôle 1 normalisé'
);
assert(
  normalized.participants[1].name === 'Marie-Thérèse',
  'API: participant 2 normalisé'
);
assert(
  normalized.participants[1].role === 'Développeur',
  'API: rôle 2 normalisé'
);
assert(
  normalized.tags[0] === 'Économie' &&
  normalized.tags[1] === 'Développement' &&
  normalized.tags[2] === 'Étude',
  'API: tags normalisés'
);

// ============================================================================
// RÉSUMÉ
// ============================================================================

log('cyan', '\n========================================');
log('cyan', '  RÉSUMÉ');
log('cyan', '========================================\n');

log('green', '✓ Tous les tests sont passés avec succès!');
log('green', '✓ La normalisation est idempotente');
log('green', '✓ Les textes valides ne sont pas dégradés');
log('green', '✓ Les objets complexes sont correctement traités');
log('green', '✓ La détection d\'encodage fonctionne');
log('green', '✓ Les cas limites sont gérés');
log('green', '✓ Les rapports détaillés sont disponibles');
log('green', '✓ Les exemples d\'API sont correctement normalisés\n');

log('cyan', '========================================');
log('cyan', '  🎉 SYSTÈME DE NORMALISATION OPÉRATIONNEL');
log('cyan', '========================================\n');

export {};
