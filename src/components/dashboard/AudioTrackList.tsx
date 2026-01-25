"use client";

import { useAudio } from "@/contexts/AudioContext";
import { AudioSession } from "@/data/audioSessions";
import Image from "next/image";

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
    <div className="flex flex-col gap-[24px]">
      {/* Header */}
      <div className="h-[40px] flex items-center">
        <h2
          className="font-medium text-[#1F1F1F]"
          style={{
            fontFamily: "'PP Neue Montreal', sans-serif",
            fontSize: "24px",
            lineHeight: "32px",
          }}
        >
          {title}
        </h2>
      </div>

      {/* Content List */}
      <div className="flex flex-col gap-[16px]">
        {sessions.length > 0 ? (
          sessions.slice(0, 3).map((session, index) => {
            const isPlaying = currentTrack?.id === session.id;

            return (
              <div
                key={session.id}
                className="flex items-center px-6 py-3 gap-[24px] rounded-lg cursor-pointer group hover:bg-white/50 transition-colors"
                style={{
                  height: "68px",
                }}
              >
                {/* Track Number */}
                <div
                  className="w-[32px] h-[32px] flex items-center text-center justify-center font-normal text-[#1F1F1F]"
                  style={{
                    fontFamily: "'PP Neue Montreal', sans-serif",
                    fontSize: "16px",
                    lineHeight: "28px",
                  }}
                >
                  {index + 1}
                </div>

                {/* Thumbnail */}
                <div
                  className="w-[44px] h-[44px] rounded-[8px] overflow-hidden flex-shrink-0 relative group-hover:scale-105 transition-transform"
                  onClick={() => playTrack(session)}
                >
                  {/* Image Placeholder / Gradient */}
                  <Image
                    src="/audio-fallback.svg"
                    alt={session.title}
                    fill
                    className="object-cover"
                  />

                  {/* Play/Pause Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10">
                    {isPlaying ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="flex flex-col justify-center gap-[4px] flex-1">
                  <h3
                    className="font-medium text-[#1F1F1F]"
                    style={{
                      fontFamily: "'PP Neue Montreal', sans-serif",
                      fontSize: "14px",
                      lineHeight: "22px",
                    }}
                  >
                    {session.title}
                  </h3>
                  <p
                    className="hidden text-[#8E8E8E]"
                    style={{
                      fontFamily: "'PP Neue Montreal', sans-serif",
                      fontSize: "12px",
                      lineHeight: "150%",
                    }}
                  >
                    {session.subtitle}
                  </p>
                </div>

                {/* Frequency - Centered */}
                <div
                  className="w-[473px] text-center text-[#8E8E8E] hidden md:block" // Adjusted width/visibility based on layout
                  style={{
                    fontFamily: "'PP Neue Montreal', sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "28px",
                  }}
                >
                  528Hz
                </div>

                {/* Duration */}
                <div
                  className="w-[33px] text-right font-normal text-[#1F1F1F]"
                  style={{
                    fontFamily: "'PP Neue Montreal', sans-serif",
                    fontSize: "16px",
                    lineHeight: "28px",
                  }}
                >
                  {session.duration}
                </div>

                {/* Menu Button (Ghost) */}
                <button className="w-[44px] h-[44px] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 bg-transparent hover:bg-gray-100 transition-all">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="10" cy="10" r="2" fill="#8E8E8E" />
                    <circle cx="4" cy="10" r="2" fill="#8E8E8E" />
                    <circle cx="16" cy="10" r="2" fill="#8E8E8E" />
                  </svg>
                </button>
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 text-[#8E8E8E] bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
            <p className="text-lg font-medium">Belum ada audio saat ini</p>
            <p className="text-sm mt-1">
              Nantikan audio pilihan menarik untuk Anda segera.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
