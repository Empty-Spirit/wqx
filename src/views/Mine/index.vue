<template>
  <div>
    <van-cell-group>
      <van-cell title="用户名" :value="userInfo.user_name" />
      <van-cell title="修改密码" is-link @click="forget" />
    </van-cell-group>

    <van-dialog
      v-model="show.showFoget"
      title="修改密码"
      show-cancel-button
      :beforeClose="submit"
    >
      <van-form key="formkey">
        <van-field
          v-model="form.old_pwd"
          type="password"
          name="原密码"
          label="原密码"
          @focus="focus('old')"
          placeholder="请输入原来密码"
          :rules="[{ required: true }]"
        />
        <span v-if="showError" class="error">密码输入错误</span>
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
          @focus="focus"
          placeholder="请确认密码"
          :rules="[{ required: true }]"
        />
        <span v-if="showAgreement" class="error">{{ errorMessage }}</span>
      </van-form>
    </van-dialog>

    <van-button round block @click="out" type="primary"> 退出登录 </van-button>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {},
  setup () {
    let store = useStore()
    let router = useRouter()
    let userInfo = store.state.userInfo

    let show = reactive({
      showFoget: false
    })

    let form = reactive({
      old_pwd: '',
      new_pwd: '',
      confirm_pwd: ''
    })


    const forget = () => {
      show.showFoget = true
    }

    const submit = (action, done) => {
      console.log(action)
    }

    const out = () => {
      document.cookie = 'token=';
      router.push({
        name: 'Home'
      })
    }

    const focus = () => { }

    return {
      userInfo,
      show,
      form,
      forget,
      submit,
      out,
      focus,
    }
  },
})
</script>

<style lang="less" scoped></style>
