/** 头部数据查找 */
<template>
  <div class="search">
    <van-collapse v-model="search" accordion>
      <van-collapse-item name="1">
        <template #title>
          <div class="search_title">展开筛选项</div>
        </template>
        <div class="search_content">
          <span
            class="search_label"
            v-for="(item, index) in message"
            :key="index"
          >
            <span class="select" v-if="item.type == 'select'">
              <span class="select_title">{{ item.label }}</span>
              <select class="select_option" v-model="item.value">
                <option
                  v-for="(obj, index) in item.data"
                  :key="index"
                  :value="obj.value"
                >
                  {{ obj.label }}
                </option>
              </select>
            </span>
            <van-field
              v-model="item.value"
              v-if="item.type == 'input'"
              :label="item.label"
              :placeholder="item.label"
            /> </span
          ><br />
          <van-button type="primary" @click="searchClick">搜索</van-button>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: 'Search',
  props: {
    message: {
      type: Array,
    },
    searchMessage: {
      type: Function,
    },
  },
  setup(props, ctx) {
    let search = ref('0')

    let searchClick = () => {
      ctx.emit('searchMessage', props.message)
      search.value = '0'
    }

    return {
      search,
      searchClick,
    }
  },
})
</script>

<style lang="less" scoped>
.search {
  .search_title {
    text-align: center;
  }
  .select {
    display: inline-block;
    width: 50%;
    font-size: 14px;
    line-height: 30px;
    .select_title {
      display: inline-block;
      width: 25%;
    }
    .select_option {
      display: inline-block;
      width: 60%;
      font-size: 14px;
      padding: 2px 5px;
      border-color: #ddd;
      color: #999;
      outline: none;
    }
  }
}
</style>