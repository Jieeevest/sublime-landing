"use client";

import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
  activeItem?: string;
}

type MenuItem = {
  id: string;
  label: string;
  href: string;
  icon: "home" | "article" | "chat";
};

const menuItems: MenuItem[] = [
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

function normalize(str: string) {
  return str.toLowerCase().trim();
}

function isItemActive(activeItem: string, item: MenuItem) {
  const value = normalize(activeItem);
  if (!value) return item.id === "home";

  return (
    value === item.id ||
    value === normalize(item.label) ||
    (item.id === "artikel" && value.includes("article")) ||
    (item.id === "ai-chat" && value.includes("chat"))
  );
}

function MenuIcon({ icon, isActive }: { icon: MenuItem["icon"]; isActive: boolean }) {
  if (icon === "home") {
    return (
      <svg
        className={`h-6 w-6 text-white ${isActive ? "opacity-100" : "opacity-50"}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    );
  }

  if (icon === "article") {
    return (
      <svg
        className={`h-6 w-6 text-white ${isActive ? "opacity-100" : "opacity-50"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h6M9 13h6M9 17h3" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      className={`h-6 w-6 text-white ${isActive ? "opacity-100" : "opacity-50"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        d="M10 2c-4.418 0-8 3.134-8 7 0 1.434.493 2.767 1.338 3.877L2 17l4.083-.98A8.841 8.841 0 0010 17c4.418 0 8-3.134 8-7s-3.582-7-8-7z"
        opacity="0.5"
      />
      <ellipse cx="10" cy="9" rx="0.5" ry="0.5" fill="white" />
    </svg>
  );
}

export default function Sidebar({ activeItem = "Home" }: SidebarProps) {
  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-full w-[93px] flex-col items-center border-r border-dashed border-white bg-primary py-0 md:flex">
        <Link
          href="/dashboard"
          className="flex h-[72px] w-full items-center justify-center py-4"
        >
          <div className="flex h-12 w-12 items-center justify-center">
            <Image
              src="/strovia-logo-sidebar.svg"
              alt="Strovia Logo"
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </div>
        </Link>

        <nav className="flex flex-1 flex-col items-center gap-6 px-2 pt-10">
          {menuItems.map((item) => {
            const active = isItemActive(activeItem, item);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex h-[77px] w-[77px] flex-col items-center justify-center gap-2 rounded-2xl transition-all ${
                  active ? "bg-white/16" : "hover:bg-white/8"
                }`}
              >
                <MenuIcon icon={item.icon} isActive={active} />
                <span className="text-sm font-medium text-white">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E1E1E1] bg-primary/95 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around gap-1">
          {menuItems.map((item) => {
            const active = isItemActive(activeItem, item);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-white transition-all ${
                  active ? "bg-white/16" : "opacity-85"
                }`}
              >
                <MenuIcon icon={item.icon} isActive={active} />
                <span className="truncate text-[11px] font-medium leading-4">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
