import type { Metadata } from "next";
import ArticleDetailClient from "@/components/dashboard/ArticleDetailClient";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://strovia.app";
const SITE_URL = "https://strovia.app";

type Props = {
  params: Promise<{ id: string }>;
};

async function getArticleBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/contents/public/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan",
      description: "Artikel yang Anda cari tidak tersedia.",
    };
  }

  const title = article.seo_title || article.title;
  const description =
    article.seo_description ||
    article.excerpt ||
    `Baca artikel "${article.title}" di Strovia — platform terapi audio subliminal 432 Hz untuk pemulihan stroke.`;
  const imageUrl = article.cover_image_url || `${SITE_URL}/og-image.png`;
  const canonicalUrl = `${SITE_URL}/dashboard/artikel/${slug}`;

  return {
    title: article.seo_title ? { absolute: article.seo_title } : title,
    description,
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: article.seo_title || title,
      description,
      siteName: "Strovia",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: article.published_at || article.created_at,
      modifiedTime: article.updated_at,
    },
    twitter: {
      card: "summary_large_image",
      title: article.seo_title || title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function ArticleDetailPage({ params }: Props) {
  return <ArticleDetailClient params={params} />;
}
