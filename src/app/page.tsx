import React from "react";
import WeddingHeader from "../components/WeddingHeader";
import { Button } from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Heading, Text, Quote, Badge } from "../components/ui/Typography";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-sezane-cream">
      {/* Header Hero */}
      <WeddingHeader
        variant="hero"
        title="Sandra & Nicolas"
        subtitle="Nous nous marions"
        date="Jeudi 21 Mai 2026"
        location="Seignosse, Restaurant Le Surfing"
      />

      {/* Section Informations */}
      <section className="section-sezane-large bg-white">
        <div className="container-sezane">
          <div className="text-center mb-16">
            <Heading level={2} variant="elegant" className="mb-6">
              Bienvenue à notre mariage
            </Heading>
            <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
              Nous sommes ravis de vous inviter à célébrer notre union dans un
              cadre idyllique au cœur de la côte landaise.
            </Text>
          </div>

          <div className="grid-sezane">
            <Card variant="elegant" className="hover-sezane-lift">
              <CardHeader>
                <CardTitle>Date & Heure</CardTitle>
                <CardDescription>Cérémonie et réception</CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="accent" size="lg" className="font-medium mb-2">
                  Jeudi 21 Mai 2026
                </Text>
                <Text variant="muted">
                  Cérémonie à 15h00
                  <br />
                  Cocktail à 16h30
                  <br />
                  Dîner à 19h30
                </Text>
              </CardContent>
            </Card>

            <Card variant="elegant" className="hover-sezane-lift">
              <CardHeader>
                <CardTitle>Lieu</CardTitle>
                <CardDescription>Restaurant Le Surfing</CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="accent" size="lg" className="font-medium mb-2">
                  Seignosse, Landes
                </Text>
                <Text variant="muted">
                  Restaurant Le Surfing
                  <br />
                  40510 Seignosse
                  <br />
                  France
                </Text>
              </CardContent>
            </Card>

            <Card variant="elegant" className="hover-sezane-lift">
              <CardHeader>
                <CardTitle>Code vestimentaire</CardTitle>
                <CardDescription>Tenue de cérémonie</CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="accent" size="lg" className="font-medium mb-2">
                  Chic décontracté
                </Text>
                <Text variant="muted">
                  Robe longue ou cocktail pour les femmes
                  <br />
                  Costume ou blazer pour les hommes
                </Text>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Citation */}
      <section className="section-sezane bg-sezane-surface">
        <div className="container-sezane">
          <div className="max-w-4xl mx-auto">
            <Quote variant="elegant" author="Sandra & Nicolas">
              L&apos;amour est la poésie des sens. Il y a des moments dans la
              vie où le cœur est si plein d&apos;émotions que si on ne les
              partageait pas, le cœur éclaterait.
            </Quote>
          </div>
        </div>
      </section>

      {/* Section Actions */}
      <section className="section-sezane bg-white">
        <div className="container-sezane">
          <div className="text-center mb-12">
            <Heading level={2} variant="default" className="mb-6">
              Préparez votre venue
            </Heading>
            <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
              Confirmez votre présence et découvrez toutes les informations
              pratiques pour passer une journée inoubliable.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/rsvp" className="group">
              <Card variant="default" className="hover-sezane-lift text-center">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-sezane-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sezane-accent/20 transition-all duration-200">
                    <svg
                      className="w-6 h-6 text-sezane-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <CardTitle className="mb-2">Confirmer</CardTitle>
                  <CardDescription>Répondez à notre invitation</CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link href="/infos" className="group">
              <Card variant="default" className="hover-sezane-lift text-center">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-sezane-rose/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sezane-rose/20 transition-all duration-200">
                    <svg
                      className="w-6 h-6 text-sezane-rose"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <CardTitle className="mb-2">Informations</CardTitle>
                  <CardDescription>
                    Programme et détails pratiques
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link href="/galerie" className="group">
              <Card variant="default" className="hover-sezane-lift text-center">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-sezane-sage/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sezane-sage/20 transition-all duration-200">
                    <svg
                      className="w-6 h-6 text-sezane-sage"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <CardTitle className="mb-2">Galerie</CardTitle>
                  <CardDescription>Photos et souvenirs</CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link href="/invites" className="group">
              <Card variant="default" className="hover-sezane-lift text-center">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-sezane-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sezane-accent/20 transition-all duration-200">
                    <svg
                      className="w-6 h-6 text-sezane-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <CardTitle className="mb-2">Invités</CardTitle>
                  <CardDescription>Liste des convives</CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link href="/rsvp">
              <Button variant="primary" size="lg">
                Confirmer ma présence
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sezane-primary text-white py-12">
        <div className="container-sezane text-center">
          <Text variant="muted" className="text-white/80">
            Sandra & Nicolas • 21 Mai 2026
          </Text>
          <div className="mt-4 space-x-4">
            <Badge
              variant="accent"
              className="bg-white/10 text-white border-white/20">
              Restaurant Le Surfing
            </Badge>
            <Badge
              variant="rose"
              className="bg-white/10 text-white border-white/20">
              Seignosse, Landes
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}
