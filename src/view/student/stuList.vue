/** 学生列表 */
<template>
  <div class='stuList'>
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

    <van-popup
      round
      closeable
      v-model="showMessage"
      :style="{ height: '70%' ,width:'70%'}"
    >
      <div class='pop_title'>
        <van-icon
          name="info"
          color="#1989fa"
        />本月学生详情
      </div>
      <div
        class='show_content'
        v-for='(item,index) in showData'
        :key='index'
      >
        <span class="content_value">{{item.value}}</span>
        <span class='content_name'>{{item.name}}</span>
      </div>
    </van-popup>
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
      showMessage: false,
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
      ],
      showData: []
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
      this.showData = []
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let obj = {
        stu_id: this.data[index].stu_id,
        pay_time: year + '-' + month + '-1'
      }
      this.$api.student.stuList(obj).then(res => {
        let data = {}
        data = res.stu_list[0]
        let province = this.$meta.changeAddress(area.province_list, this.data[index].province)
        let city = this.$meta.changeAddress(area.city_list, this.data[index].city)
        let newArea = this.$meta.changeAddress(area.county_list, this.data[index].area)
        data.address = province + city + newArea + data.address
        for (let i in data) {
          let obj = {}
          if (this.$meta.changeStuValue(this.$meta.stuMessage, i)) {
            obj = {
              value: this.$meta.changeStuValue(this.$meta.stuMessage, i),
              name: data[i]
            }
            switch (obj.value) {
              case '班级':
                obj.name = this.$meta.changeValue(this.$meta.classes, obj.name)
                break;
              case '性别':
                obj.name = this.$meta.changeValue(this.$meta.gender, obj.name)
                break;
              case '学生状态':
                obj.name = this.$meta.changeValue(this.$meta.stu_status, obj.name)
                break;
              case '住宿':
                obj.name = this.$meta.changeValue(this.$meta.pay, obj.name)
                break;
              case '口才':
                obj.name = this.$meta.changeValue(this.$meta.pay, obj.name)
                break;
              case '舞蹈':
                obj.name = this.$meta.changeValue(this.$meta.pay, obj.name)
                break;
              case '学费':
                obj.name = this.$meta.changeValue(this.$meta.pay, obj.name)
                break;
            }
            this.showData.push(obj)
          }
        }
        this.showMessage = true;
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

<style lang='scss' scoped>
@import '../../styles/variable';
.stuList {
  .van-popup {
    padding: 10px;
    .pop_title {
      width: 100%;
      text-align: left;
      margin-bottom: 10px;
      margin-left: 10px;
    }
    .show_content {
      width: 100%;
      text-align: left;
      // margin: 5px;
      margin-bottom: 8px;
      border-bottom: 1px solid rgb(252, 243, 243);
      .content_value {
        display: inline-block;
        width: toRem(100);
        vertical-align: top;
      }
      .content_name {
        display: inline-block;
        width: toRem(250);
      }
    }
  }
}
</style>