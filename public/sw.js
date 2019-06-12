'use strict';

/*
Constants used in the functions to ensure consistency
Adjust values to fit your desired naming and time frame conventions.
*/
const CACHE_NAME = "cache-v1";
const seconds = 20;

refreshCacheAsync();

async function refreshCacheAsync() {
    console.log('set time refresh cache: ' + seconds + ' seconds');
    return new Promise((event) => {
        setTimeout(() => {
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(function(CACHE_NAME) {
                        console.log(CACHE_NAME + ' deleted');
                        return caches.delete(CACHE_NAME);
                    })
                );
            });

            const title = 'Aggiornamento App Cache';
            const options = {
            body: `La cache interna dell'app è stata ripulita. 
            Assicurarsi di essere connessi alla rete prima di proseguire nell'utilizzo dell'applicazione.
            La cache viene ripulita ogni minuto`
            };

            self.registration.showNotification(title, options);

            /* CICLO REFRESH */
            refreshCacheAsync();

        }, 1000 * seconds);
    });
}

self.addEventListener('install', event => {
    console.log('SW installed');
});

self.addEventListener('activate', function(event) {
    
    console.log('SW activated');

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
  
/* self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
        });
        })
    );
}); */

self.addEventListener('fetch', (event) => {
    console.log('SW: fetching');
    
    var request = event.request;

    event.respondWith(
        caches.match(event.request).then(
            function(response) {
                return response || fetch(event.request).then(
                    function(response) 
                    {
                        let cacheResp = response.clone();
                        for (var pair of response.headers.entries()) {
                        }

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
                .catch(error => {
                    console.log(error);
                    return;
                })
            }
        )
    )  
});


self.addEventListener("push", event => 
{
    console.log('[SW] Push Received.');
    console.log(`[SW] Push had this data: "${event.data.text()}"`);
    try {
        //        var episode = JSON.parse(event.data.text());

        const title = "AGGIORNAMENTO CACHE";
        const options = {
            body: `La cache interna dell'app è stata ripulita. Assicurarsi di essere connessi alla rete 
            prima di proseguire nell'utilizzo dell'applicazione`,
            icon: 'img/feed-rss-56x56.png',
            badge: 'img/feed-rss-56x56.png',
            image: 'img/feed-rss-56x56.png',
            vibrate: [200, 100, 200, 100, 200, 100, 200]
        };
        event.waitUntil(self.registration.showNotification(title, options));
    } catch (e) {
        console('invalid json - notification supressed');
    }
});
