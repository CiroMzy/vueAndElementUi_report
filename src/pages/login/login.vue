<template>
  <div class="container">
    <el-form ref="form"  >
      <el-form-item>
        <el-input
          placeholder="请输入用户名"
          icon="my-user"
          v-model="userName">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          placeholder="请输入密码"
          icon="my-mima"
          type="password"
          v-model="userPwd">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="w100" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
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
<style lang="less" scoped>
  .container{
    width: 300px;
    height: 160px;
    position: absolute;
    top: 40%;
    margin-top: -80px;
    left: 50%;
    margin-left: -150px;
  }
</style>
