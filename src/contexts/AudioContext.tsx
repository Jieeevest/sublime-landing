"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { AudioSession } from "@/data/audioSessions";

interface AudioContextType {
  currentTrack: AudioSession | null;
  isPlaying: boolean;
  isPlayerVisible: boolean;
  progress: number;
  duration: number;
  volume: number;
  playTrack: (track: AudioSession) => void;
  pause: () => void;
  resume: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  closePlayer: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<AudioSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(80);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();

    const audio = audioRef.current;

    // Event listeners
    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, []);

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  /*
   * Ref to store the current Blob URL so we can revoke it when changing tracks
   * to avoid memory leaks.
   */
  const currentBlobUrlRef = useRef<string | null>(null);

  const cleanupBlobUrl = () => {
    if (currentBlobUrlRef.current) {
      URL.revokeObjectURL(currentBlobUrlRef.current);
      currentBlobUrlRef.current = null;
    }
  };

  const playTrack = async (track: AudioSession) => {
    if (audioRef.current) {
      // If same track, just resume
      if (currentTrack?.id === track.id && !isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
        return;
      }

      // Cleanup previous blob URL if exists
      cleanupBlobUrl();

      // Load new track
      setCurrentTrack(track);

      // Check if URL requires Auth (api endpoints)
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      // If it's an API URL and we have a token, fetch with headers
      if (track.audioUrl.includes("/api/") && token) {
        try {
          const response = await fetch(track.audioUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch audio: ${response.statusText}`);
          }

          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          currentBlobUrlRef.current = blobUrl;

          audioRef.current.src = blobUrl;
        } catch (error) {
          console.error("Error loading protected audio:", error);
          // Fallback or simple error handling - maybe try direct URL just in case
          audioRef.current.src = track.audioUrl;
        }
      } else {
        // Standard public URL
        audioRef.current.src = track.audioUrl;
      }

      // Play
      // We use a small timeout or wait for the src to be set?
      // Setting src is synchronous for the DOM property, but loading is async.
      // However we can call play() immediately, the browser handles buffering.
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setIsPlayerVisible(true);
        setProgress(0);
      } catch (err) {
        console.error("Playback failed:", err);
        setIsPlaying(false);
      }
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const resume = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
  };

  const closePlayer = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsPlayerVisible(false);
    setCurrentTrack(null);
    setProgress(0);
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        isPlayerVisible,
        progress,
        duration,
        volume,
        playTrack,
        pause,
        resume,
        seek,
        setVolume,
        closePlayer,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
