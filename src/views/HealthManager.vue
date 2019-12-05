<template>
  <div class="healthmanager">
    <top-bar v-show="true" ref="son" />
    <van-cell-group v-for="item of usergroup" :key="item.id">
      <van-field :value="item.name" disabled label="使用者名称 : " />
      <van-field :value="item.phone" disabled label="关联手机号 : " />
      <van-field :value="item.bindtime" disabled label="绑定时间 : " />
      <van-field :value="item.equiptment" disabled label="关联设备 : " />
      <van-field
        v-if="item.status == 0"
        disabled
        value="初始化"
        label="设备状态 : "
      />
      <van-field
        v-else-if="item.status == 1"
        value="已激活"
        disabled
        label="设备状态 : "
      />
      <van-field
        v-else-if="item.status == 2"
        value="已挂失"
        disabled
        label="设备状态 : "
      />
      <van-field
        v-else-if="item.status == 3"
        value="已解绑"
        disabled
        label="设备状态 : "
      />
      <van-field v-else value="禁用" disabled label="设备状态 : " />
      <van-button
        v-if="item.ismanage == 1"
        plain
        type="primary"
        size="small"
        :to="{ path: '/editdeviceuser', query: { id: item.id } }"
        >修改</van-button
      >
      <van-button
        v-if="item.ismanage == 1 && (item.status == 2 || item.status == 3)"
        plain
        type="primary"
        size="small"
        :to="{ path: '/binddevice', query: { id: item.id } }"
        >绑定</van-button
      >
      <van-button
        v-if="item.ismanage == 1 && item.status == 1"
        plain
        type="primary"
        size="small"
        @click="unbind(item.id)"
        >解除绑定</van-button
      >
      <van-button
        v-if="item.ismanage == 1 && item.status == 1"
        plain
        type="primary"
        size="small"
        @click="reportloss(item.id)"
        >挂失</van-button
      >
      <van-button
        v-if="item.ismanage == 1 && item.status == 1"
        plain
        type="primary"
        size="small"
        :to="{ path: '/devicetransfer', query: { id: item.id } }"
        >设备授权</van-button
      >
      <van-button
        v-if="item.ismanage == 1 && item.status == 1"
        plain
        type="primary"
        size="small"
        :to="{ path: '/datatransfer', query: { id: item.id } }"
        >数据授权</van-button
      >
      <van-button
        v-if="item.ismanage == 1 && item.status != 4 && item.issurvey == 0"
        plain
        type="primary"
        size="small"
        @click="pcsurvey"
        >完成问卷</van-button
      >
    </van-cell-group>
  </div>
</template>
<script>
import { CellGroup, Cell, Field, Button } from "vant";
import TopBar from "@/views/TopBar";
export default {
  components: {
    [TopBar.name]: TopBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data() {
    return {
      usergroup: [
        {
          id: 1,
          name: "wsj",
          phone: 24634,
          bindtime: "2019-4-5",
          equiptment: "12",
          issurvey: 0,
          status: 2,
          ismanage: 1
        },
        {
          id: 2,
          name: "ewiru",
          phone: 6873543,
          bindtime: "2019-6-6",
          equiptment: "34",
          issurvey: 1,
          status: 1,
          ismanage: 1
        }
      ]
    };
  },
  methods: {
    unbind(id) {
      this.usergroup[0].status = 1
      console.log(this)
      console.log(id)
    },
    reportloss(id) {
      console.log(id)
    },
    devicetransfer() {},
    datatransfer() {},
    pcsurvey() {}
  },
  mounted:function(){
    this.$refs.son.title = "保健用户列表"
  }
};
</script>
