<template>
  <div>
    <router-view />
    <!-- 底部导航 -->
    <div class="footer"></div>
    <bottom-label></bottom-label>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import bottomLabel from '@/components/BottomLabel.vue'

export default defineComponent({
  components: {
    bottomLabel,
  },
  setup() {},
})
</script>

<style lang="less" scoped></style>
