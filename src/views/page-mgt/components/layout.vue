<template>
  <div class="page-layout">
    <el-menu
      unique-opened
      background-color="#001529"
      text-color="#cfcfcf"
      active-text-color="#409EFF"
      :collapse-transition="false"
    >
      <template v-for="(menu, index) in project.pages">
        <el-submenu :key="index" v-if="menu.isMenu && menu.children.length" :index="`/${menu.path}`">
          <template slot="title">
            <span>{{ menu.name }}</span>
          </template>
          <template v-for="(childrenMenu, childrenIndex) in menu.children">
            <el-menu-item
              v-if="childrenMenu.isMenu"
              :key="childrenIndex"
              :index="`${menu.path}/${childrenMenu.path}`"
              @click="handleClickMenu(index, childrenIndex)"
            >
              <template slot="title">
                <span>{{ childrenMenu.name }}</span>
              </template>
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item :key="index" v-else-if="menu.isMenu" :index="`/${menu.path}`" @click="handleClickMenu(index)">
          {{ menu.name }}
        </el-menu-item>
      </template>
    </el-menu>
    <draggable
      :list="selectTemplates"
      v-bind="{ group: 'templates' }"
      class="dragArea11"
      style="height: 100%;flex: 1;border: 1px gray solid;padding: 8px;margin-left: 4px;width: 100px;"
    >
      <div v-for="(component, index) in selectTemplates" :key="component.id">
        <template v-if="component.name === 'template-table'">
          <template-table
            :index="index"
            :data="selectTemplates[index].data[`data_${index}`]"
            :config="selectTemplates[index].config[`config_${index}`]"
            @click-del="handleClickDelTemplate"
            @change="handleChangeTemplate"
            style="width: 100%;"
          ></template-table>
        </template>
      </div>
    </draggable>
    <div>
      组件库
      <draggable
        :list="templates"
        v-bind="{ group: { name: 'templates', pull: 'clone', put: false }, sort: false }"
        :clone="handleCloneTemplate"
        style="height:100%;width: 200px;border: 1px gray solid;padding: 8px;margin-right: 4px;"
      >
        <div v-for="template in templates" :key="template.id">
          <div>{{ template.name }}</div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import draggable from 'vuedraggable'
import components from '@/components'
import { getGuid, getHtml4String } from '../../../utils/commonUtil'

export default {
  name: 'layout',
  components: { draggable, ...components },
  created() {
    this.templates = Object.keys(components).map((component) => ({
      id: getGuid(),
      name: component,
      data: {},
      config: {}
    }))
    this.getProjectInfo({ projectId: this.$route.query.projectId })
  },
  computed: {
    ...mapState({
      project: (state) => state.page.projectInfo
    })
  },
  watch: {
    selectTemplates: {
      handler(newValue) {
        this.returnHtml = getHtml4String(newValue)
        this.updateProjectInfo(newValue, this.returnHtml)
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['getProjectInfo', 'updateProject']),
    handleClickMenu(index, childrenIndex) {
      this.layout.index = index
      this.layout.childrenIndex = -1
      this.selectTemplates = this.project.pages[index].layout.template
      this.returnHtml = this.project.pages[index].layout.html

      if (typeof childrenIndex !== 'undefined') {
        this.layout.childrenIndex = childrenIndex
        this.selectTemplates = this.project.pages[index].children[childrenIndex].layout.template
        this.returnHtml = this.project.pages[index].children[childrenIndex].layout.html
      }
    },
    handleCloneTemplate(template) {
      template = JSON.parse(JSON.stringify(template))
      template.id = getGuid()
      return template
    },
    handleClickDelTemplate(index) {
      this.selectTemplates.splice(index, 1)
    },
    handleChangeTemplate({ index, html, data, config }) {
      this.selectTemplates[index].html = html
      this.selectTemplates[index].data = data
      this.selectTemplates[index].config = config
      this.returnHtml = getHtml4String(this.selectTemplates)

      this.updateProjectInfo(this.selectTemplates, this.returnHtml)
    },
    updateProjectInfo(template, html) {
      if (this.layout.childrenIndex !== -1) {
        this.project.pages[this.layout.index].children[this.layout.childrenIndex].layout.template = template
        this.project.pages[this.layout.index].children[this.layout.childrenIndex].layout.html = html
      } else {
        this.project.pages[this.layout.index].layout.template = template
        this.project.pages[this.layout.index].layout.html = html
      }
      this.updateProject(this.project)
    }
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '项目名不能为空', trigger: 'blur' },
          { pattern: /^(\w|-){4,20}$/, message: '项目名必须在4~20个字母之间,特殊符号仅支持"-""_"', trigger: 'blur' }
        ]
      },
      templates: [], // 模板库列表
      selectTemplates: [],
      returnHtml: '',
      layout: {
        index: null,
        childrenIndex: -1
      }
    }
  }
}
</script>

<style scoped lang="scss">
.page-layout {
  height: 100%;
  display: flex;

  .el-menu {
    height: 100%;
    width: 200px !important;
  }
}
</style>
