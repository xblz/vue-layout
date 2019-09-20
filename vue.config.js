// vue.config.js
module.exports = {
  productionSourceMap: false,
  publicPath: process.env.VUE_APP_BASE_PATH,
  devServer: {
    disableHostCheck: true,
    port: 5000
  }
}
