"use client";

import { use, ReactNode } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { articles as dummyArticles } from "@/data/articles";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  useGetPublicContentBySlugQuery,
  useGetPublicContentsQuery,
} from "@/redux/api/sublimeApi";

export default function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: slug } = use(params); // The route param is 'id', but we treat it as slug

  // Fetch article detail
  const {
    data: articleData,
    isLoading: isLoadingArticle,
    error,
  } = useGetPublicContentBySlugQuery({ slug: slug, increment_view: true });
  const article = articleData?.data;

  // Fetch related articles (limiting to 3)
  const { data: relatedData } = useGetPublicContentsQuery({
    type: "article",
    limit: 4,
  });
  const relatedArticles = (relatedData?.data || [])
    .filter((a: any) => a.id !== article?.id)
    .slice(0, 3);

  if (isLoadingArticle) {
    return (
      <DashboardLayout activeItem="Artikel">
        <div className="p-20 text-center">
          <p>Loading article...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !article) {
    return (
      <DashboardLayout activeItem="Artikel">
        <div className="p-8 text-center bg-gray-50 m-8 rounded-2xl">
          <h1 className="text-2xl font-bold text-secondary mb-2">
            Artikel tidak ditemukan
          </h1>
          <p className="text-gray-500 mb-6">
            Maaf, artikel yang Anda cari tidak tersedia atau telah dihapus.
          </p>
          <Link
            href="/dashboard/artikel"
            className="px-5 py-2 bg-primary text-white rounded-full hover:bg-primary-600 transition-colors"
          >
            Kembali ke Daftar Artikel
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeItem="Artikel">
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary to-primary-600 h-64">
          {article.cover_image_url ? (
            <div className="absolute inset-0">
              <img
                src={article.cover_image_url}
                alt={article.title}
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-primary-600/50" />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-32 h-32 text-white/10"
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

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary/80 to-transparent p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-white">{article.title}</h1>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-8 py-12">
          {/* Author Info & Actions */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                {/* Fallback author initial */}
                {(article.metadata?.author_name || "A").charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-secondary">
                  {article.metadata?.author_name || "Admin"}
                </p>
                <p className="text-sm text-secondary/60">
                  {new Date(article.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                <svg
                  className="w-5 h-5 text-secondary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                <svg
                  className="w-5 h-5 text-secondary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                <svg
                  className="w-5 h-5 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }: { children?: ReactNode }) => (
                  <h1 className="text-3xl font-bold text-secondary mb-4 mt-8">
                    {children}
                  </h1>
                ),
                h2: ({ children }: { children?: ReactNode }) => (
                  <h2 className="text-2xl font-bold text-secondary mb-3 mt-6">
                    {children}
                  </h2>
                ),
                h3: ({ children }: { children?: ReactNode }) => (
                  <h3 className="text-xl font-semibold text-secondary mb-2 mt-4">
                    {children}
                  </h3>
                ),
                p: ({ children }: { children?: ReactNode }) => (
                  <p className="text-secondary/80 mb-4 leading-relaxed text-justify">
                    {children}
                  </p>
                ),
                ul: ({ children }: { children?: ReactNode }) => (
                  <ul className="list-disc list-inside space-y-2 mb-4 text-secondary/80">
                    {children}
                  </ul>
                ),
                ol: ({ children }: { children?: ReactNode }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-4 text-secondary/80">
                    {children}
                  </ol>
                ),
                li: ({ children }: { children?: ReactNode }) => (
                  <li className="ml-4">{children}</li>
                ),
                strong: ({ children }: { children?: ReactNode }) => (
                  <strong className="font-semibold text-secondary">
                    {children}
                  </strong>
                ),
              }}
            >
              {article.body || article.content || ""}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-200">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {article.category?.name || "Artikel"}
            </span>
            {article.tags &&
              article.tags.map((tag: string, i: number) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-gray-100 text-secondary rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="bg-background py-12">
            <div className="max-w-6xl mx-auto px-8">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Artikel Terkait
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle: any) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/dashboard/artikel/${relatedArticle.slug}`}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer">
                      {/* Image */}
                      <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center relative overflow-hidden">
                        {relatedArticle.cover_image_url ? (
                          <img
                            src={relatedArticle.cover_image_url}
                            alt={relatedArticle.title}
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
                            relatedArticle.created_at,
                          ).toLocaleDateString()}
                        </div>
                        <h3 className="font-bold text-secondary line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedArticle.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
