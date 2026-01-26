"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

/**
 * DashboardPromoCards component.
 * Displays the subscription promotion and chatbot prompt cards with specific styling.
 */
export default function DashboardPromoCards() {
  const router = useRouter();
  return (
    <div className="flex flex-col xl:flex-row gap-[40px] w-full max-w-[1267px] mx-auto">
      {/* ==============================================
          LEFT CARD: Subscription
          Width: 827px
          ============================================== */}
      <div
        className="relative flex-1 rounded-[16px] flex items-center p-[40px] overflow-hidden group"
        style={{
          minHeight: "319px",
          background: "#FFFFFF",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          {/* Main Gradients matching Figma 'Rectangle 5' and 'Rectangle 6' */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(112.83deg, rgba(255, 255, 255, 0.47) 0%, rgba(255, 255, 255, 0) 110.84%)",
              backdropFilter: "blur(21px)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(112.32deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 101.12%)",
              backdropFilter: "blur(21px)",
            }}
          />

          {/* Texture Overlay */}
          <Image
            src="/grainy-gradient-background-noise-texture-backdrop-webpage-header-banner-design 1.png"
            alt="texture"
            fill
            className="object-cover opacity-[0.16] mix-blend-soft-light"
          />

          {/* Color Overlay #Img_Cover_M.5 */}
          <div
            className="absolute inset-0"
            style={{
              background: "#3197A5",
              opacity: 0.16,
            }}
          />

          {/* Decorative Vector */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "1311px",
              height: "326px",
              right: "-235px",
              top: "50%",
              transform: "translateY(-50%) rotate(168.79deg)",
              border: "0.2px solid #3197A5",
              borderRadius: "50%",
              opacity: 0.5,
            }}
          />
        </div>

        {/* Content Container (Z-10) */}
        <div className="relative z-10 flex flex-row items-center w-full h-full gap-[24px]">
          {/* LEFT COLUMN: Badge & Price */}
          <div className="flex-1 flex flex-col items-start justify-center gap-[16px]">
            {/* Header Group */}
            <div className="flex flex-col gap-[16px]">
              {/* Badge */}
              <div
                className="flex flex-row items-center justify-center gap-[4px] px-[16px] py-[4px] w-fit"
                style={{
                  background: "rgba(49, 151, 165, 0.08)",
                  border: "1px solid rgba(49, 151, 165, 0.07)",
                  borderRadius: "99px",
                }}
              >
                {/* Stars Icon */}
                <div className="flex gap-0.5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#3197A5"
                    className="transform -scale-x-100"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: "'PP Neue Montreal', sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "28px",
                    color: "#3197A5",
                  }}
                >
                  Berlangganan
                </span>
              </div>

              {/* Title */}
              <h2
                className="text-[#3197A5] max-w-[480px] leading-tight"
                style={{
                  fontFamily: "'PP Neue Montreal', sans-serif",
                  fontWeight: 700,
                  fontSize: "36px",
                }}
              >
                Nikmati 30 hari hanya <br />
                <span
                  style={{
                    fontSize: "56px",
                    color: "#023347",
                    display: "block",
                    margin: "8px 0",
                  }}
                >
                  Rp.138,000,-
                </span>
                Dengerin{" "}
                <span
                  className="bg-[#3197A5] text-white px-2 py-1 mx-1"
                  style={{ borderRadius: "4px" }}
                >
                  Audio Therapy
                </span>{" "}
                di Berlangganan.
              </h2>
            </div>
          </div>

          {/* RIGHT COLUMN: Info & Actions */}
          <div className="w-[300px] flex flex-col justify-center items-end gap-[24px]">
            {/* Brand Line */}
            <div className="relative w-[140px] h-[32px]">
              <Image
                src="/strovia-log.png"
                alt="STROVIA"
                fill
                className="object-contain object-right"
              />
            </div>
            {/* Description */}
            <p
              className="text-[#023347] text-right"
              style={{
                fontFamily: "'PP Neue Montreal', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "21px",
              }}
            >
              Tanpa perpanjangan otomatis. Tidak ada autodebet. Kamu tetap
              sepenuhnya mengontrol langgananmu.
            </p>
            {/* Button */}
            <button
              onClick={() => router.push("/dashboard/subscriptions")}
              className="flex items-center justify-center px-[20px] py-[10px] bg-[#3197A5] hover:bg-[#288a96] rounded-full text-white transition-colors"
            >
              <span style={{ fontSize: "16px", fontWeight: 500 }}>
                Mulai Berlangganan
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ==============================================
          RIGHT CARD: Chatbot
          Width: 400px
          ============================================== */}
      <div
        className="relative rounded-[16px] overflow-hidden flex flex-col justify-center p-[40px] flex-shrink-0"
        style={{
          width: "100%",
          maxWidth: "400px",
          minHeight: "319px",
          background: "#3197A5",
        }}
      >
        {/* Background Gradients */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) -1.23%, #000000 80%)",
            opacity: 0.2,
          }}
        />

        {/* Content Z-10 */}
        <div className="relative z-10 flex flex-col gap-[16px] max-w-[320px]">
          <h3
            className="text-white"
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "29px",
            }}
          >
            Butuh bimbingan dan dukungan informasi sepanjang proses pemulihan
            diri anda?
          </h3>

          <p
            className="text-white"
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "21px",
            }}
          >
            Diskusi dengan Dokter Via kapan saja.
          </p>

          <button
            onClick={() => router.push("/dashboard/ai-chat")}
            className="flex items-center justify-center px-[20px] py-[8px] bg-white text-[#1F1F1F] rounded-full w-fit mt-2 hover:scale-105 transition-transform"
          >
            <span style={{ fontSize: "16px", fontWeight: 500 }}>
              Chat Sekarang
            </span>
          </button>
        </div>

        {/* Robot Image */}
        <div className="absolute right-[-20px] bottom-[-40px] z-20 pointer-events-none">
          <Image
            src="/robot.png"
            alt="Robot"
            width={160}
            height={220}
            className="object-contain"
          />
        </div>

        {/* Abstract Circles/Decorations */}
        <div className="absolute top-[-20px] left-[-20px] w-[100px] h-[100px] opacity-20 pointer-events-none">
          <div className="w-full h-full rounded-full border-[10px] border-white/30" />
        </div>
        <div className="absolute bottom-[20%] right-[-10px] w-[60px] h-[60px] opacity-10 pointer-events-none">
          <div className="w-full h-full rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}
