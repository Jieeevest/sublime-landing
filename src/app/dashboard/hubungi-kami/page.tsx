"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useI18n } from "@/i18n";
import {
  useGetMeQuery,
  useSubmitSupportTicketMutation,
  useGetMySupportTicketsQuery,
} from "@/redux/api/sublimeApi";

const SUPPORT_EMAIL = "strovia.app@gmail.com";

type SupportTicket = {
  id: string;
  subjek: string;
  deskripsi?: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  created_at?: string;
  updated_at?: string;
};

const statusStyles: Record<SupportTicket["status"], string> = {
  open: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-600",
};

const statusLabel: Record<SupportTicket["status"], string> = {
  open: "Baru",
  in_progress: "Diproses",
  resolved: "Selesai",
  closed: "Ditutup",
};

export default function HubungiKamiPage() {
  const { t } = useI18n();
  const { data: userData } = useGetMeQuery(undefined);
  const [submitTicket, { isLoading }] = useSubmitSupportTicketMutation();
  const { data: myTicketsData, refetch: refetchMyTickets } =
    useGetMySupportTicketsQuery({ limit: 20 });

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const email = userData?.data?.email || "";
  const name = userData?.data?.name || "";

  const canSubmit =
    subject.trim().length >= 3 && message.trim().length >= 10 && !isLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      await submitTicket({
        subjek: subject.trim(),
        deskripsi: message.trim(),
      }).unwrap();
      toast.success(
        t("contact_submit_success") ||
          "Terima kasih! Tiket kamu sudah kami terima.",
      );
      setSubject("");
      setMessage("");
      refetchMyTickets();
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

  const tickets: SupportTicket[] =
    (myTicketsData?.data as SupportTicket[]) || [];

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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 rounded-2xl border border-[#E1E1E1] bg-white p-6 sm:p-8 lg:col-span-3"
            style={{
              boxShadow:
                "0 1px 1px rgba(0, 0, 0, 0.02), 0 2px 4px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Name (readonly) */}
              <div className="relative">
                <input
                  type="text"
                  id="dc-name"
                  value={name}
                  readOnly
                  placeholder=" "
                  className="peer w-full h-[54px] px-[14px] text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg bg-gray-50 outline-none"
                />
                <label
                  htmlFor="dc-name"
                  className="absolute left-[14px] top-0 -translate-y-1/2 px-[2px] text-xs text-[#8E8E8E] bg-white pointer-events-none"
                >
                  {t("contact_field_name")}
                </label>
              </div>

              {/* Email (readonly, prefilled from getMe) */}
              <div className="relative">
                <input
                  type="email"
                  id="dc-email"
                  value={email}
                  readOnly
                  placeholder=" "
                  className="peer w-full h-[54px] px-[14px] text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg bg-gray-50 outline-none"
                />
                <label
                  htmlFor="dc-email"
                  className="absolute left-[14px] top-0 -translate-y-1/2 px-[2px] text-xs text-[#8E8E8E] bg-white pointer-events-none"
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
                  required
                  minLength={3}
                  maxLength={255}
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
                  minLength={10}
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
                {isLoading
                  ? t("auth_processing") || "Mengirim..."
                  : t("contact_submit")}
              </button>
            </div>
          </form>

          {/* My Tickets */}
          <div className="rounded-2xl border border-[#E1E1E1] bg-white p-6 lg:col-span-2">
            <h2 className="text-sm font-semibold text-[#1F1F1F]">
              Tiket Kamu
            </h2>
            <p className="mt-1 text-xs text-[#8E8E8E]">
              Riwayat permintaan bantuan yang pernah kamu kirim.
            </p>

            <div className="mt-4 space-y-3">
              {tickets.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-200 py-6 text-center text-xs text-gray-400">
                  Belum ada tiket
                </div>
              ) : (
                tickets.map((ticket) => {
                  const status = ticket.status || "open";
                  const dateStr = ticket.created_at
                    ? new Date(ticket.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "-";
                  return (
                    <div
                      key={ticket.id}
                      className="rounded-xl border border-gray-100 p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="line-clamp-2 flex-1 text-[13px] font-medium text-[#1F1F1F]">
                          {ticket.subjek}
                        </p>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${statusStyles[status]}`}
                        >
                          {statusLabel[status]}
                        </span>
                      </div>
                      <p className="mt-2 text-[11px] text-gray-400">{dateStr}</p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
