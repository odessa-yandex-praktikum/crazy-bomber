const staticCache = 'bomber-s-v2';
const dynamicCache = 'bomber-d-v1';
const assetsUrls = '{{FILES_FROM_DIST}}';

const pathHtmlUrls = [
    ['/login', '/login.html'],
    ['/signin', '/signin.html'],
    ['/leaderboard', '/leaderboard.html'],
    ['/game', '/game.html'],
    ['/gameover', '/gameover.html'],
    ['/start', '/start.html'],
    ['/profile', '/profile.html'],
    ['/crazy-forum', '/crazy-forum.html'],
    ['/', '/index.html'],
];

self.addEventListener('install', async (event) => {
    const cache = await caches.open(staticCache);
    await cache.addAll(assetsUrls);

    await cache.addAll(pathHtmlUrls.map((el) => el[1]));
});

self.addEventListener('activate', async (event) => {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames
            .filter((name) => name !== staticCache)
            .filter((name) => name !== dynamicCache)
            .map((name) => caches.delete(name))
    );
});

self.addEventListener('fetch', (event) => {
    const {request} = event;
    const url = new URL(request.url);

    const isMatchedSsrPage = pathHtmlUrls.some((pathPair) => request.url === pathPair[0]);
    if (isMatchedSsrPage) {
        event.respondWith(networkFirst(request, true));
    } else {
        url.origin === location.origin
            ? event.respondWith(networkFirst(request))
            : event.respondWith(cacheFirst(request));
    }
});

async function cacheFirst(request) {
    const cashed = await caches.match(request);
    if (cashed) {
        return cashed;
    }

    const cache = await caches.open(staticCache);
    const allKeys = await cache.keys();
    const matchedRequest = allKeys.find((rq) => rq.url.indexOf(request.url) !== -1);
    if (matchedRequest) {
        return caches.match(matchedRequest);
    }

    return fetch(request);
}

async function networkFirst(request, fallbackToStatic) {
    const cache = await caches.open(dynamicCache);
    try {
        const response = await fetch(request);
        await cache.put(request, response.clone()).catch(() => {});
        return response;
    } catch (e) {
        const cached = await cache.match(request);
        if (cached) {
            return cached;
        }

        if (fallbackToStatic) {
            const staticCache = await caches.open(staticCache);
            const allKeys = await staticCache.keys();
            // strip .html extension
            const matchedRequest = allKeys.find((rq) => rq.url.indexOf(request.url) !== -1);
            if (matchedRequest) {
                return caches.match(matchedRequest);
            }
        }

        throw e;
    }
}
