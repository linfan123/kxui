/**
 * @method Lazy 图片懒加载
 * @author Lkx
 * @for kxui
 * @for method
 *
 * @method load 使用懒加载
 */

(function(win) {
  let kxui = win.kxui;
  let isExports = (typeof module !== 'undefined') && (typeof module === 'object') && (typeof module.exports === 'object');

  /**
   * 逻辑层
   * @method Lazy
   * @for Lazy
   * @param {object} parameter 配置参数
   */
  let Logic = function(parameter) {
    this.parameter = (typeof parameter === 'object') ? parameter : {};
    this.init();
  };

  Logic.prototype = {

    /**
     * 初始化判断是否存在method
     * @method init
     * @for Logic
     */
    init: function() {
      let that = this;
      if (!kxui.method) {
        kxui.use('method', function() {
          that.variable();
        });
      } else {
        that.variable();
      }
    },

    /**
     * 变量生成
     * @method variable
     * @for init
     */
    variable: function() {
      this.threshold = Number(this.parameter.threshold) ? Number(this.parameter.threshold) : 0;
      this.externalContainer = this.parameter.container ? kxui.method.getDom(this.parameter.container) : '';
      if (this.parameter.container && !this.externalContainer) {
        warn(0, this.parameter.container);
      }
      this.container();
    },

    /**
     * 容器配置
     * @method container
     * @for variable
     */
    container: function() {
      this.img = kxui.method.getDom('img');
      if (this.img || this.img.length > 0) {
        this.static();
      } else {
        warn(1);
      }
    },

    /**
     * 静态加载
     * @method static
     * @for container
     */
    static: function() {
      let base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC';
      if (this.img.length) {
        for (let i = 0; i < this.img.length; i++) {
          kxui.method.atrDom(this.img[i], 'src', base64);
        }
      } else {
        kxui.method.atrDom(this.img, 'src', base64);
      }
      this.event();
      this.branch();
    },

    /**
     * 事件绑定
     * @method event
     * @for static
     */
    event: function() {
      let that = this;
      let dom = this.externalContainer || win;

      /**
       * 滚动条监听事件
       * @method onscroll
       * @for event
       */
      dom.onscroll = function() {
        that.branch();
      };
    },

    /**
     * 显示分支
     * @method branch
     * @for static/event
     */
    branch: function() {
      let scrollTop = this.externalContainer ? this.externalContainer.scrollTop : document.documentElement.scrollTop || document.body.scrollTop;
      let screenHeight = this.externalContainer ? this.externalContainer.clientHeight : document.documentElement.clientHeight || document.body.clientHeight;
      if (this.img.length) {
        for (let i = 0; i < this.img.length; i++) {
          this.exhibition(this.img[i], scrollTop, screenHeight);
        }
      } else {
        this.exhibition(this.img, scrollTop, screenHeight);
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
    exhibition: function(img, scrollTop, screenHeight) {
      let lazySrc = kxui.method.atrDom(img, 'lazy-src');
      if (lazySrc) {
        if (img.offsetTop - (this.externalContainer ? img.parentNode.offsetTop : 0) <= ((scrollTop + screenHeight) + this.threshold) && ((img.offsetTop + img.offsetHeight) - (this.externalContainer ? img.parentNode.offsetTop : 0)) >= (scrollTop - this.threshold)) {
          if (lazySrc !== kxui.method.atrDom(img, 'src')) {
            kxui.method.atrDom(img, 'src', lazySrc);
          }
        }
      }
    }
  };

  /**
   * 输出控制台警告
   * @method warn
   * @for container
   * @param {number} num 输入警告文案编号
   * @param {string} dome 发生错误的节点
   */
  function warn(num, dome) {
    let nums = {
      0: '容器 {' + dome + '} 不存在',
      1: '当前页面未发现 <img> 标签'
    };
    console.warn('kxui-' + kxui.version + '： ' + nums[num] + '。');
  }

  /**
   * 方法的主入口
   * @method Lazy
   * 懒加载入口构造函数
   */
  let Lazy = function() {
    this.name = 'Lazy';
    this.info = 'Lazy loading of pictures';
  };

  Lazy.fn = Lazy.prototype;

  /**
   * 图片懒加载
   * @method load
   * @for Lazy
   * @param {object} parameter 配置参数
   */
  Lazy.fn.load = function(parameter) {
    this.logic = new Logic(parameter);
    delete this.logic;
  };

  // 根据引入方式暴露对象
  if (!isExports) {
    kxui.lazy = new Lazy();
  } else {
    module.exports = new Lazy();
  }
})(window);