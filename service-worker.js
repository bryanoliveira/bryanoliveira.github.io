!function(){"use strict";const s=1639422509907,t=`cache${s}`,i=["/client/client.5e4e0fb7.js","/client/inject_styles.5607aec6.js","/client/index.24433faf.js","/client/PostListItem.c8906f96.js","/client/index.d58c443c.js","/client/HorizontalNamePhoto.5bcfa7e1.js","/client/[slug].8d973d5b.js"].concat(["/service-worker-index.html","/css/bootstrap-grid.css","/css/bootstrap-grid.css.map","/css/bootstrap-grid.min.css","/css/bootstrap-grid.min.css.map","/css/bootstrap-reboot.css","/css/bootstrap-reboot.css.map","/css/bootstrap-reboot.min.css","/css/bootstrap-reboot.min.css.map","/css/bootstrap.css","/css/bootstrap.css.map","/css/bootstrap.min.css","/css/bootstrap.min.css.map","/css/fonts/merriweather-latin-300.woff","/css/fonts/merriweather-latin-300.woff2","/css/fonts/merriweather-latin-300italic.woff","/css/fonts/merriweather-latin-300italic.woff2","/css/fonts/merriweather-latin-400.woff","/css/fonts/merriweather-latin-400.woff2","/css/fonts/merriweather-latin-400italic.woff","/css/fonts/merriweather-latin-400italic.woff2","/css/fonts/merriweather-latin-700.woff","/css/fonts/merriweather-latin-700.woff2","/css/fonts/merriweather-latin-700italic.woff","/css/fonts/merriweather-latin-700italic.woff2","/css/fonts/merriweather-latin-900.woff","/css/fonts/merriweather-latin-900.woff2","/css/fonts/merriweather-latin-900italic.woff","/css/fonts/merriweather-latin-900italic.woff2","/css/fonts/rubik-latin-300.woff","/css/fonts/rubik-latin-300.woff2","/css/fonts/rubik-latin-300italic.woff","/css/fonts/rubik-latin-300italic.woff2","/css/fonts/rubik-latin-400.woff","/css/fonts/rubik-latin-400.woff2","/css/fonts/rubik-latin-400italic.woff","/css/fonts/rubik-latin-400italic.woff2","/css/fonts/rubik-latin-500.woff","/css/fonts/rubik-latin-500.woff2","/css/fonts/rubik-latin-500italic.woff","/css/fonts/rubik-latin-500italic.woff2","/css/fonts/rubik-latin-700.woff","/css/fonts/rubik-latin-700.woff2","/css/fonts/rubik-latin-700italic.woff","/css/fonts/rubik-latin-700italic.woff2","/css/fonts/rubik-latin-900.woff","/css/fonts/rubik-latin-900.woff2","/css/fonts/rubik-latin-900italic.woff","/css/fonts/rubik-latin-900italic.woff2","/css/fonts.css","/css/global.css","/img/bone.png","/img/cellular_automata.gif","/img/icon.png","/img/me.jpg","/img/pick.gif","/img/pulserl-architecture.png","/img/pulserl.png","/img/quack.png","/img/rigidbody_physics.gif","/img/soccer.gif","/img/vsss.png","/img/vsss_cover.gif","/img/zombit.png","/img/zombit_cover.gif","/img/zombit_game.gif","/img/zombit_monster.gif","/img/zombit_round_up.gif","/img/zombit_walter.gif","/js/bootstrap.bundle.js","/js/bootstrap.bundle.js.map","/js/bootstrap.bundle.min.js","/js/bootstrap.bundle.min.js.map","/js/bootstrap.js","/js/bootstrap.js.map","/js/bootstrap.min.js","/js/bootstrap.min.js.map","/manifest.json"]),o=new Set(i);self.addEventListener("install",(s=>{s.waitUntil(caches.open(t).then((s=>s.addAll(i))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(s=>{s.waitUntil(caches.keys().then((async s=>{for(const i of s)i!==t&&await caches.delete(i);self.clients.claim()})))})),self.addEventListener("fetch",(t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const i=new URL(t.request.url),a=i.protocol.startsWith("http"),e=i.hostname===self.location.hostname&&i.port!==self.location.port,n=i.host===self.location.host&&o.has(i.pathname),c="only-if-cached"===t.request.cache&&!n;!a||e||c||t.respondWith((async()=>n&&await caches.match(t.request)||async function(t){const i=await caches.open(`offline${s}`);try{const s=await fetch(t);return i.put(t,s.clone()),s}catch(s){const o=await i.match(t);if(o)return o;throw s}}(t.request))())}))}();
