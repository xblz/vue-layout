import { PROJECT_UPDATE } from '../mutation-types'
import { $getLocalStorage, $setLocalStorage } from '../../lib/methods'
import { PROJECT_LIST } from '../../lib/constant'

const state = {
  projectInfo: {}
}

// getters
const getters = {}

// actions
const actions = {
  getProjectInfo({ state }, payload) {
    const projectList = $getLocalStorage(PROJECT_LIST) || []
    state.projectInfo = projectList.filter((project) => project.id === payload.projectId)[0]
  },
  updateProject({ commit }, payload) {
    commit(PROJECT_UPDATE, payload)
  }
}

// mutations
const mutations = {
  [PROJECT_UPDATE](state, payload) {
    let projectList = $getLocalStorage(PROJECT_LIST) || []
    projectList = projectList.map((project) => (project.id === payload.id ? payload : project))
    $setLocalStorage(PROJECT_LIST, projectList)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
