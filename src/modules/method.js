/**
 * @method Method 常用开发解决方案
 * @author Lkx
 * @for kxui
 *
 * @method urlData 获取浏览器地址参数
 * @method delStr 移除指定字符
 * @method repStr 替换指定字符
 * @method insStr 插入指定字符
 * @method forStr 获取指定字符前面的字符
 * @method aftStr 获取指定字符后面的字符
 * @method midStr 获取指定字符中间的字符
 * @method verNum 数字验证
 * @method verPhone 国内手机号码验证
 * @method verId 身份证号码验证
 * @method verEmail 电子邮箱验证
 * @method hasClass 查询是否存在class值
 * @method addClass 增加class值
 * @method delClass 移除class值
 * @method setCache 设置本地缓存
 * @method getCache 获取本地缓存
 * @method delCache 删除本地缓存
 * @method compare 数据对比（内容、DOM及数据类型）
 * @method setHis 记录历史搜索信息
 * @method delHis 删除历史搜索信息
 * @method dateGet 获取当前时间戳
 * @method dateTurn 时间戳转换日期
 * @method dateChina 时间戳转换中文时间
 * @method getDome 获取节点
 * @method addDome 增加节点
 */

(function (win) {
  let isExports = typeof module !== 'undefined' && (module instanceof Object) && (module.exports instanceof Object)

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
    let result = window.location.search.match(new RegExp('[\\?\\&]' + data + '=([^\\&]+)', 'i'))
    if (result == null || result.length < 1) {
      return ''
    }
    return result[1]
  }

  /**
   * 移除指定字符
   * @method delStr
   * @for Method
   * @param {string} str 需要操作的字符串
   * @param {string} app 需要移除的字符
   * @return {string} 返回移除后的字符串
   */
  Method.fn.delStr = function (str, app) {
    let result = str.replace(new RegExp(app, 'g'), '')
    return result
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
    let result = str.replace(new RegExp(app, 'g'), rep)
    if (rep == null) {
      return ''
    }
    return result
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
    let newStr = str.split(after)
    if (typeof after === 'number') {
      return str.slice(0, after) + app + str.slice(after)
    } else if (typeof after === 'string' && newStr.length > 1) {
      newStr[1] = app + newStr[1]
      str = newStr.join(after)
    }
    return str
  }

  /**
   * 获取指定字符前面的字符
   * @method forStr
   * @for Method
   * @param {string} str 需要操作的字符串
   * @param {string} app 需要指定的字符
   * @return {string} 返回前后字符串或空
   */
  Method.fn.forStr = function (str, app) {
    let result = str.match(new RegExp('(\\S*)' + app))
    if (result == null || result.length < 1) {
      return ''
    }
    return result[1]
  }

  /**
   * 获取指定字符后面的字符
   * @method aftStr
   * @for Method
   * @param {string} str 需要操作的字符串
   * @param {string} app 需要指定的字符
   * @return {string} 返回前后字符串或空
   */
  Method.fn.aftStr = function (str, app) {
    let result = str.match(new RegExp(app + '(\\S*)'))
    if (result == null || result.length < 1) {
      return ''
    }
    return result[1]
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
    let result = str.match(new RegExp(fro + '(\\S*)' + aft))
    if (result == null || result.length < 1) {
      return ''
    }
    return result[1]
  }

  /**
   * 数字验证
   * @method verNum
   * @for Method
   * @param {string} data 需要验证的数据
   * @return {boolean} 根据验证情况进行返回布尔值
   */
  Method.fn.verNum = function (data) {
    let rules = /^\d+$/
    if (rules.test(data)) {
      return true
    }
    return false
  }

  /**
   * 国内手机号码验证
   * @method verPhone
   * @for Method
   * @param {string} data 需要验证的数据
   * @return {boolean} 根据验证情况进行返回布尔值
   */
  Method.fn.verPhone = function (data) {
    let rules = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/
    if (rules.test(data)) {
      return true
    }
    return false
  }

  /**
   * 身份证号码验证
   * @method verId
   * @for Method
   * @param {string} data 需要验证的数据
   * @return {boolean} 根据验证情况进行返回布尔值
   */
  Method.fn.verId = function (data) {
    let rules = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
    if (rules.test(data)) {
      return true
    }
    return false
  }

  /**
   * 电子邮箱验证
   * @method verEmail
   * @for Method
   * @param {string} data 需要验证的数据
   * @return {boolean} 根据验证情况进行返回布尔值
   */
  Method.fn.verEmail = function (data) {
    let rules = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
    if (rules.test(data)) {
      return true
    }
    return false
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
    cls = cls || ''
    if (cls.replace(/\s/g, '').length === 0) {
      return false
    }
    return new RegExp(' ' + cls + ' ').test(' ' + dom.className + ' ')
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
      dom.className = dom.className === '' ? cls : dom.className + ' ' + cls
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
      let newClass = ' ' + dom.className.replace(/[\t\r\n]/g, '') + ' '
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
   * @param {number} tim 设置缓存有效时间，单位1/1s
   * @return {boolean} 返回设置动作布尔值
   */
  Method.fn.setCache = function (key, val, tim) {
    localStorage.setItem(key, val)
    let seconds = parseInt(tim)
    if (seconds > 0) {
      let timestamp = Date.parse(new Date())
      timestamp = timestamp / 1000 + seconds
      localStorage.setItem(key + ' (method.time)', timestamp)
    }
    return true
  }

  /**
   * 获取本地缓存
   * @method getCache
   * @for Method
   * @param {string} key 读取缓存名称
   * @return {boolean} 返回获取动作布尔值
   */
  Method.fn.getCache = function (key) {
    let val = localStorage.getItem(key)
    let timestamp = parseInt(localStorage.getItem(key + ' (method.time)'))
    if (timestamp) {
      if (timestamp < Date.parse(new Date()) / 1000) {
        this.delCache(key)
        return false
      }
    }
    return val ? String(val) : false
  }

  /**
   * 删除本地缓存
   * @method delCache
   * @for Method
   * @param {string} key 删除缓存名称
   * @return {boolean} 返回删除动作布尔值
   */
  Method.fn.delCache = function (key) {
    localStorage.removeItem(key)
    localStorage.removeItem(key + ' (method.time)')
    return true
  }

  /**
   * 数据对比（内容、DOM及数据类型）
   * @method compare
   * @for Method
   * @param {all} dataOne 需要对比的数据一
   * @param {all} dataTwo 需要对比的数据二
   * @return {boolean} 返回数据是否相等的布尔值
   */
  Method.fn.compare = function (dataOne, dataTwo) {
    let object = Object
    let aProps = dataOne instanceof Object
    let bProps = dataTwo instanceof Object
    if (!aProps || !bProps) {
      return dataOne === dataTwo
    }
    if (object.keys(dataOne).length !== object.keys(dataTwo).length) {
      return false
    }
    for (let attr in dataOne) {
      let t1 = dataOne[attr] instanceof Object
      let t2 = dataTwo[attr] instanceof Object
      if (t1 && t2) {
        return this.diff(dataOne[attr], dataTwo[attr])
      } else if (dataOne[attr] !== dataTwo[attr]) {
        return false
      }
    }
    return true
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
    let bars = parseInt(num) || 999
    let history = this.getCache('(method.history)')
    let historyArray = []
    let json = JSON
    if (history && history.length > 0) {
      historyArray = json.parse(history)
      let temporaryOne = null
      let temporaryTwo = null
      let historyArrayLength = ((historyArray.length < bars) ? historyArray.length + 1 : historyArray.length)
      for (let i = 0; i < historyArrayLength; i++) {
        if (!this.compare(historyArray[i], data)) {
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
    this.setCache('(method.history)', json.stringify(historyArray))
    return historyArray
  }

  /**
   * 删除历史搜索信息
   * @method delHis
   * @for Method
   * @return {boolean} 返回获取动作布尔值
   */
  Method.fn.delHis = function () {
    localStorage.removeItem('(method.history)')
    return true
  }

  /**
   * 获取当前时间戳
   * @method dateGet
   * @for Method
   * @param {boolean} digit 时间戳长度，默认13位，可返回10位及13位时间戳
   * @return {number} 当前时间戳
   */
  Method.fn.dateGet = function (digit) {
    let digitc = ((typeof digit === 'boolean') ? digit : true)
    let result = digitc ? Date.parse(new Date()) : Number(Date.parse(new Date()).toString().substr(0, 10))
    return result
  }

  /**
   * 时间戳转换日期
   * @method dateTurn
   * @for Method
   * @param {string/number} tamp 需要转换的时间戳
   * @param {string} div 日期分割符号
   * @param {boolean} hour 是否显示时间
   * @return {string} 返回转换后的日期
   */
  Method.fn.dateTurn = function (tamp, div, hour) {
    let date = new Date((tamp.toString().length === 13) ? tamp : (tamp * 1000))
    let dateDiv = div ? String(div) : '-'
    let isHour = ((typeof hour === 'boolean') ? hour : true)
    let Y = date.getFullYear()
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
    let D = (date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate())
    let h = (date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours())
    let m = (date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes())
    let s = (date.getSeconds().toString().length === 1 ? '0' + date.getSeconds() : date.getSeconds())
    return Y + dateDiv + M + dateDiv + D + (isHour ? (' ' + h + ':' + m + ':' + s) : '')
  }

  /**
   * 时间戳转换中文时间
   * @method dateChina
   * @for Method
   * @param {string/number} tamp 需要转换的时间戳
   * @return {string} 返回转换后的中文日期
   */
  Method.fn.dateChina = function (tamp) {
    let tampLength = ((String(tamp).length === 13) ? 0 : 1)
    let m = 60 * 1000
    let h = m * 60
    let d = h * 24
    let T = this.dateGet()
    let differ = T - (tampLength === 0 ? tamp : tamp * 1000)
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

  /**
   * 获取节点
   * @method getDome
   * @for Method
   * @param {all} dome 节点名称/class值/id值/属性名称
   * @return {object} 节点对象
   */
  Method.fn.getDome = function (dome) {
    let domes = document.querySelectorAll(dome)
    if (domes.length === 1) {
      return domes[0]
    } else if (domes.length === 0) {
      return false
    }
    return domes
  }

  /**
   * 增加节点
   * @method addDome
   * @for Method
   * @param {string} str 字符串节点
   * @return {object} 节点对象
   */
  Method.fn.addDome = function (str) {
    let dom = document.createElement('div')
    dom.innerHTML = str
    return dom.childNodes[0]
  }

  if (isExports) {
    module.exports = new Method()
  } else {
    win.kxui.method = new Method()
  }
})(window)