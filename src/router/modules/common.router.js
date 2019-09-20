/**
 * 公用
 */
export default [
  {
    path: '/',
    meta: { title: '首页' },
    component: () => import('../../views/project-mgt')
  },
  {
    path: '*',
    name: '404',
    meta: { title: '页面未找到' },
    component: () => import('../../views/404')
  }
]
