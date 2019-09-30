<template>
  <el-row>
    <el-col :span="14" :offset="5">
      <el-row :gutter="24">
        <el-col :span="6" v-for="(item, key) in projectList" :key="key">
          <el-card shadow="hover" class="project-item" @click.native="handleClickDetail(item)">
            <div class="item-name">{{ item.name }}</div>
            <div>
              <el-button circle type="success" icon="el-icon-download" @click.stop="handleClickDownload(item)" />
              <el-button circle type="danger" icon="el-icon-delete" @click.stop="handleClickDel(item)" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="project-item item-add" @click.native="projectAlert.show = true">
            <div class="item-name">新建项目</div>
            <el-button circle type="primary" icon="el-icon-plus" />
          </el-card>
        </el-col>
      </el-row>
    </el-col>
    <project-alert :show.sync="projectAlert.show" @handleClick="handleClickConfirm" />
  </el-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import JSZip from 'jszip'
import fileSaver from 'file-saver'

import { showNotify } from '../../utils/commonUtil'

import projectAlert from './components/projectAlert'
import {
  getApp,
  getBabelConfig,
  getCommonRouter,
  getHttp,
  getMain,
  getPackage,
  getPublicIndex,
  getRouter,
  getStyleSass,
  getUtilsCommon,
  getView404,
  getViewLayout,
  getViewLogin,
  getVueConfig
} from '../../utils/fileStringUtil'
import {
  PATH_APP,
  PATH_BABEL,
  PATH_COMMON_ROUTER,
  PATH_COMPONENT_LAYOUT,
  PATH_LIB_HTTP,
  PATH_MAIN,
  PATH_PACKAGE,
  PATH_PUBLIC_INDEX,
  PATH_STYLE_SCSS,
  PATH_UTIL_COMMON,
  PATH_VIEW_404,
  PATH_VIEW_LOGIN,
  PATH_VUE_CONFIG
} from '../../lib/constant'

export default {
  components: { projectAlert },
  created() {
    this.getProjectList()
  },
  computed: {
    ...mapState({
      projectList: (state) => state.project.projectList
    })
  },
  methods: {
    ...mapActions(['getProjectList', 'addProject', 'delProject']),
    handleClickDownload(project) {
      const zip = new JSZip()

      // src/components/layout.vue
      // 统一页面组件Str
      let viewLayoutStr = ''

      //
      let importRouter = `import commonRouter from './modules/common.router'\n`
      let routes = ['...commonRouter']

      //
      let routerModules = ''

      project.pages.forEach((page) => {
        zip.file(`src/views/${page.path}/index.vue`, page.layout.html)

        importRouter += `import ${page.path}Router from './modules/${page.path}.router'\n`

        routes.push(`${page.path}Router`)

        zip.file('src/router/index.js', getRouter(importRouter, routes.join(', ')))

        let tempViewLayoutStr = '' // 拼接页面模版Str
        if (page.children.length) {
          tempViewLayoutStr =
            `        <el-submenu index="/${page.path}" :v-show="${page.isMenu}">\n` +
            '          <template slot="title">\n' +
            `            <span>${page.name}</span>\n` +
            '          </template>\n'

          routerModules =
            'export default {\n' +
            `  path: '/${page.path}',\n` +
            `  meta: { title: '${page.name}' },\n` +
            "  component: () => import('../../components/layout'),\n" +
            `  redirect: { name: '${page.path}_${page.children[0].path}' },\n` +
            '  children: [\n'

          page.children.forEach((children, index) => {
            zip.file(`src/views/${page.path}/children/${children.path}.vue`, children.layout.html)

            tempViewLayoutStr +=
              `          <el-menu-item index="/${page.path}/${children.path}" :v-show="${children.isMenu}">\n` +
              '            <template slot="title">\n' +
              `              <span>${children.name}</span>\n` +
              '            </template>\n' +
              '          </el-menu-item>\n'

            routerModules +=
              '    {\n' +
              `      path: '${children.path}',\n` +
              `      name: '${page.path}_${children.path}',\n` +
              `      meta: { title: '${children.name}' },\n` +
              `      component: () => import('../../views/${page.path}/children/${children.path}')\n` +
              `    }${index + 1 === page.children.length ? '' : ','}\n`
          })
          tempViewLayoutStr += '        </el-submenu>\n'
          routerModules += '  ]\n}'
        } else if (page.isMenu) {
          routerModules =
            'export default {\n' +
            `  path: '/${page.path}',\n` +
            `  meta: { title: '${page.name}' },\n` +
            "  component: () => import('../../components/layout'),\n" +
            `  redirect: { name: '${page.path}' },\n` +
            '  children: [\n' +
            '    {\n' +
            `      path: '',\n` +
            `      name: '${page.path}',\n` +
            `      meta: { title: '${page.name}' },\n` +
            `      component: () => import('../../views/${page.path}')\n` +
            `    }\n` +
            '  ]\n' +
            '}'
          tempViewLayoutStr = `        <el-menu-item index="/${page.path}">\n          ${page.name}\n        </el-menu-item>\n`
        }
        zip.file(`src/router/modules/${page.path}.router.js`, routerModules)
        viewLayoutStr += tempViewLayoutStr
      })

      zip.file(PATH_APP, getApp())
      zip.file(PATH_BABEL, getBabelConfig())
      zip.file(PATH_MAIN, getMain())
      zip.file(PATH_PACKAGE, getPackage())
      zip.file(PATH_PUBLIC_INDEX, getPublicIndex())
      zip.file(PATH_STYLE_SCSS, getStyleSass())
      zip.file(PATH_COMPONENT_LAYOUT, getViewLayout(viewLayoutStr))
      zip.file(PATH_LIB_HTTP, getHttp())
      zip.file(PATH_UTIL_COMMON, getUtilsCommon())
      zip.file(PATH_COMMON_ROUTER, getCommonRouter())
      zip.file(PATH_VIEW_LOGIN, getViewLogin())
      zip.file(PATH_VIEW_404, getView404())
      if (project.devPath) {
        zip.file(PATH_VUE_CONFIG, getVueConfig(project.devPath))
      }

      zip.generateAsync({ type: 'blob' }).then(function(content) {
        fileSaver.saveAs(content, `${project.name}.zip`)
      })
    },
    handleClickDetail(project) {
      this.$router.push({ path: '/page', query: { projectId: project.projectId } })
    },
    handleClickDel(project) {
      this.$alert(`确认删除项目（${project.name}）?`, '提示', {
        showCancelButton: true,
        callback: (action) => {
          if (action === 'confirm') {
            this.delProject(project)
            showNotify('删除成功')
          }
        }
      })
    },
    handleClickConfirm(data) {
      this.addProject(data)
      this.projectAlert.show = false
      showNotify('新建项目成功')
    }
  },
  data() {
    return {
      projectAlert: {
        show: false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.project-item {
  margin: 24px 0 12px 0;
  font-size: 16px;
  text-align: center;

  .item-name {
    overflow: hidden;
    padding-bottom: 24px;
  }
}

.item-add {
  cursor: pointer;
  color: #409eff;
  font-weight: bolder;
}
</style>
