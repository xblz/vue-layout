/**
 *
 */
export default {
  path: '/api',
  meta: { title: 'API管理' },
  component: () => import('../../components/mainLayout'),
  redirect: { name: 'api' },
  children: [
    {
      path: '',
      name: 'api',
      meta: { title: 'API管理' },
      component: () => import('../../views/api-mgt')
    }
  ]
}
