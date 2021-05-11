/** 修改学员信息 */
<template>
  <div class='stuEdit'>
    <Header title='修改学员信息'></Header>
    <Form
      :model="form"
      :label-width="80"
      class="show-content"
    >

      <div>
        <FormItem label="姓名">
          <Input
            v-model="form.name"
            placeholder="请输入姓名"
          ></Input>
        </FormItem>
        <FormItem label="出生日期">
          <DatePicker
            v-model="form.birth"
            type="date"
            placeholder="请选择出生日期"
          ></DatePicker>
        </FormItem>
        <FormItem label="班级">
          <Select
            v-model="form.class"
            placeholder="班级"
            :style="{width: '33%'}"
          >
            <Option value="1">大班</Option>
            <Option value="2">中班</Option>
            <Option value="3">小班</Option>
          </Select>
        </FormItem>
        <FormItem label="手机号">
          <Input
            v-model="form.phone"
            placeholder="请输入手机号"
          ></Input>
        </FormItem>
        <FormItem
          label="性别"
          :style="{textAlign: 'left'}"
        >
          <RadioGroup v-model="form.sex">
            <Radio label="male">男</Radio>
            <Radio label="female">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="状态"
          :style="{textAlign: 'left'}"
        >
          <RadioGroup v-model="form.status">
            <Radio label="male">在校</Radio>
            <Radio label="female">毕业</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="学费"
          :style="{textAlign: 'left'}"
        >
          <RadioGroup v-model="form.tuition">
            <Radio label="male">已缴</Radio>
            <Radio label="female">未缴</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="书费"
          :style="{textAlign: 'left'}"
        >
          <RadioGroup v-model="form.book">
            <Radio label="male">已缴</Radio>
            <Radio label="female">未缴</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="地址">
          <div class="address">
            <Select
              v-model="form.province"
              placeholder="省"
              :style="{width: '33%'}"
            >
              <Option value="beijing">省</Option>
              <Option value="shanghai">小学</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
            <Select
              v-model="form.city"
              placeholder="市"
              :style="{width: '33%'}"
            >
              <Option value="beijing">市</Option>
              <Option value="shanghai">小学</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
            <Select
              v-model="form.area"
              placeholder="区"
              :style="{width: '33%'}"
            >
              <Option value="beijing">区</Option>
              <Option value="shanghai">小学</Option>
              <Option value="shenzhen">Sydney</Option>
            </Select>
          </div>
          <Input
            v-model="form.address"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入详细地址"
          ></Input>
        </FormItem>
      </div>
      <Button type="primary">保存</Button>
    </Form>
  </div>
</template>
<script>
import Header from '@/components/Header'
export default {
  name: 'StuEdit',
  components: {
    Header
  },
  mounted () {
    let params = this.$router.history.current.params
    let data = params.data
    if (data === 'student') {
      this.student = true
      if (params.class) {
        this.form.student.class = params.class
      }
      if (params.subject) {
        this.form.student.subject = params.subject
      }
    } else {
      this.student = false
    }
  },
  data () {
    return {
      student: false,
      form: {
        name: '',
        birth: '',
        age: '',
        class: '',
        phone: '',
        sex: '',
        status: '',
        tuition: '',
        book: '',
        province: '',
        city: '',
        area: '',
        address: '',
      }
    }
  },
  methods: {}
}
</script>
<style scoped lang='scss'>
.stuEdit {
  .show-content {
    margin-top: 65px;
  }
}
</style>
