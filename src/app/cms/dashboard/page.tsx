"use client";

import {
  useGetDashboardStatsQuery,
  useGetTopAudiosQuery,
  useGetRecentUsersQuery,
  useGetRevenueChartQuery,
} from "@/redux/api/sublimeApi";
import { format } from "date-fns";
import { useI18n } from "@/i18n";
import Image from "next/image";

export default function CmsDashboardPage() {
  const { t } = useI18n();
  const { data: statsData } = useGetDashboardStatsQuery(undefined);
  const { data: topAudiosData } = useGetTopAudiosQuery({ limit: 5 });
  const { data: recentUsersData } = useGetRecentUsersQuery({ limit: 5 });
  const { data: revenueResp, isLoading: revenueLoading } =
    useGetRevenueChartQuery(undefined);

  type TopAudio = { thumbnail_url?: string; title: string; play_count: number };
  type RecentUser = {
    avatar?: string;
    name: string;
    email: string;
    createdAt?: string;
  };

  const stats = statsData?.data;
  const topAudios = (topAudiosData?.data as TopAudio[]) || [];
  const recentUsers = (recentUsersData?.data as RecentUser[]) || [];

  type RevenueObj = {
    revenue?: number;
    amount?: number;
    value?: number;
    y?: number;
    date?: string;
    day?: string;
    x?: number | string | Date;
  };
  type RevenueItem = number | RevenueObj;
  const seriesRaw = (revenueResp?.data as RevenueItem[]) || [];
  const points = seriesRaw.map((d: RevenueItem, i: number) => {
    let y: number;
    let xSrc:
      | RevenueObj["x"]
      | RevenueObj["date"]
      | RevenueObj["day"]
      | undefined;
    if (typeof d === "number") {
      y = d;
      xSrc = undefined;
    } else {
      y = Number(d.revenue ?? d.amount ?? d.value ?? d.y ?? 0);
      xSrc = d.date ?? d.day ?? d.x;
    }
    const x = xSrc ? Number(new Date(xSrc).getTime()) : i;
    return { x, y };
  });
  const latestRevenue = points.length ? points[points.length - 1].y : 0;

  return (
    <div className="p-10 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            {t("dashboard_title")}
          </h1>
          <p className="text-gray-600">{t("dashboard_subtitle")}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">
            {t("dashboard_card_total_users")}
          </h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {stats?.totalUsers || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">
            {t("dashboard_card_active_subs")}
          </h3>
          <p className="text-3xl font-bold text-[#3197A5] mt-2">
            {stats?.activeSubscriptions || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">
            {t("dashboard_card_total_revenue")}
          </h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            Rp {stats?.totalRevenue?.toLocaleString("id-ID") || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">
            {t("dashboard_card_total_audios")}
          </h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {stats?.totalAudios || 0}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {t("dashboard_revenue_trend")}
            </h2>
            <p className="text-sm text-gray-500">
              {revenueLoading
                ? t("common_loading")
                : `Rp ${latestRevenue.toLocaleString("id-ID")}`}
            </p>
          </div>
        </div>
        <div role="img" aria-label={t("dashboard_revenue_trend")}>
          {revenueLoading ? (
            <div className="h-40 w-full animate-pulse bg-gray-50 rounded-xl" />
          ) : points.length === 0 ? (
            <p className="text-gray-500 text-sm">{t("dashboard_empty_data")}</p>
          ) : (
            <SvgAreaChart points={points} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Audios */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            {t("dashboard_top_audios")}
          </h2>
          <div className="space-y-4">
            {topAudios.map((audio: TopAudio, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                  <Image
                    src={audio.thumbnail_url || "https://placehold.co/100"}
                    alt={audio.title}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-gray-800">
                    {audio.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {audio.play_count} {t("dashboard_plays_suffix")}
                  </p>
                </div>
              </div>
            ))}
            {topAudios.length === 0 && (
              <p className="text-gray-500 text-sm">
                {t("dashboard_empty_data")}
              </p>
            )}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            {t("dashboard_recent_users")}
          </h2>
          <div className="space-y-4">
            {recentUsers.map((user: RecentUser, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0"
              >
                <InitialAvatar name={user.name} />
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
              <p className="text-gray-500 text-sm">
                {t("dashboard_empty_data")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type Pt = { x: number; y: number };

function SvgAreaChart({ points }: { points: Pt[] }) {
  const w = 800;
  const h = 200;
  const pad = { t: 10, r: 10, b: 24, l: 10 };
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const maxY = Math.max(0, Math.max(...ys));
  const scaleX = (x: number) => {
    const span = maxX - minX || 1;
    const innerW = w - pad.l - pad.r;
    return pad.l + ((x - minX) / span) * innerW;
  };
  const scaleY = (y: number) => {
    const innerH = h - pad.t - pad.b;
    const ratio = maxY === 0 ? 0 : y / maxY;
    return pad.t + (1 - ratio) * innerH;
  };
  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${scaleX(p.x)},${scaleY(p.y)}`)
    .join(" ");
  const areaD = `${pathD} L ${scaleX(points[points.length - 1].x)},${h - pad.b} L ${scaleX(points[0].x)},${h - pad.b} Z`;
  const ticks = 4;
  const grid = Array.from({ length: ticks }, (_, i) => i + 1);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-48">
      <defs>
        <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3197A5" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#3197A5" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      {grid.map((_, i) => {
        const y = pad.t + ((h - pad.t - pad.b) / ticks) * i;
        return (
          <line
            key={i}
            x1={pad.l}
            x2={w - pad.r}
            y1={y}
            y2={y}
            stroke="#EEF2F7"
            strokeWidth="1"
          />
        );
      })}
      <path d={areaD} fill="url(#revFill)" />
      <path d={pathD} fill="none" stroke="#3197A5" strokeWidth={2} />
      {points.length ? (
        <circle
          cx={scaleX(points[points.length - 1].x)}
          cy={scaleY(points[points.length - 1].y)}
          r={4}
          fill="#3197A5"
        />
      ) : null}
      <line
        x1={pad.l}
        x2={w - pad.r}
        y1={h - pad.b}
        y2={h - pad.b}
        stroke="#E5E7EB"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function InitialAvatar({ name }: { name: string }) {
  const initials = getInitials(name);
  return (
    <div
      className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-white text-xs font-semibold uppercase flex-shrink-0"
      role="img"
      aria-label={name}
      title={name}
    >
      {initials}
    </div>
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}
