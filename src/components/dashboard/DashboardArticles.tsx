"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n";

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
  const router = useRouter();
  const { t } = useI18n();
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getSlideStep = () => {
    if (!carouselRef.current) return 0;
    return carouselRef.current.clientWidth;
  };

  const scrollCarousel = (direction: "prev" | "next") => {
    if (!carouselRef.current) return;
    const step = getSlideStep();
    if (!step) return;
    const targetIndex =
      direction === "next"
        ? Math.min(activeIndex + 1, articles.length - 1)
        : Math.max(activeIndex - 1, 0);

    carouselRef.current.scrollTo({
      left: targetIndex * step,
      behavior: "smooth",
    });
    setActiveIndex(targetIndex);
  };

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const step = getSlideStep();
    if (!step) return;
    const index = Math.round(carouselRef.current.scrollLeft / step);
    const safeIndex = Math.min(Math.max(index, 0), Math.max(articles.length - 1, 0));
    setActiveIndex(safeIndex);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium text-[#1F1F1F]">
          {t("dash_articles_title")}
        </h2>
        <Link
          href="/dashboard/artikel"
          className="text-primary text-base font-normal hover:text-primary-600 transition-colors flex items-center gap-1"
        >
          {t("dash_articles_view_all")}
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

      {/* Mobile: Carousel */}
      <div className="md:hidden">
        {isLoading ? (
          <div className="text-center">{t("dash_articles_loading")}</div>
        ) : articles.length > 0 ? (
          <div className="space-y-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => scrollCarousel("prev")}
                disabled={activeIndex === 0}
                aria-label="Previous article"
                className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#D6E6EA] bg-white/95 text-[#1F1F1F] shadow-sm transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div
                ref={carouselRef}
                onScroll={handleCarouselScroll}
                className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-2"
              >
                {articles.map((article: any, index: number) => (
                  <div
                    key={index}
                    onClick={() => router.push(`/dashboard/artikel/${article.slug}`)}
                    className="relative h-[330px] w-full min-w-full flex-shrink-0 snap-start cursor-pointer overflow-hidden rounded-2xl border border-white/14 shadow-sm transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600">
                      {article.cover_image_url ? (
                        <img
                          src={article.cover_image_url}
                          alt={article.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <svg
                            className="h-24 w-24 text-white/20"
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

                    <div className="absolute bottom-0 left-0 right-0 bg-[#1F1F1F]/40 p-4 backdrop-blur-[27px]">
                      <div className="mb-2 flex items-center gap-2 text-sm text-white">
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
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>
                          {new Date(
                            article.created_at || article.date,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="line-clamp-2 text-2xl font-medium leading-tight text-white">
                        {article.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollCarousel("next")}
                disabled={activeIndex >= articles.length - 1}
                aria-label="Next article"
                className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-primary text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1">
              {articles.map((_: any, index: number) => (
                <button
                  key={`bullet-${index}`}
                  type="button"
                  onClick={() => {
                    if (!carouselRef.current) return;
                    const step = getSlideStep();
                    if (!step) return;
                    carouselRef.current.scrollTo({
                      left: index * step,
                      behavior: "smooth",
                    });
                    setActiveIndex(index);
                  }}
                  aria-label={`Go to article ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    activeIndex === index
                      ? "w-6 bg-primary"
                      : "w-2.5 bg-[#C7DDE1]"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-16 text-center text-[#8E8E8E]">
            <svg
              className="mx-auto mb-4 h-12 w-12 text-gray-300"
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
            <p className="text-lg font-medium">{t("dash_articles_empty_title")}</p>
            <p className="mt-1 text-sm">{t("dash_articles_empty_desc")}</p>
          </div>
        )}
      </div>

      {/* Desktop: Grid */}
      <div className="hidden grid-cols-1 gap-10 md:grid md:grid-cols-3">
        {isLoading ? (
          <div className="col-span-3 text-center">
            {t("dash_articles_loading")}
          </div>
        ) : articles.length > 0 ? (
          articles.map((article: any, index: number) => (
            <div
              key={index}
              onClick={() => router.push(`/dashboard/artikel/${article.slug}`)}
              className="group relative h-[377px] cursor-pointer overflow-hidden rounded-2xl border border-white/14 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600">
                {article.cover_image_url ? (
                  <img
                    src={article.cover_image_url}
                    alt={article.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <svg
                      className="h-24 w-24 text-white/20"
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

              <div className="absolute bottom-0 left-0 right-0 bg-[#1F1F1F]/40 p-4 backdrop-blur-[27px]">
                <div className="mb-2 flex items-center gap-2 text-sm text-white">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    {new Date(
                      article.created_at || article.date,
                    ).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="line-clamp-2 text-2xl font-medium leading-tight text-white">
                  {article.title}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-20 text-center text-[#8E8E8E]">
            <svg
              className="mx-auto mb-4 h-12 w-12 text-gray-300"
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
            <p className="text-lg font-medium">{t("dash_articles_empty_title")}</p>
            <p className="mt-1 text-sm">{t("dash_articles_empty_desc")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
