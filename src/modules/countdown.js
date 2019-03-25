/**
 * @method Countdown 倒计时解决方案
 * @author Lkx
 * @for kxui
 * @for method
 *
 * @method reverse 倒计时
 * @method state 状态返回
 */

(function (win) {
  let state = true;
  let timer = '';
  let kxui = win.kxui;
  let isExports = (typeof module !== 'undefined') && (typeof module === 'object') && (typeof module.exports === 'object');

  /**
   * 逻辑层
   * @method Lazy
   * @for Lazy
   * @param {object} parameter 配置参数
   */
  let Logic = function (parameter) {
    this.parameter = (typeof parameter === 'object') ? parameter : {};
    this.init();
  };

  Logic.prototype = {

    /**
     * 初始化
     * @method init
     * @for Logic
     */
    init: function () {
      if (this.parameter.el) {
        this.el = kxui.method.getDom(this.parameter.el);
        if (this.el) {
          this.variable();
        } else {
          throws(1, this.parameter.el, true);
        }
      } else {
        throws(0);
      }
    },

    /**
     * 变量生成
     * @method variable
     * @for init
     */
    variable: function () {
      this.time = (typeof this.parameter.time === 'string') || (typeof this.parameter.time === 'number') ? parseInt(this.parameter.time) : 120;
      this.end = this.parameter.end || '重新获取';
      this.loop()
      this.reciprocal();
    },

    /**
     * 可循环赋值
     * @method loop
     * @for variable
     */
    loop: function () {
      if (this.parameter.text && this.parameter.text.indexOf('#T') >= 0) {
        this.text = kxui.method.repStr(this.parameter.text, '#T', this.time);
      } else {
        this.text = this.time;
      }
      this.el.innerHTML = this.text;
    },

    /**
     * 进行倒数事件
     * @method reciprocal
     * @for variable
     */
    reciprocal: function () {
      const that = this;
      clearInterval(timer);
      timer = setInterval(function () {
        that.time = that.time - 1;
        if (that.time > 0) {
          that.loop()
        } else {
          clearInterval(timer);
          that.el.innerHTML = that.end;
          state = true;
        }
      }, 1000);
    }
  };

  /**
   * 控制台错误/警告
   * @method throws
   * @for Logic
   * @param {number} num 输入警告文案编号
   * @param {string/boolean} dome 发生错误的对象名称
   * @param {boolean} isError 是否使用error进行抛出
   */
  function throws(num, dome, isError) {
    let nums = {
      0: '字段 {el} 不能为空',
      1: '无法找到 {' + dome + '} 节点，请确保它存在且是单个'
    };
    if (isError) {
      console.error('kxui-' + kxui.version + '： 模块 {Countdown} ' + nums[num] + '。');
    } else {
      console.warn('kxui-' + kxui.version + '： 模块 {Countdown} ' + nums[num] + '。');
    }
  }

  /**
   * 验证码解决方案
   * @method Countdown
   */
  let Countdown = function () {
    this.name = 'Countdown';
    this.info = 'Countdown method set';
  };

  Countdown.fn = Countdown.prototype;

  /**
   * 倒计时
   * @method reverse
   * @for Countdown
   * @param {object} parameter 配置参数
   */
  Countdown.fn.reverse = function (parameter) {
    if (state) {
      state = false;
      this.logic = new Logic(parameter);
      delete this.logic;
    }
  };

  /**
   * 状态返回
   * @method state
   * @for Countdown
   * @param {object} parameter 配置参数
   */
  Countdown.fn.state = function () {
    return state;
  };

  kxui.countdown = new Countdown();
  if (isExports) {
    kxui.countdown = module.exports = new Countdown();
  }
})(window);