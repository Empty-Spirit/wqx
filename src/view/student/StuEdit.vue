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
            v-model="form.stu_name"
            placeholder="请输入姓名"
          ></Input>
        </FormItem>
        <FormItem label="父母姓名">
          <Input
            v-model="form.parent"
            placeholder="输入一个即可"
          ></Input>
        </FormItem>
        <FormItem label="出生日期">
          <DatePicker
            v-model="form.birth"
            type="date"
            @on-change='changeDate'
            :options="date"
            @on-open-change="forbid"
            placeholder="请选择出生日期"
          ></DatePicker>
        </FormItem>
        <FormItem label="班级">
          <Select
            v-model="form.class"
            placeholder="班级"
            :style="{width: '33%'}"
          >
            <Option
              v-for="(item,index) in $meta.classes"
              :key='index'
              :value="item.value"
            >{{item.name}}</Option>
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
            <Radio
              v-for="(item,index) in $meta.gender"
              :key="index"
              :label='item.value'
            >{{item.name}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="状态"
          :style="{textAlign: 'left'}"
        >
          <RadioGroup v-model="form.status">
            <Radio
              v-for="(item,index) in $meta.stu_status"
              :key="index"
              :label='item.value'
            >{{item.name}}</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="地址">
          <div class="address">
            <Select
              v-model="form.province"
              placeholder="省"
              @on-select='select'
              :style="{width: '33%'}"
            >
              <Option value="beijing">省</Option>
              <Option
                v-for="(item,index) in newArea.province"
                :key="index"
                :value="item.code"
              >{{item.name}}</Option>
            </Select>
            <Select
              v-model="form.city"
              placeholder="市"
              :style="{width: '33%'}"
              @on-select='select'
            >
              <Option value="beijing">市</Option>
              <Option
                v-for="(item,index) in newArea.city"
                :key="index"
                :value="item.code"
              >{{item.name}}</Option>
            </Select>
            <Select
              v-model="form.area"
              placeholder="区"
              :style="{width: '33%'}"
            >
              <Option value="beijing">区</Option>
              <Option
                v-for="(item,index) in newArea.area"
                :key="index"
                :value="item.code"
              >{{item.name}}</Option>
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
      <Button
        type="success"
        @click='submit'
      >保存</Button>
    </Form>
    <Modal
      title="提示"
      v-model="dialog"
      @on-ok='cancel("1")'
      @on-cancel='cancel("2")'
      class-name="vertical-center-modal"
    >
      <p>是否继续添加学员</p>
    </Modal>
  </div>
</template>
<script>
import Header from '@/components/Header'
import area from '@/utils/area'
export default {
  name: 'StuEdit',
  components: {
    Header
  },
  mounted () {
    this.selectArea();
  },
  data () {
    return {
      student: false,
      dialog: false,//是否继续添加
      newArea: {
        province: [],
        city: [],
        area: []
      },
      date: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now();
        }
      },
      form: {
        stu_name: '',
        parent: '',
        birth: '',
        age: '',
        class: 3,
        phone: '',
        sex: '',
        status: 1,
        province: '150000',
        city: '150500',
        area: '150502',
        address: '',
      },
    }
  },
  methods: {
    // 修改日期显示格式
    changeDate () {
      this.form.birth = this.form.birth.toLocaleDateString().replace(/\//g, '-')
    },
    //当修改选中的地址时，其他可选项对应改变
    select (type) {
      if (type.value.slice(3, 4) === '0') {
        this.newArea.city = this.$filter.changeArea(area.city_list, type.value, 3)
        this.newArea.area = []
      } else {
        this.newArea.area = this.$filter.changeArea(area.county_list, type.value, 4)
      }
    },
    // 地址默认选中内蒙古通辽市科尔沁区 
    selectArea () {
      this.newArea.province = this.$filter.changeArea(area.province_list, '')
      this.newArea.city = this.$filter.changeArea(area.city_list, '150000', 3)
      this.newArea.area = this.$filter.changeArea(area.county_list, '150500', 4)
    },
    // 通过生日和当前时间获取到年龄
    getAge (value) {
      var date = new Date();
      let year = date.toLocaleDateString().replace(/\//g, '-').split('-')[0]
      console.log(year)
      let age = year - value.split('-')[0] + 1
      return age
    },
    forbid () {
      //禁止软键盘弹出
      document.activeElement.blur();
    },
    // 提交
    submit () {
      this.getAge(this.form.birth)
      if (this.form.birth) {
        this.form.age = this.getAge(this.form.birth)
      }
      let a = true
      for (let obj in this.form) {
        if (this.form[obj] === '') {
          a = false
          this.$alert('alert', 'error', '请将学员信息填写完整')
          break
        }
      }
      if (a) {
        this.$api.student.stuAdd(this.form).then(res => {
          if (res) {
            this.dialog = true
          }
        })
      }
    },
    cancel (type) {
      this.form = {
        stu_name: '',
        parent: '',
        birth: '',
        age: '',
        class: '3',
        phone: '',
        sex: '',
        status: '1',
        province: '150000',
        city: '150500',
        area: '150502',
        address: '',
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
<style scoped lang='scss'>
.stuEdit {
  .show-content {
    margin-top: 65px;
  }
}
</style>
