<template>
  <div class='main'>
    <router-view />
    <!-- 底部导航 -->
    <div class="footer"></div>
    <bottom-label></bottom-label>
  </div>
</template>

<script>
import bottomLabel from '@/components/BottomLabel'
export default {
  name: 'Main',
  components: {
    bottomLabel
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>