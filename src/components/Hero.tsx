import Image from "next/image";
import Button from "./ui/Button";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-300 via-primary to-primary-300 overflow-hidden min-h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-[1440px] mx-auto px-[120px] pt-[108px] pb-[80px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center justify-between">
          {/* Left Content */}
          <div className="text-white space-y-6 animate-fade-in-up">
            <h1
              className="font-hero text-[64px] font-bold leading-[100%] tracking-[0%] bg-clip-text text-transparent"
              style={{
                background:
                  "linear-gradient(94.58deg, #C2F8FF 22.86%, #FFFFFF 62.57%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Guided Healing for a Smoother Stroke Recovery Journey
            </h1>
            <p className="font-hero text-[24px] font-normal leading-[32px] tracking-[0%] text-white/90 max-w-xl align-middle">
              Sublime combines 432 Hz healing tones, gentle affirmations, and
              personalized AI support to help calm your mind, enhance focus, and
              guide you through each step of your recovery — one peaceful
              session at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="font-hero bg-secondary hover:bg-secondary-600 text-white shadow-lg rounded-[99px] p-2 min-w-[120px] h-[44px] flex items-center justify-center gap-1 text-[16px] font-normal leading-[24px] tracking-[0%] text-center">
                Get Started
              </button>
              <button className="font-hero bg-white/90 hover:bg-white text-secondary shadow-lg rounded-[99px] p-2 min-w-[120px] h-[44px] flex items-center justify-center gap-1 text-[16px] font-normal leading-[24px] tracking-[0%] text-center">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                Download App
              </button>
            </div>
          </div>

          {/* Right Content - Image and Cards */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative z-10 ml-12">
              <Image
                src="/female-headphones.png"
                alt="Woman with headphones in peaceful meditation"
                width={814}
                height={814}
                className="object-contain"
                priority
              />
            </div>

            {/* Suggested Sounds Card - Top Right */}
            <div className="absolute top-0 right-0 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 w-64 z-20 animate-fade-in">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700">
                  Suggested Sounds
                </h3>
                <button className="text-primary text-xs font-medium hover:text-primary-600">
                  Show All
                </button>
              </div>
              <div className="bg-gradient-to-br from-secondary-800 to-secondary rounded-xl p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10">
                  <p className="text-white text-xs mb-2">
                    Stroke Recovery Calm 432Hz
                  </p>
                  <p className="text-white/70 text-xs mb-3">
                    My body restores itself gently. I honor my healing p...
                  </p>
                  <button className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <svg
                      className="w-4 h-4 text-secondary-800"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Affirmation Cards - Bottom Right */}
            <div className="absolute bottom-0 right-0 space-y-3 w-72 z-20 animate-fade-in">
              <div className="bg-primary rounded-2xl shadow-xl p-5">
                <h3 className="text-white text-lg font-bold mb-3">
                  Therapeutic audio and mindful affirmations in one place.
                </h3>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-5 space-y-3">
                <p className="text-gray-500 text-sm italic">
                  My body restores itself gently.
                </p>
                <p className="text-gray-900 font-semibold">
                  I honor my healing pace.
                </p>
                <p className="text-gray-500 text-sm">
                  Every small step is progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
