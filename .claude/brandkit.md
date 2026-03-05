# Sofia Brand Kit

> Guide de reference visuelle pour les videos Remotion et tous les supports de communication.

---

## 1. Logo & Icones

| Asset | Fichier | Dimensions |
|---|---|---|
| Logo principal | `extension/assets/Logo.png` | 827x827 |
| Icone extension | `extension/assets/icon.png` | 827x827 |
| Icone blanche | `extension/assets/iconwhite.png` | 827x827 |
| Icones light (16-128px) | `extension/assets/icon-light-{16,32,48,64,128}.png` | Multi |
| Icones dark (16-128px) | `extension/assets/icon-dark-{16,32,48,64,128}.png` | Multi |

---

## 2. Palette de couleurs

### Couleurs principales

| Nom | Hex | Usage |
|---|---|---|
| **Primary** | `#C7866C` | Couleur de marque principale — argile chaud |
| **Primary Dark** | `#372118` | Fond sombre, texte sur clair |
| **Primary Light** | `#F2DED6` | Texte principal sur fond sombre |
| **Secondary** | `#945941` | Accents secondaires, hover |
| **Accent Green** | `#A6AF6B` | Accent complementaire olive |
| **Off-white** | `#FBF7F5` | Texte secondaire, backgrounds clairs |

### Couleurs interactives

| Nom | Hex | Usage |
|---|---|---|
| Hover Pink | `#FFB3C4` | Etats hover, CTA secondaires |
| Hover Yellow | `#FFE078` | Etats hover dores |
| Gold / Reward | `#F59E0B` | XP, achievements, recompenses |
| Golden Yellow | `#FCD34D` | Highlights, celebrations |

### Couleurs de statut

| Statut | Hex |
|---|---|
| Success | `#22c55e` |
| Error | `#ef4444` |
| Warning | `#f59e0b` |
| Info | `#60a5fa` |

### Couleurs d'intention

| Intention | Couleur primaire | Couleur secondaire |
|---|---|---|
| Work | `#3B82F6` | `#60A5FA` |
| Learning | `#10B981` | `#34D399` |
| Fun | `#F59E0B` | `#FBBF24` |
| Inspiration | `#8B5CF6` | `#A78BFA` |
| Buying | `#EF4444` | `#F87171` |

### Surfaces & Backgrounds

| Nom | Valeur | Usage |
|---|---|---|
| Glass BG | `rgba(0, 0, 0, 0.8)` | Fond glassmorphism |
| Glass Light | `rgba(255, 255, 255, 0.05)` | Surface subtile |
| Glass Lighter | `rgba(255, 255, 255, 0.1)` | Surface interactive |
| Overlay | `rgba(26, 26, 26, 0.95)` | Fond modal/overlay |
| Main BG | `radial-gradient(circle at center, #0f0f23 0%, #0a0a0a 100%)` | Background global |
| Modal BG | `linear-gradient(to bottom, #060504, #101010)` | Fond modals |

### Bordures

| Nom | Valeur |
|---|---|
| Glass | `rgba(255, 255, 255, 0.08)` |
| Light | `rgba(255, 255, 255, 0.1)` |
| Lighter | `rgba(255, 255, 255, 0.125)` |
| Muted | `rgba(242, 222, 214, 0.2)` |

---

## 3. Typographie

### Familles de polices

| Police | Type | Poids | Usage |
|---|---|---|---|
| **Gotu** | Sans-serif arrondie | 400, 600 | Titres, boutons, texte prominent |
| **Montserrat** | Sans-serif | 400, 500, 600 | Corps de texte, labels, descriptions |

> **Source** : Google Fonts
> **Fallback** : `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

### Echelle typographique

| Token | Taille | Usage |
|---|---|---|
| xs | 10px | Micro-labels |
| sm | 12px | Labels, metadata |
| base | 14px | Corps de texte |
| lg | 16px | Titres de section |
| xl | 18px | Sous-titres |
| 2xl | 24px | Titres principaux |
| 3xl | 28px | Titres hero |

### Regles d'usage

- **Titres** : Gotu, weight 600, 16–28px
- **Corps** : Montserrat, weight 400–500, 13–14px
- **Boutons** : Gotu, weight 600–700, 14px
- **Labels** : Montserrat, weight 500, 11–12px

---

## 4. Gradients

### Iridescence (CTA principal)

```css
background: linear-gradient(135deg, #D790C7 0%, #d37cbf 20%, #ffc6b0 50%, #ffa7b1 80%, #cea2fd 100%);
background-size: 200% 200%;
animation: orb-gradient 20s ease infinite;
```

> Magenta > Rose > Saumon > Rose > Lavande — utilise sur les boutons "Connect Wallet", "Add to Signals"

### Progress Bar (XP / Level)

```css
linear-gradient(90deg, #FB6E3A 0%, #F2D57C 35%, #D5DF88 70%, #D04AA4 100%)
```

> Corail > Or > Lime > Violet — barre de progression principale

### Accent Brown

```css
linear-gradient(90deg, #C7866C, #8B5A3C)
```

> Gradient marron chaud — bordures d'accentuation sur les cartes

---

## 5. Effets visuels

### Glassmorphism

```css
background: rgba(0, 0, 0, 0.14);
backdrop-filter: blur(50px) saturate(100%);
border: 1px solid rgba(255, 255, 255, 0.1);
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5);
border-radius: 12px;
```

### Ombres

| Niveau | Valeur |
|---|---|
| Subtile | `0 2px 6px rgba(0, 0, 0, 0.2)` |
| Standard | `0 4px 24px rgba(0, 0, 0, 0.2)` |
| Forte | `0 8px 32px rgba(0, 0, 0, 0.3)` |
| Primary glow | `0 4px 16px rgba(219, 107, 62, 0.3)` |
| Button glow | `0 4px 12px rgba(212, 165, 116, 0.3)` |
| CTA glow | `0 8px 32px rgba(236, 72, 153, 0.4)` |

### Border Radius

| Token | Valeur | Usage |
|---|---|---|
| sm | 4px | Petits boutons, inputs |
| md | 8px | Elements moyens |
| lg | 12px | Cartes |
| xl | 20px | Conteneurs, modals |
| full | 50% | Avatars, cercles |

---

## 6. Animations cles

### Gradient Orb (20s, infinite)

```css
@keyframes orb-gradient {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

### Card Enter / Leave

```css
@keyframes cardEnter {
  from { opacity: 0; transform: translateY(10px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes cardLeave {
  to { opacity: 0; transform: translateY(-10px) scale(0.95); }
}
```

### Celebration Pulse (achievements)

```css
@keyframes celebration-pulse {
  0%   { transform: scale(1); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7); }
  25%  { transform: scale(1.12); box-shadow: 0 0 20px 8px rgba(245, 158, 11, 0.5); }
  100% { transform: scale(1); box-shadow: 0 0 0 0; }
}
```

### XP Float In

```css
@keyframes xp-float-in {
  0%   { opacity: 0; transform: translateY(10px) scale(0.8); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
```

### Transitions standard

| Vitesse | Valeur | Usage |
|---|---|---|
| Fast | `all 0.2s ease` | Hover, micro-interactions |
| Normal | `all 0.3s ease` | Transitions standard |
| Slow | `all 0.5s ease` | Changements de layout |

### Hover pattern

```css
transform: translateY(-2px);
/* + shadow enhancement */
```

---

## 7. Badges & Recompenses

### Discovery Badges

| Badge | Couleur | Shadow |
|---|---|---|
| Pioneer | Or / Ambre | `drop-shadow(0 4px 12px rgba(245, 158, 11, 0.4))` |
| Explorer | Bleu | `drop-shadow(0 4px 12px rgba(59, 130, 246, 0.4))` |
| Contributor | Violet | `drop-shadow(0 4px 12px rgba(139, 92, 246, 0.4))` |

**Assets** : `extension/components/ui/img/badges/{pioneer,explorer,contributor,trust}.png`

### Gold Rewards

| Asset | Fichier |
|---|---|
| Piece d'or | `extension/components/ui/img/gold/goldcoin.png` |
| Gold placeholder SVG | `extension/components/ui/img/gold/goldplaceholder.svg` |
| Gold reward | `extension/components/ui/img/xp/goldreward.png` |
| Animation video | `extension/assets/bggoldreward50.mp4` |

### Quest Success Icons

Dossier : `extension/components/ui/img/questssuccess/`

discovery, streak, follow, pulse, bookmark, curator, gold, Signal, trust, social

---

## 8. Identite de marque

### Personnalite

| Trait | Expression |
|---|---|
| **Sophistique** | Palette sombre, glassmorphism, effets de profondeur |
| **Chaleureux** | Tons argile/brun, accents dores |
| **Tech-forward** | Esthetique Web3, gradients iridescents |
| **Accessible** | Animations fluides, typo arrondie (Gotu) |
| **Fiable** | Hierarchie visuelle claire, feedback interactif |

### Univers visuel

- **Theme** : Dark mode exclusif
- **Style** : Glassmorphism + gradients chauds sur fond sombre
- **Mouvement** : Transitions douces, echelle 0.95-1.0, micro-animations
- **Texture** : Effets de blur (5-50px), saturation, particules WebGL

---

## 9. Le produit — Vision & Positionnement

### Pitch

**Sofia transforme ta navigation web en identite verifiable.**

Chaque page visitee, chaque interet, chaque signal de confiance devient une preuve cryptographique que tu possedes. Sofia ne vend pas tes donnees — elle te permet de les prouver, de les valoriser et de les partager selon tes propres regles.

### Baseline

> *"Own your browsing. Prove your identity."*

### Proposition de valeur

| Pour qui | Probleme | Solution Sofia |
|---|---|---|
| L'utilisateur Web3 | Reputation on-chain limitee aux transactions financieres | Chaque page visitee enrichit ton identite on-chain |
| Le curateur | Aucune recompense pour decouvrir du contenu avant les autres | Systeme Pioneer/Explorer avec recompenses Gold |
| Le chercheur | Impossible de prouver son expertise de navigation | Certifications d'intention verifiables (Work, Learning, etc.) |
| La communaute | Recommandations centralisees (Google, Twitter algo) | Recommandations par cercle de confiance decentralise |

### Comment ca marche (3 etapes)

1. **Navigate** — Sofia capture automatiquement ton activite web (opt-in, donnees privees)
2. **Certifie** — Choisis une intention pour chaque page (Work, Learning, Fun, Inspiration, Buying) et publie-la on-chain
3. **Recolte** — Gagne du Gold, de l'XP, monte en niveau et construis ta reputation verifiable

---

## 10. Fonctionnalites

### Navigation intelligente

| Feature | Description |
|---|---|
| **Tracking automatique** | Sofia enregistre chaque page visitee en local (activable/desactivable) |
| **Echoes** | Tes sites visites sont regroupes par domaine en "echos" — un miroir de tes habitudes |
| **Historique** | Timeline complete de ta navigation avec statut de certification |
| **Filtrage intelligent** | Pages sensibles (login, banque, email) automatiquement exclues |

### Certification on-chain

| Feature | Description |
|---|---|
| **5 intentions** | Classe chaque page : **Work**, **Learning**, **Fun**, **Inspiration**, **Buying** |
| **Trust / Distrust** | Donne ton avis on-chain sur la fiabilite d'un site |
| **Signals** | Cree des attestations personnalisees (sujet + predicat + objet) |
| **Poids** | Choisis combien de tokens TRUST tu investis dans chaque certification |

### Discovery — Le jeu de la curation

| Statut | Condition | Recompense |
|---|---|---|
| **Pioneer** | Premier a certifier une page | 50 Gold |
| **Explorer** | 2e au 10e a certifier | 20 Gold |
| **Contributor** | 11e et au-dela | 10 Gold |

> Decouvre des pages avant tout le monde, prouve-le on-chain, et sois recompense.

### Intelligence artificielle

| Feature | Description |
|---|---|
| **Sofia Chat** | Assistant IA conversationnel — pose des questions sur tes donnees, demande des recommandations |
| **Pulse Analysis** | Scanne tes onglets ouverts et identifie les themes semantiques de ta session |
| **Analyse d'interets** | L'IA genere un profil de tes centres d'interet a partir de tes certifications on-chain |
| **Recommandations** | Suggestions personnalisees basees sur ton cercle de confiance |

### Social & Confiance

| Feature | Description |
|---|---|
| **Follow** | Suis d'autres utilisateurs pour voir leur activite |
| **Trust Circle** | Accorde ta confiance a des utilisateurs — ils gagnent du poids dans tes recommandations |
| **Resonance** | Flux d'activite de ton cercle de confiance : vois ce qu'ils certifient en temps reel |
| **For You** | Recommandations de sites bases sur les interets partages avec ton cercle |
| **Join** | Rejoins la decouverte d'un autre utilisateur en investissant du TRUST |
| **Partage X** | Partage ton profil Sofia sur Twitter/X avec tes stats et interets |

### Gamification

| Systeme | Description |
|---|---|
| **XP** | Gagne de l'experience pour chaque action (certification, signal, quete completee) |
| **Niveaux** | Monte en niveau au fur et a mesure que ton XP augmente (1 a 100+) |
| **Gold** | Monnaie de recompense gagnee par la curation (Pioneer/Explorer/Contributor) |
| **50+ Quetes** | Objectifs progressifs : signaux, decouvertes, social, streaks, bookmarks, trust |
| **Streaks** | Serie de jours consecutifs avec au moins un signal — debloquer des quetes streak |
| **Badges sociaux** | Lie tes comptes Discord, YouTube, Spotify, Twitch, X pour des badges verifies |

### Bookmarks & Organisation

| Feature | Description |
|---|---|
| **Listes personnelles** | Cree des collections de signaux par theme |
| **Categories d'intention** | Organisation automatique par type (Work, Learning, Fun...) |
| **Import navigateur** | Importe tes bookmarks Chrome existants dans Sofia |

### Wallet & Blockchain

| Feature | Description |
|---|---|
| **Connexion wallet** | MetaMask, WalletConnect et autres wallets EIP-6963 |
| **Token TRUST** | Utilise pour les certifications, le staking et les decouvertes |
| **Bonding curves** | Chaque certification a une courbe de prix — plus c'est tot, moins c'est cher |
| **Portal Intuition** | Liens directs vers l'explorateur on-chain pour chaque attestation |

### Confidentialite & Controle

| Feature | Description |
|---|---|
| **Opt-in total** | Le tracking est desactivable a tout moment |
| **200+ filtres** | Pages sensibles automatiquement bloquees (auth, banque, sante, emails) |
| **Donnees locales** | Navigation stockee en local (IndexedDB), jamais envoyee sans ton accord |
| **Purge complete** | Supprime toutes tes donnees locales en un clic (les donnees on-chain persistent) |

---

## 11. Parcours utilisateur

### Onboarding

1. **Bienvenue** — Presentation de Sofia + connexion wallet
2. **Echoes** — Comment tes sites sont regroupes automatiquement
3. **Certification** — Apprends a certifier une page on-chain
4. **Interets** — Decouvre comment tes certifications construisent ton profil
5. **Niveaux** — Systeme d'XP et de progression
6. **Trust Circle** — Suis et fais confiance a d'autres utilisateurs
7. **Import Bookmarks** — Importe tes favoris pour demarrer avec du contenu

> Le tutoriel est rejouable depuis les parametres.

### Boucle d'engagement quotidienne

```
Ouvre le navigateur
    → Sofia track automatiquement
        → Certifie une page (Work/Learning/Fun...)
            → Gagne XP + potentiellement Gold (Pioneer?)
                → Complete une quete
                    → Monte en niveau
                        → Decouvre les certifications de ton cercle (Resonance)
                            → Rejoins une decouverte ou suis un nouvel utilisateur
```

### Moments cles (pour les videos)

| Moment | Emotion | Visuel |
|---|---|---|
| Premiere connexion wallet | Excitation, curiosite | Bouton iridescent qui pulse |
| Premiere certification | Accomplissement | Animation celebration + Gold |
| Badge Pioneer | Fierte | Badge or avec glow ambre |
| Quete completee | Satisfaction | Carte de succes + claim XP |
| Pulse Analysis | Surprise, decouverte | Themes qui apparaissent un par un |
| Trust un utilisateur | Connexion sociale | Cercle de confiance qui s'agrandit |
| Level up | Progression | Barre de progression qui se remplit (gradient multicolore) |

---

## 12. Vocabulaire de marque

| Terme Sofia | Signification | A NE PAS dire |
|---|---|---|
| **Signal** | Attestation on-chain (sujet-predicat-objet) | Post, message, publication |
| **Echo** | Groupe de sites visites par domaine | Historique, log, trace |
| **Certification** | Choix d'intention pour une page | Vote, like, tag |
| **Intention** | Categorie de visite (Work, Learning, Fun, Inspiration, Buying) | Tag, label, categorie |
| **Trust Circle** | Ensemble des utilisateurs en qui tu as confiance | Amis, contacts, network |
| **Resonance** | Flux social du cercle de confiance | Feed, timeline, fil d'actu |
| **Pioneer** | Premier a certifier une page | Premier, decouvreur |
| **Explorer** | 2e-10e a certifier | Suiveur, early adopter |
| **Pulse** | Analyse IA de ta session de navigation | Scan, audit, diagnostic |
| **Gold** | Monnaie de recompense pour la curation | Points, credits, coins |
| **Amplify** | Publier des signaux sur la blockchain | Poster, publier, broadcast |

---

## 13. Ton & Voix

### Principes

- **Empowerment** — Sofia donne le pouvoir, elle ne prend pas le controle. "Tu possedes", "Tu decides", "Tu prouves"
- **Clarte** — Pas de jargon blockchain inutile. Expliquer simplement ce que l'utilisateur gagne
- **Chaleur** — Ton conversationnel, pas corporatif. Sofia est une compagne de navigation, pas un outil froid
- **Ambition** — Le web que tu merites. Tes donnees, ta reputation, tes regles

### Exemples de copy

| Contexte | Bon | Mauvais |
|---|---|---|
| CTA principal | "Connecte ton wallet" | "Authentification Web3" |
| Certification | "Certifie cette page" | "Cree un triplet on-chain" |
| Discovery | "Tu es le premier a decouvrir cette page" | "Vous etes le premier utilisateur a creer un atome pour cette URL" |
| Recompense | "50 Gold gagnes — bravo Pioneer" | "Transaction reussie, 50 unites creditees" |
| Pulse | "Sofia analyse ta session..." | "Extraction semantique en cours..." |
| Empty state | "Commence a naviguer pour voir tes premiers Echoes" | "Aucune donnee disponible" |

---

## Palette Remotion (resume technique)

Pour tes compositions Remotion, voici les valeurs essentielles :

```typescript
export const SOFIA_BRAND = {
  colors: {
    primary: "#C7866C",
    primaryDark: "#372118",
    primaryLight: "#F2DED6",
    secondary: "#945941",
    accent: "#A6AF6B",
    offWhite: "#FBF7F5",
    gold: "#F59E0B",
    bgDark: "#0a0a0a",
    bgNavy: "#0f0f23",
    modalBgStart: "#060504",
    modalBgEnd: "#101010",
  },
  fonts: {
    display: "Gotu",
    body: "Montserrat",
  },
  gradients: {
    iridescence: "linear-gradient(135deg, #D790C7 0%, #d37cbf 20%, #ffc6b0 50%, #ffa7b1 80%, #cea2fd 100%)",
    progress: "linear-gradient(90deg, #FB6E3A 0%, #F2D57C 35%, #D5DF88 70%, #D04AA4 100%)",
    accentBrown: "linear-gradient(90deg, #C7866C, #8B5A3C)",
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 20,
  },
} as const
```

