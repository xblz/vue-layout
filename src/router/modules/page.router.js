/**
 *
 */
export default {
  path: '/page',
  meta: { title: '页面管理' },
  component: () => import('../../components/mainLayout'),
  redirect: { name: 'page' },
  children: [
    {
      path: '',
      name: 'page',
      meta: { title: '页面管理' },
      component: () => import('../../views/page-mgt')
    }
  ]
}
