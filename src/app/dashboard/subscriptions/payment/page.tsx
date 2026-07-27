"use client";

import {
  usePurchaseSubscriptionMutation,
  useGetPaymentMethodsQuery,
  useLazyCheckPaymentStatusQuery,
  useGetPlansQuery,
} from "@/redux/api/sublimeApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Image from "next/image";

interface PaymentResult {
  payment_type: string;
  order_id: string;
  subscription_id: string;
  invoice_id: string;
  // VA
  virtual_account_no?: string;
  va_expiry?: string;
  // Bank Transfer
  bank_name?: string;
  bank_account_no?: string;
  bank_account_name?: string;
  payment_code?: string;
  amount?: string;
  expired_date?: string;
  // QRIS
  qr_content?: string;
  validity_period?: string;
  reference_no?: string;
  // internal
  _bankInfo?: { key: string; name: string; icon: string } | null;
}

interface ApiPlan {
  id: string;
  name?: string;
  price?: number | string;
  duration_days?: number;
}

interface PaymentMethod {
  code: string;
  name: string;
  description?: string;
  estimatedTime?: string;
  category: string;
}

interface PurchasePayload {
  plan_id: string;
  payment_type: string;
  va_bank?: string;
}

const MAX_POLL_ATTEMPTS = 60; // 5 menit pada interval 5 detik

export default function PaymentPage() {
  const router = useRouter();
  const [purchaseSubscription, { isLoading: isSubmitting }] =
    usePurchaseSubscriptionMutation();
  const { data: methodsData, isLoading: isLoadingMethods } =
    useGetPaymentMethodsQuery(undefined);
  const { data: plansData, isLoading: isLoadingPlan } =
    useGetPlansQuery(undefined);
  const [triggerCheckStatus] = useLazyCheckPaymentStatusQuery();

  const rawPlansData = plansData?.data;
  const plan: ApiPlan | undefined = Array.isArray(rawPlansData)
    ? rawPlansData[0]
    : rawPlansData && typeof rawPlansData === "object" && "id" in rawPlansData
    ? (rawPlansData as ApiPlan)
    : undefined;
  const planPriceLabel = plan?.price
    ? `Rp ${Number(plan.price).toLocaleString("id-ID")}`
    : "-";

  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [pollingOrderId, setPollingOrderId] = useState<string | null>(null);

  const VA_BANKS = [
    { key: "MANDIRI", name: "Bank Mandiri", icon: "https://batpay-public.oss-ap-southeast-5.aliyuncs.com/icon/banks/bank-mandiri.svg" },
    { key: "BCA",     name: "BCA",          icon: "https://batpay-public.oss-ap-southeast-5.aliyuncs.com/icon/banks/bank-bca.svg" },
    { key: "CIMB",    name: "CIMB Niaga",   icon: "https://batpay-public.oss-ap-southeast-5.aliyuncs.com/icon/banks/bank-cimb.svg" },
    { key: "DANAMON", name: "Bank Danamon", icon: "https://batpay-public.oss-ap-southeast-5.aliyuncs.com/icon/banks/bank-danamon.svg" },
  ];

  const pollAttemptsRef = useRef(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (pollingOrderId) {
      pollAttemptsRef.current = 0;
      intervalId = setInterval(async () => {
        pollAttemptsRef.current += 1;
        try {
          const result = await triggerCheckStatus(pollingOrderId).unwrap();
          const subStatus = result?.data?.subscription_status;

          if (subStatus === "active") {
            toast.success("Pembayaran berhasil! Langganan kamu sudah aktif.");
            setPollingOrderId(null);
            router.push("/dashboard?subscription=success");
            return;
          } else if (subStatus === "expired" || subStatus === "cancelled") {
            toast.error("Pembayaran gagal atau kadaluarsa.");
            setPollingOrderId(null);
            return;
          }
        } catch (error) {
          console.error("Error checking payment status:", error);
        }

        if (pollAttemptsRef.current >= MAX_POLL_ATTEMPTS) {
          toast.error(
            "Waktu konfirmasi pembayaran habis. Cek status terbaru di halaman langganan.",
          );
          setPollingOrderId(null);
        }
      }, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [pollingOrderId, triggerCheckStatus, router]);

  const paymentMethods: PaymentMethod[] =
    (methodsData?.data?.all as PaymentMethod[] | undefined) || [];

  const handlePay = async () => {
    if (!selectedMethod) {
      toast.error("Mohon pilih metode pembayaran.");
      return;
    }
    if (selectedMethod === "virtual_account" && !selectedBank) {
      toast.error("Mohon pilih bank untuk Virtual Account.");
      return;
    }
    if (!plan?.id) {
      toast.error("Paket langganan tidak tersedia. Silakan coba lagi.");
      return;
    }

    try {
      const payload: PurchasePayload = {
        plan_id: plan.id,
        payment_type: selectedMethod,
      };
      if (selectedMethod === "virtual_account") payload.va_bank = selectedBank;

      const res = await purchaseSubscription(payload).unwrap();

      if (res.success) {
        const selectedBankInfo = VA_BANKS.find((b) => b.key === selectedBank) ?? null;
        setPaymentResult({ ...res.data, _bankInfo: selectedBankInfo });
        setPollingOrderId(res.data.order_id);
        toast.success("Transaksi berhasil dibuat. Selesaikan pembayaran.");
      } else {
        toast.error("Pembayaran gagal. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Terjadi kesalahan saat memproses pembayaran.");
    }
  };

  if (paymentResult) {
    return (
      <DashboardLayout activeItem="Home">
        <div className="w-full max-w-[600px] mx-auto p-8">
          <div className="bg-white rounded-[16px] p-8 shadow-[0px_12px_24px_-4px_rgba(145,158,171,0.12)] border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#3197A5]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#3197A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="text-[22px] font-semibold text-[#1F1F1F]">Selesaikan Pembayaran</h2>
              <p className="text-[14px] text-[#8E8E8E] mt-1">Order ID: {paymentResult.order_id}</p>
            </div>

            {/* Virtual Account */}
            {paymentResult.payment_type === "virtual_account" && (
              <div className="space-y-4">
                {paymentResult._bankInfo && (
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <img src={paymentResult._bankInfo.icon} alt={paymentResult._bankInfo.name} className="h-8 object-contain" />
                    <span className="text-[16px] font-semibold text-[#1F1F1F]">{paymentResult._bankInfo.name}</span>
                  </div>
                )}
                <p className="text-[14px] text-[#8E8E8E] text-center">Transfer ke Virtual Account berikut</p>
                <div className="bg-[#F9FAFB] rounded-[12px] p-6 text-center">
                  <p className="text-[12px] text-[#8E8E8E] mb-2 uppercase tracking-wide">Nomor Virtual Account</p>
                  <p className="text-[28px] font-bold text-[#1F1F1F] tracking-widest font-mono">
                    {paymentResult.virtual_account_no}
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paymentResult.virtual_account_no || "");
                      toast.success("Nomor VA disalin!");
                    }}
                    className="mt-3 text-[13px] text-[#3197A5] hover:underline"
                  >
                    Salin Nomor
                  </button>
                </div>
                <div className="flex justify-between text-[13px] text-[#8E8E8E]">
                  <span>Jumlah</span>
                  <span className="font-medium text-[#1F1F1F]">
                    {paymentResult.amount
                      ? `Rp ${parseInt(paymentResult.amount).toLocaleString("id-ID")}`
                      : planPriceLabel}
                  </span>
                </div>
                {paymentResult.va_expiry && (
                  <div className="flex justify-between text-[13px] text-[#8E8E8E]">
                    <span>Berlaku hingga</span>
                    <span className="font-medium text-[#1F1F1F]">
                      {new Date(paymentResult.va_expiry).toLocaleString("id-ID")}
                    </span>
                  </div>
                )}
                <p className="text-[12px] text-[#8E8E8E] text-center mt-2">
                  Pembayaran akan terverifikasi otomatis setelah transfer berhasil.
                </p>
              </div>
            )}

            {/* Bank Transfer */}
            {paymentResult.payment_type === "bank_transfer" && (
              <div className="space-y-4">
                <p className="text-[14px] text-[#8E8E8E] text-center">Transfer manual ke rekening berikut</p>
                <div className="bg-[#F9FAFB] rounded-[12px] p-6 space-y-3">
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#8E8E8E]">Bank</span>
                    <span className="font-medium text-[#1F1F1F]">{paymentResult.bank_name}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#8E8E8E]">No. Rekening</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-[#1F1F1F]">{paymentResult.bank_account_no}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(paymentResult.bank_account_no || "");
                          toast.success("No. rekening disalin!");
                        }}
                        className="text-[#3197A5] text-[11px] hover:underline"
                      >
                        Salin
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span className="text-[#8E8E8E]">Atas Nama</span>
                    <span className="font-medium text-[#1F1F1F]">{paymentResult.bank_account_name}</span>
                  </div>
                  <div className="border-t border-dashed border-[#E1E1E1] pt-3">
                    <div className="flex justify-between text-[13px]">
                      <span className="text-[#8E8E8E]">Jumlah Transfer</span>
                      <span className="font-semibold text-[#1F1F1F]">Rp {parseInt(paymentResult.amount || "0").toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-[13px] mt-2">
                      <span className="text-[#8E8E8E]">Kode Unik</span>
                      <span className="font-mono font-bold text-[#3197A5]">{paymentResult.payment_code}</span>
                    </div>
                  </div>
                </div>
                <p className="text-[12px] text-[#F59E0B] bg-[#FFFBEB] rounded-[8px] p-3 text-center">
                  Wajib cantumkan kode unik <strong>{paymentResult.payment_code}</strong> di kolom berita/catatan transfer.
                </p>
              </div>
            )}

            {/* QRIS */}
            {paymentResult.payment_type === "qris" && (
              <div className="space-y-4 text-center">
                <p className="text-[14px] text-[#8E8E8E]">Scan QR Code dengan aplikasi m-banking atau e-wallet</p>
                {paymentResult.qr_content && (
                  <div className="flex justify-center">
                    <div className="border-2 border-[#3197A5] rounded-[12px] p-3">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(paymentResult.qr_content)}&size=250x250`}
                        alt="QRIS QR Code"
                        width={250}
                        height={250}
                      />
                    </div>
                  </div>
                )}
                {paymentResult.validity_period && (
                  <p className="text-[13px] text-[#8E8E8E]">
                    Berlaku hingga {new Date(paymentResult.validity_period).toLocaleString("id-ID")}
                  </p>
                )}
              </div>
            )}

            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#3197A5] animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 rounded-full bg-[#3197A5] animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 rounded-full bg-[#3197A5] animate-bounce" style={{ animationDelay: "300ms" }} />
              <span className="text-[13px] text-[#8E8E8E] ml-2">Menunggu konfirmasi pembayaran...</span>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeItem="Home">
      <div className="w-full max-w-[1400px] mx-auto p-8 flex flex-col xl:flex-row gap-8 items-start">
        {/* LEFT COLUMN */}
        <div className="flex-1 w-full space-y-8">
          {/* CHECKOUT CARD */}
          <div className="bg-white rounded-[16px] p-8 shadow-[0px_12px_24px_-4px_rgba(145,158,171,0.12)] border border-gray-100">
            <div className="mb-6">
              <h2 className="text-[24px] font-medium text-[#1F1F1F] font-sans">Checkout</h2>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-[53px] h-[53px] relative flex items-center justify-center">
                  <Image src="/strovia-log.png" alt="Strovia" width={53} height={53} className="object-contain" />
                </div>
                <div>
                  <h3 className="text-[16px] font-medium text-[#1F1F1F]">Berlangganan</h3>
                  <p className="text-[14px] text-[#8E8E8E]">1 Akun</p>
                </div>
              </div>
              <div className="text-left md:text-right">
                <h3 className="text-[16px] font-medium text-[#1F1F1F]">
                  {isLoadingPlan ? "..." : planPriceLabel}
                </h3>
                <p className="text-[14px] text-[#8E8E8E]">Per 30 hari</p>
              </div>
            </div>
          </div>

          {/* PAYMENT METHODS */}
          <div className="bg-white rounded-[16px] p-8 shadow-[0px_12px_24px_-4px_rgba(145,158,171,0.12)] border border-gray-100">
            <div className="mb-6">
              <h2 className="text-[24px] font-medium text-[#1F1F1F] font-sans">Metode Pembayaran</h2>
            </div>

            {isLoadingMethods ? (
              <div className="text-center py-8 text-gray-500">Memuat metode pembayaran...</div>
            ) : (
              <div className="space-y-8">
                {Object.entries(
                  paymentMethods
                    .reduce(
                      (acc: Record<string, PaymentMethod[]>, method) => {
                        const category = method.category;
                        if (!acc[category]) acc[category] = [];
                        acc[category].push(method);
                        return acc;
                      },
                      {} as Record<string, PaymentMethod[]>,
                    ),
                ).map(([category, methods]) => {
                  const categoryMap: Record<string, string> = {
                    "Virtual Account": "Virtual Account",
                    "Bank Transfer": "Transfer Bank",
                    "QRIS": "QRIS",
                  };

                  return (
                    <div key={category}>
                      <h3 className="text-[14px] font-semibold text-[#8E8E8E] uppercase mb-4 tracking-wider">
                        {categoryMap[category] ?? category}
                      </h3>
                      <div className="space-y-4">
                        {methods.map((method) => (
                          <div
                            key={method.code}
                            className={`border-[2px] rounded-[8px] p-6 cursor-pointer transition-all duration-300 ${
                              selectedMethod === method.code
                                ? "border-[#3197A5] bg-[#3197A5]/5"
                                : "border-[#E1E1E1] hover:bg-gray-50"
                            }`}
                            onClick={() => setSelectedMethod(method.code)}
                          >
                            <div className="flex justify-between items-center w-full">
                              <div>
                                <span className="text-[14px] font-medium text-[#1F1F1F]">{method.name}</span>
                                <div
                                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                                    selectedMethod === method.code
                                      ? "grid-rows-[1fr] opacity-100 mt-1"
                                      : "grid-rows-[0fr] opacity-0"
                                  }`}
                                >
                                  <div className="overflow-hidden">
                                    <p className="text-[12px] text-[#8E8E8E]">{method.description}</p>
                                    <p className="text-[12px] text-[#3197A5] mt-1">{method.estimatedTime}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="w-5 h-5 rounded-full border-2 border-[#E1E1E1] flex items-center justify-center flex-shrink-0">
                                {selectedMethod === method.code && (
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#3197A5]" />
                                )}
                              </div>
                            </div>

                            {/* Bank selection for VA */}
                            {method.code === "virtual_account" && selectedMethod === "virtual_account" && (
                              <div className="mt-4 pt-4 border-t border-gray-100" onClick={(e) => e.stopPropagation()}>
                                <p className="text-[12px] text-[#8E8E8E] mb-3">Pilih bank Virtual Account:</p>
                                <div className="grid grid-cols-3 gap-2">
                                  {VA_BANKS.map((bank) => (
                                    <button
                                      key={bank.key}
                                      type="button"
                                      onClick={() => setSelectedBank(bank.key)}
                                      className={`flex flex-col items-center gap-2 p-3 rounded-[8px] border-[2px] transition-all ${
                                        selectedBank === bank.key
                                          ? "border-[#3197A5] bg-[#3197A5]/5"
                                          : "border-[#E1E1E1] hover:bg-gray-50"
                                      }`}
                                    >
                                      <img src={bank.icon} alt={bank.name} className="h-6 object-contain" />
                                      <span className="text-[11px] text-[#1F1F1F] text-center leading-tight">{bank.name}</span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Summary */}
        <div className="w-full xl:w-[344px] flex-shrink-0">
          <div className="bg-white rounded-[16px] p-6 shadow-[0px_12px_24px_-4px_rgba(145,158,171,0.12)] border border-gray-100 sticky top-24">
            <div className="mb-6">
              <h2 className="text-[20px] font-medium text-[#1F1F1F] font-sans">Ringkasan</h2>
            </div>

            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 relative">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15 8L21 9L16.5 13.5L18 19.5L12 16L6 19.5L7.5 13.5L3 9L9 8L12 2Z" fill="#3197A5" />
                  </svg>
                </div>
                <span className="text-[16px] text-[#1F1F1F]">Berlangganan</span>
              </div>
              <div className="text-right">
                <p className="text-[16px] font-medium text-[#1F1F1F]">
                  {isLoadingPlan ? "..." : planPriceLabel}
                </p>
                <p className="text-[12px] text-[#8E8E8E]">Per 30 hari</p>
              </div>
            </div>

            <div className="border-t border-dashed border-[#E1E1E1] my-4"></div>

            <div className="flex justify-between items-start mb-8">
              <span className="text-[16px] font-medium text-[#1F1F1F]">Total</span>
              <div className="text-right">
                <p className="text-[16px] font-medium text-[#1F1F1F]">
                  {isLoadingPlan ? "..." : planPriceLabel}
                </p>
                <p className="text-[12px] text-[#8E8E8E]">(Termasuk PPN)</p>
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={isSubmitting || isLoadingPlan || !plan?.id}
              className={`w-full bg-[#3197A5] hover:bg-[#288a96] text-white font-medium py-3 rounded-full transition-colors shadow-lg shadow-[#3197A5]/20 ${
                isSubmitting || isLoadingPlan || !plan?.id ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Memproses..." : isLoadingPlan ? "Memuat..." : !plan?.id ? "Paket tidak tersedia" : "Lanjutkan Pembayaran"}
            </button>
            {!isLoadingPlan && !plan?.id && (
              <p className="text-[12px] text-red-500 text-center mt-2">
                Paket langganan tidak ditemukan. Hubungi tim support.
              </p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
