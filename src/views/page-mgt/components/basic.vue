<template>
  <el-form
    class="form-label flex fixed-width page-basic"
    ref="project"
    :rules="rules"
    :model="project"
    @submit.native.prevent
    label-width="100px"
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
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-button type="primary" class="submit-btn" @click="handleClickSubmit">保存</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'basic',
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
.page-basic {
  padding: 20px;
  .submit-btn {
    float: right;
  }
}
</style>
