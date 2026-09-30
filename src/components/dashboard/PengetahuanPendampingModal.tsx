"use client";

import { useEffect } from "react";
import Image from "next/image";

interface PengetahuanPendampingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload?: () => void;
  canDownload?: boolean;
}

export default function PengetahuanPendampingModal({
  isOpen,
  onClose,
  onDownload,
  canDownload = true,
}: PengetahuanPendampingModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm px-3 py-6 sm:px-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[820px] max-h-[92vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/strovia-log.png"
              alt="Strovia"
              width={112}
              height={28}
              className="h-6 w-auto object-contain sm:h-7"
              priority
            />
          </div>
          <div className="flex items-center gap-2">
            {onDownload && canDownload && (
              <button
                type="button"
                onClick={onDownload}
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-primary-600"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Unduh PDF
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-5 py-6 sm:px-10 sm:py-8">
          <h1 className="text-[26px] font-extrabold leading-tight text-[#1F1F1F] sm:text-[34px]">
            YANG PERLU ANDA <span className="text-[#3197A5]">PAHAMI</span>
          </h1>

          <div className="mt-6 space-y-4 text-[14px] leading-[1.7] text-[#1F1F1F] sm:text-[15px]">
            <p>
              Ada beberapa hal yang perlu Anda pahami saat memulai penyembuhan-mandiri (
              <em>self-healing</em>) dari stroke yang Anda alami. Audio Strovia tidak dapat
              menyembuhkan Anda dari stroke karena Anda sendirilah yang akan menyembuhkan diri
              sendiri. Audio Strovia hanya akan membantu membangkitkan kemampuan tubuh Anda untuk
              menyembuhkan dirinya sendiri dari stroke. Yang juga penting untuk dipahami adalah:
              Audio Strovia tidak dimaksudkan untuk menggantikan proses penyembuhan medis dalam
              bentuk apa pun yang sedang Anda jalani. Keduanya dapat berjalan beriringan dan
              saling mendukung untuk mempercepat proses penyembuhan Anda.
            </p>

            <p>
              Tubuh Anda adalah mesin organik ajaib yang mampu menyembuhkan dirinya sendiri
              sehingga Anda seharusnya tidak pernah mengalami penyakit.
            </p>

            <h2 className="pt-2 text-[16px] font-bold text-[#1F1F1F] sm:text-[18px]">
              Pertanyaannya kemudian: Kenapa kita bisa mengalami penyakit?
            </h2>

            <p>
              Berdasarkan pembelajaran dan pengalaman saya sepanjang hidup, semua penyakit yang
              kita alami disebabkan oleh ketidakseimbangan aliran energi di dalam tubuh. Aliran
              energi menjadi tidak seimbang disebabkan oleh sumbatan-sumbatan energi yang kita
              ciptakan sendiri tanpa sadar. Sumbatan-sumbatan ini tercipta karena kita sering
              kali mempertahankan energi yang seharusnya mengalir bebas melewati diri kita. Ini
              terjadi karena kita tidak sanggup memproses energi secara menyeluruh, membiarkannya
              bersirkulasi dan melewati sistem kita. Misalnya, ketika kita mengalami sebuah
              pengalaman traumatis, kita tidak membiarkan energi dari pengalaman tersebut melewati
              kita. Kita tidak bisa <em>letting it go</em>. Alih-alih, kita menyimpan memori dari
              pengalaman traumatis tersebut di dalam diri kita. Memori mengandung energi, dan
              energi yang negatif dari pengalaman traumatis tersebut akhirnya menjadi sumbatan
              energi dan pada akhirnya termanifestasi menjadi penyakit.
            </p>

            <p>
              Emosi-emosi negatif seperti amarah, sakit hati, kekecewaan, ketakutan, dan
              kecemasan yang muncul ketika pengalaman traumatis terjadi tidak kita hadapi
              sepenuhnya sampai selesai. Banyak dari kita yang cenderung &quot;melarikan diri&quot;
              dari masalah. Kita tidak berani menghadapi emosi-emosi negatif yang muncul karena
              rasanya memang tidak mengenakkan. Emosi (<em>e-motion</em>) adalah energi yang
              mengalir (<em>energy in motion</em>). Alhasil, energi tersebut tidak mengalir
              melewati sistem kita. Kita tidak memprosesnya sampai tuntas sehingga energi tersebut
              bertahan di dalam tubuh kita dan menjadi sumbatan aliran energi yang menyebabkan
              penyakit.
            </p>

            <p>
              Anda harus berani menghadapi masalah apa pun yang terjadi dalam hidup Anda,
              menjalani hidup dengan kesadaran penuh, agar sumbatan-sumbatan energi di dalam diri
              Anda terlepas dan energi kembali mengalir lancar, dan ini pada gilirannya akan
              membuat penyakit-penyakit yang disebabkan olehnya pun turut terlepas. Ada beberapa
              buku yang bisa membantu Anda untuk melakukan praktik pelepasan energi negatif, yang
              bisa Anda temukan di halaman artikel.
            </p>

            <p>
              Dan yang terakhir tapi terpenting dari keseluruhan proses pemulihan Anda, adalah:{" "}
              <em>
                apapun metode/cara pemulihan yang Anda pilih, pada akhirnya yang membuatnya
                berhasil memulihkan Anda adalah keyakinan atau iman Anda sendiri
              </em>
              . Anda harus memiliki iman bahwa Anda SUDAH sembuh saat ini, bukan nanti atau akan.
              Karena iman dan keyakinan Anda sendirilah yang menyembuhkan Anda, Strovia hanyalah
              sebuah media yang diperlukan bagi proses pemulihan Anda.
            </p>
          </div>

          {onDownload && canDownload && (
            <div className="mt-8 flex sm:hidden">
              <button
                type="button"
                onClick={onDownload}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-primary-600"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Unduh PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
