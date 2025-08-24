import { MapPin, Clock, Car, Home, Utensils, Camera } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import { Heading, Text } from "../../components/ui/Typography";

export default function InfosPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 pb-20 md:pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Informations pratiques
          </h1>
          <p className="text-lg text-stone-600">
            Tout ce qu&apos;il faut savoir pour notre mariage
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Lieu et horaires */}
          <Card variant="elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-accent" />
                Lieu & Horaires
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Heading level={5} className="text-primary mb-2">
                  Restaurant Le Surfing
                </Heading>
                <Text variant="muted">
                  6 Place des Estagnots
                  <br />
                  40510 Seignosse
                  <br />
                  <strong>Privatisation totale du restaurant</strong>
                </Text>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-secondary" />
                  <Text>
                    <strong>18h00 :</strong> Accueil des invités (Apéritif)
                  </Text>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-secondary" />
                  <Text>
                    <strong>20h00-22h00 :</strong> Dîner assis
                  </Text>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-secondary" />
                  <Text>
                    <strong>22h00-01h00 :</strong> Soirée dansante
                  </Text>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-secondary" />
                  <Text>
                    <strong>01h00 :</strong> Départ des invités
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accès et transport */}
          <Card variant="elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Car className="w-6 h-6 text-accent" />
                Accès & Transport
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Heading level={6} className="mb-2">
                  En voiture
                </Heading>
                <Text variant="muted" size="sm">
                  Autoroute A63, sortie 8 Seignosse.
                  <br />
                  Parking gratuit sur place.
                </Text>
              </div>
              <div>
                <Heading level={6} className="mb-2">
                  Transports en commun
                </Heading>
                <Text variant="muted" size="sm">
                  Gare SNCF la plus proche : Dax (30 min en voiture)
                </Text>
              </div>
            </CardContent>
          </Card>

          {/* Hébergement */}
          <Card variant="elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Home className="w-6 h-6 text-accent" />
                Hébergement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Heading level={6} className="mb-2">
                  Hôtels recommandés
                </Heading>
                <Text variant="muted" size="sm">
                  - Villa de l&apos;Étang Blanc (Seignosse)
                  <br />
                  - Best Western Seignosse Resort
                  <br />- Diverses locations Airbnb
                </Text>
              </div>
              <div>
                <Heading level={6} className="mb-2">
                  Camping
                </Heading>
                <Text variant="muted" size="sm">
                  Plusieurs campings en bord de mer à proximité
                </Text>
              </div>
            </CardContent>
          </Card>

          {/* Dress code */}
          <Card variant="elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Camera className="w-6 h-6 text-accent" />
                Tenue vestimentaire
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Heading level={6} className="mb-2">
                  L&apos;essentiel : soyez à l&apos;aise !
                </Heading>
                <Text variant="muted" size="sm">
                  Venez comme vous vous sentez bien, dans l&apos;esprit
                  décontracté du bord de mer.
                  <br />
                  Évitez simplement les talons hauts (terrasse en bois) et le
                  blanc total.
                </Text>
              </div>
              <div>
                <Heading level={6} className="mb-2">
                  Quelques idées
                </Heading>
                <Text variant="muted" size="sm">
                  Robe d&apos;été, chemise lin, pantalon léger, sandales
                  plates...
                  <br />
                  L&apos;important c&apos;est que vous vous sentiez vous-mêmes !
                </Text>
              </div>
            </CardContent>
          </Card>

          {/* Menu */}
          <Card variant="elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Utensils className="w-6 h-6 text-accent" />
                Menu & Allergies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Heading level={6} className="mb-2">
                  Spécialités
                </Heading>
                <Text variant="muted" size="sm">
                  Cuisine créative et de saison par le Chef Zac.
                  <br />
                  Produits locaux et spécialités du Sud-Ouest.
                  <br />
                  Menu surprise le jour J !
                </Text>
              </div>
              <div>
                <Heading level={6} className="mb-2">
                  Régimes spéciaux
                </Heading>
                <Text variant="muted" size="sm">
                  Merci de nous signaler vos allergies ou régimes particuliers
                  dans le formulaire RSVP.
                </Text>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card variant="elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-accent" />
                Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Heading level={6} className="mb-2">
                  Questions ?
                </Heading>
                <Text variant="muted" size="sm">
                  N&apos;hésitez pas à nous contacter pour toute question !
                </Text>
              </div>
              <div>
                <Text variant="accent" size="sm">
                  📧 sandra.nicolas.mariage@gmail.com
                  <br />
                  📱 06 XX XX XX XX
                </Text>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
