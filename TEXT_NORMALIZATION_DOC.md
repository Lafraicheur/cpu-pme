# Documentation - Normalisation automatique des textes

## 📋 Vue d'ensemble

Ce système normalise automatiquement tous les textes récupérés depuis l'API pour corriger les problèmes d'encodage courants et garantir des textes UTF-8 propres et lisibles.

## 🎯 Objectifs

- ✅ Normaliser l'encodage en UTF-8
- ✅ Corriger les caractères mal encodés (double encodage, ISO-8859-1, Windows-1252)
- ✅ Décoder les entités HTML (&eacute;, &#233;, etc.)
- ✅ Interpréter correctement les séquences Unicode JSON (\u00e9)
- ✅ Supprimer les caractères invisibles ou de contrôle (BOM UTF-8, etc.)
- ✅ Approche idempotente (plusieurs passages = même résultat)

## 📁 Architecture

```
src/lib/
├── text-normalization.ts    # Utilitaire de normalisation (fonctions principales)
└── api/
    ├── proxy-client.ts       # Client API avec normalisation intégrée
    └── client.ts             # Client API SSR avec normalisation intégrée
```

## 🔄 Stratégie de traitement (ordre des étapes)

Le traitement suit un pipeline en 6 étapes dans cet ordre précis :

### 1️⃣ Suppression des caractères de contrôle et BOM
- Supprime le BOM UTF-8 (`\uFEFF`)
- Élimine les caractères de contrôle (U+0000 à U+001F, U+007F à U+009F)
- Préserve les sauts de ligne (`\n`, `\r`) et tabulations (`\t`)

### 2️⃣ Décodage des séquences Unicode JSON
- Convertit `\u00e9` → `é`
- Traite toutes les séquences `\uXXXX`

### 3️⃣ Décodage des entités HTML
- Entités nommées : `&eacute;` → `é`, `&nbsp;` → espace, etc.
- Entités décimales : `&#233;` → `é`
- Entités hexadécimales : `&#xE9;` → `é`

### 4️⃣ Correction des corruptions d'encodage
- Applique le mapping déterministe (voir table ci-dessous)
- Traite les cas de double encodage UTF-8
- Remplace les patterns Windows-1252 mal interprétés

### 5️⃣ Normalisation Unicode NFC
- Forme canonique composée : `é` (U+00E9) au lieu de `e` + ´ (U+0065 + U+0301)
- Garantit une représentation cohérente

### 6️⃣ Nettoyage final
- Supprime les espaces multiples
- Ajuste les espaces autour de la ponctuation
- Trim les espaces en début/fin

## 📊 Table de mapping des caractères

### Apostrophes et guillemets
| Corrompu | Correct | Description |
|----------|---------|-------------|
| `â€™` | `'` | Apostrophe typographique |
| `â€˜` | `'` | Guillemet simple ouvrant |
| `â€` | `"` | Guillemet double ouvrant |
| `â€` | `"` | Guillemet double fermant |
| `â€"` | `—` | Tiret cadratin |
| `â€"` | `–` | Tiret demi-cadratin |
| `â€¦` | `...` | Points de suspension |

### Caractères accentués (minuscules)
| Corrompu | Correct | Description |
|----------|---------|-------------|
| `Ã©` | `é` | e accent aigu |
| `Ã¨` | `è` | e accent grave |
| `Ãª` | `ê` | e accent circonflexe |
| `Ã«` | `ë` | e tréma |
| `Ã ` | `à` | a accent grave |
| `Ã¢` | `â` | a accent circonflexe |
| `Ã§` | `ç` | c cédille |
| `Ã´` | `ô` | o accent circonflexe |
| `Ã¹` | `ù` | u accent grave |
| `Ã»` | `û` | u accent circonflexe |
| `Ã¯` | `ï` | i tréma |
| `Ã®` | `î` | i accent circonflexe |

### Caractères accentués (majuscules)
| Corrompu | Correct | Description |
|----------|---------|-------------|
| `Ã‰` | `É` | E accent aigu |
| `Ãˆ` | `È` | E accent grave |
| `ÃŠ` | `Ê` | E accent circonflexe |
| `Ã€` | `À` | A accent grave |
| `Ã‚` | `Â` | A accent circonflexe |
| `Ã‡` | `Ç` | C cédille |
| `Ã"` | `Ô` | O accent circonflexe |
| `Ã™` | `Ù` | U accent grave |
| `Ã›` | `Û` | U accent circonflexe |
| `ÃŽ` | `Î` | I accent circonflexe |
| `Ã` | `Ï` | I tréma |

### Ligatures et caractères spéciaux
| Corrompu | Correct | Description |
|----------|---------|-------------|
| `Å"` | `œ` | e dans l'o (minuscule) |
| `Å"` | `Œ` | E dans l'O (majuscule) |
| `Ã¦` | `æ` | ae (minuscule) |
| `Ã†` | `Æ` | AE (majuscule) |
| `â‚¬` | `€` | Symbole Euro |
| `Â ` | ` ` | Espace non-cassable |

## 💻 Exemples de transformations

### Exemple 1 : Texte simple avec accents
```typescript
// AVANT
"CafÃ© Ã  Paris â€" câ€™est super !"

// APRÈS
"Café à Paris — c'est super !"
```

### Exemple 2 : Titre avec entités HTML
```typescript
// AVANT
"R&eacute;union &agrave; 8h&nbsp;: l&#39;avenir de l&#39;entreprise"

// APRÈS
"Réunion à 8h : l'avenir de l'entreprise"
```

### Exemple 3 : Texte avec double encodage
```typescript
// AVANT
"DÃ©veloppement dâ€™applications mÃ©tiers"

// APRÈS
"Développement d'applications métiers"
```

### Exemple 4 : Objet complet d'API
```typescript
// AVANT
{
  title: "RÃ©union Ã  8h",
  description: "Discussion sur lâ€™avenir",
  items: ["Ã‰tude", "DÃ©veloppement", "DÃ©ploiement"]
}

// APRÈS
{
  title: "Réunion à 8h",
  description: "Discussion sur l'avenir",
  items: ["Étude", "Développement", "Déploiement"]
}
```

### Exemple 5 : Séquences Unicode JSON
```typescript
// AVANT
"Caf\\u00e9 \\u00e0 Paris"

// APRÈS
"Café à Paris"
```

### Exemple 6 : Caractères invisibles
```typescript
// AVANT
"\uFEFF Texte avec BOM\u00A0et espaces\u00A0non-cassables "

// APRÈS
"Texte avec BOM et espaces non-cassables"
```

## 🔧 Utilisation

### Automatique (recommandé)
La normalisation est appliquée **automatiquement** à toutes les réponses API :

```typescript
import { proxyApiClient } from '@/lib/api/proxy-client';

// Les données sont automatiquement normalisées
const { data } = await proxyApiClient.get('/actualities');
// data.title est déjà propre et correct ✅
```

### Manuelle (cas spécifiques)
Pour normaliser du texte en dehors du contexte API :

```typescript
import { normalizeText, normalizeObject } from '@/lib/text-normalization';

// Texte simple
const cleanText = normalizeText("CafÃ© Ã  Paris");
// Résultat : "Café à Paris"

// Objet complet
const cleanData = normalizeObject({
  title: "RÃ©union",
  items: ["Ã‰tude", "DÃ©veloppement"]
});
// Résultat : { title: "Réunion", items: ["Étude", "Développement"] }
```

### Avec rapport détaillé (debugging)
```typescript
import { normalizeTextWithReport } from '@/lib/text-normalization';

const report = normalizeTextWithReport("CafÃ© â€" Paris");

console.log(report.original);           // "CafÃ© â€" Paris"
console.log(report.normalized);         // "Café — Paris"
console.log(report.changed);            // true
console.log(report.hadEncodingIssues);  // true
console.log(report.steps);              // Détails de chaque étape
```

### Vérification d'encodage
```typescript
import { hasEncodingIssues } from '@/lib/text-normalization';

if (hasEncodingIssues(text)) {
  console.log("⚠️ Problèmes d'encodage détectés");
}
```

## 🧪 Tests et validation

### Test d'idempotence
```typescript
const text = "CafÃ© Ã  Paris";
const first = normalizeText(text);
const second = normalizeText(first);
const third = normalizeText(second);

// Les trois résultats doivent être identiques
console.assert(first === second && second === third);
// ✅ "Café à Paris" === "Café à Paris" === "Café à Paris"
```

### Test de non-dégradation
```typescript
const validText = "Café à Paris";
const result = normalizeText(validText);

// Le texte valide ne doit pas être modifié
console.assert(result === validText);
// ✅ "Café à Paris" === "Café à Paris"
```

### Test de cas limites
```typescript
// Valeurs nulles/undefined
normalizeText(null);        // ""
normalizeText(undefined);   // ""
normalizeText("");          // ""

// Nombres et booléens
normalizeObject(123);       // 123 (inchangé)
normalizeObject(true);      // true (inchangé)

// Tableaux mixtes
normalizeObject([
  "CafÃ©",
  123,
  { title: "RÃ©union" }
]);
// ["Café", 123, { title: "Réunion" }]
```

## 📈 Monitoring

En mode développement (`NODE_ENV=development`), les logs suivants apparaissent :

```
⚠️ [PROXY CLIENT] Problèmes d'encodage détectés et corrigés pour: /actualities
⚠️ [API CLIENT] Problèmes d'encodage détectés et corrigés pour: /secteurs
```

Ces logs vous informent quand des corrections sont appliquées, sans impacter les performances en production.

## ⚡ Performance

- **Impact minimal** : Le traitement s'exécute en quelques millisecondes
- **Opérations en O(n)** : Parcours linéaire du texte
- **Pas de regex complexes** : Remplacements simples via table de mapping
- **Optimisations** :
  - Tri des clés par longueur décroissante (évite les remplacements partiels)
  - Vérifications préalables (hasEncodingIssues)
  - Logs uniquement en développement

## 🔒 Garanties

✅ **Idempotence** : Plusieurs passages donnent le même résultat  
✅ **Sûreté** : Ne modifie pas les caractères ASCII valides  
✅ **Compatibilité** : Fonctionne avec tous types de données (string, object, array)  
✅ **Robustesse** : Gestion des erreurs avec fallback sur le texte original  
✅ **Maintenabilité** : Table de mapping centralisée et extensible  

## 🚀 Extensibilité

Pour ajouter de nouveaux patterns de corruption :

```typescript
// Dans src/lib/text-normalization.ts
const ENCODING_CORRUPTION_MAP: Record<string, string> = {
  // ... patterns existants
  'nouveau_pattern': 'caractère_correct',
};
```

Pour ajouter de nouvelles entités HTML :

```typescript
// Dans src/lib/text-normalization.ts
const HTML_ENTITIES: Record<string, string> = {
  // ... entités existantes
  '&custom;': 'X',
};
```

## 📝 Points d'intégration

La normalisation est appliquée dans :

1. **[proxy-client.ts](src/lib/api/proxy-client.ts)** : Routes proxy Next.js (côté client)
2. **[client.ts](src/lib/api/client.ts)** : Appels API directs (côté serveur SSR)

Tous les services API héritent automatiquement de cette fonctionnalité :
- `actualities.service.ts`
- `banners.service.ts`
- `publications.service.ts`
- `quartiers.service.ts`
- `regions.service.ts`
- `secteurs.service.ts`
- `type-membres.service.ts`
- `abonnements.service.ts`

## ✨ Critères de réussite

- [x] Les textes sont lisibles
- [x] Les accents sont correctement affichés
- [x] La typographie est propre (guillemets, apostrophes, tirets)
- [x] L'encodage UTF-8 est standard et conforme
- [x] Le traitement est automatique et transparent
- [x] La solution est maintenable et extensible
- [x] L'approche est générique (pas de corrections au cas par cas)

## 🐛 Debugging

Pour analyser un problème d'encodage spécifique :

```typescript
import { normalizeTextWithReport } from '@/lib/text-normalization';

const problematicText = "Votre texte problématique ici";
const report = normalizeTextWithReport(problematicText);

console.log("=== RAPPORT DE NORMALISATION ===");
console.log("Original:", report.original);
console.log("Normalisé:", report.normalized);
console.log("Modifié:", report.changed);
console.log("Problèmes détectés:", report.hadEncodingIssues);
console.log("\n=== ÉTAPES ===");
console.log("1. Après suppression contrôles:", report.steps.afterControlCharsRemoval);
console.log("2. Après Unicode JSON:", report.steps.afterJsonUnicode);
console.log("3. Après entités HTML:", report.steps.afterHtmlDecode);
console.log("4. Après correction encodage:", report.steps.afterEncodingFix);
console.log("5. Après normalisation Unicode:", report.steps.afterUnicodeFix);
console.log("6. Après nettoyage final:", report.steps.afterFinalCleanup);
```

## 📚 Références

- [Unicode Normalization (NFC)](https://unicode.org/reports/tr15/)
- [UTF-8 Encoding](https://en.wikipedia.org/wiki/UTF-8)
- [HTML Entities](https://html.spec.whatwg.org/multipage/named-characters.html)
- [Windows-1252 Character Set](https://en.wikipedia.org/wiki/Windows-1252)

---

**Date de création** : 12 janvier 2026  
**Version** : 1.0.0  
**Auteur** : Système de normalisation automatique CPU PME
