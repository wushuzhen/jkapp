<template>
  <div class="editdeviceuser">
    <top-bar v-show="true" ref="son" />
		<van-cell-group>
			<van-field v-model="name" label="使用者名称 : " />
      <van-field v-model="phone" label="关联手机号 : " />
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
      id: 1,
      name: "wsj",
      phone: 24634
    };
	},
	methods:{
		submit(){
			let id = this.$route.query.id
			console.log(id)
		}
  },
  mounted:function(){
    this.$refs.son.title = "修改保健用户资料"
  }
};
</script>
