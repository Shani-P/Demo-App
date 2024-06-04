if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/serviceworker.js')
    .then(ref => console.log('Service Worker Registered!', reg))
    .catch(err => console.log('Service Worker Not Registered',err));
}