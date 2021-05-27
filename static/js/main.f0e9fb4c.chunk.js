(this.webpackJsonpverify=this.webpackJsonpverify||[]).push([[0],{103:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(10),i=n.n(c),o=n(15),s=n.n(o),l=n(23),d=n(22),j=n(132),u=n(131),p=n(31),b=n(124),h=n(127),m=n(134),f=n(128),x=n(129),g=n(126),O=n(26),v=n(130),y=n(2),w=Object(b.a)((function(e){return{root:{width:"100%",maxWidth:500,backgroundColor:e.palette.background.paper},dividerFullWidth:{margin:"5px 0 0 ".concat(e.spacing(2),"px")},dividerInset:{margin:"5px 0 0 ".concat(e.spacing(9),"px")},layout:Object(p.a)({width:"auto",marginLeft:e.spacing(2),marginRight:e.spacing(2)},e.breakpoints.up(600+2*e.spacing(2)),{width:600,marginLeft:"auto",marginRight:"auto"}),paper:Object(p.a)({marginTop:e.spacing(3),marginBottom:e.spacing(3),padding:e.spacing(2)},e.breakpoints.up(600+2*e.spacing(3)),{marginTop:e.spacing(6),marginBottom:e.spacing(6),padding:e.spacing(3)})}}));function _(e){var t=e.permit,n=e.locale;console.log(n);var r=w();return Object(y.jsx)("main",{className:r.layout,children:Object(y.jsxs)(g.a,{className:r.paper,children:[Object(y.jsx)(O.a,{component:"h4",variant:"h5",align:"center",children:"E-PERMIT VERIFICATION"}),Object(y.jsxs)(h.a,{className:r.root,children:[Object(y.jsx)(m.a,{children:Object(y.jsx)(f.a,{primary:Object(y.jsx)(j.a,{severity:"success",children:n.valid_signature_message})})}),Object(y.jsx)(x.a,{component:"li"}),Object(y.jsx)(m.a,{children:Object(y.jsx)(f.a,{primary:n.issuer_label,secondary:Object(y.jsx)("div",{className:r.root,children:Object(y.jsxs)(v.a,{container:!0,alignItems:"center",spacing:3,children:[Object(y.jsx)(v.a,{item:!0,children:Object(y.jsx)("img",{src:"/verify/flags/".concat(t.issuer,".svg"),width:"40",height:"25"})}),Object(y.jsx)(v.a,{item:!0,children:n["authority_name_"+t.issuer.toLowerCase()]})]})})})}),Object(y.jsx)(x.a,{component:"li"}),Object(y.jsx)(m.a,{children:Object(y.jsx)(f.a,{primary:n.issued_for_label,secondary:Object(y.jsx)("div",{className:r.root,children:Object(y.jsxs)(v.a,{container:!0,alignItems:"center",spacing:3,children:[Object(y.jsx)(v.a,{item:!0,children:Object(y.jsx)("img",{src:"/verify/flags/".concat(t.issued_for,".svg"),width:"40",height:"25"})}),Object(y.jsx)(v.a,{item:!0,children:n["authority_name_"+t.issued_for.toLowerCase()]})]})})})}),Object(y.jsx)(x.a,{component:"li"}),Object(y.jsx)(m.a,{children:Object(y.jsx)(f.a,{primary:n.issued_at_label,secondary:Object(y.jsx)("div",{className:r.root,children:t.issued_at})})}),Object(y.jsx)(x.a,{component:"li"}),Object(y.jsx)(m.a,{children:Object(y.jsx)(f.a,{primary:n.expire_at_label,secondary:Object(y.jsx)("div",{className:r.root,children:t.expire_at})})}),Object(y.jsx)(x.a,{component:"li"}),Object(y.jsx)(m.a,{children:Object(y.jsx)(f.a,{primary:n.permit_id_label,secondary:Object(y.jsx)("div",{className:r.root,children:t.id})})}),Object(y.jsx)(x.a,{component:"li"}),Object(y.jsx)(m.a,{children:Object(y.jsx)(f.a,{primary:n.permit_type_label,secondary:Object(y.jsx)("div",{className:r.root,children:n["permit_type_"+t.type+"_text"]})})}),Object(y.jsx)(x.a,{component:"li"}),Object(y.jsx)(m.a,{children:Object(y.jsx)(f.a,{primary:n.permit_year_label,secondary:Object(y.jsx)("div",{className:r.root,children:t.year})})}),Object(y.jsx)(x.a,{component:"li"}),Object(y.jsx)(m.a,{children:Object(y.jsx)(f.a,{primary:n.plate_number_label,secondary:Object(y.jsx)("div",{className:r.root,children:t.plate_number})})}),Object(y.jsx)(x.a,{component:"li"}),Object(y.jsx)(m.a,{children:Object(y.jsx)(f.a,{primary:n.company_name_label,secondary:Object(y.jsx)("div",{className:r.root,children:t.company_name})})})]})]})})}var k=n(46),N=new(n.n(k).a),S=n(97),W=n(102),C="/verify/authorities.json";function E(e){return I.apply(this,arguments)}function I(){return(I=Object(l.a)(s.a.mark((function e(t){var n,r,a,c,i,o,l,d,j,u,p,b,h,m,f,x,g,O,v;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/verify/schema.json");case 2:return n=e.sent,console.log(n),e.next=6,n.json();case 6:if(r=e.sent,(a=L(t,r)).ok){e.next=10;break}return e.abrupt("return",{ok:!1,errorCode:"invalid_format"});case 10:return c=a.version,i=a.header,o=a.payload,l=a.jws,d=A(o),e.next=14,fetch(C);case 14:return j=e.sent,e.next=17,j.json();case 17:return u=e.sent,p=u.authorities,b=T(c,p,d.issued_for),e.next=22,fetch(b);case 22:return h=e.sent,e.next=25,h.json();case 25:if(m=e.sent,f=R(m,d.issuer,i.kid),x=S.KEYUTIL.getKey(f.jwk),S.KJUR.jws.JWS.verify(l,x,[i.alg])){e.next=31;break}return e.abrupt("return",{ok:!1,errorCode:"invalid_signature"});case 31:return g=m.locale||"en",e.next=34,fetch("/verify/locale/".concat(g,".json"));case 34:return O=e.sent,e.next=37,O.json();case 37:return v=e.sent,e.abrupt("return",{ok:!0,permit:d,locale:v});case 39:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function L(e,t){var n=e.split("."),r=JSON.parse(W.decode(n[1])),a=JSON.parse(W.decode(n[2])),c=N.compile(t);return c({version:n[0],header:r,payload:a,sig:n[3]})?{ok:!0,version:n[0],payload:a,header:r,jws:"".concat(n[1],".").concat(n[2],".").concat(n[3])}:(console.log("Validation error"),console.error(c.errors),{ok:!1})}function R(e,t,n){var r=e.trusted_authorities.find((function(e){return e.code===t}));if(!r||0===Object.keys(r).length)return{ok:!1};var a=r.keys.find((function(e){return e.kid===n}));return a?{ok:!0,jwk:a}:{ok:!1}}function A(e){var t=e.id.split("-");return{id:e.id,issuer:t[0],issued_for:t[1],year:t[2],type:t[3],issued_at:e.iat,expire_at:e.exp,plate_number:e.pn,company_name:e.cn}}function T(e,t,n){var r,a=t.find((function(e){return e.code===n}));return"0"===e?r=a.demo_uri:"1"===e&&(r=a.uri),r}var J=function(){var e=Object(r.useState)(),t=Object(d.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(!0),i=Object(d.a)(c,2),o=i[0],p=i[1],b=Object(r.useState)(),h=Object(d.a)(b,2),m=h[0],f=h[1],x=Object(r.useState)(),g=Object(d.a)(x,2),O=g[0],v=g[1];function w(){return(w=Object(l.a)(s.a.mark((function e(){var t,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=window.location.hash.substring(1),e.next=4,E(t);case 4:(n=e.sent).ok?(v(n.locale),a(n.permit)):f(n.errorCode),p(!1),e.next=14;break;case 9:e.prev=9,e.t0=e.catch(0),console.error(e.t0),p(!1),f("An error has occured");case 14:case"end":return e.stop()}}),e,null,[[0,9]])})))).apply(this,arguments)}return Object(r.useEffect)((function(){return function(){return w.apply(this,arguments)}()}),[]),o?Object(y.jsx)(u.a,{}):n?Object(y.jsx)(_,{permit:n,locale:O}):Object(y.jsx)(j.a,{severity:"error",children:m})},U=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function B(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(Object(y.jsx)(a.a.StrictMode,{children:Object(y.jsx)(J,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/verify",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/verify","/service-worker.js");U?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):B(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):B(t,e)})),window.addEventListener("fetch",(function(e){console.log(e),e.respondWith(fetch(e.request).catch((function(){return caches.match(e.request)})))}))}}()}},[[103,1,2]]]);
//# sourceMappingURL=main.f0e9fb4c.chunk.js.map