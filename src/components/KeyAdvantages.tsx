import Image from "next/image";

export default function KeyAdvantages() {
  const advantages = [
    "Science-backed therapeutic techniques",
    "Professional narration and sound design",
    "Customizable session lengths (5-30 minutes)",
    "Offline access to your favorite sessions",
    "Regular new content and updates",
    "Privacy-focused with no data sharing",
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-secondary-800 to-secondary text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-700 rounded-full opacity-10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                Key Advantages of Sublime Audio Therapy
              </h2>
              <p className="text-white/80 text-lg">
                Experience the difference with our comprehensive approach to
                audio-based healing and wellness.
              </p>
            </div>

            <ul className="space-y-4">
              {advantages.map((advantage, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      className="w-6 h-6 text-primary-200"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-lg text-white/90">{advantage}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Phone Mockup */}
          <div className="flex justify-center lg:justify-end animate-fade-in">
            <div className="relative w-72 h-[550px]">
              <Image
                src="/phone-mockup-dark.png"
                alt="Sublime app features"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
