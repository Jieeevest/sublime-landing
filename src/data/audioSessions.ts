export interface AudioSession {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  duration: string; // display format like "2:12"
  durationSeconds?: number; // in seconds
  category: string;
  imageUrl: string;
  audioUrl: string;
}

export const audioSessions: AudioSession[] = [
  {
    id: "1",
    title: "Stroke Recovery Calm Indonesian Version",
    subtitle:
      "My mind is healing. My body remembers how to recover. I am becoming stronger every day.",
    description: "My body restores itself gently. I honor my healing pace.",
    duration: "2:12",
    durationSeconds: 132,
    category: "Stroke Recovery",
    imageUrl: "/audio-session-1.jpg",
    audioUrl: "/audio/fallback.mp3",
  },
  {
    id: "2",
    title: "Stroke Recovery Calm English Version",
    subtitle:
      "My mind is healing. My body remembers how to recover. I am becoming stronger every day.",
    description:
      "Drift into restorative sleep with gentle healing frequencies.",
    duration: "2:12",
    durationSeconds: 132,
    category: "Stroke Recovery",
    imageUrl: "/audio-session-2.jpg",
    audioUrl: "/audio/fallback.mp3",
  },
  {
    id: "3",
    title: "Stroke Recovery Calm Indonesian Version",
    subtitle:
      "My mind is healing. My body remembers how to recover. I am becoming stronger every day.",
    description:
      "Calm your mind and release tension with soothing affirmations.",
    duration: "2:12",
    durationSeconds: 132,
    category: "Anxiety",
    imageUrl: "/audio-session-3.jpg",
    audioUrl: "/audio/fallback.mp3",
  },
  {
    id: "4",
    title: "Morning Meditation",
    subtitle: "Start your day with clarity and positive energy",
    description: "Start your day with clarity, focus, and positive energy.",
    duration: "15:00",
    durationSeconds: 900,
    category: "Meditation",
    imageUrl: "/audio-session-4.jpg",
    audioUrl: "/audio/fallback.mp3",
  },
  {
    id: "5",
    title: "Pain Management Therapy",
    subtitle: "Gentle guidance to help manage chronic pain",
    description: "Gentle guidance to help manage chronic pain and discomfort.",
    duration: "25:00",
    durationSeconds: 1500,
    category: "Pain Relief",
    imageUrl: "/audio-session-5.jpg",
    audioUrl: "/audio/fallback.mp3",
  },
  {
    id: "6",
    title: "Stress Release 528Hz",
    subtitle: "Release daily stress with healing frequencies",
    description: "Release daily stress with healing Solfeggio frequencies.",
    duration: "30:00",
    durationSeconds: 1800,
    category: "Stress Relief",
    imageUrl: "/audio-session-6.jpg",
    audioUrl: "/audio/fallback.mp3",
  },
  {
    id: "7",
    title: "Emotional Balance",
    subtitle: "Find inner peace and emotional stability",
    description:
      "Find inner peace and emotional stability through guided therapy.",
    duration: "35:00",
    durationSeconds: 2100,
    category: "Emotional Healing",
    imageUrl: "/audio-session-7.jpg",
    audioUrl: "/audio/fallback.mp3",
  },
  {
    id: "8",
    title: "Focus & Concentration",
    subtitle: "Enhance mental clarity and improve concentration",
    description: "Enhance mental clarity and improve concentration.",
    duration: "20:00",
    durationSeconds: 1200,
    category: "Focus",
    imageUrl: "/audio-session-8.jpg",
    audioUrl: "/audio/fallback.mp3",
  },
];

export const categories = [
  "All",
  "Stroke Recovery",
  "Sleep",
  "Anxiety",
  "Meditation",
  "Pain Relief",
  "Stress Relief",
  "Emotional Healing",
  "Focus",
];
