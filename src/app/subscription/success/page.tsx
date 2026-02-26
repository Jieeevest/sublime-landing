"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";

function SubscriptionSuccessContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  useEffect(() => {
    setOrderId(searchParams.get("order_id"));
    setTransactionId(searchParams.get("transaction_id"));
  }, [searchParams]);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[70vh] px-4 py-12">
      <div className="w-full max-w-[480px] bg-white rounded-[24px] border border-[#E1E1E1] p-10 flex flex-col items-center text-center shadow-sm">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-[#D3E8EB] flex items-center justify-center mb-6">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M33 12L16.5 28.5L8 20"
              stroke="#3197A5"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#1F1F1F] mb-2">
          Berlangganan Aktif! 🎉
        </h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Terima kasih! Langganan premium kamu sudah aktif. Nikmati semua fitur
          eksklusif Strovia sekarang.
        </p>

        {/* Order Info */}
        {orderId && (
          <div className="w-full bg-[#F3F8F9] rounded-xl p-4 mb-8 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Order ID</span>
              <span className="text-[#1F1F1F] font-mono text-xs font-medium">
                {orderId}
              </span>
            </div>
            {transactionId && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Transaction ID</span>
                <span className="text-[#1F1F1F] font-mono text-xs font-medium">
                  {transactionId}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span className="bg-[#D3E8EB] text-[#3197A5] text-xs font-semibold px-2 py-0.5 rounded-full">
                Aktif
              </span>
            </div>
          </div>
        )}

        {/* Features highlight */}
        <div className="w-full bg-[#F3F8F9] rounded-xl p-4 mb-8 text-left space-y-3">
          {[
            "Akses semua audio therapy",
            "Chat AI Dokter Via",
            "Artikel kesehatan eksklusif",
            "Tanpa autodebet",
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#3197A5] flex items-center justify-center flex-shrink-0">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M10 3L4.5 8.5L2 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm text-[#1F1F1F]">{feature}</span>
            </div>
          ))}
        </div>

        <Link
          href="/dashboard"
          className="block w-full bg-[#3197A5] hover:bg-[#288a96] text-white font-medium py-4 rounded-xl transition-colors text-center shadow-lg shadow-[#3197A5]/20"
        >
          Mulai Dengarkan Audio 🎵
        </Link>
        <Link
          href="/dashboard/subscriptions"
          className="block mt-3 text-center text-gray-400 text-sm hover:text-[#3197A5] transition-colors"
        >
          Lihat detail langganan
        </Link>
      </div>
    </div>
  );
}

export default function SubscriptionSuccessPage() {
  return (
    <DashboardLayout activeItem="Home">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-10 h-10 border-4 border-[#3197A5] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <SubscriptionSuccessContent />
      </Suspense>
    </DashboardLayout>
  );
}
