"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";

type PaymentStatus = "success" | "pending" | "failed" | "loading";

function PaymentFinishContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  useEffect(() => {
    const orderIdParam = searchParams.get("order_id");
    const statusCode = searchParams.get("status_code");
    const transactionStatus = searchParams.get("transaction_status");
    const txId = searchParams.get("transaction_id");

    setOrderId(orderIdParam);
    setTransactionId(txId);

    if (
      transactionStatus === "settlement" ||
      transactionStatus === "capture" ||
      statusCode === "200"
    ) {
      setStatus("success");
    } else if (transactionStatus === "pending") {
      setStatus("pending");
    } else {
      setStatus("failed");
    }
  }, [searchParams]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#3197A5] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[70vh] px-4 py-12">
      <div className="w-full max-w-[480px] bg-white rounded-[24px] border border-[#E1E1E1] p-10 flex flex-col items-center text-center shadow-sm">
        {/* Icon */}
        {status === "success" && (
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
        )}
        {status === "pending" && (
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
        )}
        {status === "failed" && (
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
        )}

        {/* Title */}
        <h1 className="text-2xl font-bold text-[#1F1F1F] mb-2">
          {status === "success" && "Pembayaran Berhasil! 🎉"}
          {status === "pending" && "Menunggu Pembayaran"}
          {status === "failed" && "Pembayaran Gagal"}
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          {status === "success" &&
            "Langgananmu sudah aktif. Sekarang kamu bisa menikmati semua fitur premium Strovia."}
          {status === "pending" &&
            "Pembayaranmu sedang diproses. Langganan akan aktif setelah konfirmasi pembayaran diterima."}
          {status === "failed" &&
            "Pembayaran tidak berhasil. Silakan coba lagi atau gunakan metode pembayaran lain."}
        </p>

        {/* Order Info */}
        {orderId && (
          <div className="w-full bg-[#F3F8F9] rounded-xl p-4 mb-8 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Order ID</span>
              <span className="text-[#1F1F1F] font-medium font-mono text-xs">
                {orderId}
              </span>
            </div>
            {transactionId && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Transaction ID</span>
                <span className="text-[#1F1F1F] font-medium font-mono text-xs">
                  {transactionId}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span
                className={`font-semibold text-xs px-2 py-0.5 rounded-full ${
                  status === "success"
                    ? "bg-[#D3E8EB] text-[#3197A5]"
                    : status === "pending"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-red-50 text-red-500"
                }`}
              >
                {status === "success"
                  ? "Berhasil"
                  : status === "pending"
                    ? "Menunggu"
                    : "Gagal"}
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="w-full space-y-3">
          {status === "success" && (
            <Link
              href="/dashboard"
              className="block w-full bg-[#3197A5] hover:bg-[#288a96] text-white font-medium py-4 rounded-xl transition-colors text-center shadow-lg shadow-[#3197A5]/20"
            >
              Mulai Dengarkan Audio
            </Link>
          )}
          {status === "pending" && (
            <Link
              href="/dashboard/subscriptions"
              className="block w-full bg-[#3197A5] hover:bg-[#288a96] text-white font-medium py-4 rounded-xl transition-colors text-center"
            >
              Cek Status Langganan
            </Link>
          )}
          {status === "failed" && (
            <button
              onClick={() => router.push("/dashboard/subscriptions/payment")}
              className="w-full bg-[#3197A5] hover:bg-[#288a96] text-white font-medium py-4 rounded-xl transition-colors shadow-lg shadow-[#3197A5]/20"
            >
              Coba Lagi
            </button>
          )}
          <Link
            href="/dashboard"
            className="block w-full text-center text-gray-500 text-sm hover:text-[#3197A5] transition-colors py-2"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentFinishPage() {
  return (
    <DashboardLayout activeItem="Home">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-10 h-10 border-4 border-[#3197A5] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <PaymentFinishContent />
      </Suspense>
    </DashboardLayout>
  );
}
