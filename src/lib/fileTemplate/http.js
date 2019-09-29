export default '' +
  "import request from 'axios'\n" +
  "import qs from 'qs'\n" +
  '\n' +
  "import NProgress from 'nprogress'\n" +
  "import 'nprogress/nprogress.css'\n" +
  '\n' +
  "import JSONBig from 'json-bigint'\n" +
  '\n' +
  "import router from '../router'\n" +
  "import { clearLocalStorage, getLocalStorage, downloadExcel, showNotify } from '../utils/commonUtil'\n" +
  '\n' +
  'export default class http {\n' +
  '  constructor(opts = {}) {\n' +
  '    this.loadCount = 0\n' +
  '    const http = request.create(\n' +
  '      Object.assign({\n' +
  '        timeout: 15000,\n' +
  '        headers: {\n' +
  `          'Content-Type': 'application/x-www-form-urlencoded'\n` +
  '        },\n' +
  "        transformResponse: [(data) => (data.type === 'application/x-msdownload' ? data : JSONBig.parse(data))]\n" +
  '      }),\n' +
  '      opts\n' +
  '    )\n' +
  '\n' +
  '    http.interceptors.request.use(\n' +
  '      (config) => {\n' +
  '        if (!config.headers.opts || !config.headers.opts.hideLoading) {\n' +
  '          showLoading()\n' +
  '        }\n' +
  "        if (getLocalStorage('token')) {\n" +
  "          config.headers.Authorization = getLocalStorage('token')\n" +
  '        }\n' +
  '\n' +
  '        // get请求时，参数中增加时间戳，防止缓存\n' +
  "        if (config.method === 'get') {\n" +
  '          config.params = {\n' +
  '            ...config.params,\n' +
  '            _t: new Date().getTime()\n' +
  '          }\n' +
  '        }\n' +
  '\n' +
  "        if (config.method === 'post' && config.headers['Content-Type'] !== 'application/json') {\n" +
  '          config.data = qs.stringify(config.data)\n' +
  '        }\n' +
  '\n' +
  '        return config\n' +
  '      },\n' +
  '      (err) => {\n' +
  '        return Promise.reject(err)\n' +
  '      }\n' +
  '    )\n' +
  '\n' +
  '    http.interceptors.response.use(\n' +
  '      (response) => {\n' +
  '        hideLoading()\n' +
  '        let { status, data = {} } = response\n' +
  '        // 登录状态丢失/无权限 -> 跳转重新登录\n' +
  '        if (data.code === 401) {\n' +
  '          clearLocalStorage()\n' +
  "          showNotify('error', data.message || '未登录或登录已失效,请重新登录')\n" +
  '          try {\n' +
  '            router.push({\n' +
  "              path: '/login',\n" +
  "              query: { returnUrl: router.history.current.path === '/login' ? '/' : router.history.current.path }\n" +
  '            })\n' +
  '          } catch (e) {\n' +
  "            router.push({ path: '/login' })\n" +
  '          }\n' +
  '        } else if (data.code === 403) {\n' +
  "          showNotify('error', data.message || '暂无访问权限')\n" +
  '          return Promise.reject(data)\n' +
  '        } else if (status === 200 && data.code === 200) {\n' +
  '          return data.data\n' +
  '\n' +
  '          // http请求成功，导出Excel文件\n' +
  "        } else if (status === 200 && response.config.headers['export-xls']) {\n" +
  "          const disposition = response.headers['content-disposition']\n" +
  '\n' +
  '          // 相应头包含文件名称信息时，下载文件；不包含文件名称信息时，解析错误信息\n' +
  '          if (disposition) {\n' +
  "            const dispositionArr = response.headers['content-disposition'].split(';')\n" +
  "            const fileNameArr = dispositionArr[1].split('filename=')\n" +
  "            const fileName = dispositionArr.length > 1 && fileNameArr.length > 1 ? fileNameArr[1] : '导出文件.xls'\n" +
  '            downloadExcel(response.data, fileName)\n' +
  '          } else {\n' +
  '            const fr = new FileReader()\n' +
  '            fr.readAsText(data)\n' +
  '            fr.onload = function() {\n' +
  '              showNotify(\'error\', JSON.parse(this.result || \'{"data":{"error":"导出异常，请稍后重试"}}\').data.error)\n' +
  '            }\n' +
  '          }\n' +
  '\n' +
  '          //  报错提示信息\n' +
  '        } else {\n' +
  "          showNotify('error', (data.data && data.data.error) || data.message || '服务器异常，请稍后重试')\n" +
  '          return Promise.reject(data)\n' +
  '        }\n' +
  '      },\n' +
  '      (error) => {\n' +
  '        hideLoading()\n' +
  '        let { data = {} } = error.response\n' +
  "        showNotify('error', data.message || '服务器异常，请稍后重试')\n" +
  '        return Promise.reject(data)\n' +
  '      }\n' +
  '    )\n' +
  '\n' +
  '    const showLoading = () => {\n' +
  '      if (!this.loadCount) {\n' +
  '        NProgress.start()\n' +
  '      }\n' +
  '      this.loadCount++\n' +
  '    }\n' +
  '\n' +
  '    const hideLoading = () => {\n' +
  '      this.loadCount--\n' +
  '      if (this.loadCount < 1) {\n' +
  '        NProgress.done()\n' +
  '      }\n' +
  '    }\n' +
  '\n' +
  '    return http\n' +
  '  }\n' +
  '}\n'
