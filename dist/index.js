"use strict";const s=require("fs"),e=require("path");function t(s){let e={};return s.split("\n").forEach((s=>{const t=s.split("=");t[0].trim()&&(e[t[0].trim()]=t[1].trim())})),e}module.exports=class{constructor(s){this.options=s}apply(o,n){console.log("webpack-env-plugin 启动...."),console.log(n);const c=this.options.env||"NODE_ENV",i=this.options.envPath||"",r=process.env[c]||"",l=s.readFileSync(e.resolve(process.cwd(),i,`./${r}.env`),"utf-8");o.hooks.emit.tap("MyPlugin",(s=>{const e=s.assets;for(let s in e){if((this.options.test||/\.(ts(x)?|js(x)?)$/).test(s)){const o=t(l),n=Object.keys(o).length;console.log("length:",n),n>0&&Object.keys(o).forEach((t=>{const n=new RegExp("process.env."+t,"g"),c=e[s].source().replace(n,o[t]);e[s]={source:()=>c,size:()=>c.length}}))}}}))}};
