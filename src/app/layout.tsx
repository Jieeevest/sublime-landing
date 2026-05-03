import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

import { AudioProvider } from "@/contexts/AudioContext";
import { ReduxProvider } from "@/redux/provider";
import { I18nProvider, type Lang } from "@/i18n";
import RouteLoadingOverlay from "@/components/RouteLoadingOverlay";
import GoogleAnalytics from "@/components/GoogleAnalytics";

import { Toaster } from "react-hot-toast";

const SITE_URL = "https://strovia.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Strovia - Stroke Recovery Subliminal Audio",
    template: "%s | Strovia",
  },
  description:
    "Strovia membantu pemulihan stroke dengan terapi audio subliminal 432 Hz yang menenangkan. Mulai perjalanan penyembuhan Anda hari ini.",
  keywords: [
    "stroke recovery",
    "pemulihan stroke",
    "subliminal audio",
    "terapi audio 432 Hz",
    "healing audio",
    "Strovia",
  ],
  authors: [{ name: "Strovia", url: SITE_URL }],
  creator: "Strovia",
  publisher: "Strovia",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "Strovia",
    title: "Strovia - Stroke Recovery Subliminal Audio",
    description:
      "Strovia membantu pemulihan stroke dengan terapi audio subliminal 432 Hz yang menenangkan. Mulai perjalanan penyembuhan Anda hari ini.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Strovia - Stroke Recovery Subliminal Audio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strovia - Stroke Recovery Subliminal Audio",
    description:
      "Strovia membantu pemulihan stroke dengan terapi audio subliminal 432 Hz yang menenangkan.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.svg",
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: "A1MWfPXKRLr4Ep6RFnxREeTD30h3mG7JRzJ8dexjtDA",
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
        <GoogleAnalytics />
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
