"use client";

import { useGetInvoiceByIdQuery } from "@/redux/api/sublimeApi";
import { Download, Printer, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function InvoiceDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: invoiceData, isLoading } = useGetInvoiceByIdQuery(id);
  const invoice = invoiceData?.data;

  // Mock data for fallback if API is not fully ready or for dev
  const mockInvoice = {
    id: "INV-1991",
    status: "PAID",
    createdAt: "2025-12-27",
    period: "27 Des 2025 - 26 Jan 2026",
    issuer: {
      name: "Strovia",
      email: "support@strovia.app",
      address: "969 Emerson Road Winnfield, LA",
    },
    billedTo: {
      name: "Kiara Nelson",
      email: "kiaranelson@gmail.com",
      address: "16 Terrace, Jakarta Selatan, 20134, DKI Jakarta, Indonesia",
    },
    items: [
      {
        name: "Berlangganan",
        period: "27 Des 2025 - 26 Jan 2026",
        price: 138000,
      },
    ],
    subtotal: 138000,
    total: 138000,
  };

  // Use mock data for layout dev if real data isn't populate yet
  // const data = invoice || mockInvoice;
  // Actually, let's try to map real data if available, else mock structure for now
  const data = invoice || mockInvoice;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Invoice ${data.id}`,
          text: `Invoice details for ${data.id}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  return (
    <div className="p-8 font-sans max-w-5xl mx-auto">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-8 print:hidden">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/profile"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-[#1F1F1F]" />
          </Link>
          <h1 className="text-2xl font-bold text-[#1F1F1F]">Invoice</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-[#1F1F1F]"
          >
            <Share2 size={20} />
          </button>
          <button
            onClick={handlePrint}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-[#1F1F1F]"
          >
            <Printer size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-[#1F1F1F]">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Invoice Card */}
      <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 print:shadow-none print:border-none print:p-0">
        {/* Card Header: Logo & Status */}
        <div className="flex justify-between items-start mb-16">
          <div className="text-[#3197A5]">
            {/* SVG Logo Placeholder */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm0 36c-8.837 0-16-7.163-16-16S11.163 4 20 4s16 7.163 16 16-7.163 16-16 16z"
                fill="currentColor"
                fillOpacity="0.2"
              />
              <path
                d="M20 10c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="text-right">
            <span
              className={`inline-block px-3 py-1 rounded-sm text-xs font-bold mb-2 ${
                data.status === "PAID"
                  ? "bg-[#E0F2F4] text-[#3197A5]"
                  : "bg-[#FFF4E5] text-[#FF9500]"
              }`}
            >
              {data.status === "PAID" ? "DIBAYAR" : data.status}
            </span>
            <p className="text-sm font-bold text-[#1F1F1F]">{data.id}</p>
          </div>
        </div>

        {/* Addresses */}
        <div className="grid grid-cols-2 gap-12 mb-16">
          <div>
            <h4 className="text-xs font-bold text-[#1F1F1F] mb-4">
              Diterbitkan Oleh
            </h4>
            <div className="text-xs text-[#525252] space-y-1">
              <p className="font-medium text-[#1F1F1F]">
                {mockInvoice.issuer.name}
              </p>
              <p>{mockInvoice.issuer.email}</p>
              <p>{mockInvoice.issuer.address}</p>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#1F1F1F] mb-4">
              Ditagihkan Kepada
            </h4>
            <div className="text-xs text-[#525252] space-y-1">
              <p className="font-medium text-[#1F1F1F]">
                {data.billedTo?.name || mockInvoice.billedTo.name}
              </p>
              <p>{data.billedTo?.email || mockInvoice.billedTo.email}</p>
              <p className="max-w-xs">
                {data.billedTo?.address || mockInvoice.billedTo.address}
              </p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <div className="flex items-center text-xs font-bold text-gray-400 bg-gray-50 rounded-lg p-4 mb-2">
            <div className="flex-1">Deskripsi</div>
            <div className="flex-1 text-center">Periode</div>
            <div className="w-32 text-right">Harga</div>
          </div>
          {data.items?.map((item: any, idx: number) => (
            <div
              key={idx}
              className="flex items-center text-xs text-[#1F1F1F] p-4 border-b border-gray-50 last:border-0"
            >
              <div className="flex-1 font-medium">{item.name}</div>
              <div className="flex-1 text-center text-[#525252]">
                {item.period || data.period || "-"}
              </div>
              <div className="w-32 text-right">
                Rp {item.price.toLocaleString("id-ID")}
              </div>
            </div>
          )) || (
            <div className="flex items-center text-xs text-[#1F1F1F] p-4">
              <div className="flex-1 font-medium">Berlangganan</div>
              <div className="flex-1 text-center text-[#525252]">
                27 Des 2025 - 26 Jan 2026
              </div>
              <div className="w-32 text-right">Rp 138.000</div>
            </div>
          )}
        </div>

        {/* Totals */}
        <div className="border-t border-gray-100 pt-4 mb-20">
          <div className="flex justify-end items-center gap-12 text-xs mb-3">
            <span className="text-[#525252]">Sub Total (Termasuk PPN)</span>
            <span className="font-bold text-[#1F1F1F] w-32 text-right">
              Rp {data.total.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="flex justify-end items-center gap-12 text-sm">
            <span className="font-bold text-[#1F1F1F]">Total</span>
            <span className="font-bold text-[#1F1F1F] w-32 text-right">
              Rp {data.total.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end border-t border-dashed border-gray-200 pt-8">
          <div className="max-w-md">
            <h4 className="text-xs font-bold text-[#1F1F1F] mb-2 uppercase">
              Notes
            </h4>
            <p className="text-[10px] text-[#525252] mb-1">
              Terima kasih telah bergabung bersama STROVIA.
            </p>
            <p className="text-[10px] text-[#525252]">
              Invoice ini dibuat secara otomatis dan sah tanpa tanda tangan.
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-[#1F1F1F] mb-1">
              Butuh bantuan?
            </p>
            <p className="text-[10px] text-[#525252]">support@strovia.app</p>
          </div>
        </div>
      </div>
    </div>
  );
}
