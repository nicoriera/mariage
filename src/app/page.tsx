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
    <div className="min-h-screen bg-june-hero-lines">
      {/* Header Hero */}
      <WeddingHeader
        variant="hero"
        title="Sandra & Nicolas"
        subtitle="Nous nous marions"
        date="Jeudi 21 Mai 2026"
        location="Seignosse, Restaurant Le Surfing"
      />

      {/* Section Informations */}
      <section className="section-june-large bg-white">
        <div className="container-june">
          <div className="text-center mb-16">
            <Heading level={2} variant="elegant" className="mb-6">
              Bienvenue à notre mariage
            </Heading>
            <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
              Nous sommes ravis de vous inviter à célébrer notre union dans un
              cadre idyllique au cœur de la côte landaise.
            </Text>
          </div>

          <div className="grid-june">
            <Card
              variant="elegant"
              className="hover-june-lift shadow-june-md bg-white border border-june/10">
              <CardHeader>
                <CardTitle>Date & Heure</CardTitle>
                <CardDescription>Cérémonie et réception</CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="accent" size="lg" className="font-medium mb-2">
                  Jeudi 21 Mai 2026
                </Text>
                <Text variant="muted">Rendez vous à 18h00 jusqu’à 01h00</Text>
              </CardContent>
            </Card>

            <Card
              variant="elegant"
              className="hover-june-lift shadow-june-md bg-white border border-june/10">
              <CardHeader>
                <CardTitle>Lieu</CardTitle>
                <CardDescription>Restaurant Le Surfing</CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="accent" size="lg" className="font-medium mb-2">
                  Seignosse, Landes
                </Text>
                <Text variant="muted">
                  6 Place des Estagnots
                  <br />
                  40510 Seignosse
                  <br />
                  France
                </Text>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Citation */}
      <section className="section-june bg-june-blush">
        <div className="container-june">
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
      <section className="section-june bg-june-surface">
        <div className="container-june">
          <div className="text-center mb-12">
            <Heading level={2} variant="default" className="mb-6">
              Préparez votre venue
            </Heading>
            <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
              Confirmez votre présence et découvrez toutes les informations
              pratiques pour passer une journée inoubliable.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/rsvp" className="group">
              <Card
                variant="default"
                className="hover-june-lift hover-june-glow text-center bg-white shadow-june-md">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-june-rose/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-june-rose/50 transition-june border-2 border-june-olive/20">
                    <svg
                      className="w-6 h-6 text-june-olive"
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
              <Card
                variant="default"
                className="hover-june-lift hover-june-glow text-center bg-white shadow-june-md">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-june-mint/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-june-mint/50 transition-june border-2 border-june-olive/20">
                    <svg
                      className="w-6 h-6 text-june-olive"
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
              <Card
                variant="default"
                className="hover-june-lift hover-june-glow text-center bg-white shadow-june-md">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-june-lilac/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-june-lilac/50 transition-june border-2 border-june-olive/20">
                    <svg
                      className="w-6 h-6 text-june-olive"
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
      <footer className="bg-june-primary text-june-primary py-12">
        <div className="container-june text-center">
          <Text variant="muted" className="text-june-primary/80">
            Sandra & Nicolas • 21 Mai 2026
          </Text>
          <div className="mt-4 space-x-4">
            <Badge
              variant="accent"
              className="bg-white/10 text-june-primary border-white/20">
              Restaurant Le Surfing
            </Badge>
            <Badge
              variant="rose"
              className="bg-white/10 text-june-primary border-white/20">
              Seignosse, Landes
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}
