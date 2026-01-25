"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AudioTrackList from "@/components/dashboard/AudioTrackList";
import DashboardHero from "@/components/dashboard/DashboardHero";
import DashboardPromoCards from "@/components/dashboard/DashboardPromoCards";
import DashboardArticles from "@/components/dashboard/DashboardArticles";
import { AudioSession } from "@/data/audioSessions";
import {
  useGetAudiosQuery,
  useGetPublicContentsQuery,
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
    audioUrl: item.audio_url,
  }));

  return (
    <DashboardLayout activeItem="Home">
      <div className="px-10 pb-6 max-w-[1267px] mx-auto space-y-10">
        <DashboardHero />

        {isLoadingAudios ? (
          <div className="text-center py-10">Loading tracks...</div>
        ) : (
          <AudioTrackList sessions={sessions.length > 0 ? sessions : []} />
        )}

        <DashboardPromoCards />

        <DashboardArticles articles={articles} isLoading={isLoadingArticles} />
      </div>
    </DashboardLayout>
  );
}
