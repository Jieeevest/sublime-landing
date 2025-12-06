import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login - Sublime",
  description:
    "Sign in to your Sublime account to continue your healing journey.",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Hi, Welcome Back 👋"
      subtitle="Continue your personalized healing journey with calm, clarity, and support."
    >
      <LoginForm />
    </AuthLayout>
  );
}
