"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./ContactUs.module.css";
import { useI18n } from "@/i18n";
import { useSubmitSupportTicketMutation } from "@/redux/api/sublimeApi";

const SUPPORT_EMAIL = "strovia.app@gmail.com";

export default function ContactUs() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitTicket, { isLoading }] = useSubmitSupportTicketMutation();

  const canSubmit =
    name.trim() !== "" &&
    email.trim() !== "" &&
    subject.trim().length >= 3 &&
    message.trim().length >= 10 &&
    !isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      await submitTicket({
        subjek: subject.trim(),
        deskripsi: message.trim(),
        guest_name: name.trim(),
        guest_email: email.trim(),
      }).unwrap();
      toast.success(
        t("contact_submit_success") ||
          "Terima kasih! Tiket kamu sudah kami terima.",
      );
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err: unknown) {
      const msg =
        (err as { data?: { message?: string; pesan?: string } })?.data?.pesan ||
        (err as { data?: { message?: string; pesan?: string } })?.data
          ?.message ||
        t("contact_submit_error") ||
        "Gagal mengirim tiket. Silakan coba lagi.";
      toast.error(msg);
    }
  };

  return (
    <section
      id="hubungi-kami"
      className={`${styles.section} relative flex flex-col items-center isolate`}
    >
      <div className={styles.blurLeft} />

      {/* Title Section */}
      <div className={`${styles.titleSection} flex flex-col items-center`}>
        {/* Badge */}
        <div
          className={`${styles.badge} flex flex-row justify-center items-center`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ transform: "matrix(-1, 0, 0, 1, 0, 0)" }}
          >
            <path
              d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
              fill="#3197A5"
            />
            <path
              d="M12 4L12.8 7.2L16 8L12.8 8.8L12 12L11.2 8.8L8 8L11.2 7.2L12 4Z"
              fill="#3197A5"
              opacity="0.5"
            />
          </svg>
          <span className={styles.badgeText}>{t("contact_badge")}</span>
        </div>

        {/* Heading */}
        <h2 className={`${styles.heading} font-bold text-center`}>
          {t("contact_heading")}
        </h2>

        {/* Subheading */}
        <p className={`${styles.subheading} text-center`}>
          {t("contact_subheading")}
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className={`${styles.formCard} flex flex-col items-stretch`}
        style={{ gap: "24px" }}
      >
        <div className={styles.formGrid}>
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
              required
              className="peer w-full h-[54px] px-[14px] text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg outline-none focus:border-[#3197A5] transition-colors bg-white"
            />
            <label
              htmlFor="contact-name"
              className="absolute left-[14px] top-1/2 -translate-y-1/2 px-[2px] text-xs text-[#8E8E8E] bg-white pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
              style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
            >
              {t("contact_field_name")}
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="contact-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
              className="peer w-full h-[54px] px-[14px] text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg outline-none focus:border-[#3197A5] transition-colors bg-white"
            />
            <label
              htmlFor="contact-email"
              className="absolute left-[14px] top-1/2 -translate-y-1/2 px-[2px] text-xs text-[#8E8E8E] bg-white pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
              style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
            >
              {t("contact_field_email")}
            </label>
          </div>

          {/* Subject - full row */}
          <div className={`${styles.formFullRow} relative`}>
            <input
              type="text"
              id="contact-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder=" "
              className="peer w-full h-[54px] px-[14px] text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg outline-none focus:border-[#3197A5] transition-colors bg-white"
            />
            <label
              htmlFor="contact-subject"
              className="absolute left-[14px] top-1/2 -translate-y-1/2 px-[2px] text-xs text-[#8E8E8E] bg-white pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
              style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
            >
              {t("contact_field_subject")}
            </label>
          </div>

          {/* Message - full row */}
          <div className={`${styles.formFullRow} relative`}>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder=" "
              required
              minLength={10}
              rows={6}
              className="peer w-full px-[14px] pt-[18px] pb-[14px] text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg outline-none focus:border-[#3197A5] transition-colors bg-white resize-none"
            />
            <label
              htmlFor="contact-message"
              className="absolute left-[14px] top-[16px] px-[2px] text-xs text-[#8E8E8E] bg-white pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
              style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
            >
              {t("contact_field_message")}
            </label>
            <div className="mt-1.5 flex items-center justify-between px-1 text-[11px]" style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}>
              <span
                className={
                  message.trim().length < 10
                    ? "text-[#FF7A00]"
                    : "text-[#8E8E8E]"
                }
              >
                {message.trim().length < 10
                  ? `Minimal 10 karakter (kurang ${10 - message.trim().length})`
                  : "Siap dikirim"}
              </span>
              <span className="text-[#8E8E8E]">{message.length} karakter</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-row items-center justify-end gap-4 flex-wrap">
          <span
            className="text-[#8E8E8E]"
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "13px",
              lineHeight: "22px",
            }}
          >
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
            className={styles.submitButton}
          >
            {isLoading ? t("auth_processing") || "Mengirim..." : t("contact_submit")}
          </button>
        </div>
      </form>
    </section>
  );
}
