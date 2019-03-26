/**
 * method kxui
 * version 1.3.3
 * author Lkx
 * create time 2018.05.31
 * update time 2019.03.26
 * website http://www.kxui.org
 */

"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){function t(){for(var e=document.scripts,t=e.length-1,i=t;i>=0;i--){var o=e[i].src.toLowerCase()||!1;if(o&&o.indexOf("kxui.js")>=0){e=e[i].src.substring(0,e[i].src.lastIndexOf("/")+1);break}}return e}function i(e,t,i,o){o="boolean"==typeof o?o:"boolean"==typeof i&&i,i="object"===("undefined"==typeof i?"undefined":_typeof(i))?i:"object"===("undefined"==typeof t?"undefined":_typeof(t))&&t;var n={0:"使用 {use} 不符合结构规范",1:"模块 {"+t+"} 不存在",2:"请勿重复调用 {"+t+") 模块",3:"未能找到 {body} 节点，无法加载 {"+t+"} 模块"};o?console.error("kxui-"+i.version+"： "+n[e]+"。"):console.warn("kxui-"+i.version+"： "+n[e]+"。")}var o=["method","countdown","drop"],n="undefined"!=typeof module&&"object"===("undefined"==typeof module?"undefined":_typeof(module))&&"object"===_typeof(module.exports),s=navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)?"mobile":"pc",u=function(e){this.kxui=e,this.module="string"==typeof this.kxui.module?[this.kxui.module]:"object"===_typeof(this.kxui.module)&&this.kxui.module,this.fun="function"==typeof this.kxui.fun&&this.kxui.fun,this.module&&this.fun?this.definition():i(0,this.kxui,!0)};u.prototype={definition:function(){this.loadLine=0,this.wheelSearch=0,this.domain=t(),this.mode()},mode:function(){n?this.imports():this.shunt()},imports:function(){require("./css/kxui.css");for(var e=0;e<this.module.length;e++)if(!this.kxui[this.module[e]]&&o.indexOf(this.module[e].toLowerCase())>=0){var t=this.module[e];this.kxui[t]=require("./modules/"+this.module[e])}else this.kxui[this.module[e]]?i(2,this.module[e],this.kxui):i(1,this.module[e],this.kxui);this.end()},shunt:function(){this.style(),o.indexOf(this.module[this.loadLine].toLowerCase())>=0?this.register(this.module[this.loadLine]):(i(1,this.module[this.loadLine],this.kxui),this.loop())},style:function(){var e=document.querySelector("head"),t=document.createElement("link");t.media="all",t.type="text/css",t.rel="stylesheet",t.href=this.domain+"css/kxui.css",e.appendChild(t)},register:function(e){this.kxui[e]?(i(2,e,this.kxui),this.loadLine<this.module.length-1?this.loop():this.end()):this.create(e)},create:function(e){var t=this,o=document.querySelector("body"),n=document.createElement("script");n.type="text/javascript",n.async="async",n.charset="utf-8",n.src=t.domain+"modules/"+e+".js",o?(o.appendChild(n),t.wait(o,n)):t.wheelSearch<10?setTimeout(function(){t.wheelSearch=t.wheelSearch+1,t.create(e)}):i(3,e,t.kxui,!0)},wait:function(e,t){var i=this;t.readyState?t.onreadystatechange=function(){"complete"!==t.readyState&&"loaded"!==t.readyState||(t.onreadystatechange=null,i.waitEnd(e,t))}:t.onload=function(){i.waitEnd(e,t)}},waitEnd:function(e,t){e.removeChild(t),this.loop()},loop:function(){this.loadLine=this.loadLine+1,this.module[this.loadLine]&&o.indexOf(this.module[this.loadLine].toLowerCase())>=0?this.register(this.module[this.loadLine]):this.loadLine<this.module.length-1?(i(1,this.module[this.loadLine],this.kxui),this.loop()):(this.module[this.loadLine]&&i(1,this.module[this.loadLine],this.kxui),this.end())},end:function(){this.fun("kxui-"+this.kxui.version)}};var d=function(){this.version="1.3.3",this.updateTime="2019.03.26"};d.prototype.use=function(e,t){this.module=e,this.fun=t,this.load=new u(this),delete this.module,delete this.fun,delete this.load},d.prototype.info=function(){return{domain:t(),device:s,version:this.version+" / "+this.updateTime,size:{cDocW:document.documentElement.clientWidth,cDocH:document.documentElement.clientHeight,tDocW:e.top.document.documentElement.clientWidth,tDocH:e.top.document.documentElement.clientHeight},document:{c:document,t:e.top.document}}},e.kxui=new d,n&&(e.kxui=module.exports=new d)}(window);