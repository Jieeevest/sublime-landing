import type { Metadata } from "next";
import Link from "next/link";
import NextImage from "next/image";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password - Sublime",
  description: "Reset your Sublime account password.",
};

export default function ForgotPasswordPage() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-white relative"
      style={{
        padding: "40px",
        gap: "40px",
        isolation: "isolate",
      }}
    >
      {/* Logo - Top Left (absolute positioned) */}
      <div className="absolute top-10 left-10">
        <Link href="/">
          <NextImage
            src="/strovia-log.png"
            alt="Strovia Logo"
            width={141}
            height={28}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Centered Form Container */}
      <div
        className="flex flex-col items-center mx-auto"
        style={{
          width: "352px",
          gap: "40px",
          borderRadius: "16px",
        }}
      >
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
