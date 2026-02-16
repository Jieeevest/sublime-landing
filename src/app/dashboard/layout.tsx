import AuthGuard from "@/components/auth/AuthGuard";
import { I18nProvider } from "@/i18n";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <I18nProvider>{children}</I18nProvider>
    </AuthGuard>
  );
}
