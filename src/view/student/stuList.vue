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
        slot="stu_name"
      >
        <strong>{{ row.stu_name }}</strong>
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
import area from '@/utils/area'
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
          slot: 'stu_name'
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
          stu_name: 'John Brown',
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
        }
      ]
    }
  },
  mounted () {
    this.message = this.$searchMessage.stuMessage
    this.$api.student.stuList().then(res => {
      // this.$alert('alert', 'success', '成功')
      // this.$alert('tip', 'success', '成功')
      this.data = res.stu_list;
      this.data.map(item => {
        item.class = this.$meta.changeValue(this.$meta.classes, item.class)
      })
      console.log(this.data)
    })
  },
  methods: {
    show (index) {
      let province = this.$meta.changeAddress(area.province_list, this.data[index].province)
      let city = this.$meta.changeAddress(area.city_list, this.data[index].city)
      let newArea = this.$meta.changeAddress(area.county_list, this.data[index].area)
      this.$Modal.info({
        title: '本月学生详情',
        content: `姓名：${this.data[index].stu_name}<br>年龄：${this.data[index].age}<br>班级：${this.data[index].class}<br>电话：${this.data[index].phone}<br>状态：${this.$meta.changeValue(this.$meta.stu_status, this.data[index].status)}<br>学费：${this.data[index].book}<br>书费：${this.data[index].tuition}<br>入学：${this.data[index].start_time}<br>毕业：${this.data[index].endTime ? this.data[index].endTime : ''}<br>地址：${province + city + newArea + this.data[index].address}`
      })
    },
    edit (index) {
      this.$router.push({
        name: 'StuEdit'
      })
    },
    search (form) {
      let obj = {}
      for (let i in form) {
        let a = {}
        if (form[i].value > 0 || form[i].value) {
          a[form[i].name] = form[i].value
          Object.assign(obj, a)
        }
      }
      this.$api.student.stuList(obj).then(res => {
        this.data = res.stu_list;
        this.data.map(item => {
          item.class = this.$meta.changeValue(this.$meta.classes, item.class)
        })
      })
    }
  }
}
</script>

<style>
</style>