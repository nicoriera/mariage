import { useState, useEffect, useRef, useCallback } from "react";

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: number;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
  currentTrackIndex: number;
  volume: number;
  isMuted: boolean;
  progress: number;
  duration: number;
}

export function useAudioPlayer(playlist: Track[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTrack: null,
    currentTrackIndex: 0,
    volume: 0.5,
    isMuted: false,
    progress: 0,
    duration: 0,
  });

  // Initialiser le lecteur audio
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio();
      audioRef.current.volume = state.volume;

      // Événements audio
      const audio = audioRef.current;

      const handleLoadedMetadata = () => {
        setState((prev) => ({ ...prev, duration: audio.duration }));
      };

      const handleTimeUpdate = () => {
        setState((prev) => ({ ...prev, progress: audio.currentTime }));
      };

      const handleEnded = () => {
        // Utiliser une fonction locale pour éviter la dépendance
        const nextIndex = (state.currentTrackIndex + 1) % playlist.length;
        if (playlist[nextIndex]) {
          audio.src = playlist[nextIndex].url;
          audio.load();
          setState((prev) => ({
            ...prev,
            currentTrack: playlist[nextIndex],
            currentTrackIndex: nextIndex,
            progress: 0,
            duration: 0,
          }));
        }
      };

      const handleError = () => {
        console.error("Erreur de lecture audio");
        setState((prev) => ({ ...prev, isPlaying: false }));
      };

      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("error", handleError);

      return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("error", handleError);
        audio.pause();
      };
    }
  }, [state.volume, state.currentTrackIndex, playlist]);

  // Charger la première piste
  useEffect(() => {
    if (playlist.length > 0 && audioRef.current) {
      const track = playlist[0];
      audioRef.current.src = track.url;
      audioRef.current.load();
      setState((prev) => ({
        ...prev,
        currentTrack: track,
        currentTrackIndex: 0,
        progress: 0,
        duration: 0,
      }));
    }
  }, [playlist]);

  const play = useCallback(async () => {
    if (audioRef.current && state.currentTrack) {
      try {
        await audioRef.current.play();
        setState((prev) => ({ ...prev, isPlaying: true }));
      } catch (error) {
        console.error("Impossible de lire la musique:", error);
        // Fallback: essayer de lire sans son
        audioRef.current.muted = true;
        try {
          await audioRef.current.play();
          setState((prev) => ({ ...prev, isPlaying: true, isMuted: true }));
        } catch (fallbackError) {
          console.error("Échec du fallback:", fallbackError);
        }
      }
    }
  }, [state.currentTrack]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setState((prev) => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const playNext = useCallback(() => {
    const nextIndex = (state.currentTrackIndex + 1) % playlist.length;
    if (playlist[nextIndex] && audioRef.current) {
      const track = playlist[nextIndex];
      audioRef.current.src = track.url;
      audioRef.current.load();
      setState((prev) => ({
        ...prev,
        currentTrack: track,
        currentTrackIndex: nextIndex,
        progress: 0,
        duration: 0,
      }));
      if (state.isPlaying) {
        setTimeout(() => play(), 100);
      }
    }
  }, [state.currentTrackIndex, state.isPlaying, playlist.length, play]);

  const playPrevious = useCallback(() => {
    const prevIndex =
      state.currentTrackIndex > 0
        ? state.currentTrackIndex - 1
        : playlist.length - 1;
    if (playlist[prevIndex] && audioRef.current) {
      const track = playlist[prevIndex];
      audioRef.current.src = track.url;
      audioRef.current.load();
      setState((prev) => ({
        ...prev,
        currentTrack: track,
        currentTrackIndex: prevIndex,
        progress: 0,
        duration: 0,
      }));
      if (state.isPlaying) {
        setTimeout(() => play(), 100);
      }
    }
  }, [state.currentTrackIndex, playlist.length, play]);

  const setVolume = useCallback((volume: number) => {
    if (audioRef.current) {
      const clampedVolume = Math.max(0, Math.min(1, volume));
      audioRef.current.volume = clampedVolume;
      setState((prev) => ({
        ...prev,
        volume: clampedVolume,
        isMuted: clampedVolume === 0,
      }));
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      const newMuted = !state.isMuted;
      audioRef.current.muted = newMuted;
      setState((prev) => ({ ...prev, isMuted: newMuted }));
    }
  }, [state.isMuted]);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setState((prev) => ({ ...prev, progress: time }));
    }
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  return {
    ...state,
    play,
    pause,
    togglePlayPause,
    playNext,
    playPrevious,
    setVolume,
    toggleMute,
    seekTo,
    formatTime,
    playlist,
  };
}
