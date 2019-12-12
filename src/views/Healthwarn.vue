<template>
  <div class="healthwarn">
    <top-bar title="健康预警信息页" />
    <van-cell-group v-for="item of usergroup" :key="item.id">
      <van-field :value="item.name" readonly label="保健用户 : " />
      <van-field :value="item.warntime" readonly label="告警时间 : " />
      <van-field :value="item.datatype" readonly label="健康数据类型 : " />
      <van-field :value="item.warntype" readonly label="预警类型 : " />
      <van-field :value="item.warn" readonly label="预警信息说明 : " />
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
  methods: {},
  mounted: function() {
    this.usergroup = [
      {
        id: 1,
        name: "wsj",
        warntime: "2019-1-2 10:48:23",
        datatype: "心率",
        warntype: "单次过高",
        warn: "心率过高(108>100)"
      },
      {
        id: 2,
        name: "ewiru",
        warntime: "2019-1-2 10:48:23",
        datatype: "心率",
        warntype: "单次过高",
        warn: "心率过高(108>100)"
      }
    ];
  }
};
</script>
<style lang="less" scoped>
.healthwarn {
  /deep/ .van-cell-group {
    margin-bottom: 15px;
    .van-field__label {
      width: 120px;
    }
  }
}
</style>
