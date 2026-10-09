"use client";

import Sidebar from "./Sidebar";
import DashboardTopbar from "./DashboardTopbar";
import AudioPlayer from "../audio/AudioPlayer";
import { useAudio } from "@/contexts/AudioContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeItem?: string;
}

export default function DashboardLayout({
  children,
  activeItem,
}: DashboardLayoutProps) {
  const { isPlayerVisible, currentTrack } = useAudio();
  const isAudioOverlayActive = isPlayerVisible && !!currentTrack;

  return (
    <div className="flex min-h-screen bg-[#F5F9FA]">
      <Sidebar activeItem={activeItem} />

      <div
        className={`flex flex-1 flex-col md:ml-[93px] md:pb-0 ${
          isAudioOverlayActive ? "pb-[208px]" : "pb-[88px]"
        }`}
      >
        <DashboardTopbar />
        <main className="flex-1">{children}</main>
        <AudioPlayer />
      </div>
    </div>
  );
}
