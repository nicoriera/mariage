"use client";

import React, { useState, useEffect } from "react";
import { Heading, Text } from "./ui/Typography";
import type { WeddingHeaderProps } from "../types/wedding";
import { env } from "../lib/env";

const WeddingHeader = React.memo<WeddingHeaderProps>(
  ({
    title = "Sandra & Nicolas",
    subtitle = "Nous nous marions",
    date = "Jeudi 21 Mai 2026",
    location = "Seignosse, Restaurant Le Surfing",
    className,
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [timeLeft, setTimeLeft] = useState<{
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    } | null>(null);
    const [isAfterWedding, setIsAfterWedding] = useState(false);

    const computeTimeLeft = (target: Date) => {
      const now = new Date();
      const diffMs = target.getTime() - now.getTime();
      if (diffMs <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const seconds = Math.floor((diffMs / 1000) % 60);
      return { days, hours, minutes, seconds };
    };

    useEffect(() => {
      // Prévenir le flash en s'assurant que les styles sont chargés
      const timer = setTimeout(() => setIsLoaded(true), 0);
      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      // Initialisation du compteur côté client uniquement
      const targetDate = new Date(`${env.WEDDING_DATE}T00:00:00`);
      const tick = () => {
        const next = computeTimeLeft(targetDate);
        setTimeLeft(next);
        setIsAfterWedding(new Date().getTime() >= targetDate.getTime());
      };

      tick();
      const intervalId = setInterval(tick, 1000);
      return () => clearInterval(intervalId);
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
              <div className="mb-4 text-white/80 text-5xl sm:text-6xl leading-none tracking-wider font-script">
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

            {/* Compteur jusqu'au jour J */}
            <div className="mt-10">
              <div
                aria-live="polite"
                className="inline-flex items-stretch gap-3 bg-white/10 backdrop-blur-sm rounded-2xl p-3">
                {isAfterWedding ? (
                  <div className="px-4 py-2">
                    <Text
                      size="lg"
                      variant="accent"
                      className="font-heading text-white">
                      C&apos;est le grand jour !
                    </Text>
                  </div>
                ) : timeLeft ? (
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { label: "Jours", value: timeLeft.days },
                      { label: "Heures", value: timeLeft.hours },
                      { label: "Minutes", value: timeLeft.minutes },
                      { label: "Secondes", value: timeLeft.seconds },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex flex-col items-center justify-center min-w-20 rounded-xl bg-black/30 px-4 py-3">
                        <div className="text-3xl sm:text-4xl font-bold text-white font-heading">
                          {item.value.toString().padStart(2, "0")}
                        </div>
                        <div className="text-white/80 text-xs sm:text-sm tracking-wide uppercase">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
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
