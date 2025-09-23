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
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTrack: null,
    currentTrackIndex: 0,
    volume: 0.5,
    isMuted: false,
    progress: 0,
    duration: 0,
  });

  // Initialiser le lecteur audio (une seule fois)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio();
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      setState((prev) => ({ ...prev, duration: audio.duration }));
    };

    const handleTimeUpdate = () => {
      setState((prev) => ({ ...prev, progress: audio.currentTime }));
    };

    const handleEnded = () => {
      // passer à la piste suivante si disponible
      setState((prev) => {
        const nextIndex = (prev.currentTrackIndex + 1) % playlist.length;
        const nextTrack = playlist[nextIndex];
        if (nextTrack && audioRef.current) {
          audioRef.current.src = nextTrack.url;
          audioRef.current.load();
          // jouer automatiquement si on était en lecture
          if (prev.isPlaying) {
            void safePlay();
          }
          return {
            ...prev,
            currentTrack: nextTrack,
            currentTrackIndex: nextIndex,
            progress: 0,
            duration: 0,
          };
        }
        return prev;
      });
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
      playPromiseRef.current = null;
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Appliquer le volume quand il change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = state.volume;
    }
  }, [state.volume]);

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

  const safePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !state.currentTrack) return;
    try {
      const p = audio.play();
      playPromiseRef.current = p;
      await p;
      setState((prev) => ({ ...prev, isPlaying: true }));
    } catch (error: unknown) {
      const message = (error as Error)?.message || "";
      // Ignorer l'erreur d'interruption par pause() pendant play()
      if (
        message.includes("play() request was interrupted") ||
        message.includes("The play() request was interrupted")
      ) {
        return;
      }
      // Fallback: essayer de lire sans son
      if (audio) audio.muted = true;
      try {
        const p2 = audio.play();
        playPromiseRef.current = p2;
        await p2;
        setState((prev) => ({ ...prev, isPlaying: true, isMuted: true }));
      } catch (fallbackError) {
        console.error("Échec du fallback:", fallbackError);
      }
    } finally {
      playPromiseRef.current = null;
    }
  }, [state.currentTrack]);

  const play = useCallback(() => {
    void safePlay();
  }, [safePlay]);

  // Déverrouillage via événement global émis par l'overlay d'intro
  useEffect(() => {
    const handler = () => {
      // Si pas de piste courante, charger la première
      if (playlist.length > 0 && audioRef.current && !state.currentTrack) {
        const first = playlist[0];
        audioRef.current.src = first.url;
        audioRef.current.load();
        setState((prev) => ({
          ...prev,
          currentTrack: first,
          currentTrackIndex: 0,
          progress: 0,
          duration: 0,
        }));
      }

      // Tenter lecture: muted d'abord pour maximiser les chances, puis unmute
      const audio = audioRef.current;
      if (!audio) return;
      (async () => {
        try {
          audio.muted = true;
          await audio.play();
          audio.muted = false;
          setState((prev) => ({ ...prev, isPlaying: true }));
        } catch {
          // Si bloqué malgré tout, laisser l'utilisateur utiliser play
        }
      })();
    };

    window.addEventListener("wedding-unlock-audio", handler as EventListener, {
      once: true,
    });
    return () => {
      window.removeEventListener(
        "wedding-unlock-audio",
        handler as EventListener
      );
    };
  }, [playlist, state.currentTrack]);

  // Ne tente plus d'autoplay: attendre une interaction utilisateur
  // (On conserve le hook pour une future extension, mais sans action par défaut)
  useEffect(() => {
    // Intentionnellement vide pour éviter l'autoplay bloqué par les navigateurs
  }, [state.currentTrack]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    // Si une lecture est en cours, on la laisse être interrompue sans bruit
    try {
      audio.pause();
    } catch {}
    setState((prev) => ({ ...prev, isPlaying: false }));
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
        void safePlay();
      }
    }
  }, [state.currentTrackIndex, state.isPlaying, playlist, safePlay]);

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
        void safePlay();
      }
    }
  }, [state.currentTrackIndex, state.isPlaying, playlist, safePlay]);

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
