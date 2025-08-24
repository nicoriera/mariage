# 🎵 Musique de fond - Site de Mariage

Ce dossier contient les fichiers audio pour la musique de fond du site.

## 📁 Structure des fichiers

Placez vos fichiers audio MP3 dans ce dossier avec la structure suivante :

```
public/music/
├── canon-in-d.mp3          # Canon in D - Johann Pachelbel
├── claire-de-lune.mp3      # Clair de Lune - Claude Debussy
├── mariage-damour.mp3      # Mariage d'Amour - Paul de Senneville
├── river-flows-in-you.mp3  # River Flows in You - Yiruma
├── comptine-dun-autre-ete.mp3 # Comptine d'un autre été - Yann Tiersen
├── nuvole-bianche.mp3      # Nuvole Bianche - Ludovico Einaudi
├── la-vie-en-rose.mp3      # La Vie en Rose - Édith Piaf
└── ne-me-quitte-pas.mp3    # Ne me quitte pas - Jacques Brel
```

## 🎼 Ajouter de nouvelles musiques

1. **Formats supportés** : MP3, WAV, OGG
2. **Taille recommandée** : < 10 MB par fichier
3. **Qualité** : 128-320 kbps pour un bon équilibre qualité/taille

## ⚠️ Droits d'auteur

**IMPORTANT** : Assurez-vous d'avoir les droits d'utilisation des musiques ou utilisez des musiques libres de droits.

### Musiques libres de droits recommandées :

- [Free Music Archive](https://freemusicarchive.org/)
- [Incompetech](https://incompetech.com/) (Kevin MacLeod)
- [Bensound](https://www.bensound.com/)
- [Pixabay Music](https://pixabay.com/music/)

## 🔧 Configuration

Les musiques sont configurées dans `src/constants/music.ts`. Pour ajouter une nouvelle piste :

```typescript
{
  id: "nouvelle-musique",
  title: "Titre de la musique",
  artist: "Nom de l'artiste",
  url: "/music/nouvelle-musique.mp3",
  duration: 180, // Durée en secondes
}
```

## 🎯 Fonctionnalités du lecteur

- ✅ Lecture automatique (après interaction utilisateur)
- ✅ Contrôle du volume
- ✅ Navigation entre pistes
- ✅ Playlist complète
- ✅ Barre de progression
- ✅ Mode silencieux
- ✅ Interface responsive et élégante

## 📱 Compatibilité

- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Mobile (iOS Safari, Chrome Mobile)
- ✅ Tablettes
- ✅ Lecteurs d'écran (accessibilité)

## 🚀 Déploiement

Les fichiers audio seront automatiquement inclus dans le build et déployés avec votre site.
