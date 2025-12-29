"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add authentication logic here
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-medium leading-8 text-[#1F1F1F]">
          Masuk ke Strovia
        </h2>
        <div className="flex items-center gap-0 text-sm">
          <span className="text-[#1F1F1F]">Pengguna baru?</span>
          <Link
            href="/register"
            className="text-[#3197A5] hover:underline ml-1"
          >
            Buat akun
          </Link>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Email Field */}
        <div className="relative">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=" "
            className="peer w-full h-[54px] px-[14px] text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg outline-none focus:border-[#3197A5] transition-colors"
          />
          <label
            htmlFor="email"
            className="absolute left-[14px] top-1/2 -translate-y-1/2 px-[2px] text-xs text-[#8E8E8E] bg-white pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
          >
            Email
          </label>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
              className="peer w-full h-[54px] px-[14px] text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg outline-none focus:border-[#3197A5] transition-colors"
            />
            <label
              htmlFor="password"
              className="absolute left-[14px] top-1/2 -translate-y-1/2 px-[2px] text-xs text-[#8E8E8E] bg-white pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
            >
              Password
            </label>

            {/* Eye Icon Toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-[#8E8E8E] hover:text-[#1F1F1F] transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                {showPassword ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-[#3197A5] hover:underline"
            >
              Lupa Kata Sandi?
            </Link>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full min-w-[120px] h-11 flex items-center justify-center px-3 py-2 bg-[#3197A5] text-white text-base font-normal rounded-[99px] hover:bg-[#2a8694] transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
