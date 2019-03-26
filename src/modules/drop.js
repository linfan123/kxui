/**
 * @method Drop 页底解决方案
 * @author Lkx
 * @for kxui
 * @for method
 *
 * @method use 页底
 */

(function (win) {
  let kxui = win.kxui;
  let isExports = (typeof module !== 'undefined') && (typeof module === 'object') && (typeof module.exports === 'object');

  /**
   * 逻辑层
   * @method Logic
   * @for Drop
   * @param {object} parameter 配置参数
   */
  let Logic = function (parameter) {
    this.parameter = (typeof parameter === 'object') ? parameter : {};
    this.variable();
  };

  Logic.prototype = {

    /**
     * 变量生成
     * @method variable
     * @for Logic
     */
    variable: function () {
      this.el = this.parameter.el;
      this.call = (typeof this.parameter.call === 'function') ? this.parameter.call : function () {};
      this.dropSwitch = true;
      if (this.el) {
        this.el = kxui.method.getDom(this.el);
        if (this.el || (this.el.length && this.el.length === 1)) {
          this.elChildren = kxui.method.sonDom(this.el);
          if (this.elChildren && this.elChildren.length === 1) {
            this.event();
          } else {
            throws(2, this.parameter.el, true);
          }
        } else {
          throws(1, this.parameter.el, true);
        }
      } else {
        throws(0);
      }
    },

    /**
     * 事件绑定
     * @method event
     * @for variable
     */
    event: function () {
      let that = this;
      that.el.onscroll = function () {
        that.listening();
      }
    },

    /**
     * 置底监听
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
   * @for variable
   * @param {number} num 输入警告文案编号
   * @param {string} dome 发生错误的节点
   * @param {boolean} isError 是否使用error进行抛出
   */
  function throws(num, dome, isError) {
    let nums = {
      0: '字段 {el} 不能为空',
      1: '无法找到 {' + dome + '} 节点或存在多个 {' + dome + '} 节点',
      2: '节点 {' + dome + '} 下不存在子节点或存在多个子节点'
    };
    if (isError) {
      console.error('kxui-' + kxui.version + '： 模块 {Drop} ' + nums[num] + '。');
    } else {
      console.warn('kxui-' + kxui.version + '： 模块 {Drop} ' + nums[num] + '。');
    }
  }

  /**
   * 懒加载解决方案
   * @method Drop
   */
  let Drop = function () {
    this.name = 'Drop';
    this.info = 'Page bottom solution';
  };

  Drop.fn = Drop.prototype;

  /**
   * 图片懒加载
   * @method use
   * @for Drop
   * @param {object} parameter 配置参数
   */
  Drop.fn.use = function (parameter) {
    this.logic = new Logic(parameter);
    delete this.logic;
  };

  kxui.drop = new Drop();
  if (isExports) {
    kxui.drop = module.exports = new Drop();
  }
})(window);