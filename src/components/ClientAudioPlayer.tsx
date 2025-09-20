"use client";

import dynamic from "next/dynamic";

const AudioPlayer = dynamic(
  () => import("./AudioPlayer").then((m) => m.AudioPlayer),
  { ssr: false, loading: () => null }
);

export const ClientAudioPlayer = () => {
  return <AudioPlayer />;
};


