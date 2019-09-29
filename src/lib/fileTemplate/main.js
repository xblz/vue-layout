export default '' +
  "import Vue from 'vue'\n" +
  "import ElementUI from 'element-ui'\n" +
  "import 'element-ui/lib/theme-chalk/index.css'\n" +
  '\n' +
  "import App from './App.vue'\n" +
  "import router from './router'\n" +
  "import './style/common.scss'\n" +
  '\n' +
  "Vue.use(ElementUI, { size: 'mini' })\n" +
  '\n' +
  'new Vue({\n' +
  '  router,\n' +
  '  render: (h) => h(App)\n' +
  "}).$mount('#app')"
