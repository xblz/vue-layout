<template>
  <el-dialog title="菜单" :visible="show" @open="open" @close="close" width="440px">
    <el-form class="form-label flex fixed-width" ref="menu" :rules="rules" :model="menu" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="menu.name" placeholder="菜单名称" minlength="2" maxlength="8" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="访问路由" prop="path">
            <el-input v-model="menu.path" placeholder="访问路由" minlength="2" maxlength="20" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="菜单中显示" prop="isMenu">
            <el-radio-group v-model="menu.isMenu">
              <el-radio :label="true">显示</el-radio>
              <el-radio :label="false">隐藏</el-radio>
            </el-radio-group>
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
import { $deepcopy } from '../../../lib/methods'

export default {
  props: {
    show: Boolean,
    data: Object
  },
  data() {
    return {
      menu: { name: '', path: '', isMenu: true },
      rules: {
        name: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }],
        path: [
          { required: true, message: '访问路由不能为空', trigger: 'blur' },
          { pattern: /^(\w|-){2,20}$/, message: '访问路由在2~20个字母之间,特殊符号仅支持"-""_"', trigger: 'blur' }
        ],
        isMenu: [{ required: true, message: '菜单名称不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    open() {
      if (this.data) {
        this.menu = $deepcopy(this.data)
      }
    },
    close() {
      this.$emit('update:data', null)
      this.$emit('update:show', false)
      this.menu = {}
      this.$refs['menu'].resetFields()
    },
    handleClickConfirm() {
      this.$refs['menu'].validate((valid) => {
        if (valid) {
          this.$emit('handleClick', this.menu)
        }
      })
    }
  }
}
</script>
