/**
 * @method Lazy 图片懒加载
 * @author Lkx
 * @for kxui
 * @for method
 *
 * @method load 使用懒加载
 */

(function (win) {
  let isExports = (typeof module !== 'undefined') && (typeof module === 'object') && (typeof module.exports === 'object')

  /**
   * 逻辑层
   * @method Lazy
   * @for Lazy
   * @param {object} parameter 配置参数
   */
  let Logic = function (parameter) {
    this.parameter = parameter
    this.threshold = this.parameter.threshold ? Number(this.parameter.threshold) : 10
    this.init()
  }

  Logic.prototype = {

    /**
     * 初始化判断是否存在method
     * @method init
     * @for Logic
     */
    init: function () {
      let that = this
      if (!win.kxui.method) {
        win.kxui.use('method', function () {
          that.method = win.kxui.method
          that.container()
        })
      } else {
        that.method = win.kxui.method
        that.container()
      }
    },

    /**
     * 容器配置
     * @method graphic
     * @for init
     */
    container: function () {
      let that = this
      that.img = that.method.getDome('img')

      // containers 是否存在外部容器
      that.containers = that.method.getDome(that.parameter.container)
      if (that.parameter.container && !that.containers) {
        warn(0, that.parameter.container)
      } else if (that.img) {
        this.static(((typeof that.img.length === 'number') ? true : false), ((typeof that.containers.length === 'number') ? true : false))
      } else {
        warn(1)
      }
    },

    /**
     * 静态加载
     * @method static
     * @param {boolean} many 是否存在多个对象
     * @param {boolean} manyCtr 是否存在多个容器
     * @for graphic
     */
    static: function (many, manyCtr) {
      let that = this
      if (manyCtr) {
        that.img = []
        for (let i = 0; i < that.containers.length; i++) {
          that.img[i] = {}
          let lt = 0
          let child = that.containers[i].childNodes
          for (let c = 0; c < child.length; c++) {
            if (child[c].nodeName !== "#text" && !/\s/.test(child.nodeValue)) {
              that.img[i][lt] = child[c]
              that.img[i].lt = lt + 1
              lt = lt + 1
            }
          }
          that.showImg(many, true, [that.containers[i], that.img[i]])
          that.event(many, true, [that.containers[i], that.img[i]])
        }
      } else {
        that.showImg(many, that.containers ? true : false)
        that.event(many, that.containers ? true : false)
      }
    },

    /**
     * 事件绑定
     * @method event
     * @param {boolean} many 是否存在多个对象
     * @param {boolean} abroad 是否存在外部容器
     * @param {object} manyCtr 多容器组合
     * @for static
     */
    event: function (many, abroad, manyCtr) {
      let that = this
      let dome = (typeof manyCtr === 'object') ? manyCtr[0] : that.containers ? that.containers : win

      /**
       * 滚动条监听事件
       * @method onscroll
       * @for event
       */
      dome.onscroll = function () {
        that.showImg(many, abroad, manyCtr)
      }
    },

    /**
     * 图片显示
     * @method showImg
     * @for static/event
     * @param {boolean} many 是否存在多个对象
     * @param {boolean} abroad 是否存在外部容器
     * @param {object} manyCtr 多容器组合
     */
    showImg: function (many, abroad, manyCtr) {
      let manyCtrSwitch = (typeof manyCtr === 'object') ? true : false
      let lazyImg = manyCtrSwitch ? manyCtr[1] : this.img
      let scrollTop = abroad ? manyCtrSwitch ? manyCtr[0].scrollTop : this.containers.scrollTop : (document.documentElement.scrollTop || document.body.scrollTop)
      let screenHeight = abroad ? manyCtrSwitch ? manyCtr[0].clientHeight : this.containers.clientHeight : (document.documentElement.clientHeight || document.body.clientHeight)
      if (many) {
        for (let i = 0; i < img.length; i++) {
          if (lazyImg[i].offsetTop - (abroad ? lazyImg[i].parentNode.offsetTop : 0) <= ((scrollTop + screenHeight) + this.threshold) && lazyImg[i].offsetTop >= ((scrollTop - screenHeight) - this.threshold)) {
            let src = this.method.attr(lazyImg[i], 'kxui-lazy')
            this.method.attr(lazyImg[i], 'src', src)
          }
        }
      } else {
        if (lazyImg.offsetTop - (abroad ? lazyImg.parentNode.offsetTop : 0) <= ((scrollTop + screenHeight) + this.threshold) && lazyImg.offsetTop >= ((scrollTop - screenHeight) - this.threshold)) {
          let src = this.method.attr(lazyImg, 'kxui-lazy')
          this.method.attr(lazyImg, 'src', src)
        }
      }
    }
  }

  /**
   * 输出控制台警告
   * @method warn
   * @for Load
   * @param {number} num 输入警告文案编号
   * @param {string} dome 发生错误的节点
   */
  function warn(num, dome) {
    let nums = {
      0: '容器 {' + dome + '} 不存在',
      1: '当前页面未发现 <img> 标签'
    }
    console.warn('kxui (lazy)： ' + nums[num] + '。')
  }

  /**
   * 方法的主入口
   * @method Lazy
   * 懒加载入口构造函数
   */
  let Lazy = function () {
    this.name = 'Lazy'
    this.info = 'Lazy loading of pictures'
  }

  Lazy.fn = Lazy.prototype

  /**
   * 图片懒加载
   * @method load
   * @for Lazy
   * @param {object} parameter 配置参数
   */
  Lazy.fn.load = function (parameter) {
    let parameters = (typeof parameter === 'object') ? parameter : {}
    new Logic(parameters)
  }

  // 根据引入方式暴露对象
  if (isExports) {
    module.exports = new Lazy()
  } else {
    win.kxui.lazy = new Lazy()
  }
})(window)