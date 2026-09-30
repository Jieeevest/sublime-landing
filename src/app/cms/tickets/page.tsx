/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  useGetAdminSupportTicketsQuery,
  useGetAdminSupportTicketByIdQuery,
  useUpdateAdminSupportTicketMutation,
  useGetAdminSupportStatsQuery,
} from "@/redux/api/sublimeApi";

type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
type TicketPriority = "low" | "medium" | "high";

type TicketUser = {
  id?: string;
  name?: string;
  email?: string;
  phone_number?: string | null;
};

type SupportTicket = {
  id: string;
  subjek: string;
  deskripsi: string;
  status: TicketStatus;
  priority: TicketPriority;
  admin_notes?: string | null;
  guest_name?: string | null;
  guest_email?: string | null;
  user_id?: string | null;
  user?: TicketUser | null;
  created_at?: string;
  updated_at?: string;
  resolved_at?: string | null;
};

const statusStyles: Record<TicketStatus, string> = {
  open: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-gray-100 text-gray-600",
};

const statusLabel: Record<TicketStatus, string> = {
  open: "Baru",
  in_progress: "Diproses",
  resolved: "Selesai",
  closed: "Ditutup",
};

const priorityStyles: Record<TicketPriority, string> = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-orange-100 text-orange-700",
  high: "bg-red-100 text-red-700",
};

function formatDate(value?: string | null) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CmsTicketsPage() {
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const params = useMemo(() => {
    const p: Record<string, unknown> = { limit: 50 };
    if (statusFilter !== "all") p.status = statusFilter;
    if (search.trim()) p.search = search.trim();
    return p;
  }, [statusFilter, search]);

  const {
    data: ticketsData,
    isLoading,
    refetch,
  } = useGetAdminSupportTicketsQuery(params);
  const { data: statsData } = useGetAdminSupportStatsQuery(undefined);

  const tickets: SupportTicket[] = (ticketsData?.data as SupportTicket[]) || [];
  const stats = statsData?.data || {
    total: 0,
    open: 0,
    in_progress: 0,
    resolved: 0,
    closed: 0,
  };

  return (
    <div className="p-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          Tiket Hubungi Kami
        </h1>
        <p className="text-gray-600">
          Kelola permintaan bantuan dari pengguna dan tamu website.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total", value: stats.total, color: "text-gray-800" },
          { label: "Baru", value: stats.open, color: "text-yellow-600" },
          { label: "Diproses", value: stats.in_progress, color: "text-blue-600" },
          { label: "Selesai", value: stats.resolved, color: "text-green-600" },
          { label: "Ditutup", value: stats.closed, color: "text-gray-500" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <p className="text-xs text-gray-400">{s.label}</p>
            <p className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto">
          {(["all", "open", "in_progress", "resolved", "closed"] as const).map(
            (s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  statusFilter === s
                    ? "bg-[#3197A5] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {s === "all" ? "Semua" : statusLabel[s]}
              </button>
            ),
          )}
        </div>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari subjek, deskripsi, atau email..."
          className="w-full sm:w-80 rounded-full border border-gray-200 px-4 py-2 text-sm outline-none focus:border-[#3197A5]"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Pengirim</th>
                <th className="px-6 py-4">Subjek</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Prioritas</th>
                <th className="px-6 py-4">Dibuat</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8">
                    Memuat...
                  </td>
                </tr>
              ) : tickets.length > 0 ? (
                tickets.map((ticket) => {
                  const senderName =
                    ticket.user?.name || ticket.guest_name || "Guest";
                  const senderEmail =
                    ticket.user?.email || ticket.guest_email || "-";
                  return (
                    <tr
                      key={ticket.id}
                      className="hover:bg-gray-50/70 cursor-pointer"
                      onClick={() => setSelectedId(ticket.id)}
                    >
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {senderName}
                        <div className="text-xs text-gray-400 font-normal">
                          {senderEmail}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="line-clamp-1 max-w-[320px] text-gray-800">
                          {ticket.subjek}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide ${statusStyles[ticket.status]}`}
                        >
                          {statusLabel[ticket.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wide ${priorityStyles[ticket.priority]}`}
                        >
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {formatDate(ticket.created_at)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId(ticket.id);
                          }}
                          className="text-[#3197A5] hover:text-[#288a96] font-bold text-xs hover:underline"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-gray-400 text-sm"
                  >
                    Tidak ada tiket ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedId && (
        <TicketDetailModal
          ticketId={selectedId}
          onClose={() => setSelectedId(null)}
          onUpdated={refetch}
        />
      )}
    </div>
  );
}

interface TicketDetailModalProps {
  ticketId: string;
  onClose: () => void;
  onUpdated: () => void;
}

function TicketDetailModal({
  ticketId,
  onClose,
  onUpdated,
}: TicketDetailModalProps) {
  const { data, isLoading } = useGetAdminSupportTicketByIdQuery(ticketId);
  const [updateTicket, { isLoading: isUpdating }] =
    useUpdateAdminSupportTicketMutation();

  const ticket: SupportTicket | undefined = data?.data;

  const [status, setStatus] = useState<TicketStatus | "">("");
  const [priority, setPriority] = useState<TicketPriority | "">("");
  const [adminNotes, setAdminNotes] = useState("");

  const currentStatus = status || ticket?.status || "open";
  const currentPriority = priority || ticket?.priority || "medium";
  const currentNotes = adminNotes || ticket?.admin_notes || "";

  const handleSave = async () => {
    try {
      await updateTicket({
        id: ticketId,
        status: currentStatus,
        priority: currentPriority,
        admin_notes: currentNotes,
      }).unwrap();
      toast.success("Tiket berhasil diperbarui");
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Gagal memperbarui tiket");
    }
  };

  const senderName =
    ticket?.user?.name || ticket?.guest_name || "Guest";
  const senderEmail =
    ticket?.user?.email || ticket?.guest_email || "-";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="text-lg font-bold text-gray-800">Detail Tiket</h3>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5 space-y-5">
          {isLoading || !ticket ? (
            <p className="text-sm text-gray-500">Memuat detail tiket...</p>
          ) : (
            <>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Pengirim
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {senderName}
                </p>
                <p className="text-xs text-gray-500">{senderEmail}</p>
                {ticket.user?.phone_number && (
                  <p className="text-xs text-gray-500">
                    {ticket.user.phone_number}
                  </p>
                )}
                <p className="mt-1 text-[11px] text-gray-400">
                  Dibuat {formatDate(ticket.created_at)}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Subjek
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-800">
                  {ticket.subjek}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400">
                  Deskripsi
                </p>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
                  {ticket.deskripsi}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-400">
                    Status
                  </label>
                  <select
                    value={currentStatus}
                    onChange={(e) => setStatus(e.target.value as TicketStatus)}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#3197A5]"
                  >
                    <option value="open">Baru</option>
                    <option value="in_progress">Diproses</option>
                    <option value="resolved">Selesai</option>
                    <option value="closed">Ditutup</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-400">
                    Prioritas
                  </label>
                  <select
                    value={currentPriority}
                    onChange={(e) =>
                      setPriority(e.target.value as TicketPriority)
                    }
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#3197A5]"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-gray-400">
                  Catatan Admin (internal)
                </label>
                <textarea
                  value={currentNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={4}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#3197A5] resize-none"
                  placeholder="Catatan internal untuk tim..."
                />
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            disabled={isUpdating}
            className="rounded-full bg-gray-100 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-60"
          >
            Tutup
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading || isUpdating || !ticket}
            className="rounded-full bg-[#3197A5] px-6 py-2 text-sm font-semibold text-white hover:bg-[#288a96] disabled:opacity-60"
          >
            {isUpdating ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
