const CACHE_NAME = 'brandsource-v1';
const IMAGE_CACHE_NAME = 'brandsource-images-v1';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Cache images (Firestorage, Unsplash, or Data URIs)
  if (event.request.destination === 'image' || url.pathname.match(/\.(png|jpg|jpeg|gif|webp)$/) || url.host.includes('firebasestorage')) {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response) return response;

          return fetch(event.request).then((networkResponse) => {
            if (networkResponse.status === 200 && (event.request.url.startsWith('http'))) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // If offline and not in cache, we could return a placeholder if desired
            return null;
          });
        });
      })
    );
    return;
  }

  // Default strategy for other assets
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
