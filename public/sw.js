'use strict';

/* import $ from "./bower_components/jquery/dist/jquery";
console.log($); */

/*
Constants used in the functions to ensure consistency
Adjust values to fit your desired naming and time frame conventions.
*/
var pathPreScript = "/PWAPodcast/site/localhost/";
const CACHE_NAME = "cache-v1";
const seconds = 12000;

async function refreshCacheAsync() {
    console.log('set time out: ' + seconds + ' seconds');
    return new Promise((event) => {
        // delete old cache every minute
        setTimeout(() => {
            //debugger;
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(function(CACHE_NAME) {
                        console.log(CACHE_NAME + ' deleted');
                        return caches.delete(CACHE_NAME);
                    })
                );
            });
            
            /* SHOW POPUP */
            const title = 'Aggiornamento App Cache';
            const options = {
            body: `La cache interna dell'app è stata ripulita. 
            Assicurarsi di essere connessi alla rete prima di proseguire nell'utilizzo dell'applicazione.
            La cache viene ripulita ogni minuto`
            };

            self.registration.showNotification(title, options);
           // document.getsc
            
        }, 1000 * seconds);
    });
}

/* function displayNotification() {
    if (Notification.permission == 'granted') {
        console.log(navigator.serviceWorker);
        navigator.serviceWorker.getRegistration().then(function(reg) {
            var options = {
            body: 'Here is a notification body!',
            icon: 'images/example.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            },
            actions: [
                {action: 'explore', title: 'Explore this new world',
                icon: 'images/checkmark.png'},
                {action: 'close', title: 'Close notification',
                icon: 'images/xmark.png'},
            ]
            };
            reg.showNotification('Hello world!', options);
        });
    }
} */

/* self.addEventListener('sync', event => {
    
}); */

self.addEventListener('install', event => {
    console.log('SW installed');
});

self.addEventListener('activate', function(event) {
    refreshCacheAsync();
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
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            /* actions: [{
                    action: "listen",
                    title: "Listen Now",
                    icon: 'img/listen-now.png'
                },
                {
                    action: "later",
                    title: "Listen Later",
                    icon: 'img/listen-later.png'
                }
            ] */
        };
        event.waitUntil(self.registration.showNotification(title, options));
    } catch (e) {
        console('invalid json - notification supressed');
    }
});
