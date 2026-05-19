const CACHE_NAME = "pwa-bouncing-circles-v2";
const PHASER_CDN = "https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser-arcade-physics.min.js";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./src/main.js",
  "./src/pwa.js",
  "./src/simulation.js",
  "./src/game/Bouncer.js",
  "./src/entities/CircleSprite.js",
  "./src/scenes/BootScene.js",
  "./src/scenes/BouncingCirclesScene.js",
  "./public/manifest.webmanifest",
  "./public/icons/icon-192.png",
  "./public/icons/icon-512.png",
  PHASER_CDN
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(async () => {
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }

          throw new Error("Offline and no cached asset available.");
        });
    })
  );
});
