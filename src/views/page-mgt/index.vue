<template>
  <el-tabs tab-position="left" v-model="activeName">
    <el-tab-pane label="基础信息" name="basic"><basic /></el-tab-pane>
    <el-tab-pane label="页面编辑" name="layout"><layout /></el-tab-pane>
  </el-tabs>
</template>

<script>
import basic from './components/basic'
import layout from './components/layout'
export default {
  name: 'index',
  components: { basic, layout },
  data() {
    return {
      activeName: 'basic'
    }
  }
}
</script>

<style scoped></style>
