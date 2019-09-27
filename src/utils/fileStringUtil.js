import styleSass from '../lib/styleSass'
import viewLayout from '../lib/viewLayout'
import router from '../lib/router'

export const getEmptyHtml = () =>
  '<template>\n' +
  '\n' +
  '</template>\n' +
  '<script>\n' +
  'export default {\n' +
  '  data() {\n' +
  '    return {}\n' +
  '  }\n' +
  '}\n' +
  '</script>\n' +
  '<style scoped lang="scss">\n' +
  '</style>'

export const getStyleSass = () => styleSass

export const getViewLayout = (str) => viewLayout.replace('${{viewLayout}}', str)

export const getRouter = (importsStr, routesStr) =>
  router.replace('${{imports}}', importsStr).replace('${{routes}}', routesStr)
