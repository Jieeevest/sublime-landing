"use client";

import { useState } from "react";

export default function DashboardTopbar() {
  return (
    <div className="bg-[#F5F9FA] px-10 py-6 flex items-center justify-between gap-6">
      {/* Search Bar */}
      <div className="flex-1 max-w-3xl">
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Cari"
            className="w-full pl-11 pr-4 py-3.5 border border-[#E1E1E1] rounded-lg text-sm text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Premium Button */}
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-full text-base font-normal hover:bg-primary-600 transition-colors whitespace-nowrap">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Mulai Berlangganan
        </button>

        {/* Language Selector */}
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg
            className="w-4.5 h-4.5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
          <span className="text-base text-gray-500">EN</span>
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Notification */}
        <button className="relative p-3 hover:bg-gray-100 rounded-full transition-colors">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              opacity="0.32"
              d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
            />
            <path d="M12 6c-2.76 0-5 2.24-5 5v5l-2 2h14l-2-2v-5c0-2.76-2.24-5-5-5z" />
          </svg>
          <span className="absolute top-2 right-2 min-w-[20px] h-5 px-1.5 bg-[#F64C4C] rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-medium">3</span>
          </span>
        </button>

        {/* User Profile */}
        <button className="flex items-center hover:bg-gray-50 rounded-lg transition-colors">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center overflow-hidden">
            <span className="text-white text-sm font-semibold">U</span>
          </div>
        </button>
      </div>
    </div>
  );
}
