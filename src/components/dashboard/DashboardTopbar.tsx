"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  useGetMeQuery,
  useGetMySubscriptionQuery,
  sublimeApi,
} from "@/redux/api/sublimeApi";
import { useDispatch } from "react-redux";
import UserDropdown from "@/components/shared/UserDropdown";
import { useI18n } from "@/i18n";

export default function DashboardTopbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { code, setLang, t } = useI18n();

  const { data: user, isLoading } = useGetMeQuery(undefined);
  const { data: subscription, isLoading: isSubLoading } =
    useGetMySubscriptionQuery(undefined);
  const isSubscribed = subscription?.is_subscribed;

  const toggleLanguage = () => {
    setIsLangOpen(!isLangOpen);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsLangOpen(false);
  };

  const selectLanguage = (lang: "id" | "en") => {
    setLang(lang);
    setIsLangOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(sublimeApi.util.resetApiState());
    router.push("/login?redirect_reason=logout");
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="relative z-30 flex flex-col gap-3 bg-[#F5F9FA] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5 lg:px-10 lg:py-6">
      <div className="order-2 hidden w-full flex-1 sm:order-1 sm:block sm:max-w-3xl">
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 sm:h-6 sm:w-6"
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
            placeholder={t("ud_search_placeholder")}
            className="w-full rounded-lg border border-[#E1E1E1] bg-white py-3 pl-10 pr-4 text-sm text-gray-500 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:py-3.5 sm:pl-11"
          />
        </div>
      </div>

      <div className="order-1 flex w-full items-center justify-between gap-2 rounded-2xl bg-primary px-3 py-2 sm:order-2 sm:w-auto sm:justify-end sm:gap-3 sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0">
        <Link href="/dashboard" className="flex items-center sm:hidden">
          <Image
            src="/strovia-logo-white.png"
            alt="Strovia Logo"
            width={141}
            height={28}
            className="h-7 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
        {!isSubLoading && !isSubscribed && (
          <button
            onClick={() => router.push("/dashboard/subscriptions")}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-primary px-4 py-2.5 text-base font-normal text-white transition-colors hover:bg-primary-600 sm:flex"
          >
            <svg
              className="h-5 w-5"
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
            {t("ud_subscribe_start")}
          </button>
        )}

        <div className="relative">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/10 sm:gap-2 sm:px-3 sm:py-2 sm:hover:bg-gray-100"
          >
            <svg
              className="h-4 w-4 text-white sm:h-[18px] sm:w-[18px] sm:text-gray-500"
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
            <span className="text-sm text-white sm:text-base sm:text-gray-500">{code}</span>
            <svg
              className={`h-5 w-5 text-white transition-transform sm:h-10 sm:w-10 sm:text-gray-500 ${
                isLangOpen ? "rotate-180" : ""
              }`}
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

          {isLangOpen && (
            <div className="animate-in fade-in zoom-in-95 absolute right-0 top-full z-50 mt-2 min-w-[140px] overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg duration-100">
              <button
                onClick={() => selectLanguage("id")}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 ${
                  code === "ID" ? "font-medium text-primary" : "text-gray-700"
                }`}
              >
                ID (Indonesia)
              </button>
              <button
                onClick={() => selectLanguage("en")}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 ${
                  code === "EN" ? "font-medium text-primary" : "text-gray-700"
                }`}
              >
                EN (English)
              </button>
            </div>
          )}
        </div>

        <button className="relative hidden rounded-full p-3 transition-colors hover:bg-gray-100 sm:block">
          <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
            <path
              opacity="0.32"
              d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
            />
            <path d="M12 6c-2.76 0-5 2.24-5 5v5l-2 2h14l-2-2v-5c0-2.76-2.24-5-5-5z" />
          </svg>
          <span className="absolute right-2 top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#F64C4C] px-1.5">
            <span className="text-xs font-medium text-white">3</span>
          </span>
        </button>

        <div className="relative">
          <button
            onClick={toggleProfile}
            className="rounded-lg p-1 transition-colors hover:bg-white/10 sm:hover:bg-gray-50"
          >
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-primary-600 ring-2 ring-transparent transition-all hover:ring-primary/20 sm:h-10 sm:w-10">
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                <span className="text-sm font-semibold text-white">
                  {getInitials(user?.data?.name)}
                </span>
              )}
            </div>
          </button>

          {isProfileOpen && (
            <UserDropdown
              onClose={() => setIsProfileOpen(false)}
              onLogout={handleLogout}
            />
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
