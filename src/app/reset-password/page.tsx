import type { Metadata } from "next";
import Link from "next/link";
import NextImage from "next/image";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password - Sublime",
  description: "Reset your Sublime account password.",
};

export default function ResetPasswordPage() {
  return (
    <div
      className="min-h-screen flex flex-row justify-center items-center bg-white relative"
      style={{
        padding: "40px",
        gap: "24px",
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
        className="flex flex-col items-center"
        style={{
          width: "352px",
          gap: "40px",
          borderRadius: "16px",
        }}
      >
        <ResetPasswordForm />
      </div>
    </div>
  );
}
