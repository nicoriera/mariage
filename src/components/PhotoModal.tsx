"use client";

import { useEffect } from "react";
import Image from "next/image";
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Heart, 
  MessageCircle, 
  Calendar,
  User
} from "lucide-react";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Text, Badge } from "./ui/Typography";

interface Photo {
  id: string;
  url: string;
  uploader_name: string;
  message?: string;
  created_at: string;
  is_pre_wedding?: boolean;
}

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: Photo[];
  currentPhotoIndex: number;
  onPhotoChange: (index: number) => void;
  onDownload: (url: string, filename: string) => void;
}

export function PhotoModal({ 
  isOpen, 
  onClose, 
  photos, 
  currentPhotoIndex, 
  onPhotoChange,
  onDownload 
}: PhotoModalProps) {
  const currentPhoto = photos[currentPhotoIndex];
  
  // Navigation avec les flèches du clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === "ArrowLeft" && currentPhotoIndex > 0) {
        onPhotoChange(currentPhotoIndex - 1);
      } else if (e.key === "ArrowRight" && currentPhotoIndex < photos.length - 1) {
        onPhotoChange(currentPhotoIndex + 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentPhotoIndex, photos.length, onPhotoChange]);

  if (!currentPhoto) return null;

  const handleDownload = () => {
    const filename = `photo-${currentPhoto.uploader_name}-${new Date(currentPhoto.created_at).getTime()}.jpg`;
    onDownload(currentPhoto.url, filename);
  };

  const goToPrevious = () => {
    if (currentPhotoIndex > 0) {
      onPhotoChange(currentPhotoIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentPhotoIndex < photos.length - 1) {
      onPhotoChange(currentPhotoIndex + 1);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="bg-black">
      <div className="flex flex-col h-[90vh]">
        {/* Header avec infos */}
        <div className="bg-white p-4 border-b">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <Text className="font-medium">{currentPhoto.uploader_name}</Text>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-stone-500" />
              <Text size="sm" variant="muted">
                {new Date(currentPhoto.created_at).toLocaleDateString()}
              </Text>
            </div>

            {currentPhoto.is_pre_wedding && (
              <Badge variant="accent" className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                Nos souvenirs
              </Badge>
            )}
          </div>
        </div>

        {/* Image principale */}
        <div className="flex-1 relative bg-black flex items-center justify-center">
          <Image
            src={currentPhoto.url}
            alt={`Photo de ${currentPhoto.uploader_name}`}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />

          {/* Navigation gauche */}
          {currentPhotoIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors cursor-pointer"
              aria-label="Photo précédente"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Navigation droite */}
          {currentPhotoIndex < photos.length - 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors cursor-pointer"
              aria-label="Photo suivante"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Indicateur pagination sur l'image */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="bg-black/70 text-white px-4 py-2 rounded-full backdrop-blur-sm">
              <Text size="sm" className="text-white font-medium">
                {currentPhotoIndex + 1} / {photos.length}
              </Text>
            </div>
          </div>
        </div>

        {/* Thumbnails navigation */}
        <div className="bg-white p-4 border-t">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => onPhotoChange(index)}
                className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                  index === currentPhotoIndex 
                    ? "border-primary" 
                    : "border-transparent hover:border-stone-300"
                }`}
              >
                <Image
                  src={photo.url}
                  alt={`Miniature ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Footer avec message et actions */}
        <div className="bg-white border-t">
          {/* Message si présent */}
          {currentPhoto.message && (
            <div className="p-4 border-b bg-stone-50">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <Text className="italic">
                  &quot;{currentPhoto.message}&quot;
                </Text>
              </div>
            </div>
          )}
          
          {/* Actions */}
          <div className="p-4 flex justify-between items-center">
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Télécharger cette photo
              </Button>
              
              {photos.length > 1 && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    // Fonction pour télécharger toutes les photos filtrées
                    photos.forEach((photo, index) => {
                      setTimeout(() => {
                        const filename = `photo-${index + 1}-${photo.uploader_name}-${new Date(photo.created_at).getTime()}.jpg`;
                        onDownload(photo.url, filename);
                      }, index * 500);
                    });
                  }}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Télécharger tout ({photos.length})
                </Button>
              )}
            </div>
            
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-stone-600"
            >
              Fermer
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}