const CACHE_NAME = "cache-v1";
const seconds = 10;

refreshCacheAsync();

async function refreshCacheAsync() {
    console.log('set time refresh cache: ' + seconds + ' seconds');
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

            $.notify(
                `La cache interna dell'app è stata ripulita. 
                Assicurarsi di essere connessi alla rete prima di proseguire nell'utilizzo dell'applicazione.
                La cache viene ripulita ogni minuto`, {
                timer: 1000 * 8,
                placement: {
                    from: "top",
                    align: "center"
                },
            });
            /* self.registration.showNotification(title, options); */
           /* CICLO REFRESH */
           refreshCacheAsync();
        }, 1000 * seconds);
    });
}

