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
    let that = this;
    this.$axios.get("cust/mdUserInfo/", {}).then(function(res) {
      that.id = res.data.userinfo.id;
      that.username = res.data.userinfo.name;
      that.contact = res.data.userinfo.address;
      that.date = res.data.userinfo.brithday;
      that.radio = "" + res.data.userinfo.sex;
      that.location =
        res.data.userinfo.province +
        res.data.userinfo.city +
        res.data.userinfo.district;
      that.currentDate = new Date(res.data.userinfo.brithday);
      that.province = res.data.userinfo.province;
      that.city = res.data.userinfo.city;
      that.district = res.data.userinfo.district;
    });
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
      let that = this;
      this.getCsrfToken(this).then(function(token) {
        that.$axios
          .post(
            "/cust/mdUserInfo/",
            {
              id: that.id,
              name: that.username,
              sex: that.radio,
              brithday: that.date,
              province: that.province,
              city: that.city,
              district: that.district,
              address: that.contact
            },
            {
              headers: { "X-CSRFToken": token }
            }
          )
          .then(function(res) {
            if (res.retcode === 0) {
              that.$dialog.alert({
                message: res.retmsg
              });
            } else if (res.retcode === 2) {
              // that.$dialog.alert({
              //   message: JSON.parse(res.data.form_error)
              // });
              // let error = JSON.parse(res.data.form_error)
              console.log(JSON.parse(res.data.form_error))
              console.log(res.retmsg)
            }
          });
      });
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
