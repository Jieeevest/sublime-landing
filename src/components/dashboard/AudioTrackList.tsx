"use client";

import { useAudio } from "@/contexts/AudioContext";
import { AudioSession } from "@/data/audioSessions";
import { useGetMySubscriptionQuery } from "@/redux/api/sublimeApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n";
import { useState } from "react";
import toast from "react-hot-toast";
import LyricsOverlay from "@/components/audio/LyricsOverlay";
import PengetahuanPendampingModal from "@/components/dashboard/PengetahuanPendampingModal";

interface AudioTrackListProps {
  sessions: AudioSession[];
  title?: string;
}

export default function AudioTrackList({
  sessions,
  title,
}: AudioTrackListProps) {
  const { t } = useI18n();
  const router = useRouter();
  const { playTrack, currentTrack, isPlayerVisible } = useAudio();
  const { data: subscriptionData } = useGetMySubscriptionQuery(undefined);
  const isSubscribed = subscriptionData?.is_subscribed ?? false;
  const [lyricsTrack, setLyricsTrack] = useState<AudioSession | null>(null);
  const [previewPdf, setPreviewPdf] = useState<
    "pengetahuan-pendamping" | "panduan-penggunaan" | null
  >(null);
  const isAudioActive = isPlayerVisible && !!currentTrack;
  // Only mutually-exclusive scripts (subliminal) block audio playback while open.
  const isBlockingLyricsOpen =
    !!lyricsTrack &&
    /stroke|pemulihan|recovery/i.test(lyricsTrack.title ?? "");

  const hasLyrics = (session: AudioSession | undefined) => {
    const l = session?.lyrics;
    if (!l) return false;
    if (typeof l === "string") return l.trim() !== "";
    if (Array.isArray(l)) return l.some((line) => line.trim() !== "");
    return false;
  };

  const audioSlots: Array<{
    kind: "audio";
    displayTitle: string;
    session: AudioSession | undefined;
    scriptLinkLabel: string;
    blockScriptDuringPlayback: boolean;
  }> = [
    {
      kind: "audio",
      displayTitle: t("dash_audio_item_subliminal"),
      session: sessions.find((s) =>
        /stroke|pemulihan|recovery/i.test(s.title),
      ),
      scriptLinkLabel: t("dash_audio_script_link"),
      blockScriptDuringPlayback: true,
    },
    {
      kind: "audio",
      displayTitle: t("dash_audio_item_hypnosis"),
      session: sessions.find((s) => /ladang|awareness|field/i.test(s.title)),
      scriptLinkLabel: "",
      blockScriptDuringPlayback: false,
    },
  ];

  const pdfSlots: Array<{
    kind: "pdf";
    slug: "pengetahuan-pendamping" | "panduan-penggunaan";
    displayTitle: string;
    pdfUrl: string;
    pdfFileName: string;
  }> = [
    {
      kind: "pdf",
      slug: "pengetahuan-pendamping",
      displayTitle: t("dash_audio_item_knowledge"),
      pdfUrl: "/pdf/yang-perlu-anda-pahami-strovia.pdf",
      pdfFileName: "yang-perlu-anda-pahami-strovia.pdf",
    },
    {
      kind: "pdf",
      slug: "panduan-penggunaan",
      displayTitle: t("dash_audio_item_usage_guide"),
      pdfUrl: "/pdf/panduan-penggunaan-audio-strovia.pdf",
      pdfFileName: "panduan-penggunaan-audio-strovia.pdf",
    },
  ];

  const displayItems = [...audioSlots, ...pdfSlots];
  const navigateWithLoading = (path: string) => {
    window.dispatchEvent(new Event("app:navigation-start"));
    router.push(path);
  };

  return (
    <div
      className="flex flex-col gap-5 sm:gap-6"
      style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
    >
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
          <div className="rounded-xl border border-[#BFEAF3] bg-[#E6F7FB] px-4 py-3 sm:px-5 sm:py-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-6 w-6 items-center justify-center">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12a8 8 0 0 1 16 0v6a2 2 0 0 1-2 2h-1"
                    stroke="#18A9C7"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <rect
                    x="2"
                    y="11"
                    width="4"
                    height="7"
                    rx="1.5"
                    fill="#18A9C7"
                  />
                  <rect
                    x="18"
                    y="11"
                    width="4"
                    height="7"
                    rx="1.5"
                    fill="#18A9C7"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <p
                  className="text-[14px] font-semibold text-[#0B6D86] sm:text-[15px]"
                  style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
                >
                  {t("dash_audio_guide_title")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {displayItems.map((item, index) => {
          if (item.kind === "audio") {
            const session = item.session;
            const isPlaying = session ? currentTrack?.id === session.id : false;
            const canPlay = Boolean(session) && isSubscribed;
            const showLyricsLink = hasLyrics(session);
            const scriptBlocked =
              item.blockScriptDuringPlayback && isAudioActive;

            return (
              <div key={`audio-${index}`} className="flex flex-col">
              <div
                className={`group relative flex items-center gap-3 overflow-hidden rounded-lg px-3 py-3 transition-colors sm:gap-6 sm:px-6 ${
                  canPlay
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
                  onClick={() => {
                    if (!canPlay || !session) return;
                    if (isBlockingLyricsOpen) {
                      toast(t("dash_audio_block_play_when_script"), {
                        icon: "ℹ️",
                      });
                      return;
                    }
                    playTrack(session);
                  }}
                >
                  <Image
                    src="/audio-fallback.svg"
                    alt={item.displayTitle}
                    fill
                    className="object-cover"
                  />

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

                {/* Title */}
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                  <h3
                    className="truncate font-medium text-[#1F1F1F]"
                    style={{
                      fontFamily: "'PP Neue Montreal', sans-serif",
                      fontSize: "14px",
                      lineHeight: "22px",
                    }}
                  >
                    {item.displayTitle}
                  </h3>
                  {showLyricsLink && session && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (scriptBlocked) {
                          toast(t("dash_audio_block_script_when_playing"), {
                            icon: "ℹ️",
                          });
                          return;
                        }
                        setLyricsTrack(session);
                      }}
                      className={`self-start truncate text-left text-[12px] font-medium underline underline-offset-2 transition-colors ${
                        scriptBlocked
                          ? "cursor-not-allowed text-[#8E8E8E]"
                          : "text-[#0B6D86] hover:text-[#08748E]"
                      }`}
                      style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
                    >
                      {item.scriptLinkLabel}
                    </button>
                  )}
                </div>

                {/* Frequency */}
                <div
                  className="w-[473px] text-center text-[#8E8E8E] hidden md:block"
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
                  {session?.duration ?? "--:--"}
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
                {session && !isSubscribed && (
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
                        navigateWithLoading("/dashboard/subscriptions");
                      }}
                      className="px-5 py-2 bg-white text-[#1F1F1F] rounded-full text-xs font-semibold hover:bg-gray-100 transition-transform hover:scale-105 shadow-lg"
                      style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
                    >
                      {t("dash_audio_sub_btn")}
                    </button>
                  </div>
                )}
              </div>
              </div>
            );
          }

          // PDF item
          return (
            <div
              key={`pdf-${index}`}
              onClick={() => setPreviewPdf(item.slug)}
              className="group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-lg px-3 py-3 transition-colors hover:bg-white/50 sm:gap-6 sm:px-6"
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

              {/* PDF Thumbnail */}
              <div className="w-[44px] h-[44px] rounded-[8px] overflow-hidden flex-shrink-0 relative flex items-center justify-center bg-gradient-to-br from-[#BFEAF3] to-[#7CC9DB]">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 3h11l6 6v17a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z"
                    fill="#FFFFFF"
                    stroke="#DC2626"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 3v6h6"
                    fill="#FEE2E2"
                    stroke="#DC2626"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="7"
                    y="17"
                    width="18"
                    height="8"
                    rx="1.5"
                    fill="#DC2626"
                  />
                  <text
                    x="16"
                    y="23.5"
                    textAnchor="middle"
                    fontSize="6"
                    fontWeight="700"
                    fill="#FFFFFF"
                    fontFamily="Arial, sans-serif"
                    letterSpacing="0.3"
                  >
                    PDF
                  </text>
                </svg>
              </div>

              {/* Title */}
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                <h3
                  className="truncate font-medium text-[#1F1F1F]"
                  style={{
                    fontFamily: "'PP Neue Montreal', sans-serif",
                    fontSize: "14px",
                    lineHeight: "22px",
                  }}
                >
                  {item.displayTitle}
                </h3>
              </div>

              {/* Type Label */}
              <div
                className="w-[473px] text-center text-[#8E8E8E] hidden md:block"
                style={{
                  fontFamily: "'PP Neue Montreal', sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "28px",
                }}
              >
                {t("dash_audio_pdf_label")}
              </div>

              {/* Download Button */}
              {isSubscribed ? (
                <a
                  href={item.pdfUrl}
                  download={item.pdfFileName}
                  onClick={(e) => e.stopPropagation()}
                  className="ml-2 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-primary-600 sm:ml-0 sm:px-4 sm:py-2 sm:text-[13px]"
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
                      d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {t("dash_audio_guide_download")}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateWithLoading("/dashboard/subscriptions");
                  }}
                  className="ml-2 inline-flex items-center gap-2 rounded-full bg-gray-200 px-3 py-1.5 text-[12px] font-medium text-[#8E8E8E] transition-colors hover:bg-gray-300 sm:ml-0 sm:px-4 sm:py-2 sm:text-[13px]"
                  style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  {t("dash_audio_guide_download")}
                </button>
              )}

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
                      navigateWithLoading("/dashboard/subscriptions");
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
        })}
      </div>
      {lyricsTrack && (
        <LyricsOverlay
          track={lyricsTrack}
          onClose={() => setLyricsTrack(null)}
        />
      )}
      <PengetahuanPendampingModal
        isOpen={previewPdf !== null}
        variant={previewPdf ?? "pengetahuan-pendamping"}
        onClose={() => setPreviewPdf(null)}
        canDownload={isSubscribed}
        onDownload={() => {
          const slot = pdfSlots.find((s) => s.slug === previewPdf);
          if (!slot) return;
          const link = document.createElement("a");
          link.href = slot.pdfUrl;
          link.download = slot.pdfFileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
      />
    </div>
  );
}
