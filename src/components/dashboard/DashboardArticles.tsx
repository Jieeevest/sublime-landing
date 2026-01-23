"use client";

import Link from "next/link";

/**
 * Props for the DashboardArticles component.
 */
interface DashboardArticlesProps {
  /** Array of article data from the API. */
  articles: any[];
  /** Whether the articles are currently loading. */
  isLoading: boolean;
}

/**
 * DashboardArticles component displays a grid of latest articles.
 * Shows a loading state or an empty state if no articles are found.
 */
export default function DashboardArticles({
  articles,
  isLoading,
}: DashboardArticlesProps) {
  return (
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
        {isLoading ? (
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
            <p className="text-lg font-medium">Belum ada artikel saat ini</p>
            <p className="text-sm mt-1">
              Nantikan artikel menarik seputar kesehatan dan audio therapy
              segera.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
