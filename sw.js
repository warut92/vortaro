self.addEventListener('install', (e) => {
  console.log("Instalita!")
  e.waitUntil(
    caches.open('vortaro-dosieraro').then((cache) => cache.addAll([
      '/index.html',
      '/eotajpu.js',
      '/skripto.js',
      // '/eoth-vortaro.js',
      '/stilo.css',
      // '/lasta_sxangxo.js',
    ])),
  );
});

self.addEventListener('active', (e) => {
  console.log("Aktiva!");
});

self.addEventListener('fetch', (e) => {
  console.log("Venigita! ",e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
