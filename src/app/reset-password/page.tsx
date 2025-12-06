import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password - Sublime",
  description: "Create a new password for your Sublime account.",
};

export default function ResetPasswordPage() {
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
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
