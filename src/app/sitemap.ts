import type { MetadataRoute } from "next";

const SITE_URL = "https://strovia.app";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://strovia.app";

async function getPublishedArticleSlugs(): Promise<string[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/contents/public?type=article&limit=100`,
      {
        next: { revalidate: 3600 }, // revalidate every 1 hour
      },
    );
    if (!res.ok) return [];
    const json = await res.json();
    const articles: { slug?: string }[] = json?.data || [];
    return articles.map((a) => a.slug).filter(Boolean) as string[];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/register`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/dashboard/artikel`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // Fetch dynamic article slugs
  const slugs = await getPublishedArticleSlugs();
  const articleRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/dashboard/artikel/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...articleRoutes];
}
