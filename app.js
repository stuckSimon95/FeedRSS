(function() {

    if ('serviceWorker' in navigator) 
    {
        navigator.serviceWorker.register('sw.js').then((reg) => {
            console.log('SW registered succesfull with scope: ' + reg.scope);
        })
        .catch((err) => console.log(err));
    }
})();
