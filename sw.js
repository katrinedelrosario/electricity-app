const staticCacheName = 'site-static-v1.3'
const dynamicCacheName = 'site-dynamic-v1.3'

const assets = [
    './index.html',
    './assets/style/index.css',
    './assets/icons/gear.svg',
    './assets/js/currently.js',
    './assets/js/fetchdata.js',
    './assets/js/history.js',
    './assets/js/nav.js',
    './assets/js/overview.js',
    './fallback.html'
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

//fetch
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

