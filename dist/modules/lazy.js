/**
 * method kxui
 * version 1.1.0
 * author Lkx
 * create time 2018.05.31
 * update time 2018.06.02
 * website http://www.kxui.org
 */

"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t){function e(e,o){var n={0:"容器 {"+o+"} 不存在",1:"当前页面未发现 <img> 标签"};console.warn("kxui-"+t.kxui.version+"： "+n[e]+"。")}var o="undefined"!=typeof module&&"object"===("undefined"==typeof module?"undefined":_typeof(module))&&"object"===_typeof(module.exports),n=function(t){this.parameter=t,this.threshold=this.parameter.threshold?Number(this.parameter.threshold):0,this.init()};n.prototype={init:function(){var e=this;t.kxui.method?(e.method=t.kxui.method,e.container()):t.kxui.use("method",function(){e.method=t.kxui.method,e.container()})},container:function(){var t=this;t.img=t.method.getDome("img"),t.containers=t.method.getDome(t.parameter.container),t.parameter.container&&!t.containers?e(0,t.parameter.container):t.img?this["static"]("number"==typeof t.img.length,"number"==typeof t.containers.length):e(1)},"static":function(t,e){var o=this;if(e){o.img=[];for(var n=0;n<o.containers.length;n++){o.img[n]={};for(var i=0,r=o.containers[n].childNodes,s=0;s<r.length;s++)"#text"===r[s].nodeName||/\s/.test(r.nodeValue)||(o.img[n][i]=r[s],o.img[n].lt=i+1,i+=1);o.showImg(t,!0,[o.containers[n],o.img[n]]),o.event(t,!0,[o.containers[n],o.img[n]])}}else o.showImg(t,!!o.containers),o.event(t,!!o.containers)},event:function(e,o,n){var i=this,r="object"===("undefined"==typeof n?"undefined":_typeof(n))?n[0]:i.containers?i.containers:t;r.onscroll=function(){i.showImg(e,o,n)}},showImg:function(t,e,o){var n="object"===("undefined"==typeof o?"undefined":_typeof(o)),i=n?o[1]:this.img,r=e?n?o[0].scrollTop:this.containers.scrollTop:document.documentElement.scrollTop||document.body.scrollTop,s=e?n?o[0].clientHeight:this.containers.clientHeight:document.documentElement.clientHeight||document.body.clientHeight;if(t){for(var c=0;c<i.length;c++)if(i[c].offsetTop-(e?i[c].parentNode.offsetTop:0)<=r+s+this.threshold&&i[c].offsetTop>=r-s-this.threshold){var f=this.method.attr(i[c],"kxui-lazy");this.method.attr(i[c],"src",f)}}else if(i.offsetTop-(e?i.parentNode.offsetTop:0)<=r+s+this.threshold&&i.offsetTop>=r-s-this.threshold){var a=this.method.attr(i,"kxui-lazy");this.method.attr(i,"src",a)}}};var i=function(){this.name="Lazy",this.info="Lazy loading of pictures"};i.fn=i.prototype,i.fn.load=function(t){this.logic=new n("object"===("undefined"==typeof t?"undefined":_typeof(t))?t:{}),delete this.logic},o?module.exports=new i:t.kxui.lazy=new i}(window);