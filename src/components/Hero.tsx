"use client";

import NextImage from "next/image";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden isolate"
      style={{
        background:
          "linear-gradient(90deg, #55BDC0 0%, rgba(85, 189, 192, 0) 100%), #F5F9FA",
        width: "1440px",
        height: "800px",
        maxWidth: "100vw",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Wave Decoration - Background */}
      <div
        className="absolute opacity-15"
        style={{
          width: "1440px",
          height: "798px",
          left: "calc(50% - 1533px/2 + 0.5px)",
          top: "calc(50% - 798px/2 - 1px)",
          zIndex: 0,
        }}
      >
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
        className="flex flex-row justify-between items-center relative"
        style={{
          padding: "108px 40px 80px",
          gap: "40px",
          isolation: "isolate",
          zIndex: 1,
        }}
      >
        {/* Left Column - Text Content */}
        <div
          className="flex flex-col items-start"
          style={{
            width: "490px",
            gap: "24px",
            margin: "0 auto",
          }}
        >
          {/* Content */}
          <div
            className="flex flex-col items-start"
            style={{
              width: "490px",
              gap: "16px",
            }}
          >
            {/* Heading */}
            <h1
              className="font-bold"
              style={{
                width: "450px",
                height: "290px",
                fontFamily: "'Neue Montreal', sans-serif",
                fontSize: "40px",
                lineHeight: "58px",
                background:
                  "linear-gradient(94.58deg, #C2F8FF 22.86%, #FFFFFF 62.57%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "fadeInUp 0.8s ease-out forwards",
              }}
            >
              Panduan Penyembuhan untuk Perjalanan Pemulihan Stroke yang Lebih
              Tenang
            </h1>

            {/* Description */}
            <p
              className="font-normal flex items-center"
              style={{
                width: "400px",
                height: "192px",
                fontFamily: "'Neue Montreal', sans-serif",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "32px",
                color: "#FFFFFF",
                flex: "none",
                order: 1,
                alignSelf: "stretch",
                flexGrow: 0,
                opacity: 0,
                animation: "fadeInUp 0.8s ease-out 0.2s forwards",
              }}
            >
              Strovia memadukan terapi suara 528 Hz, afirmasi lembut, dan
              dukungan AI yang dipersonalisasi untuk membantu menenangkan
              pikiran, meningkatkan fokus, serta mendampingi setiap langkah
              pemulihan Anda — satu sesi damai pada satu waktu.
            </p>
          </div>

          {/* Action Buttons */}
          <div
            className="flex flex-row items-start"
            style={{
              gap: "16px",
              width: "328px",
              height: "40px",
            }}
          >
            {/* Primary Button */}
            <button
              className="flex flex-row justify-center items-center rounded-[99px]"
              style={{
                padding: "8px 12px",
                gap: "4px",
                width: "173px",
                minWidth: "120px",
                height: "40px",
                background: "#3197A5",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 10px 15px -3px rgba(49, 151, 165, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span
                className="font-normal text-center"
                style={{
                  fontFamily: "'Neue Montreal', sans-serif",
                  fontSize: "14px",
                  lineHeight: "24px",
                  color: "#FFFFFF",
                }}
              >
                Mulai Perjalanan Anda
              </span>
            </button>

            {/* Outline Button */}
            <button
              className="flex flex-row justify-center items-center rounded-[99px] border"
              style={{
                padding: "8px",
                gap: "4px",
                width: "139px",
                minWidth: "120px",
                height: "40px",
                background: "#FFFFFF",
                borderColor: "#E1E1E1",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#3197A5";
                e.currentTarget.style.color = "#3197A5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E1E1E1";
                e.currentTarget.style.color = "#1F1F1F";
              }}
            >
              <span
                className="font-normal text-center"
                style={{
                  fontFamily: "'Neue Montreal', sans-serif",
                  fontSize: "14px",
                  lineHeight: "24px",
                  color: "#1F1F1F",
                }}
              >
                Unduh Aplikasi
              </span>
            </button>
          </div>
        </div>

        {/* Right Column - Cards */}
        <div
          className="flex flex-col items-start"
          style={{
            width: "343px",
            gap: "24px",
            margin: "0 auto",
            zIndex: 2,
          }}
        >
          {/* Audio Player Card */}
          <div
            className="flex flex-col items-end"
            style={{
              width: "343px",
              gap: "16px",
            }}
          >
            {/* Header */}
            <div
              className="flex flex-row items-center"
              style={{
                width: "343px",
                height: "24px",
                gap: "16px",
              }}
            >
              <p
                className="font-normal flex items-center flex-1"
                style={{
                  fontFamily: "'Neue Montreal', sans-serif",
                  fontSize: "14px",
                  lineHeight: "150%",
                  color: "#1F1F1F",
                }}
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
              className="flex flex-col items-end relative rounded-2xl overflow-hidden"
              style={{
                width: "343px",
                height: "175px",
                isolation: "isolate",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
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
              <div
                className="absolute inset-0"
                // style={{
                //   background:
                //     "linear-gradient(180deg, rgba(0, 0, 0, 0) -1.23%, #000000 80%)",
                // }}
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
          <h3
            className="font-bold text-center"
            style={{
              width: "343px",
              height: "87px",
              fontFamily: "'Neue Montreal', sans-serif",
              fontSize: "24px",
              lineHeight: "29px",
              color: "#3197A5",
            }}
          >
            Audio terapi dan afirmasi penuh kesadaran, dalam satu tempat.
          </h3>

          {/* Affirmation Card with Glassmorphism */}
          <div
            className="relative rounded-2xl flex flex-col justify-center items-center"
            style={{
              width: "343px",
              height: "142px",
              padding: "24px",
              gap: "24px",
              background: "rgba(49, 151, 165, 0.04)",
              isolation: "isolate",
            }}
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
              <p
                className="font-medium"
                style={{
                  width: "295px",
                  fontFamily: "'Neue Montreal', sans-serif",
                  fontSize: "18px",
                  lineHeight: "26px",
                  color: "#1F1F1F",
                  opacity: 0.2,
                }}
              >
                Pikiranku mulai pulih.
              </p>
              <p
                className="font-medium"
                style={{
                  width: "295px",
                  fontFamily: "'Neue Montreal', sans-serif",
                  fontSize: "18px",
                  lineHeight: "26px",
                  color: "#1F1F1F",
                }}
              >
                Tubuhku ingat cara memulihkan diri.
              </p>
              <p
                className="font-medium"
                style={{
                  width: "295px",
                  fontFamily: "'Neue Montreal', sans-serif",
                  fontSize: "18px",
                  lineHeight: "26px",
                  color: "#1F1F1F",
                  opacity: 0.5,
                }}
              >
                Aku semakin kuat setiap hari.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blur Circle Effects */}
      <div
        className="absolute"
        style={{
          width: "401px",
          height: "304px",
          left: "323px",
          bottom: "284px",
          background: "#3197A5",
          filter: "blur(195px)",
          transform: "rotate(-90deg)",
          zIndex: -1,
          opacity: 0.2,
          pointerEvents: "none",
        }}
      />
      <div
        className="absolute"
        style={{
          width: "387px",
          height: "670px",
          left: "calc(50% - 387px/2 - 130.5px)",
          top: "761px",
          background: "#3197A5",
          filter: "blur(195px)",
          transform: "rotate(-90deg)",
          zIndex: -1,
          opacity: 0.2,
          pointerEvents: "none",
        }}
      />

      {/* Woman with Headphones Image */}
      <div
        className="absolute"
        style={{
          width: "814px",
          height: "814px",
          left: "calc(50% - 814px/2 + 71px)",
          bottom: "-118px",
          zIndex: 0,
        }}
      >
        <NextImage
          src="/login-character.png"
          alt="Woman with headphones"
          width={714}
          height={714}
          className="object-contain"
        />
      </div>

      {/* Bottom Shadow */}
      <div
        className="absolute"
        style={{
          width: "1440px",
          height: "107px",
          left: "calc(50% - 1440px/2)",
          bottom: "0px",
          background:
            "linear-gradient(180deg, rgba(245, 249, 250, 0) 0%, rgba(245, 249, 250, 0.5) 100%)",
          zIndex: 5,
        }}
      />
    </section>
  );
}
