/** 缴费记录 */
<template>
  <div class="order_list">
    <van-nav-bar
      title="缴费记录"
      left-text="返回"
      left-arrow
      @click-left="goOut"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    let router = useRouter()
    const goOut = () => {
      router.push('Home')
    }

    return {
      goOut,
    }
  },
})
</script>

<style lang="less" scoped>
.order_list {
}
</style>