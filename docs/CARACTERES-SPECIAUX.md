# Gestion des Caractères Spéciaux

## Problème résolu
Les caractères spéciaux français (é, è, à, ç, etc.) s'affichaient mal dans l'application à cause de l'encodage HTML des données provenant de l'API.

## Solution mise en place

### 1. Encodage UTF-8 global (layout.tsx)
```typescript
export const metadata: Metadata = {
  // ...
  charset: 'UTF-8',
};

// Dans le HTML
<head>
  <meta charSet="UTF-8" />
  <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
</head>
```

### 2. Fonction utilitaire de décodage
Fichier: `src/lib/utils/decodeHtmlEntities.ts`

Cette fonction décode automatiquement les entités HTML en caractères normaux:
- `&eacute;` → `é`
- `&egrave;` → `è`
- `&agrave;` → `à`
- `&ccedil;` → `ç`
- etc.

### 3. Utilisation dans les pages

```typescript
// Import
import { decodeHtmlEntities } from "@/lib/utils/decodeHtmlEntities";
// OU
import { decodeHtmlEntities } from "@/lib/utils";

// Utilisation
<h3>{decodeHtmlEntities(member.name)}</h3>
<p>{decodeHtmlEntities(member.description)}</p>
```

## Pages corrigées
✅ `/membres` - Tous les affichages (cartes, listes, exports CSV/PDF)
✅ `/secteurs` - Tous les noms de filières, sous-filières et activités
✅ Layout global - Métadonnées et encoding

## Pour les futures pages

**Important**: Pour toute nouvelle page affichant du contenu provenant de l'API:

1. Importer la fonction:
```typescript
import { decodeHtmlEntities } from "@/lib/utils/decodeHtmlEntities";
```

2. L'appliquer sur tous les textes affichés:
```typescript
{decodeHtmlEntities(text)}
```

## Exemples d'utilisation

### Affichage simple
```tsx
<h1>{decodeHtmlEntities(title)}</h1>
```

### Dans un map
```tsx
{items.map(item => (
  <div key={item.id}>
    {decodeHtmlEntities(item.name)}
  </div>
))}
```

### Dans les options de Select
```tsx
<SelectItem value={value}>
  {decodeHtmlEntities(label)}
</SelectItem>
```

### Dans les exports CSV/PDF
```typescript
const rows = data.map(item => [
  decodeHtmlEntities(item.name),
  decodeHtmlEntities(item.description),
]);
```

## Tests
Pour vérifier que les caractères spéciaux s'affichent correctement:
1. Créer une donnée avec des accents: "Filière Bâtiment & Travaux Publics"
2. Vérifier l'affichage dans l'interface
3. Vérifier l'export CSV/PDF
4. Tous les caractères doivent s'afficher correctement (é, è, à, ç, &, etc.)
