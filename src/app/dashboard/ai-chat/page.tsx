"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Image from "next/image";
import { useState } from "react";

export default function AIChatPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const dummyChats = [
    "Lorem ipsum dolor sit amet consectetur. Eu ri...",
    "Lorem ipsum dolor sit amet consectetur. Aug...",
    "Apa yang harus saya lakukan saat merasa ce...",
    "Lorem ipsum dolor sit amet consectetur. Con...",
    "Lorem ipsum dolor sit amet consectetur. In vit...",
    "Lorem ipsum dolor sit amet consectetur. Habi...",
  ];

  return (
    <DashboardLayout activeItem="AI Chat">
      <div className="flex h-[calc(100vh-100px)] w-full max-w-[1347px] mx-auto border-t border-[#E1E1E1] box-border">
        {/* Chat Navigation Sidebar */}
        <div className="w-[320px] h-full flex flex-col items-center border-r border-[#E1E1E1] pb-[104px]">
          {/* Header */}
          <div className="w-full flex justify-between items-center px-6 py-4 gap-[136px]">
            <div className="flex items-center gap-2">
              <Image
                src="/strovia-log.png"
                alt="SUBLIME"
                width={140}
                height={40}
                className="object-contain h-10 w-auto"
              />
            </div>
            {/* Collapse/Menu Icon Placeholder */}
            <div className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8E8E8E"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18" />
              </svg>
            </div>
          </div>

          {/* Actions Stack */}
          <div className="w-full flex flex-col items-center px-6 py-4 gap-4">
            {/* New Chat Button */}
            <button className="w-[272px] h-11 bg-[#3197A5] rounded-full flex items-center justify-center gap-2 text-white hover:bg-[#288a96] transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <span className="font-sans font-normal text-base">
                Obrolan Baru
              </span>
            </button>

            {/* Search Bar */}
            <div className="w-[272px] h-[54px] border border-[#E1E1E1] rounded-lg flex items-center px-[14px] bg-white">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8E8E8E"
                strokeWidth="1.5"
                className="mr-2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Cari Obrolan"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full outline-none text-[#1F1F1F] placeholder:text-[#8E8E8E] font-sans text-sm bg-transparent"
              />
            </div>
          </div>

          {/* Chat List Header */}
          <div className="w-full flex justify-between items-center px-6 h-10 border-y border-dashed border-[#E1E1E1]">
            <span className="text-[#8E8E8E] font-medium text-xs font-sans">
              Obrolan Anda
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8E8E8E"
              strokeWidth="1.5"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>

          {/* Chat List */}
          <div className="w-full flex-1 overflow-y-auto px-4 py-2 space-y-1">
            {dummyChats.map((chat, index) => (
              <div
                key={index}
                className="w-full h-11 rounded-full flex items-center px-4 hover:bg-gray-50 cursor-pointer"
              >
                <span className="text-[#1F1F1F] text-sm font-sans truncate w-full">
                  {chat}
                </span>
              </div>
            ))}
          </div>

          {/* Delete Chat Action */}
          <div className="w-full px-6 pt-2 border-t border-dashed border-[#E1E1E1] mt-auto">
            <button className="w-[272px] h-11 flex items-center justify-center gap-1 text-[#F64C4C] hover:bg-red-50 rounded-full transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
              <span className="font-sans font-normal text-base">
                Hapus Obrolan
              </span>
            </button>
          </div>
        </div>

        {/* Main Chat Content */}
        <div className="flex-1 flex flex-col items-center justify-center relative p-10">
          {/* Background Elements (Gradients/Blur based on CSS) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Placeholders for complex background images/gradients */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] opacity-10 bg-gradient-to-r from-[#55BDC0] to-[#3197A5] blur-3xl rounded-full"></div>
          </div>

          {/* Hero Section */}
          <div className="z-10 flex flex-col items-center gap-4 mb-10 text-center">
            <div className="relative mb-4">
              {/* Robot/Avatar Icon */}
              {/* Fallback if no robot image */}
              <div className="w-[90px] h-[90px] bg-white rounded-2xl shadow-lg flex items-center justify-center">
                <Image
                  src="/robot.png"
                  alt="AI Robot"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>

            <h1 className="text-[40px] font-bold font-sans leading-tight bg-gradient-to-r from-[#3197A5] to-[#55BDC0] bg-clip-text text-transparent">
              Hi, Kiara <br />
              <span className="text-[#1F1F1F]">
                Ada yang bisa saya bantu kah?
              </span>
            </h1>
            <p className="text-[#1F1F1F] text-base font-sans">
              Siap membantu kapanpun Anda butuh dukungan informasi dan diskusi.
            </p>
          </div>

          {/* Suggestions Grid */}
          <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-[947px] mb-10">
            {[
              "Rekomendasikan audio terapi yang cocok untuk kondisiku.",
              "Apa yang harus saya lakukan saat merasa cemas atau tidak stabil?",
              "Jelaskan manfaat subliminal message untuk pemulihan stroke.",
            ].map((text, i) => (
              <div
                key={i}
                className="bg-[rgba(31,31,31,0.04)] border border-[rgba(31,31,31,0.08)] rounded-lg p-4 cursor-pointer hover:bg-[rgba(31,31,31,0.08)] transition-colors h-[74px] flex items-center justify-center"
              >
                <p className="text-[#1F1F1F] text-sm font-sans text-center leading-snug">
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="z-10 w-full max-w-[947px]">
            <div className="w-full h-[54px] bg-white border border-[#E1E1E1] rounded-full flex items-center px-4 shadow-sm focus-within:border-[#3197A5] transition-colors">
              {/* Plus Button */}
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#1F1F1F] mr-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>

              {/* Input Field */}
              <input
                type="text"
                placeholder="Tanya apapun..."
                className="flex-1 h-full outline-none text-[#1F1F1F] placeholder:text-[#8E8E8E] font-sans text-sm bg-transparent"
              />

              {/* Right Actions */}
              <div className="flex items-center gap-2 ml-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#1F1F1F]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3197A5] text-white hover:bg-[#288a96] transition-colors shadow-md">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 2 11 13" />
                    <path d="M22 2 15 22 11 13 2 9 22 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
