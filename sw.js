const CACHE_NAME = 'my-pwa-v1';
const ASSETS = [
  './',
  './index.html',
  // './offline.html',
  './stilo.css',
  './skriptoj/skripto.js',
  './script.js',
  './manifest.json',
  './ikono/icon-192.png',
  './ikono/icon-192.png'
];

// ติดตั้ง: cache ไฟล์ทั้งหมดล่วงหน้า
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// เปิดใช้งาน: ลบ cache เวอร์ชันเก่า
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ดึงข้อมูล: ใช้ cache ก่อน ถ้าไม่มีค่อยไปเน็ต
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, copy));
          return res;
        })
        .catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('./offline.html');
          }
        });
    })
  );
});