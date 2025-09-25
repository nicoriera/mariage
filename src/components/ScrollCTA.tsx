"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { Text } from "./ui/Typography";

export default function ScrollCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculer le pourcentage de scroll
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      // Afficher le CTA quand l'utilisateur a scrollé 50% de la page
      if (scrollPercent > 30 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div
      className="fixed bottom-2 left-2 right-2 sm:bottom-6 sm:left-6 sm:right-auto z-50 animate-in fade-in slide-in-from-bottom-2 duration-700"
      data-scroll-cta>
      <div className="bg-white/95 backdrop-blur-sm rounded-xl px-6 py-4 shadow-xl border border-black/10 w-full sm:max-w-md">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Text size="base" className="font-medium text-gray-900">
              Confirmez votre présence
            </Text>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/rsvp"
              className="inline-flex items-center gap-2 bg-black text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-black/90 transition-colors">
              Répondre
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
              aria-label="Fermer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
