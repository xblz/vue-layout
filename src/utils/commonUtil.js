import { Notification } from 'element-ui'

const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}
const getLocalStorage = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}
const removeLocalStorage = (key) => {
  window.localStorage.removeItem(key)
}
const clearLocalStorage = () => {
  window.localStorage.clear()
}

/**
 * 深拷贝
 * @param {Object | Array} obj
 * @returns {Object | Array}
 */
const deepCopy = (obj) => {
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

let notify = null
const showNotify = function(type, message) {
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

const getGuid = () => {
  const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

const getHtml4String = (val) => {
  let html = ''
  let obj = {}
  let json = ''
  if (val.length) {
    val.forEach((data, index) => {
      html += (index === 0 ? '' : '\n') + data.html
      Object.assign(obj, data.data)
    })

    const arr = JSON.stringify(obj, null, 2).split('\n')

    arr.forEach(function(v, i) {
      const a = v.split(':')

      if (a.length === 1) {
        if (i !== 0) {
          json += '    '
        }
        json += v + '\n'
      } else {
        json += `    ${(a[0] || '').replace(/"/g, '')}:${(a[1] || '').replace(/"/g, "'")}\n`
      }
    })
  } else {
    json = '{}'
  }
  const returnHtml =
    '<template>\n' +
    '  <div class="content">\n' +
    html +
    '\n' +
    '  </div>\n' +
    '</template>\n' +
    '<script>\n' +
    'export default {\n' +
    '  data() {\n' +
    '    return ' +
    json +
    '  }\n' +
    '}\n' +
    '<' +
    '/script>'
  return returnHtml
}

export {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  clearLocalStorage,
  deepCopy,
  showNotify,
  getGuid,
  getHtml4String
}
