<template>
  <div class="page-layout">
    <el-aside>
      <el-menu router unique-opened :collapse-transition="false" :default-active="activeMenuPath">
        <el-submenu v-show="false" index="/">
          <el-menu-item index="/home"></el-menu-item>
        </el-submenu>
        <template v-for="(menu, index) in project.pages">
          <el-submenu :key="index" v-if="menu.isMenu && menu.children.length" :index="menu.path">
            <template slot="title">
              <span>{{ menu.name }}</span>
            </template>
            <template v-for="(childrenMenu, childrenIndex) in menu.children">
              <el-menu-item
                v-if="childrenMenu.isMenu"
                :key="childrenIndex"
                :index="`${menu.path}/${childrenMenu.path}`"
              >
                <template slot="title">
                  <span>{{ childrenMenu.name }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item :key="index" v-else-if="menu.isMenu" :index="menu.path">
            {{ menu.name }}
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'layout',
  created() {
    this.getProjectInfo({ projectId: this.$route.query.projectId })
  },
  computed: {
    ...mapState({
      project: (state) => state.page.projectInfo
    })
  },
  methods: {
    ...mapActions(['getProjectInfo', 'updateProject']),
    handleClickSubmit() {
      this.$refs['project'].validate((valid) => {
        if (valid) {
          this.updateProject(this.project)
          this.$showNotify('修改成功')
        }
      })
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
      activeMenuPath: ''
    }
  }
}
</script>

<style scoped lang="scss">
.page-layout {
  height: 100%;
  .el-aside {
    height: 100%;
    .el-menu {
      height: 100%;
    }
  }
}
</style>
