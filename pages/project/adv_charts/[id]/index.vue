<template>
  <div class="p-7 flex flex-col">
    <div class="flex-btw">
      <PageTitle icon-name="search" :page-title="projectTitle" />
      <div class="default-btn bg-green-700" @click="openDialog">
        <VaIcon name="ios_share" size="16px" color="#fff" />
        <p class="text-white ml-1 text-sm">EXCEL</p>
      </div>
    </div>
    <div class="flex flex-col h-full">
      <div class="grid grid-flow-col grid-cols-6 mt-8 gap-4 row-span-1">
        <ProjectInfoCard
          className="col-span-1"
          bgColorClass="bg-gray-500"
          title="負責人"
          :cnt="projectManager"
        />
        <ProjectInfoCard
          className="col-span-1"
          bgColorClass="bg-gray-500"
          title="型態"
          :cnt="projectType"
        />
        <ProjectInfoCard
          className="col-span-1"
          bgColorClass="bg-gray-500"
          title="狀態"
          :cnt="projectStatus"
        />
        <ProjectInfoCard
          className="col-span-1"
          bgColorClass="bg-gray-500"
          title="總花費時間 (小時)"
          :cnt="totalHours"
        />
        <ProjectInfoCard
          className="col-span-2"
          bgColorClass="bg-gray-500"
          title="客戶"
          :cnt="customer"
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
            class="bg-[#126992] areaBtnBg"
            @click="showAreaChartCnt"
          />
          <Button
            buttonText="工作型態統計"
            class="workBtnBg"
            @click="showWorkPieChartCnt"
          />
          <Button
            buttonText="人員時間統計"
            class="emploBtnBg"
            @click="showEmploPieChartCnt"
          />
        </div>

        <!-- 總時間統計面積圖 -->
        <div
          class="border flex-1 mt-4 py-4 rounded-lg drop-shadow-lg bg-white"
          id="areaChart"
          style="height: 90%; width: 100%"
          :class="{ hidden: hiddenAreaChart }"
        ></div>

        <!-- 工作型態統計圓餅圖 -->
        <div
          class="border flex-1 mt-4 py-4 rounded-lg drop-shadow-lg bg-white"
          id="workPieChar"
          style="height: 90%; width: 100%"
          :class="{ hidden: hiddenWorkPieChart }"
        ></div>

        <!-- 人員時間統計圓餅圖 -->
        <div
          class="border flex-1 mt-4 py-4 rounded-lg drop-shadow-lg bg-white"
          id="emploPieChart"
          style="height: 90%; width: 100%"
          :class="{ hidden: hiddenEmploPieChart }"
        ></div>
      </div>
    </div>
    <!-- <export-dialog /> -->
  </div>
</template>

<script>
import API from "~/src/api";
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
      hiddenAreaChart: false,
      hiddenWorkPieChart: true,
      hiddenEmploPieChart: true,
      projectManager: "",
      projectStatus: "",
      projectType: "",
      totalHours: "",
      customer: "",
      projectTitle: "專案名稱:",
    };
  },

  mounted() {
    this.getProjectInfo(this.$route.params.id);
    this.getProjectTitle();
    this.initAreaChart();
    this.hiddenAreaChart = !this.hiddenAreaChart;
    this.hiddenWorkPieChart = !this.hiddenWorkPieChart;
    this.$nextTick(() => {
      this.initWorkPieChar();
      this.hiddenWorkPieChart = !this.hiddenWorkPieChart;
      this.hiddenEmploPieChart = !this.hiddenEmploPieChart;
      this.$nextTick(() => {
        this.initEmploPieChar();
        this.hiddenEmploPieChart = !this.hiddenEmploPieChart;
        this.hiddenAreaChart = !this.hiddenAreaChart;
      });
    });
  },

  methods: {
    getProjectInfo(project_id) {
      API.post("api/ProjectAnalysis/GetindividualProjectInformation", {
        id: project_id,
      })
        .then((response) => {
          console.log(response);
          if (response.status === 204) {
            this.projectManager = "無資料";
            this.projectStatus = "無資料";
            this.projectType = "無資料";
            this.totalHours = "無資料";
            this.customer = "無資料";
          } else {
            this.projectManager = response.data.pm;
            this.projectStatus = response.data.projectStatus;
            this.projectType = response.data.projectType;
            this.totalHours = response.data.totalHours;
            this.customer = response.data.customer;
          }
        })
        .catch((error) => {
          this.projectManager = "-";
          this.projectStatus = "-";
          this.projectType = "-";
          this.totalHours = "-";
          this.customer = "-";
          console.error(error);
        });
    },

    getProjectTitle() {
      API.post("api/ProjectAnalysis/ProjectSelector", {
        id: "All",
      })
        .then((response) => {
          const projectData = response.data;
          projectData.forEach((data) => {
            if (data.pj_id === this.$route.params.id) {
              this.projectTitle = String(`專案名稱：${data.pj_name}`);
            }
          });
        })
        .catch((error) => console.error(error));
    },

    initAreaChart() {
      const chartDom = document.getElementById("areaChart");
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: "時間統計面積圖",
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

    initWorkPieChar() {
      const chartDom = document.getElementById("workPieChar");
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: "工作型態統計圓餅圖",
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

    initEmploPieChar() {
      const chartDom = document.getElementById("emploPieChart");
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: "人員時間統計圓餅圖",
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

    openDialog() {
      this.$emit("openDialog");
    },

    //圖表按鈕切換狀態
    updateChartBackground(areaColor, workColor, emploColor) {
      const areaBtnBg = document.querySelector(".areaBtnBg");
      const workBtnBg = document.querySelector(".workBtnBg");
      const emploBtnBg = document.querySelector(".emploBtnBg");
      areaBtnBg.style.background = areaColor;
      workBtnBg.style.background = workColor;
      emploBtnBg.style.background = emploColor;
    },

    showAreaChartCnt() {
      this.hiddenAreaChart = false;
      this.hiddenWorkPieChart = true;
      this.hiddenEmploPieChart = true;
      this.updateChartBackground("#126992", "#6B7280", "#6B7280");
    },

    showWorkPieChartCnt() {
      this.hiddenAreaChart = true;
      this.hiddenWorkPieChart = false;
      this.hiddenEmploPieChart = true;
      this.updateChartBackground("#6B7280", "#126992", "#6B7280");
    },

    showEmploPieChartCnt() {
      this.hiddenAreaChart = true;
      this.hiddenWorkPieChart = true;
      this.hiddenEmploPieChart = false;
      this.updateChartBackground("#6B7280", "#6B7280", "#126992");
    },
  },
};
</script>
