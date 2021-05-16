<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import VConsole from 'vconsole'
if (process.env.NODE_ENV === 'development') {
  new VConsole()
}
export default {
  name: 'App',
  mounted () {
    console.log(`${process.env.VUE_APP_URL}`)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  text-align: center;
  width: 100%;
  height: 100%;
  color: #2c3e50;
}
.footer {
  height: 100px;
}
</style>
