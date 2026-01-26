"use client";

import { use } from "react";
import { useGetAudioByIdQuery } from "@/redux/api/sublimeApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AudioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { data: audioData, isLoading } = useGetAudioByIdQuery({ id });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const audio = audioData?.data;

  if (!audio) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          Audio tidak ditemukan
        </h2>
        <button
          onClick={() => router.back()}
          className="mt-4 text-primary hover:underline"
        >
          Kembali
        </button>
      </div>
    );
  }

  const minutes = Math.floor(audio.duration_seconds / 60);
  const seconds = audio.duration_seconds % 60;
  const formattedDuration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="p-8 w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{audio.title}</h1>
            <p className="text-gray-500 text-sm">Detail Informasi Audio</p>
          </div>
        </div>
        <Link
          href={`/cms/audio/${id}`}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit Audio
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Media & Quick Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Thumbnail */}
          <div className="aspect-square rounded-2xl overflow-hidden shadow-md bg-gray-100 relative">
            {audio.thumbnail_url ? (
              <img
                src={audio.thumbnail_url}
                alt={audio.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg
                  className="w-16 h-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
            {audio.is_premium && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                PREMIUM
              </div>
            )}
          </div>

          {/* Audio Player Preview */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Preview Audio
            </h3>
            <audio controls className="w-full rounded-lg" src={audio.audio_url}>
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info Card */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-4">
              Informasi Utama
            </h2>

            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div className="col-span-2">
                <dt className="text-sm font-medium text-gray-500">Judul</dt>
                <dd className="mt-1 text-lg font-medium text-gray-900">
                  {audio.title}
                </dd>
              </div>

              <div className="col-span-2">
                <dt className="text-sm font-medium text-gray-500">Subtitle</dt>
                <dd className="mt-1 text-base text-gray-700">
                  {audio.subtitle || "-"}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Kategori</dt>
                <dd className="mt-1 text-base text-gray-900 flex items-center gap-2">
                  <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </span>
                  {audio.category?.name || "Uncategorized"}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Status Publikasi
                </dt>
                <dd className="mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${audio.is_published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                  >
                    {audio.is_published ? "Published" : "Draft"}
                  </span>
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Durasi</dt>
                <dd className="mt-1 text-base text-gray-900 font-mono">
                  {formattedDuration}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Frekuensi</dt>
                <dd className="mt-1 text-base text-gray-900">
                  {audio.frequency || "-"}
                </dd>
              </div>

              <div className="col-span-2">
                <dt className="text-sm font-medium text-gray-500">Deskripsi</dt>
                <dd className="mt-1 text-base text-gray-700 whitespace-pre-wrap">
                  {audio.description || "-"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Stats Card */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Total Plays
              </dt>
              <dd className="mt-2 text-3xl font-bold text-gray-900">
                {audio.play_count || 0}
              </dd>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Likes
              </dt>
              <dd className="mt-2 text-3xl font-bold text-gray-900">
                {audio.like_count || 0}
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
