const cacheName = "Fortuna-ProtoCars-0.1";
const contentToCache = [
    "Build/WebGl.loader.js",
    "Build/d506974bc7030e88a40b13e5e5c40fbe.js.unityweb",
    "Build/8be345383f4de8701565cf35393d4219.data.unityweb",
    "Build/39512615fb2f1d1ad0d9dd825f2959a0.wasm.unityweb",
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
