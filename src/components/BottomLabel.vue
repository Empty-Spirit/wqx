<template>
  <div class="bottom_label">
    <div class="footer">
      <div
        v-for="(item, index) in label"
        class="label_name"
        :key="index"
        @click="go(item.src)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    let router = useRouter();
    let store = useStore();

    let header = ref(false);
    let status = ref(1);
    let label = ref(store.state.mainTab);

    let go = (src: string) => {
      router.push({
        name: src,
      });
    };

    return {
      header,
      status,
      label,
      go,
    };
  },
});
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
