import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AudioProvider } from "@/contexts/AudioContext";

export const metadata: Metadata = {
  title: "Sublime - Guided Audio Therapy",
  description:
    "Guided healing for a smoother recovery journey with 432 Hz audio therapy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
