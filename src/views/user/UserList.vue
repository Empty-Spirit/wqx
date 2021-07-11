/** 授权用户列表 */
<template>
  <div class="user_list">
    <van-nav-bar
      title="授权列表"
      left-text="返回"
      left-arrow
      @click-left="goOut"
    />
    <div class="user_header">
      <!-- <search :message="message" @searchMessage="search"></search> -->
      <van-row class="header_title">
        <van-col align="center" span="6">姓名</van-col>
        <van-col align="center" span="12">手机号</van-col>
        <van-col align="center" span="6">授权</van-col>
      </van-row>

      <van-swipe-cell v-for="(item, index) in userList" :key="index">
        <van-cell :border="true">
          <van-row>
            <van-col align="center" span="6">{{ item.user_name }}</van-col>
            <van-col align="center" span="12">{{ item.user_phone }}</van-col>
            <van-col align="center" span="6">{{ item.user_status }} </van-col>
          </van-row>
        </van-cell>
        <template #right>
          <van-button
            square
            type="primary"
            @click="repeat(item.user_id)"
            text="重置密码"
          />
          <van-button
            square
            type="danger"
            class="update"
            @click="del(item.user_name)"
            text="取消授权"
          />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue'
import api from '../../config/api'
import { Notify } from 'vant'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    let router = useRouter()

    let userList = ref([])

    onBeforeMount(() => {
      getUserList()
    })

    let getUserList = () => {
      api.user.userList().then((res: any) => {
        userList.value = res
      })
    }

    // 重置密码
    let repeat = (id: string) => {
      let obj = {
        type: 2, //管理员重置密码
        user_id: id,
      }
      api.user.repeatPwd(obj).then((res) => {
        if (res) {
          Notify({
            message: '初始化密码成功,初始密码为123456',
            type: 'success',
            duration: 2000,
          })
        }
      })
    }

    // 取消授权
    let del = (name: string) => {
      let obj = {
        user_name: name,
        empower: false,
      }
      api.user.userAdd(obj).then((res) => {
        if (res) {
          Notify({
            message: '取消授权成功',
            type: 'success',
            duration: 1000,
          })
          getUserList()
        }
      })
    }

    // 返回上一级菜单
    let goOut = () => {
      router.push('Home')
    }

    return {
      userList,
      repeat,
      del,
      goOut,
    }
  },
})
</script>

<style lang="less" scoped>
.user_list {
  .header_title {
    background: #ddd;
    height: 30px;
    line-height: 30px;
    padding: 5px 10px;
  }
}
</style>