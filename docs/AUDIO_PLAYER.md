# 🎵 Lecteur Audio - Documentation Technique

## 📋 Vue d'ensemble

Le lecteur audio a été implémenté pour ajouter une ambiance musicale romantique au site de mariage. Il respecte les bonnes pratiques web et les contraintes des navigateurs modernes.

## 🏗️ Architecture

### Composants principaux

1. **`AudioPlayer.tsx`** - Interface utilisateur du lecteur
2. **`useAudioPlayer.ts`** - Hook personnalisé pour la logique audio
3. **`music.ts`** - Configuration de la playlist et constantes

### Structure des fichiers

```
src/
├── components/
│   └── AudioPlayer.tsx          # Composant principal
├── hooks/
│   └── useAudioPlayer.ts        # Logique audio
├── constants/
│   └── music.ts                 # Playlist et config
└── app/
    └── layout.tsx               # Intégration globale

public/
└── music/                       # Fichiers audio
    ├── README.md                # Instructions
    └── placeholder.txt          # Placeholder
```

## 🎯 Fonctionnalités

### ✅ Implémentées
- [x] Lecture/pause avec bouton principal
- [x] Navigation entre pistes (précédent/suivant)
- [x] Contrôle du volume avec slider
- [x] Mode silencieux (mute/unmute)
- [x] Barre de progression cliquable
- [x] Affichage des informations de piste
- [x] Playlist complète avec navigation
- [x] Interface étendue/réduite
- [x] Gestion des erreurs audio
- [x] Fallback pour autoplay bloqué
- [x] Responsive design
- [x] Accessibilité (ARIA labels, navigation clavier)

### 🔄 Comportements
- **Lecture automatique** : Désactivée par défaut (respect des navigateurs)
- **Transition entre pistes** : Automatique en fin de piste
- **Persistance** : Volume et état conservés pendant la session
- **Performance** : Chargement à la demande des fichiers audio

## 🎨 Interface utilisateur

### Design
- **Position** : Fixe en bas à droite
- **Style** : Moderne avec backdrop-blur et ombres
- **Couleurs** : Cohérentes avec le thème du site
- **Animations** : Transitions fluides et micro-interactions

### Responsive
- **Mobile** : Interface compacte optimisée
- **Tablette** : Contrôles adaptés au tactile
- **Desktop** : Interface complète avec toutes les options

## 🔧 Configuration

### Playlist
```typescript
export const WEDDING_PLAYLIST: Track[] = [
  {
    id: "canon-in-d",
    title: "Canon in D",
    artist: "Johann Pachelbel",
    url: "/music/canon-in-d.mp3",
    duration: 240, // 4 minutes
  },
  // ... autres pistes
];
```

### Paramètres par défaut
```typescript
export const AUDIO_PLAYER_CONFIG = {
  defaultVolume: 0.5,
  autoPlay: false,
  fadeInDuration: 2000,
  crossfadeDuration: 1000,
};
```

## 🚀 Utilisation

### Pour les utilisateurs
1. **Démarrer la musique** : Cliquer sur le bouton play
2. **Changer de piste** : Utiliser les boutons précédent/suivant
3. **Ajuster le volume** : Utiliser le slider ou le bouton mute
4. **Voir la playlist** : Cliquer sur l'icône musique
5. **Étendre l'interface** : Cliquer sur la flèche

### Pour les développeurs
1. **Ajouter une piste** : Modifier `src/constants/music.ts`
2. **Personnaliser l'interface** : Modifier `src/components/AudioPlayer.tsx`
3. **Changer la logique** : Modifier `src/hooks/useAudioPlayer.ts`

## ⚠️ Limitations et contraintes

### Navigateurs
- **Autoplay** : Bloqué par défaut sur la plupart des navigateurs
- **Formats** : MP3 recommandé pour la compatibilité maximale
- **Mobile** : Restrictions supplémentaires sur iOS et Android

### Performance
- **Taille des fichiers** : Limiter à 10 MB par piste
- **Qualité** : 128-320 kbps recommandé
- **Chargement** : Progressive pour éviter les blocages

## 🧪 Tests

### Tests manuels
- [ ] Lecture/pause sur différents navigateurs
- [ ] Navigation entre pistes
- [ ] Contrôle du volume
- [ ] Responsive sur mobile/tablette
- [ ] Accessibilité clavier

### Tests automatiques
- [ ] Build sans erreurs
- [ ] Types TypeScript valides
- [ ] Règles ESLint respectées

## 🔮 Améliorations futures

### Fonctionnalités
- [ ] Mode aléatoire (shuffle)
- [ ] Boucle (repeat)
- [ ] Favoris utilisateur
- [ ] Synchronisation entre onglets
- [ ] Notifications de changement de piste

### Technique
- [ ] Service Worker pour le cache audio
- [ ] Streaming adaptatif
- [ ] Analytics de l'écoute
- [ ] Intégration avec l'API Web Audio

## 📚 Ressources

### Documentation
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [HTML5 Audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
- [Autoplay Policy](https://developer.chrome.com/blog/autoplay/)

### Outils
- [Audacity](https://www.audacityteam.org/) - Édition audio
- [FFmpeg](https://ffmpeg.org/) - Conversion de formats
- [Online Audio Converter](https://online-audio-converter.com/) - Conversion en ligne

## 🐛 Dépannage

### Problèmes courants
1. **Pas de son** : Vérifier le volume et le mute
2. **Fichier non trouvé** : Vérifier le nom et l'emplacement
3. **Lecture bloquée** : Cliquer sur play après interaction utilisateur
4. **Performance** : Vérifier la taille et la qualité des fichiers

### Logs
- Erreurs dans la console du navigateur
- Messages d'erreur dans l'interface
- Fallbacks automatiques activés
