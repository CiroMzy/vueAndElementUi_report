/****************************
 *hasClass
 *
 * 判断是否存在某个class
 * obj：原生dom
 * className：要验证的class
 *
 * 返回：boolean，true 包含，false 不包含
 */
export const hasClass = function (obj, className) {
  var reg = new RegExp('^|\\s' + className + '$|\\s')
  return reg.test(obj.className)
}

/****************************
 *addClass
 *
 * 添加一个class
 * obj：原生dom
 * className：要添加的class
 *
 * 返回：string，拼接在一起的className
 */
export const addClass = function (obj, className) {
  if (hasClass(obj, className)) {
    return
  }
  let classArr
  let classNew
  classArr = obj.className.split(' ')
  classArr.push(className)
  classNew = classArr.join(' ')
  obj.className = classNew
}

/***************************
 * ajax
 *
 * url：请求路径
 * type：请求方式
 * data：参数
 * success：成功回调
 * error：错误回调
 */
export const ajax = function (args) {
  var opt = {
    url: '',
    type: 'GET',
    data: {},
    success: function () {},
    error: function () {}
  }
  extend(opt, args)
  if (typeof opt.url === 'string' && opt.url) {
    let url = opt.url
    let type = opt.type.toUpperCase()
    let data = opt.data
    let success = opt.success
    let error = opt.error
    let res
    let xhr = XMLHttpRequest ? new XMLHttpRequest() : window.ActiveXObject('Miscrosoft.XMLHTTP')
    let combinedUrl = dataToUri(url, data)
    if (type === 'GET') {
      xhr.open(type, combinedUrl, true)
      xhr.send()
    }
    if (type === 'post') {
      xhr.open(type, url, true)
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencode')
      xhr.send(combinedUrl)
    }
    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 304) {
        res = xhr.responseText
        if (success instanceof Function) {
          success.call(xhr, res)
        }
      } else {
        if (error instanceof Function) {
          error.call(xhr, res)
        }
      }
    }
  }
}

/********************************
 * jsonp
 *
 * url：请求路径
 * data：参数
 */
export const jsonp = function (args) {
  let opt = {
    url: '',
    data: {},
    jsonpCallback: 'jsonp'
  }
  extend(opt, args)
  let url = dataToUri(opt.url, opt.data) + encodeURIComponent('jsonpCallback') + '=' + encodeURIComponent(opt.jsonpCallback)
  createScript({src: url})
}

/********************************
 * dataToUri
 *
 * 将json格式的data和url合并在一起，并encode
 * url: 标准url
 * data: 必须是字面量对象格式
 * encode: bollean格式，true 需要转译，false 不需要转译
 */
export const dataToUri = function (url, data, encode) {
  // 是否为字面量对象
  if (ifJson(data)) {
    let _encode = true
    let dataArr = []
    if (typeof encode === 'boolean') {
      _encode = encode
    }
    for (let item in data) {
      let str = _encode ? (encodeURIComponent(item) + '=' + encodeURIComponent(data[item])) : item + '=' + data[item]
      dataArr.push(str)
    }
    url += (url.indexOf('?') < 0 ? '?' : '&') + dataArr.join('&')

    return url.replace(/$\\?/g, '')
  } else {
    return url
  }
}

/********************************
 * 参数的覆盖
 * 以第一个为基准，并不新添属性
 */
export const extend = function (opt, args) {
  for (let item in opt) {
    if (args[item] !== undefined) {
      opt[item] = args[item]
    }
  }
}

/*******************************
 * 创建script标签
 *
 * opt为字面量对象，设置script的属性，
 * 最终在head上创建一个script标签
 */
export const createScript = function (opt) {
  let script = document.createElement('script')
  // 是否为字面量对象
  if (!ifJson(opt)) {
    return
  }
  for (let item in opt) {
    script.setAttribute(item, opt[item])
  }
  document.querySelector('head').appendChild(script)
}

/********************************
 * 判断是字面量对象
 *
 * true 是字面量对象， false 不是
 */
export const ifJson = function (data) {
  if (data instanceof Object && data.prototype === undefined) {
    return true
  }
  return false
}

/*********************************************************************************************************************
 * COOKIE 操作类
 */

/******************************
 * 添加一个cookie
 */
export const setCookie = function (key, value) {
  let Days = 30
  let exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = key + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

/*******************************
 * 获取某个cookie的值
 */
export const getCookie = function (key) {
  let allcookies = document.cookie
  let arr = allcookies.split(';')
  let value
  for (let i = 0; i < arr.length; i++) {
    let strIn = arr[i]
    let pos = strIn.indexOf('=')
    let regEx = /\s+/g
    if (strIn.substring(0, pos).replace(regEx, '') === key) {
      value = strIn.substring(pos + 1, strIn.length)
    }
  }
  return unescape(value)
}

/**********************************
 * 判断某个cookie是否存在
 */
export const containCookie = function (key) {
  let allcookies = document.cookie
  let cookiePos = allcookies.indexOf(key)
  if (cookiePos > -1) {
    return true
  }
  return false
}

/**********************************
 * 移除某个cookie
 *
 * 如果只移除一个，传第一个参数
 * 如果全部移除，传两个参数，如('', true)
 */
export const removeCookie = function (key, removeAll) {
  let removeAllVal = typeof removeAll === 'boolean' ? removeAll : false
  /* eslint-disable no-useless-escape */
  let keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  if (keys) {
    for (let i = 0; i < keys.length; i++) {
      if (!removeAllVal) {
        if (keys[i] === key) {
          document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
      } else {
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
      }
    }
  }
}

/**********************************************************************
 * 格式校验类
 */

/*********************************
 *不能为空
 *
 * true 空， false 非空
 */
export const isEmpty = function (value) {
  if (value === null || value === undefined || value === '') {
    return true
  }
  return false
}

/************************************
 * 验证密码格式
 *
 *true 格式不正确 ， false 格式正确
 */
export const isPassword = function (value) {
  console.log(value)
  var pattern = /^[\d_a-zA-Z]{6,18}$/
  if (!pattern.test(value)) {
    return true
  }
  return false
}

/*********************************************************************
 * 小工具类
 */
export const goTo = function (str) {
  if (str && typeof str === 'string') {
    window.location.href = str
  }
}
export const getLocalHref = function () {
  let str = window.location.href
  if (str.indexOf('#') > -1) {
    str.substring(0, str.indexOf('#'))
  }
  return str
}

/**************************************************************************************************************************
 * dom 操作类
 */
export const getComputedAtt = function (dom, att) {
  let value = (dom.currentStyle ? dom.currentStyle : getComputedStyle(dom))[att]
  return value
}
