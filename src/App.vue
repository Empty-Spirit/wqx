<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import api from './config/api'

export default defineComponent({
  name: 'App',
  setup() {
    let router = useRouter()
    let route = useRoute()
    let store = useStore()
    onBeforeMount(() => {
      if (
        !store.state.userInfo.user_name &&
        window.location.href.split('/#/')[1] != ''
      ) {
        api.user.userInfo().then((res) => {
          store.state.userInfo = res
        })
      }
    })
    // console.log(router.push, route.query, store);
    // console.log(process.env.NODE_ENV);
    return {}
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
