"use client";

import NextImage from "next/image";
import Navbar from "./Navbar";
import styles from "./Hero.module.css";
import { useI18n } from "@/i18n";

export default function Hero() {
  const { t } = useI18n();
  return (
    <section id="beranda" className={`${styles.heroSection} relative isolate`}>
      {/* Navbar */}
      <Navbar />

      {/* Wave Decoration - Background */}
      <div className={`${styles.waveDecoration} absolute`}>
        <NextImage
          src="/wave.png"
          alt="Wave decoration"
          width={1533}
          height={798}
          className="object-cover"
        />
      </div>

      {/* Main Content Container */}
      <div
        className={`${styles.mainContent} flex flex-row justify-between items-center relative`}
      >
        {/* Left Column - Text Content */}
        <div className={`${styles.leftColumn} flex flex-col items-start`}>
          {/* Content */}
          <div className={`${styles.contentWrapper} flex flex-col items-start`}>
            {/* Heading */}
            <h1 className={styles.heading}>{t("hero_heading")}</h1>

            {/* Description */}
            {/* <p className={`${styles.description} flex items-center`}> */}
            {/* Strovia memadukan terapi suara 528 Hz, afirmasi l embut, dan
              dukungan AI yang dipersonalisasi untuk membantu menenangkan
              pikiran, meningkatkan fokus, serta mendampingi setiap langkah
              pemulihan Anda — satu sesi damai pada satu waktu. */}
            {/* Strovia adalah audio subliminal berbasis frekuensi khusus yang
              tujuannya membangkitkan kemampuan pemulihan mandiri dalam diri
              penderita stroke */}
            {/* </p> */}
          </div>

          {/* Action Buttons */}
          <div className={`${styles.buttonGroup} flex flex-row items-start`}>
            <button
              className={`${styles.primaryButton} flex flex-row justify-center items-center`}
            >
              <span className={`${styles.buttonText} text-white`}>
                {t("hero_cta_primary")}
              </span>
            </button>

            <button
              className={`${styles.outlineButton} flex flex-row justify-center items-center`}
            >
              <span className={`${styles.buttonText} text-gray-900`}>
                {t("hero_cta_secondary")}
              </span>
            </button>
          </div>
        </div>

        {/* Right Column - Cards */}
        <div className={`${styles.rightColumn} flex flex-col items-start`}>
          {/* Audio Player Card */}
          <div className={`${styles.audioCard} flex flex-col items-end`}>
            {/* Header */}
            <div
              className={`${styles.audioCardHeader} flex flex-row items-center`}
            >
              <p
                className={`${styles.audioCardHeaderText} flex items-center flex-1`}
              >
                {t("hero_audio_label")}
              </p>
              <button
                className="flex flex-row justify-center items-center"
                style={{
                  width: "85px",
                  height: "24px",
                  fontFamily: "'Neue Montreal', sans-serif",
                  fontSize: "14px",
                  lineHeight: "24px",
                  color: "#3197A5",
                }}
              >
                {t("hero_audio_see_all")}
              </button>
            </div>

            {/* Card */}
            <div
              className={`${styles.audioCardContent} flex flex-col items-end relative`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "url(/image-cover.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{ background: "rgba(0, 0, 0, 0.65)" }}
              />

              {/* Content */}
              <div
                className="absolute bottom-0 left-0 flex flex-row items-end"
                style={{
                  width: "341px",
                  height: "76px",
                  zIndex: 1,
                }}
              >
                <div
                  className="flex flex-col items-start flex-1"
                  style={{
                    padding: "16px",
                    gap: "16px",
                  }}
                >
                  <div
                    className="flex flex-row items-center"
                    style={{
                      gap: "8px",
                      width: "320px",
                      height: "44px",
                    }}
                  >
                    {/* Text */}
                    <div className="flex flex-col items-start flex-1">
                      <p
                        className="font-medium"
                        style={{
                          fontFamily: "'Neue Montreal', sans-serif",
                          fontSize: "14px",
                          lineHeight: "22px",
                          color: "#FFFFFF",
                        }}
                      >
                        {/* Stroke Recovery Calm Indonesian Version */}
                        {t("hero_audio_title")}
                      </p>
                      <p
                        className="font-normal"
                        style={{
                          fontFamily: "'Neue Montreal', sans-serif",
                          fontSize: "12px",
                          lineHeight: "150%",
                          color: "#E1E1E1",
                        }}
                      >
                        {t("hero_audio_desc")}
                      </p>
                    </div>

                    {/* Pause Button */}
                    <button
                      className="flex flex-col justify-center items-center rounded-full"
                      style={{
                        padding: "12px",
                        width: "44px",
                        height: "44px",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="white"
                      >
                        <rect x="5" y="3" width="3" height="14" />
                        <rect x="12" y="3" width="3" height="14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Affirmation Header */}
          <h3 className={`${styles.affirmationTitle} font-bold text-center`}>
            {t("hero_affirmation_title")}
          </h3>

          {/* Affirmation Card with Glassmorphism */}
          <div
            className={`${styles.affirmationCard} relative rounded-2xl flex flex-col justify-center items-center`}
          >
            {/* Texture Background */}
            <div
              className="absolute"
              style={{
                width: "386.98px",
                height: "359.97px",
                left: "calc(50% - 386.98px/2 - 0.01px)",
                top: "calc(50% - 359.97px/2 - 0.02px)",
                // backgroundImage: "url(/image-cover.png)",
                mixBlendMode: "soft-light",
                opacity: 0.2,
                zIndex: 0,
              }}
            />

            {/* Glassmorphism Background */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(112.83deg, rgba(255, 255, 255, 0.47) 0%, rgba(255, 255, 255, 0) 110.84%)",
                backdropFilter: "blur(21px)",
                zIndex: 1,
              }}
            />
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(112.32deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 101.12%)",
                backdropFilter: "blur(21px)",
                zIndex: 1,
              }}
            />

            {/* Affirmation Texts */}
            <div
              className="flex flex-col justify-center items-center relative"
              style={{
                width: "295px",
                height: "94px",
                gap: "8px",
                zIndex: 2,
              }}
            >
              <p className={`${styles.affirmationText} opacity-20`}>
                {t("hero_affirm_1")}
              </p>
              <p className={styles.affirmationText}>{t("hero_affirm_2")}</p>
              <p className={`${styles.affirmationText} opacity-50`}>
                {t("hero_affirm_3")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blur Circle Effects */}
      <div className={`${styles.blurEffect1} absolute`} />
      <div className={`${styles.blurEffect2} absolute`} />

      {/* Woman with Headphones Image */}
      <div className={`${styles.characterImage} absolute`}>
        <NextImage
          src="/login-character.png"
          alt="Woman with headphones"
          width={714}
          height={714}
          className="object-contain"
        />
      </div>

      {/* Bottom Shadow */}
      <div className={`${styles.bottomShadow} absolute`} />
    </section>
  );
}
