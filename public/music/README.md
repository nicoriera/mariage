# 🎵 Musique de fond - Site de Mariage

Ce dossier contient les fichiers audio pour la musique de fond du site.

## 📁 Structure des fichiers

Placez vos fichiers audio MP3 dans ce dossier avec la structure suivante :

```
public/music/
├── fresh.mp3               # Fresh - Daft Punk (actuellement configuré)
├── amada-mia-amore-mia #Amada Mia, Amore Mio - El Pasador
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
