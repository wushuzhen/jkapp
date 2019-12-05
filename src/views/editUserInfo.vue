<template>
  <div class="userinfo">
    <top-bar v-show="true" ref="son" />
    <van-cell-group>
      <van-field v-model="username" label="用户名 : " />
      <van-field label="性别 : " readonly="readonly" />
      <van-radio-group v-model="radio" class="lable">
        <van-radio name="0">男</van-radio>
        <van-radio name="1">女</van-radio>
      </van-radio-group>
      <van-field v-model="date" label="出生年月日 : " @focus="picktime" />
      <van-field v-model="contact" label="联系地址 : " />
      <van-field v-model="location" label="所在地  : " @focus="pickcontact" />
      <van-button plain type="primary" size="small" @click="submit"
        >提交</van-button
      >
    </van-cell-group>
    <!-- 弹出层 -->
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        :min-date="minDate"
        type="date"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-popup>
    <van-popup v-model="show1" position="bottom">
      <van-area
        :area-list="areaList"
        v-model="locationvalue"
        @confirm="confirm1"
        @cancel="cancel1"
      />
    </van-popup>
  </div>
</template>

<script>
import { CellGroup, Cell } from "vant";
import { Field } from "vant";
import { RadioGroup, Radio } from "vant";
import { DatetimePicker } from "vant";
import { Popup } from "vant";
import { Area } from "vant";
import { Button } from "vant";
import TopBar from "@/views/TopBar";
import AreaList from "../assets/js/area";
export default {
  components: {
    [TopBar.name]: TopBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Area.name]: Area,
    [AreaList.name]: AreaList,
    [Button.name]: Button
  },
  data() {
    var date = "2009-12-13";
    return {
      username: "wsz",
      radio: "0",
      date: date,
      minDate: new Date("1850-1-1"),
      currentDate: new Date(date),
      show: false, //选择出生年月日的弹出层
      show1: false, //选择地址的弹出层
      contact: "广东省广州市黄埔区",
      location: "广东省广州市黄埔区",
      areaList: AreaList,
      locationvalue: "711391"
    };
  },
  methods: {
    picktime() {
      this.show = true;
    },
    // 点击确定
    confirm() {
      this.show = false;
      this.date =
        this.currentDate.getFullYear() +
        "-" +
        (Number(this.currentDate.getMonth()) + 1) +
        "-" +
        this.currentDate.getDate();
    },
    cancel() {
      this.show = false;
    },
    pickcontact() {
      this.show1 = true;
    },
    confirm1(e) {
      this.show1 = false;
      this.location = e[0].name + e[1].name + e[2].name;
    },
    cancel1() {
      this.show1 = false;
    },
    submit() {
      var obj = {};
      obj.username = this.username;
      obj.sex = this.radio;
      obj.date = this.date;
      obj.contact = this.contact;
      obj.location = this.locationvalue;
      console.log(111111111);
      console.log(obj);
    }
  },
  mounted:function(){
    this.$refs.son.title = "修改管理员资料"
  }
};
</script>
<style lang="less" scoped>
.userinfo {
  position: relative;
  .lable {
    position: absolute;
    left: 85px;
    top: 56px;
    .van-radio {
      margin-left: 20px;
      float: left;
    }
  }
  .van-button {
    margin: 10px 0px;
  }
}
</style>
