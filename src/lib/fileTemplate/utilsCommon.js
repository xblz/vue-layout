export default '' +
  `import { Notification } from 'element-ui'\n` +
  '\n' +
  'const setLocalStorage = (key, value) => {\n' +
  '  window.localStorage.setItem(key, JSON.stringify(value))\n' +
  '}\n' +
  'const getLocalStorage = (key) => {\n' +
  '  return JSON.parse(window.localStorage.getItem(key))\n' +
  '}\n' +
  'const removeLocalStorage = (key) => {\n' +
  '  window.localStorage.removeItem(key)\n' +
  '}\n' +
  'const clearLocalStorage = () => {\n' +
  '  window.localStorage.clear()\n' +
  '}\n' +
  '\n' +
  'let notify = null\n' +
  'const showNotify = function(type, message) {\n' +
  '  if (!message) {\n' +
  '    message = type\n' +
  `    type = 'success'\n` +
  '  }\n' +
  '  notify && notify.close()\n' +
  '  notify = Notification({\n' +
  `    title: '温馨提示',\n` +
  '    showClose: false,\n' +
  '    duration: 2000,\n' +
  '    type,\n' +
  '    message,\n' +
  '    onClose: () => {\n' +
  '      notify = null\n' +
  '    }\n' +
  '  })\n' +
  '}\n' +
  '\n' +
  'const downloadExcel = function(data, filename) {\n' +
  `  if ('msSaveOrOpenBlob' in navigator) {\n` +
  '    // Microsoft Edge and Microsoft Internet Explorer 10-11\n' +
  '    window.navigator.msSaveOrOpenBlob(data, filename)\n' +
  '  } else {\n' +
  `    const blob = new Blob([data], { type: 'application/vnd.ms-excel;charset=utf-8' })\n` +
  `    const downloadElement = document.createElement('a')\n` +
  '    const href = window.URL.createObjectURL(blob) //创建下载的链接\n' +
  '    downloadElement.href = href\n' +
  '    downloadElement.download = filename //下载后文件名\n' +
  '    document.body.appendChild(downloadElement)\n' +
  '    downloadElement.click() //点击下载\n' +
  '    document.body.removeChild(downloadElement) //下载完成移除元素\n' +
  '    window.URL.revokeObjectURL(href) //释放掉blob对象\n' +
  '  }\n' +
  '}\n' +
  '\n' +
  'export {\n' +
  '  setLocalStorage,\n' +
  '  getLocalStorage,\n' +
  '  removeLocalStorage,\n' +
  '  clearLocalStorage,\n' +
  '  showNotify,\n' +
  '  downloadExcel\n' +
  '}\n'
