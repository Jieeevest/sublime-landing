"use client";

import {
  useGetDashboardStatsQuery,
  useGetTopAudiosQuery,
  useGetRecentUsersQuery,
  useGetRevenueChartQuery,
} from "@/redux/api/sublimeApi";
import { format } from "date-fns";

export default function CmsDashboardPage() {
  const { data: statsData } = useGetDashboardStatsQuery(undefined);
  const { data: revenueData } = useGetRevenueChartQuery({
    period: "marketing",
  }); // Example params
  const { data: topAudiosData } = useGetTopAudiosQuery({ limit: 5 });
  const { data: recentUsersData } = useGetRecentUsersQuery({ limit: 5 });

  const stats = statsData?.data;
  const topAudios = topAudiosData?.data || [];
  const recentUsers = recentUsersData?.data || [];

  return (
    <div className="p-10 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Dashboard Admin
          </h1>
          <p className="text-gray-600">Overview of platform performance</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {stats?.totalUsers || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Active Subs</h3>
          <p className="text-3xl font-bold text-[#3197A5] mt-2">
            {stats?.activeSubscriptions || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Revenue (Total)</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            Rp {stats?.totalRevenue?.toLocaleString("id-ID") || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Audios</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {stats?.totalAudios || 0}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Audios */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Top Audios</h2>
          <div className="space-y-4">
            {topAudios.map((audio: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                  {/* Using simple img for CMS to avoid next/image setup complexities if domain not allowed */}
                  <img
                    src={audio.thumbnail_url || "https://placehold.co/100"}
                    alt={audio.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-800">
                    {audio.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {audio.play_count} plays
                  </p>
                </div>
              </div>
            ))}
            {topAudios.length === 0 && (
              <p className="text-gray-500 text-sm">No data available</p>
            )}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Users</h2>
          <div className="space-y-4">
            {recentUsers.map((user: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex-shrink-0 overflow-hidden">
                  <img
                    src={user.avatar || "https://placehold.co/100"}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-800">
                    {user.name}
                  </h4>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="text-xs text-gray-400">
                  {user.createdAt
                    ? format(new Date(user.createdAt), "dd MMM yyyy")
                    : "-"}
                </div>
              </div>
            ))}
            {recentUsers.length === 0 && (
              <p className="text-gray-500 text-sm">No data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
