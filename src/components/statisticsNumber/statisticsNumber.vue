<template>
  <div>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark">数量分布统计</div></el-col>
      <el-col :span="24">

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import commonFn from '@/common/js/common'
  import {codeState} from '@/api/config'
  import {login} from '@/api/login'
  import {setCookie} from '@/common/js/util'
  import {jumpTo} from '@/api/uri'
  export default {
    data () {
      return {
        userName: '',
        userPwd: ''
      }
    },
    methods: {
      onSubmit () {
        if (!commonFn.isEmptyHandler(this.userName, '用户名不能为空')) {
          return false
        }
        if (!commonFn.isPasswordHandler(this.userPwd, '请输入6-16位数字和字母组成的密码')) {
          return false
        }
        this._loginHandler()
      },
      _loginHandler () {
        let option = {
          userName: this.userName,
          userPwd: this.userPwd
        }
        login(option).then((res) => {
          if (res.data.code !== codeState.ERR_OK) {
            return false
          }
          setCookie('token', res.data.data.token)
          this.$message({
            message: '登录成功',
            type: 'success',
            duration: 1000,
            onClose: jumpTo(codeState.adminLoaded)
          })
        })
      }
    }

  }
</script>
