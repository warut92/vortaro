self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('vortaro-dosieraro').then((cache) => cache.addAll([
      '/index.html',
      '/eotajpu.js',
      '/script.js',
      '/style.css',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
