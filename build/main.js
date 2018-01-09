if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('worker.js');
}

console.log('sdds');

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