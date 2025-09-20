"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/Card";
import { Camera } from "lucide-react";
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
        className="hover-june-lift hover-june-glow text-center bg-white shadow-june-md">
        <CardContent className="p-8">
          <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <Camera className="w-6 h-6" />
          </div>
          <CardTitle className="mb-2">Galerie</CardTitle>
          <CardDescription>Photos et souvenirs</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default GalleryLinkCard;
