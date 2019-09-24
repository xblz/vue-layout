import Vue from 'vue'
import Vuex from 'vuex'

import { NAV_MENU } from './mutation-types'

import project from './modules/project.store'
import page from './modules/page.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    project,
    page
  },
  state: {
    activeMenuPath: ''
  },
  actions: {
    saveActiveMenuPath({ commit }, activeMenuPath) {
      commit(NAV_MENU, activeMenuPath)
    }
  },
  mutations: {
    [NAV_MENU](state, payload) {
      state.activeMenuPath = payload
    }
  }
})
