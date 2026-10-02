"use client";

import { useEffect } from "react";

type PdfVariant = "pengetahuan-pendamping" | "panduan-penggunaan";

interface PengetahuanPendampingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload?: () => void;
  canDownload?: boolean;
  variant?: PdfVariant;
}

export default function PengetahuanPendampingModal({
  isOpen,
  onClose,
  onDownload,
  canDownload = true,
  variant = "pengetahuan-pendamping",
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
        className="relative w-full max-w-[820px] max-h-[92vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{
          fontFamily: "'PP Neue Montreal', sans-serif",
          backgroundImage: "url('/pdf-preview-bg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-end px-5 py-4 sm:px-8">
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
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-gray-600 transition-colors hover:bg-white hover:text-gray-900"
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
        <div className="overflow-y-auto px-5 pb-8 sm:px-10 sm:pb-10">
          {variant === "pengetahuan-pendamping" ? (
            <PengetahuanContent />
          ) : (
            <PanduanContent />
          )}

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

function PengetahuanContent() {
  return (
    <>
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
    </>
  );
}

function PanduanContent() {
  return (
    <>
      <h1 className="text-[26px] font-extrabold leading-tight text-[#1F1F1F] sm:text-[34px]">
        PANDUAN PENGGUNAAN <span className="text-[#3197A5]">AUDIO STROVIA</span>
      </h1>

      <div className="mt-6 space-y-4 text-[14px] leading-[1.7] text-[#1F1F1F] sm:text-[15px]">
        <p>Ada 2 audio di Strovia, yaitu:</p>

        <h2 className="pt-2 text-[16px] font-bold text-[#1F1F1F] sm:text-[18px]">
          1. Audio Subliminal Pemulihan Stroke 528Hz
        </h2>

        <p>
          Adalah audio berisi sugesti yang dibuat subliminal (tersembunyi/tidak terdengar)
          yang di-set pada frekuensi 528Hz, sehingga saat didengarkan, yang terdengar hanya
          suara air mengalir, suara sugesti tidak terdengar. Dibuat demikian agar pikiran
          sadar kita tidak dapat mendengar isi sugesti sehingga tidak menimbulkan
          resistansi/penolakan di pikiran. Tetapi audio tersebut akan langsung diterima oleh
          pikiran bawah sadar untuk memicu kemampuan tubuh melakukan pemulihan mandiri pada
          seluruh dampak yang muncul pasca serangan stroke.
        </p>

        <p>
          Audio ini dapat didengarkan kapanpun dan dimanapun. Audio dapat Anda dengarkan
          sambil duduk relaks, berbaring, bahkan sambil melakukan berbagai aktifitas sehari
          hari, <strong>KECUALI</strong> saat mengendarai kendaraan apapun atau saat melakukan
          aktifitas apapun yang memerlukan kewaspadaan tinggi.
        </p>

        <p>
          <strong>DILARANG</strong> mendengarkan audio tersebut saat mengendarai kendaraan
          apapun atau saat melakukan aktifitas apapun yang memerlukan kewaspadaan tinggi,
          karena frekuensi 528Hz akan membuat otak/pikiran menjadi relaks dan bisa mengurangi
          kewaspadaan saat gelombang otak bervibrasi dari gelombang Beta (sadar penuh) menuju
          ke gelombang Alpha (<em>hypnotic state</em>) dan Theta (<em>deep sleep state</em>),
          dimana kesadaran dan kewaspadaan melemah, seperti saat Anda memasuki gerbang menuju
          tidur lelap tetapi masih setengah sadar atau saat baru mulai bangun tidur tapi
          belum sepenuhnya sadar.
        </p>

        <p>
          Saat Anda mendengarkan audio Strovia lalu jatuh tidur, audio tetap dapat
          didengarkan terus, tidak perlu dihentikan, karena pikiran bawah sadar kita tidak
          pernah tidur/istirahat, pikiran bawah sadar kita selalu aktif selama 24 jam penuh
          sehingga sugesti tetap dapat diterima oleh pikiran bawah sadar agar ia tetap
          melakukan tugasnya sesuai sugesti yang diberikan.
        </p>

        <h2 className="pt-2 text-[16px] font-bold text-[#1F1F1F] sm:text-[18px]">
          2. Audio Tuntunan Self Hypnosis Dan Relaksasi
        </h2>

        <p>
          Audio ini berisi tuntunan atau instruksi bagi Anda untuk melakukan hipnosis
          mandiri (<em>self hypnosis</em>) dan relaksasi. Teknik hipnosis mandiri ini juga
          penting dan dapat membantu/memicu kemampuan tubuh untuk melakukan pemulihan
          mandiri. Sehingga audio no. 1 dan no. 2 dapat didengarkan secara bergantian
          mengikuti dinamika situasi dan kondisi Anda.
        </p>

        <p>
          Untuk audio ke-2 ini agar efektif sangat disarankan Anda mendengarkannya saat
          sedang tidak melakukan aktifitas apapun, dengan mengambil posisi duduk bersandar
          dan relaks. Sebisa mungkin jangan berbaring/posisi tidur, kecuali kondisi fisik
          Anda mengharuskan Anda untuk tetap berbaring dalam posisi tidur. Tujuannya hanya
          untuk menjaga agar Anda tetap dalam kondisi sadar, tidak ketiduran dan dapat
          mendengarkan instruksi yang diberikan dengan jelas serta melakukannya dengan benar.
          Tapi tentunya audio tersebut tetap dapat didengarkan dengan posisi tubuh apapun
          dengan bebas, yang penting posisi tersebut dapat membuat Anda sangat relaks.
        </p>

        <p>
          Tapi bila Anda ternyata jatuh tidur, itu sama sekali tidak masalah, tidak akan
          menimbulkan dampak apapun, kecuali proses hipnosis yang otomatis terhenti saat Anda
          jatuh tidur. Dan Anda dapat mengulangnya kembali kapanpun Anda inginkan.
        </p>
      </div>
    </>
  );
}
