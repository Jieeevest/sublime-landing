import { I18nProvider } from "@/i18n";

// Article routes are publicly accessible — no AuthGuard needed.
// This layout overrides the parent /dashboard/layout.tsx for all
// routes under /dashboard/artikel (list + detail).
export default function ArtikelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <I18nProvider>{children}</I18nProvider>;
}
