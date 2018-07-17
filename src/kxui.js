/**
 * @method kxui
 * @version 1.2.1
 *
 * @method use 加载模块
 * @method info 信息查询
 */

(function(win) {
  let stockMod = ['lazy', 'method', 'popup'];
  let isExports = (typeof module !== 'undefined') && (typeof module === 'object') && (typeof module.exports === 'object');
  let device = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) ? 'mobile' : 'pc';

  /**
   * 逻辑入口
   * @method Load
   * @for kxui
   * @param {object} kxui
   */
  let Load = function(kxui) {
    this.kxui = kxui;
    this.module = (typeof this.kxui.module === 'string') || (typeof this.kxui.module === 'function') || (typeof this.kxui.module === 'object') ? this.kxui.module : false;
    this.fun = (typeof this.kxui.fun === 'function') ? this.kxui.fun : (typeof this.module === 'function') ? this.module : false;
    if ((typeof this.kxui.module === 'function') || (typeof this.fun === 'boolean')) {
      throws(0, this.kxui);
      if (typeof this.fun === 'boolean') {
        return false;
      }
    }
    this.definition();
  };

  Load.prototype = {

    /**
     * 定义成员变量
     * @method definition
     * @for Load
     */
    definition: function() {
      this.loadLine = 0;
      this.wheelSearch = 0;
      this.path = path();
      this.isModule();
    },

    /**
     * 判断模块是否符合规范
     * @method isModule
     * @for definition
     */
    isModule: function() {
      if ((typeof this.module !== 'boolean') && (typeof this.module !== 'function')) {
        this.mode();
      } else {
        this.end();
      }
    },

    /**
     * 判断加载方法（使用传统方法还是使用require方法引入模块）
     * @method mode
     * @for isModule
     */
    mode: function() {
      if (isExports) {
        let newMod = this.module;
        if (typeof this.module === 'string') {
          newMod = [this.module];
        }
        this.imports(newMod);
      } else {
        this.shunt();
      }
    },

    /**
     * 进行模块注册判断并执行其他操作
     * @method imports
     * @for mode
     * @param {string} mod 需要加载的mod数组
     */
    imports: function(mod) {
      for (let i = 0; i < mod.length; i++) {
        if (!this.kxui[(mod[i])] && stockMod.indexOf(mod[i].toLowerCase()) >= 0) {
          let modName = mod[i];
          this.kxui[modName] = require('./modules/' + mod[i]);
        } else if (this.kxui[(mod[i])]) {
          throws(2, mod[i], this.kxui);
        } else {
          throws(1, mod[i], this.kxui);
        }
      }
      this.end();
    },

    /**
     * 模块加载分流
     * @method shunt
     * @for definition
     */
    shunt: function() {
      if (typeof this.module === 'string') {
        if (stockMod.indexOf(this.module.toLowerCase()) >= 0) {
          this.create(this.module, false);
        } else {
          throws(1, this.module, this.kxui);
          this.end();
        }
      } else if (typeof this.module === 'object') {
        if (stockMod.indexOf(this.module[this.loadLine].toLowerCase()) >= 0) {
          this.register(this.module[this.loadLine]);
        } else {
          throws(1, this.module[this.loadLine], this.kxui);
          this.loop(true);
        }
      }
    },

    /**
     * 模块注册记录（只适用于传统加载模式）
     * @method register
     * @for shunt/loop
     * @param {string} mod 模块名称
     */
    register: function(mod) {
      if (!this.kxui[mod]) {
        this.create(mod, true);
      } else if (this.loadLine < this.module.length - 1) {
        throws(2, mod, this.kxui);
        this.loop(true);
      } else {
        throws(2, mod, this.kxui);
        this.end();
      }
    },

    /**
     * 创建模块标签
     * @method create
     * @for register
     * @param {string} mod 模块名称
     * @param {boolean} shunt 分流，true:对象、false：字符串
     */
    create: function(mod, shunt) {
      let that = this;
      let body = document.getElementsByTagName('body')[0];
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = 'async';
      script.charset = 'utf-8';
      script.src = this.path + 'modules/' + mod + '.js';
      if (body) {
        body.appendChild(script);
        this.wait(body, script, shunt);
      } else if (this.wheelSearch < 10) {
        setTimeout(function() {
          that.wheelSearch = that.wheelSearch + 1;
          that.create(mod, shunt);
        });
      } else {
        throws(3, mod, this.kxui, true);
      }
    },

    /**
     * 等待当前模块加载完毕
     * @method wait
     * @for create
     * @param {object} body 结构对象
     * @param {object} script 等待的标签对象
     * @param {boolean} shunt 分流，true:对象、false：字符串
     */
    wait: function(body, script, shunt) {
      let that = this;
      if (script.readyState) {
        script.onreadystatechange = function() {　　　　　　　　
          if (script.readyState === 'complete' || script.readyState === 'loaded') {
            script.onreadystatechange = null;
            body.removeChild(script);
            that.loop(shunt);
          }
        };
      } else {
        script.onload = function() {
          body.removeChild(script);
          that.loop(shunt);
        };
      }
    },

    /**
     * 加载环
     * @method loop
     * @for shunt/wait/register/loop
     * @param {boolean} shunt 分流，true:对象、false：字符串
     */
    loop: function(shunt) {
      this.loadLine = this.loadLine + 1;
      if (shunt && this.module[this.loadLine] && stockMod.indexOf(this.module[this.loadLine].toLowerCase()) >= 0) {
        this.register(this.module[this.loadLine]);
      } else if (shunt && this.loadLine < this.module.length - 1) {
        throws(1, this.module[this.loadLine], this.kxui);
        this.loop(shunt);
      } else {
        let warnAna = shunt && this.module[this.loadLine];
        if (warnAna) {
          throws(1, this.module[this.loadLine], this.kxui);
        }
        this.end();
      }
    },

    /**
     * 结尾方法
     * @method end
     * @for isModule/imports/shunt/register/Load
     */
    end: function() {
      this.fun('kxui-' + this.kxui.version);
    }
  };

  /**
   * 获取引入路径
   * @method path
   * @for Load
   * @return {string} 引入路径前缀
   */
  function path() {
    let kxuiPath = document.scripts;
    let last = kxuiPath.length - 1;
    for (let i = last; i >= 0; i--) {
      let src = kxuiPath[i].src.toLowerCase() || false;
      if (src && src.indexOf('kxui.js') >= 0) {
        kxuiPath = kxuiPath[i].src.substring(0, kxuiPath[i].src.lastIndexOf('/') + 1);
        break;
      }
    }
    return kxuiPath;
  }

  /**
   * 输出控制台警告
   * @method warn
   * @for Load
   * @param {number} num 输入警告文案编号
   * @param {string/object} mod 发生错误的模块名称kxui
   * @param {object} kxui kxui对象自身
   * @param {boolean} isError 是否使用error进行抛出
   * @return {null} 返回空值
   */
  function throws(num, mod, kxui, isError) {
    let that = kxui ? kxui : (typeof mod === 'object') ? mod : '';
    let nums = {
      0: '使用 {use} 不符合结构规范',
      1: '模块 {' + mod + '} 不存在',
      2: '请勿重复调用 {' + mod + ') 模块',
      3: '未能找到 {body} 节点，无法加载 {' + mod + '} 模块'
    };
    if (!isError) {
      console.warn('kxui-' + that.version + '： ' + nums[num] + '。');
      return;
    }
    console.error('kxui-' + that.version + '： ' + nums[num] + '。');
  }

  /**
   * 方法的主入口
   * @method Kxui
   * 开发常用操作方法，可根据需要调用不同的模块，提高开发效率
   */
  let Kxui = function() {
    this.version = '1.2.1';
    this.updateTime = '2018.07.17';
  };

  /**
   * 模块加载
   * @method use
   * @for kxui
   * @param {string/array} mod 模块名称
   * @param {function} fun 加载完成回调方法
   */
  Kxui.prototype.use = function(mod, fun) {
    this.module = mod;
    this.fun = fun;
    this.load = new Load(this);
    delete this.module;
    delete this.fun;
    delete this.load;
  };

  /**
   * 信息返回
   * @method info
   * @for kxui
   * @return {object} 开发信息
   */
  Kxui.prototype.info = function() {
    return {
      'path': path(),
      'device': device,
      'version': this.version + ' / ' + this.updateTime
    };
  };

  win.kxui = new Kxui();
  if (isExports) {
    module.exports = new Kxui();
  }
})(window);