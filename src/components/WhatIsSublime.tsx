"use client";

import NextImage from "next/image";
import styles from "./WhatIsSublime.module.css";

export default function WhatIsSublime() {
  return (
    <section
      className={`${styles.aboutSection} relative flex flex-col items-center isolate`}
    >
      {/* Title Container */}
      <div
        className={`${styles.titleContainer} flex flex-col items-center`}
        style={{
          padding: "0px",
        }}
      >
        {/* Title Section Badge */}
        <div
          className="flex flex-row justify-center items-center rounded-[99px]"
          style={{
            padding: "4px 16px",
            gap: "4px",
            width: "147px",
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
            className={`${styles.badgeText} font-medium`}
            style={{
              fontSize: "14px",
              lineHeight: "28px",
              color: "#3197A5",
            }}
          >
            Tentang Kami
          </span>
        </div>

        {/* Heading */}
        <h2 className={`${styles.heading} font-bold text-center`}>
          Apa itu Strovia?
        </h2>

        {/* Description */}
        <p className={`${styles.description} font-normal text-center`}>
          Strovia adalah terapi audio modern yang menggunakan frekuensi 528 Hz,
          afirmasi lembut, dan pendamping AI untuk membantu menghadirkan
          ketenangan, kejernihan, dan dukungan dalam proses pemulihan setiap
          hari.
        </p>
      </div>

      {/* Content - 3 Columns */}
      <div
        className={`${styles.contentContainer} flex flex-row items-flex-start relative`}
        style={{ padding: "0px", zIndex: 1 }}
      >
        {/* Left Column - 2 Cards */}
        <div
          className="flex flex-col items-start"
          style={{
            gap: "24px",
            flex: "1",
          }}
        >
          {/* Card 1.1 - Frekuensi Terapi 528 Hz */}
          <div
            className={`${styles.card} flex flex-col items-start rounded-2xl relative`}
            style={{
              alignSelf: "stretch",
              isolation: "isolate",
            }}
          >
            {/* Title */}
            <div
              className="flex flex-col justify-center items-start"
              style={{
                padding: "0px",
                gap: "8px",
                alignSelf: "stretch",
              }}
            >
              <h3 className={`${styles.cardTitle} font-semibold`}>
                Frekuensi Terapi 528 Hz
              </h3>
              <p className={`${styles.cardDescription} font-normal`}>
                Setiap audio dirancang menggunakan frekuensi 528 Hz untuk
                membantu tubuh dan pikiran kembali ke ritme yang lebih tenang
                dan seimbang.
              </p>
            </div>

            {/* Audio Player Preview Card */}
            <div
              className="flex flex-col items-end rounded-2xl overflow-hidden relative"
              style={{
                width: "100%",
                height: "175px",
                isolation: "isolate",
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
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) -1.23%, #000000 80%)",
                }}
              />

              {/* Content */}
              <div
                className="absolute bottom-0 left-0 flex flex-row items-end"
                style={{
                  width: "100%",
                  padding: "16px",
                  zIndex: 1,
                }}
              >
                <div className="flex flex-row items-center gap-2 flex-1">
                  {/* Text */}
                  <div className="flex flex-col items-start flex-1">
                    <p
                      className="font-medium"
                      style={{
                        fontFamily: "'PP Neue Montreal', sans-serif",
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
                        fontFamily: "'PP Neue Montreal', sans-serif",
                        fontSize: "12px",
                        lineHeight: "150%",
                        color: "#E1E1E1",
                      }}
                    >
                      Pikiranku mulai pulih. Tubuhku ingat cara memulihkan diri.
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

          {/* Card 1.2 - Afirmasi Subliminal */}
          <div
            className={`${styles.card} flex flex-col justify-center items-center rounded-2xl relative`}
            style={{
              alignSelf: "stretch",
              isolation: "isolate",
            }}
          >
            {/* Title */}
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
                Afirmasi Subliminal
              </h3>
              <p className={`${styles.cardDescription} font-normal`}>
                Pesan afirmasi disematkan secara halus untuk mendukung fokus,
                suasana hati, dan kestabilan emosi.
              </p>
            </div>

            {/* Affirmation Texts */}
            <div
              className="flex flex-col justify-center items-center"
              style={{
                padding: "0px",
                gap: "8px",
                alignSelf: "stretch",
                zIndex: 1,
              }}
            >
              <p
                className={`${styles.affirmationText} font-medium`}
                style={{
                  opacity: 0.2,
                  alignSelf: "stretch",
                }}
              >
                Pikiranku mulai pulih.
              </p>
              <p
                className={`${styles.affirmationText} font-medium`}
                style={{ alignSelf: "stretch" }}
              >
                Tubuhku ingat cara memulihkan diri.
              </p>
              <p
                className={`${styles.affirmationText} font-medium`}
                style={{
                  opacity: 0.5,
                  alignSelf: "stretch",
                }}
              >
                Aku semakin kuat setiap hari.
              </p>
            </div>

            {/* Blur Effect for this card */}
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
                opacity: 0.3,
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* Card 2 - Phone Screenshot */}
        <div
          className={`${styles.card} ${styles.phoneCard} flex flex-col items-start rounded-2xl relative`}
          style={{
            isolation: "isolate",
          }}
        >
          {/* Phone Image */}
          <div
            className={`${styles.phoneMockup} flex items-stretch justify-center rounded-[40px] overflow-hidden`}
            style={{
              background: "#0A0A0A",
              alignSelf: "stretch",
            }}
          >
            <NextImage
              src="/iphone-13-tentang-kami.png"
              alt="Strovia App"
              width={295}
              height={597}
              className="object-cover"
            />
          </div>

          {/* Blur Effect 2 */}
          <div
            className="absolute"
            style={{
              width: "313px",
              height: "237px",
              left: "calc(50% - 313px/2 + 37.88px)",
              top: "calc(50% - 237px/2 - 38px)",
              background: "#3197A5",
              filter: "blur(195px)",
              transform: "rotate(-90deg)",
              zIndex: -1,
              opacity: 0.3,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Card 3 - Pendamping AI Personal */}
        <div
          className={`${styles.card} flex flex-col items-start rounded-2xl relative`}
          style={{
            isolation: "isolate",
            flex: "1",
            alignSelf: "stretch",
            minHeight: "645px",
          }}
        >
          {/* Title */}
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
              Pendamping AI Personal
            </h3>
            <p className={`${styles.cardDescription} font-normal`}>
              AI pendamping yang siap membantu dengan panduan dan dukungan yang
              disesuaikan dengan kebutuhan Anda.
            </p>
          </div>

          {/* Section - Scrollable Content */}
          <div
            className="flex flex-col items-center"
            style={{
              padding: "24px 0px 0px",
              gap: "20px",
              alignSelf: "stretch",
              flex: "1",
              isolation: "isolate",
              zIndex: 2,
            }}
          >
            {/* AI Avatar */}
            <div
              className="flex flex-col items-center justify-center"
              style={{
                width: "90.22px",
                height: "90.22px",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Background - Circle Pattern */}
              <div
                style={{
                  position: "absolute",
                  width: "90.22px",
                  height: "90.22px",
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  boxShadow:
                    "0px 3.37266px 26.9813px -3.37266px rgba(99, 140, 243, 0.32)",
                  overflow: "hidden",
                }}
              >
                <NextImage
                  src="/circle-pattern.png"
                  alt="AI Avatar Background"
                  width={90}
                  height={90}
                  className="object-cover"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div
              className="flex flex-col items-start"
              style={{
                gap: "8px",
                alignSelf: "stretch",
                zIndex: 2,
              }}
            >
              <h3
                className={`${styles.aiCardTitle} font-bold text-center relative`}
              >
                {/* Line 1 */}
                <span className="inline-flex items-end justify-center gap-2">
                  <span
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #55BDC0, #9BE7E8)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      display: "inline-block",
                    }}
                  >
                    Hi, Kiara
                  </span>

                  <NextImage
                    src="/robot.png"
                    alt="AI Robot"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </span>

                <br />

                {/* Line 2 */}
                <span style={{ color: "#1F1F1F" }}>
                  Ada yang bisa aku bantu hari ini?
                </span>
              </h3>
              <p
                className={`${styles.aiCardText} font-normal text-center flex items-center`}
                style={{ alignSelf: "stretch" }}
              >
                Siap mendampingi kapan pun kamu butuh ketenangan, jawaban, atau
                panduan.
              </p>
            </div>

            {/* Suggestions */}
            <div
              className="flex flex-col justify-space-between items-start"
              style={{
                padding: "0px",
                gap: "24px",
                alignSelf: "stretch",
                flex: "1",
                zIndex: 3,
              }}
            >
              {/* Suggestion Card */}
              <div
                className="flex flex-col items-start rounded-lg"
                style={{
                  padding: "16px",
                  gap: "24px",
                  alignSelf: "stretch",
                  background: "rgba(31, 31, 31, 0.04)",
                  border: "1px solid rgba(31, 31, 31, 0.08)",
                }}
              >
                <p
                  className={`${styles.aiCardText} font-normal text-center flex items-center`}
                  style={{ alignSelf: "stretch" }}
                >
                  Rekomendasikan audio terapi yang cocok untuk kondisiku.
                </p>
              </div>

              {/* Chat Input */}
              <div
                className="flex flex-col items-start"
                style={{
                  padding: "0px",
                  gap: "24px",
                  alignSelf: "stretch",
                }}
              >
                <div
                  className="flex flex-row items-center rounded-[99px]"
                  style={{
                    padding: "0px 14px",
                    alignSelf: "stretch",
                    height: "54px",
                    background: "#FFFFFF",
                    border: "1px solid #E1E1E1",
                    isolation: "isolate",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Tanya apapun..."
                    className={`${styles.aiCardText} flex-1 bg-transparent border-none outline-none`}
                    style={{
                      color: "#8E8E8E",
                    }}
                  />

                  <div className="flex flex-row items-center gap-2">
                    {/* Microphone Button */}
                    <button
                      className="flex flex-col justify-center items-center rounded-full"
                      style={{
                        padding: "12px",
                        width: "40px",
                        height: "40px",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <rect
                          x="8"
                          y="2"
                          width="4"
                          height="8"
                          rx="2"
                          stroke="#1F1F1F"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M5 9a5 5 0 0 0 10 0"
                          stroke="#1F1F1F"
                          strokeWidth="1.5"
                        />
                        <path d="M10 14v4" stroke="#1F1F1F" strokeWidth="1.5" />
                      </svg>
                    </button>

                    {/* Send Button */}
                    <button
                      className="flex flex-col justify-center items-center rounded-full"
                      style={{
                        padding: "11px",
                        width: "40px",
                        height: "40px",
                        background: "#3197A5",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 4v12m0-12l-4 4m4-4l4 4"
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blur Effect - Bottom */}
          <div
            className="absolute"
            style={{
              width: "401px",
              height: "304px",
              left: "calc(50% - 401px/2 - 170.69px)",
              bottom: "-269px",
              background: "#3197A5",
              filter: "blur(195px)",
              transform: "rotate(-90deg)",
              zIndex: -1,
              opacity: 0.3,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* Blur Effect - Bottom Left Global */}
      <div
        className="absolute"
        style={{
          width: "401px",
          height: "304px",
          left: "-320px",
          top: "92px",
          background: "#3197A5",
          filter: "blur(195px)",
          transform: "rotate(-90deg)",
          zIndex: -1,
          opacity: 0.2,
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
