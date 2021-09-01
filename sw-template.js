const staticCache = 'bomber-s-v2'
const dynamicCache = 'bomber-d-v1'
const assetsUrls = '{{FILES_FROM_DIST}}';

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCache);
    await cache.addAll(assetsUrls);

    const pathHtmlUrls =[
        ['/login', "/login.html"],
        ["/signin", "/signin.html"],
        ["/leaderboard", "/leaderboard.html"],
        ["/game", "/game.html"],
        ["/start", "/start.html"],
        ["/profile", "/profile.html"],
        ["/forum", "/forum.html"],
        ["/", "/index.html"],
    ];

    await cache.addAll(pathHtmlUrls.map(el => el[1]));
});

self.addEventListener('activate', async event => {
    const cacheNames = await caches.keys()
    await Promise.all(
        cacheNames.filter(name => name !== staticCache).filter(name => name !== dynamicCache)
            .map(name => caches.delete(name))
    )
});

self.addEventListener('fetch', event => {
    const {request} = event;
    const url = new URL(request.url)
    url.origin === location.origin ?
        event.respondWith(cacheFirst(request))
        : event.respondWith(networkFirst(request))
})

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

    return fetch(request)
}

async function networkFirst(request) {
    const cache = await caches.open(dynamicCache);
    try {
        const response = await fetch(request);
        await cache.put(request, response.clone()).catch(() => {});
        return response;
    } catch (e) {
        const cached = await cache.match(request)
        if (cached) {
            return cached
        }
        throw e;
    }
}