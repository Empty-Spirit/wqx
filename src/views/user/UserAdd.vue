/** 登录授权 */
<template>
  <div class="user_add">
    <van-nav-bar
      title="登录授权"
      left-text="返回"
      left-arrow
      @click-left="goOut"
    />
    <div>
      <van-tabs v-model:active="form.type">
        <van-tab v-for="item in tab" :key="item.value" :name="item.value">
          <template #title>
            <van-icon class="icon" :name="item.icon" />{{ item.name }}
          </template>
          <div class="tec_form" v-if="form.type == 1">
            <van-form @submit="onSubmit">
              <van-cell-group inset>
                <van-field
                  readonly
                  clickable
                  name="picker"
                  v-model="form.user_name"
                  label="姓名"
                  placeholder="请选择教师姓名"
                  @click="showOption('tecList')"
                  :rules="[{ required: true, message: '请选择授权教师名称' }]"
                />
                <van-field
                  readonly
                  clickable
                  name="picker"
                  v-model="form.status_name"
                  label="授权等级"
                  placeholder="请选择授权等级"
                  @click="showOption('statusList')"
                  :rules="[{ required: true, message: '请选择授权等级' }]"
                />

                <van-field name="switch" label="授权">
                  <template #input>
                    <van-switch v-model="form.empower" size="20" />
                  </template>
                </van-field>

                <van-popup v-model:show="show.showTec" position="bottom">
                  <van-picker
                    show-toolbar
                    :default-index="metas.showOption.index"
                    :columns="metas.showOption.data"
                    @confirm="confirm"
                    @cancel="show.showTec = false"
                  />
                </van-popup>
              </van-cell-group>
              <div style="margin: 16px">
                <van-button round block type="primary" native-type="submit">
                  确认授权
                </van-button>
              </div>
            </van-form>
          </div>
          <div class="tec_form" v-else>
            <van-form @submit="onSubmit">
              <van-cell-group inset>
                <van-field
                  v-model="form.user_name"
                  name="姓名"
                  label="姓名"
                  placeholder="请输入用户姓名"
                  :rules="[{ required: true, message: '请填写用户姓名' }]"
                />
                <van-field
                  v-model="form.user_phone"
                  name="手机号"
                  label="手机号"
                  placeholder="请输入用户手机号"
                  maxlength="11"
                  :rules="[{ pattern, message: '手机号格式不正确' }]"
                />
                <van-field
                  v-model="form.user_email"
                  name="邮箱"
                  label="邮箱"
                  placeholder="请输入用户邮箱"
                  :rules="[{ pattern: emailRule, message: '邮箱格式不正确' }]"
                />

                <van-field
                  readonly
                  clickable
                  name="picker"
                  v-model="form.status_name"
                  label="授权等级"
                  placeholder="请选择授权等级"
                  @click="showOption('statusList')"
                  :rules="[{ required: true, message: '请选择授权等级' }]"
                />

                <van-field name="switch" label="授权">
                  <template #input>
                    <van-switch v-model="form.empower" size="20" />
                  </template>
                </van-field>

                <van-popup v-model:show="show.showTec" position="bottom">
                  <van-picker
                    show-toolbar
                    :default-index="metas.showOption.index"
                    :columns="metas.showOption.data"
                    @confirm="confirm"
                    @cancel="show.showTec = false"
                  />
                </van-popup>
              </van-cell-group>
              <div style="margin: 16px">
                <van-button round block type="primary" native-type="submit">
                  确认授权
                </van-button>
              </div>
            </van-form>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import api from './../../config/api'
import { meta } from './../../filters/index'
import { Notify, Dialog } from 'vant'

export default defineComponent({
  setup() {
    const router = useRouter()

    onBeforeMount(() => {
      getTeacherList()
    })
    // 验证规则
    const pattern =
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    const emailRule =
      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/

    // 切换tab
    let tab = ref([
      { value: 1, name: '教师授权', icon: 'gem' },
      { value: 2, name: '普通用户授权', icon: 'manager' },
    ])

    // select options 下拉选项
    let metas = reactive({
      showOption: {},
      tecList: {
        index: '',
        data: [],
      },
      statusList: {
        index: '',
        data: ['普通用户', '教师', '管理员'],
      },
    })

    let tecList = ref([])

    // 表单数据
    let form = reactive({
      type: 1,
      user_name: '',
      teacher_id: '',
      status_name: '',
      status: '',
      empower: false,
    })

    // 获取教师列表
    const getTeacherList = () => {
      metas.tecList = {
        index: '',
        data: [],
      }
      api.teacher.tecList().then((res: any) => {
        tecList = res
        res.map((item: any) => {
          return metas.tecList.data.push(item.teacher_name)
        })
        console.log(tecList)
      })
    }

    // 下拉选中
    const show = reactive({
      // 显示教师下拉
      showTec: false,
      // 当前下拉类别
      active: '',
      // 授权成功提示
      dialog: false,
    })

    // 更新下拉内容
    const showOption = (val: any) => {
      show.showTec = true
      switch (val) {
        case 'tecList':
          metas.showOption = metas.tecList
          show.active = val
          break
        case 'statusList':
          metas.showOption = metas.statusList
          show.active = val
          break
      }
    }

    // 下拉选中确认
    const confirm = (val: any, index: any) => {
      console.log(val)
      switch (show.active) {
        case 'tecList':
          metas.tecList.index = index
          form.user_name = val
          form.teacher_id = tecList[index].teacher_id
          break
        case 'statusList':
          metas.statusList.index = index
          form.status_name = val
          form.status = meta.empower[index].value.toString()
      }
      show.showTec = false
    }

    // 授权
    const onSubmit = () => {
      api.user.userAdd(form).then((res) => {
        if (res) {
          Notify({
            message: form.empower ? '授权成功' : '取消授权成功',
            type: 'success',
            duration: 1000,
          })
          router.push({
            name: 'UserList',
          })
          // Dialog.confirm({
          //   title: form.empower ? '授权成功' : '取消授权成功',
          //   message: '是否继续授权',
          // })
          //   .then(() => {
          //     console.log('d')
          //     form = {
          //       type: 1,
          //       user_name: '',
          //       teacher_id: '',
          //       status_name: '',
          //       status: '',
          //       empower: false,
          //     }
          //     form.user_name = ''
          //   })
          //   .catch(() => {
          //     router.push({
          //       name: 'UserList',
          //     })
          //   })
        }
      })
    }

    // 返回上一级
    const goOut = () => {
      router.push('Home')
    }

    return {
      pattern,
      emailRule,
      tab,
      form,
      metas,
      show,
      showOption,
      confirm,
      onSubmit,
      goOut,
    }
  },
})
</script>
<style lang="less" scoped>
.user_add {
  .icon {
    margin-right: 10px;
  }
  .tec_form {
    margin-top: 20px;
  }
}
</style>