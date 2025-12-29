import NextImage from "next/image";

export default function CTASection() {
  return (
    <section
      className="relative flex flex-col justify-center items-center overflow-hidden"
      style={{
        padding: "0px",
        margin: "0px",
        gap: "32px",
        width: "100vw",
        maxWidth: "100vw",
        height: "696px",
        background: "#023347",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        isolation: "isolate",
      }}
    >
      {/* Background Wave */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          left: "0",
          top: "0",
          opacity: 0.5,
          zIndex: 0,
        }}
      >
        <NextImage
          src="/audio-wave.png"
          alt="Background Wave"
          fill
          className="object-cover"
          style={{ objectPosition: "center" }}
        />
      </div>

      {/* Glassmorphism Card */}
      <div
        className="flex flex-col justify-center items-center rounded-2xl relative"
        style={{
          padding: "0px",
          gap: "24px",
          width: "940px",
          height: "354px",
          background: "rgba(31, 31, 31, 0.4)",
          backdropFilter: "blur(37px)",
          borderRadius: "16px",
          zIndex: 1,
        }}
      >
        {/* Text Group */}
        <div
          className="flex flex-col items-center"
          style={{
            padding: "0px",
            gap: "16px",
            width: "860px",
          }}
        >
          {/* Heading */}
          <h2
            className="font-bold text-center"
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "48px",
              lineHeight: "73px",
              background:
                "linear-gradient(90deg, #55BDC0 0%, rgba(85, 189, 192, 0) 100%), #F5F9FA",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent", // Fallback
              alignSelf: "stretch",
            }}
          >
            Terapi Audio Sublime
            <br />
            Untuk Kebutuhan Sehari-hari Anda
          </h2>

          {/* Subtitle */}
          <p
            className="font-normal text-center"
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "16px",
              lineHeight: "24px",
              color: "#FFFFFF",
              opacity: 0.72,
              alignSelf: "stretch",
            }}
          >
            Audio pilihan yang dirancang untuk menemani momen sehari-hari,
            membantu menghadirkan ketenangan, fokus, dan keseimbangan.
          </p>
        </div>

        {/* Buttons */}
        <div
          className="flex flex-row items-center"
          style={{
            padding: "0px",
            gap: "16px",
          }}
        >
          {/* Primary Button */}
          <button
            className="flex flex-row justify-center items-center rounded-[99px]"
            style={{
              padding: "8px 12px",
              gap: "4px",
              minWidth: "120px",
              height: "40px",
              background: "#3197A5",
            }}
          >
            <span
              className="font-normal text-center"
              style={{
                fontFamily: "'PP Neue Montreal', sans-serif",
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
            className="flex flex-row justify-center items-center rounded-[99px]"
            style={{
              padding: "8px",
              gap: "4px",
              minWidth: "120px",
              height: "40px",
              background: "#FFFFFF",
              border: "1px solid #E1E1E1",
            }}
          >
            {/* Download Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              style={{
                border: "1.5px solid #1F1F1F",
                borderRadius: "0px", // Reset
                borderColor: "transparent", // Reset border style applied effectively by path stroke
              }}
            >
              <path
                d="M10 14.1667V3.33334"
                stroke="#1F1F1F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 9.16666L10 14.1667L15 9.16666"
                stroke="#1F1F1F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.33331 16.6667H16.6666"
                stroke="#1F1F1F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span
              className="font-normal text-center"
              style={{
                fontFamily: "'PP Neue Montreal', sans-serif",
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
    </section>
  );
}
