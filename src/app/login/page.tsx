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
      title="Hi, Selamat Datang 👋"
      subtitle="Mari kita mulai perialanan pemulihan mandiri dengan dukungan penuh bersama Strovia."
    >
      <LoginForm />
    </AuthLayout>
  );
}
