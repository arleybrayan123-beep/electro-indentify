/* =============================================
   SERVICE WORKER — ElectroIdentify PWA
   Versión: 13.0.0
   ============================================= */

const CACHE_NAME = 'electroidentify-v13';

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

// ---- Instalación: cachear recursos y activar inmediatamente ----
self.addEventListener('install', (event) => {
    console.log('[SW] Instalando ElectroIdentify PWA v13...');
    // skipWaiting fuerza que este SW reemplace al viejo SIN esperar
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Cacheando recursos principales...');
            return Promise.allSettled(
                ASSETS_TO_CACHE.map(url =>
                    cache.add(url).catch(err => console.warn('[SW] No se pudo cachear:', url, err))
                )
            );
        }).then(() => {
            console.log('[SW] Instalación completa.');
        })
    );
});

// ---- Activación: limpiar cachés viejos y tomar control inmediatamente ----
self.addEventListener('activate', (event) => {
    console.log('[SW] Activando nueva versión v13...');
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
        // clients.claim() toma control de todas las pestañas abiertas inmediatamente
        }).then(() => self.clients.claim())
    );
});

// ---- Fetch: estrategia Network First (siempre intenta la red primero) ----
self.addEventListener('fetch', (event) => {
    // Ignorar requests que no sean GET
    if (event.request.method !== 'GET') return;

    // Ignorar extensiones de Chrome y requests internos
    if (event.request.url.startsWith('chrome-extension://')) return;

    event.respondWith(
        // Intentar red primero
        fetch(event.request).then((networkResponse) => {
            // Si la respuesta de red es válida, actualizamos el caché y la retornamos
            if (networkResponse && networkResponse.status === 200) {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });
            }
            return networkResponse;
        }).catch(() => {
            // Sin red: fallback al caché guardado
            return caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) return cachedResponse;
                // Sin caché tampoco: para documentos mostrar index.html
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
