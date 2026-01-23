"use client";

import { useAudio } from "@/contexts/AudioContext";
import { AudioSession } from "@/data/audioSessions";

interface AudioTrackListProps {
  sessions: AudioSession[];
  title?: string;
}

export default function AudioTrackList({
  sessions,
  title = "Audio Pilihan untuk Anda",
}: AudioTrackListProps) {
  const { playTrack, currentTrack } = useAudio();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-medium text-[#1F1F1F]">{title}</h2>
      </div>

      {/* Track List */}
      <div className="space-y-4">
        {sessions.slice(0, 3).map((session, index) => {
          const isPlaying = currentTrack?.id === session.id;

          return (
            <div
              key={session.id}
              className="flex items-center gap-6 px-6 py-3 rounded-lg hover:bg-white/50 transition-colors cursor-pointer group"
            >
              {/* Track Number */}
              <div className="w-8 text-center">
                <span className="text-base text-[#1F1F1F]">{index + 1}</span>
              </div>

              {/* Thumbnail */}
              <div
                className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary to-primary-600"
                onClick={() => playTrack(session)}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {isPlaying ? (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-[#1F1F1F] truncate">
                  {session.title}
                </h3>
                <p className="text-xs text-[#8E8E8E] truncate mt-1">
                  {session.subtitle}
                </p>
              </div>

              {/* Frequency */}
              <div className="text-center w-20">
                <span className="text-base text-[#8E8E8E]">528Hz</span>
              </div>

              {/* Heart Icon (Hidden for now) */}
              <div className="w-7 opacity-0">
                <svg
                  className="w-7 h-7 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>

              {/* Duration */}
              <div className="text-center w-12">
                <span className="text-base text-[#1F1F1F]">
                  {session.duration}
                </span>
              </div>

              {/* Menu Button */}
              <button className="w-11 h-11 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all">
                <svg
                  className="w-5 h-5 text-[#8E8E8E]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="6" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="18" r="1.5" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
