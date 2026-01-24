"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Image from "next/image";
import { useState } from "react";

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<
    "card" | "dana" | "gopay"
  >("card");

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

            <div className="space-y-4">
              {/* Credit Card Option */}
              <div
                className={`border-[2px] rounded-[8px] p-6 relative cursor-pointer transition-all duration-300 ${
                  selectedMethod === "card"
                    ? "border-[#3197A5]"
                    : "border-[#E1E1E1] hover:bg-gray-50"
                }`}
                onClick={() => setSelectedMethod("card")}
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-[16px] font-medium text-[#1F1F1F]">
                    Credit / Debit Card
                  </h3>
                  {/* Card Logos */}
                  <div className="flex gap-2">
                    <Image
                      src="/logo-master-card.svg"
                      alt="Mastercard"
                      width={32}
                      height={20}
                      className="object-contain"
                    />
                    <Image
                      src="/logo-visa.svg"
                      alt="Visa"
                      width={32}
                      height={20}
                      className="object-contain"
                    />
                    <Image
                      src="/logo-america-express.svg"
                      alt="Amex"
                      width={32}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Expanded Content for Card */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    selectedMethod === "card"
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-4">
                      <p className="text-[12px] text-[#8E8E8E] mb-6">
                        Kami mendukung Mastercard, Visa, dan American Express.
                      </p>

                      {/* Form */}
                      <div className="space-y-4">
                        {/* Card Number */}
                        <div className="w-full">
                          <div className="relative border border-[#E1E1E1] rounded-[8px] h-[54px] flex items-center px-4 bg-white">
                            <input
                              type="text"
                              placeholder="8889 9999 9999 9999 999"
                              className="w-full outline-none text-[#1F1F1F] text-[14px] placeholder:text-[#1F1F1F] bg-transparent"
                            />
                            <label className="absolute -top-[9px] left-[14px] bg-white px-1 text-[12px] text-[#8E8E8E]">
                              Card Number
                            </label>
                          </div>
                        </div>

                        {/* Card Holder */}
                        <div className="w-full">
                          <div className="relative border border-[#E1E1E1] rounded-[8px] h-[54px] flex items-center px-4 bg-white">
                            <input
                              type="text"
                              placeholder="Kiara Nelson"
                              className="w-full outline-none text-[#1F1F1F] text-[14px] placeholder:text-[#1F1F1F] bg-transparent"
                            />
                            <label className="absolute -top-[9px] left-[14px] bg-white px-1 text-[12px] text-[#8E8E8E]">
                              Card Holder
                            </label>
                          </div>
                        </div>

                        {/* Expiry & CVV */}
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <div className="relative border border-[#E1E1E1] rounded-[8px] h-[54px] flex items-center px-4 bg-white">
                              <input
                                type="text"
                                placeholder="02 / 26"
                                className="w-full outline-none text-[#1F1F1F] text-[14px] placeholder:text-[#1F1F1F] bg-transparent"
                              />
                              <label className="absolute -top-[9px] left-[14px] bg-white px-1 text-[12px] text-[#8E8E8E]">
                                Expiration Date
                              </label>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="relative border border-[#E1E1E1] rounded-[8px] h-[54px] flex items-center px-4 bg-white">
                              <input
                                type="text"
                                placeholder="***"
                                className="w-full outline-none text-[#1F1F1F] text-[14px] placeholder:text-[#1F1F1F] bg-transparent"
                              />
                              <label className="absolute -top-[9px] left-[14px] bg-white px-1 text-[12px] text-[#8E8E8E]">
                                CVV/CVC
                              </label>
                              <div className="w-5 h-5 rounded-full border border-[#8E8E8E] text-[#8E8E8E] flex items-center justify-center text-xs ml-2 cursor-help">
                                ?
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Save Card Checkbox */}
                        <div className="flex items-start gap-3 mt-2">
                          <div className="w-5 h-5 bg-[#3197A5] rounded flex items-center justify-center mt-0.5">
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
                          <div>
                            <p className="text-[14px] text-[#1F1F1F] font-medium">
                              Simpan kartu untuk pesanan berikutnya.
                            </p>
                            <p className="text-[12px] text-[#8E8E8E] mt-1">
                              Hal ini tidak akan memengaruhi cara Anda membayar
                              langganan yang sudah ada dan dapat dikelola kapan
                              saja di halaman Akun Anda.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dana Option */}
              <div
                className={`border-[2px] rounded-[8px] p-6 flex flex-col justify-center cursor-pointer transition-all duration-300 ${
                  selectedMethod === "dana"
                    ? "border-[#3197A5]"
                    : "border-[#E1E1E1] hover:bg-gray-50"
                }`}
                onClick={() => setSelectedMethod("dana")}
              >
                <div className="flex justify-between items-center w-full mb-1">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-medium text-[#1F1F1F]">
                      Dana
                    </span>
                  </div>
                  <Image
                    src="/logo-dana.svg"
                    alt="Dana"
                    width={60}
                    height={30}
                    className="object-contain h-6 w-auto"
                  />
                </div>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    selectedMethod === "dana"
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-4 w-full">
                      <div className="w-full">
                        <div className="relative border border-[#E1E1E1] rounded-[8px] h-[54px] flex items-center px-4 bg-white">
                          <input
                            type="text"
                            placeholder="0812 3456 7890"
                            className="w-full outline-none text-[#1F1F1F] text-[14px] placeholder:text-[#9CA3AF] bg-transparent"
                          />
                          <label className="absolute -top-[9px] left-[14px] bg-white px-1 text-[12px] text-[#8E8E8E]">
                            Nomor Telepon
                          </label>
                        </div>
                        <p className="text-[12px] text-[#8E8E8E] mt-2">
                          Pastikan nomor handphone anda terhubung dengan DANA.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gopay Option */}
              <div
                className={`border-[2px] rounded-[8px] p-6 flex flex-col justify-center cursor-pointer transition-all duration-300 ${
                  selectedMethod === "gopay"
                    ? "border-[#3197A5]"
                    : "border-[#E1E1E1] hover:bg-gray-50"
                }`}
                onClick={() => setSelectedMethod("gopay")}
              >
                <div className="flex justify-between items-center w-full mb-1">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-medium text-[#1F1F1F]">
                      Gopay
                    </span>
                  </div>
                  <Image
                    src="/logo-gopay.svg"
                    alt="Gopay"
                    width={60}
                    height={30}
                    className="object-contain h-6 w-auto"
                  />
                </div>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    selectedMethod === "gopay"
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-4 w-full">
                      <div className="w-full">
                        <div className="relative border border-[#E1E1E1] rounded-[8px] h-[54px] flex items-center px-4 bg-white">
                          <input
                            type="text"
                            placeholder="0812 3456 7890"
                            className="w-full outline-none text-[#1F1F1F] text-[14px] placeholder:text-[#9CA3AF] bg-transparent"
                          />
                          <label className="absolute -top-[9px] left-[14px] bg-white px-1 text-[12px] text-[#8E8E8E]">
                            Nomor Telepon
                          </label>
                        </div>
                        <p className="text-[12px] text-[#8E8E8E] mt-2">
                          Pastikan nomor handphone anda terhubung dengan GOPAY.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

            <button className="w-full bg-[#3197A5] hover:bg-[#288a96] text-white font-medium py-3 rounded-full transition-colors shadow-lg shadow-[#3197A5]/20">
              Lanjutkan Pembayaran
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
