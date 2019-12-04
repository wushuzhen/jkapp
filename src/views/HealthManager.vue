<template>
  <div class="healthmanager">
    <top-bar v-show="true" />
    <h1>保健用户</h1>
    <van-cell-group v-for="item of usergroup" :key="item.id">
      <van-field :value="item.name" label="使用者名称 : " />
      <van-field :value="item.phone" label="关联手机号 : " />
      <van-field :value="item.bindtime" label="绑定时间 : " />
      <van-field :value="item.equiptment" label="关联设备 : " />
      <van-field v-if="item.status == 0" value="初始化" label="设备状态 : " />
      <van-field
        v-else-if="item.status == 1"
        value="已激活"
        label="设备状态 : "
      />
      <van-field
        v-else-if="item.status == 2"
        value="已挂失"
        label="设备状态 : "
      />
      <van-field
        v-else-if="item.status == 3"
        value="已解绑"
        label="设备状态 : "
      />
      <van-field v-else value="禁用" label="设备状态 : " />
      <van-button
        v-if="item.ismanage == 1"
        plain
        type="primary"
        size="small"
        @click="edit"
        >修改</van-button
      >
      <van-button
        v-if="item.ismanage == 1 && (item.status == 2 || item.status == 3)"
        plain
        type="primary"
        size="small"
        @click="bind"
        >绑定</van-button
      >
      <van-button
        v-if="item.ismanage == 1 && item.status == 1"
        plain
        type="primary"
        size="small"
        @click="unbind"
        >解除绑定</van-button
      >
      <van-button
        v-if="item.ismanage == 1 && item.status == 1"
        plain
        type="primary"
        size="small"
        @click="reportloss"
        >挂失</van-button
      >
      <van-button
        v-if="item.ismanage == 1 && item.status == 1"
        plain
        type="primary"
        size="small"
        @click="devicetransfer"
        >设备授权</van-button
      >
      <van-button
        v-if="item.ismanage == 1 && item.status == 1"
        plain
        type="primary"
        size="small"
        @click="datatransfer"
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
          status: 4,
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
    edit() {},
    bind() {},
    unbind() {},
    reportloss() {},
    devicetransfer() {},
    datatransfer() {},
    pcsurvey() {}
  }
};
</script>
