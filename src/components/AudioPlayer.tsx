"use client";

import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Music,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { WEDDING_PLAYLIST } from "../constants/music";
import { Button } from "./ui/Button";
import { Text } from "./ui/Typography";

export function AudioPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const {
    isPlaying,
    currentTrack,
    currentTrackIndex,
    volume,
    isMuted,
    progress,
    duration,
    togglePlayPause,
    playNext,
    playPrevious,
    setVolume,
    toggleMute,
    formatTime,
    playlist,
  } = useAudioPlayer(WEDDING_PLAYLIST);

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Marquer que l'utilisateur a interagi avec le lecteur
  const handleUserInteraction = () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
  };

  // Gérer le changement de volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    handleUserInteraction();
  };

  // Formater le temps restant
  const formatTimeRemaining = () => {
    const remaining = duration - progress;
    return formatTime(remaining);
  };

  // Calculer le pourcentage de progression

  // Gestion des gestes tactiles pour mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;

      if (touch.clientX < centerX) {
        // Côté gauche : piste précédente
        playPrevious();
        handleUserInteraction();
      } else {
        // Côté droit : piste suivante
        playNext();
        handleUserInteraction();
      }
    }
  };

  return (
    <div
      className={`fixed ${
        isMobile ? "bottom-2 right-2 left-2" : "bottom-4 right-4"
      } z-50`}>
      {/* Lecteur compact (toujours visible) */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-stone-200/50 overflow-hidden">
        {/* Contrôles principaux */}
        <div
          className={`${isMobile ? "p-2" : "p-3"} flex items-center ${
            isMobile ? "gap-2" : "gap-3"
          }`}>
          {/* Bouton play/pause principal */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              togglePlayPause();
              handleUserInteraction();
            }}
            onTouchStart={handleTouchStart}
            className={`${
              isMobile ? "w-8 h-8" : "w-10 h-10"
            } p-0 rounded-full hover:bg-primary/10 transition-colors ${
              isMobile ? "active:bg-primary/20" : ""
            }`}
            aria-label={isPlaying ? "Pause" : "Lecture"}>
            {isPlaying ? (
              <Pause
                className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} text-primary`}
              />
            ) : (
              <Play
                className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} text-primary`}
              />
            )}
          </Button>

          {/* Informations de la piste */}
          <div className="flex-1 min-w-0">
            {currentTrack && (
              <div className="text-left">
                <Text size="sm" className="font-medium text-stone-900 truncate">
                  {currentTrack.title}
                </Text>
                {!isMobile && (
                  <Text size="sm" variant="muted" className="truncate text-xs">
                    {currentTrack.artist}
                  </Text>
                )}
              </div>
            )}
          </div>

          {/* Contrôles de navigation */}
          {!isMobile && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  playPrevious();
                  handleUserInteraction();
                }}
                className="w-8 h-8 p-0 rounded-full hover:bg-stone-100 transition-colors"
                aria-label="Piste précédente">
                <SkipBack className="w-4 h-4 text-stone-600" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  playNext();
                  handleUserInteraction();
                }}
                className="w-8 h-8 p-0 rounded-full hover:bg-stone-100 transition-colors"
                aria-label="Piste suivante">
                <SkipForward className="w-4 h-4 text-stone-600" />
              </Button>
            </div>
          )}

          {/* Boutons d'action */}
          <div className="flex items-center gap-1">
            {/* Volume - seulement sur desktop */}
            {!isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  toggleMute();
                  handleUserInteraction();
                }}
                className="w-8 h-8 p-0 rounded-full hover:bg-stone-100 transition-colors"
                aria-label={isMuted ? "Activer le son" : "Couper le son"}>
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-stone-600" />
                ) : (
                  <Volume2 className="w-4 h-4 text-stone-600" />
                )}
              </Button>
            )}

            {/* Playlist */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPlaylist(!showPlaylist)}
              className={`${
                isMobile ? "w-6 h-6" : "w-8 h-8"
              } p-0 rounded-full hover:bg-stone-100 transition-colors`}
              aria-label="Afficher la playlist">
              <Music
                className={`${isMobile ? "w-3 h-3" : "w-4 h-4"} text-stone-600`}
              />
            </Button>

            {/* Expand/Collapse */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`${
                isMobile ? "w-6 h-6" : "w-8 h-8"
              } p-0 rounded-full hover:bg-stone-100 transition-colors`}
              aria-label={isExpanded ? "Réduire" : "Développer"}>
              {isExpanded ? (
                <ChevronDown
                  className={`${
                    isMobile ? "w-3 h-3" : "w-4 h-4"
                  } text-stone-600`}
                />
              ) : (
                <ChevronUp
                  className={`${
                    isMobile ? "w-3 h-3" : "w-4 h-4"
                  } text-stone-600`}
                />
              )}
            </Button>
          </div>
        </div>

        {/* Section étendue */}
        {isExpanded && (
          <div
            className={`border-t border-stone-200/50 ${
              isMobile ? "p-2" : "p-3"
            } ${isMobile ? "space-y-2" : "space-y-3"}`}>
            {/* Temps et volume */}
            <div className="flex items-center justify-between text-xs text-stone-600">
              <span>{formatTime(progress)}</span>
              <span>-{formatTimeRemaining()}</span>
            </div>

            {/* Contrôle du volume - seulement sur desktop */}
            {!isMobile && (
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-stone-600" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #9db380 0%, #9db380 ${
                      volume * 100
                    }%, #e5e7eb ${volume * 100}%, #e5e7eb 100%)`,
                  }}
                />
                <span className="text-xs text-stone-600 w-8 text-right">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            )}

            {/* Indicateur de piste actuelle */}
            <div className="text-center text-xs text-stone-600">
              Piste {currentTrackIndex + 1} sur {playlist.length}
            </div>
          </div>
        )}

        {/* Playlist */}
        {showPlaylist && (
          <div
            className={`border-t border-stone-200/50 ${
              isMobile ? "max-h-48" : "max-h-64"
            } overflow-y-auto`}>
            <div className={`${isMobile ? "p-2" : "p-3"}`}>
              <div className="flex items-center justify-between mb-2">
                <Text size="sm" className="font-medium text-stone-900">
                  Playlist
                </Text>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPlaylist(false)}
                  className="w-6 h-6 p-0 rounded-full hover:bg-stone-100 transition-colors">
                  <X className="w-4 h-4 text-stone-600" />
                </Button>
              </div>

              <div className="space-y-1">
                {playlist.map((track, index) => (
                  <button
                    key={track.id}
                    onClick={() => {
                      // Logique pour changer de piste
                      handleUserInteraction();
                    }}
                    className={`w-full text-left ${
                      isMobile ? "p-1.5" : "p-2"
                    } rounded-lg transition-colors ${
                      index === currentTrackIndex
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-stone-100 text-stone-700"
                    }`}>
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <div
                          className={`font-medium ${
                            isMobile ? "text-xs" : "text-sm"
                          } truncate`}>
                          {track.title}
                        </div>
                        {!isMobile && (
                          <div className="text-xs text-stone-500 truncate">
                            {track.artist}
                          </div>
                        )}
                      </div>
                      {!isMobile && (
                        <div className="text-xs text-stone-500 ml-2">
                          {formatTime(track.duration)}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Styles CSS personnalisés pour le slider */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #9db380;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #9db380;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
