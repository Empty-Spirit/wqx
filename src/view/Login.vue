<template>
  <div class="login">
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
        style="width: 300px"
      />
    </div>
    <Button
      type="success"
      @click='submit'
    >登录</Button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      form: {
        user_name: '张哲学',
        user_pwd: '147zhang'
      }
    }
  },
  mounted () {
    // window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd3ea51a6de85fb58&redirect_uri=http://192.168.0.104:8080&response_type=code&scope=SCOPE&state=STATE"
  },
  methods: {
    submit () {
      this.$api.user.login(this.form).then(res => {
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
}
</style>
