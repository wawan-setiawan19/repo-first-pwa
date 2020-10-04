const CACHE_NAME = "firstpwa-v1.01";
const urlsToCache=[
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "js/nav.js",
    "/icon.png",
    "/service-worker.js",
    "/manifest.json"
];

// simpan hasil cache
self.addEventListener("install",(event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache)=>{
            return cache.addAll(urlsToCache);
        })
    );
});

// menggunakan hasil cache
self.addEventListener("fetch",(event)=>{
    event.respondWith(
        caches
            .match(event.request,   {cacheName:CACHE_NAME})
            .then((response)=>{
                if(response){
                    console.log("ServiceWorker : Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ", event.request.url
                );
                return fetch(event.request);
            })
    );
});

// menghapus cache lama
self.addEventListener("activate", (event)=>{
    event.waitUntil(
        caches.keys().then((cachesNames)=>{
            return Promise.all(
                cachesNames.map((cacheName)=>{
                    if(cacheName != CACHE_NAME){
                        console.log(`ServiceWorker: cache${cacheName} dihapus`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
