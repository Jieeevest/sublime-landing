"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useI18n } from "@/i18n";

export default function RouteLoadingOverlay() {
  const { lang } = useI18n();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = useMemo(
    () => `${pathname}?${searchParams.toString()}`,
    [pathname, searchParams]
  );

  const [visible, setVisible] = useState(false);
  const [isExit, setIsExit] = useState(false);
  const prevRouteRef = useRef<string | null>(null);
  const timersRef = useRef<number[]>([]);
  const startAtRef = useRef<number>(0);
  const isPendingRef = useRef(false);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const startLoading = useCallback(() => {
    if (isPendingRef.current) return;
    isPendingRef.current = true;
    startAtRef.current = Date.now();
    clearTimers();
    timersRef.current.push(
      window.setTimeout(() => {
        setIsExit(false);
        setVisible(true);
      }, 0)
    );
  }, [clearTimers]);

  const finishLoading = useCallback(() => {
    if (!isPendingRef.current) return;
    const elapsed = Date.now() - startAtRef.current;
    const minVisibleMs = 850;
    const remaining = Math.max(0, minVisibleMs - elapsed);
    clearTimers();
    timersRef.current.push(
      window.setTimeout(() => setIsExit(true), remaining),
      window.setTimeout(() => {
        setVisible(false);
        setIsExit(false);
        isPendingRef.current = false;
      }, remaining + 420)
    );
  }, [clearTimers]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#")) return;

      let nextUrl: URL;
      try {
        nextUrl = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      const sameOrigin = nextUrl.origin === window.location.origin;
      if (!sameOrigin) return;

      const nextKey = `${nextUrl.pathname}?${nextUrl.searchParams.toString()}`;
      if (nextKey === routeKey) return;

      startLoading();
    };

    const onPopState = () => startLoading();
    const onNavigationStart = () => startLoading();

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    window.addEventListener("app:navigation-start", onNavigationStart);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("app:navigation-start", onNavigationStart);
    };
  }, [routeKey, startLoading]);

  useEffect(() => {
    if (prevRouteRef.current === null) {
      prevRouteRef.current = routeKey;
      return;
    }
    if (prevRouteRef.current === routeKey) return;

    prevRouteRef.current = routeKey;
    if (!isPendingRef.current) {
      startLoading();
    }
    finishLoading();
  }, [routeKey, finishLoading, startLoading]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9997] flex items-center justify-center bg-[#1F1F1F]/18 backdrop-blur-sm transition-opacity duration-500 ${
        isExit ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`flex items-center gap-3 rounded-full bg-white/90 px-5 py-3 shadow-lg transition-all duration-500 ${
          isExit
            ? "opacity-0 scale-[0.985] translate-y-1"
            : "opacity-100 scale-100 translate-y-0"
        }`}
      >
        <div className="h-5 w-5 rounded-full border-2 border-[#3197A5]/25 border-t-[#3197A5] animate-spin" />
        <p
          className="text-[13px] leading-5 text-[#1F1F1F]"
          style={{ fontFamily: "'PP Neue Montreal', sans-serif" }}
        >
          {lang === "id" ? "Memuat halaman..." : "Loading page..."}
        </p>
      </div>
    </div>
  );
}
