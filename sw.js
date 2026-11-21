// เปลี่ยนเวอร์ชันเมื่อแก้รายการ ASSETS หรือ logic ของ service worker
const CACHE_NAME = 'vortaro-v3';

// ไฟล์ทั้งหมดที่หน้า index.html และ pri.html ต้องใช้ในการทำงานแบบออฟไลน์
const ASSETS = [
  './',
  './index.html',
  './pri.html',
  './stilo.css',
  './script.js',
  './manifest.json',
  './eoth-vortaro.js',
  './skriptoj/eotajpu.js',
  './skriptoj/tujsercxo/tujsercxo.js',
  './skriptoj/tujsercxo/piv_vortoj.js',
  './skriptoj/lasta_sxangxo.js',
  './skriptoj/vinjetoj.js',
  './skriptoj/skripto.js',
  './skriptoj/aliaj-fontoj.js',
  './skriptoj/hazardilo.js',
  './ikono/android/android-launchericon-48-48.png',
  './ikono/android/android-launchericon-192-192.png',
  './ikono/android/android-launchericon-512-512.png',
  './ikono/ios/180.png'
];

// ส่งข้อความถึงทุกหน้าของเว็บ (รวมหน้าที่ยังไม่อยู่ใต้การควบคุมของ SW ตอนติดตั้งครั้งแรก)
async function broadcast(msg) {
  const clients = await self.clients.matchAll({ includeUncontrolled: true, type: 'window' });
  clients.forEach(c => c.postMessage(msg));
}

// ตรวจว่าไฟล์ใน ASSETS อยู่ใน cache แล้วกี่ไฟล์
async function cacheStatus() {
  const cache = await caches.open(CACHE_NAME);
  const hits = await Promise.all(ASSETS.map(url => cache.match(url)));
  const done = hits.filter(Boolean).length;
  return { type: done === ASSETS.length ? 'ready' : 'progress', done, total: ASSETS.length };
}

// ดาวน์โหลดไฟล์ทั้งหมด (ข้าม HTTP cache) และรายงานความคืบหน้าให้หน้าเว็บ
// รายงานเป็นจำนวนไฟล์ที่เสร็จ + จำนวนไบต์ที่ได้รับแล้ว
// (บอกเป็น % ของไบต์ไม่ได้ เพราะ GitHub Pages ส่งแบบ gzip ทำให้ไม่รู้ขนาดจริงล่วงหน้า)
async function precache() {
  const cache = await caches.open(CACHE_NAME);
  const total = ASSETS.length;
  let done = 0;
  let bytes = 0;
  let lastSent = 0;
  const report = force => {
    const now = Date.now();
    if (!force && now - lastSent < 150) return; // ไม่ส่งถี่เกินไป
    lastSent = now;
    broadcast({ type: 'progress', done, total, bytes });
  };
  report(true);
  try {
    await Promise.all(ASSETS.map(async url => {
      const res = await fetch(new Request(url, { cache: 'reload' }));
      if (!res.ok) throw new Error(url + ' → HTTP ' + res.status);
      const saving = cache.put(url, res.clone());
      // อ่านอีกสำเนาหนึ่งเพื่อนับไบต์ที่ได้รับ
      if (res.body) {
        const reader = res.body.getReader();
        for (;;) {
          const { done: end, value } = await reader.read();
          if (end) break;
          bytes += value.byteLength;
          report(false);
        }
      }
      await saving;
      done++;
      report(true);
    }));
  } catch (err) {
    broadcast({ type: 'error', message: String(err), done, total, bytes });
    throw err; // ให้การติดตั้งล้มเหลว เบราว์เซอร์จะลองใหม่ในการเปิดครั้งถัดไป
  }
}

// ติดตั้ง: cache ไฟล์ทั้งหมดล่วงหน้า
self.addEventListener('install', event => {
  event.waitUntil(precache().then(() => self.skipWaiting()));
});

// เปิดใช้งาน: ลบ cache เวอร์ชันเก่า แล้วแจ้งหน้าเว็บว่าพร้อมใช้ออฟไลน์
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => cacheStatus())
      .then(broadcast)
  );
});

// หน้าเว็บถามสถานะ cache
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'status' && event.source) {
    event.waitUntil(cacheStatus().then(s => event.source.postMessage(s)));
  }
});

// ดึงข้อมูล: stale-while-revalidate สำหรับไฟล์ในเว็บไซต์เดียวกัน
// - ตอบจาก cache ทันที (ใช้งานออฟไลน์ได้และเร็ว)
// - พร้อมกันนั้นโหลดเวอร์ชันใหม่จากเน็ตมาเก็บไว้ ใช้ได้ในการเปิดครั้งถัดไป
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // ปล่อยคำขอไปยังเว็บไซต์อื่น (เช่น ReVo, Wikipedia, CDN) ให้เบราว์เซอร์จัดการเอง
  if (url.origin !== self.location.origin) return;

  const isNavigate = req.mode === 'navigate';

  event.respondWith(
    caches.open(CACHE_NAME).then(async cache => {
      const cached = await cache.match(req, { ignoreSearch: isNavigate });

      const network = fetch(req)
        .then(res => {
          if (res && res.ok && res.type === 'basic') {
            cache.put(req, res.clone());
          }
          return res;
        })
        .catch(() => undefined);

      if (cached) {
        event.waitUntil(network);
        return cached;
      }

      const res = await network;
      if (res) return res;

      // ออฟไลน์และไม่มีใน cache: ถ้าเป็นการเปิดหน้า ให้แสดงหน้าหลักแทน
      if (isNavigate) {
        return (await cache.match('./index.html')) || Response.error();
      }
      return Response.error();
    })
  );
});
