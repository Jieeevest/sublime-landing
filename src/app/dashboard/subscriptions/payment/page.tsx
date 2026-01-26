"use client";

import {
  usePurchaseSubscriptionMutation,
  useGetPaymentMethodsQuery,
  useLazyCheckPaymentStatusQuery,
} from "@/redux/api/sublimeApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState, useEffect, ChangeEvent } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Image from "next/image";

export default function PaymentPage() {
  const router = useRouter();
  const [purchaseSubscription, { isLoading: isSubmitting }] =
    usePurchaseSubscriptionMutation();
  const { data: methodsData, isLoading: isLoadingMethods } =
    useGetPaymentMethodsQuery(undefined);
  const [triggerCheckStatus] = useLazyCheckPaymentStatusQuery();

  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [pollingOrderId, setPollingOrderId] = useState<string | null>(null);

  // Form State
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  // Formatting Helpers
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.length > 1 ? parts.join(" ") : value;
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + " / " + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!/^[0-9\s]*$/.test(val)) return;
    setCardNumber(formatCardNumber(val));
  };

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!/^[0-9\s/]*$/.test(val)) return;
    setExpiryDate(formatExpiryDate(val));
  };

  const handleCvvChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!/^[0-9]*$/.test(val)) return;
    if (val.length <= 4) setCvv(val);
  };

  // Polling Effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (pollingOrderId) {
      intervalId = setInterval(async () => {
        try {
          const result = await triggerCheckStatus(pollingOrderId).unwrap();
          // Assuming the API returns a status field in data
          // Adjust based on actual API response structure for 'status'
          const status = result?.data?.status;

          if (status === "settlement" || status === "capture") {
            toast.success("Pembayaran berhasil!");
            setPollingOrderId(null);
            router.push("/dashboard?subscription=success");
          } else if (
            status === "deny" ||
            status === "cancel" ||
            status === "expire"
          ) {
            toast.error("Pembayaran gagal atau kadaluarsa.");
            setPollingOrderId(null);
          }
          // If pending, continue polling
        } catch (error) {
          console.error("Error checking payment status:", error);
        }
      }, 5000); // Poll every 5 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [pollingOrderId, triggerCheckStatus, router]);

  const paymentMethods = methodsData?.data?.all || [];

  return (
    <DashboardLayout activeItem="Home">
      <div className="w-full max-w-[1400px] mx-auto p-8 flex flex-col xl:flex-row gap-8 items-start">
        {/* LEFT COLUMN: Content */}
        <div className="flex-1 w-full space-y-8">
          {/* CHECKOUT CARD */}
          <div className="bg-white rounded-[16px] p-8 shadow-[0px_12px_24px_-4px_rgba(145,158,171,0.12)] border border-gray-100">
            <div className="mb-6">
              <h2 className="text-[24px] font-medium text-[#1F1F1F] font-sans">
                Checkout
              </h2>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Strovia Logo Placeholder */}
                <div className="w-[53px] h-[53px] relative flex items-center justify-center">
                  <Image
                    src="/strovia-log.png"
                    alt="Strovia"
                    width={53}
                    height={53}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-[16px] font-medium text-[#1F1F1F]">
                    Berlangganan
                  </h3>
                  <p className="text-[14px] text-[#8E8E8E]">1 Akun</p>
                </div>
              </div>

              <div className="text-left md:text-right">
                <h3 className="text-[16px] font-medium text-[#1F1F1F]">
                  Rp 138.000
                </h3>
                <p className="text-[14px] text-[#8E8E8E]">Per 30 hari</p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[14px] text-[#8E8E8E]">
                • Penagihan bulanan mulai hari ini.
              </p>
              <p className="text-[14px] text-[#8E8E8E]">
                • Batalkan kapan saja secara online.{" "}
                <span className="text-[#3197A5] cursor-pointer">
                  Syarat dan ketentuan berlaku.
                </span>
              </p>
            </div>
          </div>

          {/* PAYMENT METHODS CARD */}
          <div className="bg-white rounded-[16px] p-8 shadow-[0px_12px_24px_-4px_rgba(145,158,171,0.12)] border border-gray-100">
            <div className="mb-6">
              <h2 className="text-[24px] font-medium text-[#1F1F1F] font-sans">
                Metode Pembayaran
              </h2>
            </div>

            {isLoadingMethods ? (
              <div className="text-center py-8 text-gray-500">
                Memuat metode pembayaran...
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(
                  paymentMethods.reduce((acc: any, method: any) => {
                    const category = method.category;
                    if (!acc[category]) {
                      acc[category] = [];
                    }
                    acc[category].push(method);
                    return acc;
                  }, {}),
                )
                  .sort(([a]: [string, any], [b]: [string, any]) => {
                    // Custom sort order: Card Payment first
                    if (a === "Card Payment") return -1;
                    if (b === "Card Payment") return 1;
                    return 0;
                  })
                  .map(([category, methods]: [string, any]) => {
                    // Translate Category
                    let displayCategory = category;
                    if (category === "Card Payment")
                      displayCategory = "Kartu Kredit / Debit";
                    else if (category === "E-Wallet")
                      displayCategory = "E-Wallet";
                    else if (category === "Virtual Account")
                      displayCategory = "Virtual Account";
                    else if (category === "Convenience Store")
                      displayCategory = "Gerai Retail";
                    else if (category === "Cardless Credit")
                      displayCategory = "Cicilan Tanpa Kartu";

                    return (
                      <div key={category}>
                        <h3 className="text-[14px] font-semibold text-[#8E8E8E] uppercase mb-4 tracking-wider">
                          {displayCategory}
                        </h3>
                        <div className="space-y-4">
                          {methods.map((method: any) => (
                            <div
                              key={method.code}
                              className={`border-[2px] rounded-[8px] p-6 flex flex-col justify-center cursor-pointer transition-all duration-300 ${
                                selectedMethod === method.code
                                  ? "border-[#3197A5] bg-[#3197A5]/5"
                                  : "border-[#E1E1E1] hover:bg-gray-50"
                              }`}
                              onClick={() => setSelectedMethod(method.code)}
                            >
                              <div className="flex justify-between items-center w-full">
                                <div className="flex items-center gap-4">
                                  {method.icon && (
                                    <div className="w-[60px] h-[30px] relative flex items-center justify-start">
                                      <img
                                        src={
                                          method.code === "gopay"
                                            ? "/logo-gopay.svg"
                                            : method.code === "dana"
                                              ? "/logo-dana.svg"
                                              : method.code === "credit_card"
                                                ? "/logo-master-card.svg"
                                                : "https://placehold.co/60x30?text=Payment"
                                        }
                                        alt={method.name}
                                        width={60}
                                        height={30}
                                        className="object-contain"
                                      />
                                    </div>
                                  )}
                                  <div>
                                    <span className="text-[14px] font-medium text-[#1F1F1F]">
                                      {method.name}
                                    </span>
                                    {/* Instructions if selected */}
                                    <div
                                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                                        selectedMethod === method.code &&
                                        method.code !== "credit_card"
                                          ? "grid-rows-[1fr] opacity-100 mt-1"
                                          : "grid-rows-[0fr] opacity-0"
                                      }`}
                                    >
                                      <div className="overflow-hidden">
                                        <p className="text-[12px] text-[#8E8E8E]">
                                          {method.description}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-5 h-5 rounded-full border-2 border-[#E1E1E1] flex items-center justify-center">
                                  {selectedMethod === method.code && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#3197A5]" />
                                  )}
                                </div>
                              </div>

                              {/* Credit Card Form */}
                              {method.code === "credit_card" && (
                                <div
                                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                                    selectedMethod === method.code
                                      ? "grid-rows-[1fr] opacity-100"
                                      : "grid-rows-[0fr] opacity-0"
                                  }`}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="overflow-hidden">
                                    <div className="mt-6 border-t border-gray-100 pt-6">
                                      <p className="text-[12px] text-[#8E8E8E] mb-6">
                                        Kami mendukung Mastercard, Visa, dan
                                        American Express.
                                      </p>

                                      <div className="space-y-4">
                                        {/* Card Number */}
                                        <div className="w-full">
                                          <div className="relative border border-[#E1E1E1] rounded-[8px] h-[54px] flex items-center px-4 bg-white focus-within:border-[#3197A5] focus-within:ring-1 focus-within:ring-[#3197A5]/20 transition-all">
                                            <input
                                              type="text"
                                              value={cardNumber}
                                              onChange={handleCardNumberChange}
                                              maxLength={19}
                                              placeholder="0000 0000 0000 0000"
                                              className="w-full outline-none text-[#1F1F1F] text-[14px] placeholder:text-[#9CA3AF] bg-transparent pt-3"
                                            />
                                            <label className="absolute top-1.5 left-[14px] bg-transparent text-[10px] uppercase font-semibold text-[#8E8E8E]">
                                              Card Number
                                            </label>
                                          </div>
                                        </div>

                                        {/* Card Holder */}
                                        <div className="w-full">
                                          <div className="relative border border-[#E1E1E1] rounded-[8px] h-[54px] flex items-center px-4 bg-white focus-within:border-[#3197A5] focus-within:ring-1 focus-within:ring-[#3197A5]/20 transition-all">
                                            <input
                                              type="text"
                                              value={cardHolder}
                                              onChange={(e) =>
                                                setCardHolder(e.target.value)
                                              }
                                              placeholder="Nama Pemilik Kartu"
                                              className="w-full outline-none text-[#1F1F1F] text-[14px] placeholder:text-[#9CA3AF] bg-transparent pt-3"
                                            />
                                            <label className="absolute top-1.5 left-[14px] bg-transparent text-[10px] uppercase font-semibold text-[#8E8E8E]">
                                              Card Holder
                                            </label>
                                          </div>
                                        </div>

                                        {/* Expiry & CVV */}
                                        <div className="flex gap-4">
                                          <div className="flex-1">
                                            <div className="relative border border-[#E1E1E1] rounded-[8px] h-[54px] flex items-center px-4 bg-white focus-within:border-[#3197A5] focus-within:ring-1 focus-within:ring-[#3197A5]/20 transition-all">
                                              <input
                                                type="text"
                                                value={expiryDate}
                                                onChange={handleExpiryChange}
                                                maxLength={7}
                                                placeholder="MM / YY"
                                                className="w-full outline-none text-[#1F1F1F] text-[14px] placeholder:text-[#9CA3AF] bg-transparent pt-3"
                                              />
                                              <label className="absolute top-1.5 left-[14px] bg-transparent text-[10px] uppercase font-semibold text-[#8E8E8E]">
                                                Expiration Date
                                              </label>
                                            </div>
                                          </div>
                                          <div className="flex-1">
                                            <div className="relative border border-[#E1E1E1] rounded-[8px] h-[54px] flex items-center px-4 bg-white focus-within:border-[#3197A5] focus-within:ring-1 focus-within:ring-[#3197A5]/20 transition-all">
                                              <input
                                                type="password"
                                                value={cvv}
                                                onChange={handleCvvChange}
                                                maxLength={4}
                                                placeholder="***"
                                                className="w-full outline-none text-[#1F1F1F] text-[14px] placeholder:text-[#9CA3AF] bg-transparent pt-3"
                                              />
                                              <label className="absolute top-1.5 left-[14px] bg-transparent text-[10px] uppercase font-semibold text-[#8E8E8E]">
                                                CVV/CVC
                                              </label>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Save Card Checkbox */}
                                        <div
                                          className="flex items-start gap-3 mt-2 cursor-pointer"
                                          onClick={() => setSaveCard(!saveCard)}
                                        >
                                          <div
                                            className={`w-5 h-5 rounded flex items-center justify-center mt-0.5 transition-colors ${
                                              saveCard
                                                ? "bg-[#3197A5]"
                                                : "bg-gray-200"
                                            }`}
                                          >
                                            {saveCard && (
                                              <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 12 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M10 3L4.5 8.5L2 6"
                                                  stroke="white"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                />
                                              </svg>
                                            )}
                                          </div>
                                          <div>
                                            <p className="text-[14px] text-[#1F1F1F] font-medium select-none">
                                              Simpan kartu untuk pesanan
                                              berikutnya.
                                            </p>
                                            <p className="text-[12px] text-[#8E8E8E] mt-1 select-none">
                                              Hal ini tidak akan memengaruhi
                                              cara Anda membayar langganan yang
                                              sudah ada.
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
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
              <h2 className="text-[20px] font-medium text-[#1F1F1F] font-sans">
                Ringkasan
              </h2>
            </div>

            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 relative">
                  {/* Mini Logo */}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L15 8L21 9L16.5 13.5L18 19.5L12 16L6 19.5L7.5 13.5L3 9L9 8L12 2Z"
                      fill="#3197A5"
                    />
                  </svg>
                </div>
                <span className="text-[16px] text-[#1F1F1F]">Berlangganan</span>
              </div>
              <div className="text-right">
                <p className="text-[16px] font-medium text-[#1F1F1F]">
                  Rp 138.000
                </p>
                <p className="text-[12px] text-[#8E8E8E]">Per 30 hari</p>
              </div>
            </div>

            <div className="border-t border-dashed border-[#E1E1E1] my-4"></div>

            <div className="flex justify-between items-start mb-8">
              <span className="text-[16px] font-medium text-[#1F1F1F]">
                Total
              </span>
              <div className="text-right">
                <p className="text-[16px] font-medium text-[#1F1F1F]">
                  Rp 138.000
                </p>
                <p className="text-[12px] text-[#8E8E8E]">(Termasuk PPN)</p>
              </div>
            </div>

            <button
              onClick={async () => {
                if (!selectedMethod) {
                  toast.error("Mohon pilih metode pembayaran.");
                  return;
                }

                try {
                  const payload: any = {
                    plan_id: "fdc2245a-be68-4293-8e1b-7400fe3a0ae4",
                    payment_method: selectedMethod,
                  };

                  if (selectedMethod === "credit_card") {
                    if (!cardNumber || !expiryDate || !cvv || !cardHolder) {
                      toast.error("Mohon lengkapi detail kartu kredit.");
                      return;
                    }
                    const [month, year] = expiryDate.split(" / ");
                    payload.card_number = cardNumber.replace(/\s/g, "");
                    payload.card_exp_month = month;
                    payload.card_exp_year = "20" + year; // Assuming 20xx
                    payload.card_cvv = cvv;
                    // payload.card_holder = cardHolder; // Uncomment if API needs it
                  }

                  const res = await purchaseSubscription(payload).unwrap();
                  if (res.success) {
                    toast.success(
                      "Transaction created! Please complete payment.",
                    );
                    if (res.data?.redirect_url) {
                      window.open(res.data.redirect_url, "_blank");
                    }
                    if (res.data?.order_id) {
                      setPollingOrderId(res.data.order_id);
                    }
                  } else {
                    toast.error("Pembayaran gagal. Silakan coba lagi.");
                  }
                } catch (error) {
                  console.error("Payment failed:", error);
                  toast.error("Terjadi kesalahan saat memproses pembayaran.");
                }
              }}
              disabled={isSubmitting || !!pollingOrderId}
              className={`w-full bg-[#3197A5] hover:bg-[#288a96] text-white font-medium py-3 rounded-full transition-colors shadow-lg shadow-[#3197A5]/20 ${
                isSubmitting || !!pollingOrderId
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
            >
              {isSubmitting
                ? "Memproses..."
                : pollingOrderId
                  ? "Menunggu Pembayaran..."
                  : "Lanjutkan Pembayaran"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
