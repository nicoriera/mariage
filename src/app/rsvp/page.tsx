"use client";

import { useState } from "react";
import Image from "next/image";
import RSVPForm from "../../components/RSVPForm";
import { Modal } from "../../components/ui/Modal";
import { Heading, Text } from "../../components/ui/Typography";
import { CheckCircle } from "lucide-react";

export default function RSVPPage() {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmitSuccess = () => {
    // Afficher le popup de succès
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

        <RSVPForm onSubmitSuccess={handleSubmitSuccess} />
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
