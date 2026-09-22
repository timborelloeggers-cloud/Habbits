/* Cadence service worker – fresh app shell, offline fallback */
const CACHE = 'cadence-v15';
const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Taegliche Erinnerung vom Push-Server (push-worker/): Mitteilung anzeigen
self.addEventListener('push', e => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch (_) { data = { body: e.data && e.data.text() }; }
  e.waitUntil(self.registration.showNotification(data.title || 'Cadence', {
    body: data.body || 'Zeit fürs Tracken 🌱 – wie war dein Tag?',
    icon: 'icon-192.png', badge: 'icon-192.png', tag: 'cadence-daily'
  }));
});

// Tippen auf die Mitteilung: offene App nach vorn holen oder neu oeffnen
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) if ('focus' in c) return c.focus();
    return self.clients.openWindow('./');
  }));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const isShell = url.origin === location.origin &&
    (e.request.mode === 'navigate' ||
     url.pathname.endsWith('/') ||
     /\.(html|js|webmanifest)$/.test(url.pathname));

  if (isShell) {
    // Network-first: always pick up a new deploy, fall back to cache when offline.
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }).catch(() =>
        caches.match(e.request).then(r => r || caches.match('./index.html'))
      )
    );
  } else {
    // Icons, fonts and other static assets: cache-first keeps it fast.
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }))
    );
  }
});
