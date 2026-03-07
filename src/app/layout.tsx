import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AudioProvider } from "@/contexts/AudioContext";
import { ReduxProvider } from "@/redux/provider";
import { I18nProvider } from "@/i18n";

import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Strovia - Stroke Recovery Subliminal Audio",
  description:
    "Guided healing for a smoother recovery journey with 432 Hz audio therapy.",
  icons: {
    icon: "/icon.svg",
  },
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
          <I18nProvider>
            <AudioProvider>
              {children}
              <Toaster position="bottom-right" />
            </AudioProvider>
          </I18nProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
