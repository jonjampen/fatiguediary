// install service worker
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
});

// activate service worker
self.addEventListener('activate', (e) => {
  console.log("service worker activated");
})

// fetch eventt
self.addEventListener('fetch', (e) => {
  console.log('fetch event', e);
})