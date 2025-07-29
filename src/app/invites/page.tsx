import GuestList from "../../components/GuestList";
import { Heading, Text } from "../../components/ui/Typography";

export default function InvitesPage() {
  return (
    <div className="min-h-screen bg-white py-16 px-4 pb-20 md:pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Heading level={1} variant="elegant" className="mb-4 text-[#2a2a2a]">
            Nos invités
          </Heading>
          <Text size="lg" variant="muted" className="text-[#5a5a5a]">
            Découvrez qui sera présent pour notre grand jour
          </Text>
        </div>

        <GuestList />
      </div>
    </div>
  );
}
