import{_ as t,a as n,b as r,c as a,i as o,d as e,S as s,s as c,y as f,z as i,A as u,x as l,B as h,C as m,g as v,e as p,t as g,E as $,k as d,l as E,h as b,j as y,r as B,m as R,o as j,p as x,F as H,D as P,G as k,H as w}from"./client.d18effa4.js";import{H as D}from"./HorizontalNamePhoto.bdc7198a.js";import{P as I}from"./PostListItem.37cf76dc.js";function O(t){var a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var o,e=n(t);if(a){var s=n(this).constructor;o=Reflect.construct(e,arguments,s)}else o=e.apply(this,arguments);return r(this,o)}}function z(t,n,r){var a=t.slice();return a[1]=n[r],a}function A(t){var n,r;return n=new I({props:{post:t[1]}}),{c:function(){f(n.$$.fragment)},l:function(t){i(n.$$.fragment,t)},m:function(t,a){u(n,t,a),r=!0},p:function(t,r){var a={};1&r&&(a.post=t[1]),n.$set(a)},i:function(t){r||(l(n.$$.fragment,t),r=!0)},o:function(t){h(n.$$.fragment,t),r=!1},d:function(t){m(n,t)}}}function F(t){for(var n,r,a,o,e,s,c,I,O,F,V,_,C,G,L,N=t[0],S=[],T=0;T<N.length;T+=1)S[T]=A(z(t,N,T));var q=function(t){return h(S[t],1,1,(function(){S[t]=null}))};return G=new D({}),{c:function(){n=v(),r=p("a"),a=g("« home"),o=v(),e=p("div"),s=p("h1"),c=g("Blog"),I=v(),O=p("div");for(var t=0;t<S.length;t+=1)S[t].c();F=v(),V=p("hr"),_=v(),C=p("footer"),f(G.$$.fragment),this.h()},l:function(t){$('[data-svelte="svelte-1w74l05"]',document.head).forEach(d),n=E(t),r=b(t,"A",{href:!0,class:!0,rel:!0});var f=y(r);a=B(f,"« home"),f.forEach(d),o=E(t),e=b(t,"DIV",{class:!0});var u=y(e);s=b(u,"H1",{class:!0});var l=y(s);c=B(l,"Blog"),l.forEach(d),u.forEach(d),I=E(t),O=b(t,"DIV",{});for(var h=y(O),m=0;m<S.length;m+=1)S[m].l(h);h.forEach(d),F=E(t),V=b(t,"HR",{}),_=E(t),C=b(t,"FOOTER",{class:!0});var v=y(C);i(G.$$.fragment,v),v.forEach(d),this.h()},h:function(){document.title="Blog",R(r,"href","/"),R(r,"class","back"),R(r,"rel","prefetch"),R(s,"class","mt-2"),R(e,"class","mt-5 mb-5 pb-3 text-center"),R(C,"class","text-center indicate_blank")},m:function(t,f){j(t,n,f),j(t,r,f),x(r,a),j(t,o,f),j(t,e,f),x(e,s),x(s,c),j(t,I,f),j(t,O,f);for(var i=0;i<S.length;i+=1)S[i].m(O,null);j(t,F,f),j(t,V,f),j(t,_,f),j(t,C,f),u(G,C,null),L=!0},p:function(t,n){var r=H(n,1)[0];if(1&r){var a;for(N=t[0],a=0;a<N.length;a+=1){var o=z(t,N,a);S[a]?(S[a].p(o,r),l(S[a],1)):(S[a]=A(o),S[a].c(),l(S[a],1),S[a].m(O,null))}for(w(),a=N.length;a<S.length;a+=1)q(a);P()}},i:function(t){if(!L){for(var n=0;n<N.length;n+=1)l(S[n]);l(G.$$.fragment,t),L=!0}},o:function(t){S=S.filter(Boolean);for(var n=0;n<S.length;n+=1)h(S[n]);h(G.$$.fragment,t),L=!1},d:function(t){t&&d(n),t&&d(r),t&&d(o),t&&d(e),t&&d(I),t&&d(O),k(S,t),t&&d(F),t&&d(V),t&&d(_),t&&d(C),m(G)}}}function V(){return this.fetch("blog.json").then((function(t){return t.json()})).then((function(t){return{posts:t}}))}function _(t,n,r){var a=n.posts;return t.$$set=function(t){"posts"in t&&r(0,a=t.posts)},[a]}var C=function(n){t(f,s);var r=O(f);function f(t){var n;return a(this,f),n=r.call(this),o(e(n),t,_,F,c,{posts:0}),n}return f}();export default C;export{V as preload};
