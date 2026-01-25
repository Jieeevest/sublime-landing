"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetMeQuery } from "@/redux/api/sublimeApi";

export default function CmsTopbar() {
  const router = useRouter();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [language, setLanguage] = useState("EN");

  const { data: user, isLoading } = useGetMeQuery(undefined);

  const toggleLanguage = () => {
    setIsLangOpen(!isLangOpen);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsLangOpen(false);
  };

  const selectLanguage = (lang: string) => {
    setLanguage(lang);
    setIsLangOpen(false);
  };

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
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
    <div className="bg-[#F5F9FA] px-10 py-6 flex items-center justify-between gap-6 z-30 relative border-b border-gray-200">
      {/* CMS Title / Breadcrumbs (Placeholder) */}
      <div className="flex-1 max-w-3xl">
        <h1 className="text-2xl font-semibold text-gray-800">Admin CMS</h1>
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
            <span className="text-base text-gray-500">{language}</span>
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
                  language === "ID"
                    ? "text-primary font-medium"
                    : "text-gray-700"
                }`}
              >
                ID (Indonesia)
              </button>
              <button
                onClick={() => selectLanguage("EN")}
                className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${
                  language === "EN"
                    ? "text-primary font-medium"
                    : "text-gray-700"
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

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden w-[240px] z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.data?.name || "Admin User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.data?.email || "admin@sublime.com"}
                </p>
                <div className="mt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                    {user?.data?.role || "Admin"}
                  </span>
                </div>
              </div>
              <div className="p-2 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
