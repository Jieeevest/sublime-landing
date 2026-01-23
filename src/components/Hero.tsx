"use client";

import NextImage from "next/image";
import Navbar from "./Navbar";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={`${styles.heroSection} relative isolate`}>
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
            <h1 className={styles.heading}>
              Panduan Penyembuhan untuk Perjalanan Pemulihan Stroke yang Lebih
              Tenang
            </h1>

            {/* Description */}
            <p className={`${styles.description} flex items-center`}>
              Strovia memadukan terapi suara 528 Hz, afirmasi l embut, dan
              dukungan AI yang dipersonalisasi untuk membantu menenangkan
              pikiran, meningkatkan fokus, serta mendampingi setiap langkah
              pemulihan Anda — satu sesi damai pada satu waktu.
            </p>
          </div>

          {/* Action Buttons */}
          <div className={`${styles.buttonGroup} flex flex-row items-start`}>
            {/* Primary Button */}
            <button
              className={`${styles.primaryButton} flex flex-row justify-center items-center`}
            >
              <span className={`${styles.buttonText} text-white`}>
                Mulai Perjalanan Anda
              </span>
            </button>

            {/* Outline Button */}
            <button
              className={`${styles.outlineButton} flex flex-row justify-center items-center`}
            >
              <span className={`${styles.buttonText} text-gray-900`}>
                Unduh Aplikasi
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
                Audio Pilihan untuk Anda
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
                Lihat Semua
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
                        Stroke Recovery Calm Indonesian Version
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
                        Pikiranku mulai pulih. Tubuhku ingat cara memulihkan
                        diri.
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
            Audio terapi dan afirmasi penuh kesadaran, dalam satu tempat.
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
                backgroundImage: "url(/210.jpg)",
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
                Pikiranku mulai pulih.
              </p>
              <p className={styles.affirmationText}>
                Tubuhku ingat cara memulihkan diri.
              </p>
              <p className={`${styles.affirmationText} opacity-50`}>
                Aku semakin kuat setiap hari.
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
