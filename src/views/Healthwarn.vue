<template>
  <div class="healthwarn">
    <top-bar title="健康预警信息页" />
    <van-cell-group v-for="item of usergroup" :key="item.id">
      <van-field :value="item.name" readonly label="保健用户 : " />
      <van-field :value="item.recordTime" readonly label="告警时间 : " />
      <van-field :value="item.datatype" readonly label="健康数据类型 : " />
      <van-field :value="item.warntype" readonly label="预警类型 : " />
      <van-field :value="item.warntext" readonly label="预警信息说明 : " />
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
    this.$axios
      .get(
        "/health/ht_query/?devuserid=" + localStorage.getItem("currUser"),
        {
          devuserid: localStorage.getItem("currUser")
        }
      )
      .then(
        function(res) {
          console.log(res)
          this.usergroup = res.data.rows
        }.bind(this)
      );
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
