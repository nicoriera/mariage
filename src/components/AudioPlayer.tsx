"use client";

import { useState } from "react";
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

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Lecteur compact (toujours visible) */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-stone-200/50 overflow-hidden">
        {/* Contrôles principaux */}
        <div className="p-3 flex items-center gap-3">
          {/* Bouton play/pause principal */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              togglePlayPause();
              handleUserInteraction();
            }}
            className="w-10 h-10 p-0 rounded-full hover:bg-primary/10 transition-colors"
            aria-label={isPlaying ? "Pause" : "Lecture"}>
            {isPlaying ? (
              <Pause className="w-5 h-5 text-primary" />
            ) : (
              <Play className="w-5 h-5 text-primary" />
            )}
          </Button>

          {/* Informations de la piste */}
          <div className="flex-1 min-w-0">
            {currentTrack && (
              <div className="text-left">
                <Text size="sm" className="font-medium text-stone-900 truncate">
                  {currentTrack.title}
                </Text>
                <Text size="sm" variant="muted" className="truncate text-xs">
                  {currentTrack.artist}
                </Text>
              </div>
            )}
          </div>

          {/* Contrôles de navigation */}
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

          {/* Boutons d'action */}
          <div className="flex items-center gap-1">
            {/* Volume */}
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

            {/* Playlist */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="w-8 h-8 p-0 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Afficher la playlist">
              <Music className="w-4 h-4 text-stone-600" />
            </Button>

            {/* Expand/Collapse */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-8 h-8 p-0 rounded-full hover:bg-stone-100 transition-colors"
              aria-label={isExpanded ? "Réduire" : "Développer"}>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-stone-600" />
              ) : (
                <ChevronUp className="w-4 h-4 text-stone-600" />
              )}
            </Button>
          </div>
        </div>

        {/* Section étendue */}
        {isExpanded && (
          <div className="border-t border-stone-200/50 p-3 space-y-3">
            {/* Temps et volume */}
            <div className="flex items-center justify-between text-xs text-stone-600">
              <span>{formatTime(progress)}</span>
              <span>-{formatTimeRemaining()}</span>
            </div>

            {/* Contrôle du volume */}
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

            {/* Indicateur de piste actuelle */}
            <div className="text-center text-xs text-stone-600">
              Piste {currentTrackIndex + 1} sur {playlist.length}
            </div>
          </div>
        )}

        {/* Playlist */}
        {showPlaylist && (
          <div className="border-t border-stone-200/50 max-h-64 overflow-y-auto">
            <div className="p-3">
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
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      index === currentTrackIndex
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-stone-100 text-stone-700"
                    }`}>
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm truncate">
                          {track.title}
                        </div>
                        <div className="text-xs text-stone-500 truncate">
                          {track.artist}
                        </div>
                      </div>
                      <div className="text-xs text-stone-500 ml-2">
                        {formatTime(track.duration)}
                      </div>
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
