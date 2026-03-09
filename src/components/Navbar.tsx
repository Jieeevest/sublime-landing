"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetMeQuery, sublimeApi } from "@/redux/api/sublimeApi";
import { useDispatch } from "react-redux";
import { useI18n } from "@/i18n";
import UserDropdown from "@/components/shared/UserDropdown";
import Link from "next/link";
import NextImage from "next/image";

const getInitials = (name: string) => {
  if (!name) return "A";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

export default function Navbar() {
  const { lang, setLang, t, code } = useI18n();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangSwitching, setIsLangSwitching] = useState(false);
  const [isLangSwitchingExit, setIsLangSwitchingExit] = useState(false);
  const langSwitchTimers = useRef<number[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const read = () => {
      try {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
      } catch {
        setIsAuthenticated(false);
      }
    };
    read();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "token") read();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setHydrated(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const {
    data: me,
    isLoading: isMeLoading,
    isFetching: isMeFetching,
  } = useGetMeQuery(undefined, { skip: !isAuthenticated });
  const avatar = me?.data?.avatar || "/user-1.png";
  const name = me?.data?.name || "Akun";
  const isUserLoading = isAuthenticated && (isMeLoading || isMeFetching);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
    } catch {}
    dispatch(sublimeApi.util.resetApiState());
    setIsAuthenticated(false);
    setIsUserMenuOpen(false);
    router.push("/login");
  };

  const toggleLanguage = () => setIsLangOpen(!isLangOpen);
  const selectLanguage = (l: string) => {
    const nextLang = l === "EN" ? "en" : "id";
    if (nextLang === lang) {
      setIsLangOpen(false);
      return;
    }
    langSwitchTimers.current.forEach((id) => window.clearTimeout(id));
    langSwitchTimers.current = [];
    setIsLangSwitchingExit(false);
    setIsLangSwitching(true);
    setIsLangOpen(false);
    langSwitchTimers.current.push(
      window.setTimeout(() => setLang(nextLang), 130),
      window.setTimeout(() => setIsLangSwitchingExit(true), 560),
      window.setTimeout(() => {
        setIsLangSwitching(false);
        setIsLangSwitchingExit(false);
      }, 760)
    );
  };
  useEffect(
    () => () => {
      langSwitchTimers.current.forEach((id) => window.clearTimeout(id));
      langSwitchTimers.current = [];
    },
    []
  );
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
              {lang === "id" ? "Mengganti bahasa..." : "Switching language..."}
            </p>
          </div>
        </div>
      )}
      <nav
        className="absolute flex flex-row justify-between items-center"
        style={{
          padding: "12px 56px",
          gap: "8px",
          width: "100%",
          height: "64px",
          left: "0px",
          top: "0px",
          backdropFilter: "blur(20px)",
          borderRadius: "0px",
          zIndex: 8,
          maxWidth: "100vw",
        }}
      >
      {/* Logo */}
      <Link
        href="#beranda"
        className="flex flex-row items-center"
        style={{
          gap: "8px",
          width: "141px",
          height: "28px",
          margin: "0 auto",
        }}
      >
        <NextImage
          src="/strovia-logo-white.png"
          alt="Strovia Logo"
          width={141}
          height={28}
          className="object-contain"
        />
      </Link>

      {/* Center Menu */}
      <div
        className="flex flex-row justify-center items-center rounded-[99px]"
        style={{
          padding: "0px 20px",
          gap: "16px",
          width: "498px",
          height: "42px",
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.14)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        {/* Menu Items */}
        <Link
          href="#tentang-kami"
          className="flex flex-col justify-center items-center rounded"
          style={{
            padding: "8px",
            width: "auto",
            height: "44px",
          }}
        >
          <span
            className="font-normal text-center text-[#1F1F1F]/70 hover:text-[#3197A5] transition-colors duration-200 whitespace-nowrap"
            style={{
              height: "24px",
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "14px",
              lineHeight: "24px",
            }}
          >
            {t("nav_tentang")}
          </span>
        </Link>

        <Link
          href="#cara-kerja"
          className="flex flex-col justify-center items-center rounded"
          style={{
            padding: "8px",
            width: "auto",
            height: "44px",
          }}
        >
          <span
            className="font-normal text-center text-[#1F1F1F]/70 hover:text-[#3197A5] transition-colors duration-200 whitespace-nowrap"
            style={{
              height: "24px",
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "14px",
              lineHeight: "24px",
            }}
          >
            {t("nav_cara_kerja")}
          </span>
        </Link>

        <Link
          href="#manfaat"
          className="flex flex-col justify-center items-center rounded"
          style={{
            padding: "8px",
            width: "auto",
            height: "44px",
          }}
        >
          <span
            className="font-normal text-center text-[#1F1F1F]/70 hover:text-[#3197A5] transition-colors duration-200 whitespace-nowrap"
            style={{
              height: "24px",
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "14px",
              lineHeight: "24px",
            }}
          >
            {t("nav_manfaat")}
          </span>
        </Link>

        <Link
          href="#artikel"
          className="flex flex-col justify-center items-center rounded"
          style={{
            padding: "8px",
            width: "auto",
            height: "44px",
          }}
        >
          <span
            className="font-normal text-center text-[#1F1F1F]/70 hover:text-[#3197A5] transition-colors duration-200 whitespace-nowrap"
            style={{
              height: "24px",
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "14px",
              lineHeight: "24px",
            }}
          >
            {t("nav_artikel")}
          </span>
        </Link>

        <Link
          href="#faq"
          className="flex flex-col justify-center items-center rounded"
          style={{
            padding: "8px",
            width: "auto",
            height: "44px",
          }}
        >
          <span
            className="font-normal text-center text-[#1F1F1F]/70 hover:text-[#3197A5] transition-colors duration-200 whitespace-nowrap"
            style={{
              height: "24px",
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "14px",
              lineHeight: "24px",
            }}
          >
            {t("nav_faq")}
          </span>
        </Link>
      </div>

      {/* Right Menu - Language & Login */}
      <div
        className="flex flex-row justify-end items-center"
        style={{
          gap: "12px",
          width: "auto",
          height: "44px",
          margin: "0 auto",
        }}
      >
        {/* Language Dropdown */}
        <div
          className="relative flex flex-col items-start"
          style={{
            gap: "4px",
            width: "auto",
            height: "44px",
          }}
        >
          <button
            onClick={toggleLanguage}
            className="flex flex-row items-center cursor-pointer transition-colors"
            style={{
              padding: "8px 12px",
              gap: "6px",
              width: "auto",
              height: "44px",
            }}
          >
            {/* Globe Icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1F1F1F"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>

            {/* Language Text */}
            <span
              className="font-normal flex items-center"
              style={{
                fontFamily: "'PP Neue Montreal', sans-serif",
                fontSize: "14px",
                lineHeight: "24px",
                color: "#1F1F1F",
              }}
            >
              {code}
            </span>

            {/* Chevron Down Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1F1F1F"
              strokeWidth="1.5"
              className={`transition-transform duration-200 ${
                isLangOpen ? "rotate-180" : ""
              }`}
            >
              <path
                d="M6 9l6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isLangOpen && (
            <div
              className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col z-50"
              style={{
                minWidth: "140px",
                width: "max-content",
                border: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <button
                onClick={() => selectLanguage("ID")}
                className={`px-4 py-3 text-left hover:bg-gray-50 text-sm font-medium transition-colors whitespace-nowrap ${
                  code === "ID" ? "text-[#3197A5]" : "text-[#1F1F1F]"
                }`}
              >
                ID (Indonesia)
              </button>
              <button
                onClick={() => selectLanguage("EN")}
                className={`px-4 py-3 text-left hover:bg-gray-50 text-sm font-medium transition-colors whitespace-nowrap ${
                  code === "EN" ? "text-[#3197A5]" : "text-[#1F1F1F]"
                }`}
              >
                EN (English)
              </button>
            </div>
          )}
        </div>

        {!hydrated ? (
          <div
            className="rounded-full bg-gray-200/80 animate-pulse"
            style={{ width: "122px", height: "44px" }}
            aria-busy="true"
            aria-label="Loading user"
          />
        ) : !isAuthenticated ? (
          <Link
            href="/login"
            className="flex flex-col justify-center items-center rounded-[99px]"
            style={{
              padding: "8px 12px",
              width: "auto",
              minWidth: "122px",
              height: "44px",
              background: "#3197A5",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 10px 15px -3px rgba(49, 151, 165, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span
              className="font-normal text-center whitespace-nowrap"
              style={{
                height: "24px",
                fontFamily: "'PP Neue Montreal', sans-serif",
                fontSize: "14px",
                lineHeight: "24px",
                color: "#FFFFFF",
              }}
            >
              {t("nav_login")}
            </span>
          </Link>
        ) : isUserLoading ? (
          <div className="flex items-center rounded-lg p-1">
            <div
              className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"
              aria-busy="true"
              aria-label="Loading avatar"
            />
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen((v) => !v)}
              className="flex items-center rounded-lg transition-colors p-1"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center overflow-hidden ring-2 ring-transparent hover:ring-primary/20 transition-all">
                <span className="text-white text-sm font-semibold">
                  {getInitials(name)}
                </span>
              </div>
            </button>

            {isUserMenuOpen && (
              <UserDropdown
                onClose={() => setIsUserMenuOpen(false)}
                onLogout={handleLogout}
                includeDashboardLinks
              />
            )}
          </div>
        )}
      </div>
      </nav>
    </>
  );
}
