"use client";

import Image from "next/image";

export default function ComingSoonAppBanner() {
  return (
    <div
      aria-label="Strovia Coming Soon di App Store & Google Play"
      className="relative block w-full overflow-hidden rounded-2xl"
    >
      <div className="relative w-full aspect-[2156/729]">
        <Image
          src="/coming-soon-app-banner.png"
          alt="Strovia Coming Soon — Segera hadir di App Store & Google Play"
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-contain"
          priority={false}
        />
      </div>
    </div>
  );
}
