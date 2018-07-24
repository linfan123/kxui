/**
 * @method Popup 弹出层解决方案
 * @author Lkx
 * @for kxui
 * @for method
 *
 * @method alert 提示层
 * @method ask 询问层
 * @method loading 等待层
 * @method remind 提醒层
 * @method tips 小贴士
 * @method win 窗口层
 * @method close 关闭单一层
 * @method closeAll 关闭所有层
 * @method getFrameIndex 获取自身唯一值
 */

(function (win) {
  let kxui = win.kxui;
  let zIndexNum = 199202;
  let domain = kxui.info().domain;
  let offset = ['top', 'right', 'bottom', 'left', 'center'];
  let isExports = (typeof module !== 'undefined') && (typeof module === 'object') && (typeof module.exports === 'object');

  /**
   * 逻辑入口
   * @method Skeleton
   * @for Popup
   * @param {object} parameter 配置参数
   */
  let Skeleton = function (parameter) {
    this.parameter = parameter;
    this.alone = this.parameter.alone;
    this.timer = null;
    this.init();
  };

  Skeleton.prototype = {

    /**
     * 初始化判断是否存在method
     * @method init
     * @for Skeleton
     */
    init: function () {
      let that = this;
      if (!kxui.method) {
        kxui.use('method', function () {
          that.skeleton();
        });
      } else {
        that.skeleton();
      }
    },

    /**
     * 创建弹窗骨架
     * @method skeleton
     * @for init
     */
    skeleton: function () {

      // 非小贴士弹窗创建
      if (this.parameter.type !== 4) {
        this.bulk = kxui.method.addDom('<div class="' + (this.parameter.type !== 2 ? 'kxui-Popup-bulk' : '') + ' kxui-Popup-show kxui-Popup-animation" index="' + this.parameter.index + '"></div>');
        this.content = kxui.method.addDom('<div class="kxui-Popup-content"></div>');
        this.title = kxui.method.addDom('<div class="kxui-Popup-title ' + ((this.alone.closeBtn && this.alone.shrinkBtn) ? 'kxui-Popup-title-wholeBtn' : (this.alone.closeBtn || this.alone.shrinkBtn) ? 'kxui-Popup-title-oneBtn' : 'kxui-Popup-title-noBtn') + '"></div>');
        this.shrink = kxui.method.addDom('<div class="kxui-Popup-shrink kxui-icon ' + (this.alone.full ? 'kxui-icon-min' : 'kxui-icon-max') + ' ' + (this.alone.closeBtn ? '' : 'kxui-Popup-shrink-one') + '" shrinkState="' + (this.alone.full ? 'max' : 'min') + '"></div>');
        this.close = kxui.method.addDom('<div class="kxui-Popup-close kxui-icon kxui-icon-close"></div>');
        this.eventBulk = kxui.method.addDom('<div class="kxui-Popup-event ' + (kxui.info().device === 'mobile' ? 'kxui-Popup-event-mobile' : '') + '"></div>');
        this.resize = kxui.method.addDom('<div class="kxui-Popup-resize"></div>');
        if (this.alone.closeBtn) {
          this.bulk.appendChild(this.close);
        }
        if (this.alone.shrinkBtn) {
          this.bulk.appendChild(this.shrink);
        }
      }

      // 所有弹窗共同创建
      this.move = kxui.method.addDom('<div class="kxui-Popup-move"></div>');
      this.shade = kxui.method.addDom('<div class="kxui-Popup-shade ' + (this.parameter.shadeClose ? 'kxui-Popup-shade-pointer' : '') + '"></div>');

      // 是否显示滚动条
      if (this.parameter.scrollBar) {
        kxui.method.addClass(query('body', this.topPage), 'kxui-noScrollBar');
      }
      this.assemble();
    },

    /**
     * 标签初始化组装
     * @method assemble
     * @for skeleton
     */
    assemble: function () {
      let that = this;
      let type = that.parameter.type;

      // 所有层级组装
      switch (type) {
        case 0:
        case 1:

          // 提示层按钮创建
          if (type === 0) {
            that.btn1 = kxui.method.addDom('<div class="' + (kxui.info().device === 'mobile' ? 'kxui-Popup-btn-mobile' : 'kxui-Popup-btn') + '">确定</div>');
            that.eventBulk.appendChild(that.btn1);
          } else if ((typeof that.alone.btn === 'object') && type === 1) {
            for (let i = 1; i <= that.alone.btn.length; i++) {
              that['btn' + i] = kxui.method.addDom('<div class="' + (kxui.info().device === 'mobile' ? 'kxui-Popup-btn-mobile' : 'kxui-Popup-btn') + '">' + that.alone.btn[i - 1] + '</div>');
              that.eventBulk.appendChild(that['btn' + i]);
            }
          }
          that.bulk.appendChild(that.title);
          that.bulk.appendChild(that.content);
          that.bulk.appendChild(that.eventBulk);
          that.content.innerHTML = that.parameter.text || '';
          kxui.method.addClass(that.bulk, 'kxui-Popup-' + (type === 0 ? 'alert' : 'ask'));
          kxui.method.addClass(that.content, 'kxui-Popup-' + (type === 0 ? 'alert' : 'ask') + '-content');
          break;
        case 2:

          // 等待层骨架组装
          that.loadingText = kxui.method.addDom('<p class="kxui-Popup-loading-text ' + (that.parameter.style === 2 ? 'kxui-Popup-loading-text-special' : '') + '">' + (that.parameter.text || '') + '</p>');
          let loadingStyle = {
            0: function () {
              for (let i = 0; i < 5; i++) {
                that.bulk.appendChild(create('div'));
                kxui.method.addClass(that.bulk, 'kxui-Popup-loading-0');
              }
            },
            1: function () {
              for (let i = 0; i < 3; i++) {
                that.bulk.appendChild(create('div'));
                kxui.method.addClass(that.bulk, 'kxui-Popup-loading-1');
              }
            },
            2: function () {
              for (let i = 0; i < 8; i++) {
                that.bulk.appendChild(create('div'));
                kxui.method.addClass(that.bulk, 'kxui-Popup-loading-2');
              }
            }
          };
          loadingStyle[that.parameter.style]();
          that.bulk.appendChild(that.loadingText);
          kxui.method.addClass(that.bulk, (that.parameter.shade ? 'kxui-Popup-loading' : 'kxui-Popup-loading-noShade'));
          break;
        case 3:

          // 提醒层骨架组装
          closeAnimation(that.bulk, that.parameter.topPage, that.shade, that.parameter.type);
          that.remindText = kxui.method.addDom('<p>' + (that.parameter.text || '') + '</p>');
          that.bulk.appendChild(that.remindText);
          kxui.method.addClass(that.bulk, 'kxui-Popup-remind');
          break;
        case 4:

          // 小贴士骨架组装
          that.bulk = [];
          that.arrow = [];
          that.content = [];
          for (let t = 0; t < that.alone.dom.length; t++) {
            that.bulk[t] = kxui.method.addDom('<div class="kxui-Popup-tips kxui-Popup-show kxui-Popup-animation" index="' + this.parameter.index + '"></div>');
            that.arrow[t] = kxui.method.addDom('<div class="kxui-Popup-tips-arrow"></div>');
            that.content[t] = kxui.method.addDom('<div class="kxui-Popup-tips-content">' + (that.parameter.text || '') + '</div>');
            that.bulk[t].appendChild(that.arrow[t]);
            that.bulk[t].appendChild(that.content[t]);
            that.styleStatus(that.bulk[t], that.alone.dom[t]);
          }
          return;
        case 5:

          // 窗口层骨架组装
          that.bulk.appendChild(that.resize);
          that.bulk.appendChild(that.title);
          that.bulk.appendChild(that.content);
          if ((typeof that.parameter.text === 'object') && that.parameter.text[1] === false) {
            that.content.innerHTML = that.parameter.text[0];
          } else {
            that.iframe = kxui.method.addDom('<iframe src="' + (that.parameter.text || '') + '" frameborder="0" name="' + this.parameter.index + '" id="' + this.parameter.index + '"></iframe>');
            that.content.appendChild(that.iframe);
          }
          that.bulk.style.width = that.alone.size[0];
          that.bulk.style.height = that.alone.size[1];
          kxui.method.addClass(that.bulk, 'kxui-Popup-win');
          kxui.method.addClass(that.content, 'kxui-Popup-win-content');
          break;
      }
      that.styleStatus(that.bulk);
    },

    /**
     * 特殊样式风格
     * @method styleStatus
     * @for assemble
     * @param {object} dom 操作对象
     * @param {object} node 小贴士吸附对象
     */
    styleStatus: function (dom, node) {
      let that = this;
      let text = '提示';

      // 统一默认背景色修改
      that.shade.style.background = that.parameter.diy.shade;
      // 未使用自定义色值进入，使用官方色值
      if (that.parameter.diy.color === undefined && that.parameter.diy.background === undefined) {
        switch (that.parameter.style) {
          case 'primary':
            kxui.method.addClass(dom, that.parameter.type === 3 ? 'kxui-Popup-remind-primary' : that.parameter.type === 4 ? 'kxui-Popup-tips-primary' : 'kxui-Popup-primary');
            break;
          case 'success':
            text = '成功';
            kxui.method.addClass(dom, that.parameter.type === 3 ? 'kxui-Popup-remind-success' : that.parameter.type === 4 ? 'kxui-Popup-tips-success' : 'kxui-Popup-success');
            break;
          case 'info':
            text = '信息';
            kxui.method.addClass(dom, that.parameter.type === 3 ? 'kxui-Popup-remind-info' : that.parameter.type === 4 ? 'kxui-Popup-tips-info' : 'kxui-Popup-info');
            break;
          case 'warning':
            text = '警告';
            kxui.method.addClass(dom, that.parameter.type === 3 ? 'kxui-Popup-remind-warning' : that.parameter.type === 4 ? 'kxui-Popup-tips-warning' : 'kxui-Popup-warning');
            break;
          case 'danger':
            text = '错误';
            kxui.method.addClass(dom, that.parameter.type === 3 ? 'kxui-Popup-remind-danger' : that.parameter.type === 4 ? 'kxui-Popup-tips-danger' : 'kxui-Popup-danger');
            break;
        }
      }

      // 非等待层/提醒层/小贴士进入
      else if (that.parameter.type !== 2 && that.parameter.type !== 3 && that.parameter.type !== 4) {
        that.title.style.cssText = 'color:' + that.parameter.diy.color + ';background:' + that.parameter.diy.background;
        that.close.style.cssText = 'color:' + that.parameter.diy.color + ';background:' + that.parameter.diy.background;
        that.shrink.style.cssText = 'color:' + that.parameter.diy.color + ';background:' + that.parameter.diy.background;
        if (that.parameter.type !== 5) {
          that['btn1'].style.cssText = 'color:' + that.parameter.diy.color + ';background:' + that.parameter.diy.background;
        }
        that.content.style.borderTop = '1px solid ' + that.parameter.diy.background;
        dom.style.border = '1px solid ' + that.parameter.diy.background;
        kxui.method.addClass(dom, 'kxui-Popup-diy');
      }

      // 提醒层独有自定义样式结构
      else if (that.parameter.type === 3) {
        that.bulk.style.background = that.parameter.diy.background;
        that.bulk.childNodes[0].style.color = that.parameter.diy.color;
      }

      // 小贴士独有自定义样式结构
      else if (that.parameter.type === 4) {
        ((node.offsetWidth + node.offsetLeft) + dom.offsetWidth + 30) > docSize().docWidth ? dom.childNodes[0].style.borderLeft = '8px solid ' + that.parameter.diy.background : dom.childNodes[0].style.borderRight = '8px solid ' + that.parameter.diy.background
        dom.childNodes[1].style.cssText = 'color:' + that.parameter.diy.color + ';background:' + that.parameter.diy.background;
      }

      // 非提醒层/小贴士进入
      else {
        that.loadingText.style.color = that.parameter.diy.color;
        for (let i = 0; i < that.bulk.childNodes.length - 1; i++) {
          that.bulk.childNodes[i].style.cssText = 'color:' + that.parameter.diy.color + ';border:0 solid ' + that.parameter.diy.color + ';background-color:' + that.parameter.diy.color;
        }
      }

      // 是否存在自定义头部标题
      if (this.title) {
        this.title.innerHTML = this.alone.title === undefined ? text : this.alone.title;
      }
      that.into(dom, node);
    },

    /**
     * 将弹窗置于页面中
     * @method into
     * @for styleStatus
     * @param {object} dom 操作对象
     * @param {object} node 小贴士吸附对象
     */
    into: function (dom, node) {
      let that = this;
      query('body', that.parameter.topPage).appendChild(dom);
      if (!query('.kxui-Popup-move', that.parameter.topPage)) {
        query('body', that.parameter.topPage).appendChild(that.move);
      }
      if (!query('.kxui-Popup-shade', that.parameter.topPage) && that.parameter.shade) {
        query('body', that.parameter.topPage).appendChild(that.shade);
      }
      that.last(dom, node);
    },

    /**
     * 确定弹出层位置
     * @method last
     * @for into
     * @param {object} dom 操作对象
     * @param {object} node 小贴士吸附对象
     */
    last: function (dom, node) {
      let that = this;

      // 非小贴士进入
      if (that.parameter.type !== 4) {
        for (let o = 0; o < offset.length; o++) {
          if (that.parameter.offset === offset[o]) {
            break;
          } else if (o === offset.length - 1) {
            that.parameter.offset = 'center';
          }
        }

        // 判断是否为窗口层以及初始化全屏显示
        if (that.parameter.type === 5 && that.alone.full) {
          dom.style.left = '0';
          dom.style.top = '0';
        }

        // 设置弹窗的top偏移量
        // 存在top、center、bottom之分
        else {
          if (that.parameter.offset === 'top') {
            dom.style.top = '10px';
          } else if (that.parameter.offset === 'center' || that.parameter.offset === 'left' | that.parameter.offset === 'right') {
            let top = that.parameter.topPage ? docSize().topHeight : (docSize().docHeight / 2) - (dom.offsetHeight / 2) - 50;
            dom.style.top = ((top >= 0) ? top : 0) + 'px';
          } else if (that.parameter.offset === 'bottom') {
            dom.style.bottom = '10px';
          }

          // 设置弹窗的left偏移量
          // 存在left、center、right之分
          if (that.parameter.offset === 'left') {
            dom.style.left = '10px';
          } else if (that.parameter.offset === 'center' || that.parameter.offset === 'top' || that.parameter.offset === 'bottom') {
            let left = that.parameter.topPage ? docSize().topWidth : (docSize().docWidth / 2) - (dom.offsetWidth / 2);
            dom.style.left = left + 'px';
          } else if (that.parameter.offset === 'right') {
            dom.style.right = '10px';
          }

          // 判断当前弹窗是否超长
          let clientHeight = document.documentElement.clientHeight;
          if (dom.offsetHeight > clientHeight) {
            dom.style.height = clientHeight + 'px';
            dom.childNodes[2].style.height = (clientHeight - 90) + 'px';
            dom.childNodes[2].style.marginBottom = '10px';
          }
        }
      }

      // 除小贴士外的其他所有弹层进入
      else {
        dom.style.top = node.offsetTop + 'px';
        if (node.offsetWidth + node.offsetLeft + dom.offsetWidth + 30 > docSize().docWidth) {
          dom.style.left = (node.offsetLeft - dom.offsetWidth) + 'px';
          kxui.method.addClass(dom, 'kxui-Popup-tips-right');
          kxui.method.addClass(dom.childNodes[0], 'kxui-Popup-tips-right-arrow');
        } else {
          dom.style.left = (node.offsetWidth + node.offsetLeft) + 'px';
        }
      }
      showAnimation(dom, that.shade, that.parameter.shade);
      that.event(dom);
    },

    /**
     * 事件处理
     * @method event
     * @for last
     * @param {object} dom 操作对象
     */
    event: function (dom) {
      let that = this;

      // 是否需要自动关闭弹窗
      if (that.parameter.time) {
        this.timer = setTimeout(function () {
          that.parameter.timeCall();
          closeAnimation(dom, that.parameter.topPage, that.shade, that.parameter.type);
        }, that.parameter.time);
        kxui.method.atrDom(dom, 'timer', this.timer);
      }

      // 是否需要头部缩放按钮
      if (that.alone.shrinkBtn) {
        that.shrink.onclick = function () {
          let shrinkState = kxui.method.atrDom(this, 'shrinkState');
          kxui.method.addClass(that.bulk, 'kxui-Popup-animation');
          if (shrinkState === 'min') {
            kxui.method.addClass(that.bulk, 'kxui-Popup-max');
            kxui.method.delClass(that.shrink, 'kxui-icon-max');
            kxui.method.addClass(that.shrink, 'kxui-icon-min');
            kxui.method.atrDom(this, 'shrinkState', 'max');

          } else if (shrinkState === 'max') {
            kxui.method.delClass(that.bulk, 'kxui-Popup-max');
            kxui.method.delClass(that.shrink, 'kxui-icon-min');
            kxui.method.addClass(that.shrink, 'kxui-icon-max');
            kxui.method.atrDom(this, 'shrinkState', 'min');

          }
          that.alone.shrinkCall(kxui.method.atrDom(this, 'shrinkState'));
        };
      }

      // 是否需要头部关闭按钮
      if (that.alone.closeBtn) {
        that.close.onclick = function () {
          that.alone.closeCall();
          clearTimeout(that.timer);
          closeAnimation(that.bulk, that.parameter.topPage, that.shade, that.parameter.type);
        };
      }

      // 询问层创建多按钮回调
      if ((typeof that.alone.btn === 'object') && that.parameter.type === 1) {
        for (let i = 1; i <= that.alone.btn.length; i++) {
          that['btn' + i].index = i;
          that['btn' + i].onclick = function () {
            that.alone.event['btn' + this.index](that.parameter.index);
          };
        }
      }

      // 提醒层确定回调
      else if ((typeof that.alone.btn === 'function') && that.parameter.type === 0) {
        that.btn1.onclick = function () {
          clearTimeout(that.timer);
          closeAnimation(that.bulk, that.parameter.topPage, that.shade, that.parameter.type);
          that.alone.btn(that.parameter.index);
        };
      }

      // 是否允许点击背景遮罩进行关闭
      if (that.parameter.shadeClose) {
        that.shade.onclick = function () {
          that.parameter.shadeCall();
          clearTimeout(that.timer);
          closeAnimation(that.bulk, that.parameter.topPage, that.shade, that.parameter.type);
        };
      }

      // 如果存在内容区域
      // 点击内容区域进行层级提升
      if (that.content) {
        that.content.onclick = function () {
          zIndex(that.bulk);
        };
      }

      // 是否存在事件区域
      // 点击事件区域进行层级提升
      if (that.eventBulk) {
        that.eventBulk.onclick = function () {
          zIndex(that.bulk);
        };
      }

      // 非小贴士进入
      // 非全屏的窗口层进入
      // 进行行为动作事件绑定
      if (that.parameter.type !== 4) {
        that.frameOper();
      }
    },

    /**
     * 行为动作
     * @method frameOper
     * @for event
     */
    frameOper: function () {
      let that = this;
      let frameOperThis = null;
      that.saveX = that.bulk.offsetLeft;
      that.saveY = that.bulk.offsetTop;
      that.saveWidth = that.bulk.offsetWidth;
      that.saveHeight = that.bulk.offsetHeight;
      that.title.addEventListener('mousedown', dowm);
      that.resize.addEventListener('mousedown', dowm);

      /**
       * 监听鼠标按下
       * @method dowm
       * @for frameOper
       */
      function dowm() {
        zIndex(that.bulk);
        frameOperThis = kxui.method.hasClass(this, 'kxui-Popup-resize');
        kxui.method.delClass(that.bulk, 'kxui-Popup-show');
        kxui.method.delClass(that.bulk, 'kxui-Popup-animation');
        that.dowmX = kxui.method.mouse().x;
        that.dowmY = kxui.method.mouse().y;
        dynamicDoc(that.parameter.topPage).addEventListener('mousemove', move);
        dynamicDoc(that.parameter.topPage).addEventListener('mouseup', up);
        kxui.method.addClass(query('.kxui-Popup-move', that.parameter.topPage), 'kxui-Popup-move-operation');
      }

      /**
       * 监听鼠标滑动
       * @method move
       * @for dowm
       */
      function move() {
        if (frameOperThis) {
          that.moveWidth = that.saveWidth + (kxui.method.mouse().x - that.dowmX);
          that.moveHeight = that.saveHeight + (kxui.method.mouse().y - that.dowmY);
          if (that.moveWidth <= 260) {
            that.moveWidth = 260;
          }
          if (that.moveHeight <= 140) {
            that.moveHeight = 140;
          }
          that.bulk.style.width = that.moveWidth + 'px';
          that.bulk.style.height = that.moveHeight + 'px';
        } else {
          that.moveX = kxui.method.mouse().x - that.dowmX + that.saveX;
          that.moveY = kxui.method.mouse().y - that.dowmY + that.saveY;
          if (that.moveX <= 0) {
            that.moveX = 0;
          }
          if (that.moveY <= 0) {
            that.moveY = 0;
          }
          if (that.moveX >= (that.parameter.topPage ? docSize().topWidth : docSize().docWidth) - that.bulk.offsetWidth) {
            that.moveX = (that.parameter.topPage ? docSize().topWidth : docSize().docWidth) - that.bulk.offsetWidth;
          }
          if (that.moveY >= (that.parameter.topPage ? docSize().topHeight : docSize().docHeight) - that.bulk.offsetHeight) {
            that.moveY = (that.parameter.topPage ? docSize().topHeight : docSize().docHeight) - that.bulk.offsetHeight;
          }
          that.bulk.style.left = that.moveX + 'px';
          that.bulk.style.top = that.moveY + 'px';
          that.bulk.style.right = 'auto';
          that.bulk.style.bottom = 'auto';
        }
      }

      /**
       * 监听鼠标抬起
       * @method up
       * @for dowm
       */
      function up() {
        that.saveX = that.bulk.offsetLeft;
        that.saveY = that.bulk.offsetTop;
        that.saveWidth = that.bulk.offsetWidth;
        that.saveHeight = that.bulk.offsetHeight;
        dynamicDoc(that.parameter.topPage).removeEventListener('mousemove', move, false);
        dynamicDoc(that.parameter.topPage).removeEventListener('mouseup', up, false);
        kxui.method.delClass(query('.kxui-Popup-move', that.parameter.topPage), 'kxui-Popup-move-operation');
      }
    }
  };

  /**
   * 弹窗统一显示动画
   * @method showAnimation
   * @for last
   * @param {object} dom 显示对象
   * @param {boolean} mask 背景遮罩
   * @param {boolean} shade 是否存在背景遮罩
   */
  function showAnimation(dom, mask, shade) {
    if (shade) {
      mask.style.opacity = '1';
      mask.style.zIndex = zIndexNum;
      kxui.method.atrDom(dom, 'shade', zIndexNum);
      kxui.method.atrDom(mask, 'shade', zIndexNum);
    }
    zIndex(dom);
    dom.style.opacity = '1';
  }

  /**
   * 弹窗统一关闭动画
   * @method closeAnimation
   * @for assemble/event/closeDom
   * @param {object} dom 关闭对象
   * @param {boolean} topPage 是否存在层级
   * @param {boolean} shade 是否存在背景遮罩
   * @param {number} type 弹窗类型
   */
  function closeAnimation(dom, topPage, shade, type) {
    let shadeMatching;
    let mask = query('.kxui-Popup-shade', topPage);
    let remind = query('.kxui-Popup-remind', topPage);

    // 针对remind执行之前存在销毁处理
    if (remind && type === 3) {
      dom = remind;
      clearTimeout(kxui.method.atrDom(remind, 'timer'));
    } else if (type === 3) {
      return false;
    }

    // 针对遮罩蒙板层进行销毁处理
    if (shade && mask) {
      shadeMatching = parseInt(kxui.method.atrDom(dom, 'shade')) === parseInt(kxui.method.atrDom(mask, 'shade'));
      if (shadeMatching) {
        mask.style.opacity = '0';
      }
    }

    // 针对滚动条隐藏进行释放
    if (kxui.method.hasClass(query('body', topPage), 'kxui-noScrollBar')) {
      kxui.method.delClass(query('body', topPage), 'kxui-noScrollBar');
    }
    dom.style.opacity = '0';
    kxui.method.addClass(dom, 'kxui-Popup-hide');
    setTimeout(function () {
      try {
        query('body', topPage).removeChild(dom);
        if (shade && shadeMatching) {
          query('body', topPage).removeChild(mask);
        }
      } catch (error) {}
    }, 200);
  }

  /**
   * 改变层级关系
   * @method zIndex
   * @for event/frameOper/showAnimation
   * @param {object} dom 改变对象
   */
  function zIndex(dom) {
    zIndexNum++;
    dom.style.zIndex = zIndexNum;
  }

  /**
   * 获取当前页面/iframe可视范围的宽高
   * @method docSize
   * @for styleStatus/last/frameOper
   * @return {object} 返回当前页面宽高以及父级页面宽高
   */
  function docSize() {
    let docWidth = dynamicDoc(false).documentElement.clientWidth;
    let docHeight = dynamicDoc(false).documentElement.clientHeight;
    let topWidth = dynamicDoc(true).documentElement.clientWidth;
    let topHeight = dynamicDoc(true).documentElement.clientHeight;
    return {
      'docWidth': docWidth,
      'docHeight': docHeight,
      'topWidth': topWidth,
      'topHeight': topHeight
    };
  }

  /**
   * 层级document对象
   * @method dynamicDoc
   * @for frameOper/docSize/create/query/closeAll
   * @param {boolean} topPage 是否使用顶层
   * @return {object} 返回层级document对象
   */
  function dynamicDoc(topPage) {
    return topPage ? win.top.document : document;
  }

  /**
   * 创建层级节点
   * @method create
   * @for assemble/style
   * @param {string} dom 创建的节点
   * @param {boolean} topPage 是否使用顶层
   * @return {object} 返回层级节点对象
   */
  function create(dom, topPage) {
    return dynamicDoc(topPage).createElement(dom);
  }

  /**
   * 获取层级单独节点
   * @method query
   * @for skeleton/into/frameOper/closeAnimation/style
   * @param {string} dom 获取的节点
   * @param {boolean} topPage 是否使用顶层
   * @return {object} 返回层级节点对象
   */
  function query(dom, topPage) {
    return dynamicDoc(topPage).querySelector(dom);
  }

  /**
   * 获取层级匹配节点
   * @method query
   * @for tips/closeAll
   * @param {string} dom 获取的节点
   * @param {boolean} topPage 是否使用顶层
   * @return {object} 返回层级节点对象
   */
  function queryAll(dom, topPage) {
    return dynamicDoc(topPage).querySelectorAll(dom);
  }

  /**
   * 获取popup所需的样式文件
   * @method style
   * @for popup
   */
  (function style() {
    if (isExports) {
      require('./../css/popup.css');
    } else {
      let link = create('link');
      link.media = 'all';
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = domain + 'css/popup.css';
      query('head').appendChild(link);
    }
  })();

  /**
   * 方法的主入口
   * @method Popup
   * 弹出层解决方案
   */
  let Popup = function () {
    this.name = 'Popup';
    this.info = 'Window solution';
  };

  Popup.fn = Popup.prototype;

  /**
   * 提示层
   * @method alert
   * @for Popup
   * @param {number/string} text 文案
   * @param {object} parameter 配置参数
   */
  Popup.fn.alert = function (text, parameter) {
    let parameters = (typeof parameter === 'object') ? parameter : {};
    return this.open(0, parameters, {
      text: text,
      closeBtn: (typeof parameters.closeBtn === 'boolean') ? parameters.closeBtn : true,
      closeCall: (typeof parameters.closeCall === 'function') ? parameters.closeCall : function () {},
      title: parameters.title,
      btn: (typeof parameters.btn === 'function') ? parameters.btn : function () {}
    });
  };

  /**
   * 询问层
   * @method ask
   * @for Popup
   * @param {object} parameter 配置参数
   */
  Popup.fn.ask = function (parameter) {
    let parameters = (typeof parameter === 'object') ? parameter : {};
    let btn = (typeof parameters.btn === 'object') ? parameters.btn : [];
    let event = [];
    for (let i = 1; i <= btn.length; i++) {
      event['btn' + i] = (typeof parameters['btn' + i] === 'function') ? parameters['btn' + i] : function () {};
    }
    return this.open(1, parameters, {
      closeBtn: (typeof parameters.closeBtn === 'boolean') ? parameters.closeBtn : true,
      closeCall: (typeof parameters.closeCall === 'function') ? parameters.closeCall : function () {},
      title: parameters.title,
      btn: btn,
      event: event
    });
  };

  /**
   * 等待层
   * @method loading
   * @for Popup
   * @param {object} parameter 配置参数
   */
  Popup.fn.loading = function (parameter) {
    let parameters = (typeof parameter === 'object') ? parameter : {};
    return this.open(2, parameters, {
      style: (typeof parameters.style === 'number') ? parameters.style <= 2 && parameters.style >= 0 ? parameters.style : 0 : (typeof parameters.style === 'string') ? parseInt(parameters.style) <= 2 && parseInt(parameters.style) >= 0 ? parseInt(parameters.style) : 0 : 0
    });
  };

  /**
   * 提醒层
   * @method remind
   * @for Popup
   * @param {number/string} text 文案
   * @param {number/string} time 持续时间
   * @param {object} parameter 配置参数
   */
  Popup.fn.remind = function (text, time, parameter) {
    let parameters = (typeof parameter === 'object') ? parameter : (typeof time === 'object') ? time : (typeof text === 'object') ? text : {};
    return this.open(3, parameters, {
      text: text === parameters ? '' : text,
      time: (typeof time === 'string') || (typeof time === 'number') ? time : 3000
    });
  };

  /**
   * 小贴士
   * @method tips
   * @for Popup
   * @param {number/string} text 文案
   * @param {object} dom 吸附对象
   * @param {object} parameter 配置参数
   */
  Popup.fn.tips = function (text, dom, parameter) {
    let doms = null;
    let parameters = (typeof parameter === 'object') ? parameter : {};
    if (typeof dom === 'string') {
      doms = queryAll(dom);
    } else if (typeof dom.length === 'number') {
      doms = dom;
    } else {
      doms = {
        0: dom,
        length: '1'
      };
    }
    return this.open(4, parameters, {
      text: text,
      dom: doms,
      time: (typeof parameters.time === 'string') || (typeof parameters.time === 'number') ? parameters.time : 3000
    });
  };

  /**
   * 窗口层
   * @method win
   * @for Popup
   * @param {object} parameter 配置参数
   */
  Popup.fn.win = function (parameter) {
    let parameters = (typeof parameter === 'object') ? parameter : {};
    return this.open(5, parameters, {
      size: (typeof parameters.full === 'boolean') && parameters.full ? ['100%', '100%'] : (typeof parameters.size === 'object') ? parameters.size : (kxui.info().device === 'mobile') ? ['100%', '100%'] : ['800px', '480px'],
      closeBtn: (typeof parameters.closeBtn === 'boolean') ? parameters.closeBtn : true,
      closeCall: (typeof parameters.closeCall === 'function') ? parameters.closeCall : function () {},
      shrinkBtn: (typeof parameters.shrinkBtn === 'boolean') ? parameters.shrinkBtn : true,
      shrinkCall: (typeof parameters.shrinkCall === 'function') ? parameters.shrinkCall : function () {},
      full: (typeof parameters.full === 'boolean') ? parameters.full : false,
      title: parameters.title
    });
  };

  /**
   * 字段汇总
   * @method open
   * @for alert/ask/loading/remind/tips/win
   * @param {number} type 弹窗类型
   * @param {object} parameter 配置参数
   * @param {object} alone 特殊配置参数（带文案与时间等3个字段时，此为配置参数）
   */
  Popup.fn.open = function (type, parameter, alone) {
    let diy = (typeof parameter.diy === 'object') ? parameter.diy : {};

    // 弹窗的唯一标识
    let index = Math.random();

    /**
     * 逻辑处理
     * @method Skeleton
     * @for open
     * @param {number} type 弹窗类型
     * @param {number/string} text 文案内容，在win层，将将content转为text
     * @param {number} style 风格样式
     * @param {boolean} topPage 是否放置最顶层
     * @param {boolean} shade 是否增加背景遮罩层
     * @param {boolean} sh adeClose 是否允许点击背景进行关闭
     * @param {function} shadeCall 使用背景关闭回调
     * @param {string} offset 初始化显示位置
     * @param {boolean} scrollBar 是否在弹出窗口时，禁用页面滚动条
     * @param {number/string} time 自动关闭时间
     * @param {function} timeCall 自动关闭回调
     * @param {object} diy 自定义颜色
     * @param {string} index 当前窗口唯一值
     * @param {object} alone 独有参数
     */
    this.skeleton = new Skeleton({
      type: type,
      text: (type === 0 || type === 3 || type === 4) ? alone.text : (type === 5) ? parameter.content : parameter.text,
      style: type === 2 ? alone.style : (typeof parameter.style === 'string') ? parameter.style : 'default',
      topPage: (typeof parameter.topPage === 'boolean') ? parameter.topPage : false,
      shade: (typeof parameter.shade === 'boolean') ? parameter.shade : false,
      shadeClose: (typeof parameter.shadeClose === 'boolean') && parameter.shade ? parameter.shadeClose : false,
      shadeCall: (typeof parameter.shadeCall === 'function') && parameter.shade && parameter.shadeClose ? parameter.shadeCall : function () {},
      offset: (typeof parameter.offset === 'string') ? parameter.offset : 'center',
      scrollBar: (typeof parameter.scrollBar === 'boolean') ? parameter.scrollBar : false,
      time: (typeof alone.time === 'string') || (typeof alone.time === 'number') ? parseInt(alone.time) : (typeof parameter.time === 'string') || (typeof parameter.time === 'number') ? parseInt(parameter.time) : false,
      timeCall: (typeof parameter.timeCall === 'function') ? parameter.timeCall : function () {},
      diy: {
        color: diy.color,
        background: diy.background,
        shade: diy.shade
      },
      index: index,
      alone: alone
    });

    // 返回唯一标识用于外部关闭
    return index;
  };

  /**
   * 关闭单一类型弹窗层或单一指定的弹窗层
   * @method close
   * @for Popup
   * @param {object} parameter 配置参数
   * @return {object} 返回调用closeAll
   */
  Popup.fn.close = function (parameter) {
    let index = parameter;
    if (typeof index === 'string') {
      switch (parameter) {
        case 'alert':
          index = ['kxui-Popup-alert'];
          break;
        case 'ask':
          index = ['kxui-Popup-ask'];
          break;
        case 'loading':
          index = ['kxui-Popup-loading', 'kxui-Popup-loading-noShade'];
          break;
        case 'remind':
          index = ['kxui-Popup-remind'];
          break;
        case 'tips':
          index = ['kxui-Popup-tips'];
          break;
        case 'win':
          index = ['kxui-Popup-win'];
          break;
      }
    }
    let isObject = (typeof index === 'object') ? false : true;
    return this.closeAll(index, isObject);
  };

  /**
   * 关闭所有弹窗层
   * @method closeAll
   * @for Popup/close
   * @param {string} index 关闭窗口class值
   * @param {boolean} separate 是否使用index唯一值进行关闭
   */
  Popup.fn.closeAll = function (index, separate) {
    let that = this;
    that.cla = (typeof index === 'object') ? index : ['kxui-Popup-alert', 'kxui-Popup-ask', 'kxui-Popup-loading', 'kxui-Popup-loading-noShade', 'kxui-Popup-remind', 'kxui-Popup-tips', 'kxui-Popup-win'];
    for (let c = 0; c < that.cla.length; c++) {
      let domTrue = queryAll('.' + that.cla[c], true);
      let domFalse = queryAll('.' + that.cla[c], false);
      if (dynamicDoc(true) === dynamicDoc(false)) {
        for (let d = 0; d < domFalse.length; d++) {
          closeDom(domFalse[d], false);
        }
      } else {
        for (let f = 0; f < domFalse.length; f++) {
          closeDom(domFalse[f], false);
        }
        for (let t = 0; t < domTrue.length; t++) {
          closeDom(domTrue[t], true);
        }
      }
    }

    /**
     * 关闭弹窗总方法
     * @method closeDom
     * @for closeAll
     * @param {object} dom 关闭对象
     * @param {boolean} topPage 是否存在嵌套
     */
    function closeDom(dom, topPage) {
      if (separate) {
        if (String(kxui.method.atrDom(dom, 'index')) === String(index)) {
          closeAnimation(dom, topPage, true, null);
        }
      } else {
        closeAnimation(dom, topPage, true, null);
      }
      clearTimer(dom);
    }

    /**
     * 关闭计时器
     * @method clearTimer
     * @for closeDom
     * @param {object} dom 关闭对象
     */
    function clearTimer(dom) {
      if (kxui.method.atrDom(dom, 'timer')) {
        clearTimeout(kxui.method.atrDom(dom, 'timer'));
      }
    }
  };

  /**
   * 此方法一般用于在iframe页关闭自身时用到
   * @method getFrameIndex
   * @for closeDom
   * @return {string} 自身窗口唯一值
   */
  Popup.fn.getFrameIndex = function () {
    return win.name;
  };

  // 根据引入方式暴露对象
  if (!isExports) {
    kxui.popup = new Popup();
  } else {
    module.exports = new Popup();
  }
})(window);