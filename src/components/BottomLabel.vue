<template>
  <div class="bottom_label">
    <!-- <van-tabbar v-model="active" @change="onGoChange"> -->
    <van-tabbar @change="onGoChange">
      <template v-for="(item, index) in Footerlabel" :key="index">
        <van-tabbar-item :name="item.src" :icon="item.icon">
          {{ item.name }}
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    let router = useRouter()
    let route = useRoute()
    let store = useStore()

    let header = ref(false)
    let status = ref(1)
    let active = ref('Home')
    let Footerlabel = ref(store.state.mainTab)

    // 监听路径变化
    watch(
      () => route.path,
      (val) => {
        active.value = val.split('/')[1]
      }
    )
    let onGoChange = (src: string) => {
      router.push({
        name: src,
      })
    }

    return {
      header,
      status,
      Footerlabel,
      active,
      onGoChange,
    }
  },
})
</script>

<style lang="less" scoped>
.bottom_label {
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 4px solid #eee;
    background: #fff;
  }
  .label_name {
    width: 20%;
    margin: 2px;
    color: #000;
    font-size: 14px;
  }
}
</style>
