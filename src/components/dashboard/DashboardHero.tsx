"use client";

import { useAudio } from "@/contexts/AudioContext";
import { AudioSession } from "@/data/audioSessions";

/**
 * Props for the DashboardHero component.
 */
interface DashboardHeroProps {
  /** The session to display in the hero section. */
  session: AudioSession;
  /** The total number of monthly listeners (optional). */
  playCount?: string;
  /** Fallback dummy session if the main session is partial */
  fallbackSession?: AudioSession;
}

/**
 * DashboardHero component displays the main featured audio session.
 * It includes a play button to start the session immediately.
 */
export default function DashboardHero({
  session,
  playCount = "1.322.931",
}: DashboardHeroProps) {
  const { playTrack } = useAudio();

  return (
    <div className="relative bg-gradient-to-r from-[#30A9AF] to-[#79CACE]/75 rounded-2xl overflow-hidden h-[295px]">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[277px] h-[277px] border border-white/50 rounded-lg transform rotate-[135deg]"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
      <div className="absolute inset-0 bg-black/5"></div>

      <div className="relative h-full flex items-center justify-between px-10">
        {/* Left Content */}
        <div className="flex-1 max-w-[712px] text-white space-y-4 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/8 backdrop-blur-sm border border-white/7 rounded-full text-base font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Audio Therapy Pilihan
          </div>

          <h1 className="text-4xl font-bold leading-tight bg-gradient-to-r from-[#C2F8FF] to-white bg-clip-text text-transparent">
            {session?.title || "Stroke Recovery"}
          </h1>

          <p className="text-white/90 text-base max-w-[712px] leading-relaxed">
            {session?.description ||
              "Strovia memadukan frekuensi penyembuhan 528Hz..."}
          </p>

          <div className="flex items-center gap-2 text-sm">
            <div className="p-2 bg-white/4 border border-white/7 rounded-lg">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="12" width="4" height="9" rx="1" />
                <rect x="10" y="8" width="4" height="13" rx="1" />
                <rect x="17" y="4" width="4" height="17" rx="1" />
              </svg>
            </div>
            <span>{playCount} pendengar bulanan</span>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-[353px] h-full flex items-end justify-end">
          <div className="absolute bottom-0 right-20 w-[353px] h-[322px] bg-gradient-to-br from-white/5 to-transparent"></div>

          {/* Placeholder for woman image */}
          <div className="relative z-10 w-[353px] h-[322px] flex items-end">
            <div className="w-full h-full bg-white/5 rounded-t-[100px] flex items-center justify-center">
              {session?.imageUrl ? (
                <img
                  src={session.imageUrl}
                  alt="Cover"
                  className="w-full h-full object-cover rounded-t-[100px]"
                />
              ) : (
                <svg
                  className="w-32 h-32 text-white/20"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>

          {/* Play Button */}
          <button
            onClick={() => playTrack(session)}
            className="absolute bottom-[183px] right-[156px] w-[72px] h-[72px] bg-primary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-20"
          >
            <svg
              className="w-8 h-8 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
