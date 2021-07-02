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

    <!-- <van-popup
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
    </van-popup> -->
    <van-popup
      v-model="showMessage"
      round
      position="bottom"
      :style="{ height: '30%' }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from "vue";
import api from "../../config/api";
import { meta } from "../../filters/index";
import { Toast } from "vant";

export default defineComponent({
  setup() {
    let showMessage = ref(true);
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
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      getStuList();
    });

    // 获取学生列表
    let getStuList = () => {
      api.student.stuList().then((res: any) => {
        if (res) {
          stuDataList.value = res.stu_list.map((item: any) => {
            item.class = meta.changeValue(meta.classes, item.class);
            return item;
          });
          Toast.clear();
        }
      });
    };

    // 查看
    let show = (id: any) => {
      showMessage.value = true;
      console.log(id, showMessage.value);
    };

    // 修改学生信息
    let update = (id: number) => {
      console.log(id);
    };

    // 删除学生
    let stuDel = (id: number) => {
      let obj = {
        stu_id: id,
      };
      api.student.stuDel(obj).then(res => {
        if (res) {
          Toast.success("删除成功");
          getStuList();
        }
      });
    };
    return {
      showMessage,
      stuList,
      message,
      showData,
      stuDataList,
      update,
      show,
      stuDel,
    };
  },
});
</script>

<style lang="less" scoped>
.stuList {
  width: 100%;
  overflow: hidden;
  margin-bottom: 70px;
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
  .update {
    background: rgb(19, 235, 48);
  }
}
</style>