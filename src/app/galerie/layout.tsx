import { env } from "../../lib/env";
import { Heading, Text } from "../../components/ui/Typography";
import { Camera } from "lucide-react";

function isNowWeddingDayParis(dateString: string): boolean {
  const targetDate = dateString.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(targetDate)) return false;

  const timeZone = "Europe/Paris";
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const partsToIso = (date: Date) => {
    const parts = formatter.formatToParts(date);
    const get = (t: string) => parts.find((p) => p.type === t)?.value || "";
    return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get(
      "minute"
    )}:${get("second")}`;
  };

  // Construire des bornes jour J (00:00:00 -> 23:59:59) en heure de Paris
  const nowIsoParis = partsToIso(new Date());
  const startIsoParis = `${targetDate}T00:00:00`;
  const endIsoParis = `${targetDate}T23:59:59`;

  const now = new Date(nowIsoParis);
  const start = new Date(startIsoParis);
  const end = new Date(endIsoParis);

  return now >= start && now <= end;
}

export default function GalerieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isWeddingDay = isNowWeddingDayParis(env.WEDDING_DATE);

  if (!isWeddingDay) {
    const weddingDateLocalFr = new Date(
      `${env.WEDDING_DATE}T00:00:00`
    ).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Europe/Paris",
    });

    return (
      <div className="min-h-screen bg-white py-16 px-4 pb-20 md:pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full mb-6">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <Heading level={2} variant="elegant" className="mb-4">
            Accès à la galerie réservé au jour du mariage ✨
          </Heading>
          <Text size="lg" variant="muted" className="max-w-2xl mx-auto">
            La galerie n&apos;est disponible que le {weddingDateLocalFr}.
            Revenez le jour J pour partager et découvrir les photos 💖
          </Text>
        </div>
      </div>
    );
  }

  return children;
}
