"use client";

import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useGetPublicContentsQuery } from "@/redux/api/sublimeApi";

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
      className="relative flex flex-col items-center isolate"
      style={{
        padding: "80px 120px",
        gap: "40px",
        width: "1440px",
        maxWidth: "100vw",
        background: "#F5F9FA",
        overflow: "hidden",
      }}
    >
      {/* Blur Effect - Right */}
      <div
        className="absolute"
        style={{
          width: "401px",
          height: "304px",
          right: "-400px",
          top: "calc(50% - 304px/2 - 350.66px)",
          background: "#3197A5",
          filter: "blur(195px)",
          transform: "rotate(-90deg)",
          zIndex: -1,
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      {/* Title Section */}
      <div
        className="flex flex-col items-center"
        style={{
          padding: "0px",
          gap: "16px",
          width: "1200px",
          maxWidth: "100%",
          zIndex: 1,
        }}
      >
        {/* Badge */}
        <div
          className="flex flex-row justify-center items-center rounded-[99px]"
          style={{
            padding: "4px 16px",
            gap: "4px",
            width: "97px",
            background: "rgba(49, 151, 165, 0.08)",
            border: "1px solid rgba(49, 151, 165, 0.07)",
          }}
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

          <span
            className="font-medium"
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "14px",
              lineHeight: "28px",
              color: "#3197A5",
            }}
          >
            Artikel
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-bold text-center"
          style={{
            width: "1200px",
            maxWidth: "100%",
            fontFamily: "'PP Neue Montreal', sans-serif",
            fontSize: "64px",
            lineHeight: "77px",
            color: "#3197A5",
          }}
        >
          Panduan untuk membantu Anda tetap tenang dan seimbang.
        </h2>
      </div>

      {/* Article Cards */}
      <div
        className="flex flex-row flex-wrap items-start"
        style={{
          padding: "0px",
          gap: "40px",
          width: "1200px",
          maxWidth: "100%",
          alignContent: "flex-start",
          zIndex: 2,
        }}
      >
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="flex flex-col justify-space-between items-start rounded-2xl overflow-hidden"
              style={{
                padding: "0px",
                flex: "1 1 0",
                minWidth: "330px",
                height: "377.33px",
                background: "rgba(49, 151, 165, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />
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
              className="flex flex-col justify-space-between items-start rounded-2xl overflow-hidden cursor-pointer"
              style={{
                padding: "0px",
                flex: "1 1 0",
                minWidth: "330px",
                height: "377.33px",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                filter:
                  "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.02)) drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.04))",
                position: "relative",
                transition: "all 0.3s ease",
              }}
              onClick={() => handleArticleClick(article.slug)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
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
                className="flex flex-col items-start absolute bottom-0 left-0 right-0"
                style={{
                  padding: "12px 16px",
                  gap: "8px",
                  background: "rgba(31, 31, 31, 0.4)",
                  backdropFilter: "blur(27px)",
                }}
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
                    className="font-normal text-center flex items-center"
                    style={{
                      fontFamily: "'PP Neue Montreal', sans-serif",
                      fontSize: "14px",
                      lineHeight: "150%",
                      color: "#FFFFFF",
                    }}
                  >
                    {article.date}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-semibold flex items-center"
                  style={{
                    fontFamily: "'PP Neue Montreal', sans-serif",
                    fontSize: "24px",
                    lineHeight: "32px",
                    color: "#FFFFFF",
                    alignSelf: "stretch",
                  }}
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
        className="flex flex-row justify-center items-center rounded-[99px]"
        style={{
          padding: "8px 12px",
          gap: "4px",
          minWidth: "120px",
          height: "40px",
          background: "#FFFFFF",
          border: "1px solid #E1E1E1",
          zIndex: 3,
          transition: "all 0.3s ease",
        }}
        onClick={handleViewAllClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#3197A5";
          e.currentTarget.style.color = "#3197A5";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#E1E1E1";
          e.currentTarget.style.color = "#1F1F1F";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <span
          className="font-normal text-center"
          style={{
            fontFamily: "'PP Neue Montreal', sans-serif",
            fontSize: "16px",
            lineHeight: "24px",
            color: "#1F1F1F",
          }}
        >
          Lihat Semua
        </span>

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
