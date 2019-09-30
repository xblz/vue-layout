import styleSass from '../lib/fileTemplate/styleSass'
import viewLayout from '../lib/fileTemplate/viewLayout'
import router from '../lib/fileTemplate/router'
import publicIndex from '../lib/fileTemplate/publicIndex'
import babelConfig from '../lib/fileTemplate/babelConfig'
import packages from '../lib/fileTemplate/package'
import app from '../lib/fileTemplate/app'
import main from '../lib/fileTemplate/main'
import emptyHtml from '../lib/fileTemplate/emptyHtml'
import vueConfig from '../lib/fileTemplate/vueConfig'
import http from '../lib/fileTemplate/http'
import utilsCommon from '../lib/fileTemplate/utilsCommon'
import commonRouter from '../lib/fileTemplate/commonRouter'
import viewLogin from '../lib/fileTemplate/login'
import view404 from '../lib/fileTemplate/404'

export const getEmptyHtml = () => emptyHtml

export const getStyleSass = () => styleSass
export const getPublicIndex = () => publicIndex
export const getBabelConfig = () => babelConfig
export const getPackage = () => packages
export const getApp = () => app
export const getMain = () => main
export const getVueConfig = (devPath) => vueConfig.replace('${{devPath}}', devPath)

export const getViewLayout = (str) => viewLayout.replace('${{viewLayout}}', str)

export const getHttp = () => http
export const getUtilsCommon = () => utilsCommon
export const getCommonRouter = () => commonRouter
export const getViewLogin = () => viewLogin
export const getView404 = () => view404

export const getRouter = (importsStr, routesStr) =>
  router.replace('${{imports}}', importsStr).replace('${{routes}}', routesStr)
