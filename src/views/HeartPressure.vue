<template>
  <div class="heartrate">
    <top-bar title="血压图" />
    <van-cell-group>
      <van-field v-model="start" label="开始日期 : " @focus="picktime" />
      <van-field v-model="end" label="开始日期 : " @focus="picktime1" />
      <van-button plain type="primary" size="small" @click="submit"
        >查询</van-button
      >
    </van-cell-group>
    <div id="mychart"></div>
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="startdate"
        :min-date="minDate"
        type="date"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-popup>
    <van-popup v-model="show1" position="bottom">
      <van-datetime-picker
        v-model="enddate"
        :min-date="minDate"
        type="date"
        @confirm="confirm1"
        @cancel="cancel1"
      />
    </van-popup>
  </div>
</template>
<script>
import TopBar from "@/views/TopBar";
import { CellGroup, Cell } from "vant";
import { Field } from "vant";
import { DatetimePicker } from "vant";
import { Popup } from "vant";
import { Button } from "vant";
export default {
  components: {
    [TopBar.name]: TopBar,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Field.name]: Field,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Button.name]: Button
  },
  data() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var systemDate = year + seperator1 + month + seperator1 + strDate;
    return {
      start: systemDate,
      end: systemDate,
      minDate: new Date("1850-1-1"),
      startdate: new Date(systemDate),
      enddate: new Date(systemDate),
      show: false,
      show1: false,
      option: {
        title: {
          text: "血压图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["高血压", "低血压"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
          axisLabel: {
            interval: 0
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "高血压",
            type: "line",
            smooth: true,
            data: []
          },
          {
            name: "低血压",
            type: "line",
            smooth: true,
            data: []
          }
        ]
      }
    };
  },
  mounted: function() {
    this.showinfo();
  },
  methods: {
    showinfo() {
      let myChart = this.$echarts.init(document.getElementById("mychart"));
      myChart.setOption(this.option);
    },
    picktime() {
      this.show = true;
    },
    picktime1() {
      this.show1 = true;
    },
    confirm() {
      this.show = false;
      this.start =
        this.startdate.getFullYear() +
        "-" +
        (Number(this.startdate.getMonth()) + 1) +
        "-" +
        this.startdate.getDate();
    },
    confirm1() {
      this.show1 = false;
      this.end =
        this.enddate.getFullYear() +
        "-" +
        (Number(this.enddate.getMonth()) + 1) +
        "-" +
        this.enddate.getDate();
    },
    cancel() {
      this.show = false;
    },
    cancel1() {
      this.show1 = false;
    },
    submit() {
      this.getCsrfToken().then(
        function(token) {
          this.$axios
            .post(
              "/health/0/bp_query/",
              {
                start: this.start,
                end: this.end,
                devuserid: localStorage.getItem("currUser")
              },
              {
                headers: { "X-CSRFToken": token }
              }
            )
            .then(
              function(res) {
                let xdata = this.option.xAxis.data;
                let ygdata = this.option.series[0].data;
                let yddata = this.option.series[1].data;
                let data = res.data.data;
                if (data.length > 0) {
                  for (var i = 0; i < data.length; i++) {
                    xdata.push(data[i].recordTime);
                    ygdata.push(data[i].maxval);
                    yddata.push(data[i].minval);
                  }
                  this.showinfo();
                } else {
                  this.$dialog.alert({
                    message: "查询无数据"
                  });
                }
              }.bind(this)
            );
        }.bind(this)
      );
    }
  }
};
</script>
<style lang="less" scoped>
#mychart {
  width: 100%;
  height: 300px;
}
</style>
