"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { articles as dummyArticles } from "@/data/articles";
import Link from "next/link";
import { useGetPublicContentsQuery } from "@/redux/api/sublimeApi";

export default function ArtikelPage() {
  const { data, isLoading } = useGetPublicContentsQuery({ type: "article" });
  const articles = data?.data || [];

  return (
    <DashboardLayout activeItem="Artikel">
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
            Artikel
          </div>
          <h1 className="text-3xl font-bold text-primary">
            {articles[0]?.title}
          </h1>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-gray-500">
            Loading articles...
          </div>
        ) : articles.length > 0 ? (
          <>
            {/* Featured Article (First one) */}
            {articles[0] && (
              <Link href={`/dashboard/artikel/${articles[0].slug}`}>
                <div className="relative bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl overflow-hidden h-96 group cursor-pointer">
                  {/* Placeholder or Real Image */}
                  {articles[0].thumbnail_url ? (
                    <img
                      src={articles[0].thumbnail_url}
                      alt={articles[0].title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="w-32 h-32 text-primary/20"
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

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/40 to-transparent group-hover:from-secondary/90 transition-all" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="flex items-center gap-2 text-sm mb-3">
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
                      {new Date(
                        articles[0].created_at || Date.now(),
                      ).toLocaleDateString()}
                    </div>
                    <h2 className="text-3xl font-bold mb-3 group-hover:text-primary-200 transition-colors">
                      {articles[0].title}
                    </h2>
                    <p className="text-white/90 text-lg max-w-2xl">
                      {/* Excerpt logic: Use excerpt field if available, or truncate content/subtitle */}
                      {articles[0].excerpt || articles[0].subtitle || ""}
                    </p>
                  </div>
                </div>
              </Link>
            )}

            {/* Articles Grid (Rest) */}
            {articles.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.slice(1).map((article: any) => (
                  <Link
                    key={article.id}
                    href={`/dashboard/artikel/${article.slug}`}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer border border-gray-100">
                      {/* Image */}
                      <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center relative overflow-hidden">
                        {article.thumbnail_url ? (
                          <img
                            src={article.thumbnail_url}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <>
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
                          </>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
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
                          {new Date(
                            article.created_at || Date.now(),
                          ).toLocaleDateString()}
                        </div>
                        <h3 className="font-bold text-secondary text-lg line-clamp-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-sm text-secondary/60 line-clamp-2">
                          {article.excerpt || article.subtitle || ""}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-gray-300"
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
            <h3 className="text-xl font-medium text-secondary mb-1">
              Belum ada artikel
            </h3>
            <p className="text-secondary/60">
              Silakan kembali lagi nanti untuk membaca artikel terbaru kami.
            </p>
          </div>
        )}

        {/* Load More Button - Only show if there might be more (e.g. pagination) - For now hide/disabled as we only fetch one batch */}
        {/*
        <div className="flex justify-center pt-4">
          <button className="px-6 py-3 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors flex items-center gap-2">
            Lihat Lebih Banyak
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        */}
      </div>
    </DashboardLayout>
  );
}
