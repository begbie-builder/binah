const CACHE='binah-v4-proportional-icons';
const SHELL=['/','/index.html','/config.js','/src/app.js','/src/styles.css','/src/engine.js','/src/curriculum.js','/src/alphabet.js','/src/trace.js','/src/cloud.js','/icon.svg','/manifest.webmanifest','/logo-hebrew.svg','/src/letter-geometry.js','/src/motion.js','/src/install.js','/src/responsive.css','/apple-touch-icon.png','/icons/icon-192.png','/icons/icon-512.png','/fonts/binah-hebrew-regular.woff','/fonts/binah-hebrew-bold.woff'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
// Network first for our small static shell; offline fallback only. Auth/data never cached.
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 const pathname=new URL(event.request.url).pathname;if(!SHELL.includes(pathname))return;
 event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(event.request,copy)));}return response;}).catch(()=>caches.match(event.request)));
});
