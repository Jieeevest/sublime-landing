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
      title="Begin Your Healing Journey 🌸"
      subtitle="Start your personalized healing experience with 628 Hz audio and gentle subliminal support."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
