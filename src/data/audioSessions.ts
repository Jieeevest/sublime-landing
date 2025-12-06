export interface AudioSession {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  category: string;
  imageUrl: string;
  audioUrl: string;
}

export const audioSessions: AudioSession[] = [
  {
    id: "1",
    title: "Stroke Recovery Calm 432Hz",
    description: "My body restores itself gently. I honor my healing pace.",
    duration: 1800, // 30 minutes
    category: "Stroke Recovery",
    imageUrl: "/audio-session-1.jpg",
    audioUrl: "/audio/stroke-recovery-calm.mp3",
  },
  {
    id: "2",
    title: "Deep Sleep Healing",
    description:
      "Drift into restorative sleep with gentle healing frequencies.",
    duration: 2400, // 40 minutes
    category: "Sleep",
    imageUrl: "/audio-session-2.jpg",
    audioUrl: "/audio/deep-sleep-healing.mp3",
  },
  {
    id: "3",
    title: "Anxiety Relief Session",
    description:
      "Calm your mind and release tension with soothing affirmations.",
    duration: 1200, // 20 minutes
    category: "Anxiety",
    imageUrl: "/audio-session-3.jpg",
    audioUrl: "/audio/anxiety-relief.mp3",
  },
  {
    id: "4",
    title: "Morning Meditation",
    description: "Start your day with clarity, focus, and positive energy.",
    duration: 900, // 15 minutes
    category: "Meditation",
    imageUrl: "/audio-session-4.jpg",
    audioUrl: "/audio/morning-meditation.mp3",
  },
  {
    id: "5",
    title: "Pain Management Therapy",
    description: "Gentle guidance to help manage chronic pain and discomfort.",
    duration: 1500, // 25 minutes
    category: "Pain Relief",
    imageUrl: "/audio-session-5.jpg",
    audioUrl: "/audio/pain-management.mp3",
  },
  {
    id: "6",
    title: "Stress Release 528Hz",
    description: "Release daily stress with healing Solfeggio frequencies.",
    duration: 1800, // 30 minutes
    category: "Stress Relief",
    imageUrl: "/audio-session-6.jpg",
    audioUrl: "/audio/stress-release.mp3",
  },
  {
    id: "7",
    title: "Emotional Balance",
    description:
      "Find inner peace and emotional stability through guided therapy.",
    duration: 2100, // 35 minutes
    category: "Emotional Healing",
    imageUrl: "/audio-session-7.jpg",
    audioUrl: "/audio/emotional-balance.mp3",
  },
  {
    id: "8",
    title: "Focus & Concentration",
    description: "Enhance mental clarity and improve concentration.",
    duration: 1200, // 20 minutes
    category: "Focus",
    imageUrl: "/audio-session-8.jpg",
    audioUrl: "/audio/focus-concentration.mp3",
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
