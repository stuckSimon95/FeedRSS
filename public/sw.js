'use strict';

/*
Constants used in the functions to ensure consistency
Adjust values to fit your desired naming and time frame conventions.
*/
var pathPreScript = "/PWAPodcast/site/localhost/";
const CACHE_NAME = "cache-v1";
    //DYNAMIC_CACHE_NAME = "dynamic-cache",
   // DYNAMIC_CACHE_MAX = 20,
    /* CACHE_ASSETS = [
        "./public/",
    ]; */

self.addEventListener('install', event => {
    console.log('SW installed');
    /* event.waitUntil(
        caches
        .open(CACHE_NAME)
        .then(cache => {
            console.log('SW: caching files');
            return cache.addAll(CACHE_ASSETS);
        })
        .then(() => self.skipWaiting())
    ); */
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== CACHE_NAME) {
                        console.log('SW: clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('SW: fetching');
    var request = event.request;

    event.respondWith(
        fetch(request)
        .then(res => {
            // make copy/clone of response
            const resClone = res.clone();
            // open cache
            caches
            .open(CACHE_NAME)
            .then(cache => {
                cache.put(request, resClone);
            });
        return res;
        })
        .catch(err => caches.match(request).then(res => res))
    );
});

/* self.addEventListener('fetch', event => {
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
                            caches.open(CACHE_NAME).then(
                                cache => {
                                    cache.put(event.request, cacheResp);
                                });
                        }
                        return response;
                    }
                )
            })
    ); 
}); */

