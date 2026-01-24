"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useGetMeQuery } from "@/redux/api/sublimeApi";
import PersonalInfoTab from "@/components/dashboard/profile/PersonalInfoTab";
import ReferralTab from "@/components/dashboard/profile/ReferralTab";
import SubscriptionTab from "@/components/dashboard/profile/SubscriptionTab";
import SecurityTab from "@/components/dashboard/profile/SecurityTab";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentTab = searchParams.get("tab") || "Informasi Pribadi";
  // We can still use state to avoid flicker or just rely on searchParams direct
  // Using direct searchParams is cleaner for SSOT (Single Source of Truth)
  // Mapping display names to URL safe keys might be better, but user asked for ?tab=Value

  const { data: user, isLoading } = useGetMeQuery(undefined);

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    router.push(`${pathname}?${params.toString()}`);
  };

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
                  onClick={() => handleTabChange(tab)}
                  className={`h-full px-6 text-sm font-medium font-sans relative transition-colors ${
                    currentTab === tab
                      ? "text-[#3197A5]"
                      : "text-[#8E8E8E] hover:text-gray-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {tab === "Informasi Pribadi" && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    )}
                    {tab === "Referral" && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                      </svg>
                    )}
                    {tab === "Berlangganan" && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    )}
                    {tab === "Keamanan" && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                      </svg>
                    )}
                    {tab}
                  </span>
                  {currentTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3197A5]"></span>
                  )}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Content Tabs */}
        <div>
          {currentTab === "Informasi Pribadi" && <PersonalInfoTab />}
          {currentTab === "Referral" && <ReferralTab />}
          {currentTab === "Berlangganan" && <SubscriptionTab />}
          {currentTab === "Keamanan" && <SecurityTab />}
        </div>
      </div>
    </DashboardLayout>
  );
}
