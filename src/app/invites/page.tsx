import GuestList from "../../components/GuestList";

export default function InvitesPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 pb-20 md:pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">
            Nos invités
          </h1>
          <p className="text-lg text-stone-600">
            Découvrez qui sera présent pour notre grand jour
          </p>
        </div>
        
        <GuestList />
      </div>
    </div>
  );
}