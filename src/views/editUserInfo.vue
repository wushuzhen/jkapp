<template>
  <div class="userinfo">
    <top-bar title="修改管理员资料" />
    <van-cell-group>
      <van-field v-model="username" label="用户名 : " />
      <van-field label="性别 : " readonly="readonly" />
      <van-radio-group v-model="radio" class="lable">
        <van-radio name="0">无</van-radio>
        <van-radio name="1">男</van-radio>
        <van-radio name="2">女</van-radio>
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
    let date = "2009-12-13";
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
      locationvalue: "711391",
      province: "",
      city: "",
      district: "",
      id: 0
    };
  },
  mounted: function() {
    this.$axios.get("cust/mdUserInfo/", {}).then(function(res) {
      this.id = res.data.userinfo.id;
      this.username = res.data.userinfo.name;
      this.contact = res.data.userinfo.address;
      this.date = res.data.userinfo.brithday;
      this.radio = "" + res.data.userinfo.sex;
      this.location =
        res.data.userinfo.province +
        res.data.userinfo.city +
        res.data.userinfo.district;
      this.currentDate = new Date(res.data.userinfo.brithday);
      this.province = res.data.userinfo.province;
      this.city = res.data.userinfo.city;
      this.district = res.data.userinfo.district;
    }.bind(this));
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
      this.province = e[0].name;
      this.city = e[1].name;
      this.district = e[2].name;
    },
    cancel1() {
      this.show1 = false;
    },
    submit() {
      this.getCsrfToken().then(function(token) {
        this.$axios
          .post(
            "/cust/mdUserInfo/",
            {
              id: this.id,
              name: this.username,
              sex: this.radio,
              brithday: this.date,
              province: this.province,
              city: this.city,
              district: this.district,
              address: this.contact
            },
            {
              headers: { "X-CSRFToken": token }
            }
          )
          .then(function(res) {
            if (res.retcode === 0) {
              this.$dialog.alert({
                message: res.retmsg
              });
            } else if (res.retcode === 2) {
              // this.$dialog.alert({
              //   message: JSON.parse(res.data.form_error)
              // });
              // let error = JSON.parse(res.data.form_error)
              console.log(JSON.parse(res.data.form_error))
              console.log(res.retmsg)
            }
          }.bind(this));
      }.bind(this));
    }
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
