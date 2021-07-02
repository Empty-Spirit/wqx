<template>
  <div class="login">
    <img class="userimg" src="@/assets/img/userLogo.jpg" alt="" />
    <van-form class="userform" @submit="onSubmit">
      <van-field
        v-model="form.user_name"
        name="user_name"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="form.user_pwd"
        type="password"
        name="user_pwd"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <span class="userpwd">忘记密码</span>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Toast } from 'vant'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import api from '@/config/api'

export default defineComponent({
  setup() {
    let store = useStore()
    let router = useRouter()

    let form = ref({
      user_name: '张哲学',
      user_pwd: '147zhang',
    })

    let onSubmit = (form) => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      api.user.login(form).then((res) => {
        if (res) {
          // 将用户信息存储在store中
          store.commit('upDateUserInfo', res)
          // 对存储在cookie中的token进行拼接
          let str = 'token=' + res.token + '=token'
          // 存储cookie
          document.cookie = str
          // 登录成功提示
          Toast.success('登录成功')
          // 登录成功跳转
          router.push({
            name: 'Main',
          })
        }
      })
    }

    return {
      form,
      onSubmit,
    }
  },
})
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .userimg {
    width: 100px;
    height: 100px;
    margin-bottom: 100px;
    border: 1px solid;
    border-radius: 50%;
  }
  .userform {
    width: 100%;
    margin-bottom: 50px;
  }
  .userpwd {
    font-size: 13px;
    text-decoration: underline;
  }
}
</style>
