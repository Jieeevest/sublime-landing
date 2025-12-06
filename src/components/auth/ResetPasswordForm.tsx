"use client";

import { useState, useRef, KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("kieranelson@gmail.com");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // TODO: Add reset password logic here
    console.log("Reset password:", { email, code: code.join(""), password });

    // Redirect to login on success
    router.push("/login");
  };

  const handleResendCode = () => {
    // TODO: Add resend code logic
    console.log("Resend code to:", email);
  };

  return (
    <div className="text-center space-y-6">
      {/* Send Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="font-hero text-2xl font-bold text-secondary">
          Request sent successfully!
        </h2>
        <p className="text-secondary/70 text-sm max-w-md mx-auto">
          We've sent a 6-digit confirmation email to your email. Please enter
          the code in below box to verify your email.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        {/* Email Display */}
        <div className="text-left">
          <label className="block text-sm font-medium text-secondary mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-gray-50 text-secondary/60"
          />
        </div>

        {/* 6-Digit Code Input */}
        <div className="space-y-2">
          <div className="flex gap-2 justify-center">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                required
              />
            ))}
          </div>
        </div>

        {/* Password Inputs */}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button type="submit" variant="primary" className="w-full">
          Update Password
        </Button>

        <p className="text-sm text-secondary/70">
          Don't have a code?{" "}
          <button
            type="button"
            onClick={handleResendCode}
            className="text-primary font-medium hover:text-primary-600 transition-colors"
          >
            Resend code
          </button>
        </p>
      </form>

      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-600 transition-colors text-sm"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Return to sign in
      </Link>
    </div>
  );
}
