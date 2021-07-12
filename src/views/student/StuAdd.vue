/** 新增学员修改学员页面 */
<template>
  <div class="addstu">
    <van-nav-bar
      title="新增/编辑学员"
      left-text="返回"
      left-arrow
      @click-left="goOut"
    />
    <div class="StuAdd">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="form.stu_name"
            name="姓名"
            label="姓名"
            :disabled="show.update"
            placeholder="请输入学员姓名"
            :rules="[{ required: true, message: '请填写学员姓名' }]"
          />
          <van-field
            v-model="form.parent"
            label="家长姓名"
            :disabled="show.update"
            placeholder="输入一个即可"
            :rules="[{ required: true, message: '请填写家长' }]"
          />
          <van-field
            v-model="form.phone"
            label="手机号"
            :disabled="show.update"
            placeholder="请输入家长手机号"
            maxlength="11"
            :rules="[{ pattern, message: '手机号格式不正确' }]"
          />
          <van-field
            readonly
            clickable
            name="birth"
            v-model="form.birth"
            label="出生日期"
            :disabled="show.update"
            placeholder="请选择出生日期"
            @click="show.showPicker = !show.update"
            :rules="[{ required: true, message: '请选择出生日期' }]"
          />
          <van-popup v-model:show="show.showPicker" position="bottom">
            <van-datetime-picker
              type="date"
              v-model="showTime"
              @confirm="confirmBirth"
              @cancel="show.showPicker = false"
              :min-date="dateList.minDate"
              :max-date="dateList.maxDate"
            />
          </van-popup>

          <van-field
            readonly
            clickable
            name="picker"
            v-model="form.class"
            label="班级"
            :disabled="show.update"
            placeholder="请选择所在班级"
            @click="show.showClass = !show.update"
            :rules="[{ required: true, message: '请选择班级' }]"
          />
          <van-popup v-model:show="show.showClass" position="bottom">
            <van-picker
              show-toolbar
              :columns="metas.classes"
              @confirm="confirmClass"
              @cancel="show.showClass = false"
            />
          </van-popup>

          <van-field
            name="radio"
            label="性别"
            :disabled="show.update"
            :rules="[{ required: true }]"
          >
            <template #input>
              <van-radio-group
                v-model="form.sex"
                :disabled="show.update"
                direction="horizontal"
              >
                <van-radio
                  v-for="(item, index) in metas.gender"
                  :key="index"
                  :name="item.value"
                  >{{ item.name }}</van-radio
                >
              </van-radio-group>
            </template>
          </van-field>

          <van-field
            name="radio"
            label="状态"
            :disabled="show.update"
            :rules="[{ required: true }]"
          >
            <template #input>
              <van-radio-group
                v-model="form.status"
                :disabled="show.update"
                direction="horizontal"
              >
                <van-radio
                  v-for="(item, index) in metas.stu_status"
                  :key="index"
                  :name="item.value"
                  >{{ item.name }}</van-radio
                >
              </van-radio-group>
            </template>
          </van-field>

          <van-field
            name="radio"
            label="舞蹈班"
            :disabled="show.update"
            :rules="[{ required: true }]"
          >
            <template #input>
              <van-radio-group
                v-model="form.dance"
                :disabled="show.update"
                direction="horizontal"
              >
                <van-radio
                  v-for="(item, index) in metas.status_message"
                  :key="index"
                  :name="item.value"
                  >{{ item.name }}</van-radio
                >
              </van-radio-group>
            </template>
          </van-field>

          <van-field
            name="radio"
            label="口才班"
            :disabled="show.update"
            :rules="[{ required: true }]"
          >
            <template #input>
              <van-radio-group
                v-model="form.eloquence"
                :disabled="show.update"
                direction="horizontal"
              >
                <van-radio
                  v-for="(item, index) in metas.status_message"
                  :key="index"
                  :name="item.value"
                  >{{ item.name }}</van-radio
                >
              </van-radio-group>
            </template>
          </van-field>

          <van-field
            name="radio"
            label="坐车"
            :disabled="show.update"
            :rules="[{ required: true }]"
          >
            <template #input>
              <van-radio-group
                v-model="form.car"
                :disabled="show.update"
                direction="horizontal"
              >
                <van-radio
                  v-for="(item, index) in metas.status_message"
                  :key="index"
                  :name="item.value"
                  >{{ item.name }}</van-radio
                >
              </van-radio-group>
            </template>
          </van-field>

          <van-field
            name="radio"
            label="住宿"
            :disabled="show.update"
            :rules="[{ required: true }]"
          >
            <template #input>
              <van-radio-group
                v-model="form.stay"
                :disabled="show.update"
                direction="horizontal"
              >
                <van-radio
                  v-for="(item, index) in metas.status_message"
                  :key="index"
                  :name="item.value"
                  >{{ item.name }}</van-radio
                >
              </van-radio-group>
            </template>
          </van-field>

          <van-field
            readonly
            clickable
            :disabled="show.update"
            name="area"
            v-model="allArea"
            label="地址"
            placeholder="点击选择省市区"
            @click="show.showArea = !show.update"
            :rules="[{ required: true }]"
          />
          <van-popup v-model:show="show.showArea" position="bottom">
            <van-area
              value="150502"
              :area-list="areaList"
              @confirm="confirmArea"
              @cancel="show.showArea = false"
            />
          </van-popup>

          <van-field
            v-model="form.address"
            name="详细地址"
            :disabled="show.update"
            label="详细地址"
            placeholder="请输入详细地址"
            :rules="[{ required: true, message: '请输入详细地址 ' }]"
          />
        </van-cell-group>

        <div style="margin: 16px" class="bottom">
          <van-button
            v-if="!show.update"
            round
            block
            type="primary"
            native-type="submit"
          >
            提交
          </van-button>
          <van-button v-else round block type="primary" @click="change">
            修改学员信息</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { meta } from './../../filters/index'
import area from './../utils/area'
import api from './../../config/api'
import { Dialog, Notify } from 'vant'

export default defineComponent({
  setup() {
    let router = useRouter()
    let route = useRoute()

    // 根据id获取学生详情
    onBeforeMount(() => {
      if (route.query.stu_id) {
        let obj = {
          stu_id: route.query.stu_id,
        }
        show.edit = true
        api.student.stuList(obj).then((res: any) => {
          let data = res.stu_list[0]
          form.stu_id = data.stu_id
          form.stu_name = data.stu_name
          form.parent = data.parent
          form.phone = data.phone
          form.birth = data.birth
          form.sex = Number(data.sex)
          form.status = Number(data.status)
          form.dance = Number(data.dance)
          form.eloquence = Number(data.eloquence)
          form.car = Number(data.car)
          form.stay = Number(data.stay)
          form.address = data.address
          form.class = data.class
          form.age = data.age
          form.province = data.province
          form.city = data.city
          form.area = data.area
          let province = meta.changeAddress(area.province_list, data.province)
          let city = meta.changeAddress(area.city_list, data.city)
          let newArea = meta.changeAddress(area.county_list, data.area)
          allArea.value = province + '/' + city + '/' + newArea
          showTime.value = new Date(form.birth)
        })
      }
    })

    let form = reactive({
      stu_id: '',
      stu_name: '',
      parent: '',
      phone: '',
      birth: '',
      sex: 1,
      status: 1,
      dance: 0,
      eloquence: 0,
      car: 0,
      stay: 0,
      address: '',
      class: '',
      age: 0,
      province: '150000',
      city: '150500',
      area: '150502',
    })

    // 获取当前时间
    let date = new Date().toLocaleDateString().replace(/\//g, '-').split('-')
    // 组装成自己需要的显示格式
    let nowMonth =
      date[0] +
      '-' +
      (Number(date[1]) > 9 ? date[1] : '0' + date[1]) +
      '-' +
      (Number(date[2]) > 9 ? date[2] : '0' + date[2])
    let showTime = ref(new Date(nowMonth))
    // 日期区间
    let dateList = reactive({
      minDate: new Date(
        Number(date[0]) -
          8 +
          '-' +
          (Number(date[1]) > 9 ? date[1] : '0' + date[1]) +
          '-' +
          (Number(date[2]) > 9 ? date[2] : '0' + date[2])
      ),
      maxDate: new Date(
        Number(date[0]) +
          '-' +
          (Number(date[1]) > 9 ? date[1] : '0' + date[1]) +
          '-' +
          (Number(date[2]) > 9 ? date[2] : '0' + date[2])
      ),
    })

    // meta实例
    let metas = reactive({
      classes: ['大班', '中班', '小班'],
      gender: meta.gender,
      // 可选班级列表
      stu_status: meta.stu_status,
      status_message: meta.status_message,
    })

    // 弹窗显示
    let show = reactive({
      // 是否显示日期弹窗
      showPicker: false,
      // 是否显示班级弹窗
      showClass: false,
      // 是否显示地址弹窗
      showArea: false,
      // 文字显示
      update: false,
      //编辑学员信息
      edit: false,
    })

    // 验证规则
    const pattern =
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

    // 显示的地址
    let allArea = ref('内蒙古自治区/通辽市/科尔沁区')

    // 地址实例
    let areaList = ref(area)

    // 返回上一级菜单
    let goOut = () => {
      router.back()
    }

    // 选中出生日期之后获取相应的年龄
    let confirmBirth = (value: any) => {
      let birth = value.toLocaleDateString().replace(/\//g, '-').split('-')
      form.birth = `${birth[0]}-${birth[1] > 9 ? birth[1] : '0' + birth[1]}-${
        birth[2] > 9 ? birth[2] : '0' + birth[2]
      }`
      form.age = getAge(form.birth)
      show.showPicker = false
    }
    // 获取年龄
    let getAge = (value: any) => {
      var date = new Date()
      let year = date.toLocaleDateString().replace(/\//g, '-').split('-')[0]
      let age = Number(year) - 0 - value.split('-')[0] + 1
      return age
    }

    // 选中班级
    let confirmClass = (value: any) => {
      form.class = value
      show.showClass = false
    }

    // 选中地址之后的显示
    let confirmArea = (value: any) => {
      console.log(value)
      form.province = value[0].code
      form.city = value[1].code
      form.area = value[2].code
      allArea.value = value.map((item: any) => item.name).join('/')
      show.showArea = false
    }

    // 提交
    let onSubmit = (values: any) => {
      form.class = meta.changeValue(meta.classes, form.class)
      submit()
    }

    // 修改学员信息
    let change = () => {
      show.update = false
    }

    // 清空填写信息
    let clear = () => {
      form.stu_id = ''
      form.stu_name = ''
      form.parent = ''
      form.phone = ''
      form.birth = ''
      form.sex = 1
      form.status = 1
      form.dance = 0
      form.eloquence = 0
      form.car = 0
      form.stay = 0
      form.address = ''
      form.class = ''
      form.age = 0
      form.province = '150000'
      form.city = '150500'
      form.area = '150502'
    }

    // 保存
    let submit = () => {
      api.student.stuAdd(form).then((res: any) => {
        if (res.code == undefined) {
          if (show.edit) {
            Notify({
              message: '修改成功',
              type: 'success',
              duration: 1000,
            })
            show.update = true
          } else {
            Dialog.confirm({
              title: '添加成功',
              message: '是否继续添加学员',
            })
              .then(() => {
                clear()
              })
              .catch(() => {
                router.push({
                  name: 'StuList',
                })
                clear()
              })
          }
        }
      })
    }

    return {
      form,
      show,
      metas,
      allArea,
      areaList,
      pattern,
      showTime,
      dateList,

      confirmBirth,
      confirmClass,
      confirmArea,
      onSubmit,
      goOut,
      change,
    }
  },
})
</script>

<style lang="less" scoped>
</style>