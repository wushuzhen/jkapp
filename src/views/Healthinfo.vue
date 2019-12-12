<template>
  <div class="healthinfo">
    <top-bar title="健康数据" />
    <van-cell-group>
      <van-cell title="心率" to="/heartRate" is-link />
      <van-cell title="血压" to="/bloodPressure" is-link />
      <van-cell title="血糖" to="/bloodSugar" is-link />
    </van-cell-group>
  </div>
</template>
<script>
import TopBar from "@/views/TopBar";
import { CellGroup, Cell, Field, Button } from "vant";
export default {
  components: {
    [TopBar.name]: TopBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [Button.name]: Button
  }
};
</script>
