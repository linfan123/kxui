/**
 * method kxui
 * version 1.3.4
 * author Lkx
 * create time 2018.05.31
 * update time 2019.03.26
 * website http://www.kxui.org
 */

"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t){function e(t,e,o){var n={0:"字段 {el} 不能为空",1:"无法找到 {"+e+"} 节点，请确保它存在且是单个"};o?console.error("kxui-"+i.version+"： 模块 {Countdown} "+n[t]+"。"):console.warn("kxui-"+i.version+"： 模块 {Countdown} "+n[t]+"。")}var o=!0,n="",i=t.kxui,r="undefined"!=typeof module&&"object"===("undefined"==typeof module?"undefined":_typeof(module))&&"object"===_typeof(module.exports),s=function(t){this.parameter="object"===("undefined"==typeof t?"undefined":_typeof(t))?t:{},this.init()};s.prototype={init:function(){this.parameter.el?(this.el=i.method.getDom(this.parameter.el),this.el?this.variable():e(1,this.parameter.el,!0)):e(0)},variable:function(){this.time="string"==typeof this.parameter.time||"number"==typeof this.parameter.time?parseInt(this.parameter.time):120,this.end=this.parameter.end||"重新获取",this.loop(),this.reciprocal()},loop:function(){this.parameter.text&&this.parameter.text.indexOf("#T")>=0?this.text=i.method.repStr(this.parameter.text,"#T",this.time):this.text=this.time,this.el.innerHTML=this.text},reciprocal:function(){var t=this;clearInterval(n),n=setInterval(function(){t.time=t.time-1,t.time>0?t.loop():(clearInterval(n),t.el.innerHTML=t.end,o=!0)},1e3)}};var a=function(){this.name="Countdown",this.info="Countdown method set"};a.fn=a.prototype,a.fn.reverse=function(t){o&&(o=!1,this.logic=new s(t),delete this.logic)},a.fn.state=function(){return o},i.countdown=new a,r&&(i.countdown=module.exports=new a)}(window);