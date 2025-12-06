"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/strovia-logo-white.png"
              alt="Strovia Logo"
              width={141}
              height={28}
              className="object-contain"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(24%) sepia(28%) saturate(1847%) hue-rotate(163deg) brightness(95%) contrast(97%)",
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/dashboard"
              className="text-secondary font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/dashboard/library"
              className="text-secondary/60 font-medium hover:text-primary transition-colors"
            >
              Library
            </Link>
            <Link
              href="/dashboard/favorites"
              className="text-secondary/60 font-medium hover:text-primary transition-colors"
            >
              Favorites
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                U
              </div>
              <span className="text-sm font-medium text-secondary">User</span>
              <svg
                className="w-4 h-4 text-secondary/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link
                href="/dashboard"
                className="text-secondary font-medium hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/dashboard/library"
                className="text-secondary/60 font-medium hover:text-primary transition-colors"
              >
                Library
              </Link>
              <Link
                href="/dashboard/favorites"
                className="text-secondary/60 font-medium hover:text-primary transition-colors"
              >
                Favorites
              </Link>
              <div className="border-t border-gray-200 pt-4">
                <Link
                  href="/"
                  className="text-sm text-secondary/60 hover:text-primary transition-colors"
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
