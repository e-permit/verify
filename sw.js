if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let o={};const d=e=>n(e,c),t={module:{uri:c},exports:o,require:d};s[c]=Promise.all(i.map((e=>t[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-f5523f08"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-CnyaKZGJ.js",revision:null},{url:"assets/index-NkavRjIv.css",revision:null},{url:"assets/workbox-window.prod.es5-D5gOYdM7.js",revision:null},{url:"favicon.svg",revision:"c23dbc3fa77f506cdd8118e146fe5f3b"},{url:"index.html",revision:"fe4bda4f52097b35faedb869c7c8e5dd"},{url:"manifest.json",revision:"d331caf2982ad5d1945c7391e536a91e"},{url:"manifest.webmanifest",revision:"643b54717894664d701d2bbc9bc4703d"},{url:"p-192x192.png",revision:"493e98637e3eaee9c7e45a1b68c08967"},{url:"p-512x512.png",revision:"d041b3a9381511c758cc92092eb89b66"},{url:"truck-towards-left.png",revision:"a913407ebcf11698aea71313e3885d82"},{url:"favicon.svg",revision:"c23dbc3fa77f506cdd8118e146fe5f3b"},{url:"p-192x192.png",revision:"493e98637e3eaee9c7e45a1b68c08967"},{url:"p-512x512.png",revision:"d041b3a9381511c758cc92092eb89b66"},{url:"truck-towards-left.png",revision:"a913407ebcf11698aea71313e3885d82"},{url:"manifest.webmanifest",revision:"643b54717894664d701d2bbc9bc4703d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute((({url:e})=>!0),new e.CacheFirst({cacheName:"all",plugins:[new e.ExpirationPlugin({maxAgeSeconds:86400}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
