"use client";

import { useAudio } from "@/contexts/AudioContext";
import { AudioSession } from "@/data/audioSessions";
import { useGetMySubscriptionQuery } from "@/redux/api/sublimeApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n";
import { useEffect, useRef, useState } from "react";

interface AudioTrackListProps {
  sessions: AudioSession[];
  title?: string;
}

const GUIDE_TEXT = `Beberapa hal yang perlu Anda ketahui dan sadari saat memulai perjalanan pemulihan mandiri Anda 
dari akibat derita stroke yang Anda alami. Kedua Audio Strovia tidak dapat menyembuhkan Anda dari 
akibat serangan stroke, tapi diri Anda sendiri yang akan menyembuhkan dirinya sendiri. Dan Audio 
Strovia akan membantu memicu dan membangkitkan kemampuan tubuh Anda untuk memulihkan dirinya 
sendiri dari segala akibat serangan stroke. Juga penting untuk Anda ketahui bahwa Audio Strovia tidak 
dimaksudkan dan tidak bertujuan menggantikan proses pemulihan maupun pengobatan medis dalam 
bentuk apapun yang sedang Anda jalani. Tapi keduanya dapat jalan berdampingan dan saling 
mendukung sehingga dapat mempercepat proses pemulihan Anda.
 Seperti yang dikatakan serta dibuktikan oleh salah satu hypnotherapist terkenal, Dolores Canon, 
bahwa tubuh kita adalah mesin yang ajaib yang dapat menyembuhkan dirinya sendiri dan seharusnya 
Anda tidak akan pernah mengalami sakit.
Tapi kenapa kemudian kita bisa sakit ?
Sejauh yang saya ketahui berdasarkan pembelajaran dan pengalaman saya sepanjang hidup, semua sakit 
yang kita alami, sebelum bermanifestasi pada tubuh fisik, penyakit tersebut dipicu oleh terjadinya 
ketidakseimbangan aliran energi pada tubuh. Penyebab utama ketidakseimbangan aliran energi tersebut 
adalah karena sumbatan-sumbatan energi yang tidak sadar kita ciptakan sendiri. Umumnya sumbatan￾sumbatan energi negatif ini terjadi karena saat momen energi ini seharusnya mengalir melewati diri kita, 
tanpa sadar kita memblokir dan menekannya kembali ke dalam tubuh. Ini terjadi karena kita tidak 
sanggup memprosesnya secara menyeluruh, hal ini umumnya terjadi saat kita mengalami momen￾momen di sepanjang hidup kita yang kita persepsi sebagai pengalaman buruk (negatif) bahkan traumatis. 
Emosi-emosi negatif seperti kemarahan, sakit hati, kecewa, takut, cemas dll yang kita rasakan saat 
momen penyebab emosi itu berlangsung tidak kita hadapi sepenuhnya sampai selesai, kita cenderung 
"melarikan diri" dari situasi tersebut, sehingga emosi-emosi negatif itu secara tidak sadar kita hindari, 
kita tekan atau kita alihkan. Dan ketidak mampuan kita memproses emosi-emosi negatif tersebut 
menyebabkan energi dari emosi-emosi negatif tersebut tidak bisa mengalir melalui tubuh kita tapi 
tertahan dan terus berputar di tempatnya dan menyebabkan terjadinya sumbatan-sumbatan energi , kita 
juga dapat menyebutnya sebagai sumbatan batin. Dimana tumpukan sumbatan-sumbatan batin (energi) 
tersebut lama-lama terus bertambah hingga akhirnya mengganggu aliran energi dalam tubuh dan 
bermanifestasi menjadi berbagai penyakit fisik yang kita alami. Baik itu berupa sakit asam lambung, 
jantung, darah tinggi, kolestrol, stroke dll.
 Banyak cara untuk melepaskan sumbatan-sumbatan batin tersebut, dengan menjadi sepenuhnya 
sadar, menjalani hidup dengan penuh kesadaran (mindfullness) kita dapat mentransmusi energi-energi 
negatif atau sumbatan-sumbatan batin tersebut menjadi energi positif yang lebih tinggi, yang pada 
akhirnya kita juga dapat kita mempergunakan energi-energi positif yang lebih tinggi tersebut untuk
mewujudkan apapun yang kita inginkan di dalam hidup. Tapi untuk mencapai tingkat kesadaran 
demikian, seseorang harus belajar untuk menjadi sadar (aware) sepanjang waktu, tanpa pernah 
meninggalkan singgasana Sang Diri. 
1/3
Karena satu-satunya realitas adalah kesadaran itu sendiri. Tapi disini saya tidak akan membahas hal 
tersebut lebih jauh dan mendalam. Apabila Anda ingin memahami apa yang saya tulis diatas dengan
lebih mendalam, saya akan informasikan buku-buku yang dapat Anda peroleh sebagai bahan 
pembelajaran pada halaman artikel. 
Yaitu buku-buku seperti tulisan Michael Singer, David R Hawkins, Neviile Goddard, Bruce H Lipton, Greg 
Bradden, Eckhart Tolle dll. Anda dapat mempelajarinya semuanya sendiri lalu mempraktekannya sendiri 
juga. Anda sama sekali tidak memerlukan bantuan siapa-siapa, Anda juga tidak perlu bantuan guru-guru 
(spritual) manapun, satu-satunya yang Anda perlukan hanyalah diri Anda sendiri, untuk mempelajari dan 
menjalani apa yang sudah Anda pelajari. Karena apapun yang Anda butuhkan untuk dapat menjalani 
hidup yang bahagia, sehat, berkelimpahan, damai, penuh welas asih, semuanya sudah tersedia didalam 
diri Anda sendiri, komplit, Anda hanya perlu menemukan atau menyadarinya, lalu kemudian me-utilisasi 
kemampuan tersebut untuk kebaikan Anda sendiri dan semua kehidupan yang dapat Anda jangkau.
 Saat ini, lewat 2 Audio Strovia saya ingin berbagi pengalaman pemulihan mandiri yang dapat Anda 
dan semua orang alami.
Audio Strovia terbagi menjadi 2 audio, audio subliminal (tersembunyi ) yang di set pada frekuensi 528Hz 
dan audio penghantar relaksasi berjudul "Ladang Kesadaran". Kedua audio dapat Anda dengarkan 
secara bergantian, kapan saja dan dimana saja, sesering yang Anda inginkan.
Audio subliminal Strovia berisi afirmasi-afirmasi positif yang akan memicu atau membangkitkan
kemampuan pemulihan mandiri tubuh Anda. Audio tersebut dibuat subliminal (tersembunyi) agar 
afirmasi-afirmasi dari audio tersebut tidak langsung kita dengar sehingga tidak terjadi penolakan oleh 
pikiran sadar (conscious mind) kita, tapi bisa langsung ditangkap oleh pikiran bawah sadar kita 
(unconscious mind atau subconscious mind).
Kedua audio tersebut di set pada frekuensi 528Hz yaitu prekuensi yang dapat mempengaruhi 
gelombang otak kita agar kita dapat masuk dan mengalami relaksasi mendalam dan holistik.
Apabila saat mendengarkan audio tersebuk Anda akhirnya jatuh tidur, hal tersebut tidak apa-apa dan 
efek yang di picu oleh kedua audiotersebut tetap akan berjalan.
 Hal terpenting yang perlu Anda ketahui dan sadari adalah saat proses pemulihan mandiri Anda mulai 
berproses, sangat besar kemungkinan semua emosi-emosi negatif penyebab sumbatan-sumbatan batin 
yang selama ini Anda tekan dan bertumpuk-tumpuk akan muncul kembali. Mungkin Anda akan 
mengalami dan merasakan emosi-emosi tersebut berupa rasa takut, marah, sakit hati, kecewa, cemas dll. 
Ini adalah hal baik dan menguntungkan Anda, karena ini adalah saat yang tepat untuk memproses 
kembali energi-energi yang dulu tidak pernah Anda selesaikan prosesnya, apa pun kejadian 
penyebabnya. Apakah kejadian tersebut adalah tragedi perceraian, Anda kehilangan orang yang Anda 
cintai, Anda ditinggal pacar, Anda ditipu sahabat Anda, bahkan tragedi pemerkosaan dll. Sebenarnya 
semua peristiwa yang kita alami sepanjang hidup adalah ciptaan kita sendiri yang kita hadirkan sendiri
untuk alasan tertentu, akibat ketidaktahuan, kita punya kecenderungan untuk meng-kambing hitamkan 
kondisi eksternal di luar diri kita atas kejadian tersebut, padahal orang-orang maupun situasi yang terlibat 
dalam kejadian tersebut hanyalah pemeran pembantu yang kita butuhkan untuk menciptakan peristiwa 
tersebut, dan kita lah aktor sesungguhnya.
2/3
Tetapi saat ini, dengan tingkat kesadaran yang kita miliki, kita tidak mengerti kenapa kejadian itu harus 
kita alami dan saya berharap bahwa pada saatnya nanti, Anda dapat mencapai tingkat kesadaran yang 
lebih tinggi dan akhirmya Anda dapat memahami semuanya.
 Yang perlu Anda lakukan saat emosi-emosi negatif atau sumbatan-sumbatan batin tersebut muncul 
adalah Anda relaks dan berusaha untuk sadar, sadari siapa yang merasakan emosi-emosi tersebut. 
Karena emosi negatif tidak dapat berdiri sendiri, tetapi Anda lah Sang Kesadaran yang menyadari dan 
merasakan kehadiran emosi-emosi tersebut. Emosi-emosi tersebut BUKANLAH diri Anda, kesadaran 
Anda lah yang menyadari dan merasakan emosi-emosi tersebut. Semua emosi, apapun itu hanyalah 
obyek, sama seperti benda-benda lain di luar diri kita , semua itu adalah obyek. Dan diri Andalah 
SUBYEKnya, Sang Kesadaran.
Selama emosi-emosi negatif tersebut muncul dan Anda rasakan, Anda harus relaks, tetap berusaha 
bertahan dalam kesadaran Anda dan tanpa putus amati (observe) serta rasakan emosi-emosi tersebut 
sampai selesai. Emosi-emosi tersebut akan muncul disertai rasa sakit, karena itu dulu Anda berusaha 
menghindari dan menekannya, kali ini Anda harus bertekad kuat untuk dapat menghadapi emosi-emosi 
tersebut berikut rasa sakitnya, biarkan dia hadir dan mengalir hingga selesai, Anda harus tetap relaks dan 
bertahan dalam kesadaran sepanjang emosi tersebut bergejolak dalam diri Anda. Kemunculan emosiemosi tersebut bisa jadi disertai oleh simptom fisik seperti mungkin rasa sesak di dada, perih di lambung, 
mual, terasa panas di beberapa bagian tubuh dll, simptom yang kita rsakan di tubuh bisa bermacammacam bentuknya. Apapun yang Anda rasakan, kuncinya hanya lah tetap relaks, bukan berusaha 
membuat emosi-emosi itu relaks, tapi Anda yang relaks sambil mengamati (merasakan) seluruh emosiemosi tersebut dan tetap bertahan di Singgasana Sang Diri yaitu KESADARAN itu sendiri. Dimana Anda 
menyadari bahwa Anda sadar.
 Salah satu cara mudah untuk mengetahui bagaimana kita tahu bahwa kita sadar atau berada di pusat 
kesadaran (Singgasana Sang Diri) adalah dengan mengatakan dalam hati kata "halo.... halo.... halo" 
berkali kali, atau bisa juga kata "saat ini-disini", apabila Anda dapat mendengar (menyadari) "suara" 
yang Anda ucapkan dalam hati tersebut, berarti kesadaran Anda terpusat, Anda berada di singgasana 
Sang Diri, Anda berada di pusat kesadaran. Semakin lama Anda bisa bertahan di singgasana Sang Diri 
(Kesadaran) semakin baik. Anda dapat berlatih untuk selalu menjadi sadar dan semakin sadar.
 Harapan saya, saat akhirnya Anda dapat merasakan pemulihan mandiri terbangkitkan dalam diri Anda, 
dimana Anda mulai merasakan terjadinya perbaikan perbaikan dalam tubuh fisik Anda, hal tersebut juga 
berjalan beriringan dengan terbangkitkannya kesadaran Anda ke level yang lebih tinggi, lebih tinggi lagi, 
lebih tinggi lagi dan seterusnya, hingga Anda mencapai tingkat kesadaran yang menjawab pertanyaan 
dasar di sepanjang sejarah eksistensi manusia dan kehidupan yaitu pertanyaan "SIAPAKAH AKU ?" 
( Who Am I ? ).
Terima kasih dan selamat memulai perjalanan kebangkitan diri Anda.`;
const GUIDE_TEXT_EN = `Here are important points to understand before starting your self-recovery journey with Strovia Audio.
Strovia audio does not replace medical treatment. Your body has an amazing capacity to recover, and Strovia is designed to support that natural process.

Many physical conditions are closely related to unresolved emotional tension. Negative emotions such as fear, anger, hurt, and anxiety can accumulate over time and disrupt internal balance.
With awareness and relaxation, these emotional blocks can be processed and released gradually.

Strovia provides two audio experiences: a 528Hz subliminal audio and a relaxation guidance audio.
You can listen anytime, as often as needed. If you fall asleep during playback, that is okay and the process may still continue.

When recovery starts, old emotions may resurface. This is often part of a healthy release process.
Observe what you feel, stay relaxed, and allow the emotions to move through you without suppression.

Keep returning to awareness. Stay present, breathe calmly, and witness the emotions as passing objects.
The more stable your awareness, the better your body and mind can cooperate in recovery.

May this journey help you heal physically and grow in consciousness.
Thank you, and welcome to your self-awakening journey.`;
const GUIDE_PDF_FILE_NAME = "PANDUAN YANG PERLU ANDA KETAHUI DAN SADARI.pdf";

export default function AudioTrackList({
  sessions,
  title,
}: AudioTrackListProps) {
  const { t, lang } = useI18n();
  const router = useRouter();
  const { playTrack, currentTrack } = useAudio();
  const { data: subscriptionData } = useGetMySubscriptionQuery(undefined);
  const isSubscribed = subscriptionData?.is_subscribed ?? false;
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isGuideModalMounted, setIsGuideModalMounted] = useState(false);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const [hasReadGuide, setHasReadGuide] = useState(false);
  const guideContentRef = useRef<HTMLDivElement>(null);
  const guideParagraphs = (lang === "en" ? GUIDE_TEXT_EN : GUIDE_TEXT)
    .split(/\n\s*\n+/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);

  const handleDownloadGuide = () => {
    const guideFileUrl = `/${encodeURIComponent(GUIDE_PDF_FILE_NAME)}`;
    const anchor = document.createElement("a");
    anchor.href = guideFileUrl;
    anchor.download = GUIDE_PDF_FILE_NAME;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleGuideScroll = () => {
    const element = guideContentRef.current;
    if (!element) return;

    const reachedBottom =
      element.scrollTop + element.clientHeight >= element.scrollHeight - 8;
    if (reachedBottom) {
      setHasReachedBottom(true);
    }
  };

  const openGuideModal = () => {
    setIsGuideModalMounted(true);
    requestAnimationFrame(() => {
      setIsGuideModalOpen(true);
    });
  };

  const closeGuideModal = () => {
    setIsGuideModalOpen(false);
  };

  useEffect(() => {
    if (!isGuideModalOpen) return;

    setHasReachedBottom(false);
    setHasReadGuide(false);
    const currentOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = currentOverflow;
    };
  }, [isGuideModalOpen]);

  useEffect(() => {
    if (isGuideModalOpen || !isGuideModalMounted) return;

    const timer = window.setTimeout(() => {
      setIsGuideModalMounted(false);
    }, 220);

    return () => window.clearTimeout(timer);
  }, [isGuideModalOpen, isGuideModalMounted]);

  return (
    <>
      <div className="flex flex-col gap-5 sm:gap-6">
      {/* Header */}
      <div className="flex h-[36px] items-center sm:h-[40px]">
        <h2
          className="text-[20px] font-medium leading-7 text-[#1F1F1F] sm:text-[24px] sm:leading-8"
          style={{
            fontFamily: "'PP Neue Montreal', sans-serif",
          }}
        >
          {title || t("dash_audio_title")}
        </h2>
      </div>

      {/* Content List */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="py-2 sm:py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p
              className="pr-3 text-[14px] font-normal leading-[22px] text-[#1F1F1F] sm:text-[16px] sm:leading-[28px]"
              style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
            >
              <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#1F1F1F] bg-transparent text-[12px] font-semibold text-[#1F1F1F]">
                !
              </span>
              {t("dash_audio_guide_label")}
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                aria-label={t("dash_audio_guide_view")}
                onClick={openGuideModal}
                className="inline-flex items-center gap-2 rounded-full border border-[#E8E8E8] bg-white px-3 py-2 text-[13px] font-medium text-[#1F1F1F] transition-colors hover:bg-[#F7F7F7]"
                style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 12C3.8 7.5 7.2 5 12 5C16.8 5 20.2 7.5 22 12C20.2 16.5 16.8 19 12 19C7.2 19 3.8 16.5 2 12Z"
                    stroke="#1F1F1F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="3" stroke="#1F1F1F" strokeWidth="1.5" />
                </svg>
                <span>{t("dash_audio_guide_view")}</span>
              </button>
              <button
                type="button"
                aria-label={t("dash_audio_guide_download")}
                onClick={handleDownloadGuide}
                className="inline-flex items-center gap-2 rounded-full border border-[#E8E8E8] bg-white px-3 py-2 text-[13px] font-medium text-[#1F1F1F] transition-colors hover:bg-[#F7F7F7]"
                style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3V14"
                    stroke="#1F1F1F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 10L12 14L16 10"
                    stroke="#1F1F1F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 19H19"
                    stroke="#1F1F1F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span>{t("dash_audio_guide_download")}</span>
              </button>
            </div>
          </div>
        </div>

        {sessions.length > 0 ? (
          sessions.slice(0, 3).map((session, index) => {
            const isPlaying = currentTrack?.id === session.id;

            return (
              <div
                key={session.id}
                className={`group relative flex items-center gap-3 overflow-hidden rounded-lg px-3 py-3 transition-colors sm:gap-6 sm:px-6 ${
                  isSubscribed
                    ? "cursor-pointer hover:bg-white/50"
                    : "cursor-default hover:bg-gray-50/50"
                }`}
              >
                {/* Track Number */}
                <div
                  className="hidden h-[32px] w-[32px] items-center justify-center text-center font-normal text-[#1F1F1F] sm:flex"
                  style={{
                    fontFamily: "'PP Neue Montreal', sans-serif",
                    fontSize: "16px",
                    lineHeight: "28px",
                  }}
                >
                  {index + 1}
                </div>

                {/* Thumbnail */}
                <div
                  className="w-[44px] h-[44px] rounded-[8px] overflow-hidden flex-shrink-0 relative group-hover:scale-105 transition-transform"
                  onClick={() => isSubscribed && playTrack(session)}
                >
                  {/* Image Placeholder / Gradient */}
                  <Image
                    src="/audio-fallback.svg"
                    alt={session.title}
                    fill
                    className="object-cover"
                  />

                  {/* Play/Pause Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10">
                    {isPlaying ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                  <h3
                    className="truncate font-medium text-[#1F1F1F]"
                    style={{
                      fontFamily: "'PP Neue Montreal', sans-serif",
                      fontSize: "14px",
                      lineHeight: "22px",
                    }}
                  >
                    {session.title}
                  </h3>
                  <p
                    className="hidden text-[#8E8E8E]"
                    style={{
                      fontFamily: "'PP Neue Montreal', sans-serif",
                      fontSize: "12px",
                      lineHeight: "150%",
                    }}
                  >
                    {session.subtitle}
                  </p>
                </div>

                {/* Frequency - Centered */}
                <div
                  className="w-[473px] text-center text-[#8E8E8E] hidden md:block" // Adjusted width/visibility based on layout
                  style={{
                    fontFamily: "'PP Neue Montreal', sans-serif",
                    fontWeight: 400,
                    fontSize: "16px",
                    lineHeight: "28px",
                  }}
                >
                  528Hz
                </div>

                {/* Duration */}
                <div
                  className="ml-2 w-auto text-right text-sm font-normal text-[#1F1F1F] sm:ml-0 sm:w-[33px] sm:text-base"
                  style={{
                    fontFamily: "'PP Neue Montreal', sans-serif",
                  }}
                >
                  {session.duration}
                </div>

                {/* Menu Button (Ghost) */}
                <button className="hidden h-[44px] w-[44px] items-center justify-center rounded-full bg-transparent opacity-0 transition-all hover:bg-gray-100 group-hover:opacity-100 sm:flex">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="10" cy="10" r="2" fill="#8E8E8E" />
                    <circle cx="4" cy="10" r="2" fill="#8E8E8E" />
                    <circle cx="16" cy="10" r="2" fill="#8E8E8E" />
                  </svg>
                </button>

                {/* Subscription Overlay */}
                {!isSubscribed && (
                  <div className="absolute inset-0 z-50 hidden flex-row items-center justify-center gap-6 bg-[#0F0F0F]/30 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100 md:flex">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-white/20 rounded-full backdrop-blur-md">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                      <p
                        className="text-white text-sm font-medium tracking-wide"
                        style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
                      >
                        {t("dash_audio_sub_msg")}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/dashboard/subscriptions");
                      }}
                      className="px-5 py-2 bg-white text-[#1F1F1F] rounded-full text-xs font-semibold hover:bg-gray-100 transition-transform hover:scale-105 shadow-lg"
                      style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
                    >
                      {t("dash_audio_sub_btn")}
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 text-[#8E8E8E] bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
            <p className="text-lg font-medium">{t("dash_audio_empty_title")}</p>
            <p className="text-sm mt-1">{t("dash_audio_empty_desc")}</p>
          </div>
        )}

      </div>
      </div>

      {isGuideModalMounted && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-200 ${
            isGuideModalOpen ? "bg-black/50 opacity-100" : "bg-black/0 opacity-0"
          }`}
          onClick={closeGuideModal}
        >
          <div
            className={`flex w-full max-w-[760px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-200 ease-out ${
              isGuideModalOpen
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-2 scale-[0.98] opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#EFEFEF] px-5 py-4 sm:px-6">
              <h3
                className="text-[18px] font-medium leading-7 text-[#1F1F1F] sm:text-[20px]"
                style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
              >
                {t("dash_audio_guide_modal_title")}
              </h3>
              <button
                type="button"
                aria-label="Tutup panduan"
                onClick={closeGuideModal}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#8E8E8E] transition-colors hover:bg-[#F5F5F5] hover:text-[#1F1F1F]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div
              ref={guideContentRef}
              onScroll={handleGuideScroll}
              className="max-h-[56vh] overflow-y-auto px-5 py-5 sm:px-6 sm:py-6"
            >
              <div className="space-y-4">
                {guideParagraphs.map((paragraph, index) => (
                  <p
                    key={`guide-paragraph-${index}`}
                    className="text-justify text-[14px] leading-[24px] text-[#4A4A4A] sm:text-[15px]"
                    style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="border-t border-[#EFEFEF] px-5 py-4 sm:px-6">
              <div className="flex items-center justify-between gap-3">
                <label
                  className={`flex items-center gap-3 text-[14px] leading-6 text-[#1F1F1F] ${
                    hasReachedBottom ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                  style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
                >
                  <input
                    type="checkbox"
                    checked={hasReadGuide}
                    disabled={!hasReachedBottom}
                    onChange={(e) => setHasReadGuide(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 accent-primary focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                  {t("dash_audio_guide_checkbox")}
                </label>
                <button
                  type="button"
                  onClick={closeGuideModal}
                  disabled={!hasReadGuide}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-[#D1D5DB] disabled:text-[#6B7280]"
                  style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {t("dash_audio_guide_continue")}
                </button>
              </div>
              <p
                className="mt-2 text-[12px] leading-5 text-[#8E8E8E]"
                style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
              >
                {t("dash_audio_guide_scroll_hint")}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
