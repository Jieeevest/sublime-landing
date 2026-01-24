"use client";

import { X, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useUpdateMeMutation } from "@/redux/api/sublimeApi";
import toast from "react-hot-toast";

interface EditBillingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
}

export default function EditBillingModal({
  isOpen,
  onClose,
  initialData,
}: EditBillingModalProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    province: initialData?.province || "DKI Jakarta",
    postalCode: initialData?.postalCode || "",
    country: initialData?.country || "Indonesia",
  });

  const [updateMe, { isLoading }] = useUpdateMeMutation();

  const handleSave = async () => {
    try {
      // Only sending address related info as per the modal's primary purpose.
      // Name and Email might be readonly or require different validation, but here we assume address update.
      // NOTE: The API 'updateMe' might expect 'name' to update the profile name.

      await updateMe({
        name: formData.name,
        // email: formData.email, // Email usually cannot be updated via simple profile update in many systems, but let's assume if API supports it or just skip if readonly.
        address: formData.address,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
        country: formData.country,
      }).unwrap();

      toast.success("Informasi penagihan berhasil diperbarui");
      onClose();
    } catch (error: any) {
      console.error("Failed to update billing info", error);
      toast.error(error?.data?.message || "Gagal memperbarui informasi");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-[24px] w-full max-w-[600px] p-8 shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-[#1E1E1E]">
            Edit Informasi Penagihan
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Payment Method */}
          <div>
            <label className="block text-sm font-bold text-[#1E1E1E] mb-2">
              Metode Pembayaran
            </label>
            <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#1E1E1E]">
                  Bank BCA • ****2002
                </span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </div>

          {/* Billing Name */}
          <div className="relative group">
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="block w-full px-4 pt-6 pb-2 text-sm text-[#1E1E1E] bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#3197A5] focus:border-[#3197A5] peer"
              placeholder=" "
            />
            <label className="absolute text-xs text-gray-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
              Nama Penagihan
            </label>
          </div>

          {/* Billing Email */}
          <div className="relative group">
            <input
              type="email"
              value={formData.email}
              disabled
              className="block w-full px-4 pt-6 pb-2 text-sm text-[#1E1E1E] bg-gray-50 border border-gray-200 rounded-xl focus:outline-none cursor-not-allowed peer"
              placeholder=" "
            />
            <label className="absolute text-xs text-gray-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
              Email Penagihan (Tidak dapat diubah)
            </label>
          </div>

          {/* Billing Address Section */}
          <div>
            <label className="block text-sm font-bold text-[#1E1E1E] mb-2">
              Alamat Penagihan
            </label>
            <div className="space-y-4">
              {/* Street */}
              <div className="relative group">
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="block w-full px-4 pt-6 pb-2 text-sm text-[#1E1E1E] bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#3197A5] focus:border-[#3197A5] peer"
                  placeholder=" "
                />
                <label className="absolute text-xs text-gray-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                  Jalan
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* City */}
                <div className="relative group">
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="block w-full px-4 pt-6 pb-2 text-sm text-[#1E1E1E] bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#3197A5] focus:border-[#3197A5] peer"
                    placeholder=" "
                  />
                  <label className="absolute text-xs text-gray-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                    Kota
                  </label>
                </div>

                {/* Province */}
                <div className="relative group">
                  <div className="relative">
                    <select
                      value={formData.province}
                      onChange={(e) =>
                        setFormData({ ...formData, province: e.target.value })
                      }
                      className="block w-full px-4 pt-6 pb-2 text-sm text-[#1E1E1E] bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#3197A5] focus:border-[#3197A5] peer appearance-none"
                    >
                      <option value="DKI Jakarta">DKI Jakarta</option>
                      <option value="Jawa Barat">Jawa Barat</option>
                      <option value="Jawa Tengah">Jawa Tengah</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                  <label className="absolute text-xs text-gray-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 pointer-events-none">
                    Provinsi
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Postal Code */}
                <div className="relative group">
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) =>
                      setFormData({ ...formData, postalCode: e.target.value })
                    }
                    className="block w-full px-4 pt-6 pb-2 text-sm text-[#1E1E1E] bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#3197A5] focus:border-[#3197A5] peer"
                    placeholder=" "
                  />
                  <label className="absolute text-xs text-gray-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                    Kode Pos
                  </label>
                </div>

                {/* Country */}
                <div className="relative group">
                  <div className="relative">
                    <select
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      className="block w-full px-4 pt-6 pb-2 text-sm text-[#1E1E1E] bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#3197A5] focus:border-[#3197A5] peer appearance-none"
                    >
                      <option value="Indonesia">Indonesia</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Malaysia">Malaysia</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                  <label className="absolute text-xs text-gray-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 pointer-events-none">
                    Negara
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-8 py-3 bg-[#3197A5] text-white rounded-full text-sm font-bold hover:bg-[#288a96] transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
