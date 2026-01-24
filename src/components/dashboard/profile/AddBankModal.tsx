"use client";

import { X, ChevronDown, Check, Info } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface AddBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  }) => Promise<void>;
  isLoading?: boolean;
}

export default function AddBankModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: AddBankModalProps) {
  const [formData, setFormData] = useState({
    bankName: "BCA",
    accountNumber: "",
    accountHolder: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.accountNumber || !formData.accountHolder) {
      toast.error("Mohon lengkapi data rekening");
      return;
    }
    await onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-[24px] w-full max-w-[500px] p-6 shadow-2xl relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-[#1E1E1E]">
            Tambah Rekening Bank
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium">
              Nama Bank
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#1E1E1E] appearance-none focus:outline-none focus:ring-1 focus:ring-[#3197A5] focus:border-[#3197A5] transition-all"
                value={formData.bankName}
                onChange={(e) =>
                  setFormData({ ...formData, bankName: e.target.value })
                }
              >
                <option value="BCA">BCA</option>
                <option value="Mandiri">Mandiri</option>
                <option value="BNI">BNI</option>
                <option value="BRI">BRI</option>
                <option value="CIMB Niaga">CIMB Niaga</option>
                <option value="Jago">Jago</option>
                <option value="SeaBank">SeaBank</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium">
              Nomor Rekening
            </label>
            <input
              type="text"
              placeholder="Contoh: 1234567890"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#1E1E1E] placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#3197A5] focus:border-[#3197A5] transition-all"
              value={formData.accountNumber}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, ""); // Numeric only
                setFormData({ ...formData, accountNumber: val });
              }}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5 font-medium">
              Nama Pemilik Rekening
            </label>
            <input
              type="text"
              placeholder="Nama sesuai buku tabungan"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-[#1E1E1E] placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#3197A5] focus:border-[#3197A5] transition-all"
              value={formData.accountHolder}
              onChange={(e) =>
                setFormData({ ...formData, accountHolder: e.target.value })
              }
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Info size={16} className="text-gray-400" />
            <p className="text-[10px] text-gray-400 leading-tight">
              Pastikan nama kamu sama dengan nama yang terdaftar di rekening
              bank kamu.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-[#3197A5] text-white rounded-full text-sm font-medium hover:bg-[#288a96] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
