import Vue from 'vue'
import Router from 'vue-router'

import routerCommon from './modules/common.router'
import routerPage from './modules/page.router'
import routerApi from './modules/api.router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [...routerCommon, routerPage, routerApi]
})

// 拦截路由
router.beforeEach((to, from, next) => {
  // 设置title
  document.title = to.meta.title || to.matched[to.matched.length - 2].meta.title
  // 加载页面内容
  next()
})

export default router
