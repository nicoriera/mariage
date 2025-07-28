"use client";

import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Heading, Text } from "./ui/Typography";

export interface WeddingHeaderProps {
  brideName?: string;
  groomName?: string;
  weddingDate?: string;
  location?: string;
  venue?: string;
}

export default function WeddingHeader({
  brideName = "Sandra",
  groomName = "Nicolas",
  weddingDate = "Jeudi 21 Mai 2026",
  location = "Seignosse",
  venue = "Restaurant Le Surfing",
}: WeddingHeaderProps) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="relative bg-white min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo du couple */}
          <div className="order-2 md:order-1">
            <div className="aspect-square bg-stone-100 rounded-2xl overflow-hidden shadow-lg relative">
              {!imageError ? (
                <Image
                  src="/images/couple-photo.jpg"
                  alt="Sandra et Nicolas"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-400">
                  <div className="text-center">
                    <Heart className="w-16 h-16 mx-auto mb-4 text-stone-300" />
                    <Text size="sm" variant="muted">
                      Photo du couple
                    </Text>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Informations */}
          <div className="order-1 md:order-2 text-center md:text-left">
            {/* Noms des mariés */}
            <div className="mb-8">
              <Heading
                level={1}
                variant="elegant"
                className="mb-4 text-stone-800 text-4xl md:text-5xl">
                {brideName} & {groomName}
              </Heading>
              <Text
                size="lg"
                variant="muted"
                className="font-light text-stone-500">
                se marient
              </Text>
            </div>

            {/* Informations essentielles */}
            <div className="space-y-4 mb-8">
              <div>
                <Text className="text-stone-700 font-medium text-xl">
                  {weddingDate}
                </Text>
              </div>

              <div>
                <Text className="text-stone-600 text-lg">{venue}</Text>
                <Text className="text-stone-500">{location}</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
