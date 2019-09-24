import { PROJECT_ADD, PROJECT_DEL } from '../mutation-types'
import { $getLocalStorage, $setLocalStorage, $getGuid } from '../../lib/methods'
import { PROJECT_LIST } from '../../lib/constant'

const state = {
  projectList: []
}

// getters
const getters = {}

// actions
const actions = {
  getProjectList({ state }) {
    state.projectList = $getLocalStorage(PROJECT_LIST) || []
  },
  addProject({ commit }, payload) {
    commit(PROJECT_ADD, {
      ...payload,
      pages: [{ pageId: $getGuid(), name: 'home', path: 'home', isMenu: true, children: [] }]
    })
  },
  delProject({ commit }, payload) {
    commit(PROJECT_DEL, payload)
  }
}

// mutations
const mutations = {
  [PROJECT_ADD](state, payload) {
    const list = $getLocalStorage(PROJECT_LIST) || []
    const projectList = [...list, payload]
    $setLocalStorage(PROJECT_LIST, projectList)
    state.projectList = projectList
  },
  [PROJECT_DEL](state, payload) {
    const list = $getLocalStorage(PROJECT_LIST) || []
    const projectList = list.filter((item) => item.projectId !== payload.projectId)
    $setLocalStorage(PROJECT_LIST, projectList)
    state.projectList = projectList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
