const CACHE = "ronny-maths-v1";

const CORE = [
  "/",
  "/index.html",
  "/index.css",
  "/index.js",
  "/shared.js",
  "/math-lessons.html",
  "/tasks.html",
  "/tasks.css",
  "/tasks.js",
  "/mind.html",
  "/mind.css",
  "/mind.js",
  "/ask-mwalimu.html",
  "/algebra.html",
  "/trigonometry.html",
  "/statistics.html",
  "/limits.html",
  "/differentiation.html",
  "/integration.html",
  "/vectors.html",
  "/matrices.html",
  "/conics.html",
  "/sequences.html",
  "/complex.html",
  "/areas.html",
  "/volumes.html",
  "/IMAGES/P2.png",
  "/IMAGES/icon-192.png",
  "/IMAGES/icon-512.png",
  "/manifest.json"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(CORE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  // Don't intercept AdSense or Firebase requests
  if (url.hostname.includes("google") || url.hostname.includes("firebase")) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type !== "opaque") {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
      return cached || network;
    })
  );
});