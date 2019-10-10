export default '' +
  'export default [\n' +
  '  {\n' +
  `    path: '/login',\n` +
  `    meta: { title: '登录' },\n` +
  `    component: () => import('../../views/login')\n` +
  '  },\n' +
  '  {\n' +
  `    path: '*',\n` +
  `    name: '404',\n` +
  `    meta: { title: '页面未找到' },\n` +
  `    component: () => import('../../views/404')\n` +
  '  }\n' +
  ']\n'
