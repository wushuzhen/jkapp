<template>
  <div class="heartrate">
    <top-bar title="心率图" />
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
          text: "血糖图"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["血糖"]
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
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "血糖",
            type: "line",
            smooth: true,
            stack: "总量",
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
      let xdata = this.option.xAxis.data;
			let ydata = this.option.series[0].data;
			let data = [
				{
					recordTime:"sdf",
					val:124
				},
				{
					recordTime:"we",
					val:54
				}
			]
      for (var i = 0; i < data.length; i++) {
        xdata.push(data[i].recordTime);
        ydata.push(data[i].val);
      }
      this.showinfo();
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
