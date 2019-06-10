if ('serviceWorker' in navigator) 
{
    navigator.serviceWorker.register('sw.js').then((reg) => {
        console.log('SW registered succesfull with scope: ' + reg.scope);
    })
    .catch((err) => console.log(err));

}

var deferredPrompt;

window.addEventListener("beforeinstallprompt", function (e) 
{
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    e.userChoice.then(function(outcome) 
    { 
        console.log(outcome); // either "accepted" or "dismissed"
    });
    deferredPrompt = e;
    //showAddToHomeScreen();
    document.getElementById('btnAd2hs').addEventListener('click', addToHomeScreen);
    
    $('#btnAd2hs').show();
});

function addToHomeScreen() 
{

    if (deferredPrompt) 
    {
    // Show the prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
        .then(function (choiceResult) {

        if (choiceResult.outcome === 'accepted') {
            // hide our user interface that shows our A2HS button
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }

        deferredPrompt = null;

        });
    }
}

