const CACHE_NAME = "fabula-s3-media-v1";
const S3_HOST = "10befd79-7587-47ec-bda6-0c34e969aa67.selstorage.ru";
const S3_PREFIX = "/assets/";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith("fabula-s3-media-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const isS3Asset = url.hostname === S3_HOST && url.pathname.startsWith(S3_PREFIX);
  if (!isS3Asset) return;

  // Range-запросы для видео не кэшируем через SW, чтобы не ломать стриминг.
  if (request.headers.has("range")) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      if (cached) return cached;

      const response = await fetch(request);
      if (response.ok) {
        cache.put(request, response.clone()).catch(() => {});
      }
      return response;
    })()
  );
});
