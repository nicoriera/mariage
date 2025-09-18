"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Upload,
  Heart,
  MessageCircle,
  Calendar,
  Users as UsersIcon,
  Download,
  Camera,
} from "lucide-react";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Heading, Text, Badge } from "../../components/ui/Typography";
import { uploadImage } from "../../../lib/imageStorage";
import { supabase } from "../../../lib/supabase";
import { PhotoModal } from "../../components/PhotoModal";
import { UploadModal } from "../../components/UploadModal";

interface Photo {
  id: string;
  url: string;
  uploader_name: string;
  message?: string;
  created_at: string;
  is_pre_wedding?: boolean;
}

export default function GaleriePage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "pre-wedding" | "guests">(
    "all"
  );
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      // Charger les photos depuis Supabase (gratuit)
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erreur Supabase:", error);
        // En cas d'erreur, afficher au moins les photos pré-mariage
        setPhotos([]);
      } else {
        // Combiner photos pré-mariage et photos uploadées
        setPhotos(data || []);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des photos:", error);
      setPhotos([]);
    }
  };

  const handleUpload = async (
    files: FileList,
    uploaderName: string,
    message?: string
  ) => {
    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map((file) =>
        uploadImage(file, uploaderName, message)
      );

      await Promise.all(uploadPromises);

      // Recharger les photos
      await fetchPhotos();

      alert(`${files.length} photo(s) uploadée(s) avec succès ! 📸`);
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      alert("Erreur lors de l'upload. Réessayez dans quelques instants.");
      throw error; // Re-throw pour que la modale puisse gérer l'erreur
    } finally {
      setUploading(false);
    }
  };

  const filteredPhotos = photos.filter((photo) => {
    if (activeTab === "pre-wedding") return photo.is_pre_wedding;
    if (activeTab === "guests") return !photo.is_pre_wedding;
    return true;
  });

  const stats = {
    total: photos.length,
    preWedding: photos.filter((p) => p.is_pre_wedding).length,
    guests: photos.filter((p) => !p.is_pre_wedding).length,
  };

  const downloadPhoto = async (url: string, filename: string) => {
    try {
      // Essayer d'abord le téléchargement direct
      const response = await fetch(url);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error(
        "Téléchargement direct impossible, ouverture dans un nouvel onglet:",
        error
      );
      // Si le fetch échoue à cause de la CSP, ouvrir dans un nouvel onglet
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const downloadAllPhotos = async () => {
    if (filteredPhotos.length === 0) {
      alert("Aucune photo à télécharger");
      return;
    }

    const confirmed = window.confirm(
      `Télécharger ${filteredPhotos.length} photo(s) ? Cela peut prendre quelques instants.`
    );

    if (!confirmed) return;

    try {
      // Télécharger toutes les photos une par une
      for (let i = 0; i < filteredPhotos.length; i++) {
        const photo = filteredPhotos[i];
        const filename = `photo-${i + 1}-${photo.uploader_name}-${new Date(
          photo.created_at
        ).getTime()}.jpg`;
        await downloadPhoto(photo.url, filename);

        // Petite pause entre les téléchargements pour éviter de surcharger
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      alert(`${filteredPhotos.length} photo(s) téléchargée(s) !`);
    } catch (error) {
      console.error("Erreur lors du téléchargement groupé:", error);
      alert("Erreur lors du téléchargement des photos");
    }
  };

  const openModal = (photoIndex: number) => {
    setSelectedPhotoIndex(photoIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 pb-20 md:pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Header amélioré */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full mb-6">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <Heading level={2} variant="elegant" className="mb-6">
            Galerie Photos
          </Heading>
          <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
            Partagez vos plus beaux souvenirs avec nous
          </Text>

          {/* Statistiques */}
          <div className="flex justify-center gap-4 mb-8">
            <Badge variant="accent" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              {stats.total} photos
            </Badge>
            <Badge variant="accent" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {stats.preWedding} souvenirs
            </Badge>
            <Badge variant="accent" className="flex items-center gap-2">
              <UsersIcon className="w-4 h-4" />
              {stats.guests} de nos convives
            </Badge>
          </div>

          {/* Bouton upload */}
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowUploadModal(true)}
            className="mb-8">
            <Upload className="w-5 h-5" />
            Ajouter des photos
          </Button>
        </div>

        {/* Filtres et téléchargement */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex justify-center gap-2">
            <Button
              variant={activeTab === "all" ? "primary" : "ghost"}
              onClick={() => setActiveTab("all")}>
              Toutes ({stats.total})
            </Button>
            <Button
              variant={activeTab === "pre-wedding" ? "primary" : "ghost"}
              onClick={() => setActiveTab("pre-wedding")}>
              Nos souvenirs ({stats.preWedding})
            </Button>
            <Button
              variant={activeTab === "guests" ? "primary" : "ghost"}
              onClick={() => setActiveTab("guests")}>
              Vos photos ({stats.guests})
            </Button>
          </div>

          {filteredPhotos.length > 0 && (
            <Button
              variant="secondary"
              onClick={downloadAllPhotos}
              className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Télécharger tout ({filteredPhotos.length} photos)
            </Button>
          )}
        </div>

        {/* Grille de photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <Card
              key={photo.id}
              variant="elegant"
              className="overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => openModal(index)}>
              <div className="aspect-square bg-stone-100 relative overflow-hidden">
                <Image
                  src={photo.url}
                  alt={`Photo de ${photo.uploader_name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Badge pré-mariage */}
                {photo.is_pre_wedding && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="accent" className="text-xs">
                      <Heart className="w-3 h-3" />
                    </Badge>
                  </div>
                )}

                {/* Bouton de téléchargement */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadPhoto(
                        photo.url,
                        `photo-${photo.uploader_name}-${new Date(
                          photo.created_at
                        ).getTime()}.jpg`
                      );
                    }}
                    className="bg-white/90 hover:bg-white text-stone-700 p-2 rounded-full shadow-md transition-colors"
                    title="Télécharger la photo">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Text size="sm" className="font-medium">
                    {photo.uploader_name}
                  </Text>
                  <Text size="sm" variant="muted">
                    {new Date(photo.created_at).toLocaleDateString()}
                  </Text>
                </div>

                {photo.message && (
                  <div className="flex items-start gap-2">
                    <MessageCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <Text size="sm" variant="muted" className="italic">
                      &quot;{photo.message}&quot;
                    </Text>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <Heading level={3} variant="default">
              {activeTab === "guests"
                ? "Aucune photo de convive pour le moment"
                : activeTab === "pre-wedding"
                ? "Nos souvenirs arrivent bientôt..."
                : "Aucune photo pour le moment"}
            </Heading>
            <Text variant="muted" className="mt-2">
              {activeTab === "guests"
                ? "Soyez les premiers à partager vos souvenirs !"
                : "Patience, les souvenirs se préparent..."}
            </Text>
          </div>
        )}

        {/* Modale photo */}
        <PhotoModal
          isOpen={isModalOpen}
          onClose={closeModal}
          photos={filteredPhotos}
          currentPhotoIndex={selectedPhotoIndex}
          onPhotoChange={setSelectedPhotoIndex}
          onDownload={downloadPhoto}
        />

        {/* Modale upload */}
        <UploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
          uploading={uploading}
        />
      </div>
    </div>
  );
}
