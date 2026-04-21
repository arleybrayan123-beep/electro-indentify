/* =============================================
   SERVICE WORKER — ElectroIdentify PWA
   Versión: 1.0.0
   ============================================= */

const CACHE_NAME = 'electroidentify-v8';

// Archivos a cachear para modo offline
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './index.css',
    './script.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png',
    // Fuentes y librerías CDN
    'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-brands-400.woff2'
];

// ---- Instalación: cachear recursos ----
self.addEventListener('install', (event) => {
    console.log('[SW] Instalando ElectroIdentify PWA...');
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Cacheando recursos principales...');
            // Cachear de a uno para no fallar si algún CDN no responde
            return Promise.allSettled(
                ASSETS_TO_CACHE.map(url =>
                    cache.add(url).catch(err => console.warn('[SW] No se pudo cachear:', url, err))
                )
            );
        }).then(() => {
            console.log('[SW] Instalación completa.');
            return self.skipWaiting();
        })
    );
});

// ---- Activación: limpiar cachés viejos ----
self.addEventListener('activate', (event) => {
    console.log('[SW] Activando nueva versión...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => {
                        console.log('[SW] Eliminando caché viejo:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// ---- Fetch: estrategia Cache First con fallback a red ----
self.addEventListener('fetch', (event) => {
    // Ignorar requests que no sean GET
    if (event.request.method !== 'GET') return;

    // Ignorar extensiones de Chrome y requests internos
    if (event.request.url.startsWith('chrome-extension://')) return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Responder desde caché si existe
            if (cachedResponse) {
                // En background, actualizar el caché con la versión de red
                fetch(event.request)
                    .then(networkResponse => {
                        if (networkResponse && networkResponse.status === 200) {
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, networkResponse.clone());
                            });
                        }
                    })
                    .catch(() => {}); // Silenciar error si no hay red
                return cachedResponse;
            }

            // No está en caché: ir a la red
            return fetch(event.request).then((networkResponse) => {
                // Cachear la respuesta si es válida
                if (networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // Sin red y sin caché: mostrar página offline básica
                if (event.request.destination === 'document') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});

// ---- Escuchar mensajes del cliente ----
self.addEventListener('message', (event) => {
    if (event.data && event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});
