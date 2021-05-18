/** 添加管理员 */
<template>
  <div class='userAdd'>
    <Header title='添加管理员'></Header>

    <div class="show-content">
      <Menu
        class='menu'
        width='50%'
        mode="horizontal"
        @on-select='selectMenu'
        :active-name="form.type"
      >
        <MenuItem name="1">
        <Icon type="ios-paper" />
        教师授权
        </MenuItem>
        <MenuItem name="2">
        <Icon type="ios-people" />
        普通用户授权
        </MenuItem>
      </Menu>
      <Form
        :model="form"
        class='form'
        :label-width="80"
      >
        <div v-if='form.type === "1"'>
          <FormItem label="姓名">
            <Select
              v-model="form.teacher_id"
              :label-in-value='true'
              placeholder="请选择教师姓名"
              @on-change='selectTeacher'
              :style="{width: '33%'}"
            >
              <Option
                v-for="(item,index) in tecList"
                :key='index'
                :value="item.teacher_id"
              >{{item.teacher_name}}</Option>
            </Select>
          </FormItem>
        </div>
        <div v-else>
          <FormItem label="姓名">
            <Input
              v-model="form.user_name"
              placeholder="请输入姓名"
            ></Input>
          </FormItem>
          <FormItem label="手机号">
            <Input
              v-model="form.user_phone"
              placeholder="请输入手机号"
            ></Input>
          </FormItem>
          <FormItem label="邮箱">
            <Input
              v-model="form.user_email"
              placeholder="请输入邮箱"
            ></Input>
          </FormItem>
        </div>
        <FormItem label="授权等级">
          <Select
            v-model="form.status"
            placeholder="请选择授权等级"
            :style="{width: '33%'}"
          >
            <Option
              v-for="(item,index) in $meta.empower"
              :key='index'
              :value="item.value+''"
            >{{item.name}}</Option>
          </Select>
        </FormItem>

        <FormItem label="授权登录">
          <i-switch
            size="large"
            v-model="form.empower"
          >
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
        <Button
          type="primary"
          @click="submit"
        >授权</Button>
      </Form>
      <Modal
        title="提示"
        v-model="dialog"
        @on-ok='cancel("1")'
        @on-cancel='cancel("2")'
        class-name="vertical-center-modal"
      >
        <p>{{message}},是否继续授权</p>
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
      showMenu: '1',
      message: '',
      class: '',
      form: {
        type: '1',
        teacher_id: '',
        user_name: '',
        user_phone: '',
        user_email: '',
        status: '',
        empower: false,
      },
      tecList: [],
    }
  },
  mounted () {
    this.$api.teacher.tecList().then(res => {
      this.tecList = res
    })
  },
  methods: {
    submit () {
      this.$api.user.userAdd(this.form).then(res => {
        console.log(res)
        if (res) {
          if (this.form.empower) {
            this.message = '授权成功'
          } else {
            this.message = "取消授权成功"
          }
          this.dialog = true;
        }
      })
    },
    selectTeacher (label) {
      this.form.user_name = label.label
    },
    selectMenu (value) {
      this.form.type = value
      this.form = {
        type: value,
        user_name: '',
        user_phone: '',
        user_email: '',
        status: '',
        empower: false,
      }
    },
    // 授权完成后，询问是否继续授权
    cancel (type) {
      this.form = {
        type: '1',
        teacher_id: '',
        user_name: '',
        user_phone: '',
        user_email: '',
        status: '',
        empower: false,
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
.userAdd {
  .show-content {
    margin-top: 45px;
    .form {
      margin-top: 20px;
    }
  }
}
</style>