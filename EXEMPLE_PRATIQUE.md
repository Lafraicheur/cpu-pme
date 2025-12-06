# 🎓 Exemple Pratique : Navigation Next.js

## 📝 Exemple Concret avec Code Commenté

Voici un exemple **pas à pas** de ce qui a été modifié dans le Header :

---

## 🔄 Transformation Complète

### **ÉTAPE 1 : Import**

```tsx
// ❌ AVANT : Pas besoin d'importer (on utilisait <a>)
// (rien)

// ✅ APRÈS : On importe Link de Next.js
import Link from "next/link";
```

**Explication :**
- `Link` est un composant spécial de Next.js
- Il faut l'importer comme n'importe quel autre composant
- C'est dans le package `next` (déjà installé)

---

### **ÉTAPE 2 : Remplacement d'un lien**

```tsx
// ❌ AVANT
<a href="#">
  Secteurs & Filières
</a>

// ✅ APRÈS
<Link href="/secteurs">
  Secteurs & Filières
</Link>
```

**Différences :**

| Aspect | `<a href="#">` | `<Link href="/secteurs">` |
|--------|----------------|---------------------------|
| **Comportement** | Ne fait rien (#) | Navigue vers `/secteurs` |
| **Rechargement** | Recharge toute la page | Navigation fluide |
| **Performance** | Lente | Rapide |
| **Préchargement** | Non | Oui (automatique) |

---

## 🎯 Exemple Complet : Navigation Desktop

### **Code Avant (ne fonctionnait pas) :**

```tsx
<nav>
  <a href="#">Accueil</a>
  <a href="#">À Propos</a>
  <a href="#">Secteurs</a>
  <a href="#">Contact</a>
</nav>
```

**Problème :** Tous les liens pointent vers `#`, donc rien ne se passe.

---

### **Code Après (fonctionne) :**

```tsx
import Link from "next/link";

<nav>
  <Link href="/">Accueil</Link>
  <Link href="/a-propos">À Propos</Link>
  <Link href="/secteurs">Secteurs</Link>
  <Link href="/contact">Contact</Link>
</nav>
```

**Résultat :**
- ✅ Clic sur "Accueil" → va vers `/` (page d'accueil)
- ✅ Clic sur "Secteurs" → va vers `/secteurs` (page secteurs)
- ✅ Navigation fluide, pas de rechargement

---

## 🔍 Détail : Comment Next.js Résout les Routes

### **Mapping URL → Fichier**

```
URL: /secteurs
  ↓
Next.js cherche dans: src/app/
  ↓
Trouve: src/app/secteurs/page.tsx
  ↓
Affiche: Le contenu de page.tsx
```

### **Exemple Visuel :**

```
┌─────────────────────────────────────┐
│  URL: /secteurs                      │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  src/app/secteurs/page.tsx           │
│  ┌───────────────────────────────┐   │
│  │ export default function       │   │
│  │   Secteurs() { ... }          │   │
│  └───────────────────────────────┘   │
└─────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Page affichée dans le navigateur   │
└─────────────────────────────────────┘
```

---

## 💻 Exemple : Logo Cliquable

### **Avant :**

```tsx
<div className="logo">
  <Image src="/logo.png" alt="Logo" />
</div>
```

**Problème :** Le logo n'est pas cliquable.

---

### **Après :**

```tsx
<Link href="/">
  <Image src="/logo.png" alt="Logo" />
</Link>
```

**Résultat :**
- ✅ Clic sur le logo → retour à l'accueil
- ✅ Convention web standard (tous les sites font ça)

**Explication :**
- `Link` peut contenir n'importe quel élément (Image, texte, etc.)
- `href="/"` → page d'accueil
- Le logo devient cliquable automatiquement

---

## 🎨 Exemple : Bouton avec Navigation

### **Dans la page secteurs :**

```tsx
// ❌ AVANT : Bouton qui ne fait rien
<Button>Nous contacter</Button>

// ✅ APRÈS : Bouton qui navigue
<Link href="/contact">
  <Button>Nous contacter</Button>
</Link>
```

**Comment ça marche :**

1. `Link` entoure le `Button`
2. Quand tu cliques sur le bouton, `Link` intercepte le clic
3. Navigation vers `/contact`
4. Le bouton garde son style (couleur, taille, etc.)

**Structure :**
```
<Link>          ← Conteneur de navigation
  <Button>      ← Élément cliquable (style)
    Texte
  </Button>
</Link>
```

---

## 🔄 Exemple : Menu Mobile

### **Code dans le drawer mobile :**

```tsx
<Link
  href="/secteurs"
  onClick={() => setIsDrawerOpen(false)}  // ← Ferme le menu après clic
>
  Secteurs & Filières
</Link>
```

**Explication :**

1. **`href="/secteurs"`** → Navigue vers la page secteurs
2. **`onClick={...}`** → Ferme le menu mobile après le clic
3. **Deux actions** en même temps : navigation + fermeture du menu

**Pourquoi `onClick` ?**
- Le menu mobile est un drawer (panneau latéral)
- Après avoir cliqué sur un lien, on veut fermer le menu
- `onClick` permet d'exécuter du code JavaScript avant la navigation

---

## 🎯 Résumé : Les 3 Types de Navigation

### **1. Navigation avec Link (Interne)**

```tsx
<Link href="/secteurs">Secteurs</Link>
```
✅ Pour : Pages de ton site

---

### **2. Navigation avec <a> (Externe)**

```tsx
<a href="https://google.com" target="_blank">
  Google
</a>
```
✅ Pour : Sites externes

---

### **3. Navigation Programmatique (JavaScript)**

```tsx
"use client";
import { useRouter } from "next/navigation";

const router = useRouter();

function handleSubmit() {
  // Faire quelque chose...
  router.push("/secteurs"); // Navigue après
}
```
✅ Pour : Navigation après une action (formulaire, etc.)

---

## 🚀 Test Pratique

### **Exercice :**

1. Ouvre `src/components/Header.tsx`
2. Trouve un `<Link href="/secteurs">`
3. Change `href="/secteurs"` en `href="/contact"`
4. Sauvegarde et teste
5. Le lien "Secteurs" mène maintenant vers Contact !

**Pourquoi ça marche ?**
- `Link` lit simplement la valeur de `href`
- Si tu changes `href`, la destination change aussi
- Next.js fait automatiquement le lien avec le fichier

---

## 💡 Astuce : Voir les Routes Disponibles

Next.js crée automatiquement les routes depuis `src/app/` :

```
src/app/
├── page.tsx          → http://localhost:3000/
├── secteurs/
│   └── page.tsx      → http://localhost:3000/secteurs
├── contact/
│   └── page.tsx      → http://localhost:3000/contact
└── a-propos/
    └── page.tsx      → http://localhost:3000/a-propos
```

**Règle simple :**
- Dossier = Route
- `page.tsx` = Page affichée

---

## 🎓 Conclusion

**Avant :**
- ❌ Liens morts (`href="#"`)
- ❌ Pas de navigation
- ❌ Rechargement complet

**Après :**
- ✅ Navigation fluide
- ✅ Performance optimale
- ✅ Expérience utilisateur améliorée

**Le secret :** `Link` de Next.js fait tout le travail ! 🚀

