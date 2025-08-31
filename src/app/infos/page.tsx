import { MapPin, Clock, Car, Home, Utensils } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import { Heading, Text } from "../../components/ui/Typography";

export default function InfosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-stone-50/50 py-16 px-4 pb-20 md:pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Header amélioré */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full mb-6">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Informations pratiques
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Tout ce qu&apos;il faut savoir pour notre mariage
          </p>
        </div>

        {/* Grille optimisée pour 4 cartes */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Lieu et horaires */}
          <Card
            variant="elegant"
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                Lieu & Horaires
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-lg border border-primary/10">
                <Heading level={5} className="text-primary mb-3 font-semibold">
                  Restaurant Le Surfing
                </Heading>
                <Text variant="muted" className="leading-relaxed">
                  6 Place des Estagnots
                  <br />
                  40510 Seignosse
                  <br />
                  <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    Privatisation totale du restaurant
                  </span>
                </Text>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
                  <Clock className="w-5 h-5 text-secondary" />
                  <Text className="font-medium">
                    Rendez-vous à 18h00 jusqu&apos;à 01h00
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accès et transport */}
          <Card
            variant="elegant"
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Car className="w-6 h-6 text-secondary" />
                </div>
                Accès & Transport
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-secondary/5 to-primary/5 p-4 rounded-lg border border-secondary/10">
                  <Heading
                    level={6}
                    className="mb-3 font-semibold text-secondary">
                    En voiture
                  </Heading>
                  <Text variant="muted" size="sm" className="leading-relaxed">
                    Autoroute A63, sortie 8 Seignosse.
                    <br />
                    <span className="inline-block mt-2 px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full">
                      Parking gratuit sur place
                    </span>
                  </Text>
                </div>
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-lg border border-primary/10">
                  <Heading
                    level={6}
                    className="mb-3 font-semibold text-primary">
                    Transports en commun
                  </Heading>
                  <Text variant="muted" size="sm" className="leading-relaxed">
                    Gare SNCF la plus proche : Dax (30 min en voiture)
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hébergement */}
          <Card
            variant="elegant"
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Home className="w-6 h-6 text-accent" />
                </div>
                Hébergement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-accent/5 to-primary/5 p-4 rounded-lg border border-accent/10">
                  <Heading level={6} className="mb-3 font-semibold text-accent">
                    Hôtels recommandés
                  </Heading>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <Text variant="muted" size="sm">
                        Villa de l&apos;Étang Blanc (Seignosse)
                      </Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <Text variant="muted" size="sm">
                        Best Western Seignosse Resort
                      </Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <Text variant="muted" size="sm">
                        Diverses locations Airbnb
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-lg border border-primary/10">
                  <Heading
                    level={6}
                    className="mb-3 font-semibold text-primary">
                    Camping
                  </Heading>
                  <Text variant="muted" size="sm" className="leading-relaxed">
                    Plusieurs campings en bord de mer à proximité
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Allergies */}
          <Card
            variant="elegant"
            className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Utensils className="w-6 h-6 text-primary" />
                </div>
                Allergies & Régimes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-lg border border-primary/10 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="w-6 h-6 text-primary" />
                </div>
                <Heading level={6} className="mb-3 font-semibold text-primary">
                  Signalement important
                </Heading>
                <Text variant="muted" size="sm" className="leading-relaxed">
                  Merci de nous signaler vos allergies ou régimes particuliers
                  dans le formulaire RSVP pour que nous puissions adapter le
                  menu.
                </Text>
                <div className="mt-4 inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  Via le formulaire RSVP
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
