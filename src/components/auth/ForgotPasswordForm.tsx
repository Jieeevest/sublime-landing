"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add forgot password logic here
    console.log("Forgot password request:", { email });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-6">
        {/* Success Icon */}
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <h2 className="font-hero text-2xl font-bold text-secondary">
          Check your email
        </h2>

        <p className="text-secondary/70 text-sm max-w-md mx-auto">
          We've sent a password reset link to <strong>{email}</strong>. Please
          check your inbox and follow the instructions.
        </p>

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

  return (
    <div className="text-center space-y-6">
      {/* Lock Icon */}
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="font-hero text-2xl font-bold text-secondary">
          Forgot your password?
        </h2>
        <p className="text-secondary/70 text-sm max-w-md mx-auto">
          Please enter the email address associated with your account, and we'll
          email you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 pt-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button type="submit" variant="primary" className="w-full">
          Send Request
        </Button>
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
