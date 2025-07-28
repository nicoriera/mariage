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

// Option 2: Upload vers un service gratuit avec stockage local temporaire
export const uploadToLocalStorage = async (file: File, uploaderName: string, message?: string) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      
      try {
        // Sauvegarder en base64 dans Supabase
        const { data, error } = await supabase
          .from('gallery')
          .insert([{
            url: base64, // Base64 de l'image
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
  // Par défaut, utiliser Imgur (le plus simple et gratuit)
  return uploadToImgur(file, uploaderName, message);
};