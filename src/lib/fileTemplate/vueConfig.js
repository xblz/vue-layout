export default '' +
  'module.exports = {\n' +
  '  productionSourceMap: false,\n' +
  '  devServer: {\n' +
  '    disableHostCheck: true,\n' +
  '    port: 8080,\n' +
  '    proxy: {\n' +
  `      '/api/': {\n` +
  `        target: '\${{devPath}}',\n` +
  '        changeOrigin: true,\n' +
  '        pathRewrite: {\n' +
  `          '^/api/': '/'\n` +
  '        }\n' +
  '      }\n' +
  '    }\n' +
  '  }\n' +
  '}\n'
