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
    event.respondWith(
      (async () => {
        const headers = new Headers(event.request.headers);
        if (authToken) {
          headers.set("Authorization", `Bearer ${authToken}`);
        }

        // Media elements usually send requests in 'no-cors' mode.
        // We need 'cors' mode to send custom headers like Authorization.
        const authRequest = new Request(event.request, {
          headers: headers,
          mode: "cors",
          credentials: "omit",
        });

        return fetch(authRequest);
      })(),
    );
  }
});
