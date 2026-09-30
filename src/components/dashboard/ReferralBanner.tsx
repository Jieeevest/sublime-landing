"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ReferralBanner() {
  const router = useRouter();

  const handleClick = () => {
    window.dispatchEvent(new Event("app:navigation-start"));
    router.push("/dashboard/profile?tab=Referral");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Program Referral Strovia"
      className="group relative block w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3197A5]"
    >
      <div className="relative aspect-[1200/380] w-full sm:aspect-[1200/340]">
        <Image
          src="/referral-banner.png"
          alt="Ajak Teman, Dapatkan Komisi 20%"
          fill
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          priority={false}
        />
      </div>
    </button>
  );
}
