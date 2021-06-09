/** 缴费 */

<template>
  <div class='pay'>
    <Header title='缴费'></Header>
    <div class="show-content">
      <Form
        :model="form"
        :label-width="80"
      >
        <FormItem label="办理人">
          {{$store.state.userInfo.user_name}}
        </FormItem>
        <FormItem label="班级">
          <Select
            v-model="form.class"
            placeholder="请选择学生所在班级"
            @on-change='selectClass'
            :style="{width: '33%'}"
          >
            <Option
              v-for="(item,index) in $meta.classes"
              :key='index'
              :value="item.value"
            >{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="姓名">
          <Select
            v-model="form.stu_id"
            placeholder="请选择学生姓名"
            :style="{width: '33%'}"
          >
            <Option
              v-for="(item,index) in stuList"
              :key='index'
              :value="item.stu_id+''"
            >{{item.stu_name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="时间">
          <DatePicker
            type="month"
            v-model="form.pay_time"
            placeholder="请选择缴费月份"
            style="width: 200px"
            @on-open-change="forbid"
          ></DatePicker>
        </FormItem>
        <FormItem label="学费">
          <i-switch
            size="large"
            v-model="form.tuition"
          >
            <span slot="open">已缴</span>
            <span slot="close">未缴</span>
          </i-switch>
        </FormItem>
        <FormItem label="书费">
          <i-switch
            size="large"
            v-model="form.book"
          >
            <span slot="open">已缴</span>
            <span slot="close">未缴</span>
          </i-switch>
        </FormItem>
        <FormItem label="舞蹈">
          <i-switch
            size="large"
            v-model="form.dance"
          >
            <span slot="open">已缴</span>
            <span slot="close">未缴</span>
          </i-switch>
        </FormItem>
        <FormItem label="口才">
          <i-switch
            size="large"
            v-model="form.eloquence"
          >
            <span slot="open">已缴</span>
            <span slot="close">未缴</span>
          </i-switch>
        </FormItem>
        <FormItem label="住宿费">
          <i-switch
            size="large"
            v-model="form.stay"
          >
            <span slot="open">已缴</span>
            <span slot="close">未缴</span>
          </i-switch>
        </FormItem>
        <Button
          type="primary"
          @click="submit"
        >保存</Button>
      </Form>
      <Modal
        title="提示"
        v-model="dialog"
        @on-ok='cancel("1")'
        @on-cancel='cancel("2")'
        class-name="vertical-center-modal"
      >
        <p>是否继续缴费</p>
      </Modal>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'Pay',
  components: {
    Header
  },
  data () {
    return {
      dialog: false,
      class: '',
      form: {
        stu_id: '',
        teacher_id: '',
        book: false,
        tuition: false,
        dance: false,
        eloquence: false,
        stay: false,
        pay_time: ""
      },
      stuList: [],
    }
  },
  mounted () {
    this.form.pay_time = (new Date()).toLocaleDateString().replace(/\//g, '-')
    this.$api.student.stuList().then(res => {
      this.stuList = res.stu_list
    })
  },
  methods: {
    submit () {
      let obj = {}
      for (let i in this.form) {
        obj[i] = this.form[i]
        if (obj[i] === true) {
          obj[i] = 1
        } else {
          obj[i] = obj[i] ? obj[i] : 0
        }
      }
      if (('' + obj.pay_time).indexOf('-') === -1) {
        obj.pay_time = this.form.pay_time.toLocaleDateString().replace(/\//g, '-')
      }
      this.$api.order.pay(obj).then(res => {
        // console.log(res)
        this.dialog = true
      })
    },
    forbid () {
      //禁止软键盘弹出
      document.activeElement.blur();
    },
    selectClass () {
      console.log(this.form.class)
      let obj = {
        class: this.form.class
      }
      this.$api.student.stuList(obj).then(res => {
        this.stuList = res.stu_list
      })
    },
    cancel (type) {
      this.form = {
        stu_id: '',
        teacher_id: this.$store.state.userInfo.user_id,
        book: false,
        tuition: false,
        dance: false,
        eloquence: false,
        stay: false,
        pay_time: ""
      }
      if (type === '1') {
        this.dialog = false
      } else {
        this.$router.push({
          name: 'StuList'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pay {
  .show-content {
    margin-top: 65px;
  }
}
</style>