<template>
  <div class='home'>
    <div
      v-for='(item,index) in message'
      :key='index'
      class='module'
      @click='go(item.src)'
    >
      <img :src="item.img" />
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      message: [
        {
          name: '缴费',
          src: 'Pay',
          img: require('../../assets/home/rmb.png')
        }, {
          name: '添加学员',
          src: 'StuEdit',
          img: require('../../assets/home/add-account.png')
        }
      ]
    }
  },
  methods: {
    go (src) {
      this.$router.push({
        name: src
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  text-align: left;
  .module {
    display: inline-block;
    width: 100px;
    height: 100px;
    text-align: center;
    img {
      width: 30px;
      height: 30px;
    }
    span {
      display: inline-block;
      width: 100px;
    }
  }
}
</style>