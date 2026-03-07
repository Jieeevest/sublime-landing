"use client";

import Image from "next/image";
import { useI18n } from "@/i18n";

/**
 * DashboardHero component displays the main featured audio session.
 * Static component with no props, using specific CSS layout and SVG image.
 */
export default function DashboardHero() {
  const { t } = useI18n();

  return (
    <div
      className="relative flex w-full flex-col items-start gap-4 overflow-hidden rounded-[16px] p-5 transition-all hover:shadow-lg sm:p-6 md:h-[338px] md:flex-row md:items-center md:gap-6 md:p-10"
      style={{
        background:
          "linear-gradient(90deg, #30A9AF 0%, rgba(121, 202, 206, 0.75) 100%), #F5F9FA",
        isolation: "isolate",
      }}
    >
      {/* Decorative Wave Vector Implementation */}
      <div
        className="pointer-events-none absolute hidden md:block"
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
      <div className="z-10 flex max-w-[712px] flex-col items-start gap-3 sm:gap-4">
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
            {t("dash_hero_badge")}
          </span>
        </div>

        {/* Title */}
        <h1
          className="w-full text-2xl font-bold leading-tight sm:text-3xl md:text-[36px] md:leading-[43px]"
          style={{
            fontFamily: "'PP Neue Montreal', sans-serif",
            background:
              "linear-gradient(94.58deg, #C2F8FF 22.86%, #FFFFFF 62.57%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {t("dash_hero_title")}
        </h1>

        {/* Description */}
        <p
          className="text-sm leading-6 sm:text-base sm:leading-7"
          style={{
            fontFamily: "'PP Neue Montreal', sans-serif",
            fontStyle: "normal",
            fontWeight: 400,
            color: "#FFFFFF",
            maxWidth: "712px",
          }}
        >
          {t("dash_hero_desc")}
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
            {t("dash_hero_stats")}
          </span>
        </div>
      </div>

      {/* Right Image (Woman) */}
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 hidden w-[280px] items-end justify-end overflow-hidden rounded-r-[16px] md:flex lg:w-[500px]">
        <div className="relative w-full h-full">
          <Image
            src="/active-dashboard-hero.svg"
            alt="Woman with headphones"
            fill
            className="object-contain object-right-bottom md:scale-105 md:-translate-x-14 md:translate-y-2 lg:scale-110 lg:-translate-x-20 lg:translate-y-4"
            priority
          />
        </div>
      </div>

      {/* Play Button */}
      <button
        className="group absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center transition-transform hover:scale-105 md:flex lg:right-10"
        style={{
          width: "72px",
          height: "72px",
          background: "#3197A5",
          borderRadius: "50%",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.45)",
          border: "none",
          cursor: "pointer",
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
