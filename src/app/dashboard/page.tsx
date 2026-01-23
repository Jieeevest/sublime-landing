"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AudioTrackList from "@/components/dashboard/AudioTrackList";
// Dummy data renamed for backup
import {
  audioSessions as dummyAudioSessions,
  AudioSession,
} from "@/data/audioSessions";
import { useAudio } from "@/contexts/AudioContext";
import {
  useGetAudiosQuery,
  useGetPublicContentsQuery,
} from "@/redux/api/sublimeApi";
import Link from "next/link";

export default function DashboardPage() {
  const { playTrack } = useAudio();

  // Fetch real data
  const { data: audioData, isLoading: isLoadingAudios } = useGetAudiosQuery({});
  const { data: articlesData, isLoading: isLoadingArticles } =
    useGetPublicContentsQuery({ type: "article", limit: 3 });

  // Use real data or fallback to dummy data if needed/loading
  // API returns { success: true, data: [...] }
  const rawSessions = audioData?.data || [];
  const articles = articlesData?.data || [];

  // Helper to format duration seconds to MM:SS
  const formatDuration = (seconds: number) => {
    if (!seconds) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Map API response to AudioSession interface
  const sessions: AudioSession[] = rawSessions.map((item: any) => ({
    id: item.id,
    title: item.title,
    subtitle: item.description, // Mapping description -> subtitle as requested
    description: item.description,
    duration: formatDuration(item.duration_seconds),
    durationSeconds: item.duration_seconds,
    category: item.category?.name || "General",
    imageUrl: item.thumbnail_url || "/default-audio.jpg", // Fallback image
    audioUrl: item.audio_url,
  }));

  // Hero session logic: use first real session, or dummy as fallback
  const heroSession = sessions.length > 0 ? sessions[0] : dummyAudioSessions[0];

  return (
    <DashboardLayout activeItem="Home">
      <div className="px-10 pt-[104px] pb-6 max-w-[1267px] mx-auto space-y-10">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-r from-[#30A9AF] to-[#79CACE]/75 rounded-2xl overflow-hidden h-[295px]">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[277px] h-[277px] border border-white/50 rounded-lg transform rotate-[135deg]"></div>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
          <div className="absolute inset-0 bg-black/5"></div>

          <div className="relative h-full flex items-center justify-between px-10">
            {/* Left Content */}
            <div className="flex-1 max-w-[712px] text-white space-y-4 z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/8 backdrop-blur-sm border border-white/7 rounded-full text-base font-medium">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Audio Therapy Pilihan
              </div>

              <h1 className="text-4xl font-bold leading-tight bg-gradient-to-r from-[#C2F8FF] to-white bg-clip-text text-transparent">
                {heroSession?.title || "Stroke Recovery"}
              </h1>

              <p className="text-white/90 text-base max-w-[712px] leading-relaxed">
                {heroSession?.description ||
                  "Strovia memadukan frekuensi penyembuhan 528Hz..."}
              </p>

              <div className="flex items-center gap-2 text-sm">
                <div className="p-2 bg-white/4 border border-white/7 rounded-lg">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="12" width="4" height="9" rx="1" />
                    <rect x="10" y="8" width="4" height="13" rx="1" />
                    <rect x="17" y="4" width="4" height="17" rx="1" />
                  </svg>
                </div>
                <span>
                  {/* TODO: Add play_count to AudioSession if needed, for now use dummy or field from API if mapped */}
                  {(rawSessions[0] as any)?.play_count || "1.322.931"} pendengar
                  bulanan
                </span>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative w-[353px] h-full flex items-end justify-end">
              <div className="absolute bottom-0 right-20 w-[353px] h-[322px] bg-gradient-to-br from-white/5 to-transparent"></div>

              {/* Placeholder for woman image */}
              <div className="relative z-10 w-[353px] h-[322px] flex items-end">
                <div className="w-full h-full bg-white/5 rounded-t-[100px] flex items-center justify-center">
                  {/* Convert placeholder image to something dynamic if available in API, otherwise keep static for now */}
                  {heroSession?.imageUrl ? (
                    <img
                      src={heroSession.imageUrl}
                      alt="Cover"
                      className="w-full h-full object-cover rounded-t-[100px]"
                    />
                  ) : (
                    <svg
                      className="w-32 h-32 text-white/20"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>

              {/* Play Button */}
              <button
                onClick={() => playTrack(heroSession)}
                className="absolute bottom-[183px] right-[156px] w-[72px] h-[72px] bg-primary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-20"
              >
                <svg
                  className="w-8 h-8 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Audio Track List */}
        {isLoadingAudios ? (
          <div className="text-center py-10">Loading tracks...</div>
        ) : (
          <AudioTrackList
            sessions={sessions.length > 0 ? sessions : dummyAudioSessions}
          />
        )}

        {/* Promotional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-[1.9fr_1fr] gap-10">
          {/* Premium Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/20 rounded-full -ml-16 -mb-16"></div>

            <div className="relative flex items-center gap-6">
              {/* Left Content */}
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1 bg-primary/8 border border-primary/7 rounded-full text-base font-medium text-primary">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Berlangganan
                </div>

                <h3 className="text-4xl font-bold text-primary leading-tight">
                  Nikmati 30 hari hanya Rp138.000.{" "}
                  <span className="text-primary">Dengerin Audio Therapy</span>{" "}
                  di Berlangganan.
                </h3>
              </div>

              {/* Right Content */}
              <div className="w-[285px] space-y-4">
                <div className="flex items-center justify-end gap-2">
                  <svg
                    className="w-7 h-7 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                  <span className="text-2xl font-bold text-primary">
                    STROVIA
                  </span>
                </div>

                <p className="text-sm text-secondary leading-relaxed">
                  Tanpa perpanjangan otomatis. Tidak ada autodebet. Kamu tetap
                  sepenuhnya mengontrol langgananmu.
                </p>

                <button className="px-5 py-2.5 bg-primary text-white rounded-full text-base font-normal hover:bg-primary-600 transition-colors">
                  Mulai Berlangganan
                </button>
              </div>
            </div>

            {/* Decorative rectangle */}
            <div className="absolute left-0 top-[156px] w-[249px] h-10 bg-primary"></div>
          </div>

          {/* Chatbot Card */}
          <div className="bg-gradient-to-br from-primary to-primary-600 rounded-2xl p-10 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>

            {/* Decorative images */}
            <div className="absolute -left-[60px] top-0 w-[100px] h-[100px] bg-white/10 rounded-full"></div>
            <div className="absolute -right-[66px] bottom-[110px] w-[93px] h-[93px] bg-white/10 rounded-full"></div>

            <div className="relative h-full flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold leading-tight">
                  Butuh Bimbingan untuk Perjalanan Penyembuhan Anda?
                </h3>

                <p className="text-white/90 text-sm">
                  Bicaralah dengan Dokter Via kapan saja.
                </p>

                <button className="px-5 py-2.5 bg-white text-[#1F1F1F] rounded-full text-base font-normal hover:bg-gray-100 transition-colors">
                  Chat Sekarang
                </button>
              </div>

              {/* Doctor Image Placeholder */}
              <div className="absolute bottom-[-32px] right-0 w-[132px] h-[197px] bg-white/10 rounded-t-full flex items-center justify-center">
                <svg
                  className="w-20 h-20 text-white/30"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* Chatbot Icon */}
              <div className="absolute bottom-[110px] right-[82px] w-[100px] h-[100px] bg-primary/40 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-medium text-[#1F1F1F]">
              Artikel untuk Pemulihan Anda
            </h2>
            <Link
              href="/dashboard/artikel"
              className="text-primary text-base font-normal hover:text-primary-600 transition-colors flex items-center gap-1"
            >
              Lihat Semua
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {isLoadingArticles ? (
              <div className="col-span-3 text-center">Loading articles...</div>
            ) : articles.length > 0 ? (
              articles.map((article: any, index: number) => (
                <div
                  key={index}
                  className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer border border-white/14 h-[377px]"
                >
                  {/* Image Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600">
                    {article.thumbnail_url ? (
                      <img
                        src={article.thumbnail_url}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          className="w-24 h-24 text-white/20"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Text Content at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#1F1F1F]/40 backdrop-blur-[27px]">
                    <div className="flex items-center gap-2 text-sm text-white mb-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        {new Date(
                          article.created_at || article.date,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-2xl font-medium text-white line-clamp-2 leading-tight">
                      {article.title}
                    </h3>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-20 text-[#8E8E8E] bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                <p className="text-lg font-medium">
                  Belum ada artikel saat ini
                </p>
                <p className="text-sm mt-1">
                  Nantikan artikel menarik seputar kesehatan dan audio therapy
                  segera.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
