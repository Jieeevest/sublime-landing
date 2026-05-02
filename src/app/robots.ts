import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/",
          "/cms/",
          "/api/",
          "/payment/",
          "/subscription/",
          "/profile/",
        ],
      },
    ],
    sitemap: "https://strovia.app/sitemap.xml",
    host: "https://strovia.app",
  };
}
