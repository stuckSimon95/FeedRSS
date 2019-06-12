/* const seconds = 30;

refreshCacheAsync();

async function refreshCacheAsync() {
    console.log('set time out: ' + seconds + ' seconds');
    return new Promise((resolve) => {
        setTimeout(() => {
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(function(CACHE_NAME) {
                        console.log(CACHE_NAME + ' deleted');
                        return caches.delete(CACHE_NAME);
                    })
                );
            });

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
            
        }, 1000 * seconds);
    });
} */

notify();

function notify() {
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
}

