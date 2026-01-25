"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useGetMeQuery } from "@/redux/api/sublimeApi";

export default function AuthGuard({
  children,
  requireAdmin = false,
}: {
  children: React.ReactNode;
  requireAdmin?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

    if (!storedToken) {
      router.push("/login"); // Or /login?redirect=...
    }
  }, [router]);

  const {
    data: userData,
    isError,
    isLoading,
  } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (token && isError) {
      localStorage.removeItem("token"); // Clear invalid token
      router.push("/login"); // Or handle 401 specifically
    }
  }, [token, isError, router]);

  // Admin Check
  useEffect(() => {
    if (requireAdmin && userData?.data && userData.data.role !== "admin") {
      // Redirect non-admins trying to access admin routes
      router.push("/dashboard");
    }
  }, [requireAdmin, userData, router]);

  if (!isClient || !token || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3197A5]"></div>
      </div>
    );
  }

  // Prevent render if admin required but not admin (while redirecting)
  if (requireAdmin && userData?.data?.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}
