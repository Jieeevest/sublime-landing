import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Register - Sublime",
  description:
    "Create your Sublime account and begin your personalized healing journey.",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Bangkitkan Kekuatan Pemulihan Mandiri Anda 💖"
      subtitle="Dukung proses pemulihan mandiri yang anda miliki dalam diri anda setelah pengalaman stroke dengan bantuan 528Hz subliminal message and sound bersama Strovia."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
