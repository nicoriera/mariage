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
import { Heading } from "../../components/ui/Typography";
import {
  Upload,
  Lock,
  LogOut,
  Users,
  Calendar,
  Settings,
  Download,
  Eye,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import LoadingCard from "../../components/LoadingCard";
import { useGuests } from "../../hooks/useGuests";

export default function AdminPage() {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const { guests, stats, loading: guestsLoading } = useGuests();
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setAuthError("");

    const result = await login(password);

    if (!result.success) {
      setAuthError(result.error || "Mot de passe incorrect");
    }

    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    setPassword("");
    setAuthError("");
  };

  if (isLoading) {
    return <LoadingCard />;
  }

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
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                loading={loginLoading}
                disabled={loginLoading}>
                {loginLoading ? "Connexion..." : "Se connecter"}
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Heading level={2} variant="elegant" className="mb-6">
                Administration
              </Heading>
              <p className="text-sm text-gray-600 mt-1">
                Gestion de votre mariage
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Déconnexion
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Stats Dashboard */}
          {!guestsLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                variant="default"
                className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total réponses
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.totalGuests}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                variant="default"
                className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Présents au repas
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.thursdayCount}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                variant="default"
                className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <Users className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Absents
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.totalGuests - stats.thursdayCount}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Guest Management */}
            <div className="lg:col-span-2 space-y-6">
              <Card
                variant="default"
                className="bg-white border border-gray-200">
                <CardHeader className="border-b border-gray-200">
                  <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900">
                    <Users className="w-5 h-5" />
                    Liste des invités (
                    {!guestsLoading ? stats.totalGuests : "..."})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {!guestsLoading && (
                    <div className="divide-y divide-gray-200">
                      {stats.totalGuests === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-lg font-medium">
                            Aucun invité pour le moment
                          </p>
                          <p className="text-sm">
                            Les réponses apparaîtront ici
                          </p>
                        </div>
                      ) : (
                        <div className="max-h-96 overflow-y-auto">
                          {guests.map((guest) => (
                            <div
                              key={guest.id}
                              className="p-4 hover:bg-gray-50 transition-colors">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                                      {guest.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                      <p className="font-medium text-gray-900">
                                        {guest.name}
                                      </p>
                                      {guest.message && (
                                        <p className="text-sm text-gray-500 italic truncate max-w-xs">
                                          « {guest.message} »
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {guest.thursday ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      <Calendar className="w-3 h-3 mr-1" />
                                      Présent
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                      Absent
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - Tools */}
            <div className="space-y-6">
              <Card
                variant="default"
                className="bg-white border border-gray-200">
                <CardHeader className="border-b border-gray-200">
                  <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900">
                    <Upload className="w-5 h-5" />
                    Upload Photo
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Choisir votre photo
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {message && (
                      <div
                        className={`p-3 rounded-md text-sm ${
                          message.includes("succès") ||
                          message.includes("Merci")
                            ? "bg-green-50 text-green-800 border border-green-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                        }`}>
                        {message}
                      </div>
                    )}

                    <div className="bg-gray-50 p-4 rounded-md">
                      <Heading
                        level={6}
                        className="font-medium text-gray-900 mb-2 text-sm">
                        Instructions
                      </Heading>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Format : JPG ou PNG</li>
                        <li>• Taille : 800x800px</li>
                        <li>• Max : 5MB</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card
                variant="default"
                className="bg-white border border-gray-200">
                <CardHeader className="border-b border-gray-200">
                  <CardTitle className="flex items-center gap-3 text-lg font-semibold text-gray-900">
                    <Settings className="w-5 h-5" />
                    Actions rapides
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      disabled>
                      <Download className="w-4 h-4 mr-2" />
                      Exporter liste (bientôt)
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      disabled>
                      <Eye className="w-4 h-4 mr-2" />
                      Voir site public
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
