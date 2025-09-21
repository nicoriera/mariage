import type { Track } from "../hooks/useAudioPlayer";

// Playlist de musiques romantiques pour le mariage
export const WEDDING_PLAYLIST: Track[] = [
  {
    id: "fresh",
    title: "Fresh",
    artist: "Daft Punk",
    url: "/music/fresh.mp3",
    duration: 240, // 4 minutes
  },
  {
    id: "amada-mia-amore-mia",
    title: "Amada Mia, Amore Mio",
    artist: "El Pasador",
    url: "/music/amada-mia-amore-mia.mp3",
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
