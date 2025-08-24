import axios from 'axios';
import { supabase } from './supabase';

// Option 1: Imgur (100% gratuit, pas de configuration)
export const uploadToImgur = async (file: File, uploaderName: string, message?: string) => {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    // Upload vers Imgur (anonymous, pas besoin de clé API pour usage limité)
    const response = await axios.post('https://api.imgur.com/3/image', formData, {
      headers: {
        'Authorization': 'Client-ID 546c25a59c58ad7', // Client ID public Imgur
        'Content-Type': 'multipart/form-data',
      },
    });

    const imageUrl = response.data.data.link;
    
    // Sauvegarder les métadonnées dans Supabase (gratuit aussi)
    const { data, error } = await supabase
      .from('gallery')
      .insert([{
        url: imageUrl,
        uploader_name: uploaderName,
        message: message || null,
        created_at: new Date().toISOString(),
        is_pre_wedding: false
      }])
      .select()
      .single();

    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Erreur upload Imgur:', error);
    throw new Error('Erreur lors de l\'upload de l\'image');
  }
};

// Option 2: Upload avec stockage local (base64 dans Supabase)
export const uploadToLocalStorage = async (file: File, uploaderName: string, message?: string) => {
  return new Promise((resolve, reject) => {
    // Vérifier la taille du fichier (max 5MB pour éviter les problèmes de stockage)
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error('Image trop volumineuse (max 5MB)'));
      return;
    }

    // Créer un canvas pour redimensionner l'image si nécessaire
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = async () => {
      try {
        // Calculer les nouvelles dimensions (max 1200px)
        const maxSize = 1200;
        let { width, height } = img;
        
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = (height * maxSize) / width;
            width = maxSize;
          } else {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        // Redimensionner l'image
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convertir en base64 avec compression
        const base64 = canvas.toDataURL('image/jpeg', 0.8);
        
        // Sauvegarder en base64 dans Supabase
        const { data, error } = await supabase
          .from('gallery')
          .insert([{
            url: base64,
            uploader_name: uploaderName,
            message: message || null,
            created_at: new Date().toISOString(),
            is_pre_wedding: false
          }])
          .select()
          .single();

        if (error) throw error;
        
        resolve({ success: true, data });
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => reject(new Error('Erreur lors du traitement de l\'image'));
    
    // Lire le fichier
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Erreur lecture fichier'));
    reader.readAsDataURL(file);
  });
};

// Option 3: Utilisation d'une API de stockage gratuite (Cloudinary free tier)
export const uploadToCloudinary = async (file: File, uploaderName: string, message?: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'mariage_preset'); // À créer dans Cloudinary
  
  try {
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload',
      formData
    );

    const imageUrl = response.data.secure_url;
    
    // Sauvegarder dans Supabase
    const { data, error } = await supabase
      .from('gallery')
      .insert([{
        url: imageUrl,
        uploader_name: uploaderName,
        message: message || null,
        created_at: new Date().toISOString(),
        is_pre_wedding: false
      }])
      .select()
      .single();

    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Erreur upload Cloudinary:', error);
    throw new Error('Erreur lors de l\'upload vers Cloudinary');
  }
};

// Fonction principale qui choisit la méthode d'upload
export const uploadImage = async (file: File, uploaderName: string, message?: string) => {
  // Essayer Imgur en premier, fallback vers localStorage en cas d'erreur
  try {
    return await uploadToImgur(file, uploaderName, message);
  } catch (error) {
    console.warn('Imgur upload failed, falling back to local storage:', error);
    
    // En développement ou si Imgur échoue, utiliser le stockage local
    if (typeof window !== 'undefined' && (
      window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.includes('vercel.app')
    )) {
      return await uploadToLocalStorage(file, uploaderName, message);
    }
    
    // Re-throw l'erreur si on ne peut pas utiliser le fallback
    throw error;
  }
};