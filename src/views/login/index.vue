<template>
  <div class="login-page-container">
    <div class="login-container">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" autoComplete="on" label-position="left">
        <div class="login-header">
          <div class="login-title-container"><strong class="login-title">Leo IM</strong></div>
          <div class="profile-image"></div>
        </div>
        <div class="login-content">
          <el-form-item prop="username">
            <el-input placeholder="用户名" prefix-icon="el-icon-third-my_light" v-model="loginForm.username" autoComplete="on" autofocus="autofocus" @focus="clearValidate"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" prefix-icon="el-icon-third-lock" v-model="loginForm.password" @keyup.enter.native="doLogin"></el-input>          
          </el-form-item>        
          <el-button class="login-button" type="primary" :loading="loadingVisible" @click.native.prevent="doLogin">登录</el-button>
        </div>
        <div class="login-footer">
          <a href="#" @click="openRegisterDialog()">没有账号，立即注册</a>
        </div>
      </el-form>
    </div>
    <register-user ref="registerUser" @onRegisterSuccessed="onRegisterSuccessed"></register-user>
  </div>
</template>

<script>
import { outputError } from '@/utils/exception'
import { login } from '@/api/auth'
import { updateOnlineStatus } from '@/api/user'

export default {
  data() {
    return {
      loadingVisible: false,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入口令', trigger: 'blur' }]
      }
    }
  },
  methods: {
    clearValidate() {
      this.$refs['loginForm'].clearValidate()
    },
    openRegisterDialog() {
      this.$refs.registerUser.$emit('openDialog')
    },
    onRegisterSuccessed(username, password) {
      this.loginForm.username = username
      this.loginForm.password = password
      this.doLogin()
    },
    doLogin() {
      this.loadingVisible = true
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          login(this.loginForm.username, this.loginForm.password)
          .then(response => {
            sessionStorage.setItem('currentUser', JSON.stringify({
              id: response.data.userId,
              name: response.data.username,
              nickname: response.data.nickname,
              firstLetterOfName: response.data.firstLetterOfName,
              avatarUrl: response.data.avatarUrl
            }))
            sessionStorage.setItem('token', response.data.token)
            
            updateOnlineStatus(response.data.userId, 'online')
            .then(_ => {
              this.loadingVisible = false
              let redirect = decodeURIComponent(
                this.$route.query.redirect || "/"
              )
              this.$router.push(redirect)
            })
            .catch(error => {
              this.loadingVisible = false
              outputError(this, error)
            })
          })
          .catch(error => {
            this.loadingVisible = false
            if(error.response && error.response.status === 401) {
              this.$message({
                showClose: true,
                message: '登录失败，请检查用户名或口令是否正确！',
                type: 'error'
              })
              return
            }
            outputError(this, error)
          })
        }
      })
      this.loadingVisible = false
    }
  },
  components: { 
    RegisterUser: resolve => require(['@/components/user/register'], resolve)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.login-page-container {
  padding: 80px 0px 0px 0px;
}

.login-container {
  width: 390px;
  margin: 0px auto;
  padding: 0px;
  background-color: #fff;
}

.login-header {
  padding: 0px 0px 75px 0px;
  margin: 0px 0px 15px 0px;
  position: relative;
  border-bottom: 1px solid #ddd;
  z-index: 10;
  -webkit-transition: padding-bottom 0.4s;
  transition: padding-bottom 0.4s;  
  text-align: center;
  .login-title-container {
    padding-top: 30px;
    .login-title {
      color: #1685C1;
      font-size: 25px;
    }    
  }
  .profile-image {
    position: absolute;
    width: 85px;
    height: 85px;  
    margin: 30px 0px 0px 152px;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-clip: content-box;
    color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 0 15px;
    background-image: url(../../assets/images/undefined-user.png);
  }    
}

.login-content {
  padding: 50px 40px 20px;
  -webkit-transition: padding-top 0.4s;
  transition: padding-top 0.4s;
  .login-username {
    width: 20px;
    height: 20px;
    margin: 0px -10px;
    background-image: url(../../assets/images/user.png);
  }
  .login-password {
    width: 20px;
    height: 20px;
    margin: 0px -10px;
    background-image: url(../../assets/images/lock.png);
  }
  .login-button {
    width: 100%;
  }
}

.login-footer {
  font-size: 13px;
  padding: 0px 40px 40px;
  text-align: left;
}
</style>


