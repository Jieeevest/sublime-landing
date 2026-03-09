import type { Metadata } from "next";
import { cookies } from "next/headers";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register - Sublime",
  description:
    "Create your Sublime account and begin your personalized healing journey.",
};

export default async function RegisterPage() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("cms_lang")?.value === "en" ? "en" : "id";

  return (
    <AuthLayout
      title={
        lang === "en"
          ? "Awaken Your Self-Recovery Strength 💖"
          : "Bangkitkan Kekuatan Pemulihan Mandiri Anda 💖"
      }
      subtitle={
        lang === "en"
          ? "Support your self-recovery process after stroke with 528Hz subliminal messages and sound from Strovia."
          : "Dukung proses pemulihan mandiri yang anda miliki dalam diri anda setelah pengalaman stroke dengan bantuan 528Hz subliminal message and sound bersama Strovia."
      }
    >
      <RegisterForm />
    </AuthLayout>
  );
}
