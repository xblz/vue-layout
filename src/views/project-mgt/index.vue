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
            <el-button circle type="primary" icon="el-icon-plus"></el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
    <project-alert :show.sync="projectAlert.show" @handleClick="handleClickConfirm"></project-alert>
  </el-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import JSZip from 'jszip'
import fileSaver from 'file-saver'

import { showNotify } from '../../utils/commonUtil'

import projectAlert from './components/projectAlert'
import { getRouter, getStyleSass, getViewLayout } from '../../utils/fileStringUtil'
import { PATH_COMPONENT_LAYOUT, PATH_STYLE_SCSS } from '../../lib/constant'

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

      // public
      zip.file('public/index.html', this.fileContext.public.index)

      // .
      zip.file('babel.config.js', this.fileContext.babel)
      zip.file('package.json', this.fileContext.package)

      // src
      zip.file('src/App.vue', this.fileContext.src.app)
      zip.file('src/main.js', this.fileContext.src.main)

      // src/components/layout.vue
      // 统一页面组件Str
      let viewLayoutStr = ''

      //
      let importRouter = ''

      //
      let routes = []

      project.pages.forEach((page) => {
        zip.file(`src/views/${page.path}/index.vue`, page.layout.html)

        importRouter += `import ${page.path}Router from './modules/${page.path}.router'\n`

        routes.push(`${page.path}Router`)

        zip.file('src/router/index.js', getRouter(importRouter, routes))

        let tempViewLayoutStr = '' // 拼接页面模版Str
        if (page.isMenu && page.children.length) {
          tempViewLayoutStr =
            `        <el-submenu index="/${page.path}">\n` +
            '          <template slot="title">\n' +
            `            <span>${page.name}</span>\n` +
            '          </template>\n'
          page.children.forEach((children) => {
            zip.file(`src/views/${page.path}/children/${children.path}.vue`, children.layout.html)

            if (children.isMenu) {
              tempViewLayoutStr +=
                `          <el-menu-item index="/${page.path}/${children.path}">\n` +
                '            <template slot="title">\n' +
                `              <span>${children.name}</span>\n` +
                '            </template>\n' +
                '          </el-menu-item>\n'
            }
          })
          tempViewLayoutStr += '        </el-submenu>\n'
        } else {
          tempViewLayoutStr =
            `        <el-menu-item v-else-if="menu.isMenu" index="/${page.path}">\n` +
            '          {{ menu.name }}\n' +
            '        </el-menu-item>\n'
        }
        viewLayoutStr += tempViewLayoutStr
      })

      zip.file(PATH_COMPONENT_LAYOUT, getViewLayout(viewLayoutStr))

      project.pages.forEach((page) => {
        let routerModules =
          'export default {\n' +
          `  path: '/${page.path}',\n` +
          `  meta: { title: '${page.name}' },\n` +
          "  component: () => import('../../components/layout'),\n" +
          `  redirect: { name: '${page.path}_${page.children[0].path}' },\n` +
          '  children: [\n' +
          page.children.map((children) => {
            return (
              '    {\n' +
              `      path: '${children.path}',\n` +
              `      name: '${page.path}_${children.path}',\n` +
              `      meta: { title: '${children.name}' },\n` +
              `      component: () => import('../../views/${page.path}/children/${children.path}')\n` +
              '    }\n'
            )
          }) +
          '  ]\n' +
          '}'

        zip.file(`src/router/modules/${page.path}.router.js`, routerModules)
      })
      zip.file(PATH_STYLE_SCSS, getStyleSass())
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
      },
      fileContext: {
        public: {
          index:
            '<!DOCTYPE html>\n' +
            '<html lang="en">\n' +
            '  <head>\n' +
            '    <meta charset="utf-8">\n' +
            '    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n' +
            '    <meta name="viewport" content="width=device-width,initial-scale=1.0">\n' +
            '    <link rel="icon" href="<%= BASE_URL %>favicon.ico">\n' +
            '  </head>\n' +
            '  <body>\n' +
            '    <noscript>\n' +
            "      <strong>We're sorry but temp doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>\n" +
            '    </noscript>\n' +
            '    <div id="app"></div>\n' +
            '    <!-- built files will be auto injected -->\n' +
            '  </body>\n' +
            '</html>\n'
        },
        src: {
          app: '<template>\n' + '  <router-view />\n' + '</template>',
          main:
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
            "}).$mount('#app')",
          router:
            "import Vue from 'vue'\n" +
            "import Router from 'vue-router'\n" +
            '\n' +
            '${{imports}}\n' +
            '\n' +
            'Vue.use(Router)\n' +
            '\n' +
            'const router = new Router({\n' +
            "  mode: 'history',\n" +
            '  routes: [${{routes}}]\n' +
            '})\n' +
            '\n' +
            'router.beforeEach((to, from, next) => {\n' +
            '  // 设置title\n' +
            '  document.title = to.meta.title || to.matched[to.matched.length - 2].meta.title\n' +
            '  // 加载页面内容\n' +
            '  next()\n' +
            '})\n' +
            'export default router'
        },
        package:
          '{\n' +
          '  "name": "layout",\n' +
          '  "version": "0.1.0",\n' +
          '  "private": true,\n' +
          '  "scripts": {\n' +
          '    "serve": "vue-cli-service serve",\n' +
          '    "build": "vue-cli-service build",\n' +
          '    "lint": "vue-cli-service lint"\n' +
          '  },\n' +
          '  "dependencies": {\n' +
          '    "element-ui": "^2.6.1",\n' +
          '    "core-js": "^2.6.5",\n' +
          '    "vue": "^2.6.10",\n' +
          '    "vue-router": "^3.0.3"\n' +
          '  },\n' +
          '  "devDependencies": {\n' +
          '    "@vue/cli-plugin-babel": "^3.11.0",\n' +
          '    "@vue/cli-plugin-eslint": "^3.11.0",\n' +
          '    "@vue/cli-service": "^3.11.0",\n' +
          '    "babel-eslint": "^10.0.1",\n' +
          '    "node-sass": "^4.9.0",\n' +
          '    "sass-loader": "^7.1.0",\n' +
          '    "eslint": "^5.16.0",\n' +
          '    "eslint-plugin-vue": "^5.0.0",\n' +
          '    "vue-template-compiler": "^2.6.10"\n' +
          '  },\n' +
          '  "eslintConfig": {\n' +
          '    "root": true,\n' +
          '    "env": {\n' +
          '      "node": true\n' +
          '    },\n' +
          '    "extends": [\n' +
          '      "plugin:vue/essential",\n' +
          '      "eslint:recommended"\n' +
          '    ],\n' +
          '    "rules": {},\n' +
          '    "parserOptions": {\n' +
          '      "parser": "babel-eslint"\n' +
          '    }\n' +
          '  },\n' +
          '  "postcss": {\n' +
          '    "plugins": {\n' +
          '      "autoprefixer": {}\n' +
          '    }\n' +
          '  },\n' +
          '  "browserslist": [\n' +
          '    "> 1%",\n' +
          '    "last 2 versions"\n' +
          '  ]\n' +
          '}',
        babel: 'module.exports = {\n' + '  presets: [\n' + "    '@vue/app'\n" + '  ]\n' + '}'
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
