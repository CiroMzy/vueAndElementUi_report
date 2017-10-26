import {isEmpty, isPassword} from './util'
import {vm} from '@/main.js'
export default {
  isEmptyHandler (value, msg) {
    if (isEmpty(value)) {
      vm.$message({
        message: msg,
        showClose: true,
        type: 'warning',
        duration: 3000
      })
      return false
    }
    return true
  },
  isPasswordHandler (value, msg) {
    if (isPassword(value)) {
      vm.$message({
        message: msg,
        type: 'warning',
        showClose: true,
        duration: 3000
      })
      return false
    }
    return true
  }
}
