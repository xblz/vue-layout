<template>
  <el-row>
    <el-col :span="14" :offset="5">
      <el-row :gutter="24">
        <el-col :span="6" v-for="(item, key) in projectList" :key="key">
          <el-card shadow="hover" class="project-item" @click.native="handleClickDetail(item)">
            <div class="item-name">{{ item.name }}</div>
            <div>
              <el-button circle type="success" icon="el-icon-download" @click="handleClickDownload(item)"></el-button>
              <el-button circle type="danger" icon="el-icon-delete" @click="handleClickDel(item)"></el-button>
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
import projectAlert from './components/projectAlert'

export default {
  components: { projectAlert },
  created() {
    this.getProjectList({})
  },
  computed: {
    ...mapState({
      projectList: (state) => state.home.projectList
    })
  },
  methods: {
    ...mapActions(['getProjectList', 'addProject', 'delProject']),
    handleClickDownload(project) {
      console.log(project)
    },
    handleClickDetail(project) {
      this.$router.push({ path: '/page', query: { projectId: project.id } })
    },
    handleClickDel(project) {
      this.$alert(`确认删除项目（${project.name}）?`, '提示', {
        showCancelButton: true,
        callback: (action) => {
          if (action === 'confirm') {
            this.delProject(project)
            this.$showNotify('删除成功')
          }
        }
      })
    },
    handleClickConfirm(data) {
      this.addProject(data)
      this.projectAlert.show = false
      this.$showNotify('新建项目成功')
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
