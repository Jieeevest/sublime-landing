import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AudioSession } from "@/data/audioSessions";
import { useAudio } from "@/contexts/AudioContext";
import { useI18n } from "@/i18n";

interface LyricsOverlayProps {
  track: AudioSession;
  onClose: () => void;
}

interface LrcLine {
  time: number;
  text: string;
}

export default function LyricsOverlay({ track, onClose }: LyricsOverlayProps) {
  const { progress } = useAudio();
  const { t } = useI18n();
  const [parsedLyrics, setParsedLyrics] = useState<LrcLine[]>([]);
  const activeLineIndexRef = useRef<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const isSubliminalTrack = /stroke|pemulihan|recovery/i.test(track.title ?? "");

  // Parse lyrics on mount or track change
  useEffect(() => {
    const rawLyrics = track.lyrics;
    if (!rawLyrics) {
      setParsedLyrics([]);
      return;
    }

    if (Array.isArray(rawLyrics)) {
      // Handle array of strings (legacy/fallback)
      setParsedLyrics(rawLyrics.map((line) => ({ time: 0, text: line })));
      return;
    }

    if (typeof rawLyrics === "string") {
      // Check if it's strictly LRC format (contains [mm:ss])
      const hasLrcTimestamps = /\[\d{2}:\d{2}/.test(rawLyrics);

      if (hasLrcTimestamps) {
        const lines = rawLyrics.split("\n");
        const parsed: LrcLine[] = [];
        const timeRegex = /\[(\d{2}):(\d{2})(\.\d{2,3})?\]/;

        lines.forEach((line) => {
          const match = line.match(timeRegex);
          if (match) {
            const minutes = parseInt(match[1], 10);
            const seconds = parseInt(match[2], 10);
            const milliseconds = match[3] ? parseFloat(match[3]) * 1000 : 0;
            const time = minutes * 60 + seconds + milliseconds / 1000;
            const text = line.replace(timeRegex, "").trim();
            if (text) {
              parsed.push({ time, text });
            }
          }
        });
        setParsedLyrics(parsed);
      } else {
        // Fallback: Treat as plain text, handle \\n or \n
        const cleanText = rawLyrics.replace(/\\n/g, "\n");
        const lines = cleanText.split("\n").filter((l) => l.trim() !== "");
        setParsedLyrics(lines.map((text) => ({ time: 0, text })));
      }
    }
  }, [track]);

  // Find active line based on progress
  const activeIndex = parsedLyrics.findIndex((line, index) => {
    const nextLine = parsedLyrics[index + 1];
    return progress >= line.time && (!nextLine || progress < nextLine.time);
  });

  // Scroll active line into view
  useEffect(() => {
    if (activeIndex !== -1 && activeIndex !== activeLineIndexRef.current) {
      activeLineIndexRef.current = activeIndex;
      const activeEl = document.getElementById(`lyric-line-${activeIndex}`);
      if (activeEl && containerRef.current) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [activeIndex]);

  const hasTimestamps = parsedLyrics.some((l) => l.time > 0);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full h-full relative overflow-hidden flex flex-col items-center justify-start"
        style={{
          background:
            "linear-gradient(180deg, #3197A5 0%, #2C7F8A 44.79%, #0E2427 100%)",
        }}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 h-[100px] flex items-center px-10 z-50">
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
          ref={containerRef}
          className={`w-full h-full overflow-y-auto no-scrollbar flex flex-col items-center pt-[150px] pb-[200px] ${
            hasTimestamps ? "gap-[40px]" : ""
          }`}
          style={{
            scrollBehavior: "smooth",
          }}
        >
          {parsedLyrics.length > 0 ? (
            hasTimestamps ? (
              parsedLyrics.map((line, index) => {
                const isActive = index === activeIndex;

                return (
                  <p
                    key={index}
                    id={`lyric-line-${index}`}
                    className="text-center font-bold text-[24px] md:text-[36px] leading-[1.2] transition-all duration-500 whitespace-pre-wrap max-w-[80%]"
                    style={{
                      fontFamily: "'PP Neue Montreal', sans-serif",
                      color: isActive
                        ? "rgba(255,255,255,1)"
                        : "rgba(255,255,255,0.3)",
                      transform: isActive ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    {line.text}
                  </p>
                );
              })
            ) : (
              <div className="flex flex-col gap-3 max-w-[720px] px-4 w-full">
                <Image
                  src="/strovia-logo-white.png"
                  alt="Strovia"
                  width={140}
                  height={40}
                  className="h-10 w-auto object-contain mb-2"
                  priority
                />
                {isSubliminalTrack && (
                <div className="mb-2 flex items-start gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 backdrop-blur-sm">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 flex-shrink-0 text-white/80"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                  <p
                    className="text-[12px] leading-[1.5] text-white/80 md:text-[13px]"
                    style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
                  >
                    {t("dash_audio_script_info")}
                  </p>
                </div>
                )}
                {parsedLyrics
                  .filter((line) => line.text.trim() !== "")
                  .map((line, index) => (
                    <p
                      key={index}
                      className="text-justify text-white text-[16px] md:text-[18px] leading-[1.6]"
                      style={{
                        fontFamily: "'PP Neue Montreal', sans-serif",
                      }}
                    >
                      {line.text}
                    </p>
                  ))}
              </div>
            )
          ) : (
            <p className="text-white/50 text-[24px]">Lyrics not available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
