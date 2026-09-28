const CACHE_NAME = 'kr-ar-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// 설치 시 파일들을 캐싱합니다
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 오프라인 상태일 때 캐싱된 파일을 불러옵니다
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});