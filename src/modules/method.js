/**
 * @method Method 常用开发解决方案
 * @author Lkx
 * @for kxui
 *
 * @method urlData 获取浏览器地址参数
 * @method repStr 替换指定字符(通过已知字符查找)
 * @method chaStr 替换指定字符(通过下标查找)
 * @method insStr 插入指定字符
 * @method queStr 获取指定字符前/后的所有字符
 * @method midStr 获取指定字符中间的字符
 * @method sortArr 数组排序(冒泡排序)
 * @method delRepArr 数组去重
 * @method countArr 元素在数组中出现的次数
 * @method conArr 判断数组是否包含某个元素
 * @method filArr 数组filter(搜索功能)
 * @method delEle 删除数组中某个元素(通过已知元素查找)
 * @method remEle 删除数组中某个元素(通过下标查找)
 * @method intersect 对比数组取出交集
 * @method formTest 表单验证
 * @method hasClass 查询是否存在class值
 * @method addClass 增加class值
 * @method delClass 移除class值
 * @method setCache 设置本地缓存
 * @method getCache 获取本地缓存
 * @method delCache 删除本地缓存
 * @method setCookie 设置cookie
 * @method getCookie 获取cookie
 * @method delCookie 删除cookie
 * @method compare 数据对比(内容与数据类型)
 * @method setHis 记录历史搜索信息
 * @method getHis 获取历史搜索信息
 * @method delHis 删除历史搜索信息
 * @method dateGet 获取当前时间戳
 * @method dateAppoint 获取指定时间戳
 * @method dateTurn 时间戳转换日期
 * @method dateChina 时间戳转换中文时间
 * @method getDom 获取节点(转为原生dom节点)
 * @method addDom 增加节点
 * @method atrDom 替换或创建自定义属性
 * @method sonDom 获取一层子节点
 * @method sonQueDom 获取指定子节点
 * @method random 生成指定长度的随机字符串
 * @method randomNum 生成随机数字
 * @method randomColor 生成随机颜色
 * @method mouse 获取鼠标/手势位置
 * @method accAdd 防误差加法运算
 * @method accSub 防误差减法运算
 * @method accMul 防误差乘法运算
 * @method accDiv 防误差除法运算
 * @method middle 元素居中(需自行增加position定位)
 * @method decimal 保留任意位小数(四舍五入)
 * @method money 金钱显示格式(每隔三位数字添加一个逗号)
 * @method bankCard 银行卡号(每隔四个数字添加一个空格)
 * @method aniScroll 滚动条滚动动画
 * @method stopProp 阻止事件冒泡
 * @method utf8 字符串转换为UTF-8编码
 * @method deepCopy 对象深拷贝
 * @method copyText 复制文本到剪贴板
 * @method setStyle 设置元素样式(行内样式)
 * @method getStyle 获取元素样式
 * @method delSpace 字符串/对象去空格，对一个对象中每个值进行安全检测， 去空格操作
 * @method repLabel HTML标签替换
 * @method enter 键盘回车事件
 * @method imgLoad 图片自适应裁剪
 */

(function (win) {
  let kxui = win.kxui;
  let isExports = (typeof module !== 'undefined') && (typeof module === 'object') && (typeof module.exports === 'object');

  /**
   * 常用开发解决方案
   * @method Method
   */
  let Method = function () {
    this.name = 'Method';
    this.info = 'Integration of development methods';
  };

  Method.fn = Method.prototype;

  /**
   * 获取浏览器地址参数
   * @method urlData
   * @for Method
   * @param {string} data 需要拿取的参数名
   * @return {string} 返回参数值或空
   */
  Method.fn.urlData = function (data) {
    if (data) {
      let result = win.location.search.match(new RegExp('[\\?\\&]' + data + '=([^\\&]+)', 'i'));
      return ((!result || result.length < 1) ? '' : result[1]);
    }
    throws(0, 'urlData', 'data');
  };

  /**
   * 替换指定字符(通过已知字符查找)
   * @method repStr
   * @for Method
   * @param {string} str 需要操作的字符串
   * @param {string} app 需要替換的字符
   * @param {string} rep 替换之后的字符(不填将默认为空)
   * @return {string} 返回替换后的字符串
   */
  Method.fn.repStr = function (str, app, rep) {
    rep = rep || '';
    if (str && (app || app === 0)) {
      str = String(str);
      return String(str).replace(new RegExp(app, 'g'), rep);
    }
    throws(0, 'repStr', (str ? 'app' : 'str'));
  };

  /**
   * 替换指定字符(通过下标查找)
   * @method chaStr
   * @for Method
   * @param {string} str 需要操作的字符串
   * @param {number} ind 需要替換的下标(不填将默认为0)
   * @param {string} rep 替换之后的字符(不填将默认为0)
   * @return {string} 返回替换后的字符串
   */
  Method.fn.chaStr = function (str, ind, rep) {
    str = String(str);
    ind = Number(ind) || 0;
    rep = rep || 0;
    if (str) {
      let iBeginPos = 0;
      let sFrontPart = str.substr(iBeginPos, ind);
      let sTailPart = str.substr(ind + 1, str.length);
      let sRet = sFrontPart + rep + sTailPart;
      return sRet;
    }
    throws(0, 'chaStr', 'str');
  };

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
      str = String(str);
      let newStr = str.split(after);
      if (typeof after === 'number') {
        return (str.slice(0, after) + app + str.slice(after));
      } else if ((typeof after === 'string') && newStr.length > 1) {
        newStr[1] = app + newStr[1];
        str = newStr.join(after);
      }
      return str;
    }
    throws(0, 'insStr', (str ? (after ? 'app' : 'after') : 'str'));
  };

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
      str = String(str);
      let position = (typeof pos === 'boolean') ? pos : true;
      let result = (position ? str.match(new RegExp(app + '(\\S*)')) : str.match(new RegExp('(\\S*)' + app)));
      return ((!result || result.length < 1) ? '' : result[1]);
    }
    throws(0, 'queStr', (str ? 'app' : 'str'));
  };

  /**
   * 获取指定字符中间的字符
   * @method midStr
   * @for Method
   * @param {string} str 需要操作的字符串
   * @param {string} fro 前字符
   * @param {string} aft 后字符
   * @return {string} 返回中间的字符串或空
   */
  Method.fn.midStr = function (str, fro, aft) {
    if (str && fro && aft) {
      str = String(str);
      let result = str.match(new RegExp(fro + '(\\S*)' + aft));
      return ((!result || result.length < 1) ? '' : result[1]);
    }
    throws(0, 'midStr', (str ? (fro ? 'aft' : 'fro') : 'str'));
  };

  /**
   * 数组排序(冒泡排序)
   * @method sortArr
   * @for Method
   * @param {Array} arr 需要操作的数组
   * @param {boolean} dir true:正序/false:倒序
   * @return {Array} 返回排序后数组
   */
  Method.fn.sortArr = function (arr, dir) {
    if (arr) {
      let temp = [];
      dir = (typeof dir === 'boolean') ? dir : true;
      for (let i = 0; i < arr.length - 1; i++) {
        let bool = true;
        for (let j = 0; j < arr.length - 1 - i; j++) {
          let condition = (dir ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1]);
          if (condition) {
            temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            bool = false;
          }
        }
        if (bool) {
          break;
        }
      }
      return arr;
    }
    throws(0, 'sortArr', 'arr');
  };

  /**
   * 数组去重
   * @method delRepArr
   * @for Method
   * @param {Array} arr 需要操作的数组
   * @return {Array} 返回去重后的数组
   */
  Method.fn.delRepArr = function (arr) {
    if (arr) {
      return Array.from(new Set(arr));
    }
    throws(0, 'delRepStr', 'arr');
  };

  /**
   * 元素在数组中出现的次数
   * @method countArr
   * @for Method
   * @param {Array} arr 需要操作的数组
   * @param {string} ele 要查找的元素
   * @return {string} 返回去重后的数组
   */
  Method.fn.countArr = function (arr, ele) {
    if (arr && ele) {
      let num = 0;
      for (let i = 0, len = arr.length; i < len; i++) {
        if (ele === arr[i]) {
          num++;
        }
      }
      return num;
    }
    throws(0, 'countArr', (arr ? 'ele' : 'arr'));
  };

  /**
   * 判断数组是否包含某个元素
   * @method conArr
   * @for Method
   * @param {Array} arr 需要操作的数组
   * @param {string} ele 需要查找的元素
   * @return {boolean} 是否包含
   */
  Method.fn.conArr = function (arr, ele) {
    if (arr && ele) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === ele) {
          return true;
        }
      }
      return false;
    }
    throws(0, 'conArr', arr ? 'ele' : 'arr');
  };

  /**
   * 数组filter(搜索功能)
   * @method filArr
   * @for Method
   * @param {Array} arr 需要操作的数组
   * @param {string} que 需要查找的元素
   * @return {Array} 包含que的数组
   */
  Method.fn.filArr = function (arr, que) {
    if (arr && que) {
      return arr.filter(function (el) {
        return el.toLowerCase().indexOf(que.toLowerCase()) > -1;
      });
    }
    throws(0, 'filArr', arr ? 'que' : 'arr');
  };

  /**
   * 删除数组中某个元素(通过已知元素查找)
   * @method delEle
   * @for Method
   * @param {Array} arr 需要操作的数组
   * @param {string} app 需要删除的字符
   * @return {Array} 返回新数组
   */
  Method.fn.delEle = function (arr, app) {
    if (arr && (app || app === 0)) {
      let index = arr.indexOf(app);
      if (index >= 0) {
        arr.splice(index, 1);
      }
      return arr;
    }
    throws(0, 'delEle', arr ? 'app' : 'arr');
  };

  /**
   * 删除数组中某个元素(通过下标查找)
   * @method remEle
   * @for Method
   * @param {Array} arr 需要操作的数组
   * @param {Array} ind 需要删除的下标
   * @return {Array} 返回新数组
   */
  Method.fn.remEle = function (arr, ind) {
    if (arr && (ind || ind === 0)) {
      for (let i = 0; i < arr.length; i++) {
        let I = arr.indexOf(arr[i]);
        if (ind === I) {
          arr.splice(I, 1);
        }
      }
      return arr;
    }
    throws(0, 'remEle', arr ? 'ind' : 'arr');
  };

  /**
   * 对比数组取出交集
   * @method intersect
   * @for Method
   * @param {Array} 对比数组一
   * @param {Array} 对比数组二
   * @return {Array} 交集数组
   */
  Method.fn.intersect = function () {
    let result = [];
    let obj = {};
    for (let i = 0; i < arguments.length; i++) {
      for (let j = 0; j < arguments[i].length; j++) {
        let str = arguments[i][j];
        if (!obj[str]) {
          obj[str] = 1;
        } else {
          obj[str]++;
          if (obj[str] === arguments.length) {
            result.push(str);
          }
        }
      }
    }
    return result;
  };

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
      let regs = {};
      regs.num = /^\d+$/;
      regs.phone = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
      regs.id = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
      regs.email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      return ((regs[reg] && regs[reg].test(data)) ? true : false);
    }
    throws(0, 'formTest', data ? 'reg' : 'data');
  };

  /**
   * 查询是否存在class值
   * @method hasClass
   * @for Method/addClass/delClass
   * @param {string} dom 节点名称/class值/id值/属性名称/原生dom对象/jquery对象
   * @param {string} cls 需要查询的class名称
   * @return {boolean} 根据查询返回布尔值
   */
  Method.fn.hasClass = function (dom, cls) {
    if (dom && cls) {
      dom = this.getDom(dom);
      if (cls.replace(/\s/g, '').length === 0) {
        return false;
      }
      return new RegExp(' ' + cls + ' ').test(' ' + dom.className + ' ');
    }
    throws(0, 'hasClass', dom ? 'cls' : 'dom');
  };

  /**
   * 增加class值
   * @method addClass
   * @for Method
   * @param {string} dom 节点名称/class值/id值/属性名称/原生dom对象/jquery对象
   * @param {string} cls 需要增加的class名称
   * @return {boolean} 根据成功与否返回布尔值
   */
  Method.fn.addClass = function (dom, cls) {
    if (dom && cls) {
      dom = this.getDom(dom);
      if (!this.hasClass(dom, cls)) {
        dom.className = ((dom.className === '') ? cls : (dom.className + ' ' + cls));
        return true;
      }
      return false;
    }
    throws(0, 'addClass', dom ? 'cls' : 'dom');
  };

  /**
   * 移除class值
   * @method delClass
   * @for Method
   * @param {string} dom 节点名称/class值/id值/属性名称/原生dom对象/jquery对象
   * @param {string} cls 需要移除的class名称
   * @return {boolean} 根据成功与否返回布尔值
   */
  Method.fn.delClass = function (dom, cls) {
    if (dom && cls) {
      dom = this.getDom(dom);
      if (this.hasClass(dom, cls)) {
        let newClass = (' ' + dom.className.replace(/[\t\r\n]/g, '') + ' ');
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
          newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        dom.className = newClass.replace(/^\s+|\s+$/g, '');
        return true;
      }
      return false;
    }
    throws(0, 'delClass', dom ? 'cls' : 'dom');
  };

  /**
   * 设置本地缓存
   * @method setCache
   * @for Method/setHis
   * @param {string} key 设置缓存名称
   * @param {string} val 设置缓存内容
   * @param {number} tim 设置缓存有效时间，单位 1000/1s
   * @return {boolean} 返回设置动作布尔值
   */
  Method.fn.setCache = function (key, val, tim) {
    if (key && val) {
      if (typeof val !== 'function') {
        val = (typeof val === 'object' ? JSON.stringify(val) : val);
        localStorage.setItem(key, val);
        let seconds = parseInt(tim);
        if (seconds > 0) {
          let timestamp = (this.dateGet() + seconds);
          localStorage.setItem(key + ' (method.time)', timestamp);
        }
        return true;
      }
      throws(2, 'setCache');
      return false;
    }
    throws(0, 'setCache', key ? 'val' : 'key');
  };

  /**
   * 获取本地缓存
   * @method getCache
   * @for Method/setHis/getHis
   * @param {string} key 读取缓存名称
   * @return {string/boolean} 返回获取值或布尔值
   */
  Method.fn.getCache = function (key) {
    if (key) {
      let val = JSON.parse(localStorage.getItem(key));
      let timestamp = parseInt(localStorage.getItem(key + ' (method.time)'));
      if (timestamp && (timestamp < this.dateGet())) {
        this.delCache(key);
        return false;
      }
      return val;
    }
    throws(0, 'getCache', 'key');
  };

  /**
   * 删除本地缓存
   * @method delCache
   * @for Method/getCache/delHis
   * @param {string} key 删除缓存名称
   * @return {boolean} 返回删除动作布尔值
   */
  Method.fn.delCache = function (key) {
    if (key) {
      localStorage.removeItem(key);
      localStorage.removeItem(key + ' (method.time)');
      return true;
    }
    throws(0, 'delCache', 'key');
  };

  /**
   * 设置cookie
   * @method setCookie
   * @for Method
   * @param {string} key 设置cookie名称
   * @param {string} val 设置cookie内容
   * @param {number} tim 设置cookie有效时间，单位 1/1天
   * @return {boolean} 返回设置动作布尔值
   */
  Method.fn.setCookie = function (key, val, tim) {
    if (key && val) {
      if (typeof val !== 'function') {
        val = (typeof val === 'object' ? JSON.stringify(val) : val);
        let oDate = new Date();
        let seconds = parseInt(tim);
        oDate.setDate(oDate.getDate() + seconds);
        document.cookie = key + '=' + val + ';expires=' + oDate;
        return true;
      }
      throws(2, 'setCookie');
      return false;
    }
    throws(0, 'setCookie', key ? 'val' : 'key');
  };

  /**
   * 获取cookie
   * @method getCookie
   * @for Method
   * @param {string} key 读取cookie名称
   * @return {string/boolean} 返回获取值或布尔值
   */
  Method.fn.getCookie = function (key) {
    if (key) {
      let arr = document.cookie.split('; ');
      for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=');
        if (arr2[0] === key) {
          return JSON.parse(arr2[1]);
        }
      }
      return false;
    }
    throws(0, 'getCookie', 'key');
  };

  /**
   * 删除cookie
   * @method delCookie
   * @for Method
   * @param {string} key 删除cookie名称
   * @return {boolean} 返回删除动作布尔值
   */
  Method.fn.delCookie = function (key) {
    if (key) {
      this.setCookie(key, 1, -1);
      return true;
    }
    throws(0, 'delCookie', 'key');
  };

  /**
   * 数据对比(内容与数据类型)
   * @method compare
   * @for Method/setHis
   * @param {all} dataOne 需要对比的数据一
   * @param {all} dataTwo 需要对比的数据二
   * @param {string} noThrows 是否抛出异常提示
   * @return {boolean} 返回数据是否相等的布尔值
   */
  Method.fn.compare = function (dataOne, dataTwo, noThrows) {
    if (dataOne && dataTwo) {
      let props1 = Object.getOwnPropertyNames(dataOne);
      let props2 = Object.getOwnPropertyNames(dataTwo);
      if (props1.length !== props2.length) {
        return false;
      }
      for (let i = 0; i < props1.length; i++) {
        let propName = props1[i];
        if (dataOne[propName] !== dataTwo[propName]) {
          return false;
        }
      }
      return true;
    } else if (noThrows !== 'noThrows') {
      throws(0, 'compare', dataOne ? 'dataTwo' : 'dataOne');
    }
  };

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
      let bars = parseInt(num) || 6;
      let history = this.getCache('(method.history)');
      let historyArray = [];
      if (history && history.length > 0) {
        historyArray = JSON.parse(history);
        let temporaryOne = null;
        let temporaryTwo = null;
        let historyArrayLength = ((historyArray.length < bars) ? historyArray.length + 1 : historyArray.length);
        for (let i = 0; i < historyArrayLength; i++) {
          if (!this.compare(historyArray[i], data, 'noThrows')) {
            if (i === 0) {
              temporaryOne = historyArray[i];
              historyArray[i] = data;
            } else {
              temporaryTwo = historyArray[i];
              historyArray[i] = temporaryOne;
              temporaryOne = temporaryTwo;
            }
          } else {
            return historyArray;
          }
        }
      } else {
        historyArray[0] = data;
      }
      this.setCache('(method.history)', JSON.stringify(historyArray));
      return historyArray;
    }
    throws(0, 'setHis', 'data');
  };

  /**
   * 获取历史搜索信息
   * @method getHis
   * @for Method
   * @return {boolean} 返回获取动作布尔值
   */
  Method.fn.getHis = function () {
    let history = this.getCache('(method.history)');
    if (history) {
      return JSON.parse(history);
    }
    return false;
  };

  /**
   * 删除历史搜索信息
   * @method delHis
   * @for Method
   * @return {boolean} 返回获取动作布尔值
   */
  Method.fn.delHis = function () {
    return this.delCache('(method.history)');
  };

  /**
   * 获取当前时间戳
   * @method dateGet
   * @for Method/setCache/getCache/dateChina
   * @param {boolean} digit 时间戳长度，默认13位(true)，可返回10位及13位时间戳
   * @return {number} 当前时间戳
   */
  Method.fn.dateGet = function (digit) {
    digit = (typeof digit === 'boolean') ? digit : true;
    let result = (digit ? Date.parse(new Date()) : Number(Date.parse(new Date()).toString().substr(0, 10)));
    return result;
  };

  /**
   * 获取指定时间戳
   * @method dateAppoint
   * @for Method
   * @param {string} time 指定日期，格式例：xxxx-xx-xx xx:xx
   * @return {number} 指定时间戳
   */
  Method.fn.dateAppoint = function (time) {
    if (time) {
      let date = new Date();
      date.setFullYear(time.substring(0, 4));
      date.setMonth(time.substring(5, 7) - 1);
      date.setDate(time.substring(8, 10));
      date.setHours(time.substring(11, 13));
      date.setMinutes(time.substring(14, 16));
      date.setSeconds(time.substring(17, 19));
      return Date.parse(date) / 1000;
    }
    throws(0, 'dateAppoint', 'time');
  };

  /**
   * 时间戳转换日期
   * @method dateTurn
   * @for Method/dateChina
   * @param {string/number} tamp 需要转换的时间戳
   * @param {string} diy 日期分割符号
   * @param {boolean} hour 是否显示时/分/秒
   * @return {string} 返回转换后的日期
   */
  Method.fn.dateTurn = function (tamp, diy, hour) {
    if (tamp) {
      let date = new Date((tamp.toString().length === 13) ? tamp : (tamp * 1000));
      let dateDiv = diy ? String(diy) : '-';
      let isHour = (typeof hour === 'boolean') ? hour : true;
      let Y = date.getFullYear();
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      let D = (date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate());
      let h = (date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours());
      let m = (date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes());
      let s = (date.getSeconds().toString().length === 1 ? '0' + date.getSeconds() : date.getSeconds());
      return Y + dateDiv + M + dateDiv + D + (isHour ? (' ' + h + ':' + m + ':' + s) : '');
    }
    throws(0, 'dateTurn', 'tamp');
  };

  /**
   * 时间戳转换中文时间
   * @method dateChina
   * @for Method
   * @param {string/number} tamp 需要转换的时间戳
   * @return {string} 返回转换后的中文日期，显示方式：刚刚 x分钟前 x小数前 昨天 前天 x天前 xxxx-xx-xx xx:xx
   */
  Method.fn.dateChina = function (tamp) {
    if (tamp) {
      let m = 60 * 1000;
      let h = m * 60;
      let d = h * 24;
      let T = this.dateGet();
      let differ = T - ((String(tamp).length === 13) ? tamp : (tamp * 1000));
      if (differ < 0) {
        return;
      }
      let mc = differ / m;
      let hc = differ / h;
      let dc = differ / d;
      let result = null;
      if (mc >= 1 && mc < 60) {
        result = ' ' + parseInt(mc) + ' 分钟前';
      } else if (hc >= 1 && hc < 24) {
        result = ' ' + parseInt(hc) + ' 小时前';
      } else if (dc >= 1 && dc < 2) {
        result = '昨天';
      } else if (dc >= 2 && dc < 3) {
        result = '前天';
      } else if (dc >= 3 && dc < 30) {
        result = ' ' + parseInt(dc) + ' 天前';
      } else if (dc >= 30) {
        result = this.dateTurn(tamp, '-', false);
      } else {
        result = '刚刚';
      }
      return result;
    }
    throws(0, 'dateChina', 'tamp');
  };

  /**
   * 获取节点(转为原生dom节点)
   * @method getDom
   * @for Method/hasClass/addClass/delClass/atrDom/copyText/enter/imgLoad
   * @param {string/object} dom 节点名称/class值/id值/属性名称/原生dom对象/jquery对象
   * @param {boolean} top 是否获取最顶层节点(默认为false，查看IFrame当前层)
   * @return {object} 节点对象
   */
  Method.fn.getDom = function (dom, top) {
    top = ((typeof top === 'boolean') ? top : false);
    let extract = function () {
      if (typeof dom === 'object') {
        return dom;
      } else if (typeof dom === 'string') {
        dom = (top ? win.top.document.querySelectorAll(dom) : document.querySelectorAll(dom));
        if (dom.length === 1) {
          return dom[0];
        } else if (dom.length === 0) {
          return false;
        }
        return dom;
      }
    };
    if (dom) {
      try {
        if (dom instanceof jQuery) {
          return dom[0];
        }
        return extract();
      } catch (e) {
        return extract();
      }
    }
    throws(0, 'getDom', 'dom');
  };

  /**
   * 增加节点
   * @method addDom
   * @for Method
   * @param {string} str 字符串节点
   * @return {object} 节点对象
   */
  Method.fn.addDom = function (str) {
    if (str) {
      let dom = document.createElement('div');
      dom.innerHTML = str;
      return dom.childNodes[0];
    }
    throws(0, 'addDom', 'str');
  };

  /**
   * 替换或创建自定义属性
   * @method atrDom
   * @for Method
   * @param {string} dom 节点名称/class值/id值/属性名称/原生dom对象/jquery对象
   * @param {string} key 自定义属性键
   * @param {string/number} value 自定义属性值
   * @return {boolean} 返回创建或查询对象结果
   */
  Method.fn.atrDom = function (dom, key, value) {
    if (dom && key) {
      dom = this.getDom(dom);
      if (dom.length) {
        throws(1, dom);
      } else if (key && (typeof key === 'string') && value) {
        dom.setAttribute(key, value);
        return true;
      } else if (key && (typeof key === 'string')) {
        return dom.getAttribute(key);
      }
      return false;
    }
    throws(0, 'atrDom', (dom ? 'key' : 'dom'));
  };

  /**
   * 获取一层子节点
   * @method sonDom
   * @for Method/sonQueDom
   * @param {string} dom 节点名称/class值/id值/属性名称/原生dom对象/jquery对象
   * @return {object} 子节点对象
   */
  Method.fn.sonDom = function (dom) {
    if (dom) {
      dom = this.getDom(dom);
      let child = dom.childNodes;
      if (child) {
        let postChild = [];
        for (let i = 0; i < child.length; i++) {
          if (!(child[i].nodeType === 3 && child[i].nodeName === '#text' && !/\S/.test(child[i].nodeValue))) {
            postChild.push(child[i]);
          }
        }
        return postChild;
      } else {
        return false;
      }
    }
    throws(0, 'sonDom', 'dom');
  };

  /**
   * 获取指定子节点
   * @method sonQueDom
   * @for Method
   * @param {string} father 父节点名称/class值/id值/属性名称/原生dom对象/jquery对象
   * @param {string} dom 子节点名称/class值/id值
   * @return {object} 子节点对象
   */
  Method.fn.sonQueDom = function (father, dom) {
    let that = this;
    let result = [];
    if (father && dom) {
      father = that.getDom(father);
      findRecursion(that.sonDom(father));
      return result;
    }

    function findRecursion(fathers) {
      for (let i = 0; i < fathers.length; i++) {
        if ('#' + fathers[i].id === dom || '.' + fathers[i].className === dom || fathers[i].tagName === dom.toUpperCase()) {
          result.push(fathers[i]);
          if (that.sonDom(fathers[i]).length > 0) {
            findRecursion(that.sonDom(fathers[i]));
          }
        } else if (that.sonDom(fathers[i]).length > 0) {
          findRecursion(that.sonDom(fathers[i]));
        }
      }
    }
    throws(0, 'sonQueDom', (father ? 'dom' : 'father'));
  };

  /**
   * 生成指定长度的随机字符串
   * @method random
   * @for Method
   * @param {string} len 随机字符串长度
   * @return {string} 返回随机结果
   */
  Method.fn.random = function (len) {
    if (len) {
      len = Number(len);
      for (let str = ''; str.length < len; str += Math.random().toString(36).substr(2));
      return str.substr(0, len);
    }
    throws(0, 'random', 'len');
  };

  /**
   * 生成随机数字
   * @method randomNum
   * @for Method/randomColor
   * @param {string/number} a 开始区间(默认0)
   * @param {string/number} b 结束区间(默认255)
   * @return {string} 返回随机结果
   */
  Method.fn.randomNum = function (a, b) {
    if (arguments.length === 2) {
      return Math.round(a + Math.random() * (b - a));
    } else if (arguments.length === 1) {
      return Math.round(Math.random() * a);
    } else {
      return Math.round(Math.random() * 255);
    }
  };

  /**
   * 生成随机颜色
   * @method randomColor
   * @for Method
   * @param {string} type 颜色类型 true:RGB/false:二进制颜色
   * @return {string} 返回随机结果
   */
  Method.fn.randomColor = function (type) {
    type = (typeof type === 'boolean') ? type : true;
    if (type) {
      return 'rgb(' + this.randomNum(255) + ',' + this.randomNum(255) + ',' + this.randomNum(255) + ')';
    } else {
      return '#' + Math.random().toString(16).substring(2).substr(0, 6);
    }
  };

  /**
   * 获取鼠标/手势位置
   * @method mouse
   * @for Method
   * @return {object} 鼠标当前所在位置
   */
  Method.fn.mouse = function (e) {
    let ev = e || win.event;
    let x = 0;
    let y = 0;
    if (kxui.info().device === 'pc') {
      if (ev.pageX) {
        x = ev.pageX;
        y = ev.pageY;
      } else {
        let sleft = 0;
        let stop = 0;
        if (document.documentElement) {
          stop = document.documentElement.scrollTop;
          sleft = document.documentElement.scrollLeft;
        } else {
          stop = document.body.scrollTop;
          sleft = document.body.scrollLeft;
        }
        x = ev.clientX + sleft;
        y = ev.clientY + stop;
      }
    } else {
      let touch = e.changedTouches[0];
      x = Number(touch.pageX);
      y = Number(touch.pageY);
    }
    return {
      x: x,
      y: y
    };
  };

  /**
   * 防误差加法运算
   * @method accAdd
   * @for Method
   * @param {string/number} a 计算数
   * @param {string/number} b 计算数
   * @return {number} 计算结果
   */
  Method.fn.accAdd = function (a, b) {
    if (a && b) {
      let r1, r2, m;
      try {
        r1 = a.toString().split('.')[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = b.toString().split('.')[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      return (a * m + b * m) / m;
    }
    throws(0, 'accAdd', a ? 'b' : 'a');
  };

  /**
   * 防误差减法运算
   * @method accSub
   * @for Method
   * @param {string/number} a 计算数
   * @param {string/number} b 计算数
   * @return {number} 计算结果
   */
  Method.fn.accSub = function (a, b) {
    if (a && b) {
      let r1, r2, m, n;
      try {
        r1 = a.toString().split('.')[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = b.toString().split('.')[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      n = (r1 >= r2) ? r1 : r2;
      return ((a * m - b * m) / m).toFixed(n);
    }
    throws(0, 'accSub', a ? 'b' : 'a');
  };

  /**
   * 防误差乘法运算
   * @method accMul
   * @for Method
   * @param {string/number} a 计算数
   * @param {string/number} b 计算数
   * @return {number} 计算结果
   */
  Method.fn.accMul = function (a, b) {
    if (a && b) {
      let m = 0;
      let s1 = a.toString();
      let s2 = b.toString();
      try {
        m += s1.split('.')[1].length;
      } catch (e) {}
      try {
        m += s2.split('.')[1].length;
      } catch (e) {}
      return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
    }
    throws(0, 'accMul', a ? 'b' : 'a');
  };

  /**
   * 防误差除法运算
   * @method accDiv
   * @for Method
   * @param {string/number} a 计算数
   * @param {string/number} b 计算数
   * @return {number} 计算结果
   */
  Method.fn.accDiv = function (a, b) {
    if (a && b) {
      let t1 = 0;
      let t2 = 0;
      let r1, r2;
      try {
        t1 = a.toString().split('.')[1].length;
      } catch (e) {}
      try {
        t2 = b.toString().split('.')[1].length;
      } catch (e) {}
      r1 = Number(a.toString().replace('.', ''));
      r2 = Number(b.toString().replace('.', ''));
      return (r1 / r2) * Math.pow(10, t2 - t1);
    }
    throws(0, 'accDiv', a ? 'b' : 'a');
  };

  /**
   * 元素居中(需自行增加position定位)
   * @method middle
   * @for Method
   * @param {string} dom 节点名称/class值/id值/属性名称/原生dom对象/jquery对象
   */
  Method.fn.middle = function (dom) {
    if (dom) {
      let that = this;
      let boxDom = this.getDom(dom);
      let sw = boxDom.offsetWidth;
      let sh = boxDom.offsetHeight;
      let dw = win.innerWidth;
      let dh = win.innerHeight;
      let cleft = (dw - sw) / 2;
      let ctop = (dh - sh) / 2;
      boxDom.style.left = cleft + 'px';
      boxDom.style.top = ctop + 'px';
      win.onresize = function () {
        that.middle(dom);
      };
    } else {
      throws(0, 'middle', 'dom');
    }
  };

  /**
   * 保留任意位小数(四舍五入)
   * @method decimal
   * @for Method
   * @param {number} num 需要操作的数字
   * @param {number} len 需要保留的位数(不填为四舍五入取整)
   * @return {number} 保留后的数字
   */
  Method.fn.decimal = function (num, len) {
    len = len || 0;
    if (num) {
      let floating = parseFloat(num);
      if (isNaN(floating)) {
        return 0;
      }
      return Number(num.toFixed(len));
    }
    throws(0, 'decimal', 'num');
  };

  /**
   * 金钱显示格式(每隔三位数字添加一个逗号)
   * @method money
   * @for Method
   * @param {string/number} str 金钱
   * @return {string} 修改过的金钱格式
   */
  Method.fn.money = function (str) {
    if (str) {
      return parseFloat(str).toFixed(2).replace(/\d(?=(?:\d{3})+\b)/g, `$&,`);
    }
    throws(0, 'money', 'str');
  };

  /**
   * 银行卡号(每隔四个数字添加一个空格)
   * @method bankCard
   * @for Method
   * @param {string/number} str 银行卡号
   * @return {string} 修改过的银行卡号格式
   */
  Method.fn.bankCard = function (str) {
    if (str) {
      str = String(str);
      let newStr = str.replace(/\d(?=(?:\d{4})+\b)/g, `$& `);
      return newStr;
    }
    throws(0, 'bankCard', 'str');
  };

  /**
   * 滚动条滚动动画
   * @method aniScroll
   * @for Method
   * @param {string/number} pageY 滚动y轴位置
   * @param {string} dom 节点名称/class值/id值/属性名称/原生dom对象/jquery对象
   */
  Method.fn.aniScroll = function (pageY, dom) {
    clearInterval(this.getCache('(method.aniScroll)'));
    dom = dom ? this.getDom(dom) : false;
    let timer = setInterval(() => {
      let currentY = dom ? dom.scrollTop : (document.documentElement.scrollTop || document.body.scrollTop);
      let distance = pageY > currentY ? pageY - currentY : currentY - pageY;
      let speed = Math.ceil(distance / 10);
      if (parseInt(currentY) === parseInt(pageY)) {
        clearInterval(this.getCache('(method.aniScroll)'));
      } else if (dom) {
        dom.scrollTo(0, pageY > currentY ? currentY + speed : currentY - speed);
      } else {
        window.scrollTo(0, pageY > currentY ? currentY + speed : currentY - speed);
      }
    }, 10);
    this.setCache('(method.aniScroll)', timer);
  };

  /**
   * 阻止事件冒泡
   * @method stopProp
   * @for Method
   */
  Method.fn.stopProp = function (e) {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    } else {
      window.event.cancelBubble = true;
    }
  };

  /**
   * 字符串转换为UTF-8编码
   * @method utf8
   * @for Method
   * @param {string} str 需要操作的字符串
   * @return {string} 转换后的字符串
   */
  Method.fn.utf8 = function (str) {
    if (str) {
      let out, i, len, c;
      out = '';
      len = str.length;
      for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
          out += str.charAt(i);
        } else if (c > 0x07FF) {
          out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
          out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
          out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
          out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
          out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
      }
      return out;
    }
    throws(0, 'utf8', 'str');
  };

  /**
   * 对象深拷贝
   * @method deepCopy
   * @for Method
   * @param {object} str 需要操作的对象
   * @return {object} 拷贝返回对象
   */
  Method.fn.deepCopy = function (obj) {
    if (obj) {
      let result = Array.isArray(obj) ? [] : {};
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object') {
            result[key] = deepCopy(obj[key]);
          } else {
            result[key] = obj[key];
          }
        }
      }
      return result;
    }
    throws(0, 'deepCopy', 'obj');
  };

  /**
   * 复制文本到剪贴板
   * @method copyText
   * @for Method
   * @param {string} text 需要复制的文本内容
   * @return {boolean} 是否成功
   */
  Method.fn.copyText = function (text) {
    if (text) {
      const input = document.createElement("input");
      input.value = text;
      this.getDom('body').appendChild(input);
      input.select();
      input.setSelectionRange(0, input.value.length);
      document.execCommand('Copy');
      this.getDom('body').removeChild(input);
      return true;
    }
    throws(0, 'copyText', 'text');
  };

  /**
   * 设置元素样式(行内样式)
   * @method setStyle
   * @for Method
   * @param {string} dom 节点名称/class值/id值/属性名称/原生dom对象/jquery对象
   * @param {object} sty 需要设置的样式对象
   * @return {boolean} 是否成功
   */
  Method.fn.setStyle = function (dom, sty) {
    if (dom && sty) {
      if (typeof sty === 'object') {
        dom = this.getDom(dom);
        for (let i in sty) {
          dom.style[i] = sty[i];
        }
        return true;
      }
      throws(2, 'setStyle');
      return false;
    }
    throws(0, 'setStyle', dom ? 'sty' : 'dom');
  };

  /**
   * 获取元素样式
   * @method getStyle
   * @for Method
   * @param {string} dom 节点名称/class值/id值/属性名称/原生dom对象/jquery对象
   * @param {string} arr 需要获取的样式名称
   * @return {string/boolean} 是否成功及正确的样式值
   */
  Method.fn.getStyle = function (dom, arr) {
    if (dom && arr) {
      dom = this.getDom(dom);
      if (dom.currentStyle) {
        return dom.currentStyle[arr];
      } else if (window.getComputedStyle) {
        return document.defaultView.getComputedStyle(dom, null)[arr];
      }
      return false;
    }
    throws(0, 'getStyle', dom ? 'arr' : 'dom');
  };

  /**
   * 字符串/对象去空格，对一个对象中每个值进行安全检测， 去空格操作
   * @method delSpace
   * @for Method
   * @param {string/object} ope 需要操作的字符串/对象
   * @return {string/object} 返回去掉空格的字符串/对象
   */
  Method.fn.delSpace = function (ope) {
    if (ope) {
      if (typeof ope === 'string') {
        return ope.replace(/[ ]/g, '');
      }
      for (prop in ope) {
        if (typeof ope[prop] === 'object' && Array.isArray(ope[prop])) {
          let list = ope[prop];
          for (let i = 0; i < list.length; i++) {
            list[i] = this.delSpace(list[i]);
          }
        } else if (typeof ope[prop] === 'object' && (ope[prop]) instanceof Object) {
          ope[prop] = this.delSpace(ope[prop]);
        } else if (typeof ope[prop] === 'string') {
          if (prop !== 'FormMeta') {
            ope[prop] = ope[prop].replace(/[ ]/g, '');
          }
        }
      }
      return ope;
    }
    throws(0, 'delSpace', 'ope');
  };

  /**
   * HTML标签替换
   * @method repLabel
   * @for Method
   * @param {string} str 完整的HTML标签
   * @return {string} 返回字符串HTML标签
   */
  Method.fn.repLabel = function (str) {
    if (str) {
      if (typeof str === 'string') {
        let ret = str;
        while (ret.indexOf(">") >= 0 || ret.indexOf("<") >= 0) {
          ret = ret.replace("<", "&lt;").replace(">", "&gt;");
        }
        return ret;
      }
      throws(2, 'repLabel');
      return false;
    }
    throws(0, 'repLabel', 'str');
  };

  /**
   * 键盘回车事件
   * @method enter
   * @for Method
   * @param {string} dom 节点名称/class值/id值/属性名称/原生dom对象/jquery对象
   * @param {function} callback 按下后的回调方法
   */
  Method.fn.enter = function (dom, callback) {
    if (dom && callback) {
      dom = this.getDom(dom);
      dom.onkeydown = function (event) {
        let e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode === 13) {
          if (typeof callback === 'function') {
            callback();
          } else {
            throws(2, 'enter');
          }
        }
      };
    } else {
      throws(0, 'enter', dom ? 'callback' : 'dom');
    }
  };

  /**
   * 图片自适应裁剪
   * @method imgLoad
   * @for Method
   * @param {string} box 图片盒子，节点名称/class值/id值/属性名称/原生dom对象/jquery对象
   * @param {string} img 图片标签，节点名称/class值/id值/属性名称/原生dom对象/jquery对象
   */
  Method.fn.imgLoad = function (box, img) {
    if (box && img) {
      let getContainer = this.getDom(box);
      let getIMG = this.getDom(img);
      let fw = getContainer.offsetWidth - (2 * getContainer.clientLeft);
      let fh = getContainer.offsetHeight - (2 * getContainer.clientTop);
      let iw = getIMG.width;
      let ih = getIMG.height;
      let m = iw / fw;
      let n = ih / fh;
      let getDistance;
      let getDistance2;
      if (m >= 1 && n <= 1) {
        iw = Math.ceil(iw / n);
        ih = Math.ceil(ih / n);
        getIMG.width = iw;
        getIMG.height = ih;
      } else if (m <= 1 && n >= 1) {
        iw = Math.ceil(iw / m);
        ih = Math.ceil(ih / m);
        getIMG.width = iw;
        getIMG.height = ih;
      } else if (m >= 1 && n >= 1) {
        getMAX = Math.min(m, n);
        iw = Math.ceil(iw / getMAX);
        ih = Math.ceil(ih / getMAX);
        getIMG.width = iw;
        getIMG.height = ih;
      }

      if (fh > getIMG.height) {
        getDistance = Math.floor((fh - getIMG.height) / 2);
        getIMG.style.marginTop = getDistance.toString() + "px";
      } else {
        getDistance = Math.floor((getIMG.height - fh) / 2);
        getIMG.style.marginTop = "-" + getDistance.toString() + "px";
      }

      if (fw > getIMG.width) {
        getDistance2 = Math.floor((fw - getIMG.width) / 2);
        getIMG.style.marginLeft = getDistance2.toString() + "px";
      } else {
        getDistance2 = Math.floor((getIMG.width - fw) / 2);
        getIMG.style.marginLeft = "-" + getDistance2.toString() + "px";
      }
    } else {
      throws(0, 'imgLoad', box ? 'img' : 'box');
    }
  };

  /**
   * 控制台错误/警告
   * @method throws
   * @for Method
   * @param {number} num 输入警告文案编号
   * @param {string} name 发生错误的方法
   * @param {string} field 缺少的字段名
   */
  function throws(num, name, field) {
    let nums = {
      0: '方法 {' + name + '} 必填字段 {' + field + '} 不能为空',
      1: 'DOM {' + name + '} 存在重复或不正确',
      2: '方法 {' + name + '} 不支持此数据类型',
    };
    console.warn('kxui-' + kxui.version + '： 模块 {method} ' + nums[num] + '。');
  };

  // 根据引入方式暴露对象
  kxui.method = new Method();
  if (isExports) {
    kxui.method = module.exports = new Method();
  };
})(window);