"use client";

import Link from "next/link";

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
    <aside className="fixed left-0 top-0 h-full w-[93px] bg-primary flex flex-col items-center py-0 z-40 border-r border-dashed border-white">
      {/* Logo */}
      <Link
        href="/dashboard"
        className="flex items-center justify-center py-4 w-full h-[72px]"
      >
        <div className="w-7 h-7 bg-white rounded-sm flex items-center justify-center">
          <svg
            className="w-5 h-5 text-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </div>
      </Link>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col items-center px-2 gap-6 pt-10">
        {menuItems.map((item) => {
          const isActive = activeItem.toLowerCase() === item.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-2 w-[77px] h-[77px] rounded-2xl transition-all ${
                isActive ? "bg-white/16" : "hover:bg-white/8"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
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
                  className={`text-sm text-white font-medium ${
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
