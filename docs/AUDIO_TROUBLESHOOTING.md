# 🚨 Dépannage Audio - Guide Rapide

## ❌ Erreur : "Erreur de lecture audio"

### 🔍 Diagnostic
Cette erreur se produit généralement quand :
1. Le fichier audio n'existe pas
2. Le chemin dans la playlist est incorrect
3. Le format de fichier n'est pas supporté
4. Le fichier est corrompu

### ✅ Solution
1. **Vérifier l'existence du fichier** :
   ```bash
   ls -la public/music/
   ```

2. **Vérifier la configuration** dans `src/constants/music.ts` :
   ```typescript
   {
     id: "fresh",
     title: "Fresh",
     artist: "Daft Punk",
     url: "/music/fresh.mp3", // ← Vérifier ce chemin
     duration: 240,
   }
   ```

3. **Vérifier la console du navigateur** pour plus de détails

## 🎵 Problèmes Courants

### Pas de son
- ✅ Vérifier le volume du lecteur
- ✅ Vérifier le bouton mute
- ✅ Vérifier le volume du navigateur
- ✅ Vérifier le volume du système

### Lecture qui se bloque
- ✅ Cliquer sur play après interaction utilisateur
- ✅ Vérifier que le fichier audio est valide
- ✅ Redémarrer le navigateur si nécessaire

### Fichier non trouvé
- ✅ Vérifier le nom exact du fichier
- ✅ Vérifier l'extension (.mp3, .wav, .ogg)
- ✅ Vérifier les permissions du fichier

## 🛠️ Commandes de Dépannage

### Vérifier la structure des fichiers
```bash
# Depuis la racine du projet
find public/music -name "*.mp3" -type f
```

### Vérifier les permissions
```bash
ls -la public/music/
```

### Tester le fichier audio
```bash
# Vérifier que le fichier est valide
file public/music/fresh.mp3
```

### Redémarrer le serveur
```bash
# Arrêter le serveur (Ctrl+C)
# Puis relancer
npm run dev
```

## 🔧 Configuration Recommandée

### Noms de fichiers
- ✅ Utiliser des noms simples : `fresh.mp3`
- ❌ Éviter les espaces : `Daft Punk - Fresh.mp3`
- ❌ Éviter les caractères spéciaux : `fresh_06.mp3`

### Formats supportés
- ✅ **MP3** : Compatibilité maximale
- ✅ **WAV** : Qualité optimale
- ✅ **OGG** : Taille réduite
- ❌ **AAC** : Support limité

### Tailles recommandées
- ✅ **< 5 MB** : Chargement rapide
- ✅ **5-10 MB** : Acceptable
- ❌ **> 10 MB** : Risque de blocage

## 📱 Tests par Plateforme

### Desktop
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Mobile
- [ ] iOS Safari
- [ ] Chrome Mobile
- [ ] Samsung Internet

### Tablette
- [ ] iPad Safari
- [ ] Android Chrome

## 🚀 Déploiement

### Vercel
- ✅ Les fichiers audio sont automatiquement inclus
- ✅ Pas de configuration supplémentaire nécessaire
- ✅ CDN automatique pour les performances

### Autres plateformes
- ✅ Vérifier que le dossier `public/music/` est déployé
- ✅ Vérifier les permissions des fichiers
- ✅ Tester après déploiement

## 📞 Support

Si le problème persiste :
1. Vérifier les logs de la console
2. Tester avec un fichier audio simple
3. Vérifier la configuration du projet
4. Consulter la documentation complète
