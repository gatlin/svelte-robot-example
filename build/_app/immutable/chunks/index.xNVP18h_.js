import{n as a,j as m,k as w}from"./runtime.hdRyageX.js";import{s as q}from"./utils.TUtJbXSl.js";const f=[];function x(s,i){return{subscribe:z(s,i).subscribe}}function z(s,i=a){let n=null;const r=new Set;function u(t){if(w(s,t)&&(s=t,n)){const o=!f.length;for(const e of r)e[1](),f.push(e,s);if(o){for(let e=0;e<f.length;e+=2)f[e][0](f[e+1]);f.length=0}}}function l(t){u(t(s))}function b(t,o=a){const e=[t,o];return r.add(e),r.size===1&&(n=i(u,l)||a),t(s),()=>{r.delete(e),r.size===0&&n&&(n(),n=null)}}return{set:u,update:l,subscribe:b}}function k(s,i,n){const r=!Array.isArray(s),u=r?[s]:s;if(!u.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const l=i.length<2;return x(n,(b,t)=>{let o=!1;const e=[];let p=0,d=a;const y=()=>{if(p)return;d();const c=i(r?e[0]:e,b,t);l?b(c):d=typeof c=="function"?c:a},_=u.map((c,g)=>q(c,h=>{e[g]=h,p&=~(1<<g),o&&y()},()=>{p|=1<<g}));return o=!0,y(),function(){m(_),d(),o=!1}})}export{k as d,z as w};
