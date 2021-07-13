/** 缴费记录 */
<template>
  <div class="order_list">
    <van-nav-bar
      title="缴费记录"
      left-text="返回"
      left-arrow
      @click-left="goOut"
    />
    <search :message="message" @searchMessage="search"></search>
    <div>
      <van-collapse v-model="active" accordion>
        <van-collapse-item
          :name="index"
          v-for="(item, index) in orderList"
          :key="index"
        >
          <template #title>
            <div class="item_header">
              <span class="header_name">学员：{{ item.stu_name }}</span>
              <span class="header_time"
                >所缴月份：{{ item.pay_time.slice(0, 7) }}</span
              >
            </div>
          </template>
          <div class="order_content">
            <div class="item_list_f1">
              <span class="list_name">缴费人：</span>
              <span class="list_value">{{ item.user_name }}</span>
            </div>
            <div class="item_list_f1">
              <span class="list_name">缴费交易时间：</span>
              <span class="list_value">{{ item.startTime }}</span>
            </div>
            <div class="item_list">
              <span class="list_f1">
                <span class="list_name">学费：</span>
                <span class="list_value">{{
                  item.isTuition == 1 ? '已缴' : '未缴'
                }}</span>
              </span>
              <span class="list_f1">
                <span class="list_name">住宿费：</span>
                <span class="list_value">{{
                  item.stay == 1
                    ? item.isStay == 1
                      ? '已缴'
                      : '未缴'
                    : '未报名'
                }}</span>
              </span>
            </div>
            <div class="item_list">
              <span class="list_f1">
                <span class="list_name">舞蹈：</span>
                <span class="list_value">{{
                  item.dance == 1
                    ? item.isDance == 1
                      ? '已缴'
                      : '未报名'
                    : '未报名'
                }}</span>
              </span>
              <span class="list_f1">
                <span class="list_name">口才：</span>
                <span class="list_value">{{
                  item.eloquence == 1
                    ? item.isEloquence == 1
                      ? '已缴'
                      : '未缴'
                    : '未报名'
                }}</span>
              </span>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import api from './../../config/api'
import Search from './../../components/Search.vue'
import { orderMessage } from './../utils/searchMessage'

export default defineComponent({
  components: {
    Search,
  },
  setup() {
    let router = useRouter()

    let message = ref(orderMessage)

    onBeforeMount(() => {
      getOrderList()
    })

    let active = ref(-1)
    let orderList = ref([])

    const search = (form) => {
      let obj = {}
      for (let i in form) {
        let a = {}
        if (form[i].value != 100 && form[i].value !== '') {
          a[form[i].name] = form[i].value
          Object.assign(obj, a)
        }
      }
      getOrderList(obj)
    }

    const getOrderList = (obj: any) => {
      api.order.orderList(obj).then((res: any) => {
        orderList.value = res
      })
    }
    const goOut = () => {
      router.push('Home')
    }

    return {
      message,
      active,
      orderList,
      search,
      goOut,
    }
  },
})
</script>

<style lang="less" scoped>
.order_list {
  span {
    display: inline-block;
  }
  .item_header {
    .header_name {
      width: 35%;
    }
    .header_time {
      width: 50%;
    }
  }
  .order_content {
    .item_list_f1 {
      line-height: 30px;
      .list_name {
        width: 41%;
      }
    }
    .item_list {
      line-height: 30px;
      .list_f1 {
        width: 40%;
        .list_name {
          width: 42%;
        }
        // .list_value {
        //   width: 25%;
        // }
      }
    }
  }
}
</style>