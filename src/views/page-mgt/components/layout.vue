<template>
  <div class="page-layout">
    <div v-for="(item, key) in project.pages" :key="key">{{ item.name }}</div>
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
      orgOpts: [],
      orgChildrenOpts: []
    }
  }
}
</script>

<style scoped lang="scss">
.page-layout {
  padding: 20px;
}
</style>
