/**
 * @method Method 常用开发解决方案
 * @author Lkx
 * @for kxui
 *
 * @method urlData 获取浏览器地址参数
 * @method repStr 替换指定字符
 * @method insStr 插入指定字符
 * @method queStr 获取指定字符前/后的所有字符
 * @method midStr 获取指定字符中间的字符
 * @method formTest 表单验证
 * @method hasClass 查询是否存在class值
 * @method addClass 增加class值
 * @method delClass 移除class值
 * @method setCache 设置本地缓存
 * @method getCache 获取本地缓存
 * @method delCache 删除本地缓存
 * @method compare 数据对比（内容与数据类型）
 * @method setHis 记录历史搜索信息
 * @method getHis 获取历史搜索信息
 * @method delHis 删除历史搜索信息
 * @method dateGet 获取当前时间戳
 * @method dateTurn 时间戳转换日期
 * @method dateChina 时间戳转换中文时间
 * @method getDom 获取节点
 * @method addDom 增加节点
 * @method atrDom 替换或创建自定义属性
 */

(function (win) {
  let kxui = win.kxui
  let isExports = (typeof module !== 'undefined') && (typeof module === 'object') && (typeof module.exports === 'object')

  /**
   * 方法的主入口
   * @method Method
   * 开发常用操作方法，可根据需要调用不同的方法
   */
  let Method = function () {
    this.name = 'Method'
    this.info = 'Integration of development methods'
  }

  Method.fn = Method.prototype

  /**
   * 获取浏览器地址参数
   * @method urlData
   * @for Method
   * @param {string} data 需要拿取的参数名
   * @return {string} 返回参数值或空
   */
  Method.fn.urlData = function (data) {
    if (data) {
      let result = win.location.search.match(new RegExp('[\\?\\&]' + data + '=([^\\&]+)', 'i'))
      return ((!result || result.length < 1) ? '' : result[1])
    }
    warn(0, 'urlData', 'data')
  }

  /**
   * 替换指定字符
   * @method repStr
   * @for Method
   * @param {string} str 需要操作的字符串
   * @param {string} app 需要替換的字符
   * @param {string} rep 替换之后的字符
   * @return {string} 返回移除后的字符串
   */
  Method.fn.repStr = function (str, app, rep) {
    if (str && app) {
      return str.replace(new RegExp(app, 'g'), (rep ? rep : ''))
    }
    warn(0, 'repStr', (str ? 'app' : 'str'))
  }

  /**
   * 插入指定字符
   * @method insStr
   * @for Method
   * @param {string} str 需要操作的字符串
   * @param {string/number} after 在某字符之后或某个下标之后增加
   * @param {string} app 需要插入的字符
   * @return {string} 返回插入后的字符串
   */
  Method.fn.insStr = function (str, after, app) {
    if (str && after && app) {
      let newStr = str.split(after)
      if (typeof after === 'number') {
        return (str.slice(0, after) + app + str.slice(after))
      } else if ((typeof after === 'string') && newStr.length > 1) {
        newStr[1] = app + newStr[1]
        str = newStr.join(after)
      }
      return str
    }
    warn(0, 'insStr', (str ? (after ? 'app' : 'after') : 'str'))
  }

  /**
   * 获取指定字符前/后的所有字符
   * @method queStr
   * @for Method
   * @param {string} str 需要操作的字符串
   * @param {string} app 需要指定的字符
   * @param {boolean} pos 前/后 默认(true)后
   * @return {string} 返回前后字符串或空
   */
  Method.fn.queStr = function (str, app, pos) {
    if (str && app) {
      let position = (typeof pos === 'boolean') ? pos : true
      let result = (position ? str.match(new RegExp(app + '(\\S*)')) : str.match(new RegExp('(\\S*)' + app)))
      return ((!result || result.length < 1) ? '' : result[1])
    }
    warn(0, 'queStr', (str ? 'app' : 'str'))
  }

  /**
   * 获取指定字符中间的字符
   * @method midStr
   * @for Method
   * @param {string} str 需要操作的字符串
   * @param {string} fro 前字符
   * @param {string} aft 后字符
   * @return {string} 返回参数值或空
   */
  Method.fn.midStr = function (str, fro, aft) {
    if (str && fro && aft) {
      let result = str.match(new RegExp(fro + '(\\S*)' + aft))
      return ((!result || result.length < 1) ? '' : result[1])
    }
    warn(0, 'midStr', (str ? (fro ? 'aft' : 'fro') : 'str'))
  }

  /**
   * 表单验证
   * @method formTest
   * @for Method
   * @param {string} data 需要验证的数据
   * @param {string} reg num:数字、phone手机号、id身份证和email邮箱
   * @return {boolean} 根据验证情况进行返回布尔值
   */
  Method.fn.formTest = function (data, reg) {
    if (data && reg) {
      let regs = {}
      regs.num = /^\d+$/
      regs.phone = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/
      regs.id = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
      regs.email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      return ((regs[reg] && regs[reg].test(data)) ? true : false)
    }
    warn(0, 'formTest', data ? 'reg' : 'data')
  }

  /**
   * 查询是否存在class值
   * @method hasClass
   * @for Method
   * @param {string} dom 需要操作的dom对象
   * @param {string} cls 需要查询的class名称
   * @return {boolean} 根据查询返回布尔值
   */
  Method.fn.hasClass = function (dom, cls) {
    let cla = cls || ''
    if (cla.replace(/\s/g, '').length === 0) {
      return false
    }
    return new RegExp(' ' + cla + ' ').test(' ' + dom.className + ' ')
  }

  /**
   * 增加class值
   * @method addClass
   * @for Method
   * @param {string} dom 需要操作的dom对象
   * @param {string} cls 需要增加的class名称
   * @return {boolean} 根据成功与否返回布尔值
   */
  Method.fn.addClass = function (dom, cls) {
    if (!this.hasClass(dom, cls)) {
      dom.className = ((dom.className === '') ? cls : (dom.className + ' ' + cls))
      return true
    }
    return false
  }

  /**
   * 移除class值
   * @method delClass
   * @for Method
   * @param {string} dom 需要操作的dom对象
   * @param {string} cls 需要移除的class名称
   * @return {boolean} 根据成功与否返回布尔值
   */
  Method.fn.delClass = function (dom, cls) {
    if (this.hasClass(dom, cls)) {
      let newClass = (' ' + dom.className.replace(/[\t\r\n]/g, '') + ' ')
      while (newClass.indexOf(' ' + cls + ' ') >= 0) {
        newClass = newClass.replace(' ' + cls + ' ', ' ')
      }
      dom.className = newClass.replace(/^\s+|\s+$/g, '')
      return true
    }
    return false
  }

  /**
   * 设置本地缓存
   * @method setCache
   * @for Method
   * @param {string} key 设置缓存名称
   * @param {string} val 设置缓存内容
   * @param {number} tim 设置缓存有效时间，单位 1/1s
   * @return {boolean} 返回设置动作布尔值
   */
  Method.fn.setCache = function (key, val, tim) {
    if (key && val) {
      localStorage.setItem(key, val)
      let seconds = parseInt(tim)
      if (seconds > 0) {
        let timestamp = (this.dateGet() + (seconds * 1000))
        localStorage.setItem(key + ' (method.time)', timestamp)
      }
      return true
    }
    warn(0, 'setCache', key ? 'val' : 'key')
  }

  /**
   * 获取本地缓存
   * @method getCache
   * @for Method
   * @param {string} key 读取缓存名称
   * @param {string} noWarn 是否抛出异常提示
   * @return {boolean} 返回获取动作布尔值
   */
  Method.fn.getCache = function (key, noWarn) {
    if (key) {
      let val = localStorage.getItem(key)
      let timestamp = parseInt(localStorage.getItem(key + ' (method.time)'))
      if (timestamp && (timestamp < this.dateGet())) {
        warn(1, key)
        this.delCache(key)
      }
      return (val ? String(val) : (noWarn === 'noWarn') ? '' : warn(1, key))
    }
    warn(0, 'getCache', 'key')
  }

  /**
   * 删除本地缓存
   * @method delCache
   * @for Method
   * @param {string} key 删除缓存名称
   * @return {boolean} 返回删除动作布尔值
   */
  Method.fn.delCache = function (key) {
    if (key) {
      localStorage.removeItem(key)
      localStorage.removeItem(key + ' (method.time)')
      return true
    }
    warn(0, 'delCache', 'key')
  }

  /**
   * 数据对比（内容与数据类型）
   * @method compare
   * @for Method
   * @param {all} dataOne 需要对比的数据一
   * @param {all} dataTwo 需要对比的数据二
   * @param {string} noWarn 是否抛出异常提示
   * @return {boolean} 返回数据是否相等的布尔值
   */
  Method.fn.compare = function (dataOne, dataTwo, noWarn) {
    if (dataOne && dataTwo) {
      let props1 = Object.getOwnPropertyNames(dataOne)
      let props2 = Object.getOwnPropertyNames(dataTwo)
      if (props1.length !== props2.length) {
        return false
      }
      for (let i = 0; i < props1.length; i++) {
        let propName = props1[i]
        if (dataOne[propName] !== dataTwo[propName]) {
          return false
        }
      }
      return true
    } else if (noWarn !== 'noWarn') {
      warn(0, 'compare', dataOne ? 'dataTwo' : 'dataOne')
    }
  }

  /**
   * 记录历史搜索信息
   * @method setHis
   * @for Method
   * @param {all} data 需要储存的历史记录
   * @param {number} num 需要记录历史缓存的数量
   * @return {object} 返回数组对象
   */
  Method.fn.setHis = function (data, num) {
    if (data) {
      let bars = parseInt(num) || 999
      let history = this.getCache('(method.history)', 'noWarn')
      let historyArray = []
      if (history && history.length > 0) {
        historyArray = JSON.parse(history)
        let temporaryOne = null
        let temporaryTwo = null
        let historyArrayLength = ((historyArray.length < bars) ? historyArray.length + 1 : historyArray.length)
        for (let i = 0; i < historyArrayLength; i++) {
          if (!this.compare(historyArray[i], data, 'noWarn')) {
            if (i === 0) {
              temporaryOne = historyArray[i]
              historyArray[i] = data
            } else {
              temporaryTwo = historyArray[i]
              historyArray[i] = temporaryOne
              temporaryOne = temporaryTwo
            }
          } else {
            return historyArray
          }
        }
      } else {
        historyArray[0] = data
      }
      this.setCache('(method.history)', JSON.stringify(historyArray))
      return historyArray
    }
    warn(0, 'setHis', 'data')
  }

  /**
   * 获取历史搜索信息
   * @method getHis
   * @for Method
   * @return {boolean} 返回获取动作布尔值
   */
  Method.fn.getHis = function () {
    return this.getCache('(method.history)', 'noWarn')
  }

  /**
   * 删除历史搜索信息
   * @method delHis
   * @for Method
   * @return {boolean} 返回获取动作布尔值
   */
  Method.fn.delHis = function () {
    return this.delCache('(method.history)')
  }

  /**
   * 获取当前时间戳
   * @method dateGet
   * @for Method
   * @param {boolean} digit 时间戳长度，默认13位(true)，可返回10位及13位时间戳
   * @return {number} 当前时间戳
   */
  Method.fn.dateGet = function (digit) {
    let digitc = (typeof digit === 'boolean') ? digit : true
    let result = (digitc ? Date.parse(new Date()) : Number(Date.parse(new Date()).toString().substr(0, 10)))
    return result
  }

  /**
   * 时间戳转换日期
   * @method dateTurn
   * @for Method
   * @param {string/number} tamp 需要转换的时间戳
   * @param {string} diy 日期分割符号
   * @param {boolean} hour 是否显示时/分/秒
   * @return {string} 返回转换后的日期
   */
  Method.fn.dateTurn = function (tamp, diy, hour) {
    if (tamp) {
      let date = new Date((tamp.toString().length === 13) ? tamp : (tamp * 1000))
      let dateDiv = diy ? String(diy) : '-'
      let isHour = (typeof hour === 'boolean') ? hour : true
      let Y = date.getFullYear()
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      let D = (date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate())
      let h = (date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours())
      let m = (date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes())
      let s = (date.getSeconds().toString().length === 1 ? '0' + date.getSeconds() : date.getSeconds())
      return Y + dateDiv + M + dateDiv + D + (isHour ? (' ' + h + ':' + m + ':' + s) : '')
    }
    warn(0, 'dateTurn', 'tamp')
  }

  /**
   * 时间戳转换中文时间
   * @method dateChina
   * @for Method
   * @param {string/number} tamp 需要转换的时间戳
   * @return {string} 返回转换后的中文日期
   */
  Method.fn.dateChina = function (tamp) {
    if (tamp) {
      let m = 60 * 1000
      let h = m * 60
      let d = h * 24
      let T = this.dateGet()
      let differ = T - ((String(tamp).length === 13) ? tamp : (tamp * 1000))
      if (differ < 0) {
        return
      }
      let mc = differ / m
      let hc = differ / h
      let dc = differ / d
      let result = null
      if (mc >= 1 && mc < 60) {
        result = ' ' + parseInt(mc) + ' 分钟前'
      } else if (hc >= 1 && hc < 24) {
        result = ' ' + parseInt(hc) + ' 小时前'
      } else if (dc >= 1 && dc < 2) {
        result = '昨天'
      } else if (dc >= 2 && dc < 3) {
        result = '前天'
      } else if (dc >= 3 && dc < 30) {
        result = ' ' + parseInt(dc) + ' 天前'
      } else if (dc >= 30) {
        result = this.dateTurn(tamp)
      } else {
        result = '刚刚'
      }
      return result
    }
    warn(0, 'dateChina', 'tamp')
  }

  /**
   * 获取节点
   * @method getDom
   * @for Method
   * @param {string} dom 节点名称/class值/id值/属性名称
   * @return {object} 节点对象
   */
  Method.fn.getDom = function (dom) {
    if (dom) {
      let doms = document.querySelectorAll(dom)
      if (doms.length === 1) {
        return doms[0]
      } else if (doms.length === 0) {
        return false
      }
      return doms
    }
    warn(0, 'getDom', 'dom')
  }

  /**
   * 增加节点
   * @method addDom
   * @for Method
   * @param {string} str 字符串节点
   * @return {object} 节点对象
   */
  Method.fn.addDom = function (str) {
    if (str) {
      let dom = document.createElement('div')
      dom.innerHTML = str
      return dom.childNodes[0]
    }
    warn(0, 'addDom', 'str')
  }

  /**
   * 替换或创建自定义属性
   * @method atrDom
   * @for Method
   * @param {string} dom 节点名称/class值/id值/属性名称
   * @param {string} key 自定义属性键
   * @param {string/number} value 自定义属性值
   * @return {boolean} 返回创建或查询对象结果
   */
  Method.fn.atrDom = function (dom, key, value) {
    if (dom && key) {
      let doms = (typeof dom === 'object') ? dom : this.getDom(dom)
      if (doms.length) {
        warn(2, dom)
      } else if (key && (typeof key === 'string') && value) {
        doms.setAttribute(key, value)
        return true
      } else if (key && (typeof key === 'string')) {
        return doms.getAttribute(key)
      }
      return false
    }
    warn(0, 'atrDom', (dom ? 'key' : 'dom'))
  }

  /**
   * 输出控制台警告
   * @method warn
   * @for Load
   * @param {number} num 输入警告文案编号
   * @param {string} name 发生错误的方法
   * @param {string} field 缺少的字段名
   */
  function warn(num, name, field) {
    let nums = {
      0: '方法 {' + name + '} 必填字段 {' + field + '} 不能为空',
      1: '缓存 {' + name + '} 不存在或已过期',
      2: 'DOM {' + name + '} 存在重复或不正确'
    }
    console.warn('kxui-' + kxui.version + '： ' + nums[num] + '。')
  }

  // 根据引入方式暴露对象
  if (!isExports) {
    kxui.method = new Method()
  } else {
    module.exports = new Method()
  }
})(window)