<template>
  <div class='pay'>
    <Header title='缴费'></Header>
    <div class="show-content">
      <Form
        :model="form"
        :label-width="80"
      >
        <FormItem label="办理人">
          张三
        </FormItem>
        <FormItem label="班级">
          <Select
            v-model="form.class"
            placeholder="请选择学生所在班级"
            :style="{width: '33%'}"
          >
            <Option
              v-for="(item,index) in classList"
              :key='index'
              :value="item.value"
            >{{item.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="姓名">
          <Select
            v-model="form.name"
            placeholder="请选择学生姓名"
            :style="{width: '33%'}"
          >
            <Option
              v-for="(item,index) in stuList"
              :key='index'
              :value="item.value"
            >{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="时间">
          <DatePicker
            type="month"
            v-model="form.time"
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
        <FormItem label="车费">
          <i-switch
            size="large"
            v-model="form.car"
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
      form: {
        class: '',
        name: '',
        book: false,
        tuition: false,
        car: false,
        time: ""
      },
      stuList: [
        {
          value: '1',
          name: '张三'
        }
      ],
      classList: [
        {
          value: '1',
          label: '大班'
        },
        {
          value: '2',
          label: "中班"
        },
        {
          value: '3',
          label: '小班'
        }
      ]
    }
  },
  methods: {
    submit () {
      console.log(this.form)
    },
    forbid () {
      //禁止软键盘弹出
      document.activeElement.blur();
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