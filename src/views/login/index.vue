<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on">
      <h3 class="title">天宇达库存财务管理系统</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" placeholder="请填写用户名称!" auto-complete="on"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          auto-complete="on"
          placeholder="请填写用户密码!" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: { required: true, message: '请填写用户名', trigger: 'blur' },
        password: { required: true, message: '请填写密码', trigger: 'blur' }
      },
      loading: false,
      pwdType: 'password'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            console.log(this.redirect)
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
            console.log('error request!!')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

.login-container {
  .el-form-item {
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(0,0,0,0.1);
    border-radius: 5px;
    color: #454545;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        box-shadow: 0 0 0 0px 1000px $bg inset !important;
        -webkit-box-shadow: 0 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
}
</style>

<style rel="stylesheet/scss"  lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .title {
    text-align: center;
    font-size: 26px;
    color: #EEE;
    font-weight: 700;
    margin: 0 auto 40px;
  }
  .svg-container {
    display: inline-block;
    width: 30px;
    color: $dark_gray;
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
  }
  .show-pwd {
    position: absolute;
    color: $dark_gray;
    right: 10px;
    top: 7px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }
}
</style>

