<template>
  <div class="p-7 flex flex-col">
    <div class="flex-btw">
      <PageTitle icon-name="search" :page-title="projectTitle" />
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
          title="總花費時間(小時)"
          :cnt="totalHours"
        />
        <ProjectInfoCard className="col-span-2" title="客戶" :cnt="customer" />
      </div>

      <div class="my-4 border-t border-gray-300 h-[40rem] flex flex-col">
        <div class="flex items-center">
          <div>
            <div class="py-2 text-rose-500">
              <p>
                立案日期: {{ projectSTime }} / 最後資料時間: {{ projectETime }}
                ----**(請介於兩者之間)**
              </p>
            </div>
            <div class="flex gap-4 w-[45rem]">
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
              <div
                class="bg-gray-200 flex-center px-4 py-2 rounded-md text-white cursor-not-allowed text-sm exportBtn"
                @click="exportExcel"
              >
                <span>匯出</span>
              </div>
            </div>
          </div>
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
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return {
      startdate: new Date(year, 0, 1),
      enddate: new Date(year, month, day),
      hiddenAreaChart: false,
      hiddenWorkPieChart: true,
      hiddenEmploPieChart: true,
      projectManager: "",
      projectStatus: "",
      projectType: "",
      totalHours: "",
      customer: "",
      projectTitle: "專案名稱:",
      projectSTime: "",
      projectETime: "",
      disabledExport: false,
      queryClicked: false,
      selectSTime: "",
      selectETime: "",
      filePjName: "",
    };
  },

  mounted() {
    this.getProjectInfo(this.$route.params.id);
    this.getProjectTitle();
    this.getProjectSTime();
    this.startdate = null;
    this.enddate = null;
    this.hiddenAreaChart = !this.hiddenAreaChart;
    this.hiddenWorkPieChart = !this.hiddenWorkPieChart;
    this.$nextTick(() => {
      this.initWorkPieChart();
      this.hiddenWorkPieChart = !this.hiddenWorkPieChart;
      this.hiddenEmploPieChart = !this.hiddenEmploPieChart;
      this.$nextTick(() => {
        this.initEmploPieChart();
        this.hiddenEmploPieChart = !this.hiddenEmploPieChart;
        this.hiddenAreaChart = !this.hiddenAreaChart;
      });
    });
  },

  methods: {
    findChart() {
      const addOneDay = (date) => {
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        nextDate.setHours(nextDate.getHours() - 16);
        return nextDate.toISOString().split(".")[0];
      };

      const startISOString = addOneDay(this.startdate).split("T")[0];
      const endISOString = addOneDay(this.enddate).split("T")[0];
      const startTime = this.projectSTime.split("T")[0];
      const endTime = this.projectETime.split("T")[0];

      if (startISOString < startTime) {
        alert(`起始時間選擇 **不得早於** 立案日期 ${startTime}`);
        return;
      }

      if (endISOString > endTime) {
        alert(`最後資料時間選擇 **應早於或等於** ${endTime}`);
        return;
      }

      if (startISOString > endISOString) {
        alert(`立案日期 **應早於或等於** 最後資料時間`);
        return;
      }

      this.createAreaChart(this.$route.params.id, startISOString, endISOString);
      this.createWorkPieChart(
        this.$route.params.id,
        startISOString,
        endISOString
      );
      this.createEmploPieChart(
        this.$route.params.id,
        startISOString,
        endISOString
      );
      this.disabledExport = false;
      this.queryClicked = true;

      const btn = document.querySelector(".exportBtn");
      if (this.queryClicked) {
        btn.classList.remove("cursor-not-allowed");
        btn.classList.add("bg-green-700", "cursor-pointer");
      }
      this.selectSTime = startISOString;
      this.selectETime = endISOString;
    },

    exportExcel() {
      const btn = document.querySelector(".exportBtn");
      const removeClassList = () => {
        return btn.classList.remove("bg-green-700", "cursor-pointer");
      };
      const addClassList = () => {
        return btn.classList.add("bg-gray-200", "cursor-not-allowed");
      };

      if (this.queryClicked) {
        if (
          confirm(
            `** 確定要匯出EXCEL表單嗎? ** \n\n 開始日期：${this.selectSTime} \n 結束日期：${this.selectETime}`
          )
        ) {
          this.getAllProjectDetail();
          this.queryClicked = false;
          removeClassList();
          addClassList();
        } else {
          this.queryClicked = false;
          removeClassList();
          addClassList();
        }
      }
    },

    getAllProjectDetail() {
      const project_id = this.$route.params.id;
      const filePjName = this.filePjName;
      const selectSTime = this.selectSTime;
      const selectETime = this.selectETime;

      const formData = new FormData();
      formData.append("id", project_id);
      formData.append("staffid", "All");
      formData.append("startdate", selectSTime);
      formData.append("enddate", selectETime);

      API.post(
        "ProjectAnalysis/DownloadindividualProjectInformationExcel",
        formData,
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/vnd.ms-excel;charset=utf-8",
          },
        }
      )
        .then((response) => {
          const blob = new Blob([response.data], {
            type: "application/vnd.ms-excel",
          });

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `(${project_id})${filePjName} - ${selectSTime} ~ ${selectETime}.xlsx`;
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => console.error(error));
    },

    getProjectInfo(project_id) {
      API.post("ProjectAnalysis/GetindividualProjectInformation", {
        id: project_id,
      })
        .then((response) => {
          // console.log(response);
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
      API.post("ProjectAnalysis/ProjectSelector", {
        id: "All",
      })
        .then((response) => {
          const projectData = response.data;
          projectData.forEach((data) => {
            if (data.pj_id === this.$route.params.id) {
              this.projectTitle = String(`專案名稱：${data.pj_name}`);
              this.filePjName = data.pj_name;
            }
          });
        })
        .catch((error) => console.error(error));
    },

    getProjectSTime() {
      API.post("ProjectAnalysis/GetPjStartTime", {
        id: this.$route.params.id,
      })
        .then((response) => {
          this.projectSTime = response.data.pjStartDate.split("T")[0];
          this.projectETime = response.data.pjEndDate.split("T")[0];
          this.startdate = this.projectSTime;
          this.enddate = this.projectETime;

          this.createAreaChart(
            this.$route.params.id,
            this.projectSTime,
            this.projectETime
          );
          this.createWorkPieChart(
            this.$route.params.id,
            this.projectSTime,
            this.projectETime
          );
          this.createEmploPieChart(
            this.$route.params.id,
            this.projectSTime,
            this.projectETime
          );
        })
        .catch((error) => console.error(error));
    },

    createAreaChart(projectId, startDate, endDate) {
      API.post("ProjectAnalysis/GetareaChart", {
        id: projectId,
        staffid: "All",
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

    createWorkPieChart(projectId, startDate, endDate) {
      API.post("ProjectAnalysis/GettypeChart", {
        id: projectId,
        staffid: "All",
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

    createEmploPieChart(projectId, startDate, endDate) {
      API.post("ProjectAnalysis/GetpersonHourChart", {
        id: projectId,
        startdate: startDate,
        enddate: endDate,
      })
        .then((response) => {
          const personName = response.data.map((name) => name.personName);
          const costHours = response.data.map((hour) => +hour.costHours);

          const combinedData = personName.map((name, index) => ({
            value: costHours[index],
            name: name,
          }));

          this.initEmploPieChart(personName, costHours, combinedData);
        })
        .catch((error) => console.error(error));
    },

    // 圖表初始
    initAreaChart(dateData, hoursData) {
      const chartDom = document.getElementById("areaChart");
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: "專案累加時間面積圖",
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

    initEmploPieChart(personName, hours, combinedData) {
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
          formatter: "{c} 小時",
        },
        legend: {
          bottom: 10,
          left: "center",
          data: personName,
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

    // openDialog() {
    //   this.$emit("openDialog", this.$route.params.id);
    // },

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
