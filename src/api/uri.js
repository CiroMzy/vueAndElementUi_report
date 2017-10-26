import {codeState} from './config'

/***********************************
 * 前端路由
 * @type {string}
 */
export const login = '/#/login'
export const report = '/#/report'
export const page404 = '/#/page404'

/********************************
 * 接口路由
 * @param uriCode
 */
export const rootHref = 'http://mazhaoyang.cn/index.php/Home/Output/'
export const loginRemote = rootHref + 'reportAdmin.html'
export const pageLogin = rootHref + 'weixin'

/********************************
 * 路由跳转
 * @param uriCode
 */
export function jumpTo (uriCode) {
  switch (uriCode) {
    // 未登录
    case codeState.adminRelogin:
      window.location.href = login
      break
    // 登录成功
    case codeState.adminLoaded:
      window.location.href = report
      break
    // 页面未找到
    case codeState.page404:
      window.location.href = page404
      break
  }
}
