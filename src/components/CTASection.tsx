import Image from 'next/image';
import Button from './ui/Button';

export default function CTASection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 overflow-hidden">
      {/* Background Audio Waves */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-48 opacity-30">
        <Image
          src="/audio-wave.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-48 opacity-30 scale-x-[-1]">
        <Image
          src="/audio-wave.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          Sublime Audio Therapy for Your Everyday Needs
        </h2>
        <p className="text-xl sm:text-2xl text-teal-50 mb-10 max-w-2xl mx-auto">
          Start your journey to better mental wellness today with personalized guided sessions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" className="text-lg px-8 py-4">
            Download Now
          </Button>
          <Button variant="primary" className="bg-teal-800 hover:bg-teal-900 text-white text-lg px-8 py-4">
            Try Free Trial
          </Button>
        </div>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-teal-300 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-teal-700 rounded-full opacity-20 blur-2xl"></div>
    </section>
  );
}
