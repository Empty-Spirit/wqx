/** 学员列表 */
<template>
  <div class="stuList">
    <!-- <search
      :message='message'
      @searchMessage="search"
    ></search> -->
    <van-row class="stu_header">
      <van-col align="center" span="8">姓名</van-col>
      <van-col align="center" span="7">班级</van-col>
      <van-col align="center" span="7">家长姓名 </van-col>
    </van-row>

    <van-swipe-cell v-for="(item, index) in stuDataList" :key="index">
      <van-cell :border="true">
        <van-row>
          <van-col align="center" span="8">{{ item.stu_name }}</van-col>
          <van-col align="center" span="8">{{ item.class }}</van-col>
          <van-col align="center" span="8">{{ item.parent }} </van-col>
        </van-row>
      </van-cell>
      <template #right>
        <van-button square type="primary" @click="show(index)" text="查看" />
        <van-button square type="danger" text="删除" />
      </template>
    </van-swipe-cell>

    <van-popup
      round
      closeable
      v-model="showMessage"
      :style="{ height: '70%', width: '70%' }"
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
import { defineComponent, ref, onBeforeMount } from "vue";
import api from "../../config/api";
import { meta } from "../../filters/index";

export default defineComponent({
  setup() {
    let showMessage = ref(false);
    let stuList = ref([
      {
        type: "selection",
        width: 60,
        align: "center",
      },
      {
        title: "姓名",
        slot: "stu_name",
      },
      {
        title: "班级",
        key: "class",
      },
      {
        title: "操作",
        slot: "action",
        width: 150,
        align: "center",
      },
    ]);

    let message = ref([]);
    let showData = ref([]);
    let stuDataList = ref([]);

    onBeforeMount(() => {
      api.student.stuList().then((res: any) => {
        if (res) {
          stuDataList.value = res.stu_list.map((item: any) => {
            item.class = meta.changeValue(meta.classes, item.class);
            return item;
          });
          console.log(stuDataList);
        }
      });
    });

    let show = (index: any) => {
      showData = ref([]);
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      console.log(stuDataList.value[index].stu_id);
      let obj = {
        stu_id: stuDataList.value[index].stu_id,
        pay_time: year + "-" + month + "-1",
      };
      api.student.stuList(obj).then(res => {
        console.log(res);
      });
      // this.$api.student.stuList(obj).then(res => {
      //   let data = {}
      //   data = res.stu_list[0]
      //   let province = meta.changeAddress(area.province_list, this.data[index].province)
      //   let city = meta.changeAddress(area.city_list, this.data[index].city)
      //   let newArea = meta.changeAddress(area.county_list, this.data[index].area)
      //   stuDataList.value.address = province + city + newArea + data.address
      //   for (let i in data) {
      //     let obj = {}
      //     if (this.$meta.changeStuValue(this.$meta.stuMessage, i)) {
      //       obj = {
      //         value: this.$meta.changeStuValue(this.$meta.stuMessage, i),
      //         name: data[i]
      //       }
      //       switch (obj.value) {
      //         case '班级':
      //           obj.name = this.$meta.changeValue(this.$meta.classes, obj.name)
      //           break;
      //         case '性别':
      //           obj.name = this.$meta.changeValue(this.$meta.gender, obj.name)
      //           break;
      //         case '学生状态':
      //           obj.name = this.$meta.changeValue(this.$meta.stu_status, obj.name)
      //           break;
      //         case '住宿':
      //           obj.name = this.$meta.changeValue(this.$meta.pay, obj.name)
      //           break;
      //         case '口才':
      //           obj.name = this.$meta.changeValue(this.$meta.pay, obj.name)
      //           break;
      //         case '舞蹈':
      //           obj.name = this.$meta.changeValue(this.$meta.pay, obj.name)
      //           break;
      //         case '学费':
      //           obj.name = this.$meta.changeValue(this.$meta.pay, obj.name)
      //           break;
      //       }
      //       this.showData.push(obj)
      // }
      // }
      // this.showMessage = true;
      // })
    };
    return {
      showMessage,
      stuList,
      message,
      showData,
      stuDataList,
      show,
    };
  },
  methods: {
    show(index: number | string) {
      this.showData = [];
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let obj = {
        stu_id: this.data[index].stu_id,
        pay_time: year + "-" + month + "-1",
      };
      this.$api.student.stuList(obj).then(res => {
        let data = {};
        data = res.stu_list[0];
        let province = this.$meta.changeAddress(
          area.province_list,
          this.data[index].province
        );
        let city = this.$meta.changeAddress(
          area.city_list,
          this.data[index].city
        );
        let newArea = this.$meta.changeAddress(
          area.county_list,
          this.data[index].area
        );
        data.address = province + city + newArea + data.address;
        for (let i in data) {
          let obj = {};
          if (this.$meta.changeStuValue(this.$meta.stuMessage, i)) {
            obj = {
              value: this.$meta.changeStuValue(this.$meta.stuMessage, i),
              name: data[i],
            };
            switch (obj.value) {
              case "班级":
                obj.name = this.$meta.changeValue(this.$meta.classes, obj.name);
                break;
              case "性别":
                obj.name = this.$meta.changeValue(this.$meta.gender, obj.name);
                break;
              case "学生状态":
                obj.name = this.$meta.changeValue(
                  this.$meta.stu_status,
                  obj.name
                );
                break;
              case "住宿":
                obj.name = this.$meta.changeValue(this.$meta.pay, obj.name);
                break;
              case "口才":
                obj.name = this.$meta.changeValue(this.$meta.pay, obj.name);
                break;
              case "舞蹈":
                obj.name = this.$meta.changeValue(this.$meta.pay, obj.name);
                break;
              case "学费":
                obj.name = this.$meta.changeValue(this.$meta.pay, obj.name);
                break;
            }
            this.showData.push(obj);
          }
        }
        this.showMessage = true;
      });
    },
  },
});
</script>

<style lang="less" scoped>
.stuList {
  width: 100%;
  overflow: hidden;
  margin-bottom: 110px;
  margin-top: 40px;
  .stu_header {
    background: #eee;
    padding: 0 16px;
    height: 40px;
    line-height: 40px;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 2;
  }
}
</style>