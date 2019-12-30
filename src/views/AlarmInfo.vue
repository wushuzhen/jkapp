<template>
  <div>
    <top-bar
      :title="title"
      :left-text="leftText"
      :right-text="rightText"
      :click-right="onClickTopRight"
    />
    <van-cell-group>
      <van-field v-model="item.title" label="标题" placeholder="请输入标题" :readonly="!editState" />
      <van-cell title="是否启用">
        <van-radio-group v-model="item.status" :disabled="!editState">
          <van-radio name="1">生效</van-radio>
          <van-radio name="0">停用</van-radio>
        </van-radio-group>
      </van-cell>
      <van-cell title="是否震动">
        <van-radio-group v-model="item.vibrate" :disabled="!editState">
          <van-radio name="1">震动</van-radio>
          <van-radio name="0">无</van-radio>
        </van-radio-group>
      </van-cell>
      <van-cell title="周期">
        <van-radio-group v-model="item.period" :disabled="!editState" @change="onPeriodChange">
          <van-radio name="0">每天</van-radio>
          <van-radio name="1">每周</van-radio>
          <van-radio name="2">一次性</van-radio>
        </van-radio-group>
      </van-cell>
      <van-cell>
        <p>周期参数</p>
        <van-checkbox-group v-show="itemWeekShow" v-model="item.week" :disabled="!editState">
          <van-checkbox name="0">星期一</van-checkbox>
          <van-checkbox name="1">星期二</van-checkbox>
          <van-checkbox name="2">星期三</van-checkbox>
          <van-checkbox name="3">星期四</van-checkbox>
          <van-checkbox name="4">星期五</van-checkbox>
          <van-checkbox name="5">星期六</van-checkbox>
          <van-checkbox name="6">星期日</van-checkbox>
        </van-checkbox-group>
        <van-field
          clickable
          v-show="notifyTimeShow"
          v-model="notifyTime"
          :readonly="!editState"
          @click="onClickNotifyTime"
        />
        <van-field
          clickable
          v-show="notifyOnceShow"
          v-model="notifyOnce"
          :readonly="!editState"
          @click="onClickNotifyOnce"
        />
      </van-cell>
      <datetime-picker-win ref="dtpicker" />
      <form-error :response="formResponse" />
    </van-cell-group>
  </div>
</template>

<script>
import TopBar from "@/views/TopBar";

import {
  CellGroup,
  Cell,
  Field,
  Dialog,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  DatetimePicker
} from "vant";

import FormError from "@/views/FormError";
import moment from "moment";
import DatetimePickerWin from "@/views/DatetimePickerWin";
import qs from "qs";

export default {
  components: {
    [TopBar.name]: TopBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
    [DatetimePicker.name]: DatetimePicker,
    [FormError.name]: FormError,
    [DatetimePickerWin.name]: DatetimePickerWin
  },

  created() {
    this.initNotifyData(); //数据有依赖顺序，created在data()初始化之后，模板渲染之前
  },

  mounted() {
    this.updateState();
    this.onPeriodChange(this.item.period);
  },

  data() {
    return {
      id: this.$store.state.urlData.id,
      item: this.initItem(),
      editState: this.$store.state.urlData.id == 0,
      title: "",
      leftText: "",
      rightText: "",
      formResponse: {},

      notifyTime: "12:00",
      notifyOnce: moment().format("YYYY-MM-DD HH:mm"),

      itemWeekShow: false,
      notifyTimeShow: false,
      notifyOnceShow: false
    };
  },
  computed: {},
  methods: {
    initItem() {
      let item = this.$store.state.urlData.item;
      item.period = item.period ? String(item.period) : "0";
      item.status = item.status ? String(item.status) : "1";
      item.vibrate = item.vibrate ? String(item.vibrate) : "1";
      item.week =
        item.week != null && item.week != "" ? item.week.split(",") : [];
      return item;
    },

    initNotifyData() {
      let period = this.item.period;
      if (period == 0 || period == 1) {
        if (this.item.alarmtime) {
          this.notifyTime = moment(this.item.alarmtime).format("HH:mm");
        } else {
          this.notifytime = "12:00";
        }
      } else if (period == 2) {
        this.notifyOnce =
          this.item.alarmtime || moment().format("YYYY-MM-DD HH:mm");
      }
    },

    onPeriodChange(name) {
      if (name == "0") {
        this.itemWeekShow = false;
        this.notifyTimeShow = true;
        this.notifyOnceShow = false;
      } else if (name == "1") {
        this.itemWeekShow = true;
        this.notifyTimeShow = true;
        this.notifyOnceShow = false;
      } else if (name == "2") {
        this.itemWeekShow = false;
        this.notifyTimeShow = false;
        this.notifyOnceShow = true;
      }
    },

    onClickTopRight() {
      if (this.editState) {
        this.saveRecord();
      } else {
        this.editState = true;
        this.updateState();
      }
    },

    onClickNotifyTime() {
      if (!this.editState) return;

      this.$refs.dtpicker
        .show("time", this.notifyTime)
        .then(
          function(val) {
            this.notifyTime = val;
          }.bind(this)
        )
        .catch(() => {});
    },

    onClickNotifyOnce() {
      if (!this.editState) return;
      this.$refs.dtpicker
        .show("datetime", this.notifyOnce)
        .then(
          function(val) {
            this.notifyOnce = val;
          }.bind(this)
        )
        .catch(() => {});
    },

    updateState() {
      if (this.editState) {
        this.title =
          this.$store.state.urlData.id == 0 ? "新增事务提醒" : "编辑事务提醒";
        this.leftText = "取消";
        this.rightText = "保存";
      } else {
        this.title = "事务提醒";
        this.leftText = "返回";
        this.rightText = "修改";
      }
    },

    saveRecord() {
      this.getCsrfToken()
        .then(
          function(token) {
            this.httpSave(token);
          }.bind(this)
        )
        .catch(() => {});
    },

    httpSave(token) {
      let url = "warn/plane/editplane/";
      let id = this.id;
      if (this.id == 0) {
        id = this.$store.state.currUser;
        url = "warn/plane/addnewplane/";
      }

      let data = {
        id: id,
        title: this.item.title,
        status: Number(this.item.status),
        vibrate: Number(this.item.vibrate),
        period: Number(this.item.period)
      };

      if (data.period == 2) {
        data.notifytime = this.notifyOnce + ":00";
      } else if (data.period == 0) {
        data.notifytime2 = this.notifyTime + ":00";
      } else if (data.period == 1) {
        data.notifytime1 = this.notifyTime + ":00";
        console.log("week:" + JSON.stringify(this.item.week));
        data.weeklist = this.item.week;
      }

      this.$axios
        .post(url, data, {
          headers: { "X-CSRFToken": token }
        })
        .then(
          function(response) {
            let retcode = response.retcode;
            if (retcode == 0) {
              //成功
              this.$toast(response.retmsg);
              this.$store.commit("setAlarmRefresh", true);
              this.$router.go(-1);
            } else if (retcode == 1) {
              //错误
              this.$toast(response.retmsg);
            } else if (retcode == 2) {
              //提交后端Form输入校验错误
              this.formResponse = response;
            }
          }.bind(this)
        )
        .catch(function(error) {
          console.log("请求失败" + error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.function-bar {
  top: 80%;
  position: absolute;
}
</style>
