(this.webpackJsonpverify=this.webpackJsonpverify||[]).push([[0],{127:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),i=a(13),c=a.n(i),o=a(8),s=a.n(o),l=a(9),u=a(18),d=a(14),p=a(36),m={authority:{},changes:[],revocations:[],credential:{}};function y(e,t){switch(t.type){case"reset":return m;case"init":return Object(d.a)({},t.state);case"login":return Object(d.a)(Object(d.a)({},e),{},{authority:t.authority});case"addChange":return Object(d.a)(Object(d.a)({},e),{},{changes:t.change});case"removeChanges":return Object(d.a)(Object(d.a)({},e),{},{changes:[]});default:return m}}var f=Object(r.createContext)({state:m,dispatch:function(){return null}}),g=function(e){var t=e.children,a=Object(r.useReducer)(y,m),i=Object(u.a)(a,2),c=i[0],o=i[1];return Object(r.useEffect)((function(){function e(){return(e=Object(l.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.a)("state");case 2:(t=e.sent)&&0!==Object.keys(t.authority)&&o({type:"reset",state:t});case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(r.useEffect)((function(){Object(p.b)("state",c)}),[c]),n.a.createElement(f.Provider,{value:{state:c,dispatch:o}},t)},h=a(149),E=a(30),b=a(128),v=a(151),w=a(164),k=a(153),x=a(154),j=a(152),O=a(165),_=[{id:"tr",uri:"./tr.json",title:"Republic Of Turkey"},{id:"ua",uri:"./ua.json",title:"Ukraine"}],N=Object(h.a)((function(e){return{text:{padding:e.spacing(2,2,0)},paper:{paddingBottom:50},list:{marginBottom:e.spacing(2)},subheader:{backgroundColor:e.palette.background.paper},grow:{flexGrow:1}}}));function C(){var e=N(),t=n.a.useContext(f).dispatch;return n.a.createElement(b.a,{square:!0,className:e.paper},n.a.createElement(E.a,{className:e.text,variant:"h5",gutterBottom:!0},"Authorities"),n.a.createElement(v.a,{className:e.list},n.a.createElement(j.a,{className:e.subheader},"-- Select Authority --"),_.map((function(e){var a=e.id,r=e.uri,i=e.title;return n.a.createElement(n.a.Fragment,{key:a},n.a.createElement(w.a,{button:!0,onClick:Object(l.a)(s.a.mark((function e(){var a,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=8;break}return e.next=3,fetch(r);case 3:return a=e.sent,e.next=6,a.json();case 6:n=e.sent,t({type:"login",authority:n});case 8:case"end":return e.stop()}}),e)})))},n.a.createElement(k.a,null,n.a.createElement(O.a,{alt:"Flag",src:"https://www.countryflags.io/".concat(a,"/flat/64.png")})),n.a.createElement(x.a,{primary:i})))})))," ")}var S=a(160),B=a(159),W=a(161),F=a(155),D=a(162),V=a(59),J=a.n(V),A=a(55),I=a.n(A),R=a(57),U=a.n(R),q=a(58),L=a.t(q,2),T=a(118),K=a(123),P=new U.a;function G(e,t,a){return M.apply(this,arguments)}function M(){return(M=Object(l.a)(s.a.mark((function e(t,a,r){var n,i,c,o,l,u,d,p,m;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=P.compile(L),n(t)){e.next=5;break}return console.log(n.errors),e.abrupt("return",{isValid:!1,errorCode:"invalid_cred"});case 5:if(t.payload.aud===a.id||t.payload.iss===a.id){e.next=7;break}return e.abrupt("return",{isValid:!1,errorCode:"invalid_aud"});case 7:if(!(Math.floor(Date.now()/1e3)>=t.payload.exp)){e.next=10;break}return e.abrupt("return",{isValid:!1,errorCode:"invalid_exp"});case 10:if((i=a.authorities.find((function(e){return e.id===t.payload.iss})))&&0!==Object.keys(i).length){e.next=13;break}return e.abrupt("return",{isValid:!1,errorCode:"iss_notfound"});case 13:if((c=i.keys.find((function(e){return e.kid===t.header.kid})))&&0!==Object.keys(c).length){e.next=16;break}return e.abrupt("return",{isValid:!1,errorCode:"jwk_notfound"});case 16:if(o=T.KEYUTIL.getKey(c),l=K.encode(JSON.stringify(t.header)),u=K.encode(JSON.stringify(t.payload)),d=t.sig,p="".concat(l,".").concat(u,".").concat(d),T.KJUR.jws.JWS.verify(p,o,[t.header.alg])){e.next=24;break}return e.abrupt("return",{isValid:!1,errorCode:"invalid_signature"});case 24:if(!r.some((function(e){return e.cred_id===t.payload.cred_id}))){e.next=26;break}return e.abrupt("return",{isValid:!1,errorCode:"revoked_cred"});case 26:return m=$(t.payload,a),e.abrupt("return",{isValid:!0,cred:m});case 28:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function $(e,t){var a=new Date(1e3*e.iat).toLocaleDateString(),r=new Date(1e3*e.exp).toLocaleDateString(),n=t.authorities.find((function(t){return t.id===e.iss})),i=t.authorities.find((function(t){return t.id===e.aud})),c={iatDate:a,expDate:r,issuer_code:n.id,issuer_name:n.title,verifier_code:i.id,verifier_name:i.title,sub:e.sub,cred_id:e.cid,cred_type:t.titles["ct_"+e.ct],cred_year:e.cy,org_id:e.oid};return e.on&&(c.org_name=e.on),e.res&&(c.restrictions=e.res),c}var z=a(163),Y=a(156),H=a(157),Q=Object(h.a)((function(e){return{root:{width:"100%",maxWidth:500,backgroundColor:e.palette.background.paper},dividerFullWidth:{margin:"5px 0 0 ".concat(e.spacing(2),"px")},dividerInset:{margin:"5px 0 0 ".concat(e.spacing(9),"px")}}}));function X(e){var t=Q();return n.a.createElement(v.a,{className:t.root},n.a.createElement(w.a,null,n.a.createElement(x.a,{primary:n.a.createElement(z.a,{severity:"success"},e.authority.titles.valid_signature_message)})),n.a.createElement(Y.a,{component:"li"}),n.a.createElement(w.a,null,n.a.createElement(x.a,{primary:e.authority.titles.iss,secondary:n.a.createElement("div",{className:t.root},n.a.createElement(H.a,{container:!0,alignItems:"center",spacing:3},n.a.createElement(H.a,{item:!0},n.a.createElement("img",{alt:"Flag",src:"https://www.countryflags.io/".concat(e.cred.issuer_code,"/flat/32.png")})),n.a.createElement(H.a,{item:!0},e.cred.issuer_name)))})),n.a.createElement(Y.a,{component:"li"}),n.a.createElement(w.a,null,n.a.createElement(x.a,{primary:e.authority.titles.aud,secondary:n.a.createElement("div",{className:t.root},n.a.createElement(H.a,{container:!0,alignItems:"center",spacing:3},n.a.createElement(H.a,{item:!0},n.a.createElement("img",{alt:"Flag",src:"https://www.countryflags.io/".concat(e.cred.verifier_code,"/flat/32.png")})),n.a.createElement(H.a,{item:!0},e.cred.verifier_name)))})),n.a.createElement(Y.a,{component:"li"}),n.a.createElement(w.a,null,n.a.createElement(x.a,{primary:e.authority.titles.iat,secondary:n.a.createElement("div",{className:t.root},e.cred.iatDate)})),n.a.createElement(Y.a,{component:"li"}),n.a.createElement(w.a,null,n.a.createElement(x.a,{primary:e.authority.titles.exp,secondary:n.a.createElement("div",{className:t.root},e.cred.expDate)})),n.a.createElement(Y.a,{component:"li"}),n.a.createElement(w.a,null,n.a.createElement(x.a,{primary:e.authority.titles.sub,secondary:n.a.createElement("div",{className:t.root},e.cred.sub)})),n.a.createElement(Y.a,{component:"li"}),n.a.createElement(w.a,null,n.a.createElement(x.a,{primary:e.authority.titles.ct,secondary:n.a.createElement("div",{className:t.root},e.cred.cred_type)})),n.a.createElement(Y.a,{component:"li"}),n.a.createElement(w.a,null,n.a.createElement(x.a,{primary:e.authority.titles.cy,secondary:n.a.createElement("div",{className:t.root},e.cred.cred_year)})),n.a.createElement(Y.a,{component:"li"}),n.a.createElement(w.a,null,n.a.createElement(x.a,{primary:e.authority.titles.cid,secondary:n.a.createElement("div",{className:t.root},e.cred.cred_id)})),n.a.createElement(Y.a,{component:"li"}),n.a.createElement(w.a,null,n.a.createElement(x.a,{primary:e.authority.titles.oid,secondary:n.a.createElement("div",{className:t.root},e.cred.org_id)})),e.cred.org_name&&n.a.createElement(n.a.Fragment,null," ",n.a.createElement(Y.a,{component:"li"}),n.a.createElement(w.a,null,n.a.createElement(x.a,{primary:e.authority.titles.on,secondary:n.a.createElement("div",{className:t.root},e.cred.org_name)}))),e.cred.restrictions&&n.a.createElement(n.a.Fragment,null," ",n.a.createElement(Y.a,{component:"li"}),n.a.createElement(w.a,null,n.a.createElement(x.a,{primary:e.authority.titles.res,secondary:n.a.createElement("div",{className:t.root},e.cred.restrictions)}))))}var Z=a(158);function ee(e){var t=Object(r.useState)(),a=Object(u.a)(t,2),i=a[0],c=a[1];return Object(r.useEffect)((function(){function t(){return(t=Object(l.a)(s.a.mark((function t(){var a;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,G(JSON.parse(e.data),e.authority,e.revocations);case 2:a=t.sent,c(a);case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[e]),i?i.isValid?n.a.createElement(X,{cred:i.cred,authority:e.authority}):n.a.createElement(z.a,{severity:"error"},e.authority.titles.invalid_signature_message):n.a.createElement(Z.a,null)}var te=Object(h.a)((function(e){return{text:{padding:e.spacing(2,2,0)},paper:{paddingBottom:50},list:{marginBottom:e.spacing(2)},subheader:{backgroundColor:e.palette.background.paper},appBar:{top:"auto",bottom:0},grow:{flexGrow:1},fabButton:{position:"absolute",zIndex:1,top:-30,left:0,right:0,margin:"0 auto"}}}));function ae(){var e=te(),t=n.a.useContext(f).state,a=Object(r.useState)({page:"scan",data:""}),i=Object(u.a)(a,2),c=i[0],o=i[1];function d(){return(d=Object(l.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t&&o({page:"result",data:t});case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return n.a.createElement(n.a.Fragment,null,n.a.createElement(B.a,null),n.a.createElement(b.a,{square:!0,variant:"outlined",className:e.paper},"result"===c.page?n.a.createElement(ee,{data:c.data,authority:t.authority,revocations:t.revocations}):n.a.createElement(I.a,{delay:300,onError:function(e){console.error(e)},onScan:function(e){return d.apply(this,arguments)},style:{width:"100%"}})),n.a.createElement(S.a,{position:"fixed",color:"primary",className:e.appBar},n.a.createElement(W.a,null,n.a.createElement(F.a,{edge:"start",color:"inherit","aria-label":"open drawer"},n.a.createElement("img",{alt:"Flag",src:"https://www.countryflags.io/".concat(t.authority.id,"/flat/32.png")})),t.authority.title,0!==Object.keys(t.authority).length&&n.a.createElement(D.a,{color:"secondary","aria-label":"add",className:e.fabButton,onClick:function(){o({page:"scan",data:""})}},n.a.createElement(J.a,null)))))}function re(){var e=n.a.useContext(f).state;return console.log(e),n.a.createElement(n.a.Fragment,null,0===Object.keys(e.authority).length?n.a.createElement(C,null):n.a.createElement(ae,null))}var ne=function(){return n.a.createElement(g,null,n.a.createElement(re,null))},ie=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ce(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}c.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(ne,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/verify",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/verify","/service-worker.js");ie?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var r=a.headers.get("content-type");404===a.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):ce(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):ce(t,e)}))}}()},58:function(e){e.exports=JSON.parse('{"type":"object","properties":{"header":{"type":"object","properties":{"alg":{"type":"string","enum":["ES256"]},"kid":{"type":"string"}},"required":["alg","kid"]},"payload":{"type":"object","properties":{"iss":{"type":"string"},"aud":{"type":"string"},"sub":{"type":"string"},"exp":{"type":"number"},"iat":{"type":"number"},"ct":{"type":"string","enum":["biliteral","transit","3rdcountry"]},"cid":{"type":"string"},"cy":{"type":"string","pattern":"^\\\\d{4}$"},"oid":{"type":"string"},"on":{"type":"string"},"res":{"type":"string"}},"required":["iss","aud","sub","exp","iat","ct","cid","cy","oid"]},"sig":{"type":"string"}},"required":["header","payload","sig"]}')},71:function(e,t,a){e.exports=a(127)}},[[71,1,2]]]);
//# sourceMappingURL=main.f8ed9a79.chunk.js.map