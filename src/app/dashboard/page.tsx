"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import RecommendationList from "@/components/dashboard/RecommendationList";
import { audioSessions } from "@/data/audioSessions";
import { useAudio } from "@/contexts/AudioContext";

export default function DashboardPage() {
  const { playTrack } = useAudio();
  const heroSession = audioSessions[0]; // Stroke Recovery Calm

  return (
    <DashboardLayout activeItem="Home">
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-br from-primary via-primary-500 to-primary-600 rounded-3xl overflow-hidden h-64">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z"
                fill="white"
              />
            </svg>
          </div>

          <div className="relative h-full flex items-center justify-between px-12">
            {/* Left Content */}
            <div className="flex-1 text-white space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Audio Therapy Pilihan
              </div>

              <h1 className="text-3xl font-bold leading-tight">
                Stroke Recovery Calm English Version
              </h1>

              <p className="text-white/90 text-sm max-w-md leading-relaxed">
                Strovia membantu Anda merasakan ketenangan B2B Hz dengan
                afirmasi lembut untuk mendukung pikiran Anda tetap positif,
                kesehatan jantung dan mendukung perjalanan pemulihan Anda.
              </p>

              <div className="flex items-center gap-2 text-sm">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>1.822.143 mendengarkan</span>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative w-64 h-full flex items-end justify-end">
              <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-white/10 to-transparent rounded-full" />
              {/* Placeholder for woman image */}
              <div className="relative z-10 w-48 h-full flex items-end">
                <div className="w-full h-48 bg-white/10 rounded-t-full flex items-center justify-center">
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
              </div>

              {/* Play Button */}
              <button
                onClick={() => playTrack(heroSession)}
                className="absolute bottom-8 right-8 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-20"
              >
                <svg
                  className="w-8 h-8 text-primary ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Recommendation List */}
        <RecommendationList sessions={audioSessions} />

        {/* Promotional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Premium Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full -ml-12 -mb-12" />

            <div className="relative space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white rounded-full text-xs font-medium">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Premium
              </div>

              <h3 className="text-2xl font-bold text-secondary">
                Nikmati 1 bulan hanya
                <br />
                <span className="text-4xl">Rp128.000.</span>{" "}
                <span className="text-primary">
                  Dengerin
                  <br />
                  Audio Therapy
                </span>{" "}
                <span className="text-secondary">di Premium.</span>
              </h3>

              <div className="flex items-center gap-4 text-sm text-secondary/70">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                  <span className="font-medium">STROVIA</span>
                </div>
                <p>
                  Tidak perlu kartu kredit atau debit untuk mendaftar. Kamu
                  dapat batalkan kapan saja.
                </p>
              </div>

              <button className="px-6 py-3 bg-secondary text-white rounded-full font-medium hover:bg-secondary-600 transition-colors">
                Mulai Berlangganan
              </button>
            </div>
          </div>

          {/* Chatbot Card */}
          <div className="bg-gradient-to-br from-primary to-primary-600 rounded-2xl p-8 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />

            <div className="relative space-y-4">
              <h3 className="text-2xl font-bold">
                Butuh Bimbingan untuk
                <br />
                Perjalanan Penyembuhan
                <br />
                Anda?
              </h3>

              <p className="text-white/90 text-sm">
                Bicara dengan Strovia AI untuk saran yang dipersonalisasi.
              </p>

              <button className="px-6 py-3 bg-white text-primary rounded-full font-medium hover:bg-gray-100 transition-colors">
                Chat Sekarang
              </button>

              {/* Chatbot Icon */}
              <div className="absolute bottom-4 right-4 w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white"
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

        {/* Articles Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-secondary">
              Artikel untuk Pemulihan Anda
            </h2>
            <button className="text-primary font-medium hover:text-primary-600 transition-colors flex items-center gap-2">
              Lihat Semua
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Frekuensi 528 Hz — Pengetahuan Ilmiah & Edukasi",
                date: "Nov 14, 2025",
                image: "article-1",
              },
              {
                title: "Bagaimana Subliminal Membantu Penderita Stroke?",
                date: "Nov 18, 2025",
                image: "article-2",
              },
              {
                title:
                  "Tubuh Bisa Memperbaiki Diri Sendiri : Peran Otak Bawah Sadar...",
                date: "Nov 18, 2025",
                image: "article-3",
              },
            ].map((article, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center relative overflow-hidden">
                  <svg
                    className="w-16 h-16 text-primary/30"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-secondary/60">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {article.date}
                  </div>
                  <h3 className="font-semibold text-secondary line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
