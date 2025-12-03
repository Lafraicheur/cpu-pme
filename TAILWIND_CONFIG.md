# Configuration Tailwind CSS - CPU-PME

Ce fichier documente toutes les configurations Tailwind CSS personnalisées pour le projet CPU-PME-SITE.

## 📋 Vue d'ensemble

Le projet utilise **Tailwind CSS v4** avec la syntaxe `@theme inline` dans `src/app/globals.css`.
Toutes les personnalisations sont définies via des variables CSS qui sont ensuite utilisables dans les classes Tailwind.

---

## 🎨 Palette de couleurs

### Couleurs principales

| Couleur | Variable | Valeur | Usage |
|---------|----------|--------|-------|
| **Orange CPU** | `--color-primary` | `#F08223` | Boutons principaux, liens importants, accents |
| **Orange Hover** | `--color-primary-hover` | `#D97420` | État hover des éléments orange |
| **Vert CPU** | `--color-success` | `#199D4E` | Statuts positifs, validation, succès |
| **Vert Hover** | `--color-success-hover` | `#157A3D` | État hover des éléments verts |
| **Noir CPU** | `--color-neutral-dark` | `#221F1F` | Titres, texte important, header, sidebar |

### Couleurs neutres

| Couleur | Variable | Valeur | Usage |
|---------|----------|--------|-------|
| **Fond général** | `--color-bg` | `#F6F6F6` | Fond de page (clair) |
| **Fond carte** | `--color-card-bg` | `#FFFFFF` | Fond des cartes/blocs |
| **Bordure** | `--color-border` | `#E0E0E0` | Bordures des éléments |
| **Texte principal** | `--color-text-main` | `#2B2B2B` | Texte principal |
| **Texte secondaire** | `--color-text-secondary` | `#6F6F6F` | Texte secondaire/légendes |
| **Erreur** | `--color-error` | `#E53935` | Messages d'erreur, alertes |

### Utilisation avec Tailwind

```html
<!-- Couleurs de fond -->
<div class="bg-[--color-bg]">Fond général</div>
<div class="bg-[--color-card-bg]">Fond carte blanche</div>
<div class="bg-[--color-primary]">Fond orange</div>
<div class="bg-[--color-success]">Fond vert</div>
<div class="bg-[--color-neutral-dark]">Fond noir</div>

<!-- Couleurs de texte -->
<p class="text-[--color-text-main]">Texte principal</p>
<p class="text-[--color-text-secondary]">Texte secondaire</p>
<p class="text-[--color-primary]">Texte orange</p>
<p class="text-[--color-error]">Texte erreur</p>

<!-- Bordures -->
<div class="border border-[--color-border]">Bordure</div>
```

---

## 🔤 Typographie

### Polices

Le projet utilise deux polices Google Fonts :

1. **Montserrat** - Pour les titres (H1, H2, H3)
   - Variable CSS : `--font-heading` ou `--font-montserrat`
   - Poids disponibles : 400, 500, 600, 700

2. **Inter** - Pour le texte courant
   - Variable CSS : `--font-body` ou `--font-inter`
   - Poids disponibles : 400, 500, 600, 700

### Hiérarchie typographique

#### Site web (Desktop)

| Élément | Taille | Police | Graisse | Variable CSS |
|---------|--------|--------|---------|--------------|
| **H1** | 36px (2.25rem) | Montserrat | SemiBold (600) | `--font-size-h1` |
| **H2** | 28px (1.75rem) | Montserrat | SemiBold (600) | `--font-size-h2` |
| **H3** | 22px (1.375rem) | Montserrat | Medium (500) | `--font-size-h3` |
| **Texte courant** | 16px (1rem) | Inter | Regular (400) | `--font-size-body` |
| **Texte secondaire** | 14px (0.875rem) | Inter | Regular (400) | `--font-size-small` |
| **Petits textes** | 12px (0.75rem) | Inter | Regular (400) | `--font-size-xs` |

#### Dashboard

| Élément | Taille suggérée |
|---------|-----------------|
| Titre de page | 24-28px |
| Titres de sections/cartes | 18-20px |
| Données/tableaux | 14-16px |
| Infos secondaires | 12px |

### Utilisation avec Tailwind

```html
<!-- Titres avec Montserrat -->
<h1 class="font-[family-name:--font-heading] text-[length:--font-size-h1] font-semibold">
  Titre H1
</h1>

<h2 class="font-[family-name:--font-heading] text-[length:--font-size-h2] font-semibold">
  Titre H2
</h2>

<h3 class="font-[family-name:--font-heading] text-[length:--font-size-h3] font-medium">
  Titre H3
</h3>

<!-- Texte courant avec Inter -->
<p class="font-[family-name:--font-body] text-[length:--font-size-body]">
  Texte normal
</p>

<p class="font-[family-name:--font-body] text-[length:--font-size-small] text-[--color-text-secondary]">
  Texte secondaire
</p>
```

---

## 📐 Espacements et bordures

### Rayons de bordure (Border Radius)

| Nom | Variable | Valeur | Usage |
|-----|----------|--------|-------|
| **Petit** | `--radius-sm` | 8px (0.5rem) | Petits éléments, boutons |
| **Moyen** | `--radius-md` | 12px (0.75rem) | Cartes, blocs principaux |
| **Grand** | `--radius-lg` | 16px (1rem) | Grands conteneurs |
| **Cercle** | `--radius-full` | 9999px | Avatars, badges ronds |

### Utilisation

```html
<div class="rounded-[--radius-sm]">Bordure arrondie petite</div>
<div class="rounded-[--radius-md]">Bordure arrondie moyenne</div>
<div class="rounded-[--radius-lg]">Bordure arrondie grande</div>
<div class="rounded-[--radius-full]">Cercle complet</div>
```

---

## 🎭 Ombres

### Ombres personnalisées

| Nom | Variable | Valeur | Usage |
|-----|----------|--------|-------|
| **Carte** | `--shadow-card` | `0 2px 8px rgba(0,0,0,0.08)` | Ombres légères des cartes |
| **Hover** | `--shadow-hover` | `0 4px 12px rgba(0,0,0,0.12)` | État hover, éléments surélevés |

### Utilisation

```html
<div class="shadow-[--shadow-card]">Carte avec ombre légère</div>
<button class="hover:shadow-[--shadow-hover]">Bouton avec hover</button>
```

---

## 🎯 Exemples de composants

### Bouton principal (Orange)

```html
<button class="
  bg-[--color-primary]
  hover:bg-[--color-primary-hover]
  text-white
  font-[family-name:--font-body]
  font-medium
  text-[length:--font-size-small]
  px-6 py-3
  rounded-[--radius-sm]
  transition-colors
">
  Découvrir le Hub
</button>
```

### Bouton secondaire (Vert)

```html
<button class="
  bg-[--color-success]
  hover:bg-[--color-success-hover]
  text-white
  font-[family-name:--font-body]
  font-medium
  text-[length:--font-size-small]
  px-6 py-3
  rounded-[--radius-sm]
  transition-colors
">
  Devenir membre
</button>
```

### Bouton outline

```html
<button class="
  bg-transparent
  border-2 border-[--color-primary]
  text-[--color-primary]
  hover:bg-[--color-primary]
  hover:text-white
  font-[family-name:--font-body]
  font-medium
  text-[length:--font-size-small]
  px-6 py-3
  rounded-[--radius-sm]
  transition-all
">
  En savoir plus
</button>
```

### Carte (Card)

```html
<div class="
  bg-[--color-card-bg]
  border border-[--color-border]
  rounded-[--radius-md]
  shadow-[--shadow-card]
  hover:shadow-[--shadow-hover]
  p-6
  transition-shadow
">
  <h3 class="
    font-[family-name:--font-heading]
    text-[length:--font-size-h3]
    font-medium
    text-[--color-neutral-dark]
    mb-3
  ">
    Titre de la carte
  </h3>
  <p class="
    font-[family-name:--font-body]
    text-[length:--font-size-body]
    text-[--color-text-secondary]
  ">
    Description de la carte
  </p>
</div>
```

### Badge de statut

```html
<!-- Statut positif (vert) -->
<span class="
  inline-flex items-center
  bg-[--color-success]
  text-white
  font-[family-name:--font-body]
  text-[length:--font-size-xs]
  font-medium
  px-3 py-1
  rounded-[--radius-full]
">
  Validé
</span>

<!-- Statut en cours (orange) -->
<span class="
  inline-flex items-center
  bg-[--color-primary]
  text-white
  font-[family-name:--font-body]
  text-[length:--font-size-xs]
  font-medium
  px-3 py-1
  rounded-[--radius-full]
">
  En cours
</span>

<!-- Statut erreur (rouge) -->
<span class="
  inline-flex items-center
  bg-[--color-error]
  text-white
  font-[family-name:--font-body]
  text-[length:--font-size-xs]
  font-medium
  px-3 py-1
  rounded-[--radius-full]
">
  En retard
</span>
```

---

## 📱 Structure du site

### Header

```html
<header class="bg-[--color-neutral-dark] text-white">
  <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
    <!-- Logo -->
    <div class="font-[family-name:--font-heading] text-xl font-bold">
      CPU-PME
    </div>

    <!-- Menu -->
    <ul class="flex gap-6">
      <li><a href="#" class="hover:text-[--color-primary] transition-colors">Accueil</a></li>
      <li><a href="#" class="hover:text-[--color-primary] transition-colors">Services</a></li>
      <li><a href="#" class="hover:text-[--color-primary] transition-colors">À propos</a></li>
    </ul>

    <!-- Bouton CTA -->
    <button class="
      bg-[--color-primary]
      hover:bg-[--color-primary-hover]
      px-6 py-2
      rounded-[--radius-sm]
      transition-colors
    ">
      Se connecter
    </button>
  </nav>
</header>
```

### Sidebar Dashboard

```html
<aside class="
  w-64
  bg-[--color-neutral-dark]
  text-white
  min-h-screen
  p-4
">
  <!-- Logo -->
  <div class="mb-8 font-[family-name:--font-heading] text-xl font-bold">
    CPU-PME Hub
  </div>

  <!-- Menu items -->
  <nav class="space-y-2">
    <a href="#" class="
      flex items-center gap-3
      px-4 py-3
      rounded-[--radius-sm]
      bg-[--color-primary]
      transition-colors
    ">
      Dashboard
    </a>

    <a href="#" class="
      flex items-center gap-3
      px-4 py-3
      rounded-[--radius-sm]
      hover:bg-gray-800
      transition-colors
    ">
      PME
    </a>

    <a href="#" class="
      flex items-center gap-3
      px-4 py-3
      rounded-[--radius-sm]
      hover:bg-gray-800
      transition-colors
    ">
      Projets
    </a>
  </nav>
</aside>
```

---

## 🎨 Règles d'usage des couleurs

1. **Orange (`--color-primary`)** :
   - Boutons d'action principaux
   - Liens importants
   - Call-to-Action (CTA)
   - Éléments interactifs clés

2. **Vert (`--color-success`)** :
   - Statuts positifs (Validé, Actif, Financé)
   - Messages de succès
   - Badges de réussite
   - Éléments liés à la croissance/accompagnement

3. **Noir CPU (`--color-neutral-dark`)** :
   - Header/Navigation principale
   - Sidebar du dashboard
   - Titres importants
   - Texte de forte emphase

4. **Fond clair (`--color-bg`)** :
   - Fond général du site
   - Fond du dashboard
   - Espaces de respiration

5. **Blanc (`--color-card-bg`)** :
   - Cartes et blocs de contenu
   - Formulaires
   - Tableaux

---

## 🔧 Fichiers de configuration

- **`src/app/globals.css`** : Toutes les variables CSS et le thème Tailwind
- **`src/app/layout.tsx`** : Configuration des polices Google Fonts
- **`package.json`** : Dépendances Tailwind CSS v4

---

## 📦 Dépendances installées

```json
{
  "tailwindcss": "^4.x",
  "@tailwindcss/postcss": "^4.x"
}
```

---

## 🚀 Pour commencer le développement

```bash
cd cpu-pme-site
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

---

## 📝 Notes importantes

- ✅ **Pas de CSS personnalisé** : Utiliser uniquement les classes Tailwind et les variables CSS définies
- ✅ **Tailwind CSS v4** : Nouvelle syntaxe avec `@theme inline`
- ✅ **Google Fonts** : Montserrat et Inter chargées automatiquement
- ✅ **Variables CSS** : Toutes les couleurs et tailles sont des variables réutilisables
- ✅ **TypeScript** : Projet entièrement typé
- ✅ **App Router** : Utilisation du nouveau App Router de Next.js

---

*Documentation générée pour le projet CPU-PME-SITE*
