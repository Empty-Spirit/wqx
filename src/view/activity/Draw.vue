/**抽奖页面*/
<template>
  <div class="draw">
    <div
      class="content"
      ref='content'
    >
      <span
        class='message'
        v-for="(item,index) in message"
        :key="index"
      >
        {{item.label}}
      </span>
    </div>
    <Button
      type="success"
      @click='go'
    >抽奖</Button>
    <Button
      type="success"
      @click='go'
    >停止</Button>
  </div>
</template>

<script>
export default {
  name: 'Draw',
  data () {
    return {
      message: [
        {
          value: '1',
          label: '谢谢惠顾'
        }, {
          value: '2',
          label: '谢谢惠顾'
        }, {
          value: '3',
          label: '谢谢惠顾'
        }, {
          value: '4',
          label: '谢谢惠顾'
        }, {
          value: '5',
          label: '谢谢惠顾'
        }, {
          value: '6',
          label: '谢谢惠顾'
        }, {
          value: '7',
          label: '谢谢惠顾'
        }, {
          value: '8',
          label: '谢谢惠顾'
        }, {
          value: '9',
          label: '谢谢惠顾'
        }
      ],
      time: [1000, 500, 100, 500, 1000],
      test: [0, 1, 2, 5, 8, 7, 6, 3],
      intervalTime: 1000,
      index: -1
    }
  },
  methods: {
    go () {
      this.index = -1;
      this.getInterval('start')
      this.changeInterval();
    },
    changeInterval () {
      let that = this;
      let key = 0;
      var b = setInterval(() => {
        key++;
        that.intervalTime = that.time[key]
        that.getInterval('clear')
        console.log(that.intervalTime)
        if (key === 4) {
          clearInterval(b)
        }
      }, 4000)
    },
    getInterval (status) {
      console.log(status)
      let a = function () { }
      a = setInterval(() => {
        this.index++;
        if (this.index === 0) {
          document.getElementsByClassName('message')[3].classList.remove('active')
        } else {
          document.getElementsByClassName('message')[this.test[this.index - 1]].classList.remove('active')
        }
        document.getElementsByClassName('message')[this.test[this.index]].classList.add('active')
        console.log(this.intervalTime, 'a')
        this.index = this.index === 7 ? -1 : this.index
      }, this.intervalTime)

      setTimeout(() => {
        clearInterval(a)
      }, 4000)

    }
  }
}
</script>

<style lang='scss' scoped>
.draw {
  position: relative;
  .content {
    // position: absolute;
    width: 300px;
    height: 300px;
    border: 1px solid #ddd;
    .message {
      display: inline-block;
      width: 90px;
      height: 90px;
      margin: 3px;
      background: #ddd;
    }
    .active {
      background: blue;
    }
  }
}
</style> 