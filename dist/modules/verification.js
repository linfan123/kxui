/**
 * method kxui
 * version 1.3.2
 * author Lkx
 * create time 2018.05.31
 * update time 2018.11.26
 * website http://www.kxui.org
 */

"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){function t(e,t,i){var n={0:"字段 {el} 不能为空",1:"无法找到 {"+t+"} 节点或存在多个 {"+t+"} 节点"};i?console.error("kxui-"+o.version+"： 模块 {verification} "+n[e]+"。"):console.warn("kxui-"+o.version+"： 模块 {verification} "+n[e]+"。")}var i=!0,n="",o=e.kxui,r="undefined"!=typeof module&&"object"===("undefined"==typeof module?"undefined":_typeof(module))&&"object"===_typeof(module.exports),s=function(e){this.parameter="object"===("undefined"==typeof e?"undefined":_typeof(e))?e:{},this.init()};s.prototype={init:function(){this.el=this.parameter.el,this.el?(this.el=o.method.getDom(this.el),this.el&&1===this.el.length?this.variable():t(1,this.parameter.el,!0)):t(0)},variable:function(){this.time="string"==typeof this.parameter.time||"number"==typeof this.parameter.time?parseInt(this.parameter.time):120,this.text=this.parameter.text||"重新获取",this.assignment()},assignment:function(){this.el.innerHTML=this.time,this.reciprocal()},reciprocal:function(){var e=this;clearInterval(n),n=setInterval(function(){e.time=e.time-1,e.time>0?e.el.innerHTML=e.time:(clearInterval(n),e.el.innerHTML=e.text,i=!0)},1e3)}};var f=function(){this.name="verification",this.info="Verification code solution"};f.fn=f.prototype,f.fn.reverse=function(e){i&&(i=!1,this.logic=new s(e),delete this.logic)},f.fn.state=function(){return i},o.verification=new f,r&&(o.verification=module.exports=new f)}(window);