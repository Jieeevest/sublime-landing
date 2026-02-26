"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";

function SubscriptionErrorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    setOrderId(searchParams.get("order_id"));
  }, [searchParams]);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[70vh] px-4 py-12">
      <div className="w-full max-w-[480px] bg-white rounded-[24px] border border-[#E1E1E1] p-10 flex flex-col items-center text-center shadow-sm">
        {/* Error Icon */}
        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M12 12l16 16M28 12L12 28"
              stroke="#EF4444"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#1F1F1F] mb-2">
          Pembayaran Gagal
        </h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Pembayaran tidak berhasil diproses. Silakan coba lagi dengan metode
          pembayaran yang sama atau berbeda.
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
              <span className="bg-red-50 text-red-500 text-xs font-semibold px-2 py-0.5 rounded-full">
                Gagal
              </span>
            </div>
          </div>
        )}

        <div className="w-full space-y-3">
          <button
            onClick={() => router.push("/dashboard/subscriptions/payment")}
            className="w-full bg-[#3197A5] hover:bg-[#288a96] text-white font-medium py-4 rounded-xl transition-colors shadow-lg shadow-[#3197A5]/20"
          >
            Coba Lagi
          </button>
          <Link
            href="/dashboard"
            className="block text-center text-gray-400 text-sm hover:text-[#3197A5] transition-colors py-2"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SubscriptionErrorPage() {
  return (
    <DashboardLayout activeItem="Home">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-10 h-10 border-4 border-[#3197A5] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <SubscriptionErrorContent />
      </Suspense>
    </DashboardLayout>
  );
}
