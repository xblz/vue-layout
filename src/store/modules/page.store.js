import { PROJECT_UPDATE, PROJECT_ADD_MENU, PROJECT_UPDATE_MENU } from '../mutation-types'
import { $getGuid, $getLocalStorage, $setLocalStorage } from '../../lib/methods'
import { PROJECT_LIST } from '../../lib/constant'

const state = {
  projectInfo: {}
}

// getters
const getters = {}

// actions
const actions = {
  /** 获取项目信息 **/
  getProjectInfo({ state }, payload) {
    const projectList = $getLocalStorage(PROJECT_LIST) || []
    state.projectInfo = projectList.filter((project) => project.projectId === payload.projectId)[0]
  },
  /** 编辑项目基础信息 **/
  updateProject({ commit }, payload) {
    commit(PROJECT_UPDATE, payload)
  },
  /** 添加项目菜单信息 **/
  addProjectMenu({ commit }, payload) {
    commit(PROJECT_ADD_MENU, payload)
  },
  /** 编辑项目菜单信息 **/
  updateProjectMenu({ commit }, payload) {
    commit(PROJECT_UPDATE_MENU, payload)
  }
}

// mutations
const mutations = {
  [PROJECT_UPDATE](state, payload) {
    let projectList = $getLocalStorage(PROJECT_LIST) || []
    projectList = projectList.map((project) => (project.projectId === payload.projectId ? payload : project))
    $setLocalStorage(PROJECT_LIST, projectList)
  },
  [PROJECT_ADD_MENU](state, payload) {
    let projectList = $getLocalStorage(PROJECT_LIST) || []
    projectList = projectList.map((project) => {
      if (project.projectId === payload.projectId) {
        if (payload.pageId) {
          project.pages.map((page) => {
            if (page.pageId === payload.pageId) {
              delete payload.data.pageId
              delete payload.data.children
              payload.data.childrenId = $getGuid()
              page.children.push(payload.data)
            }
            return page
          })
        } else {
          project.pages.push(Object.assign({ children: [], pageId: $getGuid() }, payload.data))
        }
      }
      return project
    })
    $setLocalStorage(PROJECT_LIST, projectList)
  },
  [PROJECT_UPDATE_MENU](state, payload) {
    let projectList = $getLocalStorage(PROJECT_LIST) || []
    projectList = projectList.map((project) => {
      if (project.projectId === payload.projectId) {
        if (payload.childrenId) {
          project.pages = project.pages.map((page) => {
            if (page.pageId === payload.pageId) {
              page.children = page.children.map((item) =>
                item.childrenId === payload.childrenId ? payload.data : item
              )
            }
            return page
          })
        } else {
          project.pages = project.pages.map((page) => (page.pageId === payload.pageId ? payload.data : page))
        }
      }
      return project
    })
    $setLocalStorage(PROJECT_LIST, projectList)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
