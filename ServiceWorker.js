const cacheName = "Fortuna-ProtoCars-0.1";
const contentToCache = [
    "Build/WebGl.loader.js",
    "Build/99707852446711295b626891d8c91594.js.unityweb",
    "Build/c50489f3f22bc043e00748e6c7fece33.data.unityweb",
    "Build/8b11b392cb6714e45e5670de94e17b45.wasm.unityweb",
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
