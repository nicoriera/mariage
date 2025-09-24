"use client";

import { useState } from "react";
import Image from "next/image";
import ConfirmationForm from "../../components/RSVPForm";
import { Modal } from "../../components/ui/Modal";
import { Heading, Text } from "../../components/ui/Typography";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Guest } from "../../../lib/supabase";

export default function RSVPPage() {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestThursday, setGuestThursday] = useState<boolean | null>(null);
  const handleSubmitSuccess = (guest: Guest) => {
    // Afficher le popup de succès
    setGuestName(guest?.name ?? "");
    setGuestThursday(guest?.thursday ?? null);
    setHasSubmitted(true);
    setShowSuccessPopup(true);
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 pb-20 md:pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full mb-6">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <Heading level={2} variant="elegant" className="mb-6">
            Confirmez votre présence
          </Heading>
          <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
            Nous avons hâte de célébrer avec vous !
          </Text>
        </div>

        {hasSubmitted ? (
          <div className="text-center border border-black/80 rounded-lg bg-white p-8">
            <Heading level={3} variant="elegant" className="mb-3">
              {guestName ? `Merci, ${guestName} !` : "Merci !"}
            </Heading>
            <Text size="lg" variant="muted" className="max-w-xl mx-auto">
              {guestThursday === true
                ? "C’est noté, et cela nous fait très plaisir. Nous avons hâte de célébrer avec vous !"
                : "C’est noté, merci de nous l’avoir indiqué. Vous serez avec nous par la pensée."}
            </Text>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setHasSubmitted(false)}
                className="inline-flex items-center gap-2 text-sm font-medium border border-black/80 rounded-full px-4 py-2 transition-colors hover:bg-black/5">
                {guestThursday === true
                  ? "Modifier ma réponse"
                  : "Mettre à jour ma réponse"}
              </button>
            </div>
            <div className="mt-4">
              <Link
                href="/infos"
                className="inline-flex items-center gap-2 text-sm font-medium border border-black/80 rounded-full px-4 py-2 transition-colors hover:bg-black/5">
                <span>Voir les informations pratiques</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <ConfirmationForm onSubmitSuccess={handleSubmitSuccess} />
        )}
      </div>

      {/* Popup de succès */}
      <Modal isOpen={showSuccessPopup} onClose={closeSuccessPopup}>
        <div className="text-center max-w-sm">
          <div className="text-center">
            <Image
              src="/images/bisous.png"
              alt="Bisous de nous"
              width={300}
              height={200}
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
