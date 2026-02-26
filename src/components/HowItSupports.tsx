"use client";

import styles from "./HowItSupports.module.css";
import { useI18n } from "@/i18n";

export default function HowItSupports() {
  const { t } = useI18n();
  return (
    <section
      id="cara-kerja"
      className={`${styles.section} relative flex flex-col items-center isolate`}
    >
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

          <span className={styles.badgeText}>{t("how_badge")}</span>
        </div>

        {/* Main Heading */}
        <h2 className={`${styles.heading} font-bold text-center`}>
          {t("how_heading")}
        </h2>

        {/* Description */}
        {/* <p className={`${styles.description} font-normal text-center`}>
          Strovia menggunakan pendekatan audio yang lembut untuk membantu
          menciptakan kondisi pikiran dan emosi yang lebih tenang, sehingga
          tubuh dapat menjalani proses pemulihan secara alami.
        </p> */}
      </div>

      {/* Content Cards */}
      <div
        className={`${styles.contentContainer} flex flex-col items-flex-start`}
      >
        {/* Card 1 - Frekuensi 528 Hz */}
        <div className={`${styles.card} flex flex-col items-start rounded-2xl`}>
          <div
            className="flex flex-col justify-center items-start"
            style={{
              padding: "0px",
              gap: "8px",
              alignSelf: "stretch",
              zIndex: 0,
            }}
          >
            <h3 className={`${styles.cardTitle} font-semibold`}>
              {t("how_card1_title")}
            </h3>
            <div className={`${styles.cardDescription} font-normal`}>
              <p
                style={{
                  marginBottom: "16px",
                  textAlign: "justify",
                }}
              >
                {t("how_card1_body1")}
              </p>
              <p style={{ textAlign: "justify" }}>
                Studi yang dipublikasikan di jurnal ilmiah dan dirujuk oleh{" "}
                <strong>{t("how_card1_nih")}</strong> {t("how_card1_body2")}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 - Afirmasi Subliminal */}
        <div
          className={`${styles.card} flex flex-col justify-center items-center rounded-2xl`}
        >
          <div
            className="flex flex-col justify-center items-start"
            style={{
              padding: "0px",
              gap: "8px",
              alignSelf: "stretch",
              zIndex: 0,
            }}
          >
            <h3 className={`${styles.cardTitle} font-semibold`}>
              {t("how_card2_title")}
            </h3>
            <p
              className={`${styles.cardDescription} font-normal`}
              style={{
                alignSelf: "stretch",
                marginBottom: "16px",
                textAlign: "justify",
              }}
            >
              {t("how_card2_body1")}
            </p>
            <p style={{ textAlign: "justify" }}>
              Penelitian di jurnal <em>{t("how_card2_journal")}</em>{" "}
              {t("how_card2_body2")}
            </p>
          </div>
        </div>
      </div>

      {/* Blur Effect - Right */}
      <div className={`${styles.blurRight} absolute`} />

      {/* Blur Effect - Bottom */}
      <div className={`${styles.blurBottom} absolute`} />
    </section>
  );
}
