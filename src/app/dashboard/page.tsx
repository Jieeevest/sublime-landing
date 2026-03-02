"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AudioTrackList from "@/components/dashboard/AudioTrackList";
import DashboardHero from "@/components/dashboard/DashboardHero";
import DashboardPromoCards from "@/components/dashboard/DashboardPromoCards";
import DashboardArticles from "@/components/dashboard/DashboardArticles";
import { AudioSession } from "@/data/audioSessions";
import { useState, useEffect } from "react";
import {
  useGetAudiosQuery,
  useGetPublicContentsQuery,
  useGetMySubscriptionQuery,
} from "@/redux/api/sublimeApi";

/**
 * DashboardPage component.
 * Acts as the main container for the user dashboard.
 * Fetches data for audio sessions and articles, and passes it to child components.
 */
export default function DashboardPage() {
  // Fetch audio sessions data
  const { data: audioData, isLoading: isLoadingAudios } = useGetAudiosQuery({});

  // Fetch articles data
  const { data: articlesData, isLoading: isLoadingArticles } =
    useGetPublicContentsQuery({ type: "article", limit: 3 });

  // Fetch subscription status
  const { data: subscriptionData, isLoading: isLoadingSub } =
    useGetMySubscriptionQuery(undefined);
  const isSubscribed = subscriptionData?.is_subscribed ?? false;

  // Global loading state with a minimum 500ms delay to prevent flickering
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const isAnyLoading = isLoadingAudios || isLoadingArticles || isLoadingSub;

    if (isAnyLoading) {
      setIsGlobalLoading(true);
      setShowContent(false);
    } else {
      // Enforce a minimum safety delay before showing content
      const timer = setTimeout(() => {
        setIsGlobalLoading(false);
        setShowContent(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoadingAudios, isLoadingArticles, isLoadingSub]);

  // Use real data or fallback to empty array
  // API returns { success: true, data: [...] }
  const rawSessions = audioData?.data || [];
  const articles = articlesData?.data || [];

  /**
   * Helper function to format duration seconds to MM:SS string.
   * @param seconds - Duration in seconds.
   * @returns Formatted time string (e.g., "5:30").
   */
  const formatDuration = (seconds: number) => {
    if (!seconds) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  /**
   * Map raw API response data to AudioSession interface.
   * This transformation ensures the data matches what the UI components expect.
   */
  const sessions: AudioSession[] = rawSessions.map((item: any) => ({
    id: item.id,
    title: item.title,
    subtitle: item.description, // Mapping description -> subtitle as requested
    description: item.description,
    duration: formatDuration(item.duration_seconds),
    durationSeconds: item.duration_seconds,
    category: item.category?.name || "General",
    imageUrl: item.thumbnail_url || "/default-audio.jpg", // Fallback image
    audioUrl: item.audio_url
      ? item.audio_url.replace(
          /https?:\/\/72\.61\.215\.67(:\d+)?/,
          "https://strovia.app",
        )
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/audios/stream/${item.id}`,
    lyrics: item.lyrics,
  }));

  return (
    <DashboardLayout activeItem="Home">
      <div className="px-10 pb-6 max-w-[1267px] mx-auto space-y-10">
        <DashboardHero />

        <div className="min-h-[200px]">
          {isLoadingAudios ? (
            <div className="text-center py-10 flex flex-col items-center justify-center h-full text-gray-400">
              <svg
                className="animate-spin h-8 w-8 mb-4 text-[#3197A5]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Memuat daftar audio...
            </div>
          ) : (
            <AudioTrackList sessions={sessions.length > 0 ? sessions : []} />
          )}
        </div>

        {/* 
          Using conditional rendering without a wrapping div when empty 
          to prevent tailwind's space-y-10 from adding a margin to a hidden node.
        */}
        {!isSubscribed ? (
          <div className="min-h-[148px] transition-all duration-300">
            <DashboardPromoCards />
          </div>
        ) : null}

        <div className="min-h-[300px]">
          <DashboardArticles
            articles={articles}
            isLoading={isLoadingArticles}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
