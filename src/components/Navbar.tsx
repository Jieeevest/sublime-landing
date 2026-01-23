"use client";

import { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className="absolute flex flex-row justify-between items-center"
      style={{
        padding: "12px 90px",
        gap: "10px",
        width: "100%",
        height: "68px",
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
          padding: "0px 24px",
          gap: "20px",
          width: "498px",
          height: "44px",
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
            width: "108px",
            height: "44px",
          }}
        >
          <span
            className="font-normal text-center text-[#1F1F1F]/70 hover:text-[#3197A5] transition-colors duration-200"
            style={{
              width: "92px",
              height: "24px",
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "14px",
              lineHeight: "24px",
            }}
          >
            Tentang Kami
          </span>
        </Link>

        <Link
          href="#cara-kerja"
          className="flex flex-col justify-center items-center rounded"
          style={{
            padding: "8px",
            width: "87px",
            height: "44px",
          }}
        >
          <span
            className="font-normal text-center text-[#1F1F1F]/70 hover:text-[#3197A5] transition-colors duration-200"
            style={{
              width: "71px",
              height: "24px",
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "14px",
              lineHeight: "24px",
            }}
          >
            Cara Kerja
          </span>
        </Link>

        <Link
          href="#manfaat"
          className="flex flex-col justify-center items-center rounded"
          style={{
            padding: "8px",
            width: "71px",
            height: "44px",
          }}
        >
          <span
            className="font-normal text-center text-[#1F1F1F]/70 hover:text-[#3197A5] transition-colors duration-200"
            style={{
              width: "55px",
              height: "24px",
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "14px",
              lineHeight: "24px",
            }}
          >
            Manfaat
          </span>
        </Link>

        <Link
          href="#artikel"
          className="flex flex-col justify-center items-center rounded"
          style={{
            padding: "8px",
            width: "58px",
            height: "44px",
          }}
        >
          <span
            className="font-normal text-center text-[#1F1F1F]/70 hover:text-[#3197A5] transition-colors duration-200"
            style={{
              width: "42px",
              height: "24px",
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "14px",
              lineHeight: "24px",
            }}
          >
            Artikel
          </span>
        </Link>

        <Link
          href="#faq"
          className="flex flex-col justify-center items-center rounded"
          style={{
            padding: "8px",
            width: "46px",
            height: "44px",
          }}
        >
          <span
            className="font-normal text-center text-[#1F1F1F]/70 hover:text-[#3197A5] transition-colors duration-200"
            style={{
              width: "30px",
              height: "24px",
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "14px",
              lineHeight: "24px",
            }}
          >
            FAQ
          </span>
        </Link>
      </div>

      {/* Right Menu - Language & Login */}
      <div
        className="flex flex-row justify-end items-center"
        style={{
          gap: "20px",
          width: "245px",
          height: "44px",
          margin: "0 auto",
        }}
      >
        {/* Language Dropdown */}
        <div
          className="flex flex-col items-start"
          style={{
            gap: "4px",
            width: "103px",
            height: "44px",
          }}
        >
          <button
            className="flex flex-row items-center"
            style={{
              padding: "8px 12px",
              gap: "8px",
              width: "97px",
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
                width: "15px",
                fontFamily: "'PP Neue Montreal', sans-serif",
                fontSize: "14px",
                lineHeight: "24px",
                color: "#1F1F1F",
              }}
            >
              ID
            </span>

            {/* Chevron Down Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1F1F1F"
              strokeWidth="1.5"
            >
              <path
                d="M6 9l6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Login Button */}
        <Link
          href="/login"
          className="flex flex-col justify-center items-center rounded-[99px]"
          style={{
            padding: "8px 12px",
            width: "122px",
            minWidth: "120px",
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
            className="font-normal text-center"
            style={{
              width: "98px",
              height: "24px",
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "14px",
              lineHeight: "24px",
              color: "#FFFFFF",
            }}
          >
            Masuk / Daftar
          </span>
        </Link>
      </div>
    </nav>
  );
}
