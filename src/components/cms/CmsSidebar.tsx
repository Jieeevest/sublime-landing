"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function CmsSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "home",
      href: "/cms/dashboard",
    },
    {
      id: "artikel",
      label: "Artikel",
      icon: "article",
      href: "/cms/artikel",
    },
    {
      id: "audio",
      label: "Audio",
      icon: "audio",
      href: "/cms/audio",
    },
    {
      id: "subscriptions",
      label: "Subs",
      icon: "card",
      href: "/cms/subscriptions",
    },
    {
      id: "affiliates",
      label: "Affiliates",
      icon: "users",
      href: "/cms/affiliates",
    },
    {
      id: "prompts",
      label: "Prompts",
      icon: "chat",
      href: "/cms/prompts",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[93px] bg-primary flex flex-col items-center py-0 z-40 border-r border-dashed border-white">
      {/* Logo */}
      <Link
        href="/cms/dashboard"
        className="flex items-center justify-center py-4 w-full h-[72px]"
      >
        <div className="w-12 h-12 flex items-center justify-center">
          <Image
            src="/strovia-logo-sidebar.svg"
            alt="Strovia Logo"
            width={48}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>
      </Link>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col items-center px-2 gap-4 pt-6 overflow-y-auto no-scrollbar pb-6">
        {menuItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 w-[77px] h-[77px] rounded-2xl transition-all flex-shrink-0 ${
                isActive ? "bg-white/16" : "hover:bg-white/8"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                {item.icon === "home" && (
                  <svg
                    className={`w-6 h-6 text-white ${
                      isActive ? "opacity-100" : "opacity-50"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                )}
                {item.icon === "article" && (
                  <svg
                    className={`w-6 h-6 text-white ${
                      isActive ? "opacity-100" : "opacity-50"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <path d="M9 9h6M9 13h6M9 17h3" strokeLinecap="round" />
                  </svg>
                )}
                {item.icon === "audio" && (
                  <svg
                    className={`w-6 h-6 text-white ${
                      isActive ? "opacity-100" : "opacity-50"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                )}
                {item.icon === "card" && (
                  <svg
                    className={`w-6 h-6 text-white ${
                      isActive ? "opacity-100" : "opacity-50"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                )}
                {item.icon === "users" && (
                  <svg
                    className={`w-6 h-6 text-white ${
                      isActive ? "opacity-100" : "opacity-50"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                )}
                {item.icon === "chat" && (
                  <svg
                    className={`w-6 h-6 text-white ${
                      isActive ? "opacity-100" : "opacity-50"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 2c-4.418 0-8 3.134-8 7 0 1.434.493 2.767 1.338 3.877L2 17l4.083-.98A8.841 8.841 0 0010 17c4.418 0 8-3.134 8-7s-3.582-7-8-7z"
                      opacity="0.5"
                    />
                    <ellipse cx="10" cy="9" rx="0.5" ry="0.5" fill="white" />
                  </svg>
                )}
                <span
                  className={`text-[10px] text-white font-medium ${
                    isActive ? "opacity-100" : "opacity-100"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
