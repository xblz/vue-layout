<template>
  <div class="main-layout">
    <el-menu :default-active="activeMenuPath" class="nav-menu" mode="horizontal" router>
      <el-menu-item index="/page" :route="{ path: '/page', query: { projectId } }">页面管理</el-menu-item>
      <el-menu-item index="/api" :route="{ path: '/api', query: { projectId } }">API管理</el-menu-item>
    </el-menu>
    <router-view class="main-content" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectId: this.$route.query.projectId,
      activeMenuPath: window.location.pathname
    }
  }
}
</script>

<style scoped lang="scss">
.main-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  .nav-menu {
    display: flex;
    justify-content: center;
  }
  .main-content {
    flex: 1;
  }
}
</style>
