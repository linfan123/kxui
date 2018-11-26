/**
 * method kxui
 * version 1.3.2
 * author Lkx
 * create time 2018.05.31
 * update time 2018.11.26
 * website http://www.kxui.org
 */

"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t){function e(t,e,n){var o={0:"字段 {el} 不能为空",1:"无法找到 {"+e+"} 节点，请确保它存在且是单个"};n?console.error("kxui-"+i.version+"： 模块 {countdown} "+o[t]+"。"):console.warn("kxui-"+i.version+"： 模块 {countdown} "+o[t]+"。")}var n=!0,o="",i=t.kxui,r="undefined"!=typeof module&&"object"===("undefined"==typeof module?"undefined":_typeof(module))&&"object"===_typeof(module.exports),s=function(t){this.parameter="object"===("undefined"==typeof t?"undefined":_typeof(t))?t:{},this.init()};s.prototype={init:function(){this.el=this.parameter.el,this.el?(this.el=i.method.getDom(this.el),this.el?this.variable():e(1,this.parameter.el,!0)):e(0)},variable:function(){this.time="string"==typeof this.parameter.time||"number"==typeof this.parameter.time?parseInt(this.parameter.time):120,this.text=this.parameter.text||"重新获取",this.assignment()},assignment:function(){this.el.innerHTML=this.time,this.reciprocal()},reciprocal:function(){var t=this;clearInterval(o),o=setInterval(function(){t.time=t.time-1,t.time>0?t.el.innerHTML=t.time:(clearInterval(o),t.el.innerHTML=t.text,n=!0)},1e3)}};var u=function(){this.name="countdown",this.info="Countdown method set"};u.fn=u.prototype,u.fn.reverse=function(t){n&&(n=!1,this.logic=new s(t),delete this.logic)},u.fn.state=function(){return n},i.countdown=new u,r&&(i.countdown=module.exports=new u)}(window);