import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AudioProvider } from "@/contexts/AudioContext";
import { ReduxProvider } from "@/redux/provider";

import { Toaster } from "react-hot-toast";

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
        <ReduxProvider>
          <AudioProvider>
            {children}
            <Toaster position="bottom-right" />
          </AudioProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
