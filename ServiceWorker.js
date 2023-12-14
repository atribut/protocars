const cacheName = "Fortuna-ProtoCars-0.12";
const contentToCache = [
<<<<<<< HEAD
    "Build/WebGlUNITY.loader.js",
    "Build/75630e1e16af4000b432fbe51145e931.js.unityweb",
    "Build/f51e87c8ae3596390e078b772ab166d8.data.unityweb",
    "Build/fb6ed37cbe68c7864efed50dfd7a50e5.wasm.unityweb",
=======
    "Build/WebGl.loader.js",
    "Build/99707852446711295b626891d8c91594.js.unityweb",
    "Build/3e5a029c046c9bca2954922fb4693b70.data.unityweb",
    "Build/8b11b392cb6714e45e5670de94e17b45.wasm.unityweb",
>>>>>>> parent of ee9bc98 (unity webgl)
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
