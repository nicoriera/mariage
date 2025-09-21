"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/Card";
import { Camera, ArrowRight } from "lucide-react";
import { env } from "../lib/env";

const GalleryLinkCard: React.FC = () => {
  const [isAfterWedding, setIsAfterWedding] = React.useState<boolean | null>(
    null
  );

  React.useEffect(() => {
    setIsAfterWedding(new Date() >= new Date(`${env.WEDDING_DATE}T00:00:00`));
  }, []);

  if (!isAfterWedding) return null;

  return (
    <Link href="/galerie" className="group">
      <Card
        variant="elegant"
        className="transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] text-center bg-white border border-black/80 hover:shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
        <CardContent className="p-8">
          <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <Camera className="w-6 h-6" />
          </div>
          <CardTitle className="mb-2">Galerie</CardTitle>
          <CardDescription>Photos et souvenirs</CardDescription>
          <div className="mt-6 inline-flex items-center gap-2 text-black border border-black/80 rounded-full px-4 py-2 transition-colors group-hover:bg-black/5">
            <span className="text-sm font-medium">Ouvrir</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default GalleryLinkCard;
