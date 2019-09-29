export default '' +
  '<template>\n' +
  '  <div class="layout">\n' +
  '    <el-menu\n' +
  '      router\n' +
  '      unique-opened\n' +
  '      :collapse-transition="false"\n' +
  '      background-color="#001529"\n' +
  '      text-color="#cfcfcf"\n' +
  '      active-text-color="#409EFF"\n' +
  '      :default-active="activeMenuPath">\n' +
  '${{viewLayout}}' +
  '    </el-menu>\n' +
  '    <router-view />\n' +
  '  </div>\n' +
  '</template>\n' +
  '\n' +
  '<script>\n' +
  'export default {\n' +
  '  data(){\n' +
  '    return {\n' +
  '      activeMenuPath: window.location.pathname\n' +
  '    }\n' +
  '  }\n' +
  '}\n' +
  '<' +
  '/script>\n' +
  '\n' +
  '<style scoped lang="scss">\n' +
  '.layout {\n' +
  '  height: 100%;\n' +
  '  display: flex;\n' +
  '  .el-menu {\n' +
  '    height: 100%;\n' +
  '    width: 200px !important;\n' +
  '  }\n' +
  '}\n' +
  '</style>'
