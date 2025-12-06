import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password - Sublime",
  description: "Reset your Sublime account password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Logo */}
      <div className="p-8">
        <Link href="/">
          <Image
            src="/strovia-logo-white.png"
            alt="Strovia Logo"
            width={141}
            height={28}
            className="object-contain"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(24%) sepia(28%) saturate(1847%) hue-rotate(163deg) brightness(95%) contrast(97%)",
            }}
          />
        </Link>
      </div>

      {/* Centered Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
