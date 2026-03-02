// audio-sw.js

let authToken = "";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SET_TOKEN") {
    authToken = event.data.token;
  }
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Intercept requests to the audio streaming endpoint
  if (url.pathname.includes("/api/v1/audios/stream/")) {
    const swToken = url.searchParams.get("sw_token");
    if (swToken) {
      authToken = swToken; // Memorize for range requests
      url.searchParams.delete("sw_token"); // Strip it out for the backend
    }

    event.respondWith(
      (async () => {
        const headers = new Headers(event.request.headers);
        if (authToken) {
          headers.set("Authorization", `Bearer ${authToken}`);
        }

        // Media elements usually send requests in 'no-cors' mode.
        // We need 'cors' mode to send custom headers like Authorization.
        const authRequest = new Request(url.toString(), {
          method: event.request.method,
          headers: headers,
          mode: "cors",
          credentials: "omit",
          // Intercept redirects manually to rewrite the MinIO URL
          redirect: "manual",
        });

        const initialResponse = await fetch(authRequest);

        // If it's an opaque redirect (status 0) or standard 3xx redirect
        if (
          initialResponse.type === "opaqueredirect" ||
          (initialResponse.status >= 300 && initialResponse.status < 400)
        ) {
          const location = initialResponse.headers.get("Location");
          if (location) {
            let redirectUrl = location;
            // Rewrite MinIO bucket HTTP IP to Frontend HTTPS Domain
            if (redirectUrl.includes("72.61.215.67")) {
              redirectUrl = redirectUrl.replace(
                /https?:\/\/72\.61\.215\.67(:\d+)?/,
                "https://strovia.app",
              );
            }

            // Follow the fixed redirect
            return Response.redirect(redirectUrl, 302);
          }
        }

        return initialResponse;
      })(),
    );
  }
});
