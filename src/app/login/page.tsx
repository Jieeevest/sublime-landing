import type { Metadata } from "next";
import { cookies } from "next/headers";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login - Sublime",
  description:
    "Sign in to your Sublime account to continue your healing journey.",
};

export default async function LoginPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("cms_lang")?.value === "en" ? "en" : "id";

  return (
    <AuthLayout
      title={lang === "en" ? "Hi, Welcome 👋" : "Hi, Selamat Datang 👋"}
      subtitle={
        lang === "en"
          ? "Let's start your independent recovery journey with full support from Strovia."
          : "Mari kita mulai perjalanan pemulihan mandiri dengan dukungan penuh bersama Strovia."
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}
