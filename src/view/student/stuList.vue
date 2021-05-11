/** 学生列表 */
<template>
  <div>
    <search
      :message='message'
      @searchMessage="search"
    ></search>
    <Table
      border
      ref="selection"
      :columns="stuList"
      :data="data"
    >
      <template
        slot-scope="{ row }"
        slot="name"
      >
        <strong>{{ row.name }}</strong>
      </template>
      <template
        slot-scope="{index }"
        slot="action"
      >
        <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="show(index)"
        >查看</Button>
        <Button
          type="success"
          size="small"
          @click="edit(index)"
        >编辑</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
export default {
  name: 'StuList',
  components: {
    Search
  },
  data () {
    return {
      stuList: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        }, {
          title: '姓名',
          slot: 'name'
        },
        {
          title: '班级',
          key: 'class'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ],
      message: [],
      data: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          phone: '12131231234',
          status: '在校',
          book: '已缴',
          tuition: '已缴',
          class: '大班',
          parent: '',
          startTime: '',
          endTime: ''
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          phone: '12131231234',
          status: '毕业',
          book: '未缴',
          tuition: '未缴',
          class: '大班',
          parent: '',
          startTime: '',
          endTime: ''
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          phone: '12131231234',
          status: '在校',
          book: '已缴',
          tuition: '已缴',
          class: '中班',
          parent: '',
          startTime: '',
          endTime: ''
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          phone: '12131231234',
          status: '在校',
          book: '未缴',
          tuition: '未缴',
          class: '小班',
          parent: '',
          startTime: '',
          endTime: ''
        }
      ]
    }
  },
  mounted () {
    this.message = this.$searchMessage.stuMessage
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: '本月学生详情',
        content: `姓名：${this.data[index].name}<br>年龄：${this.data[index].age}<br>班级：${this.data[index].class}<br>电话：${this.data[index].phone}<br>状态：${this.data[index].status}<br>学费：${this.data[index].book}<br>书费：${this.data[index].tuition}<br>入学：${this.data[index].startTime}<br>毕业：${this.data[index].endTime}<br>地址：${this.data[index].address}`
      })
    },
    edit (index) {
      this.$router.push({
        name: 'StuEdit'
      })
      // this.data6.splice(index, 1);
    },
    search () { }
  }
}
</script>

<style>
</style>