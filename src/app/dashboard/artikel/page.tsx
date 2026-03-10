"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { articles as dummyArticles } from "@/data/articles";
import Link from "next/link";
import { useGetPublicContentsQuery } from "@/redux/api/sublimeApi";
import { useI18n } from "@/i18n";

export default function ArtikelPage() {
  const { t, lang } = useI18n();
  const { data, isLoading } = useGetPublicContentsQuery({ type: "article" });
  const articles = data?.data || [];
  type PublicArticle = {
    id: string | number;
    slug: string;
    title: string;
    excerpt?: string;
    subtitle?: string;
    cover_image_url?: string;
    created_at?: string;
  };

  const locale = lang === "en" ? "en-US" : "id-ID";
  const formatDate = (value?: string) =>
    value
      ? new Date(value).toLocaleDateString(locale, {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "-";

  const featured = articles[0];
  const sideCards = articles.slice(1, 3);
  const gridCards = articles.slice(3, 6);

  return (
    <DashboardLayout activeItem={t("ud_menu_articles")}>
      <div
        className="mx-auto max-w-[1267px] space-y-8 px-10 pb-10"
        style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
      >
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-[#5A96A0]">
            {t("ud_articles_label")}
          </h1>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-gray-500">
            {t("ud_articles_loading")}
          </div>
        ) : articles.length > 0 ? (
          <>
            {/* Top Grid */}
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              {/* Featured Article */}
              {featured && (
                <Link href={`/dashboard/artikel/${featured.slug}`}>
                  <div className="relative h-[340px] overflow-hidden rounded-2xl bg-[#DDEFF3] shadow-sm transition-transform hover:scale-[1.004]">
                    {featured.cover_image_url ? (
                      <img
                        src={featured.cover_image_url}
                        alt={featured.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="h-24 w-24 text-primary/20"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C4A52]/80 via-[#2C4A52]/35 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <div className="mb-2 flex items-center gap-2 text-[11px] text-white/80">
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {formatDate(featured.created_at)}
                      </div>
                      <h2 className="text-lg font-semibold leading-snug">
                        {featured.title}
                      </h2>
                    </div>
                  </div>
                </Link>
              )}

              {/* Side Cards */}
              <div className="flex flex-col gap-6">
                {sideCards.map((article: PublicArticle) => (
                  <Link
                    key={article.id}
                    href={`/dashboard/artikel/${article.slug}`}
                  >
                    <div className="relative h-[158px] overflow-hidden rounded-2xl bg-[#DDEFF3] shadow-sm transition-transform hover:scale-[1.01]">
                      {article.cover_image_url ? (
                        <img
                          src={article.cover_image_url}
                          alt={article.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="h-12 w-12 text-primary/20"
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
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2C4A52]/80 via-[#2C4A52]/35 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="mb-1 flex items-center gap-2 text-[10px] text-white/80">
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {formatDate(article.created_at)}
                        </div>
                        <h3 className="text-sm font-semibold leading-snug line-clamp-2">
                          {article.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Grid */}
            {gridCards.length > 0 && (
              <div className="grid gap-6 md:grid-cols-3">
                {gridCards.map((article: PublicArticle) => (
                  <Link
                    key={article.id}
                    href={`/dashboard/artikel/${article.slug}`}
                  >
                    <div className="relative h-[170px] overflow-hidden rounded-2xl bg-[#DDEFF3] shadow-sm transition-transform hover:scale-[1.01]">
                      {article.cover_image_url ? (
                        <img
                          src={article.cover_image_url}
                          alt={article.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="h-12 w-12 text-primary/20"
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
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2C4A52]/80 via-[#2C4A52]/35 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="mb-1 flex items-center gap-2 text-[10px] text-white/80">
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                          </svg>
                          {formatDate(article.created_at)}
                        </div>
                        <h3 className="text-sm font-semibold leading-snug line-clamp-2">
                          {article.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Load More Button */}
            <div className="flex justify-center pt-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-[#D6E6EA] bg-white px-4 py-2 text-xs font-medium text-[#4E6A73] shadow-sm transition hover:bg-[#F7FBFC]"
              >
                {t("dash_articles_view_all")}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
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
              {t("ud_articles_empty_title")}
            </h3>
            <p className="text-secondary/60">{t("ud_articles_empty_desc")}</p>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
