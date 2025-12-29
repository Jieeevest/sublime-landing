"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add forgot password logic here
    console.log("Forgot password request:", { email });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center gap-10 w-full">
        {/* Success Icon - Mail */}
        <div className="w-24 h-24 flex items-center justify-center">
          <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
            <path
              d="M12 20h72a4 4 0 0 1 4 4v48a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V24a4 4 0 0 1 4-4z"
              fill="#3197A5"
              opacity="0.5"
            />
            <path
              d="M12 20l36 24 36-24"
              stroke="#3197A5"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* Header */}
        <div className="flex flex-col items-start gap-4 w-full">
          <h2
            className="w-full font-medium text-center"
            style={{
              fontSize: "24px",
              lineHeight: "32px",
              color: "#1F1F1F",
            }}
          >
            Periksa email Anda
          </h2>

          <div className="w-full">
            <p
              className="font-normal text-center"
              style={{
                fontSize: "14px",
                lineHeight: "150%",
                color: "#1F1F1F",
              }}
            >
              Kami telah mengirimkan tautan reset kata sandi ke{" "}
              <strong>{email}</strong>. Silakan periksa inbox Anda dan ikuti
              instruksinya.
            </p>
          </div>
        </div>

        {/* Back to Login Link */}
        <Link
          href="/login"
          className="flex flex-row justify-end items-center gap-1 text-[#3197A5] hover:underline"
          style={{
            fontSize: "14px",
            lineHeight: "150%",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Kembali ke halaman masuk
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      {/* Lock Icon */}
      <div className="w-24 h-24 flex items-center justify-center">
        <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
          {/* Lock body */}
          <rect
            x="24"
            y="44"
            width="48"
            height="36"
            rx="4"
            fill="#3197A5"
            opacity="0.5"
          />
          {/* Lock shackle */}
          <path
            d="M32 44V32a16 16 0 0 1 32 0v12"
            stroke="#3197A5"
            strokeWidth="4"
            fill="none"
          />
          {/* Question mark */}
          <circle cx="48" cy="58" r="3" fill="#3197A5" />
          <path
            d="M48 50v-2a4 4 0 0 1 4-4"
            stroke="#3197A5"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Header */}
      <div className="flex flex-col items-start gap-4 w-full">
        <h2
          className="w-full font-medium text-center"
          style={{
            fontSize: "24px",
            lineHeight: "32px",
            color: "#1F1F1F",
          }}
        >
          Lupa kata sandi Anda?
        </h2>

        <div className="w-full">
          <p
            className="font-normal text-center"
            style={{
              fontSize: "14px",
              lineHeight: "150%",
              color: "#1F1F1F",
            }}
          >
            Silakan masukkan alamat email yang terkait dengan akun Anda, dan
            kami akan mengirimkan tautan melalui email untuk mengatur ulang kata
            sandi Anda.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6 w-full"
      >
        {/* Email Field */}
        <div className="relative w-full">
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full min-w-[120px] h-11 flex items-center justify-center px-3 py-2 bg-[#3197A5] text-[#F5F9FA] text-base font-normal rounded-[99px] hover:bg-[#2a8694] transition-colors"
        >
          Kirim Permintaan
        </button>

        {/* Back to Login Link */}
        <Link
          href="/login"
          className="flex flex-row justify-end items-center gap-1 text-[#3197A5] hover:underline"
          style={{
            fontSize: "14px",
            lineHeight: "150%",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Kembali ke halaman masuk
        </Link>
      </form>
    </div>
  );
}
