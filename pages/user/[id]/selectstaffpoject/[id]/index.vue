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
          title="負責人"
          :cnt="projectManager"
        />
        <ProjectInfoCard
          className="col-span-1"
          title="型態"
          :cnt="projectType"
        />
        <ProjectInfoCard
          className="col-span-1"
          title="狀態"
          :cnt="projectStatus"
        />
        <ProjectInfoCard
          className="col-span-1"
          title="總花費時間 (小時)"
          :cnt="totalHours"
        />
        <ProjectInfoCard className="col-span-2" title="客戶" :cnt="customer" />
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
            v-model="enddate"
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
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return {
      startdate: new Date(year, 0, 1),
      enddate: new Date(year, month, day),
      showPieChart: false,
      projectManager: "",
      projectStatus: "",
      projectType: "",
      totalHours: "",
      customer: "",
      projectTitle: "個人專案查詢 : ",
      userId: "",
    };
  },
  // setup() {
  //   const router = useRoute();
  //   console.log(router);
  // },

  mounted() {
    this.getStaffId();
    this.getProjectSTime(this.userId);
    this.getProjectInfo(this.$route.params.id);
    this.getProjectTitle();
    this.startdate = null;
    this.enddate = null;
    this.initAreaChart();
    this.showPieChart = !this.showPieChart;
    this.$nextTick(() => {
      this.initWorkPieChart();
      this.showPieChart = !this.showPieChart;
    });
  },

  methods: {
    findChart() {
      const addOneDay = (date) => {
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        return nextDate.toISOString().split(".")[0] + "Z";
      };

      const startISOString = addOneDay(this.startdate);
      const endISOString = addOneDay(this.enddate);

      if (startISOString < this.projectSTime) {
        const projectStartDate = this.projectSTime.split("T")[0];
        alert(`起始時間應晚於或等於 ${projectStartDate}`);
        return;
      }

      if (endISOString > this.projectETime) {
        const projectEndDate = this.projectETime.split("T")[0];
        alert(`起始時間應早於或等於 ${projectEndDate}`);
        return;
      }

      this.createAreaChart(
        this.$route.params.id,
        this.userId,
        startISOString,
        endISOString
      );
      this.createWorkPieChart(
        this.$route.params.id,
        this.userId,
        startISOString,
        endISOString
      );
    },

    getStaffId() {
      const router = useRoute();
      const parts = router.fullPath.split("/");
      const userIdIndex = parts.indexOf("user") + 1;
      const userId = userIdIndex >= 0 ? parts[userIdIndex] : null;
      this.userId = userId;
    },

    getProjectInfo(project_id) {
      API.post("api/ProjectAnalysis/GetindividualProjectInformation", {
        id: project_id,
      })
        .then((response) => {
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
              this.projectTitle = String(`個人專案查詢：${data.pj_name}`);
            }
          });
        })
        .catch((error) => console.error(error));
    },

    getProjectSTime(userId) {
      API.post("api/ProjectAnalysis/GetPjStartTime", {
        id: this.$route.params.id,
      })
        .then((response) => {
          this.projectSTime = response.data.pjStartDate;
          this.projectETime = response.data.pjEndDate;
          this.createAreaChart(
            this.$route.params.id,
            userId,
            this.projectSTime,
            this.projectETime
          );
          this.createWorkPieChart(
            this.$route.params.id,
            userId,
            this.projectSTime,
            this.projectETime
          );
        })
        .catch((error) => console.error(error));
    },

    createAreaChart(projectId, userId, startDate, endDate) {
      API.post("api/ProjectAnalysis/GetareaChart", {
        id: projectId,
        staffid: userId,
        startdate: startDate,
        enddate: endDate,
      })
        .then((response) => {
          const dates = response.data.map((workDate) => workDate.date);
          const hours = response.data.map((workHour) => workHour.hour);

          this.initAreaChart(dates, hours);
        })
        .catch((error) => console.error(error));
    },

    createWorkPieChart(projectId, userId, startDate, endDate) {
      API.post("api/ProjectAnalysis/GettypeChart", {
        id: projectId,
        staffid: userId,
        startdate: startDate,
        enddate: endDate,
      })
        .then((response) => {
          const workTypeName = response.data.map((name) => name.typeName);
          const costHours = response.data.map((hour) => +hour.costHours);

          const combinedData = workTypeName.map((name, index) => ({
            value: costHours[index],
            name: name,
          }));

          this.initWorkPieChart(workTypeName, combinedData);
        })
        .catch((error) => console.error(error));
    },

    initAreaChart(dateData, hoursData) {
      const chartDom = document.getElementById("areaChart");
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: "個人專案累加時間面積圖",
          textStyle: {
            fontSize: 20,
          },
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: 累積共 {c}小時",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: dateData,
        },
        yAxis: {
          type: "value",
          name: "小時",
        },
        series: [
          {
            data: hoursData,
            type: "line",
            areaStyle: {},
          },
        ],
      };

      option && myChart.setOption(option);
    },

    initWorkPieChart(typeName, combinedData) {
      const chartDom = document.getElementById("pieChart");
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
          formatter: "{b}: 共 {c}小時, 佔 {d}%",
        },
        legend: {
          bottom: 10,
          left: "center",
          data: typeName,
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: combinedData,
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
