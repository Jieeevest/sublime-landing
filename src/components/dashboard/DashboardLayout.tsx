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
    <div className="min-h-screen bg-[#F5F9FA] flex">
      <Sidebar activeItem={activeItem} />

      <div className="flex-1 ml-[93px] flex flex-col">
        <DashboardTopbar />
        <main className="flex-1 overflow-auto pb-32">{children}</main>
        <AudioPlayer />
      </div>
    </div>
  );
}
