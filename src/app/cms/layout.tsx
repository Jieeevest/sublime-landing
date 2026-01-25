import AuthGuard from "@/components/auth/AuthGuard";

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard requireAdmin>{children}</AuthGuard>;
}
