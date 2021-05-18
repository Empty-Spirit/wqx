/** 角色列表 */
<template>
  <div class='userList'>
    <Table
      border
      ref="selection"
      :columns="columns"
      :data="userList"
    >
      <template
        slot-scope="{ row }"
        slot="user_name"
      >
        <strong>{{ row.user_name }}</strong>
      </template>
      <template
        slot-scope="{ row }"
        slot="user_status"
      >
        <strong>{{ $meta.changeValue($meta.empower,row.user_status) }}</strong>
      </template>
      <template
        slot-scope="{index }"
        slot="action"
      >
        <Button
          type="success"
          size="small"
          @click="del(index)"
        >重置密码</Button>
        <Button
          type="success"
          size="small"
          @click="del(index)"
        >取消授权</Button>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  name: 'StuList',
  data () {
    return {
      columns: [
        // {
        //   type: 'selection',
        //   width: 60,
        //   align: 'center'
        // }, 
        {
          title: '姓名',
          slot: 'user_name'
        },
        {
          title: '授权',
          slot: 'user_status'
        },
        {
          title: '操作',
          slot: 'action',
          width: 200,
          align: 'center'
        }
      ],
      userList: []
    }
  },
  mounted () {
    // console.log(this.$meta.empower())
    this.getUserList()

  },
  methods: {
    del (index) {
      console.log(index)
      let obj = {
        type: '1',
        user_name: this.userList[0].user_name,
        empower: false,
      }
      this.$api.user.userAdd(obj).then(res => {
        this.$alert('tip', 'success', '取消授权成功')
        this.getUserList()
      })
    },
    getUserList () {
      this.$api.user.userList().then(res => {
        this.userList = res
      })
    }
  }
}
</script>

<style>
</style>