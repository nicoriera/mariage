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
import { Heading, Text, Quote } from "../components/ui/Typography";
import Link from "next/link";
import GalleryLinkCard from "../components/GalleryLinkCard";
import { CheckCircle, MapPin, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen ">
      {/* Header Hero */}
      <WeddingHeader
        title="Sandra & Nicolas"
        subtitle="Nous nous marions"
        date="Jeudi 21 Mai 2026"
        location="Seignosse, Restaurant Le Surfing"
      />

      {/* Section Informations */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[84rem] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <Heading level={2} variant="elegant" className="mb-6">
              Bienvenue à notre mariage
            </Heading>
            <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
              Nous sommes ravis de vous inviter à célébrer notre union dans un
              cadre idyllique au cœur de la côte landaise.
            </Text>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
            <Card
              variant="elegant"
              className="transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] bg-white border border-black/80 hover:shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
              <CardHeader>
                <CardTitle>Cérémonie</CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="accent" size="lg" className="font-medium mb-2">
                  Jeudi 21 Mai 2026 (heure à définir)
                </Text>
                <Text variant="muted">A la mairie d&apos;Hendaye</Text>
              </CardContent>
            </Card>

            <Card
              variant="elegant"
              className="transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] bg-white border border-black/80 hover:shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
              <CardHeader>
                <CardTitle>Fiesta</CardTitle>
                <CardDescription>Restaurant Le Surfing</CardDescription>
              </CardHeader>
              <CardContent>
                <Text variant="accent" size="lg" className="font-medium mb-2">
                  Rendez vous à 18h00 jusqu’à 01h00
                </Text>
                <Text variant="muted" className="font-medium ">
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
      <section className="py-16 lg:py-20 bg-june-blush">
        <div className="max-w-[84rem] mx-auto px-5 sm:px-8 lg:px-10">
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
      <section className="py-16 lg:py-20 bg-june-surface">
        <div className="max-w-[84rem] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-12">
            <Heading level={2} variant="default" className="mb-6">
              Préparez votre venue
            </Heading>
            <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
              Confirmez votre présence et découvrez toutes les informations
              pratiques pour passer une journée inoubliable.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <Link href="/rsvp" className="group">
              <Card
                variant="elegant"
                className="transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] text-center bg-white border border-black/80 hover:shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
                <CardContent className="p-8">
                  <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 " />
                  </div>
                  <CardTitle className="mb-2">Confirmer</CardTitle>
                  <CardDescription>Répondez à notre invitation</CardDescription>
                  <div className="mt-6 inline-flex items-center gap-2 text-black border border-black/80 rounded-full px-4 py-2 transition-colors group-hover:bg-black/5">
                    <span className="text-sm font-medium">Ouvrir</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/infos" className="group">
              <Card
                variant="elegant"
                className="transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] text-center bg-white border border-black/80 hover:shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
                <CardContent className="p-8">
                  <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-6 h-6 " />
                  </div>
                  <CardTitle className="mb-2">Informations</CardTitle>
                  <CardDescription>
                    Programme et détails pratiques
                  </CardDescription>
                  <div className="mt-6 inline-flex items-center gap-2 text-black border border-black/80 rounded-full px-4 py-2 transition-colors group-hover:bg-black/5">
                    <span className="text-sm font-medium">Ouvrir</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <GalleryLinkCard />
          </div>

          <div className="text-center mt-12">
            <Link href="/rsvp">
              <Button
                variant="primary"
                size="lg"
                className="rounded-full px-10">
                Confirmer ma présence
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}
