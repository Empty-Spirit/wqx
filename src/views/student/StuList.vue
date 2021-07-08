/** 学员列表 */
<template>
  <div class="stuList">
    <div class="stu_header">
      <search :message="message" @searchMessage="search"></search>
      <van-row class="header_title">
        <van-col align="center" span="8">姓名</van-col>
        <van-col align="center" span="8">班级</van-col>
        <van-col align="center" span="8">家长姓名 </van-col>
      </van-row>
    </div>

    <van-swipe-cell v-for="(item, index) in stuDataList" :key="index">
      <van-cell :border="true">
        <van-row>
          <van-col align="center" span="8">{{ item.stu_name }}</van-col>
          <van-col align="center" span="8">{{ item.class }}</van-col>
          <van-col align="center" span="8">{{ item.parent }} </van-col>
        </van-row>
      </van-cell>
      <template #right>
        <van-button
          square
          type="primary"
          @click="show(item.stu_id)"
          text="查看"
        />
        <van-button
          square
          class="update"
          @click="update(item.stu_id)"
          text="编辑"
        />
        <van-button
          square
          type="danger"
          @click="stuDel(item.stu_id)"
          text="删除"
        />
      </template>
    </van-swipe-cell>
    <van-popup
      round
      closeable
      position="bottom"
      v-model:show="showMessage"
      :style="{ height: '70%' }"
    >
      <div class="pop_title">
        <van-icon name="info" color="#1989fa" />本月学生详情
      </div>
      <div class="show_content" v-for="(item, index) in showData" :key="index">
        <span class="content_value">{{ item.value }}</span>
        <span class="content_name">{{ item.name }}</span>
      </div>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue'
import api from '../../config/api'
import { meta } from '../../filters/index'
import { Toast, Notify } from 'vant'
import area from './../utils/area'
import Search from './../../components/Search.vue'
import { stuMessage } from './../utils/searchMessage'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    Search,
  },
  setup() {
    let router = useRouter()

    let showMessage = ref(false)
    let message = stuMessage
    let stuList = ref([
      {
        type: 'selection',
        width: 60,
        align: 'center',
      },
      {
        title: '姓名',
        slot: 'stu_name',
      },
      {
        title: '班级',
        key: 'class',
      },
      {
        title: '操作',
        slot: 'action',
        width: 150,
        align: 'center',
      },
    ])

    let showData = ref([{}])
    let stuDataList = ref([])

    onBeforeMount(() => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      getStuList()
    })

    // 获取学生列表
    let getStuList = () => {
      api.student.stuList().then((res: any) => {
        if (res) {
          stuDataList.value = res.stu_list.map((item: any) => {
            item.class = meta.changeValue(meta.classes, item.class)
            return item
          })
          Toast.clear()
        }
      })
    }

    // 查看
    let show = (id: any) => {
      showMessage.value = true
      showData.value = []
      let date = ref(
        new Date().getFullYear() +
          '-' +
          (new Date().getMonth() + 1 > 9
            ? new Date().getMonth() + 1
            : '0' + (new Date().getMonth() + 1)) +
          '-01'
      )
      let obj = ref({
        stu_id: id,
        pay_time: date,
      })
      api.student.stuList(obj.value).then((res: any) => {
        let data = res.stu_list[0]
        let province = meta.changeAddress(area.province_list, data.province)
        let city = meta.changeAddress(area.city_list, data.city)
        let newArea = meta.changeAddress(area.county_list, data.area)
        data.address =
          (province ? province : '') + city + newArea + data.address
        for (let i in data) {
          let obj: {
            value: any
            name: any
          } = {
            name: '',
            value: '',
          }
          if (meta.changeStuValue(meta.stuMessage, i)) {
            obj = {
              value: meta.changeStuValue(meta.stuMessage, i),
              name: data[i],
            }
            switch (obj.value) {
              case '班级':
                obj.name = meta.changeValue(meta.classes, obj.name)
                break
              case '性别':
                obj.name = meta.changeValue(meta.gender, obj.name)
                break
              case '学生状态':
                obj.name = meta.changeValue(meta.stu_status, obj.name)
                break
              case '住宿':
                obj.name = getStuUp(meta.pay, data.stay, obj.name)
                break
              case '口才':
                obj.name = getStuUp(meta.pay, data.eloquence, obj.name)
                break
              case '舞蹈':
                obj.name = getStuUp(meta.pay, data.dance, obj.name)
                break
              case '学费':
                obj.name = meta.changeValue(meta.pay, obj.name)
                break
              case '坐车':
                obj.name = data.car == 1 ? '已报名' : '未报名'
                break
            }
            showData.value.push(obj)
          }
        }
      })
    }

    // 先判断是否报名，如果报名了，在判断是否缴费
    let getStuUp = (data: any, type: any, name: any) => {
      let value
      if (type == 1) {
        value = meta.changeValue(data, name)
      } else {
        value = meta.changeValue(meta.signUp, type)
      }
      return value
    }

    // 关闭弹窗
    let close = () => {
      showMessage.value = false
    }

    // 查询学员
    let search = (form: any) => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      let obj = {}
      for (let i in form) {
        let a = {}
        if (form[i].value != 100 && form[i].value) {
          a[form[i].name] = form[i].value
          Object.assign(obj, a)
        }
      }
      api.student.stuList(obj).then((res: any) => {
        if (res.stu_list) {
          stuDataList.value = res.stu_list.map((item: any) => {
            item.class = meta.changeValue(meta.classes, item.class)
            return item
          })
        } else {
          Notify({
            type: 'warning',
            message: '暂无数据,请检查搜索条件',
          })
        }
        Toast.clear()
      })
    }

    // 修改学生信息
    let update = (id: number) => {
      router.push({
        name: 'StuAdd',
        query: {
          stu_id: id,
        },
      })
    }

    // 删除学生
    let stuDel = (id: number) => {
      let obj = {
        stu_id: id,
      }
      api.student.stuDel(obj).then((res) => {
        if (res) {
          Toast.success('删除成功')
          getStuList()
        }
      })
    }
    return {
      showMessage,
      stuList,
      message,
      showData,
      stuDataList,
      update,
      show,
      close,
      stuDel,
      search,
    }
  },
})
</script>

<style lang="less" scoped>
.stuList {
  width: 100%;
  overflow: hidden;
  margin-bottom: 70px;
  margin-top: 80px;
  .stu_header {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 2;
  }
  .header_title {
    background: #eee;
    padding: 0 16px;
    height: 40px;
    line-height: 40px;
  }
  .update {
    background: rgb(19, 235, 48);
  }
  .pop_title {
    // text-align: center;
    margin-left: 30px;
    line-height: 40px;
  }
  .show_content {
    width: 100%;
    text-align: left;
    // margin: 5px;
    margin-bottom: 8px;
    line-height: 30px;
    border-bottom: 1px solid rgb(252, 243, 243);
    .content_value {
      display: inline-block;
      width: 100px;
      vertical-align: top;
      margin-left: 30px;
    }
    .content_name {
      display: inline-block;
      width: 200px;
    }
  }
}
</style>
