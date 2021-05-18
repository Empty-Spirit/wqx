<template>
  <div class='mine'>
    <van-cell-group>
      <van-cell
        title="用户名"
        :value="$store.state.userInfo.user_name"
      />
      <van-cell
        title="修改密码"
        is-link
        @click="forget"
      />
    </van-cell-group>

    <van-dialog
      v-model="showFoget"
      title="修改密码"
      show-cancel-button
      :beforeClose='submit'
    >
      <van-form :key='formkey'>
        <van-field
          v-model="form.old_pwd"
          type="password"
          name="原密码"
          label="原密码"
          @focus='focus("old")'
          placeholder="请输入原来密码"
          :rules="[{ required: true}]"
        />
        <span
          v-if='showError'
          class='error'
        >密码输入错误</span>
        <van-field
          v-model="form.new_pwd"
          type="password"
          name="新密码"
          label="新密码"
          placeholder="请输入新密码"
          :rules="[{ required: true }]"
        />
        <van-field
          v-model="form.confirm_pwd"
          type="password"
          name="确认密码"
          label="确认密码"
          @focus='focus'
          placeholder="请确认密码"
          :rules="[{ required: true}]"
        />
        <span
          v-if='showAgreement'
          class='error'
        >{{errorMessage}}</span>
      </van-form>
    </van-dialog>

    <van-button
      class='out'
      @click="out"
      type="info"
    >退出登录</van-button>
  </div>
</template>

<script>
export default {
  name: 'Mine',
  data () {
    return {
      formkey: 0,
      showError: false,
      showFoget: false,
      showAgreement: false,
      errorMessage: '',
      password: '',
      form: {
        old_pwd: '',
        new_pwd: '',
        confirm_pwd: ''
      }
    }
  },
  methods: {
    // 登出
    out () {
      document.cookie = 'token=';
      this.$router.push({
        name: '/'
      })
    },
    forget () {
      console.log('修改密码')
      this.showFoget = true
    },
    submit (action, done) {
      // done(false)
      console.log(action)
      if (action === 'confirm') {
        let a = []
        for (let i in this.form) {
          if (!this.form[i]) {
            a.push(0)
            this.$toast('请将信息填写完整');
            break
          } else if (this.form[i].length < 6) {
            a.push(0)
            this.$toast('密码长度不得少于六位');
            break
          }
        }
        if (a.indexOf(0) === -1) {
          done(false)
          if (this.form.new_pwd !== this.form.confirm_pwd) {
            this.showAgreement = true
            this.errorMessage = '两次密码不一致'
          } else if (this.form.new_pwd === this.form.old_pwd) {
            this.showAgreement = true
            this.errorMessage = '新老密码不能一样'
          } else {
            this.$api.user.repeatPwd(this.form).then(res => {
              if (res.error) {
                this.showError = true
              } else {
                this.$toast(res.message)
                let that = this
                setTimeout(() => {
                  that.$router.push({
                    path: '/'
                  }, 2000)
                })
                document.cookie = 'token=';
              }
            })
          }
        } else {

          done(false)
        }
      } else {
        this.clear(done)
      }
    },
    // 清除提示关闭弹窗
    clear (done) {
      this.formkey++;
      this.form = {
        old_pwd: '',
        new_pwd: '',
        confirm_pwd: ''
      }
      this.showAgreement = false
      this.showError = false
      done()
    },
    focus (type) {
      if (type === 'old') {
        this.showError = false
      } else {
        this.showAgreement = false
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.mine {
  text-align: left;
  .out {
    width: 200px;
    position: absolute;
    bottom: 100px;
    margin-left: 100px;
  }
  .van-cell {
    padding: 10px 40px;
  }
  .error {
    display: inline-block;
    font-size: 12px;
    color: red;
    margin-left: 140px;
  }
}
</style>