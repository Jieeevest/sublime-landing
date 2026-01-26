"use client";

import Image from "next/image";
import { AudioSession } from "@/data/audioSessions";
import { useAudio } from "@/contexts/AudioContext";

interface AudioSessionCardProps {
  session: AudioSession;
}

export default function AudioSessionCard({ session }: AudioSessionCardProps) {
  const { playTrack, currentTrack, isPlaying, pause } = useAudio();

  const isCurrentTrack = currentTrack?.id === session.id;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;

  const handlePlayClick = () => {
    if (isCurrentlyPlaying) {
      pause();
    } else {
      playTrack(session);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-video bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
        {/* Placeholder gradient background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-primary/30"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
          </svg>
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={handlePlayClick}
            className="w-16 h-16 bg-primary hover:bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300"
          >
            {isCurrentlyPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-primary">
            {session.category}
          </span>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-white">
            {session.durationSeconds
              ? formatDuration(session.durationSeconds)
              : session.duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-hero text-lg font-semibold text-secondary mb-2 line-clamp-1">
          {session.title}
        </h3>
        <p className="text-sm text-secondary/60 line-clamp-2">
          {session.description}
        </p>
      </div>

      {/* Playing Indicator */}
      {isCurrentlyPlaying && (
        <div className="px-5 pb-4">
          <div className="flex items-center gap-2 text-primary text-sm font-medium">
            <div className="flex gap-1">
              <div
                className="w-1 h-3 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-1 h-3 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-1 h-3 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: "300ms" }}
              />
            </div>
            <span>Now Playing</span>
          </div>
        </div>
      )}
    </div>
  );
}
