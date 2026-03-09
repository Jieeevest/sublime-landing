"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetMeQuery, sublimeApi } from "@/redux/api/sublimeApi";
import { useDispatch } from "react-redux";
import UserDropdown from "@/components/shared/UserDropdown";
import { useI18n } from "@/i18n";

export default function CmsTopbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangSwitching, setIsLangSwitching] = useState(false);
  const [isLangSwitchingExit, setIsLangSwitchingExit] = useState(false);
  const langSwitchTimers = useRef<number[]>([]);
  const { code, setLang, t } = useI18n();

  const { data: user, isLoading } = useGetMeQuery(undefined);

  const toggleLanguage = () => {
    setIsLangOpen(!isLangOpen);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsLangOpen(false);
  };

  const selectLanguage = (lang: "ID" | "EN") => {
    const nextLang = lang === "EN" ? "en" : "id";
    const currentLang = code === "EN" ? "en" : "id";
    if (nextLang === currentLang) {
      setIsLangOpen(false);
      return;
    }

    langSwitchTimers.current.forEach((id) => window.clearTimeout(id));
    langSwitchTimers.current = [];

    setIsLangSwitchingExit(false);
    setIsLangSwitching(true);
    setIsLangOpen(false);

    langSwitchTimers.current.push(
      window.setTimeout(() => setLang(nextLang), 140),
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
    },
    []
  );

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Clear RTK Query Cache
    dispatch(sublimeApi.util.resetApiState());
    // Redirect to login
    router.push("/login?redirect_reason=logout");
  };

  // Get user initials
  const getInitials = (name: string) => {
    if (!name) return "A";
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
      <div className="bg-[#F5F9FA] px-10 py-6 flex items-center justify-between gap-6 z-30 relative border-b border-gray-200">
        <div className="flex-1 max-w-3xl">
          <h1 className="text-2xl font-semibold text-gray-800">
            {t("cmsTitle")}
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
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
              <span className="text-base text-gray-500">{code}</span>
              <svg
                className={`w-6 h-6 text-gray-500 transition-transform ${
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

            {/* Language Dropdown */}
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden min-w-[140px] z-50 animate-in fade-in zoom-in-95 duration-100">
                <button
                  onClick={() => selectLanguage("ID")}
                  className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${
                    code === "ID" ? "text-primary font-medium" : "text-gray-700"
                  }`}
                >
                  ID (Indonesia)
                </button>
                <button
                  onClick={() => selectLanguage("EN")}
                  className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${
                    code === "EN" ? "text-primary font-medium" : "text-gray-700"
                  }`}
                >
                  EN (English)
                </button>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center hover:bg-gray-50 rounded-lg transition-colors p-1"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center overflow-hidden ring-2 ring-transparent hover:ring-primary/20 transition-all">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span className="text-white text-sm font-semibold">
                    {getInitials(user?.data?.name || "Admin")}
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
    </>
  );
}
