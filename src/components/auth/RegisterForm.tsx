"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add registration logic here
    console.log("Register attempt:", { firstName, lastName, email, password });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="font-hero text-3xl font-bold text-secondary">
          Get started now
        </h2>
        <p className="font-sans text-sm text-secondary/70">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:text-primary-600 transition-colors"
          >
            Login
          </Link>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" variant="primary" className="w-full mt-6">
          Create Account
        </Button>

        <p className="text-xs text-center text-secondary/60 mt-4">
          By signing up, I agree to{" "}
          <Link
            href="/terms"
            className="text-primary hover:text-primary-600 transition-colors"
          >
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-primary hover:text-primary-600 transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
      </form>
    </div>
  );
}
