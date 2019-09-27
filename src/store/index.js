import Vue from 'vue'
import Vuex from 'vuex'

import project from './modules/project.store'
import page from './modules/page.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    project,
    page
  }
})
