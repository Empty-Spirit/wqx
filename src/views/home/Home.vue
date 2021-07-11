<template>
  <div class="home">
    <div
      v-for="(item, index) in message"
      :key="index"
      class="module"
      @click="go(item.src)"
    >
      <img :src="item.img" />
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import rmb from '@/assets/home/rmb.png'
import addAccount from '@/assets/home/add-account.png'
import { Notify } from 'vant'

export default defineComponent({
  setup() {
    let router = useRouter()
    let store = useStore()

    let userInfo = store.state.userInfo

    let message = ref([
      {
        name: '缴费',
        src: 'OrderAdd',
        meta: 7,
        img: rmb,
      },
      {
        name: '添加学员',
        src: 'StuAdd',
        meta: 7,
        img: addAccount,
      },
      {
        name: '授权管理',
        src: 'UserList',
        meta: 8,
        img: addAccount,
      },
      {
        name: '登录授权',
        src: 'UserAdd',
        meta: 8,
        img: addAccount,
      },
      {
        name: '缴费记录',
        src: 'OrderList',
        meta: 8,
        img: addAccount,
      },
    ])

    let go = (src: string) => {
      if (userInfo.user_status < 8) {
        Notify({
          message: '对不起您的权限不足!',
          type: 'danger',
          duration: 1000,
        })
      } else {
        router.push({
          name: src,
        })
      }
    }

    return {
      message,
      go,
    }
  },
})
</script>

<style lang="less" scoped>
.home {
  text-align: left;
  .module {
    display: inline-block;
    width: 100px;
    height: 100px;
    text-align: center;
    img {
      width: 30px;
      height: 30px;
    }
    span {
      display: inline-block;
      width: 100px;
    }
  }
}
</style>
