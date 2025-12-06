"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add authentication logic here
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="font-hero text-3xl font-bold text-secondary">
          Sign in to Strovia
        </h2>
        <p className="font-sans text-sm text-secondary/70">
          New user?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:text-primary-600 transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="lilaranelson@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          label="Email"
        />

        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            label="Password"
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-primary font-medium hover:text-primary-600 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button type="submit" variant="primary" className="w-full mt-6">
          Login
        </Button>
      </form>
    </div>
  );
}
