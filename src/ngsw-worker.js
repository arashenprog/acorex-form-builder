const CACHE_NAME = 'offline-app';
const FALLBACK_HTML_URL = './index.html';
const version=1;
//precacheAndRoute(self.__WB_MANIFEST); 
  
 

self.addEventListener('install', async (event) => {
    await event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.add(
                new Request(FALLBACK_HTML_URL, {credentials: 'same-origin'}),
            )),
    );
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        skipWaiting();
    }
});
 

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.match(event.request)
          .then((response) => {
            return response || fetch(event.request)
          });
      })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil((async () => {
    if (self.registration.navigationPreload) {
      // Enable navigation preloads!
      await self.registration.navigationPreload.enable();
    }
  })());
});



// const navigationHandler = async (params) => {
//     try {
//         return await new NetworkFirst().handle(params);
//     } catch (error) {
//         return caches.match(FALLBACK_HTML_URL, {
//             cacheName: CACHE_NAME,
//         });
//     }
// };

// registerRoute(
//     new NavigationRoute(navigationHandler, {
//         denylist: [
//             /token-[^-]*\.json/,
//             /\.(?:map)$/,
//         ],
//     }),
// );