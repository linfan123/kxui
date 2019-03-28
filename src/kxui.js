/**
 * @method kxui 模块管理方法
 * @author Lkx
 *
 * @method use 加载模块
 * @method info 信息查询
 */

(function (win) {
  let stockMod = ['method', 'countdown', 'drop'];
  let isExports = (typeof module !== 'undefined') && (typeof module === 'object') && (typeof module.exports === 'object');

  /**
   * 逻辑入口
   * @method Load
   * @for kxui
   * @param {object} kxui
   */
  let Load = function (kxui) {
    this.kxui = kxui;
    this.module = (typeof this.kxui.module === 'string') ? [this.kxui.module] : (typeof this.kxui.module === 'object') ? this.kxui.module : false;
    this.fun = (typeof this.kxui.fun === 'function') ? this.kxui.fun : false;
    if (!this.module || !this.fun) {
      throws(0, this.kxui, true);
    } else {
      this.definition();
    }
  };

  Load.prototype = {

    /**
     * 定义成员变量
     * @method definition
     * @for Load
     */
    definition: function () {
      this.loadLine = 0;
      this.wheelSearch = 0;
      this.domain = domain();
      this.mode();
    },

    /**
     * 判断加载方法(使用传统方法还是使用require方法引入模块)
     * @method mode
     * @for isModule
     */
    mode: function () {
      if (isExports) {
        this.imports();
      } else {
        this.shunt();
      }
    },

    /**
     * 进行模块注册判断与加载
     * @method imports
     * @for mode
     */
    imports: function () {
      require('./css/kxui.css');
      for (let i = 0; i < this.module.length; i++) {
        if (!this.kxui[(this.module[i])] && stockMod.indexOf(this.module[i].toLowerCase()) >= 0) {
          let modName = this.module[i];
          this.kxui[modName] = require('./modules/' + this.module[i]);
        } else if (this.kxui[(this.module[i])]) {
          throws(2, this.module[i], this.kxui);
        } else {
          throws(1, this.module[i], this.kxui);
        }
      }
      this.end();
    },

    /**
     * 模块加载分流
     * @method shunt
     * @for mode
     */
    shunt: function () {
      this.style();
      if (stockMod.indexOf(this.module[this.loadLine].toLowerCase()) >= 0) {
        this.register(this.module[this.loadLine]);
      } else {
        throws(1, this.module[this.loadLine], this.kxui);
        this.loop();
      }
    },

    /**
     * 模块样式加载(只适用于传统加载模式)
     * @method style
     * @for shunt
     */
    style: function () {
      let head = document.querySelector('head');
      let link = document.createElement('link');
      link.media = 'all';
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = this.domain + 'css/kxui.css';
      head.appendChild(link);
    },

    /**
     * 模块注册记录(只适用于传统加载模式)
     * @method register
     * @for shunt/loop
     * @param {string} mod 模块名称
     */
    register: function (mod) {
      if (!this.kxui[mod]) {
        this.create(mod);
      } else {
        throws(2, mod, this.kxui);
        if (this.loadLine < this.module.length - 1) {
          this.loop();
        } else {
          this.end();
        }
      }
    },

    /**
     * 创建模块标签
     * @method create
     * @for register
     * @param {string} mod 模块名称
     */
    create: function (mod) {
      let that = this;
      let body = document.querySelector('body');
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = 'async';
      script.charset = 'utf-8';
      script.src = that.domain + 'modules/' + mod + '.js';
      if (body) {
        body.appendChild(script);
        that.wait(body, script);
      } else if (that.wheelSearch < 10) {
        setTimeout(function () {
          that.wheelSearch = that.wheelSearch + 1;
          that.create(mod);
        });
      } else {
        throws(3, mod, that.kxui, true);
      }
    },

    /**
     * 等待当前模块加载完毕
     * @method wait
     * @for create
     * @param {object} body 结构对象
     * @param {object} script 等待的标签对象
     */
    wait: function (body, script) {
      let that = this;
      if (script.readyState) {
        script.onreadystatechange = function () {
          if (script.readyState === 'complete' || script.readyState === 'loaded') {
            script.onreadystatechange = null;
            that.waitEnd(body, script);
          }
        };
      } else {
        script.onload = function () {
          that.waitEnd(body, script);
        };
      }
    },

    /**
     * 当前模块加载完毕
     * @method waitEnd
     * @for wait
     * @param {object} body 结构对象
     * @param {object} script 等待的标签对象
     */
    waitEnd: function (body, script) {
      body.removeChild(script);
      this.loop();
    },

    /**
     * 加载环路
     * @method loop
     * @for shunt/wait/register/loop
     */
    loop: function () {
      this.loadLine = this.loadLine + 1;
      if (this.module[this.loadLine] && stockMod.indexOf(this.module[this.loadLine].toLowerCase()) >= 0) {
        this.register(this.module[this.loadLine]);
      } else if (this.loadLine < this.module.length - 1) {
        throws(1, this.module[this.loadLine], this.kxui);
        this.loop();
      } else {
        if (this.module[this.loadLine]) {
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
    end: function () {
      this.fun('kxui-' + this.kxui.version);
    }
  };

  /**
   * 获取引入路径
   * @method domain
   * @for Load/Kxui
   * @return {string} 引入路径前缀
   */
  function domain() {
    let kxuiDomain = document.scripts;
    let last = kxuiDomain.length - 1;
    for (let i = last; i >= 0; i--) {
      let src = kxuiDomain[i].src.toLowerCase() || false;
      if (src && src.indexOf('kxui.js') >= 0) {
        kxuiDomain = kxuiDomain[i].src.substring(0, kxuiDomain[i].src.lastIndexOf('/') + 1);
        break;
      }
    }
    return kxuiDomain;
  }

  /**
   * 获取当前接入设备
   * @method getDevice
   * @for Kxui
   * @return {string} 当前的设备
   */
  function getDevice() {
    let device = 'pc';
    let ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      device = 'ios'
    } else if (/android/.test(ua)) {
      device = 'android'
    }
    return device;
  }

  /**
   * 控制台错误/警告
   * @method warn
   * @for Load
   * @param {number} num 输入警告文案编号
   * @param {string/object} mod 发生错误的模块名称或kxui对象自身
   * @param {object/boolean} kxui kxui对象自身或是否使用error进行抛出
   * @param {boolean} isError 是否使用error进行抛出
   */
  function throws(num, mod, kxui, isError) {
    isError = (typeof isError === 'boolean') ? isError : (typeof kxui === 'boolean') ? kxui : false;
    kxui = (typeof kxui === 'object') ? kxui : (typeof mod === 'object') ? mod : false;
    let nums = {
      0: '使用 {use} 不符合结构规范',
      1: '模块 {' + mod + '} 不存在',
      2: '请勿重复调用 {' + mod + ') 模块',
      3: '未能找到 {body} 节点，无法加载 {' + mod + '} 模块'
    };
    if (isError) {
      console.error('kxui-' + kxui.version + '： ' + nums[num] + '。');
    } else {
      console.warn('kxui-' + kxui.version + '： ' + nums[num] + '。');
    }
  }

  /**
   * 方法的主入口
   * @method Kxui
   * 开发常用操作方法，可根据需要调用不同的模块，提高开发效率
   */
  let Kxui = function () {
    this.version = '1.3.5';
    this.updateTime = '2019.03.28';
  };

  /**
   * 模块加载
   * @method use
   * @for Kxui
   * @param {string/array} mod 模块名称
   * @param {function} fun 加载完成回调方法
   */
  Kxui.prototype.use = function (mod, fun) {
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
   * @for Kxui
   * @return {object} 开发信息
   */
  Kxui.prototype.info = function () {
    return {
      'domain': domain(),
      'device': getDevice(),
      'version': this.version + ' / ' + this.updateTime,
      'size': {
        'cDocW': document.documentElement.clientWidth,
        'cDocH': document.documentElement.clientHeight,
        'tDocW': win.top.document.documentElement.clientWidth,
        'tDocH': win.top.document.documentElement.clientHeight
      },
      'document': {
        'c': document,
        't': win.top.document
      }
    };
  };

  win.kxui = new Kxui();
  if (isExports) {
    win.kxui = module.exports = new Kxui();
  }
})(window);