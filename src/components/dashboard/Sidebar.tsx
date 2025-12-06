"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
  activeItem?: string;
}

export default function Sidebar({ activeItem = "Home" }: SidebarProps) {
  const menuItems = [
    { id: "home", label: "Home", icon: "home", href: "/dashboard" },
    {
      id: "artikel",
      label: "Artikel",
      icon: "article",
      href: "/dashboard/artikel",
    },
    {
      id: "ai-chat",
      label: "AI Chat",
      icon: "chat",
      href: "/dashboard/ai-chat",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-primary flex flex-col items-center py-6 z-40">
      {/* Logo */}
      <Link href="/dashboard" className="mb-8">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
          <svg
            className="w-8 h-8 text-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </div>
      </Link>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col gap-6">
        {menuItems.map((item) => {
          const isActive = activeItem.toLowerCase() === item.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-colors ${
                isActive ? "bg-white/20" : "hover:bg-white/10"
              }`}
            >
              {item.icon === "home" && (
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              )}
              {item.icon === "article" && (
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {item.icon === "chat" && (
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span className="text-xs text-white font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
