'use strict';

/*
Constants used in the functions to ensure consistency
Adjust values to fit your desired naming and time frame conventions.
*/
var pathPreScript = "/PWAPodcast/site/localhost/";
const VERSION = "v1",
    PRECACHE_NAME = "pre-cache",
    // CACHE_MANIFEST = "cache-manifest.json",
    // CACHE_MANIFEST_KEY = "cache-manifest",
    // PRECACHE_KEY = "precache-assets",
    DYNAMIC_CACHE_NAME = "dynamic-cache",
    MP3_CACHE_NAME = "episode-mp3-cache",
    DYNAMIC_CACHE_MAX = 20,
    PRECACHE_URLS = [
        "/",
        "app.js",
        "burger.js",
        "blogs/",
        "about/"
    ];
//    IDB_NAME = "sw_cache",
//    URL_CACHE_DB = "url-meta-cache",
//    CACHE_UPDATE_TTL_KEY = "cache-manifest-ttl",
//for development I recommend 1 minute or less ;)
//   PRECACHE_UPDATE_TTL = 1000; //1000 * 60 * 60 * 24; //1 day, can adjust to your desired time frame

function cacheName(key) {
    console.log(key + "-" + VERSION);
    return key + "-" + VERSION;
}

self.addEventListener('install', event => {
    
    self.skipWaiting();

    event.waitUntil(

        caches.open(cacheName(PRECACHE_NAME)).then(cache => {

            return cache.addAll(PRECACHE_URLS);

        })

    );

});

/* self.addEventListener('activate', event => {

    event.waitUntil(

        caches.keys().then(cacheNames => {

            cacheNames.forEach(value => {

                if (value.indexOf(VERSION) < 0) {
                    caches.delete(value);
                }

            });

            return;
        })
    );

}); */

self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
          
        return Promise.all(
          cacheNames.filter(function(cacheName) {

            // delete cache every minute
            setTimeout(() => {
                caches.delete("dynamic-cache-v1");
                console.log('dynamic-cache-v1 deleted');
            }, 1000 * 8);
            
            // Return true if you want to remove this cache,
            // but remember that caches are shared across
            // the whole origin
          }).map(function(cacheName) {
              console.log('delete ' + cacheName + ' cache');
            return caches.delete(cacheName);
          })
        );
      })
    );
});

self.addEventListener('fetch', event => {
    let request = event.request;

    event.respondWith(
        caches.match(event.request).then(
            response => {
                return response || fetch(event.request).then(
                    response => {
                        let cacheResp = response.clone();
                        for (var pair of response.headers.entries()) {
                            //console.log("header - " + pair[0] + ': ' + pair[1]);
                        }
                        //only cache is the status is OK & not a chrome-extension URL
                        if ([0, 200].includes(response.status) &&
                            request.url.indexOf("chrome-extension")) {
                            caches.open(cacheName(DYNAMIC_CACHE_NAME)).then(
                                cache => {
                                    cache.put(event.request, cacheResp);
                                });
                        }
                        return response;
                    }
                )
            })
        /* end responseWith */
    );
});

