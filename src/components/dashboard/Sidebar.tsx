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
  const src =
    icon === "home"
      ? "/icons/icon-home.svg"
      : icon === "article"
        ? "/icons/icon-article.svg"
        : "/icons/icon-chat.svg";

  return (
    <Image
      src={src}
      alt={icon}
      width={24}
      height={24}
      className={`h-6 w-6 object-contain ${isActive ? "opacity-100" : "opacity-50"}`}
    />
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
