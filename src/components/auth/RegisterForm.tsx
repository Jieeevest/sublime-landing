"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/redux/api/sublimeApi";
import { toast } from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import { useI18n } from "@/i18n";

export default function RegisterForm() {
  const { t } = useI18n();
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /* State for Modals */
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const name = `${firstName} ${lastName}`.trim();
      const payload: {
        name: string;
        email: string;
        password: string;
        referral_code: string;
      } = {
        name,
        email,
        password,
        referral_code: referralCode ?? "",
      };

      const result = await register(payload).unwrap();

      if (result.success) {
        toast.success(t("auth_register_success"));
        if (result.data?.token) {
          localStorage.setItem("token", result.data.token);
          router.push("/dashboard");
        } else {
          router.push("/login");
        }
      } else {
        const msg = result.message || t("auth_register_failed");
        setErrorMsg(msg);
        toast.error(msg);
      }
    } catch (err: unknown) {
      const msg =
        (err as { data?: { message?: string } })?.data?.message ||
        t("auth_register_error");
      setErrorMsg(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h2
          className="font-medium leading-8"
          style={{
            fontSize: "24px",
            lineHeight: "32px",
            color: "#1F1F1F",
          }}
        >
          {t("auth_register_start_now")}
        </h2>
        <div className="flex items-center gap-0 text-sm">
          <span className="text-[#1F1F1F]">{t("auth_register_has_account")}</span>
          <Link href="/login" className="text-[#3197A5] hover:underline ml-1">
            {t("auth_login_button")}
          </Link>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Name Fields - Two Columns */}
        <div className="grid grid-cols-2 gap-4">
          {/* First Name */}
          <div className="relative">
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder=" "
              className="peer w-full h-[54px] px-[14px] text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg outline-none focus:border-[#3197A5] transition-colors"
            />
            <label
              htmlFor="firstName"
              className="absolute left-[14px] top-1/2 -translate-y-1/2 px-[2px] text-xs text-[#8E8E8E] bg-white pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
            >
              {t("auth_first_name")}
            </label>
          </div>

          {/* Last Name */}
          <div className="relative">
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder=" "
              className="peer w-full h-[54px] px-[14px] text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg outline-none focus:border-[#3197A5] transition-colors"
            />
            <label
              htmlFor="lastName"
              className="absolute left-[14px] top-1/2 -translate-y-1/2 px-[2px] text-xs text-[#8E8E8E] bg-white pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
            >
              {t("auth_last_name")}
            </label>
          </div>
        </div>

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
            {t("auth_email")}
          </label>
        </div>

        {/* Password Field */}
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
            {t("auth_password")}
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

        {/* Referral Code Field */}
        <div className="relative">
          <input
            type="text"
            id="referralCode"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            placeholder=" "
            className="peer w-full h-[54px] px-[14px] text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg outline-none focus:border-[#3197A5] transition-colors"
          />
          <label
            htmlFor="referralCode"
            className="absolute left-[14px] top-1/2 -translate-y-1/2 px-[2px] text-xs text-[#8E8E8E] bg-white pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
          >
            {t("auth_referral_optional")}
          </label>
        </div>

        {errorMsg && (
          <div className="text-red-500 text-sm text-center">{errorMsg}</div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full min-w-[120px] h-11 flex items-center justify-center px-3 py-2 bg-[#3197A5] text-white text-base font-normal rounded-[99px] hover:bg-[#2a8694] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? t("auth_processing") : t("auth_register_create_account")}
        </button>

        {/* Privacy Policy Text */}
        <p className="text-xs text-center text-[#8E8E8E]">
          {t("auth_register_agree_prefix")}{" "}
          <button
            type="button"
            onClick={() => setShowTerms(true)}
            className="text-[#3197A5] hover:underline"
          >
            {t("auth_terms_title")}
          </button>{" "}
          {t("auth_and")}{" "}
          <button
            type="button"
            onClick={() => setShowPrivacy(true)}
            className="text-[#3197A5] hover:underline"
          >
            {t("auth_privacy_title")}
          </button>
        </p>
      </form>

      {/* Terms Modal */}
      <Modal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        title={t("auth_terms_title")}
      >
        <div className="space-y-4">
          <p>
            {t("auth_terms_intro")}
          </p>
          <p>
            <strong>{t("auth_terms_license_title")}</strong>
            <br />
            {t("auth_terms_license_body")}
          </p>
          <p>
            <strong>{t("auth_terms_medical_title")}</strong>
            <br />
            {t("auth_terms_medical_body")}
          </p>
          <p>
            <strong>{t("auth_terms_account_title")}</strong>
            <br />
            {t("auth_terms_account_body")}
          </p>
        </div>
      </Modal>

      {/* Privacy Modal */}
      <Modal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title={t("auth_privacy_title")}
      >
        <div className="space-y-4">
          <p>
            {t("auth_privacy_intro")}
          </p>
          <p>
            <strong>{t("auth_privacy_collect_title")}</strong>
            <br />
            {t("auth_privacy_collect_body")}
          </p>
          <p>
            <strong>{t("auth_privacy_usage_title")}</strong>
            <br />
            {t("auth_privacy_usage_body")}
          </p>
          <p>
            <strong>{t("auth_privacy_security_title")}</strong>
            <br />
            {t("auth_privacy_security_body")}
          </p>
        </div>
      </Modal>
    </div>
  );
}
