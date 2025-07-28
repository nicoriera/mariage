"use client";

import RSVPForm from "../../components/RSVPForm";

export default function RSVPPage() {
  const handleSubmitSuccess = () => {
    // Callback après soumission RSVP réussie
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
    </div>
  );
}