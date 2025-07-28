import WeddingHeader from "../components/WeddingHeader";
import Link from "next/link";
import { Button } from "../components/ui/Button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      {/* En-tête principal */}
      <WeddingHeader
        brideName="Sandra"
        groomName="Nicolas"
        weddingDate="Jeudi 21 Mai 2026"
        location="Seignosse"
        venue="Restaurant Le Surfing"
      />

      {/* Actions principales */}
      <div className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
            <Link href="/rsvp">
              <Button
                variant="primary"
                size="lg"
                className="w-full h-16 text-base font-medium">
                Confirmer ma présence
              </Button>
            </Link>

            <Link href="/galerie">
              <Button
                variant="outline"
                size="lg"
                className="w-full h-16 text-base font-medium">
                Voir la galerie
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer simple */}
      <footer className="py-12 border-t border-stone-200">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="space-y-2">
            <p className="text-sm text-stone-500">Sandra & Nicolas</p>
            <p className="text-sm text-stone-400">21 Mai 2026 • Seignosse</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
