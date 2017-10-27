import axios from 'axios'
import {jumpTo} from './uri'
import {vm} from '@/main.js'
import {codeState} from './config'
import {containCookie, getCookie} from '@/common/js/util'
axios.defaults.timeout = 6000000
axios.interceptors.request.use(config => {
  if (!containCookie('token')) {
    jumpTo(codeState.pageLogin)
  }
  return config
})
axios.interceptors.response.use(res => {
  let code = res.data.code + ''
  switch (code) {
    // 用户名密码错误
    case codeState.adminError:
      vm.$message({
        message: '用户名密码错误',
        showClose: true,
        type: 'warning',
        duration: 3000
      })
      break
    // 转到 登录页面
    case codeState.adminRelogin:
      vm.$message({
        message: '授权未通过，请重新登录',
        type: 'warning',
        showClose: true,
        duration: 3000,
        onclose: jumpTo(codeState.adminRelogin)
      })
      break
  }
  return res
}, error => {
  vm.$message({
    message: error,
    type: 'warning',
    showClose: true,
    duration: 3000
  })
})

export function fetch (url, data) {
  console.log(getCookie('token'))
  /* eslint-disable no-new */
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      data: data,
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'HTTP_ACCESS_TOKEN': getCookie('token') ? getCookie('token') : ''
      },
      method: 'POST'
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}
