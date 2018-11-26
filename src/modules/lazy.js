/**
 * @method Lazy 懒加载解决方案
 * @author Lkx
 * @for kxui
 * @for method
 *
 * @method load 使用懒加载
 */

(function (win) {
  let kxui = win.kxui;
  let isExports = (typeof module !== 'undefined') && (typeof module === 'object') && (typeof module.exports === 'object');

  /**
   * 逻辑层
   * @method Lazy
   * @for Lazy
   * @param {object} parameter 配置参数
   * @param {string} type 功能类型
   */
  let Logic = function (parameter, type) {
    this.parameter = (typeof parameter === 'object') ? parameter : {};
    this.type = type;
    this.variable();
  };

  Logic.prototype = {

    /**
     * 变量生成
     * @method variable
     * @for Logic
     */
    variable: function () {
      switch (this.type) {
        case 0:

          // 图片懒加载
          this.threshold = Number(this.parameter.threshold) ? Number(this.parameter.threshold) : 0;
          this.externalContainer = this.parameter.container ? kxui.method.getDom(this.parameter.container) : '';
          if (this.parameter.container && !this.externalContainer) {
            throws(0, this.parameter.container);
          } else {
            this.container();
          }
          break;
        case 1:

          // 下拉加载
          this.el = this.parameter.el;
          this.call = (typeof this.parameter.call === 'function') ? this.parameter.call : function () {};
          this.dropSwitch = true;
          if (this.el) {
            this.el = kxui.method.getDom(this.el);
            if (this.el || (this.el.length && this.el.length === 1)) {
              this.elChildren = kxui.method.sonDom(this.el);
              if (this.elChildren && this.elChildren.length === 1) {
                this.dynamicStyle();
              } else {
                throws(4, this.parameter.el, true);
              }
            } else {
              throws(3, this.parameter.el, true);
            }
          } else {
            throws(2);
          }
          break;
      }
    },

    /**
     * 动态样式赋值
     * @method dynamicStyle
     * @for variable
     */
    dynamicStyle: function () {
      kxui.method.addClass(this.el, 'kxui-drop');
      kxui.method.addClass(this.elChildren[0], 'kxui-drop-children');
      kxui.method.addClass(kxui.method.getDom('html'), 'kxui-drop-html');
      kxui.method.addClass(kxui.method.getDom('body'), 'kxui-drop-body');
      this.event();
    },

    /**
     * 容器配置
     * @method container
     * @for variable
     */
    container: function () {
      this.img = this.externalContainer ? kxui.method.sonAllDom(this.externalContainer, 'img') : kxui.method.getDom('img');
      if (this.img || this.img.length > 0) {
        this.static();
      } else {
        throws(1);
      }
    },

    /**
     * 静态加载
     * @method static
     * @for container
     */
    static: function () {
      let base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC';
      if (this.img.length) {
        for (let i = 0; i < this.img.length; i++) {
          kxui.method.atrDom(this.img[i], 'src', base64);
        }
      } else {
        kxui.method.atrDom(this.img, 'src', base64);
      }
      this.branch();
    },

    /**
     * 显示分支
     * @method branch
     * @for static/event
     */
    branch: function () {
      let scrollTop = this.externalContainer ? this.externalContainer.scrollTop : document.documentElement.scrollTop || document.body.scrollTop;
      let screenHeight = this.externalContainer ? this.externalContainer.clientHeight : document.documentElement.clientHeight || document.body.clientHeight;
      if (this.img.length) {
        for (let i = 0; i < this.img.length; i++) {
          this.exhibition(this.img[i], scrollTop, screenHeight);
        }
      } else {
        this.exhibition(this.img, scrollTop, screenHeight);
      }
      this.event();
    },

    /**
     * 事件绑定
     * @method event
     * @for dynamicStyle/branch
     */
    event: function () {
      let that = this;
      switch (this.type) {
        case 0:

          // 图片懒加载
          let dom = that.externalContainer || win;

          /**
           * 滚动条监听事件
           * @method onscroll
           * @for event
           */
          dom.onscroll = function () {
            that.branch();
          };
          break;
        case 1:

          /**
           * 滚动条监听事件
           * @method onscroll
           * @for event
           */
          that.el.onscroll = function () {
            that.listening();
          };
          break;
      }
    },

    /**
     * 图片显示
     * @method exhibition
     * @for branch
     * @param {object} img 节点对象
     * @param {string} scrollTop 滚动条距顶部的高度
     * @param {string} screenHeight 当前可视界面的高度
     */
    exhibition: function (img, scrollTop, screenHeight) {
      let lazySrc = kxui.method.atrDom(img, 'lazy-src');
      if (lazySrc) {
        if (img.offsetTop - (this.externalContainer ? img.parentNode.offsetTop : 0) <= ((scrollTop + screenHeight) + this.threshold) && ((img.offsetTop + img.offsetHeight) - (this.externalContainer ? img.parentNode.offsetTop : 0)) >= (scrollTop - this.threshold)) {
          if (lazySrc !== kxui.method.atrDom(img, 'src')) {
            kxui.method.atrDom(img, 'src', lazySrc);
          }
        }
      }
    },

    /**
     * 图片显示
     * @method listening
     * @for event
     */
    listening: function () {
      this.elTop = this.el.scrollTop;
      this.elHeight = this.el.offsetHeight;
      this.elChildrenHeight = this.elChildren[0].offsetHeight;
      if (((this.elTop + this.elHeight) >= this.elChildrenHeight) && this.dropSwitch) {
        this.dropSwitch = false;
        this.call();
      } else if ((this.elTop + this.elHeight) < this.elChildrenHeight) {
        this.dropSwitch = true;
      }
    }
  };

  /**
   * 控制台错误/警告
   * @method throws
   * @for container
   * @param {number} num 输入警告文案编号
   * @param {string} dome 发生错误的节点
   * @param {boolean} isError 是否使用error进行抛出
   */
  function throws(num, dome, isError) {
    let nums = {
      0: '容器 {' + dome + '} 不存在',
      1: '当前页面未发现 <img> 标签',
      2: '字段 {el} 不能为空',
      3: '无法找到 {' + dome + '} 节点或存在多个 {' + dome + '} 节点',
      4: '节点 {' + dome + '} 下不存在子节点或存在多个子节点'
    };
    if (isError) {
      console.error('kxui-' + kxui.version + '： 模块 {lazy} ' + nums[num] + '。');
    } else {
      console.warn('kxui-' + kxui.version + '： 模块 {lazy} ' + nums[num] + '。');
    }
  }

  /**
   * 懒加载解决方案
   * @method Lazy
   */
  let Lazy = function () {
    this.name = 'Lazy';
    this.info = 'Lazy load solution';
  };

  Lazy.fn = Lazy.prototype;

  /**
   * 图片懒加载
   * @method load
   * @for Lazy
   * @param {object} parameter 配置参数
   */
  Lazy.fn.load = function (parameter) {
    this.logic = new Logic(parameter, 0);
    delete this.logic;
  };

  /**
   * 下拉加载
   * @method drop
   * @for Lazy
   * @param {object} parameter 配置参数
   */
  Lazy.fn.drop = function (parameter) {
    this.logic = new Logic(parameter, 1);
    delete this.logic;
  };

  // 根据引入方式暴露对象
  kxui.lazy = new Lazy();
  if (isExports) {
    kxui.lazy = module.exports = new Lazy();
  }
})(window);