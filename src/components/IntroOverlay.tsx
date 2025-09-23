"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "./ui/Button";
import { Text } from "./ui/Typography";

export default function IntroOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    try {
      const seen =
        typeof window !== "undefined" &&
        window.sessionStorage.getItem("introSeen");
      if (!seen) {
        setIsVisible(true);
      }
    } catch {}
  }, []);

  const enterSite = useCallback(() => {
    try {
      window.sessionStorage.setItem("introSeen", "1");
    } catch {}

    // Déclenchement synchrone dans le même geste utilisateur
    try {
      const event = new CustomEvent("wedding-unlock-audio");
      window.dispatchEvent(event);
    } catch {}

    // Transition de sortie
    setIsHiding(true);
    setTimeout(() => setIsVisible(false), 400);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-[#f7f5f3] bg-cover bg-center transition-opacity duration-300 ${
        isHiding ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        backgroundImage:
          "url('/images/monica-malave-qMZ8KTvabu4-unsplash.jpg')",
      }}>
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div className="mb-4 text-white/90 text-sm tracking-widest uppercase font-sans">
          Invitation{" "}
        </div>
        <div className="mb-3 text-white/90 text-5xl sm:text-6xl leading-none tracking-wider font-script">
          save the date
        </div>
        <Text size="xl" className="font-heading text-white mb-6">
          Sandra & Nicolas se marient
        </Text>

        <Button
          variant="primary"
          onClick={enterSite}
          className="px-6 py-3 rounded-full bg-white/90 text-stone-900 hover:bg-white shadow-lg border border-white/70"
          aria-label="Entrer sur le site et lancer la musique">
          Entrer
        </Button>
      </div>
    </div>
  );
}
