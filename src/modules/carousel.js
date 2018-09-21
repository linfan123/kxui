/**
 * @method Carousel 轮播解决方案
 * @author Lkx
 * @for kxui
 * @for method
 *
 * @method load 构造函数
 */

(function (win) {
  let kxui = win.kxui;
  let isExports = (typeof module !== 'undefined') && (typeof module === 'object') && (typeof module.exports === 'object');
  let fadeInterval = 450;

  /**
   * 逻辑构造函数
   * @method Carousel
   * @for Carousel
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
      this.el = this.parameter.el;
      if (this.el) {
        this.el = kxui.method.getDom(this.el);
        if (this.el) {
          this.variable();
        } else {
          throws(1, this.parameter.el);
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
      this.anim = ((this.parameter.anim === 'fade') || (this.parameter.anim === 'default')) ? this.parameter.anim : 'default';
      this.elBox = this.el.children[0];
      this.elItem = this.elBox.children;
      this.time = Number(this.parameter.time) >= 600 ? this.parameter.time : 3000;
      this.index = this.parameter.index || 0;
      this.automaticTimer = '';
      // 按钮与指示器
      this.arrow = (typeof this.parameter.arrow === 'boolean') ? this.parameter.arrow : true;
      this.indicator = (typeof this.parameter.indicator === 'boolean') ? this.parameter.indicator : true;

      // 是否自动切换
      this.autoplay = (typeof this.parameter.autoplay === 'boolean') ? this.parameter.autoplay : true;

      // 切换回调
      this.callback = (typeof this.parameter.callback === 'function') ? this.parameter.callback : function () {};

      // 初始范围限制
      if (this.index >= this.elItem.length) {
        this.index = 0;
      }
      this.skeleton();
    },

    /**
     * 创建相关骨架
     * @method skeleton
     * @for variable
     */
    skeleton: function () {

      // 按钮
      if (this.arrow) {
        this.arrowLeft = kxui.method.addDom('<div class="kxui-carousel-arrow kxui-carousel-arrowLeft"><i class="kxui-icon kxui-icon-arrowLeft"></i></div>');
        this.arrowRight = kxui.method.addDom('<div class="kxui-carousel-arrow kxui-carousel-arrowRight"><i class="kxui-icon kxui-icon-arrowRight"></i></div>');
        this.el.appendChild(this.arrowLeft);
        this.el.appendChild(this.arrowRight);
      }

      // 指示器
      if (this.indicator) {
        this.indicatorBox = kxui.method.addDom('<ul class="kxui-carousel-indicator"></ul>');
        this.indicatorSpot = [];
        for (let i = 0; i < this.elItem.length; i++) {
          let indicatorSpot = kxui.method.addDom('<li class="kxui-carousel-indicatorSpot"></li>');
          this.indicatorSpot.push(indicatorSpot);
          this.indicatorBox.appendChild(indicatorSpot);
        }
        this.el.appendChild(this.indicatorBox);
      }
      this.dynamicStyle();
    },

    /**
     * 动态样式赋值
     * @method dynamicStyle
     * @for skeleton
     */
    dynamicStyle: function () {
      kxui.method.atrDom(this.elBox, 'ondragstart', 'return false');
      kxui.method.addClass(this.elItem[this.index], 'kxui-carousel-item-this');

      // 使用默认切换动画
      if (this.anim === 'default') {
        let indexFront = this.commonIndex(this.index - 1);
        let indexAfter = this.commonIndex(this.index + 1);
        kxui.method.addClass(this.elItem[indexFront], 'kxui-carousel-item-front');
        kxui.method.addClass(this.elItem[indexAfter], 'kxui-carousel-item-after');
      }

      // 按钮
      if (this.arrow) {
        this.arrowLeft.style.top = this.el.offsetHeight / 2 - 24 + 'px';
        this.arrowRight.style.top = this.el.offsetHeight / 2 - 24 + 'px';
      }

      // 指示器
      if (this.indicator) {
        this.indicatorBox.style.left = (this.el.offsetWidth / 2) - (this.indicatorBox.offsetWidth / 2) + 'px';
        kxui.method.addClass(this.indicatorSpot[this.index], 'kxui-carousel-indicatorSpot-this');
      }

      // 针对fade切换动画增加格外的样式
      if (this.anim === 'fade') {
        for (let i = 0; i < this.elItem.length; i++) {
          kxui.method.addClass(this.elItem[i], 'kxui-carousel-item-fade');
        }
      }
      this.event();
      this.autoplayMethod();
    },

    /**
     * 事件委托
     * @method event
     * @for dynamicStyle
     */
    event: function () {
      let that = this;

      if (that.arrow) {
        that.arrowLeft.addEventListener('click', left);
        that.arrowRight.addEventListener('click', right);

        function left(e) {
          noBubble(e);
          that.preposition();
          that.index = that.index - 1;
          that.postposition(true, 'hierarchyLeft');
          that.arrowLeft.removeEventListener('click', left, false);
          setTimeout(function () {
            that.arrowLeft.addEventListener('click', left);
          }, fadeInterval);
        }

        function right(e) {
          noBubble(e);
          that.preposition();
          that.index = that.index + 1;
          that.postposition(true);
          that.arrowRight.removeEventListener('click', right, false);
          setTimeout(function () {
            that.arrowRight.addEventListener('click', right);
          }, fadeInterval);
        }
      }

      if (that.indicator) {
        let spacerSwitch = true;
        for (let i = 0; i < that.indicatorSpot.length; i++) {
          that.indicatorSpot[i].onclick = function (e) {
            noBubble(e);
            if (spacerSwitch) {
              let index = that.index;
              let direction = '';
              let indexFront = that.commonIndex(that.index - 1);
              let indexAfter = that.commonIndex(that.index + 1);
              if (i !== indexFront && i !== indexAfter) {
                if (that.index > i) {
                  direction = 'left';
                } else if (that.index < i) {
                  direction = 'right';
                }
                that.preposition(i, direction);
                that.index = i;
                that.postposition(true, direction, index);
              } else {
                that.preposition();
                that.index = i;
                that.postposition(true, (indexFront === that.index ? 'hierarchyLeft' : ''));
              }

              // 模拟点击间隔
              spacerSwitch = false;
              setTimeout(function () {
                spacerSwitch = true;
              }, fadeInterval);
            }
          };
        }
      }

      // 行为动作手势绑定
      that.frameOper();
    },

    /**
     * 行为动作
     * @method frameOper
     * @for event
     */
    frameOper: function () {
      let that = this;
      let behaviorStart = kxui.info().device === 'pc' ? 'mousedown' : 'touchstart';
      let behaviorUp = kxui.info().device === 'pc' ? 'mouseup' : 'touchend';
      that.elBox.addEventListener(behaviorStart, dowm);

      /**
       * 监听手势按下
       * @method dowm
       * @for frameOper
       */
      function dowm(e) {
        that.dowmX = kxui.method.mouse(e).x;
        that.elBox.addEventListener(behaviorUp, up);
      }

      /**
       * 监听手势抬起
       * @method up
       * @for dowm
       */
      function up(e) {
        if (that.dowmX - kxui.method.mouse(e).x > 50) {
          that.preposition();
          that.index = that.index + 1;
          that.postposition(true);
        } else if (that.dowmX - kxui.method.mouse(e).x < -50) {
          that.preposition();
          that.index = that.index - 1;
          that.postposition(true, 'hierarchyLeft');
        }
        that.elBox.removeEventListener(behaviorStart, dowm, false);
        that.elBox.removeEventListener(behaviorUp, up, false);
        setTimeout(function () {
          that.elBox.addEventListener(behaviorStart, dowm);
        }, fadeInterval);
      }
    },

    /**
     * 自动切换方法
     * @method autoplayMethod
     * @for dynamicStyle/postposition
     */
    autoplayMethod: function () {
      let that = this;
      if (this.autoplay) {
        that.automaticTimer = setInterval(function () {
          that.preposition();
          that.index = that.index + 1;
          that.postposition();
        }, that.time);
      }
    },

    /**
     * 切换前置方法
     * @method preposition
     * @param {string} i 来自指示器点击下标
     * @param {string} direction 特殊方向
     * @for event/frameOper/autoplayMethod
     */
    preposition: function (i, direction) {
      if (this.anim === 'default') {
        for (let e = 0; e < this.elItem.length; e++) {
          kxui.method.delClass(this.elItem[e], 'kxui-carousel-item-front');
          kxui.method.delClass(this.elItem[e], 'kxui-carousel-item-after');
        }
        if (direction === 'left') {
          kxui.method.addClass(this.elItem[i], 'kxui-carousel-item-front');
        } else if (direction === 'right') {
          kxui.method.addClass(this.elItem[i], 'kxui-carousel-item-after');
        }
      }
      if (!direction || this.anim === 'fade') {
        kxui.method.delClass(this.elItem[this.index], 'kxui-carousel-item-this');
      }
      if (this.indicator) {
        kxui.method.delClass(this.indicatorSpot[this.index], 'kxui-carousel-indicatorSpot-this');
      }
    },

    /**
     * 切换后置方法
     * @method postposition
     * @param {string} timer 是否需要清除计时器
     * @param {string} direction 特殊方向
     * @param {string} i 来自指示器点击下标
     * @for event/frameOper/autoplayMethod
     */
    postposition: function (timer, direction, i) {
      let that = this;
      that.index = that.commonIndex(that.index);
      if (this.anim === 'default') {
        let hierarchyDirection = (direction === 'hierarchyLeft') ? 'left' : 'right';
        let indexFront = that.commonIndex(that.index - 1);
        let indexAfter = that.commonIndex(that.index + 1);
        kxui.method.addClass(that.elItem[indexFront], 'kxui-carousel-item-front');
        kxui.method.addClass(that.elItem[indexAfter], 'kxui-carousel-item-after');
        if (direction === 'left' || direction === 'right') {
          setTimeout(function () {
            kxui.method.delClass(that.elItem[that.index], 'kxui-carousel-item-front');
            kxui.method.delClass(that.elItem[that.index], 'kxui-carousel-item-after');
            if (direction === 'left') {
              kxui.method.addClass(that.elItem[i], 'kxui-carousel-item-after');
            } else if (direction === 'right') {
              that.hierarchy('right');
              kxui.method.addClass(that.elItem[i], 'kxui-carousel-item-front');
            }
            setTimeout(function () {
              kxui.method.delClass(that.elItem[i], 'kxui-carousel-item-this');
              kxui.method.delClass(that.elItem[i], 'kxui-carousel-item-after');
              kxui.method.delClass(that.elItem[i], 'kxui-carousel-item-front');
            }, fadeInterval);
          });
        }
        that.hierarchy(hierarchyDirection);
      }
      kxui.method.addClass(that.elItem[that.index], 'kxui-carousel-item-this');
      if (that.indicator) {
        kxui.method.addClass(that.indicatorSpot[that.index], 'kxui-carousel-indicatorSpot-this');
      }
      if (timer) {
        clearTimeout(that.automaticTimer);
        clearInterval(that.automaticTimer);
        that.automaticTimer = setTimeout(function () {
          that.autoplayMethod();
        }, 3000);
      }

      // 进行切换回调
      // 并携带当前下标/dom节点
      that.callback(that.index, that.elItem[that.index]);
    },

    /**
     * 共同下标方法
     * @method commonIndex
     * @for dynamicStyle/event/postposition
     */
    commonIndex: function (index) {
      if (index < 0) {
        index = this.elItem.length - 1;
      } else if (index >= this.elItem.length) {
        index = 0;
      }
      return index;
    },

    /**
     * 层级改变方法
     * @method hierarchy
     * @param {string} i 来自特殊方向的下标
     * @param {string} direction 特殊方向
     * @for autoplayMethod
     */
    hierarchy: function (direction) {
      for (let i = 0; i < this.elItem.length; i++) {
        if (this.elItem[i].className.indexOf(direction === 'left' ? 'kxui-carousel-item-after' : 'kxui-carousel-item-front') >= 0) {
          kxui.method.addClass(this.elItem[i], 'kxui-carousel-item-zIndex');
        } else {
          kxui.method.delClass(this.elItem[i], 'kxui-carousel-item-zIndex');
        }
      }
    }
  };

  /**
   * 禁止事件冒泡
   * @method noBubble
   * @for Load
   * @param {object} e 事件参数
   */
  function noBubble(e) {
    let ev = e || win.event;
    ev.stopPropagation();
  }

  /**
   * 控制台错误/警告
   * @method throws
   * @for Load
   * @param {number} num 输入警告文案编号
   * @param {string/boolean} obj 发生错误的对象名称
   * @param {boolean} isError 是否使用error进行抛出
   */
  function throws(num, obj, isError) {
    isError = (typeof isError === 'boolean') ? isError : (typeof obj === 'boolean') ? obj : false;
    let nums = {
      0: '字段 {el} 不能为空',
      1: '无法找到 {' + obj + '} 节点'
    };
    if (isError) {
      console.error('kxui-' + kxui.version + '： 模块 {carousel} ' + nums[num] + '。');
    } else {
      console.warn('kxui-' + kxui.version + '： 模块 {carousel} ' + nums[num] + '。');
    }
  }

  /**
   * 方法的主入口
   * @method Carousel
   * 轮播解决方案
   */
  let Carousel = function () {
    this.name = 'Carousel';
    this.info = 'Provide carousel solution';
  };

  Carousel.fn = Carousel.prototype;

  /**
   * 轮播绑定
   * @method binding
   * @for Carousel
   * @param {object} parameter 配置参数
   */
  Carousel.fn.binding = function (parameter) {
    this.logic = new Logic(parameter);
    delete this.logic;
  };

  // 根据引入方式暴露对象
  kxui.carousel = new Carousel();
  if (isExports) {
    kxui.carousel = module.exports = new Carousel();
  }
})(window);