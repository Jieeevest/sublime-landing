"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";

function SubscriptionPendingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    setOrderId(searchParams.get("order_id"));
  }, [searchParams]);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[70vh] px-4 py-12">
      <div className="w-full max-w-[480px] bg-white rounded-[24px] border border-[#E1E1E1] p-10 flex flex-col items-center text-center shadow-sm">
        {/* Pending Icon */}
        <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mb-6">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="14" stroke="#F59E0B" strokeWidth="3" />
            <path
              d="M20 13v8l5 3"
              stroke="#F59E0B"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#1F1F1F] mb-2">
          Menunggu Pembayaran ⏳
        </h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Pembayaranmu sedang diproses. Langganan akan aktif secara otomatis
          setelah konfirmasi pembayaran diterima.
        </p>

        {orderId && (
          <div className="w-full bg-[#F3F8F9] rounded-xl p-4 mb-8 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Order ID</span>
              <span className="text-[#1F1F1F] font-mono text-xs font-medium">
                {orderId}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span className="bg-amber-50 text-amber-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                Menunggu
              </span>
            </div>
          </div>
        )}

        <div className="w-full bg-blue-50 rounded-xl p-4 mb-8 text-left">
          <p className="text-blue-700 text-sm leading-relaxed">
            💡 <strong>Tips:</strong> Jika menggunakan Virtual Account,
            selesaikan transfer dalam 24 jam. Halaman ini bisa ditutup,
            notifikasi akan dikirim setelah pembayaran terkonfirmasi.
          </p>
        </div>

        <Link
          href="/dashboard/subscriptions"
          className="block w-full bg-[#3197A5] hover:bg-[#288a96] text-white font-medium py-4 rounded-xl transition-colors text-center"
        >
          Cek Status Langganan
        </Link>
        <Link
          href="/dashboard"
          className="block mt-3 text-center text-gray-400 text-sm hover:text-[#3197A5] transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

export default function SubscriptionPendingPage() {
  return (
    <DashboardLayout activeItem="Home">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-10 h-10 border-4 border-[#3197A5] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <SubscriptionPendingContent />
      </Suspense>
    </DashboardLayout>
  );
}
