"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  useGetMeQuery,
  useGetNotificationsQuery,
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
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isNotifMounted, setIsNotifMounted] = useState(false);
  const [isNotifExit, setIsNotifExit] = useState(false);
  const [isLangSwitching, setIsLangSwitching] = useState(false);
  const [isLangSwitchingExit, setIsLangSwitchingExit] = useState(false);
  const langSwitchTimers = useRef<number[]>([]);
  const notifTimers = useRef<number[]>([]);
  const { code, setLang, t } = useI18n();

  const { data: user, isLoading } = useGetMeQuery(undefined);
  const { data: subscription, isLoading: isSubLoading } =
    useGetMySubscriptionQuery(undefined);
  const {
    data: notificationsData,
    isLoading: isNotifLoading,
    isFetching: isNotifFetching,
    isError: isNotifError,
  } = useGetNotificationsQuery({ page: 1, limit: 8 });
  const isSubscribed = subscription?.is_subscribed;

  type NotificationItem = {
    id: string | number;
    title?: string;
    message?: string;
    body?: string;
    created_at?: string;
    is_read?: boolean;
    read?: boolean;
  };
  const notificationsRaw = notificationsData?.data;
  const notifications: NotificationItem[] = Array.isArray(notificationsRaw)
    ? notificationsRaw
    : Array.isArray(notificationsRaw?.items)
      ? notificationsRaw.items
      : [];
  const unreadCount = notifications.reduce((count, item) => {
    const isRead = item?.is_read ?? item?.read ?? false;
    return isRead ? count : count + 1;
  }, 0);

  const closeNotif = () => {
    if (!isNotifMounted) return;
    notifTimers.current.forEach((id) => window.clearTimeout(id));
    notifTimers.current = [];
    setIsNotifExit(true);
    notifTimers.current.push(
      window.setTimeout(() => {
        setIsNotifMounted(false);
        setIsNotifExit(false);
        setIsNotifOpen(false);
      }, 180)
    );
  };

  const openNotif = () => {
    notifTimers.current.forEach((id) => window.clearTimeout(id));
    notifTimers.current = [];
    setIsNotifOpen(true);
    setIsNotifExit(false);
    setIsNotifMounted(true);
  };

  const toggleLanguage = () => {
    setIsLangOpen(!isLangOpen);
    setIsProfileOpen(false);
    closeNotif();
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsLangOpen(false);
    closeNotif();
  };

  const toggleNotif = () => {
    if (isNotifOpen) {
      closeNotif();
    } else {
      openNotif();
    }
    setIsLangOpen(false);
    setIsProfileOpen(false);
  };

  const selectLanguage = (lang: "id" | "en") => {
    const currentLang = code === "EN" ? "en" : "id";
    if (lang === currentLang) {
      setIsLangOpen(false);
      return;
    }

    langSwitchTimers.current.forEach((id) => window.clearTimeout(id));
    langSwitchTimers.current = [];

    setIsLangSwitchingExit(false);
    setIsLangSwitching(true);
    setIsLangOpen(false);

    langSwitchTimers.current.push(
      window.setTimeout(() => setLang(lang), 140),
      window.setTimeout(() => setIsLangSwitchingExit(true), 620),
      window.setTimeout(() => {
        setIsLangSwitching(false);
        setIsLangSwitchingExit(false);
      }, 860)
    );
  };

  useEffect(
    () => () => {
      langSwitchTimers.current.forEach((id) => window.clearTimeout(id));
      langSwitchTimers.current = [];
      notifTimers.current.forEach((id) => window.clearTimeout(id));
      notifTimers.current = [];
    },
    []
  );

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
    <>
      {isLangSwitching && (
        <div
          className={`fixed inset-0 z-[9998] bg-[#1F1F1F]/15 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
            isLangSwitchingExit ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className={`flex items-center gap-3 rounded-full bg-white/90 px-5 py-3 shadow-lg transition-all duration-300 ${
              isLangSwitchingExit
                ? "opacity-0 scale-[0.98] translate-y-1"
                : "opacity-100 scale-100 translate-y-0"
            }`}
          >
            <div className="h-5 w-5 rounded-full border-2 border-[#3197A5]/25 border-t-[#3197A5] animate-spin" />
            <p
              className="text-[13px] leading-5 text-[#1F1F1F]"
              style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
            >
              {code === "ID" ? "Mengganti bahasa..." : "Switching language..."}
            </p>
          </div>
        </div>
      )}
      <div className="relative z-30 flex h-20 flex-col gap-3 bg-[#F5F9FA] px-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 lg:px-10">
      <div className="hidden">
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

      <div className="order-1 ml-auto flex w-auto items-center justify-end gap-2 rounded-2xl bg-primary px-3 py-2 sm:order-2 sm:gap-3 sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0">
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
            <Image
              src="/icons/icon-berlangganan.svg"
              alt="Mulai berlangganan"
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
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
              className={`h-4 w-4 text-white transition-transform sm:h-5 sm:w-5 sm:text-gray-500 ${
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

        <div className="relative hidden sm:block">
        <button
          onClick={toggleNotif}
          className="relative rounded-full p-3 transition-colors hover:bg-gray-100"
        >
          <Image
            src="/icons/icon-notification.svg"
            alt="Notification"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
          />
          {unreadCount > 0 && (
            <span className="absolute right-2 top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#F64C4C] px-1.5">
              <span className="text-xs font-medium text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            </span>
          )}
        </button>
        {isNotifMounted && (
          <div
            className={`absolute right-0 top-full z-50 mt-2 w-[360px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-200 ${
              isNotifExit
                ? "translate-y-1 scale-[0.98] opacity-0"
                : "translate-y-0 scale-100 opacity-100"
            }`}
          >
            <div className="border-b border-gray-100 px-4 py-3">
              <p className="text-sm font-semibold text-[#1F1F1F]">
                {t("notif_title")}
              </p>
            </div>
            <div className="max-h-[380px] overflow-y-auto">
              {isNotifLoading || isNotifFetching ? (
                <div className="px-4 py-6 text-center text-sm text-gray-500">
                  {t("notif_loading")}
                </div>
              ) : isNotifError ? (
                <div className="px-4 py-6 text-center text-sm text-red-500">
                  {t("notif_error")}
                </div>
              ) : notifications.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-gray-500">
                  {t("notif_empty")}
                </div>
              ) : (
                notifications.map((notif) => {
                  const message = notif.message || notif.body || "";
                  const isRead = notif.is_read ?? notif.read ?? false;
                  return (
                    <div
                      key={String(notif.id)}
                      className={`border-b border-gray-50 px-4 py-3 last:border-b-0 ${
                        isRead ? "bg-white" : "bg-[#3197A5]/[0.04]"
                      }`}
                    >
                      <p className="text-sm font-medium text-[#1F1F1F]">
                        {notif.title || t("notif_item_fallback")}
                      </p>
                      {message ? (
                        <p className="mt-1 text-xs leading-5 text-gray-600">
                          {message}
                        </p>
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
        </div>

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
    </>
  );
}
