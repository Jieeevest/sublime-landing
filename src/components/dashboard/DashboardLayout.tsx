"use client";

import Sidebar from "./Sidebar";
import DashboardTopbar from "./DashboardTopbar";
import AudioPlayer from "../audio/AudioPlayer";

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeItem?: string;
}

export default function DashboardLayout({
  children,
  activeItem,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#F5F9FA]">
      <Sidebar activeItem={activeItem} />

      <div className="flex flex-1 flex-col pb-[88px] md:ml-[93px] md:pb-0">
        <DashboardTopbar />
        <main className="flex-1">{children}</main>
        <AudioPlayer />
      </div>
    </div>
  );
}
