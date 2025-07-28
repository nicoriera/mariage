"use client";

import React from "react";
import { Heading, Text } from "./ui/Typography";

interface WeddingHeaderProps {
  title?: string;
  subtitle?: string;
  date?: string;
  location?: string;
  variant?: "hero" | "simple" | "elegant";
}

const WeddingHeader: React.FC<WeddingHeaderProps> = ({
  title = "Sandra & Nicolas",
  subtitle = "Nous nous marions",
  date = "15 Juin 2024",
  location = "Château de la Côte Landaise",
  variant = "hero",
}) => {
  const variants = {
    hero: (
      <div className="relative min-h-screen flex items-center justify-center bg-sezane-cream overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 pattern-sezane-dots opacity-5" />

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <div className="max-w-4xl mx-auto">
            <Text
              size="lg"
              variant="muted"
              className="mb-4 tracking-widest uppercase">
              {subtitle}
            </Text>

            <Heading level={1} variant="elegant" className="mb-8 leading-tight">
              {title}
            </Heading>

            <div className="space-y-4">
              <Text size="xl" variant="accent" className="font-medium">
                {date}
              </Text>

              <Text size="lg" variant="muted">
                {location}
              </Text>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-1 h-16 bg-sezane-accent mx-auto" />
        </div>
      </div>
    ),

    simple: (
      <div className="bg-sezane-surface py-16">
        <div className="container-sezane text-center">
          <Heading level={2} variant="elegant" className="mb-4">
            {title}
          </Heading>

          <Text size="lg" variant="muted" className="mb-6">
            {subtitle}
          </Text>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-12">
            <div className="text-center">
              <Text variant="accent" className="font-medium">
                {date}
              </Text>
            </div>

            <div className="hidden sm:block w-px h-8 bg-sezane" />

            <div className="text-center">
              <Text variant="muted">{location}</Text>
            </div>
          </div>
        </div>
      </div>
    ),

    elegant: (
      <div className="bg-white py-20">
        <div className="container-sezane">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <Text
                size="sm"
                variant="muted"
                className="tracking-widest uppercase mb-4">
                {subtitle}
              </Text>

              <Heading level={1} variant="default" className="mb-6">
                {title}
              </Heading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center p-6 bg-sezane-surface rounded-lg">
                <Text variant="accent" size="lg" className="font-medium mb-2">
                  Date
                </Text>
                <Text variant="muted">{date}</Text>
              </div>

              <div className="text-center p-6 bg-sezane-surface rounded-lg">
                <Text variant="accent" size="lg" className="font-medium mb-2">
                  Lieu
                </Text>
                <Text variant="muted">{location}</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return variants[variant];
};

export default WeddingHeader;
