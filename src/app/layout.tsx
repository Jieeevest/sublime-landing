import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

import { AudioProvider } from "@/contexts/AudioContext";
import { ReduxProvider } from "@/redux/provider";
import { I18nProvider, type Lang } from "@/i18n";
import RouteLoadingOverlay from "@/components/RouteLoadingOverlay";

import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Strovia - Stroke Recovery Subliminal Audio",
  description:
    "Guided healing for a smoother recovery journey with 432 Hz audio therapy.",
  icons: {
    icon: "/icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get("cms_lang")?.value;
  const initialLang: Lang = cookieLang === "en" ? "en" : "id";

  return (
    <html lang={initialLang}>
      <body className="antialiased">
        <ReduxProvider>
          <I18nProvider initialLang={initialLang}>
            <AudioProvider>
              {children}
              <RouteLoadingOverlay />
              <Toaster position="bottom-right" />
            </AudioProvider>
          </I18nProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
