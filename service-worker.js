!function(){"use strict";const s=1617766099482,t=`cache${s}`,e=["/client/client.d4540dd0.js","/client/inject_styles.5607aec6.js","/client/index.850e38af.js","/client/index.9e0981ae.js","/client/[slug].70df17ff.js"].concat(["/service-worker-index.html","/css/bootstrap-grid.css","/css/bootstrap-grid.css.map","/css/bootstrap-grid.min.css","/css/bootstrap-grid.min.css.map","/css/bootstrap-reboot.css","/css/bootstrap-reboot.css.map","/css/bootstrap-reboot.min.css","/css/bootstrap-reboot.min.css.map","/css/bootstrap.css","/css/bootstrap.css.map","/css/bootstrap.min.css","/css/bootstrap.min.css.map","/css/cover.css","/css/global.css","/img/bone.png","/img/cellular_automata.gif","/img/icon.png","/img/me.jpg","/img/pick.gif","/img/quack.png","/img/rigidbody_physics.gif","/img/vsss.png","/img/zombit.png","/js/bootstrap.bundle.js","/js/bootstrap.bundle.js.map","/js/bootstrap.bundle.min.js","/js/bootstrap.bundle.min.js.map","/js/bootstrap.js","/js/bootstrap.js.map","/js/bootstrap.min.js","/js/bootstrap.min.js.map","/manifest.json"]),o=new Set(e);self.addEventListener("install",(s=>{s.waitUntil(caches.open(t).then((s=>s.addAll(e))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(s=>{s.waitUntil(caches.keys().then((async s=>{for(const e of s)e!==t&&await caches.delete(e);self.clients.claim()})))})),self.addEventListener("fetch",(t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const e=new URL(t.request.url),a=e.protocol.startsWith("http"),c=e.hostname===self.location.hostname&&e.port!==self.location.port,n=e.host===self.location.host&&o.has(e.pathname),i="only-if-cached"===t.request.cache&&!n;!a||c||i||t.respondWith((async()=>n&&await caches.match(t.request)||async function(t){const e=await caches.open(`offline${s}`);try{const s=await fetch(t);return e.put(t,s.clone()),s}catch(s){const o=await e.match(t);if(o)return o;throw s}}(t.request))())}))}();
