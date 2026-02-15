import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const src = searchParams.get("src");

  if (!src) {
    return new Response("Missing src", { status: 400 });
  }

  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return new Response("Invalid src", { status: 400 });
  }

  const hostname = url.hostname.toLowerCase();
  const allowed =
    hostname === "strovia.app" || hostname.endsWith(".strovia.app");
  if (!allowed) {
    return new Response("Forbidden host", { status: 403 });
  }

  try {
    const upstream = await fetch(url.toString(), {
      // Some hotlink protections require a referer; set to primary domain
      headers: {
        Referer: "https://strovia.app",
        "User-Agent": "SublimeLanding/1.0 (+image-proxy)",
      },
      // Let hosting layer cache based on response headers
      cache: "no-store",
    });

    if (!upstream.ok) {
      return new Response("Upstream error", { status: upstream.status });
    }

    const contentType = upstream.headers.get("content-type") || "image/jpeg";
    const buf = await upstream.arrayBuffer();

    return new Response(buf, {
      headers: {
        "content-type": contentType,
        // Short client cache, longer CDN cache
        "cache-control": "public, max-age=3600, s-maxage=86400, immutable",
      },
    });
  } catch {
    return new Response("Proxy fetch failed", { status: 502 });
  }
}
