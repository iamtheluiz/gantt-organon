const CACHE_NAME = 'gantt-organon-app';

self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', (event) => {
  if (event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => cache.addAll(event.data.payload)),
    );
  }
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }),
  );
});
