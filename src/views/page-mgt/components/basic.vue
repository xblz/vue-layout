<template>
  <div class="page-basic">
    <el-form
      class="form-label flex fixed-width"
      ref="project"
      :rules="rules"
      :model="project"
      @submit.native.prevent
      label-width="120px"
    >
      <el-row>
        <el-col :span="10">
          <el-form-item label="项目名" prop="name">
            <el-input
              v-model="project.name"
              placeholder="支持字母/数字，特殊符号仅支持 _ -"
              minlength="4"
              maxlength="20"
              clearable
              @blur="handleClickSubmit"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="开发环境接口地址" prop="devPath">
            <el-input
              v-model="project.devPath"
              placeholder="开发api访问地址"
              maxlength="80"
              clearable
              @blur="handleClickSubmit"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-tree :data="project.pages" default-expand-all node-key="value" :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ data, node }">
            <span>{{ data.name }}</span>
            <span>
              <el-button icon="el-icon-plus" type="text" @click="handleClickMenuAdd(data)" v-if="data.children">
                添加二级菜单
              </el-button>
              <el-button icon="el-icon-edit" type="text" @click="handleClickMenuEdit(data, node)">
                编辑
              </el-button>
            </span>
          </span>
        </el-tree>
        <el-button icon="el-icon-plus" type="text" title="一级菜单" @click="handleClickMenuAdd({ isMenu: true })">
          添加一级菜单
        </el-button>
      </el-row>
    </el-form>
    <menu-alert :show.sync="menu.show" :data="menu.data" @handleClick="handleMenuDialogConfirm" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { showNotify } from '../../../utils/commonUtil'

import menuAlert from './menuAlert'

export default {
  name: 'basic',
  components: { menuAlert },
  created() {
    this.getProjectInfo({ projectId: this.$route.query.projectId })
  },
  computed: {
    ...mapState({
      project: (state) => state.page.projectInfo
    })
  },
  methods: {
    ...mapActions(['getProjectInfo', 'updateProject', 'addProjectMenu', 'updateProjectMenu']),
    handleClickSubmit() {
      this.$refs['project'].validate((valid) => {
        if (valid) {
          this.updateProject(this.project)
        }
      })
    },
    handleClickMenuAdd(data) {
      this.menu = {
        show: true,
        data: Object.assign({}, data, { name: '', path: '', isMenu: true })
      }
    },
    handleClickMenuEdit(data, node) {
      this.menu = {
        show: true,
        data: data,
        updateNode: node
      }
    },
    handleMenuDialogConfirm(data) {
      let payload = { projectId: this.project.projectId, data }
      if (data.children) {
        payload.pageId = data.pageId
      } else if (this.menu.updateNode) {
        payload.pageId = this.menu.updateNode.parent.data.pageId
        payload.childrenId = data.childrenId
      }

      let fun = this.addProjectMenu
      let message = '添加成功'
      if (this.menu.updateNode) {
        fun = this.updateProjectMenu
        message = '编辑成功'
      }
      fun(payload)
      this.menu.show = false
      this.menu.data = null
      this.menu.updateNode = null
      showNotify(message)
      this.getProjectInfo({ projectId: this.$route.query.projectId })
    }
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '项目名不能为空', trigger: 'blur' },
          { pattern: /^(\w|-){4,20}$/, message: '项目名必须在4~20个字母之间,特殊符号仅支持"-""_"', trigger: 'blur' }
        ],
        devPath: [
          {
            pattern: /(http|https):\/\/([\w.]+\/?)\S*/,
            message: '必须以http,https开头,检查格式是否正确',
            trigger: 'blur'
          }
        ]
      },
      menu: {
        show: false,
        data: {}
      }
    }
  }
}
</script>

<style scoped lang="scss">
.page-basic {
  padding: 20px;
  .el-tree {
    width: 480px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .submit-btn {
    float: right;
  }
}
</style>
