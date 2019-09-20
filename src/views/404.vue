<template>
  <div>
    <div class="bg"></div>
    <div class="not-found">
      <img src="../assets/404.svg" />
      <label>页面未找到</label>
      <div class="btn-group">
        <el-button type="text" size="medium" icon="el-icon-caret-left" @click="$router.back()">
          返回上一页
        </el-button>
        <el-button type="text" size="medium" icon="el-icon-s-home" @click="$router.replace('/')">
          去首页
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {},
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.bg {
  position: fixed;
  top: -20px;
  right: -20px;
  bottom: -20px;
  left: -20px;
  filter: blur(20px);
  background: url('../assets/bg.jpg') center;
  background-size: cover;
}
.not-found {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 300px;
    height: 300px;
  }
  label {
    margin: 20px 0;
    font-size: 48px;
    color: #dfdfdf;
  }
  .btn-group {
    padding-bottom: 200px;
    .el-button {
      margin: 0 20px;
      color: #dfdfdf;
    }
  }
}
</style>
