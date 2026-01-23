"use client";

import NextImage from "next/image";

export default function KeyAdvantages() {
  const advantages = [
    {
      icon: "/icons/icon-manfaat-1.svg",
      title: "Menenangkan Stres & Pikiran",
      description:
        "Frekuensi 528 Hz membantu menghadirkan rasa tenang dan keseimbangan pada pikiran dan sistem saraf.",
    },
    {
      icon: "/icons/icon-manfaat-2.svg",
      title: "Mendukung Pemulihan Saraf",
      description:
        "Afirmasi subliminal membantu membangun pola pikir yang lebih positif dan stabil selama proses pemulihan.",
    },
    {
      icon: "/icons/icon-manfaat-3.svg",
      title: "Dukungan Emosional dari AI",
      description:
        "Pendamping AI siap menemani, mendengarkan, dan memberikan panduan lembut kapan pun dibutuhkan.",
    },
    {
      icon: "/icons/icon-manfaat-4.svg",
      title: "Terjangkau & Mudah Digunakan",
      description:
        "Satu paket 30 hari, tanpa perpanjangan otomatis, tanpa biaya tersembunyi — dirancang agar mudah digunakan oleh semua usia.",
    },
  ];

  return (
    <section
      className="flex flex-col justify-center items-flex-start relative"
      style={{
        padding: "80px 120px",
        gap: "80px",
        width: "1440px",
        maxWidth: "100vw",
        background: "#023347",
      }}
    >
      {/* Content Container */}
      <div
        className="flex flex-row items-start rounded-2xl"
        style={{
          padding: "0px",
          gap: "40px",
          width: "1200px",
          maxWidth: "100%",
        }}
      >
        {/* Left Side */}
        <div
          className="flex flex-col items-start"
          style={{
            padding: "0px",
            gap: "24px",
            flex: "1",
          }}
        >
          {/* Title Section */}
          <div
            className="flex flex-col items-start"
            style={{
              padding: "0px",
              gap: "16px",
              alignSelf: "stretch",
            }}
          >
            {/* Badge */}
            <div
              className="flex flex-row justify-center items-center rounded-[99px]"
              style={{
                padding: "4px 16px",
                gap: "4px",
                width: "109px",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.07)",
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
                  fill="#FFFFFF"
                />
                <path
                  d="M12 4L12.8 7.2L16 8L12.8 8.8L12 12L11.2 8.8L8 8L11.2 7.2L12 4Z"
                  fill="#FFFFFF"
                  opacity="0.5"
                />
              </svg>

              <span
                className="font-medium"
                style={{
                  fontFamily: "'PP Neue Montreal', sans-serif",
                  fontSize: "14px",
                  lineHeight: "28px",
                  color: "#FFFFFF",
                }}
              >
                Manfaat
              </span>
            </div>

            {/* Heading */}
            <h2
              className="font-bold"
              style={{
                fontFamily: "'PP Neue Montreal', sans-serif",
                fontSize: "64px",
                lineHeight: "77px",
                backgroundImage: "linear-gradient(90deg, #55BDC0, #9BE7E8)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                alignSelf: "stretch",
              }}
            >
              Keunggulan Utama Strovia
            </h2>

            {/* Description */}
            <p
              className="font-normal"
              style={{
                fontFamily: "'PP Neue Montreal', sans-serif",
                fontSize: "24px",
                lineHeight: "32px",
                color: "#E1E1E1",
                alignSelf: "stretch",
              }}
            >
              Sublime menggabungkan audio terapi 528 Hz, afirmasi lembut, dan
              pendamping AI untuk membantu menciptakan ketenangan, fokus, dan
              dukungan dalam pemulihan sehari-hari.
            </p>
          </div>

          {/* Advantage Cards */}
          <div
            className="flex flex-col items-start"
            style={{
              padding: "0px",
              gap: "24px",
              alignSelf: "stretch",
            }}
          >
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="flex flex-row items-center rounded-lg"
                style={{
                  padding: "12px",
                  gap: "16px",
                  alignSelf: "stretch",
                  transition: "all 0.3s ease",
                  cursor: "default",
                  borderRadius: "16px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.transform = "translateX(10px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                {/* Icon */}
                <div
                  className="flex flex-row justify-center items-center rounded-lg"
                  style={{
                    padding: "8px",
                    width: "56px",
                    height: "56px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.07)",
                  }}
                >
                  <NextImage
                    src={advantage.icon}
                    alt={advantage.title}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>

                {/* Text */}
                <div
                  className="flex flex-col justify-center items-start flex-1"
                  style={{
                    padding: "0px",
                    gap: "8px",
                  }}
                >
                  <h3
                    className="font-semibold"
                    style={{
                      fontFamily: "'PP Neue Montreal', sans-serif",
                      fontSize: "24px",
                      lineHeight: "32px",
                      color: "#FFFFFF",
                      alignSelf: "stretch",
                    }}
                  >
                    {advantage.title}
                  </h3>
                  <p
                    className="font-normal"
                    style={{
                      fontFamily: "'PP Neue Montreal', sans-serif",
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#E1E1E1",
                      alignSelf: "stretch",
                    }}
                  >
                    {advantage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Phone Mockup */}
        <div
          className="flex flex-row items-center rounded-2xl relative"
          style={{
            padding: "0px",
            flex: "1",
            alignSelf: "stretch",
            isolation: "isolate",
          }}
        >
          {/* Frame */}
          <div
            className="flex flex-col items-center rounded-2xl relative"
            style={{
              padding: "32px 16px",
              gap: "32px",
              alignSelf: "stretch",
              flex: "1",
              background: "rgba(255, 255, 255, 0.02)",
              // border: "1px solid rgba(255, 255, 255, 0.1)",
              justifyContent: "center",
              zIndex: 0,
            }}
          >
            {/* Blur Effect */}
            <div
              className="absolute"
              style={{
                width: "401px",
                height: "304px",
                left: "calc(50% - 401px/2 + 48.5px)",
                top: "calc(50% - 304px/2 - 48.5px)",
                background: "#3197A5",
                filter: "blur(195px)",
                transform: "rotate(-90deg)",
                zIndex: -1,
                opacity: 0.4,
                pointerEvents: "none",
              }}
            />

            {/* Phone Image */}
            <div
              style={{
                position: "relative",
                width: "326px",
                height: "710px",
              }}
            >
              <NextImage
                src="/iphone-13.png"
                alt="Strovia App"
                width={326}
                height={710}
                className="object-contain"
                style={{
                  borderRadius: "50px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
