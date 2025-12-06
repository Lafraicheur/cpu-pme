# 📚 Explications des Modifications Next.js

Ce document explique **pourquoi** et **comment** chaque modification a été faite dans le projet CPU-PME.

---

## 🎯 1. Pourquoi utiliser `Link` au lieu de `<a href="#">` ?

### ❌ **Avant (Problème)**
```tsx
<a href="#">Secteurs & Filières</a>
```

**Problèmes :**
- Le `#` ne fait rien (reste sur la même page)
- Recharge toute la page (perte de performance)
- Pas de préchargement des pages
- Expérience utilisateur moins fluide

### ✅ **Après (Solution)**
```tsx
import Link from "next/link";

<Link href="/secteurs">Secteurs & Filières</Link>
```

**Avantages :**
- ✅ Navigation **instantanée** (pas de rechargement complet)
- ✅ **Préchargement automatique** des pages (quand tu survoles le lien)
- ✅ Meilleure **performance** (Next.js charge seulement ce qui change)
- ✅ **Historique du navigateur** géré automatiquement
- ✅ **SEO amélioré** (crawlers comprennent mieux la structure)

---

## 🔍 2. Comment fonctionne `Link` de Next.js ?

### **Principe de base :**

```tsx
import Link from "next/link";

// Syntaxe simple
<Link href="/secteurs">Aller aux secteurs</Link>

// Avec des classes CSS (comme un <a> normal)
<Link 
  href="/secteurs" 
  className="text-blue-500 hover:text-blue-700"
>
  Secteurs
</Link>
```

### **Ce qui se passe quand tu cliques :**

1. **Next.js intercepte le clic** (au lieu de recharger la page)
2. **Charge uniquement** le contenu de la nouvelle page
3. **Mise à jour** de l'URL dans la barre d'adresse
4. **Animation fluide** (pas de flash blanc)

### **Exemple concret :**

```tsx
// Dans Header.tsx
<Link href="/secteurs">
  Secteurs & Filières
</Link>
```

**Quand tu cliques :**
- ✅ Va vers `/secteurs` (la page `src/app/secteurs/page.tsx`)
- ✅ Pas de rechargement complet
- ✅ Transitions fluides

---

## 📁 3. Structure des Routes dans Next.js (App Router)

### **Comment Next.js trouve les pages ?**

Next.js utilise le **dossier `app/`** pour créer automatiquement les routes :

```
src/app/
├── page.tsx          → Route: / (page d'accueil)
├── secteurs/
│   └── page.tsx      → Route: /secteurs
├── a-propos/
│   └── page.tsx      → Route: /a-propos
├── contact/
│   └── page.tsx      → Route: /contact
└── layout.tsx        → Layout partagé (Header + Footer)
```

### **Règle importante :**

- **Dossier** = **Route**
- **`page.tsx`** = **Page affichée**

**Exemple :**
```
src/app/secteurs/page.tsx
         ↓
    Route: /secteurs
```

---

## 🔧 4. Détail des Modifications

### **A. Import de Link**

```tsx
import Link from "next/link";
```

**Pourquoi ?**
- `Link` est un composant spécial de Next.js
- Il faut l'importer pour l'utiliser
- C'est comme importer `useState` de React

---

### **B. Remplacement des liens dans le Header**

**Avant :**
```tsx
<a href="#">Secteurs & Filières</a>
```

**Après :**
```tsx
<Link href="/secteurs">Secteurs & Filières</Link>
```

**Explication :**
- `href="/secteurs"` → pointe vers `src/app/secteurs/page.tsx`
- Next.js fait automatiquement le lien entre l'URL et le fichier

---

### **C. Logo cliquable**

**Avant :**
```tsx
<div className="flex items-center">
  <Image src="/logo.png" ... />
</div>
```

**Après :**
```tsx
<Link href="/">
  <Image src="/logo.png" ... />
</Link>
```

**Pourquoi ?**
- Convention web : le logo mène à l'accueil
- `href="/"` → page d'accueil (`src/app/page.tsx`)

---

### **D. Boutons avec Link**

**Dans la page secteurs :**

```tsx
<Link href="/contact">
  <Button>Nous contacter</Button>
</Link>
```

**Explication :**
- Le `Button` est **à l'intérieur** du `Link`
- Quand tu cliques sur le bouton, ça navigue vers `/contact`
- Le bouton garde son style, mais devient cliquable

---

## 🎓 5. Concepts Next.js Importants

### **A. Client Components (`"use client"`)**

```tsx
"use client";

export default function Header() {
  // ...
}
```

**Pourquoi ?**
- Par défaut, Next.js rend les composants **côté serveur**
- Si tu utilises `useState`, `useEffect`, ou des événements → besoin de `"use client"`
- Le Header utilise `useState` pour le menu mobile → donc `"use client"`

**Règle :**
- ✅ **Server Component** (par défaut) : pas d'interactivité
- ✅ **Client Component** (`"use client"`) : avec interactivité

---

### **B. Navigation Programmatique**

Si tu veux naviguer depuis du code JavaScript :

```tsx
"use client";

import { useRouter } from "next/navigation";

function MonComposant() {
  const router = useRouter();
  
  const handleClick = () => {
    router.push("/secteurs"); // Navigue vers /secteurs
  };
  
  return <button onClick={handleClick}>Aller aux secteurs</button>;
}
```

**Quand utiliser ?**
- Après un formulaire soumis
- Après une action (ex: connexion)
- Navigation conditionnelle

---

### **C. Liens Externes**

Pour les liens vers d'autres sites :

```tsx
// ❌ Mauvais (utilise Link)
<Link href="https://google.com">Google</Link>

// ✅ Bon (utilise <a> normal)
<a href="https://google.com" target="_blank" rel="noopener noreferrer">
  Google
</a>
```

**Règle :**
- **Lien interne** (même site) → `Link`
- **Lien externe** (autre site) → `<a>`

---

## 📊 6. Comparaison Visuelle

### **Navigation avec `<a href="#">`**
```
Clic → Rechargement complet → Flash blanc → Nouvelle page
⏱️ Temps: ~500ms - 1s
```

### **Navigation avec `Link`**
```
Clic → Transition fluide → Nouvelle page
⏱️ Temps: ~50ms - 200ms
```

**Résultat :** 5x à 10x plus rapide ! 🚀

---

## 🎯 7. Résumé des Bonnes Pratiques

### ✅ **À FAIRE :**

1. **Utiliser `Link` pour les liens internes**
   ```tsx
   <Link href="/secteurs">Secteurs</Link>
   ```

2. **Utiliser `<a>` pour les liens externes**
   ```tsx
   <a href="https://example.com" target="_blank">Exemple</a>
   ```

3. **Utiliser `"use client"` si interactivité**
   ```tsx
   "use client";
   ```

4. **Structurer les routes avec des dossiers**
   ```
   app/secteurs/page.tsx → /secteurs
   ```

### ❌ **À ÉVITER :**

1. **Ne pas utiliser `Link` pour les liens externes**
   ```tsx
   ❌ <Link href="https://google.com">Google</Link>
   ```

2. **Ne pas utiliser `<a href="#">` pour la navigation interne**
   ```tsx
   ❌ <a href="#">Secteurs</a>
   ```

3. **Ne pas oublier `"use client"` si tu utilises des hooks**
   ```tsx
   ❌ // Sans "use client"
   const [state, setState] = useState(); // ❌ Erreur !
   ```

---

## 🚀 8. Prochaines Étapes

Maintenant que tu comprends `Link`, tu peux :

1. **Ajouter des liens dans d'autres pages**
2. **Créer des pages dynamiques** (ex: `/secteurs/[id]`)
3. **Utiliser la navigation programmatique** avec `useRouter`
4. **Optimiser les performances** avec le préchargement

---

## 💡 Questions Fréquentes

### **Q: Puis-je mettre des styles sur `Link` ?**
**R:** Oui ! `Link` accepte toutes les props d'un `<a>`, y compris `className` :
```tsx
<Link href="/secteurs" className="text-blue-500">
  Secteurs
</Link>
```

### **Q: Comment faire un lien actif (page courante) ?**
**R:** Utilise `usePathname()` :
```tsx
"use client";
import { usePathname } from "next/navigation";

const pathname = usePathname();
const isActive = pathname === "/secteurs";
```

### **Q: Puis-je précharger manuellement une page ?**
**R:** Oui, avec `router.prefetch()` :
```tsx
const router = useRouter();
router.prefetch("/secteurs");
```

---

**🎉 Félicitations ! Tu comprends maintenant les bases de la navigation Next.js !**

