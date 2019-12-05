<template>
  <div class="binddevice">
    <top-bar v-show="true" ref="son" />
    <van-cell-group>
      <van-field v-model="device" label="设备编号 : " />
      <van-button plain type="primary" size="small" @click="submit"
        >提交</van-button
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
      device:"545654"
    };
  },
  methods: {
    submit() {
      let id = this.$route.query.id;
      console.log(id);
    }
	},
	mounted:function(){
    console.log(111111)
    this.$refs.son.title = "绑定设备";
  }
};
</script>
