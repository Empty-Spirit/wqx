<template>
  <div class="order_add">
    <van-nav-bar title="缴费" left-text="返回" left-arrow @click-left="goOut" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
          v-model="userInfo.user_name"
          name="办理人"
          label="办理人"
          :disabled="true"
          placeholder=""
        />

        <van-field
          readonly
          clickable
          name="picker"
          v-model="form.class"
          label="班级"
          placeholder="请选择所在班级"
          @click="showOption('classes')"
        />
        <van-field
          readonly
          clickable
          name="picker"
          v-model="form.stu_name"
          label="姓名"
          placeholder="请选择学生姓名"
          @click="showOption('nameList')"
          :rules="[{ required: true, message: '请选择缴费学员' }]"
        />

        <van-field
          readonly
          clickable
          label="缴费月份"
          v-model="form.pay_time"
          @click="show.showPicker = !show.update"
        />
        <van-popup v-model:show="show.showPicker" position="bottom">
          <van-datetime-picker
            type="year-month"
            title="选择缴费月份"
            v-model="showTime"
            @confirm="confirmBirth"
            :formatter="formatter"
            :min-date="dateList.minDate"
            :max-date="dateList.maxDate"
          />
        </van-popup>

        <van-field name="switch" label="学费">
          <template #input>
            <van-switch v-model="form.tuition" size="20" />
          </template>
        </van-field>

        <van-field name="switch" label="书费">
          <template #input>
            <van-switch v-model="form.book" size="20" />
          </template>
        </van-field>

        <van-field name="switch" label="舞蹈">
          <template #input>
            <van-switch v-model="form.dance" size="20" />
          </template>
        </van-field>

        <van-field name="switch" label="口才">
          <template #input>
            <van-switch v-model="form.eloquence" size="20" />
          </template>
        </van-field>

        <van-field name="switch" label="住宿费">
          <template #input>
            <van-switch v-model="form.stay" size="20" />
          </template>
        </van-field>

        <van-popup v-model:show="show.showClass" position="bottom">
          <van-picker
            show-toolbar
            :default-index="metas.showOption.index"
            :columns="metas.showOption.data"
            @confirm="confirmClass"
            @cancel="show.showClass = false"
          />
        </van-popup>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import api from './../../config/api'
import meta from '../../filters/meta'
import _ from 'lodash'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
    const userInfo = store.state.userInfo

    onBeforeMount(() => {
      getStuList()
    })

    // 获取当前时间
    let date = new Date().toLocaleDateString().replace(/\//g, '-').split('-')
    // 组装成自己需要的显示格式
    let nowMonth =
      date[0] + '-' + (Number(date[1]) > 9 ? date[1] : '0' + date[1])

    // 日期区间
    let dateList = reactive({
      minDate: new Date(
        Number(date[0]) -
          2 +
          '-' +
          (Number(date[1]) > 9 ? date[1] : '0' + date[1])
      ),
      maxDate: new Date(
        Number(date[0]) +
          1 +
          '-' +
          (Number(date[1]) > 9 ? date[1] : '0' + date[1])
      ),
    })

    // 下拉打开时默认选中
    let showTime = ref(new Date(nowMonth))
    let form = reactive({
      stu_id: '',
      class: '',
      stu_name: '',
      pay_time: nowMonth,
      tuition: false,
      book: false,
      dance: false,
      eloquence: false,
      stay: false,
    })

    // 对学员信息做存储
    let stuList: never[] = []

    // 获取学员列表
    let getStuList = () => {
      metas.nameList = {
        index: '',
        data: [],
      }
      let obj = form.class
        ? { class: meta.changeValue(meta.classes, form.class) }
        : {}
      api.student.stuList({ ...obj }).then((res: any) => {
        stuList = res.stu_list
        res.stu_list.map((item: { stu_name: any }) => {
          metas.nameList.data.push(item.stu_name)
        })
      })
    }

    // 弹窗显示控制
    let show = reactive({
      // 班级选择弹窗
      showClass: false,
      // 当前弹窗的类别
      active: '',
      // 显示日期弹窗
      showPicker: false,
    })

    // 弹窗显示内容
    let metas = reactive({
      showOption: {},
      classes: {
        index: '',
        data: ['大班', '中班', '小班'],
      },
      nameList: {
        index: '',
        data: [],
      },
    })

    // 控制显示的下拉内容
    let showOption = (val: string) => {
      show.showClass = true
      switch (val) {
        case 'classes':
          metas.showOption = metas.classes
          show.active = 'classes'
          break
        case 'nameList':
          metas.showOption = metas.nameList
          show.active = 'nameList'
          break
      }
    }

    // 选中日期
    let confirmBirth = (value: any) => {
      let date = value.toLocaleDateString().replace(/\//g, '-').split('-')
      form.pay_time = date[0] + '-' + (date[1] > 9 ? date[1] : '0' + date[1])
      show.showPicker = false
      console.log(form.pay_time)
    }

    // 日期格式
    let formatter = (type: any, val: any) => {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      }
      return val
    }

    // 弹窗选中触发
    let confirmClass = (value: any, index: any) => {
      switch (show.active) {
        case 'classes':
          form.class = value
          metas.classes.index = index
          getStuList()
          break
        case 'nameList':
          form.stu_name = value
          metas.nameList.index = index
          form.stu_id = stuList[index].stu_id
          break
      }
      show.showClass = false
    }

    // 提交
    let onSubmit = () => {
      let obj = form
      obj = _.mapValues(form, (value: any, key: any) => {
        if (value === true) {
          value = 1
        } else if (value === false) {
          value = 0
        }
        return value
      })

      api.order.pay(obj).then((res) => {
        console.log(res)
      })
    }

    // 返回上一页
    let goOut = () => {
      router.back()
    }
    return {
      userInfo,
      form,
      show,
      metas,
      dateList,
      showTime,
      goOut,
      onSubmit,
      confirmClass,
      showOption,
      confirmBirth,
      formatter,
    }
  },
})
</script>

<style lang="less" scoped>
</style>