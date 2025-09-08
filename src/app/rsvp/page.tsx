"use client";

import { useState } from "react";
import Image from "next/image";
import RSVPForm from "../../components/RSVPForm";
import { Modal } from "../../components/ui/Modal";

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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Confirmez votre présence
          </h1>
          <p className="text-lg text-stone-600">
            Nous avons hâte de célébrer avec vous !
          </p>
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
