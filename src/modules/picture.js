/**
 * @method Picture 查看图片大图解决方案
 * @author Lkx
 * @for kxui
 * @for method
 * @for carousel
 *
 * @method enlarge 图片放大方案
 */

(function (win) {
  let kxui = win.kxui;
  let isExports = (typeof module !== 'undefined') && (typeof module === 'object') && (typeof module.exports === 'object');

  /**
   * 逻辑层
   * @method Picture
   * @for Picture
   * @param {object} parameter 配置参数
   */
  let Logic = function (parameter) {
    this.parameter = (typeof parameter === 'object') ? parameter : {};
    this.size = (typeof this.parameter.size === 'object') ? this.parameter.size : {};
    this.carousel = (typeof this.parameter.carousel === 'object') ? this.parameter.carousel : {};
    this.variable();
  };

  Logic.prototype = {

    /**
     * 变量生成
     * @method variable
     * @for Logic
     */
    variable: function () {
      this.sizeWidth = Number(this.size.width) || '';
      this.sizeHeight = Number(this.size.height) || '';
      this.imgWidth = (this.sizeWidth ? this.sizeWidth : ((document.documentElement.clientWidth || document.body.clientWidth) - (kxui.info().device === 'mobile' ? 0 : 120)));
      this.imgHeight = (this.sizeHeight ? this.sizeHeight : ((document.documentElement.clientHeight || document.body.clientHeight) - (kxui.info().device === 'mobile' ? 0 : 120)));
      this.id = Math.ceil(Math.random() * 10);
      this.agg = this.parameter.agg;
      this.closeTime = null;

      // carousel模块参数
      this.index = this.carousel.index;
      this.arrow = this.carousel.arrow;
      this.indicator = this.carousel.indicator;
      this.time = this.carousel.time;
      this.autoplay = (typeof this.carousel.autoplay === 'boolean') ? this.carousel.autoplay : false;
      this.anim = this.carousel.anim;
      this.callback = this.carousel.callback;
      this.skeleton();
    },

    /**
     * 创建放大骨架
     * @method skeleton
     * @for variable
     */
    skeleton: function () {
      kxui.method.addClass(kxui.method.getDom('html', true), 'kxui-picture-html');
      kxui.method.addClass(kxui.method.getDom('body', true), 'kxui-picture-body');
      this.mask = kxui.method.addDom('<div class="kxui-picture"></div>');
      this.carousel = kxui.method.addDom('<div id="kxui-picture-' + this.id + '" class="kxui-carousel"></div>');
      this.box = kxui.method.addDom('<div class="kxui-carousel-box"></div>');
      for (let i = 0; i < this.agg.length; i++) {
        this.item = kxui.method.addDom('<div class="kxui-carousel-item"></div>');
        this.img = kxui.method.addDom('<img src="' + this.agg[i] + '">');
        let imgSrc = this.cropImage(this.img);
        this.img.src = imgSrc;
        this.item.appendChild(this.img);
        this.box.appendChild(this.item);
      }
      this.carousel.appendChild(this.box);
      this.mask.appendChild(this.carousel);
      kxui.method.getDom('body', true).appendChild(this.mask);
      this.dynamicStyle();
    },

    /**
     * 动态样式赋值
     * @method dynamicStyle
     * @for skeleton
     */
    dynamicStyle: function () {
      this.carousel.style.width = this.imgWidth + 'px';
      this.carousel.style.height = this.imgHeight + 'px';
      this.carousel.style.marginTop = (this.mask.offsetHeight / 2) - (this.carousel.offsetHeight / 2) + 'px';
      this.useCarousel();
    },

    /**
     * 轮播模块加载
     * @method carousel
     * @for dynamicStyle
     */
    useCarousel: function () {
      let that = this;
      kxui.carousel.binding({
        el: '#kxui-picture-' + that.id,
        index: that.index,
        arrow: that.arrow,
        indicator: that.indicator,
        time: that.time,
        autoplay: that.autoplay,
        anim: that.anim,
        callback: that.callback
      });
      that.showAnimation();
      that.event();
    },

    /**
     * 显示动画
     * @method showAnimation
     * @for useCarousel
     */
    showAnimation: function () {
      this.mask.style.opacity = '1';
    },

    /**
     * 事件委托
     * @method event
     * @for dynamicStyle
     */
    event: function () {
      let that = this;
      that.mask.onclick = function () {
        that.mask.style.opacity = '0';
        clearTimeout(that.closeTime);
        that.closeTime = setTimeout(function () {
          kxui.method.getDom('.kxui-picture-body').removeChild(that.mask);
          kxui.method.delClass(kxui.method.getDom('html', true), 'kxui-picture-html');
          kxui.method.delClass(kxui.method.getDom('body', true), 'kxui-picture-body');
        }, 300);
        return false;
      };
    },

    /**
     * 图片裁剪
     * @method cropImage
     * @for skeleton
     */
    cropImage: function (img) {

      // 图片原始尺寸
      let imgOriginWidth = img.naturalWidth;
      let imgOriginHeight = img.naturalHeight;

      // 图片长宽比，保证图片不变形
      let imgRatio = imgOriginWidth / imgOriginHeight;

      // 图片裁剪后的宽高， 默认值为原图宽高
      let imgCropedWidth = this.imgWidth;
      let imgCropedHeight = this.imgHeight;

      // 计算得出起始坐标点的偏移量, 由于是居中裁剪，因此等于 前后差值 / 2
      let dx = 0;
      let dy = (this.imgHeight / 2) - (imgCropedWidth / imgRatio / 2);

      // 创建画布，并将画布设置为裁剪后的宽高
      let cvs = document.createElement('canvas');
      let ctx = cvs.getContext('2d');
      cvs.width = imgCropedWidth;
      cvs.height = imgCropedHeight;

      // 绘制并导出图片
      ctx.drawImage(img, dx, dy, imgCropedWidth, imgCropedWidth / imgRatio);
      return cvs.toDataURL('image/jpeg', 0.9);
    }
  };

  /**
   * 加载依赖模块
   * @method carousel
   * @for Picture
   */
  (function carousel() {
    if (!kxui.carousel) {
      kxui.use('carousel', function () {}, false);
    }
  })();

  /**
   * 查看图片大图解决方案
   * @method Picture
   */
  let Picture = function () {
    this.name = 'Picture';
    this.info = 'Image magnification scheme';
  };

  Picture.fn = Picture.prototype;

  /**
   * 图片放大
   * @method enlarge
   * @for Picture
   * @param {object} parameter 配置参数
   */
  Picture.fn.enlarge = function (parameter) {
    this.logic = new Logic(parameter);
    delete this.logic;
  };

  // 根据引入方式暴露对象
  kxui.picture = new Picture();
  if (isExports) {
    kxui.picture = module.exports = new Picture();
  }
})(window);