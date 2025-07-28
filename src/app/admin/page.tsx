"use client";

import { useState } from "react";
import { Button } from "../../components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import { Input, Label } from "../../components/ui/Input";
import { Upload, Lock } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Mot de passe admin (changez-le !)
  const ADMIN_PASSWORD = "Sandra&Nicolas2026";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Mot de passe incorrect");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white py-16 px-4 flex items-center justify-center">
        <Card variant="elegant" className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-center">
              <Lock className="w-6 h-6" />
              Accès Admin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label required>Mot de passe</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le mot de passe admin"
                  error={!!authError}
                />
                {authError && (
                  <p className="text-red-500 text-sm mt-1">{authError}</p>
                )}
              </div>
              <Button type="submit" variant="primary" className="w-full">
                Se connecter
              </Button>
            </form>
            <div className="mt-4 p-3 bg-stone-50 rounded-lg">
              <p className="text-xs text-stone-600">
                🔒 Cette page est protégée. Seuls Sandra & Nicolas peuvent
                accéder à cette section.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage("Upload en cours...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-photo", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage(
          "Photo uploadée avec succès ! Actualisez la page d'accueil."
        );
      } else {
        setMessage("Erreur lors de l'upload. Utilisez la méthode manuelle.");
      }
    } catch {
      setMessage("Erreur réseau. Utilisez la méthode manuelle.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Card variant="elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Upload className="w-6 h-6" />
              Upload Photo de Couple
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Choisir votre photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="block w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200"
                />
              </div>

              {message && (
                <div className="p-4 bg-stone-100 rounded-lg">
                  <p className="text-stone-700">{message}</p>
                </div>
              )}

              <div className="bg-stone-50 p-4 rounded-lg">
                <h3 className="font-medium text-stone-800 mb-2">
                  Instructions :
                </h3>
                <ul className="text-sm text-stone-600 space-y-1">
                  <li>• Format recommandé : JPG ou PNG</li>
                  <li>• Taille idéale : 800x800px (format carré)</li>
                  <li>• Poids maximum : 5MB</li>
                  <li>• La photo remplacera le placeholder</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">
                  Méthode alternative :
                </h3>
                <p className="text-sm text-blue-700">
                  Copiez votre photo nommée{" "}
                  <code className="bg-blue-100 px-1 rounded">
                    couple-photo.jpg
                  </code>{" "}
                  dans le dossier :
                </p>
                <code className="text-xs bg-blue-100 p-2 rounded block mt-2">
                  /Users/nicolas/DEV/Projets/mariage/public/images/
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
