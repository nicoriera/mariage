"use client";

import React from "react";
import { Heading, Text } from "./ui/Typography";
import type { WeddingHeaderProps } from "../types/wedding";

const WeddingHeader = React.memo<WeddingHeaderProps>(
  ({
    title = "Sandra & Nicolas",
    subtitle = "Nous nous marions",
    date = "15 Juin 2024",
    location = "Château de la Côte Landaise",
    className,
  }) => (
    <div
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        className || ""
      }`}>
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/monica-malave-qMZ8KTvabu4-unsplash.jpg')",
        }}
      />

      {/* Overlay pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Contenu */}
      <div className="relative z-10 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <Text
            size="lg"
            variant="muted"
            className="mb-4 tracking-widest uppercase font-sans text-white/90">
            {subtitle}
          </Text>

          <div className="mb-8">
            <div className="save-the-date mb-4 text-white/80 text-sm tracking-widest">
              save the date
            </div>
            <Heading
              level={1}
              variant="elegant"
              className="font-heading font-semibold text-4xl md:text-6xl text-white mb-6">
              {title}
            </Heading>
          </div>

          <div className="flex md:flex-row flex-col items-center gap-4">
            <div className="inline-block">
              <Text
                size="xl"
                variant="accent"
                className="font-heading font-medium text-white bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                {date}
              </Text>
            </div>

            <div className="inline-block">
              <Text
                size="lg"
                variant="muted"
                className="font-sans text-white/90 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                {location}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
);

WeddingHeader.displayName = "WeddingHeader";

export default WeddingHeader;
