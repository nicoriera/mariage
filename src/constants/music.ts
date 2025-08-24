import type { Track } from "../hooks/useAudioPlayer";

// Playlist de musiques romantiques pour le mariage
export const WEDDING_PLAYLIST: Track[] = [
  {
    id: "canon-in-d",
    title: "Canon in D",
    artist: "Johann Pachelbel",
    url: "/music/canon-in-d.mp3",
    duration: 240, // 4 minutes
  },
  {
    id: "claire-de-lune",
    title: "Clair de Lune",
    artist: "Claude Debussy",
    url: "/music/claire-de-lune.mp3",
    duration: 300, // 5 minutes
  },
  {
    id: "mariage-damour",
    title: "Mariage d'Amour",
    artist: "Paul de Senneville",
    url: "/music/mariage-damour.mp3",
    duration: 180, // 3 minutes
  },
  {
    id: "river-flows-in-you",
    title: "River Flows in You",
    artist: "Yiruma",
    url: "/music/river-flows-in-you.mp3",
    duration: 210, // 3.5 minutes
  },
  {
    id: "comptine-dun-autre-ete",
    title: "Comptine d'un autre été",
    artist: "Yann Tiersen",
    url: "/music/comptine-dun-autre-ete.mp3",
    duration: 150, // 2.5 minutes
  },
  {
    id: "nuvole-bianche",
    title: "Nuvole Bianche",
    artist: "Ludovico Einaudi",
    url: "/music/nuvole-bianche.mp3",
    duration: 270, // 4.5 minutes
  },
  {
    id: "la-vie-en-rose",
    title: "La Vie en Rose",
    artist: "Édith Piaf",
    url: "/music/la-vie-en-rose.mp3",
    duration: 195, // 3.25 minutes
  },
  {
    id: "ne-me-quitte-pas",
    title: "Ne me quitte pas",
    artist: "Jacques Brel",
    url: "/music/ne-me-quitte-pas.mp3",
    duration: 240, // 4 minutes
  },
];

// Configuration par défaut du lecteur
export const AUDIO_PLAYER_CONFIG = {
  defaultVolume: 0.5,
  autoPlay: false, // Désactivé par défaut pour respecter les préférences utilisateur
  fadeInDuration: 2000, // 2 secondes de fade-in
  crossfadeDuration: 1000, // 1 seconde de crossfade entre pistes
};

// Messages d'erreur localisés
export const AUDIO_ERROR_MESSAGES = {
  autoplayBlocked:
    "Lecture automatique bloquée par le navigateur. Cliquez sur play pour commencer.",
  fileNotFound: "Fichier audio introuvable",
  playbackError: "Erreur de lecture audio",
  networkError: "Erreur de réseau lors du chargement audio",
};
