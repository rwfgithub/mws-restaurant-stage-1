
var staticCacheName = 'restaurant-review-v11'
console.log(staticCacheName);

self.addEventListener('install', function(event) {
    //event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            console.log('Opened cache in install');
            return cache.addAll([
                '/',
                '/index.html',
                '/restaurant.html',
                '/css/styles.css',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/data/restaurants.json',
                'https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxK.woff2',
                'https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmEU9fBBc4.woff2'
            ]);
            console.log('Closed cache in install');
        })
    //);
});


self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            return cacheName.startsWith('restaurant-review-') &&
                   !allCaches.includes(cacheName);
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });


self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });

/*

});

                'https://maps.googleapis.com/maps/api/js?key=AIzaSyBEks8MTGNfw6anJClp5rGhiPgnXBne-NQ&libraries=places&callback=initMap',
                'https://maps.googleapis.com/maps-api-v3/api/js/33/3/common.js',
                'https://maps.googleapis.com/maps-api-v3/api/js/33/3/util.js',



*/
