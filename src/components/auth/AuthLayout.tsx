import Link from "next/link";
import NextImage from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#F5F9FA] overflow-hidden">
      {/* Left Panel - Accent Color with Decorations */}
      <div className="relative lg:flex-1 min-h-[400px] lg:min-h-screen bg-[#3197A5] overflow-hidden">
        {/* Background Image with Blur */}
        <div className="absolute inset-0 opacity-10 z-0">
          <div
            className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
            style={{ filter: "blur(20px)" }}
          />
        </div>

        {/* White Overlay */}
        <div
          className="absolute inset-0 bg-white opacity-[0.88] z-0"
          style={{ transform: "scaleX(-1)" }}
        />

        {/* Wave Background Image */}
        <div
          className="absolute bottom-0 left-0 right-0 opacity-50 z-10"
          style={{
            height: "696px",
            backgroundImage: "url(/wave.png)",
            backgroundSize: "cover",
            backgroundPosition: "bottom center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Character Image */}
        <NextImage
          src="/login-character.png"
          alt="Woman with headphones"
          width={659}
          height={659}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          priority
        />

        {/* Logo - Top Left */}
        <div className="absolute top-8 left-8 z-30">
          <Link href="/">
            <NextImage
              src="/strovia-log.png"
              alt="Strovia Logo"
              width={141}
              height={28}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Welcome Card - Glassmorphism Effect - Bottom Center */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 w-full max-w-[880px] px-8">
          {/* Card Container */}
          <div
            className="relative flex flex-row justify-center items-center gap-2 w-full h-[112px] rounded-lg border overflow-hidden"
            style={{
              background: "rgba(49, 151, 165, 0.08)",
              borderColor: "rgba(49, 151, 165, 0.07)",
              padding: "24px",
              boxSizing: "border-box",
              isolation: "isolate",
            }}
          >
            {/* Background Layer */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[880px] h-[215px] z-0"
              style={{ top: "calc(50% + 5.5px)" }}
            >
              {/* Rectangle 5 - Main Gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.47) 0%, rgba(255, 255, 255, 0) 110.84%)",
                  backdropFilter: "blur(21px)",
                  top: "-41.07%",
                  bottom: "-50.89%",
                  left: "0%",
                  right: "0%",
                }}
              />

              {/* Rectangle 6 - Secondary Gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(112.32deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 101.12%)",
                  backdropFilter: "blur(21px)",
                  top: "-41.07%",
                  bottom: "-50.89%",
                  left: "0%",
                  right: "0%",
                }}
              />

              {/* Texture 1 - 210.jpg */}
              <div
                className="absolute bg-cover bg-center opacity-20"
                style={{
                  backgroundImage: "url(/210.jpg)",
                  mixBlendMode: "soft-light",
                  left: "-7.93%",
                  right: "-7.93%",
                  top: "-112.46%",
                  bottom: "-122.98%",
                }}
              />
            </div>

            {/* Grainy Gradient Background */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1040px] h-[864px] opacity-10 z-[1]"
              style={{
                backgroundImage:
                  "url(/grainy-gradient-background-noise-texture-backdrop-webpage-header-banner-design%201.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Title Content */}
            <div className="relative flex flex-col justify-center items-start gap-2 w-full max-w-[832px] h-16 z-[2]">
              <h1
                className="w-full font-medium leading-8"
                style={{
                  fontSize: "24px",
                  lineHeight: "32px",
                  color: "#1F1F1F",
                }}
              >
                {title}
              </h1>
              <p
                className="w-full font-normal"
                style={{
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#1F1F1F",
                }}
              >
                {subtitle}
              </p>
            </div>

            {/* Texture 2 Overlay - 210.jpg */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[386.98px] h-[359.97px] opacity-20 z-[3] pointer-events-none"
              style={{
                backgroundImage: "url(/210.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                mixBlendMode: "soft-light",
                left: "calc(50% - 0.51px)",
                top: "calc(50% - 0.02px)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Right Panel - White Background with Form */}
      <div
        className="relative flex flex-row justify-center items-center bg-white min-h-screen lg:min-h-screen"
        style={{
          width: "480px",
          padding: "0px 64px",
          order: 1,
          alignSelf: "stretch",
          flexGrow: 0,
        }}
      >
        <div
          className="flex flex-col items-center"
          style={{
            width: "352px",
            gap: "40px",
            order: 0,
            flexGrow: 1,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
