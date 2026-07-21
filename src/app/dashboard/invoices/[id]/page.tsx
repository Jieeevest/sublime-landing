"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useGetInvoiceByIdQuery } from "@/redux/api/sublimeApi";
import { Download, Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useRef } from "react";

interface ApiInvoiceItem {
  id?: string;
  name?: string;
  price?: string;
  quantity?: number;
}

interface ApiPlan {
  id?: string;
  name?: string;
  price?: string;
  duration_days?: number;
}

interface ApiUser {
  id?: string;
  name?: string;
  email?: string;
}

interface ApiInvoice {
  id?: string;
  invoice_number?: string;
  user_id?: string;
  amount?: string;
  tax?: string;
  total?: string;
  status?: string;
  due_date?: string;
  paid_at?: string | null;
  payment_method?: string;
  payment_reference?: string;
  items?: ApiInvoiceItem[];
  metadata?: Record<string, unknown>;
  midtrans_snap_token?: string;
  midtrans_redirect_url?: string;
  created_at?: string;
  updated_at?: string;
  plan?: ApiPlan;
  user?: ApiUser;
}

interface InvoiceItem {
  name: string;
  period?: string;
  price: number;
}

interface InvoiceViewModel {
  id: string;
  status: string;
  period: string;
  issuer: {
    name: string;
    email: string;
    address: string;
  };
  billedTo: {
    name: string;
    email: string;
    address: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  total: number;
}

export default function InvoiceDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: invoiceData } = useGetInvoiceByIdQuery(id);
  const invoiceRef = useRef<HTMLDivElement | null>(null);

  const apiInvoice: ApiInvoice | undefined = invoiceData?.data as
    | ApiInvoice
    | undefined;

  const mockInvoice: InvoiceViewModel = {
    id: "INV-1991",
    status: "PAID",
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
        price: 135900,
      },
    ],
    subtotal: 135900,
    total: 135900,
  };

  const apiTotal = apiInvoice?.total ? Number(apiInvoice.total) : undefined;
  const safeTotal =
    typeof apiTotal === "number" && !Number.isNaN(apiTotal)
      ? apiTotal
      : mockInvoice.total;

  let period = mockInvoice.period;
  if (apiInvoice?.paid_at && apiInvoice.plan?.duration_days) {
    const startDate = new Date(apiInvoice.paid_at);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + apiInvoice.plan.duration_days);

    const startStr = startDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const endStr = endDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    period = `${startStr} - ${endStr}`;
  }

  const items: InvoiceItem[] = apiInvoice?.items?.length
    ? apiInvoice.items.map((item) => {
        const priceNumber = item.price ? Number(item.price) : undefined;
        const safePrice =
          typeof priceNumber === "number" && !Number.isNaN(priceNumber)
            ? priceNumber
            : (mockInvoice.items[0]?.price ?? 0);

        return {
          name: item.name ?? "Berlangganan",
          period,
          price: safePrice,
        };
      })
    : mockInvoice.items;

  const status = (apiInvoice?.status || mockInvoice.status).toUpperCase();

  const billedTo = apiInvoice?.user
    ? {
        name: apiInvoice.user.name || mockInvoice.billedTo.name,
        email: apiInvoice.user.email || mockInvoice.billedTo.email,
        address: mockInvoice.billedTo.address,
      }
    : mockInvoice.billedTo;

  const data: InvoiceViewModel = {
    id: apiInvoice?.invoice_number || mockInvoice.id,
    status,
    period,
    issuer: mockInvoice.issuer,
    billedTo,
    items,
    subtotal: safeTotal,
    total: safeTotal,
  };

  const handlePrint = () => {
    if (typeof window === "undefined") return;
    const target = invoiceRef.current;
    if (!target) {
      window.print();
      return;
    }
    const printWindow = window.open("", "_blank", "width=1024,height=768");
    if (!printWindow) {
      window.print();
      return;
    }
    const html = target.innerHTML;
    printWindow.document.open();
    printWindow.document.write(
      "<html><head><title>Invoice " +
        data.id +
        '</title><style>@page{margin:0}body{margin:0;background:#F5F9FA;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;}</style></head><body>' +
        html +
        "</body></html>",
    );
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <DashboardLayout activeItem="Profile">
      <div className="w-full max-w-[1347px] mx-auto p-10 font-sans">
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
              onClick={handlePrint}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-[#1F1F1F]"
              aria-label="Cetak invoice"
            >
              <Printer size={20} />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-[#1F1F1F]"
              aria-label="Download invoice"
            >
              <Download size={20} />
            </button>
          </div>
        </div>

        {/* Invoice Card */}
        <div
          ref={invoiceRef}
          className="w-full bg-white rounded-3xl p-12 shadow-sm border border-gray-100 print:shadow-none print:border-none print:p-0"
        >
          {/* Card Header: Logo & Status */}
          <div className="flex justify-between items-start mb-16">
            <div className="text-[#3197A5]">
              <Image
                src="/strovia-log.png"
                alt="Strovia"
                width={120}
                height={24}
                className="object-contain"
              />
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
                <p className="font-medium text-[#1F1F1F]">{data.issuer.name}</p>
                <p>{data.issuer.email}</p>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1F1F1F] mb-4">
                Ditagihkan Kepada
              </h4>
              <div className="text-xs text-[#525252] space-y-1">
                <p className="font-medium text-[#1F1F1F]">
                  {data.billedTo.name}
                </p>
                <p>{data.billedTo.email}</p>
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
            {data.items?.map((item: InvoiceItem, idx: number) => (
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
                <div className="w-32 text-right">Rp 135.900</div>
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
    </DashboardLayout>
  );
}
