"use client";

import { useState, useEffect } from "react";
import {
  Upload,
  Heart,
  MessageCircle,
  Calendar,
  Users as UsersIcon,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input, Textarea, Label } from "../../components/ui/Input";
import { Heading, Text, Badge } from "../../components/ui/Typography";
import { uploadImage } from "../../../lib/imageStorage";
import { supabase } from "../../../lib/supabase";

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
  const [uploaderName, setUploaderName] = useState("");
  const [message, setMessage] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "pre-wedding" | "guests">(
    "all"
  );

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

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    if (!uploaderName.trim()) {
      alert("Merci de renseigner votre nom");
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map((file) =>
        uploadImage(file, uploaderName.trim(), message.trim() || undefined)
      );

      await Promise.all(uploadPromises);

      // Réinitialiser le formulaire
      setUploaderName("");
      setMessage("");
      setShowUploadForm(false);

      // Recharger les photos
      await fetchPhotos();

      alert(`${files.length} photo(s) uploadée(s) avec succès ! 📸`);
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      alert("Erreur lors de l'upload. Réessayez dans quelques instants.");
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

  return (
    <div className="min-h-screen bg-white py-16 px-4 pb-20 md:pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Heading level={1} variant="elegant" className="mb-4 text-primary">
            Galerie Photos
          </Heading>
          <Text size="lg" variant="muted" className="mb-6">
            Partagez vos plus beaux souvenirs avec nous
          </Text>

          {/* Statistiques */}
          <div className="flex justify-center gap-4 mb-8">
            <Badge variant="romantic" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              {stats.total} photos
            </Badge>
            <Badge variant="romantic" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {stats.preWedding} souvenirs
            </Badge>
            <Badge variant="romantic" className="flex items-center gap-2">
              <UsersIcon className="w-4 h-4" />
              {stats.guests} des invités
            </Badge>
          </div>

          {/* Bouton upload */}
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="mb-8">
            <Upload className="w-5 h-5" />
            Ajouter des photos
          </Button>
        </div>

        {/* Formulaire d'upload */}
        {showUploadForm && (
          <Card variant="elevated" className="mb-8">
            <CardHeader>
              <CardTitle>Partager vos photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label required>Votre nom</Label>
                  <Input
                    value={uploaderName}
                    onChange={(e) => setUploaderName(e.target.value)}
                    placeholder="Entrez votre nom"
                  />
                </div>

                <div>
                  <Label>Message (optionnel)</Label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ajoutez un petit message avec vos photos..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Photos</Label>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleUpload(e.target.files)}
                    disabled={uploading}
                  />
                  <Text size="sm" variant="muted" className="mt-2">
                    Formats acceptés: JPG, PNG, HEIC. Maximum 10 Mo par photo.
                  </Text>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => setShowUploadForm(false)}>
                    Annuler
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filtres */}
        <div className="flex justify-center gap-2 mb-8">
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

        {/* Grille de photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <Card
              key={photo.id}
              variant="elevated"
              className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-stone-100 relative overflow-hidden">
                <img
                  src={photo.url}
                  alt={`Photo de ${photo.uploader_name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {photo.is_pre_wedding && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="romantic" className="text-xs">
                      <Heart className="w-3 h-3" />
                    </Badge>
                  </div>
                )}
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
                ? "Aucune photo d'invité pour le moment"
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
      </div>
    </div>
  );
}
