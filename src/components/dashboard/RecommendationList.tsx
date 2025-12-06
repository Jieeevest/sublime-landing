"use client";

import { useAudio } from "@/contexts/AudioContext";
import { AudioSession } from "@/data/audioSessions";

interface RecommendationListProps {
  sessions: AudioSession[];
}

export default function RecommendationList({
  sessions,
}: RecommendationListProps) {
  const { playTrack, currentTrack, isPlaying, pause } = useAudio();

  const handlePlayClick = (session: AudioSession) => {
    if (currentTrack?.id === session.id && isPlaying) {
      pause();
    } else {
      playTrack(session);
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${(seconds % 60)
        .toString()
        .padStart(2, "0")} Hr`;
    }
    return `${mins}:${(seconds % 60).toString().padStart(2, "0")} Hr`;
  };

  return (
    <div className="bg-white rounded-2xl p-6">
      <h2 className="text-xl font-bold text-secondary mb-6">
        Rekomendasi Hari Ini
      </h2>

      <div className="space-y-4">
        {sessions.slice(0, 3).map((session, index) => {
          const isCurrentTrack = currentTrack?.id === session.id;
          const isCurrentlyPlaying = isCurrentTrack && isPlaying;

          return (
            <div
              key={session.id}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              {/* Number/Play Indicator */}
              <div className="flex-shrink-0 w-8 text-center">
                {isCurrentlyPlaying ? (
                  <div className="flex gap-0.5 justify-center">
                    <div
                      className="w-1 h-4 bg-primary rounded-full animate-pulse"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-1 h-4 bg-primary rounded-full animate-pulse"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-1 h-4 bg-primary rounded-full animate-pulse"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                ) : (
                  <span className="text-lg font-semibold text-secondary/40">
                    {index + 1}
                  </span>
                )}
              </div>

              {/* Thumbnail */}
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center relative overflow-hidden group">
                <svg
                  className="w-8 h-8 text-primary/30"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                </svg>

                {/* Play button overlay */}
                <button
                  onClick={() => handlePlayClick(session)}
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                >
                  {isCurrentlyPlaying ? (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-white"
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

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-secondary truncate">
                  {session.title}
                </h3>
                <p className="text-sm text-secondary/60 truncate">
                  {session.description}
                </p>
              </div>

              {/* Duration */}
              <div className="flex-shrink-0 text-sm text-secondary/60 font-medium">
                {formatDuration(session.duration)}
              </div>

              {/* Actions */}
              <div className="flex-shrink-0 flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg
                    className={`w-5 h-5 ${
                      isCurrentTrack
                        ? "text-red-500 fill-current"
                        : "text-gray-400"
                    }`}
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
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
