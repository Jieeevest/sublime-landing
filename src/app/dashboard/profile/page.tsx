"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Image from "next/image";
import { useState } from "react";
import { useGetMeQuery } from "@/redux/api/sublimeApi";
import PersonalInfoTab from "@/components/dashboard/profile/PersonalInfoTab";
import ReferralTab from "@/components/dashboard/profile/ReferralTab";
import SubscriptionTab from "@/components/dashboard/profile/SubscriptionTab";
import SecurityTab from "@/components/dashboard/profile/SecurityTab";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Informasi Pribadi");
  const { data: user, isLoading } = useGetMeQuery(undefined);

  if (isLoading) {
    return (
      <DashboardLayout activeItem="Profile">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3197A5]"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeItem="Profile">
      <div className="w-full max-w-[1347px] mx-auto p-10 space-y-10">
        {/* Header Title */}
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-medium text-[#1F1F1F] font-sans">
            Profil
          </h2>
        </div>

        {/* Profile Banner */}
        <div className="w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100">
          {/* Cover Image */}
          <div className="h-[240px] w-full relative bg-[#004B50]">
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-transparent to-transparent opacity-80"></div>
            {/* You might want to use a real image here if available */}
            <div className="absolute inset-0 bg-[url('/grainy-gradient-background-noise-texture-backdrop-webpage-header-banner-design 1.png')] bg-cover bg-center opacity-50 mix-blend-overlay"></div>
          </div>

          {/* Profile Info Overlay (Avatar & Name) */}
          <div className="relative px-6 pb-6 mt-[-64px] flex items-end justify-between">
            <div className="flex items-end gap-6">
              {/* Avatar */}
              <div className="relative w-32 h-32 rounded-full border-4 border-white bg-white p-1">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-gray-100">
                  <Image
                    src={user?.data?.avatar || "/user-1.png"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Name & Status */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white font-sans">
                  {user?.data?.name || "User Name"}
                </h3>
                <p className="text-gray-300 text-sm font-sans mb-2">
                  {user?.data?.email || "email@example.com"}
                </p>
                <span className="bg-white/20 backdrop-blur-md text-white text-xs px-2 py-1 rounded font-medium">
                  {user?.data?.subscription?.isActive
                    ? "Berlangganan"
                    : "Gratis"}
                </span>
              </div>
            </div>

            {/* Action Tabs (Optional/Right side) */}
            <div className="flex gap-4 mb-4">
              {/* Could add 'Edit Profile' button or similar here if needed */}
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex items-center justify-end px-6 h-12 border-t border-gray-100">
            {["Informasi Pribadi", "Referral", "Berlangganan", "Keamanan"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`h-full px-6 text-sm font-medium font-sans relative transition-colors ${
                    activeTab === tab
                      ? "text-[#3197A5]"
                      : "text-[#8E8E8E] hover:text-gray-700"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3197A5]"></span>
                  )}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Content Tabs */}
        <div>
          {activeTab === "Informasi Pribadi" && <PersonalInfoTab />}
          {activeTab === "Referral" && <ReferralTab />}
          {activeTab === "Berlangganan" && <SubscriptionTab />}
          {activeTab === "Keamanan" && <SecurityTab />}
        </div>
      </div>
    </DashboardLayout>
  );
}
