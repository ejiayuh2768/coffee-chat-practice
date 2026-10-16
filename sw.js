// Network-first cache of the app shell with a short timeout: try the latest version, but fall back to the
// cached copy quickly when the network is slow or github.io can't be reached (e.g. some mainland China networks).
// Only successful responses are cached, so a temporary 404 (e.g. while GitHub Pages redeploys) never replaces the app.
const CACHE = "coffee-chat-v3";
const SHELL = ["./", "index.html", "manifest.json", "icon-180.png", "icon-192.png", "icon-512.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return; // AI calls go straight to the network
  const isPage = e.request.mode === "navigate";
  const cached = () => caches.match(e.request, { ignoreSearch: true }).then((r) => r || (isPage ? caches.match("index.html") : undefined));
  const network = fetch(e.request).then((res) => {
    if (!res.ok) throw new Error("bad status " + res.status);
    const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy));
    return res;
  });
  const timeout = new Promise((resolve) => setTimeout(resolve, 3500)).then(cached);
  e.respondWith(
    Promise.race([network, timeout.then((r) => r || network)])
      .catch(() => cached().then((r) => r || fetch(e.request)))
  );
  e.waitUntil(network.catch(() => {}));
});
