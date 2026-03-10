"use client";

import { useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { useForgotPasswordMutation } from "@/redux/api/sublimeApi";
import { toast } from "react-hot-toast";
import { useI18n } from "@/i18n";

export default function ForgotPasswordForm() {
  const { t } = useI18n();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      await forgotPassword({ email }).unwrap();
      toast.success(t("auth_forgot_success_toast"));
      setIsSubmitted(true);
    } catch (err: unknown) {
      const msg =
        (err as { data?: { message?: string } })?.data?.message ||
        t("auth_forgot_failed");
      setErrorMsg(msg);
      toast.error(msg);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center gap-10 w-full">
        {/* Success Icon - Mail */}
        <div className="w-24 h-24 flex items-center justify-center">
          <NextImage
            src="/icons/icon-forgot-password.svg"
            alt="Forgot password icon"
            width={96}
            height={96}
            className="object-contain"
          />
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
            {t("auth_forgot_check_email")}
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
              {t("auth_forgot_sent_prefix")} <strong>{email}</strong>
              {t("auth_forgot_sent_suffix")}
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
          {t("auth_back_to_login")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      {/* Lock Icon */}
      <div className="w-24 h-24 flex items-center justify-center">
        <NextImage
          src="/icons/icon-forgot-password.svg"
          alt="Forgot password icon"
          width={96}
          height={96}
          className="object-contain"
        />
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
          {t("auth_forgot_title")}
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
            {t("auth_forgot_desc")}
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
            {t("auth_email")}
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full min-w-[120px] h-11 flex items-center justify-center px-3 py-2 bg-[#3197A5] text-[#F5F9FA] text-base font-normal rounded-[99px] hover:bg-[#2a8694] transition-colors"
        >
          {isLoading ? t("auth_processing") : t("auth_forgot_submit")}
        </button>

        {errorMsg && (
          <div className="text-red-500 text-sm text-center">{errorMsg}</div>
        )}

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
          {t("auth_back_to_login")}
        </Link>
      </form>
    </div>
  );
}
