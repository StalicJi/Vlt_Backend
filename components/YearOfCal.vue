<template>
  <div class="grid gap-4 grid-flow-row grid-rows-12 flex-1">
    <!-- !時間選擇 -->
    <div class="flex gap-4 w-full row-span-1 h-12">
      <Button
        buttonText="專案時間"
        @click="showYBarChartCnt"
        :class="{
          'focus:bg-black': activeChart === 'bar',
          'focus:bg-gray': activeChart !== 'bar',
        }"
      />
      <Button
        buttonText="工作型態"
        @click="showPieChartCnt"
        :class="{
          'focus:bg-black': activeChart === 'pie',
          'focus:bg-gray': activeChart !== 'pie',
        }"
      />
      <VaDateInput background="#fff" color="info" placeholder="請選擇起始日" />
      <VaDateInput background="#fff" color="info" placeholder="請選擇結束日" />
      <Button buttonText="查詢" @click="" />
    </div>

    <div
      class="row-span-11 gap-4 border rounded-lg drop-shadow-lg bg-white px-10"
    >
      <!-- 橫向柱狀圖 -->
      <div class="pt-4 h-full" :class="{ hidden: showPieChart }">
        <p class="text-center text-xl pb-4">專案進行總時間</p>
        <div id="yBarChart" style="height: 100%; width: 100%"></div>
      </div>
      <!-- 圓餅圖 -->
      <div class="pt-4 h-full" :class="{ hidden: !showPieChart }">
        <p class="text-center text-xl pb-4">工作型態圓餅圖</p>
        <div id="pieChart" style="height: 90%; width: 100%"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../components/element/Button.vue";
import * as echarts from "echarts";

export default {
  components: {
    Button,
  },

  data() {
    return {
      value: new Date(2000, 0, 1),
      showPieChart: false,
      activeChart: "bar",
    };
  },

  mounted() {
    this.initYBarChart();
    this.showPieChart = !this.showPieChart;
    this.$nextTick(() => {
      this.initPieChart();
      this.showPieChart = !this.showPieChart;
    });
  },

  methods: {
    // 橫向長條圖
    initYBarChart() {
      const chartDom = document.getElementById("yBarChart");
      if (!chartDom) return;
      const myChart = echarts.init(chartDom);

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          type: "scroll",
          top: "top",
          textStyle: {
            fontSize: 16,
          },
          data: [
            "專案AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            "專案BBBBBBBBBBBBBBBBBBBBBBBBB",
            "專案CCCCCCCCCCCCCCCCCCC",
            "專案DDDDDDDD",
            "專案EEEEEEEEEEEE",
          ],
        },
        grid: {
          left: 100,
        },
        toolbox: {
          show: true,
        },
        xAxis: {
          type: "value",
          name: "小時",
          axisLabel: {
            formatter: "{value}",
          },
        },
        yAxis: {
          type: "category",
          inverse: true,
          data: ["黃國維", "黃琮銘", "邱育聖", "蔡維純", "紀宗文"],
          axisLabel: {
            margin: 20,
          },
        },
        series: [
          {
            name: "專案AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            type: "bar",
            data: [270, 170, 30, 22, 45],
          },
          {
            name: "專案BBBBBBBBBBBBBBBBBBBBBBBBB",
            type: "bar",
            data: [150, 105, 110, 200, 30],
          },
          {
            name: "專案CCCCCCCCCCCCCCCCCCC",
            type: "bar",
            data: [220, 82, 63, 10, 133],
          },
          {
            name: "專案DDDDDDDD",
            type: "bar",
            data: [220, 82, 63, 10, 133],
          },
          {
            name: "專案EEEEEEEEEEEE",
            type: "bar",
            data: [150, 105, 110, 200, 30],
          },
        ],
      };

      option && myChart.setOption(option);
      console.log("BAR生成完畢");
    },

    // 圓餅圖
    initPieChart() {
      const chartDom = document.getElementById("pieChart");
      if (!chartDom) return;
      const myChart = echarts.init(chartDom);
      const option = {
        tooltip: {
          show: true,
        },
        legend: {
          type: "scroll",
          top: "top",
          textStyle: {
            fontSize: 16,
          },
        },
        series: [
          {
            type: "pie",
            data: [
              { value: 80, name: "程式設計" },
              { value: 5, name: "公司行政事務" },
              { value: 34, name: "技術研發" },
              { value: 34, name: "自行研讀" },
              { value: 34, name: "整合測試" },
              { value: 34, name: "程式開發及單元測試-易" },
              { value: 4, name: "招標文件了解" },
              { value: 5, name: "參加內部會議" },
              { value: 13, name: "會議資料準備" },
              { value: 20, name: "程式開發及單元測試-中" },
              { value: 10, name: "程式開發及單元測試-難" },
              { value: 9, name: "a" },
              { value: 5, name: "b" },
              { value: 13, name: "c" },
              { value: 20, name: "d" },
              { value: 10, name: "e" },
              { value: 9, name: "f" },
            ],
          },
        ],
      };
      option && myChart.setOption(option);
      console.log("PIE生成完畢");
    },

    showYBarChartCnt() {
      this.activeChart = "bar";
      this.showPieChart = false;
    },

    showPieChartCnt() {
      this.activeChart = "pie";
      this.showPieChart = true;
    },
  },
};
</script>
