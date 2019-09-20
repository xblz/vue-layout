<template>
  <el-button>{{ title }}</el-button>
</template>

<script>
export default {
  name: 'layout2',
  template: '    <el-button>{{ title }}</el-button>',
  props: {
    title: String
  },
  data() {
    return {}
  }
}
</script>
