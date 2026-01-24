"use client";

import { Download, Edit2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import EditBillingModal from "./EditBillingModal";

import {
  useGetInvoicesQuery,
  useGetMeQuery,
  useGetMySubscriptionQuery,
} from "@/redux/api/sublimeApi";

export default function SubscriptionTab() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // API Hooks
  const { data: meData } = useGetMeQuery(undefined);
  const { data: subData, isLoading: isLoadingSub } =
    useGetMySubscriptionQuery(undefined);
  const { data: invoicesData, isLoading: isLoadingInvoices } =
    useGetInvoicesQuery({});

  // Derived Data
  const user = meData?.data;
  const subscription = subData?.data;
  const invoices = invoicesData?.data?.data || []; // Assuming paginated response structure

  const subscriptionInfo = {
    plan: subscription?.plan?.name || "Belum Berlangganan",
    amount: subscription?.plan?.price
      ? `Rp ${subscription.plan.price.toLocaleString("id-ID")}`
      : "-",
    status: subscription?.isActive ? "Berlangganan" : "Tidak Aktif",
    nextBilling: subscription?.nextBillingDate
      ? new Date(subscription.nextBillingDate).toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "-",
  };

  const billingInfo = {
    cardType: "Visa", // Mock for now as API might not return card details yet
    last4: "xxxx",
    name: user?.name || "-",
    email: user?.email || "-",
    address: user?.address || "Belum diatur",
    city: user?.city,
    province: user?.province,
    postalCode: user?.postalCode,
    country: user?.country,
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Section: Subscription & Billing Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: Subscription Info */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-[279px] flex flex-col justify-between">
          <h3 className="text-xl font-bold text-[#1F1F1F]">
            Informasi Langganan
          </h3>

          <div className="border border-gray-100 rounded-xl p-6 flex items-center justify-between">
            <div className="grid grid-cols-4 w-full gap-4 text-left">
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#1F1F1F]">
                  Paket Langganan
                </p>
                <p className="text-xs text-gray-400 font-medium">
                  {subscriptionInfo.plan}
                </p>
              </div>
              <div className="space-y-1 border-l border-gray-100 pl-4">
                <p className="text-xs font-bold text-[#1F1F1F]">Jumlah</p>
                <p className="text-xs text-gray-400 font-medium">
                  {subscriptionInfo.amount}
                </p>
              </div>
              <div className="space-y-1 border-l border-gray-100 pl-4">
                <p className="text-xs font-bold text-[#1F1F1F]">Status</p>
                <span className="bg-[#E0F2F4] text-[#3197A5] px-2 py-0.5 rounded text-[10px] font-bold">
                  {subscriptionInfo.status}
                </span>
              </div>
              <div className="space-y-1 border-l border-gray-100 pl-4">
                <p className="text-xs font-bold text-[#1F1F1F]">
                  Tagihan Berikut
                </p>
                <p className="text-xs text-gray-400 font-medium">
                  {subscriptionInfo.nextBilling}
                </p>
              </div>
            </div>
          </div>
          {/* Spacer to match height distribution if needed, or flex justify-between handles it */}
          <div></div>
        </div>

        {/* Right Card: Billing Info */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-[279px] relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#1F1F1F]">
              Informasi Penagihan
            </h3>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="w-8 h-8 rounded-full bg-[#3197A5] flex items-center justify-center text-white hover:bg-[#288a96] transition-colors"
            >
              <Edit2 size={16} />
            </button>
          </div>

          <div className="border border-gray-100 rounded-xl p-4 mb-6 flex items-center gap-4">
            {/* Visa Logo Placeholder */}
            <div className="font-bold text-[#20325F] italic text-xl">VISA</div>
            <div className="flex flex-col">
              <p className="text-xs font-bold text-[#1F1F1F]">
                {billingInfo.cardType}
              </p>
              <p className="text-xs text-gray-400">
                •••• •••• •••• {billingInfo.last4}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-[120px_1fr] items-start">
              <span className="text-xs text-gray-400">Nama Penagihan</span>
              <span className="text-xs font-medium text-[#1F1F1F]">
                {billingInfo.name}
              </span>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-start">
              <span className="text-xs text-gray-400">Email Penagihan</span>
              <span className="text-xs font-medium text-[#1F1F1F]">
                {billingInfo.email}
              </span>
            </div>
            <div className="grid grid-cols-[120px_1fr] items-start">
              <span className="text-xs text-gray-400">Alamat Penagihan</span>
              <span className="text-xs font-medium text-[#1F1F1F] truncate">
                {billingInfo.address}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Invoice */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 min-h-[490px] flex flex-col">
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-6">Invoice</h3>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-400 text-xs">
              <tr>
                <th className="py-4 px-6 rounded-l-lg font-medium">
                  Invoice ID
                </th>
                <th className="py-4 px-6 font-medium">Tanggal</th>
                <th className="py-4 px-6 font-medium">Paket Langganan</th>
                <th className="py-4 px-6 font-medium">Jumlah</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 rounded-r-lg font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoices.length > 0 ? (
                invoices.map((inv: any, idx: number) => (
                  <tr
                    key={inv.id || idx}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-6 text-[#1F1F1F]">
                      <Link
                        href={`/dashboard/invoices/${inv.id}`}
                        className="hover:text-[#3197A5] underline decoration-dotted underline-offset-4"
                      >
                        {inv.invoiceNumber || inv.id}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-[#1F1F1F]">
                      {inv.createdAt
                        ? new Date(inv.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "-"}
                    </td>
                    <td className="py-4 px-6 text-[#1F1F1F]">
                      {inv.items?.[0]?.name || "Langganan"}
                    </td>
                    <td className="py-4 px-6 text-[#1F1F1F] font-bold">
                      {inv.total
                        ? `Rp ${inv.total.toLocaleString("id-ID")}`
                        : "-"}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-1 rounded-sm text-[10px] font-bold ${
                          inv.status === "PENDING"
                            ? "bg-[#FFF4E5] text-[#FF9500]"
                            : inv.status === "PAID"
                              ? "bg-[#E0F2F4] text-[#3197A5]"
                              : "bg-[#FFE5E5] text-[#FF3B30]"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {inv.status === "PENDING" ? (
                        <button className="bg-[#3197A5] hover:bg-[#288a96] text-white text-[10px] font-bold px-3 py-1.5 rounded-full transition-colors">
                          Bayar Sekarang
                        </button>
                      ) : (
                        <button className="flex items-center gap-2 text-xs font-medium text-[#1F1F1F] hover:text-gray-600 transition-colors ml-auto">
                          <Download size={14} />
                          Download
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400">
                    Belum ada riwayat tagihan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-4 mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span>Baris per halaman:</span>
            <select className="bg-transparent font-bold text-[#1F1F1F] focus:outline-none cursor-pointer">
              <option>5</option>
            </select>
          </div>
          <span>6-10 of 11</span>
          <div className="flex gap-2">
            <button className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-50">
              <ChevronLeft size={16} />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <EditBillingModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={billingInfo}
      />
    </div>
  );
}
