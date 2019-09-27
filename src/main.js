import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/common.scss'

// import * as methods from './utils/common'

Vue.use(ElementUI, { size: 'mini' })

Vue.config.productionTip = false

// Object.keys(methods).forEach((key) => {
//   Vue.prototype[key] = methods[key]
// })

export default new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
