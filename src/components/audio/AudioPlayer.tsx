"use client";

import { useAudio } from "@/contexts/AudioContext";
import Image from "next/image";

export default function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    isPlayerVisible,
    progress,
    duration,
    volume,
    pause,
    resume,
    seek,
    setVolume,
    closePlayer,
  } = useAudio();

  if (!isPlayerVisible || !currentTrack) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    seek(newTime);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-0 animate-slide-up pointer-events-none">
      <div className="relative w-full max-w-[1440px] pointer-events-auto h-[104px]">
        {/* Glassmorphism Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(74.91deg, #3197A5 5.58%, rgba(49, 151, 165, 0) 99.84%)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(29, 33, 35, 0.3)",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(15px)",
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex items-center justify-between h-full px-6 md:px-[24px] gap-[24px]">
          {/* Left: Track Info */}
          <div className="flex items-center gap-[12px] min-w-[300px]">
            {/* Thumbnail */}
            <div className="w-[44px] h-[44px] relative rounded-[8px] overflow-hidden bg-gray-700 flex-shrink-0">
              {currentTrack.imageUrl ? (
                <Image
                  src="/audio-fallback.svg"
                  alt={currentTrack.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#3197A5] to-teal-800" />
              )}
            </div>

            {/* Text */}
            <div className="flex flex-col">
              <h3
                className="text-white truncate max-w-[250px]"
                style={{
                  fontFamily: "'PP Neue Montreal', sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "22px",
                }}
              >
                {currentTrack.title}
              </h3>
              <p
                className="text-[#E1E1E1] truncate max-w-[250px]"
                style={{
                  fontFamily: "'PP Neue Montreal', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  lineHeight: "18px",
                }}
              >
                {currentTrack.subtitle || currentTrack.description}
              </p>
            </div>
          </div>

          {/* Center: Controls & Progress */}
          <div className="flex flex-col items-center gap-[4px] flex-1 max-w-[629px]">
            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-[24px]">
              {/* Shuffle (Mock) */}
              <button className="text-white/70 hover:text-white transition-colors">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 3h5v5" />
                  <path d="M4 20L21 3" />
                  <path d="M21 16v5h-5" />
                  <path d="M15 15l-5 5-4-4" />
                  <path d="M4 4l5 5" />
                </svg>
              </button>

              {/* Previous */}
              <button className="text-white hover:text-primary-300 transition-colors">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              {/* Play/Pause */}
              <button
                onClick={isPlaying ? pause : resume}
                className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#1F1F1F"
                  >
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#1F1F1F"
                    className="ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Next */}
              <button className="text-white hover:text-primary-300 transition-colors">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>

              {/* Repeat (Mock) */}
              <button className="text-white/70 hover:text-white transition-colors">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 1l4 4-4 4" />
                  <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                  <path d="M7 23l-4-4 4-4" />
                  <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-[8px] w-full">
              <span
                className="text-[#E1E1E1] text-xs w-[31px] text-right"
                style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
              >
                {formatTime(progress)}
              </span>

              <div
                className="relative flex-1 h-[5px] group cursor-pointer flex items-center"
                onClick={handleProgressClick}
              >
                {/* Track Background */}
                <div className="absolute w-full h-[5px] bg-white/30 rounded-[4px]" />

                {/* buffer bar (optional visual) */}
                <div
                  className="absolute h-[5px] bg-white/50 rounded-[4px]"
                  style={{ width: "60%" }}
                />

                {/* Actual Progress */}
                <div
                  className="absolute h-[5px] bg-white rounded-[4px] flex items-center justify-end"
                  style={{ width: `${(progress / duration) * 100}%` }}
                >
                  {/* Thumb (only visible on hover/active) */}
                  <div className="w-[12px] h-[12px] bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity translate-x-1/2" />
                </div>
              </div>

              <span
                className="text-[#E1E1E1] text-xs w-[30px]"
                style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
              >
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Right: Volume & Options */}
          <div className="flex items-center justify-end gap-[24px] min-w-[300px]">
            {/* Lyrics/Captions */}
            <button className="text-white/70 hover:text-white">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>

            {/* Volume Block */}
            <div className="flex items-center gap-[8px]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>

              {/* Volume Slider */}
              <div className="w-[100px] h-[3px] bg-white/50 rounded-full relative group cursor-pointer">
                <div
                  className="absolute top-0 left-0 h-full bg-white rounded-full"
                  style={{ width: `${volume}%` }}
                />
                {/* Invisble input range for interaction */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Simple Close/Menu */}
            <button
              onClick={closePlayer}
              className="p-2 text-white/50 hover:text-white"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
