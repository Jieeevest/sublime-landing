"use client";

import Image from "next/image";
import { useEffect } from "react";

const IS_COMING_SOON = process.env.NEXT_PUBLIC_IS_COMING_SOON === "true";

export default function ComingSoonOverlay() {
  useEffect(() => {
    if (!IS_COMING_SOON) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!IS_COMING_SOON) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center px-6 text-center"
      style={{
        background:
          "linear-gradient(180deg, #3197A5 0%, #2C7F8A 44.79%, #0E2427 100%)",
        fontFamily: "'PP Neue Montreal', sans-serif",
      }}
      onClickCapture={(e) => e.stopPropagation()}
    >
      <Image
        src="/strovia-logo-white.png"
        alt="Strovia"
        width={200}
        height={60}
        priority
        className="mb-10 h-auto w-[180px] object-contain md:w-[220px]"
      />
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[12px] font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
        Coming Soon
      </span>
      <h1 className="mb-4 text-[36px] font-medium leading-tight text-white sm:text-[48px] md:text-[64px]">
        Sesuatu yang menakjubkan
        <br />
        sedang kami siapkan
      </h1>
      <p className="max-w-[540px] text-[15px] leading-[1.6] text-white/80 sm:text-[16px]">
        Strovia sedang dalam tahap penyempurnaan. Nantikan pengalaman audio
        subliminal 528Hz untuk mendukung pemulihan mandiri pasca stroke.
      </p>
    </div>
  );
}
