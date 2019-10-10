export default '' +
  `import Vue from 'vue'\n` +
  `import Router from 'vue-router'\n` +
  '\n' +
  '${{imports}}\n' +
  '\n' +
  'Vue.use(Router)\n' +
  '\n' +
  'const router = new Router({\n' +
  `  mode: 'history',\n` +
  '  routes: [${{routes}}]\n' +
  '})\n' +
  '\n' +
  'router.beforeEach((to, from, next) => {\n' +
  '  document.title = to.meta.title || to.matched[to.matched.length - 2].meta.title\n' +
  '  next()\n' +
  '})\n' +
  'export default router'
