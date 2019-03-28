/**
 * method kxui
 * version 1.3.5
 * author Lkx
 * create time 2018.05.31
 * update time 2019.03.28
 * website http://www.kxui.org
 */

"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t){function e(t,e,r){var o={0:"方法 {"+e+"} 必填字段 {"+r+"} 不能为空",1:"DOM {"+e+"} 存在重复或不正确"};console.warn("kxui-"+n.version+"： 模块 {method} "+o[t]+"。")}var n=t.kxui,r="undefined"!=typeof module&&"object"===("undefined"==typeof module?"undefined":_typeof(module))&&"object"===_typeof(module.exports),o=function(){this.name="Method",this.info="Integration of development methods"};o.fn=o.prototype,o.fn.urlData=function(n){if(n){var r=t.location.search.match(new RegExp("[\\?\\&]"+n+"=([^\\&]+)","i"));return!r||r.length<1?"":r[1]}e(0,"urlData","data")},o.fn.repStr=function(t,n,r){return r=r||"",t&&(n||0===n)?(t=String(t),String(t).replace(new RegExp(n,"g"),r)):void e(0,"repStr",t?"app":"str")},o.fn.chaStr=function(t,n,r){if(t=String(t),n=Number(n)||0,r=r||0,t){var o=0,a=t.substr(o,n),i=t.substr(n+1,t.length),s=a+r+i;return s}e(0,"chaStr","str")},o.fn.insStr=function(t,n,r){if(t&&n&&r){t=String(t);var o=t.split(n);return"number"==typeof n?t.slice(0,n)+r+t.slice(n):("string"==typeof n&&o.length>1&&(o[1]=r+o[1],t=o.join(n)),t)}e(0,"insStr",t?n?"app":"after":"str")},o.fn.queStr=function(t,n,r){if(t&&n){t=String(t);var o="boolean"!=typeof r||r,a=o?t.match(new RegExp(n+"(\\S*)")):t.match(new RegExp("(\\S*)"+n));return!a||a.length<1?"":a[1]}e(0,"queStr",t?"app":"str")},o.fn.midStr=function(t,n,r){if(t&&n&&r){t=String(t);var o=t.match(new RegExp(n+"(\\S*)"+r));return!o||o.length<1?"":o[1]}e(0,"midStr",t?n?"aft":"fro":"str")},o.fn.sortArr=function(t,n){if(t){var r=[];n="boolean"!=typeof n||n;for(var o=0;o<t.length-1;o++){for(var a=!0,i=0;i<t.length-1-o;i++){var s=n?t[i]>t[i+1]:t[i]<t[i+1];s&&(r=t[i],t[i]=t[i+1],t[i+1]=r,a=!1)}if(a)break}return t}e(0,"sortArr","arr")},o.fn.delRepArr=function(t){return t?Array.from(new Set(t)):void e(0,"delRepStr","arr")},o.fn.countArr=function(t,n){if(t&&n){for(var r=0,o=0,a=t.length;o<a;o++)n==t[o]&&r++;return r}e(0,"countArr",t?"ele":"arr")},o.fn.formTest=function(t,n){if(t&&n){var r={};return r.num=/^\d+$/,r.phone=/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,r.id=/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i,r.email=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,!(!r[n]||!r[n].test(t))}e(0,"formTest",t?"reg":"data")},o.fn.hasClass=function(t,n){return t&&n?(t=this.getDom(t),0!==n.replace(/\s/g,"").length&&new RegExp(" "+n+" ").test(" "+t.className+" ")):void e(0,"hasClass",t?"cls":"dom")},o.fn.addClass=function(t,n){return t&&n?(t=this.getDom(t),!this.hasClass(t,n)&&(t.className=""===t.className?n:t.className+" "+n,!0)):void e(0,"addClass",t?"cls":"dom")},o.fn.delClass=function(t,n){if(t&&n){if(t=this.getDom(t),this.hasClass(t,n)){for(var r=" "+t.className.replace(/[\t\r\n]/g,"")+" ";r.indexOf(" "+n+" ")>=0;)r=r.replace(" "+n+" "," ");return t.className=r.replace(/^\s+|\s+$/g,""),!0}return!1}e(0,"delClass",t?"cls":"dom")},o.fn.setCache=function(t,n,r){if(t&&n){localStorage.setItem(t,n);var o=parseInt(r);if(o>0){var a=this.dateGet()+o;localStorage.setItem(t+" (method.time)",a)}return!0}e(0,"setCache",t?"val":"key")},o.fn.getCache=function(t){if(t){var n=localStorage.getItem(t),r=parseInt(localStorage.getItem(t+" (method.time)"));return r&&r<this.dateGet()?(this.delCache(t),!1):String(n)}e(0,"getCache","key")},o.fn.delCache=function(t){return t?(localStorage.removeItem(t),localStorage.removeItem(t+" (method.time)"),!0):void e(0,"delCache","key")},o.fn.setCookie=function(t,n,r){if(t&&n){var o=new Date;return o.setDate(o.getDate()+r),document.cookie=t+"="+n+";expires="+o,!0}e(0,"setCookie",t?"val":"key")},o.fn.getCookie=function(t){if(t){for(var n=document.cookie.split("; "),r=0;r<n.length;r++){var o=n[r].split("=");if(o[0]===t)return o[1]}return!1}e(0,"getCookie","key")},o.fn.delCookie=function(t){return t?(this.setCookie(t,1,-1),!0):void e(0,"delCookie","key")},o.fn.compare=function(t,n,r){if(t&&n){var o=Object.getOwnPropertyNames(t),a=Object.getOwnPropertyNames(n);if(o.length!==a.length)return!1;for(var i=0;i<o.length;i++){var s=o[i];if(t[s]!==n[s])return!1}return!0}"noThrows"!==r&&e(0,"compare",t?"dataTwo":"dataOne")},o.fn.setHis=function(t,n){if(t){var r=parseInt(n)||6,o=this.getCache("(method.history)"),a=[];if(o&&o.length>0){a=JSON.parse(o);for(var i=null,s=null,f=a.length<r?a.length+1:a.length,u=0;u<f;u++){if(this.compare(a[u],t,"noThrows"))return a;0===u?(i=a[u],a[u]=t):(s=a[u],a[u]=i,i=s)}}else a[0]=t;return this.setCache("(method.history)",JSON.stringify(a)),a}e(0,"setHis","data")},o.fn.getHis=function(){var t=this.getCache("(method.history)");return!!t&&JSON.parse(t)},o.fn.delHis=function(){return this.delCache("(method.history)")},o.fn.dateGet=function(t){t="boolean"!=typeof t||t;var e=t?Date.parse(new Date):Number(Date.parse(new Date).toString().substr(0,10));return e},o.fn.dateAppoint=function(t){if(t){var n=new Date;return n.setFullYear(t.substring(0,4)),n.setMonth(t.substring(5,7)-1),n.setDate(t.substring(8,10)),n.setHours(t.substring(11,13)),n.setMinutes(t.substring(14,16)),n.setSeconds(t.substring(17,19)),Date.parse(n)/1e3}e(0,"dateAppoint","time")},o.fn.dateTurn=function(t,n,r){if(t){var o=new Date(13===t.toString().length?t:1e3*t),a=n?String(n):"-",i="boolean"!=typeof r||r,s=o.getFullYear(),f=o.getMonth()+1<10?"0"+(o.getMonth()+1):o.getMonth()+1,u=1===o.getDate().toString().length?"0"+o.getDate():o.getDate(),c=1===o.getHours().toString().length?"0"+o.getHours():o.getHours(),l=1===o.getMinutes().toString().length?"0"+o.getMinutes():o.getMinutes(),d=1===o.getSeconds().toString().length?"0"+o.getSeconds():o.getSeconds();return s+a+f+a+u+(i?" "+c+":"+l+":"+d:"")}e(0,"dateTurn","tamp")},o.fn.dateChina=function(t){if(t){var n=6e4,r=60*n,o=24*r,a=this.dateGet(),i=a-(13===String(t).length?t:1e3*t);if(i<0)return;var s=i/n,f=i/r,u=i/o,c=null;return c=s>=1&&s<60?" "+parseInt(s)+" 分钟前":f>=1&&f<24?" "+parseInt(f)+" 小时前":u>=1&&u<2?"昨天":u>=2&&u<3?"前天":u>=3&&u<30?" "+parseInt(u)+" 天前":u>=30?this.dateTurn(t,"-",!1):"刚刚"}e(0,"dateChina","tamp")},o.fn.getDom=function(n,r){r="boolean"==typeof r&&r;var o=function(){return"object"===("undefined"==typeof n?"undefined":_typeof(n))?n:"string"==typeof n?(n=r?t.top.document.querySelectorAll(n):document.querySelectorAll(n),1===n.length?n[0]:0!==n.length&&n):void 0};if(n)try{return n instanceof jQuery?n[0]:o()}catch(a){return o()}e(0,"getDom","dom")},o.fn.addDom=function(t){if(t){var n=document.createElement("div");return n.innerHTML=t,n.childNodes[0]}e(0,"addDom","str")},o.fn.atrDom=function(t,n,r){if(t&&n){if(t=this.getDom(t),t.length)e(1,t);else{if(n&&"string"==typeof n&&r)return t.setAttribute(n,r),!0;if(n&&"string"==typeof n)return t.getAttribute(n)}return!1}e(0,"atrDom",t?"key":"dom")},o.fn.sonDom=function(t){if(t){t=this.getDom(t);var n=t.childNodes;if(n){for(var r=[],o=0;o<n.length;o++)(3!==n[o].nodeType||"#text"!==n[o].nodeName||/\S/.test(n[o].nodeValue))&&r.push(n[o]);return r}return!1}e(0,"sonDom","dom")},o.fn.sonQueDom=function(t,n){function r(t){for(var e=0;e<t.length;e++)"#"+t[e].id===n||"."+t[e].className===n||t[e].tagName===n.toUpperCase()?(a.push(t[e]),o.sonDom(t[e]).length>0&&r(o.sonDom(t[e]))):o.sonDom(t[e]).length>0&&r(o.sonDom(t[e]))}var o=this,a=[];return t&&n?(t=o.getDom(t),r(o.sonDom(t)),a):void e(0,"sonQueDom",t?"dom":"father")},o.fn.random=function(t){if(t){t=Number(t);for(var n="";n.length<t;n+=Math.random().toString(36).substr(2));return str.substr(0,t)}e(0,"random","len")},o.fn.randomNum=function(t,e){return 2===arguments.length?Math.round(t+Math.random()*(e-t)):1===arguments.length?Math.round(Math.random()*t):Math.round(255*Math.random())},o.fn.randomColor=function(t){return t="boolean"!=typeof t||t,t?"rgb("+this.randomNum(255)+","+this.randomNum(255)+","+this.randomNum(255)+")":"#"+Math.random().toString(16).substring(2).substr(0,6)},o.fn.mouse=function(e){var r=e||t.event,o=0,a=0;if("pc"===n.info().device)if(r.pageX)o=r.pageX,a=r.pageY;else{var i=0,s=0;document.documentElement?(s=document.documentElement.scrollTop,i=document.documentElement.scrollLeft):(s=document.body.scrollTop,i=document.body.scrollLeft),o=r.clientX+i,a=r.clientY+s}else{var f=e.changedTouches[0];o=Number(f.pageX),a=Number(f.pageY)}return{x:o,y:a}},o.fn.accAdd=function(t,n){if(t&&n){var r=void 0,o=void 0,a=void 0;try{r=t.toString().split(".")[1].length}catch(i){r=0}try{o=n.toString().split(".")[1].length}catch(i){o=0}return a=Math.pow(10,Math.max(r,o)),(t*a+n*a)/a}e(0,"accAdd",t?"b":"a")},o.fn.accSub=function(t,n){if(t&&n){var r=void 0,o=void 0,a=void 0,i=void 0;try{r=t.toString().split(".")[1].length}catch(s){r=0}try{o=n.toString().split(".")[1].length}catch(s){o=0}return a=Math.pow(10,Math.max(r,o)),i=r>=o?r:o,((t*a-n*a)/a).toFixed(i)}e(0,"accSub",t?"b":"a")},o.fn.accMul=function(t,n){if(t&&n){var r=0,o=t.toString(),a=n.toString();try{r+=o.split(".")[1].length}catch(i){}try{r+=a.split(".")[1].length}catch(i){}return Number(o.replace(".",""))*Number(a.replace(".",""))/Math.pow(10,r)}e(0,"accMul",t?"b":"a")},o.fn.accDiv=function(t,n){if(t&&n){var r=0,o=0,a=void 0,i=void 0;try{r=t.toString().split(".")[1].length}catch(s){}try{o=n.toString().split(".")[1].length}catch(s){}return a=Number(t.toString().replace(".","")),i=Number(n.toString().replace(".","")),a/i*Math.pow(10,o-r)}e(0,"accDiv",t?"b":"a")},o.fn.middle=function(n){if(n){var r=this,o=this.getDom(n),a=o.offsetWidth,i=o.offsetHeight,s=t.innerWidth,f=t.innerHeight,u=(s-a)/2,c=(f-i)/2;o.style.left=u+"px",o.style.top=c+"px",t.onresize=function(){r.middle(n)}}else e(0,"middle","dom")},o.fn.decimal=function(t,n){if(n=n||0,t){var r=parseFloat(t);return isNaN(r)?0:Number(t.toFixed(n))}e(0,"decimal","num")},o.fn.money=function(t){return t?parseFloat(t).toFixed(2).replace(/\d(?=(?:\d{3})+\b)/g,"$&,"):void e(0,"money","str")},o.fn.bankCard=function(t){if(t){t=String(t);var n=t.replace(/\d(?=(?:\d{4})+\b)/g,"$& ");return n}e(0,"bankCard","str")},o.fn.aniScroll=function(t,e){var n=this;clearInterval(this.getCache("(method.aniScroll)")),e=!!e&&this.getDom(e);var r=setInterval(function(){var r=e?e.scrollTop:document.documentElement.scrollTop||document.body.scrollTop,o=t>r?t-r:r-t,a=Math.ceil(o/10);parseInt(r)===parseInt(t)?clearInterval(n.getCache("(method.aniScroll)")):e?e.scrollTo(0,t>r?r+a:r-a):window.scrollTo(0,t>r?r+a:r-a)},10);this.setCache("(method.aniScroll)",r)},o.fn.stopProp=function(t){t&&t.stopPropagation?t.stopPropagation():window.event.cancelBubble=!0},o.fn.utf8=function(t){if(t){var n=void 0,r=void 0,o=void 0,a=void 0;for(n="",o=t.length,r=0;r<o;r++)a=t.charCodeAt(r),a>=1&&a<=127?n+=t.charAt(r):a>2047?(n+=String.fromCharCode(224|a>>12&15),n+=String.fromCharCode(128|a>>6&63),n+=String.fromCharCode(128|a>>0&63)):(n+=String.fromCharCode(192|a>>6&31),n+=String.fromCharCode(128|a>>0&63));return n}e(0,"utf8","str")},o.fn.deepCopy=function(t){if(t){var n=Array.isArray(t)?[]:{};for(var r in t)t.hasOwnProperty(r)&&("object"===_typeof(t[r])?n[r]=deepCopy(t[r]):n[r]=t[r]);return n}e(0,"deepCopy","obj")},n.method=new o,r&&(n.method=module.exports=new o)}(window);