"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useI18n } from "@/i18n";

const SUPPORT_EMAIL = "strovia.app@gmail.com";

export default function HubungiKamiPage() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit =
    name.trim() !== "" && email.trim() !== "" && message.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const body = `${t("contact_body_greeting")}\n\n${message}\n\n${t(
      "contact_body_from",
    )}: ${name}\nEmail: ${email}`;

    const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
      subject || t("contact_default_subject"),
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  };

  return (
    <DashboardLayout activeItem={t("ud_menu_contact")}>
      <div
        className="mx-auto max-w-[1267px] space-y-8 px-4 pb-10 sm:px-10"
        style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
      >
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-[#5A96A0]">
            {t("contact_badge")}
          </h1>
          <p className="mt-1 text-sm text-[#8E8E8E]">
            {t("contact_subheading")}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 rounded-2xl border border-[#E1E1E1] bg-white p-6 sm:p-8"
          style={{
            boxShadow:
              "0 1px 1px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                id="dc-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=" "
                required
                className="peer w-full h-[54px] px-[14px] text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg outline-none focus:border-[#3197A5] transition-colors bg-white"
              />
              <label
                htmlFor="dc-name"
                className="absolute left-[14px] top-1/2 -translate-y-1/2 px-[2px] text-xs text-[#8E8E8E] bg-white pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
              >
                {t("contact_field_name")}
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                id="dc-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                required
                className="peer w-full h-[54px] px-[14px] text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg outline-none focus:border-[#3197A5] transition-colors bg-white"
              />
              <label
                htmlFor="dc-email"
                className="absolute left-[14px] top-1/2 -translate-y-1/2 px-[2px] text-xs text-[#8E8E8E] bg-white pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
              >
                {t("contact_field_email")}
              </label>
            </div>

            {/* Subject */}
            <div className="relative sm:col-span-2">
              <input
                type="text"
                id="dc-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder=" "
                className="peer w-full h-[54px] px-[14px] text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg outline-none focus:border-[#3197A5] transition-colors bg-white"
              />
              <label
                htmlFor="dc-subject"
                className="absolute left-[14px] top-1/2 -translate-y-1/2 px-[2px] text-xs text-[#8E8E8E] bg-white pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
              >
                {t("contact_field_subject")}
              </label>
            </div>

            {/* Message */}
            <div className="relative sm:col-span-2">
              <textarea
                id="dc-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder=" "
                required
                rows={6}
                className="peer w-full px-[14px] pt-[18px] pb-[14px] text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg outline-none focus:border-[#3197A5] transition-colors bg-white resize-none"
              />
              <label
                htmlFor="dc-message"
                className="absolute left-[14px] top-[16px] px-[2px] text-xs text-[#8E8E8E] bg-white pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
              >
                {t("contact_field_message")}
              </label>
            </div>
          </div>

          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-end">
            <span className="text-[13px] text-[#8E8E8E]">
              {t("contact_or_email")}{" "}
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-[#3197A5] hover:underline"
              >
                {SUPPORT_EMAIL}
              </a>
            </span>
            <button
              type="submit"
              disabled={!canSubmit}
              className="min-w-[160px] h-11 px-5 rounded-full bg-primary text-white text-sm font-medium transition-transform hover:scale-105 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {t("contact_submit")}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
