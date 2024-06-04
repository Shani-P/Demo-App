const staticCacheName = 'site-static-v2';
const dynamicCacheName = 'site-dynamic-v2';

const assets =[
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    'js/materialize.min.js',
    'css/style.css',
    '/css/materialize.min.js',
    '/img/user.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
];

const limitCacheSize =(name, size) =>{
    caches.open(name).then(cache =>{
        cache.keys().then(keys =>{
            if(keys.length > size){
                cache.delete(keys[0].then(limitCacheSize(name, size)));
            }
        });
    });
};

// Install service worker
self.addEventListener('install', evt => {
    evt.waitUntil(
      caches.open(staticCacheName).then((cache) => {
        console.log('caching shell assets');
        cache.addAll(assets);
      })
    );
  });
  
  //Activation of service worker
 self.addEventListener('activate', evt =>{
    evt.waitUntil(
        caches.keys().then(keys =>{
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key)));
        })
    );
 }); 

 //Fetch Handler 
self.addEventListener('fetch', evt => {
    if(evt.request.url.indexOf('firestore.google.apis.com')=== -1){
        evt.respondWih(
            caches.match(evt.request).then(cacheRes => {
                return cacheRes || fetch(evt.request).then(fetchRes => {
                    return caches.open(dynamicCacheName).then(caches =>{
                        cache.put(evt.request.url, fetchRes.clone());
                        limitCacheSize(dynamicCacheName, 15);
                        return fetchRes;
                    })
                });
            }).catch(()=> {
                if(evt.request.url.indexOf('.html')> -1){
                    return caches.match('/fallback.html')
                }
            })
        );
    }
});