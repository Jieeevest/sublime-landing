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
      title="Memprogram Ulang Otak Anda Setelah Stroke 💖"
      subtitle="Pemulihan Neuroplastis dengan Frekuensi 628Hz dan Subliminal untuk Rehabilitasi Stroke"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
