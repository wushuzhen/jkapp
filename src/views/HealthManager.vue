<template>
  <div class="healthmanager">
    <top-bar title="保健用户列表" />
    <van-cell-group v-for="item of usergroup" :key="item.id">
      <van-field :value="item.userName" readonly label="使用者名称 : " />
      <van-field :value="item.mobilephone" readonly label="关联手机号 : " />
      <van-field :value="item.bindTime" readonly label="绑定时间 : " />
      <van-field :value="item.dev" readonly label="关联设备 : " />
      <van-field
        v-if="item.status == 0"
        readonly
        value="初始化"
        label="设备状态 : "
      />
      <van-field
        v-else-if="item.status == 1"
        value="已激活"
        readonly
        label="设备状态 : "
      />
      <van-field
        v-else-if="item.status == 2"
        value="已挂失"
        readonly
        label="设备状态 : "
      />
      <van-field
        v-else-if="item.status == 3"
        value="已解绑"
        readonly
        label="设备状态 : "
      />
      <van-field v-else value="禁用" readonly label="设备状态 : " />
      <van-button
        v-if="item.ismanage == true"
        plain
        type="primary"
        size="small"
        :to="{
          path: '/editdeviceuser',
          query: { id: item.id, item: JSON.stringify(item) }
        }"
        >修改</van-button
      >
      <van-button
        v-if="item.ismanage == true && (item.status == 2 || item.status == 3)"
        plain
        type="primary"
        size="small"
        :to="{ path: '/binddevice', query: { id: item.id } }"
        >绑定</van-button
      >
      <van-button
        v-if="item.ismanage == true && item.status == 1"
        plain
        type="primary"
        size="small"
        @click="unbind(item.id)"
        >解除绑定</van-button
      >
      <van-button
        v-if="item.ismanage == true && item.status == 1"
        plain
        type="primary"
        size="small"
        @click="reportloss(item.id)"
        >挂失</van-button
      >
      <van-button
        v-if="item.ismanage == true && item.status == 1"
        plain
        type="primary"
        size="small"
        :to="{ path: '/devicetransfer', query: { id: item.id } }"
        >设备授权</van-button
      >
      <van-button
        v-if="item.ismanage == true && item.status == 1"
        plain
        type="primary"
        size="small"
        :to="{ path: '/datatransfer', query: { id: item.id } }"
        >数据授权</van-button
      >
      <van-button
        v-if="
          item.ismanage == true && item.status != 4 && item.issurvey == false
        "
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
      usergroup: []
    };
  },
  mounted: function() {
    this.$axios.get("/device/mydevicesearch/", {}).then(
      function(res) {
        this.usergroup = res.data.rows;
      }.bind(this)
    );
  },
  methods: {
    unbind(id) {
      this.getCsrfToken(this).then(
        function(token) {
          this.$axios
            .post(
              "/device/unbind/",
              { id: id },
              {
                headers: { "X-CSRFToken": token }
              }
            )
            .then(
              function(res) {
                this.$dialog.alert({
                  message: res.retmsg
                });
                this.$router.go(0);
              }.bind(this)
            );
        }.bind(this)
      );
    },
    reportloss(id) {
      this.getCsrfToken(this).then(
        function(token) {
          this.$axios
            .post(
              "/device/reportloss/",
              { id: id },
              {
                headers: { "X-CSRFToken": token }
              }
            )
            .then(
              function(res) {
                this.$dialog.alert({
                  message: res.retmsg
                });
                this.$router.go(0);
              }.bind(this)
            );
        }.bind(this)
      );
    },
    pcsurvey() {}
  }
};
</script>
<style lang="less" scoped>
.healthmanager {
  /deep/ .van-cell-group {
    margin-bottom: 15px;
  }
}
</style>
