<template>
  <div class="p-7 flex flex-col">
    <div class="flex-btw">
      <PageTitle icon-name="search" page-title="個人專案統計數據" />
      <div class="default-btn bg-green-700">
        <VaIcon name="ios_share" size="16px" color="#fff" />
        <p class="text-white ml-1 text-sm">匯出</p>
      </div>
    </div>
    <div class="flex flex-col h-full">
      <div class="grid grid-flow-col grid-cols-6 mt-8 gap-4 row-span-1">
        <ProjectInfoCard
          className="col-span-1"
          bgColorClass="bg-gray-500"
          title="負責人"
          cnt="邱育聖"
        />
        <ProjectInfoCard
          className="col-span-1"
          bgColorClass="bg-gray-500"
          title="型態"
          cnt="研發"
        />
        <ProjectInfoCard
          className="col-span-1"
          bgColorClass="bg-gray-500"
          title="狀態"
          cnt="進行中"
        />
        <ProjectInfoCard
          className="col-span-1"
          bgColorClass="bg-gray-500"
          title="總花費時間 (小時)"
          cnt="125"
        />
        <ProjectInfoCard
          className="col-span-2"
          bgColorClass="bg-gray-500"
          title="專案名稱"
          :cnt="$route.params.project_id"
        />
      </div>

      <div class="my-4 border-t border-gray-300 flex-1 flex flex-col">
        <div class="flex gap-4 pt-4 w-[40rem]">
          <VaDateInput
            id="datetest"
            background="#fff"
            color="info"
            placeholder="請選擇起始日"
            v-model="startdate"
          />
          <VaDateInput
            background="#fff"
            color="info"
            placeholder="請選擇結束日"
            v-model="endtdate"
          />
          <Button buttonText="查詢" @click="findChart" />
        </div>
        <div class="flex gap-4 mt-4">
          <Button
            buttonText="總時間統計"
            class="bg-[#126992] areaChartBg"
            @click="showAreaChartCnt"
          />
          <Button
            buttonText="工作型態統計"
            class="pieChartBg"
            @click="showPieChartCnt"
          />
        </div>

        <!-- 面積圖 -->
        <div
          class="border flex-1 mt-4 py-4 rounded-lg drop-shadow-lg bg-white"
          id="areaChart"
          style="height: 90%; width: 100%"
          :class="{ hidden: showPieChart }"
        ></div>

        <!-- 圓餅圖 -->
        <div
          class="border flex-1 mt-4 py-4 rounded-lg drop-shadow-lg bg-white"
          id="pieChart"
          style="height: 90%; width: 100%"
          :class="{ hidden: !showPieChart }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "~/components/element/PageTitle.vue";
import ProjectInfoCard from "~/components/element/ProjectInfoCard.vue";
import Button from "~/components/element/Button.vue";
import * as echarts from "echarts";

export default {
  components: {
    Button,
    PageTitle,
    ProjectInfoCard,
  },

  data() {
    return {
      showPieChart: false,
    };
  },

  mounted() {
    this.initAreaChart();
    this.showPieChart = !this.showPieChart;
    this.$nextTick(() => {
      this.initPieChart();
      this.showPieChart = !this.showPieChart;
    });
  },

  methods: {
    initAreaChart() {
      const chartDom = document.getElementById("areaChart");
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: "面積圖",
          textStyle: {
            fontSize: 20,
          },
          left: "center",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {},
          },
        ],
      };

      option && myChart.setOption(option);
    },

    initPieChart() {
      const chartDom = document.getElementById("pieChart");
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: "圓餅圖",
          textStyle: {
            fontSize: 20,
          },
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          bottom: 10,
          left: "center",
          data: ["CityA", "CityB", "CityD", "CityC", "CityE"],
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              {
                value: 1548,
                name: "CityE",
              },
              { value: 735, name: "CityC" },
              { value: 510, name: "CityD" },
              { value: 434, name: "CityB" },
              { value: 335, name: "CityA" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },

    //圖表按鈕切換狀態
    updateChartBackground(pieColor, areaColor) {
      const pieChartBg = document.querySelector(".pieChartBg");
      const areaChartBg = document.querySelector(".areaChartBg");
      pieChartBg.style.background = pieColor;
      areaChartBg.style.background = areaColor;
    },

    showAreaChartCnt() {
      this.updateChartBackground("#6B7280", "#126992");
      this.showPieChart = false;
    },

    showPieChartCnt() {
      this.updateChartBackground("#126992", "#6B7280");
      this.showPieChart = true;
    },
  },
};
</script>
