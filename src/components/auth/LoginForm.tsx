"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/api/sublimeApi";

import { toast } from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const result = await login({ email, password }).unwrap();
      if (result.success && result.data?.token) {
        toast.success("Login berhasil!");
        localStorage.setItem("token", result.data.token);
        // Dispatch user data to store if needed, or rely on getMe query in dashboard

        // Check for admin role and redirect accordingly
        const userRole = result.data?.user?.role || result.data?.role;
        if (userRole === "admin" || userRole === "super_admin") {
          router.push("/cms");
        } else {
          router.push("/dashboard");
        }
      } else {
        const msg = result.message || "Login failed";
        setErrorMsg(msg);
        toast.error(msg);
      }
    } catch (err: any) {
      const msg = err?.data?.message || "Terjadi kesalahan saat login";
      setErrorMsg(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-medium leading-8 text-[#1F1F1F]">
          Bergabung dengan Strovia
        </h2>
        <div className="flex items-center gap-0 text-sm">
          <span className="text-[#1F1F1F]">Pengguna baru?</span>
          <Link
            href="/register"
            className="text-[#3197A5] hover:underline ml-1"
          >
            Buat akun
          </Link>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Email Field */}
        <div className="relative">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=" "
            className="peer w-full h-[54px] px-[14px] text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg outline-none focus:border-[#3197A5] transition-colors"
          />
          <label
            htmlFor="email"
            className="absolute left-[14px] top-1/2 -translate-y-1/2 px-[2px] text-xs text-[#8E8E8E] bg-white pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
          >
            Email
          </label>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
              className="peer w-full h-[54px] px-[14px] text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg outline-none focus:border-[#3197A5] transition-colors"
            />
            <label
              htmlFor="password"
              className="absolute left-[14px] top-1/2 -translate-y-1/2 px-[2px] text-xs text-[#8E8E8E] bg-white pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
            >
              Password
            </label>

            {/* Eye Icon Toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-[#8E8E8E] hover:text-[#1F1F1F] transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                {showPassword ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-[#3197A5] hover:underline"
            >
              Lupa Kata Sandi?
            </Link>
          </div>
        </div>

        {errorMsg && (
          <div className="text-red-500 text-sm text-center">{errorMsg}</div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full min-w-[120px] h-11 flex items-center justify-center gap-2 px-3 py-2 bg-[#3197A5] text-white text-base font-normal rounded-[99px] hover:bg-[#2a8694] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Memproses...</span>
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
