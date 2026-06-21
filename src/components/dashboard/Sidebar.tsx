"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/i18n";

interface SidebarProps {
  activeItem?: string;
}

type MenuItem = {
  id: string;
  labelKey: string;
  href: string;
  icon: "home" | "article" | "chat" | "referral";
};

const menuItems: MenuItem[] = [
  { id: "home", labelKey: "breadcrumb_home", icon: "home", href: "/dashboard" },
  {
    id: "artikel",
    labelKey: "ud_menu_articles",
    icon: "article",
    href: "/dashboard/artikel",
  },
  {
    id: "ai-chat",
    labelKey: "ud_menu_ai_chat",
    icon: "chat",
    href: "/dashboard/ai-chat",
  },
  {
    id: "program-referal",
    labelKey: "ud_menu_referral_program",
    icon: "referral",
    href: "/dashboard/program-referal",
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
    value === normalize(item.href) ||
    (item.id === "artikel" && value.includes("article")) ||
    (item.id === "ai-chat" && value.includes("chat")) ||
    (item.id === "program-referal" &&
      (value.includes("referal") || value.includes("referral")))
  );
}

function MenuIcon({ icon, isActive }: { icon: MenuItem["icon"]; isActive: boolean }) {
  const src =
    icon === "home"
      ? "/icons/icon-home.svg"
      : icon === "article"
        ? "/icons/icon-article.svg"
        : icon === "chat"
          ? "/icons/icon-chat.svg"
          : "/icons/icon-berlangganan.svg";

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
  const { t } = useI18n();

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
                <span className="text-center text-[11px] font-medium leading-4 text-white">
                  {t(item.labelKey)}
                </span>
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
                <span className="truncate text-[11px] font-medium leading-4">
                  {t(item.labelKey)}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
