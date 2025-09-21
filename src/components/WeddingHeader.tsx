"use client";

import React, { useState, useEffect } from "react";
import { Heading, Text } from "./ui/Typography";
import type { WeddingHeaderProps } from "../types/wedding";

const WeddingHeader = React.memo<WeddingHeaderProps>(
  ({
    title = "Sandra & Nicolas",
    subtitle = "Nous nous marions",
    date = "Jeudi 21 Mai 2026",
    location = "Seignosse, Restaurant Le Surfing",
    className,
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      // Prévenir le flash en s'assurant que les styles sont chargés
      const timer = setTimeout(() => setIsLoaded(true), 0);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div
        className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
          className || ""
        }`}
        style={{
          // Styles critiques pour éviter le flash
          backgroundColor: isLoaded ? undefined : "#f7f5f3",
          backgroundImage: isLoaded
            ? undefined
            : "url('/images/monica-malave-qMZ8KTvabu4-unsplash.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
        {/* Image de fond */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage:
              "url('/images/monica-malave-qMZ8KTvabu4-unsplash.jpg')",
          }}
        />

        {/* Overlay pour améliorer la lisibilité */}
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Contenu */}
        <div
          className={`relative z-10 text-center px-4 transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}>
          <div className="max-w-4xl mx-auto">
            <Text
              size="lg"
              variant="muted"
              className="mb-4 tracking-widest uppercase font-sans text-white/90">
              {subtitle}
            </Text>

            <div className="mb-8">
              <div className="mb-4 text-white/80 text-5xl sm:text-6xl leading-none tracking-wider font-[var(--font-script)]">
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
    );
  }
);

WeddingHeader.displayName = "WeddingHeader";

export default WeddingHeader;
