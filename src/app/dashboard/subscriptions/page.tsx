"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function SubscriptionsPage() {
  const router = useRouter();
  return (
    <DashboardLayout activeItem="Home">
      <div className="w-full flex flex-col items-center pt-6 pb-20 px-4">
        {/* Banner Section */}
        <div
          className="w-full max-w-[1200px] rounded-[24px] overflow-hidden relative mb-12 flex items-center justify-between px-16 py-12"
          style={{
            background: "#D3E8EB", // Light blue background from image
            minHeight: "280px",
          }}
        >
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            {/* Decorative Vector - similar to promo card but positioned for banner */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "1311px",
                height: "326px",
                right: "-400px",
                top: "50%",
                transform: "translateY(-50%) rotate(168.79deg)",
                border: "0.2px solid #3197A5",
                borderRadius: "50%",
                opacity: 0.3,
              }}
            />
          </div>

          {/* Content Container */}
          <div className="relative z-10 w-full flex flex-col items-center text-center">
            {/* Badge */}
            <div
              className="flex flex-row items-center justify-center gap-[4px] px-[16px] py-[4px] w-fit mb-6"
              style={{
                background: "rgba(49, 151, 165, 0.08)",
                border: "1px solid rgba(49, 151, 165, 0.07)",
                borderRadius: "99px",
              }}
            >
              {/* Stars Icon */}
              <div className="flex gap-0.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#3197A5"
                  className="transform -scale-x-100"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <span
                style={{
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "28px",
                  color: "#3197A5",
                }}
              >
                Berlangganan
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-[#3197A5] font-bold text-4xl leading-tight mb-4">
              Nikmati 30 hari hanya{" "}
              <span className="text-[#023347] text-5xl ml-2">Rp,138,000,-</span>
            </h2>
            <h2 className="text-[#3197A5] font-bold text-4xl leading-tight mb-8">
              Dengerin{" "}
              <span className="text-white bg-[#3197A5] px-2 py-1 rounded">
                Audio Therapy
              </span>{" "}
              di Berlangganan.
            </h2>

            {/* Footer Text */}
            <p className="text-[#023347] text-sm max-w-[600px] opacity-80">
              Tanpa perpanjangan otomatis. Tidak ada autodebet. Kamu tetap
              sepenuhnya mengontrol langgananmu.
            </p>
          </div>

          {/* Logo on Right */}
          <div className="absolute right-12 top-12 hidden lg:block">
            <img src="/strovia-log.png" alt="Strovia" className="h-8 w-auto" />
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center max-w-[800px] mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3197A5] leading-tight">
            Ayo mulai perjalanan proses pemulihan stroke Anda bersama Strovia
          </h1>
          <p className="text-gray-600 text-lg md:text-xl font-light">
            Pilih paket Premium dan dengarkan musik audio therapy yang Anda
            inginkan, kapan pun Anda mau. Bayar dengan berbagai cara. Batalkan
            kapan saja.
          </p>

          {/* Payment Methods */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            <Image
              src="/logo-visa.svg"
              alt="Visa"
              width={50}
              height={30}
              className="object-contain h-8 w-auto"
            />
            <Image
              src="/logo-master-card.svg"
              alt="Mastercard"
              width={50}
              height={30}
              className="object-contain h-8 w-auto"
            />
            <Image
              src="/logo-america-express.svg"
              alt="Amex"
              width={50}
              height={30}
              className="object-contain h-8 w-auto"
            />

            <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>

            <Image
              src="/logo-dana.svg"
              alt="Dana"
              width={60}
              height={30}
              className="object-contain h-6 w-auto"
            />
            <Image
              src="/logo-gopay.svg"
              alt="Gopay"
              width={60}
              height={30}
              className="object-contain h-6 w-auto"
            />

            <span className="text-gray-400 text-sm font-medium ml-2">
              +4 lainnya
            </span>
          </div>
        </div>

        {/* Subscription Card */}
        <div className="w-full max-w-[480px] bg-[#F3F8F9] rounded-[20px] p-8 border border-[#E1E1E1] relative overflow-hidden">
          {/* Popular Badge */}
          <div className="absolute top-8 right-8 bg-[#D3E8EB] text-[#3197A5] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <span>🔥</span> Popular
          </div>

          <div className="mb-2">
            <h3 className="text-xl font-bold text-[#1F1F1F]">Berlangganan</h3>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-[#1F1F1F]">
                Rp 138.000
              </span>
              <span className="text-gray-500 text-sm">per 30 hari</span>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#3197A5] flex items-center justify-center">
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
              </div>
              <span className="text-[#1F1F1F] text-sm">Akses semua audio</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#3197A5] flex items-center justify-center">
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
              </div>
              <span className="text-[#1F1F1F] text-sm">Chat AI</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#3197A5] flex items-center justify-center">
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
              </div>
              <span className="text-[#1F1F1F] text-sm">Artikel eksklusif</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#3197A5] flex items-center justify-center">
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
              </div>
              <span className="text-[#1F1F1F] text-sm">Tanpa autodebet</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => router.push("/dashboard/subscriptions/payment")}
            className="w-full bg-[#3197A5] hover:bg-[#288a96] text-white font-medium py-4 rounded-xl transition-colors shadow-lg shadow-[#3197A5]/20"
          >
            Mulai Berlangganan
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
