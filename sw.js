const staticCacheName = 'site-static-v1.6'
const dynamicCacheName = 'site-dynamic-v1.6'

const assets = [
    './index.html',
    './assets/style/index.css',
    './assets/icons/gear.svg',
    './assets/js/currently.js',
    './assets/js/fetchdata.js',
    './assets/js/history.js',
    './assets/js/nav.js',
    './assets/js/overview.js',
    './fallback.html',
    './assets/js/history.js'
]


//register sw
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('sw registered', reg))
    .catch(err => console.error('sw not registered', err))
}

//install sw & creates cache
self.addEventListener('install', (event) => {
    
    event.waitUntil(
        //creates cache & adds
        caches.open(staticCacheName)
        .then(cache => {
            cache.addAll(assets)
            console.log('caching all assets')
        })
    )
    console.log('sw installed')
}
)

//activate sw
self.addEventListener('activate', (event) => {
    console.log('activated sw', event)
    //filters and deletes caches that doesnt match updated new version
       event.waitUntil(
           caches.keys().then(keys => {
               const filteredkeys = keys.filter(key => key !== staticCacheName)
               filteredkeys.map(key => {
                   caches.delete(key)
               })
           })
      )    
})

//limit
const limitCacheSize = (cacheName, numberOfAllowedFiles) => {
	caches.open(cacheName).then(cache => {
		cache.keys().then(keys => {
			if(keys.length > numberOfAllowedFiles) {
				cache.delete(keys[0]).then(limitCacheSize(cacheName, numberOfAllowedFiles))
			}
		})
	})
}

// //fetch

// self.addEventListener(
//   "fetch",
//   (event) => {
//     // Efter fetch request
//     event.respondWith(
//       (async () => {
//         // check om response findes i cache
//         const cachedResponse = await caches.match(event.request);
//         if (cachedResponse) {
//           // hvis response er i cache - returner den
//           return cachedResponse;
//         } else {
//           const response = await fetch(event.request);

//           // Hvis siden ikke findes så vis fallback siden
//           if (response.status == 404) {
//             const cache = await caches.open(staticCacheName);
//             const cachedResponse = await cache.match("./fallback.html");
//             return cachedResponse;
//           }

//           // ???
//           if (
//             !response ||
//             response.status !== 200 ||
//             response.type !== "basic"
//           ) {
//             return response;
//           }

//           // hvis dynamisk cache er slået til "boolean" så åben cache og gem response

//           const responseToCache = response.clone();
//           const cache = await caches.open(dynamicCacheName);
//           await cache.put(event.request, responseToCache);

//           return response;
//         }
//       })()
//     );
//   },
//   // Kør limitCache size til maks 50 filer
//   limitCacheSize(dynamicCacheName, 50)
// );








fetch
 self.addEventListener("fetch", (event) => {
	
  
 	if (!(event.request.url.indexOf('http') === 0)) return
 	event.respondWith(
 	  caches
 		.match(event.request)
 		.then((cacheRes) => {
 		  return (
 			cacheRes ||
 			fetch(event.request).then(async fetchRes => {
 			  return caches.open(dynamicCacheName).then((cache) => {
 				cache.put(event.request.url, fetchRes.clone())
 				return fetchRes
 			  })
 			})
 		  )
 		})

     //catches error and returns fallback page
     .catch(() => {
 			if(event.request.url.indexOf('.html') > -1) {
 				return caches.match('./fallback.html')
 			}
 		}
 	)
    
	
 )},
 limitCacheSize(dynamicCacheName, 100)
 )

