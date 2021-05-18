<template>
  <div class="login">
    <div>
      <div>
        <Input
          v-model="form.user_name"
          placeholder="用户名"
          style="width: 300px"
        />
      </div>
      <div>
        <Input
          v-model="form.user_pwd"
          placeholder="密码"
          type='password'
          style="width: 300px"
        />
      </div>
      <Button
        type="success"
        @click='submit'
      >登录</Button>
      <span class='forget'>忘记密码</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      form: {
        user_name: '',
        user_pwd: ''
      }
    }
  },
  mounted () {
    // window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd3ea51a6de85fb58&redirect_uri=http://192.168.0.104:8080&response_type=code&scope=SCOPE&state=STATE"
  },
  methods: {
    submit () {
      this.$api.user.login(this.form).then(res => {
        console.log(res, 'dd')
        this.$store.commit('getUserInfo', res)
        let str = 'token=' + res.token + '=token'
        // 存储cookie
        document.cookie = str
        this.$alert('tip', 'success', '登录成功')

        this.$router.push({
          name: 'Main'
        })
      })
    }
  }
}
</script>
<style scoped lang='scss'>
.login {
  .forget {
    font-size: 12px;
    text-decoration: underline;
    color: rgb(214, 39, 170);
  }
}
</style>
