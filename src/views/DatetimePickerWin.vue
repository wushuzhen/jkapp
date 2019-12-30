<template>
  <div>
    <!-- 弹出层 -->
    <van-popup v-model="isPopShow" position="bottom">
      <van-datetime-picker
        @cancel="cancelPicker"
        @confirm="confirmPicker"
        v-model="time"
        :type="type"
        :formatter="formatter"
      />
    </van-popup>
  </div>
</template>

<script>
import { DatetimePicker, Popup } from "vant";
import moment from "moment";
export default {
  name: "datetime-picker-win",
  components: {
    [Popup.name]: Popup,
    [DatetimePicker.name]: DatetimePicker
  },
  data() {
    return {
      type: "time",
      time: "12:00",
      isPopShow: false, // 弹出层隐藏与显示
      resolve: function() {},
      reject: function() {}
    };
  },
  methods: {
    show(type, time) {
      //弹出层并显示时间选择器
      this.type = type;
      if (type == "datetime" || type == "date") {
        this.time = moment(time.replace(/-/g, "/")).toDate();
      } else {
        this.time = time;
      }
      this.isPopShow = true;
      let p = new Promise(
        function(resolve, reject) {
          this.resolve = resolve;
          this.reject = reject;
        }.bind(this)
      );
      return p;
    },
    cancelPicker() {
      // 选择器取消按钮点击事件
      this.isPopShow = false;
      this.reject();
    },
    confirmPicker(val) {
      this.isPopShow = false;
      if (this.type == "datetime" || this.type == "date") {
        let strval = moment(val).format("YYYY-MM-DD HH:mm");
        this.resolve(strval);
      } else {
        this.resolve(val);
      }
    },
    formatter(type, val) {
      // 格式化选择器日期
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    }
  }
};
</script>