import {codeState} from './config'
import {getLocalHref} from '@/common/js/util'
export const localHref = getLocalHref()
/***********************************
 * 前端路由
 * @type {string}
 */
export const login = localHref + '#/login'
export const report = localHref + '#/report'
export const page404 = localHref + '#/page404'

/********************************
 * 接口路由
 * @param uriCode
 */
export const rootHref = 'http://mazhaoyang.cn/index.php/Home/Output/'
export const loginRemote = rootHref + 'reportAdmin.html'
export const reportReport1 = rootHref + 'reportReport1.html'
export const reportStasticsNumber = rootHref + 'reportStasticsNumber.html'
export const reportStasticsWeight = rootHref + 'reportStasticsWeight.html'
export const reportStatisticNumMonth = rootHref + 'reportStatisticNumMonth.html'

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
