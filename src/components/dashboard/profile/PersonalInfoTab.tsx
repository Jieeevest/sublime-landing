"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useGetMeQuery, useUpdateMeMutation } from "@/redux/api/sublimeApi";
import toast from "react-hot-toast";

export default function PersonalInfoTab() {
  const { data: user, refetch } = useGetMeQuery(undefined);
  const [updateMe, { isLoading: isUpdating }] = useUpdateMeMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
  });

  useEffect(() => {
    if (user?.data) {
      const names = user.data.name ? user.data.name.split(" ") : ["", ""];
      // Handle cases where name might be just one word or multiple
      const firstName = names[0] || "";
      const lastName = names.slice(1).join(" ") || "";

      setFormData({
        firstName: firstName,
        lastName: lastName,
        email: user.data.email || "",
        phone: user.data.phone || "",
        birthDate: user.data.birthDate || "",
        gender: user.data.gender || "Wanita",
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      await updateMe({
        name: fullName,
        phone: formData.phone,
        birthDate: formData.birthDate,
        gender: formData.gender,
      }).unwrap();

      toast.success("Profil berhasil diperbarui!");
      refetch();
    } catch (error) {
      console.error("Failed to update profile", error);
      toast.error("Gagal memperbarui profil.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Photo Upload */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center h-fit">
        <div className="relative w-36 h-36 rounded-full border border-dashed border-gray-300 flex items-center justify-center mb-6 cursor-pointer hover:bg-gray-50 transition-colors group">
          <div className="absolute inset-2 rounded-full overflow-hidden">
            <Image
              src={user?.data?.avatar || "/user-1.png"}
              alt="Profile"
              fill
              className="object-cover opacity-100 group-hover:opacity-75 transition-opacity"
            />
          </div>

          {/* Overlay Icon */}
          <div className="z-10 flex flex-col items-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="drop-shadow-md"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <span className="text-xs font-medium mt-1 drop-shadow-md">
              Perbarui foto
            </span>
          </div>
        </div>

        <p className="text-gray-400 text-xs text-center mb-6">
          Izinkan *.jpeg, *.jpg, *.png
        </p>

        <button className="text-[#B71D18] text-sm font-medium hover:bg-red-50 px-4 py-2 rounded-full transition-colors">
          Hapus Akun
        </button>
      </div>

      {/* Right Column: Personal Info Form */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <div className="border border-gray-200 rounded-lg px-4 py-3 focus-within:border-[#3197A5] transition-colors">
              <label className="block text-xs text-gray-400 mb-1">
                Nama Depan
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full outline-none text-[#1F1F1F] text-sm font-sans"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="border border-gray-200 rounded-lg px-4 py-3 focus-within:border-[#3197A5] transition-colors">
              <label className="block text-xs text-gray-400 mb-1">
                Nama Belakang
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full outline-none text-[#1F1F1F] text-sm font-sans"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="border border-gray-200 rounded-lg px-4 py-3 focus-within:border-[#3197A5] transition-colors">
              <label className="block text-xs text-gray-400 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full outline-none text-[#1F1F1F] text-sm font-sans bg-gray-50 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="w-[100px] border border-gray-200 rounded-lg px-3 py-3 flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🇮🇩</span>
                  <span className="text-[#1F1F1F] text-sm">+62</span>
                </div>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
              <div className="flex-1 border border-gray-200 rounded-lg px-4 py-3 focus-within:border-[#3197A5] transition-colors">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-full outline-none text-[#1F1F1F] text-sm font-sans"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer focus-within:border-[#3197A5] transition-colors">
              <div className="w-full">
                <label className="block text-xs text-gray-400 mb-1">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate || ""}
                  onChange={handleChange}
                  className="w-full outline-none text-[#1F1F1F] text-sm font-sans bg-transparent"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer">
              <div className="w-full">
                <label className="block text-xs text-gray-400 mb-1">
                  Jenis Kelamin
                </label>
                <select
                  name="gender"
                  value={formData.gender || "Wanita"}
                  onChange={handleChange}
                  className="w-full outline-none text-[#1F1F1F] text-sm font-sans bg-transparent appearance-none"
                >
                  <option value="Wanita">Wanita</option>
                  <option value="Pria">Pria</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8E8E8E"
                strokeWidth="2"
                className="pointer-events-none"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-5 h-5 bg-[#3197A5] rounded flex items-center justify-center cursor-pointer">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <span className="text-sm text-[#1F1F1F] font-sans">
            Bagikan data pendaftaran saya dengan penyedia konten Strovia untuk
            tujuan pemasaran.
          </span>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isUpdating}
            className="bg-[#3197A5] hover:bg-[#288a96] text-white px-6 py-3 rounded-full font-medium text-sm transition-colors shadow-lg shadow-[#3197A5]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isUpdating && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}
