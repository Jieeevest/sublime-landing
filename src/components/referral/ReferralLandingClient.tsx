"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Share2, UserPlus, Gift } from "lucide-react";

const REFERRAL_TAB_URL = "/dashboard/profile?tab=Referral";

export default function ReferralLandingClient() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setIsAuthenticated(!!localStorage.getItem("token"));
    } catch {
      setIsAuthenticated(false);
    }
    setHydrated(true);
  }, []);

  const handleDaftar = () => {
    window.dispatchEvent(new Event("app:navigation-start"));
    if (isAuthenticated) {
      router.push(REFERRAL_TAB_URL);
    } else {
      router.push("/login");
    }
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById("cara-kerja");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E6F7FB] via-white to-[#F0FBFD] pt-[120px] pb-16 sm:pt-[140px] sm:pb-24">
        <div className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-[#BFEAF3]/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-[#3197A5]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1200px] items-center gap-10 px-6 md:grid-cols-2 md:gap-12 md:px-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#BFEAF3] bg-white/70 px-3 py-1.5 backdrop-blur-sm">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z"
                  fill="#3197A5"
                />
              </svg>
              <span className="text-[12px] font-medium tracking-wide text-[#0B6D86]">
                Program Referral Strovia
              </span>
            </div>

            <h1 className="mt-5 text-[36px] font-bold leading-tight text-[#1F1F1F] sm:text-[44px] md:text-[52px]">
              Ajak Teman,
              <br />
              <span className="text-[#3197A5]">Dapatkan Komisi 20%</span>
            </h1>

            <p className="mt-5 max-w-[520px] text-[15px] leading-relaxed text-[#4D4D4D] sm:text-[16px]">
              Undang teman menggunakan kode referralmu dan dapatkan komisi 20% dari
              setiap pengguna yang mendaftar dan berlangganan Strovia melalui kode
              kamu. Selama mereka aktif berlangganan, kamu terus mendapatkan royalti.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleDaftar}
                disabled={!hydrated}
                className="inline-flex items-center gap-2 rounded-full bg-[#3197A5] px-6 py-3 text-[14px] font-medium text-white transition-transform hover:scale-105 hover:bg-[#288a96] disabled:opacity-70"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Daftar Sekarang
              </button>
              <button
                type="button"
                onClick={scrollToHowItWorks}
                className="inline-flex items-center gap-2 rounded-full border border-[#BFEAF3] bg-white/70 px-6 py-3 text-[14px] font-medium text-[#0B6D86] transition-colors hover:bg-white"
              >
                Lihat Cara Kerja
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Highlight metrics */}
            <div className="mt-10 grid grid-cols-3 gap-4 sm:max-w-[440px]">
              <div>
                <p className="text-[22px] font-bold text-[#1F1F1F] sm:text-[26px]">
                  20%
                </p>
                <p className="text-[11px] text-[#8E8E8E] sm:text-[12px]">
                  Komisi per langganan
                </p>
              </div>
              <div>
                <p className="text-[22px] font-bold text-[#1F1F1F] sm:text-[26px]">
                  Tanpa Batas
                </p>
                <p className="text-[11px] text-[#8E8E8E] sm:text-[12px]">
                  Jumlah undangan
                </p>
              </div>
              <div>
                <p className="text-[22px] font-bold text-[#1F1F1F] sm:text-[26px]">
                  Real-time
                </p>
                <p className="text-[11px] text-[#8E8E8E] sm:text-[12px]">
                  Pencairan dana
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-[#BFEAF3]/60 bg-white shadow-lg">
              <Image
                src="/referral-banner.png"
                alt="Program Referral Strovia"
                width={1200}
                height={380}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cara Kerja */}
      <section id="cara-kerja" className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="mx-auto max-w-[640px] text-center">
            <p className="text-[13px] font-medium uppercase tracking-widest text-[#3197A5]">
              Cara Kerja
            </p>
            <h2 className="mt-3 text-[28px] font-bold text-[#1F1F1F] sm:text-[36px]">
              Tiga langkah sederhana, penghasilan berjalan.
            </h2>
            <p className="mt-3 text-[14px] text-[#8E8E8E] sm:text-[15px]">
              Kami mendesain program referral agar mudah dipahami dan langsung
              menghasilkan.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <Share2 size={22} strokeWidth={2.4} />,
                title: "Bagikan Kode Referral",
                desc: "Gunakan kode unikmu dan bagikan link personal ke teman lewat pesan, media sosial, atau langsung.",
              },
              {
                icon: <UserPlus size={22} strokeWidth={2.4} />,
                title: "Teman Daftar & Berlangganan",
                desc: "Temanmu membuat akun via link/kode kamu, lalu berlangganan salah satu paket Strovia.",
              },
              {
                icon: <Gift size={22} strokeWidth={2.4} />,
                title: "Dapatkan Royalti 20%",
                desc: "Selama mereka aktif berlangganan, kamu terus dapat komisi 20% yang bisa ditarik ke rekening.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="relative flex flex-col items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E0F2F4] text-[#3197A5]">
                  {step.icon}
                </div>
                <div className="absolute right-6 top-6 text-[36px] font-bold text-[#E0F2F4]">
                  0{i + 1}
                </div>
                <h3 className="text-[16px] font-bold text-[#1F1F1F]">
                  {step.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-[#6B6B6B]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#F7FCFD] py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-[13px] font-medium uppercase tracking-widest text-[#3197A5]">
                Keuntungan
              </p>
              <h2 className="mt-3 text-[28px] font-bold text-[#1F1F1F] sm:text-[36px]">
                Kenapa program referral Strovia?
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  {
                    title: "Komisi berjalan (recurring)",
                    desc: "Selama teman terus berlangganan, komisi 20% terus mengalir ke saldomu.",
                  },
                  {
                    title: "Dashboard transparan",
                    desc: "Pantau daftar teman, status langganan, saldo, dan riwayat pencairan di satu tempat.",
                  },
                  {
                    title: "Pencairan mudah",
                    desc: "Tarik saldo ke rekening bank kamu kapan pun saat saldo mencukupi.",
                  },
                ].map((b) => (
                  <li key={b.title} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#3197A5] text-white">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-[#1F1F1F]">
                        {b.title}
                      </p>
                      <p className="text-[13px] leading-relaxed text-[#6B6B6B]">
                        {b.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#BFEAF3]/60 bg-white p-8 shadow-sm">
              <p className="text-[13px] font-medium text-[#3197A5]">
                Simulasi Penghasilan
              </p>
              <p className="mt-2 text-[24px] font-bold text-[#1F1F1F]">
                10 teman aktif ={" "}
                <span className="text-[#3197A5]">Rp 198.000 / bulan*</span>
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#6B6B6B]">
                *asumsi paket langganan Rp 99.000/bulan dengan 10 teman aktif
                berlangganan. Semakin banyak teman aktif, semakin besar
                penghasilanmu.
              </p>

              <div className="mt-6 rounded-xl border border-dashed border-[#BFEAF3] bg-[#F7FCFD] p-4">
                <p className="text-[12px] text-[#8E8E8E]">
                  Estimasi berdasarkan komisi 20%. Aktual dapat berbeda tergantung
                  paket dan retensi teman yang kamu ajak.
                </p>
              </div>

              <button
                type="button"
                onClick={handleDaftar}
                disabled={!hydrated}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#3197A5] px-6 py-3 text-[14px] font-medium text-white transition-transform hover:scale-[1.02] hover:bg-[#288a96] disabled:opacity-70"
              >
                Mulai Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-[1000px] px-6 md:px-10">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3197A5] to-[#0B6D86] px-8 py-12 text-center shadow-xl sm:px-16 sm:py-16">
            <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <h2 className="relative text-[28px] font-bold leading-tight text-white sm:text-[36px]">
              Siap menghasilkan bersama Strovia?
            </h2>
            <p className="relative mx-auto mt-4 max-w-[520px] text-[14px] leading-relaxed text-white/85 sm:text-[15px]">
              Daftar program referral hari ini, bagikan kode kamu, dan mulai
              dapatkan komisi 20% dari setiap teman yang berlangganan.
            </p>

            <div className="relative mt-8 flex justify-center">
              <button
                type="button"
                onClick={handleDaftar}
                disabled={!hydrated}
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[14px] font-semibold text-[#0B6D86] transition-transform hover:scale-105 disabled:opacity-70"
              >
                Daftar Sekarang
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
