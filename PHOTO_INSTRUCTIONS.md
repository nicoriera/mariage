# 📸 Instructions pour Ajouter Votre Photo de Couple

## 🚀 Méthode Rapide

### Option 1 : Remplacer le placeholder
1. **Renommez votre photo** en `couple-photo.jpg`
2. **Copiez-la** dans le dossier : `/Users/nicolas/DEV/Projets/mariage/public/images/`
3. **Modifiez le code** dans `src/components/WeddingHeader.tsx` ligne 34 :
   ```typescript
   src="/images/couple-photo.jpg"  // au lieu de placeholder.svg
   ```

### Option 2 : Garder votre nom de fichier
1. **Copiez votre photo** dans `/Users/nicolas/DEV/Projets/mariage/public/images/`
2. **Modifiez le code** avec le nom de votre fichier :
   ```typescript
   src="/images/votre-photo.jpg"
   ```

## 📐 Recommandations

### Format et Taille
- **Format** : JPG, PNG, WEBP
- **Dimensions** : 800x800px minimum (format carré)
- **Poids** : < 2MB pour de bonnes performances

### Qualité Photo
- **Éclairage** : Photo bien éclairée
- **Cadrage** : Visages bien centrés
- **Qualité** : Haute résolution pour un rendu net

## 🌐 Utiliser une URL externe

Si votre photo est hébergée en ligne :
```typescript
src="https://votre-site.com/photo.jpg"
```

## ✅ Test

1. **Redémarrez le serveur** après avoir modifié `next.config.ts`
2. **Actualisez la page** pour voir votre photo
3. **Le placeholder disparaîtra** automatiquement

## 🔧 En cas de problème

- **Photo ne s'affiche pas** : Vérifiez le chemin et le nom du fichier
- **Format non supporté** : Convertissez en JPG ou PNG
- **Taille trop lourde** : Compressez la photo en ligne

Le placeholder actuel affiche une silhouette simple en attendant votre vraie photo !