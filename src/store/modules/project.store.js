import { PROJECT_LIST } from '../../lib/constant'
import { PROJECT_ADD, PROJECT_DEL } from '../mutation-types'
import { getGuid, getLocalStorage, setLocalStorage } from '../../utils/commonUtil'
import { getEmptyHtml } from '../../utils/fileStringUtil'

const state = {
  projectList: []
}

// getters
const getters = {}

// actions
const actions = {
  /** 获取项目列表 **/
  getProjectList({ state }) {
    state.projectList = getLocalStorage(PROJECT_LIST) || []
  },
  /** 添加项目 **/
  addProject({ commit }, payload) {
    commit(PROJECT_ADD, {
      ...payload,
      pages: [
        {
          pageId: getGuid(),
          name: 'home',
          path: 'home',
          isMenu: true,
          children: [],
          layout: {
            template: [],
            html: getEmptyHtml()
          }
        }
      ]
    })
  },
  /** 删除项目 **/
  delProject({ commit }, payload) {
    commit(PROJECT_DEL, payload)
  }
}

// mutations
const mutations = {
  [PROJECT_ADD](state, payload) {
    const list = getLocalStorage(PROJECT_LIST) || []
    const projectList = [...list, payload]
    setLocalStorage(PROJECT_LIST, projectList)
    state.projectList = projectList
  },
  [PROJECT_DEL](state, payload) {
    const list = getLocalStorage(PROJECT_LIST) || []
    const projectList = list.filter((item) => item.projectId !== payload.projectId)
    setLocalStorage(PROJECT_LIST, projectList)
    state.projectList = projectList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
