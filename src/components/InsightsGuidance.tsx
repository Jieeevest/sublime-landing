"use client";

import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useGetPublicContentsQuery } from "@/redux/api/sublimeApi";
import styles from "./InsightsGuidance.module.css";

// Type for article data
interface Article {
  id: string;
  slug: string;
  image: string;
  date: string;
  title: string;
}

export default function InsightsGuidance() {
  const router = useRouter();

  // Fetch articles from API - get 3 most recent published articles
  const { data, isLoading, error } = useGetPublicContentsQuery({
    page: 1,
    limit: 3,
    type: "artikel", // Filter for articles only
  });

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Map API data to article format
  const articles: Article[] =
    data?.data?.map((content: any) => ({
      id: content.id,
      slug: content.slug,
      image: content.thumbnail || "/article-placeholder.jpg",
      date: formatDate(content.published_at || content.created_at),
      title: content.title,
    })) || [];

  // Handle article click
  const handleArticleClick = (slug: string) => {
    router.push(`/artikel/${slug}`);
  };

  // Handle view all click
  const handleViewAllClick = () => {
    router.push("/artikel");
  };

  return (
    <section
      id="artikel"
      className={`${styles.section} relative flex flex-col items-center isolate`}
    >
      {/* Blur Effect - Right */}
      <div className={`${styles.blurRight} absolute`} />

      {/* Title Section */}
      <div className={`${styles.titleSection} flex flex-col items-center`}>
        {/* Badge */}
        <div
          className={`${styles.badge} flex flex-row justify-center items-center`}
        >
          {/* Star Icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{
              transform: "matrix(-1, 0, 0, 1, 0, 0)",
            }}
          >
            <path
              d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
              fill="#3197A5"
            />
            <path
              d="M12 4L12.8 7.2L16 8L12.8 8.8L12 12L11.2 8.8L8 8L11.2 7.2L12 4Z"
              fill="#3197A5"
              opacity="0.5"
            />
          </svg>

          <span className={styles.badgeText}>Artikel</span>
        </div>

        {/* Heading */}
        <h2 className={`${styles.heading} font-bold text-center`}>
          Panduan untuk membantu Anda tetap tenang dan seimbang.
        </h2>
      </div>

      {/* Article Cards */}
      <div
        className={`${styles.articleContainer} flex flex-row flex-wrap items-start`}
      >
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, index) => (
            <div key={`skeleton-${index}`} className={styles.skeleton} />
          ))
        ) : error ? (
          // Error state
          <div
            style={{
              width: "100%",
              textAlign: "center",
              padding: "40px",
              color: "#999",
            }}
          >
            <p>Gagal memuat artikel. Silakan coba lagi nanti.</p>
          </div>
        ) : articles.length === 0 ? (
          // Empty state
          <div
            style={{
              width: "100%",
              textAlign: "center",
              padding: "40px",
              color: "#999",
            }}
          >
            <p>Belum ada artikel yang tersedia.</p>
          </div>
        ) : (
          articles.map((article, index) => (
            <div
              key={article.id || index}
              className={`${styles.articleCard} flex flex-col justify-space-between items-start`}
              onClick={() => handleArticleClick(article.slug)}
            >
              {/* Image Background */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%), url(${article.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "20px",
                }}
              />

              {/* Text Overlay */}
              <div
                className={`${styles.articleOverlay} flex flex-col items-start absolute bottom-0 left-0 right-0`}
              >
                {/* Date */}
                <div
                  className="flex flex-row items-center"
                  style={{
                    padding: "0px",
                    gap: "8px",
                    alignSelf: "stretch",
                  }}
                >
                  {/* Calendar Icon */}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect
                      x="2"
                      y="3"
                      width="12"
                      height="11"
                      rx="2"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M5 1v3M11 1v3"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                    <path d="M2 6h12" stroke="#FFFFFF" strokeWidth="1.5" />
                  </svg>

                  <span
                    className={`${styles.articleDate} font-normal text-center flex items-center`}
                  >
                    {article.date}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`${styles.articleTitle} font-semibold flex items-center`}
                  style={{ alignSelf: "stretch" }}
                >
                  {article.title}
                </h3>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CTA Button */}
      <button
        className={`${styles.ctaButton} flex flex-row justify-center items-center`}
        onClick={handleViewAllClick}
      >
        <span className={styles.ctaButtonText}>Lihat Semua</span>

        {/* Arrow Icon */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M5 10h10m0 0l-4-4m4 4l-4 4"
            stroke="#1F1F1F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
}
