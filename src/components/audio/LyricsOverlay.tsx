import React from "react";
import { AudioSession } from "@/data/audioSessions";

interface LyricsOverlayProps {
  track: AudioSession;
  onClose: () => void;
}

export default function LyricsOverlay({ track, onClose }: LyricsOverlayProps) {
  const lyrics = track.lyrics || [];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full h-full relative overflow-hidden flex flex-col items-center justify-start"
        style={{
          background:
            "linear-gradient(180deg, #3197A5 0%, #2C7F8A 44.79%, #0E2427 100%)",
        }}
      >
        {/* Header / Top Bar (if needed to push content down or show title) */}
        <div className="absolute top-0 left-0 right-0 h-[100px] flex items-center px-10 z-50">
          {/* Dismiss by clicking background or specific button if needed. 
               But AudioPlayer controls will be at bottom z-50.
               We can add a specific close button here or rely on the toggle in AudioPlayer.
           */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={onClose}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <h2 className="text-white text-[18px] font-medium font-sans">
              {track.title}
            </h2>
          </div>
        </div>

        {/* Lyrics Container */}
        <div
          className="w-full h-full overflow-y-auto no-scrollbar flex flex-col items-center pt-[150px] pb-[200px] gap-[40px]"
          style={{
            scrollBehavior: "smooth",
          }}
        >
          {lyrics.length > 0 ? (
            lyrics.map((line, index) => (
              <p
                key={index}
                className="text-center font-bold text-[24px] md:text-[36px] leading-[1.2] transition-colors duration-500"
                style={{
                  fontFamily: "'PP Neue Montreal', sans-serif",
                  color:
                    index === 0
                      ? "rgba(255,255,255,1)"
                      : "rgba(255,255,255,0.5)", // Highlight first line as demo or just all 0.7
                }}
              >
                {line}
              </p>
            ))
          ) : (
            <p className="text-white/50 text-[24px]">
              Lyrics description not available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
