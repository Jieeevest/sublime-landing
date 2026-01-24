"use client";

import { useAudio } from "@/contexts/AudioContext";
import Image from "next/image";

/**
 * DashboardHero component displays the main featured audio session.
 * Static component with no props, using specific CSS layout and SVG image.
 */
export default function DashboardHero() {
  const handlePlay = () => {
    console.log("Play clicked (Static)");
  };

  return (
    <div
      className="relative w-full rounded-[16px] overflow-hidden flex flex-row items-center transition-all hover:shadow-lg"
      style={{
        height: "338px",
        background:
          "linear-gradient(90deg, #30A9AF 0%, rgba(121, 202, 206, 0.75) 100%), #F5F9FA",
        padding: "40px",
        gap: "24px",
        isolation: "isolate",
      }}
    >
      {/* Decorative Wave Vector Implementation */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "1115.62px",
          height: "277px",
          right: "-100px",
          top: "50%",
          transform: "translateY(-50%) rotate(-44.5deg)",
          opacity: 0.5,
          zIndex: 0,
        }}
      >
        <Image
          src="/vector-dashboard-hero.svg"
          alt="Vector Wave"
          fill
          className="object-contain"
        />
      </div>

      {/* Content (Left Side) */}
      <div className="flex flex-col items-start gap-4 z-10 max-w-[712px]">
        {/* Badge */}
        <div
          className="flex flex-row justify-center items-center px-4 py-1 gap-1"
          style={{
            height: "36px",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.07)",
            borderRadius: "99px",
            backdropFilter: "blur(21px)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 0L9.79611 6.20389L16 8L9.79611 9.79611L8 16L6.20389 9.79611L0 8L6.20389 6.20389L8 0Z"
              fill="white"
            />
          </svg>
          <span
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "28px",
              color: "#FFFFFF",
            }}
          >
            Pilihan Bahasa Audio
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'PP Neue Montreal', sans-serif",
            fontWeight: 700,
            fontSize: "36px",
            lineHeight: "43px",
            background:
              "linear-gradient(94.58deg, #C2F8FF 22.86%, #FFFFFF 62.57%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            width: "100%",
          }}
        >
          Audio Pemulihan Stroke Dalam Bahasa Indonesia
        </h1>

        {/* Description */}
        <p
          style={{
            fontFamily: "'PP Neue Montreal', sans-serif",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "28px",
            color: "#FFFFFF",
            maxWidth: "712px",
          }}
        >
          Strovia memicu kemampuan diri untuk memulihkan diri dari pengalaman
          stroke dengan menggunakan subliminal message audio yang di set pada
          frekuensi 528Hz.
        </p>

        {/* Listeners Stat */}
        <div className="flex flex-row items-center gap-2 mt-2">
          <div
            className="flex items-center justify-center white-glass"
            style={{
              width: "32px",
              height: "32px",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.07)",
              borderRadius: "8px",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="6" width="2" height="4" rx="1" fill="white" />
              <rect x="7" y="3" width="2" height="10" rx="1" fill="white" />
              <rect x="12" y="8" width="2" height="2" rx="1" fill="white" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "21px",
              color: "#FFFFFF",
            }}
          >
            1,809 Pendengar/Februari 2026
          </span>
        </div>
      </div>

      {/* Right Image (Woman) */}
      <div className="absolute right-0 bottom-0 top-0 w-[500px] flex items-end justify-end pointer-events-none overflow-hidden rounded-r-[16px]">
        <div className="relative w-full h-full">
          <Image
            src="/active-dashboard-hero.svg"
            alt="Woman with headphones"
            fill
            className="object-contain object-right-bottom scale-110 -translate-x-20 translate-y-4"
            priority
          />
        </div>
      </div>

      {/* Play Button */}
      <button
        onClick={handlePlay}
        className="absolute z-20 hover:scale-105 transition-transform group"
        style={{
          width: "72px",
          height: "72px",
          right: "40px",
          top: "65%", // Adjusted visual center to match design
          transform: "translateY(-50%)",
          background: "#3197A5",
          borderRadius: "50%",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.45)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-1 group-hover:scale-110 transition-transform"
        >
          <path d="M5 20V4L19 12L5 20Z" fill="white" />
        </svg>
      </button>
    </div>
  );
}
