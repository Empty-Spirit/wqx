/** 新增学员 */
<template>
  <div class='StuAdd'>
    <p class='title'>学员信息登记表</p>
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.stu_name"
        name="学生姓名"
        label="学生姓名"
        :disabled='update'
        placeholder="请输入学生姓名"
        :rules="[{ required: true}]"
      />
      <van-field
        v-model="form.parent"
        name="家长姓名"
        label="家长姓名"
        :disabled='update'
        placeholder="输入一个即可"
        :rules="[{ required: true}]"
      />
      <van-field
        v-model="form.phone"
        name="手机号"
        label="手机号"
        :disabled='update'
        placeholder="请输入家长手机号"
        :rules="[{ pattern, message: '手机号格式不正确' }]"
      />

      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="form.birth"
        label="出生日期"
        :disabled='update'
        placeholder="请选择出生日期"
        @click="showPicker = !update"
        :rules="[{ required: true}]"
      />
      <van-popup
        v-model="showPicker"
        position="bottom"
      >
        <van-datetime-picker
          type="date"
          @confirm="confirmBirth"
          @cancel="showPicker = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        name="picker"
        :value="classes"
        label="班级"
        :disabled='update'
        placeholder="请选择所在班级"
        @click="showClass = !update"
        :rules="[{ required: true}]"
      />
      <van-popup
        v-model="showClass"
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="confirmClass"
          @cancel="showClass = false"
        />
      </van-popup>

      <van-field
        name="radio"
        label="性别"
        :disabled='update'
        :rules="[{ required: true}]"
      >
        <template #input>
          <van-radio-group
            v-model="form.sex"
            :disabled='update'
            direction="horizontal"
          >
            <van-radio
              v-for='(item,index) in $meta.gender'
              :key="index"
              :name="item.value"
            >{{item.name}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        name="radio"
        label="状态"
        :disabled='update'
        :rules="[{ required: true}]"
      >
        <template #input>
          <van-radio-group
            v-model="form.status"
            :disabled='update'
            direction="horizontal"
          >
            <van-radio
              v-for='(item,index) in $meta.stu_status'
              :key="index"
              :name="item.value"
            >{{item.name}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        name="radio"
        label="舞蹈班"
        :disabled='update'
        :rules="[{ required: true}]"
      >
        <template #input>
          <van-radio-group
            v-model="form.dance"
            :disabled='update'
            direction="horizontal"
          >
            <van-radio
              v-for='(item,index) in $meta.status_message'
              :key="index"
              :name="item.value"
            >{{item.name}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        name="radio"
        label="口才班"
        :disabled='update'
        :rules="[{ required: true}]"
      >
        <template #input>
          <van-radio-group
            v-model="form.eloquence"
            :disabled='update'
            direction="horizontal"
          >
            <van-radio
              v-for='(item,index) in $meta.status_message'
              :key="index"
              :name="item.value"
            >{{item.name}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        name="radio"
        label="坐车"
        :disabled='update'
        :rules="[{ required: true}]"
      >
        <template #input>
          <van-radio-group
            v-model="form.car"
            :disabled='update'
            direction="horizontal"
          >
            <van-radio
              v-for='(item,index) in $meta.status_message'
              :key="index"
              :name="item.value"
            >{{item.name}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        name="radio"
        label="住宿"
        :disabled='update'
        :rules="[{ required: true}]"
      >
        <template #input>
          <van-radio-group
            v-model="form.stay"
            :disabled='update'
            direction="horizontal"
          >
            <van-radio
              v-for='(item,index) in $meta.status_message'
              :key="index"
              :name="item.value"
            >{{item.name}}</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        readonly
        clickable
        :disabled='update'
        name="area"
        :value="allArea"
        label="地址"
        placeholder="点击选择省市区"
        @click="showArea = !update"
        :rules="[{ required: true}]"
      />
      <van-popup
        v-model="showArea"
        position="bottom"
      >
        <van-area
          value='150502'
          :area-list="areaList"
          @confirm="confirmArea"
          @cancel="showArea = false"
        />
      </van-popup>

      <van-field
        v-model="form.address"
        name="详细地址"
        :disabled='update'
        label="详细地址"
        placeholder="请输入详细地址"
        :rules="[{ required: true}]"
      />

      <div
        style="margin: 16px;"
        class='bottom'
      >
        <van-button
          v-if='!update'
          round
          block
          type="info"
          native-type="submit"
        >提交</van-button>
        <van-button
          v-else
          round
          block
          type="info"
          native-type="change"
        >修改学员信息</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import area from './../../utils/area'
// require('./share')
export default {
  name: 'StuAdd',
  data () {
    return {
      shareData: {},
      showPicker: false,
      showClass: false,
      showArea: false,
      stu_id: '',
      pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      value: '',
      allArea: '内蒙古自治区/通辽市/科尔沁区',
      classes: '',
      form: {
        stu_id: '',
        stu_name: '',
        parent: '',
        phone: '',
        birth: '',
        sex: 1,
        status: 1,
        dance: 2,
        eloquence: 2,
        car: 2,
        stay: 2,
        address: '',
        class: '',
        age: '',
        province: '',
        city: '',
        area: ''
      },
      columns: ['大班', '中班', '小班'],
      areaList: area,
      update: false
    }
  },
  mounted () {
    console.log(this.areaList)
  },
  methods: {
    clear () {
      this.form = {
        stu_id: '',
        stu_name: '',
        parent: '',
        phone: '',
        birth: '',
        sex: 1,
        status: 1,
        dance: 2,
        eloquence: 2,
        car: 2,
        stay: 2,
        address: '',
        class: '',
        age: '',
        province: '',
        city: '',
        area: ''
      }
      this.classes = ''
    },
    // 获取年龄
    getAge (value) {
      var date = new Date();
      let year = date.toLocaleDateString().replace(/\//g, '-').split('-')[0]
      let age = year - value.split('-')[0] + 1
      return age
    },
    onSubmit () {
      console.log(this.update)
      this.getArea();
      if (!this.update) {
        this.submit()
      } else {
        this.change()
      }

    },
    submit () {
      console.log(this.form)

      this.$api.student.studentAdd(this.form).then(res => {
        this.$dialog.confirm({
          title: '添加成功',
          message: '是否继续添加学员',
        })
          .then(() => {
            this.clear()
          })
          .catch(() => {
            this.update = true
          });
      })
    },
    change () {
      let obj = {
        stu_name: this.form.stu_name
      }
      this.$api.student.searchStudent(obj).then(res => {
        this.form.stu_id = res.stu_id
        this.update = false
      })
    },
    confirmBirth (value) {
      let birth = value.toLocaleDateString().replace(/\//g, '-').split('-')
      this.form.birth = `${birth[0]}-${birth[1]}-${birth[2]}`;
      this.form.age = this.getAge(this.form.birth)
      this.showPicker = false
    },
    // 获取城市code
    getArea () {
      let value = this.allArea.split('/')
      this.form.province = this.$meta.changeAddress(this.areaList.province_list, value[0])
      this.form.city = this.$meta.changeAddress(this.areaList.city_list, value[1])
      this.form.area = this.$meta.changeAddress(this.areaList.county_list, value[2])
    },
    confirmClass (value) {
      this.classes = value
      this.form.class = this.$meta.changeValue(this.$meta.classes, this.classes)
      this.showClass = false
    },
    confirmArea (value) {
      this.allArea = value
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/');
      this.getArea()
      this.showArea = false
    },
    formatter (type, val) {
      if (type === 'year') {
        return `${val}年`;
      } else if (type === 'month') {
        return `${val}月`;
      }
      return val;
    },
  }
}
</script>

<style scoped lang='scss'>
.title {
  background: #dedede;
  height: 40px;
  line-height: 40px;
}
.van-radio {
  width: 60px;
}
</style>