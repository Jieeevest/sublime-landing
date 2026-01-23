"use client";

/**
 * DashboardPromoCards component.
 * Displays the subscription promotion and chatbot prompt cards.
 */
export default function DashboardPromoCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.9fr_1fr] gap-10">
      {/* Premium Card */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/20 rounded-full -ml-16 -mb-16"></div>

        <div className="relative flex items-center gap-6">
          {/* Left Content */}
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-primary/8 border border-primary/7 rounded-full text-base font-medium text-primary">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Berlangganan
            </div>

            <h3 className="text-4xl font-bold text-primary leading-tight">
              Nikmati 30 hari hanya Rp138.000.{" "}
              <span className="text-primary">Dengerin Audio Therapy</span> di
              Berlangganan.
            </h3>
          </div>

          {/* Right Content */}
          <div className="w-[285px] space-y-4">
            <div className="flex items-center justify-end gap-2">
              <svg
                className="w-7 h-7 text-primary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              <span className="text-2xl font-bold text-primary">STROVIA</span>
            </div>

            <p className="text-sm text-secondary leading-relaxed">
              Tanpa perpanjangan otomatis. Tidak ada autodebet. Kamu tetap
              sepenuhnya mengontrol langgananmu.
            </p>

            <button className="px-5 py-2.5 bg-primary text-white rounded-full text-base font-normal hover:bg-primary-600 transition-colors">
              Mulai Berlangganan
            </button>
          </div>
        </div>

        {/* Decorative rectangle */}
        <div className="absolute left-0 top-[156px] w-[249px] h-10 bg-primary"></div>
      </div>

      {/* Chatbot Card */}
      <div className="bg-gradient-to-br from-primary to-primary-600 rounded-2xl p-10 relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>

        {/* Decorative images */}
        <div className="absolute -left-[60px] top-0 w-[100px] h-[100px] bg-white/10 rounded-full"></div>
        <div className="absolute -right-[66px] bottom-[110px] w-[93px] h-[93px] bg-white/10 rounded-full"></div>

        <div className="relative h-full flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold leading-tight">
              Butuh Bimbingan untuk Perjalanan Penyembuhan Anda?
            </h3>

            <p className="text-white/90 text-sm">
              Bicaralah dengan Dokter Via kapan saja.
            </p>

            <button className="px-5 py-2.5 bg-white text-[#1F1F1F] rounded-full text-base font-normal hover:bg-gray-100 transition-colors">
              Chat Sekarang
            </button>
          </div>

          {/* Doctor Image Placeholder */}
          <div className="absolute bottom-[-32px] right-0 w-[132px] h-[197px] bg-white/10 rounded-t-full flex items-center justify-center">
            <svg
              className="w-20 h-20 text-white/30"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Chatbot Icon */}
          <div className="absolute bottom-[110px] right-[82px] w-[100px] h-[100px] bg-primary/40 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
