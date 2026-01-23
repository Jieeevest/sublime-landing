"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/api/sublimeApi";
import { toast } from "react-hot-toast";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [email, setEmail] = useState(""); // User can type their email
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (newPassword !== confirmPassword) {
      const msg = "Password tidak cocok";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      const msg = "Masukkan kode 6 digit dengan benar";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    try {
      await resetPassword({
        token: otpCode,
        new_password: newPassword,
      }).unwrap();

      const success =
        "Password berhasil diubah. Mengalihkan ke halaman login...";
      setSuccessMsg(success);
      toast.success(success);

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      const msg = err?.data?.message || "Gagal mengatur ulang kata sandi";
      setErrorMsg(msg);
      toast.error(msg);
    }
  };

  const handleResendCode = () => {
    console.log("Resend code to:", email);
    // TODO: Add resend code logic
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      {/* Send Email Icon */}
      <div className="w-24 h-24 flex items-center justify-center">
        <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
          {/* Paper airplane - send email */}
          <path
            d="M10 10l50 30-30 50-5-35-35-5z"
            fill="#3197A5"
            opacity="0.5"
          />
          <path d="M60 40L80 20" stroke="#3197A5" strokeWidth="3" fill="none" />
          <path d="M25 70L35 60" stroke="#3197A5" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex flex-col items-start gap-4 w-full">
        <h2
          className="w-full font-medium text-center"
          style={{
            fontSize: "24px",
            lineHeight: "32px",
            color: "#1F1F1F",
          }}
        >
          Permintaan berhasil dikirim!
        </h2>

        <div className="w-full">
          <p
            className="font-normal text-center"
            style={{
              fontSize: "14px",
              lineHeight: "150%",
              color: "#1F1F1F",
            }}
          >
            Kami talah mengirimkan email konfirmasi 6 digit ke alamat email
            Anda. Silakan masukkan kode tersebut di kolom di bawah ini untuk
            memverifikasi email Anda.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6 w-full"
      >
        {/* Email Field */}
        <div className="relative w-full">
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

        {/* OTP Code Input - 6 boxes */}
        <div className="flex flex-row items-start gap-2 w-full">
          {otp.map((digit, index) => (
            <div key={index} className="flex-1">
              <input
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className="w-full h-[54px] text-center text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg outline-none focus:border-[#3197A5] transition-colors"
                style={{
                  fontSize: "14px",
                  lineHeight: "150%",
                  color: digit ? "#1F1F1F" : "#8E8E8E",
                }}
              />
            </div>
          ))}
        </div>

        {/* New Password Field */}
        <div className="relative w-full">
          <input
            type={showNewPassword ? "text" : "password"}
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder=" "
            className="peer w-full h-[54px] px-[14px] text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg outline-none focus:border-[#3197A5] transition-colors"
          />
          <label
            htmlFor="newPassword"
            className="absolute left-[14px] top-1/2 -translate-y-1/2 px-[2px] text-xs text-[#8E8E8E] bg-white pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
          >
            Kata Sandi Baru
          </label>

          {/* Eye Icon Toggle */}
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
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
              {showNewPassword ? (
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

        {/* Confirm Password Field */}
        <div className="relative w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder=" "
            className="peer w-full h-[54px] px-[14px] text-sm text-[#1F1F1F] border border-[#E1E1E1] rounded-lg outline-none focus:border-[#3197A5] transition-colors"
          />
          <label
            htmlFor="confirmPassword"
            className="absolute left-[14px] top-1/2 -translate-y-1/2 px-[2px] text-xs text-[#8E8E8E] bg-white pointer-events-none transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
          >
            Konfirmasi Kata Sandi Baru
          </label>

          {/* Eye Icon Toggle */}
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
              {showConfirmPassword ? (
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full min-w-[120px] h-11 flex items-center justify-center px-3 py-2 bg-[#3197A5] text-[#F5F9FA] text-base font-normal rounded-[99px] hover:bg-[#2a8694] transition-colors"
        >
          Perbarui Kata Sandi
        </button>

        {/* Resend Code & Back Links */}
        <div className="flex flex-row justify-center items-start gap-1 w-full">
          <span className="text-sm text-[#1F1F1F]">Tidak punya kode?</span>
          <button
            type="button"
            onClick={handleResendCode}
            className="text-sm text-[#3197A5] hover:underline"
          >
            Kirim ulang kode
          </button>
        </div>

        {/* Back to Login Link */}
        <Link
          href="/login"
          className="flex flex-row justify-end items-center gap-1 text-[#3197A5] hover:underline"
          style={{
            fontSize: "14px",
            lineHeight: "150%",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Kembali ke halaman masuk
        </Link>
      </form>
    </div>
  );
}
