"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getMapLinks } from "../lib/utils";
import { useEffect, useMemo, useState } from "react";

interface MapButtonsProps {
  query: string;
}

const detectPlatform = (): "ios" | "android" | "default" => {
  if (typeof navigator === "undefined") return "default";
  const ua = navigator.userAgent;
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && (navigator.maxTouchPoints || 0) > 1);
  if (isIOS) return "ios";
  if (/Android/.test(ua)) return "android";
  return "default";
};

export function MapButtons({ query }: MapButtonsProps) {
  const maps = useMemo(() => getMapLinks(query), [query]);
  const [order, setOrder] = useState<Array<keyof typeof maps>>([
    "google",
    "apple",
    "waze",
    "osm",
  ]);

  useEffect(() => {
    const platform = detectPlatform();
    if (platform === "ios") {
      setOrder(["apple", "google", "waze", "osm"]);
    } else if (platform === "android") {
      setOrder(["google", "waze", "osm", "apple"]);
    }
  }, []);

  const labels: Record<keyof typeof maps, string> = {
    google: "Google Maps",
    apple: "Apple Plans",
    waze: "Waze",
    osm: "OpenStreetMap",
  };

  return (
    <div className="flex flex-wrap gap-2">
      {order.map((key) => (
        <Link
          key={key}
          href={maps[key]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-black border border-black/80 rounded-full px-4 py-2 transition-colors hover:bg-black/5">
          <span className="text-sm font-medium">{labels[key]}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      ))}
    </div>
  );
}
