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

export default defineComponent({
  setup() {},
})
</script>

<style lang="less" scoped>
.order_list {
}
</style>