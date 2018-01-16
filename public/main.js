let swRegistration,
    swSubscriptionButton = document.getElementById("subscription");

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('worker.js').then(function(swReg) {
        console.log('Service Worker is registered', swReg);

        swRegistration = swReg;
        initialiseUI()
    })
}

// link to a image file
var iconUrl = 'https://www.seeklogo.net/wp-content/uploads/2014/10/Google-Chrome-logo-vector-download.png';

// create the <img> html element
// on first load it will request the image
// second time it will load it from cache directly thanks to the service worker
var imgElement = document.createElement('img');
imgElement.src = iconUrl;

window.addEventListener('beforeinstallprompt', function(e) {
    // beforeinstallprompt Event fired

    // e.userChoice will return a Promise.
    e.userChoice.then(function(choiceResult) {

        console.log(choiceResult.outcome);

        if(choiceResult.outcome == 'dismissed') {
            console.log('User cancelled home screen install');
        }
        else {
            console.log('User added to home screen');
        }
    });
});

function initialiseUI() {
    // Set the initial subscription value
    swRegistration.pushManager.getSubscription()
        .then(function(subscription) {
            isSubscribed = !(subscription === null);

            if (isSubscribed) {
                console.log('User IS subscribed.');
            } else {
                console.log('User is NOT subscribed.');
            }
        });

    swSubscriptionButton.onclick = subscribeUser;
    swSubscriptionButton.click();
}

function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array("BDp5EFMUM3VZBTCcsoUGYzSb4p38a3D_7wo7kgFa-za1KqVWOjS7_gZ2Aiux5HgM8LeFQ1X1DvREiyjpczJaPJQ\n");

    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    })
        .then(function(subscription) {
            console.log('User is subscribed:', subscription);

            isSubscribed = true;
        })
        .catch(function(err) {
            console.log('Failed to subscribe the user: ', err);
        });
}

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}