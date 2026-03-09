import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9996] flex items-center justify-center bg-[#F5F9FA]">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/strovia-log.png"
          alt="Strovia"
          width={141}
          height={28}
          className="h-7 w-auto"
          priority
        />
        <div className="h-9 w-9 rounded-full border-4 border-[#3197A5]/20 border-t-[#3197A5] animate-spin" />
        <p
          className="text-sm text-[#3197A5]"
          style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
}
