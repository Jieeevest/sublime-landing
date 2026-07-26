"use client";

import { use } from "react";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import NextImage from "next/image";
import { useGetContentByIdQuery } from "@/redux/api/sublimeApi";
import { useI18n } from "@/i18n";

type Content = {
  id?: string;
  title?: string;
  excerpt?: string;
  body?: string;
  category?: { name?: string } | string | null;
  cover_image_url?: string | null;
  tags?: string[];
  is_published?: boolean;
  is_featured?: boolean;
  seo_title?: string | null;
  seo_description?: string | null;
  created_at?: string;
  updated_at?: string;
};

type Params = {
  params: Promise<{ id: string }>;
};

export default function ArticleView({ params }: Params) {
  const { id } = use(params);
  const { data, isLoading } = useGetContentByIdQuery(id);
  const content: Content | undefined = data?.data;
  const { t } = useI18n();
  const categoryName = content?.category
    ? typeof content.category === "string"
      ? content.category
      : content.category?.name || "-"
    : "-";

  if (isLoading) {
    return (
      <div className="p-8 w-full">
        <div className="mb-6">
          <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-64 bg-gray-100 rounded mt-2 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-9 bg-gray-200 rounded animate-pulse" />
            <div className="h-64 bg-gray-100 rounded animate-pulse" />
            <div className="h-40 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="space-y-4">
            <div className="h-9 bg-gray-200 rounded animate-pulse" />
            <div className="h-32 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 w-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t("view_detailTitle")}</h1>
          <p className="text-gray-500 mt-1">{t("view_subtitle")}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/cms/artikel"
            aria-label={t("view_back")}
            className="group inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 hover:shadow-sm active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            <svg
              className="w-5 h-5 text-gray-600 transition-transform group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>{t("view_back")}</span>
          </Link>
          <Link
            href={`/cms/artikel/${id}/edit`}
            aria-label={t("view_edit")}
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full font-medium hover:bg-primary-600 hover:shadow-md active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <svg
              className="w-5 h-5 text-white/90 transition-transform group-hover:rotate-[8deg]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M4 20h4l10.607-10.607a1.5 1.5 0 000-2.121l-2.486-2.486a1.5 1.5 0 00-2.121 0L4 15.5V20z" />
            </svg>
            <span>{t("view_edit")}</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {content?.title || t("untitled")}
            </h2>
            {content?.excerpt && (
              <p className="text-gray-600 mt-2">{content.excerpt}</p>
            )}

            {content?.cover_image_url && (
              <div className="mt-6 relative h-[420px]">
                <NextImage
                  src={content.cover_image_url}
                  alt="Cover"
                  fill
                  className="object-cover rounded-lg border border-gray-100"
                />
              </div>
            )}

            <div className="mt-6">
              {typeof content?.body === "string" &&
              content.body.trim().startsWith("<") ? (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.body) }}
                />
              ) : (
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {content?.body || "Tidak ada konten"}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">{t("info_title")}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${content?.is_published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
              >
                {content?.is_published ? t("status_published") : t("status_draft")}
              </span>
              {content?.is_featured && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                  Featured
                </span>
              )}
            </div>
            <dl className="text-sm text-gray-700 space-y-3">
              <div className="flex items-center justify-between">
                <dt className="text-gray-500">{t("info_category")}</dt>
                <dd className="text-gray-900">{categoryName}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-gray-500">{t("info_created")}</dt>
                <dd className="text-gray-900">
                  {content?.created_at
                    ? new Date(content.created_at).toLocaleString()
                    : "-"}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-gray-500">{t("info_updated")}</dt>
                <dd className="text-gray-900">
                  {content?.updated_at
                    ? new Date(content.updated_at).toLocaleString()
                    : "-"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">{t("tags_title")}</h3>
            {Array.isArray(content?.tags) && content.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {content.tags.map((t: string, i: number) => (
                  <span
                    key={`${t}-${i}`}
                    className="px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">{t("tags_empty")}</p>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-base font-semibold text-gray-900 mb-4">{t("seo_title")}</h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500">{t("seo_title_label")}</p>
                <p className="text-sm text-gray-900">
                  {content?.seo_title || "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">{t("seo_desc_label")}</p>
                <p className="text-sm text-gray-900">
                  {content?.seo_description || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
