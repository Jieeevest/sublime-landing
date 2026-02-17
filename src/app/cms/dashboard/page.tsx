"use client";

import {
  useGetDashboardStatsQuery,
  useGetTopAudiosQuery,
  useGetRecentUsersQuery,
} from "@/redux/api/sublimeApi";
import { format } from "date-fns";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CmsDashboardPage() {
  const { data: statsData } = useGetDashboardStatsQuery(undefined);
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
          <p className="text-gray-600">Ringkasan performa platform</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Pengguna</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {stats?.users?.total || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Langganan Aktif</h3>
          <p className="text-3xl font-bold text-[#3197A5] mt-2">
            {stats?.subscriptions?.active || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">
            Pendapatan (Total)
          </h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            Rp {(stats?.revenue?.this_month || 0).toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Audio</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {stats?.content?.total_audios || 0}
          </p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Grafik Pendapatan
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Rp {(stats?.revenue?.this_month || 0).toLocaleString("id-ID")}
        </p>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={stats?.revenue?.chart || []}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3197A5" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3197A5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#F1F5F9"
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tickFormatter={(str) => {
                  const date = new Date(str);
                  return format(date, "MMM dd");
                }}
                stroke="#94A3B8"
                fontSize={12}
                dy={10}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                itemStyle={{ color: "#1E293B" }}
                formatter={(value: any) => [
                  `Rp ${Number(value).toLocaleString("id-ID")}`,
                  "Pendapatan",
                ]}
                labelFormatter={(label) => format(new Date(label), "d MMMM yyyy")}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#3197A5"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
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
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Pengguna Terbaru
          </h2>
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
                  {user.created_at
                    ? format(new Date(user.created_at), "dd MMM yyyy")
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
