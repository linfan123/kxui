/**
 * method kxui
 * version 1.3.5
 * author Lkx
 * create time 2018.05.31
 * update time 2019.03.28
 * website http://www.kxui.org
 */

"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){function t(e,t,o){var n={0:"字段 {el} 不能为空",1:"无法找到 {"+t+"} 节点或存在多个 {"+t+"} 节点",2:"节点 {"+t+"} 下不存在子节点或存在多个子节点"};o?console.error("kxui-"+i.version+"： 模块 {Drop} "+n[e]+"。"):console.warn("kxui-"+i.version+"： 模块 {Drop} "+n[e]+"。")}var i=e.kxui,o="undefined"!=typeof module&&"object"===("undefined"==typeof module?"undefined":_typeof(module))&&"object"===_typeof(module.exports),n=function(e){this.parameter="object"===("undefined"==typeof e?"undefined":_typeof(e))?e:{},this.variable()};n.prototype={variable:function(){this.el=this.parameter.el,this.call="function"==typeof this.parameter.call?this.parameter.call:function(){},this.dropSwitch=!0,this.el?(this.el=i.method.getDom(this.el),this.el||this.el.length&&1===this.el.length?(this.elChildren=i.method.sonDom(this.el),this.elChildren&&1===this.elChildren.length?this.event():t(2,this.parameter.el,!0)):t(1,this.parameter.el,!0)):t(0)},event:function(){var e=this;e.el.onscroll=function(){e.listening()}},listening:function(){this.elTop=this.el.scrollTop,this.elHeight=this.el.offsetHeight,this.elChildrenHeight=this.elChildren[0].offsetHeight,this.elTop+this.elHeight>=this.elChildrenHeight&&this.dropSwitch?(this.dropSwitch=!1,this.call()):this.elTop+this.elHeight<this.elChildrenHeight&&(this.dropSwitch=!0)}};var l=function(){this.name="Drop",this.info="Page bottom solution"};l.fn=l.prototype,l.fn.use=function(e){this.logic=new n(e),delete this.logic},i.drop=new l,o&&(i.drop=module.exports=new l)}(window);