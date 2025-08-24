"use client";

import { useState } from "react";
import { Upload, X, Image as ImageIcon, User, MessageCircle } from "lucide-react";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Input, Textarea, Label } from "./ui/Input";
import { Text, Heading } from "./ui/Typography";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: FileList, uploaderName: string, message?: string) => Promise<void>;
  uploading: boolean;
}

export function UploadModal({ isOpen, onClose, onUpload, uploading }: UploadModalProps) {
  const [uploaderName, setUploaderName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (files: FileList | null) => {
    setSelectedFiles(files);
    
    // Créer les previews
    if (files) {
      const urls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image/')) {
          urls.push(URL.createObjectURL(file));
        }
      }
      setPreviewUrls(urls);
    } else {
      setPreviewUrls([]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFiles || !uploaderName.trim()) {
      alert("Merci de renseigner votre nom et de sélectionner des photos");
      return;
    }

    try {
      await onUpload(selectedFiles, uploaderName.trim(), message.trim() || undefined);
      
      // Reset du formulaire
      setUploaderName("");
      setMessage("");
      setSelectedFiles(null);
      setPreviewUrls([]);
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
    }
  };

  const handleClose = () => {
    // Nettoyer les URLs de preview
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setPreviewUrls([]);
    setSelectedFiles(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="bg-white">
      <div className="flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-white p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Upload className="w-5 h-5 text-primary" />
            </div>
            <div>
              <Heading level={3} className="text-primary">
                Partager vos photos
              </Heading>
              <Text size="sm" variant="muted">
                Ajoutez vos plus beaux souvenirs à notre galerie
              </Text>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Informations utilisateur */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label required className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Votre nom
                </Label>
                <Input
                  value={uploaderName}
                  onChange={(e) => setUploaderName(e.target.value)}
                  placeholder="Entrez votre nom"
                  disabled={uploading}
                />
              </div>
              
              <div>
                <Label className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Message (optionnel)
                </Label>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Un petit mot avec vos photos..."
                  disabled={uploading}
                />
              </div>
            </div>

            {/* Sélection de fichiers */}
            <div>
              <Label className="flex items-center gap-2 mb-3">
                <ImageIcon className="w-4 h-4" />
                Sélectionner vos photos
              </Label>
              
              <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files)}
                  disabled={uploading}
                  className="hidden"
                  id="photo-upload"
                />
                <label 
                  htmlFor="photo-upload" 
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-stone-400" />
                  </div>
                  <div>
                    <Text className="font-medium text-primary">
                      Cliquez pour choisir vos photos
                    </Text>
                    <Text size="sm" variant="muted">
                      ou glissez-déposez vos fichiers ici
                    </Text>
                  </div>
                  <Text size="sm" variant="muted">
                    Formats acceptés: JPG, PNG, HEIC • Max 10 Mo par photo
                  </Text>
                </label>
              </div>
            </div>

            {/* Preview des photos sélectionnées */}
            {previewUrls.length > 0 && (
              <div>
                <Label className="mb-3 block">
                  Photos sélectionnées ({previewUrls.length})
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {previewUrls.map((url, index) => (
                    <div 
                      key={index}
                      className="relative aspect-square bg-stone-100 rounded-lg overflow-hidden"
                    >
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => {
                          URL.revokeObjectURL(url);
                          const newUrls = previewUrls.filter((_, i) => i !== index);
                          setPreviewUrls(newUrls);
                          
                          // Mettre à jour les fichiers sélectionnés
                          if (selectedFiles) {
                            const newFiles = Array.from(selectedFiles).filter((_, i) => i !== index);
                            const dataTransfer = new DataTransfer();
                            newFiles.forEach(file => dataTransfer.items.add(file));
                            setSelectedFiles(dataTransfer.files);
                          }
                        }}
                        className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full cursor-pointer"
                        disabled={uploading}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer avec actions */}
        <div className="bg-stone-50 border-t p-6">
          <div className="flex justify-between items-center">
            <Text size="sm" variant="muted">
              {selectedFiles ? `${selectedFiles.length} photo(s) sélectionnée(s)` : "Aucune photo sélectionnée"}
            </Text>
            
            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={handleClose}
                disabled={uploading}
              >
                Annuler
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={uploading || !selectedFiles || !uploaderName.trim()}
                className="flex items-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Upload en cours...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Partager {selectedFiles?.length ? `(${selectedFiles.length})` : ""}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}