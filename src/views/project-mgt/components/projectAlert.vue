<template>
  <el-dialog title="新建项目" :visible="show" @close="close" width="440px">
    <el-form
      class="form-label flex fixed-width"
      ref="project"
      :rules="rules"
      :model="project"
      @submit.native.prevent
      label-width="100px"
    >
      <el-row>
        <el-col :span="8">
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
    </el-form>
    <div slot="footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="handleClickConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      project: {
        id: '',
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '项目名不能为空', trigger: 'blur' },
          { pattern: /^(\w|-){4,20}$/, message: '项目名必须在4~20个字母之间,特殊符号仅支持"-""_"', trigger: 'blur' }
        ]
      },
      orgOpts: [],
      orgChildrenOpts: []
    }
  },
  methods: {
    close() {
      this.$emit('update:show', false)
      this.$refs['project'].resetFields()
    },
    handleClickConfirm() {
      this.$refs['project'].validate((valid) => {
        if (valid) {
          const { name } = this.project
          this.$emit('handleClick', {
            id: this.$getGuid(),
            name
          })
        }
      })
    }
  }
}
</script>
