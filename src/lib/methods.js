import { Notification } from 'element-ui'

const $setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}
const $getLocalStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}
const $removeLocalStorage = (key) => {
  window.localStorage.removeItem(key)
}
const $clearLocalStorage = () => {
  window.localStorage.clear()
}

/**
 * 深拷贝
 * @param {Object | Array} obj
 * @returns {Object | Array}
 */
const $deepcopy = (obj) => {
  if (!(typeof obj === 'object')) {
    return
  }
  for (let key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      (obj[key] === null ||
        obj[key] === undefined ||
        obj[key] === '' ||
        obj[key] === 'null' ||
        obj[key] === 'NULL' ||
        obj[key] === 'undefined')
    ) {
      delete obj[key]
    }
  }
  return JSON.parse(JSON.stringify(obj))
}

const $downloadExcel = function(data, filename) {
  if ('msSaveOrOpenBlob' in navigator) {
    // Microsoft Edge and Microsoft Internet Explorer 10-11
    window.navigator.msSaveOrOpenBlob(data, filename)
  } else {
    const blob = new Blob([data], { type: 'application/vnd.ms-excel;charset=utf-8' })
    const downloadElement = document.createElement('a')
    const href = window.URL.createObjectURL(blob) //创建下载的链接
    downloadElement.href = href
    downloadElement.download = filename //下载后文件名
    document.body.appendChild(downloadElement)
    downloadElement.click() //点击下载
    document.body.removeChild(downloadElement) //下载完成移除元素
    window.URL.revokeObjectURL(href) //释放掉blob对象
  }
}
//日期转换
const $formatDate = function(date, format) {
  date = new Date(date)
  if (!format) {
    format = 'yyyy-MM-dd hh:mm:ss'
  }

  let map = {
    M: date.getMonth() + 1, //月份
    d: date.getDate(), //日
    h: date.getHours(), //小时
    m: date.getMinutes(), //分
    s: date.getSeconds(), //秒
    q: Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  }
  format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
    let v = map[t]
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v
        v = v.substr(v.length - 2)
      }
      return v
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length)
    }
    return all
  })
  return format
}

const $picMiniUrl = function(url, width) {
  return `${url}?x-oss-process=image/resize,w_${width || 80}/quality,q_80`
}

let notify = null
const $showNotify = function(type, message) {
  if (!message) {
    message = type
    type = 'success'
  }
  notify && notify.close()
  notify = Notification({
    title: '温馨提示',
    showClose: false,
    duration: 2000,
    type,
    message,
    onClose: () => {
      notify = null
    }
  })
}

const $getGuid = () => {
  const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

export {
  $setLocalStorage,
  $getLocalStorage,
  $removeLocalStorage,
  $clearLocalStorage,
  $deepcopy,
  $downloadExcel,
  $formatDate,
  $picMiniUrl,
  $showNotify,
  $getGuid
}
