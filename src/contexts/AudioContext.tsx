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
  isRepeat: boolean;
  toggleRepeat: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<AudioSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(80);
  const [isRepeat, setIsRepeat] = useState(false);
  const currentTrackRef = useRef<AudioSession | null>(null);

  // Sync ref with state so event listeners can access current track
  useEffect(() => {
    currentTrackRef.current = currentTrack;
  }, [currentTrack]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.crossOrigin = "anonymous"; // Needed for CORS streaming

    // Register Service Worker for audio intercept
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/audio-sw.js")
        .then((reg) => {
          const token = localStorage.getItem("token");
          if (token && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
              type: "SET_TOKEN",
              token,
            });
          }
        })
        .catch((err) => {
          console.error("Audio SW registration failed:", err);
        });

      navigator.serviceWorker.addEventListener("controllerchange", () => {
        const token = localStorage.getItem("token");
        if (token && navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: "SET_TOKEN",
            token,
          });
        }
      });
    }

    const audio = audioRef.current;

    // Event listeners
    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      // streaming might report Infinity
      if (
        audio.duration &&
        audio.duration !== Infinity &&
        !isNaN(audio.duration)
      ) {
        setDuration(audio.duration);
      } else if (currentTrackRef.current?.durationSeconds) {
        setDuration(currentTrackRef.current.durationSeconds);
      }
    };

    const handleEnded = () => {
      if (audio.loop) return; // handled natively
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

      // Proactively set known duration to avoid 0s or Infinity bugs
      if (track.durationSeconds) {
        setDuration(track.durationSeconds);
      } else {
        setDuration(0);
      }

      // Check if URL requires Auth (api endpoints)
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (
        token &&
        "serviceWorker" in navigator &&
        navigator.serviceWorker.controller
      ) {
        navigator.serviceWorker.controller.postMessage({
          type: "SET_TOKEN",
          token,
        });
      }

      let finalUrl = track.audioUrl;
      // Append sw_token so SW catches it immediately on first fetch without race conditions.
      if (
        token &&
        "serviceWorker" in navigator &&
        finalUrl.includes("/api/v1/audios/stream/")
      ) {
        finalUrl += (finalUrl.includes("?") ? "&" : "?") + "sw_token=" + token;
      }

      // We just assign it to src. The SW intercepts API URLs and adds the token header.
      audioRef.current.src = finalUrl;

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

  const toggleRepeat = () => {
    setIsRepeat((prev) => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.loop = next;
      }
      return next;
    });
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
        isRepeat,
        toggleRepeat,
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
