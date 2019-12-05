<template>
  <div class="devicetransfer">
    <top-bar v-show="true" ref="son" />
    <van-cell-group>
      <van-field v-model="phone" placeholder="请填写设备授权对象手机号码" />
      <van-field v-model="code" placeholder="请输入验证码" />
      <van-button plain type="primary" size="normal" @click="getcode" class="code">获取验证码</van-button>
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
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [TopBar.name]: TopBar,
    [Button.name]: Button
  },
  data() {
    return {
      phone: "",
      code: ""
    };
	},
	methods: {
		getcode(){
			console.log(11111111)
		},
		submit(){
			console.log(22222222);
			let id = localStorage.getItem("currUser");
			console.log(id)
		}
  },
  mounted:function(){
    this.$refs.son.title = "设备授权";
  }
};
</script>
<style lang="less" scoped>
.devicetransfer {
	position: relative;
	.code{
		position: absolute;
		right: 0px;
		top: 44px
	}
}
</style>
