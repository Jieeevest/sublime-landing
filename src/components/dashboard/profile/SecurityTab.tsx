"use client";

import { useState } from "react";
import { Eye, EyeOff, Info } from "lucide-react";
import { useChangePasswordMutation } from "@/redux/api/sublimeApi";
import toast from "react-hot-toast";

export default function SecurityTab() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePassword = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (
      !formData.oldPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error("Harap isi semua kolom.");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Kata sandi baru minimal 6 karakter.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    try {
      await changePassword({
        currentPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }).unwrap();

      toast.success("Kata sandi berhasil diperbarui!");

      // Reset form
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error("Failed to change password", error);
      const errorMessage =
        error?.data?.description ||
        error?.data?.message ||
        "Gagal mengubah kata sandi.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 font-sans">
      <div className="space-y-6 max-w-full">
        {/* Old Password */}
        <div className="space-y-2">
          <div className="relative border border-gray-200 rounded-lg px-4 py-3 focus-within:border-[#3197A5] transition-colors group">
            <label className="block text-xs text-gray-400 mb-1 group-focus-within:text-[#3197A5] transition-colors">
              Kata Sandi Lama
            </label>
            <input
              type={showPassword.old ? "text" : "password"}
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full outline-none text-[#1F1F1F] text-sm font-medium bg-transparent pr-8"
              placeholder="Masukkan kata sandi lama"
            />
            <button
              onClick={() => togglePassword("old")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword.old ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <div className="relative border border-gray-200 rounded-lg px-4 py-3 focus-within:border-[#3197A5] transition-colors group">
            <label className="block text-xs text-gray-400 mb-1 group-focus-within:text-[#3197A5] transition-colors">
              Kata Sandi Baru
            </label>
            <input
              type={showPassword.new ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full outline-none text-[#1F1F1F] text-sm font-medium bg-transparent pr-8"
              placeholder="Masukkan kata sandi baru"
            />
            <button
              onClick={() => togglePassword("new")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 ml-1">
            <Info size={12} className="text-gray-400" />
            <span>Kata sandi minimal harus terdiri dari 6 karakter.</span>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="space-y-2">
          <div className="relative border border-gray-200 rounded-lg px-4 py-3 focus-within:border-[#3197A5] transition-colors group">
            <label className="block text-xs text-gray-400 mb-1 group-focus-within:text-[#3197A5] transition-colors">
              Konfirmasi Kata Sandi Baru
            </label>
            <input
              type={showPassword.confirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full outline-none text-[#1F1F1F] text-sm font-medium bg-transparent pr-8"
              placeholder="Konfirmasi kata sandi baru"
            />
            <button
              onClick={() => togglePassword("confirm")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-[#3197A5] hover:bg-[#288a96] text-white px-6 py-3 rounded-full font-medium text-sm transition-colors shadow-lg shadow-[#3197A5]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
